/**
 * ParentDashboardScreen.js - Grimoire Guardians
 * 保護者ダッシュボード（PIN保護付き学習記録表示）
 *
 * - PINは localStorage に直接保存（GameStore リセットの影響を受けない）
 * - 4桁カスタムキーパッド（prompt() 不使用）
 * - Show/Hide パターン
 *
 * @version 1.0
 * @date 2026-03-25
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import WORLDS from '../data/worlds.js';

const PIN_STORAGE_KEY = 'grimoire_parent_pin';
const PIN_LENGTH = 4;

export class ParentDashboardScreen {
  constructor() {
    /** @type {HTMLElement|null} */
    this._el = null;
    /** @type {HTMLElement|null} */
    this._container = null;
    /** @type {string} 入力中のPINバッファ */
    this._pinBuffer = '';
    /** @type {'check'|'setup'|'setup_confirm'|'dashboard'} */
    this._mode = 'check';
    /** @type {string} PIN設定時の仮PIN */
    this._pendingPin = '';
  }

  // ─────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────

  /**
   * 画面を表示する
   * @param {HTMLElement} container - 描画先
   */
  show(container) {
    Logger.info('[ParentDashboardScreen] show');
    this._container = container;

    if (!this._el) {
      this._el = document.createElement('div');
      this._el.className = 'parent-dashboard-screen';
    }

    this._pinBuffer = '';
    this._pendingPin = '';

    const storedPin = localStorage.getItem(PIN_STORAGE_KEY);
    this._mode = storedPin ? 'check' : 'setup';

    this._render();
    container.appendChild(this._el);
  }

  /**
   * 画面を非表示にする（DOM から除去）
   */
  hide() {
    Logger.info('[ParentDashboardScreen] hide');
    if (this._el && this._el.parentNode) {
      this._el.parentNode.removeChild(this._el);
    }
    this._pinBuffer = '';
    this._pendingPin = '';
  }

  // ─────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────

  /** @private */
  _render() {
    this._el.innerHTML = '';
    if (this._mode === 'dashboard') {
      this._renderDashboard();
    } else {
      this._renderPinScreen();
    }
  }

  /**
   * PIN入力/設定画面を描画する
   * @private
   */
  _renderPinScreen() {
    const wrap = document.createElement('div');
    wrap.className = 'pin-screen-wrap';

    // タイトル
    const title = document.createElement('h2');
    title.className = 'pin-screen-title';
    if (this._mode === 'setup') {
      title.textContent = '🔐 PINを設定してください';
    } else if (this._mode === 'setup_confirm') {
      title.textContent = '🔐 もう一度入力してください';
    } else {
      title.textContent = '🔐 保護者ダッシュボード';
    }

    const subtitle = document.createElement('p');
    subtitle.className = 'pin-screen-subtitle';
    if (this._mode === 'check') {
      subtitle.textContent = '4ケタのPINを入力してください';
    } else if (this._mode === 'setup') {
      subtitle.textContent = '4ケタの数字でPINを設定します';
    } else {
      subtitle.textContent = 'もう一度同じPINを入力してください';
    }

    // ドット表示
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'pin-dots';
    for (let i = 0; i < PIN_LENGTH; i++) {
      const dot = document.createElement('div');
      dot.className = 'pin-dot' + (i < this._pinBuffer.length ? ' pin-dot--filled' : '');
      dotsWrap.appendChild(dot);
    }

    // エラーメッセージ
    const errorMsg = document.createElement('p');
    errorMsg.className = 'pin-error-msg';
    errorMsg.id = 'pin-error-msg';

    // キーパッド（3列グリッド: 1-9, ブランク, 0, ⌫）
    const keypad = document.createElement('div');
    keypad.className = 'pin-keypad';

    const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];
    keys.forEach(k => {
      const btn = document.createElement('button');
      btn.type = 'button';
      if (k === '') {
        btn.className = 'pin-key pin-key--empty';
        btn.disabled = true;
        btn.setAttribute('aria-hidden', 'true');
      } else if (k === '⌫') {
        btn.className = 'pin-key pin-key--back';
        btn.textContent = k;
        btn.setAttribute('aria-label', '削除');
        btn.addEventListener('click', () => this._onKeyPress('⌫'));
      } else {
        btn.className = 'pin-key';
        btn.textContent = k;
        btn.addEventListener('click', () => this._onKeyPress(k));
      }
      keypad.appendChild(btn);
    });

    // 戻るボタン
    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'button button-secondary pin-back-btn';
    backBtn.textContent = '← もどる';
    backBtn.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'bookshelf');
    });

    wrap.appendChild(title);
    wrap.appendChild(subtitle);
    wrap.appendChild(dotsWrap);
    wrap.appendChild(errorMsg);
    wrap.appendChild(keypad);
    wrap.appendChild(backBtn);
    this._el.appendChild(wrap);
  }

  // ─────────────────────────────────────────
  // PIN 操作
  // ─────────────────────────────────────────

  /**
   * キー入力を処理する
   * @param {string} key - '0'-'9' または '⌫'
   * @private
   */
  _onKeyPress(key) {
    if (key === '⌫') {
      this._pinBuffer = this._pinBuffer.slice(0, -1);
      this._updateDots();
    } else if (this._pinBuffer.length < PIN_LENGTH) {
      this._pinBuffer += key;
      this._updateDots();

      if (this._pinBuffer.length === PIN_LENGTH) {
        // 入力完了を視覚的に伝えてから判定
        setTimeout(() => this._submitPin(), 150);
      }
    }
  }

  /**
   * ドット表示をバッファに合わせて更新する（再描画なし）
   * @private
   */
  _updateDots() {
    const dots = this._el.querySelectorAll('.pin-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('pin-dot--filled', i < this._pinBuffer.length);
    });
  }

  /**
   * PIN確定処理
   * @private
   */
  _submitPin() {
    const entered = this._pinBuffer;
    this._pinBuffer = '';

    if (this._mode === 'setup') {
      // 1回目入力 → 確認入力へ
      this._pendingPin = entered;
      this._mode = 'setup_confirm';
      this._render();

    } else if (this._mode === 'setup_confirm') {
      // 2回目入力 → 一致確認
      if (entered === this._pendingPin) {
        localStorage.setItem(PIN_STORAGE_KEY, entered);
        Logger.info('[ParentDashboard] PIN set successfully');
        this._mode = 'dashboard';
        this._render();
      } else {
        // 不一致 → 最初から
        this._pendingPin = '';
        this._mode = 'setup';
        this._render();
        const errEl = this._el.querySelector('#pin-error-msg');
        if (errEl) errEl.textContent = 'PINが一致しませんでした。もう一度設定してください。';
      }

    } else {
      // check モード → PIN照合
      const stored = localStorage.getItem(PIN_STORAGE_KEY);
      if (entered === stored) {
        Logger.info('[ParentDashboard] PIN authenticated');
        this._mode = 'dashboard';
        this._render();
      } else {
        Logger.warn('[ParentDashboard] Wrong PIN entered');
        // ドットをリセット、エラー表示
        this._updateDots();
        const errEl = this._el.querySelector('#pin-error-msg');
        if (errEl) {
          errEl.textContent = 'PINが正しくありません';
          setTimeout(() => {
            if (errEl) errEl.textContent = '';
          }, 1400);
        }
      }
    }
  }

  // ─────────────────────────────────────────
  // ダッシュボード描画
  // ─────────────────────────────────────────

  /**
   * ダッシュボード本体を描画する
   * @private
   */
  _renderDashboard() {
    const wrap = document.createElement('div');
    wrap.className = 'parent-dashboard-wrap';

    // ── ヘッダー ──
    const header = document.createElement('div');
    header.className = 'parent-dashboard-header';

    const titleEl = document.createElement('h2');
    titleEl.className = 'parent-dashboard-title';
    titleEl.textContent = '📊 保護者ダッシュボード';

    const resetPinBtn = document.createElement('button');
    resetPinBtn.type = 'button';
    resetPinBtn.className = 'button button-small parent-dash-pin-btn';
    resetPinBtn.textContent = '🔑 PIN変更';
    resetPinBtn.addEventListener('click', () => {
      localStorage.removeItem(PIN_STORAGE_KEY);
      this._mode = 'setup';
      this._pendingPin = '';
      this._pinBuffer = '';
      this._render();
    });

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'button button-secondary parent-dash-back-btn';
    backBtn.textContent = '← とじる';
    backBtn.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'bookshelf');
    });

    header.appendChild(titleEl);
    header.appendChild(resetPinBtn);
    header.appendChild(backBtn);

    // ── ステータスデータ収集 ──
    const rawName      = GameStore.getState('player.name');
    const playerName   = rawName && rawName.trim() ? rawName.trim() : 'プレイヤー';
    const streak       = GameStore.getState('player.streak') || 0;
    const lastPlayedAt = GameStore.getState('player.lastPlayedAt');
    const stats        = GameStore.getState('progress.stats') || {};
    const worldsState  = GameStore.getState('progress.worlds') || {};

    const totalQ   = stats.totalQuestions   || 0;
    const correctA = stats.correctAnswers   || 0;
    const accuracy = totalQ > 0 ? Math.round((correctA / totalQ) * 100) : 0;

    const clearedWorlds = WORLDS.filter(w => worldsState[w.id]?.cleared);
    const totalWorlds   = WORLDS.length;

    const lastPlayStr = lastPlayedAt
      ? new Date(lastPlayedAt).toLocaleDateString('ja-JP', {
          month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        })
      : '記録なし';

    // ── サマリーカード ──
    const statsSection = document.createElement('div');
    statsSection.className = 'parent-dash-stats';

    const statItems = [
      { label: 'なまえ',         value: `${playerName} さん`, icon: '👤' },
      { label: 'れんぞく学習',    value: `${streak} 日`,       icon: '🔥' },
      { label: 'クリアしたワールド', value: `${clearedWorlds.length} / ${totalWorlds}`, icon: '⭐' },
      { label: 'せいかいりつ',    value: `${accuracy}%`,       icon: '🎯' },
      { label: 'こたえた問題数',   value: `${totalQ} 問`,       icon: '📝' },
      { label: 'さいごに学習した日', value: lastPlayStr,         icon: '📅' },
    ];

    statItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'parent-stat-card';

      const iconEl = document.createElement('div');
      iconEl.className = 'parent-stat-icon';
      iconEl.textContent = item.icon;

      const valueEl = document.createElement('div');
      valueEl.className = 'parent-stat-value';
      valueEl.textContent = item.value;

      const labelEl = document.createElement('div');
      labelEl.className = 'parent-stat-label';
      labelEl.textContent = item.label;

      card.appendChild(iconEl);
      card.appendChild(valueEl);
      card.appendChild(labelEl);
      statsSection.appendChild(card);
    });

    // ── クリア済みワールド一覧 ──
    const worldsSection = document.createElement('div');
    worldsSection.className = 'parent-dash-worlds';

    const worldsTitle = document.createElement('h3');
    worldsTitle.className = 'parent-dash-section-title';
    worldsTitle.textContent = '📚 クリアしたワールド';

    const worldsList = document.createElement('div');
    worldsList.className = 'parent-worlds-list';

    if (clearedWorlds.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'parent-worlds-empty';
      empty.textContent = 'まだクリアしたワールドはありません';
      worldsList.appendChild(empty);
    } else {
      clearedWorlds.forEach(w => {
        const item = document.createElement('div');
        item.className = 'parent-world-item';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'parent-world-title';
        titleSpan.textContent = w.title || w.id;

        const pct   = worldsState[w.id]?.percentage || 0;
        const stars = pct >= 100 ? 3 : pct >= 80 ? 2 : 1;
        const starsSpan = document.createElement('span');
        starsSpan.className = 'parent-world-stars';
        starsSpan.textContent = '⭐'.repeat(stars);

        item.appendChild(titleSpan);
        item.appendChild(starsSpan);
        worldsList.appendChild(item);
      });
    }

    worldsSection.appendChild(worldsTitle);
    worldsSection.appendChild(worldsList);

    wrap.appendChild(header);
    wrap.appendChild(statsSection);
    wrap.appendChild(worldsSection);
    this._el.appendChild(wrap);
  }
}
