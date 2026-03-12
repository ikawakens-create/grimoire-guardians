/**
 * QuizScreen.js - Grimoire Guardians
 * クイズ画面
 *
 * 機能:
 *   - 問題データの動的ロード（import()）
 *   - 選択肢の毎回シャッフル（Fisher-Yates / 非破壊）
 *   - 回答ロック（フィードバック中の誤爆防止）
 *   - 正解/不正解フィードバック（正解1.0秒 / 不正解2.0秒）
 *   - ProgressBar による進捗表示
 *   - カスタム確認モーダル（「もどる」誤爆防止）
 *   - SoundManager / HapticFeedback 呼び出し
 *   - GameStore による回答記録・セッション管理
 *
 * @version 1.0
 * @date 2026-02-19
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import ProgressBar from '../components/ProgressBar.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import { TypeValidator } from '../utils/TypeValidator.js';
import { loadUnitQuestions } from '../data/units.js';
import EventManager from '../core/EventManager.js';
import ClockFace from '../components/ClockFace.js';
import ShapeFace from '../components/ShapeFace.js';

/** フィードバック待機時間（ms） */
const FEEDBACK_DELAY = {
  CORRECT: 1000,
  WRONG: 2000
};

/** マスコットの応援メッセージ */
const MASCOT_MESSAGES = {
  correct: [
    'すごい！',
    'やったー！',
    'せいかい！',
    'かんぺき！',
    'よくできました！'
  ],
  wrong: [
    'ざんねん...',
    'つぎは がんばろう！',
    'もういちど！',
    'だいじょうぶ！'
  ],
  streak3:  'すごいれんぞく！✨',
  streak5:  '5れんぞく！🌟 きらきら！',
  streak7:  '7れんぞく！🔥🔥🔥',
  streak10: '10れんぞく！🌈 すごすぎる！！'
};

/**
 * QuizScreen クラス
 * 問題一覧を受け取り、クイズを進行する画面コンポーネント
 */
export class QuizScreen {
  /**
   * @param {HTMLElement} container - 描画先のコンテナ要素
   * @param {Function} onExit - クイズ終了・中断時のコールバック (result) => void
   */
  constructor(container, onExit) {
    this._container = container;
    this._onExit = onExit;

    /** @type {Array} ロード済み問題データ */
    this._questions = [];

    /** @type {number} 現在の問題インデックス（0始まり） */
    this._currentIndex = 0;

    /** @type {boolean} フィードバック中は true（回答ロック用） */
    this._isAnswered = false;

    /** @type {ProgressBar|null} */
    this._progressBar = null;

    /** @type {HTMLElement|null} 画面ルート要素 */
    this._el = null;

    /** @type {string|null} */
    this._unitId = null;

    /** @type {HTMLElement|null} 確認モーダル */
    this._confirmModal = null;

    /** @type {number} 連続正解数（クイズ内ストリーク） */
    this._correctStreak = 0;

    /** @type {Object|null} ワールドデータ（イベントトリガー照合用） */
    this._worldData = null;

    /**
     * フィードバック待機中の setTimeout ID
     * destroy() 時にキャンセルして、破棄済み画面への操作を防ぐ
     * @type {number|null}
     */
    this._feedbackTimer = null;

    /** @type {number|null} ローディングオーバーレイの fadeout タイマー */
    this._loadingTimer = null;
  }

  // ============================================================
  // Public API
  // ============================================================

  /**
   * 画面を描画する
   * @param {Object} worldData - worlds.js のワールドデータ
   * @param {string} worldData.unitId - ロードするユニットID
   * @param {string} worldData.id    - ワールドID（GameStore セッション用）
   * @param {string} worldData.title - ワールドタイトル
   */
  async render(worldData) {
    Logger.info(`[QuizScreen] Rendering for world: ${worldData.id}, unit: ${worldData.unitId}`);
    Logger.time('QuizScreen.render');

    this._unitId    = worldData.unitId;
    this._worldData = worldData;

    // DOM 骨格を構築（まずローディング状態で表示）
    this._buildUI(worldData.title);
    this._container.appendChild(this._el);

    // BGM 開始
    SoundManager.playBGM(SoundType.BGM_QUIZ);

    try {
      // 問題データを動的ロード
      await this._loadQuestions(worldData.unitId);

      // GameStore セッション開始
      GameStore.startQuizSession(worldData.id, worldData.unitId, this._questions);

      // 最初の問題を表示
      this._hideLoadingOverlay();
      this._showQuestion(0);

    } catch (err) {
      Logger.error('[QuizScreen] Failed to load questions:', err);
      this._showLoadError(err.message);
    }

    Logger.timeEnd('QuizScreen.render');
  }

  /**
   * 画面を破棄してリソースを解放する
   */
  destroy() {
    Logger.info('[QuizScreen] Destroying');

    if (this._progressBar) {
      this._progressBar.destroy();
      this._progressBar = null;
    }

    if (this._confirmModal) {
      this._removeModal();
    }

    // GameStore 購読解除
    if (this._buffUnsubscribe) {
      this._buffUnsubscribe();
      this._buffUnsubscribe = null;
    }

    // タイマーを全て解除（フィードバック待機 / ローディング / マスコット / ストリーク）
    if (this._feedbackTimer)    clearTimeout(this._feedbackTimer);
    if (this._loadingTimer)     clearTimeout(this._loadingTimer);
    if (this._mascotTimer)      clearTimeout(this._mascotTimer);
    if (this._streakBadgeTimer) clearTimeout(this._streakBadgeTimer);
    this._feedbackTimer    = null;
    this._loadingTimer     = null;
    this._mascotTimer      = null;
    this._streakBadgeTimer = null;

    if (this._el && this._el.parentNode) {
      this._el.parentNode.removeChild(this._el);
    }

    this._el = null;
    this._questions = [];
    SoundManager.stopBGM();
  }

  // ============================================================
  // Private — UI 構築
  // ============================================================

  /**
   * 画面の骨格 DOM を構築する
   * @private
   * @param {string} title - ワールドタイトル（ヘッダー表示用）
   */
  _buildUI(title) {
    const el = document.createElement('div');
    el.className = 'quiz-screen';
    el.innerHTML = `
      <!-- ヘッダー -->
      <header class="quiz-header flex-between">
        <button class="button button-secondary button-small quiz-back-btn" type="button">
          もどる
        </button>
        <div class="quiz-progress flex-1" style="margin: 0 var(--spacing-md);">
          <div class="quiz-progress-bar-wrap" style="width: 100%;"></div>
        </div>
        <div class="quiz-counter badge" aria-live="polite">
          1 / ${0}
        </div>
      </header>

      <!-- ローディングオーバーレイ（問題ロード中） -->
      <div class="quiz-loading-overlay flex-center" style="
        position: absolute; inset: 0;
        background: var(--bg-primary);
        z-index: 10;
      ">
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: var(--spacing-md);">📖</div>
          <div style="color: var(--text-secondary);">もんだいを よみこんでいます...</div>
        </div>
      </div>

      <!-- メインコンテンツ -->
      <main class="quiz-content">
        <div class="question-container">
          <!-- 問題番号バッジ -->
          <div class="quiz-question-num text-center mb-3">
            <span class="badge" style="font-size: var(--font-size-sm);"></span>
          </div>
          <!-- 時計表示エリア（type:'clock' の問題のみ表示） -->
          <div class="quiz-clock-display hidden" style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: var(--spacing-sm);
          "></div>
          <!-- 問題画像エリア（image フィールドがある問題のみ表示 / nanobanana 対応） -->
          <div class="question-image-wrap hidden">
            <img class="question-image" src="" alt="" />
          </div>
          <!-- 問題文 -->
          <div class="question-text" style="white-space: pre-line;"></div>
          <!-- 選択肢グリッド -->
          <div class="question-choices"></div>
        </div>
      </main>

      <!-- フィードバックオーバーレイ（正解/不正解） -->
      <div class="quiz-feedback hidden" style="
        position: absolute; inset: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        pointer-events: none;
        z-index: 5;
      ">
        <div class="quiz-feedback-icon" style="
          font-size: 6rem;
          line-height: 1;
          margin-bottom: var(--spacing-md);
          will-change: transform;
        "></div>
        <div class="quiz-feedback-text" style="
          font-size: var(--font-size-xl);
          font-weight: bold;
          color: var(--text-light);
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        "></div>
      </div>

      <!-- マスコット（右下固定） -->
      <div class="quiz-mascot hidden" aria-live="polite" aria-atomic="true">
        <div class="mascot-bubble"></div>
        <div class="mascot-icon">🧙</div>
      </div>

      <!-- 連続正解ストリーク表示 -->
      <div class="quiz-streak-badge hidden" aria-live="polite"></div>

      <!-- バフアイコン（おみくじ倍率・おまもり）右上固定 -->
      <div class="quiz-buff-indicator hidden" aria-live="polite" aria-atomic="true"></div>
    `;

    // position: relative が必要（絶対配置の子要素のため）
    el.style.position = 'relative';

    // GameStore のバフ変化を購読してアイコンを更新
    this._buffUnsubscribe = GameStore.subscribe((path) => {
      if (path === 'currentSession.rewardMultiplier' || path === 'currentSession.shieldActive') {
        this._updateBuffIndicator();
      }
    });

    // ProgressBar を生成してヘッダーに挿入
    const progressWrap = el.querySelector('.quiz-progress-bar-wrap');
    this._progressBar = new ProgressBar({
      percentage: 0,
      container: progressWrap,
      showPercentage: false,
      height: 10,
      animated: true,
      showGlow: false,
      showStars: false
    });
    this._progressBar.render();

    // もどるボタンのイベント
    el.querySelector('.quiz-back-btn').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._showBackConfirmation();
    });

    this._el = el;
  }

  // ============================================================
  // Private — 問題ロード
  // ============================================================

  /**
   * 問題データを動的インポートしてバリデーション
   * @private
   * @param {string} unitId
   */
  async _loadQuestions(unitId) {
    Logger.info(`[QuizScreen] Loading questions for unit: ${unitId}`);
    Logger.time(`loadUnit_${unitId}`);

    const { questions: raw, stepConfig } = await loadUnitQuestions(unitId);

    // バリデーション
    const validated = raw.filter((q, i) => {
      const ok = TypeValidator.validateQuestion(q);
      if (!ok) Logger.warn(`[QuizScreen] Q${i + 1} validation failed, skipping`);
      return ok;
    });

    if (validated.length === 0) {
      throw new Error(`ユニット ${unitId} に有効な問題がありません`);
    }

    // stepConfig があればステップ別シャッフル選出、なければ全問そのまま
    this._questions = stepConfig
      ? this._pickByStep(validated, stepConfig)
      : validated;

    Logger.info(`[QuizScreen] Loaded ${this._questions.length} questions (pool: ${validated.length})`);
    Logger.timeEnd(`loadUnit_${unitId}`);

    // カウンター表示を更新
    this._el.querySelector('.quiz-counter').textContent =
      `1 / ${this._questions.length}`;
  }

  /**
   * ステップ別シャッフル選出
   * 各ステップのプールからランダムにpick問を選び、ステップ順に結合して返す。
   * @param {Array} allQuestions - 全問題（step フィールド付き）
   * @param {Array<{step:number, pick:number}>} stepConfig - 各ステップの選出設定
   * @returns {Array} 選出・順序確定済みの問題配列
   * @private
   */
  _pickByStep(allQuestions, stepConfig) {
    const result = [];
    for (const { step, pick } of stepConfig) {
      const pool = allQuestions.filter(q => q.step === step);
      // Fisher-Yates シャッフル
      const shuffled = [...pool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      result.push(...shuffled.slice(0, pick));
    }
    return result;
  }

  // ============================================================
  // Private — 問題表示
  // ============================================================

  /**
   * 指定インデックスの問題を表示する
   * @private
   * @param {number} index - 問題インデックス（0始まり）
   */
  _showQuestion(index) {
    this._currentIndex = index;
    this._isAnswered = false;

    const q = this._questions[index];
    const displayNum = index + 1;
    const total = this._questions.length;

    Logger.debug(`[QuizScreen] Showing Q${displayNum}/${total}: ${q.id}`);
    SoundManager.playSFX(SoundType.QUESTION_APPEAR);

    // カウンター更新
    this._el.querySelector('.quiz-counter').textContent = `${displayNum} / ${total}`;

    // ProgressBar 更新（表示番号ベース: Q1表示時に 1/15 = 6.7%）
    const pct = Math.round((displayNum / total) * 100);
    this._progressBar.updatePercentage(pct);

    // 問題番号バッジ
    this._el.querySelector('.quiz-question-num .badge').textContent =
      `Q${String(displayNum).padStart(2, '0')}`;

    // 時計タイプの場合はSVG時計を表示する
    const clockDisplayEl = this._el.querySelector('.quiz-clock-display');
    if (q.type === 'clock' && q.clockFace) {
      clockDisplayEl.innerHTML = ClockFace.renderSVG(q.clockFace.hour, q.clockFace.minute, 170);
      clockDisplayEl.classList.remove('hidden');
    } else {
      clockDisplayEl.innerHTML = '';
      clockDisplayEl.classList.add('hidden');
    }

    // 問題画像（nanobanana 対応: image フィールドがある場合のみ表示）
    const questionImageWrapEl = this._el.querySelector('.question-image-wrap');
    const questionImageEl     = this._el.querySelector('.question-image');
    if (q.image) {
      questionImageEl.src = q.image;
      questionImageWrapEl.classList.remove('hidden');
    } else {
      questionImageEl.src = '';
      questionImageWrapEl.classList.add('hidden');
    }

    // 問題文（アニメーション付きで差し替え）
    const questionTextEl = this._el.querySelector('.question-text');
    questionTextEl.style.animation = 'none';
    // 再フロー強制でアニメーションをリセット
    void questionTextEl.offsetHeight;
    questionTextEl.textContent = q.question;
    questionTextEl.style.animation = 'slide-in-up var(--transition-normal) ease both';

    // 選択肢を構築（シャッフル）
    this._buildChoices(q);

    // フィードバックオーバーレイを非表示
    this._el.querySelector('.quiz-feedback').classList.add('hidden');
    this._el.querySelector('.quiz-feedback').style.background = '';
  }

  /**
   * 選択肢ボタンをシャッフルして描画する（非破壊）
   *
   * distractorPool モード:
   *   正解1つ + distractorPool からランダムに Config.GAME.DISTRACTOR_COUNT 個を選んで出題。
   *   毎回異なる不正解の組み合わせが出るため、消去法のパターンが変化する。
   *
   * 通常 choices モード:
   *   従来通り choices をそのままシャッフルして出題。
   *
   * choiceImages サポート（nanobanana 拡張点）:
   *   question.choiceImages が存在する場合、選択肢ボタンに画像を追加表示する。
   *
   * @private
   * @param {{ choices?: string[], distractorPool?: string[], correctAnswer: string, choiceImages?: Object }} question
   */
  _buildChoices(question) {
    const choicesEl = this._el.querySelector('.question-choices');
    choicesEl.innerHTML = '';

    // --- 選択肢プールの構築 ---
    let pool;
    if (question.distractorPool != null &&
        question.distractorPool.length >= Config.GAME.DISTRACTOR_COUNT) {
      // distractorPool モード: プールをシャッフルして DISTRACTOR_COUNT 個を選ぶ
      const shuffledPool = [...question.distractorPool];
      for (let i = shuffledPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
      }
      pool = [question.correctAnswer, ...shuffledPool.slice(0, Config.GAME.DISTRACTOR_COUNT)];
    } else {
      // 通常 choices モード（後方互換）
      pool = [...question.choices];
    }

    // --- pool 全体をシャッフル（正解位置をランダム化） ---
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // --- ボタン生成 ---
    pool.forEach((choice) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-button';
      btn.dataset.choice = choice;

      // 形問題サポート: renderAs:'shape' のとき SVG 形＋テキスト表示（優先度: shape > choiceImages > text）
      const shapeKey = question.renderAs === 'shape' ? ShapeFace.textToKey(choice) : null;
      if (shapeKey !== null || question.renderAs === 'shape') {
        btn.classList.add('choice-button--with-shape');
        btn.innerHTML =
          `<span class="choice-shape" aria-hidden="true">${ShapeFace.renderSVG(shapeKey)}</span>` +
          `<span class="choice-label">${choice}</span>`;
      } else {
        // choiceImages サポート（nanobanana 対応: 画像が設定されていれば画像＋テキスト表示）
        const imgSrc = question.choiceImages?.[choice];
        if (imgSrc) {
          btn.classList.add('choice-button--with-image');
          btn.innerHTML =
            `<img class="choice-image" src="${imgSrc}" alt="" aria-hidden="true">` +
            `<span class="choice-label">${choice}</span>`;
        } else {
          btn.textContent = choice;
        }
      }

      btn.addEventListener('click', () => {
        if (this._isAnswered) return;
        this._handleAnswer(choice, question);
      });

      choicesEl.appendChild(btn);
    });
  }

  // ============================================================
  // Private — 回答処理
  // ============================================================

  /**
   * 選択肢が選ばれたときの処理
   * @private
   * @param {string} selectedChoice - 選択された値
   * @param {Object} question       - 問題オブジェクト
   */
  async _handleAnswer(selectedChoice, question) {
    // ロック（二重タップ防止）
    this._isAnswered = true;
    this._lockAllChoices();

    const isCorrect = selectedChoice === question.correctAnswer;

    Logger.debug(`[QuizScreen] Answer: "${selectedChoice}" → ${isCorrect ? '正解' : '不正解'}`);

    // 連続正解ストリーク更新
    if (isCorrect) {
      this._correctStreak++;
    } else {
      this._correctStreak = 0;
    }

    // 選択ボタンのビジュアルフィードバック
    this._applyChoiceFeedback(selectedChoice, question.correctAnswer, isCorrect);

    // サウンド & ハプティクス
    if (isCorrect) {
      SoundManager.playSFX(SoundType.CORRECT_ANSWER);
      HapticFeedback.success();
    } else {
      SoundManager.playSFX(SoundType.WRONG_ANSWER);
      HapticFeedback.error();
    }

    // GameStore に記録
    GameStore.recordAnswer(
      this._currentIndex,
      selectedChoice,
      isCorrect
    );

    // マスコットメッセージ表示
    this._showMascot(isCorrect);

    // 連続正解ストリーク演出
    if (isCorrect && this._correctStreak >= 3) {
      this._showStreakBadge(this._correctStreak);
      this._applyStreakEffect(this._correctStreak);
    }

    // フィードバックオーバーレイ表示＆待機
    await this._showFeedback(isCorrect);

    // イベント前にフィードバックオーバーレイを非表示（背景が残らないように）
    const feedbackEl = this._el?.querySelector('.quiz-feedback');
    if (feedbackEl) feedbackEl.classList.add('hidden');

    // イベントチェック（triggerAt が一致すれば演出完了まで待機）
    const answeredNum = this._currentIndex + 1;  // 1始まり
    await EventManager.checkAndTrigger(answeredNum, this._worldData);

    // 次へ進む
    this._nextQuestion();
  }

  /**
   * 全選択肢ボタンをロック（disabled）
   * @private
   */
  _lockAllChoices() {
    this._el.querySelectorAll('.choice-button').forEach((btn) => {
      btn.disabled = true;
    });
  }

  /**
   * 選択肢に正解/不正解の色を適用
   * @private
   */
  _applyChoiceFeedback(selectedChoice, correctAnswer, isCorrect) {
    this._el.querySelectorAll('.choice-button').forEach((btn) => {
      const val = btn.dataset.choice;
      if (val === selectedChoice && isCorrect) {
        btn.classList.add('correct');
      } else if (val === selectedChoice && !isCorrect) {
        btn.classList.add('wrong');
        // 不正解時: 正解ボタンもハイライト
      } else if (val === correctAnswer && !isCorrect) {
        btn.classList.add('correct');
      }
    });
  }

  // ============================================================
  // Private — フィードバックオーバーレイ
  // ============================================================

  /**
   * 正解/不正解オーバーレイを表示して指定時間待機する
   * @private
   * @param {boolean} isCorrect
   * @returns {Promise<void>} 待機後に解決
   */
  _showFeedback(isCorrect) {
    const overlay = this._el.querySelector('.quiz-feedback');
    const iconEl = overlay.querySelector('.quiz-feedback-icon');
    const textEl = overlay.querySelector('.quiz-feedback-text');

    if (isCorrect) {
      overlay.style.background = 'rgba(80, 200, 120, 0.85)';
      iconEl.textContent = '⭕';
      textEl.textContent = 'せいかい！';
    } else {
      overlay.style.background = 'rgba(220, 80, 80, 0.85)';
      iconEl.textContent = '❌';
      textEl.textContent = 'ざんねん...';
    }

    overlay.classList.remove('hidden');
    // アイコンにバウンスアニメーション
    iconEl.style.animation = 'none';
    void iconEl.offsetHeight;
    iconEl.style.animation = 'bounce 0.4s ease';

    const delay = isCorrect ? FEEDBACK_DELAY.CORRECT : FEEDBACK_DELAY.WRONG;
    return new Promise((resolve) => {
      this._feedbackTimer = setTimeout(() => {
        this._feedbackTimer = null;
        resolve();
      }, delay);
    });
  }

  // ============================================================
  // Private — 進行管理
  // ============================================================

  /**
   * 次の問題へ進む、または終了する
   * @private
   */
  _nextQuestion() {
    const nextIndex = this._currentIndex + 1;

    if (nextIndex >= this._questions.length) {
      this._finishQuiz();
    } else {
      this._showQuestion(nextIndex);
    }
  }

  /**
   * クイズ終了処理
   * @private
   */
  _finishQuiz() {
    Logger.info('[QuizScreen] Quiz finished');

    // セッション結果を集計
    const answers = GameStore.getState('currentSession.answers') || [];
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const total = this._questions.length;
    const percentage = total > 0 ? correctCount / total : 0;

    Logger.info(`[QuizScreen] Result: ${correctCount}/${total} (${Math.round(percentage * 100)}%)`);

    SoundManager.stopBGM();

    // TODO: ResultScreen への遷移（Phase 0.1 Week 3 で実装）
    // 現時点では onExit コールバックに結果を渡す
    if (typeof this._onExit === 'function') {
      this._onExit({
        type: 'finish',
        unitId: this._unitId,
        correctCount,
        total,
        percentage
      });
    }
  }

  // ============================================================
  // Private — マスコット & ストリーク演出
  // ============================================================

  /**
   * マスコットの応援メッセージを表示する
   * @private
   * @param {boolean} isCorrect
   */
  _showMascot(isCorrect) {
    const mascot = this._el.querySelector('.quiz-mascot');
    const bubble = this._el.querySelector('.mascot-bubble');
    if (!mascot || !bubble) return;

    // メッセージ選択
    let message;
    if (isCorrect && this._correctStreak >= 10) {
      message = MASCOT_MESSAGES.streak10;
    } else if (isCorrect && this._correctStreak >= 7) {
      message = MASCOT_MESSAGES.streak7;
    } else if (isCorrect && this._correctStreak >= 5) {
      message = MASCOT_MESSAGES.streak5;
    } else if (isCorrect && this._correctStreak >= 3) {
      message = MASCOT_MESSAGES.streak3;
    } else {
      const pool = isCorrect ? MASCOT_MESSAGES.correct : MASCOT_MESSAGES.wrong;
      message = pool[Math.floor(Math.random() * pool.length)];
    }

    bubble.textContent = message;

    // 表示
    mascot.classList.remove('hidden');
    mascot.classList.remove('mascot-exit');
    mascot.classList.add('mascot-enter');

    // 一定時間後に退場
    if (this._mascotTimer) clearTimeout(this._mascotTimer);
    this._mascotTimer = setTimeout(() => {
      mascot.classList.remove('mascot-enter');
      mascot.classList.add('mascot-exit');
      setTimeout(() => {
        if (mascot) mascot.classList.add('hidden');
      }, 300);
    }, 1200);
  }

  /**
   * 連続正解ストリークバッジを表示する
   * @private
   * @param {number} count - 連続正解数
   */
  _showStreakBadge(count) {
    const badge = this._el.querySelector('.quiz-streak-badge');
    if (!badge) return;

    badge.textContent = `🔥 ${count}れんぞく！`;
    badge.classList.remove('hidden');
    badge.classList.remove('streak-pop');

    // アニメーションリセット
    void badge.offsetHeight;
    badge.classList.add('streak-pop');

    if (this._streakBadgeTimer) clearTimeout(this._streakBadgeTimer);
    this._streakBadgeTimer = setTimeout(() => {
      if (badge) badge.classList.add('hidden');
    }, 1500);
  }

  /**
   * 連続正解数に応じて画面全体にエフェクトを適用する
   * @private
   * @param {number} count - 連続正解数
   */
  _applyStreakEffect(count) {
    if (!this._el) return;

    if (count >= 10) {
      // 10連続: レインボーエフェクト（既存クラスを一旦消してリセット）
      this._el.classList.remove('quiz-streak-glow', 'quiz-streak-rainbow');
      void this._el.offsetHeight;
      this._el.classList.add('quiz-streak-rainbow');
      setTimeout(() => this._el?.classList.remove('quiz-streak-rainbow'), 1600);
    } else if (count >= 5) {
      // 5連続: ゴールドグロー
      this._el.classList.remove('quiz-streak-glow', 'quiz-streak-rainbow');
      void this._el.offsetHeight;
      this._el.classList.add('quiz-streak-glow');
      setTimeout(() => this._el?.classList.remove('quiz-streak-glow'), 1000);
    }
  }

  /**
   * バフアイコン（倍率・おまもり）を更新する
   * GameStore の rewardMultiplier / shieldActive が変わったときに呼ばれる
   * @private
   */
  _updateBuffIndicator() {
    if (!this._el) return;
    const indicator = this._el.querySelector('.quiz-buff-indicator');
    if (!indicator) return;

    const multiplier   = GameStore.getState('currentSession.rewardMultiplier') ?? 1.0;
    const shieldActive = GameStore.getState('currentSession.shieldActive') ?? false;

    if (multiplier > 1.0) {
      indicator.textContent = `×${multiplier}`;
      indicator.className = 'quiz-buff-indicator quiz-buff-multiplier';
    } else if (shieldActive) {
      indicator.textContent = '🛡️';
      indicator.className = 'quiz-buff-indicator quiz-buff-shield';
    } else {
      indicator.className = 'quiz-buff-indicator hidden';
      return;
    }

    indicator.classList.remove('hidden');
  }

  // ============================================================
  // Private — 「もどる」確認モーダル
  // ============================================================

  /**
   * ゲーム内確認モーダルを表示する（window.confirm の代替）
   * ボタン配置: [やめる（左・地味）]  [つづける（右・プライマリ）]
   * @private
   */
  _showBackConfirmation() {
    // 多重表示防止
    if (this._confirmModal) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'confirm-title');

    overlay.innerHTML = `
      <div class="modal-content" style="max-width: 380px; text-align: center;">
        <div id="confirm-title" style="
          font-size: var(--font-size-xl);
          font-weight: bold;
          margin-bottom: var(--spacing-md);
          color: var(--text-primary);
        ">ほんとうに やめる？</div>
        <p style="
          color: var(--text-secondary);
          margin-bottom: var(--spacing-xl);
          font-size: var(--font-size-md);
        ">これまでの こたえは きえてしまいます。</p>
        <div style="display: flex; gap: var(--spacing-md); justify-content: center;">
          <button
            class="button button-secondary confirm-quit-btn"
            type="button"
            style="flex: 1;"
          >やめる</button>
          <button
            class="button confirm-continue-btn"
            type="button"
            style="flex: 1;"
          >つづける</button>
        </div>
      </div>
    `;

    // 「やめる」→ 中断してブックシェルフへ
    overlay.querySelector('.confirm-quit-btn').addEventListener('click', () => {
      HapticFeedback.light();
      this._removeModal();
      SoundManager.stopBGM();
      if (typeof this._onExit === 'function') {
        this._onExit({ type: 'abort', unitId: this._unitId });
      }
    });

    // 「つづける」→ モーダルを閉じてゲーム続行
    overlay.querySelector('.confirm-continue-btn').addEventListener('click', () => {
      HapticFeedback.light();
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._removeModal();
    });

    document.body.appendChild(overlay);
    this._confirmModal = overlay;

    // フォーカスを「つづける」ボタンへ（意図しない「やめる」タップを防ぐ）
    overlay.querySelector('.confirm-continue-btn').focus();
  }

  /**
   * 確認モーダルを削除する
   * @private
   */
  _removeModal() {
    if (this._confirmModal) {
      this._confirmModal.remove();
      this._confirmModal = null;
    }
  }

  // ============================================================
  // Private — ローディング制御
  // ============================================================

  /**
   * ローディングオーバーレイを非表示にする
   * @private
   */
  _hideLoadingOverlay() {
    const overlay = this._el?.querySelector('.quiz-loading-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity var(--transition-normal)';
      this._loadingTimer = setTimeout(() => {
        this._loadingTimer = null;
        overlay.remove();
      }, 300);
    }
  }

  /**
   * ロードエラーを表示する
   * @private
   * @param {string} message - エラーメッセージ
   */
  _showLoadError(message) {
    const overlay = this._el.querySelector('.quiz-loading-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 2rem; margin-bottom: var(--spacing-md);">😢</div>
          <div style="color: var(--color-danger); margin-bottom: var(--spacing-lg);">
            よみこみに しっぱいしました
          </div>
          <div style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-bottom: var(--spacing-xl);">
            ${message}
          </div>
          <button class="button button-secondary" type="button" id="quiz-error-back">
            もどる
          </button>
        </div>
      `;
      overlay.querySelector('#quiz-error-back').addEventListener('click', () => {
        if (typeof this._onExit === 'function') {
          this._onExit({ type: 'abort', unitId: this._unitId });
        }
      });
    }
  }
}

export default QuizScreen;
