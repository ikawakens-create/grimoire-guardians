/**
 * MonsterBattleEvent.js - Grimoire Guardians
 * モンスターバトルイベント（+ 5%でレアモンスター）
 *
 * 仕様（ロードマップ v1.4 準拠）:
 *   - 通常（95%）: 絵文字モンスター登場 → 問題1問 → 正解で撃破 & ドロップ
 *   - レアモンスター（5%）: 銀色光沢 → レア素材確定ドロップ
 *   - 不正解時: モンスター撃退できず → ドロップなし
 *   - GameStore の currentSession.questions から問題を1問ランダムに選択
 *
 * @version 1.0
 * @date 2026-02-22
 */

import { GameStore } from '../core/GameStore.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import Logger from '../core/Logger.js';

// ─────────────────────────────────────────
// 定数
// ─────────────────────────────────────────

const MONSTERS = ['👾', '🐉', '🦇', '👺', '🧟', '👻'];

const BASIC_DROPS  = ['wood', 'stone', 'brick', 'cloth'];
const RARE_DROPS   = ['gem', 'star_fragment', 'magic_orb'];

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
// MonsterBattleEvent クラス
// ─────────────────────────────────────────

class MonsterBattleEvent {
  /**
   * モンスターバトルイベントを実行する
   * @param {HTMLElement} layer - #event-layer
   * @returns {Promise<void>}
   */
  static play(layer) {
    return new Promise((resolve) => {
      if (!layer) { resolve(); return; }

      const isRare    = Math.random() < 0.05;
      const monsterEmoji = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];

      // フェーズ1: 登場演出
      layer.innerHTML = this._buildAppearanceHTML(monsterEmoji, isRare);
      layer.classList.add('event-layer-active');
      SoundManager.playSFX(SoundType.MONSTER_APPEAR);

      // 1.2秒後に「たたかう！」ボタンを有効化
      const fightBtn = layer.querySelector('.monster-fight-btn');
      setTimeout(() => {
        if (fightBtn) fightBtn.disabled = false;
      }, 1200);

      fightBtn?.addEventListener('click', () => {
        HapticFeedback.medium();
        this._showQuestion(layer, monsterEmoji, isRare, resolve);
      }, { once: true });

      Logger.info(`[MonsterBattleEvent] 登場 (isRare=${isRare})`);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: 登場 HTML
  // ─────────────────────────────────────────

  static _buildAppearanceHTML(monsterEmoji, isRare) {
    const titleText = isRare
      ? '⚡⚡⚡ レアモンスター あらわれた！！！'
      : '⚠️ つよい てきが あらわれた！';
    const monsterClass = isRare ? 'monster-icon monster-rare' : 'monster-icon';

    return `
      <div class="monster-modal">
        <div class="monster-title">${titleText}</div>
        <div class="${monsterClass}" aria-hidden="true">${monsterEmoji}</div>
        ${isRare ? '<div class="monster-rare-shine">✨ レアモンスター ✨</div>' : ''}
        <button class="button button-danger monster-fight-btn" type="button" disabled>
          ⚔️ たたかう！
        </button>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // プライベート: 問題フェーズ
  // ─────────────────────────────────────────

  static _showQuestion(layer, monsterEmoji, isRare, resolve) {
    const question = pickQuestion();
    if (!question) {
      this._showResult(layer, monsterEmoji, isRare, true, resolve);
      return;
    }

    const shuffled = shuffle(question.choices ?? []);

    layer.innerHTML = `
      <div class="monster-modal monster-battle-phase">
        <div class="monster-icon-small" aria-hidden="true">${monsterEmoji}</div>
        <div class="monster-question-text">${question.question}</div>
        <div class="monster-question-choices">
          ${shuffled.map(c => `
            <button class="monster-answer-btn" type="button" data-answer="${c}">${c}</button>
          `).join('')}
        </div>
        <div class="monster-feedback hidden"></div>
      </div>
    `;

    const answerBtns = layer.querySelectorAll('.monster-answer-btn');
    answerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        answerBtns.forEach(b => { b.disabled = true; });
        const isCorrect = btn.dataset.answer === String(question.correctAnswer);
        HapticFeedback[isCorrect ? 'success' : 'error']();

        btn.classList.add(isCorrect ? 'monster-answer-correct' : 'monster-answer-wrong');
        if (!isCorrect) {
          answerBtns.forEach(b => {
            if (b.dataset.answer === String(question.correctAnswer)) b.classList.add('monster-answer-correct');
          });
        }

        const feedbackEl = layer.querySelector('.monster-feedback');
        if (feedbackEl) {
          feedbackEl.textContent = isCorrect ? '⚔️ ヒット！' : '😖 はずれた...';
          feedbackEl.classList.remove('hidden');
          feedbackEl.classList.add(isCorrect ? 'monster-feedback-correct' : 'monster-feedback-wrong');
        }

        const delay = isCorrect ? 800 : 1500;
        setTimeout(() => {
          this._showResult(layer, monsterEmoji, isRare, isCorrect, resolve);
        }, delay);
      }, { once: true });
    });
  }

  // ─────────────────────────────────────────
  // プライベート: 結果フェーズ
  // ─────────────────────────────────────────

  static _showResult(layer, monsterEmoji, isRare, isCorrect, resolve) {
    let dropId = null;

    if (isCorrect) {
      SoundManager.playSFX(SoundType.MONSTER_DEFEAT);
      dropId = pickDrop(isRare);
      GameStore.addMaterial(dropId, isRare ? 2 : 1);
    }

    const titleText = isCorrect
      ? (isRare ? 'やったー！ レアモンスター たおした！！' : 'やった！ モンスターを たおした！')
      : 'モンスターに にげられた...';

    const dropHTML = isCorrect && dropId ? `
      <div class="monster-drop">
        <span>${EMOJI_MAP[dropId] || '📦'}</span>
        <span>${NAME_MAP[dropId] || dropId} ×${isRare ? 2 : 1}</span>
      </div>
    ` : '';

    layer.innerHTML = `
      <div class="monster-modal monster-result-phase">
        <div class="monster-result-title">${titleText}</div>
        <div class="monster-result-icon">${isCorrect ? (isRare ? '💥✨💥' : '💥') : '😢'}</div>
        ${dropHTML}
        <button class="button button-success monster-continue-btn" type="button">
          つづける
        </button>
      </div>
    `;

    layer.querySelector('.monster-continue-btn').addEventListener('click', () => {
      HapticFeedback.light();
      layer.classList.remove('event-layer-active');
      setTimeout(() => { layer.innerHTML = ''; }, 300);
      resolve();
    }, { once: true });

    Logger.info(`[MonsterBattleEvent] 結果: isCorrect=${isCorrect} / isRare=${isRare} / drop=${dropId}`);
  }
}

export default MonsterBattleEvent;
