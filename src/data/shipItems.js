/**
 * shipItems.js - Grimoire Guardians
 * 船カスタマイズパーツカタログ（Grade 2 深海グリモア）
 *
 * 追加方法:
 *   SHIP_PARTS 配列末尾に新しいオブジェクトを追加するだけでOK。
 *   テーマセットに含める場合は Config.GRADE2.THEME_SETS の parts[] にIDを追記する。
 *
 * Phase B: スロット名を新規名に統一
 *   旧 → 新
 *   hull       → katachi（船体形状）
 *   sail       → suishin（推進・帆）
 *   figurehead → senshu（船首かざり）
 *   deck       → senbi（船尾かざり）
 *   flag       → hata（旗）
 *   glow       → oura（オーラエフェクト）
 *
 * @version 2.0
 * @date 2026-03-28
 */

// ─────────────────────────────────────────────
// 定数
// ─────────────────────────────────────────────

/** パーツのレアリティ */
export const RARITY = {
  COMMON:   'common',
  RARE:     'rare',
  EPIC:     'epic',
};

export const RARITY_LABEL = {
  [RARITY.COMMON]: 'ふつう',
  [RARITY.RARE]:   'レア',
  [RARITY.EPIC]:   'でんせつ',
};

/** スロットの描画順（z-index 下→上） */
export const SLOT_ORDER = ['katachi', 'suishin', 'senshu', 'senbi', 'hata', 'oura'];

// ─────────────────────────────────────────────
// 小型船スキン（small 時のみ使用）
// ─────────────────────────────────────────────

/**
 * 小型船スキン定義
 * 後から追加する場合はここに追記するだけでOK
 */
export const SMALL_SKINS = [
  {
    id:     'skin_default',
    name:   'ふつうのふね',
    emoji:  '⛵',
    filter: null,
  },
  {
    id:     'skin_red',
    name:   'あかいふね',
    emoji:  '⛵',
    filter: 'hue-rotate(340deg) saturate(1.5)',
    craftCost: { pearl: 1 },
  },
  {
    id:     'skin_blue',
    name:   'あおいふね',
    emoji:  '⛵',
    filter: 'hue-rotate(200deg) saturate(1.3)',
    craftCost: { pearl: 1 },
  },
  {
    id:     'skin_star',
    name:   'ほしのふね',
    emoji:  '🌟',
    filter: 'hue-rotate(40deg) brightness(1.2)',
    craftCost: { pearl: 1 },
  },
];

// ─────────────────────────────────────────────
// 船パーツカタログ
// ─────────────────────────────────────────────

/**
 * 船パーツ定義
 *
 * @typedef {Object} ShipPart
 * @property {string}   id         - ユニークID（GameStore の ship[slotId] に保存される値）
 * @property {string}   slotId     - スロット種別: 'katachi'|'suishin'|'senshu'|'senbi'|'hata'|'oura'
 * @property {string}   name       - 表示名（ひらがな）
 * @property {string}   emoji      - アイコン絵文字
 * @property {string}   rarity     - RARITY 定数
 * @property {'medium'|'large'} minSize - 装備できる最小船サイズ
 * @property {Object}   craftCost  - クラフトに必要な素材 { materialId: count }
 * @property {string|null} themeSetId - 所属テーマセットID（Config.GRADE2.THEME_SETS の id）
 * @property {string}   pngPath    - レイヤー PNG のパス
 * @property {Object}   thumbCrop  - サムネイル表示設定 { objectPosition, scale }
 */

/**
 * 後からパーツを追加する場合はこの配列の末尾に追記するだけ。
 * slotId / minSize / themeSetId を正しく設定すれば UI に自動反映される。
 */
export const SHIP_PARTS = [

  // ── かいぞくセット（pirate）────────────────
  {
    id:         'katachi_pirate',
    slotId:     'katachi',
    name:       'かいぞくのふねがら',
    emoji:      '🏴‍☠️',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 3, coral: 2 },
    themeSetId: 'pirate',
    pngPath:    'assets/ships/katachi/katachi_pirate.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
  {
    id:         'suishin_skull',
    slotId:     'suishin',
    name:       'どくろのほ',
    emoji:      '💀',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { coral: 3, seaglass: 2 },
    themeSetId: 'pirate',
    pngPath:    'assets/ships/suishin/suishin_skull.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.1 },
  },
  {
    id:         'hata_skull',     // ← Config.GRADE2.THEME_SETS pirate/ghost が参照するID
    slotId:     'hata',
    name:       'どくろのはた',
    emoji:      '🚩',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 2, seaglass: 2 },
    themeSetId: 'pirate',
    pngPath:    'assets/ships/hata/hata_skull.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.2 },
  },
  {
    id:         'senshu_cannon',
    slotId:     'senshu',
    name:       'たいほうのへさきかざり',
    emoji:      '💣',
    rarity:     RARITY.RARE,
    minSize:    'large',
    craftCost:  { anchor: 3, deepstone: 1 },
    themeSetId: 'pirate',
    pngPath:    'assets/ships/senshu/senshu_cannon.png',
    thumbCrop:  { objectPosition: 'center 40%', scale: 1.2 },
  },

  // ── にんぎょセット（mermaid）────────────────
  {
    id:         'katachi_pearl',
    slotId:     'katachi',
    name:       'しんじゅのふねがら',
    emoji:      '🤍',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 4, seaglass: 1 },
    themeSetId: 'mermaid',
    pngPath:    'assets/ships/katachi/katachi_pearl.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
  {
    id:         'suishin_wave',
    slotId:     'suishin',
    name:       'なみのほ',
    emoji:      '🌊',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { coral: 3, pearl: 2 },
    themeSetId: 'mermaid',
    pngPath:    'assets/ships/suishin/suishin_wave.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.1 },
  },
  {
    id:         'senshu_mermaid',
    slotId:     'senshu',
    name:       'にんぎょのへさきかざり',
    emoji:      '🧜',
    rarity:     RARITY.EPIC,
    minSize:    'large',
    craftCost:  { pearl: 4, deepstone: 2 },
    themeSetId: 'mermaid',
    pngPath:    'assets/ships/senshu/senshu_mermaid.png',
    thumbCrop:  { objectPosition: 'center 40%', scale: 1.2 },
  },

  // ── あらしセット（storm）────────────────────
  {
    id:         'katachi_thunder',
    slotId:     'katachi',
    name:       'かみなりのふねがら',
    emoji:      '⛈️',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { anchor: 2, seaglass: 2 },
    themeSetId: 'storm',
    pngPath:    'assets/ships/katachi/katachi_thunder.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
  {
    id:         'suishin_dark',
    slotId:     'suishin',
    name:       'くらやみのほ',
    emoji:      '🌑',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { deepstone: 2, seaglass: 1 },
    themeSetId: 'storm',
    pngPath:    'assets/ships/suishin/suishin_dark.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.1 },
  },
  {
    id:         'hata_storm',
    slotId:     'hata',
    name:       'あらしのはた',
    emoji:      '⚡',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { anchor: 2, deepstone: 1 },
    themeSetId: 'storm',
    pngPath:    'assets/ships/hata/hata_storm.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.2 },
  },

  // ── さんごセット（coral）────────────────────
  {
    id:         'katachi_coral',
    slotId:     'katachi',
    name:       'さんごのふねがら',
    emoji:      '🪸',
    rarity:     RARITY.COMMON,
    minSize:    'medium',
    craftCost:  { coral: 4, pearl: 1 },
    themeSetId: 'coral',
    pngPath:    'assets/ships/katachi/katachi_coral.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
  {
    id:         'suishin_fan',
    slotId:     'suishin',
    name:       'おうぎのほ',
    emoji:      '🪭',
    rarity:     RARITY.COMMON,
    minSize:    'medium',
    craftCost:  { coral: 3, seaglass: 1 },
    themeSetId: 'coral',
    pngPath:    'assets/ships/suishin/suishin_fan.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.1 },
  },
  {
    id:         'senshu_crab',
    slotId:     'senshu',
    name:       'かにのへさきかざり',
    emoji:      '🦀',
    rarity:     RARITY.RARE,
    minSize:    'large',
    craftCost:  { coral: 4, anchor: 2 },
    themeSetId: 'coral',
    pngPath:    'assets/ships/senshu/senshu_crab.png',
    thumbCrop:  { objectPosition: 'center 40%', scale: 1.2 },
  },
  {
    id:         'hata_coral',     // ← Config.GRADE2.THEME_SETS coral が参照するID
    slotId:     'hata',
    name:       'さんごのはた',
    emoji:      '🪸',
    rarity:     RARITY.COMMON,
    minSize:    'medium',
    craftCost:  { coral: 2, seaglass: 1 },
    themeSetId: 'coral',
    pngPath:    'assets/ships/hata/hata_coral.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.2 },
  },

  {
    id:         'senbi_rainbow',  // ← Config.GRADE2.THEME_SETS mermaid が参照するID
    slotId:     'senbi',
    name:       'にじのともかざり',
    emoji:      '🌈',
    rarity:     RARITY.RARE,
    minSize:    'large',
    craftCost:  { pearl: 3, seaglass: 2 },
    themeSetId: 'mermaid',
    pngPath:    'assets/ships/senbi/senbi_rainbow.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
  {
    id:         'hata_star',      // ← Config.GRADE2.THEME_SETS mermaid/space が参照するID
    slotId:     'hata',
    name:       'ほしのはた',
    emoji:      '⭐',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 2, deepstone: 1 },
    themeSetId: 'mermaid',
    pngPath:    'assets/ships/hata/hata_star.png',
    thumbCrop:  { objectPosition: 'center top', scale: 1.2 },
  },

  // ── 単品パーツ（テーマセット非所属）─────────
  {
    id:         'senbi_anchor',
    slotId:     'senbi',
    name:       'いかりのかざり',
    emoji:      '⚓',
    rarity:     RARITY.COMMON,
    minSize:    'large',
    craftCost:  { anchor: 2, seaglass: 1 },
    themeSetId: null,
    pngPath:    'assets/ships/senbi/senbi_anchor.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
];

// ─────────────────────────────────────────────
// ヘルパー関数
// ─────────────────────────────────────────────

/**
 * IDでパーツを取得
 * @param {string} id
 * @returns {ShipPart|undefined}
 */
export function getPartById(id) {
  return SHIP_PARTS.find(p => p.id === id);
}

/**
 * スロット種別でパーツ一覧を取得
 * @param {string} slotId - 'katachi'|'suishin'|'senshu'|'senbi'|'hata'|'oura'
 * @returns {ShipPart[]}
 */
export function getPartsBySlot(slotId) {
  return SHIP_PARTS.filter(p => p.slotId === slotId);
}

/**
 * 現在の船サイズで装備できるパーツに絞り込む
 * @param {ShipPart[]} parts
 * @param {'small'|'medium'|'large'} shipSize
 * @returns {ShipPart[]}
 */
export function filterBySize(parts, shipSize) {
  const order = { small: 0, medium: 1, large: 2 };
  return parts.filter(p => order[p.minSize] <= order[shipSize]);
}
