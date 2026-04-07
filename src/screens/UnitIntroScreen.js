/**
 * UnitIntroScreen.js - Grimoire Guardians
 * 単元イントロ画面（本棚 → クイズ の間に挿入）
 *
 * 機能:
 *   - フクロウ先生のストーリーコメント表示
 *   - 単元ヒント・例題イラスト（画像 or CSSプレースホルダー）
 *   - 自キャラアバター（happy）でモチベーション
 *   - 初回（または90%未満クリア）：_renderFirst() → Ph3でConceptVisualizer演出に置き換え予定
 *   - 2回目以降（90%以上クリア済み）：_renderRepeat()
 *
 * ライフサイクル: Create/Destroy パターン
 *
 * @version 1.1
 * @date 2026-04-03
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import { SkinManager } from '../core/SkinManager.js';
import { ConceptVisualizer } from '../components/ConceptVisualizer.js';
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
    /** @type {CharacterAvatar|null} greet/victoryPose に使うアバターインスタンス */
    this._avatar    = null;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を描画する
   * 初回（または90%未満クリア）ならフルスクリーン、2回目以降はリピート表示
   */
  render() {
    const world   = getWorldById(this._worldId);
    const unitId  = world?.unitId;
    const intro   = UNIT_INTROS[unitId];

    // 90%未満クリアの場合は「初回扱い」にリセットして再度フル表示する
    const seenKey       = `intro_seen_${unitId}`;
    const worldProgress = GameStore.getState(`progress.worlds.${this._worldId}`);
    const pct           = worldProgress?.percentage ?? 0;
    if (pct < 90) sessionStorage.removeItem(seenKey);

    const hasBeenSeen = !!sessionStorage.getItem(seenKey);

    if (hasBeenSeen) {
      this._renderRepeat(world, intro);
    } else {
      sessionStorage.setItem(seenKey, '1');
      this._renderFirst(world, intro);
    }
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    this._avatar?.stopTalking();
    this._avatar = null;
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[UnitIntroScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: 初回表示（Ph3で ConceptVisualizer 本実装予定）
  // ─────────────────────────────────────────

  /**
   * 初回表示。ConceptVisualizer で対話 → マイクロ体験 → クイズへ直行。
   */
  _renderFirst(world, intro) {
    Logger.info('[UnitIntroScreen] First render (CV):', world?.id);
    const unitId = world?.unitId;

    const el = document.createElement('div');
    el.className = 'unit-intro-screen';
    el.innerHTML = `
      <button class="button button-small unit-intro-cv-back" type="button">もどる</button>
      <div id="cv-slot" class="unit-intro-cv-slot"></div>
      <div id="cv-avatar-slot" class="unit-intro-cv-avatar"></div>
    `;
    this._el = el;
    this._container.appendChild(el);

    const cv = new ConceptVisualizer(() => {
      cv.destroy();
      this.destroy();
      if (typeof this._onStart === 'function') this._onStart();
    });

    cv.render(el.querySelector('#cv-slot'), unitId);

    // 初回：右下にキャラを配置して挨拶させる
    const cvAvatarSlot = el.querySelector('#cv-avatar-slot');
    if (cvAvatarSlot) {
      this._avatar = new CharacterAvatar('md', 'happy');
      cvAvatarSlot.appendChild(this._avatar.render());
      setTimeout(() => {
        this._avatar?.startTalking('いっしょに がんばろう！', 2500);
      }, 1000);
    }

    el.querySelector('.unit-intro-cv-back').addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      cv.destroy();
      this.destroy();
      if (typeof this._onBack === 'function') this._onBack();
    });

    requestAnimationFrame(() => el.classList.add('unit-intro-visible'));
  }

  // ─────────────────────────────────────────
  // プライベート: リピート表示（2回目以降 / 初回仮表示）
  // ─────────────────────────────────────────

  _renderRepeat(world, intro) {
    Logger.info('[UnitIntroScreen] Repeat render:', world?.id);
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
          <button class="button button-large unit-intro-btn-start" type="button">
            はじめる！ 🚀
          </button>
          ${flashBtn}
          <button class="button button-secondary unit-intro-btn-back" type="button">
            もどる
          </button>
        </div>

      </div>
    `;

    this._el = el;
    this._container.appendChild(el);

    // イラスト挿入
    this._insertIllust(el.querySelector('#unit-intro-illust'), imgSrc, ph);

    // キャラアバター挿入（インスタンスを保持して greet/victoryPose に使う）
    const avatarSlot = el.querySelector('#unit-intro-avatar');
    if (avatarSlot) {
      this._avatar = new CharacterAvatar('md', 'happy');
      avatarSlot.appendChild(this._avatar.render());
    }

    this._bindEvents();

    // フェードイン後、フクロウのヒントに続いてキャラが反応する（掛け合い演出）
    // フクロウ: 即時表示 → 0.8秒後: キャラが greet
    const playerName = GameStore.getState('player.name') || 'プレイヤー';
    const streak     = GameStore.getState('player.streak') || 1;
    setTimeout(() => {
      this._avatar?.greet(playerName, streak);
    }, 800);

    requestAnimationFrame(() => el.classList.add('unit-intro-visible'));
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
      // キャラが「いくぞ！」と叫んでから 600ms 後にクイズ遷移
      if (this._avatar) {
        const skin = SkinManager.getCurrentSkin();
        const line = skin?.reactions?.correct ?? 'いくぞ！';
        this._avatar.victoryPose(line);
        setTimeout(() => {
          this.destroy();
          if (typeof this._onStart === 'function') this._onStart();
        }, 600);
      } else {
        this.destroy();
        if (typeof this._onStart === 'function') this._onStart();
      }
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
