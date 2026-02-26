/**
 * HouseScreen.js - Grimoire Guardians
 * 家ビルドシステム メイン画面
 * 外観・庭・室内のモード切替と表示、編集モードへの導線
 *
 * @version 1.0
 * @date 2026-02-26
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import {
  getItemById,
  HOUSE_SECTION,
  EXTERIOR_STYLES,
} from '../data/houseItems.js';

// 表示モード定数
const VIEW_MODE = {
  EXTERIOR: 'exterior',
  GARDEN:   'garden',
  FLOOR1:   'floor1',
  FLOOR2:   'floor2',
  FLOOR3:   'floor3',
  TOWER:    'tower',
};

// セクション表示名
const SECTION_LABELS = {
  exterior: 'そとがわ',
  garden:   'にわ',
  floor1:   '1かい',
  floor2:   '2かい',
  floor3:   '3かい',
  tower:    'とう',
};

// 素材絵文字マップ
const MATERIAL_EMOJI = {
  wood:          '🪵',
  stone:         '🪨',
  brick:         '🧱',
  gem:           '💎',
  star_fragment: '✨',
  cloth:         '🧶',
  paint:         '🎨',
  crown:         '👑',
  cape:          '🧣',
  magic_orb:     '🔮',
};

export class HouseScreen {
  constructor() {
    this._currentMode = VIEW_MODE.EXTERIOR;
    this._container = null;
    this._unsubscribe = null;
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  /**
   * 画面を表示
   * @param {HTMLElement} container
   */
  show(container) {
    this._container = container;
    this._render();

    // 状態変更を購読（家データが更新されたら再描画）
    this._unsubscribe = GameStore.subscribe((state, path) => {
      if (path && (path.startsWith('house') || path.startsWith('inventory'))) {
        this._render();
      }
    });

    Logger.info('[HouseScreen] 表示');
  }

  /** 画面を非表示 */
  hide() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._container) {
      this._container.innerHTML = '';
    }
    Logger.info('[HouseScreen] 非表示');
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;

    const house = GameStore.getState('house');
    const collection = HouseManager.getCollectionRate();
    const nextSection = HouseManager.getNextSectionToUnlock();

    this._container.innerHTML = `
      <div class="house-screen">
        ${this._renderHeader()}
        ${this._renderSectionTabs(house)}
        <div class="house-view-area">
          ${this._renderCurrentView(house)}
        </div>
        ${this._renderCollectionBar(collection)}
        ${nextSection ? this._renderNextSectionHint(nextSection) : ''}
      </div>
    `;

    this._bindEvents();
  }

  _renderHeader() {
    return `
      <div class="house-header">
        <button class="btn-icon house-back-btn" aria-label="もどる">←</button>
        <h2 class="house-title">🏠 グリモアのいえ</h2>
        <button class="btn btn-small btn-warning house-edit-btn">🔨 へんしゅう</button>
      </div>
    `;
  }

  _renderSectionTabs(house) {
    const sections = house.sections;
    const tabs = [];

    // 解放済みのセクションのみタブ表示
    const sectionOrder = ['exterior', 'garden', 'floor1', 'floor2', 'floor3', 'tower'];

    // floor1は常に表示、外観は庭解放後から
    for (const sectionId of sectionOrder) {
      const isUnlocked = sections[sectionId];
      // exterior（そとがわ）は庭が解放されてからタブに登場
      if (sectionId === 'exterior' && !sections.garden) continue;

      const isActive = this._currentMode === sectionId ||
        (this._currentMode === VIEW_MODE.EXTERIOR && sectionId === 'exterior');
      tabs.push(`
        <button
          class="house-tab-btn ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}"
          data-section="${sectionId}"
          ${!isUnlocked ? 'disabled' : ''}
          aria-label="${SECTION_LABELS[sectionId] || sectionId}"
        >
          ${!isUnlocked ? '🔒' : ''}
          ${SECTION_LABELS[sectionId] || sectionId}
        </button>
      `);
    }

    return `
      <div class="house-tabs" role="tablist">
        ${tabs.join('')}
      </div>
    `;
  }

  _renderCurrentView(house) {
    switch (this._currentMode) {
      case VIEW_MODE.EXTERIOR:
        return this._renderExteriorView(house);
      case VIEW_MODE.GARDEN:
        return this._renderGardenView(house);
      case VIEW_MODE.FLOOR1:
        return this._renderFloorView(house, 'floor1');
      case VIEW_MODE.FLOOR2:
        return this._renderFloorView(house, 'floor2');
      case VIEW_MODE.FLOOR3:
        return this._renderFloorView(house, 'floor3', true);
      case VIEW_MODE.TOWER:
        return this._renderTowerView(house);
      default:
        return this._renderExteriorView(house);
    }
  }

  // ─ 外観ビュー ─
  _renderExteriorView(house) {
    const styleItem = getItemById(house.exteriorStyle) ||
      EXTERIOR_STYLES.find(s => s.id === 'default');

    const imageHtml = styleItem.image
      ? `<img
           src="${styleItem.image}"
           alt="${styleItem.name}"
           class="house-exterior-img"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
         >
         <div class="house-exterior-fallback" style="display:none">
           ${styleItem.imageFallback}
         </div>`
      : `<div class="house-exterior-fallback">${styleItem.imageFallback}</div>`;

    // 外観装飾オーバーレイ（exterior解放後）
    const decoOverlay = house.sections.exterior
      ? this._renderExteriorDecoOverlay(house.exteriorDeco)
      : '';

    return `
      <div class="house-exterior-view">
        <div class="house-exterior-wrapper">
          ${imageHtml}
          ${decoOverlay}
        </div>
        <p class="house-style-name">${styleItem.name}</p>
      </div>
    `;
  }

  _renderExteriorDecoOverlay(exteriorDeco) {
    const parts = [];
    for (const [slot, itemId] of Object.entries(exteriorDeco)) {
      if (!itemId) continue;
      const item = getItemById(itemId);
      if (!item) continue;
      parts.push(`
        <div class="exterior-deco-badge exterior-deco-${slot}" title="${item.name}">
          ${item.imageFallback}
        </div>
      `);
    }
    return parts.length
      ? `<div class="exterior-deco-overlay">${parts.join('')}</div>`
      : '';
  }

  // ─ 庭ビュー ─
  _renderGardenView(house) {
    if (!house.sections.garden) {
      return this._renderLockedSection('garden');
    }

    const slots = house.garden.decorations.map((itemId, i) => {
      const item = itemId ? getItemById(itemId) : null;
      return `
        <div class="house-garden-slot" data-slot="${i}" data-type="garden_deco">
          ${item
            ? `<img src="${item.image || ''}" alt="${item.name}"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
               <span class="slot-fallback" style="display:none">${item.imageFallback}</span>`
            : `<span class="slot-empty-icon">＋</span>`
          }
        </div>
      `;
    }).join('');

    const monsterSlots = house.garden.monsters.map((monsterId, i) => `
      <div class="house-monster-slot" data-slot="${i}" data-type="garden_monster">
        ${monsterId
          ? `<div class="monster-in-garden" title="モンスター">👾</div>`
          : `<span class="slot-empty-icon">🐾</span>`
        }
      </div>
    `).join('');

    return `
      <div class="house-garden-view">
        <div class="garden-deco-grid">
          ${slots}
        </div>
        <div class="garden-monster-row">
          <span class="garden-monster-label">なかまモンスター</span>
          ${monsterSlots}
        </div>
      </div>
    `;
  }

  // ─ 室内ビュー（floor1/floor2/floor3共通） ─
  _renderFloorView(house, floorKey, isSpecial = false) {
    if (!house.sections[floorKey]) {
      return this._renderLockedSection(floorKey);
    }

    const floorData = house[floorKey];
    const wallpaperId = floorData.wallpaper;
    const floorId = floorData.floor;
    const wallpaperItem = wallpaperId ? getItemById(wallpaperId) : null;
    const floorItem = floorId ? getItemById(floorId) : null;

    const furnitureSlots = floorData.furniture.map((itemId, i) => {
      const item = itemId ? getItemById(itemId) : null;
      return `
        <div class="house-furniture-slot ${isSpecial ? 'special' : ''}"
             data-slot="${i}"
             data-floor="${floorKey}"
             data-type="furniture">
          ${item
            ? `<img src="${item.image || ''}" alt="${item.name}"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
               <span class="slot-fallback" style="display:none">${item.imageFallback}</span>`
            : `<span class="slot-empty-icon">＋</span>`
          }
        </div>
      `;
    }).join('');

    return `
      <div class="house-floor-view"
           style="${wallpaperItem?.image ? `--wallpaper-url: url('${wallpaperItem.image}')` : ''}
                  ${floorItem?.image ? `--floor-url: url('${floorItem.image}')` : ''}">
        <div class="room-bg-info">
          <span class="room-wallpaper-badge" data-type="wallpaper" data-floor="${floorKey}">
            🖼️ ${wallpaperItem ? wallpaperItem.name : 'しろかべ'}
          </span>
          <span class="room-floor-badge" data-type="floor_item" data-floor="${floorKey}">
            🟫 ${floorItem ? floorItem.name : 'きのゆか'}
          </span>
        </div>
        <div class="house-furniture-grid ${isSpecial ? 'grid-3col' : 'grid-4col'}">
          ${furnitureSlots}
        </div>
      </div>
    `;
  }

  // ─ 塔ビュー ─
  _renderTowerView(house) {
    if (!house.sections.tower) {
      return this._renderLockedSection('tower');
    }

    const slots = house.tower.decorations.map((itemId, i) => {
      const item = itemId ? getItemById(itemId) : null;
      return `
        <div class="house-tower-slot" data-slot="${i}" data-type="tower_deco">
          ${item
            ? `<span class="tower-item-emoji">${item.imageFallback}</span>`
            : `<span class="slot-empty-icon">✦</span>`
          }
        </div>
      `;
    }).join('');

    return `
      <div class="house-tower-view">
        <div class="tower-star-bg">✨</div>
        <div class="house-tower-grid">
          ${slots}
        </div>
        <p class="tower-legend-text">🌟 でんせつのとう 🌟</p>
      </div>
    `;
  }

  // ─ ロック中セクション ─
  _renderLockedSection(sectionId) {
    const condition = { garden: 4, exterior: 8, floor2: 12, floor3: 16, tower: 33 };
    const required = condition[sectionId] || '?';
    const cleared = HouseManager._getClearedWorldCount();
    const remaining = Math.max(0, required - cleared);

    return `
      <div class="house-section-locked">
        <div class="lock-icon">🔒</div>
        <p class="lock-title">${SECTION_LABELS[sectionId]}はまだひらいていません</p>
        <p class="lock-hint">あと <strong>${remaining}</strong> つのワールドをクリアすると解放！</p>
        <div class="lock-progress-bar">
          <div class="lock-progress-fill"
               style="width: ${Math.min(100, (cleared / required) * 100)}%"></div>
        </div>
        <p class="lock-progress-text">${cleared} / ${required} ワールドクリア済み</p>
      </div>
    `;
  }

  // ─ コレクションバー ─
  _renderCollectionBar(collection) {
    const pct = collection.total > 0
      ? Math.min(100, Math.floor((collection.crafted / collection.total) * 100))
      : 0;

    return `
      <div class="house-collection-bar">
        <span class="collection-label">🏠 コレクション</span>
        <div class="collection-progress">
          <div class="collection-fill" style="width: ${pct}%"></div>
        </div>
        <span class="collection-count">${collection.crafted} / ${collection.total}</span>
      </div>
    `;
  }

  // ─ 次セクション解放ヒント ─
  _renderNextSectionHint(nextSection) {
    return `
      <div class="house-next-section-hint">
        あと <strong>${nextSection.remaining}</strong> ワールドで
        「${SECTION_LABELS[nextSection.sectionId] || nextSection.sectionId}」が解放！
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._container) return;

    // もどるボタン
    const backBtn = this._container.querySelector('.house-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'memory_isle');
      });
    }

    // 編集ボタン → HouseBuildScreen へ
    const editBtn = this._container.querySelector('.house-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'house_build');
        GameStore.setState('app.houseBuildMode', this._currentMode);
      });
    }

    // セクションタブ
    const tabBtns = this._container.querySelectorAll('.house-tab-btn:not([disabled])');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this._currentMode = btn.dataset.section;
        this._render();
      });
    });

    // スロットタップ（閲覧モードではハイライトのみ）
    const slots = this._container.querySelectorAll(
      '[data-type="furniture"],[data-type="garden_deco"],[data-type="tower_deco"]'
    );
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        // 編集モードに直接遷移
        GameStore.setState('app.currentScreen', 'house_build');
        GameStore.setState('app.houseBuildMode', this._currentMode);
        GameStore.setState('app.houseEditTarget', {
          type: slot.dataset.type,
          slot: parseInt(slot.dataset.slot, 10),
          floor: slot.dataset.floor || null,
        });
      });
    });

    // 壁紙・床バッジタップ
    const bgBadges = this._container.querySelectorAll(
      '[data-type="wallpaper"],[data-type="floor_item"]'
    );
    bgBadges.forEach(badge => {
      badge.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'house_build');
        GameStore.setState('app.houseBuildMode', this._currentMode);
        GameStore.setState('app.houseEditTarget', {
          type: badge.dataset.type,
          floor: badge.dataset.floor,
        });
      });
    });
  }
}

export default HouseScreen;
