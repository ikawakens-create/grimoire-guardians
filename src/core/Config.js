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
  APP_VERSION: '1.0.0',
  APP_PHASE: 'Phase 1',
  
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
    ENABLE_SKINS: true,             // スキンシステム（Phase 1-F）
    ENABLE_MEMORY_ISLE: true,
    ENABLE_DLC: false,

    // Phase 2 機能
    ENABLE_GRADE2: true,      // Grade 2 深海グリモア（Phase 2）
    ENABLE_FLASH_MODE: true,  // フラッシュモード（九九専用・初回クリア後に解放）
  },

  // ─── スキンシステム（Phase 1-F） ──────────────────────────────────────
  SKIN: {
    // 宝箱からかけらが落ちる確率
    FRAGMENT_DROP_RATE: 0.15,
    // かけら N 枚で解放
    FRAGMENTS_NEEDED: 3,
    // テイラー解放に必要な合成屋レベル
    TAILOR_UNLOCK_LEVEL: 2,
  },

  // 家ビルドシステム設定
  HOUSE: {
    // ─── v3.1 解放ロードマップ ───────────────────────────────────────
    // セクション（レイヤー）解放に必要なクリア済みワールド数
    // World 7→庭、11→2階、13→装飾、19→3階、33→てっぺん
    SECTION_UNLOCK_WORLDS: {
      floor1:    0,   // 最初から解放
      garden:    7,   // 庭・土台レイヤー（World 7後）
      floor2:    11,  // 2階レイヤー（World 11後）
      exterior:  13,  // 装飾レイヤー・オーバーレイ（World 13後）
      floor3:    19,  // 3階レイヤー（World 19後）
      tower:     34,  // てっぺん（全ワールドクリア後）
    },

    // スタイル解放に必要なクリア済みワールド数（15種）
    STYLE_UNLOCK_WORLDS: {
      style_wood:    0,   // もくのいえ（初期装備）
      style_stone:   3,   // いしのいえ
      style_brick:   5,   // れんがのいえ
      style_bamboo:  9,   // たけのいえ
      style_forest:  11,  // もりのいえ
      style_ice:     15,  // こおりのいえ
      style_sakura:  17,  // さくらのいえ
      style_candy:   19,  // おかしのいえ
      style_flame:   21,  // ほのおのいえ
      style_sea:     23,  // うみのいえ
      style_black:   25,  // くろのしろ
      style_thunder: 27,  // かみなりのいえ
      style_moon:    29,  // つきのやかた
      style_jewel:   31,  // ほうせきのやかた
      style_star:    34,  // ほしのしろ（全クリ報酬）
    },

    // フルセットボーナス段階（一致レイヤー数 → 演出）
    FULLSET_BONUSES: [
      { layers: 2, effect: 'glow_small',  label: null },
      { layers: 3, effect: 'badge',       label: 'のいえ' },   // 「〇〇のいえ」バッジ
      { layers: 4, effect: 'aura_medium', label: null },
      { layers: 5, effect: 'aura_large',  label: null },
      { layers: 6, effect: 'master',      label: 'マスター！', dropBonus: true },
    ],

    // コンボ名テーブル（特定組み合わせで表示）
    COMBO_NAMES: [
      // 全フロア同一スタイル
      { match: 'all', style: 'style_wood',    name: 'もりのまほうし！' },
      { match: 'all', style: 'style_stone',   name: 'いしのまもり！' },
      { match: 'all', style: 'style_brick',   name: 'まちのけんちくし！' },
      { match: 'all', style: 'style_bamboo',  name: 'たけのせんし！' },
      { match: 'all', style: 'style_forest',  name: 'もりのぬし！' },
      { match: 'all', style: 'style_ice',     name: 'ふゆのまほうし！' },
      { match: 'all', style: 'style_sakura',  name: 'さくらのひめ！' },
      { match: 'all', style: 'style_candy',   name: 'おかしのくに！' },
      { match: 'all', style: 'style_flame',   name: 'えんおうのしろ！' },
      { match: 'all', style: 'style_sea',     name: 'うみのおう！' },
      { match: 'all', style: 'style_black',   name: 'やみのしろ！' },
      { match: 'all', style: 'style_thunder', name: 'らいじんのいかり！' },
      { match: 'all', style: 'style_moon',    name: 'つきのみこ！' },
      { match: 'all', style: 'style_jewel',   name: 'ほうせきのていおう！' },
      { match: 'all', style: 'style_star',    name: 'ほしのおう！' },
      // 特殊組み合わせ（2種混合）
      { match: 'mix', styles: ['style_flame', 'style_black'],  name: 'まおうのおしろ！' },
      { match: 'mix', styles: ['style_candy', 'style_sakura'], name: 'はるのおかしやさん！' },
      { match: 'mix', styles: ['style_ice',   'style_star'],   name: 'こおりのほし！' },
      { match: 'mix', styles: ['style_sea',   'style_moon'],   name: 'つきのうみ！' },
      { match: 'mix', styles: ['style_bamboo','style_forest'], name: 'もりのにんじゃ！' },
      // ランダムバラバラ（全部違う）
      { match: 'chaos', name: 'カオスビルダー！' },
    ],

    // 写真フレーム定義（8種）
    PHOTO_FRAMES: [
      { id: 'frame_simple', name: 'シンプル',     emoji: '⬜', color: '#ffffff', unlockAt: 'initial' },
      { id: 'frame_wood',   name: 'もくのふち',   emoji: '🌿', color: '#8B6914', unlockAt: 'style_wood' },
      { id: 'frame_ice',    name: 'こおりのふち', emoji: '❄️', color: '#74b9ff', unlockAt: 'style_ice' },
      { id: 'frame_sakura', name: 'さくらのふち', emoji: '🌸', color: '#fd79a8', unlockAt: 'style_sakura' },
      { id: 'frame_flame',  name: 'ほのおのふち', emoji: '🔥', color: '#e17055', unlockAt: 'style_flame' },
      { id: 'frame_star',   name: 'ほしのふち',   emoji: '⭐', color: '#f9ca24', unlockAt: 'style_star' },
      { id: 'frame_sea',    name: 'うみのふち',   emoji: '🌊', color: '#0984e3', unlockAt: 'style_sea' },
      { id: 'frame_moon',   name: 'つきのふち',   emoji: '🌙', color: '#6c5ce7', unlockAt: 'style_moon' },
    ],

    // スタンプ定義（15種、宝箱ドロップで増える）
    PHOTO_STAMPS: [
      '⭐', '💎', '🔮', '🪄', '🏆', '✨', '🎉', '👑',
      '🔥', '❄️', '🌸', '🍭', '⚡', '🌙', '🌊',
    ],

    // キャラポーズ定義（4種、CSSで表現）
    PHOTO_POSES: [
      { id: 'normal',  label: 'ふつう',    emoji: '😊', css: '' },
      { id: 'cool',    label: 'ドヤ！',    emoji: '🏆', css: 'pose-cool' },
      { id: 'banzai',  label: 'バンザイ！', emoji: '🙌', css: 'pose-banzai' },
      { id: 'bow',     label: 'おじぎ',    emoji: '🙇', css: 'pose-bow' },
    ],

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
      { id: 'craftsman',  name: '合成屋',    emoji: '🔨', screen: 'craftsman',  unlockWorlds: 0,  isUpgradeHub: true },
      { id: 'library',    name: '魔導書庫',  emoji: '🏛️', screen: 'library',    unlockWorlds: 0  },
      { id: 'house_build',name: 'いえをつくる', emoji: '🏠', screen: 'house_build', unlockWorlds: 0  },
      { id: 'house',      name: 'マイハウス', emoji: '🏡', screen: 'house',      unlockWorlds: 0  },
      { id: 'shop',       name: '商店',      emoji: '🛒', screen: 'shop',       unlockWorlds: 5  },
      { id: 'guild',      name: 'ギルド',    emoji: '⚔️', screen: 'guild',      unlockWorlds: 10 },
      { id: 'farm',       name: '魔法農場',  emoji: '🌱', screen: 'farm',       unlockWorlds: 8  },
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

  // ─── Grade 2 深海グリモア設定（Phase 2） ──────────────────────────────
  GRADE2: {
    TOTAL_WORLDS: 42,

    // ゾーン定義（Zone 1〜5）
    // unlockWorlds = Grade 2 内での累計クリア数
    ZONES: [
      { id: 'zone1', name: '浅瀬',     emoji: '🏖️', worldCount: 7,  unlockWorlds: 0,  description: '筆算の世界' },
      { id: 'zone2', name: 'サンゴ礁', emoji: '🪸', worldCount: 9,  unlockWorlds: 7,  description: '数・量・時刻の世界' },
      { id: 'zone3', name: '外洋',     emoji: '🌊', worldCount: 11, unlockWorlds: 16, description: '九九の世界' },
      { id: 'zone4', name: '深海',     emoji: '🌑', worldCount: 11, unlockWorlds: 27, description: '図形・大きな数の世界' },
      { id: 'zone5', name: '海底都市', emoji: '🏛️', worldCount: 4,  unlockWorlds: 38, description: '総復習・フィナーレ' },
    ],

    // 船のサイズ定義（成長ロードマップ）
    SHIP_SIZES: [
      { id: 'small',  name: '小型船',   emoji: '⛵',  unlockAt: null,    description: '出発のふね' },
      { id: 'medium', name: '中型船',   emoji: '🚢',  unlockAt: 'zone2', description: 'Zone 2 クリア後にストーリーでGET' },
      { id: 'large',  name: '大型船艦', emoji: '🛳️', unlockAt: 'zone3', description: 'Zone 3 クリア後に設計図GET → クラフトで完成' },
    ],

    // 大型船艦クラフトコスト（Zone 3後に設計図GET・Zone 4中に素材収集）
    LARGE_SHIP_CRAFT_COST: { pearl: 5, coral: 5, anchor: 3, deepstone: 2 },

    // 船パーツ定義（ShipBuildScreen の6部位）
    SHIP_PARTS: [
      { id: 'hull',       name: 'ふねのほんたい', emoji: '🛥️' },
      { id: 'sail',       name: 'ほ',            emoji: '🎌' },
      { id: 'figurehead', name: 'へさきかざり',   emoji: '🐬' },
      { id: 'flag',       name: 'はた',           emoji: '🚩' },
      { id: 'deck',       name: 'うえのかざり',   emoji: '⚓' },
      { id: 'glow',       name: 'そこびかり',     emoji: '✨' },
    ],

    // フラッシュモード設定（九九専用：m2_10a〜m2_10i）
    FLASH_MODE: {
      ENABLED_WORLD_IDS: ['m2_10a','m2_10b','m2_10c','m2_10d','m2_10e','m2_10f','m2_10g','m2_10h','m2_10i'],
      UNLOCK_CONDITION: 'first_clear', // 初回クリア後解放
      TIME_LIMIT_PER_QUESTION: 5,      // 秒
      QUESTION_COUNT: 9,               // 九九は全9問固定出題
    },

    // 船の名前 最大文字数
    SHIP_NAME_MAX_LENGTH: 12,

    // テーマセット定義（3パーツ揃うと演出発火）
    THEME_SETS: [
      {
        id:     'pirate',
        name:   'かいぞくセット',
        emoji:  '🏴‍☠️',
        parts:  ['hull_pirate', 'sail_skull', 'flag_jolly'],
        effect: 'theme-pirate',
      },
      {
        id:     'mermaid',
        name:   'にんぎょセット',
        emoji:  '🧜',
        parts:  ['hull_pearl', 'sail_wave', 'figurehead_mermaid'],
        effect: 'theme-mermaid',
      },
      {
        id:     'storm',
        name:   'あらしセット',
        emoji:  '⛈️',
        parts:  ['hull_thunder', 'sail_dark', 'flag_storm'],
        effect: 'theme-storm',
      },
      {
        id:     'coral',
        name:   'さんごセット',
        emoji:  '🪸',
        parts:  ['hull_coral', 'sail_fan', 'figurehead_crab'],
        effect: 'theme-coral',
      },
    ],

    // Grade 2 新素材
    NEW_MATERIALS: ['pearl', 'coral', 'seaglass', 'anchor', 'deepstone'],

    // Grade 2 NPC（npcs/g2/ サブディレクトリに配置）
    NPCS: [
      { id: 'captain_takuzo',  name: '船長タコぞう',       emoji: '🐙', role: 'guide', image: 'assets/npcs/g2/captain_takuzo.png'   },
      { id: 'mermaid_lina',    name: '人魚の算術士リーナ', emoji: '🧜', role: 'kuku',  image: 'assets/npcs/g2/mermaid_lina.png'     },
      { id: 'coral_daiku',     name: 'サンゴの大工さん',   emoji: '🪸', role: 'shape', image: 'assets/npcs/g2/coral_daiku.png'      },
      { id: 'lighthouse_ojii', name: '灯台守のおじいさん', emoji: '🏠', role: 'time',  image: 'assets/npcs/g2/lighthouse_ojii.png'  },
      { id: 'sea_sage',        name: '海の賢者',            emoji: '🧙', role: 'story', image: 'assets/npcs/g2/sea_sage.png'         },
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
Object.freeze(Config.HOUSE);
Object.freeze(Config.HOUSE.SECTION_UNLOCK_WORLDS);
Object.freeze(Config.HOUSE.STYLE_UNLOCK_WORLDS);
Object.freeze(Config.TOWN);
Object.freeze(Config.TOWN.UPGRADE_COSTS);
Object.freeze(Config.TOWN.SHOP);
Object.freeze(Config.TOWN.FARM);
Object.freeze(Config.SKIN);
Object.freeze(Config.GRADE2);
Object.freeze(Config.GRADE2.FLASH_MODE);
Object.freeze(Config.GRADE2.LARGE_SHIP_CRAFT_COST);
Object.freeze(Config.GRADE2.THEME_SETS);

export default Config;
