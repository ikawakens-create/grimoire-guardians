/**
 * InventoryScreen.js - Grimoire Guardians
 * もちもの画面（インベントリモーダル）
 *
 * アイコンは現在絵文字で表示。
 * assets/icons/materials/{id}.png を配置するだけで自動的に画像に切り替わる
 * （絵文字の上に img を重ねて、読み込み失敗時は非表示にする方式）。
 *
 * @version 1.0
 * @date 2026-02-26
 */

import { GameStore } from '../core/GameStore.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import Logger from '../core/Logger.js';

// ─────────────────────────────────────────
// 素材定義
// ─────────────────────────────────────────

/**
 * @typedef {{ id: string, emoji: string, label: string,
 *             rarity: 'common'|'uncommon'|'rare'|'super_rare',
 *             tab: 'build'|'skin' }} MaterialDef
 */

/** @type {MaterialDef[]} */
const MATERIAL_DEFS = [
  // 🏠 家ビルド用
  { id: 'wood',          emoji: '🪵', label: 'まるた',       rarity: 'common',     tab: 'build' },
  { id: 'stone',         emoji: '🪨', label: 'いし',         rarity: 'common',     tab: 'build' },
  { id: 'brick',         emoji: '🧱', label: 'れんが',       rarity: 'uncommon',   tab: 'build' },
  { id: 'gem',           emoji: '💎', label: 'ほうせき',     rarity: 'rare',       tab: 'build' },
  { id: 'star_fragment', emoji: '✨', label: 'ほしのかけら', rarity: 'super_rare', tab: 'build' },
  // 👗 スキン用
  { id: 'cloth',         emoji: '🧶', label: 'ぬの',         rarity: 'common',     tab: 'skin'  },
  { id: 'paint',         emoji: '🎨', label: 'えのぐ',       rarity: 'uncommon',   tab: 'skin'  },
  { id: 'crown',         emoji: '👑', label: 'おうかん',     rarity: 'rare',       tab: 'skin'  },
  { id: 'cape',          emoji: '🧣', label: 'マント',       rarity: 'rare',       tab: 'skin'  },
  { id: 'magic_orb',     emoji: '🔮', label: 'まほうだま',   rarity: 'super_rare', tab: 'skin'  },
];

const TABS = [
  { id: 'build', label: '🏠 いえ' },
  { id: 'skin',  label: '👗 スキン' },
];

// ─────────────────────────────────────────
// InventoryScreen クラス
// ─────────────────────────────────────────

class InventoryScreen {
  /**
   * @param {Function|null} [onClose] - 閉じたときのコールバック
   */
  constructor(onClose = null) {
    this.onClose    = onClose;
    /** @type {HTMLElement|null} */
    this.element    = null;
    this._activeTab = 'build';
  }

  // ─────────────────────────────────────────
  // パブリック
  // ─────────────────────────────────────────

  /** モーダルを開く */
  open() {
    if (this.element) return;

    const overlay = document.createElement('div');
    overlay.className = 'inventory-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'もちもの');
    overlay.innerHTML = this._buildHTML();

    this.element = overlay;
    document.body.appendChild(overlay);

    // 閉じるボタン
    overlay.querySelector('.inventory-close-btn')
      .addEventListener('click', () => this.close(), { once: true });

    // 背景クリックで閉じる
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close();
    });

    // タブ切り替え
    overlay.querySelectorAll('.inventory-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this._switchTab(btn.dataset.tab));
    });

    // フェードイン（次フレームで適用しないとトランジションが効かない）
    requestAnimationFrame(() => overlay.classList.add('inventory-overlay--visible'));

    Logger.info('[InventoryScreen] Opened');
  }

  /** モーダルを閉じる */
  close() {
    if (!this.element) return;

    HapticFeedback.light();
    this.element.classList.remove('inventory-overlay--visible');

    setTimeout(() => {
      this.element?.remove();
      this.element = null;
    }, 250);

    if (this.onClose) this.onClose();
    Logger.info('[InventoryScreen] Closed');
  }

  // ─────────────────────────────────────────
  // プライベート
  // ─────────────────────────────────────────

  /**
   * モーダル全体の HTML を返す
   * @returns {string}
   * @private
   */
  _buildHTML() {
    const materials  = GameStore.getState('inventory.materials') || {};
    const totalItems = Object.values(materials).reduce((s, n) => s + n, 0);

    const tabsHTML = TABS.map(t => `
      <button class="inventory-tab-btn ${t.id === this._activeTab ? 'inventory-tab-btn--active' : ''}"
              type="button" data-tab="${t.id}">
        ${t.label}
      </button>
    `).join('');

    return `
      <div class="inventory-modal">
        <div class="inventory-header">
          <span class="inventory-title">🎒 もちもの</span>
          <span class="inventory-total">ぜんぶで <strong>${totalItems}</strong> こ</span>
          <button class="inventory-close-btn" type="button" aria-label="とじる">✕</button>
        </div>
        <div class="inventory-tabs">${tabsHTML}</div>
        <div class="inventory-grid" id="inventory-grid">
          ${this._buildGridHTML(this._activeTab)}
        </div>
      </div>
    `;
  }

  /**
   * 指定タブのアイテムグリッド HTML を返す
   * @param {'build'|'skin'} tab
   * @returns {string}
   * @private
   */
  _buildGridHTML(tab) {
    const materials = GameStore.getState('inventory.materials') || {};
    const defs      = MATERIAL_DEFS.filter(d => d.tab === tab);

    return defs.map(def => {
      const count   = materials[def.id] ?? 0;
      const isEmpty = count === 0;

      return `
        <div class="inventory-item${isEmpty ? ' inventory-item--empty' : ''} inventory-item--${def.rarity}">
          <div class="material-icon-wrap">
            <span class="material-emoji" aria-hidden="true">${def.emoji}</span>
            <img class="material-img"
                 src="./assets/icons/materials/${def.id}.png"
                 alt="${def.label}"
                 onerror="this.style.display='none'">
          </div>
          <div class="inventory-item-label">${def.label}</div>
          <div class="inventory-item-count${count > 0 ? ' inventory-item-count--has' : ''}">${count}</div>
        </div>
      `;
    }).join('');
  }

  /**
   * アクティブタブを切り替えてグリッドを再描画する
   * @param {string} tabId
   * @private
   */
  _switchTab(tabId) {
    if (!this.element || tabId === this._activeTab) return;

    this._activeTab = tabId;
    HapticFeedback.light();

    // タブボタンのアクティブ状態を更新
    this.element.querySelectorAll('.inventory-tab-btn').forEach(btn => {
      btn.classList.toggle('inventory-tab-btn--active', btn.dataset.tab === tabId);
    });

    // グリッドを更新
    const grid = this.element.querySelector('#inventory-grid');
    if (grid) grid.innerHTML = this._buildGridHTML(tabId);
  }
}

export default InventoryScreen;
