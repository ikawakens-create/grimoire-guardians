/**
 * GameStore.js - Grimoire Guardians
 * アプリケーション全体の状態管理（State Management）
 * 
 * @version 1.0
 * @date 2026-02-15
 */

import { Config } from './Config.js';
import Logger from './Logger.js';

/**
 * GameStore クラス
 * アプリケーションの状態を一元管理
 * 
 * 設計原則:
 * - Single Source of Truth（唯一の真実の源）
 * - Immutable State（状態の不変性）
 * - Observable Pattern（監視可能なパターン）
 */
export class GameStore {
  static state = {
    // アプリケーション状態
    app: {
      isInitialized: false,
      isLoading: false,
      currentScreen: 'loading',  // 'loading' | 'bookshelf' | 'quiz' | 'result' | 'clear'
      error: null
    },

    // プレイヤー情報
    player: {
      name: 'プレイヤー',
      createdAt: null,
      lastPlayedAt: null,
      /** 連続プレイ日数 */
      streak: 1,
      /** ストリーク最終更新日（Date.toDateString()形式） */
      streakLastDate: null
    },

    // 進捗情報
    progress: {
      subject: Config.GAME.SUBJECT,
      grade: Config.GAME.GRADE,
      worlds: {},  // { 'world_1': { ... }, 'world_2': { ... } }
      stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
        totalPlayTime: 0
      }
    },

    // インベントリ（v1.2）
    inventory: {
      materials: {
        wood: 0,
        stone: 0,
        brick: 0,
        gem: 0,
        star_fragment: 0,
        cloth: 0,
        paint: 0,
        crown: 0,
        cape: 0,
        magic_orb: 0
      }
    },

    // 現在のクイズセッション
    currentSession: {
      worldId: null,
      unitId: null,
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      startedAt: null,
      rewardMultiplier: 1.0,  // おみくじの倍率
      shieldActive: false,     // おまもり
      activeBuffs: []          // 有効なバフ一覧 [{ type, value?, appliedAt }]
    },

    // ライセンス情報
    license: {
      core: {
        licensed: false,
        licenseKey: '',
        activatedAt: null
      },
      dlc: {}
    }
  };

  // 状態変更の監視者
  static observers = [];

  /**
   * 状態を取得
   * @param {string} path - 状態のパス（例: 'player.name'）
   * @returns {*} 状態の値
   */
  static getState(path = null) {
    if (!path) {
      return this.state;
    }

    const keys = path.split('.');
    let value = this.state;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        Logger.warn(`State path not found: ${path}`);
        return undefined;
      }
    }

    return value;
  }

  /**
   * 状態を更新
   * @param {string} path - 状態のパス
   * @param {*} value - 新しい値
   */
  static setState(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = this.state;

    // パスを辿る
    for (const key of keys) {
      if (!(key in target)) {
        target[key] = {};
      }
      target = target[key];
    }

    // 値を更新
    const oldValue = target[lastKey];
    target[lastKey] = value;

    // ログ
    if (Config.DEBUG.LOG_STATE_CHANGES) {
      Logger.debug(`[State] ${path}:`, oldValue, '→', value);
    }

    // 監視者に通知
    this.notifyObservers(path, value, oldValue);
  }

  /**
   * 状態を部分的にマージ
   * @param {string} path - 状態のパス
   * @param {Object} updates - 更新する値（オブジェクト）
   */
  static mergeState(path, updates) {
    const current = this.getState(path);
    
    if (typeof current !== 'object' || current === null) {
      Logger.error(`Cannot merge into non-object state: ${path}`);
      return;
    }

    const newValue = { ...current, ...updates };
    this.setState(path, newValue);
  }

  /**
   * 監視者を登録
   * @param {Function} callback - 状態変更時のコールバック
   * @returns {Function} 解除関数
   */
  static subscribe(callback) {
    this.observers.push(callback);

    // 解除関数を返す
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  /**
   * 監視者に通知
   * @private
   * @param {string} path - 変更されたパス
   * @param {*} newValue - 新しい値
   * @param {*} oldValue - 古い値
   */
  static notifyObservers(path, newValue, oldValue) {
    for (const observer of this.observers) {
      try {
        observer(path, newValue, oldValue);
      } catch (error) {
        Logger.error('Observer error:', error);
      }
    }
  }

  /**
   * 状態をリセット
   */
  static reset() {
    Logger.info('Resetting game state...');
    
    this.state = {
      app: {
        isInitialized: true,
        isLoading: false,
        currentScreen: 'bookshelf',
        error: null
      },
      player: {
        name: 'プレイヤー',
        createdAt: new Date().toISOString(),
        lastPlayedAt: new Date().toISOString(),
        streak: 1,
        streakLastDate: null
      },
      progress: {
        subject: Config.GAME.SUBJECT,
        grade: Config.GAME.GRADE,
        worlds: {},
        stats: {
          totalQuestions: 0,
          correctAnswers: 0,
          accuracy: 0,
          totalPlayTime: 0
        }
      },
      inventory: {
        materials: {
          wood: 0,
          stone: 0,
          brick: 0,
          gem: 0,
          star_fragment: 0,
          cloth: 0,
          paint: 0,
          crown: 0,
          cape: 0,
          magic_orb: 0
        }
      },
      currentSession: {
        worldId: null,
        unitId: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        startedAt: null,
        rewardMultiplier: 1.0,
        shieldActive: false,
        activeBuffs: []
      },
      license: {
        core: {
          licensed: false,
          licenseKey: '',
          activatedAt: null
        },
        dlc: {}
      }
    };

    this.notifyObservers('*', this.state, null);
  }

  /**
   * ワールド進捗を更新
   * @param {string} worldId - ワールドID
   * @param {Object} progressData - 進捗データ
   */
  static updateWorldProgress(worldId, progressData) {
    const currentProgress = this.getState(`progress.worlds.${worldId}`) || {};
    const newProgress = {
      ...currentProgress,
      ...progressData,
      lastPlayedAt: new Date().toISOString()
    };

    this.setState(`progress.worlds.${worldId}`, newProgress);
  }

  /**
   * インベントリに素材を追加
   * @param {string} materialId - 素材ID
   * @param {number} count - 追加数
   */
  static addMaterial(materialId, count) {
    const currentCount = this.getState(`inventory.materials.${materialId}`) || 0;
    const newCount = currentCount + count;
    
    this.setState(`inventory.materials.${materialId}`, newCount);
    Logger.info(`[Inventory] +${count} ${materialId} (total: ${newCount})`);
  }

  /**
   * 統計情報を更新
   * @param {Object} stats - 統計データ
   */
  static updateStats(stats) {
    this.mergeState('progress.stats', stats);
  }

  /**
   * クイズセッションを開始
   * @param {string} worldId - ワールドID
   * @param {string} unitId - 単元ID
   * @param {Array} questions - 問題リスト
   */
  static startQuizSession(worldId, unitId, questions) {
    this.setState('currentSession', {
      worldId,
      unitId,
      questions,
      currentQuestionIndex: 0,
      answers: [],
      startedAt: new Date().toISOString(),
      rewardMultiplier: 1.0,
      shieldActive: false,
      activeBuffs: []
    });

    Logger.info(`[Session] Started: ${worldId} (${questions.length} questions)`);
  }

  /**
   * 回答を記録
   * @param {number} questionIndex - 問題番号
   * @param {*} answer - 回答
   * @param {boolean} isCorrect - 正解かどうか
   */
  static recordAnswer(questionIndex, answer, isCorrect) {
    const answers = this.getState('currentSession.answers');
    answers[questionIndex] = { answer, isCorrect, answeredAt: Date.now() };
    
    this.setState('currentSession.answers', answers);
    Logger.debug(`[Answer] Q${questionIndex + 1}: ${isCorrect ? '✓' : '✗'}`);
  }

  /**
   * 次の問題へ
   */
  static nextQuestion() {
    const currentIndex = this.getState('currentSession.currentQuestionIndex');
    this.setState('currentSession.currentQuestionIndex', currentIndex + 1);
  }

  /**
   * おみくじの倍率を設定
   * @param {number} multiplier - 倍率
   */
  static setRewardMultiplier(multiplier) {
    this.setState('currentSession.rewardMultiplier', multiplier);
    Logger.info(`[Omikuji] Multiplier set to ×${multiplier}`);
  }

  /**
   * おまもりを有効化
   */
  static activateShield() {
    this.setState('currentSession.shieldActive', true);
    Logger.info('[Omikuji] Shield activated');
  }

  /**
   * おまもりを使用
   * @returns {boolean} おまもりが有効だったか
   */
  static useShield() {
    const isActive = this.getState('currentSession.shieldActive');
    if (isActive) {
      this.setState('currentSession.shieldActive', false);
      Logger.info('[Shield] Used');
      return true;
    }
    return false;
  }

  /**
   * バフを追加する
   * @param {{ type: string, value?: number }} buff - バフ情報
   */
  static addBuff(buff) {
    const current = this.getState('currentSession.activeBuffs') || [];
    this.setState('currentSession.activeBuffs', [
      ...current,
      { ...buff, appliedAt: Date.now() }
    ]);
    Logger.info('[Buff] Added:', buff);
  }

  /**
   * 有効なバフ一覧を返す
   * @returns {Array}
   */
  static getActiveBuffs() {
    return this.getState('currentSession.activeBuffs') || [];
  }

  /**
   * セッションをクリアする（次のワールド開始前）
   */
  static clearSession() {
    this.setState('currentSession', {
      worldId: null,
      unitId: null,
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      startedAt: null,
      rewardMultiplier: 1.0,
      shieldActive: false,
      activeBuffs: []
    });
    Logger.info('[Session] Cleared');
  }

  /**
   * デバッグ用: 全ワールドをアンロック
   */
  static unlockAllWorlds() {
    if (!Config.DEBUG.ENABLE_CHEATS) {
      Logger.warn('Cheats are disabled');
      return;
    }

    Logger.warn('[CHEAT] Unlocking all worlds');
    this.setState('license.core.licensed', true);
  }

  /**
   * 状態をJSON形式で取得
   * @returns {string} JSON文字列
   */
  static toJSON() {
    return JSON.stringify(this.state, null, 2);
  }

  /**
   * JSONから状態を復元
   * @param {string} json - JSON文字列
   */
  static fromJSON(json) {
    try {
      const parsed = JSON.parse(json);
      this.state = parsed;
      this.notifyObservers('*', this.state, null);
      Logger.info('State restored from JSON');
    } catch (error) {
      Logger.error('Failed to restore state from JSON:', error);
    }
  }
}

// デフォルトエクスポート
export default GameStore;
