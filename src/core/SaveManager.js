/**
 * SaveManager.js - Grimoire Guardians
 * IndexedDB を用いたセーブデータ管理
 *
 * 機能:
 *   - IndexedDB への保存・ロード（localStorage フォールバック付き）
 *   - 連続プレイ日数（ストリーク）の計算・更新
 *   - GameStore との双方向同期
 *
 * @version 1.0
 * @date 2026-02-22
 */

import Logger from './Logger.js';
import { GameStore } from './GameStore.js';
import { Config } from './Config.js';

/** 保存対象のデータキー */
const SAVE_KEY = 'main';

/**
 * SaveManager クラス（シングルトン）
 * セーブデータの読み書きと連続プレイ日数の管理を担う
 */
class SaveManagerClass {
  constructor() {
    /** @type {IDBDatabase|null} */
    this._db = null;
    /** @type {boolean} IndexedDB が使用可能か */
    this._ready = false;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * IndexedDB を初期化してセーブデータをロードする
   * @returns {Promise<void>}
   */
  async init() {
    try {
      Logger.info('[SaveManager] IndexedDB を初期化中...');
      this._db = await this._openDB();
      this._ready = true;
      Logger.info('[SaveManager] IndexedDB 初期化完了');
    } catch (err) {
      Logger.warn('[SaveManager] IndexedDB 利用不可、localStorage にフォールバック:', err.message);
      this._ready = false;
    }

    await this.load();
  }

  /**
   * 現在の GameStore 状態を保存する
   * @returns {Promise<void>}
   */
  async save() {
    // 本日プレイ済みとしてストリークを更新
    this._markPlayedToday();

    const state = GameStore.getState();
    const saveData = {
      id: SAVE_KEY,
      player: state.player,
      progress: state.progress,
      inventory: state.inventory,
      memory: state.memory,
      house: state.house,
      savedAt: new Date().toISOString(),
      version: Config.APP_VERSION
    };

    if (this._ready && this._db) {
      try {
        await this._idbPut('playerData', saveData);
        Logger.debug('[SaveManager] IndexedDB に保存完了');
        return;
      } catch (err) {
        Logger.warn('[SaveManager] IndexedDB 保存失敗、localStorage に退避:', err.message);
      }
    }

    this._lsSave(saveData);
  }

  /**
   * セーブデータをロードして GameStore に反映する
   * @returns {Promise<void>}
   */
  async load() {
    let saveData = null;

    if (this._ready && this._db) {
      try {
        saveData = await this._idbGet('playerData', SAVE_KEY);
      } catch (err) {
        Logger.warn('[SaveManager] IndexedDB 読み込み失敗:', err.message);
      }
    }

    if (!saveData) {
      saveData = this._lsLoad();
    }

    if (saveData) {
      this._applyToStore(saveData);
      Logger.info('[SaveManager] セーブデータ反映完了');
    } else {
      Logger.info('[SaveManager] セーブデータなし → 新規プレイヤーとして開始');
      this._initNewPlayer();
    }
  }

  // ─────────────────────────────────────────
  // プライベート: IndexedDB 操作
  // ─────────────────────────────────────────

  /**
   * IndexedDB を開く（スキーマが古ければアップグレード）
   * @returns {Promise<IDBDatabase>}
   */
  _openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(Config.STORAGE.DB_NAME, Config.STORAGE.DB_VERSION);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('playerData')) {
          db.createObjectStore('playerData', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'worldId' });
        }
      };

      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror  = (e) => reject(e.target.error);
    });
  }

  /**
   * @param {string} storeName
   * @param {Object} data
   * @returns {Promise<void>}
   */
  _idbPut(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx   = this._db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req   = store.put(data);
      req.onsuccess = () => resolve();
      req.onerror   = (e) => reject(e.target.error);
    });
  }

  /**
   * @param {string} storeName
   * @param {*} key
   * @returns {Promise<*>}
   */
  _idbGet(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx    = this._db.transaction(storeName, 'readonly');
      const store  = tx.objectStore(storeName);
      const req    = store.get(key);
      req.onsuccess = (e) => resolve(e.target.result || null);
      req.onerror   = (e) => reject(e.target.error);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: localStorage フォールバック
  // ─────────────────────────────────────────

  /** @param {Object} saveData */
  _lsSave(saveData) {
    try {
      localStorage.setItem(Config.STORAGE.SAVE_DATA_KEY, JSON.stringify(saveData));
      Logger.debug('[SaveManager] localStorage に保存完了');
    } catch (err) {
      Logger.error('[SaveManager] localStorage 保存失敗:', err);
    }
  }

  /** @returns {Object|null} */
  _lsLoad() {
    try {
      const raw = localStorage.getItem(Config.STORAGE.SAVE_DATA_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      Logger.error('[SaveManager] localStorage 読み込み失敗:', err);
      return null;
    }
  }

  // ─────────────────────────────────────────
  // プライベート: GameStore 連携
  // ─────────────────────────────────────────

  /**
   * セーブデータを GameStore に反映する
   * @param {Object} saveData
   */
  _applyToStore(saveData) {
    if (saveData.player) {
      GameStore.setState('player', {
        ...GameStore.getState('player'),
        ...saveData.player
      });
    }
    if (saveData.progress) {
      GameStore.setState('progress', {
        ...GameStore.getState('progress'),
        ...saveData.progress
      });
    }
    if (saveData.inventory) {
      GameStore.setState('inventory', {
        ...GameStore.getState('inventory'),
        ...saveData.inventory
      });
    }
    if (saveData.memory) {
      GameStore.setState('memory', {
        ...GameStore.getState('memory'),
        ...saveData.memory
      });
    }
    if (saveData.house) {
      GameStore.setState('house', {
        ...GameStore.getState('house'),
        ...saveData.house
      });
    }

    // ストリーク計算（ロード後に実施）
    this._computeStreak();
  }

  /**
   * 新規プレイヤーの初期化
   */
  _initNewPlayer() {
    const now = new Date().toISOString();
    GameStore.setState('player.createdAt', now);
    GameStore.setState('player.lastPlayedAt', now);
    GameStore.setState('player.streak', 1);
    GameStore.setState('player.streakLastDate', new Date().toDateString());
    Logger.info('[SaveManager] 新規プレイヤー初期化完了');
  }

  // ─────────────────────────────────────────
  // プライベート: ストリーク計算
  // ─────────────────────────────────────────

  /**
   * 連続プレイ日数を計算して GameStore に反映する
   * - 今日: 変化なし
   * - 昨日: +1
   * - それ以前 / 未設定: 1 にリセット
   */
  _computeStreak() {
    const streakLastDate = GameStore.getState('player.streakLastDate');
    let streak           = GameStore.getState('player.streak') || 1;

    const today     = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86_400_000).toDateString();

    if (!streakLastDate) {
      // 初回ロード: 今日からストリーク開始
      GameStore.setState('player.streak', 1);
      GameStore.setState('player.streakLastDate', today);
      Logger.info('[SaveManager] ストリーク初期化: 1日');
    } else if (streakLastDate === today) {
      // 今日すでにプレイ済み: 変化なし
      Logger.debug('[SaveManager] 本日プレイ済み、ストリーク維持:', streak);
    } else if (streakLastDate === yesterday) {
      // 昨日プレイ → 連続！
      streak++;
      GameStore.setState('player.streak', streak);
      GameStore.setState('player.streakLastDate', today);
      Logger.info(`[SaveManager] ストリーク継続: ${streak}日`);
    } else {
      // 1日以上空いた → リセット
      GameStore.setState('player.streak', 1);
      GameStore.setState('player.streakLastDate', today);
      Logger.info('[SaveManager] ストリーク途絶 → リセット: 1日');
    }
  }

  /**
   * 今日プレイしたことを記録する（保存時に呼ぶ）
   */
  _markPlayedToday() {
    const today          = new Date().toDateString();
    const streakLastDate = GameStore.getState('player.streakLastDate');

    if (streakLastDate !== today) {
      // 今日初プレイ: streakLastDate を更新
      GameStore.setState('player.streakLastDate', today);
      GameStore.setState('player.lastPlayedAt', new Date().toISOString());
    }
  }
}

/** シングルトンインスタンス */
export const SaveManager = new SaveManagerClass();
export default SaveManager;
