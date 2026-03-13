/**
 * SkinManager.js - Grimoire Guardians
 * スキン管理システム
 *
 * 責務:
 *   - スキンの解放判定（クラフト / かけら / ストリーク / マイルストーン / 宝箱）
 *   - 装備中スキンの管理
 *   - かけら収集 → 自動解放
 *   - ストリーク・マイルストーン解放チェック
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from './GameStore.js';
import { Config } from './Config.js';
import Logger from './Logger.js';
import {
  SKINS,
  COLLECTIBLE_SKINS,
  SKIN_OBTAIN,
  FRAGMENTS_NEEDED,
  getSkinById,
} from '../data/skinItems.js';

// ─── 素材絵文字（コスト表示用） ──────────────────────────────
const MATERIAL_EMOJI = {
  wood: '🌲', stone: '⛰️', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};

export class SkinManager {

  // ─────────────────────────────────────────────
  // 参照
  // ─────────────────────────────────────────────

  /** 全スキン定義を返す */
  static getAllSkins() {
    return SKINS;
  }

  /** 解放済みスキンIDの配列を返す */
  static getUnlockedIds() {
    return GameStore.getState('player.unlockedSkins') || ['default'];
  }

  /** 指定スキンが解放済みか */
  static isUnlocked(skinId) {
    return this.getUnlockedIds().includes(skinId);
  }

  /** 現在装備中のスキンIDを返す */
  static getCurrentSkinId() {
    return GameStore.getState('player.currentSkin') || 'default';
  }

  /** 現在装備中のスキン定義オブジェクトを返す */
  static getCurrentSkin() {
    const id = this.getCurrentSkinId();
    return getSkinById(id) || getSkinById('default');
  }

  /** 指定スキンのかけら所持数を返す */
  static getFragmentCount(skinId) {
    const fragments = GameStore.getState('player.skinFragments') || {};
    return fragments[skinId] || 0;
  }

  // ─────────────────────────────────────────────
  // 装備
  // ─────────────────────────────────────────────

  /**
   * スキンを装備する
   * @param {string} skinId
   * @returns {{ success: boolean, reason?: string }}
   */
  static equip(skinId) {
    if (!this.isUnlocked(skinId)) {
      return { success: false, reason: 'まだ解放されていないよ！' };
    }
    GameStore.setState('player.currentSkin', skinId);
    Logger.info(`[SkinManager] 装備: ${skinId}`);
    return { success: true };
  }

  // ─────────────────────────────────────────────
  // クラフト
  // ─────────────────────────────────────────────

  /**
   * クラフト可能かどうかチェック
   * @param {string} skinId
   * @returns {{ craftable: boolean, missing: Object, reason?: string }}
   */
  static canCraft(skinId) {
    const skin = getSkinById(skinId);
    if (!skin) return { craftable: false, missing: {}, reason: 'スキンが見つかりません' };
    if (skin.obtain.method !== SKIN_OBTAIN.CRAFT) {
      return { craftable: false, missing: {}, reason: 'このスキンはクラフトで作れません' };
    }
    if (this.isUnlocked(skinId)) {
      return { craftable: false, missing: {}, reason: 'もう持っているよ！' };
    }

    // 合成屋レベルチェック
    const craftsmanLevel = GameStore.getState('town.buildings.craftsman.level') || 1;
    const requiredLevel  = skin.obtain.tailorLevel || 1;
    if (craftsmanLevel < requiredLevel) {
      return {
        craftable: false,
        missing:   {},
        reason:    `合成屋をLv${requiredLevel}にしよう！`,
      };
    }

    // 素材チェック
    const materials = GameStore.getState('inventory.materials') || {};
    const recipe    = skin.obtain.recipe || {};
    const missing   = {};
    let craftable   = true;

    for (const [mat, req] of Object.entries(recipe)) {
      const have = materials[mat] || 0;
      if (have < req) {
        missing[mat] = req - have;
        craftable    = false;
      }
    }

    return { craftable, missing };
  }

  /**
   * スキンをクラフトして解放する
   * @param {string} skinId
   * @returns {{ success: boolean, reason?: string }}
   */
  static craft(skinId) {
    const { craftable, reason } = this.canCraft(skinId);
    if (!craftable) return { success: false, reason };

    const skin    = getSkinById(skinId);
    const recipe  = skin.obtain.recipe || {};
    const materials = GameStore.getState('inventory.materials') || {};

    // 素材消費
    for (const [mat, cost] of Object.entries(recipe)) {
      GameStore.setState(`inventory.materials.${mat}`, (materials[mat] || 0) - cost);
    }

    this._unlock(skinId);
    Logger.info(`[SkinManager] クラフト解放: ${skinId}`);
    return { success: true };
  }

  // ─────────────────────────────────────────────
  // かけらシステム
  // ─────────────────────────────────────────────

  /**
   * かけらを1つ追加する
   * FRAGMENTS_NEEDED 枚溜まったら自動解放
   * @param {string} skinId
   * @returns {{ success: boolean, combined: boolean, skinId: string }}
   */
  static addFragment(skinId) {
    if (this.isUnlocked(skinId)) {
      // 重複：別のフラグメントスキンに変換（1:1）
      Logger.info(`[SkinManager] かけら重複→変換: ${skinId}`);
      const alt = this._pickRandomFragmentSkin(skinId);
      if (alt) {
        return this.addFragment(alt);
      }
      return { success: false, combined: false, skinId };
    }

    const fragments = { ...(GameStore.getState('player.skinFragments') || {}) };
    fragments[skinId] = (fragments[skinId] || 0) + 1;
    GameStore.setState('player.skinFragments', fragments);

    Logger.info(`[SkinManager] かけら追加: ${skinId} (${fragments[skinId]}/${FRAGMENTS_NEEDED})`);

    if (fragments[skinId] >= FRAGMENTS_NEEDED) {
      this._unlock(skinId);
      // かけらをリセット
      fragments[skinId] = 0;
      GameStore.setState('player.skinFragments', fragments);
      Logger.info(`[SkinManager] かけら解放: ${skinId}`);
      return { success: true, combined: true, skinId };
    }

    return { success: true, combined: false, skinId };
  }

  /**
   * 宝箱開封後にかけらが落ちるかを抽選する
   * @returns {{ dropped: boolean, skinId?: string, combined?: boolean }}
   */
  static rollForFragment() {
    if (Math.random() >= Config.SKIN.FRAGMENT_DROP_RATE) {
      return { dropped: false };
    }

    // かけら入手可能なスキンを探す（FRAGMENT取得のもの）
    const fragmentSkins = COLLECTIBLE_SKINS.filter(s => s.obtain.method === SKIN_OBTAIN.FRAGMENT);
    if (!fragmentSkins.length) return { dropped: false };

    // ランダムに1つ選ぶ（未解放優先だが枯渇したら全体から）
    const locked = fragmentSkins.filter(s => !this.isUnlocked(s.id));
    const pool   = locked.length ? locked : fragmentSkins;
    const chosen = pool[Math.floor(Math.random() * pool.length)];

    const result = this.addFragment(chosen.id);
    return { dropped: true, skinId: chosen.id, ...result };
  }

  // ─────────────────────────────────────────────
  // ストリーク解放チェック
  // ─────────────────────────────────────────────

  /**
   * 現在のストリーク数をもとにストリーク解放スキンを確認
   * 新たに解放されたスキンのID配列を返す
   * @returns {string[]}
   */
  static checkStreakUnlocks() {
    const streak  = GameStore.getState('player.streak') || 1;
    const newlyUnlocked = [];

    const streakSkins = COLLECTIBLE_SKINS.filter(s => s.obtain.method === SKIN_OBTAIN.STREAK);
    for (const skin of streakSkins) {
      if (!this.isUnlocked(skin.id) && streak >= skin.obtain.streakDays) {
        this._unlock(skin.id);
        newlyUnlocked.push(skin.id);
        Logger.info(`[SkinManager] ストリーク解放: ${skin.id} (${streak}日)`);
      }
    }

    return newlyUnlocked;
  }

  // ─────────────────────────────────────────────
  // マイルストーン解放チェック
  // ─────────────────────────────────────────────

  /**
   * 進捗マイルストーンをもとにスキンを確認
   * 新たに解放されたスキンのID配列を返す
   * @returns {string[]}
   */
  static checkMilestoneUnlocks() {
    const newlyUnlocked = [];

    const milestoneSkins = COLLECTIBLE_SKINS.filter(s => s.obtain.method === SKIN_OBTAIN.MILESTONE);
    for (const skin of milestoneSkins) {
      if (this.isUnlocked(skin.id)) continue;
      if (this._checkMilestoneCondition(skin.obtain.milestoneId)) {
        this._unlock(skin.id);
        newlyUnlocked.push(skin.id);
        Logger.info(`[SkinManager] マイルストーン解放: ${skin.id} (${skin.obtain.condition})`);
      }
    }

    return newlyUnlocked;
  }

  // ─────────────────────────────────────────────
  // コレクション統計
  // ─────────────────────────────────────────────

  /**
   * スキンコレクション統計を返す
   * @returns {{ total: number, unlocked: number, completion: number }}
   */
  static getCollectionStats() {
    const total    = COLLECTIBLE_SKINS.length;
    const unlocked = COLLECTIBLE_SKINS.filter(s => this.isUnlocked(s.id)).length;
    return {
      total,
      unlocked,
      completion: total > 0 ? Math.round((unlocked / total) * 100) : 0,
    };
  }

  // ─────────────────────────────────────────────
  // プライベートヘルパー
  // ─────────────────────────────────────────────

  /**
   * スキンを解放してGameStoreに保存
   * @param {string} skinId
   * @private
   */
  static _unlock(skinId) {
    const unlocked = [...(GameStore.getState('player.unlockedSkins') || ['default'])];
    if (!unlocked.includes(skinId)) {
      unlocked.push(skinId);
      GameStore.setState('player.unlockedSkins', unlocked);
    }
  }

  /**
   * マイルストーン条件チェック
   * @param {string} condition
   * @returns {boolean}
   * @private
   */
  static _checkMilestoneCondition(condition) {
    const worlds   = GameStore.getState('progress.worlds') || {};
    const buildings = GameStore.getState('town.buildings') || {};

    switch (condition) {
      case 'worlds_16_clear': {
        const clearedCount = Object.values(worlds).filter(w => w.cleared).length;
        return clearedCount >= 16;
      }
      case 'library_lv3': {
        return (buildings.library?.level || 0) >= 3;
      }
      case 'all_worlds_clear': {
        const clearedCount = Object.values(worlds).filter(w => w.cleared).length;
        return clearedCount >= 33;
      }
      case 'all_facilities_max': {
        const maxLevel = Config.TOWN.MAX_BUILDING_LEVEL;
        return Object.values(buildings).every(b => (b.level || 0) >= maxLevel);
      }
      default:
        return false;
    }
  }

  /**
   * フラグメント入手可能なスキンからランダムに1つ選ぶ（重複変換用）
   * @param {string} excludeId - 除外するID
   * @returns {string|null}
   * @private
   */
  static _pickRandomFragmentSkin(excludeId) {
    const pool = COLLECTIBLE_SKINS.filter(
      s => s.obtain.method === SKIN_OBTAIN.FRAGMENT && s.id !== excludeId && !this.isUnlocked(s.id)
    );
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)].id;
  }
}

export default SkinManager;
