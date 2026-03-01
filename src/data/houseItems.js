/**
 * houseItems.js - Grimoire Guardians
 * 家ビルドシステム アイテムカタログ
 * 全アイテムの定義（レシピ・画像パス・レアリティ・解放条件）
 *
 * @version 1.0
 * @date 2026-02-26
 */

// ─────────────────────────────────────────────
// レアリティ定数
// ─────────────────────────────────────────────
export const RARITY = {
  COMMON:     'common',
  UNCOMMON:   'uncommon',
  RARE:       'rare',
  SUPER_RARE: 'super_rare',
};

// ─────────────────────────────────────────────
// セクションID定数
// ─────────────────────────────────────────────
export const HOUSE_SECTION = {
  FLOOR1:   'floor1',
  GARDEN:   'garden',
  EXTERIOR: 'exterior',
  FLOOR2:   'floor2',
  FLOOR3:   'floor3',
  TOWER:    'tower',
};

// ─────────────────────────────────────────────
// 各セクションのワールド解放条件
// ─────────────────────────────────────────────
export const SECTION_UNLOCK_CONDITIONS = {
  floor1:   { clearedWorlds: 0  },  // 最初から
  garden:   { clearedWorlds: 4  },  // 世界4クリア後
  exterior: { clearedWorlds: 8  },  // 世界8クリア後
  floor2:   { clearedWorlds: 12 },  // 世界12クリア後
  floor3:   { clearedWorlds: 16 },  // 世界16クリア後
  tower:    { clearedWorlds: 33 },  // 全ワールドクリア後
};

// ─────────────────────────────────────────────
// 外観プリセット（家の全景画像）
// ─────────────────────────────────────────────
// 画像は assets/house/stages/ に格納
// Geminiで生成した完成品イラスト（640×480px）を使用
export const EXTERIOR_STYLES = [
  {
    id: 'default',
    name: 'テント',
    nameKana: 'てんと',
    image: 'assets/house/stages/house_default.png',
    imageFallback: '🏕️',
    recipe: null,  // デフォルト・無料
    rarity: RARITY.COMMON,
    requiresSection: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'house_wood_natural',
    name: 'もくのいえ（しぜん）',
    nameKana: 'もくのいえ',
    image: 'assets/house/stages/house_wood_natural.png',
    imageFallback: '🏠',
    recipe: { wood: 5 },
    rarity: RARITY.COMMON,
    requiresSection: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'house_wood_painted',
    name: 'もくのいえ（いろえ）',
    nameKana: 'いろえのいえ',
    image: 'assets/house/stages/house_wood_painted.png',
    imageFallback: '🏡',
    recipe: { wood: 5, paint: 2 },
    rarity: RARITY.COMMON,
    requiresSection: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'house_stone',
    name: 'いしのいえ',
    nameKana: 'いしのいえ',
    image: 'assets/house/stages/house_stone.png',
    imageFallback: '🏚️',
    recipe: { stone: 8, wood: 3 },
    rarity: RARITY.UNCOMMON,
    requiresSection: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'house_brick',
    name: 'れんがのいえ',
    nameKana: 'れんがのいえ',
    image: 'assets/house/stages/house_brick.png',
    imageFallback: '🏘️',
    recipe: { brick: 8, stone: 5 },
    rarity: RARITY.UNCOMMON,
    requiresSection: HOUSE_SECTION.EXTERIOR,
  },
  {
    id: 'house_gem',
    name: 'ほうせきのやかた',
    nameKana: 'ほうせきのやかた',
    image: 'assets/house/stages/house_gem.png',
    imageFallback: '💎',
    recipe: { gem: 5, brick: 5 },
    rarity: RARITY.RARE,
    requiresSection: HOUSE_SECTION.EXTERIOR,
  },
  {
    id: 'house_star',
    name: 'ほしのしろ',
    nameKana: 'ほしのしろ',
    image: 'assets/house/stages/house_star.png',
    imageFallback: '🌟',
    recipe: { star_fragment: 3, gem: 3 },
    rarity: RARITY.SUPER_RARE,
    requiresSection: HOUSE_SECTION.FLOOR3,
  },
];

// ─────────────────────────────────────────────
// 壁紙アイテム
// ─────────────────────────────────────────────
export const WALLPAPER_ITEMS = [
  {
    id: 'wallpaper_default',
    name: 'しろかべ',
    nameKana: 'しろかべ',
    image: null,  // CSSのデフォルト白
    imageFallback: '⬜',
    recipe: null,
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'wallpaper_stripes',
    name: 'しましまかべ',
    nameKana: 'しましまかべ',
    image: 'assets/house/interior/wallpapers/wallpaper_stripes.png',
    imageFallback: '🟦',
    recipe: { cloth: 4 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'wallpaper_floral',
    name: 'はなもようかべ',
    nameKana: 'はなもようかべ',
    image: 'assets/house/interior/wallpapers/wallpaper_floral.png',
    imageFallback: '🌸',
    recipe: { cloth: 3, paint: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'wallpaper_plaid',
    name: 'チェックかべ',
    nameKana: 'ちぇっくかべ',
    image: 'assets/house/interior/wallpapers/wallpaper_plaid.png',
    imageFallback: '🟥',
    recipe: { cloth: 4, paint: 1 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'wallpaper_stars',
    name: 'ほしもようかべ',
    nameKana: 'ほしもようかべ',
    image: 'assets/house/interior/wallpapers/wallpaper_stars.png',
    imageFallback: '⭐',
    recipe: { cloth: 3, gem: 1 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'wallpaper_magic',
    name: 'まほうもようかべ',
    nameKana: 'まほうもようかべ',
    image: 'assets/house/interior/wallpapers/wallpaper_magic.png',
    imageFallback: '🔮',
    recipe: { cloth: 3, magic_orb: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'wallpaper_clouds',
    name: 'くもとそらかべ',
    nameKana: 'くもとそらかべ',
    image: 'assets/house/interior/wallpapers/wallpaper_clouds.png',
    imageFallback: '☁️',
    recipe: { cloth: 3, star_fragment: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.FLOOR1,
  },
];

// ─────────────────────────────────────────────
// 床アイテム
// ─────────────────────────────────────────────
export const FLOOR_ITEMS = [
  {
    id: 'floor_default',
    name: 'きのゆか（うすい）',
    nameKana: 'きのゆか',
    image: null,
    imageFallback: '🟫',
    recipe: null,
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'floor_wood_light',
    name: 'きのゆか（うすいいろ）',
    nameKana: 'きのゆか',
    image: 'assets/house/interior/floors/floor_wood_light.png',
    imageFallback: '🟧',
    recipe: { wood: 4 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'floor_wood_dark',
    name: 'きのゆか（こいいろ）',
    nameKana: 'こいいろのゆか',
    image: 'assets/house/interior/floors/floor_wood_dark.png',
    imageFallback: '🟤',
    recipe: { wood: 5 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'floor_stone',
    name: 'いしだたみのゆか',
    nameKana: 'いしだたみのゆか',
    image: 'assets/house/interior/floors/floor_stone.png',
    imageFallback: '⬛',
    recipe: { stone: 5 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'floor_carpet_red',
    name: 'あかいじゅうたん',
    nameKana: 'あかいじゅうたん',
    image: 'assets/house/interior/floors/floor_carpet_red.png',
    imageFallback: '🟥',
    recipe: { cloth: 6, paint: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
];

// ─────────────────────────────────────────────
// 1階 家具アイテム（furniture）
// ─────────────────────────────────────────────
export const FURNITURE_ITEMS_FLOOR1 = [
  {
    id: 'bed_wood',
    name: 'きのベッド',
    nameKana: 'きのべっど',
    image: 'assets/house/interior/furniture/bed_wood.png',
    imageFallback: '🛏️',
    recipe: { wood: 5, cloth: 3 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'desk_study',
    name: 'べんきょうつくえ',
    nameKana: 'べんきょうつくえ',
    image: 'assets/house/interior/furniture/desk_study.png',
    imageFallback: '🪑',
    recipe: { wood: 5 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'chair_wood',
    name: 'きのいす',
    nameKana: 'きのいす',
    image: 'assets/house/interior/furniture/chair_wood.png',
    imageFallback: '🪑',
    recipe: { wood: 3 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'table_wood',
    name: 'きのテーブル',
    nameKana: 'きのてーぶる',
    image: 'assets/house/interior/furniture/table_wood.png',
    imageFallback: '🪵',
    recipe: { wood: 4 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'bookshelf_small',
    name: 'ちいさいほんだな',
    nameKana: 'ちいさいほんだな',
    image: 'assets/house/interior/furniture/bookshelf_small.png',
    imageFallback: '📚',
    recipe: { wood: 5, brick: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'lamp_floor',
    name: 'たちランプ',
    nameKana: 'たちらんぷ',
    image: 'assets/house/interior/furniture/lamp_floor.png',
    imageFallback: '🪔',
    recipe: { wood: 2, stone: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'rug_simple',
    name: 'じゅうたん',
    nameKana: 'じゅうたん',
    image: 'assets/house/interior/furniture/rug_simple.png',
    imageFallback: '🟪',
    recipe: { cloth: 5 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'mailbox',
    name: 'ポスト',
    nameKana: 'ぽすと',
    image: 'assets/house/interior/furniture/mailbox.png',
    imageFallback: '📬',
    recipe: { wood: 2, paint: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'sofa_wood',
    name: 'ソファ',
    nameKana: 'そふぁ',
    image: 'assets/house/interior/furniture/sofa_wood.png',
    imageFallback: '🛋️',
    recipe: { wood: 4, cloth: 4 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'bookshelf_large',
    name: 'おおきいほんだな',
    nameKana: 'おおきいほんだな',
    image: 'assets/house/interior/furniture/bookshelf_large.png',
    imageFallback: '📖',
    recipe: { wood: 8, brick: 3 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'fireplace',
    name: 'だんろ',
    nameKana: 'だんろ',
    image: 'assets/house/interior/furniture/fireplace.png',
    imageFallback: '🔥',
    recipe: { stone: 6, brick: 4 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'rug_star',
    name: 'ほしのじゅうたん',
    nameKana: 'ほしのじゅうたん',
    image: 'assets/house/interior/furniture/rug_star.png',
    imageFallback: '⭐',
    recipe: { cloth: 5, paint: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'picture_frame',
    name: 'かべかざり（がくぶち）',
    nameKana: 'かべかざり',
    image: 'assets/house/interior/furniture/picture_frame.png',
    imageFallback: '🖼️',
    recipe: { wood: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR1,
    isMonsterFrame: true,  // モンスターを飾れる額縁
  },
  {
    id: 'chair_throne',
    name: 'おうさまのいす',
    nameKana: 'おうさまのいす',
    image: 'assets/house/interior/furniture/chair_throne.png',
    imageFallback: '👑',
    recipe: { wood: 3, crown: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'lamp_magic',
    name: 'まほうのランプ',
    nameKana: 'まほうのらんぷ',
    image: 'assets/house/interior/furniture/lamp_magic.png',
    imageFallback: '✨',
    recipe: { gem: 2, magic_orb: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'crystal_ball',
    name: 'すいしょうだま',
    nameKana: 'すいしょうだま',
    image: 'assets/house/interior/furniture/crystal_ball.png',
    imageFallback: '🔮',
    recipe: { gem: 5, star_fragment: 1 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR1,
  },
  {
    id: 'cauldron',
    name: 'まほうのなべ',
    nameKana: 'まほうのなべ',
    image: 'assets/house/interior/furniture/cauldron.png',
    imageFallback: '🪄',
    recipe: { stone: 5, magic_orb: 2 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR1,
  },
];

// ─────────────────────────────────────────────
// 庭デコアイテム（garden decorations）
// ─────────────────────────────────────────────
export const GARDEN_ITEMS = [
  {
    id: 'tree_apple',
    name: 'りんごのき',
    nameKana: 'りんごのき',
    image: 'assets/house/garden/tree_apple.png',
    imageFallback: '🍎',
    recipe: { wood: 3 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'tree_cherry',
    name: 'さくらのき',
    nameKana: 'さくらのき',
    image: 'assets/house/garden/tree_cherry.png',
    imageFallback: '🌸',
    recipe: { wood: 4, paint: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'flower_tulip',
    name: 'チューリップ',
    nameKana: 'ちゅーりっぷ',
    image: 'assets/house/garden/flower_tulip.png',
    imageFallback: '🌷',
    recipe: { wood: 1, paint: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'flower_sunflower',
    name: 'ひまわり',
    nameKana: 'ひまわり',
    image: 'assets/house/garden/flower_sunflower.png',
    imageFallback: '🌻',
    recipe: { wood: 1, paint: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'fence_wood',
    name: 'きのフェンス',
    nameKana: 'きのふぇんす',
    image: 'assets/house/garden/fence_wood.png',
    imageFallback: '🪵',
    recipe: { wood: 4 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'fence_stone',
    name: 'いしのフェンス',
    nameKana: 'いしのふぇんす',
    image: 'assets/house/garden/fence_stone.png',
    imageFallback: '🪨',
    recipe: { stone: 4 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'bench_wood',
    name: 'きのベンチ',
    nameKana: 'きのべんち',
    image: 'assets/house/garden/bench_wood.png',
    imageFallback: '🪑',
    recipe: { wood: 3 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'mailbox_garden',
    name: 'ポスト（にわ）',
    nameKana: 'ぽすと',
    image: 'assets/house/garden/mailbox.png',
    imageFallback: '📮',
    recipe: { wood: 2, paint: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'fence_flower',
    name: 'はなのフェンス',
    nameKana: 'はなのふぇんす',
    image: 'assets/house/garden/fence_flower.png',
    imageFallback: '🌼',
    recipe: { wood: 2, paint: 3 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'lamp_post',
    name: 'がいとう',
    nameKana: 'がいとう',
    image: 'assets/house/garden/lamp_post.png',
    imageFallback: '🪔',
    recipe: { stone: 2, gem: 1 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'well',
    name: 'いど',
    nameKana: 'いど',
    image: 'assets/house/garden/well.png',
    imageFallback: '⛲',
    recipe: { stone: 5 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'fountain',
    name: 'ふんすい',
    nameKana: 'ふんすい',
    image: 'assets/house/garden/fountain.png',
    imageFallback: '⛲',
    recipe: { stone: 6, gem: 1 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'pond',
    name: 'いけ',
    nameKana: 'いけ',
    image: 'assets/house/garden/pond.png',
    imageFallback: '🌊',
    recipe: { stone: 4, gem: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'mushroom_giant',
    name: 'おおきなきのこ',
    nameKana: 'おおきなきのこ',
    image: 'assets/house/garden/mushroom_giant.png',
    imageFallback: '🍄',
    recipe: { wood: 2, gem: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'tree_magic',
    name: 'まほうのき',
    nameKana: 'まほうのき',
    image: 'assets/house/garden/tree_magic.png',
    imageFallback: '🌳',
    recipe: { wood: 5, gem: 2 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'statue_star',
    name: 'ほしのぞう',
    nameKana: 'ほしのぞう',
    image: 'assets/house/garden/statue_star.png',
    imageFallback: '⭐',
    recipe: { stone: 5, star_fragment: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'flower_magic',
    name: 'にじいろのはな',
    nameKana: 'にじいろのはな',
    image: 'assets/house/garden/flower_magic.png',
    imageFallback: '🌈',
    recipe: { paint: 3, gem: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.GARDEN,
  },
  {
    id: 'magic_circle',
    name: 'まほうのじん',
    nameKana: 'まほうのじん',
    image: 'assets/house/garden/magic_circle.png',
    imageFallback: '✨',
    recipe: { gem: 3, star_fragment: 1 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.GARDEN,
  },
];

// ─────────────────────────────────────────────
// 外観装飾アイテム（exterior decorations）
// 世界8クリア後解放
// ─────────────────────────────────────────────
export const EXTERIOR_DECO_ITEMS = [
  // バナー
  {
    id: 'banner_blue',
    name: 'あおいバナー',
    nameKana: 'あおいばなー',
    image: 'assets/house/exterior/banner_blue.png',
    imageFallback: '🚩',
    recipe: { cloth: 3, paint: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'banner',
  },
  {
    id: 'banner_red',
    name: 'あかいバナー',
    nameKana: 'あかいばなー',
    image: 'assets/house/exterior/banner_red.png',
    imageFallback: '🚩',
    recipe: { cloth: 3, paint: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'banner',
  },
  {
    id: 'banner_star',
    name: 'ほしのバナー',
    nameKana: 'ほしのばなー',
    image: 'assets/house/exterior/banner_star.png',
    imageFallback: '⭐',
    recipe: { cloth: 3, gem: 1 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'banner',
  },
  {
    id: 'banner_rainbow',
    name: 'にじのバナー',
    nameKana: 'にじのばなー',
    image: 'assets/house/exterior/banner_rainbow.png',
    imageFallback: '🌈',
    recipe: { cloth: 3, paint: 3, gem: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'banner',
  },
  // 表札
  {
    id: 'signboard_wood',
    name: 'きのひょうさつ',
    nameKana: 'きのひょうさつ',
    image: 'assets/house/exterior/signboard_wood.png',
    imageFallback: '🪵',
    recipe: { wood: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'signboard',
  },
  {
    id: 'signboard_stone',
    name: 'いしのひょうさつ',
    nameKana: 'いしのひょうさつ',
    image: 'assets/house/exterior/signboard_stone.png',
    imageFallback: '🪨',
    recipe: { stone: 3 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'signboard',
  },
  {
    id: 'signboard_gem',
    name: 'ほうせきのひょうさつ',
    nameKana: 'ほうせきのひょうさつ',
    image: 'assets/house/exterior/signboard_gem.png',
    imageFallback: '💎',
    recipe: { gem: 2, stone: 2 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'signboard',
  },
  // 煙突
  {
    id: 'chimney_stone',
    name: 'いしのえんとつ',
    nameKana: 'いしのえんとつ',
    image: 'assets/house/exterior/chimney_stone.png',
    imageFallback: '🏭',
    recipe: { stone: 4 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'chimney',
  },
  {
    id: 'chimney_brick',
    name: 'れんがのえんとつ',
    nameKana: 'れんがのえんとつ',
    image: 'assets/house/exterior/chimney_brick.png',
    imageFallback: '🏭',
    recipe: { brick: 4, stone: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'chimney',
  },
  {
    id: 'chimney_fancy',
    name: 'かわいいえんとつ',
    nameKana: 'かわいいえんとつ',
    image: 'assets/house/exterior/chimney_fancy.png',
    imageFallback: '✨',
    recipe: { brick: 3, gem: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'chimney',
  },
  // 屋根飾り
  {
    id: 'roofdeco_weathervane',
    name: 'かざみとり',
    nameKana: 'かざみとり',
    image: 'assets/house/exterior/roofdeco_weathervane.png',
    imageFallback: '🐓',
    recipe: { wood: 2, stone: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'roofDeco',
  },
  {
    id: 'roofdeco_star',
    name: 'ほしのかざり',
    nameKana: 'ほしのかざり',
    image: 'assets/house/exterior/roofdeco_star.png',
    imageFallback: '⭐',
    recipe: { gem: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'roofDeco',
  },
  {
    id: 'roofdeco_moon',
    name: 'つきのかざり',
    nameKana: 'つきのかざり',
    image: 'assets/house/exterior/roofdeco_moon.png',
    imageFallback: '🌙',
    recipe: { gem: 2, star_fragment: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.EXTERIOR,
    slot: 'roofDeco',
  },
];

// ─────────────────────────────────────────────
// 2階 家具アイテム（世界12解放後）
// ─────────────────────────────────────────────
export const FURNITURE_ITEMS_FLOOR2 = [
  {
    id: 'telescope',
    name: 'ぼうえんきょう',
    nameKana: 'ぼうえんきょう',
    image: 'assets/house/interior/furniture/telescope.png',
    imageFallback: '🔭',
    recipe: { stone: 3, gem: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'globe',
    name: 'ちきゅうぎ',
    nameKana: 'ちきゅうぎ',
    image: 'assets/house/interior/furniture/globe.png',
    imageFallback: '🌍',
    recipe: { wood: 3, paint: 2 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'map_poster',
    name: 'ちずのかざり',
    nameKana: 'ちずのかざり',
    image: 'assets/house/interior/furniture/map_poster.png',
    imageFallback: '🗺️',
    recipe: { cloth: 2, paint: 2 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'bookshelf_magic',
    name: 'まほうのほんだな',
    nameKana: 'まほうのほんだな',
    image: 'assets/house/interior/furniture/bookshelf_magic.png',
    imageFallback: '📚',
    recipe: { wood: 8, magic_orb: 1 },
    rarity: RARITY.RARE,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'abacus',
    name: 'そろばん',
    nameKana: 'そろばん',
    image: 'assets/house/interior/furniture/abacus.png',
    imageFallback: '🧮',
    recipe: { wood: 3 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'clock_wall',
    name: 'かべどけい',
    nameKana: 'かべどけい',
    image: 'assets/house/interior/furniture/clock_wall.png',
    imageFallback: '🕐',
    recipe: { wood: 2, stone: 1 },
    rarity: RARITY.COMMON,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'lamp_study',
    name: 'べんきょうランプ',
    nameKana: 'べんきょうらんぷ',
    image: 'assets/house/interior/furniture/lamp_study.png',
    imageFallback: '💡',
    recipe: { wood: 1, gem: 1 },
    rarity: RARITY.UNCOMMON,
    section: HOUSE_SECTION.FLOOR2,
  },
  {
    id: 'bed_cloud',
    name: 'くものベッド',
    nameKana: 'くものべっど',
    image: 'assets/house/interior/furniture/bed_cloud.png',
    imageFallback: '☁️',
    recipe: { cloth: 8, star_fragment: 1 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR2,
  },
];

// ─────────────────────────────────────────────
// 3階 特殊アイテム（世界16解放後）
// ─────────────────────────────────────────────
export const FURNITURE_ITEMS_FLOOR3 = [
  {
    id: 'magic_mirror',
    name: 'まほうのかがみ',
    nameKana: 'まほうのかがみ',
    image: 'assets/house/interior/furniture/magic_mirror.png',
    imageFallback: '🪞',
    recipe: { gem: 5, magic_orb: 2 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR3,
  },
  {
    id: 'star_throne',
    name: 'ほしのざ',
    nameKana: 'ほしのざ',
    image: 'assets/house/interior/furniture/star_throne.png',
    imageFallback: '👑',
    recipe: { star_fragment: 3, crown: 1 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR3,
  },
  {
    id: 'orb_stand',
    name: 'たまのだい',
    nameKana: 'たまのだい',
    image: 'assets/house/interior/furniture/orb_stand.png',
    imageFallback: '🔮',
    recipe: { gem: 3, magic_orb: 3 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR3,
  },
  {
    id: 'astral_rug',
    name: 'ほしぞらじゅうたん',
    nameKana: 'ほしぞらじゅうたん',
    image: 'assets/house/interior/furniture/astral_rug.png',
    imageFallback: '🌌',
    recipe: { cloth: 8, star_fragment: 2 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR3,
  },
  {
    id: 'grimoire_stand',
    name: 'グリモアのだい',
    nameKana: 'ぐりもあのだい',
    image: 'assets/house/interior/furniture/grimoire_stand.png',
    imageFallback: '📕',
    recipe: { wood: 5, magic_orb: 3 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR3,
  },
  {
    id: 'crystal_window',
    name: 'すいしょうのまど',
    nameKana: 'すいしょうのまど',
    image: 'assets/house/interior/furniture/crystal_window.png',
    imageFallback: '🪟',
    recipe: { gem: 8, star_fragment: 2 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.FLOOR3,
  },
];

// ─────────────────────────────────────────────
// 屋上の塔アイテム（全ワールドクリア後）
// ─────────────────────────────────────────────
export const TOWER_ITEMS = [
  {
    id: 'star_observatory',
    name: 'ほしのかんそくじょ',
    nameKana: 'ほしのかんそくじょ',
    image: 'assets/house/tower/star_observatory.png',
    imageFallback: '🌟',
    recipe: { star_fragment: 5, gem: 5 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.TOWER,
  },
  {
    id: 'galaxy_window',
    name: 'ぎんがのまど',
    nameKana: 'ぎんがのまど',
    image: 'assets/house/tower/galaxy_window.png',
    imageFallback: '🌌',
    recipe: { star_fragment: 3, magic_orb: 3 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.TOWER,
  },
  {
    id: 'trophy_guardian',
    name: 'グリモア・ガーディアントロフィー',
    nameKana: 'とろふぃー',
    image: 'assets/house/tower/trophy_guardian.png',
    imageFallback: '🏆',
    recipe: null,  // 全ワールドクリアで自動解放
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.TOWER,
    isAutoUnlock: true,  // 自動付与
  },
  {
    id: 'grimoire_throne',
    name: 'グリモアのしろのたくさ',
    nameKana: 'ぐりもあのたくさ',
    image: 'assets/house/tower/grimoire_throne.png',
    imageFallback: '📜',
    recipe: { star_fragment: 5, magic_orb: 5, crown: 1 },
    rarity: RARITY.SUPER_RARE,
    section: HOUSE_SECTION.TOWER,
  },
];

// ─────────────────────────────────────────────
// アイテム検索ユーティリティ
// ─────────────────────────────────────────────

/** 全アイテムをフラットな配列で返す */
export function getAllItems() {
  return [
    ...EXTERIOR_STYLES,
    ...WALLPAPER_ITEMS,
    ...FLOOR_ITEMS,
    ...FURNITURE_ITEMS_FLOOR1,
    ...GARDEN_ITEMS,
    ...EXTERIOR_DECO_ITEMS,
    ...FURNITURE_ITEMS_FLOOR2,
    ...FURNITURE_ITEMS_FLOOR3,
    ...TOWER_ITEMS,
  ];
}

/**
 * IDからアイテムを取得
 * @param {string} id
 * @returns {Object|null}
 */
export function getItemById(id) {
  return getAllItems().find(item => item.id === id) || null;
}

/**
 * 指定セクションのアイテム一覧を返す
 * @param {string} section - HOUSE_SECTION定数
 * @returns {Object[]}
 */
export function getItemsBySection(section) {
  return getAllItems().filter(item => item.section === section);
}

/**
 * レシピが満たせるかチェック
 * @param {Object} recipe - { materialId: count, ... }
 * @param {Object} materials - 現在の素材数 { materialId: count, ... }
 * @returns {boolean}
 */
export function canCraft(recipe, materials) {
  if (!recipe) return false;
  return Object.entries(recipe).every(
    ([mat, required]) => (materials[mat] || 0) >= required
  );
}

/**
 * 不足素材を返す
 * @param {Object} recipe
 * @param {Object} materials
 * @returns {Object} { materialId: shortage, ... }
 */
export function getMissingMaterials(recipe, materials) {
  if (!recipe) return {};
  const missing = {};
  for (const [mat, required] of Object.entries(recipe)) {
    const have = materials[mat] || 0;
    if (have < required) {
      missing[mat] = required - have;
    }
  }
  return missing;
}

/**
 * 総アイテム数（コレクション率計算用）
 * autoUnlockアイテムは除く
 */
export const TOTAL_CRAFTABLE_ITEMS = getAllItems().filter(
  item => item.recipe !== null && !item.isAutoUnlock
).length;
