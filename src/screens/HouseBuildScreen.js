/**
 * HouseBuildScreen.js - Grimoire Guardians
 * 家ビルドシステム 編集・クラフト・スタイル変更画面 v3.1
 *
 * v3.1 変更点:
 *  - スタイル選択タブ追加（全レイヤー独立選択）
 *  - プレビューモード（素材を使う前に見た目を確認）
 *  - スタイルカテゴリーがデフォルト表示になるルーティング対応
 *  - 装飾レイヤーのスタイル選択対応
 *
 * @version 3.1
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import {
  getItemById,
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
import { HOUSE_STYLES, getStyleById } from '../data/styleItems.js';

// 素材絵文字マップ
const MATERIAL_EMOJI = {
  wood: '🪵', stone: '🪨', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};

// レアリティ色クラス
const RARITY_CLASS = {
  [RARITY.COMMON]:     'rarity-common',
  [RARITY.UNCOMMON]:   'rarity-uncommon',
  [RARITY.RARE]:       'rarity-rare',
  [RARITY.SUPER_RARE]: 'rarity-super-rare',
};

/** スタイル対象レイヤー一覧 */
const STYLE_LAYERS = [
  { id: 'garden',     label: 'にわ' },
  { id: 'floor1',     label: '1かい' },
  { id: 'floor2',     label: '2かい' },
  { id: 'floor3',     label: '3かい' },
  { id: 'tower',      label: 'てっぺん' },
  { id: 'decoration', label: 'そうしょく' },
];

/** アイテムカテゴリー定義 */
const MODE_CATEGORIES = {
  style: [
    { id: 'style', label: 'スタイル', items: () => [] }, // 動的に生成
  ],
  garden: [
    { id: 'garden', label: 'デコ', items: () => GARDEN_ITEMS },
  ],
  floor1: [
    { id: 'furniture', label: 'かぐ',    items: () => FURNITURE_ITEMS_FLOOR1 },
    { id: 'wallpaper', label: 'かべがみ', items: () => WALLPAPER_ITEMS },
    { id: 'floor',     label: 'ゆか',     items: () => FLOOR_ITEMS },
  ],
  floor2: [
    { id: 'furniture', label: 'かぐ',    items: () => FURNITURE_ITEMS_FLOOR2 },
    { id: 'wallpaper', label: 'かべがみ', items: () => WALLPAPER_ITEMS },
    { id: 'floor',     label: 'ゆか',     items: () => FLOOR_ITEMS },
  ],
  floor3: [
    { id: 'furniture', label: 'かぐ', items: () => FURNITURE_ITEMS_FLOOR3 },
  ],
  tower: [
    { id: 'tower', label: 'かざり', items: () => TOWER_ITEMS },
  ],
};

export class HouseBuildScreen {
  constructor() {
    this._container  = null;
    this._element    = null;
    this._mode       = 'style';      // 編集モード
    this._category   = 'style';     // アイテムカテゴリー
    this._editTarget = null;
    this._selectedItem = null;
    this._craftResult  = null;

    // スタイル選択関連
    this._styleTargetLayer = 'floor1';  // どのレイヤーのスタイルを選ぶか
    this._previewStyle     = null;      // プレビュー中のスタイルID（null = 適用前）
    this._unsubscribe = null;
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;

    this._mode       = GameStore.getState('app.houseBuildMode') || 'style';
    this._editTarget = GameStore.getState('app.houseEditTarget') || null;

    // スタイル対象レイヤーを引き継ぐ
    const targetLayer = GameStore.getState('app.styleTargetLayer');
    if (targetLayer) {
      this._styleTargetLayer = targetLayer;
    }

    // カテゴリーをモードに応じて初期化
    if (this._mode === 'style') {
      this._category = 'style';
    } else {
      const cats = MODE_CATEGORIES[this._mode] || MODE_CATEGORIES.floor1;
      this._category = cats[0]?.id || 'furniture';
    }

    this._previewStyle = null;
    this._render();
    Logger.info('[HouseBuildScreen] v3.1 表示: mode=' + this._mode);
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    GameStore.setState('app.houseBuildMode', null);
    GameStore.setState('app.houseEditTarget', null);
    GameStore.setState('app.styleTargetLayer', null);
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;
    if (this._element) this._element.remove();
    const materials = GameStore.getState('inventory.materials') || {};
    const house     = GameStore.getState('house');

    const _tmp = document.createElement('div');
    _tmp.innerHTML = `
      <div class="house-build-screen">
        ${this._renderHeader(materials)}
        ${this._mode === 'style'
          ? this._renderStyleMode(house)
          : this._renderItemMode(materials, house)
        }
        ${this._craftResult ? this._renderCraftResult() : ''}
      </div>
    `;
    this._element = _tmp.firstElementChild;
    this._container.appendChild(this._element);

    this._bindEvents();
  }

  _renderHeader(materials) {
    const matDisplay = ['wood','stone','brick','gem','star_fragment']
      .map(id => `<span class="mat-chip">${MATERIAL_EMOJI[id]}${materials[id] || 0}</span>`)
      .join('');

    return `
      <div class="build-header">
        <button class="btn-icon build-back-btn" aria-label="もどる">←</button>
        <div class="build-header-center">
          ${this._mode === 'style' ? '🎨 スタイルえらび' : '🔨 かぐとかざり'}
        </div>
        <div class="build-materials-row">${matDisplay}</div>
      </div>
    `;
  }

  // ─── スタイル選択モード ────────────────────────

  _renderStyleMode(house) {
    const sections      = house.sections || {};
    const layerStyles   = house.layerStyles || {};
    const unlockedStyles = house.unlockedStyles || ['style_wood'];

    // レイヤータブ（解放済みのみ）
    const layerTabs = STYLE_LAYERS.map(l => {
      const unlocked = l.id === 'floor1' || sections[l.id] ||
        (l.id === 'decoration' && sections.exterior);
      if (!unlocked) return '';
      const active = this._styleTargetLayer === l.id;
      return `
        <button class="style-layer-tab ${active ? 'active' : ''}"
                data-layer="${l.id}">
          ${l.label}
        </button>
      `;
    }).join('');

    // 現在適用中スタイル
    const currentStyleId = layerStyles[this._styleTargetLayer] || 'style_wood';
    const currentStyle   = getStyleById(currentStyleId);

    // プレビュー中スタイル（あれば上書き表示）
    const previewStyleId = this._previewStyle || currentStyleId;
    const previewStyle   = getStyleById(previewStyleId);

    // スタイルカード一覧
    const styleCards = HOUSE_STYLES.map(style => {
      const owned   = unlockedStyles.includes(style.id);
      const active  = style.id === previewStyleId;
      const isCurrent = style.id === currentStyleId;
      const tierLabel = { basic: 'ベーシック', special: 'スペシャル', legend: 'レジェンド' };
      return `
        <div class="style-card ${active ? 'selected' : ''} ${!owned ? 'style-locked' : ''}
             style-tier-${style.tier}"
             data-style-id="${style.id}"
             style="--style-color:${style.color}; --style-dark:${style.colorDark};"
             role="button" tabindex="${owned ? '0' : '-1'}">
          <div class="style-card-preview" style="background:linear-gradient(135deg, ${style.color}, ${style.colorDark})">
            <span class="style-card-emoji">${style.layerEmoji?.[this._styleTargetLayer] || style.emoji}</span>
            ${isCurrent && !active ? '<span class="style-current-badge">いま</span>' : ''}
            ${active ? '<span class="style-selected-badge">✓</span>' : ''}
          </div>
          <div class="style-card-info">
            <span class="style-card-name">${style.name}</span>
            <span class="style-card-tier">${!owned ? `🔒 W${style.unlockWorld}〜` : tierLabel[style.tier] || ''}</span>
          </div>
        </div>
      `;
    }).join('');

    // プレビューエリア（家の全景ミニプレビュー）
    const previewHtml = this._renderStylePreview(house, previewStyle, previewStyleId);

    return `
      <div class="style-mode-layout">

        <!-- プレビューエリア -->
        <div class="style-preview-area">
          ${previewHtml}
          <div class="style-preview-label">
            ${previewStyle ? `${previewStyle.emoji} ${previewStyle.name}` : ''}
            ${this._previewStyle ? '<span class="preview-badge">プレビュー</span>' : ''}
          </div>
        </div>

        <!-- レイヤータブ -->
        <div class="style-layer-tabs">
          ${layerTabs}
        </div>

        <!-- スタイルグリッド -->
        <div class="style-card-grid">
          ${styleCards}
        </div>

        <!-- 適用・キャンセルボタン -->
        ${this._previewStyle ? `
          <div class="style-apply-row">
            <button class="btn btn-large btn-success style-apply-btn">
              ✅ これにする！
            </button>
            <button class="btn btn-large btn-secondary style-cancel-btn">
              やめる
            </button>
          </div>
        ` : ''}

      </div>
    `;
  }

  /** ミニプレビュー: 現在の家 + previewStyle を反映したレイヤー */
  _renderStylePreview(house, previewStyle, previewStyleId) {
    const sections    = house.sections || {};
    const layerStyles = { ...house.layerStyles || {} };
    // プレビュー対象レイヤーだけ上書き
    if (previewStyle) {
      layerStyles[this._styleTargetLayer] = previewStyleId;
    }

    const layerOrder = ['garden', 'floor1', 'floor2', 'floor3', 'tower'].filter(id =>
      id === 'floor1' || sections[id]
    );

    const layers = layerOrder.map(id => {
      const sid   = layerStyles[id] || 'style_wood';
      const style = getStyleById(sid);
      const emoji = style?.layerEmoji?.[id] || style?.emoji || '🏠';
      const color = style?.color || '#a0522d';
      const colorDk = style?.colorDark || '#6b3a1f';
      const isTarget = id === this._styleTargetLayer;
      return `
        <div class="preview-layer ${isTarget ? 'preview-layer-target' : ''}"
             style="background:linear-gradient(135deg, ${color}, ${colorDk})">
          <span class="preview-layer-emoji">${emoji}</span>
        </div>
      `;
    }).reverse();

    // 装飾オーバーレイ
    let decoOverlay = '';
    if (sections.exterior) {
      const decoId  = layerStyles.decoration;
      const decStyle = decoId ? getStyleById(decoId) : null;
      const isDecoTarget = this._styleTargetLayer === 'decoration';
      if (decStyle || isDecoTarget) {
        decoOverlay = `
          <div class="preview-deco-overlay ${decStyle?.decoAnimClass || ''} ${isDecoTarget ? 'preview-layer-target' : ''}">
            ${decStyle?.emoji || '✨'}
          </div>
        `;
      }
    }

    return `
      <div class="style-preview-house">
        ${layers.join('')}
        ${decoOverlay}
      </div>
    `;
  }

  // ─── アイテムモード（既存） ───────────────────

  _renderItemMode(materials, house) {
    const categories = MODE_CATEGORIES[this._mode] || [];
    return `
      <div class="item-mode-layout">
        ${this._renderCategoryTabs(categories)}
        <div class="build-content">
          <div class="build-item-list">
            ${this._renderItemList(materials, house)}
          </div>
          ${this._selectedItem ? this._renderItemDetail(this._selectedItem, materials, house) : ''}
        </div>
      </div>
    `;
  }

  _renderCategoryTabs(categories) {
    const tabs = categories.map(cat => `
      <button class="build-cat-btn ${this._category === cat.id ? 'active' : ''}"
              data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join('');
    return `<div class="build-category-tabs">${tabs}</div>`;
  }

  _renderItemList(materials, house) {
    const cat = (MODE_CATEGORIES[this._mode] || []).find(c => c.id === this._category);
    if (!cat) return '<p class="build-empty">カテゴリーがありません</p>';
    const items = cat.items();
    if (!items || !items.length) return '<p class="build-empty">アイテムがありません</p>';

    const crafted = house.crafted || [];
    return items.map(item => {
      const isCrafted   = crafted.includes(item.id);
      const { craftable, missing } = HouseManager.checkCraftable(item.id);
      const isSelected  = this._selectedItem === item.id;
      const isDefault   = !item.recipe;

      let statusClass = '', statusBadge = '';
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
        const missingStr = Object.entries(missing)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ');
        statusBadge = `<span class="item-badge badge-locked">あと ${missingStr}</span>`;
      }

      return `
        <div class="build-item-card ${statusClass} ${isSelected ? 'selected' : ''} ${RARITY_CLASS[item.rarity] || ''}"
             data-item-id="${item.id}" role="button" tabindex="0">
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
    const crafted   = house.crafted || [];
    const isCrafted = crafted.includes(item.id);
    const isDefault = !item.recipe;
    const { craftable, missing } = HouseManager.checkCraftable(item.id);

    let recipeHtml = '';
    if (item.recipe) {
      const rows = Object.entries(item.recipe).map(([mat, req]) => {
        const have = materials[mat] || 0;
        return `<span class="recipe-row ${have >= req ? 'ok' : 'ng'}">${MATERIAL_EMOJI[mat]} ${have}/${req}</span>`;
      }).join('');
      recipeHtml = `<div class="item-recipe">${rows}</div>`;
    } else {
      recipeHtml = `<p class="item-recipe-free">むりょうでつかえます！</p>`;
    }

    const rarityLabels = {
      [RARITY.COMMON]: 'コモン', [RARITY.UNCOMMON]: 'アンコモン',
      [RARITY.RARE]: 'レア', [RARITY.SUPER_RARE]: 'ちょうレア！',
    };

    let actionBtn = '';
    if (isCrafted || isDefault) {
      actionBtn = `<button class="btn btn-large btn-success build-place-btn" data-item-id="${item.id}">✅ このへやにかざる</button>`;
    } else if (craftable) {
      actionBtn = `<button class="btn btn-large btn-warning build-craft-btn" data-item-id="${item.id}">🔨 つくる！</button>`;
    } else {
      const ms = Object.entries(missing).map(([m,n]) => `${MATERIAL_EMOJI[m]}あと${n}`).join('、');
      actionBtn = `<button class="btn btn-large btn-secondary" disabled>素材が足りない… (${ms})</button>`;
    }

    return `
      <div class="item-detail-panel">
        <div class="item-detail-header">
          <span class="detail-emoji">${item.imageFallback}</span>
          <div>
            <p class="detail-name">${item.name}</p>
            <p class="detail-rarity ${RARITY_CLASS[item.rarity] || ''}">${rarityLabels[item.rarity] || ''}</p>
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
      <div class="craft-result-toast ${success ? 'toast-success' : 'toast-error'}" role="alert">
        ${success ? '✨ ' : '❌ '}${message}
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._container) return;

    // もどる
    this._container.querySelector('.build-back-btn')?.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'house');
    });

    // ─── スタイルモード ───────────────────────
    if (this._mode === 'style') {
      // レイヤータブ切替
      this._container.querySelectorAll('.style-layer-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          this._styleTargetLayer = btn.dataset.layer;
          this._previewStyle = null;
          this._render();
        });
      });

      // スタイルカード選択（プレビュー）
      this._container.querySelectorAll('.style-card:not(.style-locked)').forEach(card => {
        card.addEventListener('click', () => {
          const sid = card.dataset.styleId;
          if (this._previewStyle === sid) {
            // もう一度タップしたら適用
            this._applyStyle(sid);
          } else {
            this._previewStyle = sid;
            this._render();
          }
        });
      });

      // 適用ボタン
      this._container.querySelector('.style-apply-btn')?.addEventListener('click', () => {
        if (this._previewStyle) {
          this._applyStyle(this._previewStyle);
        }
      });

      // キャンセルボタン
      this._container.querySelector('.style-cancel-btn')?.addEventListener('click', () => {
        this._previewStyle = null;
        this._render();
      });

    } else {
      // ─── アイテムモード ───────────────────────
      this._container.querySelectorAll('.build-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this._category = btn.dataset.cat;
          this._selectedItem = null;
          this._render();
        });
      });

      this._container.querySelectorAll('.build-item-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.itemId;
          this._selectedItem = this._selectedItem === id ? null : id;
          this._render();
        });
      });

      this._container.querySelector('.build-craft-btn')?.addEventListener('click', () => {
        this._doCraft(this._container.querySelector('.build-craft-btn').dataset.itemId);
      });

      this._container.querySelector('.build-place-btn')?.addEventListener('click', () => {
        this._doPlace(this._container.querySelector('.build-place-btn').dataset.itemId);
      });
    }
  }

  // ─────────────────────────────────────────────
  // スタイル適用
  // ─────────────────────────────────────────────

  _applyStyle(styleId) {
    const ok = HouseManager.setLayerStyle(this._styleTargetLayer, styleId);
    if (ok) {
      this._previewStyle = null;
      this._craftResult = { success: true, message: `スタイルをかえた！🎨` };
      this._render();
      setTimeout(() => { this._craftResult = null; this._render(); }, 2000);
    } else {
      this._craftResult = { success: false, message: 'スタイルをかえられませんでした' };
      this._render();
      setTimeout(() => { this._craftResult = null; this._render(); }, 2000);
    }
  }

  // ─────────────────────────────────────────────
  // クラフト処理
  // ─────────────────────────────────────────────

  _doCraft(itemId) {
    const result = HouseManager.craft(itemId);
    this._craftResult = result.success
      ? { success: true,  message: '✨ クラフト成功！' }
      : { success: false, message: result.reason || 'クラフトできませんでした' };
    this._render();
    setTimeout(() => { this._craftResult = null; this._render(); }, 2500);
  }

  // ─────────────────────────────────────────────
  // 配置処理
  // ─────────────────────────────────────────────

  _doPlace(itemId) {
    const item   = getItemById(itemId);
    if (!item) return;
    let placed = false;
    const target = this._editTarget;

    if (this._category === 'wallpaper') {
      const floor = target?.floor || this._mode;
      if (floor === 'floor1') placed = HouseManager.setFloor1Wallpaper(itemId);
      else { GameStore.setState(`house.${floor}.wallpaper`, itemId); placed = true; }

    } else if (this._category === 'floor') {
      const floor = target?.floor || this._mode;
      if (floor === 'floor1') placed = HouseManager.setFloor1Floor(itemId);
      else { GameStore.setState(`house.${floor}.floor`, itemId); placed = true; }

    } else if (this._category === 'furniture') {
      const floor = target?.floor || this._mode;
      const furniture = [...(GameStore.getState(`house.${floor}.furniture`) || [])];
      const idx = target?.slot !== undefined ? target.slot : furniture.findIndex(s => s === null);
      if (idx >= 0) { placed = HouseManager.setFurniture(floor, idx, itemId); }
      else { this._craftResult = { success: false, message: 'スロットがいっぱいです' }; this._render(); return; }

    } else if (this._category === 'garden') {
      const decos = [...(GameStore.getState('house.garden.decorations') || [])];
      const idx = target?.slot !== undefined ? target.slot : decos.findIndex(s => s === null);
      if (idx >= 0) { placed = HouseManager.setGardenDeco(idx, itemId); }
      else { this._craftResult = { success: false, message: 'スロットがいっぱいです' }; this._render(); return; }

    } else if (this._category === 'deco') {
      if (item?.slot) placed = HouseManager.setExteriorDeco(item.slot, itemId);

    } else if (this._category === 'tower') {
      const decos = [...(GameStore.getState('house.tower.decorations') || [])];
      const idx = target?.slot !== undefined ? target.slot : decos.findIndex(s => s === null);
      if (idx >= 0) placed = HouseManager.setTowerDeco(idx, itemId);
    }

    this._craftResult = placed
      ? { success: true,  message: 'かざりました！🏠' }
      : { success: false, message: 'おけませんでした' };
    this._editTarget = null;
    this._render();
    setTimeout(() => { this._craftResult = null; this._render(); }, 2000);
  }
}

export default HouseBuildScreen;
