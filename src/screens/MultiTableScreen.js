/**
 * MultiTableScreen.js - Grimoire Guardians
 * 九九全体表画面（UnitIntro → MemorizeScreen の間に挿入）
 *
 * 機能:
 *   - 九九ワールド（m2_10a〜m2_10i）専用
 *   - 画面全体にそのだんの九九表を大きく表示
 *   - NPCフクロウ先生が「まずよく見てみよう！」と声かけ
 *   - 各行がフェードインで順番に登場
 *   - 「つぎへ →」でMemorizeScreenへ、「スキップ」でQuizへ直行
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.0
 * @date 2026-03-23
 */

import Logger from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';

/**
 * ワールドID → だん情報マッピング
 * special:true のワールドは複数グループを持つ
 */
const DAN_INFO = {
  m2_10a: { label: '2のだん', groups: [{ dan: 2, count: 9 }] },
  m2_10b: { label: '3のだん', groups: [{ dan: 3, count: 9 }] },
  m2_10c: { label: '4のだん', groups: [{ dan: 4, count: 9 }] },
  m2_10d: { label: '5のだん', groups: [{ dan: 5, count: 9 }] },
  m2_10e: { label: '6のだん', groups: [{ dan: 6, count: 9 }] },
  m2_10f: { label: '7のだん', groups: [{ dan: 7, count: 9 }] },
  m2_10g: { label: '8のだん', groups: [{ dan: 8, count: 9 }] },
  m2_10h: { label: '9のだん', groups: [{ dan: 9, count: 9 }] },
  // 1のだん（1×1〜1×9）と 0のかけざん（0×1〜0×9）
  m2_10i: {
    label: '1のだん・0のかけざん',
    groups: [{ dan: 1, count: 9 }, { dan: 0, count: 9 }],
  },
};

/** NPCのひとこと（だんごとに少し変える） */
const NPC_MESSAGES = {
  m2_10a: 'まずは 2のだん を ぜんぶ みてみよう！\nよんでから すすもう 🦉',
  m2_10b: '3のだん は すこし むずかしいかも。\nじっくり みてね 🦉',
  m2_10c: '4のだん も がんばれ！\nじっくり よんでみよう 🦉',
  m2_10d: '5のだん は きれいな かずが ならぶよ！\nみつけてみてね 🦉',
  m2_10e: '6のだん から レベルアップ！\nよく みてから すすもう 🦉',
  m2_10f: '7のだん は チャレンジャー！\nあわてず よんでね 🦉',
  m2_10g: '8のだん は マスターへの みち。\nしっかり みてね 🦉',
  m2_10h: '9のだん まで きたね！ すごい！\nラストスパート！ 🦉',
  m2_10i: '1のだん と 0のかけざん を みてみよう！\nかんたんだけど たいせつだよ 🦉',
};

class MultiTableScreen {
  /**
   * @param {HTMLElement} container  - 描画先の親要素
   * @param {Object}      worldData  - 選択されたワールドデータ
   * @param {Function}    onNext     - 「つぎへ」コールバック（→ MemorizeScreen）
   * @param {Function}    onSkip     - 「スキップ」コールバック（→ QuizScreen）
   */
  constructor(container, worldData, onNext, onSkip) {
    this._container = container;
    this._worldData  = worldData;
    this._onNext     = onNext;
    this._onSkip     = onSkip;
    this._el         = null;
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
      // 九九以外のワールドは何もせずスキップへ
      Logger.warn('[MultiTableScreen] Unknown worldId:', this._worldData.id);
      if (typeof this._onSkip === 'function') this._onSkip();
      return;
    }

    this._buildShell(info);
    // 少し遅らせてから各行をアニメーション表示
    setTimeout(() => this._animateRows(), 200);
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[MultiTableScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: シェル構築
  // ─────────────────────────────────────────

  /**
   * @param {{ label:string, groups:Array }} info
   */
  _buildShell(info) {
    const worldId   = this._worldData.id;
    const npcMsg    = NPC_MESSAGES[worldId] || `${info.label} を じっくり みてみよう！ 🦉`;

    const el = document.createElement('div');
    el.className = 'multitable-screen';
    el.innerHTML = `
      <div class="multitable-npc-bubble">
        <span class="multitable-npc-icon">🦉</span>
        <p class="multitable-npc-text">${npcMsg.replace(/\n/g, '<br>')}</p>
      </div>

      <div class="multitable-body">
        ${this._buildTableHTML(info)}
      </div>

      <div class="multitable-footer">
        <button class="button button-secondary multitable-btn-skip" type="button">
          スキップ → クイズへ
        </button>
        <button class="button button-large multitable-btn-next" type="button">
          つぎへ →
        </button>
      </div>
    `;

    this._el = el;
    this._container.appendChild(el);
    this._bindEvents();

    // フェードイン
    requestAnimationFrame(() => el.classList.add('multitable-visible'));
  }

  /**
   * グループ分の表HTMLを生成する
   * @param {{ label:string, groups:Array }} info
   * @returns {string}
   */
  _buildTableHTML(info) {
    return info.groups.map(({ dan, count }) => {
      const rows = Array.from({ length: count }, (_, i) => {
        const n      = i + 1;
        const answer = dan * n;
        return `
          <div class="multitable-row" data-row="${dan}-${n}">
            <span class="multitable-formula">
              <span class="mt-dan">${dan}</span>
              <span class="mt-op"> × </span>
              <span class="mt-n">${n}</span>
              <span class="mt-eq"> = </span>
              <span class="mt-ans">${answer}</span>
            </span>
          </div>`;
      });

      // 2列に分割（左:1〜5, 右:6〜9 / 0のだんは1〜9全部）
      const half    = Math.ceil(count / 2);
      const leftRows  = rows.slice(0, half).join('');
      const rightRows = rows.slice(half).join('');

      const danLabel = dan === 0 ? '0のかけざん' : `${dan}のだん`;
      return `
        <div class="multitable-group">
          <div class="multitable-group-label">${danLabel}</div>
          <div class="multitable-cols">
            <div class="multitable-col">${leftRows}</div>
            <div class="multitable-col">${rightRows}</div>
          </div>
        </div>`;
    }).join('');
  }

  // ─────────────────────────────────────────
  // プライベート: 行アニメーション
  // ─────────────────────────────────────────

  /**
   * 各行を順番にフェードインさせる
   */
  _animateRows() {
    if (!this._el) return;
    const rows = this._el.querySelectorAll('.multitable-row');
    rows.forEach((row, i) => {
      setTimeout(() => {
        row.classList.add('multitable-row-visible');
      }, i * 80);
    });
  }

  // ─────────────────────────────────────────
  // プライベート: イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    this._el.querySelector('.multitable-btn-next').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      HapticFeedback.light();
      this.destroy();
      if (typeof this._onNext === 'function') this._onNext();
    });

    this._el.querySelector('.multitable-btn-skip').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      HapticFeedback.light();
      this.destroy();
      if (typeof this._onSkip === 'function') this._onSkip();
    });
  }
}

export default MultiTableScreen;
