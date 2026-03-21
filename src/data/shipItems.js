/**
 * shipItems.js - Grimoire Guardians
 * 船カスタマイズパーツカタログ（Grade 2 深海グリモア）
 *
 * 追加方法:
 *   SHIP_PARTS 配列末尾に新しいオブジェクトを追加するだけでOK。
 *   テーマセットに含める場合は Config.GRADE2.THEME_SETS の parts[] にIDを追記する。
 *
 * @version 1.0
 * @date 2026-03-21
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

// ─────────────────────────────────────────────
// 小型船スキン（small 時のみ使用）
// ─────────────────────────────────────────────

/**
 * 小型船スキン定義
 * 後から追加する場合はここに追記するだけでOK
 */
export const SMALL_SKINS = [
  {
    id:    'skin_default',
    name:  'ふつうのふね',
    emoji: '⛵',
  },
  {
    id:    'skin_star',
    name:  'ほしのふね',
    emoji: '🌟',
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
 * @property {string}   id         - ユニークID（GameStore の ship[partType] に保存される値）
 * @property {string}   partType   - スロット種別: 'hull'|'sail'|'figurehead'|'flag'|'deck'|'glow'
 * @property {string}   name       - 表示名（ひらがな）
 * @property {string}   emoji      - アイコン絵文字
 * @property {string}   rarity     - RARITY 定数
 * @property {'medium'|'large'} minSize - 装備できる最小船サイズ
 * @property {Object}   craftCost  - クラフトに必要な素材 { materialId: count }
 * @property {string|null} themeSetId - 所属テーマセットID（Config.GRADE2.THEME_SETS の id）
 * @property {string}   hintWorld  - 「このクイズで素材が手に入る」のヒント文言（任意）
 */

/**
 * 後からパーツを追加する場合はこの配列の末尾に追記するだけ。
 * partType / minSize / themeSetId を正しく設定すれば UI に自動反映される。
 */
export const SHIP_PARTS = [

  // ── かいぞくセット（pirate）────────────────
  {
    id:         'hull_pirate',
    partType:   'hull',
    name:       'かいぞくのふね',
    emoji:      '🏴‍☠️',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 2, coral: 1 },
    themeSetId: 'pirate',
  },
  {
    id:         'sail_skull',
    partType:   'sail',
    name:       'どくろのほ',
    emoji:      '💀',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { coral: 2, seaglass: 1 },
    themeSetId: 'pirate',
  },
  {
    id:         'flag_jolly',
    partType:   'flag',
    name:       'どくろのはた',
    emoji:      '🚩',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 1, seaglass: 2 },
    themeSetId: 'pirate',
  },

  // ── にんぎょセット（mermaid）────────────────
  {
    id:         'hull_pearl',
    partType:   'hull',
    name:       'しんじゅのふね',
    emoji:      '🤍',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 3 },
    themeSetId: 'mermaid',
  },
  {
    id:         'sail_wave',
    partType:   'sail',
    name:       'なみのほ',
    emoji:      '🌊',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { coral: 2, pearl: 1 },
    themeSetId: 'mermaid',
  },
  {
    id:         'figurehead_mermaid',
    partType:   'figurehead',
    name:       'にんぎょのへさきかざり',
    emoji:      '🧜',
    rarity:     RARITY.EPIC,
    minSize:    'large',
    craftCost:  { pearl: 3, deepstone: 1 },
    themeSetId: 'mermaid',
  },

  // ── あらしセット（storm）────────────────────
  {
    id:         'hull_thunder',
    partType:   'hull',
    name:       'かみなりのふね',
    emoji:      '⛈️',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { anchor: 2, seaglass: 1 },
    themeSetId: 'storm',
  },
  {
    id:         'sail_dark',
    partType:   'sail',
    name:       'くらやみのほ',
    emoji:      '🌑',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { deepstone: 2 },
    themeSetId: 'storm',
  },
  {
    id:         'flag_storm',
    partType:   'flag',
    name:       'あらしのはた',
    emoji:      '⚡',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { anchor: 1, deepstone: 1 },
    themeSetId: 'storm',
  },

  // ── さんごセット（coral）────────────────────
  {
    id:         'hull_coral',
    partType:   'hull',
    name:       'さんごのふね',
    emoji:      '🪸',
    rarity:     RARITY.COMMON,
    minSize:    'medium',
    craftCost:  { coral: 3 },
    themeSetId: 'coral',
  },
  {
    id:         'sail_fan',
    partType:   'sail',
    name:       'おうぎのほ',
    emoji:      '🪭',
    rarity:     RARITY.COMMON,
    minSize:    'medium',
    craftCost:  { coral: 2, seaglass: 1 },
    themeSetId: 'coral',
  },
  {
    id:         'figurehead_crab',
    partType:   'figurehead',
    name:       'かにのへさきかざり',
    emoji:      '🦀',
    rarity:     RARITY.RARE,
    minSize:    'large',
    craftCost:  { coral: 3, anchor: 1 },
    themeSetId: 'coral',
  },

  // ── 単品パーツ（テーマセット非所属）─────────
  // ここに単品パーツを追加していける
  {
    id:         'deck_anchor',
    partType:   'deck',
    name:       'いかりのかざり',
    emoji:      '⚓',
    rarity:     RARITY.COMMON,
    minSize:    'large',
    craftCost:  { anchor: 2 },
    themeSetId: null,
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
 * @param {string} partType - 'hull' | 'sail' | 'figurehead' | 'flag' | 'deck' | 'glow'
 * @returns {ShipPart[]}
 */
export function getPartsByType(partType) {
  return SHIP_PARTS.filter(p => p.partType === partType);
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
