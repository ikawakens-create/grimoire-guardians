/**
 * TypeValidator.js - Grimoire Guardians
 * 型検証ユーティリティ
 * 
 * Pure JavaScriptプロジェクトでの型安全性を向上
 * TypeScriptの代替として実行時の型チェックを提供
 * 
 * @version 1.0
 * @date 2026-02-15
 */

import Logger from '../core/Logger.js';
import { Config } from '../core/Config.js';

/**
 * TypeValidator クラス
 * データ型の検証を行う
 */
export class TypeValidator {
  /**
   * 文字列かどうかをチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名（エラー表示用）
   * @returns {boolean} 検証結果
   */
  static isString(value, name = 'value') {
    const valid = typeof value === 'string';
    if (!valid) {
      this._logError(name, 'string', typeof value);
    }
    return valid;
  }

  /**
   * 数値かどうかをチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isNumber(value, name = 'value') {
    const valid = typeof value === 'number' && !isNaN(value);
    if (!valid) {
      this._logError(name, 'number', typeof value);
    }
    return valid;
  }

  /**
   * 真偽値かどうかをチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isBoolean(value, name = 'value') {
    const valid = typeof value === 'boolean';
    if (!valid) {
      this._logError(name, 'boolean', typeof value);
    }
    return valid;
  }

  /**
   * オブジェクトかどうかをチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isObject(value, name = 'value') {
    const valid = typeof value === 'object' && value !== null && !Array.isArray(value);
    if (!valid) {
      this._logError(name, 'object', typeof value);
    }
    return valid;
  }

  /**
   * 配列かどうかをチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isArray(value, name = 'value') {
    const valid = Array.isArray(value);
    if (!valid) {
      this._logError(name, 'array', typeof value);
    }
    return valid;
  }

  /**
   * 関数かどうかをチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isFunction(value, name = 'value') {
    const valid = typeof value === 'function';
    if (!valid) {
      this._logError(name, 'function', typeof value);
    }
    return valid;
  }

  /**
   * nullまたはundefinedかどうかをチェック
   * @param {*} value - 検証する値
   * @returns {boolean} 検証結果
   */
  static isNullOrUndefined(value) {
    return value === null || value === undefined;
  }

  /**
   * 空文字列かどうかをチェック
   * @param {*} value - 検証する値
   * @returns {boolean} 検証結果
   */
  static isEmpty(value) {
    if (this.isNullOrUndefined(value)) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * 範囲内の数値かどうかをチェック
   * @param {number} value - 検証する値
   * @param {number} min - 最小値
   * @param {number} max - 最大値
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isNumberInRange(value, min, max, name = 'value') {
    if (!this.isNumber(value, name)) {
      return false;
    }

    const valid = value >= min && value <= max;
    if (!valid) {
      Logger.error(`[Validation] ${name} must be between ${min} and ${max}, got ${value}`);
    }
    return valid;
  }

  /**
   * 配列の要素が全て指定した型かどうかをチェック
   * @param {Array} arr - 検証する配列
   * @param {Function} typeChecker - 型チェック関数
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   */
  static isArrayOf(arr, typeChecker, name = 'array') {
    if (!this.isArray(arr, name)) {
      return false;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!typeChecker(arr[i])) {
        Logger.error(`[Validation] ${name}[${i}] failed type check`);
        return false;
      }
    }

    return true;
  }

  /**
   * オブジェクトが指定したスキーマに従っているかをチェック
   * @param {Object} obj - 検証するオブジェクト
   * @param {Object} schema - スキーマ定義
   * @param {string} name - パラメータ名
   * @returns {boolean} 検証結果
   * 
   * @example
   * const schema = {
   *   id: TypeValidator.isString,
   *   age: TypeValidator.isNumber,
   *   active: TypeValidator.isBoolean
   * };
   * TypeValidator.matchesSchema(user, schema, 'user');
   */
  static matchesSchema(obj, schema, name = 'object') {
    if (!this.isObject(obj, name)) {
      return false;
    }

    for (const [key, validator] of Object.entries(schema)) {
      if (!(key in obj)) {
        Logger.error(`[Validation] ${name}.${key} is missing`);
        return false;
      }

      if (!validator(obj[key], `${name}.${key}`)) {
        return false;
      }
    }

    return true;
  }

  /**
   * 必須パラメータのチェック
   * @param {*} value - 検証する値
   * @param {string} name - パラメータ名
   * @throws {Error} 値がnullまたはundefinedの場合
   */
  static requireNonNull(value, name = 'parameter') {
    if (this.isNullOrUndefined(value)) {
      const error = new Error(`${name} is required but got ${value}`);
      Logger.error('[Validation]', error.message);
      throw error;
    }
  }

  /**
   * アサーション（条件が満たされない場合はエラー）
   * @param {boolean} condition - 条件
   * @param {string} message - エラーメッセージ
   * @throws {Error} 条件がfalseの場合
   */
  static assert(condition, message = 'Assertion failed') {
    if (!condition) {
      const error = new Error(`[Validation] ${message}`);
      Logger.error(error.message);
      
      if (Config.IS_DEVELOPMENT) {
        debugger;  // 開発時のみブレークポイント
      }
      
      throw error;
    }
  }

  /**
   * 問題データの検証
   *
   * 通常モード: { id, unitId, type, question, choices, correctAnswer }
   * distractorPool モード: { id, unitId, type, question, correctAnswer, distractorPool }
   *   - distractorPool: 不正解の候補リスト（Config.GAME.DISTRACTOR_COUNT 個をランダム選択して出題）
   *   - correctAnswer は distractorPool に含まれていてはならない
   *
   * 画像拡張（nanobanana 対応, optional）:
   *   - image: string | null — 問題文上部に表示する画像パス
   *   - choiceImages: { [choiceText]: imagePath } | null — 選択肢ごとの画像マップ
   *
   * @param {Object} question - 問題データ
   * @returns {boolean} 検証結果
   */
  static validateQuestion(question) {
    if (!this.isObject(question, 'question')) return false;

    // 必須フィールド（choices は distractorPool モードでは不要）
    const requiredSchema = {
      id:            (v) => this.isString(v, 'question.id'),
      unitId:        (v) => this.isString(v, 'question.unitId'),
      type:          (v) => this.isString(v, 'question.type'),
      question:      (v) => this.isString(v, 'question.question'),
      correctAnswer: (v) => this.isString(v, 'question.correctAnswer')
    };

    if (!this.matchesSchema(question, requiredSchema, 'question')) return false;

    // distractorPool モード vs 通常 choices モード
    if (question.distractorPool != null) {
      // --- distractorPool モード ---
      if (!this.isArray(question.distractorPool, 'question.distractorPool')) return false;

      if (question.distractorPool.length < 2) {
        Logger.error('[Validation] question.distractorPool must have at least 2 items');
        return false;
      }

      // correctAnswer は distractorPool に含まれていてはならない
      if (question.distractorPool.includes(question.correctAnswer)) {
        Logger.error('[Validation] question.correctAnswer must NOT be in distractorPool');
        return false;
      }
    } else {
      // --- 通常 choices モード ---
      if (!this.isArray(question.choices, 'question.choices')) return false;

      if (question.choices.length < 2) {
        Logger.error('[Validation] question.choices must have at least 2 items');
        return false;
      }

      // correctAnswer は choices の中に含まれていなければならない
      if (!question.choices.includes(question.correctAnswer)) {
        Logger.error('[Validation] question.correctAnswer must be one of the choices');
        return false;
      }
    }

    // type:'clock' の場合は clockFace フィールドを検証
    if (question.type === 'clock') {
      if (!this.isObject(question.clockFace, 'question.clockFace')) return false;
      if (!this.isNumberInRange(question.clockFace.hour,   0, 23, 'question.clockFace.hour'))   return false;
      if (!this.isNumberInRange(question.clockFace.minute, 0, 59, 'question.clockFace.minute')) return false;
    }

    // image フィールド（optional: string または null）
    if (question.image != null && typeof question.image !== 'string') {
      Logger.error('[Validation] question.image must be a string or null');
      return false;
    }

    // choiceImages フィールド（optional: object または null）
    if (question.choiceImages != null && !this.isObject(question.choiceImages, 'question.choiceImages')) {
      return false;
    }

    return true;
  }

  /**
   * セーブデータの検証
   * @param {Object} saveData - セーブデータ
   * @returns {boolean} 検証結果
   */
  static validateSaveData(saveData) {
    if (!this.isObject(saveData, 'saveData')) {
      return false;
    }

    if (!this.isString(saveData.version, 'saveData.version')) {
      return false;
    }

    if (!this.isObject(saveData.core, 'saveData.core')) {
      return false;
    }

    return true;
  }

  /**
   * エラーログ出力
   * @private
   * @param {string} name - パラメータ名
   * @param {string} expected - 期待される型
   * @param {string} actual - 実際の型
   */
  static _logError(name, expected, actual) {
    Logger.error(`[Validation] ${name} expected ${expected}, got ${actual}`);
  }
}

// デフォルトエクスポート
export default TypeValidator;
