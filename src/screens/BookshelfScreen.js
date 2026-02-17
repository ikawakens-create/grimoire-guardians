/**
 * BookshelfScreen.js - Grimoire Guardians
 * 本棚画面（ワールド選択）
 *
 * GameStore の状態を参照してワールド一覧をカード形式で表示する。
 * ライセンス状態に応じてロック/アンロックを切り替える。
 *
 * @version 1.0
 * @date 2026-02-17
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import BookCard from '../components/BookCard.js';
import WORLDS from '../data/worlds.js';

/**
 * BookshelfScreen クラス
 * ワールド選択画面を生成・管理する
 *
 * @example
 * const screen = new BookshelfScreen(
 *   document.getElementById('game-screen'),
 *   (worldData) => console.log('World selected:', worldData.id)
 * );
 * screen.render();
 */
class BookshelfScreen {
  /**
   * @param {HTMLElement} container   - 描画先の親要素
   * @param {Function}    onWorldSelect - ワールド選択時のコールバック (worldData) => void
   */
  constructor(container, onWorldSelect) {
    this.container = container;
    this.onWorldSelect = onWorldSelect;

    /** @type {HTMLElement|null} */
    this.element = null;
    /** @type {BookCard[]} */
    this.cards = [];
    /** @type {Function|null} GameStore 購読解除関数 */
    this._unsubscribe = null;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を生成して container に描画する
   * @returns {BookshelfScreen} メソッドチェーン用
   */
  render() {
    Logger.info('[BookshelfScreen] Rendering...');

    const screen = document.createElement('div');
    screen.className = 'bookshelf-screen';

    // ヘッダー
    screen.appendChild(this._buildHeader());

    // カードグリッド
    const grid = document.createElement('div');
    grid.className = 'bookshelf-grid';
    grid.id = 'bookshelf-grid';
    screen.appendChild(grid);

    this.element = screen;
    this.container.appendChild(screen);

    // カードを生成
    this._buildCards(grid);

    // GameStore の変更を購読（ライセンス変更でロック状態を同期）
    this._unsubscribe = GameStore.subscribe((path) => {
      if (path === 'license.core.licensed' || path === '*') {
        this._syncLockStates();
      }
    });

    Logger.info('[BookshelfScreen] Rendered');
    SoundManager.playBGM(SoundType.BGM_BOOKSHELF);

    return this;
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    // カードをクリーンアップ
    this.cards.forEach(card => card.destroy());
    this.cards = [];

    // GameStore 購読を解除
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }

    // DOM 削除
    if (this.element) {
      this.element.remove();
      this.element = null;
    }

    Logger.info('[BookshelfScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベートメソッド
  // ─────────────────────────────────────────

  /**
   * ヘッダー要素を生成する
   * @returns {HTMLElement}
   * @private
   */
  _buildHeader() {
    const header = document.createElement('header');
    header.className = 'bookshelf-header';

    // タイトル
    const title = document.createElement('h1');
    title.className = 'bookshelf-title';
    title.textContent = 'ほんだな';

    // プレイヤー名
    const playerName = GameStore.getState('player.name');
    const playerInfo = document.createElement('div');
    playerInfo.className = 'bookshelf-player';
    playerInfo.textContent = `${playerName} さん`;

    // 統計バッジ（クリア数 / 全ワールド数）
    const worlds = GameStore.getState('progress.worlds') || {};
    const clearedCount = Object.values(worlds).filter(w => w.cleared).length;
    const statsEl = document.createElement('div');
    statsEl.className = 'bookshelf-stats';
    statsEl.innerHTML = `
      <span class="stats-badge">
        ⭐ ${clearedCount} / ${WORLDS.length} クリア
      </span>
    `;

    header.appendChild(title);
    header.appendChild(playerInfo);
    header.appendChild(statsEl);

    return header;
  }

  /**
   * ワールドカードを一括生成してグリッドに追加する
   * @param {HTMLElement} grid
   * @private
   */
  _buildCards(grid) {
    const licensed = GameStore.getState('license.core.licensed');
    const worldProgress = GameStore.getState('progress.worlds') || {};

    WORLDS.forEach(worldDef => {
      const progress = worldProgress[worldDef.id] || {
        cleared: false,
        score: 0,
        maxScore: worldDef.totalQuestions,
        percentage: 0
      };

      // ロック判定: 無料ワールドはアンロック、有料はライセンス必要
      const locked = !worldDef.freeToPlay && !licensed;

      const cardData = {
        ...worldDef,
        progress,
        locked
      };

      const card = new BookCard(
        cardData,
        grid,
        (data) => this._handleWorldSelect(data)
      );

      card.render();
      this.cards.push(card);
    });
  }

  /**
   * ライセンス変更時にカードのロック状態を同期する
   * @private
   */
  _syncLockStates() {
    const licensed = GameStore.getState('license.core.licensed');
    Logger.debug('[BookshelfScreen] Syncing lock states, licensed:', licensed);

    this.cards.forEach((card, index) => {
      const worldDef = WORLDS[index];
      if (!worldDef) return;
      const shouldBeLocked = !worldDef.freeToPlay && !licensed;
      card.setLocked(shouldBeLocked);
    });
  }

  /**
   * ワールド選択時の処理
   * @param {Object} worldData - 選択されたワールドデータ
   * @private
   */
  _handleWorldSelect(worldData) {
    Logger.info(`[BookshelfScreen] World selected: ${worldData.id} (${worldData.title})`);

    // GameStore に選択ワールドを記録
    GameStore.setState('currentSession.worldId', worldData.id);
    GameStore.setState('currentSession.unitId', worldData.unitId);

    // コールバックで画面遷移を通知
    if (this.onWorldSelect) {
      this.onWorldSelect(worldData);
    }
  }
}

export default BookshelfScreen;
