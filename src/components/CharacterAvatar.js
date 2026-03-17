/**
 * CharacterAvatar.js - Grimoire Guardians
 * キャラクターアバター表示コンポーネント
 *
 * スキンの画像を指定サイズで描画する。
 * サイズ:
 *   sm  (40px)  - ブックシェルフヘッダー
 *   md  (80px)  - 街・家・タウン画面
 *   lg  (120px) - リザルト画面（感情つき）
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { SkinManager } from '../core/SkinManager.js';
import { Config } from '../core/Config.js';

const SIZE_PX = { sm: 40, md: 80, lg: 120, xl: 200 };

export class CharacterAvatar {
  /**
   * @param {'sm'|'md'|'lg'|'xl'} size - アバターサイズ（xl=200px 最終決戦・プロローグ用）
   * @param {'normal'|'happy'|'sad'} [emotion='normal'] - リザルト画面用感情（lg/xl で有効）
   */
  constructor(size = 'md', emotion = 'normal') {
    this._size    = size;
    this._emotion = emotion;
    this._element = null;
  }

  /**
   * アバター要素を生成して返す
   * @returns {HTMLElement}
   */
  render() {
    const skin = SkinManager.getCurrentSkin();
    const px   = SIZE_PX[this._size] || 80;

    const wrapper = document.createElement('div');
    wrapper.className = `char-avatar char-avatar-${this._size}`;
    if (this._size === 'lg' || this._size === 'xl') {
      wrapper.classList.add(`char-avatar-${this._emotion}`);
    }
    wrapper.style.width  = `${px}px`;
    wrapper.style.height = `${px}px`;

    // スキン機能が無効な場合はデフォルト絵文字のみ
    if (!Config.FEATURES.ENABLE_SKINS) {
      wrapper.innerHTML = `<span class="char-avatar-emoji" style="font-size:${Math.round(px * 0.7)}px">🧙</span>`;
      this._element = wrapper;
      return wrapper;
    }

    const img = document.createElement('img');
    img.src    = skin.image;
    img.alt    = skin.name;
    img.className = 'char-avatar-img';
    img.style.width  = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';

    // フォールバック：画像読み込み失敗時は絵文字
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
   * 既存の DOM 要素に描画されたアバターをリフレッシュする
   * （スキン変更後に呼ぶ）
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
}

export default CharacterAvatar;
