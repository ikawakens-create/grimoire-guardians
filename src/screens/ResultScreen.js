/**
 * ResultScreen.js - Grimoire Guardians
 * クイズ結果画面
 *
 * 機能:
 *   - 星評価（0〜3 ★）の順次アニメーション表示
 *   - クリア時の素材ドロップ演出
 *   - がんばったで賞（クリア未達成でも 40%以上で表示）
 *   - 連続プレイ日数（ストリーク）バッジ
 *   - もう一度 / ほんだなへ ボタン
 *
 * @version 1.0
 * @date 2026-02-22
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { SaveManager } from '../core/SaveManager.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import { MATERIAL_NAMES, MATERIAL_EMOJIS } from '../utils/materialUtils.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import { ClearStoryBanner } from '../components/ClearStoryBanner.js';
import { WORLD_CLEAR_SCENES, buildFallbackScene } from '../data/worldClearScenes.js';
import WORLDS, { getWorldById } from '../data/worlds.js';
import { FUKUROU_CLEAR_COMMENTS, ACT_CUTINS, NPC_FIRST_MEET, STORY_IMAGES, PLAYER_VOICE, NG_PLUS_CUTIN } from '../data/storyData.js';
import { getMonsterByWorldId } from '../data/memory-monsters.js';
import { HouseManager } from '../core/HouseManager.js';
import ShipRenderer from '../components/ShipRenderer.js';
import { TownManager } from '../core/TownManager.js';
import { SkinManager } from '../core/SkinManager.js';

// ─────────────────────────────────────────
// 定数
// ─────────────────────────────────────────

/** 星評価の閾値（高い順）— 仕様書 v1.3 準拠 */
const STAR_THRESHOLDS = [
  { stars: 3, min: 0.90 },  // 90%以上 → ★★★
  { stars: 2, min: 0.80 },  // 80%以上 → ★★
  { stars: 1, min: 0.60 },  // 60%以上 → ★（クリア最低ライン）
  { stars: 0, min: 0    }   // それ以下 → ☆☆☆
];

// MATERIAL_NAMES / MATERIAL_EMOJIS は materialUtils.js から import 済み

/** Grade 1 基本素材プール */
const BASIC_MATERIALS = ['wood', 'stone', 'brick'];
/** Grade 1 レア素材プール */
const RARE_MATERIALS  = ['gem', 'star_fragment', 'cloth'];
// Grade 2 素材プールは Config.GRADE2.ZONE_DROP_POOLS をゾーンIDで参照（_calcDrops 内）

// ─────────────────────────────────────────
// ResultScreen クラス
// ─────────────────────────────────────────

/**
 * ResultScreen クラス
 * クイズ結果を受け取り、結果画面を描画・管理する
 *
 * @example
 * const result = new ResultScreen(
 *   document.getElementById('game-screen'),
 *   { correctCount: 12, total: 15, percentage: 0.8, worldId: 'world_1', unitId: 'M1-01' },
 *   () => retryQuiz(),
 *   () => showBookshelf()
 * );
 * result.render();
 */
class ResultScreen {
  /**
   * @param {HTMLElement} container   - 描画先の親要素
   * @param {Object}      quizResult  - クイズ結果
   * @param {number}      quizResult.correctCount  - 正解数
   * @param {number}      quizResult.total         - 問題総数
   * @param {number}      quizResult.percentage    - 正解率 (0〜1)
   * @param {string}      [quizResult.worldId]     - ワールドID
   * @param {string}      [quizResult.unitId]      - ユニットID
   * @param {Function}    onRetry     - もう一度コールバック
   * @param {Function}    onBack      - ほんだなへコールバック
   */
  constructor(container, quizResult, onRetry, onBack) {
    this._container = container;
    this._result    = quizResult;
    this._onRetry   = onRetry;
    this._onBack    = onBack;

    /** @type {HTMLElement|null} */
    this._el = null;
    /** @type {Array<{id: string, count: number}>} */
    this._drops = [];
    /** @type {import('../data/memory-monsters.js').MonsterDef|null} */
    this._newlyCollectedMonster = null;
    /** @type {string|null} */
    this._pendingActMoment = null;
    /** @type {string|null} */
    this._pendingNpcMeet = null;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を描画する
   */
  render() {
    Logger.info('[ResultScreen] Rendering...');
    SoundManager.playBGM(SoundType.BGM_RESULT);

    const stars   = this._calcStars(this._result.percentage);
    const cleared = this._result.percentage >= Config.GAME.CLEAR_THRESHOLD;

    this._drops = this._calcDrops(cleared);

    // 初クリア判定（_buildHTML と _persistResult より前に確認する）
    this._isFirstClear = cleared &&
      !GameStore.getState(`progress.worlds.${this._result.worldId}.cleared`);

    // DOM 構築
    const el = document.createElement('div');
    el.className = 'result-screen';
    el.innerHTML = this._buildHTML(stars, cleared);

    this._el = el;
    this._container.appendChild(el);

    // アバターを DOM スロットに挿入
    const avatarSlot = el.querySelector('#result-avatar-slot');
    if (avatarSlot && this._avatar) {
      avatarSlot.appendChild(this._avatar.render());
    }

    // 進捗・インベントリを更新してセーブ
    this._persistResult(cleared);

    // ボタンイベント
    this._bindEvents();

    // 順次アニメーション実行
    this._playAnimations(stars, cleared);

    Logger.info('[ResultScreen] Rendered');
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    if (this._voiceTimer) {
      clearTimeout(this._voiceTimer);
      this._voiceTimer = null;
    }
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[ResultScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: 計算
  // ─────────────────────────────────────────

  /**
   * 正解率から星数を算出する
   * @param {number} percentage - 0〜1
   * @returns {number} 0〜3
   */
  _calcStars(percentage) {
    for (const { stars, min } of STAR_THRESHOLDS) {
      if (percentage >= min) return stars;
    }
    return 0;
  }

  /**
   * クリア時の素材ドロップを決定する
   * @param {boolean} cleared - クリアしたか
   * @returns {Array<{id: string, count: number}>}
   */
  _calcDrops(cleared) {
    if (!cleared) return [];

    const multiplier = GameStore.getState('currentSession.rewardMultiplier') ?? 1.0;
    const { correctCount } = this._result;
    const drops     = [];

    // グレードとゾーンに応じた素材プールを選択
    const isGrade2 = (GameStore.getState('app.currentGrade') || 1) === 2;
    let basicPool, rarePool;
    if (isGrade2) {
      // ワールドの zone を使ってプールを決定（存在しない場合は zone1 フォールバック）
      const worldId_pre = GameStore.getState('currentSession.worldId');
      const zoneId      = getWorldById(worldId_pre)?.zone ?? 'zone1';
      const zonePools   = Config.GRADE2.ZONE_DROP_POOLS[zoneId]
                       ?? Config.GRADE2.ZONE_DROP_POOLS['zone1'];
      basicPool = zonePools.basic;
      rarePool  = zonePools.rare;
    } else {
      basicPool = BASIC_MATERIALS;
      rarePool  = RARE_MATERIALS;
    }

    // ワールドごとのドロップ率乗数を取得（難しい単元は低め → 3〜4回プレイ誘導）
    const worldId         = GameStore.getState('currentSession.worldId');
    const worldData       = getWorldById(worldId);
    const worldMultiplier = worldData?.dropRateMultiplier ?? 1.0;
    const baseRate        = Config.DROP.NORMAL_QUESTION_DROP_RATE * worldMultiplier;

    // ① 倍率なしで基本ドロップを確率計算
    for (let i = 0; i < correctCount; i++) {
      if (Math.random() < baseRate) {
        // 90% で基本素材、10% でレア素材
        const pool  = Math.random() < 0.9 ? basicPool : rarePool;
        const matId = pool[Math.floor(Math.random() * pool.length)];
        const found = drops.find(d => d.id === matId);
        if (found) {
          found.count++;
        } else {
          drops.push({ id: matId, count: 1 });
        }
      }
    }

    // ② 倍率を個数に乗算（仕様: 素材×5 → ×3 = 素材×15）
    if (multiplier > 1.0) {
      if (drops.length > 0) {
        drops.forEach(d => {
          d.count = Math.ceil(d.count * multiplier);
        });
      } else {
        // ドロップがゼロでも倍率バフがある場合は最低1個保証
        const matId = basicPool[Math.floor(Math.random() * basicPool.length)];
        drops.push({ id: matId, count: Math.ceil(multiplier) });
      }
    }

    return drops;
  }

  // ─────────────────────────────────────────
  // プライベート: HTML 構築
  // ─────────────────────────────────────────

  /**
   * 画面の HTML 文字列を生成する
   * @param {number}  stars
   * @param {boolean} cleared
   * @returns {string}
   */
  _buildHTML(stars, cleared) {
    const { correctCount, total } = this._result;
    const pct       = Math.round(this._result.percentage * 100);
    const streak    = GameStore.getState('player.streak') || 1;
    const worldDef  = getWorldById(GameStore.getState('currentSession.worldId'));
    const worldTitle = worldDef ? worldDef.title : 'クイズ';

    // キャラクターアバター（感情つき）
    const emotion = this._result.percentage >= 0.9 ? 'happy'
                  : this._result.percentage >= Config.GAME.CLEAR_THRESHOLD ? 'normal'
                  : 'sad';
    this._avatar = new CharacterAvatar('lg', emotion);

    // ラベルバッジ
    const clearBadge  = cleared
      ? '<div class="result-clear-badge">🎉 クリア！</div>'
      : '';
    const effortBadge = !cleared && pct >= 40
      ? '<div class="result-effort-badge">🌟 がんばったで賞！</div>'
      : '';

    // おみくじ倍率バナー（×1.5以上の時のみ）
    const multiplier = GameStore.getState('currentSession.rewardMultiplier') ?? 1.0;
    const multiplierHTML = cleared && multiplier > 1.0
      ? `<div class="result-multiplier-banner">
           🎊 おみくじバフ <strong>×${multiplier}</strong> てきよう！
         </div>`
      : '';

    // フクロウ先生のクリアコメント
    const worldId   = GameStore.getState('currentSession.worldId');
    // 初クリア時はバナー（ClearStoryBanner）がフクロウを担うため、ここでは非表示
    const fukuComment = cleared && worldId && FUKUROU_CLEAR_COMMENTS[worldId]
      && !this._isFirstClear
      ? FUKUROU_CLEAR_COMMENTS[worldId]
      : null;
    const fukuHTML = fukuComment
      ? `<div class="result-fukurou-bubble">
           <img src="${STORY_IMAGES.npcs.fukurou}"
                class="result-fukurou-icon"
                onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'🦉',className:'result-fukurou-emoji'}))">
           <p class="result-fukurou-text">${fukuComment.replace(/\n/g, '<br>')}</p>
         </div>`
      : '';

    // ドロップ領域（Grade 2 は船サイズバッジを表示）
    const SHIP_BADGE = { small: '⛵', medium: '🚢', large: '🛳️' };
    const shipBadge  = GameStore.getState('app.currentGrade') === 2
      ? `<span class="result-ship-badge">${SHIP_BADGE[GameStore.getState('ship.size') ?? 'small']}</span>`
      : '';
    const dropsHTML = this._drops.length > 0
      ? `<div class="result-drops">
           <div class="result-drops-title">${shipBadge}✨ ざいりょうドロップ</div>
           <div class="result-drops-list" id="result-drops-list"></div>
         </div>`
      : `<div class="result-no-drops">
           もっとせいかいして ざいりょうを あつめよう！
         </div>`;

    // ストリークバッジ（2日以上のとき表示）
    const streakHTML = streak >= 2
      ? `<div class="result-streak-badge">
           🔥 <strong>${streak}日</strong> れんぞくプレイ中！
         </div>`
      : '';

    return `
      <div class="result-content">

        <!-- ヘッダー -->
        <div class="result-header">
          <div class="result-world-name">${worldTitle}</div>
          ${clearBadge}
          ${effortBadge}
        </div>

        <!-- キャラクターアバター -->
        <div class="result-avatar-slot" id="result-avatar-slot"></div>

        <!-- 星評価 -->
        <div class="result-stars" id="result-stars">
          ${[0, 1, 2].map(i => `
            <span class="result-star ${i < stars ? 'result-star-filled' : 'result-star-empty'}"
                  data-index="${i}" aria-label="${i < stars ? '星あり' : '星なし'}">
              ${i < stars ? '⭐' : '☆'}
            </span>
          `).join('')}
        </div>

        <!-- スコア -->
        <div class="result-score">
          <span class="result-score-num">${correctCount}</span>
          <span class="result-score-sep">/</span>
          <span class="result-score-total">${total}</span>
          <span class="result-score-pct">(${pct}%)</span>
        </div>

        <!-- ストリーク -->
        ${streakHTML}

        <!-- 倍率バナー -->
        ${multiplierHTML}

        <!-- フクロウ先生コメント -->
        ${fukuHTML}

        <!-- ドロップ -->
        ${dropsHTML}

        <!-- アクションボタン -->
        <div class="result-buttons">
          <button class="button button-secondary result-btn-retry" type="button">
            もう一度
          </button>
          <button class="button button-success result-btn-back" type="button">
            ほんだなへ
          </button>
        </div>

      </div>
    `;
  }

  // ─────────────────────────────────────────
  // プライベート: イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    this._el.querySelector('.result-btn-retry').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      if (typeof this._onRetry === 'function') this._onRetry();
    });

    this._el.querySelector('.result-btn-back').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      if (typeof this._onBack === 'function') this._onBack();
    });
  }

  // ─────────────────────────────────────────
  // プライベート: GameStore 反映・保存
  // ─────────────────────────────────────────

  /**
   * クリア結果をGameStoreに反映し、セーブする
   * @param {boolean} cleared
   */
  _persistResult(cleared) {
    const worldId = GameStore.getState('currentSession.worldId');
    const { correctCount, total } = this._result;

    // ワールド進捗更新
    if (worldId) {
      const existing = GameStore.getState(`progress.worlds.${worldId}`) || {};
      GameStore.updateWorldProgress(worldId, {
        cleared: cleared || existing.cleared || false,
        score: correctCount,
        maxScore: total,
        percentage: Math.round(this._result.percentage * 100),
        lastPlayedAt: new Date().toISOString()
      });
    }

    // ドロップ素材をインベントリに追加
    this._drops.forEach(({ id, count }) => {
      GameStore.addMaterial(id, count);
    });

    // 統計更新
    const stats = GameStore.getState('progress.stats') || {};
    GameStore.updateStats({
      totalQuestions: (stats.totalQuestions || 0) + total,
      correctAnswers: (stats.correctAnswers || 0) + correctCount
    });

    // きおくのいせき：クリア回数を更新してモンスターGET判定
    if (cleared && worldId) {
      this._newlyCollectedMonster = this._updateMonsterClearCount(worldId);
    }

    // クリア時: 家・町・スキンの進捗チェック + ストーリー進捗更新
    if (cleared && worldId) {
      HouseManager.checkProgressUnlocks();
      HouseManager.checkAndUnlockStyles();
      this._updateStoryProgress(worldId);
    }

    // フラッシュモード解放チェック（九九ワールドの初クリア時）
    if (cleared && worldId && Config.FEATURES.ENABLE_FLASH_MODE) {
      const flashIds = Config.GRADE2.FLASH_MODE.ENABLED_WORLD_IDS;
      if (flashIds.includes(worldId)) {
        const unlocked = GameStore.getState('ship.flashUnlockedWorlds') ?? [];
        if (!unlocked.includes(worldId)) {
          GameStore.setState('ship.flashUnlockedWorlds', [...unlocked, worldId]);
          Logger.info(`[ResultScreen] ⚡ フラッシュモード解放: ${worldId}`);
        }
      }
    }
    TownManager.onQuizCompleted(this._result?.worldId);
    SkinManager.checkMilestoneUnlocks();

    // 非同期でセーブ（エラーは握りつぶさない）
    SaveManager.save().catch(err => {
      Logger.error('[ResultScreen] セーブ失敗:', err);
    });
  }

  /**
   * きおくのいせき: worldId のクリア回数を+1し、3回達成でモンスターをコレクトする
   * @param {string} worldId
   * @returns {import('../data/memory-monsters.js').MonsterDef|null} 新たにコレクトしたモンスター（なければ null）
   */
  _updateMonsterClearCount(worldId) {
    const monster = getMonsterByWorldId(worldId);
    if (!monster) return null;

    const clearCounts = GameStore.getState('memory.clearCounts') ?? {};
    const collected   = GameStore.getState('memory.collected') ?? [];

    // すでにコレクト済みならスキップ
    if (collected.includes(monster.id)) return null;

    const newCount = (clearCounts[worldId] ?? 0) + 1;
    GameStore.setState('memory.clearCounts', { ...clearCounts, [worldId]: newCount });

    if (newCount >= 3) {
      GameStore.setState('memory.collected', [...collected, monster.id]);
      Logger.info(`[ResultScreen] 🎉 モンスターGET: ${monster.name} (${monster.id})`);
      return monster;
    }

    return null;
  }

  // ─────────────────────────────────────────
  // プライベート: アニメーション
  // ─────────────────────────────────────────

  /**
   * 星 → ドロップ → ボタン の順にアニメーションを実行する
   * @param {number}  stars
   * @param {boolean} cleared
   */
  async _playAnimations(stars, cleared) {
    // クリア時は WORLD_CLEAR SE を鳴らし、グリモア輝き演出を先行させる
    if (cleared) {
      SoundManager.playSFX(SoundType.WORLD_CLEAR);
      await this._animateClearOpening(this._result.worldId);
    }

    // ① 星を順番にポップさせる
    await this._animateStars(stars);

    // ①' キャラクターの「心の声」（ノンブロッキング — 他の演出と並走）
    this._animatePlayerVoice(stars, cleared);

    // ② クリア時はドロップアイテムを順番に表示
    if (cleared && this._drops.length > 0) {
      await this._animateDrops();
    }

    // 幕間演出１：モンスターGET演出
    if (this._newlyCollectedMonster) {
      await this._animateMonsterGet(this._newlyCollectedMonster);
    }
    if (!this._el) return;

    // 幕間演出２：NPC初登場バナー
    if (this._pendingNpcMeet) {
      await this._showNpcFirstMeet(this._pendingNpcMeet);
      this._pendingNpcMeet = null;
    }
    if (!this._el) return;

    // 幕間演出３：Act転換カットイン
    if (this._pendingActMoment) {
      await this._showActCutin(this._pendingActMoment);
      this._pendingActMoment = null;
    }
    if (!this._el) return;

    // 幕間演出４：全ワールドクリア判定（phase_complete）
    if (cleared) {
      this._checkPhaseComplete();
    }
    if (!this._el) return;

    // クリア後ミニストーリーバナー（初クリア時のみ）
    if (cleared && this._isFirstClear) {
      await this._showClearStory();
    }
    if (!this._el) return;

    // 最後にボタンをフェードイン
    const btns = this._el.querySelector('.result-buttons');
    if (btns) {
      btns.classList.add('result-buttons-visible');
    }
  }

  /**
   * クリア後ミニストーリーバナーを表示する（初クリア時のみ）
   * データは ResultScreen 側で解決して ClearStoryBanner に渡す（GameStore 二重アクセス防止）
   * @returns {Promise<void>}
   * @private
   */
  _showClearStory() {
    const worldId    = this._result.worldId;
    const worldDef   = getWorldById(worldId);
    const scene      = WORLD_CLEAR_SCENES[worldId] ?? buildFallbackScene(worldDef);
    const playerName = GameStore.getState('player.name') || 'ぼうけんしゃ';

    return new Promise((resolve) => {
      const banner = new ClearStoryBanner();
      banner.show(scene, playerName, {
        onRetry: () => { resolve(); if (typeof this._onRetry === 'function') this._onRetry(); },
        onBack:  () => { resolve(); if (typeof this._onBack  === 'function') this._onBack(); },
        onNext:  () => { resolve(); GameStore.setState('app.currentScreen', 'bookshelf'); },
      });
    });
  }

  /**
   * キャラクターの「心の声」吹き出しを表示する（ノンブロッキング）
   * 初クリア → firstClear、3★ → perfect、2★ → great、1★ → cleared、失敗 → failed
   * @param {number}  stars
   * @param {boolean} cleared
   * @private
   */
  _animatePlayerVoice(stars, cleared) {
    if (!this._el) return;

    // カテゴリ選択
    let category;
    if (!cleared) {
      category = 'failed';
    } else if (this._isFirstClear) {
      category = 'firstClear';
    } else if (stars === 3) {
      category = 'perfect';
    } else if (stars === 2) {
      category = 'great';
    } else {
      category = 'cleared';
    }

    const lines = PLAYER_VOICE[category];
    if (!lines || lines.length === 0) return;
    const line = lines[Math.floor(Math.random() * lines.length)];

    // アバター領域の直後に吹き出しを差し込む
    const avatarSlot = this._el.querySelector('.result-avatar-slot');
    if (!avatarSlot) return;

    const bubble = document.createElement('div');
    bubble.className = 'player-voice-bubble';
    bubble.textContent = line;   // XSS 対策: textContent 使用
    avatarSlot.appendChild(bubble);

    // 2.8s 後にフェードアウト → 削除
    this._voiceTimer = setTimeout(() => {
      if (!bubble.parentNode) return;
      bubble.classList.add('player-voice-bubble--out');
      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 400);
    }, 2800);
  }

  /**
   * クリア開幕演出：グリモアが輝き、封印ゲージ+1 とフクロウコメントを表示する
   * Grade 1 のみ封印ゲージを表示。フクロウコメントがない場合はスキップ。
   * @param {string} worldId
   * @returns {Promise<void>}
   * @private
   */
  _animateClearOpening(worldId) {
    return new Promise((resolve) => {
      if (!this._el) { resolve(); return; }

      const worldDef    = getWorldById(worldId);
      const isGrade1    = !worldDef?.grade || worldDef.grade === 1;
      const sealStrength = isGrade1 ? (GameStore.getState('app.sealStrength') || 0) : 0;
      const comment     = FUKUROU_CLEAR_COMMENTS[worldId] || null;

      // コメントも封印表示もない Grade 2 ワールド等はスキップ
      if (!isGrade1 && !comment) { resolve(); return; }

      const overlay = document.createElement('div');
      overlay.className = 'clear-opening-overlay';

      // グリモアアイコン（輝きアニメ付き）
      const grimoireEl = document.createElement('div');
      grimoireEl.className = 'clear-opening-grimoire';
      grimoireEl.textContent = '📖';
      overlay.appendChild(grimoireEl);

      // Grade 1：封印回復カウンター
      if (isGrade1) {
        const sealEl = document.createElement('div');
        sealEl.className = 'clear-opening-seal';
        sealEl.textContent = `ふういん かいふく！  ${sealStrength} / 33`;
        overlay.appendChild(sealEl);
      }

      // フクロウ先生コメント（データがある場合のみ）
      if (comment) {
        const fukurouWrap = document.createElement('div');
        fukurouWrap.className = 'clear-opening-fukurou';

        const npcEl = document.createElement('span');
        npcEl.className = 'clear-opening-npc';
        npcEl.textContent = '🦉';

        const textEl = document.createElement('div');
        textEl.className = 'clear-opening-comment';
        textEl.textContent = comment;  // textContent で XSS 対策

        fukurouWrap.appendChild(npcEl);
        fukurouWrap.appendChild(textEl);
        overlay.appendChild(fukurouWrap);
      }

      this._el.appendChild(overlay);
      HapticFeedback.success();

      // 1.8秒表示 → フェードアウト → resolve
      setTimeout(() => {
        if (!this._el) { resolve(); return; }
        overlay.classList.add('clear-opening-exit');
        setTimeout(() => {
          overlay.remove();
          resolve();
        }, 400);
      }, 1800);
    });
  }

  /**
   * モンスターGET時のバナー演出
   * @param {import('../data/memory-monsters.js').MonsterDef} monster
   * @returns {Promise<void>}
   */
  _animateMonsterGet(monster) {
    return new Promise((resolve) => {
      const banner = document.createElement('div');
      banner.className = 'result-monster-get';
      banner.innerHTML = `
        <div class="monster-get-inner">
          <div class="monster-get-emoji">${monster.emoji}</div>
          <div class="monster-get-text">
            <div class="monster-get-label">モンスターを GET！</div>
            <div class="monster-get-name">${monster.name}</div>
            <div class="monster-get-sub">🏛️ いせきの ずかんに のったよ！</div>
          </div>
        </div>
      `;
      if (this._el) this._el.appendChild(banner);

      HapticFeedback.medium();

      // 3秒後に消える
      setTimeout(() => {
        banner.classList.add('monster-get-exit');
        setTimeout(() => { banner.remove(); resolve(); }, 500);
      }, 3000);
    });
  }

  /**
   * ストーリー進捗を更新する（sealStrength・storyAct・actMoment演出）
   * @param {string} worldId
   * @private
   */
  _updateStoryProgress(worldId) {
    // 封印強度 = Grade 1 クリア済みワールド数のみカウント
    const worldProgress = GameStore.getState('progress.worlds') || {};
    const g1WorldIds    = new Set(WORLDS.filter(w => !w.grade || w.grade === 1).map(w => w.id));
    const clearedCount  = Object.entries(worldProgress).filter(([id, w]) => w.cleared && g1WorldIds.has(id)).length;
    GameStore.setState('app.sealStrength', clearedCount);

    // actMoment で storyAct を更新
    const worldDef = getWorldById(worldId);
    if (!worldDef) return;

    const { actMoment, facilityUnlock } = worldDef;

    // storyAct 更新（初めて到達した Act のみ）
    const currentAct = GameStore.getState('app.storyAct') || 1;
    let actAdvanced = false;

    if (actMoment === 'act2_start' && currentAct < 2) {
      GameStore.setState('app.storyAct', 2);
      actAdvanced = true;
    } else if (actMoment === 'act3_start' && currentAct < 3) {
      GameStore.setState('app.storyAct', 3);
      actAdvanced = true;
    } else if (actMoment === 'act4_start' && currentAct < 4) {
      GameStore.setState('app.storyAct', 4);
      actAdvanced = true;
    } else if (actMoment === 'finale_unlock' && !GameStore.getState('app.finaleShown')) {
      // finale カットインは finaleShown が false のときのみ
      actAdvanced = true;
    }

    // NPC初登場フラグを記録（localStorage で永続化）
    if (facilityUnlock) {
      const key = `npc_met_${facilityUnlock}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '1');
        this._pendingNpcMeet = facilityUnlock;
      }
    }

    // actMoment を演出キューに積む（Grade 1 のみ、初回のみ）
    if (actAdvanced && actMoment && actMoment !== 'none') {
      this._pendingActMoment = actMoment;
    }

    // Grade 2 zone 転換演出（初回のみ・GameStore で管理しリセット連動）
    const grade2Moments = ['zone2_start', 'zone3_start', 'zone4_start', 'zone5_start', 'grade2_finale_unlock'];
    if (actMoment && grade2Moments.includes(actMoment)) {
      const shownStateKey = `app.${actMoment}Shown`;
      if (!GameStore.getState(shownStateKey)) {
        this._pendingActMoment = actMoment;
      }
    }
  }

  /**
   * Act転換カットインをオーバーレイ表示する
   * @param {string} actMoment - 'act2_start' | 'act3_start' | 'act4_start' | 'finale_unlock'
   *                           | 'zone2_start' | 'zone3_start' | 'zone4_start' | 'zone5_start'
   *                           | 'grade2_finale_unlock'
   * @returns {Promise<void>}
   * @private
   */
  _showActCutin(actMoment) {
    // ACT_CUTINS からデータを取得
    const cutin = actMoment === 'act2_start'           ? ACT_CUTINS.act2
                : actMoment === 'act3_start'           ? ACT_CUTINS.act3
                : actMoment === 'act4_start'           ? ACT_CUTINS.act4
                : actMoment === 'finale_unlock'        ? ACT_CUTINS.finale
                : actMoment === 'zone2_start'          ? ACT_CUTINS.zone2
                : actMoment === 'zone3_start'          ? ACT_CUTINS.zone3
                : actMoment === 'zone4_start'          ? ACT_CUTINS.zone4
                : actMoment === 'zone5_start'          ? ACT_CUTINS.zone5
                : actMoment === 'grade2_finale_unlock' ? ACT_CUTINS.grade2Finale
                : null;

    if (!cutin) return Promise.resolve();

    // 表示済みフラグを立てる（2回目以降は表示しない）
    if (actMoment === 'finale_unlock') {
      GameStore.setState('app.finaleShown', true);
    }
    const grade2Moments = ['zone2_start', 'zone3_start', 'zone4_start', 'zone5_start', 'grade2_finale_unlock'];
    if (grade2Moments.includes(actMoment)) {
      GameStore.setState(`app.${actMoment}Shown`, true);

      // 船アップグレード演出をブックシェルフへ遅延（第2段階）
      // 標準カットインはこのまま表示し、船の演出はブックシェルフ表示後に発火させる
      if (actMoment === 'zone2_start') {
        if (GameStore.getState('ship.size') === 'small') {
          GameStore.setState('app.pendingShipUpgrade', 'medium');
        }
      }
      if (actMoment === 'zone3_start' && !GameStore.getState('app.largeBlueprintObtained')) {
        GameStore.setState('app.pendingShipUpgrade', 'large_blueprint');
      }

      // Grade 2 ゾーン転換は専用の演出メソッドに委譲
      return this._showZoneCutin(actMoment, cutin);
    }

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'act-cutin-overlay';
      if (cutin.bgFallback) overlay.style.background = cutin.bgFallback;
      // ACT_CUTINS フィールド: icon, actLabel, title, npcText（= 表示テキスト）
      const displayText = cutin.npcText || cutin.text || '';
      overlay.innerHTML = `
        <div class="act-cutin-content">
          <div class="act-cutin-icon">${cutin.icon || '📖'}</div>
          <div class="act-cutin-act-label">${cutin.actLabel || ''}</div>
          <div class="act-cutin-title">${cutin.title || ''}</div>
          <div class="act-cutin-text">${displayText.replace(/\n/g, '<br>')}</div>
          <div class="act-cutin-tap">タップして つづける</div>
        </div>
      `;

      overlay.addEventListener('click', () => {
        overlay.classList.add('act-cutin-exit');
        setTimeout(() => { overlay.remove(); resolve(); }, 500);
      });

      if (this._el) this._el.appendChild(overlay);
      SoundManager.playSFX(SoundType.WORLD_CLEAR);
    });
  }

  /**
   * Grade 2 ゾーン転換カットインをステージ演出で表示する
   * zone2/zone5 では船サイズアップアニメ＋GameStore 更新を行う
   * @param {string} actMoment
   * @param {Object} cutin - ACT_CUTINS のデータ
   * @returns {Promise<void>}
   * @private
   */
  async _showZoneCutin(actMoment, cutin) {
    // XSS エスケープ用ヘルパー（ResultScreen には _esc がないため定義）
    const esc = (s) => String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // NPC ID → 絵文字マップ（cutin.npc で切り替え）
    const NPC_EMOJI = {
      fukurou:  '🦉',
      tako_zo:  '🐙',
      tanuki:   '🦝',
      meister:  '🔨',
    };
    const npcEmoji = NPC_EMOJI[cutin.npc] ?? '🦉';

    const shipName = GameStore.getState('ship.name') || 'グリモア号';
    const isFinale = actMoment === 'grade2_finale_unlock';

    // 船サイズアップ定義（zone2: small→medium, zone5: medium→large）
    const UPGRADES = {
      zone2: { from: '⛵', to: '🚢', newSize: 'medium' },
      zone5: { from: '🚢', to: '🛳️', newSize: 'large' },
    };
    const upgrade = UPGRADES[actMoment] || null;

    // Phase D: upgrade 時に ShipRenderer.renderMini() でキャンバスを事前生成
    // overlay.innerHTML に canvas を埋め込めないため、先に生成しておき後で appendChild する
    let beforeCanvas = null, afterCanvas = null;
    if (upgrade) {
      const shipState = GameStore.getState('ship');
      beforeCanvas = await ShipRenderer.renderMini(shipState, 160, 106).catch(() => null);
      afterCanvas  = await ShipRenderer.renderMini(
        { ...shipState, size: upgrade.newSize }, 160, 106
      ).catch(() => null);
    }

    // npcText: {shipName} 置換（エスケープ後）
    const rawNpc = (cutin.npcText || '').replace('{shipName}', esc(shipName));
    const npcHtml = rawNpc.replace(/\n/g, '<br>');

    // アクションボタンラベル
    const btnLabel = isFinale ? 'けっせんへ！！' : 'しゅっこう！';

    // タイムライン（秒）: upgrade 有り = 少し長め
    const hasUpgrade = !!upgrade;
    const T = {
      label:  0.3,
      ship:   hasUpgrade ? 0.8 : 0.6,
      arrow:  1.1,
      shipTo: 1.3,
      name:   1.9,
      bubble: hasUpgrade ? 2.2 : 1.4,
      title:  hasUpgrade ? 3.0 : 2.3,
      btn:    hasUpgrade ? 3.5 : 2.8,
    };

    // 中央部 HTML（船アップグレード / アイコン / ボス）
    let midHtml;
    if (upgrade) {
      midHtml = `
        <div class="zone-cutin-ship-wrap">
          <div class="zone-cutin-ship-row">
            <div class="zone-cutin-ship-before-wrap" style="animation-delay:${T.ship}s"></div>
            <span class="zone-cutin-ship-arrow" style="animation-delay:${T.arrow}s">→</span>
            <div class="zone-cutin-ship-after-wrap"  style="animation-delay:${T.shipTo}s"></div>
          </div>
          <div class="zone-cutin-ship-name" style="animation-delay:${T.name}s">${esc(shipName)}</div>
        </div>`;
    } else if (isFinale) {
      midHtml = `<div class="zone-cutin-boss" style="animation-delay:${T.ship}s">🦑</div>`;
    } else {
      midHtml = `<div class="zone-cutin-icon-solo" style="animation-delay:${T.ship}s">${cutin.icon || '🌊'}</div>`;
    }

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'zone-cutin-overlay';
      overlay.style.background = cutin.bgFallback || '#000428';

      overlay.innerHTML = `
        ${isFinale ? '<div class="zone-cutin-finale-flash"></div>' : ''}
        <div class="zone-cutin-label" style="animation-delay:${T.label}s">${esc(cutin.actLabel || '')}</div>
        ${midHtml}
        <div class="zone-cutin-bubble" style="animation-delay:${T.bubble}s">
          <div class="zone-cutin-npc-emoji">${npcEmoji}</div>
          <div class="zone-cutin-npc-text">${npcHtml}</div>
        </div>
        <div class="zone-cutin-title" style="animation-delay:${T.title}s">${esc(cutin.title || '')}</div>
        <button class="zone-cutin-action-btn" style="animation-delay:${T.btn}s">${btnLabel}</button>
      `;

      // Phase D: canvas をプレースホルダーに挿入
      if (upgrade && beforeCanvas && afterCanvas) {
        beforeCanvas.className = 'zone-cutin-ship-before';
        afterCanvas.className  = 'zone-cutin-ship-after';
        overlay.querySelector('.zone-cutin-ship-before-wrap')?.appendChild(beforeCanvas);
        overlay.querySelector('.zone-cutin-ship-after-wrap')?.appendChild(afterCanvas);
      }

      // 船サイズ更新（アニメ後に反映）
      if (upgrade) {
        setTimeout(() => GameStore.setState('ship.size', upgrade.newSize), (T.shipTo + 0.7) * 1000);
      }

      // dismiss ハンドラ（多重呼び出し防止）
      let dismissed = false;
      const dismiss = () => {
        if (dismissed) return;
        dismissed = true;
        overlay.classList.add('zone-cutin-exit');
        setTimeout(() => { overlay.remove(); resolve(); }, 500);
      };

      // ボタン表示後にパルスアニメ追加 & オーバーレイ全体タップ可能に
      const btn = overlay.querySelector('.zone-cutin-action-btn');
      setTimeout(() => {
        if (btn && btn.isConnected) btn.classList.add('zone-cutin-btn-pulse');
        overlay.addEventListener('click', dismiss);
      }, (T.btn + 0.1) * 1000);

      btn.addEventListener('click', dismiss);

      if (this._el) this._el.appendChild(overlay);
      SoundManager.playSFX(SoundType.WORLD_CLEAR);
    });
  }

  /**
   * NPC初登場バナーを表示する
   * @param {string} facilityId - 'tanuki' | 'farm' | 'guildmaster'
   * @returns {Promise<void>}
   * @private
   */
  _showNpcFirstMeet(facilityId) {
    const npcData = NPC_FIRST_MEET[facilityId];
    if (!npcData) return Promise.resolve();

    return new Promise((resolve) => {
      const banner = document.createElement('div');
      banner.className = 'npc-firstmeet-banner';
      // NPC_FIRST_MEET のフィールド: title（絵文字入りタイトル）, npcText（台詞）
      // emoji は npcData.npc（'tanuki'/'guildmaster'/'fukurou'）で引く（'farm' など facilityId では取れないため）
      const npcEmojis = {
        tanuki: '🦝', guildmaster: '⚔️', fukurou: '🦉',
        takozou: '🐙', rina: '🧜', fukami: '🧭',
      };
      const npcEmoji  = npcEmojis[npcData.npc] || npcEmojis[facilityId] || '👤';
      banner.innerHTML = `
        <div class="npc-fm-inner">
          <span class="npc-fm-emoji">${npcEmoji}</span>
          <div class="npc-fm-text">
            <div class="npc-fm-name">${npcData.title || ''}</div>
            <div class="npc-fm-speech">${(npcData.npcText || '').replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;

      banner.addEventListener('click', () => {
        banner.classList.add('npc-fm-exit');
        setTimeout(() => { banner.remove(); resolve(); }, 400);
      });

      // 5秒後に自動で消える
      setTimeout(() => {
        if (banner.isConnected) {
          banner.classList.add('npc-fm-exit');
          setTimeout(() => { banner.remove(); resolve(); }, 400);
        }
      }, 5000);

      if (this._el) this._el.appendChild(banner);
    });
  }

  /**
   * 全ワールドをクリアしていれば「Phase Complete！」演出を表示する
   * @private
   */
  _checkPhaseComplete() {
    // 一度表示したら再表示しない
    if (localStorage.getItem('phase_complete_shown')) return;

    const worldProgress = GameStore.getState('progress.worlds') || {};
    const g1Worlds   = WORLDS.filter(w => !w.grade || w.grade === 1);
    const allCleared = g1Worlds.every(w => worldProgress[w.id]?.cleared);

    if (!allCleared) return;

    localStorage.setItem('phase_complete_shown', '1');

    Logger.info('[ResultScreen] 🎊 Phase Complete! All worlds cleared!');
    SoundManager.playSFX(SoundType.PHASE_CLEAR);

    const overlay = document.createElement('div');
    overlay.className = 'phase-complete-overlay';

    const content = document.createElement('div');
    content.className = 'phase-complete-content';

    const iconEl = document.createElement('div');
    iconEl.className = 'phase-complete-icon';
    iconEl.textContent = '🏆';

    const titleEl = document.createElement('div');
    titleEl.className = 'phase-complete-title';
    titleEl.textContent = 'おめでとう！';

    const subEl = document.createElement('div');
    subEl.className = 'phase-complete-sub';
    subEl.textContent = 'ぜんぶの ワールドを クリア！';

    const starsEl = document.createElement('div');
    starsEl.className = 'phase-complete-stars';
    starsEl.textContent = '⭐⭐⭐';

    content.appendChild(iconEl);
    content.appendChild(titleEl);
    content.appendChild(subEl);
    content.appendChild(starsEl);
    overlay.appendChild(content);

    // タップで閉じる → その後 NG+ カットインへ
    overlay.addEventListener('click', () => {
      overlay.classList.add('phase-complete-exit');
      setTimeout(() => {
        overlay.remove();
        this._showNgPlusCutin();
      }, 600);
    });

    if (this._el) {
      this._el.appendChild(overlay);
    }
  }

  /**
   * NG+ 解放カットインを1回だけ表示し、app.ngPlusUnlocked を true にする
   * @private
   */
  _showNgPlusCutin() {
    if (!this._el) return;
    if (GameStore.getState('app.ngPlusUnlocked')) return;

    GameStore.setState('app.ngPlusUnlocked', true);
    SaveManager.save().catch(e => Logger.warn('[ResultScreen] NG+ save failed:', e));

    Logger.info('[ResultScreen] 🌟 NG+ unlocked!');

    const cutin = NG_PLUS_CUTIN;
    const overlay = document.createElement('div');
    overlay.className = 'ng-plus-cutin-overlay';
    overlay.style.background = cutin.bgFallback;

    const content = document.createElement('div');
    content.className = 'ng-plus-cutin-content';

    const iconEl = document.createElement('div');
    iconEl.className = 'ng-plus-cutin-icon';
    iconEl.textContent = cutin.icon;

    const labelEl = document.createElement('div');
    labelEl.className = 'ng-plus-cutin-label';
    labelEl.textContent = cutin.actLabel;

    const titleEl = document.createElement('div');
    titleEl.className = 'ng-plus-cutin-title';
    titleEl.textContent = cutin.title;

    const npcWrap = document.createElement('div');
    npcWrap.className = 'ng-plus-cutin-npc';

    const npcIcon = document.createElement('span');
    npcIcon.className = 'ng-plus-cutin-npc-icon';
    npcIcon.textContent = '🦉';

    const npcText = document.createElement('div');
    npcText.className = 'ng-plus-cutin-npc-text';
    npcText.textContent = cutin.npcText;

    npcWrap.appendChild(npcIcon);
    npcWrap.appendChild(npcText);

    const tapHint = document.createElement('div');
    tapHint.className = 'ng-plus-cutin-tap';
    tapHint.textContent = 'タップして つづける';

    content.appendChild(iconEl);
    content.appendChild(labelEl);
    content.appendChild(titleEl);
    content.appendChild(npcWrap);
    content.appendChild(tapHint);
    overlay.appendChild(content);

    overlay.addEventListener('click', () => {
      overlay.classList.add('ng-plus-cutin-exit');
      setTimeout(() => overlay.remove(), 500);
    });

    this._el.appendChild(overlay);
  }

  /**
   * 星アイコンを index 順にアニメーションさせる
   * @param {number} starCount - 点灯する星の数
   * @returns {Promise<void>}
   */
  _animateStars(starCount) {
    return new Promise((resolve) => {
      const starEls = this._el.querySelectorAll('.result-star-filled');
      let delay = 0;

      starEls.forEach((star) => {
        setTimeout(() => {
          star.classList.add('result-star-pop');
          HapticFeedback.light();
        }, delay);
        delay += 300;
      });

      // 全星アニメーション終了後に解決
      setTimeout(resolve, delay + 200);
    });
  }

  /**
   * ドロップアイテムを 400ms 間隔で順番に表示する
   * @returns {Promise<void>}
   */
  _animateDrops() {
    return new Promise((resolve) => {
      const list = this._el.querySelector('#result-drops-list');
      if (!list) { resolve(); return; }

      let delay = 0;

      const RARE_MATERIALS = new Set(['gem', 'star_fragment', 'magic_orb', 'crown', 'cape']);

      this._drops.forEach(({ id, count }) => {
        setTimeout(() => {
          const item = document.createElement('div');
          item.className = 'result-drop-item';
          item.innerHTML = `
            <span class="drop-emoji">${MATERIAL_EMOJIS[id] || '📦'}</span>
            <span class="drop-name">${MATERIAL_NAMES[id] || id}</span>
            <span class="drop-count">×${count}</span>
          `;
          list.appendChild(item);
          HapticFeedback.light();
          if (RARE_MATERIALS.has(id)) {
            SoundManager.playSFX(SoundType.RARE_DROP);
          }
        }, delay);
        delay += 400;
      });

      setTimeout(resolve, delay + 200);
    });
  }
}

export default ResultScreen;
