/**
 * ProgressBar.js - Grimoire Guardians
 * 進捗バーコンポーネント
 *
 * requestAnimationFrameベースのアニメーション、カウントアップ演出、
 * 100%達成時の星エフェクトを提供する。
 *
 * @version 1.0
 * @date 2026-02-17
 */

import Logger from '../core/Logger.js';
import TypeValidator from '../utils/TypeValidator.js';

/**
 * ProgressBar クラス
 * アニメーション付き進捗バーを生成・管理する
 *
 * @example
 * const bar = new ProgressBar({
 *   percentage: 0,
 *   container: document.querySelector('.book-card-progress'),
 *   showPercentage: true,
 *   showGlow: true,
 *   showStars: true
 * });
 * bar.render();
 * bar.updatePercentage(75);
 */
class ProgressBar {
  /**
   * @param {Object} config - 設定オブジェクト
   * @param {number}      config.percentage          - 初期値 (0-100)
   * @param {HTMLElement} config.container           - 描画先要素
   * @param {boolean}     [config.showPercentage=false] - パーセント数値を表示するか
   * @param {boolean}     [config.showLabel=false]      - ラベルを表示するか
   * @param {string}      [config.label='']             - ラベルテキスト
   * @param {number}      [config.height=12]            - バーの高さ (px)
   * @param {string|null} [config.color=null]           - カスタム色 (nullでグラデーション)
   * @param {number}      [config.animationDuration=600] - アニメーション時間 (ms)
   * @param {boolean}     [config.animated=true]        - アニメーション有効
   * @param {boolean}     [config.showGlow=true]        - 100%時の光沢
   * @param {boolean}     [config.showStars=true]       - 100%時の星エフェクト
   */
  constructor(config) {
    TypeValidator.requireNonNull(config, 'ProgressBar config');
    TypeValidator.requireNonNull(config.container, 'ProgressBar config.container');

    this.config = {
      percentage: 0,
      showPercentage: false,
      showLabel: false,
      label: '',
      height: 12,
      color: null,
      animationDuration: 600,
      animated: true,
      showGlow: true,
      showStars: true,
      ...config
    };

    // 初期値を 0-100 にクランプ
    this.config.percentage = Math.max(0, Math.min(100, this.config.percentage));

    /** @type {HTMLElement|null} */
    this.element = null;
    /** @type {HTMLElement|null} */
    this.fillElement = null;
    /** @type {HTMLElement|null} */
    this.percentageElement = null;
    /** @type {number|null} rAF ID */
    this.animationFrameId = null;
    /** @type {number} 現在表示中の値 */
    this._currentPercentage = 0;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 進捗バーを生成して container に追加する
   * @returns {ProgressBar} メソッドチェーン用
   */
  render() {
    const { height, showPercentage, showLabel, label, showStars } = this.config;

    const wrapper = document.createElement('div');
    wrapper.className = 'progress-bar-wrapper';

    // ラベル行
    if (showLabel || showPercentage) {
      const infoRow = document.createElement('div');
      infoRow.className = 'progress-bar-info';

      if (showLabel && label) {
        const labelEl = document.createElement('span');
        labelEl.className = 'progress-bar-label';
        labelEl.textContent = label;
        infoRow.appendChild(labelEl);
      }

      if (showPercentage) {
        const pctEl = document.createElement('span');
        pctEl.className = 'progress-bar-percentage';
        pctEl.textContent = '0%';
        this.percentageElement = pctEl;
        infoRow.appendChild(pctEl);
      }

      wrapper.appendChild(infoRow);
    }

    // バーコンテナ
    const container = document.createElement('div');
    container.className = 'progress-bar-container';
    container.style.height = `${height}px`;
    container.style.borderRadius = `${Math.floor(height / 2)}px`;
    container.setAttribute('role', 'progressbar');
    container.setAttribute('aria-valuemin', '0');
    container.setAttribute('aria-valuemax', '100');
    container.setAttribute('aria-valuenow', '0');

    // フィル
    const fill = document.createElement('div');
    fill.className = 'progress-bar-fill';
    fill.style.height = '100%';
    fill.style.borderRadius = `${Math.floor(height / 2)}px`;
    if (this.config.color) {
      fill.style.background = this.config.color;
    }
    fill.style.width = '0%';

    // 光沢オーバーレイ
    const shine = document.createElement('div');
    shine.className = 'progress-bar-shine';
    fill.appendChild(shine);

    container.appendChild(fill);
    this.fillElement = fill;

    // 星エフェクトコンテナ
    if (showStars) {
      const stars = document.createElement('div');
      stars.className = 'progress-bar-stars';
      wrapper.appendChild(container);
      wrapper.appendChild(stars);
    } else {
      wrapper.appendChild(container);
    }

    this.element = wrapper;
    this.config.container.appendChild(wrapper);

    Logger.debug('[ProgressBar] Rendered');

    // 初期値をアニメーション付きで設定
    if (this.config.percentage > 0) {
      this.updatePercentage(this.config.percentage);
    }

    return this;
  }

  /**
   * 進捗値をアニメーション付きで更新する
   * @param {number} newPercentage - 新しい値 (0-100)
   */
  updatePercentage(newPercentage) {
    if (!TypeValidator.isNumber(newPercentage, 'newPercentage')) return;

    const clamped = Math.max(0, Math.min(100, newPercentage));

    if (this.config.animated) {
      this._animateProgress(this._currentPercentage, clamped);
    } else {
      this._setProgress(clamped);
    }
  }

  /**
   * 進捗を 0% にリセットする（アニメーションなし）
   */
  reset() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this._setProgress(0);
    Logger.debug('[ProgressBar] Reset to 0%');
  }

  /**
   * コンポーネントを破棄する（メモリリーク防止）
   */
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      Logger.debug('[ProgressBar] Animation cancelled on destroy');
    }

    if (this.element) {
      this.element.remove();
      this.element = null;
      this.fillElement = null;
      this.percentageElement = null;
    }

    Logger.debug('[ProgressBar] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベートメソッド
  // ─────────────────────────────────────────

  /**
   * requestAnimationFrame を使ったアニメーション
   * 競合防止のため既存アニメーションをキャンセルしてから開始する
   * @param {number} from - 開始値
   * @param {number} to   - 終了値
   * @private
   */
  _animateProgress(from, to) {
    // 既存アニメーションをキャンセル（競合防止）
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      Logger.debug('[ProgressBar] Cancelled previous animation');
    }

    const duration = this.config.animationDuration;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this._easeOutCubic(progress);
      const current = from + (to - from) * eased;

      this._setProgress(current);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
        this._setProgress(to);

        // 完了演出はアニメーション完了後に実行
        if (to === 100 && this.config.showGlow) {
          this._showCompletionEffect();
        }
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * 即座に進捗値を反映する（カウントアップ演出込み）
   * @param {number} percentage
   * @private
   */
  _setProgress(percentage) {
    if (!this.fillElement) return;

    const rounded = Math.round(percentage);
    this._currentPercentage = percentage;

    this.fillElement.style.width = `${percentage}%`;

    const container = this.fillElement.parentElement;
    if (container) {
      container.setAttribute('aria-valuenow', rounded);
    }

    // リアルタイムカウントアップ表示
    if (this.percentageElement) {
      this.percentageElement.textContent = `${rounded}%`;
    }

    // 100%時は金色グラデーション
    if (rounded >= 100 && !this.config.color) {
      this.fillElement.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
      this.fillElement.classList.add('completed');
    }
  }

  /**
   * 100%達成時の星エフェクト
   * @private
   */
  _showCompletionEffect() {
    if (!this.element) return;
    const starsContainer = this.element.querySelector('.progress-bar-stars');
    if (!starsContainer) return;

    Logger.info('[ProgressBar] 100% achieved! ✨');

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.textContent = '✨';
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 0.3}s`;
        starsContainer.appendChild(star);
        setTimeout(() => star.remove(), 1000);
      }, i * 100);
    }
  }

  /**
   * イージング関数（easeOutCubic）
   * @param {number} t - 0〜1の進捗
   * @returns {number}
   * @private
   */
  _easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

export default ProgressBar;
