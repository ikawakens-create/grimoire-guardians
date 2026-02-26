/**
 * index.js - Grimoire Guardians
 * メインエントリーポイント
 *
 * 変更履歴:
 *   v1.2 (2026-02-23): WelcomeScreen 追加（初回起動時の名前入力）
 *   v1.1 (2026-02-22): SaveManager 初期化 + Quiz→Result→Bookshelf 遷移追加
 *   v1.0 (2026-02-15): 初版
 *
 * @version 1.2
 * @date 2026-02-23
 */

import { Config } from './core/Config.js';
import Logger from './core/Logger.js';
import { GameStore } from './core/GameStore.js';
import { SoundManager } from './core/SoundManager.js';
import { SaveManager } from './core/SaveManager.js';
import EventManager from './core/EventManager.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import BookshelfScreen from './screens/BookshelfScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import ResultScreen from './screens/ResultScreen.js';
import { HouseScreen } from './screens/HouseScreen.js';
import { HouseBuildScreen } from './screens/HouseBuildScreen.js';
import { CraftsmanScreen } from './screens/CraftsmanScreen.js';

/**
 * アプリケーション初期化
 */
async function init() {
  try {
    Logger.info('='.repeat(60));
    Logger.info(`🎮 ${Config.APP_NAME} v${Config.APP_VERSION}`);
    Logger.info(`📘 ${Config.APP_PHASE}`);
    Logger.info('='.repeat(60));

    Logger.time('App Initialization');

    // 1. コアシステム初期化
    Logger.info('[Init] Initializing core systems...');
    await SoundManager.init();

    // 2. GameStore 初期化
    Logger.info('[Init] Initializing game store...');
    GameStore.setState('app.isLoading', true);

    // 3. SaveManager 初期化（IndexedDB 接続 + セーブデータロード + ストリーク計算）
    Logger.info('[Init] Loading save data...');
    await SaveManager.init();

    // 4. EventManager 初期化（#event-layer DOM 取得）
    Logger.info('[Init] Initializing event manager...');
    EventManager.init();

    // 5. 初期化完了
    GameStore.setState('app.isInitialized', true);
    GameStore.setState('app.isLoading', false);
    GameStore.setState('app.currentScreen', 'bookshelf');

    Logger.timeEnd('App Initialization');
    Logger.info('✅ Initialization complete!');

    // 5. デバッグヘルパーを先に設定（showGameScreen内でwindow.GGを参照するため）
    if (Config.IS_DEBUG) {
      displayDebugInfo();
    }

    // 6. ローディング画面を非表示
    hideLoadingScreen();

    // 7. ゲーム画面を表示
    showGameScreen();

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

/** 家ビルド画面インスタンス（show/hide方式のためモジュール外で保持） */
let _houseScreen = null;
let _houseBuildScreen = null;
let _craftsmanScreen = null;

/**
 * ゲーム画面を表示する
 * 初回プレイヤー（createdAt === null）は WelcomeScreen を表示する
 */
function showGameScreen() {
  const gameScreen = document.getElementById('game-screen');
  if (!gameScreen) return;

  gameScreen.classList.remove('hidden');

  // 初回起動かどうかを確認（セーブデータがなければ名前入力画面へ）
  const createdAt = GameStore.getState('player.createdAt');
  if (!createdAt) {
    showWelcome(gameScreen);
  } else {
    showBookshelf(gameScreen);
  }

  // 家ビルド・合成屋のグローバルルーター
  GameStore.subscribe((state, path) => {
    if (path !== 'app.currentScreen') return;
    const screen = GameStore.getState('app.currentScreen');
    if (screen === 'house') {
      _houseBuildScreen?.hide?.();
      _craftsmanScreen?.hide?.();
      showHouse(gameScreen);
    } else if (screen === 'house_build') {
      _houseScreen?.hide?.();
      showHouseBuild(gameScreen);
    } else if (screen === 'craftsman') {
      showCraftsman(gameScreen);
    } else if (screen === 'bookshelf') {
      _houseScreen?.hide?.();
      _houseBuildScreen?.hide?.();
      _craftsmanScreen?.hide?.();
    }
  });
}

/**
 * WelcomeScreen を描画する（初回のみ）
 * @param {HTMLElement} gameScreen
 */
function showWelcome(gameScreen) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'welcome');

  const welcome = new WelcomeScreen(gameScreen, () => {
    Logger.info('[App] Welcome complete, showing bookshelf');
    showBookshelf(gameScreen);
  });

  welcome.render();
  _activeScreen = welcome;

  if (Config.IS_DEBUG) {
    window.GG._screen = welcome;
  }
}

/**
 * BookshelfScreen を描画する
 * @param {HTMLElement} gameScreen           - ゲーム画面コンテナ
 * @param {string|null} [newlyClearedWorldId] - クリア直後のワールドID（アニメーション用）
 */
function showBookshelf(gameScreen, newlyClearedWorldId = null) {
  // 既存の画面を破棄
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'bookshelf');

  const bookshelf = new BookshelfScreen(
    gameScreen,
    (worldData) => {
      Logger.info(`[App] World selected: ${worldData.id} (unit: ${worldData.unitId})`);
      showQuiz(gameScreen, worldData);
    },
    newlyClearedWorldId
  );

  bookshelf.render();
  _activeScreen = bookshelf;

  if (Config.IS_DEBUG) {
    window.GG._screen = bookshelf;
  }
}

/**
 * QuizScreen を描画する
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 * @param {Object}      worldData  - 選択されたワールドデータ
 */
function showQuiz(gameScreen, worldData) {
  // 既存の画面を破棄
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'quiz');

  const quiz = new QuizScreen(gameScreen, (result) => {
    Logger.info('[App] Quiz exited:', result);

    if (result.type === 'finish') {
      const pct = Math.round(result.percentage * 100);
      Logger.info(
        `[App] Quiz complete: ${result.correctCount}/${result.total} (${pct}%)`
      );
      // ResultScreen へ遷移
      showResult(gameScreen, result, worldData);
    } else {
      // 中断 → ブックシェルフへ
      showBookshelf(gameScreen);
    }
  });

  quiz.render(worldData);
  _activeScreen = quiz;

  if (Config.IS_DEBUG) {
    window.GG._screen = quiz;
  }
}

/**
 * ResultScreen を描画する
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 * @param {Object}      quizResult - クイズ結果
 * @param {Object}      worldData  - ワールドデータ（リトライ用）
 */
function showResult(gameScreen, quizResult, worldData) {
  // 既存の画面を破棄
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'result');

  // クリアしたかどうかを判定（ブックシェルフのアニメーション用）
  const cleared = quizResult.percentage >= Config.GAME.CLEAR_THRESHOLD;
  const clearedWorldId = cleared ? quizResult.worldId || worldData.id : null;

  const result = new ResultScreen(
    gameScreen,
    { ...quizResult, worldId: worldData.id, unitId: worldData.unitId },
    // もう一度
    () => {
      Logger.info('[App] Retrying quiz:', worldData.id);
      showQuiz(gameScreen, worldData);
    },
    // ほんだなへ
    () => {
      Logger.info('[App] Back to bookshelf from result');
      showBookshelf(gameScreen, clearedWorldId);
    }
  );

  result.render();
  _activeScreen = result;

  if (Config.IS_DEBUG) {
    window.GG._screen = result;
  }
}

/**
 * HouseScreen を描画する
 * @param {HTMLElement} gameScreen
 */
function showHouse(gameScreen) {
  if (_activeScreen) {
    _activeScreen.destroy?.();
    _activeScreen = null;
  }
  if (!_houseScreen) {
    _houseScreen = new HouseScreen();
  }
  _houseScreen.show(gameScreen);
}

/**
 * HouseBuildScreen を描画する
 * @param {HTMLElement} gameScreen
 */
function showHouseBuild(gameScreen) {
  if (!_houseBuildScreen) {
    _houseBuildScreen = new HouseBuildScreen();
  }
  _houseBuildScreen.show(gameScreen);
}

/**
 * CraftsmanScreen（合成屋）を描画する
 * @param {HTMLElement} gameScreen
 */
function showCraftsman(gameScreen) {
  _houseScreen?.hide?.();
  _houseBuildScreen?.hide?.();
  if (!_craftsmanScreen) {
    _craftsmanScreen = new CraftsmanScreen();
  }
  _craftsmanScreen.show(gameScreen);
}

/**
 * エラー表示
 * @param {string} message - エラーメッセージ
 */
function showError(message) {
  const errorToast   = document.getElementById('error-toast');
  const errorMessage = document.getElementById('error-message');

  if (errorToast && errorMessage) {
    errorMessage.textContent = message;
    errorToast.classList.remove('hidden');

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

  Logger.group('🎮 Game Store');
  Logger.info(GameStore.toJSON());
  Logger.groupEnd();

  // グローバルスコープにデバッグヘルパーを追加
  window.GG = {
    Config,
    Logger,
    GameStore,
    SoundManager,
    SaveManager,

    // デバッグコマンド
    unlockAll:   () => GameStore.unlockAllWorlds(),
    resetState:  () => GameStore.reset(),
    exportState: () => GameStore.toJSON(),
    save:        () => SaveManager.save(),

    // 状態確認
    getState: (path)         => GameStore.getState(path),
    setState: (path, value)  => GameStore.setState(path, value)
  };

  Logger.info('💡 Debug helpers available via window.GG');
  Logger.info('   Example: GG.getState("player.streak")');
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
 * DOMContentLoaded 後に初期化
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
