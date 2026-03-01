/**
 * HouseManager.js - Grimoire Guardians
 * 家ビルドシステム コアロジック
 * クラフト・配置・セクション解放・マイルストーン・状態管理
 *
 * @version 2.0
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
import { getStyleById, HOUSE_STYLES } from '../data/styleItems.js';

/**
 * HouseManager
 * 家ビルドシステムの全ロジック
 */
export class HouseManager {

  // ─────────────────────────────────────────────
  // セクション解放
  // ─────────────────────────────────────────────

  /**
   * ワールドクリア後にセクション解放とマイルストーンをまとめてチェック
   * @returns {{ newSections: string[], newMilestones: Object[] }}
   */
  static checkProgressUnlocks() {
    return {
      newSections:   this.checkAndUnlockSections(),
      newMilestones: this.checkAndTriggerMilestones(),
    };
  }

  /**
   * セクション解放チェック
   * @returns {string[]} 新たに解放されたセクションID
   */
  static checkAndUnlockSections() {
    const clearedCount = this._getClearedWorldCount();
    const currentSections = GameStore.getState('house.sections');
    const newlyUnlocked = [];

    for (const [sectionId, condition] of Object.entries(SECTION_UNLOCK_CONDITIONS)) {
      if (!currentSections[sectionId] && clearedCount >= condition.clearedWorlds) {
        GameStore.setState(`house.sections.${sectionId}`, true);
        newlyUnlocked.push(sectionId);
        Logger.info(`[House] セクション解放: ${sectionId} (クリア済み: ${clearedCount})`);
      }
    }

    return newlyUnlocked;
  }

  /**
   * マイルストーンチェック＆発火
   * @returns {Object[]} 新たにトリガーされたマイルストーン
   */
  static checkAndTriggerMilestones() {
    const clearedCount = this._getClearedWorldCount();
    const triggered = GameStore.getState('house.triggeredMilestones') || [];
    const milestones = Config.HOUSE.MILESTONES || [];
    const newlyTriggered = [];

    for (const milestone of milestones) {
      if (triggered.includes(milestone.id)) continue;
      if (clearedCount < milestone.worlds) continue;

      // マイルストーン発火
      this._applyMilestone(milestone);
      const newTriggered = [...triggered, milestone.id];
      GameStore.setState('house.triggeredMilestones', newTriggered);
      newlyTriggered.push(milestone);
      Logger.info(`[House] マイルストーン達成: ${milestone.id}`);
    }

    return newlyTriggered;
  }

  /**
   * マイルストーン効果を適用
   * @param {Object} milestone
   */
  static _applyMilestone(milestone) {
    switch (milestone.type) {
      case 'auto_craft': {
        // アイテムを自動クラフト（素材消費なし）
        const crafted = GameStore.getState('house.crafted') || [];
        if (!crafted.includes(milestone.itemId)) {
          GameStore.setState('house.crafted', [...crafted, milestone.itemId]);
        }
        break;
      }
      case 'slot_expand': {
        // ボーナススロットを追加
        const current = GameStore.getState(`house.bonusSlots.${milestone.target}`) || 0;
        GameStore.setState(`house.bonusSlots.${milestone.target}`, current + milestone.amount);
        break;
      }
      case 'celebrate':
        // 表示演出のみ（メッセージはUIが担当）
        break;
    }
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
   * 次に解放されるセクション情報
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

  /**
   * 次のマイルストーン情報
   * @returns {{ milestone: Object, remaining: number }|null}
   */
  static getNextMilestone() {
    const clearedCount = this._getClearedWorldCount();
    const triggered = GameStore.getState('house.triggeredMilestones') || [];
    const milestones = (Config.HOUSE.MILESTONES || [])
      .filter(m => !triggered.includes(m.id) && m.worlds > clearedCount)
      .sort((a, b) => a.worlds - b.worlds);

    if (milestones.length === 0) return null;
    const next = milestones[0];
    return { milestone: next, remaining: next.worlds - clearedCount };
  }

  // ─────────────────────────────────────────────
  // スロット数計算（ボーナス込み）
  // ─────────────────────────────────────────────

  /**
   * 庭デコの実際のスロット数（基本 + ボーナス）
   * @returns {number}
   */
  static getGardenSlotCount() {
    const base = Config.HOUSE.SECTION_SLOTS.garden_deco || 8;
    const bonus = GameStore.getState('house.bonusSlots.garden_extra') || 0;
    return base + bonus;
  }

  /**
   * 1階家具の実際のスロット数（基本 + ボーナス）
   * @returns {number}
   */
  static getFloor1SlotCount() {
    const base = Config.HOUSE.SECTION_SLOTS.floor1_furniture || 8;
    const bonus = GameStore.getState('house.bonusSlots.floor1_extra') || 0;
    return base + bonus;
  }

  // ─────────────────────────────────────────────
  // クラフト
  // ─────────────────────────────────────────────

  /**
   * アイテムをクラフト（素材消費）
   * @param {string} itemId
   * @returns {{ success: boolean, reason?: string, missing?: Object }}
   */
  static craft(itemId) {
    const item = getItemById(itemId);
    if (!item) return { success: false, reason: 'アイテムが見つかりません' };

    if (!this.isSectionUnlocked(item.section)) {
      return { success: false, reason: 'セクションがまだ解放されていません' };
    }

    const crafted = GameStore.getState('house.crafted') || [];
    if (crafted.includes(itemId)) {
      return { success: false, reason: 'すでにクラフト済みです' };
    }

    if (item.isAutoUnlock) {
      return { success: false, reason: '自動で解放されるアイテムです' };
    }

    if (!item.recipe) {
      // 無料アイテム
      GameStore.setState('house.crafted', [...crafted, itemId]);
      GameStore.setState('house.lastUpdated', new Date().toISOString());
      Logger.info(`[House] クラフト完了（無料）: ${itemId}`);
      return { success: true };
    }

    const materials = GameStore.getState('inventory.materials');
    if (!canCraft(item.recipe, materials)) {
      const missing = getMissingMaterials(item.recipe, materials);
      return { success: false, reason: '素材が足りません', missing };
    }

    // 素材消費
    for (const [mat, required] of Object.entries(item.recipe)) {
      const current = GameStore.getState(`inventory.materials.${mat}`);
      GameStore.setState(`inventory.materials.${mat}`, current - required);
    }

    GameStore.setState('house.crafted', [...crafted, itemId]);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    Logger.info(`[House] クラフト完了: ${itemId}`);
    return { success: true };
  }

  /**
   * クラフト済みか確認
   * @param {string} itemId
   * @returns {boolean}
   */
  static isCrafted(itemId) {
    return (GameStore.getState('house.crafted') || []).includes(itemId);
  }

  /**
   * クラフト可否チェック
   * @param {string} itemId
   * @returns {{ craftable: boolean, missing: Object }}
   */
  static checkCraftable(itemId) {
    const item = getItemById(itemId);
    if (!item || !item.recipe) return { craftable: false, missing: {} };
    const materials = GameStore.getState('inventory.materials');
    const missing = getMissingMaterials(item.recipe, materials);
    return { craftable: Object.keys(missing).length === 0, missing };
  }

  // ─────────────────────────────────────────────
  // 配置
  // ─────────────────────────────────────────────

  static setExteriorStyle(styleId) {
    if (!this.isCrafted(styleId) && styleId !== 'default') return false;
    GameStore.setState('house.exteriorStyle', styleId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  static setExteriorDeco(slot, itemId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.EXTERIOR)) return false;
    if (itemId && !this.isCrafted(itemId)) return false;
    GameStore.setState(`house.exteriorDeco.${slot}`, itemId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  static setFloor1Wallpaper(itemId) {
    if (itemId && !this.isCrafted(itemId)) return false;
    GameStore.setState('house.floor1.wallpaper', itemId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  static setFloor1Floor(itemId) {
    if (itemId && !this.isCrafted(itemId)) return false;
    GameStore.setState('house.floor1.floor', itemId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  static setFurniture(floorKey, slotIndex, itemId) {
    if (!this.isSectionUnlocked(floorKey)) return false;
    if (itemId && !this.isCrafted(itemId)) return false;

    const furniture = [...(GameStore.getState(`house.${floorKey}.furniture`) || [])];

    // スロット拡張対応: 配列が短ければ拡張
    const maxSlots = floorKey === 'floor1'
      ? this.getFloor1SlotCount()
      : (Config.HOUSE.SECTION_SLOTS[`${floorKey}_furniture`] || 8);

    while (furniture.length < maxSlots) furniture.push(null);
    if (slotIndex < 0 || slotIndex >= maxSlots) return false;

    furniture[slotIndex] = itemId;
    GameStore.setState(`house.${floorKey}.furniture`, furniture);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  static setGardenDeco(slotIndex, itemId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.GARDEN)) return false;
    if (itemId && !this.isCrafted(itemId)) return false;

    const decos = [...(GameStore.getState('house.garden.decorations') || [])];
    const maxSlots = this.getGardenSlotCount();
    while (decos.length < maxSlots) decos.push(null);
    if (slotIndex < 0 || slotIndex >= maxSlots) return false;

    decos[slotIndex] = itemId;
    GameStore.setState('house.garden.decorations', decos);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

  static setGardenMonster(slotIndex, monsterId) {
    if (!this.isSectionUnlocked(HOUSE_SECTION.GARDEN)) return false;
    if (monsterId) {
      const collected = GameStore.getState('memory.collected') || [];
      if (!collected.includes(monsterId)) return false;
    }
    const monsters = [...(GameStore.getState('house.garden.monsters') || [])];
    if (slotIndex < 0 || slotIndex >= monsters.length) return false;
    monsters[slotIndex] = monsterId;
    GameStore.setState('house.garden.monsters', monsters);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    return true;
  }

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
  // 全ワールドクリア
  // ─────────────────────────────────────────────

  static onAllWorldsCleared() {
    const crafted = GameStore.getState('house.crafted') || [];
    if (!crafted.includes('trophy_guardian')) {
      GameStore.setState('house.crafted', [...crafted, 'trophy_guardian']);
    }
    GameStore.setState('house.sections.tower', true);
    Logger.info('[House] 全ワールドクリア！塔解放＋トロフィー付与');
  }

  // ─────────────────────────────────────────────
  // v3.1 スタイルシステム
  // ─────────────────────────────────────────────

  /**
   * クリア数に応じてスタイルを解放チェック
   * @returns {string[]} 新たに解放されたスタイルID配列
   */
  static checkAndUnlockStyles() {
    const clearedCount = this._getClearedWorldCount();
    const unlocked = [...(GameStore.getState('house.unlockedStyles') || ['style_wood'])];
    const newlyUnlocked = [];

    for (const style of HOUSE_STYLES) {
      if (!unlocked.includes(style.id) && clearedCount >= style.unlockWorld) {
        unlocked.push(style.id);
        newlyUnlocked.push(style.id);
        Logger.info(`[House] スタイル解放: ${style.id} (${style.name})`);
      }
    }

    if (newlyUnlocked.length > 0) {
      GameStore.setState('house.unlockedStyles', unlocked);
      // フォトフレーム解放チェックも同時に行う
      this.checkPhotoFrameUnlocks();
    }

    return newlyUnlocked;
  }

  /**
   * レイヤーにスタイルを設定
   * @param {string} layerId - 'garden'|'floor1'|'floor2'|'floor3'|'tower'|'decoration'
   * @param {string} styleId - スタイルID
   * @returns {boolean}
   */
  static setLayerStyle(layerId, styleId) {
    const unlockedStyles = GameStore.getState('house.unlockedStyles') || [];
    if (!unlockedStyles.includes(styleId)) {
      Logger.warn(`[House] スタイル未解放: ${styleId}`);
      return false;
    }

    const validLayers = ['garden', 'floor1', 'floor2', 'floor3', 'tower', 'decoration'];
    if (!validLayers.includes(layerId)) {
      Logger.warn(`[House] 無効なレイヤー: ${layerId}`);
      return false;
    }

    // 装飾レイヤーはexterior解放後のみ
    if (layerId === 'decoration' && !GameStore.getState('house.sections.exterior')) {
      Logger.warn('[House] 装飾レイヤーは未解放');
      return false;
    }

    GameStore.setState(`house.layerStyles.${layerId}`, styleId);
    GameStore.setState('house.lastUpdated', new Date().toISOString());
    Logger.info(`[House] レイヤースタイル設定: ${layerId} → ${styleId}`);
    return true;
  }

  /**
   * 解放済みスタイル一覧を取得
   * @returns {Object[]} スタイル定義の配列
   */
  static getUnlockedStyles() {
    const ids = GameStore.getState('house.unlockedStyles') || ['style_wood'];
    return HOUSE_STYLES.filter(s => ids.includes(s.id));
  }

  /**
   * フルセットボーナスを計算
   * 何レイヤーが同一スタイルかを数えて演出を返す
   * @returns {{ matchCount: number, matchStyle: string|null, comboName: string|null, bonus: Object|null }}
   */
  static getFullsetBonus() {
    const house = GameStore.getState('house');
    const sections = house.sections || {};
    const layerStyles = house.layerStyles || {};

    // 解放済みレイヤーの選択スタイルを集める
    const activeLayers = [];
    if (sections.garden)    activeLayers.push(layerStyles.garden    || 'style_wood');
    activeLayers.push(layerStyles.floor1 || 'style_wood'); // floor1は常に解放
    if (sections.floor2)    activeLayers.push(layerStyles.floor2    || 'style_wood');
    if (sections.floor3)    activeLayers.push(layerStyles.floor3    || 'style_wood');
    if (sections.tower)     activeLayers.push(layerStyles.tower     || 'style_wood');
    if (sections.exterior)  activeLayers.push(layerStyles.decoration|| null);

    // null（装飾未選択）を除く
    const validLayers = activeLayers.filter(Boolean);
    if (validLayers.length === 0) return { matchCount: 0, matchStyle: null, comboName: null, bonus: null };

    // スタイル出現カウント
    const counts = {};
    for (const s of validLayers) {
      counts[s] = (counts[s] || 0) + 1;
    }

    // 最多スタイル
    const topStyle = Object.entries(counts).sort(([,a],[,b]) => b - a)[0];
    const matchCount = topStyle[1];
    const matchStyle = topStyle[0];

    // ボーナステーブル参照
    const bonuses = Config.HOUSE.FULLSET_BONUSES || [];
    const bonus = [...bonuses].reverse().find(b => matchCount >= b.layers) || null;

    // コンボ名決定
    const comboName = this.getComboName(validLayers);

    return { matchCount, matchStyle, comboName, bonus };
  }

  /**
   * コンボ名を取得
   * @param {string[]} styleIds - 現在の有効レイヤースタイルID配列
   * @returns {string|null}
   */
  static getComboName(styleIds) {
    if (!styleIds || styleIds.length === 0) return null;
    const combos = Config.HOUSE.COMBO_NAMES || [];

    // 全部同じ → allマッチ
    const allSame = styleIds.every(s => s === styleIds[0]);
    if (allSame) {
      const found = combos.find(c => c.match === 'all' && c.style === styleIds[0]);
      if (found) return found.name;
    }

    // 2種混合 → mixマッチ
    const unique = [...new Set(styleIds)];
    for (const combo of combos.filter(c => c.match === 'mix')) {
      const matched = combo.styles.every(s => unique.includes(s));
      if (matched) return combo.name;
    }

    // 全部バラバラ（全ユニーク） → chaos
    if (unique.length === styleIds.length && styleIds.length >= 4) {
      const chaos = combos.find(c => c.match === 'chaos');
      if (chaos) return chaos.name;
    }

    return null;
  }

  /**
   * 解放済みスタイルに応じてフォトフレームを解放
   * @returns {string[]} 新たに解放されたフレームID配列
   */
  static checkPhotoFrameUnlocks() {
    const unlockedStyles = GameStore.getState('house.unlockedStyles') || [];
    const unlockedFrames = [...(GameStore.getState('house.photo.unlockedFrames') || ['frame_simple'])];
    const frames = Config.HOUSE.PHOTO_FRAMES || [];
    const newlyUnlocked = [];

    for (const frame of frames) {
      if (unlockedFrames.includes(frame.id)) continue;
      if (frame.unlockAt === 'initial') continue;
      if (unlockedStyles.includes(frame.unlockAt)) {
        unlockedFrames.push(frame.id);
        newlyUnlocked.push(frame.id);
        Logger.info(`[House] フォトフレーム解放: ${frame.id}`);
      }
    }

    if (newlyUnlocked.length > 0) {
      GameStore.setState('house.photo.unlockedFrames', unlockedFrames);
    }

    return newlyUnlocked;
  }

  /**
   * スタンプをドロップ（宝箱イベント時に呼ぶ）
   * @returns {string|null} ドロップしたスタンプ絵文字
   */
  static dropRandomStamp() {
    const allStamps = Config.HOUSE.PHOTO_STAMPS || [];
    const owned = GameStore.getState('house.photo.unlockedStamps') || [];
    const available = allStamps.filter(s => !owned.includes(s));
    if (available.length === 0) return null;

    const stamp = available[Math.floor(Math.random() * available.length)];
    GameStore.setState('house.photo.unlockedStamps', [...owned, stamp]);
    Logger.info(`[House] スタンプドロップ: ${stamp}`);
    return stamp;
  }

  /**
   * 写真設定を更新
   * @param {'currentFrame'|'currentPose'|'stampPlacements'} key
   * @param {*} value
   */
  static setPhotoSetting(key, value) {
    GameStore.setState(`house.photo.${key}`, value);
  }

  // ─────────────────────────────────────────────
  // ユーティリティ
  // ─────────────────────────────────────────────

  static _getClearedWorldCount() {
    const worlds = GameStore.getState('progress.worlds') || {};
    return Object.values(worlds).filter(w => w && w.cleared).length;
  }
}

export default HouseManager;
