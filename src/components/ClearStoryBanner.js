/**
 * ClearStoryBanner.js — Grimoire Guardians
 * クリア後ミニストーリー演出（Ph7）
 *
 * JRPG ダイアログボックス方式。
 * document.body にアタッチするため、ResultScreen の destroy() 後も生存する。
 *
 * 演出フロー（4ステップ）:
 *   step 0: フクロウ slide-in → owlLine タイプライター
 *   step 1: グリモア絵文字 scale-in → grimoireLine タイプライター
 *   step 2: storyLine タイプライター
 *   step 3: nextWorldHint + 3択ボタン（タップ進行は無効、ボタン専用）
 *
 * 2タップルール:
 *   タイプライター表示中にタップ → 全文スキップ
 *   全文表示後にタップ          → 次ステップへ
 *
 * @version 1.0
 * @date 2026-04-04
 */

import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';

// フクロウ画像パス（既存アセット）
const OWL_IMG_SRC = 'assets/npcs/fukurou.png';

// ─────────────────────────────────────────
// ClearStoryBanner クラス
// ─────────────────────────────────────────

export class ClearStoryBanner {
  /** @type {boolean} スタイル注入済みフラグ（クラス共有） */
  static _stylesInjected = false;

  constructor() {
    /** @type {HTMLElement|null} */
    this._el = null;
    /** @type {number} 現在のステップ index */
    this._stepIndex = 0;
    /** @type {Function[]} ステップ関数配列 */
    this._steps = [];
    /** @type {number|null} タイプライター interval ID */
    this._typeTimer = null;
    /** @type {number|null} 遅延用 timeout ID */
    this._waitTimer = null;
    /** @type {boolean} タイプライター表示中フラグ */
    this._isTyping = false;
    /** @type {string} 現在のフルテキスト（スキップ用） */
    this._fullText = '';
    /** @type {HTMLElement|null} 現在のダイアログテキスト要素 */
    this._dialogueTextEl = null;
    /** @type {Function} オーバーレイタップハンドラ（removeEventListener 用） */
    this._boundOnTap = this._onTap.bind(this);
  }

  // ─────────────────────────────────────────
  // パブリック API
  // ─────────────────────────────────────────

  /**
   * バナーを表示する
   * @param {Object}   scene       - worldClearScenes.js のシーンオブジェクト
   * @param {string}   playerName  - プレイヤー名（{name} の置換用。ResultScreen 側で解決済み）
   * @param {Object}   callbacks
   * @param {Function} callbacks.onRetry - 「もう一度」ボタン
   * @param {Function} callbacks.onBack  - 「まちへもどる」ボタン
   * @param {Function} callbacks.onNext  - 「つぎへすすむ」ボタン
   */
  show(scene, playerName, callbacks) {
    this._injectStyles();

    const el = document.createElement('div');
    el.className = 'csb-overlay';
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('role', 'dialog');

    el.innerHTML = `
      <div class="csb-scene">
        <!-- キャラクター層 -->
        <div class="csb-chars">
          <div class="csb-owl" id="csb-owl">
            <img class="csb-owl-img" src="${OWL_IMG_SRC}"
                 alt="フクロウ先生"
                 onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'🦉',className:'csb-owl-emoji'}))">
          </div>
          <div class="csb-grimoire" id="csb-grimoire" aria-hidden="true">📖</div>
        </div>

        <!-- ダイアログボックス層 -->
        <div class="csb-dialogue">
          <p class="csb-dialogue-text" id="csb-dialogue-text"></p>
          <span class="csb-indicator" id="csb-indicator" aria-hidden="true">▶</span>
        </div>

        <!-- ボタン層（step 3 のみ表示） -->
        <div class="csb-buttons" id="csb-buttons" aria-hidden="true">
          <button class="button button-secondary csb-btn-retry"  type="button">もう一度</button>
          <button class="button csb-btn-back"                    type="button">まちへもどる</button>
          <button class="button button-success csb-btn-next"     type="button">つぎへすすむ ▶</button>
        </div>
      </div>
    `;

    this._el = el;
    document.body.appendChild(el);

    // ステップ配列を構築
    const name = playerName || 'ぼうけんしゃ';
    const owlText      = (scene.owlLine      || '').replace(/\{name\}/g, name);
    const grimoireText = scene.grimoireLine  || '';
    const storyText    = scene.storyLine     || '';
    const hintText     = scene.nextWorldHint || '';

    this._dialogueTextEl = el.querySelector('#csb-dialogue-text');

    this._steps = [
      () => this._stepOwl(scene),
      () => this._stepGrimoire(scene),
      () => this._stepStory(),
      () => this._stepNext(scene),
    ];

    // テキストデータをインスタンスに保持（各ステップ関数から参照）
    this._texts = { owlText, grimoireText, storyText, hintText };

    // ボタンイベント
    el.querySelector('.csb-btn-retry').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof callbacks?.onRetry === 'function') callbacks.onRetry();
    });
    el.querySelector('.csb-btn-back').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof callbacks?.onBack === 'function') callbacks.onBack();
    });
    el.querySelector('.csb-btn-next').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof callbacks?.onNext === 'function') callbacks.onNext();
    });

    // タップ進行リスナー（step 0〜2 のみ有効）
    el.addEventListener('click', this._boundOnTap);

    // フェードイン後に step 0 開始
    requestAnimationFrame(() => {
      el.classList.add('csb-overlay--visible');
      setTimeout(() => this._runStep(), 300);
    });
  }

  /**
   * バナーを破棄する
   */
  destroy() {
    this._clearTypeTimer();
    this._clearWaitTimer();
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
  }

  // ─────────────────────────────────────────
  // プライベート: ステップ実行
  // ─────────────────────────────────────────

  _runStep() {
    if (!this._el || this._stepIndex >= this._steps.length) return;
    this._steps[this._stepIndex]();
  }

  /** step 0: フクロウ登場 + owlLine */
  _stepOwl(scene) {
    const owlEl = this._el.querySelector('#csb-owl');
    owlEl.classList.add('csb-owl--enter');
    SoundManager.playSFX(SoundType.CORRECT);

    this._typewrite(this._texts.owlText, 400, () => this._showIndicator());
  }

  /** step 1: グリモア登場 + grimoireLine */
  _stepGrimoire(scene) {
    this._hideIndicator();
    const grimoireEl = this._el.querySelector('#csb-grimoire');
    grimoireEl.textContent = scene.emoji || '📖';
    grimoireEl.classList.add('csb-grimoire--enter');
    SoundManager.playSFX(SoundType.WORLD_CLEAR);

    this._typewrite(this._texts.grimoireText, 500, () => this._showIndicator());
  }

  /** step 2: storyLine */
  _stepStory() {
    this._hideIndicator();
    this._typewrite(this._texts.storyText, 0, () => this._showIndicator());
  }

  /** step 3: nextWorldHint + ボタン表示（タップ無効化） */
  _stepNext(scene) {
    this._hideIndicator();

    // オーバーレイ全体タップを無効化（ボタン専用になる）
    this._el.removeEventListener('click', this._boundOnTap);

    // nextWorldHint をテキストに設定（タイプライター不要・fade-in）
    this._dialogueTextEl.textContent = '';
    const hintEl = document.createElement('span');
    hintEl.className = 'csb-hint-text';
    hintEl.textContent = `${this._texts.hintText}  ${scene.nextEmoji || '✨'}`;
    this._dialogueTextEl.appendChild(hintEl);
    hintEl.classList.add('csb-hint-text--visible');

    // ボタンを順次 bounce-in
    const btnsEl = this._el.querySelector('#csb-buttons');
    btnsEl.removeAttribute('aria-hidden');
    btnsEl.classList.add('csb-buttons--visible');

    const btns = btnsEl.querySelectorAll('button');
    btns.forEach((btn, i) => {
      setTimeout(() => btn.classList.add('csb-btn--enter'), i * 80);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: タップ制御
  // ─────────────────────────────────────────

  _onTap(e) {
    // ボタン要素へのタップは処理しない（ボタン自身のイベントに任せる）
    if (e.target.closest('button')) return;

    if (this._isTyping || this._waitTimer !== null) {
      // 1タップ目: タイプライター（および待機時間）をスキップして全文表示
      this._skipTypewriter();
    } else {
      // 2タップ目: 次ステップへ
      this._advanceStep();
    }
  }

  _advanceStep() {
    // 最終ステップの手前まで（step 3 はボタン専用なので _onTap からは呼ばれない）
    if (this._stepIndex < this._steps.length - 1) {
      this._stepIndex++;
      this._runStep();
    }
  }

  // ─────────────────────────────────────────
  // プライベート: タイプライター共通ユーティリティ
  // ─────────────────────────────────────────

  /**
   * ダイアログボックスにテキストをタイプライター表示する
   * @param {string}   text       - 表示テキスト
   * @param {number}   delay      - 開始までの遅延時間（ms）
   * @param {Function} onComplete - 完了コールバック
   */
  _typewrite(text, delay, onComplete) {
    this._clearTypeTimer();
    this._clearWaitTimer();
    this._isTyping = true;
    this._fullText = text;

    const el = this._dialogueTextEl;
    el.textContent = '';

    const startTyping = () => {
      let i = 0;
      this._typeTimer = setInterval(() => {
        if (!this._el) {
          this._clearTypeTimer();
          return;
        }
        if (i < text.length) {
          el.textContent += text[i++];
        } else {
          this._clearTypeTimer();
          this._isTyping = false;
          if (typeof onComplete === 'function') onComplete();
        }
      }, 40);
    };

    if (delay > 0) {
      this._waitTimer = setTimeout(() => {
        this._waitTimer = null;
        startTyping();
      }, delay);
    } else {
      startTyping();
    }
  }

  /** タイプライターをスキップして全文即時表示 */
  _skipTypewriter() {
    this._clearTypeTimer();
    this._clearWaitTimer();
    this._isTyping = false;
    if (this._dialogueTextEl) {
      this._dialogueTextEl.textContent = this._fullText;
    }
    this._showIndicator();
  }

  _clearTypeTimer() {
    if (this._typeTimer !== null) {
      clearInterval(this._typeTimer);
      this._typeTimer = null;
    }
  }

  _clearWaitTimer() {
    if (this._waitTimer !== null) {
      clearTimeout(this._waitTimer);
      this._waitTimer = null;
    }
  }

  // ─────────────────────────────────────────
  // プライベート: インジケーター
  // ─────────────────────────────────────────

  _showIndicator() {
    const el = this._el?.querySelector('#csb-indicator');
    if (el) el.classList.add('csb-indicator--visible');
  }

  _hideIndicator() {
    const el = this._el?.querySelector('#csb-indicator');
    if (el) el.classList.remove('csb-indicator--visible');
  }

  // ─────────────────────────────────────────
  // プライベート: スタイル注入（初回のみ）
  // ─────────────────────────────────────────

  _injectStyles() {
    if (ClearStoryBanner._stylesInjected) return;
    ClearStoryBanner._stylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `
      /* ── オーバーレイ ── */
      .csb-overlay {
        position: fixed;
        inset: 0;
        z-index: 9990;
        background: rgba(10, 8, 30, 0);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        transition: background 300ms ease;
        pointer-events: none;
      }
      .csb-overlay--visible {
        background: rgba(10, 8, 30, 0.88);
        pointer-events: auto;
      }

      /* ── シーン全体 ── */
      .csb-scene {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      /* ── キャラクター層 ── */
      .csb-chars {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 38%;
        display: flex;
        align-items: flex-end;
        padding: 0 6%;
        gap: 5%;
      }

      /* フクロウ */
      .csb-owl {
        width: 120px;
        flex-shrink: 0;
        transform: translateY(80px);
        opacity: 0;
        transition: transform 400ms cubic-bezier(0.34,1.56,0.64,1),
                    opacity 400ms ease;
      }
      .csb-owl--enter {
        transform: translateY(0);
        opacity: 1;
      }
      .csb-owl-img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
      .csb-owl-emoji {
        font-size: 96px;
        line-height: 1;
      }

      /* グリモア絵文字 */
      .csb-grimoire {
        font-size: 80px;
        line-height: 1;
        transform: scale(0);
        opacity: 0;
        transition: transform 500ms cubic-bezier(0.34,1.56,0.64,1),
                    opacity 300ms ease;
        filter: drop-shadow(0 0 16px gold);
        align-self: center;
        margin: 0 auto;
      }
      .csb-grimoire--enter {
        transform: scale(1);
        opacity: 1;
      }

      /* ── ダイアログボックス ── */
      .csb-dialogue {
        position: relative;
        margin: 0 4% 2%;
        padding: 14px 18px 16px;
        background: rgba(10, 5, 40, 0.92);
        border: 2px solid rgba(180, 140, 255, 0.6);
        border-radius: 12px;
        min-height: 80px;
      }
      .csb-dialogue-text {
        margin: 0;
        color: #f0e8ff;
        font-size: clamp(14px, 2.2vw, 20px);
        line-height: 1.6;
        min-height: 1.6em;
        white-space: pre-wrap;
      }

      /* ▶ インジケーター */
      .csb-indicator {
        position: absolute;
        right: 14px;
        bottom: 10px;
        color: #b890ff;
        font-size: 14px;
        opacity: 0;
        transition: opacity 200ms ease;
      }
      .csb-indicator--visible {
        opacity: 1;
        animation: csb-blink 1s ease-in-out infinite;
      }
      @keyframes csb-blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.2; }
      }

      /* ── ヒントテキスト ── */
      .csb-hint-text {
        opacity: 0;
        transition: opacity 400ms ease;
        display: block;
      }
      .csb-hint-text--visible {
        opacity: 1;
      }

      /* ── ボタン層 ── */
      .csb-buttons {
        display: flex;
        gap: 8px;
        justify-content: center;
        padding: 0 4% 3%;
        opacity: 0;
        pointer-events: none;
        transition: opacity 300ms ease;
      }
      .csb-buttons--visible {
        opacity: 1;
        pointer-events: auto;
      }
      .csb-btn-retry,
      .csb-btn-back,
      .csb-btn-next {
        transform: scale(0);
        transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1);
        min-width: 100px;
        min-height: 48px;
        font-size: clamp(11px, 1.6vw, 15px);
      }
      .csb-btn--enter {
        transform: scale(1);
      }
      .csb-btn-back {
        background: #6c5ce7;
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        padding: 10px 16px;
      }
      .csb-btn-back:active { opacity: 0.8; }
    `;
    document.head.appendChild(style);
  }
}

export default ClearStoryBanner;
