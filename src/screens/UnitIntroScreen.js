/**
 * UnitIntroScreen.js - Grimoire Guardians
 * 単元イントロ画面（本棚 → クイズ の間に挿入）
 *
 * 機能:
 *   - フクロウ先生のストーリーコメント表示
 *   - 単元ヒント・例題イラスト（画像 or CSSプレースホルダー）
 *   - 自キャラアバター（happy）でモチベーション
 *   - 初回：フルスクリーン表示
 *   - 2回目以降：ミニバナーのみ（スキップ不要）
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.0
 * @date 2026-03-16
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import { UNIT_INTROS, STORY_IMAGES } from '../data/storyData.js';
import { getWorldById } from '../data/worlds.js';

class UnitIntroScreen {
  /**
   * @param {HTMLElement} container   - 描画先の親要素
   * @param {string}      worldId     - 選択されたワールドID
   * @param {Function}    onStart     - 「はじめる！」コールバック () => void
   * @param {Function}    onBack      - 「もどる」コールバック () => void
   * @param {Function}    [onFlash]   - 「フラッシュモード」コールバック () => void（省略可）
   */
  constructor(container, worldId, onStart, onBack, onFlash = null) {
    this._container = container;
    this._worldId   = worldId;
    this._onStart   = onStart;
    this._onBack    = onBack;
    this._onFlash   = onFlash;
    this._el        = null;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を描画する
   * 初回ならフルスクリーン、2回目以降はミニバナーを表示する
   */
  render() {
    const world   = getWorldById(this._worldId);
    const unitId  = world?.unitId;
    const intro   = UNIT_INTROS[unitId];

    // 初回判定（セッション内でこのユニットを初めて見るか）
    const seenKey    = `intro_seen_${unitId}`;
    const hasBeenSeen = !!sessionStorage.getItem(seenKey);

    if (hasBeenSeen) {
      this._renderMiniBanner(world, intro);
    } else {
      sessionStorage.setItem(seenKey, '1');
      this._renderFull(world, intro);
    }
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[UnitIntroScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: フルスクリーン表示（初回）
  // ─────────────────────────────────────────

  _renderFull(world, intro) {
    Logger.info('[UnitIntroScreen] Full render:', world?.id);
    SoundManager.playBGM(SoundType.BGM_BOOKSHELF);

    const storyDesc  = world?.storyDesc  || 'グリモアを とりもどせ！';
    const worldTitle = world?.title      || 'クイズ';
    const hint       = intro?.hint       || 'がんばって といてみよう！';
    const imgSrc     = intro?.image      || null;
    const ph         = intro?.imagePlaceholder || { bg: '#E8EAF6', emoji: '📘', label: worldTitle };
    const flashBtn   = this._isFlashUnlocked() ? `
          <button class="button button-warning unit-intro-btn-flash" type="button">
            ⚡ フラッシュモード
          </button>` : '';

    const el = document.createElement('div');
    el.className = 'unit-intro-screen';
    el.innerHTML = `
      <div class="unit-intro-content">

        <!-- ヘッダー：ワールド名 + ストーリー文脈 -->
        <div class="unit-intro-header">
          <div class="unit-intro-world-name">📘 ${worldTitle}</div>
          <div class="unit-intro-story-desc">${storyDesc.replace(/\n/g, '<br>')}</div>
        </div>

        <!-- イラスト -->
        <div class="unit-intro-illust-wrap" id="unit-intro-illust"></div>

        <!-- キャラアバター（右下） -->
        <div class="unit-intro-avatar-slot" id="unit-intro-avatar"></div>

        <!-- フクロウ先生のヒント吹き出し -->
        <div class="unit-intro-hint-bubble">
          <span class="unit-intro-fukurou-icon">🦉</span>
          <p class="unit-intro-hint-text">${hint.replace(/\n/g, '<br>')}</p>
        </div>

        <!-- ボタン -->
        <div class="unit-intro-buttons">
          <button class="button button-secondary unit-intro-btn-back" type="button">
            もどる
          </button>
          ${flashBtn}
          <button class="button button-large unit-intro-btn-start" type="button">
            はじめる！ 🚀
          </button>
        </div>

      </div>
    `;

    this._el = el;
    this._container.appendChild(el);

    // イラスト挿入
    this._insertIllust(el.querySelector('#unit-intro-illust'), imgSrc, ph);

    // キャラアバター挿入
    const avatarSlot = el.querySelector('#unit-intro-avatar');
    if (avatarSlot) {
      const avatar = new CharacterAvatar('md', 'happy');
      avatarSlot.appendChild(avatar.render());
    }

    this._bindEvents();

    // フェードイン
    requestAnimationFrame(() => el.classList.add('unit-intro-visible'));
  }

  // ─────────────────────────────────────────
  // プライベート: ミニバナー（2回目以降）
  // ─────────────────────────────────────────

  _renderMiniBanner(world, intro) {
    Logger.info('[UnitIntroScreen] Mini banner:', world?.id);
    const worldTitle = world?.title || 'クイズ';
    const storyDesc  = world?.storyDesc || '';
    const flashBtn   = this._isFlashUnlocked() ? `
        <button class="button button-warning unit-intro-mini-flash" type="button">
          ⚡ フラッシュ
        </button>` : '';

    const el = document.createElement('div');
    el.className = 'unit-intro-mini-banner';
    el.innerHTML = `
      <div class="unit-intro-mini-inner">
        <span class="unit-intro-mini-title">📘 ${worldTitle}</span>
        <span class="unit-intro-mini-desc">${storyDesc.split('\n')[0]}</span>
        ${flashBtn}
        <button class="button button-large unit-intro-mini-start" type="button">
          はじめる！
        </button>
      </div>
    `;

    this._el = el;
    this._container.appendChild(el);

    el.querySelector('.unit-intro-mini-start').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onStart === 'function') this._onStart();
    });

    el.querySelector('.unit-intro-mini-flash')?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onFlash === 'function') this._onFlash();
    });

    // 自動でフェードイン
    requestAnimationFrame(() => el.classList.add('unit-intro-mini-visible'));
  }

  // ─────────────────────────────────────────
  // プライベート: イラスト挿入
  // ─────────────────────────────────────────

  /**
   * 画像があればIMG、なければCSSプレースホルダーを挿入する
   * @param {HTMLElement} slot
   * @param {string|null} src
   * @param {{bg:string, emoji:string, label:string}} placeholder
   */
  _insertIllust(slot, src, placeholder) {
    if (!slot) return;

    if (src) {
      const img = document.createElement('img');
      img.src       = src;
      img.alt       = placeholder.label;
      img.className = 'unit-intro-illust-img';
      img.addEventListener('error', () => {
        img.replaceWith(this._makePlaceholder(placeholder));
      });
      slot.appendChild(img);
    } else {
      slot.appendChild(this._makePlaceholder(placeholder));
    }
  }

  /**
   * CSSプレースホルダーDOMを生成する
   * @param {{bg:string, emoji:string, label:string}} ph
   * @returns {HTMLElement}
   */
  _makePlaceholder(ph) {
    const div = document.createElement('div');
    div.className   = 'unit-intro-illust-placeholder';
    div.style.background = ph.bg;
    div.innerHTML = `
      <span class="unit-intro-ph-emoji">${ph.emoji}</span>
      <span class="unit-intro-ph-label">${ph.label}</span>
    `;
    return div;
  }

  // ─────────────────────────────────────────
  // プライベート: イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    const btnStart = this._el.querySelector('.unit-intro-btn-start');
    const btnBack  = this._el.querySelector('.unit-intro-btn-back');
    const btnFlash = this._el.querySelector('.unit-intro-btn-flash');

    btnStart?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onStart === 'function') this._onStart();
    });

    btnBack?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onBack === 'function') this._onBack();
    });

    btnFlash?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this.destroy();
      if (typeof this._onFlash === 'function') this._onFlash();
    });
  }

  /**
   * このワールドのフラッシュモードが解放済みかどうかを返す
   * @returns {boolean}
   */
  _isFlashUnlocked() {
    if (!Config.FEATURES.ENABLE_FLASH_MODE) return false;
    const flashIds = Config.GRADE2.FLASH_MODE.ENABLED_WORLD_IDS;
    if (!flashIds.includes(this._worldId)) return false;
    const unlocked = GameStore.getState('ship.flashUnlockedWorlds') ?? [];
    return unlocked.includes(this._worldId);
  }
}

export default UnitIntroScreen;
