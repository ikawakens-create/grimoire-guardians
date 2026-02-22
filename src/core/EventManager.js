/**
 * EventManager.js - Grimoire Guardians
 * クイズ中イベントの管理・トリガー（おみくじ・モンスター・宝箱等）
 *
 * 設計:
 *   - #event-layer DOM を一度だけ取得して再利用（メモリ効率）
 *   - checkAndTrigger() で問題番号とワールド定義を照合
 *   - 各イベントは Promise を返し、完了まで QuizScreen の進行を停止
 *
 * @version 1.0
 * @date 2026-02-22
 */

import Logger from './Logger.js';

/**
 * EventManager クラス
 */
class EventManager {
  /** @type {HTMLElement|null} */
  static #layer = null;

  /**
   * 初期化 - DOM から #event-layer を取得する
   * index.js の init() から呼び出す
   */
  static init() {
    this.#layer = document.getElementById('event-layer');
    if (this.#layer) {
      Logger.info('[EventManager] Initialized');
    } else {
      Logger.error('[EventManager] #event-layer が見つかりません');
    }
  }

  /**
   * イベントレイヤー要素を返す
   * @returns {HTMLElement|null}
   */
  static getLayer() {
    return this.#layer;
  }

  /**
   * 問題番号とワールドデータを照合し、該当イベントをトリガーする
   *
   * @param {number} questionNumber - 1始まりの回答済み問題番号
   * @param {Object} worldData      - worlds.js のワールドオブジェクト
   * @returns {Promise<void>}       イベント終了後に解決
   */
  static async checkAndTrigger(questionNumber, worldData) {
    const events = worldData?.events ?? [];
    const match  = events.find(e => e.triggerAt === questionNumber);

    if (!match) return;

    Logger.info(
      `[EventManager] イベント発火: type=${match.type} at Q${questionNumber}`
    );

    if (match.type === 'omikuji') {
      const { default: OmikujiEvent } = await import('../events/OmikujiEvent.js');
      await OmikujiEvent.play(this.#layer);
    }

    // TODO: Phase 0.2 以降で実装予定
    // if (match.type === 'monster')   { ... }
    // if (match.type === 'treasure')  { ... }
    // if (match.type === 'paths')     { ... }
  }
}

export default EventManager;
