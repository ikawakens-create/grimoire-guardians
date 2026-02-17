/**
 * BookCard.js - Grimoire Guardians
 * 本棚のカードコンポーネント
 *
 * ワールド選択用のインタラクティブカード
 * 画像エラーハンドリング、Debounce、タッチリップル対応
 *
 * @version 1.0
 * @date 2026-02-17
 */

import Logger from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import ProgressBar from './ProgressBar.js';

/**
 * BookCard クラス
 * 本棚画面のワールドカードを描画・管理
 */
export class BookCard {
  /**
   * @param {Object} data - カードデータ
   * @param {string} data.id - ワールドID
   * @param {string} data.title - ワールドタイトル
   * @param {Object} data.assets - 画像アセット
   * @param {string} data.assets.icon - アイコン画像パス
   * @param {string} [data.assets.iconLocked] - ロック時アイコン画像パス
   * @param {number} data.difficulty - 難易度（1-5）
   * @param {number} data.totalQuestions - 問題数
   * @param {Object} data.progress - 進捗情報
   * @param {boolean} data.progress.cleared - クリア済みか
   * @param {number} data.progress.score - スコア
   * @param {number} data.progress.maxScore - 最大スコア
   * @param {number} data.progress.percentage - パーセンテージ（0-100）
   * @param {boolean} data.locked - ロック状態
   * @param {Object} data.theme - テーマカラー
   * @param {string} data.theme.primaryColor - メインカラー
   * @param {string} data.theme.gradient - グラデーション
   * @param {HTMLElement} container - 描画先コンテナ
   * @param {Function} onClick - クリック時コールバック
   */
  constructor(data, container, onClick) {
    this.data = data;
    this.container = container;
    this.onClick = onClick;

    // DOM要素参照
    this.element = null;
    this.progressBar = null;

    Logger.debug(`[BookCard] Created: ${data.id} (${data.title})`);
  }

  /**
   * カードを描画
   * @returns {HTMLElement} 生成されたDOM要素
   */
  render() {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.worldId = this.data.id;

    // ロック状態
    if (this.data.locked) {
      card.classList.add('locked');
    }

    // クリア済み
    if (this.data.progress.cleared) {
      card.classList.add('cleared');
    }

    // テーマカラー適用
    const gradient = this.data.theme?.gradient ||
      'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';

    // カードHTML構築
    card.innerHTML = `
      <div class="book-card-header" style="background: ${gradient}">
        <div class="book-card-icon-wrapper loading">
          <img
            class="book-card-icon-image"
            src="${this.data.locked
              ? (this.data.assets.iconLocked || this.data.assets.icon)
              : this.data.assets.icon}"
            alt="${this.data.title}"
            loading="lazy"
          />
          <div class="book-card-icon-skeleton"></div>
          <div class="book-card-icon-fallback">\u{1F4D8}</div>
        </div>
        <div class="book-card-title-area">
          <div class="book-card-title">${this.data.title}</div>
          <div class="book-card-difficulty">
            ${this._renderDifficulty(this.data.difficulty)}
          </div>
        </div>
        <div class="text-shadow-overlay"></div>
      </div>
      <div class="book-card-body">
        <div class="book-card-progress"></div>
        <div class="book-card-info">
          <span class="book-card-score">
            ${this.data.progress.score} / ${this.data.progress.maxScore}
          </span>
          ${this.data.progress.cleared
            ? '<span class="badge badge-success">\u30AF\u30EA\u30A2</span>'
            : ''}
        </div>
      </div>
    `;

    // 画像のロード/エラーハンドリング
    const img = card.querySelector('.book-card-icon-image');
    const wrapper = card.querySelector('.book-card-icon-wrapper');

    img.addEventListener('load', () => {
      wrapper.classList.remove('loading');
    });

    img.addEventListener('error', () => {
      wrapper.classList.add('image-error');
      wrapper.classList.remove('loading');
      img.style.display = 'none';
    });

    // ProgressBarを描画
    const progressContainer = card.querySelector('.book-card-progress');
    this.progressBar = new ProgressBar({
      percentage: this.data.progress.percentage,
      container: progressContainer,
      showPercentage: true,
      height: 10,
      showGlow: true,
      showStars: true,
      animated: true
    });
    this.progressBar.render();

    // イベント設定
    this._setupEvents(card);

    // アクセシビリティ
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${this.data.title}\u3092\u958B\u304F`);

    if (this.data.locked) {
      card.setAttribute('aria-disabled', 'true');
    }

    this.element = card;

    // コンテナに追加
    if (this.container) {
      this.container.appendChild(card);
    }

    return card;
  }

  /**
   * 進捗を更新
   * @param {Object} newProgress - 新しい進捗データ
   * @param {boolean} newProgress.cleared - クリア済みか
   * @param {number} newProgress.score - スコア
   * @param {number} newProgress.maxScore - 最大スコア
   * @param {number} newProgress.percentage - パーセンテージ
   */
  updateProgress(newProgress) {
    this.data.progress = { ...this.data.progress, ...newProgress };

    // ProgressBarを更新
    if (this.progressBar) {
      this.progressBar.updatePercentage(newProgress.percentage);
    }

    // スコア表示を更新
    if (this.element) {
      const scoreEl = this.element.querySelector('.book-card-score');
      if (scoreEl) {
        scoreEl.textContent = `${this.data.progress.score} / ${this.data.progress.maxScore}`;
      }

      // クリア状態を更新
      if (newProgress.cleared && !this.element.classList.contains('cleared')) {
        this.element.classList.add('cleared');
        const infoEl = this.element.querySelector('.book-card-info');
        if (infoEl && !infoEl.querySelector('.badge-success')) {
          const badge = document.createElement('span');
          badge.className = 'badge badge-success';
          badge.textContent = '\u30AF\u30EA\u30A2'; // クリア
          infoEl.appendChild(badge);
        }
      }
    }
  }

  /**
   * ロック状態を変更
   * @param {boolean} locked - ロック状態
   */
  setLocked(locked) {
    this.data.locked = locked;

    if (!this.element) return;

    if (locked) {
      this.element.classList.add('locked');
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.classList.remove('locked');
      this.element.removeAttribute('aria-disabled');
    }
  }

  /**
   * クリーンアップ
   */
  destroy() {
    // ProgressBarを破棄
    if (this.progressBar) {
      this.progressBar.destroy();
      this.progressBar = null;
    }

    // DOM要素を削除
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }

  /**
   * イベントハンドラ設定（Debounce付き）
   * @private
   * @param {HTMLElement} card - カード要素
   */
  _setupEvents(card) {
    if (this.data.locked) {
      return;
    }

    let isActivating = false;

    const handleActivation = (e) => {
      // Debounce: 連打防止
      if (isActivating) {
        Logger.debug('[BookCard] Click ignored (debouncing)');
        return;
      }
      isActivating = true;

      this._createRipple(e, card);
      SoundManager.playSFX(SoundType.BUTTON_CLICK);

      setTimeout(() => {
        if (this.onClick) {
          this.onClick(this.data);
        }

        // 300ms後に再度クリック可能
        setTimeout(() => {
          isActivating = false;
        }, 300);
      }, 150);
    };

    // クリック
    card.addEventListener('click', handleActivation);

    // キーボード（アクセシビリティ）
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivation(e);
      }
    });
  }

  /**
   * タッチリップルエフェクト
   * @private
   * @param {Event} event - イベントオブジェクト
   * @param {HTMLElement} card - カード要素
   */
  _createRipple(event, card) {
    const rect = card.getBoundingClientRect();

    // クリック位置またはカード中央
    let x, y;
    if (event.clientX && event.clientY) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      x = rect.width / 2;
      y = rect.height / 2;
    }

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;

    card.appendChild(ripple);

    // アニメーション後に削除
    setTimeout(() => ripple.remove(), 600);
  }

  /**
   * 難易度の星を描画
   * @private
   * @param {number} difficulty - 難易度（1-5）
   * @returns {string} 星のHTML
   */
  _renderDifficulty(difficulty) {
    const filled = Math.min(Math.max(difficulty, 1), 5);
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < filled
        ? '<span class="star filled">\u2605</span>'
        : '<span class="star">\u2606</span>';
    }
    return stars;
  }
}

export default BookCard;
