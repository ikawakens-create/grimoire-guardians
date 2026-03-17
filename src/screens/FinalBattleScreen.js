/**
 * FinalBattleScreen.js - Grimoire Guardians
 * 最終決戦ステージ
 *
 * フロー:
 *   1. 開幕カットイン（3ステップ：ボス登場 → フクロウ鼓舞 → 対面）
 *   2. バトルクイズ（30問ランダム）
 *      - 左：自キャラ（xl）、右：ボス（画像）＋HPゲージ
 *      - 正解：キャラ攻撃アニメ＋HP減少
 *      - 不正解：画面赤フラッシュ＋キャラhurt
 *      - HP段階変化（100/75/50/25）でボスセリフ変化
 *   3. 勝利カットイン（正解数によって演出3パターン）
 *   4. グランドフィナーレ呼び出し
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.0
 * @date 2026-03-16
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { SaveManager } from '../core/SaveManager.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import { FINAL_BATTLE, STORY_IMAGES } from '../data/storyData.js';
import { loadUnitQuestions } from '../data/units.js';
import WORLDS from '../data/worlds.js';

/** バトルクイズ1問あたりのボスHP減少量（30問で100%） */
const HP_PER_CORRECT = 100 / FINAL_BATTLE.questionCount;

/** フィードバック待機時間（ms） */
const FEEDBACK_DELAY = { CORRECT: 900, WRONG: 1800 };

class FinalBattleScreen {
  /**
   * @param {HTMLElement} container    - 描画先の親要素
   * @param {Function}    onComplete   - グランドフィナーレへのコールバック (correctCount) => void
   * @param {Function}    onBack       - 「あとで」コールバック () => void
   */
  constructor(container, onComplete, onBack) {
    this._container  = container;
    this._onComplete = onComplete;
    this._onBack     = onBack;
    this._el         = null;

    /** @type {Array} ランダム抽出された30問 */
    this._questions  = [];
    /** @type {number} 現在の問題インデックス */
    this._currentIdx = 0;
    /** @type {number} 正解数 */
    this._correctCount = 0;
    /** @type {number} ボスHP（0〜100） */
    this._bossHp     = 100;
    /** @type {boolean} 回答ロック中か */
    this._isAnswered = false;
    /** @type {CharacterAvatar|null} */
    this._avatar     = null;
    /** @type {boolean} ボスが被ダメージ画像に切り替わったか */
    this._bossDamaged = false;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  async render() {
    Logger.info('[FinalBattleScreen] Rendering...');

    this._el = document.createElement('div');
    this._el.className = 'final-battle-screen';
    this._container.appendChild(this._el);

    // 問題をロード
    await this._loadQuestions();

    // 開幕カットインから開始
    this._showOpeningCutin(0);
  }

  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[FinalBattleScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: 問題ロード
  // ─────────────────────────────────────────

  /**
   * 全ワールドからハードな単元問題を収集し、30問ランダム抽出する
   * @private
   */
  async _loadQuestions() {
    /** 難易度3以上の単元IDリスト（難しめ問題のプール） */
    const HARD_UNITS = [
      'M1-09', 'M1-10a', 'M1-10b', 'M1-10c', 'M1-10d',
      'M1-11a', 'M1-11b', 'M1-11c', 'M1-11d',
      'M1-12a', 'M1-12b', 'M1-12c',
      'M1-14a', 'M1-14b', 'M1-14c', 'M1-14d',
      'M1-15a', 'M1-15b',
      'M1-16a', 'M1-16b',
    ];

    const allQuestions = [];
    for (const unitId of HARD_UNITS) {
      try {
        const { questions } = await loadUnitQuestions(unitId);   // ← オブジェクトを分割代入
        if (Array.isArray(questions)) {
          allQuestions.push(...questions);
        }
      } catch (e) {
        Logger.warn(`[FinalBattleScreen] Failed to load unit ${unitId}:`, e);
      }
    }

    // Fisher-Yates シャッフル後、30問抽出
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    this._questions = shuffled.slice(0, FINAL_BATTLE.questionCount);

    Logger.info(`[FinalBattleScreen] Loaded ${this._questions.length} questions`);
  }

  // ─────────────────────────────────────────
  // プライベート: 開幕カットイン
  // ─────────────────────────────────────────

  /**
   * 開幕カットインをステップ順に表示する
   * @param {number} stepIdx
   */
  _showOpeningCutin(stepIdx) {
    const steps = FINAL_BATTLE.openingCutin.steps;
    if (stepIdx >= steps.length) {
      // カットイン終了 → バトル開始
      this._startBattle();
      return;
    }

    const step = steps[stepIdx];
    this._el.innerHTML = '';
    this._el.className = 'final-battle-screen final-battle-cutin';

    const slide = document.createElement('div');
    slide.className = 'final-battle-cutin-slide';
    slide.style.background = step.bgFallback;

    // ボス画像（あれば）
    if (step.bossImage) {
      const bossWrap = document.createElement('div');
      bossWrap.className = 'fbc-boss-wrap';
      const bossImg = document.createElement('img');
      bossImg.src       = step.bossImage;
      bossImg.className = 'fbc-boss-img';
      bossImg.alt       = 'やみのまじん';
      bossImg.addEventListener('error', () => {
        bossImg.replaceWith(this._makeBossFallback());
      });
      bossWrap.appendChild(bossImg);
      slide.appendChild(bossWrap);
    }

    // キャラ（あれば）
    if (step.characterEmotion) {
      const charWrap = document.createElement('div');
      charWrap.className = `fbc-char-wrap fbc-char-${step.type}`;
      const avatar = new CharacterAvatar('lg', step.characterEmotion);
      charWrap.appendChild(avatar.render());
      slide.appendChild(charWrap);
    }

    // NPC（フクロウ先生）吹き出し
    if (step.npc && step.npcText) {
      const bubble = document.createElement('div');
      bubble.className = 'fbc-npc-bubble';
      bubble.innerHTML = `
        <img src="${STORY_IMAGES.npcs.fukurou}" class="fbc-npc-icon"
             onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'🦉',className:'fbc-npc-emoji'}))">
        <p class="fbc-npc-text">${step.npcText.replace(/\n/g, '<br>')}</p>
      `;
      slide.appendChild(bubble);
    }

    // メインテキスト
    if (step.text) {
      const textEl = document.createElement('div');
      textEl.className = 'fbc-main-text';
      textEl.innerHTML = step.text.replace(/\n/g, '<br>');
      slide.appendChild(textEl);
    }

    // スタートボタン or タップ次へ
    if (step.showStartButton) {
      const btn = document.createElement('button');
      btn.className = 'button button-large fbc-start-btn';
      btn.textContent = step.startLabel;
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._startBattle();
      });
      slide.appendChild(btn);

      const backBtn = document.createElement('button');
      backBtn.className = 'button button-secondary fbc-back-btn';
      backBtn.textContent = 'あとで';
      backBtn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this.destroy();
        if (typeof this._onBack === 'function') this._onBack();
      });
      slide.appendChild(backBtn);
    } else {
      // タップで次へ
      slide.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._showOpeningCutin(stepIdx + 1);
      });
      const tapHint = document.createElement('div');
      tapHint.className = 'fbc-tap-hint';
      tapHint.textContent = 'タップして つぎへ →';
      slide.appendChild(tapHint);
    }

    this._el.appendChild(slide);
    requestAnimationFrame(() => slide.classList.add('fbc-slide-in'));
  }

  // ─────────────────────────────────────────
  // プライベート: バトル開始
  // ─────────────────────────────────────────

  _startBattle() {
    this._currentIdx   = 0;
    this._correctCount = 0;
    this._bossHp       = 100;
    SoundManager.playBGM(SoundType.BGM_QUIZ);
    this._renderBattleUI();
    this._showQuestion();
  }

  /**
   * バトルUIのベースレイアウトを描画する（問題ごとに再利用）
   */
  _renderBattleUI() {
    this._el.innerHTML = '';
    this._el.className = 'final-battle-screen final-battle-active';

    this._el.innerHTML = `
      <!-- ボスエリア -->
      <div class="fb-boss-area">
        <div class="fb-boss-img-wrap" id="fb-boss-img-wrap">
          <!-- ボス画像 / フォールバック -->
        </div>
        <div class="fb-boss-dialogue" id="fb-boss-dialogue">
          ${FINAL_BATTLE.bossDialogue.hp100}
        </div>
        <!-- HPゲージ -->
        <div class="fb-hp-bar-wrap">
          <span class="fb-hp-label">やみのまじん HP</span>
          <div class="fb-hp-bar-bg">
            <div class="fb-hp-bar-fill" id="fb-hp-fill" style="width:100%"></div>
          </div>
        </div>
      </div>

      <!-- 進捗 -->
      <div class="fb-progress-wrap">
        <span class="fb-progress-text" id="fb-progress-text">
          ⚔️ けっせん 1/${FINAL_BATTLE.questionCount}
        </span>
      </div>

      <!-- キャラ + 問題エリア -->
      <div class="fb-main-area">
        <!-- 自キャラ（左） -->
        <div class="fb-char-slot" id="fb-char-slot"></div>

        <!-- 問題 + 選択肢 -->
        <div class="fb-quiz-area">
          <div class="fb-question-text" id="fb-question-text"></div>
          <div class="fb-choices-grid" id="fb-choices-grid"></div>
        </div>
      </div>
    `;

    // ボス画像挿入
    const bossWrap = this._el.querySelector('#fb-boss-img-wrap');
    const bossImg  = document.createElement('img');
    bossImg.src       = STORY_IMAGES.boss.normal;
    bossImg.id        = 'fb-boss-img';
    bossImg.className = 'fb-boss-img';
    bossImg.alt       = 'やみのまじん';
    bossImg.addEventListener('error', () => {
      bossImg.replaceWith(this._makeBossFallback());
    });
    bossWrap.appendChild(bossImg);

    // 自キャラ挿入
    this._avatar = new CharacterAvatar('xl', 'normal');
    const charSlot = this._el.querySelector('#fb-char-slot');
    if (charSlot) charSlot.appendChild(this._avatar.render());
  }

  // ─────────────────────────────────────────
  // プライベート: 問題表示
  // ─────────────────────────────────────────

  _showQuestion() {
    if (this._currentIdx >= this._questions.length) {
      this._endBattle();
      return;
    }

    const q = this._questions[this._currentIdx];
    this._isAnswered = false;

    // 進捗テキスト更新
    const progEl = this._el.querySelector('#fb-progress-text');
    if (progEl) {
      progEl.textContent = `⚔️ けっせん ${this._currentIdx + 1}/${FINAL_BATTLE.questionCount}`;
    }

    // 問題文
    const qEl = this._el.querySelector('#fb-question-text');
    if (qEl) qEl.textContent = q.question;

    // 最終問題の特別演出
    if (this._currentIdx === this._questions.length - 1) {
      const prog = this._el.querySelector('.fb-progress-wrap');
      if (prog) prog.classList.add('fb-final-question');
    }

    // 選択肢生成
    const grid = this._el.querySelector('#fb-choices-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const choices = this._buildChoices(q);
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className   = 'button fb-choice-btn';
      btn.textContent = String(choice);
      btn.addEventListener('click', () => this._onChoiceClick(btn, choice, q.correctAnswer));
      grid.appendChild(btn);
    });
  }

  /**
   * 選択肢配列を生成する（シャッフル済み）
   * @param {Object} q - 問題オブジェクト
   * @returns {Array}
   */
  _buildChoices(q) {
    // 問題の正解フィールドは correctAnswer（choices には正解も含まれる場合があるので dedup する）
    const all = [q.correctAnswer, ...(q.choices || q.distractors || [])].filter(
      (v, i, arr) => v !== undefined && arr.indexOf(v) === i
    );
    // Fisher-Yates
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, Config.GAME.DISTRACTOR_COUNT + 1);
  }

  // ─────────────────────────────────────────
  // プライベート: 回答処理
  // ─────────────────────────────────────────

  /**
   * 選択肢ボタンクリック時の処理
   * @param {HTMLElement} btn
   * @param {*} choice
   * @param {*} answer
   */
  _onChoiceClick(btn, choice, answer) {
    if (this._isAnswered) return;
    this._isAnswered = true;

    const isCorrect = String(choice) === String(answer);

    if (isCorrect) {
      this._onCorrect(btn);
    } else {
      this._onWrong(btn, answer);
    }
  }

  _onCorrect(btn) {
    this._correctCount++;
    this._bossHp = Math.max(0, this._bossHp - HP_PER_CORRECT);

    btn.classList.add('fb-choice-correct');
    HapticFeedback.light();
    SoundManager.playSFX(SoundType.CORRECT_ANSWER);

    // キャラ攻撃アニメ
    this._setCharEmotion('happy');
    this._setCharAnimation('fb-char-attack');

    // ボスダメージ
    this._updateBossHp();
    this._flashBoss('fb-boss-hit');

    setTimeout(() => {
      this._setCharAnimation(null);
      this._currentIdx++;
      this._showQuestion();
    }, FEEDBACK_DELAY.CORRECT);
  }

  _onWrong(btn, correctAnswer) {
    btn.classList.add('fb-choice-wrong');

    // 正解ボタンをハイライト
    this._el.querySelectorAll('.fb-choice-btn').forEach(b => {
      if (String(b.textContent) === String(correctAnswer)) {
        b.classList.add('fb-choice-correct');
      }
    });

    HapticFeedback.medium();
    SoundManager.playSFX(SoundType.WRONG_ANSWER);

    // キャラhurt
    this._setCharEmotion('sad');
    // 画面赤フラッシュ
    this._el.classList.add('fb-screen-flash-red');
    setTimeout(() => this._el.classList.remove('fb-screen-flash-red'), 300);

    setTimeout(() => {
      this._setCharEmotion('normal');
      this._currentIdx++;
      this._showQuestion();
    }, FEEDBACK_DELAY.WRONG);
  }

  // ─────────────────────────────────────────
  // プライベート: UI更新
  // ─────────────────────────────────────────

  /**
   * ボスHPゲージとセリフを更新する
   */
  _updateBossHp() {
    const fill = this._el.querySelector('#fb-hp-fill');
    if (fill) {
      fill.style.width = `${Math.max(0, this._bossHp)}%`;
      // HP段階でゲージ色を変える
      if (this._bossHp <= 25) fill.className = 'fb-hp-bar-fill fb-hp-critical';
      else if (this._bossHp <= 50) fill.className = 'fb-hp-bar-fill fb-hp-low';
      else fill.className = 'fb-hp-bar-fill';
    }

    // ボスセリフ更新
    const dialogue = this._el.querySelector('#fb-boss-dialogue');
    if (dialogue) {
      const { bossDialogue: d } = FINAL_BATTLE;
      let text = d.hp100;
      if (this._bossHp <= 25)      text = d.hp25;
      else if (this._bossHp <= 50) text = d.hp50;
      else if (this._bossHp <= 75) text = d.hp75;
      dialogue.textContent = text;
    }

    // ボスHP50%以下で一度だけダメージ画像に切り替え
    if (this._bossHp <= 50 && !this._bossDamaged) {
      this._bossDamaged = true;
      const bossImg = this._el.querySelector('#fb-boss-img');
      if (bossImg) bossImg.src = STORY_IMAGES.boss.damaged;
    }
  }

  /**
   * ボスのフラッシュエフェクトを一時的に追加する
   * @param {string} cssClass
   */
  _flashBoss(cssClass) {
    const bossImg = this._el.querySelector('#fb-boss-img') ||
                    this._el.querySelector('.fb-boss-fallback');
    if (bossImg) {
      bossImg.classList.add(cssClass);
      setTimeout(() => bossImg.classList.remove(cssClass), 400);
    }
  }

  /**
   * キャラのemotionを更新する（DOM差し替え）
   * @param {'normal'|'happy'|'sad'} emotion
   */
  _setCharEmotion(emotion) {
    const slot = this._el.querySelector('#fb-char-slot');
    if (!slot) return;
    slot.innerHTML = '';
    this._avatar = new CharacterAvatar('xl', emotion);
    slot.appendChild(this._avatar.render());
  }

  /**
   * キャラにCSSアニメーションクラスを設定する
   * @param {string|null} cssClass
   */
  _setCharAnimation(cssClass) {
    const slot = this._el.querySelector('#fb-char-slot');
    if (!slot) return;
    slot.classList.remove('fb-char-attack', 'fb-char-hurt');
    if (cssClass) slot.classList.add(cssClass);
  }

  // ─────────────────────────────────────────
  // プライベート: バトル終了 → 勝利カットイン
  // ─────────────────────────────────────────

  _endBattle() {
    Logger.info(`[FinalBattleScreen] Battle ended. Correct: ${this._correctCount}/${FINAL_BATTLE.questionCount}`);

    // 勝利パターン決定
    const { victoryVariants: v } = FINAL_BATTLE;
    let variant = v.survived;
    if (this._correctCount >= v.perfect.min)     variant = v.perfect;
    else if (this._correctCount >= v.great.min)  variant = v.great;

    // ステート更新
    GameStore.setState('app.finalBattleCleared', true);
    GameStore.addMaterial('magic_orb', Math.floor(this._correctCount / 5));
    SaveManager.save().catch(err => Logger.warn('[FinalBattleScreen] Save error:', err));

    SoundManager.playSFX(SoundType.WORLD_CLEAR);
    HapticFeedback.medium();

    this._showVictoryCutin(0, variant);
  }

  /**
   * 勝利カットインをステップ順に表示する
   * @param {number} stepIdx
   * @param {Object} variant
   */
  _showVictoryCutin(stepIdx, variant) {
    const steps = FINAL_BATTLE.victoryCutin;
    if (stepIdx >= steps.length) {
      // すべて終了 → グランドフィナーレ
      this.destroy();
      if (typeof this._onComplete === 'function') {
        this._onComplete(this._correctCount);
      }
      return;
    }

    const step = steps[stepIdx];
    this._el.innerHTML = '';
    this._el.className = 'final-battle-screen final-battle-victory';

    const slide = document.createElement('div');
    slide.className = 'fb-victory-slide';
    slide.style.background = step.bgFallback;

    // ボス画像（敗北状態）
    if (step.bossImage) {
      const bossImg = document.createElement('img');
      bossImg.src       = step.bossImage;
      bossImg.className = 'fb-victory-boss-img';
      bossImg.alt       = 'やみのまじん（封印）';
      bossImg.addEventListener('error', () => bossImg.style.display = 'none');
      slide.appendChild(bossImg);
    }

    // キャラ
    if (step.characterEmotion) {
      const charWrap = document.createElement('div');
      charWrap.className = 'fb-victory-char-wrap';
      const avatar = new CharacterAvatar('xl', step.characterEmotion);
      charWrap.appendChild(avatar.render());
      slide.appendChild(charWrap);
    }

    // 勝利バリアントラベル（初回ステップのみ）
    if (stepIdx === 0) {
      const badge = document.createElement('div');
      badge.className = 'fb-victory-badge';
      badge.innerHTML = `
        <div class="fb-victory-emoji">${variant.emoji}</div>
        <div class="fb-victory-label">${variant.label}</div>
        <div class="fb-victory-score">${this._correctCount}もん せいかい！</div>
      `;
      slide.appendChild(badge);
    }

    // テキスト
    if (step.text) {
      const textEl = document.createElement('div');
      textEl.className = 'fb-victory-text';
      textEl.innerHTML = step.text.replace(/\n/g, '<br>');
      slide.appendChild(textEl);
    }
    if (step.subText) {
      const subEl = document.createElement('div');
      subEl.className = 'fb-victory-subtext';
      subEl.innerHTML = step.subText.replace(/\n/g, '<br>');
      slide.appendChild(subEl);
    }

    // タップで次へ
    slide.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._showVictoryCutin(stepIdx + 1, variant);
    });

    const tapHint = document.createElement('div');
    tapHint.className = 'fbc-tap-hint';
    tapHint.textContent = 'タップして つぎへ →';
    slide.appendChild(tapHint);

    this._el.appendChild(slide);
    requestAnimationFrame(() => slide.classList.add('fbc-slide-in'));
  }

  // ─────────────────────────────────────────
  // プライベート: ユーティリティ
  // ─────────────────────────────────────────

  /**
   * ボス画像フォールバック要素を生成する
   * @returns {HTMLElement}
   */
  _makeBossFallback() {
    const div = document.createElement('div');
    div.className = 'fb-boss-fallback';
    div.innerHTML = '<span class="fb-boss-emoji">👾</span>';
    return div;
  }
}

export default FinalBattleScreen;
