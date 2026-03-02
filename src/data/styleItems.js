/**
 * styleItems.js - Grimoire Guardians
 * 家ビルドシステム スタイル（テーマ）カタログ v3.1
 * 15スタイル × 6レイヤー = 約1,139万通りの組み合わせ
 *
 * 各スタイルはレイヤースライスの絵文字・色・アニメーションCSSクラスを持つ。
 * 実際の画像（assets/house/styles/）が揃うまでは fallback の
 * テーマカラー＋絵文字でレンダリングする。
 *
 * @version 1.0
 * @date 2026-03-01
 */

/**
 * レイヤーID定数
 */
export const LAYER = {
  GARDEN:    'garden',    // 庭・土台
  FLOOR1:    'floor1',    // 1階
  FLOOR2:    'floor2',    // 2階
  FLOOR3:    'floor3',    // 3階
  TOWER:     'tower',     // てっぺん
  DECO:      'decoration',// 装飾オーバーレイ
};

/**
 * スタイル定義（15種）
 * @type {Array<{
 *   id: string,
 *   name: string,
 *   nameKana: string,
 *   emoji: string,
 *   tier: 'basic'|'special'|'legend',
 *   unlockWorld: number,
 *   color: string,          // テーマカラー（16進数）
 *   colorDark: string,      // グラデーション用暗色
 *   decoAnimClass: string,  // 装飾レイヤーのCSSアニメーションクラス
 *   decoDesc: string,       // 装飾の見た目説明
 *   layerEmoji: {[layerId]: string}, // レイヤーごとの代表絵文字
 * }>}
 */
export const HOUSE_STYLES = [
  // ─── ベーシック（序盤） ────────────────────────────
  {
    id: 'style_wood',
    name: 'もくのいえ',
    nameKana: 'もくのいえ',
    emoji: '🏠',
    tier: 'basic',
    unlockWorld: 0,
    color: '#a0522d',
    colorDark: '#6b3a1f',
    decoAnimClass: 'deco-wood',
    decoDesc: '蔓が壁を伝い、窓に花かご',
    layerEmoji: {
      garden: '🌿', floor1: '🪵', floor2: '🏠',
      floor3: '🌲', tower: '🌳', decoration: '🍃',
    },
    // スプライトシートからスライスしたレイヤー画像
    layerImages: {
      garden: 'assets/houses/style_wood/garden.png',
      floor1: 'assets/houses/style_wood/floor1.png',
      floor2: 'assets/houses/style_wood/floor2.png',
      floor3: 'assets/houses/style_wood/floor3.png',
      tower:  'assets/houses/style_wood/tower.png',
    },
  },
  {
    id: 'style_stone',
    name: 'いしのいえ',
    nameKana: 'いしのいえ',
    emoji: '🏚️',
    tier: 'basic',
    unlockWorld: 3,
    color: '#7f8c8d',
    colorDark: '#4a5568',
    decoAnimClass: 'deco-stone',
    decoDesc: '苔と古代ルーン文字が光る',
    layerEmoji: {
      garden: '🪨', floor1: '🏛️', floor2: '⬜',
      floor3: '🗿', tower: '🪨', decoration: '✦',
    },
  },
  {
    id: 'style_brick',
    name: 'れんがのいえ',
    nameKana: 'れんがのいえ',
    emoji: '🏘️',
    tier: 'basic',
    unlockWorld: 5,
    color: '#c0392b',
    colorDark: '#7b241c',
    decoAnimClass: 'deco-brick',
    decoDesc: '真鍮のランタンが並ぶ・窓辺に花',
    layerEmoji: {
      garden: '🧱', floor1: '🏘️', floor2: '🚪',
      floor3: '🏗️', tower: '🧱', decoration: '🏮',
    },
  },
  {
    id: 'style_bamboo',
    name: 'たけのいえ',
    nameKana: 'たけのいえ',
    emoji: '🎋',
    tier: 'basic',
    unlockWorld: 9,
    color: '#27ae60',
    colorDark: '#1a7a43',
    decoAnimClass: 'deco-bamboo',
    decoDesc: '赤い提灯が揺れる・風鈴',
    layerEmoji: {
      garden: '🎋', floor1: '🏯', floor2: '⛩️',
      floor3: '🪭', tower: '🎐', decoration: '🏮',
    },
  },
  {
    id: 'style_forest',
    name: 'もりのいえ',
    nameKana: 'もりのいえ',
    emoji: '🌲',
    tier: 'basic',
    unlockWorld: 11,
    color: '#1e8449',
    colorDark: '#0e4d29',
    decoAnimClass: 'deco-forest',
    decoDesc: '妖精の光・きのこ群生・つた',
    layerEmoji: {
      garden: '🍄', floor1: '🌲', floor2: '🌿',
      floor3: '🌳', tower: '🦋', decoration: '✨',
    },
  },
  // ─── スペシャル（中盤） ────────────────────────────
  {
    id: 'style_ice',
    name: 'こおりのいえ',
    nameKana: 'こおりのいえ',
    emoji: '❄️',
    tier: 'special',
    unlockWorld: 15,
    color: '#74b9ff',
    colorDark: '#0984e3',
    decoAnimClass: 'deco-ice',
    decoDesc: '軒下に氷柱・霜の結晶がキラキラ',
    layerEmoji: {
      garden: '❄️', floor1: '🏔️', floor2: '💎',
      floor3: '🧊', tower: '☃️', decoration: '❄️',
    },
    // スプライトシートからスライスしたレイヤー画像
    layerImages: {
      garden: 'assets/houses/style_ice/garden.png',
      floor1: 'assets/houses/style_ice/floor1.png',
      floor2: 'assets/houses/style_ice/floor2.png',
      floor3: 'assets/houses/style_ice/floor3.png',
      tower:  'assets/houses/style_ice/tower.png',
    },
  },
  {
    id: 'style_sakura',
    name: 'さくらのいえ',
    nameKana: 'さくらのいえ',
    emoji: '🌸',
    tier: 'special',
    unlockWorld: 17,
    color: '#fd79a8',
    colorDark: '#e84393',
    decoAnimClass: 'deco-sakura',
    decoDesc: '花びらが常に舞い散る・花輪',
    layerEmoji: {
      garden: '🌸', floor1: '🏡', floor2: '🌺',
      floor3: '🌷', tower: '🌸', decoration: '🌸',
    },
  },
  {
    id: 'style_candy',
    name: 'おかしのいえ',
    nameKana: 'おかしのいえ',
    emoji: '🍭',
    tier: 'special',
    unlockWorld: 19,
    color: '#ff69b4',
    colorDark: '#c0186b',
    decoAnimClass: 'deco-candy',
    decoDesc: 'キャンディーケインの柱・アイシング垂れ',
    layerEmoji: {
      garden: '🍬', floor1: '🍭', floor2: '🎂',
      floor3: '🍩', tower: '🍫', decoration: '🍭',
    },
  },
  {
    id: 'style_flame',
    name: 'ほのおのいえ',
    nameKana: 'ほのおのいえ',
    emoji: '🔥',
    tier: 'special',
    unlockWorld: 21,
    color: '#e17055',
    colorDark: '#d63031',
    decoAnimClass: 'deco-flame',
    decoDesc: '炎のたいまつ・火の粉が舞う',
    layerEmoji: {
      garden: '🔥', floor1: '🌋', floor2: '🔥',
      floor3: '💥', tower: '🕯️', decoration: '🔥',
    },
  },
  {
    id: 'style_sea',
    name: 'うみのいえ',
    nameKana: 'うみのいえ',
    emoji: '🌊',
    tier: 'special',
    unlockWorld: 23,
    color: '#0984e3',
    colorDark: '#055899',
    decoAnimClass: 'deco-sea',
    decoDesc: '珊瑚が生える・泡・ヒトデ',
    layerEmoji: {
      garden: '🐚', floor1: '🏖️', floor2: '🌊',
      floor3: '🐠', tower: '⚓', decoration: '🫧',
    },
  },
  // ─── レジェンド（後半・超希少） ────────────────────
  {
    id: 'style_black',
    name: 'くろのしろ',
    nameKana: 'くろのしろ',
    emoji: '🏯',
    tier: 'legend',
    unlockWorld: 25,
    color: '#2d3436',
    colorDark: '#1a1f20',
    decoAnimClass: 'deco-black',
    decoDesc: 'ガーゴイル・紫の煙・鎖',
    layerEmoji: {
      garden: '⚔️', floor1: '🏯', floor2: '🗡️',
      floor3: '💀', tower: '🔮', decoration: '💜',
    },
  },
  {
    id: 'style_thunder',
    name: 'かみなりのいえ',
    nameKana: 'かみなりのいえ',
    emoji: '⚡',
    tier: 'legend',
    unlockWorld: 27,
    color: '#fdcb6e',
    colorDark: '#e0a800',
    decoAnimClass: 'deco-thunder',
    decoDesc: '雷が走る・電気の火花',
    layerEmoji: {
      garden: '⚡', floor1: '🌩️', floor2: '⚡',
      floor3: '🌪️', tower: '☁️', decoration: '⚡',
    },
  },
  {
    id: 'style_moon',
    name: 'つきのやかた',
    nameKana: 'つきのやかた',
    emoji: '🌙',
    tier: 'legend',
    unlockWorld: 29,
    color: '#6c5ce7',
    colorDark: '#4a3cb5',
    decoAnimClass: 'deco-moon',
    decoDesc: '月光の柱・蛾・窓から青白い光',
    layerEmoji: {
      garden: '🌙', floor1: '🌌', floor2: '🌕',
      floor3: '✨', tower: '🌙', decoration: '🌟',
    },
  },
  {
    id: 'style_jewel',
    name: 'ほうせきのやかた',
    nameKana: 'ほうせきのやかた',
    emoji: '💎',
    tier: 'legend',
    unlockWorld: 31,
    color: '#00cec9',
    colorDark: '#009995',
    decoAnimClass: 'deco-jewel',
    decoDesc: '全面にジュエル・プリズムの虹',
    layerEmoji: {
      garden: '💎', floor1: '💍', floor2: '💠',
      floor3: '🔷', tower: '💎', decoration: '🌈',
    },
  },
  {
    id: 'style_star',
    name: 'ほしのしろ',
    nameKana: 'ほしのしろ',
    emoji: '⭐',
    tier: 'legend',
    unlockWorld: 33,
    color: '#f9ca24',
    colorDark: '#e0a700',
    decoAnimClass: 'deco-star',
    decoDesc: '星が軌道を描いて飛ぶ・オーロラ',
    layerEmoji: {
      garden: '⭐', floor1: '🌠', floor2: '🌟',
      floor3: '✨', tower: '🏆', decoration: '🌌',
    },
  },
];

/**
 * IDからスタイルを取得
 * @param {string} id
 * @returns {Object|null}
 */
export function getStyleById(id) {
  return HOUSE_STYLES.find(s => s.id === id) || null;
}

/**
 * 解放済みスタイル一覧を取得（クリア済みワールド数を基に）
 * @param {number} clearedCount
 * @returns {Object[]}
 */
export function getUnlockedStyles(clearedCount) {
  return HOUSE_STYLES.filter(s => clearedCount >= s.unlockWorld);
}

/**
 * 次に解放されるスタイル情報
 * @param {number} clearedCount
 * @returns {{ style: Object, remaining: number }|null}
 */
export function getNextStyleToUnlock(clearedCount) {
  const locked = HOUSE_STYLES
    .filter(s => clearedCount < s.unlockWorld)
    .sort((a, b) => a.unlockWorld - b.unlockWorld);
  if (!locked.length) return null;
  return { style: locked[0], remaining: locked[0].unlockWorld - clearedCount };
}
