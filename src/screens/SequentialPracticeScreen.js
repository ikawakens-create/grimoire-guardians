/**
 * SequentialPracticeScreen.js - Grimoire Guardians
 * 九九じゅんばん練習画面（MemorizeScreen → QuizScreen の間に挿入）
 *
 * 機能:
 *   - 九九ワールド（m2_10a〜m2_10i）専用
 *   - そのだんの九九を ×1 → ×9 の固定順番で全9問出題
 *   - 各問題に「前の式のヒント」を表示（Step1 形式）
 *   - 正解・不正解フィードバック → 自動で次の問題へ
 *   - 全9問クリア後「本番クイズへ！」ボタン出現
 *   - 「スキップ → クイズへ」で即 QuizScreen へ
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.0
 * @date 2026-03-23
 */

import Logger from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';

/** フィードバック表示時間（ms） */
const FEEDBACK_MS = 900;

/** ────────────────────────────────────────────────────────────
 * だんごとの問題生成ロジック
 * ──────────────────────────────────────────────────────────── */

/**
 * だん数から9問分の問題配列を生成する
 * @param {number} dan
 * @returns {{ hint:string, question:string, answer:number, choices:string[] }[]}
 */
function _makeQuestions(dan) {
  return Array.from({ length: 9 }, (_, i) => {
    const n      = i + 1;        // ×1〜×9
    const answer = dan * n;
    const prev   = dan * (n - 1); // 前の式の答え（n=1 のときは 0）

    // 問題文
    const question = n === 1
      ? `${dan}のだんは ${dan}ずつ ふえるよ！\n${dan} × 1 = ？`
      : `${dan} × ${n - 1} = ${prev} だよ。\nでは ${dan} × ${n} = ？`;

    // ヒント（問題文に含まれるが、別フィールドとして保持）
    const hint = n === 1 ? '' : `${dan} × ${n - 1} = ${prev}`;

    // 選択肢：正解の前後の数値 + 前の答え（n≥2 のみ）
    const choices = _makeChoices(dan, n, answer, prev);

    return { hint, question, answer, choices };
  });
}

/**
 * 選択肢を生成する（4択・正解必ず含む）
 * @param {number} dan   - だん数
 * @param {number} n     - 掛ける数（1〜9）
 * @param {number} answer - 正解
 * @param {number} prev  - 前の答え（n=1 のときは 0）
 * @returns {string[]} シャッフル済み4択文字列
 */
function _makeChoices(dan, n, answer, prev) {
  const candidates = new Set();
  candidates.add(answer);

  if (dan === 0) {
    // 0のかけざんは全問 answer=0 → 固定の引っかけ候補
    candidates.add(n);         // 0×n を n と間違えやすい
    candidates.add(n * 2);     // 2のだん風
    candidates.add(n * 3 || 3); // 3のだん風（n*3=0 にならないよう保護）
  } else if (n === 1) {
    // ×1 の最初の問題: answer は小さいので広めに候補を取る
    for (const v of [answer - 2, answer - 1, answer + 1, answer + 2, answer + 3, 1, 2, 3, 4]) {
      if (v > 0) candidates.add(v);
      if (candidates.size >= 4) break;
    }
  } else {
    // 前の答え（ひっかけ）
    if (prev > 0) candidates.add(prev);
    // 正解±だん
    candidates.add(answer + dan);
    candidates.add(answer - dan > 0 ? answer - dan : answer + dan * 2);
    // まだ足りなければ正解の近傍を順に追加（1のだんなど被りが多い場合のフォールバック）
    let _fb = 1;
    while (candidates.size < 4 && _fb < 20) {
      candidates.add(answer + _fb);
      if (candidates.size < 4) {
        const _v = answer - _fb;
        if (_v > 0) candidates.add(_v);
      }
      _fb++;
    }
  }

  // 4択に絞る（正解は必ず残す）
  const pool = [...candidates].filter(v => v !== answer).slice(0, 3);
  pool.push(answer);

  // フィッシャー-イェーツシャッフル
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.map(String);
}

/** ワールドID → だん配列マッピング */
const WORLD_TO_DANS = {
  m2_10a: [2],
  m2_10b: [3],
  m2_10c: [4],
  m2_10d: [5],
  m2_10e: [6],
  m2_10f: [7],
  m2_10g: [8],
  m2_10h: [9],
  m2_10i: [1, 0], // 1のだん → 0のかけざん（0は特殊扱い）
};

/** ────────────────────────────────────────────────────────────
 * SequentialPracticeScreen クラス
 * ──────────────────────────────────────────────────────────── */

class SequentialPracticeScreen {
  /**
   * @param {HTMLElement} container  - 描画先の親要素
   * @param {Object}      worldData  - 選択されたワールドデータ
   * @param {Function}    onFinish   - 「本番クイズへ！」コールバック
   * @param {Function}    onSkip     - 「スキップ」コールバック
   */
  constructor(container, worldData, onFinish, onSkip) {
    this._container = container;
    this._worldData  = worldData;
    this._onFinish   = onFinish;
    this._onSkip     = onSkip;
    this._el         = null;

    /** @type {{ hint:string, question:string, answer:number, choices:string[] }[]} */
    this._questions = [];

    /** @type {number} 現在の問題インデックス */
    this._currentIndex = 0;

    /** @type {number} 正解数 */
    this._correctCount = 0;

    /** @type {boolean} 回答ロック（フィードバック中） */
    this._isLocked = false;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  render() {
    const dans = WORLD_TO_DANS[this._worldData.id];
    if (!dans) {
      Logger.warn('[SequentialPracticeScreen] Unknown worldId:', this._worldData.id);
      if (typeof this._onSkip === 'function') this._onSkip();
      return;
    }

    // だん配列から問題を結合（m2_10i は 1のだん9問 + 0のかけざん9問）
    this._questions = dans.flatMap(dan => _makeQuestions(dan));

    this._buildShell();
    this._showQuestion(0);

    Logger.info('[SequentialPracticeScreen] Loaded', this._questions.length, 'questions for', this._worldData.id);
  }

  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[SequentialPracticeScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: シェル構築
  // ─────────────────────────────────────────

  _buildShell() {
    const el = document.createElement('div');
    el.className = 'seqprac-screen';
    el.innerHTML = `
      <div class="seqprac-header">
        <button class="button button-secondary seqprac-btn-skip" type="button">
          スキップ → クイズへ
        </button>
        <div class="seqprac-title" id="seqprac-title">${this._worldData.title ?? ''}</div>
        <div class="seqprac-progress" id="seqprac-progress"></div>
      </div>

      <div class="seqprac-body">
        <div class="seqprac-hint" id="seqprac-hint"></div>
        <div class="seqprac-question" id="seqprac-question"></div>
        <div class="seqprac-choices" id="seqprac-choices"></div>
        <div class="seqprac-feedback hidden" id="seqprac-feedback"></div>
      </div>

      <div class="seqprac-dots" id="seqprac-dots"></div>

      <div class="seqprac-finish-wrap hidden" id="seqprac-finish-wrap">
        <p class="seqprac-finish-msg">じゅんばん れんしゅう かんりょう！🎉<br>つぎは ほんばん クイズだよ！</p>
        <button class="button button-large seqprac-btn-finish" type="button">
          本番クイズへ！🚀
        </button>
      </div>
    `;

    this._el = el;
    this._container.appendChild(el);
    this._bindEvents();

    requestAnimationFrame(() => el.classList.add('seqprac-visible'));
  }

  // ─────────────────────────────────────────
  // プライベート: 問題表示
  // ─────────────────────────────────────────

  _showQuestion(index) {
    if (!this._el) return;

    this._currentIndex = index;
    this._isLocked     = false;

    const q     = this._questions[index];
    const total = this._questions.length;

    // ヒント
    const hintEl = this._el.querySelector('#seqprac-hint');
    hintEl.textContent = q.hint;
    hintEl.classList.toggle('hidden', !q.hint);

    // 問題文（\n を <br> に）
    this._el.querySelector('#seqprac-question').innerHTML =
      q.question.replace(/\n/g, '<br>');

    // 選択肢
    const choicesEl = this._el.querySelector('#seqprac-choices');
    choicesEl.innerHTML = q.choices.map(c => `
      <button class="button button-large seqprac-choice" data-value="${c}" type="button">
        ${c}
      </button>
    `).join('');

    // フィードバック非表示
    const fbEl = this._el.querySelector('#seqprac-feedback');
    fbEl.classList.add('hidden');
    fbEl.className = 'seqprac-feedback hidden';

    // 進捗
    this._el.querySelector('#seqprac-progress').textContent = `${index + 1} / ${total}`;
    this._updateDots(index, total);
  }

  // ─────────────────────────────────────────
  // プライベート: 回答処理
  // ─────────────────────────────────────────

  _handleAnswer(chosen) {
    if (this._isLocked || !this._el) return;
    this._isLocked = true;

    const q       = this._questions[this._currentIndex];
    const correct = chosen === String(q.answer);

    if (correct) {
      this._correctCount++;
      SoundManager.playSFX(SoundType.CORRECT_ANSWER);
      HapticFeedback.success();
    } else {
      SoundManager.playSFX(SoundType.WRONG_ANSWER);
      HapticFeedback.error();
    }

    // ボタンに正解・不正解スタイルを適用
    const choicesEl = this._el.querySelector('#seqprac-choices');
    choicesEl.querySelectorAll('.seqprac-choice').forEach(btn => {
      const val = btn.dataset.value;
      if (val === String(q.answer)) {
        btn.classList.add('seqprac-choice-correct');
      } else if (val === chosen && !correct) {
        btn.classList.add('seqprac-choice-wrong');
      }
      btn.disabled = true;
    });

    // フィードバックメッセージ
    const fbEl = this._el.querySelector('#seqprac-feedback');
    fbEl.textContent = correct ? `⭕ せいかい！ ${q.answer} だよ！` : `❌ こたえは ${q.answer} だよ！`;
    fbEl.className   = `seqprac-feedback ${correct ? 'seqprac-fb-correct' : 'seqprac-fb-wrong'}`;

    // 次の問題 or 終了
    const next = this._currentIndex + 1;
    setTimeout(() => {
      if (!this._el) return;
      if (next < this._questions.length) {
        this._showQuestion(next);
      } else {
        this._showFinish();
      }
    }, FEEDBACK_MS);
  }

  // ─────────────────────────────────────────
  // プライベート: 完了表示
  // ─────────────────────────────────────────

  _showFinish() {
    if (!this._el) return;
    SoundManager.playSFX(SoundType.WORLD_CLEAR);
    HapticFeedback.success();
    this._el.querySelector('#seqprac-finish-wrap').classList.remove('hidden');
    this._el.querySelector('.seqprac-body').classList.add('hidden');
    this._el.querySelector('#seqprac-dots').classList.add('hidden');
  }

  // ─────────────────────────────────────────
  // プライベート: 進捗ドット
  // ─────────────────────────────────────────

  _updateDots(current, total) {
    if (!this._el) return;
    const dotsEl = this._el.querySelector('#seqprac-dots');
    dotsEl.innerHTML = Array.from({ length: total }, (_, i) =>
      `<span class="seqprac-dot${i < current ? ' seqprac-dot-done' : i === current ? ' seqprac-dot-active' : ''}"></span>`
    ).join('');
  }

  // ─────────────────────────────────────────
  // プライベート: イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    // スキップ
    this._el.querySelector('.seqprac-btn-skip').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      HapticFeedback.light();
      this.destroy();
      if (typeof this._onSkip === 'function') this._onSkip();
    });

    // 選択肢（イベント委譲）
    this._el.addEventListener('click', (e) => {
      const btn = e.target.closest('.seqprac-choice');
      if (!btn) return;
      this._handleAnswer(btn.dataset.value);
    });

    // 本番クイズへ
    this._el.querySelector('.seqprac-btn-finish').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.WORLD_CLEAR);
      HapticFeedback.success();
      this.destroy();
      if (typeof this._onFinish === 'function') this._onFinish();
    });
  }
}

export default SequentialPracticeScreen;
