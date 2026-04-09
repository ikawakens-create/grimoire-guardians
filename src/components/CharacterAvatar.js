/**
 * CharacterAvatar.js - Grimoire Guardians
 * キャラクターアバター表示コンポーネント
 *
 * サイズ:
 *   sm  (40px)  - ブックシェルフヘッダー
 *   md  (80px)  - 街・家・タウン画面
 *   lg  (120px) - リザルト画面（感情つき）
 *   xl  (200px) - 最終決戦・WardrobeScreen
 *
 * アニメーション API（render() 後に呼ぶ）:
 *   startTalking(text, duration)  - 吹き出し + ゴニョゴニョSE
 *   stopTalking()                 - 吹き出し即時除去（destroy時も呼ぶ）
 *   victoryPose(line)             - bounce + 吹き出し
 *   sadReact(line)                - shake + 吹き出し
 *   greet(name, streak)           - reactions.greet をセリフにして startTalking
 *
 * @version 2.0
 * @date 2026-04-07
 */

import { SkinManager } from '../core/SkinManager.js';
import { SoundManager } from '../core/SoundManager.js';
import { Config } from '../core/Config.js';
import { getSkinById } from '../data/skinItems.js';

const SIZE_PX = { sm: 40, md: 80, lg: 120, xl: 200 };

export class CharacterAvatar {
  /**
   * @param {'sm'|'md'|'lg'|'xl'} size
   * @param {'normal'|'happy'|'sad'} [emotion='normal']
   */
  constructor(size = 'md', emotion = 'normal', { skinIdOverride = null } = {}) {
    this._size           = size;
    this._emotion        = emotion;
    this._element        = null;
    this._skinIdOverride = skinIdOverride;

    /** @type {number|null} 吹き出しタイマーID */
    this._talkTimer = null;
    /** @type {HTMLElement|null} 吹き出し要素（参照で確実クリーンアップ） */
    this._bubbleEl  = null;
  }

  /**
   * プレビュー用スキンを差し替えてリフレッシュする。
   * WardrobeScreen でプレビュー中スキンを変更するときに呼ぶ。
   * @param {string} skinId
   */
  updateSkin(skinId) {
    this._skinIdOverride = skinId;
    this.refresh();
  }

  // ─────────────────────────────────────────────
  // Public — 描画
  // ─────────────────────────────────────────────

  /**
   * アバター要素を生成して返す。
   * idle float アニメーション（.char-avatar-idle）を自動付与する。
   * @returns {HTMLElement}
   */
  render() {
    const skin = this._skinIdOverride
      ? (getSkinById(this._skinIdOverride) ?? SkinManager.getCurrentSkin())
      : SkinManager.getCurrentSkin();
    const px   = SIZE_PX[this._size] || 80;

    const wrapper = document.createElement('div');
    wrapper.className = `char-avatar char-avatar-${this._size} char-avatar-idle`;
    if (this._size === 'lg' || this._size === 'xl') {
      wrapper.classList.add(`char-avatar-${this._emotion}`);
    }
    wrapper.style.width  = `${px}px`;
    wrapper.style.height = `${px}px`;

    if (!Config.FEATURES.ENABLE_SKINS) {
      wrapper.innerHTML = `<span class="char-avatar-emoji" style="font-size:${Math.round(px * 0.7)}px">🧙</span>`;
      this._element = wrapper;
      return wrapper;
    }

    const img = document.createElement('img');
    img.src         = skin.image;
    img.alt         = skin.name;
    img.className   = 'char-avatar-img';
    img.style.width  = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';

    const fallback = document.createElement('span');
    fallback.className = 'char-avatar-emoji';
    fallback.style.fontSize = `${Math.round(px * 0.7)}px`;
    fallback.style.display = 'none';
    fallback.textContent = skin.emoji || '🧙';

    img.addEventListener('error', () => {
      img.style.display = 'none';
      fallback.style.display = 'flex';
    });

    wrapper.appendChild(img);
    wrapper.appendChild(fallback);
    this._element = wrapper;
    return wrapper;
  }

  /**
   * 既存の DOM 要素に描画されたアバターをリフレッシュする（スキン変更後に呼ぶ）
   */
  refresh() {
    if (!this._element) return;
    const parent = this._element.parentNode;
    if (!parent) return;
    const newEl = this.render();
    parent.replaceChild(newEl, this._element);
  }

  /** @returns {HTMLElement|null} */
  get element() { return this._element; }

  // ─────────────────────────────────────────────
  // Public — アニメーション API
  // ─────────────────────────────────────────────

  /**
   * 吹き出しを表示してゴニョゴニョSEを鳴らす。
   * 既存バブルがあれば先に除去する（多重バブル防止）。
   * @param {string} text      - 吹き出しテキスト
   * @param {number} [duration=1500] - 表示時間 (ms)
   */
  startTalking(text, duration = 1500) {
    if (!this._element) return;
    this._clearBubble();  // タイマーとバブルだけ消す（クラス操作なし）

    // ゴニョゴニョSE（プレビュー中スキンの voiceFreq を使用）
    const skin = this._skinIdOverride
      ? (getSkinById(this._skinIdOverride) ?? SkinManager.getCurrentSkin())
      : SkinManager.getCurrentSkin();
    SoundManager.playTalk(skin?.voiceFreq);

    // 吹き出し生成
    const bubble = document.createElement('div');
    bubble.className = 'char-avatar-bubble';
    bubble.textContent = text;
    this._element.appendChild(bubble);
    this._bubbleEl = bubble;

    // idle を一時停止し、talking 中は体を微振動
    this._element.classList.remove('char-avatar-idle');
    this._element.classList.add('char-avatar-talking');

    this._talkTimer = setTimeout(() => this.stopTalking(), duration);
  }

  /**
   * 吹き出しを即時除去してアイドルに戻る。
   * destroy() 時にも呼ぶこと。
   */
  stopTalking() {
    this._clearBubble();
    if (this._element) {
      this._element.classList.remove('char-avatar-talking');
      this._element.classList.add('char-avatar-idle');
    }
  }

  /**
   * タイマーとバブル要素だけをクリアする（クラス操作なし）。
   * startTalking の多重呼び出し防止に使う。
   * @private
   */
  _clearBubble() {
    clearTimeout(this._talkTimer);
    this._talkTimer = null;
    this._bubbleEl?.remove();
    this._bubbleEl = null;
  }

  /**
   * 勝利ポーズ：bounce アニメ + 吹き出し。
   * @param {string} [line] - セリフ（省略時は reactions.correct を使用）
   */
  victoryPose(line) {
    if (!this._element) return;
    const skin = SkinManager.getCurrentSkin();
    const text = line ?? skin?.reactions?.correct ?? '✨';

    this._element.classList.remove('char-avatar-idle', 'char-avatar-talking');
    this._element.classList.add('char-avatar-victory');

    // bounce アニメ終了後に idle に戻す
    const onEnd = () => {
      // bounce 終了後は victory を除去。talking 中なら talking のまま維持、
      // そうでなければ idle に戻す（talking と idle の共存を防ぐ）
      this._element.classList.remove('char-avatar-victory');
      if (!this._element.classList.contains('char-avatar-talking')) {
        this._element.classList.add('char-avatar-idle');
      }
      this._element.removeEventListener('animationend', onEnd);
    };
    this._element.addEventListener('animationend', onEnd);

    this.startTalking(text, 1800);
  }

  /**
   * 残念ポーズ：shake アニメ + 吹き出し。
   * @param {string} [line] - セリフ（省略時は reactions.wrong を使用）
   */
  sadReact(line) {
    if (!this._element) return;
    const skin = SkinManager.getCurrentSkin();
    const text = line ?? skin?.reactions?.wrong ?? 'おしい！';

    this._element.classList.remove('char-avatar-idle');
    this._element.classList.add('char-avatar-sad-react');

    const onEnd = () => {
      this._element.classList.remove('char-avatar-sad-react');
      this._element.classList.add('char-avatar-idle');
      this._element.removeEventListener('animationend', onEnd);
    };
    this._element.addEventListener('animationend', onEnd);

    this.startTalking(text, 1200);
  }

  /**
   * reactions.greet を展開して startTalking を呼ぶ。
   * @param {string} name   - プレイヤー名
   * @param {number} streak - 連続日数
   */
  greet(name, streak) {
    const skin = SkinManager.getCurrentSkin();
    const raw  = skin?.reactions?.greet ?? `${name}！きょうも がんばろう！`;
    const text = raw
      .replace('{name}', name)
      .replace('{n}', String(streak));
    this.startTalking(text, 2000);
  }
}

export default CharacterAvatar;
