/**
 * HouseBuildScreen.js - Grimoire Guardians
 * 家ビルドシステム 編集・クラフト画面
 * アイテムのクラフト・配置・スタイル変更UIを提供
 *
 * @version 1.0
 * @date 2026-02-26
 */

import { GameStore } from '../core/GameStore.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import {
  getItemById,
  getItemsBySection,
  canCraft,
  getMissingMaterials,
  HOUSE_SECTION,
  EXTERIOR_STYLES,
  WALLPAPER_ITEMS,
  FLOOR_ITEMS,
  FURNITURE_ITEMS_FLOOR1,
  FURNITURE_ITEMS_FLOOR2,
  FURNITURE_ITEMS_FLOOR3,
  GARDEN_ITEMS,
  EXTERIOR_DECO_ITEMS,
  TOWER_ITEMS,
  RARITY,
} from '../data/houseItems.js';

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

// レアリティ色
const RARITY_CLASS = {
  [RARITY.COMMON]:     'rarity-common',
  [RARITY.UNCOMMON]:   'rarity-uncommon',
  [RARITY.RARE]:       'rarity-rare',
  [RARITY.SUPER_RARE]: 'rarity-super-rare',
};

// カテゴリー定義（モードごとに表示するタブ）
const MODE_CATEGORIES = {
  exterior: [
    { id: 'style',    label: 'スタイル',   items: () => EXTERIOR_STYLES },
    { id: 'deco',     label: 'かざり',     items: () => EXTERIOR_DECO_ITEMS },
  ],
  garden: [
    { id: 'garden',   label: 'デコ',       items: () => GARDEN_ITEMS },
  ],
  floor1: [
    { id: 'furniture', label: 'かぐ',      items: () => FURNITURE_ITEMS_FLOOR1 },
    { id: 'wallpaper', label: 'かべがみ',   items: () => WALLPAPER_ITEMS },
    { id: 'floor',     label: 'ゆか',       items: () => FLOOR_ITEMS },
  ],
  floor2: [
    { id: 'furniture', label: 'かぐ',      items: () => FURNITURE_ITEMS_FLOOR2 },
    { id: 'wallpaper', label: 'かべがみ',   items: () => WALLPAPER_ITEMS },
    { id: 'floor',     label: 'ゆか',       items: () => FLOOR_ITEMS },
  ],
  floor3: [
    { id: 'furniture', label: 'かぐ',      items: () => FURNITURE_ITEMS_FLOOR3 },
  ],
  tower: [
    { id: 'tower',    label: 'かざり',     items: () => TOWER_ITEMS },
  ],
};

export class HouseBuildScreen {
  constructor() {
    this._container = null;
    this._mode = 'floor1';          // どのセクションを編集中か
    this._category = 'furniture';   // どのカテゴリーを表示中か
    this._editTarget = null;        // { type, slot, floor } | null
    this._selectedItem = null;      // 選択中アイテムID
    this._craftResult = null;       // { success, message } 最後のクラフト結果
    this._unsubscribe = null;
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;

    // HouseScreen からの引継ぎ
    this._mode = GameStore.getState('app.houseBuildMode') || 'floor1';
    this._editTarget = GameStore.getState('app.houseEditTarget') || null;

    // モードに合わせてデフォルトカテゴリーを設定
    const cats = MODE_CATEGORIES[this._mode] || MODE_CATEGORIES.floor1;
    this._category = cats[0]?.id || 'furniture';

    this._render();
    Logger.info('[HouseBuildScreen] 表示: mode=' + this._mode);
  }

  hide() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    // 引継ぎ状態をクリア
    GameStore.setState('app.houseBuildMode', null);
    GameStore.setState('app.houseEditTarget', null);
    if (this._container) {
      this._container.innerHTML = '';
    }
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;

    const materials = GameStore.getState('inventory.materials') || {};
    const house = GameStore.getState('house');
    const categories = MODE_CATEGORIES[this._mode] || [];

    this._container.innerHTML = `
      <div class="house-build-screen">
        ${this._renderHeader(materials)}
        ${this._renderCategoryTabs(categories)}
        <div class="build-content">
          <div class="build-item-list">
            ${this._renderItemList(materials, house)}
          </div>
          ${this._selectedItem ? this._renderItemDetail(this._selectedItem, materials, house) : ''}
        </div>
        ${this._craftResult ? this._renderCraftResult() : ''}
      </div>
    `;

    this._bindEvents();
  }

  _renderHeader(materials) {
    // 所持素材の簡易表示（家ビルド用素材のみ）
    const matDisplay = ['wood','stone','brick','gem','star_fragment']
      .map(id => `<span class="mat-chip">${MATERIAL_EMOJI[id]}${materials[id] || 0}</span>`)
      .join('');

    return `
      <div class="build-header">
        <button class="btn-icon build-back-btn" aria-label="もどる">←</button>
        <div class="build-materials-row">${matDisplay}</div>
        <button class="btn btn-small btn-success build-save-btn">💾 ほぞん</button>
      </div>
    `;
  }

  _renderCategoryTabs(categories) {
    const tabs = categories.map(cat => `
      <button
        class="build-cat-btn ${this._category === cat.id ? 'active' : ''}"
        data-cat="${cat.id}"
      >
        ${cat.label}
      </button>
    `).join('');

    return `<div class="build-category-tabs">${tabs}</div>`;
  }

  _renderItemList(materials, house) {
    const cat = (MODE_CATEGORIES[this._mode] || []).find(c => c.id === this._category);
    if (!cat) return '<p class="build-empty">カテゴリーがありません</p>';

    const items = cat.items();
    if (!items || items.length === 0) return '<p class="build-empty">アイテムがありません</p>';

    const crafted = house.crafted || [];

    return items.map(item => {
      const isCrafted = crafted.includes(item.id);
      const { craftable, missing } = HouseManager.checkCraftable(item.id);
      const isSelected = this._selectedItem === item.id;
      const isDefault = !item.recipe; // 無料アイテム

      let statusClass = '';
      let statusBadge = '';
      if (isCrafted) {
        statusClass = 'item-crafted';
        statusBadge = '<span class="item-badge badge-crafted">✓ もってる</span>';
      } else if (isDefault) {
        statusClass = 'item-free';
        statusBadge = '<span class="item-badge badge-free">むりょう</span>';
      } else if (craftable) {
        statusClass = 'item-craftable';
        statusBadge = '<span class="item-badge badge-craftable">✨ つくれる！</span>';
      } else {
        statusClass = 'item-locked';
        // 不足分を表示
        const missingStr = Object.entries(missing)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`)
          .join(' ');
        statusBadge = `<span class="item-badge badge-locked">あと ${missingStr}</span>`;
      }

      return `
        <div class="build-item-card ${statusClass} ${isSelected ? 'selected' : ''} ${RARITY_CLASS[item.rarity] || ''}"
             data-item-id="${item.id}"
             role="button"
             tabindex="0"
             aria-label="${item.name}">
          <div class="item-img-wrapper">
            ${item.image
              ? `<img src="${item.image}" alt="${item.name}"
                      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                 <span class="item-fallback" style="display:none">${item.imageFallback}</span>`
              : `<span class="item-fallback">${item.imageFallback}</span>`
            }
          </div>
          <div class="item-info">
            <p class="item-name">${item.name}</p>
            ${statusBadge}
          </div>
        </div>
      `;
    }).join('');
  }

  _renderItemDetail(itemId, materials, house) {
    const item = getItemById(itemId);
    if (!item) return '';

    const crafted = house.crafted || [];
    const isCrafted = crafted.includes(item.id);
    const isDefault = !item.recipe;
    const { craftable, missing } = HouseManager.checkCraftable(item.id);

    // レシピ表示
    let recipeHtml = '';
    if (item.recipe) {
      const recipeRows = Object.entries(item.recipe).map(([mat, req]) => {
        const have = materials[mat] || 0;
        const ok = have >= req;
        return `
          <span class="recipe-row ${ok ? 'ok' : 'ng'}">
            ${MATERIAL_EMOJI[mat]} ${have}/${req}
          </span>
        `;
      }).join('');
      recipeHtml = `<div class="item-recipe">${recipeRows}</div>`;
    } else {
      recipeHtml = `<p class="item-recipe-free">むりょうでつかえます！</p>`;
    }

    // アクションボタン
    let actionBtn = '';
    if (isCrafted || isDefault) {
      // 配置ボタン
      actionBtn = `
        <button class="btn btn-large btn-success build-place-btn" data-item-id="${item.id}">
          ✅ このへやにかざる
        </button>
      `;
    } else if (craftable) {
      actionBtn = `
        <button class="btn btn-large btn-warning build-craft-btn" data-item-id="${item.id}">
          🔨 つくる！
        </button>
      `;
    } else {
      const missingStr = Object.entries(missing)
        .map(([m, n]) => `${MATERIAL_EMOJI[m]}あと${n}`)
        .join('、');
      actionBtn = `
        <button class="btn btn-large btn-secondary" disabled>
          素材が足りない… (${missingStr})
        </button>
      `;
    }

    return `
      <div class="item-detail-panel">
        <div class="item-detail-header">
          <span class="detail-emoji">${item.imageFallback}</span>
          <div>
            <p class="detail-name">${item.name}</p>
            <p class="detail-rarity ${RARITY_CLASS[item.rarity] || ''}">${this._rarityLabel(item.rarity)}</p>
          </div>
        </div>
        ${recipeHtml}
        ${actionBtn}
      </div>
    `;
  }

  _renderCraftResult() {
    const { success, message } = this._craftResult;
    return `
      <div class="craft-result-toast ${success ? 'toast-success' : 'toast-error'}"
           role="alert" aria-live="polite">
        ${success ? '✨ ' : '❌ '}${message}
      </div>
    `;
  }

  _rarityLabel(rarity) {
    const labels = {
      [RARITY.COMMON]:     'コモン',
      [RARITY.UNCOMMON]:   'アンコモン',
      [RARITY.RARE]:       'レア',
      [RARITY.SUPER_RARE]: 'ちょうレア！',
    };
    return labels[rarity] || rarity;
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._container) return;

    // もどるボタン
    const backBtn = this._container.querySelector('.build-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'house');
      });
    }

    // 保存ボタン（状態はリアルタイム保存済みなので表示のみ）
    const saveBtn = this._container.querySelector('.build-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this._craftResult = { success: true, message: 'ほぞんしました！' };
        this._render();
        setTimeout(() => {
          this._craftResult = null;
          this._render();
        }, 2000);
      });
    }

    // カテゴリータブ
    const catBtns = this._container.querySelectorAll('.build-cat-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this._category = btn.dataset.cat;
        this._selectedItem = null;
        this._render();
      });
    });

    // アイテムカードタップ → 詳細パネル表示
    const itemCards = this._container.querySelectorAll('.build-item-card');
    itemCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.itemId;
        this._selectedItem = this._selectedItem === id ? null : id;
        this._render();
      });
    });

    // クラフトボタン
    const craftBtn = this._container.querySelector('.build-craft-btn');
    if (craftBtn) {
      craftBtn.addEventListener('click', () => {
        const itemId = craftBtn.dataset.itemId;
        this._doCraft(itemId);
      });
    }

    // 配置ボタン
    const placeBtn = this._container.querySelector('.build-place-btn');
    if (placeBtn) {
      placeBtn.addEventListener('click', () => {
        const itemId = placeBtn.dataset.itemId;
        this._doPlace(itemId);
      });
    }
  }

  // ─────────────────────────────────────────────
  // クラフト処理
  // ─────────────────────────────────────────────

  _doCraft(itemId) {
    const result = HouseManager.craft(itemId);
    if (result.success) {
      this._craftResult = {
        success: true,
        message: `✨ クラフト成功！`,
      };
      Logger.info(`[HouseBuildScreen] クラフト: ${itemId}`);
    } else {
      this._craftResult = {
        success: false,
        message: result.reason || 'クラフトできませんでした',
      };
    }
    this._render();

    // トースト自動非表示
    setTimeout(() => {
      this._craftResult = null;
      this._render();
    }, 2500);
  }

  // ─────────────────────────────────────────────
  // 配置処理
  // ─────────────────────────────────────────────

  _doPlace(itemId) {
    const item = getItemById(itemId);
    if (!item) return;

    let placed = false;
    const target = this._editTarget;

    if (this._category === 'style') {
      // 外観スタイル変更
      placed = HouseManager.setExteriorStyle(itemId);

    } else if (this._category === 'wallpaper') {
      const floor = target?.floor || this._mode;
      if (floor === 'floor1') placed = HouseManager.setFloor1Wallpaper(itemId);
      else if (floor === 'floor2') {
        GameStore.setState('house.floor2.wallpaper', itemId);
        placed = true;
      } else if (floor === 'floor3') {
        GameStore.setState('house.floor3.wallpaper', itemId);
        placed = true;
      }

    } else if (this._category === 'floor') {
      const floor = target?.floor || this._mode;
      if (floor === 'floor1') placed = HouseManager.setFloor1Floor(itemId);
      else if (floor === 'floor2') {
        GameStore.setState('house.floor2.floor', itemId);
        placed = true;
      } else if (floor === 'floor3') {
        GameStore.setState('house.floor3.floor', itemId);
        placed = true;
      }

    } else if (this._category === 'furniture') {
      const floor = target?.floor || this._mode;
      // 空きスロットに自動配置
      const furniture = [...(GameStore.getState(`house.${floor}.furniture`) || [])];
      const emptyIdx = target?.slot !== undefined ? target.slot : furniture.findIndex(s => s === null);
      if (emptyIdx >= 0) {
        placed = HouseManager.setFurniture(floor, emptyIdx, itemId);
      } else {
        this._craftResult = { success: false, message: 'スロットがいっぱいです' };
        this._render();
        return;
      }

    } else if (this._category === 'garden') {
      const furniture = [...(GameStore.getState('house.garden.decorations') || [])];
      const emptyIdx = target?.slot !== undefined ? target.slot : furniture.findIndex(s => s === null);
      if (emptyIdx >= 0) {
        placed = HouseManager.setGardenDeco(emptyIdx, itemId);
      } else {
        this._craftResult = { success: false, message: 'スロットがいっぱいです' };
        this._render();
        return;
      }

    } else if (this._category === 'deco') {
      // 外観装飾 slotはアイテムのslotプロパティを使う
      const decoItem = getItemById(itemId);
      if (decoItem?.slot) {
        placed = HouseManager.setExteriorDeco(decoItem.slot, itemId);
      }

    } else if (this._category === 'tower') {
      const decos = [...(GameStore.getState('house.tower.decorations') || [])];
      const emptyIdx = target?.slot !== undefined ? target.slot : decos.findIndex(s => s === null);
      if (emptyIdx >= 0) {
        placed = HouseManager.setTowerDeco(emptyIdx, itemId);
      }
    }

    if (placed) {
      this._craftResult = { success: true, message: 'かざりました！🏠' };
      this._editTarget = null;
    } else {
      this._craftResult = { success: false, message: 'おけませんでした' };
    }

    this._render();
    setTimeout(() => {
      this._craftResult = null;
      this._render();
    }, 2000);
  }
}

export default HouseBuildScreen;
