/**
 * worlds.js - Grimoire Guardians
 * ワールド定義データ（Phase 0.1 - 1年生算数）
 *
 * 日本文教出版の教科書単元に基づく。
 * 各ワールドは本棚画面に表示される1枚のカードに対応する。
 *
 * @version 1.0
 * @date 2026-02-17
 */

/**
 * Phase 0.1 ワールド一覧（1年生算数 M1-01〜M1-06）
 * @type {Object[]}
 */
export const WORLDS = [
  {
    id: 'world_1',
    unitId: 'M1-01',
    title: 'なかまづくりと かず',
    description: '1〜5の数を学ぼう',
    difficulty: 1,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_1.png',
      iconLocked: 'assets/icons/worlds/world_1_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #FFD700, #FFA500)'
    },
    order: 1,
    freeToPlay: true   // 無料プレイ可能
  },
  {
    id: 'world_2',
    unitId: 'M1-02',
    title: 'なんばんめ',
    description: '順番と位置を学ぼう',
    difficulty: 1,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_2.png',
      iconLocked: 'assets/icons/worlds/world_2_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)'
    },
    order: 2,
    freeToPlay: true
  },
  {
    id: 'world_3',
    unitId: 'M1-03',
    title: 'いくつと いくつ',
    description: '数の合成と分解',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_3.png',
      iconLocked: 'assets/icons/worlds/world_3_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #A8E6CF, #7ED321)'
    },
    order: 3,
    freeToPlay: true   // 最初の3つは無料
  },
  {
    id: 'world_4',
    unitId: 'M1-04',
    title: 'たしざん（1）',
    description: '10以内の足し算',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_4.png',
      iconLocked: 'assets/icons/worlds/world_4_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #FF6B6B, #D0021B)'
    },
    order: 4,
    freeToPlay: false  // ライセンスが必要
  },
  {
    id: 'world_5',
    unitId: 'M1-05',
    title: 'ひきざん（1）',
    description: '10以内の引き算',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_5.png',
      iconLocked: 'assets/icons/worlds/world_5_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #904AE2, #667eea)'
    },
    order: 5,
    freeToPlay: false
  },
  {
    id: 'world_6',
    unitId: 'M1-06',
    title: 'おおきい かず',
    description: '10より大きい数',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_6.png',
      iconLocked: 'assets/icons/worlds/world_6_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #E24A90, #F5A623)'
    },
    order: 6,
    freeToPlay: false
  }
];

/**
 * IDでワールドを取得する
 * @param {string} worldId
 * @returns {Object|undefined}
 */
export function getWorldById(worldId) {
  return WORLDS.find(w => w.id === worldId);
}

export default WORLDS;
