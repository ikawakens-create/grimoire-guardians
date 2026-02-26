/**
 * HouseManager.js - Grimoire Guardians
 * 家ビルドシステム コアロジック
 * クラフト・配置・セクション解放・状態管理を担当
 *
 * @version 1.0
 * @date 2026-02-26
 */

import { GameStore } from './GameStore.js';
import { Config } from './Config.js';
import Logger from './Logger.js';
import {
  getItemById,
  canCraft,
  getMissingMaterials,
  SECTION_UNLOCK_CONDITIONS,
  HOUSE_SECTION,
  TOTAL_CRAFTABLE_ITEMS,
} from '../data/houseItems.js';

/**
 * HouseManager
 * 家ビルドシステムの全ロジックを管理するシングルトン的クラス
 */
export class HouseManager {

  // ─────────────────────────────────────────────
  // セクション解放
  // ─────────────────────────────────────────────

  /**
   * 現在のワールドクリア数に基づいてセクション解放をチェック・更新
   * ワールドクリア後に EventManager から呼ぶ
   * @returns {string[]} 新たに解放されたセクションIDの配列
   */
  static checkAndUnlockSections() {
    const clearedCount = this._getClearedWorldCount();
    const currentSections = GameStore.getState('house.sections');
    const newlyUnlocked = [];

    for (const [sectionId, condition] of Object.entries(SECTION_UNLOCK_CONDITIONS)) {
      if (!currentSections[sectionId] && clearedCount >= condition.clearedWorlds) {
        GameStore.setState(`house.sections.${sectionId}`, true);
        newlyUnlocked.push(sectionId);
        Logger.info(`[House] セクション解放: ${sectionId} (クリア済み: ${clearedCount}ワールド)`);
      }
    }

    return newlyUnlocked;
  }

  /**
   * 指定セクションが解放済みか
   * @param {string} sectionId
   * @returns {boolean}
   */
  static isSectionUnlocked(sectionId) {
    return GameStore.getState(`house.sections.${sectionId}`) === true;
  }

  /**
   * 次に解放されるセクションの情報を返す
   * @returns {{ sectionId: string, requiredWorlds: number, remaining: number }|null}
   */
  static getNextSectionToUnlock() {
    const clearedCount = this._getClearedWorldCount();
    const currentSections = GameStore.getState('house.sections');

    const locked = Object.entries(SECTION_UNLOCK_CONDITIONS)
      .filter(([id]) => !currentSections[id] && id !== HOUSE_SECTION.FLOOR1)
      .sort(([, a], [, b]) => a.clearedWorlds - b.clearedWorlds);

    if (locked.length === 0) return null;

    const [sectionId, condition] = locked[0];
    return {
      sectionId,
      requiredWorlds: condition.clearedWorlds,
      remaining: Math.max(0, condition.clearedWorlds - clearedCount),
    };
  }

  // ─────────────────────────────────────────────
  // クラフト
  // ─────────────────────────────────────────────

  /**
   * アイテムをクラフトする
   * 素材を消費してクラフト済みリストに追加
   * @param {string} itemId
   * @returns {{ success: boolean, reason?: string }}
   */
  static craft(itemId) {
    const item = getItemById(itemId);
    if (!item) {
      return { success: false, reason: 'アイテムが見つかりません' };
    }

    // セクション解放チェック
    if (!this.isSectionUnlocked(item.section)) {
      return { success: false, reason: 'セクションがまだ解放されていません' };
    }

    // 既にクラフト済みか
    const crafted = GameStore.getState('house.crafted');
    if (crafted.includes(itemId)) {
      return { success: false, reason: 'すでにクラフト済みです' };
    }

    // 自動解放アイテムはクラフト不可
    if (item.isAutoUnlock) {
      return { success: false, reason: '自動で解放されるアイテムです' };
    }

    // レシピなしアイテム（デフォルト品）
    if (!item.recipe) {
      const newCrafted = [...crafted, itemId];
      GameStore.setState('house.crafted', newCrafted);
      GameStore.setState('house.lastUpdated', new Date().toISOString());
      Logger.info(`[House] クラフト完了（無料）: ${itemId}`);
      return { success: true };
    }

    // 素材チェック
    const materials = GameStore.getState('inventory.materials');
    if (!canCraft(item.recipe, materials)) {
      const missing = getMissingMaterials(item.recipe, materials);
      return { success: false, reason: '素材が足りません', missing };
    }

    // 素材を消費
    for (const [mat, required] of Object.entries(item.recipe)) {
      const current = GameStore.getState(`inventory.materials.${mat}`);
      GameStore.setState(`inventory.materials.${mat}`, current - required);
    }

    // クラフト済みリストに追加
    const newCrafted = [...crafted, itemId];
    GameStore.setState('house.crafted', newCrafted);
    GameStore.setState('house.lastUpdated', new Date().toISOString());

    Logger.info(`[House] クラフト完了: ${itemId}`);
    return { success: true };
  }

  /**
   * アイテムがクラフト済みか
   * @param {string} itemId
   * @returns {boolean}
   */
  static isCrafted(itemId) {
    const crafted = GameStore.getState('house.crafted') || [];
    return crafted.includes(itemId);
  }

  /**
   * クラフト可能かチェック（素材チェックのみ、クラフト済みも含む）
   * @param {string} itemId
   * @returns {{ craftable: boolean, missing: Object }}
   */
  static checkCraftable(itemId) {
    const item = getItemById(itemId);
    if (!item || !item.recipe) return { craftable: false, missing: {} };

    const materials = GameStore.getState('inventory.materials');
    const missing = getMissingMaterials(item.recipe, materials);
    return {
      craftable: Object.keys(missing).length === 0,
      missing,
    };
  }

  // ─────────────────────────────────────────────
  // 配置（スロットへのアイテム設置）
  // ─────────────────────────────────────────────

  /**
   * 外観スタイルをセット
   * @param {string} styleId
   * @returns {boolean}
   */
  static setExteriorStyle(styleId) {
    if (!this.isCrafted(styleId) && styleId !== 'default') {
      Logger.warn(`[House] 未クラフトの外観スタイル: ${styleId}`);
      return false;
    }
    GameStore.setState('house.exteriorStyle', styleId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    Logger.info(`[House] 外観スタイル変更: ${styleId}`);
    return true;
  }

  /**
   * 外観装飾スロットにアイテムをセット
   * @param {string} slot - 'banner' | 'signboard' | 'chimney' | 'roofDeco'
   * @param {string|null} itemId
   * @returns {boolean}
   */
  static setExteriorDeco(slot, itemId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.EXTERIOR)) {
      Logger.warn('[House] exteriorセクションが未解放');
      return false;
    }
    if (itemId && !this.isCrafted(itemId)) {
      Logger.warn(`[House] 未クラフトの外観装飾: ${itemId}`);
      return false;
    }
    GameStore.setState(`house.exteriorDeco.${slot}`, itemId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  /**
   * 1階 壁紙をセット
   * @param {string|null} itemId
   * @returns {boolean}
   */
  static setFloor1Wallpaper(itemId) {
    if (itemId && !this.isCrafted(itemId)) return false;
    GameStore.setState('house.floor1.wallpaper', itemId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  /**
   * 1階 床をセット
   * @param {string|null} itemId
   * @returns {boolean}
   */
  static setFloor1Floor(itemId) {
    if (itemId && !this.isCrafted(itemId)) return false;
    GameStore.setState('house.floor1.floor', itemId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  /**
   * 家具スロットにアイテムをセット（1階・2階・3階共通）
   * @param {string} floorKey - 'floor1' | 'floor2' | 'floor3'
   * @param {number} slotIndex
   * @param {string|null} itemId
   * @returns {boolean}
   */
  static setFurniture(floorKey, slotIndex, itemId) {
    const section = floorKey; // floor1, floor2, floor3 はそのままセクションID
    if (!this.isSectionUnlocked(section)) {
      Logger.warn(`[House] ${section}セクションが未解放`);
      return false;
    }
    if (itemId && !this.isCrafted(itemId)) {
      Logger.warn(`[House] 未クラフトの家具: ${itemId}`);
      return false;
    }

    const furniture = [...(GameStore.getState(`house.${floorKey}.furniture`) || [])];
    if (slotIndex < 0 || slotIndex >= furniture.length) {
      Logger.warn(`[House] 無効なスロットインデックス: ${slotIndex}`);
      return false;
    }

    furniture[slotIndex] = itemId;
    GameStore.setState(`house.${floorKey}.furniture`, furniture);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    Logger.info(`[House] 家具配置: ${floorKey}[${slotIndex}] = ${itemId}`);
    return true;
  }

  /**
   * 庭デコスロットにアイテムをセット
   * @param {number} slotIndex
   * @param {string|null} itemId
   * @returns {boolean}
   */
  static setGardenDeco(slotIndex, itemId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.GARDEN)) {
      Logger.warn('[House] gardenセクションが未解放');
      return false;
    }
    if (itemId && !this.isCrafted(itemId)) {
      Logger.warn(`[House] 未クラフトの庭デコ: ${itemId}`);
      return false;
    }

    const decos = [...(GameStore.getState('house.garden.decorations') || [])];
    if (slotIndex < 0 || slotIndex >= decos.length) return false;

    decos[slotIndex] = itemId;
    GameStore.setState('house.garden.decorations', decos);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    Logger.info(`[House] 庭デコ配置: garden[${slotIndex}] = ${itemId}`);
    return true;
  }

  /**
   * 庭モンスタースロットにモンスターをセット
   * @param {number} slotIndex
   * @param {string|null} monsterId
   * @returns {boolean}
   */
  static setGardenMonster(slotIndex, monsterId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.GARDEN)) return false;

    // モンスターがコレクション済みか確認
    if (monsterId) {
      const collected = GameStore.getState('memory.collected') || [];
      if (!collected.includes(monsterId)) {
        Logger.warn(`[House] 未収集のモンスター: ${monsterId}`);
        return false;
      }
    }

    const monsters = [...(GameStore.getState('house.garden.monsters') || [])];
    if (slotIndex < 0 || slotIndex >= monsters.length) return false;

    monsters[slotIndex] = monsterId;
    GameStore.setState('house.garden.monsters', monsters);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  /**
   * 塔デコスロットにアイテムをセット
   * @param {number} slotIndex
   * @param {string|null} itemId
   * @returns {boolean}
   */
  static setTowerDeco(slotIndex, itemId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.TOWER)) return false;
    if (itemId && !this.isCrafted(itemId)) return false;

    const decos = [...(GameStore.getState('house.tower.decorations') || [])];
    if (slotIndex < 0 || slotIndex >= decos.length) return false;

    decos[slotIndex] = itemId;
    GameStore.setState('house.tower.decorations', decos);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  // ─────────────────────────────────────────────
  // コレクション率
  // ─────────────────────────────────────────────

  /**
   * コレクション率を返す
   * @returns {{ crafted: number, total: number, rate: number }}
   */
  static getCollectionRate() {
    const crafted = (GameStore.getState('house.crafted') || []).length;
    return {
      crafted,
      total: TOTAL_CRAFTABLE_ITEMS,
      rate: TOTAL_CRAFTABLE_ITEMS > 0
        ? Math.floor((crafted / TOTAL_CRAFTABLE_ITEMS) * 100)
        : 0,
    };
  }

  // ─────────────────────────────────────────────
  // 全ワールドクリア時の特別処理
  // ─────────────────────────────────────────────

  /**
   * 全ワールドクリア時にトロフィーを自動付与
   * EventManager から呼ぶ
   */
  static onAllWorldsCleared() {
    const crafted = GameStore.getState('house.crafted') || [];
    if (!crafted.includes('trophy_guardian')) {
      const newCrafted = [...crafted, 'trophy_guardian'];
      GameStore.setState('house.crafted', newCrafted);
      Logger.info('[House] 全ワールドクリア！トロフィー自動付与');
    }
    // towerセクション解放（checkAndUnlockSectionsでも対応するが念のため）
    GameStore.setState('house.sections.tower', true);
  }

  // ─────────────────────────────────────────────
  // 内部ユーティリティ
  // ─────────────────────────────────────────────

  /**
   * クリア済みワールド数を返す
   * @returns {number}
   */
  static _getClearedWorldCount() {
    const worlds = GameStore.getState('progress.worlds') || {};
    return Object.values(worlds).filter(w => w && w.cleared).length;
  }
}

export default HouseManager;
