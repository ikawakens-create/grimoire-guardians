/**
 * Logger.js - Grimoire Guardians
 * ログ管理システム
 * 
 * @version 1.0
 * @date 2026-02-15
 */

import { Config } from './Config.js';

/**
 * ログレベル定義
 */
const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

/**
 * Logger クラス
 * アプリケーション全体のログを統一管理
 */
export class Logger {
  static currentLevel = LogLevel[Config.LOG.LOG_LEVEL.toUpperCase()];
  static logs = [];
  static maxLogs = 1000;  // 最大保存ログ数

  /**
   * DEBUG レベルのログ
   * @param  {...any} args - ログメッセージ
   */
  static debug(...args) {
    if (this.currentLevel <= LogLevel.DEBUG) {
      this._log('DEBUG', args, console.log);
    }
  }

  /**
   * INFO レベルのログ
   * @param  {...any} args - ログメッセージ
   */
  static info(...args) {
    if (this.currentLevel <= LogLevel.INFO) {
      this._log('INFO', args, console.info);
    }
  }

  /**
   * WARN レベルのログ
   * @param  {...any} args - ログメッセージ
   */
  static warn(...args) {
    if (this.currentLevel <= LogLevel.WARN) {
      this._log('WARN', args, console.warn);
    }
  }

  /**
   * ERROR レベルのログ
   * @param  {...any} args - ログメッセージ
   */
  static error(...args) {
    if (this.currentLevel <= LogLevel.ERROR) {
      this._log('ERROR', args, console.error);
    }
  }

  /**
   * 内部ログ処理
   * @private
   * @param {string} level - ログレベル
   * @param {Array} args - ログ引数
   * @param {Function} consoleFn - コンソール関数
   */
  static _log(level, args, consoleFn) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message: args
    };

    // コンソール出力
    if (Config.LOG.ENABLE_CONSOLE) {
      const prefix = `[${timestamp}] [${level}]`;
      consoleFn(prefix, ...args);
    }

    // ログ保存
    if (Config.LOG.ENABLE_STORAGE) {
      this._storeLog(logEntry);
    }
  }

  /**
   * ログをメモリに保存
   * @private
   * @param {Object} logEntry - ログエントリ
   */
  static _storeLog(logEntry) {
    this.logs.push(logEntry);

    // 最大ログ数を超えたら古いログを削除
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  /**
   * 保存されたログを取得
   * @returns {Array} ログ配列
   */
  static getLogs() {
    return [...this.logs];
  }

  /**
   * ログをクリア
   */
  static clearLogs() {
    this.logs = [];
    this.info('Logs cleared');
  }

  /**
   * ログをJSON形式でエクスポート
   * @returns {string} JSON文字列
   */
  static exportLogs() {
    const exportData = {
      appName: Config.APP_NAME,
      appVersion: Config.APP_VERSION,
      exportedAt: new Date().toISOString(),
      logs: this.logs
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * パフォーマンス計測開始
   * @param {string} label - 計測ラベル
   */
  static time(label) {
    if (Config.DEBUG.VERBOSE_LOGGING) {
      console.time(label);
    }
  }

  /**
   * パフォーマンス計測終了
   * @param {string} label - 計測ラベル
   */
  static timeEnd(label) {
    if (Config.DEBUG.VERBOSE_LOGGING) {
      console.timeEnd(label);
    }
  }

  /**
   * グループ開始
   * @param {string} label - グループラベル
   */
  static group(label) {
    if (Config.LOG.ENABLE_CONSOLE) {
      console.group(label);
    }
  }

  /**
   * グループ終了
   */
  static groupEnd() {
    if (Config.LOG.ENABLE_CONSOLE) {
      console.groupEnd();
    }
  }

  /**
   * テーブル形式で出力
   * @param {Array|Object} data - データ
   */
  static table(data) {
    if (Config.LOG.ENABLE_CONSOLE) {
      console.table(data);
    }
  }

  /**
   * アサーション
   * @param {boolean} condition - 条件
   * @param  {...any} args - メッセージ
   */
  static assert(condition, ...args) {
    if (!condition) {
      this.error('Assertion failed:', ...args);
      if (Config.IS_DEVELOPMENT) {
        debugger;  // 開発時のみブレークポイント
      }
    }
  }
}

// デフォルトエクスポート
export default Logger;
