/**
 * WelcomeScreen.js - Grimoire Guardians
 * ようこそ画面（初回起動時のみ表示）
 *
 * 表示条件: player.createdAt === null（セーブデータがない新規プレイヤー）
 * 役割:
 *   - プレイヤー名の入力（最大8文字）
 *   - 名前を GameStore に保存して BookshelfScreen へ遷移
 *
 * @version 1.0
 * @date 2026-02-23
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { SaveManager } from '../core/SaveManager.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';

class WelcomeScreen {
  /**
   * @param {HTMLElement} container   - 描画先の親要素
   * @param {Function}    onComplete  - 名前入力完了時のコールバック () => void
   */
  constructor(container, onComplete) {
    this._container  = container;
    this._onComplete = onComplete;
    this._el         = null;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を生成して container に描画する
   * @returns {WelcomeScreen}
   */
  render() {
    Logger.info('[WelcomeScreen] Rendering...');

    const el = document.createElement('div');
    el.className = 'welcome-screen';

    el.innerHTML = `
      <div class="welcome-content">
        <!-- ロゴ -->
        <div class="welcome-logo" aria-hidden="true">📘✨</div>
        <h1 class="welcome-title">Grimoire<br>Guardians</h1>
        <p class="welcome-subtitle">グリモア・ガーディアンズ</p>

        <!-- 名前入力フォーム -->
        <div class="welcome-form">
          <p class="welcome-prompt">なまえを おしえてね！</p>
          <input
            id="player-name-input"
            class="welcome-name-input"
            type="text"
            placeholder="ひらがな・かんじで 8もじまで"
            maxlength="8"
            inputmode="text"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
          />
          <button
            class="button button-large welcome-start-btn"
            type="button"
          >
            はじめる！ 🚀
          </button>
        </div>
      </div>
    `;

    this._el = el;
    this._container.appendChild(el);
    this._setupEvents();

    // タイトル BGM 再生
    SoundManager.playBGM(SoundType.BGM_TITLE);

    // 少し待ってからフォーカス（アニメーション中は避ける）
    setTimeout(() => {
      const input = this._el?.querySelector('#player-name-input');
      if (input) input.focus();
    }, 500);

    Logger.info('[WelcomeScreen] Rendered');
    return this;
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[WelcomeScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベートメソッド
  // ─────────────────────────────────────────

  /**
   * フォーム操作のイベントを設定する
   * @private
   */
  _setupEvents() {
    const btn   = this._el.querySelector('.welcome-start-btn');
    const input = this._el.querySelector('#player-name-input');

    /** 名前確定 → GameStore 保存 → コールバック */
    const start = () => {
      const name = input.value.trim() || 'プレイヤー';

      SoundManager.playSFX(SoundType.BUTTON_CLICK);

      // プレイヤー情報を確定
      GameStore.setState('player.name',         name);
      GameStore.setState('player.createdAt',    new Date().toISOString());
      GameStore.setState('player.lastPlayedAt', new Date().toISOString());
      GameStore.setState('player.streak',       1);

      // 即座に保存
      SaveManager.save().catch(err =>
        Logger.warn('[WelcomeScreen] Save failed:', err)
      );

      Logger.info(`[WelcomeScreen] Player name set: "${name}"`);

      if (typeof this._onComplete === 'function') {
        this._onComplete();
      }
    };

    btn.addEventListener('click', start);

    // Enter キーでも開始できる
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        start();
      }
    });
  }
}

export default WelcomeScreen;
