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
    TIME_LIMIT_PER_QUESTION: 30,  // 秒

    // distractorPool 方式で出題する不正解の数（正解1 + DISTRACTOR_COUNT = 選択肢総数）
    DISTRACTOR_COUNT: 2
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
    ENABLE_SOUND: true     // Web Audio API 合成音（将来はファイルに差し替え可能）
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

    // Phase 1以降の機能
    ENABLE_HOUSE_BUILD: true,       // 家ビルドシステム（Phase 1-D）
    ENABLE_SKINS: false,
    ENABLE_MEMORY_ISLE: false,
    ENABLE_DLC: false
  },

  // 家ビルドシステム設定
  HOUSE: {
    // セクション解放に必要なクリア済みワールド数
    // ★改訂: 4→6→8→12（前半に集中して達成感を連続させる）
    SECTION_UNLOCK_WORLDS: {
      floor1:   0,   // 最初から解放
      garden:   4,   // 世界4クリア後
      exterior: 6,   // 世界6クリア後（★8→6に前倒し）
      floor2:   8,   // 世界8クリア後（★12→8に前倒し）
      floor3:   12,  // 世界12クリア後（★16→12に前倒し）
      tower:    33,  // 全ワールドクリア後
    },

    // 各セクションのスロット数（基本値）
    SECTION_SLOTS: {
      floor1_furniture:   8,
      garden_deco:        8,
      garden_monsters:    3,
      floor2_furniture:   8,
      floor3_furniture:   6,
      tower_deco:         4,
    },

    // ★マイルストーンシステム（World 12〜33の「何も起きない」を解消）
    // type: 'celebrate' | 'auto_craft' | 'slot_expand'
    MILESTONES: [
      {
        id: 'milestone_w02',
        worlds: 2,
        type: 'auto_craft',
        itemId: 'bed_wood',
        message: '職人マイスターから\nきのベッドのプレゼント！🎁',
      },
      {
        id: 'milestone_w16',
        worlds: 16,
        type: 'slot_expand',
        target: 'garden_extra',
        amount: 4,
        message: 'にわが広くなった！\nデコスロット＋4🌸',
      },
      {
        id: 'milestone_w20',
        worlds: 20,
        type: 'auto_craft',
        itemId: 'wallpaper_stars',
        message: 'ほしもようのかべがみを\nゲット！✨',
      },
      {
        id: 'milestone_w24',
        worlds: 24,
        type: 'slot_expand',
        target: 'floor1_extra',
        amount: 4,
        message: '1かいが広くなった！\nかぐスロット＋4🏠',
      },
      {
        id: 'milestone_w28',
        worlds: 28,
        type: 'auto_craft',
        itemId: 'crystal_ball',
        message: 'とうへの道が見えてきた！\nすいしょうだまをゲット✨',
      },
    ],

    // セクション解放演出時間（ms）
    SECTION_UNLOCK_ANIM_DURATION: 2000,

    // クラフトアニメ時間（ms）
    CRAFT_ANIM_DURATION: 1200,
  },

  // ─── 街のシステム（Phase 1-E） ───────────────────────────────────────
  TOWN: {
    // 施設定義レジストリ（拡張は配列末尾に追加するだけでOK）
    BUILDINGS: [
      { id: 'craftsman', name: '合成屋',    emoji: '🔨', screen: 'craftsman', unlockWorlds: 0,  isUpgradeHub: true },
      { id: 'library',   name: '魔導書庫',  emoji: '🏛️', screen: 'library',   unlockWorlds: 0  },
      { id: 'shop',      name: '商店',      emoji: '🛒', screen: 'shop',      unlockWorlds: 5  },
      { id: 'guild',     name: 'ギルド',    emoji: '⚔️', screen: 'guild',     unlockWorlds: 10 },
      { id: 'farm',      name: '魔法農場',  emoji: '🌱', screen: 'farm',      unlockWorlds: 8  },
    ],

    MAX_BUILDING_LEVEL: 5,

    // 合成屋レベルが上がると他施設の最大Lvが解放
    // 合成屋 Lv → 他施設の最大許容Lv
    HUB_UNLOCK_TABLE: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },

    // 施設アップグレードコスト（Lv n → n+1）
    UPGRADE_COSTS: {
      '1_to_2': { wood: 10, stone: 5 },
      '2_to_3': { brick: 8,  gem: 3 },
      '3_to_4': { gem: 10,  star_fragment: 5 },
      '4_to_5': { star_fragment: 5, magic_orb: 2 },
    },

    // 各施設Lvで解放されるコンテンツの説明（表示用）
    LEVEL_PERKS: {
      craftsman: {
        2: 'テイラー解放・他施設Lv2解放',
        3: '上級レシピ追加・他施設Lv3解放',
        4: '伝説レシピ追加・他施設Lv4解放',
        5: 'マスターフォージ・他施設Lv5解放',
      },
      library: {
        2: 'スペルカード解放（全ユニット）',
        3: '秘密の書斎出現',
        4: '星座マップ解放',
        5: '伝説の本・全実績表示',
      },
      shop: {
        2: 'レア在庫追加（3日ローテ）',
        3: '毎日ラッキーガチャ1回',
        4: 'まとめ取引（レート優遇）',
        5: '伝説アイテム販売',
      },
      guild: {
        2: 'ウィークリークエスト追加',
        3: 'ストーリークエスト解放',
        4: 'ボス討伐クエスト',
        5: 'ギルドランク（段位認定）',
      },
      farm: {
        2: 'プロット+2・レア収穫率UP',
        3: '温室プロット（倍速）追加',
        4: 'プロット+2・特殊種追加',
        5: '黄金プロット（確定レア）',
      },
    },

    // 商店設定
    SHOP: {
      STOCK_ROTATION_DAYS: 3,
      // day-of-week (0=日) → 無料アイテム
      DAILY_FREE: ['wood', 'stone', 'brick', 'wood', 'stone', 'brick', 'gem'],
      TRADE_RATES: [
        { give: { material: 'wood',          amount: 3 }, receive: { material: 'stone',         amount: 1 } },
        { give: { material: 'stone',         amount: 3 }, receive: { material: 'brick',         amount: 1 } },
        { give: { material: 'brick',         amount: 3 }, receive: { material: 'gem',           amount: 1 } },
        { give: { material: 'gem',           amount: 3 }, receive: { material: 'star_fragment', amount: 1 } },
        { give: { material: 'star_fragment', amount: 3 }, receive: { material: 'magic_orb',     amount: 1 } },
      ],
    },

    // 農場設定
    FARM: {
      BASE_PLOTS: 2,         // Lv1の区画数
      PLOTS_PER_LEVEL: 2,    // レベルアップごとに+2
      HARVEST_QUIZ_COUNT: 4, // クイズN問で収穫可能
      // 種 → 収穫（ボーナス確率）
      HARVEST_TABLE: {
        wood:  { gives: 'wood',          bonus: 1, rare: { material: 'stone',         chance: 0.20 } },
        stone: { gives: 'stone',         bonus: 1, rare: { material: 'brick',         chance: 0.20 } },
        brick: { gives: 'brick',         bonus: 1, rare: { material: 'gem',           chance: 0.15 } },
        gem:   { gives: 'gem',           bonus: 1, rare: { material: 'star_fragment', chance: 0.10 } },
      },
    },

    // NPCレジストリ（画像・色は統一サイズ 120×120px）
    NPCS: [
      { id: 'owl_librarian',   name: 'フクロウ先生', building: 'library',   image: 'assets/npcs/owl_librarian.png',   emoji: '🦉', color: '#7b5ea7' },
      { id: 'tanuki_merchant', name: 'タヌキ商人',   building: 'shop',      image: 'assets/npcs/tanuki_merchant.png', emoji: '🦝', color: '#b87333' },
      { id: 'guild_master',    name: 'ギルドマスター', building: 'guild',   image: 'assets/npcs/guild_master.png',    emoji: '⚔️', color: '#c0392b' },
    ],
  },
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
Object.freeze(Config.TOWN);
Object.freeze(Config.TOWN.UPGRADE_COSTS);
Object.freeze(Config.TOWN.SHOP);
Object.freeze(Config.TOWN.FARM);

export default Config;
