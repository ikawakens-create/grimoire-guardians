/**
 * ChantScreen.js - Grimoire Guardians
 * 九九フラッシュモード画面
 *
 * 機能:
 *   - 九九ワールド（m2_10a〜m2_10i）の問題を全9問固定出題
 *   - 1問5秒のカウントダウンタイマー（円形プログレスバー）
 *   - タイムアップ = 不正解として次へ
 *   - 4択ボタン（QuizScreen と同じ問題データ使用）
 *   - 全問終了後：画面内リザルトパネル（正解数・合計タイム）
 *   - 素材ドロップなし（練習モード）
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.0
 * @date 2026-03-20
 */

import Logger from '../core/Logger.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import { loadUnitQuestions } from '../data/units.js';
import { getWorldById } from '../data/worlds.js';

/** タイマー更新間隔（ms） */
const TIMER_TICK_MS = 100;

/** フィードバック表示時間（ms） */
const FEEDBACK_MS = 800;

class ChantScreen {
  /**
   * @param {HTMLElement} container  - 描画先の親要素
   * @param {Object}      worldData  - 選択されたワールドデータ
   * @param {Function}    onExit     - 終了コールバック (result) => void
   *                                   result.type: 'finish' | 'abort'
   *                                   result.correctCount, result.total, result.elapsedMs
   */
  constructor(container, worldData, onExit) {
    this._container = container;
    this._worldData = worldData;
    this._onExit    = onExit;
    this._el        = null;

    /** @type {Array} ロード済み問題データ（全9問） */
    this._questions = [];

    /** @type {number} 現在の問題インデックス */
    this._currentIndex = 0;

    /** @type {number} 正解数 */
    this._correctCount = 0;

    /** @type {boolean} 回答ロック中 */
    this._isAnswered = false;

    /** @type {number|null} setInterval ID */
    this._timerId = null;

    /** @type {number} 現問題の残り時間（ms） */
    this._remaining = 0;

    /** @type {number} セッション開始時刻（Date.now()） */
    this._startTime = 0;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を描画する（問題ロード → 最初の問題表示）
   */
  async render() {
    this._buildShell();
    this._startTime = Date.now();

    try {
      await this._loadQuestions();
      this._showQuestion(0);
    } catch (err) {
      Logger.error('[ChantScreen] 問題ロード失敗:', err);
      this._showError();
    }
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    this._stopTimer();
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[ChantScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: シェル構築
  // ─────────────────────────────────────────

  _buildShell() {
    const el = document.createElement('div');
    el.className = 'chant-screen';
    el.innerHTML = `
      <div class="chant-header">
        <button class="chant-back-btn" type="button" aria-label="もどる">✕</button>
        <div class="chant-world-title"></div>
        <div class="chant-progress-text"></div>
      </div>

      <div class="chant-timer-wrap">
        <svg class="chant-timer-svg" viewBox="0 0 80 80" aria-hidden="true">
          <circle class="chant-timer-track" cx="40" cy="40" r="34"/>
          <circle class="chant-timer-bar"   cx="40" cy="40" r="34"/>
        </svg>
        <div class="chant-timer-label">5</div>
      </div>

      <div class="chant-question-card">
        <div class="chant-question-text"></div>
      </div>

      <div class="chant-choices-grid" id="chant-choices"></div>

      <div class="chant-result-panel hidden" id="chant-result"></div>
    `;

    this._el = el;
    this._container.appendChild(el);

    // もどるボタン
    el.querySelector('.chant-back-btn').addEventListener('click', () => {
      this._stopTimer();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onExit === 'function') {
        this._onExit({ type: 'abort' });
      }
    });

    // タイトルセット
    const world = getWorldById(this._worldData.id);
    el.querySelector('.chant-world-title').textContent = world?.title ?? 'フラッシュモード';

    // フェードイン
    requestAnimationFrame(() => el.classList.add('chant-visible'));
  }

  // ─────────────────────────────────────────
  // プライベート: 問題ロード
  // ─────────────────────────────────────────

  /**
   * 九九の問題を全9問ロードする（シャッフルなし、固定順）
   */
  async _loadQuestions() {
    const unitId = this._worldData.unitId;
    const { questions } = await loadUnitQuestions(unitId);
    const count = Config.GRADE2.FLASH_MODE.QUESTION_COUNT;
    // stepConfig で pick:9 になっているため先頭 count 件をそのまま使用
    this._questions = questions.slice(0, count);
    Logger.info(`[ChantScreen] ${this._questions.length}問ロード完了 (unit: ${unitId})`);
  }

  // ─────────────────────────────────────────
  // プライベート: 問題表示
  // ─────────────────────────────────────────

  /**
   * @param {number} index - 問題インデックス
   */
  _showQuestion(index) {
    if (!this._el) return;

    this._currentIndex = index;
    this._isAnswered   = false;

    const q     = this._questions[index];
    const total = this._questions.length;

    // 進捗テキスト
    this._el.querySelector('.chant-progress-text').textContent = `${index + 1} / ${total}`;

    // 問題文
    this._el.querySelector('.chant-question-text').textContent = q.question;

    // 選択肢（毎回シャッフル）
    const choicesEl = this._el.querySelector('#chant-choices');
    choicesEl.innerHTML = '';
    const shuffled = this._shuffleChoices(q.choices);
    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className   = 'button chant-choice-btn';
      btn.type        = 'button';
      btn.textContent = String(choice);
      btn.dataset.value = String(choice);
      btn.addEventListener('click', () => this._onAnswer(choice, btn, q.correctAnswer));
      choicesEl.appendChild(btn);
    });

    // タイマー開始
    this._startTimer();
  }

  // ─────────────────────────────────────────
  // プライベート: タイマー
  // ─────────────────────────────────────────

  _startTimer() {
    this._stopTimer();
    const limitMs = Config.GRADE2.FLASH_MODE.TIME_LIMIT_PER_QUESTION * 1000;
    this._remaining = limitMs;
    this._updateTimerUI(limitMs, limitMs);

    this._timerId = setInterval(() => {
      this._remaining -= TIMER_TICK_MS;
      this._updateTimerUI(this._remaining, limitMs);

      if (this._remaining <= 0) {
        this._stopTimer();
        if (!this._isAnswered) this._onTimeUp();
      }
    }, TIMER_TICK_MS);
  }

  _stopTimer() {
    if (this._timerId !== null) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  }

  /**
   * タイマーUIを更新する（円形プログレスバー + 秒数ラベル）
   * @param {number} remaining - 残り時間（ms）
   * @param {number} total     - 合計時間（ms）
   */
  _updateTimerUI(remaining, total) {
    if (!this._el) return;

    const ratio = Math.max(0, remaining / total);
    const bar   = this._el.querySelector('.chant-timer-bar');
    const label = this._el.querySelector('.chant-timer-label');

    // SVG 円周 = 2π × r = 2π × 34 ≈ 213.6
    const circumference = 2 * Math.PI * 34;
    bar.style.strokeDasharray  = `${circumference}`;
    bar.style.strokeDashoffset = `${circumference * (1 - ratio)}`;

    // 残り秒数（切り上げ）
    label.textContent = String(Math.ceil(remaining / 1000));

    // 残り1秒以下で警告色
    bar.classList.toggle('chant-timer-danger', remaining <= 1000);
    label.classList.toggle('chant-timer-danger', remaining <= 1000);
  }

  // ─────────────────────────────────────────
  // プライベート: 回答処理
  // ─────────────────────────────────────────

  /**
   * タイムアップ処理
   */
  _onTimeUp() {
    if (this._isAnswered) return;
    this._isAnswered = true;
    HapticFeedback.error();
    SoundManager.playSFX(SoundType.WRONG_ANSWER);
    this._showFeedback(false, null);
  }

  /**
   * 選択肢タップ処理
   * @param {*}           choice        - タップした選択肢の値
   * @param {HTMLElement} btn           - タップしたボタン要素
   * @param {*}           correctAnswer - 正解値
   */
  _onAnswer(choice, btn, correctAnswer) {
    if (this._isAnswered) return;
    this._isAnswered = true;
    this._stopTimer();

    const isCorrect = String(choice) === String(correctAnswer);
    if (isCorrect) {
      this._correctCount++;
      HapticFeedback.success();
      SoundManager.playSFX(SoundType.CORRECT_ANSWER);
      btn.classList.add('chant-choice-correct');
    } else {
      HapticFeedback.error();
      SoundManager.playSFX(SoundType.WRONG_ANSWER);
      btn.classList.add('chant-choice-wrong');
      // 正解ボタンをハイライト
      this._el.querySelectorAll('.chant-choice-btn').forEach(b => {
        if (String(b.dataset.value) === String(correctAnswer)) {
          b.classList.add('chant-choice-correct');
        }
      });
    }

    this._showFeedback(isCorrect, btn);
  }

  /**
   * 正解/不正解フィードバックを表示し、FEEDBACK_MS 後に次の問題へ
   * @param {boolean}         isCorrect
   * @param {HTMLElement|null} btn
   */
  _showFeedback(isCorrect, btn) {
    if (!this._el) return;

    const card = this._el.querySelector('.chant-question-card');
    card.classList.add(isCorrect ? 'chant-card-correct' : 'chant-card-wrong');

    setTimeout(() => {
      if (!this._el) return;
      card.classList.remove('chant-card-correct', 'chant-card-wrong');
      this._next();
    }, FEEDBACK_MS);
  }

  /**
   * 次の問題へ進む（全問終了なら結果表示）
   */
  _next() {
    const nextIndex = this._currentIndex + 1;
    if (nextIndex >= this._questions.length) {
      this._showResult();
    } else {
      this._showQuestion(nextIndex);
    }
  }

  // ─────────────────────────────────────────
  // プライベート: リザルト
  // ─────────────────────────────────────────

  /**
   * 画面内にリザルトパネルを表示する
   */
  _showResult() {
    if (!this._el) return;

    const elapsedMs = Date.now() - this._startTime;
    const total     = this._questions.length;
    const pct       = Math.round((this._correctCount / total) * 100);

    Logger.info(`[ChantScreen] 完了: ${this._correctCount}/${total} (${pct}%) ${elapsedMs}ms`);

    // 問題エリアを隠す
    this._el.querySelector('.chant-timer-wrap').classList.add('hidden');
    this._el.querySelector('.chant-question-card').classList.add('hidden');
    this._el.querySelector('#chant-choices').classList.add('hidden');

    // リザルトパネル
    const resultEl = this._el.querySelector('#chant-result');
    resultEl.classList.remove('hidden');

    const rankEmoji = pct >= 90 ? '🌟' : pct >= 70 ? '⭐' : pct >= 50 ? '😊' : '😢';
    const timeStr   = this._formatTime(elapsedMs);

    resultEl.innerHTML = `
      <div class="chant-result-rank">${rankEmoji}</div>
      <div class="chant-result-score">
        <span class="chant-result-correct">${this._correctCount}</span>
        <span class="chant-result-sep"> / </span>
        <span class="chant-result-total">${total}</span>
        <span class="chant-result-unit">もんせいかい</span>
      </div>
      <div class="chant-result-time">⏱ ${timeStr}</div>
      <div class="chant-result-buttons">
        <button class="button button-secondary chant-result-back" type="button">ほんだなへ</button>
        <button class="button button-large chant-result-retry" type="button">もう一度 ⚡</button>
      </div>
    `;

    resultEl.querySelector('.chant-result-back').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onExit === 'function') {
        this._onExit({ type: 'finish', correctCount: this._correctCount, total, elapsedMs });
      }
    });

    resultEl.querySelector('.chant-result-retry').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      // リセットして再スタート
      this._correctCount  = 0;
      this._currentIndex  = 0;
      this._startTime     = Date.now();
      resultEl.classList.add('hidden');
      this._el.querySelector('.chant-timer-wrap').classList.remove('hidden');
      this._el.querySelector('.chant-question-card').classList.remove('hidden');
      this._el.querySelector('#chant-choices').classList.remove('hidden');
      this._showQuestion(0);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: ユーティリティ
  // ─────────────────────────────────────────

  /**
   * 配列をシャッフルして新しい配列を返す（Fisher-Yates / 非破壊）
   * @param {Array} arr
   * @returns {Array}
   */
  _shuffleChoices(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * ミリ秒を「X秒」または「X分Y秒」形式に変換する
   * @param {number} ms
   * @returns {string}
   */
  _formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    if (totalSec < 60) return `${totalSec}びょう`;
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}ふん${sec}びょう`;
  }

  /**
   * ロードエラー時のフォールバック表示
   */
  _showError() {
    if (!this._el) return;
    const card = this._el.querySelector('.chant-question-card');
    if (card) card.textContent = '問題を読み込めませんでした。もどるボタンを押してください。';
  }
}

export default ChantScreen;
