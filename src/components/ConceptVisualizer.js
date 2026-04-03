/**
 * ConceptVisualizer.js - Grimoire Guardians
 * 概念可視化コンポーネント
 *
 * 機能:
 *   - フクロウ先生との台詞ステップ（タップで進む）
 *   - conceptGuides.js に基づくビジュアルアニメーション（Ph4で追加）
 *   - マイクロ体験問題（2〜3択・最大2回リトライ・自動進行）
 *   - conceptGuides 未定義ユニットはフォールバック対話を表示
 *
 * ステートマシン:
 *   dialogue[0..n] → microChallenge → complete
 *
 * ライフサイクル:
 *   const cv = new ConceptVisualizer(onComplete);
 *   cv.render(container, unitId);
 *   cv.destroy();
 *
 * @version 1.0
 * @date 2026-04-03
 */

import { CONCEPT_GUIDES } from '../data/conceptGuides.js';

// conceptGuides が未定義のユニット向け汎用フォールバック対話
const FALLBACK_DIALOGUE = [
  { speaker: 'owl', text: 'がんばって といてみよう！' },
];

class ConceptVisualizer {
  /**
   * @param {Function} onComplete - 演出完了（「はじめる！」タップ）時のコールバック
   */
  constructor(onComplete) {
    this._onComplete  = onComplete;
    this._el          = null;
    this._guide       = null;
    this._retryCount  = 0;
  }

  // ─────────────────────────────────────────
  // パブリック
  // ─────────────────────────────────────────

  /**
   * @param {HTMLElement} container
   * @param {string}      unitId  - 例: 'M1-01'
   */
  render(container, unitId) {
    this._guide = CONCEPT_GUIDES[unitId] ?? null;

    this._el = document.createElement('div');
    this._el.className = 'concept-visualizer';
    container.appendChild(this._el);

    const dialogue = this._guide?.dialogue?.length
      ? this._guide.dialogue
      : FALLBACK_DIALOGUE;

    this._showDialogue(dialogue, 0);
  }

  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
  }

  // ─────────────────────────────────────────
  // 対話ステップ
  // ─────────────────────────────────────────

  _showDialogue(dialogue, index) {
    if (index >= dialogue.length) {
      // 対話終了 → steps → マイクロ体験 or はじめる！
      const steps = this._guide?.steps;
      if (steps?.length) {
        this._showStep(steps, 0);
      } else if (this._guide?.microChallenge) {
        this._showChallenge();
      } else {
        this._showStartButton();
      }
      return;
    }

    const step  = dialogue[index];
    const isOwl = step.speaker === 'owl';

    this._el.innerHTML = `
      <div class="cv-dialogue cv-tap-zone">
        <div class="cv-character ${isOwl ? 'cv-owl' : 'cv-player'}">
          ${isOwl ? '🦉' : '⭐'}
        </div>
        <div class="cv-bubble">
          <p class="cv-bubble-text">${step.text}</p>
        </div>
        <p class="cv-tap-hint">タップして つぎへ ▶</p>
      </div>
    `;

    this._el.querySelector('.cv-tap-zone').addEventListener('click', () => {
      this._showDialogue(dialogue, index + 1);
    }, { once: true });
  }

  // ─────────────────────────────────────────
  // アニメーションステップ
  // ─────────────────────────────────────────

  _showStep(steps, index) {
    if (index >= steps.length) {
      // steps終了 → マイクロ体験 or はじめる！
      if (this._guide?.microChallenge) {
        this._showChallenge();
      } else {
        this._showStartButton();
      }
      return;
    }

    const step = steps[index];
    const isLast = index === steps.length - 1;

    this._el.innerHTML = `
      <div class="cv-step cv-tap-zone">
        ${this._renderStepContent(step.content)}
        ${step.label ? `<p class="cv-step-label">${step.label}</p>` : ''}
        <p class="cv-tap-hint">${isLast ? 'タップして もんだいへ ▶' : 'タップして つぎへ ▶'}</p>
      </div>
    `;

    this._el.querySelector('.cv-tap-zone').addEventListener('click', () => {
      this._showStep(steps, index + 1);
    }, { once: true });
  }

  /**
   * content 配列を絵文字グリッドHTMLに変換する
   * @param {Array<{emoji:string, count:number, style:string}>} content
   * @returns {string} HTML文字列
   */
  _renderStepContent(content) {
    if (!content?.length) return '';
    return `<div class="cv-emoji-area">${
      content.map(group =>
        `<div class="cv-emoji-group">${
          Array.from({ length: group.count }, () =>
            `<span class="cv-emoji cv-emoji-${group.style}">${group.emoji}</span>`
          ).join('')
        }</div>`
      ).join('')
    }</div>`;
  }

  // ─────────────────────────────────────────
  // マイクロ体験問題
  // ─────────────────────────────────────────

  _showChallenge() {
    const { question, choices, correct } = this._guide.microChallenge;

    this._el.innerHTML = `
      <div class="cv-challenge">
        <div class="cv-challenge-q">
          <span class="cv-challenge-owl">🦉</span>
          <span class="cv-challenge-text">${question}</span>
        </div>
        <div class="cv-challenge-choices">
          ${choices.map((c, i) => `
            <button class="button cv-choice-btn" type="button" data-index="${i}">
              ${c}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this._el.querySelectorAll('.cv-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = Number(btn.dataset.index);
        this._handleChoice(chosen, correct);
      }, { once: true });
    });
  }

  _handleChoice(chosen, correct) {
    if (chosen === correct) {
      this._showFeedback(true);
    } else {
      this._retryCount++;
      this._showFeedback(false, this._retryCount >= 2);
    }
  }

  _showFeedback(isCorrect, isAutoAdvance = false) {
    if (isCorrect) {
      this._el.innerHTML = `
        <div class="cv-feedback cv-feedback-correct">
          <p class="cv-feedback-text">🦉 わかった！ ✨</p>
          <button class="button button-large cv-start-btn" type="button">
            はじめる！ 🚀
          </button>
        </div>
      `;
      this._el.querySelector('.cv-start-btn').addEventListener('click', () => {
        if (typeof this._onComplete === 'function') this._onComplete();
      });
    } else if (isAutoAdvance) {
      // 2回不正解：ポジティブメッセージ → 1秒後にはじめる！ボタン
      this._el.innerHTML = `
        <div class="cv-feedback cv-feedback-wrong">
          <p class="cv-feedback-text">🦉 おしい！ つぎは きっとわかる！</p>
        </div>
      `;
      setTimeout(() => this._showStartButton(), 1000);
    } else {
      // 1回不正解：励まし → 1秒後に問題再表示
      this._el.innerHTML = `
        <div class="cv-feedback cv-feedback-wrong">
          <p class="cv-feedback-text">🦉 おしい！ もう一かい みてみよう</p>
        </div>
      `;
      setTimeout(() => this._showChallenge(), 1000);
    }
  }

  // ─────────────────────────────────────────
  // はじめる！ボタン（マイクロ体験なし or 2回不正解後）
  // ─────────────────────────────────────────

  _showStartButton() {
    this._el.innerHTML = `
      <div class="cv-complete">
        <button class="button button-large cv-start-btn" type="button">
          はじめる！ 🚀
        </button>
      </div>
    `;
    this._el.querySelector('.cv-start-btn').addEventListener('click', () => {
      if (typeof this._onComplete === 'function') this._onComplete();
    });
  }
}

export { ConceptVisualizer };
