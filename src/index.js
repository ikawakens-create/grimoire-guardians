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
import { SoundManager, SoundType } from './core/SoundManager.js';
import { SaveManager } from './core/SaveManager.js';
import EventManager from './core/EventManager.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import BookshelfScreen from './screens/BookshelfScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import ResultScreen from './screens/ResultScreen.js';
import { HouseScreen } from './screens/HouseScreen.js';
import { HouseBuildScreen } from './screens/HouseBuildScreen.js';
import { PhotoScreen } from './screens/PhotoScreen.js';
import { CraftsmanScreen } from './screens/CraftsmanScreen.js';
import { TownScreen } from './screens/TownScreen.js';
import { GrimoireLibraryScreen } from './screens/GrimoireLibraryScreen.js';
import { ShopScreen } from './screens/ShopScreen.js';
import { GuildScreen } from './screens/GuildScreen.js';
import { FarmScreen } from './screens/FarmScreen.js';
import { ShipBuildScreen } from './screens/ShipBuildScreen.js';
import InventoryScreen from './screens/InventoryScreen.js';
import UnitIntroScreen from './screens/UnitIntroScreen.js';
import ChantScreen from './screens/ChantScreen.js';
import FinalBattleScreen from './screens/FinalBattleScreen.js';
import { TownManager } from './core/TownManager.js';
import { SkinManager } from './core/SkinManager.js';
import MultiTableScreen from './screens/MultiTableScreen.js';
import MemorizeScreen from './screens/MemorizeScreen.js';
import SequentialPracticeScreen from './screens/SequentialPracticeScreen.js';
import { ParentDashboardScreen } from './screens/ParentDashboardScreen.js';
import WardrobeScreen from './screens/WardrobeScreen.js';
import { WORLDS } from './data/worlds.js';

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

    // 4.5. スキン解放チェック（ログイン時）
    if (Config.FEATURES.ENABLE_SKINS) {
      const streakUnlocked = SkinManager.checkStreakUnlocks();
      if (streakUnlocked.length) {
        Logger.info('[Init] Streak skins unlocked:', streakUnlocked);
        // 画面表示後に通知（遅延して表示）
        setTimeout(() => showSkinUnlocked(streakUnlocked), 1200);
      }
    }

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

/** Show/Hide パターンの画面インスタンスを一元管理（名前 → インスタンス） */
const _persistentScreens = new Map();
/** インベントリはモーダル（open/close）のため個別管理 */
let _inventoryScreen = null;

/**
 * ミュートボタンを初期化する（クリックハンドラ登録・初期状態反映）
 */
function _initMuteButton() {
  const btn = document.getElementById('mute-btn');
  if (!btn) return;

  // 初期状態を反映
  const _updateBtn = () => {
    const muted = GameStore.getState('sound.isMuted');
    btn.textContent = muted ? '🔇' : '🔊';
    btn.classList.toggle('is-muted', muted);
  };
  _updateBtn();

  // クリックでトグル
  btn.addEventListener('click', () => {
    SoundManager.setMuted(!SoundManager.isMuted);
    _updateBtn();
    // SE は setMuted(false) のときのみ鳴らす
    if (!SoundManager.isMuted) SoundManager.playSFX(SoundType.BUTTON_CLICK);
  });
}

/**
 * ゲーム画面を表示する
 * 初回プレイヤー（createdAt === null）は WelcomeScreen を表示する
 */
function showGameScreen() {
  const gameScreen = document.getElementById('game-screen');
  if (!gameScreen) return;

  gameScreen.classList.remove('hidden');

  // ミュートボタンの初期化
  _initMuteButton();

  // 初回起動かどうかを確認（セーブデータがなければ名前入力画面へ）
  const createdAt = GameStore.getState('player.createdAt');
  if (!createdAt) {
    showWelcome(gameScreen);
  } else {
    showBookshelf(gameScreen);
  }

  // グローバルルーター（家・街システム）
  // notifyObservers は observer(path, newValue, oldValue) で呼ぶため第1引数が path
  GameStore.subscribe((path, newValue) => {
    if (path !== 'app.currentScreen') return;
    const screen = newValue;
    SoundManager.playSFX(SoundType.SCREEN_TRANSITION);

    // 全サブ画面を隠すヘルパー
    const hideAll = () => {
      for (const screen of _persistentScreens.values()) screen?.hide?.();
      _inventoryScreen?.close?.();
      _inventoryScreen = null;
    };

    if (screen === 'house') {
      hideAll();
      showHouse(gameScreen);
    } else if (screen === 'photo') {
      hideAll();
      showPhoto(gameScreen);
    } else if (screen === 'house_build') {
      hideAll();
      showHouseBuild(gameScreen);
    } else if (screen === 'craftsman') {
      hideAll();
      showCraftsman(gameScreen);
    } else if (screen === 'town') {
      hideAll();
      showTown(gameScreen);
    } else if (screen === 'library') {
      hideAll();
      showLibrary(gameScreen);
    } else if (screen === 'shop') {
      hideAll();
      showShop(gameScreen);
    } else if (screen === 'guild') {
      hideAll();
      showGuild(gameScreen);
    } else if (screen === 'farm') {
      hideAll();
      showFarm(gameScreen);
    } else if (screen === 'ship_build') {
      hideAll();
      showShipBuild(gameScreen);
    } else if (screen === 'inventory') {
      // インベントリはモーダルオーバーレイ — hideAll() しない
      _inventoryScreen = new InventoryScreen(() => {
        _inventoryScreen = null;
        GameStore.setState('app.currentScreen', 'bookshelf');
      });
      _inventoryScreen.open();
    } else if (screen === 'final_battle') {
      hideAll();
      showFinalBattle(gameScreen);
    } else if (screen === 'parent_dashboard') {
      hideAll();
      showParentDashboard(gameScreen);
    } else if (screen === 'wardrobe') {
      hideAll();
      showWardrobe(gameScreen);
    } else if (screen === 'bookshelf') {
      hideAll();
      // まち等のサブ画面から戻ってきた場合はブックシェルフを再描画
      if (!_activeScreen) {
        showBookshelf(gameScreen);
      }
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

  const bookshelf = new BookshelfScreen(
    gameScreen,
    (worldData) => {
      Logger.info(`[App] World selected: ${worldData.id} (unit: ${worldData.unitId})`);
      showUnitIntro(gameScreen, worldData);
    },
    newlyClearedWorldId
  );

  bookshelf.render();
  _activeScreen = bookshelf;
  // _activeScreen をセットしてからサブスクライバーを発火させることで二重描画を防ぐ
  GameStore.setState('app.currentScreen', 'bookshelf');

  if (Config.IS_DEBUG) {
    window.GG._screen = bookshelf;
  }
}

/**
 * WardrobeScreen を描画する（きがえや）
 * @param {HTMLElement} gameScreen
 */
function showWardrobe(gameScreen) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  const wardrobe = new WardrobeScreen(gameScreen, () => {
    showBookshelf(gameScreen);
  });

  wardrobe.render();
  _activeScreen = wardrobe;

  if (Config.IS_DEBUG) {
    window.GG._screen = wardrobe;
  }
}

/**
 * UnitIntroScreen を描画する（本棚 → クイズ の間）
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 * @param {Object}      worldData  - 選択されたワールドデータ
 */
function showUnitIntro(gameScreen, worldData) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'unit_intro');

  // 九九ワールドかどうか判定
  const isKuku = Config.GRADE2.FLASH_MODE.ENABLED_WORLD_IDS.includes(worldData.id);

  const intro = new UnitIntroScreen(
    gameScreen,
    worldData.id,
    // はじめる！
    () => {
      Logger.info('[App] UnitIntro start:', worldData.id);
      if (isKuku) {
        showMultiTable(gameScreen, worldData);
      } else {
        showQuiz(gameScreen, worldData);
      }
    },
    // もどる
    () => {
      Logger.info('[App] UnitIntro back to bookshelf');
      showBookshelf(gameScreen);
    },
    // フラッシュモード（九九ワールドのみ、初クリア後に表示）
    () => {
      Logger.info('[App] UnitIntro flash mode:', worldData.id);
      showChant(gameScreen, worldData);
    }
  );

  intro.render();
  _activeScreen = intro;

  if (Config.IS_DEBUG) {
    window.GG._screen = intro;
  }
}

/**
 * ChantScreen（九九フラッシュモード）を描画する
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 * @param {Object}      worldData  - 選択されたワールドデータ
 */
function showChant(gameScreen, worldData) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'chant');

  const chant = new ChantScreen(gameScreen, worldData, (result) => {
    Logger.info('[App] ChantScreen exited:', result);
    // 終了（finish/abort どちらも本棚へ）
    showBookshelf(gameScreen);
  });

  chant.render();
  _activeScreen = chant;

  if (Config.IS_DEBUG) {
    window.GG._screen = chant;
  }
}

/**
 * MultiTableScreen（九九全体表）を描画する
 * @param {HTMLElement} gameScreen
 * @param {Object}      worldData
 */
function showMultiTable(gameScreen, worldData) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'multi_table');

  const screen = new MultiTableScreen(
    gameScreen,
    worldData,
    // つぎへ → MemorizeScreen
    () => {
      Logger.info('[App] MultiTable → Memorize:', worldData.id);
      showMemorize(gameScreen, worldData);
    },
    // スキップ → QuizScreen
    () => {
      Logger.info('[App] MultiTable skipped → Quiz:', worldData.id);
      showQuiz(gameScreen, worldData);
    }
  );

  screen.render();
  _activeScreen = screen;

  if (Config.IS_DEBUG) {
    window.GG._screen = screen;
  }
}

/**
 * MemorizeScreen（フラッシュカード確認）を描画する
 * @param {HTMLElement} gameScreen
 * @param {Object}      worldData
 */
function showMemorize(gameScreen, worldData) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'memorize');

  const screen = new MemorizeScreen(
    gameScreen,
    worldData,
    // クイズにちょうせん！ → SequentialPracticeScreen
    () => {
      Logger.info('[App] Memorize → SequentialPractice:', worldData.id);
      showSequentialPractice(gameScreen, worldData);
    },
    // スキップ → QuizScreen
    () => {
      Logger.info('[App] Memorize skipped → Quiz:', worldData.id);
      showQuiz(gameScreen, worldData);
    }
  );

  screen.render();
  _activeScreen = screen;

  if (Config.IS_DEBUG) {
    window.GG._screen = screen;
  }
}

/**
 * SequentialPracticeScreen（じゅんばん練習）を描画する
 * @param {HTMLElement} gameScreen
 * @param {Object}      worldData
 */
function showSequentialPractice(gameScreen, worldData) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  GameStore.setState('app.currentScreen', 'sequential_practice');

  const screen = new SequentialPracticeScreen(
    gameScreen,
    worldData,
    // 本番クイズへ！ → QuizScreen
    () => {
      Logger.info('[App] SequentialPractice → Quiz:', worldData.id);
      showQuiz(gameScreen, worldData);
    },
    // スキップ → QuizScreen
    () => {
      Logger.info('[App] SequentialPractice skipped → Quiz:', worldData.id);
      showQuiz(gameScreen, worldData);
    }
  );

  screen.render();
  _activeScreen = screen;

  if (Config.IS_DEBUG) {
    window.GG._screen = screen;
  }
}

/**
 * FinalBattleScreen を描画する（全ワールドクリア後の最終決戦）
 * @param {HTMLElement} gameScreen - ゲーム画面コンテナ
 */
function showFinalBattle(gameScreen) {
  if (_activeScreen) {
    _activeScreen.destroy();
    _activeScreen = null;
  }

  // ※ app.currentScreen は呼び出し元（購読者 or ドアクリック）がすでに設定済みのため
  //   ここで再度 setState しない（再設定すると購読者が再発火して無限再帰になる）

  const battle = new FinalBattleScreen(
    gameScreen,
    // 完了（correctCount を受け取る）
    (correctCount) => {
      Logger.info(`[App] FinalBattle complete: ${correctCount}/30 correct`);
      showBookshelf(gameScreen);
    },
    // もどる（途中断念）
    () => {
      Logger.info('[App] FinalBattle aborted');
      showBookshelf(gameScreen);
    }
  );

  battle.render();
  _activeScreen = battle;

  if (Config.IS_DEBUG) {
    window.GG._screen = battle;
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

  // 注: 農場カウンタ・家解放・スキン解放は ResultScreen._persistResult() で処理する

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
 * Show/Hide パターンの画面を表示する汎用ヘルパー
 * インスタンスが未生成なら生成して _persistentScreens に保存し、show() を呼ぶ
 * @param {string}      name        - 画面識別キー
 * @param {Function}    ScreenClass - 画面クラス
 * @param {HTMLElement} container   - ゲーム画面コンテナ
 */
function _showPersistent(name, ScreenClass, container) {
  if (_activeScreen) { _activeScreen.destroy?.(); _activeScreen = null; }
  if (!_persistentScreens.has(name)) _persistentScreens.set(name, new ScreenClass());
  _persistentScreens.get(name).show(container);
}

/** HouseScreen（マイハウス）を描画する */
function showHouse(gameScreen)        { _showPersistent('house',            HouseScreen,           gameScreen); }
/** PhotoScreen（写真館）を描画する */
function showPhoto(gameScreen)        { _showPersistent('photo',            PhotoScreen,           gameScreen); }
/** HouseBuildScreen（家エディター）を描画する */
function showHouseBuild(gameScreen)   { _showPersistent('house_build',      HouseBuildScreen,      gameScreen); }
/** CraftsmanScreen（合成屋）を描画する */
function showCraftsman(gameScreen)    { _showPersistent('craftsman',        CraftsmanScreen,       gameScreen); }
/** TownScreen（街ハブ）を描画する */
function showTown(gameScreen)         { _showPersistent('town',             TownScreen,            gameScreen); }
/** GrimoireLibraryScreen（魔導書庫）を描画する */
function showLibrary(gameScreen)      { _showPersistent('library',          GrimoireLibraryScreen, gameScreen); }
/** ShopScreen（商店）を描画する */
function showShop(gameScreen)         { _showPersistent('shop',             ShopScreen,            gameScreen); }
/** GuildScreen（ギルド）を描画する */
function showGuild(gameScreen)        { _showPersistent('guild',            GuildScreen,           gameScreen); }
/** FarmScreen（魔法農場）を描画する */
function showFarm(gameScreen)         { _showPersistent('farm',             FarmScreen,            gameScreen); }
/** ShipBuildScreen（船カスタマイズ）を描画する */
function showShipBuild(gameScreen)    { _showPersistent('ship_build',       ShipBuildScreen,       gameScreen); }
/** ParentDashboardScreen（保護者ダッシュボード）を描画する */
function showParentDashboard(gameScreen) { _showPersistent('parent_dashboard', ParentDashboardScreen, gameScreen); }

/**
 * スキン解放通知をトーストで表示する
 * 複数ある場合は順番に表示（1.5秒間隔）
 * @param {string[]} skinIds - 新しく解放されたスキンIDの配列
 */
function showSkinUnlocked(skinIds) {
  const toast   = document.getElementById('skin-toast');
  const message = document.getElementById('skin-toast-message');
  if (!toast || !message) return;

  const allSkins = SkinManager.getAllSkins();
  let delay = 0;

  for (const id of skinIds) {
    const skin = allSkins.find(s => s.id === id);
    if (!skin) continue;

    setTimeout(() => {
      message.textContent = `${skin.emoji} あたらしいスキン「${skin.name}」がかいほうされたよ！`;
      toast.classList.remove('hidden');
      clearTimeout(toast._hideTimer);
      toast._hideTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
    }, delay);

    delay += 1500;
  }
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
    resetState: () => {
      // npc_met_* と phase_complete_shown を localStorage からクリア
      Object.keys(localStorage)
        .filter(k => k.startsWith('npc_met_') || k === 'phase_complete_shown')
        .forEach(k => localStorage.removeItem(k));
      GameStore.reset();
    },
    exportState: () => GameStore.toJSON(),
    save:        () => SaveManager.save(),

    // 状態確認
    getState: (path)         => GameStore.getState(path),
    setState: (path, value)  => GameStore.setState(path, value)
  };

  Logger.info('💡 Debug helpers available via window.GG');
  Logger.info('   Example: GG.getState("player.streak")');

  // デバッグオーバーレイ（Antigavity テスト用）
  _initDebugOverlay();
}

/**
 * デバッグオーバーレイを初期化する（ENABLE_CHEATS が true のときのみ）
 * Antigavity 自動テストプレイ用
 */
function _initDebugOverlay() {
  if (!Config.DEBUG.ENABLE_CHEATS) return;

  // ── ヘルパー ─────────────────────────────────────────────────────
  const _gs  = () => document.getElementById('game-screen');
  const _btn = (label, onClick) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dbg-btn';
    b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  };
  const _row = (...children) => {
    const r = document.createElement('div');
    r.className = 'dbg-row';
    children.forEach(c => r.appendChild(c));
    return r;
  };
  const _sectionHdr = (text) => {
    const d = document.createElement('div');
    d.className = 'dbg-section-hdr';
    d.textContent = text;
    return d;
  };

  // ── 名前とcreatedAtが未設定なら補完するヘルパー ────────────────────
  const _ensurePlayer = () => {
    if (!GameStore.getState('player.name'))      GameStore.setState('player.name', 'テスト');
    if (!GameStore.getState('player.createdAt')) GameStore.setState('player.createdAt', Date.now());
  };

  // ── DOM 構築 ──────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'debug-overlay';
  overlay.className = 'debug-overlay';

  // ヘッダー（タップで折りたたみ）
  const hdr = document.createElement('div');
  hdr.className = 'dbg-header';
  hdr.innerHTML = '🔧 DEBUG <span id="dbg-toggle">▲</span>';
  overlay.appendChild(hdr);

  const body = document.createElement('div');
  body.id = 'dbg-body';
  overlay.appendChild(body);

  hdr.addEventListener('click', () => {
    const collapsed = body.style.display === 'none';
    body.style.display = collapsed ? '' : 'none';
    document.getElementById('dbg-toggle').textContent = collapsed ? '▲' : '▼';
  });

  // 現在画面名（リアルタイム更新）
  const screenLabel = document.createElement('div');
  screenLabel.className = 'dbg-screen-label';
  const _updateLabel = (s) => { screenLabel.textContent = `📺 ${s || '---'}`; };
  _updateLabel(GameStore.getState('app.currentScreen'));
  GameStore.subscribe((path, newValue) => {
    if (path === 'app.currentScreen') _updateLabel(newValue);
  });
  body.appendChild(screenLabel);

  // ── 【進行】セクション ────────────────────────────────────────────
  body.appendChild(_sectionHdr('【進行】'));

  // 全解放：全ワールド・ライセンス・素材を一括解放して本棚へ
  body.appendChild(_btn('🔓 全解放', () => {
    GameStore.unlockAllWorlds();
    // 全ワールドをクリア済みにして段階表示制限を解除
    const wp = {};
    WORLDS.forEach(w => {
      const existing = GameStore.getState(`progress.worlds.${w.id}`) || {};
      wp[w.id] = { ...existing, cleared: true, stars: existing.stars ?? 3 };
    });
    GameStore.setState('progress.worlds', wp);
    _ensurePlayer();
    showBookshelf(_gs());
  }));

  // 制限解除：ライセンスのみ通してストーリー順に進められるモード
  body.appendChild(_btn('🔑 制限解除', () => {
    GameStore.setState('license.core.licensed', true);
    _ensurePlayer();
    showBookshelf(_gs());
  }));

  // 名前スキップ：ウェルカム画面をバイパスして本棚へ
  body.appendChild(_btn('👤 名前スキップ', () => {
    _ensurePlayer();
    showBookshelf(_gs());
  }));

  // リセット：全データをリセットしてウェルカム画面へ
  body.appendChild(_btn('🔄 リセット', () => {
    // npc_met_* と phase_complete_shown を localStorage からクリア
    Object.keys(localStorage)
      .filter(k => k.startsWith('npc_met_') || k === 'phase_complete_shown')
      .forEach(k => localStorage.removeItem(k));
    GameStore.reset();
    if (_activeScreen) { _activeScreen.destroy?.(); _activeScreen = null; }
    // 永続スクリーン（街・家など）も非表示にする
    for (const s of _persistentScreens.values()) s?.hide?.();
    showWelcome(_gs());
  }));

  // ── 【ツール】セクション ──────────────────────────────────────────
  body.appendChild(_sectionHdr('【ツール】'));

  // アニメーションOFF：body クラス切り替えで CSS アニメを 0ms に
  let _animOff = false;
  const btnAnim = _btn('⏩ アニメOFF', () => {
    _animOff = !_animOff;
    document.body.classList.toggle('debug-skip-animations', _animOff);
    btnAnim.textContent  = _animOff ? '⏩ アニメOFF ✓' : '⏩ アニメOFF';
    btnAnim.classList.toggle('dbg-btn-active', _animOff);
  });
  body.appendChild(btnAnim);

  // サウンドOFF：SoundManager.setMuted() でトグル
  const btnSound = _btn('🔇 サウンドOFF', () => {
    const muted = !SoundManager.isMuted;
    SoundManager.setMuted(muted);
    btnSound.textContent = muted ? '🔇 サウンドOFF ✓' : '🔇 サウンドOFF';
    btnSound.classList.toggle('dbg-btn-active', muted);
  });
  body.appendChild(btnSound);

  // セーブ出力：コンソール出力 + クリップボードコピー
  body.appendChild(_btn('💾 セーブ出力', () => {
    const json = GameStore.toJSON();
    console.log('[DEBUG] Save Data:\n', json);
    navigator.clipboard?.writeText(json).catch(() => {});
  }));

  // ── 【直接操作】セクション ────────────────────────────────────────
  body.appendChild(_sectionHdr('【直接操作】'));

  // ワールドジャンプ：セレクトで選んだワールドの unit_intro へ直接ジャンプ
  const worldSelect = document.createElement('select');
  worldSelect.className = 'dbg-select';
  WORLDS.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    opt.textContent = `${w.id}`;
    worldSelect.appendChild(opt);
  });
  body.appendChild(_row(
    worldSelect,
    _btn('🎯GO', () => {
      const world = WORLDS.find(w => w.id === worldSelect.value);
      if (!world) return;
      _ensurePlayer();
      // unit_intro は subscriber で hideAll() が呼ばれないため明示的に隠す
      for (const s of _persistentScreens.values()) s?.hide?.();
      showUnitIntro(_gs(), world);
    })
  ));

  // イベント強制発動：クイズ外からイベント演出を直接起動
  const eventSelect = document.createElement('select');
  eventSelect.className = 'dbg-select';
  [['monster', 'モンスター'], ['treasure', '宝箱'], ['omikuji', 'おみくじ'], ['three_paths', '3つの道']]
    .forEach(([val, label]) => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = label;
      eventSelect.appendChild(opt);
    });
  body.appendChild(_row(
    eventSelect,
    _btn('⚡GO', async () => {
      const layer = EventManager.getLayer();
      if (!layer) { Logger.warn('[DEBUG] イベントレイヤーが見つかりません'); return; }
      const type = eventSelect.value;
      if (type === 'monster') {
        const { default: M } = await import('./events/MonsterBattleEvent.js');
        await M.play(layer);
      } else if (type === 'treasure') {
        const { default: T } = await import('./events/TreasureEvent.js');
        await T.play(layer);
      } else if (type === 'omikuji') {
        const { default: O } = await import('./events/OmikujiEvent.js');
        await O.play(layer);
      } else if (type === 'three_paths') {
        const { default: P } = await import('./events/ThreePathsEvent.js');
        await P.play(layer);
      }
    })
  ));

  // ストリーク数セット：任意の連続正解数を直接セット
  const streakInput = document.createElement('input');
  streakInput.type        = 'number';
  streakInput.className   = 'dbg-input';
  streakInput.min         = '0';
  streakInput.max         = '999';
  streakInput.placeholder = 'streak';
  streakInput.value       = String(GameStore.getState('player.streak') || 0);
  body.appendChild(_row(
    streakInput,
    _btn('🔥SET', () => {
      const val = parseInt(streakInput.value, 10);
      if (!isNaN(val) && val >= 0) GameStore.setState('player.streak', val);
    })
  ));

  // ── DOM に追加 ────────────────────────────────────────────────────
  document.body.appendChild(overlay);
  Logger.info('[DEBUG] デバッグオーバーレイを初期化しました');
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
