/**
 * MemorizeScreen.js - Grimoire Guardians
 * 九九フラッシュカード確認画面（MultiTableScreen → QuizScreen の間に挿入）
 *
 * 機能:
 *   - 九九ワールド（m2_10a〜m2_10i）専用
 *   - 1問ずつ「2 × 3 = ？」を表示 → タップで「= 6」がアニメーション表示
 *   - 「つぎへ」で次のカードへ
 *   - 全9問めくり終わったら「クイズにちょうせん！」ボタン出現
 *   - スキップボタンで即QuizScreenへ（毎回表示だがスキップ可）
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.0
 * @date 2026-03-23
 */

import Logger from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';

/** ワールドID → だん情報マッピング */
const DAN_INFO = {
  m2_10a: { label: '2のだん', cards: _makeCards(2) },
  m2_10b: { label: '3のだん', cards: _makeCards(3) },
  m2_10c: { label: '4のだん', cards: _makeCards(4) },
  m2_10d: { label: '5のだん', cards: _makeCards(5) },
  m2_10e: { label: '6のだん', cards: _makeCards(6) },
  m2_10f: { label: '7のだん', cards: _makeCards(7) },
  m2_10g: { label: '8のだん', cards: _makeCards(8) },
  m2_10h: { label: '9のだん', cards: _makeCards(9) },
  // 1のだん（1×1〜1×9）の後 0のかけざん（0×1〜0×9）
  m2_10i: { label: '1のだん・0のかけざん', cards: [..._makeCards(1), ..._makeCards(0)] },
};

/**
 * だん数からカード配列を生成する
 * @param {number} dan
 * @returns {{ dan:number, n:number, answer:number }[]}
 */
function _makeCards(dan) {
  return Array.from({ length: 9 }, (_, i) => ({
    dan,
    n: i + 1,
    answer: dan * (i + 1),
  }));
}

class MemorizeScreen {
  /**
   * @param {HTMLElement} container  - 描画先の親要素
   * @param {Object}      worldData  - 選択されたワールドデータ
   * @param {Function}    onStart    - 「クイズにちょうせん！」コールバック（→ QuizScreen）
   * @param {Function}    onSkip     - 「スキップ」コールバック（→ QuizScreen）
   */
  constructor(container, worldData, onStart, onSkip) {
    this._container = container;
    this._worldData  = worldData;
    this._onStart    = onStart;
    this._onSkip     = onSkip;
    this._el         = null;

    /** @type {{ dan:number, n:number, answer:number }[]} */
    this._cards = [];

    /** @type {number} 現在表示中のカードインデックス */
    this._currentIndex = 0;

    /** @type {boolean} 現在のカードが「めくり済み」か */
    this._isRevealed = false;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を描画する
   */
  render() {
    const info = DAN_INFO[this._worldData.id];
    if (!info) {
      Logger.warn('[MemorizeScreen] Unknown worldId:', this._worldData.id);
      if (typeof this._onSkip === 'function') this._onSkip();
      return;
    }

    this._cards = info.cards;
    this._buildShell(info.label);
    this._showCard(0);
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[MemorizeScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: シェル構築
  // ─────────────────────────────────────────

  /**
   * @param {string} label - だんのラベル（例: '2のだん'）
   */
  _buildShell(label) {
    const el = document.createElement('div');
    el.className = 'memorize-screen';
    el.innerHTML = `
      <div class="memorize-header">
        <button class="button button-secondary memorize-btn-skip" type="button">
          スキップ → クイズへ
        </button>
        <div class="memorize-title">${label}</div>
        <div class="memorize-progress" id="memorize-progress"></div>
      </div>

      <div class="memorize-card-area">
        <div class="memorize-card" id="memorize-card">
          <div class="memorize-formula" id="memorize-formula"></div>
          <div class="memorize-hint" id="memorize-hint">👆 タップして みてみよう！</div>
          <div class="memorize-answer-wrap hidden" id="memorize-answer-wrap">
            <div class="memorize-answer" id="memorize-answer"></div>
            <button class="button button-large memorize-btn-next" id="memorize-btn-next" type="button">
              つぎへ →
            </button>
          </div>
        </div>
      </div>

      <div class="memorize-dots" id="memorize-dots"></div>

      <div class="memorize-challenge-wrap hidden" id="memorize-challenge-wrap">
        <button class="button button-large memorize-btn-challenge" type="button">
          クイズにちょうせん！ 🚀
        </button>
      </div>
    `;

    this._el = el;
    this._container.appendChild(el);
    this._bindEvents();

    // フェードイン
    requestAnimationFrame(() => el.classList.add('memorize-visible'));
  }

  // ─────────────────────────────────────────
  // プライベート: カード表示
  // ─────────────────────────────────────────

  /**
   * @param {number} index - カードインデックス
   */
  _showCard(index) {
    if (!this._el) return;

    this._currentIndex = index;
    this._isRevealed   = false;

    const card   = this._cards[index];
    const total  = this._cards.length;

    // 式表示（答えは隠す）
    const formulaEl = this._el.querySelector('#memorize-formula');
    formulaEl.innerHTML = `
      <span class="mf-dan">${card.dan}</span>
      <span class="mf-op"> × </span>
      <span class="mf-n">${card.n}</span>
      <span class="mf-eq"> = </span>
      <span class="mf-q">？</span>
    `;

    // ヒントと答えエリアをリセット
    this._el.querySelector('#memorize-hint').classList.remove('hidden');
    this._el.querySelector('#memorize-answer-wrap').classList.add('hidden');
    this._el.querySelector('#memorize-answer').textContent = '';

    // カードのフリップクラスをリセット
    const cardEl = this._el.querySelector('#memorize-card');
    cardEl.classList.remove('memorize-card-revealed');

    // 進捗ドット更新
    this._updateDots(index, total);

    // 進捗テキスト
    this._el.querySelector('#memorize-progress').textContent = `${index + 1} / ${total}`;

    // カードタップで答えを表示
    cardEl.onclick = () => this._revealAnswer();
  }

  /**
   * 答えをアニメーション表示する
   */
  _revealAnswer() {
    if (this._isRevealed || !this._el) return;
    this._isRevealed = true;

    SoundManager.playSFX(SoundType.CORRECT_ANSWER);
    HapticFeedback.success();

    const card       = this._cards[this._currentIndex];
    const cardEl     = this._el.querySelector('#memorize-card');
    const hintEl     = this._el.querySelector('#memorize-hint');
    const answerWrap = this._el.querySelector('#memorize-answer-wrap');
    const answerEl   = this._el.querySelector('#memorize-answer');

    // 式の「？」を答えに書き換え
    const formulaEl = this._el.querySelector('#memorize-formula');
    formulaEl.innerHTML = `
      <span class="mf-dan">${card.dan}</span>
      <span class="mf-op"> × </span>
      <span class="mf-n">${card.n}</span>
      <span class="mf-eq"> = </span>
      <span class="mf-ans">${card.answer}</span>
    `;

    hintEl.classList.add('hidden');
    answerEl.textContent = `${card.answer} ✨`;
    answerWrap.classList.remove('hidden');

    // カードを「めくり済み」スタイルに
    cardEl.classList.add('memorize-card-revealed');
    cardEl.onclick = null;

    // 最後のカードなら「つぎへ」を隠して「クイズにちょうせん！」ボタンを出現させる
    if (this._currentIndex === this._cards.length - 1) {
      this._el.querySelector('#memorize-btn-next').classList.add('hidden');
      setTimeout(() => {
        if (!this._el) return;
        this._el.querySelector('#memorize-challenge-wrap').classList.remove('hidden');
      }, 400);
    }
  }

  // ─────────────────────────────────────────
  // プライベート: 進捗ドット
  // ─────────────────────────────────────────

  /**
   * @param {number} current - 現在のインデックス（0始まり）
   * @param {number} total
   */
  _updateDots(current, total) {
    if (!this._el) return;
    const dotsEl = this._el.querySelector('#memorize-dots');
    dotsEl.innerHTML = Array.from({ length: total }, (_, i) =>
      `<span class="memorize-dot${i <= current ? ' memorize-dot-active' : ''}"></span>`
    ).join('');
  }

  // ─────────────────────────────────────────
  // プライベート: イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    // スキップ
    this._el.querySelector('.memorize-btn-skip').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      HapticFeedback.light();
      this.destroy();
      if (typeof this._onSkip === 'function') this._onSkip();
    });

    // つぎへ（動的に #memorize-btn-next が差し替わるため委譲）
    this._el.addEventListener('click', (e) => {
      if (!e.target.closest('#memorize-btn-next')) return;
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      HapticFeedback.light();
      const next = this._currentIndex + 1;
      if (next < this._cards.length) {
        this._showCard(next);
      }
    });

    // クイズにちょうせん！
    this._el.querySelector('.memorize-btn-challenge').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.STAGE_CLEAR);
      HapticFeedback.success();
      this.destroy();
      if (typeof this._onStart === 'function') this._onStart();
    });
  }
}

export default MemorizeScreen;
