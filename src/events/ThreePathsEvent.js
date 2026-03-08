/**
 * ThreePathsEvent.js - Grimoire Guardians
 * 3つの道イベント（+ 5%でレアな道）
 *
 * 仕様（ロードマップ v1.4 / 統合仕様書 v1.3 準拠）:
 *   - 通常（95%）: もり・やま・うみ から1つ選択
 *   - レアな道（5%）: にじ・おかし・ほしぞら・まほう のいずれかが混在
 *   - 選択後の問題は 1問（GameStore の currentSession.questions からランダム）
 *   - 正解時: ドロップ付き（レアな道は gem/star_fragment 確定）
 *   - 不正解時: ドロップなし
 *
 * @version 1.0
 * @date 2026-02-22
 */

import { GameStore } from '../core/GameStore.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import Logger from '../core/Logger.js';

// ─────────────────────────────────────────
// 通常の道定義
// ─────────────────────────────────────────
const NORMAL_PATHS = [
  { id: 'forest',   icon: '🌲', name: 'もりの みち',   hint: 'まるたが でそう',        drop: { type: 'basic' } },
  { id: 'mountain', icon: '🏔️', name: 'やまの みち',   hint: 'いしが でそう',           drop: { type: 'stone' } },
  { id: 'sea',      icon: '🌊', name: 'うみの みち',   hint: 'なにが でるか わからない', drop: { type: 'random' } }
];

// ─────────────────────────────────────────
// レアな道定義
// ─────────────────────────────────────────
const RARE_PATHS = [
  { id: 'rainbow', icon: '🌈', name: 'にじの みち',     hint: 'きれいな いろが みえる...！',     message: 'にじの みちの おくりもの！',     bgColor: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #ffecd2)' },
  { id: 'candy',   icon: '🍭', name: 'おかしの みち',   hint: 'あまい においが する...！',         message: 'おかしの みちの おくりもの！',   bgColor: 'linear-gradient(135deg, #FFB6C1, #FF69B4, #FFD700)' },
  { id: 'starry',  icon: '🌟', name: 'ほしぞらの みち', hint: 'ほしが きらきら してる...！',       message: 'ほしが みちびいてくれた！',       bgColor: 'linear-gradient(135deg, #000046, #1CB5E0)' },
  { id: 'magic',   icon: '🔮', name: 'まほうの みち',   hint: 'ふしぎな ちからを かんじる...！',   message: 'まほうの ちからだ！',             bgColor: 'linear-gradient(135deg, #4158D0, #C850C0)' }
];

// ─────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────

/** Fisher-Yates シャッフル（非破壊） */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * GameStore からランダムな問題を1問取得
 * - type:'clock' は時計SVGを表示できないためスキップ
 * - distractorPool 形式も choices に変換して返す
 */
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

/**
 * ドロップ素材IDを決定する
 * @param {'basic'|'stone'|'random'|'rare'} type
 */
function resolveDrop(type) {
  const BASIC  = ['wood', 'brick', 'cloth'];
  const STONES = ['stone'];
  const RARE   = ['gem', 'star_fragment', 'magic_orb'];
  switch (type) {
    case 'stone':  return STONES[0];
    case 'rare':   return RARE[Math.floor(Math.random() * RARE.length)];
    case 'random': return Math.random() < 0.5
      ? BASIC[Math.floor(Math.random() * BASIC.length)]
      : RARE[Math.floor(Math.random() * RARE.length)];
    default:       return BASIC[Math.floor(Math.random() * BASIC.length)];
  }
}

// ─────────────────────────────────────────
// ThreePathsEvent クラス
// ─────────────────────────────────────────

class ThreePathsEvent {
  /**
   * 3つの道イベントを実行する
   * @param {HTMLElement} layer - #event-layer
   * @returns {Promise<void>}
   */
  static play(layer) {
    return new Promise((resolve) => {
      if (!layer) { resolve(); return; }

      const hasRare = Math.random() < 0.05;   // 5% でレアな道
      const rarePath = hasRare
        ? RARE_PATHS[Math.floor(Math.random() * RARE_PATHS.length)]
        : null;

      // 表示する3択を組み立て
      const paths = this._buildPathChoices(rarePath);

      // フェーズ1: 道を表示
      layer.innerHTML = this._buildPhase1HTML(paths, hasRare);
      layer.classList.add('event-layer-active');

      // 選択イベント
      layer.querySelectorAll('.path-choice-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const pathId     = btn.dataset.pathId;
          const selectedPath = paths.find(p => p.id === pathId);
          const isRareChoice = rarePath && selectedPath?.id === rarePath.id;

          layer.querySelectorAll('.path-choice-btn').forEach(b => { b.disabled = true; });
          HapticFeedback.medium();
          btn.classList.add('path-selected');

          // 300ms 後にフェーズ2（問題）へ
          setTimeout(() => {
            this._showQuestion(layer, selectedPath, isRareChoice, resolve);
          }, 300);
        }, { once: true });
      });

      Logger.info(`[ThreePathsEvent] 開始 (hasRare=${hasRare})`);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: 道の組み立て
  // ─────────────────────────────────────────

  static _buildPathChoices(rarePath) {
    if (!rarePath) return shuffle(NORMAL_PATHS).slice(0, 3);

    // レアな道を1つランダムな通常の道と置き換え
    const normals = shuffle(NORMAL_PATHS).slice(0, 2);
    return shuffle([rarePath, ...normals]);
  }

  // ─────────────────────────────────────────
  // プライベート: HTML 構築
  // ─────────────────────────────────────────

  static _buildPhase1HTML(paths, hasRare) {
    const announcement = hasRare
      ? `<p class="paths-rare-announce">✨ ふしぎな みちが あらわれた！</p>`
      : '';

    const pathsHTML = paths.map(p => {
      const isRare = RARE_PATHS.some(r => r.id === p.id);
      return `
        <button class="path-choice-btn ${isRare ? 'path-rare' : ''}"
                type="button" data-path-id="${p.id}">
          <span class="path-icon">${p.icon}</span>
          <span class="path-name">${p.name}</span>
          <span class="path-hint">${p.hint}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="paths-modal">
        <div class="paths-title">🛤️ みちが 3つに わかれてる！</div>
        ${announcement}
        <p class="paths-subtitle">すきな みちを えらんでね！</p>
        <div class="paths-choices">${pathsHTML}</div>
      </div>
    `;
  }

  static _buildQuestionHTML(path, question) {
    const isRare = RARE_PATHS.some(r => r.id === path.id);
    const bgStyle = isRare && path.bgColor
      ? `style="background: ${path.bgColor};"`
      : '';

    // 選択肢をシャッフル（choices が未定義の場合は空配列でフォールバック）
    const shuffled = shuffle(question.choices ?? []);

    return `
      <div class="paths-modal paths-question-phase" ${bgStyle}>
        <div class="paths-question-header">
          <span class="paths-path-icon">${path.icon}</span>
          <span class="paths-path-name">${path.name}</span>
        </div>
        <div class="paths-question-text">${question.question}</div>
        <div class="paths-question-choices">
          ${shuffled.map(c => `
            <button class="path-answer-btn" type="button" data-answer="${c}">${c}</button>
          `).join('')}
        </div>
        <div class="paths-feedback hidden"></div>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // プライベート: 問題フェーズ
  // ─────────────────────────────────────────

  static _showQuestion(layer, selectedPath, isRareChoice, resolve) {
    const question = pickQuestion();
    if (!question) {
      // 問題が取得できない場合はスキップ
      this._showResult(layer, selectedPath, isRareChoice, false, null, resolve);
      return;
    }

    layer.innerHTML = this._buildQuestionHTML(selectedPath, question);

    const answerBtns = layer.querySelectorAll('.path-answer-btn');
    answerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        answerBtns.forEach(b => { b.disabled = true; });
        const isCorrect = btn.dataset.answer === String(question.correctAnswer);
        HapticFeedback[isCorrect ? 'success' : 'error']();

        btn.classList.add(isCorrect ? 'path-answer-correct' : 'path-answer-wrong');
        // 正解ハイライト（不正解時）
        if (!isCorrect) {
          answerBtns.forEach(b => {
            if (b.dataset.answer === String(question.correctAnswer)) b.classList.add('path-answer-correct');
          });
        }

        const feedbackEl = layer.querySelector('.paths-feedback');
        if (feedbackEl) {
          feedbackEl.textContent = isCorrect ? '⭕ せいかい！' : '❌ ざんねん...';
          feedbackEl.classList.remove('hidden');
          feedbackEl.classList.add(isCorrect ? 'paths-feedback-correct' : 'paths-feedback-wrong');
        }

        const delay = isCorrect ? 900 : 1500;
        setTimeout(() => {
          this._showResult(layer, selectedPath, isRareChoice, isCorrect, question, resolve);
        }, delay);
      }, { once: true });
    });
  }

  // ─────────────────────────────────────────
  // プライベート: 結果フェーズ
  // ─────────────────────────────────────────

  static _showResult(layer, path, isRareChoice, isCorrect, _question, resolve) {
    let dropId   = null;
    let dropName = null;
    let dropEmoji = null;

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

    if (isCorrect) {
      const dropType = isRareChoice ? 'rare' : (path.drop?.type ?? 'basic');
      dropId    = resolveDrop(dropType);
      dropName  = NAME_MAP[dropId] || dropId;
      dropEmoji = EMOJI_MAP[dropId] || '📦';
      GameStore.addMaterial(dropId, 1);
    }

    const resultMsg = isRareChoice && isCorrect && path.message
      ? path.message
      : isCorrect ? `${path.icon} ざいりょうを てにいれた！` : 'つぎは がんばろう！';

    layer.innerHTML = `
      <div class="paths-modal paths-result-phase">
        <div class="paths-result-icon">${isCorrect ? '🎉' : '😢'}</div>
        <div class="paths-result-message">${resultMsg}</div>
        ${isCorrect && dropId ? `
          <div class="paths-drop-item">
            <span>${dropEmoji}</span>
            <span>${dropName} ×1</span>
          </div>
        ` : ''}
        <button class="button button-success paths-continue-btn" type="button">
          つづける
        </button>
      </div>
    `;

    layer.querySelector('.paths-continue-btn').addEventListener('click', () => {
      HapticFeedback.light();
      layer.classList.remove('event-layer-active');
      setTimeout(() => { layer.innerHTML = ''; }, 300);
      resolve();
    }, { once: true });

    Logger.info(`[ThreePathsEvent] 結果: ${path.name} / isCorrect=${isCorrect} / drop=${dropId}`);
  }
}

export default ThreePathsEvent;
