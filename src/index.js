/**
 * index.js - Grimoire Guardians
 * メインエントリーポイント
 * 
 * @version 1.0
 * @date 2026-02-15
 */

import { Config } from './core/Config.js';
import Logger from './core/Logger.js';
import { GameStore } from './core/GameStore.js';
import { SoundManager } from './core/SoundManager.js';
import BookshelfScreen from './screens/BookshelfScreen.js';
import QuizScreen from './screens/QuizScreen.js';

/**
 * アプリケーション初期化
 */
async function init() {
  try {
    Logger.info('='.repeat(60));
    Logger.info(`🎮 ${Config.APP_NAME} v${Config.APP_VERSION}`);
    Logger.info(`📘 ${Config.APP_PHASE}`);
    Logger.info('='.repeat(60));

    // 初期化開始
    Logger.time('App Initialization');

    // 1. コアシステム初期化
    Logger.info('[Init] Initializing core systems...');
    await SoundManager.init();

    // 2. GameStore初期化
    Logger.info('[Init] Initializing game store...');
    GameStore.setState('app.isLoading', true);

    // 3. セーブデータ読み込み（TODO: SaveManager実装後）
    Logger.info('[Init] Loading save data...');
    // await SaveManager.load();

    // 4. コンテンツマネージャー初期化（TODO: ContentManager実装後）
    Logger.info('[Init] Loading content...');
    // await ContentManager.init();

    // 5. 初期化完了
    GameStore.setState('app.isInitialized', true);
    GameStore.setState('app.isLoading', false);
    GameStore.setState('app.currentScreen', 'bookshelf');

    Logger.timeEnd('App Initialization');
    Logger.info('✅ Initialization complete!');

    // 6. ローディング画面を非表示
    hideLoadingScreen();

    // 7. ゲーム画面を表示
    showGameScreen();

    // デバッグ情報
    if (Config.IS_DEBUG) {
      displayDebugInfo();
    }

  } catch (error) {
    Logger.error('❌ Initialization failed:', error);
    showError('初期化に失敗しました。ページを再読み込みしてください。');
  }
}

/**
 * ローディング画面を非表示
 */
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }
}

/** 現在アクティブな画面インスタンスを保持 */
let _activeScreen = null;

/**
 * ゲーム画面を表示（BookshelfScreen から開始）
 */
function showGameScreen() {
  const gameScreen = document.getElementById('game-screen');
  if (!gameScreen) return;

  gameScreen.classList.remove('hidden');
  showBookshelf(gameScreen);
}

/**
 * BookshelfScreen を描画する
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 */
function showBookshelf(gameScreen) {
  // 既存の画面を破棄
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'bookshelf');

  const bookshelf = new BookshelfScreen(gameScreen, (worldData) => {
    Logger.info(`[App] World selected: ${worldData.id} (unit: ${worldData.unitId})`);
    showQuiz(gameScreen, worldData);
  });

  bookshelf.render();
  _activeScreen = bookshelf;

  if (Config.IS_DEBUG) {
    window.GG._screen = bookshelf;
  }
}

/**
 * QuizScreen を描画する
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 * @param {Object} worldData       - 選択されたワールドデータ
 */
function showQuiz(gameScreen, worldData) {
  // 既存の画面を破棄
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'quiz');

  const quiz = new QuizScreen(gameScreen, (result) => {
    // クイズ終了（完了 or 中断）→ ブックシェルフへ戻る
    Logger.info('[App] Quiz exited:', result);

    if (result.type === 'finish') {
      const pct = Math.round(result.percentage * 100);
      Logger.info(
        `[App] Quiz complete: ${result.correctCount}/${result.total} (${pct}%)`
      );
      // TODO: ResultScreen への遷移（Phase 0.1 Week 3 で実装）
    }

    showBookshelf(gameScreen);
  });

  quiz.render(worldData);
  _activeScreen = quiz;

  if (Config.IS_DEBUG) {
    window.GG._screen = quiz;
  }
}

/**
 * エラー表示
 * @param {string} message - エラーメッセージ
 */
function showError(message) {
  const errorToast = document.getElementById('error-toast');
  const errorMessage = document.getElementById('error-message');
  
  if (errorToast && errorMessage) {
    errorMessage.textContent = message;
    errorToast.classList.remove('hidden');

    // 5秒後に非表示
    setTimeout(() => {
      errorToast.classList.add('hidden');
    }, 5000);
  }
}

/**
 * デバッグ情報表示
 */
function displayDebugInfo() {
  Logger.group('📊 Debug Information');
  Logger.info('App Name:', Config.APP_NAME);
  Logger.info('Version:', Config.APP_VERSION);
  Logger.info('Phase:', Config.APP_PHASE);
  Logger.info('Development Mode:', Config.IS_DEVELOPMENT);
  Logger.info('Screen Size:', `${window.innerWidth}x${window.innerHeight}`);
  Logger.info('Orientation:', window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  Logger.info('User Agent:', navigator.userAgent);
  Logger.groupEnd();

  // GameStore状態をコンソールに出力
  Logger.group('🎮 Game Store');
  Logger.info(GameStore.toJSON());
  Logger.groupEnd();

  // グローバルスコープにデバッグヘルパーを追加
  window.GG = {
    Config,
    Logger,
    GameStore,
    SoundManager,
    
    // デバッグコマンド
    unlockAll: () => GameStore.unlockAllWorlds(),
    resetState: () => GameStore.reset(),
    exportState: () => GameStore.toJSON(),
    
    // 状態確認
    getState: (path) => GameStore.getState(path),
    setState: (path, value) => GameStore.setState(path, value)
  };

  Logger.info('💡 Debug helpers available via window.GG');
  Logger.info('   Example: GG.getState("player.name")');
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', (event) => {
  Logger.error('Unhandled error:', event.error);
  showError('エラーが発生しました');
});

window.addEventListener('unhandledrejection', (event) => {
  Logger.error('Unhandled promise rejection:', event.reason);
  showError('エラーが発生しました');
});

/**
 * DOMContentLoaded後に初期化
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
