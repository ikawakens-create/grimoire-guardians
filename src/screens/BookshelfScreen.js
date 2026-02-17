/**
 * BookshelfScreen.js - Grimoire Guardians
 * 本棚画面（ワールド選択）
 *
 * ワールドカードを一覧表示し、プレイヤーが単元を選択する画面
 *
 * @version 1.0
 * @date 2026-02-17
 */

import Logger from '../core/Logger.js';
import { Config } from '../core/Config.js';
import { GameStore } from '../core/GameStore.js';
import BookCard from '../components/BookCard.js';

/**
 * Phase 0.1 仮ワールドデータ（M1-01 ~ M1-06）
 * データファイル（src/data/）に移動予定
 */
const WORLDS_DATA = [
  {
    id: 'world_1',
    title: '\u306A\u304B\u307E\u3065\u304F\u308A\u3068 \u304B\u305A',
    assets: { icon: 'assets/icons/worlds/world_1.png' },
    difficulty: 1,
    totalQuestions: 15,
    theme: {
      primaryColor: '#4A90E2',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    }
  },
  {
    id: 'world_2',
    title: '\u306A\u3093\u3070\u3093\u3081 \u304B\u305A',
    assets: { icon: 'assets/icons/worlds/world_2.png' },
    difficulty: 1,
    totalQuestions: 15,
    theme: {
      primaryColor: '#50C878',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
    }
  },
  {
    id: 'world_3',
    title: '\u3044\u304F\u3064\u3068 \u3044\u304F\u3064',
    assets: { icon: 'assets/icons/worlds/world_3.png' },
    difficulty: 2,
    totalQuestions: 15,
    theme: {
      primaryColor: '#F39C12',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
    }
  },
  {
    id: 'world_4',
    title: '\u3042\u308F\u305B\u3066 \u3044\u304F\u3064',
    assets: { icon: 'assets/icons/worlds/world_4.png' },
    difficulty: 2,
    totalQuestions: 15,
    theme: {
      primaryColor: '#E74C3C',
      gradient: 'linear-gradient(135deg, #fa709a, #fee140)'
    }
  },
  {
    id: 'world_5',
    title: '\u306E\u3053\u308A\u306F \u3044\u304F\u3064',
    assets: { icon: 'assets/icons/worlds/world_5.png' },
    difficulty: 3,
    totalQuestions: 15,
    theme: {
      primaryColor: '#9B59B6',
      gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)'
    }
  },
  {
    id: 'world_6',
    title: '\u304B\u305A\u3092 \u305B\u3044\u308A\u3057\u3088\u3046',
    assets: { icon: 'assets/icons/worlds/world_6.png' },
    difficulty: 3,
    totalQuestions: 15,
    theme: {
      primaryColor: '#1ABC9C',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
    }
  }
];

/**
 * BookshelfScreen クラス
 * 本棚画面の描画・管理
 */
export class BookshelfScreen {
  /**
   * @param {HTMLElement} container - 描画先コンテナ（#game-screen）
   */
  constructor(container) {
    this.container = container;
    this.bookCards = [];
    this.unsubscribe = null;

    Logger.debug('[BookshelfScreen] Created');
  }

  /**
   * 画面を描画
   */
  render() {
    Logger.time('BookshelfScreen.render');

    // コンテナをクリア
    this.container.innerHTML = '';

    // 画面レイアウト
    const screen = document.createElement('div');
    screen.className = 'bookshelf-screen screen-transition-enter';

    // ヘッダー
    const header = document.createElement('div');
    header.className = 'bookshelf-header';
    header.innerHTML = `
      <h1 class="bookshelf-title">\u{1F4DA} \u307B\u3093\u3060\u306A</h1>
      <div class="bookshelf-player-info">
        <span class="badge">\u{1F393} ${Config.GAME.SUBJECT === 'math' ? '\u3055\u3093\u3059\u3046' : ''} ${Config.GAME.GRADE}\u306D\u3093\u305B\u3044</span>
      </div>
    `;

    screen.appendChild(header);

    // カードグリッド
    const grid = document.createElement('div');
    grid.className = 'bookshelf-grid';

    screen.appendChild(grid);
    this.container.appendChild(screen);

    // ワールドカードを生成
    this._renderWorldCards(grid);

    // GameStore変更を監視
    this.unsubscribe = GameStore.subscribe((path) => {
      if (path.startsWith('progress.worlds')) {
        this._refreshCards();
      }
    });

    Logger.timeEnd('BookshelfScreen.render');
    Logger.info(`[BookshelfScreen] Rendered ${this.bookCards.length} world cards`);
  }

  /**
   * ワールドカードを描画
   * @private
   * @param {HTMLElement} grid - グリッドコンテナ
   */
  _renderWorldCards(grid) {
    const worldsProgress = GameStore.getState('progress.worlds') || {};
    const isLicensed = GameStore.getState('license.core.licensed');

    WORLDS_DATA.forEach((worldData, index) => {
      // 進捗データを取得（存在しなければデフォルト値）
      const savedProgress = worldsProgress[worldData.id] || {};

      const cardData = {
        ...worldData,
        progress: {
          cleared: savedProgress.cleared || false,
          score: savedProgress.score || 0,
          maxScore: worldData.totalQuestions,
          percentage: savedProgress.percentage || 0
        },
        // 無料ワールド数を超えるものはロック（ライセンスなし時）
        locked: !isLicensed && index >= Config.GAME.FREE_WORLDS_COUNT
      };

      const bookCard = new BookCard(cardData, grid, (data) => {
        this._onWorldSelected(data);
      });

      bookCard.render();
      this.bookCards.push(bookCard);
    });
  }

  /**
   * ワールド選択時の処理
   * @private
   * @param {Object} worldData - 選択されたワールドデータ
   */
  _onWorldSelected(worldData) {
    Logger.info(`[BookshelfScreen] World selected: ${worldData.id} (${worldData.title})`);

    // TODO: QuizScreen実装後に遷移処理を追加
    // GameStore.setState('app.currentScreen', 'quiz');
    // GameStore.startQuizSession(worldData.id, ...);

    // 仮: 選択アニメーション表示
    const card = this.container.querySelector(`[data-world-id="${worldData.id}"]`);
    if (card) {
      card.classList.add('animate-pulse');
      setTimeout(() => card.classList.remove('animate-pulse'), 500);
    }

    Logger.info(`[BookshelfScreen] TODO: Navigate to QuizScreen for ${worldData.id}`);
  }

  /**
   * カード表示を更新
   * @private
   */
  _refreshCards() {
    const worldsProgress = GameStore.getState('progress.worlds') || {};

    this.bookCards.forEach((bookCard) => {
      const savedProgress = worldsProgress[bookCard.data.id];
      if (savedProgress) {
        bookCard.updateProgress({
          cleared: savedProgress.cleared || false,
          score: savedProgress.score || 0,
          maxScore: bookCard.data.totalQuestions,
          percentage: savedProgress.percentage || 0
        });
      }
    });
  }

  /**
   * クリーンアップ
   */
  destroy() {
    // 監視解除
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    // BookCardを破棄
    this.bookCards.forEach((card) => card.destroy());
    this.bookCards = [];

    // DOM削除
    this.container.innerHTML = '';

    Logger.debug('[BookshelfScreen] Destroyed');
  }
}

export default BookshelfScreen;
