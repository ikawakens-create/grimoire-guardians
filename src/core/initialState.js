/**
 * initialState.js - Grimoire Guardians
 * 各ドメインの初期ステートを返す factory 関数群
 *
 * 【なぜ定数でなく factory 関数か】
 * ステートはオブジェクトのため、定数で参照すると
 * GameStore.setState() による直接ミューテーションが
 * 定数本体に伝播してしまう。
 * factory 関数は呼び出しのたびに新しいオブジェクトを生成するため
 * 初期値が汚染されない。
 *
 * 使い方:
 *   import { createHouseState, createShipState, ... } from './initialState.js';
 *   static state = { house: createHouseState(), ... };
 *   static reset() { this.state = { house: createHouseState(), ... }; }
 */

/**
 * マイハウスシステムの初期ステート（Phase 1-D / v3.1）
 * @returns {Object}
 */
export function createHouseState() {
  return {
    // セクション（レイヤー）解放状態
    // v3.1 解放タイミング: garden=7, floor2=11, exterior=13, floor3=19, tower=33
    sections: {
      floor1:   true,   // 最初から解放
      garden:   false,
      floor2:   false,
      exterior: false,  // 装飾レイヤー（オーバーレイ）
      floor3:   false,
      tower:    false,
    },

    // ─── v3.1 スタイルシステム ───
    unlockedStyles: ['style_wood'],
    layerStyles: {
      garden:     'style_wood',
      floor1:     'style_wood',
      floor2:     'style_wood',
      floor3:     'style_wood',
      tower:      'style_wood',
      decoration: null,
    },

    // ─── 写真機能 ───
    photo: {
      unlockedFrames:  ['frame_simple'],
      unlockedStamps:  [],
      currentFrame:    'frame_simple',
      currentPose:     'normal',
      stampPlacements: [],
    },

    // 後方互換（既存アイテムクラフト・配置システム用）
    exteriorStyle: 'default',
    exteriorDeco: {
      banner:    null,
      signboard: null,
      chimney:   null,
      roofDeco:  null,
    },

    // 庭
    garden: {
      path: 'path_grass',
      decorations: [null, null, null, null, null, null, null, null],
      monsters:    [null, null, null],
    },

    // 1階
    floor1: {
      wallpaper: null,
      floor:     null,
      furniture: [null, null, null, null, null, null, null, null],
    },

    // 2階（floor2解放後のみ使用）
    floor2: {
      wallpaper: null,
      floor:     null,
      furniture: [null, null, null, null, null, null, null, null],
    },

    // 3階（floor3解放後のみ使用）
    floor3: {
      wallpaper: null,
      floor:     null,
      furniture: [null, null, null, null, null, null],
    },

    // 屋上の塔（tower解放後のみ使用）
    tower: {
      decorations: [null, null, null, null],
    },

    crafted:             [],
    triggeredMilestones: [],
    bonusSlots: {
      garden_extra: 0,
      floor1_extra: 0,
    },
    lastUpdated: null,
  };
}

/**
 * 船システムの初期ステート（Grade 2 深海グリモア / Phase 2）
 * @returns {Object}
 */
export function createShipState() {
  return {
    size:          'small',
    name:          'グリモア号',
    nameSetByUser: false,
    displaySize:   null,
    katachi:       null,
    suishin:       null,
    senshu:        null,
    senbi:         null,
    hata:          null,
    oura:          null,
    crafted:            [],
    completedThemeSets: [],
    largeCrafted:        false,
    flashUnlockedWorlds: [],
    shipBuildGuideShown: false,
  };
}

/**
 * 街システムの初期ステート（Phase 1-E）
 * @returns {Object}
 */
export function createTownState() {
  return {
    buildings: {
      craftsman:   { level: 1 },
      library:     { level: 1 },
      guild:       { level: 1 },
      house:       { level: 1 },
      house_build: { level: 0 },  // Q1-3 クエストで解放
      shop:        { level: 0 },  // Q1-2 クエストで解放
      farm:        { level: 0 },
    },
    shop: {
      dailyFreeClaimedDate: null,
    },
    farm: {
      plots:     [],
      quizTotal: 0,
    },
  };
}

/**
 * ギルドシステムの初期ステート（Phase E）
 * @returns {Object}
 */
export function createGuildState() {
  return {
    activeQuests:    [],
    completedQuests: [],
    questItems:      {},
    daily: {
      date:     null,
      missions: [],
    },
    newQuestBadge: false,
  };
}
