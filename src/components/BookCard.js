/**
 * BookCard.js - Grimoire Guardians
 * 本棚カードコンポーネント
 *
 * ワールド選択画面に表示するカード。画像エラーハンドリング、
 * スケルトンUI、タッチリップル、連打防止Debounce、
 * キーボードアクセシビリティを実装する。
 *
 * @version 1.0
 * @date 2026-02-17
 */

import TypeValidator from '../utils/TypeValidator.js';
import Logger from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import ProgressBar from './ProgressBar.js';

/**
 * BookCard クラス
 * ワールドカードを生成・管理する
 *
 * @example
 * const card = new BookCard(
 *   {
 *     id: 'world_1',
 *     title: 'なかまづくりと かず',
 *     assets: { icon: 'assets/icons/worlds/world_1.png' },
 *     difficulty: 1,
 *     totalQuestions: 15,
 *     progress: { cleared: false, score: 0, maxScore: 15, percentage: 0 },
 *     locked: false,
 *     theme: { gradient: 'linear-gradient(135deg, #667eea, #764ba2)' }
 *   },
 *   document.getElementById('bookshelf-grid'),
 *   (data) => console.log('Selected:', data.id)
 * );
 * card.render();
 */
class BookCard {
  /**
   * @param {Object}      data                      - カードデータ
   * @param {string}      data.id                   - ワールドID
   * @param {string}      data.title                - タイトル
   * @param {Object}      data.assets               - 画像パス群
   * @param {string}      [data.assets.icon]        - 通常アイコン
   * @param {string}      [data.assets.iconLocked]  - ロック時アイコン
   * @param {number}      data.difficulty           - 難易度 (1-5)
   * @param {number}      data.totalQuestions       - 総問題数
   * @param {Object}      data.progress             - 進捗情報
   * @param {boolean}     data.progress.cleared     - クリア済みか
   * @param {number}      data.progress.percentage  - 正答率 (0-100)
   * @param {boolean}     data.locked               - ロック状態
   * @param {Object}      [data.theme]              - テーマカラー
   * @param {string}      [data.theme.gradient]     - ヘッダーグラデーション
   * @param {HTMLElement} container                 - 追加先の親要素
   * @param {Function}    onClick                   - クリック時コールバック (data) => void
   */
  constructor(data, container, onClick) {
    TypeValidator.requireNonNull(data, 'BookCard data');
    TypeValidator.requireNonNull(container, 'BookCard container');
    TypeValidator.requireNonNull(onClick, 'BookCard onClick');

    this.data = data;
    this.container = container;
    this.onClick = onClick;

    /** @type {HTMLElement|null} */
    this.element = null;
    /** @type {ProgressBar|null} */
    this.progressBar = null;
    /** @type {Function[]} イベントリスナー解除用 */
    this._cleanupFns = [];
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * カードを生成して container に追加する
   * @returns {BookCard} メソッドチェーン用
   */
  render() {
    const card = this._buildCard();
    this._setupEvents(card);

    this.element = card;
    this.container.appendChild(card);

    Logger.debug(`[BookCard] Rendered: ${this.data.id}`);
    return this;
  }

  /**
   * 進捗情報を更新する
   * @param {Object} newProgress - 新しい進捗データ
   * @param {number} newProgress.percentage
   * @param {boolean} newProgress.cleared
   */
  updateProgress(newProgress) {
    if (!TypeValidator.isObject(newProgress, 'newProgress')) return;

    this.data.progress = { ...this.data.progress, ...newProgress };

    if (this.progressBar) {
      this.progressBar.updatePercentage(newProgress.percentage);
    }

    // クリア状態の反映
    if (newProgress.cleared && this.element) {
      this.element.classList.add('cleared');
    }

    Logger.debug(`[BookCard] Progress updated: ${this.data.id}`, newProgress);
  }

  /**
   * ロック状態を変更する
   * @param {boolean} locked
   */
  setLocked(locked) {
    if (!TypeValidator.isBoolean(locked, 'locked')) return;

    this.data.locked = locked;

    if (!this.element) return;

    if (locked) {
      this.element.classList.add('locked');
      this.element.setAttribute('aria-disabled', 'true');
    } else {
      this.element.classList.remove('locked');
      this.element.removeAttribute('aria-disabled');
    }

    Logger.debug(`[BookCard] Lock changed: ${this.data.id} => ${locked}`);
  }

  /**
   * コンポーネントを破棄する（メモリリーク防止）
   */
  destroy() {
    // イベントリスナー解除
    this._cleanupFns.forEach(fn => fn());
    this._cleanupFns = [];

    // ProgressBar クリーンアップ
    if (this.progressBar) {
      this.progressBar.destroy();
      this.progressBar = null;
    }

    // DOM 削除
    if (this.element) {
      this.element.remove();
      this.element = null;
    }

    Logger.debug(`[BookCard] Destroyed: ${this.data.id}`);
  }

  // ─────────────────────────────────────────
  // プライベートメソッド
  // ─────────────────────────────────────────

  /**
   * カードの DOM を組み立てる
   * @returns {HTMLElement}
   * @private
   */
  _buildCard() {
    const { data } = this;
    const gradient = data.theme?.gradient || 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';

    const card = document.createElement('div');
    card.className = `book-card${data.locked ? ' locked' : ''}${data.progress.cleared ? ' cleared' : ''}`;
    card.setAttribute('tabindex', data.locked ? '-1' : '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', data.locked ? `${data.title}（ロック中）` : `${data.title}を開く`);
    if (data.locked) card.setAttribute('aria-disabled', 'true');

    // ──── ヘッダー（アイコン + タイトル） ────
    const header = document.createElement('div');
    header.className = 'book-card-header';
    header.style.background = gradient;

    // アイコン領域
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'book-card-icon-wrapper loading';

    const iconSrc = data.locked
      ? (data.assets?.iconLocked || data.assets?.icon || '')
      : (data.assets?.icon || '');

    if (iconSrc) {
      const img = document.createElement('img');
      img.className = 'book-card-icon-image';
      img.src = iconSrc;
      img.alt = data.title;
      img.loading = 'lazy';
      img.addEventListener('load', () => {
        iconWrapper.classList.remove('loading');
      });
      img.addEventListener('error', () => {
        iconWrapper.classList.add('image-error');
        iconWrapper.classList.remove('loading');
        img.style.display = 'none';
      });
      iconWrapper.appendChild(img);
    } else {
      iconWrapper.classList.remove('loading');
      iconWrapper.classList.add('image-error');
    }

    // フォールバックアイコン
    const fallback = document.createElement('div');
    fallback.className = 'book-card-icon-fallback';
    fallback.textContent = '📘';
    iconWrapper.appendChild(fallback);

    // タイトル
    const titleEl = document.createElement('h3');
    titleEl.className = 'book-card-title';
    titleEl.textContent = data.title;

    // 難易度星
    const diffEl = document.createElement('div');
    diffEl.className = 'book-card-difficulty';
    diffEl.setAttribute('aria-label', `難易度 ${data.difficulty}`);
    diffEl.textContent = '★'.repeat(data.difficulty) + '☆'.repeat(5 - data.difficulty);

    header.appendChild(iconWrapper);
    header.appendChild(titleEl);
    header.appendChild(diffEl);

    // ──── ボディ（進捗バー） ────
    const body = document.createElement('div');
    body.className = 'book-card-body';

    const progressContainer = document.createElement('div');
    progressContainer.className = 'book-card-progress';

    const progressLabel = document.createElement('div');
    progressLabel.className = 'book-card-progress-label';
    progressLabel.textContent = data.progress.cleared ? 'クリア済み！' : '進捗';
    progressContainer.appendChild(progressLabel);

    body.appendChild(progressContainer);

    // クリアバッジ
    if (data.progress.cleared) {
      const badge = document.createElement('div');
      badge.className = 'book-card-cleared-badge';
      badge.textContent = '✨ クリア';
      body.appendChild(badge);
    }

    // 「つぎはここ！」バッジ（最初の未クリアワールドに表示）
    if (data.isNextRecommended && !data.progress.cleared && !data.locked) {
      const nextBadge = document.createElement('div');
      nextBadge.className = 'book-card-next-badge';
      nextBadge.textContent = '➡ つぎはここ！';
      card.appendChild(nextBadge);
    }

    card.appendChild(header);
    card.appendChild(body);

    // ProgressBar を後から初期化（DOM 追加後に appendした progressContainer に描画）
    // render() の後に container に追加されるので、一旦参照を保存して render() 後に初期化する
    this._progressContainer = progressContainer;

    return card;
  }

  /**
   * カード追加後に ProgressBar を初期化する
   * render() から呼ばれる
   * @param {HTMLElement} card
   * @private
   */
  _initProgressBar(card) {
    const container = card.querySelector('.book-card-progress');
    if (!container) return;

    this.progressBar = new ProgressBar({
      percentage: this.data.progress.percentage,
      container,
      showPercentage: true,
      height: 12,
      showGlow: true,
      showStars: true,
      animated: true,
      animationDuration: 800
    });
    this.progressBar.render();
  }

  /**
   * イベントリスナーを設定する（Debounce付き）
   * @param {HTMLElement} card
   * @private
   */
  _setupEvents(card) {
    // ProgressBar を初期化（DOM に追加した後）
    // render() が container.appendChild(card) を呼ぶ前にここが実行されるため
    // rAF で次のフレームに遅延させる
    requestAnimationFrame(() => {
      this._initProgressBar(card);
    });

    if (this.data.locked) return;

    let isActivating = false;

    const handleActivation = (e) => {
      if (isActivating) {
        Logger.debug('[BookCard] Click ignored (debouncing)');
        return;
      }
      isActivating = true;

      this._createRipple(e, card);
      SoundManager.playSFX(SoundType.BUTTON_CLICK);

      setTimeout(() => {
        this.onClick(this.data);
        setTimeout(() => { isActivating = false; }, 300);
      }, 150);
    };

    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivation(e);
      }
    };

    card.addEventListener('click', handleActivation);
    card.addEventListener('keydown', handleKeydown);

    // クリーンアップ関数を登録
    this._cleanupFns.push(() => {
      card.removeEventListener('click', handleActivation);
      card.removeEventListener('keydown', handleKeydown);
    });
  }

  /**
   * タッチリップルエフェクトを生成する
   * @param {Event}       event - クリック/タッチイベント
   * @param {HTMLElement} card
   * @private
   */
  _createRipple(event, card) {
    const ripple = document.createElement('span');
    ripple.className = 'book-card-ripple';

    const rect = card.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.style.cssText = `
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
    `;

    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
}

export default BookCard;
