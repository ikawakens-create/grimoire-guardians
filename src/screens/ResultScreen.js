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
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import WORLDS, { getWorldById } from '../data/worlds.js';
import { FUKUROU_CLEAR_COMMENTS, ACT_CUTINS, NPC_FIRST_MEET, STORY_IMAGES } from '../data/storyData.js';
import { getMonsterByWorldId } from '../data/memory-monsters.js';
import { HouseManager } from '../core/HouseManager.js';
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

/** 素材の表示名（日本語） */
const MATERIAL_NAMES = {
  wood:          'まるた',
  stone:         'いし',
  brick:         'れんが',
  gem:           'ほうせき',
  star_fragment: 'ほしのかけら',
  cloth:         'ぬの',
  paint:         'えのぐ',
  crown:         'おうかん',
  cape:          'マント',
  magic_orb:     'まほうだま'
};

/** 素材の絵文字 */
const MATERIAL_EMOJIS = {
  wood:          '🌲',
  stone:         '⛰️',
  brick:         '🧱',
  gem:           '💎',
  star_fragment: '✨',
  cloth:         '🧶',
  paint:         '🎨',
  crown:         '👑',
  cape:          '🧣',
  magic_orb:     '🔮'
};

/** 基本素材プール */
const BASIC_MATERIALS = ['wood', 'stone', 'brick'];
/** レア素材プール */
const RARE_MATERIALS  = ['gem', 'star_fragment', 'cloth'];

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
    SoundManager.playBGM(SoundType.BGM_BOOKSHELF);

    const stars   = this._calcStars(this._result.percentage);
    const cleared = this._result.percentage >= Config.GAME.CLEAR_THRESHOLD;

    this._drops = this._calcDrops(cleared);

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
    const baseRate  = Config.DROP.NORMAL_QUESTION_DROP_RATE;
    const drops     = [];

    // ① 倍率なしで基本ドロップを確率計算
    for (let i = 0; i < correctCount; i++) {
      if (Math.random() < baseRate) {
        // 90% で基本素材、10% でレア素材
        const pool  = Math.random() < 0.9 ? BASIC_MATERIALS : RARE_MATERIALS;
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
        const matId = BASIC_MATERIALS[Math.floor(Math.random() * BASIC_MATERIALS.length)];
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
    const fukuComment = cleared && worldId && FUKUROU_CLEAR_COMMENTS[worldId]
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

    // ドロップ領域
    const dropsHTML = this._drops.length > 0
      ? `<div class="result-drops">
           <div class="result-drops-title">✨ ざいりょうドロップ</div>
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
        percentage: this._result.percentage,
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
    TownManager.onQuizCompleted();
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
    // クリア時は WORLD_CLEAR SE を最初に鳴らす
    if (cleared) {
      SoundManager.playSFX(SoundType.WORLD_CLEAR);
    }

    // ① 星を順番にポップさせる
    await this._animateStars(stars);

    // ② クリア時はドロップアイテムを順番に表示
    if (cleared && this._drops.length > 0) {
      await this._animateDrops();
    }

    // ③ ボタンをフェードイン
    const btns = this._el.querySelector('.result-buttons');
    if (btns) {
      btns.classList.add('result-buttons-visible');
    }

    // ④ モンスターGET演出
    if (this._newlyCollectedMonster) {
      await this._animateMonsterGet(this._newlyCollectedMonster);
    }

    // ⑤ NPC初登場バナー
    if (this._pendingNpcMeet) {
      await this._showNpcFirstMeet(this._pendingNpcMeet);
      this._pendingNpcMeet = null;
    }

    // ⑥ Act転換カットイン
    if (this._pendingActMoment) {
      await this._showActCutin(this._pendingActMoment);
      this._pendingActMoment = null;
    }

    // ⑦ 全ワールドクリア判定（phase_complete）
    if (cleared) {
      this._checkPhaseComplete();
    }
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
    // 封印強度 = クリア済みワールド数
    const worldProgress = GameStore.getState('progress.worlds') || {};
    const clearedCount  = Object.values(worldProgress).filter(w => w.cleared).length;
    GameStore.setState('app.sealStrength', clearedCount);

    // actMoment で storyAct を更新
    const worldDef = getWorldById(worldId);
    if (!worldDef) return;

    const { actMoment, facilityUnlock } = worldDef;

    if (actMoment === 'act2_start') GameStore.setState('app.storyAct', 2);
    else if (actMoment === 'act3_start') GameStore.setState('app.storyAct', 3);
    else if (actMoment === 'act4_start') GameStore.setState('app.storyAct', 4);

    // NPC初登場フラグを記録（セッションストレージで管理）
    if (facilityUnlock) {
      const key = `npc_met_${facilityUnlock}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1');
        this._pendingNpcMeet = facilityUnlock;
      }
    }

    // actMoment を演出キューに積む
    if (actMoment && actMoment !== 'none') {
      this._pendingActMoment = actMoment;
    }
  }

  /**
   * Act転換カットインをオーバーレイ表示する
   * @param {string} actMoment - 'act2_start' | 'act3_start' | 'act4_start' | 'finale_unlock'
   * @returns {Promise<void>}
   * @private
   */
  _showActCutin(actMoment) {
    // ACT_CUTINS からデータを取得
    const cutin = actMoment === 'act2_start'    ? ACT_CUTINS.act2
                : actMoment === 'act3_start'    ? ACT_CUTINS.act3
                : actMoment === 'act4_start'    ? ACT_CUTINS.act4
                : actMoment === 'finale_unlock' ? ACT_CUTINS.finale
                : null;

    if (!cutin) return Promise.resolve();

    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'act-cutin-overlay';
      overlay.innerHTML = `
        <div class="act-cutin-content">
          <div class="act-cutin-icon">${cutin.icon || '📖'}</div>
          <div class="act-cutin-act-label">${cutin.actLabel || ''}</div>
          <div class="act-cutin-title">${cutin.title || ''}</div>
          <div class="act-cutin-text">${(cutin.text || '').replace(/\n/g, '<br>')}</div>
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
      banner.innerHTML = `
        <div class="npc-fm-inner">
          <span class="npc-fm-emoji">${npcData.emoji || '👤'}</span>
          <div class="npc-fm-text">
            <div class="npc-fm-name">${npcData.name || ''}が まちに あらわれた！</div>
            <div class="npc-fm-speech">${(npcData.firstSpeech || '').replace(/\n/g, '<br>')}</div>
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
    const worldProgress = GameStore.getState('progress.worlds') || {};
    const allCleared = WORLDS.every(w => worldProgress[w.id]?.cleared);

    if (!allCleared) return;

    Logger.info('[ResultScreen] 🎊 Phase Complete! All worlds cleared!');
    SoundManager.playSFX(SoundType.PHASE_CLEAR);

    const overlay = document.createElement('div');
    overlay.className = 'phase-complete-overlay';
    overlay.innerHTML = `
      <div class="phase-complete-content">
        <div class="phase-complete-icon">🏆</div>
        <div class="phase-complete-title">おめでとう！</div>
        <div class="phase-complete-sub">ぜんぶの ワールドを クリア！</div>
        <div class="phase-complete-stars">⭐⭐⭐</div>
      </div>
    `;

    // タップで閉じる
    overlay.addEventListener('click', () => {
      overlay.classList.add('phase-complete-exit');
      setTimeout(() => overlay.remove(), 600);
    });

    if (this._el) {
      this._el.appendChild(overlay);
    }
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
