/**
 * ProgressBar.js - Grimoire Guardians
 * 進捗バーコンポーネント
 *
 * アニメーション付きの進捗表示バー
 * requestAnimationFrameによるスムーズなアニメーション
 * 100%達成時の星エフェクト
 *
 * @version 1.0
 * @date 2026-02-17
 */

import Logger from '../core/Logger.js';

/**
 * ProgressBar クラス
 * 進捗バーの描画・アニメーション管理
 */
export class ProgressBar {
  /**
   * @param {Object} config - 設定オブジェクト
   * @param {number} config.percentage - 初期パーセンテージ（0-100）
   * @param {HTMLElement} config.container - 描画先コンテナ
   * @param {boolean} [config.showPercentage=true] - パーセント表示
   * @param {boolean} [config.showLabel=false] - ラベル表示
   * @param {string} [config.label=''] - ラベルテキスト
   * @param {number} [config.height=12] - バーの高さ（px）
   * @param {string|null} [config.color=null] - カスタムカラー（nullでグラデーション）
   * @param {string} [config.backgroundColor='var(--bg-primary)'] - 背景色
   * @param {number} [config.borderRadius=6] - 角丸（px）
   * @param {boolean} [config.animated=true] - アニメーション有効
   * @param {number} [config.animationDuration=600] - アニメーション時間（ms）
   * @param {boolean} [config.showGlow=true] - 100%時の光沢
   * @param {boolean} [config.showStars=true] - 100%時の星エフェクト
   */
  constructor(config) {
    this.config = {
      percentage: 0,
      showPercentage: true,
      showLabel: false,
      label: '',
      height: 12,
      color: null,
      backgroundColor: 'var(--bg-primary)',
      borderRadius: 6,
      animated: true,
      animationDuration: 600,
      showGlow: true,
      showStars: true,
      ...config
    };

    // DOM要素参照
    this.element = null;
    this.fillElement = null;
    this.percentageElement = null;
    this.labelElement = null;

    // アニメーション管理
    this.animationFrameId = null;
    this.currentPercentage = 0;

    Logger.debug('[ProgressBar] Created with config:', this.config.percentage + '%');
  }

  /**
   * 進捗バーを描画
   * @returns {HTMLElement} 生成されたDOM要素
   */
  render() {
    // ラッパー要素
    this.element = document.createElement('div');
    this.element.className = 'progress-bar-wrapper';

    // ラベル行（ラベルとパーセンテージ）
    if (this.config.showLabel || this.config.showPercentage) {
      const infoRow = document.createElement('div');
      infoRow.className = 'progress-bar-info';

      if (this.config.showLabel) {
        this.labelElement = document.createElement('span');
        this.labelElement.className = 'progress-bar-label';
        this.labelElement.textContent = this.config.label;
        infoRow.appendChild(this.labelElement);
      }

      if (this.config.showPercentage) {
        this.percentageElement = document.createElement('span');
        this.percentageElement.className = 'progress-bar-percentage';
        this.percentageElement.textContent = '0%';
        infoRow.appendChild(this.percentageElement);
      }

      this.element.appendChild(infoRow);
    }

    // バーコンテナ
    const container = document.createElement('div');
    container.className = 'progress-bar-container';
    container.style.height = `${this.config.height}px`;
    container.style.backgroundColor = this.config.backgroundColor;
    container.style.borderRadius = `${this.config.borderRadius}px`;

    // バー本体（fill）
    this.fillElement = document.createElement('div');
    this.fillElement.className = 'progress-bar-fill';
    this.fillElement.style.width = '0%';
    this.fillElement.style.borderRadius = `${this.config.borderRadius}px`;
    this.fillElement.setAttribute('role', 'progressbar');
    this.fillElement.setAttribute('aria-valuenow', '0');
    this.fillElement.setAttribute('aria-valuemin', '0');
    this.fillElement.setAttribute('aria-valuemax', '100');

    if (this.config.color) {
      this.fillElement.style.background = this.config.color;
    }

    // 光沢エフェクト
    const shine = document.createElement('div');
    shine.className = 'progress-bar-shine';
    this.fillElement.appendChild(shine);

    container.appendChild(this.fillElement);

    // 星エフェクトコンテナ
    if (this.config.showStars) {
      const starsContainer = document.createElement('div');
      starsContainer.className = 'progress-bar-stars';
      container.appendChild(starsContainer);
    }

    this.element.appendChild(container);

    // コンテナに追加
    if (this.config.container) {
      this.config.container.appendChild(this.element);
    }

    // 初期値を設定（アニメーション付き）
    if (this.config.percentage > 0) {
      if (this.config.animated) {
        // 少し遅延させてからアニメーション開始
        requestAnimationFrame(() => {
          this._animateProgress(0, this.config.percentage);
        });
      } else {
        this._setProgress(this.config.percentage);
      }
    }

    return this.element;
  }

  /**
   * パーセンテージをアニメーション付きで更新
   * @param {number} newPercentage - 新しいパーセンテージ（0-100）
   */
  updatePercentage(newPercentage) {
    const clamped = Math.max(0, Math.min(100, newPercentage));

    if (this.config.animated) {
      this._animateProgress(this.currentPercentage, clamped);
    } else {
      this._setProgress(clamped);
    }
  }

  /**
   * ラベルテキストを更新
   * @param {string} label - 新しいラベル
   */
  updateLabel(label) {
    if (this.labelElement) {
      this.labelElement.textContent = label;
    }
  }

  /**
   * 0%にリセット
   */
  reset() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.currentPercentage = 0;
    this._setProgress(0);

    // 完了クラスをリセット
    if (this.fillElement) {
      this.fillElement.classList.remove('completed');
    }

    Logger.debug('[ProgressBar] Reset to 0%');
  }

  /**
   * クリーンアップ
   */
  destroy() {
    // アニメーションをキャンセル（メモリリーク防止）
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      Logger.debug('[ProgressBar] Animation cancelled on destroy');
    }

    // DOM要素を削除
    if (this.element) {
      this.element.remove();
      this.element = null;
      this.fillElement = null;
      this.percentageElement = null;
      this.labelElement = null;
    }
  }

  /**
   * アニメーション付き進捗更新
   * @private
   * @param {number} from - 開始パーセンテージ
   * @param {number} to - 終了パーセンテージ
   */
  _animateProgress(from, to) {
    // 既存のアニメーションをキャンセル
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

      // イージング適用
      const eased = this._easeOutCubic(progress);
      const currentValue = from + (to - from) * eased;

      this._setProgress(currentValue);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        // アニメーション完了
        this.animationFrameId = null;
        this._setProgress(to);

        // 100%達成演出はアニメーション完了後
        if (to === 100 && this.config.showGlow) {
          this._showCompletionEffect();
        }
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * 即座に進捗を設定
   * @private
   * @param {number} percentage - パーセンテージ
   */
  _setProgress(percentage) {
    const rounded = Math.round(percentage);
    this.currentPercentage = percentage;

    // バーの幅を更新
    if (this.fillElement) {
      this.fillElement.style.width = `${percentage}%`;
      this.fillElement.setAttribute('aria-valuenow', String(rounded));
    }

    // パーセント表示を更新（リアルタイムカウントアップ）
    if (this.percentageElement) {
      this.percentageElement.textContent = `${rounded}%`;
    }

    // 100%時は特別な色
    if (rounded === 100 && this.fillElement) {
      this.fillElement.style.background =
        'linear-gradient(90deg, #FFD700, #FFA500)';
      this.fillElement.classList.add('completed');
    }
  }

  /**
   * 100%達成演出
   * @private
   */
  _showCompletionEffect() {
    if (!this.element) return;
    const starsContainer = this.element.querySelector('.progress-bar-stars');
    if (!starsContainer) return;

    Logger.info('[ProgressBar] 100% achieved!');

    // 星パーティクルを生成
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (!starsContainer.parentElement) return; // destroy対策

        const star = document.createElement('div');
        star.className = 'star-particle';
        star.textContent = '\u2728'; // ✨
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 0.3}s`;

        starsContainer.appendChild(star);

        // 1秒後に削除
        setTimeout(() => star.remove(), 1000);
      }, i * 100);
    }
  }

  /**
   * イージング関数（ease-out cubic）
   * @private
   * @param {number} t - 0-1の進捗
   * @returns {number} イージング適用後の値
   */
  _easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

export default ProgressBar;
