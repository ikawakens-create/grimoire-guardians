/**
 * HapticFeedback.js - Grimoire Guardians
 * 触覚フィードバックユーティリティ
 *
 * navigator.vibrate() API を使用したハプティクスフィードバック。
 * 非対応端末ではサイレントにスキップする。
 *
 * @version 1.0
 * @date 2026-02-19
 */

import Logger from '../core/Logger.js';

/**
 * HapticFeedback クラス
 * タッチ端末のバイブレーション機能をラップする静的ユーティリティ
 */
export class HapticFeedback {
  /**
   * Vibration API のサポートを確認
   * @returns {boolean} サポートしている場合 true
   */
  static isSupported() {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  /**
   * 軽いタップ感（ボタン押下など）
   * @param {number} [duration=30] - バイブレーション時間(ms)
   */
  static light(duration = 30) {
    this._vibrate(duration);
  }

  /**
   * 正解時のフィードバック（短く2段の爽快パターン）
   * 振動50ms → 無振動50ms → 振動100ms
   */
  static success() {
    this._vibrate([50, 50, 100]);
  }

  /**
   * 中程度のタップ感（選択・決定など）
   * @param {number} [duration=50] - バイブレーション時間(ms)
   */
  static medium(duration = 50) {
    this._vibrate(duration);
  }

  /**
   * 不正解時のフィードバック（重みのあるパターン）
   * 振動100ms → 無振動50ms → 振動100ms
   */
  static error() {
    this._vibrate([100, 50, 100]);
  }

  /**
   * バイブレーション実行（内部メソッド）
   * @private
   * @param {number|number[]} pattern - バイブレーションパターン
   */
  static _vibrate(pattern) {
    if (!this.isSupported()) {
      Logger.debug('[Haptic] Vibration API not supported on this device');
      return;
    }

    try {
      navigator.vibrate(pattern);
      Logger.debug('[Haptic] Vibration:', pattern);
    } catch (e) {
      Logger.warn('[Haptic] Vibration failed:', e.message);
    }
  }
}

export default HapticFeedback;
