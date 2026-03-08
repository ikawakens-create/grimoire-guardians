/**
 * TreasureEvent.js - Grimoire Guardians
 * 宝箱チャレンジイベント（+ 10%でミミック）
 *
 * 仕様（ロードマップ v1.4 / 統合仕様書 v1.3 準拠）:
 *   - 通常（90%）: 宝箱登場 → 問題1問 → 正解で確定ドロップ
 *   - ミミック（10%）: 宝箱が変身 → バトル（やや難しい）→ 撃破でレア確定ドロップ
 *   - 不正解時: 宝箱閉まる / ミミック逃げる → ドロップなし
 *
 * @version 1.0
 * @date 2026-02-22
 */

import { GameStore } from '../core/GameStore.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import Logger from '../core/Logger.js';
import { SkinManager } from '../core/SkinManager.js';

// ─────────────────────────────────────────
// 定数
// ─────────────────────────────────────────

const BASIC_DROPS = ['wood', 'stone', 'brick', 'cloth'];
const RARE_DROPS  = ['gem', 'star_fragment', 'magic_orb'];

const EMOJI_MAP = {
  wood: '🪵', stone: '🪨', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮'
};
const NAME_MAP = {
  wood: 'まるた', stone: 'いし', brick: 'れんが', gem: 'ほうせき',
  star_fragment: 'ほしのかけら', cloth: 'ぬの', paint: 'えのぐ',
  crown: 'おうかん', cape: 'マント', magic_orb: 'まほうだま'
};

// ─────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestion() {
  const questions = GameStore.getState('currentSession.questions') || [];
  // clock 問題は除外（モーダル内で時計SVGを表示できないため）
  const eligible = questions.filter(q => q.type !== 'clock');
  if (eligible.length === 0) return null;
  const q = eligible[Math.floor(Math.random() * eligible.length)];

  // distractorPool 形式 → choices 配列に変換（3択）
  if (q.distractorPool != null && !q.choices) {
    const pool = shuffle(q.distractorPool).slice(0, 3);
    return { ...q, choices: shuffle([String(q.correctAnswer), ...pool]) };
  }
  return q;
}

function pickDrop(isRare) {
  const pool = isRare ? RARE_DROPS : BASIC_DROPS;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─────────────────────────────────────────
// TreasureEvent クラス
// ─────────────────────────────────────────

class TreasureEvent {
  /**
   * 宝箱チャレンジイベントを実行する
   * @param {HTMLElement} layer - #event-layer
   * @returns {Promise<void>}
   */
  static play(layer) {
    return new Promise((resolve) => {
      if (!layer) { resolve(); return; }

      const isMimic = Math.random() < 0.1;

      // フェーズ1: 宝箱登場（通常でもミミックでも最初は同じ宝箱）
      layer.innerHTML = this._buildTreasureHTML();
      layer.classList.add('event-layer-active');
      SoundManager.playSFX(SoundType.EVENT_START);

      const openBtn = layer.querySelector('.treasure-open-btn');

      if (isMimic) {
        // ミミック: タップすると変身演出 → バトルへ
        openBtn?.addEventListener('click', () => {
          HapticFeedback.medium();
          SoundManager.playSFX(SoundType.TREASURE_OPEN);
          this._showMimicReveal(layer, resolve);
        }, { once: true });
      } else {
        // 通常宝箱: タップすると問題へ
        openBtn?.addEventListener('click', () => {
          HapticFeedback.medium();
          SoundManager.playSFX(SoundType.TREASURE_OPEN);
          this._showQuestion(layer, false, resolve);
        }, { once: true });
      }

      Logger.info(`[TreasureEvent] 登場 (isMimic=${isMimic})`);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: 宝箱 HTML
  // ─────────────────────────────────────────

  static _buildTreasureHTML() {
    return `
      <div class="treasure-modal">
        <div class="treasure-title">📦 たからばこを みつけた！</div>
        <div class="treasure-icon" aria-hidden="true">📦</div>
        <p class="treasure-subtitle">タップして あけてみよう！</p>
        <button class="button treasure-open-btn" type="button">
          🔑 あける！
        </button>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // プライベート: ミミック変身演出
  // ─────────────────────────────────────────

  static _showMimicReveal(layer, resolve) {
    const modal = layer.querySelector('.treasure-modal');
    if (modal) {
      modal.querySelector('.treasure-title').textContent = '📦 カギを あけよう...';
      const btn = modal.querySelector('.treasure-open-btn');
      if (btn) btn.style.display = 'none';
    }

    // 800ms: ガタガタ
    setTimeout(() => {
      const icon = layer.querySelector('.treasure-icon');
      if (icon) {
        icon.textContent = '📦💦';
        icon.classList.add('treasure-shake');
      }
      const title = layer.querySelector('.treasure-title');
      if (title) title.textContent = '📦 ガタガタガタ！';
    }, 800);

    // 1600ms: 変身完了
    setTimeout(() => {
      layer.innerHTML = `
        <div class="treasure-modal treasure-mimic-phase">
          <div class="treasure-title treasure-mimic-title">💀 ミミックだった！！</div>
          <div class="treasure-icon treasure-mimic-icon">👹</div>
          <p class="treasure-subtitle">たたかうしか ない！</p>
          <button class="button button-danger treasure-fight-btn" type="button">
            ⚔️ たたかう！
          </button>
        </div>
      `;
      HapticFeedback.error();
      layer.querySelector('.treasure-fight-btn')?.addEventListener('click', () => {
        HapticFeedback.medium();
        this._showQuestion(layer, true, resolve);
      }, { once: true });
    }, 1600);
  }

  // ─────────────────────────────────────────
  // プライベート: 問題フェーズ
  // ─────────────────────────────────────────

  static _showQuestion(layer, isMimic, resolve) {
    const question = pickQuestion();
    if (!question) {
      this._showResult(layer, isMimic, true, resolve);
      return;
    }

    const shuffled = shuffle(question.choices ?? []);
    const headerIcon = isMimic ? '👹' : '📦';
    const headerText = isMimic ? 'ミミックを たおせ！' : 'カギもんだい！';

    layer.innerHTML = `
      <div class="treasure-modal treasure-question-phase">
        <div class="treasure-question-header">
          <span>${headerIcon}</span>
          <span>${headerText}</span>
        </div>
        <div class="treasure-question-text">${question.question}</div>
        <div class="treasure-question-choices">
          ${shuffled.map(c => `
            <button class="treasure-answer-btn" type="button" data-answer="${c}">${c}</button>
          `).join('')}
        </div>
        <div class="treasure-feedback hidden"></div>
      </div>
    `;

    const answerBtns = layer.querySelectorAll('.treasure-answer-btn');
    answerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        answerBtns.forEach(b => { b.disabled = true; });
        const isCorrect = btn.dataset.answer === String(question.correctAnswer);
        HapticFeedback[isCorrect ? 'success' : 'error']();

        btn.classList.add(isCorrect ? 'treasure-answer-correct' : 'treasure-answer-wrong');
        if (!isCorrect) {
          answerBtns.forEach(b => {
            if (b.dataset.answer === String(question.correctAnswer)) b.classList.add('treasure-answer-correct');
          });
        }

        const feedbackEl = layer.querySelector('.treasure-feedback');
        if (feedbackEl) {
          feedbackEl.textContent = isCorrect ? '⭕ せいかい！' : '❌ ざんねん...';
          feedbackEl.classList.remove('hidden');
          feedbackEl.classList.add(isCorrect ? 'treasure-feedback-correct' : 'treasure-feedback-wrong');
        }

        const delay = isCorrect ? 900 : 1500;
        setTimeout(() => {
          this._showResult(layer, isMimic, isCorrect, resolve);
        }, delay);
      }, { once: true });
    });
  }

  // ─────────────────────────────────────────
  // プライベート: 結果フェーズ
  // ─────────────────────────────────────────

  static _showResult(layer, isMimic, isCorrect, resolve) {
    let dropId  = null;
    let dropCnt = 1;

    let fragmentResult = null;
    if (isCorrect) {
      dropId  = pickDrop(isMimic);  // ミミックはレア確定
      dropCnt = isMimic ? 2 : 1;
      GameStore.addMaterial(dropId, dropCnt);
      // スキンかけら抽選（15%）
      fragmentResult = SkinManager.rollForFragment();
    }

    const titleText = isMimic
      ? (isCorrect ? 'やった！ ミミックを たおした！' : 'ミミックに にげられた...')
      : (isCorrect ? 'ガチャン！ たからばこが あいた！' : 'たからばこが しまってしまった...');

    const subText = isMimic && isCorrect
      ? 'ミミックの ほうが いいもの もってた！'
      : '';

    const dropHTML = isCorrect && dropId ? `
      <div class="treasure-drop-item">
        <span>${EMOJI_MAP[dropId] || '📦'}</span>
        <span>${NAME_MAP[dropId] || dropId} ×${dropCnt}</span>
      </div>
      ${fragmentResult?.dropped ? `
        <div class="treasure-drop-item treasure-skin-frag">
          <span>💎</span>
          <span>スキンのかけら！ (${fragmentResult.combined ? '✨ 解放！' : `${SkinManager.getFragmentCount(fragmentResult.skinId)}/3`})</span>
        </div>` : ''}
    ` : '';

    layer.innerHTML = `
      <div class="treasure-modal treasure-result-phase">
        <div class="treasure-result-icon">${isCorrect ? '🎉' : '😢'}</div>
        <div class="treasure-result-title">${titleText}</div>
        ${subText ? `<p class="treasure-result-sub">${subText}</p>` : ''}
        ${dropHTML}
        <button class="button button-success treasure-continue-btn" type="button">
          つづける
        </button>
      </div>
    `;

    layer.querySelector('.treasure-continue-btn').addEventListener('click', () => {
      HapticFeedback.light();
      layer.classList.remove('event-layer-active');
      setTimeout(() => { layer.innerHTML = ''; }, 300);
      resolve();
    }, { once: true });

    Logger.info(`[TreasureEvent] 結果: isMimic=${isMimic} / isCorrect=${isCorrect} / drop=${dropId}`);
  }
}

export default TreasureEvent;
