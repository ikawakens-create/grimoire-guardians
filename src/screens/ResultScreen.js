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
import { getWorldById } from '../data/worlds.js';

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
  wood:          'もくざい',
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
  wood:          '🪵',
  stone:         '🪨',
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
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を描画する
   */
  render() {
    Logger.info('[ResultScreen] Rendering...');

    const stars   = this._calcStars(this._result.percentage);
    const cleared = this._result.percentage >= Config.GAME.CLEAR_THRESHOLD;

    this._drops = this._calcDrops(cleared);

    // DOM 構築
    const el = document.createElement('div');
    el.className = 'result-screen';
    el.innerHTML = this._buildHTML(stars, cleared);

    this._el = el;
    this._container.appendChild(el);

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

    // 非同期でセーブ（エラーは握りつぶさない）
    SaveManager.save().catch(err => {
      Logger.error('[ResultScreen] セーブ失敗:', err);
    });
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
        }, delay);
        delay += 400;
      });

      setTimeout(resolve, delay + 200);
    });
  }
}

export default ResultScreen;
