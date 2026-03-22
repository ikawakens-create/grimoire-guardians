/**
 * TownManager.js - Grimoire Guardians
 * 街のシステム管理（施設アップグレード・解放・商店・農場）
 *
 * 設計:
 *   - 合成屋がアップグレードハブ（合成屋Lvが他施設の上限を決定）
 *   - 施設解放はクリア済みワールド数に基づく
 *   - 農場はクイズ完了数で収穫判定
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from './GameStore.js';
import { Config } from './Config.js';
import Logger from './Logger.js';
import { SaveManager } from './SaveManager.js';

// ─── 定数 ─────────────────────────────────────────────
const MATERIAL_EMOJI = {
  wood: '🌲', stone: '⛰️', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};

class TownManagerClass {

  // ─────────────────────────────────────────
  // 施設情報取得
  // ─────────────────────────────────────────

  /**
   * 全施設の現在状態を返す
   * @returns {Array<{config, level, isUnlocked, canUpgrade, nextPerk}>}
   */
  getAllBuildingStates() {
    const clearedCount = this._getClearedWorldCount();
    return Config.TOWN.BUILDINGS.map(cfg => this._getBuildingState(cfg, clearedCount));
  }

  /**
   * 単一施設の状態を返す
   * @param {string} buildingId
   * @returns {{config, level, isUnlocked, canUpgrade, nextPerk, missingForUpgrade}}
   */
  getBuildingState(buildingId) {
    const cfg = Config.TOWN.BUILDINGS.find(b => b.id === buildingId);
    if (!cfg) return null;
    return this._getBuildingState(cfg, this._getClearedWorldCount());
  }

  /** 合成屋の現在レベル */
  getCraftsmanLevel() {
    return GameStore.getState('town.buildings.craftsman.level') || 1;
  }

  /** 合成屋レベルに基づく他施設の最大許容レベル */
  getMaxAllowedLevel() {
    const hubLv = this.getCraftsmanLevel();
    return Config.TOWN.HUB_UNLOCK_TABLE[hubLv] || 1;
  }

  // ─────────────────────────────────────────
  // 施設解放チェック（クイズ後に呼ぶ）
  // ─────────────────────────────────────────

  /**
   * ワールド進捗に基づいて施設を解放する
   * @returns {string[]} 新たに解放された施設IDの配列
   */
  checkAndUnlockBuildings() {
    const clearedCount = this._getClearedWorldCount();
    const newlyUnlocked = [];

    // craftsman/library は最初から解放、house_build/house は GameStore 管理外
    const SKIP_IDS = new Set(['craftsman', 'library', 'house_build', 'house']);
    for (const cfg of Config.TOWN.BUILDINGS) {
      if (SKIP_IDS.has(cfg.id)) continue;
      const currentLevel = GameStore.getState(`town.buildings.${cfg.id}.level`) || 0;
      if (currentLevel === 0 && clearedCount >= cfg.unlockWorlds) {
        GameStore.setState(`town.buildings.${cfg.id}.level`, 1);
        newlyUnlocked.push(cfg.id);
        Logger.info(`[TownManager] 施設解放: ${cfg.name}`);
      }
    }

    if (newlyUnlocked.length) {
      SaveManager.save().catch(e => Logger.warn('[TownManager] save失敗', e));
    }
    return newlyUnlocked;
  }

  // ─────────────────────────────────────────
  // 施設アップグレード（合成屋で実行）
  // ─────────────────────────────────────────

  /**
   * 施設をアップグレード
   * @param {string} buildingId
   * @returns {{ success: boolean, reason?: string, newLevel?: number }}
   */
  upgrade(buildingId) {
    const state = this.getBuildingState(buildingId);
    if (!state) return { success: false, reason: '施設が見つかりません' };
    if (!state.isUnlocked) return { success: false, reason: 'まだ解放されていません' };

    const { level, config } = state;
    const maxLevel = Config.TOWN.MAX_BUILDING_LEVEL;
    if (level >= maxLevel) return { success: false, reason: '最大レベルです' };

    // 合成屋以外は合成屋Lvが上限
    if (!config.isUpgradeHub && level >= this.getMaxAllowedLevel()) {
      return { success: false, reason: `合成屋をLv${level + 1}にアップしてください` };
    }

    const costKey = `${level}_to_${level + 1}`;
    const cost = Config.TOWN.UPGRADE_COSTS[costKey];
    if (!cost) return { success: false, reason: 'コスト定義なし' };

    // 素材チェック
    const { canAfford, missing } = this._checkCost(cost);
    if (!canAfford) {
      const missingStr = Object.entries(missing)
        .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ');
      return { success: false, reason: `素材が足りない… (${missingStr})` };
    }

    // 素材消費
    this._consumeMaterials(cost);
    const newLevel = level + 1;
    GameStore.setState(`town.buildings.${buildingId}.level`, newLevel);
    SaveManager.save().catch(e => Logger.warn('[TownManager] save失敗', e));

    Logger.info(`[TownManager] アップグレード: ${buildingId} Lv${level}→${newLevel}`);
    return { success: true, newLevel };
  }

  /**
   * アップグレードに必要な素材のプレビュー
   * @param {string} buildingId
   * @returns {{ cost: Object|null, canAfford: boolean, missing: Object }}
   */
  getUpgradeCost(buildingId) {
    const state = this.getBuildingState(buildingId);
    if (!state || !state.isUnlocked) return { cost: null, canAfford: false, missing: {} };
    const costKey = `${state.level}_to_${state.level + 1}`;
    const cost = Config.TOWN.UPGRADE_COSTS[costKey];
    if (!cost) return { cost: null, canAfford: false, missing: {} };
    return { cost, ...this._checkCost(cost) };
  }

  // ─────────────────────────────────────────
  // 商店
  // ─────────────────────────────────────────

  /** 今日の無料アイテムID（請求済みならnull） */
  getDailyFreeItem() {
    const shopLevel = GameStore.getState('town.buildings.shop.level') || 0;
    if (shopLevel === 0) return null;

    const today = new Date().toISOString().slice(0, 10);
    const claimed = GameStore.getState('town.shop.dailyFreeClaimedDate');
    if (claimed === today) return null;

    const dow = new Date().getDay();
    return Config.TOWN.SHOP.DAILY_FREE[dow] || 'wood';
  }

  /** 無料アイテムを受け取る */
  claimDailyFreeItem() {
    const item = this.getDailyFreeItem();
    if (!item) return { success: false, reason: '今日はもう受け取り済みです' };

    GameStore.addMaterial(item, 1);
    const today = new Date().toISOString().slice(0, 10);
    GameStore.setState('town.shop.dailyFreeClaimedDate', today);
    SaveManager.save().catch(e => Logger.warn('[TownManager] save失敗', e));
    Logger.info(`[TownManager] 無料アイテム受取: ${item}`);
    return { success: true, material: item };
  }

  /** 現在利用可能なトレード一覧 */
  getAvailableTrades() {
    const shopLevel = GameStore.getState('town.buildings.shop.level') || 0;
    if (shopLevel === 0) return [];
    // Lv2以上はレア素材トレード追加
    return Config.TOWN.SHOP.TRADE_RATES.slice(0, shopLevel + 1);
  }

  /**
   * トレードを実行
   * @param {number} tradeIndex
   * @returns {{ success: boolean, reason?: string }}
   */
  executeTrade(tradeIndex) {
    const trades = this.getAvailableTrades();
    const trade = trades[tradeIndex];
    if (!trade) return { success: false, reason: 'トレードが見つかりません' };

    const { give, receive } = trade;
    const have = GameStore.getState(`inventory.materials.${give.material}`) || 0;
    if (have < give.amount) {
      return { success: false, reason: `${MATERIAL_EMOJI[give.material]}が足りません` };
    }

    GameStore.addMaterial(give.material, -give.amount);
    GameStore.addMaterial(receive.material, receive.amount);
    SaveManager.save().catch(e => Logger.warn('[TownManager] save失敗', e));
    Logger.info(`[TownManager] トレード: ${give.material}×${give.amount} → ${receive.material}×${receive.amount}`);
    return { success: true };
  }

  // ─────────────────────────────────────────
  // 農場
  // ─────────────────────────────────────────

  /** 現在の農場プロット数 */
  getFarmPlotCount() {
    const level = GameStore.getState('town.buildings.farm.level') || 0;
    if (level === 0) return 0;
    return Config.TOWN.FARM.BASE_PLOTS + (level - 1) * Config.TOWN.FARM.PLOTS_PER_LEVEL;
  }

  /** 農場プロットの状態配列を返す */
  getFarmPlots() {
    const total = this.getFarmPlotCount();
    const plots = GameStore.getState('town.farm.plots') || [];
    const quizTotal = GameStore.getState('town.farm.quizTotal') || 0;

    return Array.from({ length: total }, (_, i) => {
      const plot = plots[i] || null;
      if (!plot) return { index: i, state: 'empty' };
      const ready = quizTotal >= plot.readyQuizTotal;
      return { index: i, state: ready ? 'ready' : 'growing', seed: plot.seed, plot };
    });
  }

  /**
   * 種を植える
   * @param {number} plotIndex
   * @param {string} material - 使用する素材
   */
  plantSeed(plotIndex, material) {
    const have = GameStore.getState(`inventory.materials.${material}`) || 0;
    if (have < 1) return { success: false, reason: '素材が足りません' };

    const harvestDef = Config.TOWN.FARM.HARVEST_TABLE[material];
    if (!harvestDef) return { success: false, reason: '種にできない素材です' };

    const quizTotal = GameStore.getState('town.farm.quizTotal') || 0;
    const plots = [...(GameStore.getState('town.farm.plots') || [])];

    GameStore.addMaterial(material, -1);
    plots[plotIndex] = {
      seed: material,
      plantedQuizTotal: quizTotal,
      readyQuizTotal: quizTotal + Config.TOWN.FARM.HARVEST_QUIZ_COUNT,
    };
    GameStore.setState('town.farm.plots', plots);
    SaveManager.save().catch(e => Logger.warn('[TownManager] save失敗', e));
    Logger.info(`[TownManager] 種まき: [${plotIndex}] ${material}`);
    return { success: true };
  }

  /**
   * 収穫
   * @param {number} plotIndex
   */
  harvestPlot(plotIndex) {
    const farmPlots = this.getFarmPlots();
    const plotState = farmPlots[plotIndex];
    if (!plotState || plotState.state !== 'ready') {
      return { success: false, reason: 'まだ収穫できません' };
    }

    const harvestDef = Config.TOWN.FARM.HARVEST_TABLE[plotState.seed];
    const gives = harvestDef.gives;
    GameStore.addMaterial(gives, harvestDef.bonus + 1); // 植えた分+1

    // レアボーナス判定
    let bonusMaterial = null;
    if (harvestDef.rare && Math.random() < harvestDef.rare.chance) {
      bonusMaterial = harvestDef.rare.material;
      GameStore.addMaterial(bonusMaterial, 1);
    }

    // プロットを空に
    const plots = [...(GameStore.getState('town.farm.plots') || [])];
    plots[plotIndex] = null;
    GameStore.setState('town.farm.plots', plots);
    SaveManager.save().catch(e => Logger.warn('[TownManager] save失敗', e));

    Logger.info(`[TownManager] 収穫: [${plotIndex}] ${gives}${bonusMaterial ? ' + '+bonusMaterial : ''}`);
    return { success: true, material: gives, bonus: bonusMaterial };
  }

  /**
   * クイズ完了時に呼ぶ（農場カウンタを更新）
   */
  onQuizCompleted() {
    // 施設解放チェックは farm の状態に関わらず常に実行
    this.checkAndUnlockBuildings();

    const farmLevel = GameStore.getState('town.buildings.farm.level') || 0;
    if (farmLevel === 0) return;
    const current = GameStore.getState('town.farm.quizTotal') || 0;
    GameStore.setState('town.farm.quizTotal', current + 1);
  }

  // ─────────────────────────────────────────
  // 魔導書庫
  // ─────────────────────────────────────────

  /** クリア済みユニットIDの配列を返す */
  getClearedUnits() {
    const worlds = GameStore.getState('progress.worlds') || {};
    return Object.entries(worlds)
      .filter(([, w]) => w.cleared)
      .map(([id]) => id);
  }

  // ─────────────────────────────────────────
  // 通知バッジ
  // ─────────────────────────────────────────

  /**
   * 施設IDごとの通知有無を返す
   * @returns {Object} { buildingId: boolean }
   */
  getNotifications() {
    const result = {};
    // 商店: 無料アイテム未受取
    result.shop = !!this.getDailyFreeItem();
    // 農場: 収穫可能プロット
    result.farm = this.getFarmPlots().some(p => p.state === 'ready');
    // 合成屋・書庫・ギルド: 常にfalse（今後拡張）
    result.craftsman = false;
    result.library   = false;
    result.guild     = false;
    return result;
  }

  // ─────────────────────────────────────────
  // ヘルパー
  // ─────────────────────────────────────────

  _getBuildingState(cfg, clearedCount) {
    const level = GameStore.getState(`town.buildings.${cfg.id}.level`) || 0;
    const isUnlocked = level > 0;
    const isLockedByWorlds = !isUnlocked && clearedCount < cfg.unlockWorlds;
    const maxLevel = Config.TOWN.MAX_BUILDING_LEVEL;
    const maxAllowed = cfg.isUpgradeHub ? maxLevel : this.getMaxAllowedLevel();

    const costKey = `${level}_to_${level + 1}`;
    const cost = Config.TOWN.UPGRADE_COSTS[costKey];
    const { canAfford = false, missing = {} } = cost ? this._checkCost(cost) : {};

    const canUpgrade = isUnlocked && level < maxLevel && level < maxAllowed && !!cost;
    const nextPerk = (Config.TOWN.LEVEL_PERKS[cfg.id] || {})[level + 1] || null;
    const worldsLeft = Math.max(0, cfg.unlockWorlds - clearedCount);
    const buildingImagePath = `assets/town/buildings/${cfg.id}_lv${Math.max(1, level)}.png`;

    return {
      config: cfg,
      level,
      isUnlocked,
      isLockedByWorlds,
      worldsLeft,
      canUpgrade,
      canAfford,
      missing,
      cost,
      nextPerk,
      maxLevel,
      maxAllowed,
      buildingImagePath,
    };
  }

  _getClearedWorldCount() {
    const worlds = GameStore.getState('progress.worlds') || {};
    return Object.values(worlds).filter(w => w.cleared).length;
  }

  _checkCost(cost) {
    const materials = GameStore.getState('inventory.materials') || {};
    const missing = {};
    let canAfford = true;
    for (const [mat, req] of Object.entries(cost)) {
      const have = materials[mat] || 0;
      if (have < req) {
        canAfford = false;
        missing[mat] = req - have;
      }
    }
    return { canAfford, missing };
  }

  _consumeMaterials(cost) {
    for (const [mat, amount] of Object.entries(cost)) {
      GameStore.addMaterial(mat, -amount);
    }
  }
}

export const TownManager = new TownManagerClass();
export default TownManager;
