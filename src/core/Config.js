/**
 * Config.js - Grimoire Guardians
 * アプリケーション全体の設定値を一元管理
 * 
 * @version 1.0
 * @date 2026-02-15
 */

export const Config = {
  // アプリ情報
  APP_NAME: 'Grimoire Guardians',
  APP_VERSION: '0.1.0',
  APP_PHASE: 'Phase 0.1',
  
  // 開発/本番環境
  IS_DEVELOPMENT: true,  // TODO: 本番時はfalseに
  IS_DEBUG: true,        // TODO: 本番時はfalseに
  
  // API設定
  API: {
    BASE_URL: 'https://api.grimoire-guardians.com',
    LICENSE_ENDPOINT: '/validate',
    TIMEOUT: 10000  // 10秒
  },
  
  // ゲーム設定
  GAME: {
    // Phase 0設定
    SUBJECT: 'math',
    GRADE: 1,
    
    // クリア条件
    CLEAR_THRESHOLD: 0.6,  // 60%以上正解でクリア
    
    // 体験版設定
    FREE_WORLDS_COUNT: 3,  // 最初の3ワールドは無料
    
    // タイマー設定（オプション）
    ENABLE_TIMER: false,
    TIME_LIMIT_PER_QUESTION: 30  // 秒
  },
  
  // イベント設定
  EVENTS: {
    // レアモンスター出現率
    RARE_MONSTER_RATE: 0.05,  // 5%
    
    // ミミック出現率
    MIMIC_RATE: 0.10,  // 10%
    
    // レアな道出現率
    RARE_PATH_RATE: 0.05,  // 5%
    
    // おみくじ確率
    OMIKUJI_RATES: {
      DAIKICHI: 0.10,  // 10%
      KICHI: 0.60,     // 60%
      KYO: 0.30        // 30%
    }
  },
  
  // ドロップ設定（TODO: Phase 0完成後に調整）
  DROP: {
    // 通常問題
    NORMAL_QUESTION_DROP_RATE: 0.35,  // 35%（仮）
    
    // イベント（詳細はロードマップv1.4参照）
    EVENT_DROP_RATES: {
      NORMAL_PATH: 0.70,      // 70%
      RARE_PATH: 1.00,        // 100%（確定）
      NORMAL_MONSTER: 0.75,   // 75%
      RARE_MONSTER: 1.00,     // 100%（確定）
      TREASURE: 1.00,         // 100%（確定）
      MIMIC: 1.00             // 100%（確定）
    }
  },
  
  // UI設定
  UI: {
    // アニメーション速度
    ANIMATION_SPEED: {
      FAST: 150,     // ms
      NORMAL: 300,   // ms
      SLOW: 500      // ms
    },
    
    // トースト表示時間
    TOAST_DURATION: 3000,  // 3秒
    
    // 自動遷移時間
    AUTO_TRANSITION_DELAY: 1500,  // 1.5秒
    
    // タッチフィードバック
    ENABLE_HAPTIC: false,  // Phase 0ではモック
    ENABLE_SOUND: false    // Phase 0ではモック
  },
  
  // ストレージ設定
  STORAGE: {
    // localStorage keys
    SAVE_DATA_KEY: 'grimoire_savedata',
    SAVE_DATA_BACKUP_KEY: 'grimoire_savedata_backup',
    LICENSE_KEY: 'grimoire_license',
    
    // IndexedDB設定
    DB_NAME: 'GrimoireGuardiansDB',
    DB_VERSION: 1,
    STORES: {
      PLAYER_DATA: 'playerData',
      PROGRESS: 'progress',
      INVENTORY: 'inventory'
    }
  },
  
  // ログ設定
  LOG: {
    ENABLE_CONSOLE: true,
    ENABLE_STORAGE: false,  // TODO: エラー追跡用
    LOG_LEVEL: 'debug'  // 'debug' | 'info' | 'warn' | 'error'
  },
  
  // パフォーマンス設定
  PERFORMANCE: {
    // FPS目標
    TARGET_FPS: 60,
    
    // GPU加速
    ENABLE_GPU_ACCELERATION: true,
    
    // プリロード設定
    PRELOAD_NEXT_QUESTION: true,
    
    // 最大キャッシュサイズ
    MAX_CACHE_SIZE: 50  // MB
  },
  
  // デバッグ設定（開発時のみ）
  DEBUG: {
    // チート機能（本番では無効化）
    ENABLE_CHEATS: true,
    UNLOCK_ALL_WORLDS: false,
    SKIP_ANIMATIONS: false,
    
    // ログ詳細
    VERBOSE_LOGGING: true,
    LOG_STATE_CHANGES: true,
    LOG_API_CALLS: true
  },
  
  // フィーチャーフラグ
  FEATURES: {
    // Phase 0で有効な機能
    ENABLE_HANDWRITING: true,      // 筆記問題
    ENABLE_EVENTS: true,            // イベントシステム
    ENABLE_INVENTORY: true,         // インベントリ
    ENABLE_LICENSE: true,           // ライセンス管理
    ENABLE_DATA_MIGRATION: true,    // データ移行
    
    // Phase 1以降の機能（Phase 0では無効）
    ENABLE_HOUSE_BUILD: false,
    ENABLE_SKINS: false,
    ENABLE_MEMORY_ISLE: false,
    ENABLE_DLC: false
  }
};

// 設定値の凍結（変更を防止）
Object.freeze(Config);
Object.freeze(Config.API);
Object.freeze(Config.GAME);
Object.freeze(Config.EVENTS);
Object.freeze(Config.DROP);
Object.freeze(Config.UI);
Object.freeze(Config.STORAGE);
Object.freeze(Config.LOG);
Object.freeze(Config.PERFORMANCE);
Object.freeze(Config.DEBUG);
Object.freeze(Config.FEATURES);

export default Config;
