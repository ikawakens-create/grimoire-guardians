/**
 * OmikujiEvent.js - Grimoire Guardians
 * おみくじイベント
 *
 * 仕様（統合仕様書 v1.3 準拠）:
 *   - だいきち（10%）: ドロップ倍率 ×3
 *   - きち    （60%）: ドロップ倍率 ×1.5
 *   - きょう  （30%）: まほうのおまもり（シールド）
 *   - 3枚の巻物 [📜][📜][📜] から1枚を選ぶ
 *   - 選択後に結果を演出付きで表示
 *   - プレイヤーが「つづける」を押すと Promise が解決し QuizScreen に戻る
 *
 * @version 1.0
 * @date 2026-02-22
 */

import { GameStore } from '../core/GameStore.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import Logger from '../core/Logger.js';

// ─────────────────────────────────────────
// おみくじ結果テーブル（重み付き抽選）
// ─────────────────────────────────────────

/** @typedef {{ id: string, label: string, emoji: string, weight: number, effect: Object, effectText: string }} OmikujiResult */

/** @type {OmikujiResult[]} */
const OMIKUJI_TABLE = [
  {
    id:         'daikichi',
    label:      'だいきち',
    emoji:      '🌟',
    weight:     10,
    effect:     { type: 'multiplier', value: 3 },
    effectText: 'ドロップが 3ばいに！'
  },
  {
    id:         'kichi',
    label:      'きち',
    emoji:      '✨',
    weight:     60,
    effect:     { type: 'multiplier', value: 1.5 },
    effectText: 'ドロップが 1.5ばいに！'
  },
  {
    id:         'kyou',
    label:      'きょう',
    emoji:      '🛡️',
    weight:     30,
    effect:     { type: 'shield' },
    effectText: 'まほうの おまもりを てにいれた！'
  }
];

// ─────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────

/**
 * 重み付きランダム抽選
 * @returns {OmikujiResult}
 */
function drawResult() {
  const total = OMIKUJI_TABLE.reduce((sum, r) => sum + r.weight, 0);
  let rand = Math.random() * total;
  for (const entry of OMIKUJI_TABLE) {
    rand -= entry.weight;
    if (rand <= 0) return entry;
  }
  return OMIKUJI_TABLE[OMIKUJI_TABLE.length - 1];
}

// ─────────────────────────────────────────
// OmikujiEvent クラス
// ─────────────────────────────────────────

/**
 * OmikujiEvent クラス
 * おみくじイベントの描画・インタラクション・効果適用を担当
 */
class OmikujiEvent {
  /**
   * おみくじイベントを再生する
   * @param {HTMLElement} layer - #event-layer 要素
   * @returns {Promise<void>}   プレイヤーが「つづける」を押すまで待機
   */
  static play(layer) {
    return new Promise((resolve) => {
      if (!layer) {
        Logger.warn('[OmikujiEvent] event-layer が null です');
        resolve();
        return;
      }

      // 抽選（プレイヤーの選択前に結果を確定 — 全巻物が同じ結果）
      const drawn = drawResult();
      Logger.info(`[OmikujiEvent] 抽選結果: ${drawn.label} (${drawn.id})`);

      // UI 構築
      layer.innerHTML = this._buildHTML();
      layer.classList.add('event-layer-active');

      // 巻物タップリスナー（once + 即解除で連打防止）
      const scrollBtns = layer.querySelectorAll('.omikuji-scroll');
      scrollBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          // 全ボタンを即 disabled（二重タップ防止）
          scrollBtns.forEach(b => { b.disabled = true; });
          HapticFeedback.medium();
          SoundManager.playSFX(SoundType.BUTTON_CLICK);

          btn.classList.add('omikuji-scroll-selected');

          // 500ms 後に結果表示
          setTimeout(() => {
            this._showResult(layer, drawn, resolve);
          }, 500);
        }, { once: true });
      });
    });
  }

  // ─────────────────────────────────────────
  // プライベート: HTML 構築
  // ─────────────────────────────────────────

  /**
   * おみくじモーダルの HTML を生成する
   * @returns {string}
   */
  static _buildHTML() {
    return `
      <div class="omikuji-modal">

        <div class="omikuji-header">
          <div class="omikuji-title">🎋 おみくじ！</div>
          <p class="omikuji-subtitle">1まいえらんでね！</p>
        </div>

        <!-- 巻物 3枚 -->
        <div class="omikuji-scrolls">
          <button class="omikuji-scroll" type="button" aria-label="おみくじ その1">📜</button>
          <button class="omikuji-scroll" type="button" aria-label="おみくじ その2">📜</button>
          <button class="omikuji-scroll" type="button" aria-label="おみくじ その3">📜</button>
        </div>

        <!-- 結果エリア（最初は非表示） -->
        <div class="omikuji-result hidden">
          <div class="omikuji-result-emoji"></div>
          <div class="omikuji-result-label"></div>
          <div class="omikuji-result-text"></div>
          <button class="button button-success omikuji-continue-btn" type="button">
            つづける
          </button>
        </div>

      </div>
    `;
  }

  // ─────────────────────────────────────────
  // プライベート: 結果表示
  // ─────────────────────────────────────────

  /**
   * 結果を表示し GameStore に効果を適用する
   * @param {HTMLElement}    layer
   * @param {OmikujiResult}  drawn
   * @param {Function}       resolve
   */
  static _showResult(layer, drawn, resolve) {
    const scrollsEl = layer.querySelector('.omikuji-scrolls');
    const resultEl  = layer.querySelector('.omikuji-result');

    // 巻物エリアをフェードアウト
    if (scrollsEl) scrollsEl.classList.add('omikuji-scrolls-out');

    // 結果テキスト埋め込み
    layer.querySelector('.omikuji-result-emoji').textContent = drawn.emoji;
    layer.querySelector('.omikuji-result-label').textContent = drawn.label;
    layer.querySelector('.omikuji-result-text').textContent  = drawn.effectText;

    // 結果エリア表示（フェードイン）
    resultEl.classList.remove('hidden');
    resultEl.classList.add('omikuji-result-show');

    // GameStore にバフ適用
    this._applyBuff(drawn);

    HapticFeedback.success();

    // 「つづける」ボタン
    layer.querySelector('.omikuji-continue-btn').addEventListener('click', () => {
      HapticFeedback.light();
      layer.classList.remove('event-layer-active');
      // レイヤーをクリア（次のイベントのために）
      setTimeout(() => { layer.innerHTML = ''; }, 300);
      resolve();
    }, { once: true });
  }

  // ─────────────────────────────────────────
  // プライベート: バフ適用
  // ─────────────────────────────────────────

  /**
   * GameStore にバフを反映する
   * @param {OmikujiResult} drawn
   */
  static _applyBuff(drawn) {
    const { effect, id, label } = drawn;

    if (effect.type === 'multiplier') {
      GameStore.setRewardMultiplier(effect.value);
      GameStore.addBuff({ type: 'multiplier', value: effect.value });
    } else if (effect.type === 'shield') {
      GameStore.activateShield();
      GameStore.addBuff({ type: 'shield' });
    }

    Logger.info(`[OmikujiEvent] バフ適用: ${id} (${label})`);
  }
}

export default OmikujiEvent;
