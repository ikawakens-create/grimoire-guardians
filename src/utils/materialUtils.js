/**
 * materialUtils.js - Grimoire Guardians
 * 素材の表示名・絵文字マップ（全画面共通）
 *
 * 使い方:
 *   import { getMaterialName, getMaterialEmoji, MATERIAL_NAMES, MATERIAL_EMOJIS } from '../utils/materialUtils.js';
 *
 * @version 1.0
 * @date 2026-03-27
 */

/** 素材の表示名（日本語） */
export const MATERIAL_NAMES = {
  // Grade 1
  wood:          'まるた',
  stone:         'いし',
  brick:         'れんが',
  gem:           'ほうせき',
  star_fragment: 'ほしのかけら',
  cloth:         'ぬの',
  paint:         'えのぐ',
  crown:         'おうかん',
  cape:          'マント',
  magic_orb:     'まほうだま',
  // Grade 2
  pearl:         'しんじゅ',
  coral:         'さんご',
  seaglass:      'うみのガラス',
  anchor:        'いかり',
  deepstone:     'しんかいいし',
};

/** 素材の絵文字 */
export const MATERIAL_EMOJIS = {
  // Grade 1
  wood:          '🌲',
  stone:         '⛰️',
  brick:         '🧱',
  gem:           '💎',
  star_fragment: '✨',
  cloth:         '🧶',
  paint:         '🎨',
  crown:         '👑',
  cape:          '🧣',
  magic_orb:     '🔮',
  // Grade 2
  pearl:         '🦪',
  coral:         '🪸',
  seaglass:      '💠',
  anchor:        '⚓',
  deepstone:     '🪨',
};

/**
 * 素材IDから表示名を返す
 * @param {string} id
 * @returns {string}
 */
export function getMaterialName(id) {
  return MATERIAL_NAMES[id] ?? id;
}

/**
 * 素材IDから絵文字を返す
 * @param {string} id
 * @returns {string}
 */
export function getMaterialEmoji(id) {
  return MATERIAL_EMOJIS[id] ?? '📦';
}
