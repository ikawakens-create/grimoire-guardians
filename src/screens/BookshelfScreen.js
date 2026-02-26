/**
 * BookshelfScreen.js - Grimoire Guardians
 * 本棚画面（ワールド選択）
 *
 * 変更履歴:
 *   v1.1 (2026-02-22): ストリーク表示 + ワールドクリアアニメーション追加
 *   v1.0 (2026-02-17): 初版
 *
 * @version 1.1
 * @date 2026-02-22
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import BookCard from '../components/BookCard.js';
import WORLDS from '../data/worlds.js';
import InventoryScreen from './InventoryScreen.js';
import MemoryIsleScreen from './MemoryIsleScreen.js';

/**
 * BookshelfScreen クラス
 * ワールド選択画面を生成・管理する
 *
 * @example
 * const screen = new BookshelfScreen(
 *   document.getElementById('game-screen'),
 *   (worldData) => console.log('World selected:', worldData.id),
 *   'world_1'   // クリア直後のワールドID（省略可）
 * );
 * screen.render();
 */
class BookshelfScreen {
  /**
   * @param {HTMLElement} container       - 描画先の親要素
   * @param {Function}    onWorldSelect   - ワールド選択時のコールバック (worldData) => void
   * @param {string|null} [newlyClearedWorldId] - 直前にクリアしたワールドID（アニメーション用）
   */
  constructor(container, onWorldSelect, newlyClearedWorldId = null) {
    this.container             = container;
    this.onWorldSelect         = onWorldSelect;
    this._newlyClearedWorldId  = newlyClearedWorldId;

    /** @type {HTMLElement|null} */
    this.element = null;
    /** @type {BookCard[]} */
    this.cards = [];
    /** @type {Function|null} GameStore 購読解除関数 */
    this._unsubscribe = null;
    /** @type {number|null} requestAnimationFrame ID（destroy 時にキャンセル） */
    this._rafId = null;
    /** @type {number[]} setTimeout ID 一覧（destroy 時に clearTimeout） */
    this._timers = [];
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
    screen.className = 'bookshelf-screen screen-transition-enter';

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

    // クリア直後のカードをアニメーション
    if (this._newlyClearedWorldId) {
      // 次フレームで実行（DOM 完成後に適用）
      this._rafId = requestAnimationFrame(() => {
        this._rafId = null;
        this._animateWorldClear(this._newlyClearedWorldId);
      });
    }

    return this;
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    // RAF キャンセル（クリアアニメーション中断時のメモリリーク防止）
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    // setTimeout キャンセル（スパークル生成タイマー）
    this._timers.forEach(id => clearTimeout(id));
    this._timers = [];

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
   * ヘッダー要素を生成する（ストリークバッジ含む）
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

    // プレイヤー名（空文字列の場合は「プレイヤー」にフォールバック）
    const rawName    = GameStore.getState('player.name');
    const playerName = rawName && rawName.trim() ? rawName.trim() : 'プレイヤー';
    const playerInfo = document.createElement('div');
    playerInfo.className = 'bookshelf-player';
    playerInfo.textContent = `${playerName} さん`;

    // 右側バッジ群
    const rightGroup = document.createElement('div');
    rightGroup.className = 'bookshelf-header-right';

    // きおくのいせきボタン
    const memoryBtn = document.createElement('button');
    memoryBtn.type = 'button';
    memoryBtn.className = 'button button-small bookshelf-memory-btn';
    // バッジ：シルエット（clearCount>0 かつ未コレクト）の数を表示
    const clearCounts = GameStore.getState('memory.clearCounts') ?? {};
    const collected   = GameStore.getState('memory.collected') ?? [];
    const nearlyReady = Object.entries(clearCounts).filter(([wId, cnt]) => {
      const mon = /** @type {any} */ (window.__MONSTERS_BY_WORLD?.[wId]);
      return cnt > 0 && cnt < 3 && !collected.includes(mon?.id ?? '');
    }).length;
    const badgeHTML = nearlyReady > 0
      ? `<span class="memory-badge-dot"></span>`
      : '';
    memoryBtn.innerHTML = `🏛️ いせき${badgeHTML}`;
    memoryBtn.addEventListener('click', () => {
      new MemoryIsleScreen().open();
    });
    rightGroup.appendChild(memoryBtn);

    // 家ビルドボタン
    if (Config.FEATURES.ENABLE_HOUSE_BUILD) {
      const houseBtn = document.createElement('button');
      houseBtn.type = 'button';
      houseBtn.className = 'button button-small bookshelf-house-btn';
      houseBtn.innerHTML = '🏠 いえ';
      houseBtn.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'house');
      });
      rightGroup.appendChild(houseBtn);
    }

    // もちものボタン
    const inventoryBtn = document.createElement('button');
    inventoryBtn.type = 'button';
    inventoryBtn.className = 'button button-small bookshelf-inventory-btn';
    inventoryBtn.textContent = '🎒 もちもの';
    inventoryBtn.addEventListener('click', () => {
      new InventoryScreen().open();
    });
    rightGroup.appendChild(inventoryBtn);

    // ストリークバッジ
    const streak = GameStore.getState('player.streak') || 1;
    if (streak >= 1) {
      const streakBadge = document.createElement('div');
      streakBadge.className = 'streak-badge' + (streak >= 3 ? ' streak-badge-hot' : '');
      streakBadge.innerHTML = `
        <span class="streak-fire">${streak >= 3 ? '🔥' : '📅'}</span>
        <span class="streak-count">${streak}</span>
        <span class="streak-label">日れんぞく</span>
      `;
      rightGroup.appendChild(streakBadge);
    }

    // クリア数バッジ
    const worlds       = GameStore.getState('progress.worlds') || {};
    const clearedCount = Object.values(worlds).filter(w => w.cleared).length;
    const statsBadge   = document.createElement('div');
    statsBadge.className = 'bookshelf-stats';
    statsBadge.innerHTML = `
      <span class="stats-badge">
        ⭐ ${clearedCount} / ${WORLDS.length} クリア
      </span>
    `;
    rightGroup.appendChild(statsBadge);

    header.appendChild(title);
    header.appendChild(playerInfo);
    header.appendChild(rightGroup);

    return header;
  }

  /**
   * ワールドカードを一括生成してグリッドに追加する
   * @param {HTMLElement} grid
   * @private
   */
  _buildCards(grid) {
    const licensed      = GameStore.getState('license.core.licensed');
    const worldProgress = GameStore.getState('progress.worlds') || {};

    // 「つぎはここ！」バッジを付けるワールドを特定する
    // ルール: ロックされていないワールドの中で最初の未クリアワールド
    let nextWorldId = null;
    for (const worldDef of WORLDS) {
      const locked = !worldDef.freeToPlay && !licensed;
      if (locked) continue;
      const prog = worldProgress[worldDef.id];
      if (!prog || !prog.cleared) {
        nextWorldId = worldDef.id;
        break;
      }
    }

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
        locked,
        isNextRecommended: worldDef.id === nextWorldId
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
   * クリア直後のワールドカードにお祝いアニメーションを適用する
   * @param {string} worldId - クリアしたワールドID
   * @private
   */
  _animateWorldClear(worldId) {
    const worldIndex = WORLDS.findIndex(w => w.id === worldId);
    if (worldIndex < 0) return;

    const card = this.cards[worldIndex];
    if (!card || !card.element) return;

    Logger.info(`[BookshelfScreen] Animating world clear: ${worldId}`);

    // カードに解放アニメーションクラスを付与
    card.element.classList.add('world-clear-animate');

    // スパークルを生成してカード上にオーバーレイ
    this._spawnSparkles(card.element);

    // アニメーション終了後にクラスを除去
    const removeTimer = setTimeout(() => {
      if (card.element) {
        card.element.classList.remove('world-clear-animate');
      }
    }, 1500);
    this._timers.push(removeTimer);
  }

  /**
   * カード上にキラキラパーティクルを生成する
   * @param {HTMLElement} cardEl
   * @private
   */
  _spawnSparkles(cardEl) {
    const count = 8;
    const rect  = cardEl.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const spawnTimer = setTimeout(() => {
        if (!this.element) return;  // 画面破棄済みなら何もしない

        const sparkle = document.createElement('div');
        sparkle.className = 'world-clear-sparkle';

        // カード内のランダム位置
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        sparkle.style.left = `${x}px`;
        sparkle.style.top  = `${y}px`;

        // ランダムな大きさ
        const size = 12 + Math.random() * 16;
        sparkle.style.width  = `${size}px`;
        sparkle.style.height = `${size}px`;

        cardEl.style.position = 'relative';
        cardEl.appendChild(sparkle);

        // 1秒後に削除
        const removeTimer = setTimeout(() => sparkle.remove(), 1000);
        this._timers.push(removeTimer);
      }, i * 120);
      this._timers.push(spawnTimer);
    }
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
