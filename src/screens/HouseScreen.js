/**
 * HouseScreen.js - Grimoire Guardians
 * 家ビルドシステム メイン画面 v3.1
 *
 * 変更点（v2→v3.1）:
 *  - 全景ビューを「レイヤースタイル合成」表示に刷新
 *  - 装飾レイヤー（oーバーレイ）の CSS アニメーション適用
 *  - フルセットボーナス（2〜6レイヤー一致）の段階演出
 *  - コンボ名バッジ表示
 *  - 📷 マイハウス写真館ボタン追加
 *  - セクション解放＋スタイル解放の祝福モーダル統合
 *
 * @version 3.1
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import { getItemById } from '../data/houseItems.js';
import { getStyleById } from '../data/styleItems.js';

// ビューモード
const VIEW = {
  OVERVIEW:   'overview',
  GARDEN:     'garden',
  FLOOR1:     'floor1',
  FLOOR2:     'floor2',
  FLOOR3:     'floor3',
  TOWER:      'tower',
  DECORATION: 'decoration',
};

const LAYER_LABELS = {
  garden:     'にわ・どだい',
  floor1:     '1かい',
  floor2:     '2かい',
  floor3:     '3かい',
  tower:      'てっぺん',
  decoration: 'そうしょく',
};

/** レイヤー表示順（全景：上から下） */
const LAYER_ORDER_TOP = ['tower', 'floor3', 'floor2', 'floor1', 'garden'];

export class HouseScreen {
  constructor() {
    this._view = VIEW.OVERVIEW;
    this._container = null;
    this._element = null;
    this._unsubscribe = null;
    this._celebrationQueue = [];
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;
    this._view = VIEW.OVERVIEW;

    // セクション解放チェック
    const { newSections, newMilestones } = HouseManager.checkProgressUnlocks();

    // スタイル解放チェック（v3.1追加）
    const newStyles = HouseManager.checkAndUnlockStyles();

    if (newSections.length > 0 || newMilestones.length > 0 || newStyles.length > 0) {
      this._celebrationQueue = [
        ...newSections.map(s => ({ type: 'section', sectionId: s })),
        ...newMilestones.map(m => ({ type: 'milestone', milestone: m })),
        ...newStyles.map(sid => ({ type: 'style', styleId: sid })),
      ];
    }

    this._render();

    this._unsubscribe = GameStore.subscribe((state, path) => {
      if (path && (path.startsWith('house') || path.startsWith('inventory'))) {
        this._render();
      }
    });

    if (this._celebrationQueue.length > 0) {
      setTimeout(() => this._showNextCelebration(), 600);
    }

    Logger.info('[HouseScreen] v3.1 表示');
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────────
  // 解放演出
  // ─────────────────────────────────────────────

  _showNextCelebration() {
    if (!this._celebrationQueue.length || !this._container) return;
    const item = this._celebrationQueue.shift();

    const overlay = document.createElement('div');
    overlay.className = 'house-celebration-overlay';

    if (item.type === 'section') {
      const label = LAYER_LABELS[item.sectionId] || item.sectionId;
      overlay.innerHTML = `
        <div class="celebration-card">
          <div class="celebration-burst">🎊</div>
          <h2 class="celebration-title">かいほう！</h2>
          <p class="celebration-body">「<strong>${label}</strong>」が<br>あたらしく解放されました！</p>
          <p class="celebration-sub">タップしてとじる</p>
        </div>`;
    } else if (item.type === 'milestone') {
      const m = item.milestone;
      overlay.innerHTML = `
        <div class="celebration-card milestone-card">
          <div class="celebration-burst">🎁</div>
          <h2 class="celebration-title">マイルストーン！</h2>
          <p class="celebration-body">${m.message.replace(/\n/g, '<br>')}</p>
          <p class="celebration-sub">タップしてとじる</p>
        </div>`;
    } else if (item.type === 'style') {
      const style = getStyleById(item.styleId);
      overlay.innerHTML = `
        <div class="celebration-card style-unlock-card">
          <div class="celebration-burst" style="font-size:3rem">${style?.emoji || '🏠'}</div>
          <h2 class="celebration-title">スタイル解放！</h2>
          <p class="celebration-body">「<strong>${style?.name || item.styleId}</strong>」を<br>つかえるようになった！</p>
          <p class="celebration-tier">${this._tierLabel(style?.tier)}</p>
          <p class="celebration-sub">タップしてとじる</p>
        </div>`;
    }

    overlay.addEventListener('click', () => {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.remove();
        if (this._celebrationQueue.length > 0) {
          setTimeout(() => this._showNextCelebration(), 400);
        }
      }, 400);
    });

    this._container.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));
  }

  _tierLabel(tier) {
    const labels = { basic: '🟤 ベーシック', special: '🔵 スペシャル', legend: '🟣 レジェンド' };
    return labels[tier] || '';
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;
    const house = GameStore.getState('house');
    const { matchCount, comboName, bonus } = HouseManager.getFullsetBonus();
    const collection  = HouseManager.getCollectionRate();
    const nextSection = HouseManager.getNextSectionToUnlock();
    const nextMilestone = HouseManager.getNextMilestone();

    // フルセットボーナスクラス
    const bonusClass = bonus ? `house-fullset-${bonus.effect.replace(/_/g, '-')}` : '';

    if (this._element) this._element.remove();
    const _tmp = document.createElement('div');
    _tmp.innerHTML = `
      <div class="house-screen">
        ${this._renderHeader()}
        <div class="house-view-area">
          ${this._view === VIEW.OVERVIEW
            ? this._renderOverview(house, comboName, bonus, bonusClass)
            : this._renderSectionDetail(house)
          }
        </div>
        ${this._renderFooter(collection, nextSection, nextMilestone, matchCount, comboName)}
      </div>
    `;
    this._element = _tmp.firstElementChild;
    this._container.appendChild(this._element);

    this._bindEvents();
  }

  _renderHeader() {
    const isOverview = this._view === VIEW.OVERVIEW;
    return `
      <div class="house-header">
        <button class="btn-icon house-back-btn" aria-label="${isOverview ? 'もどる' : 'ぜんけい'}">
          ${isOverview ? '←' : '🏠'}
        </button>
        <h2 class="house-title">🏠 グリモアのいえ</h2>
        <div class="house-header-actions">
          <button class="btn-icon house-photo-btn" aria-label="しゃしんをとる" title="マイハウス写真館">
            📷
          </button>
          <button class="btn btn-small btn-warning house-craft-btn">
            🎨 スタイル
          </button>
        </div>
      </div>
    `;
  }

  // ─── 全景ビュー（v3.1 刷新） ─────────────────

  _renderOverview(house, comboName, bonus, bonusClass) {
    const sections   = house.sections || {};
    const layerStyles = house.layerStyles || {};
    const cleared    = HouseManager._getClearedWorldCount();

    // レイヤーを上から下へ積み上げ
    const rows = LAYER_ORDER_TOP.map(id => {
      return this._renderLayerRow(id, sections, layerStyles, cleared, house);
    });

    // 装飾レイヤー（オーバーレイ）
    const decoRow = this._renderDecoLayer(sections, layerStyles, cleared);

    // ビジュアル家画像パネル（PNG画像がある場合のみ表示）
    const visualPanel = this._renderVisualHouse(sections, layerStyles);

    return `
      <div class="house-overview ${bonusClass}" id="house-overview-root">
        <!-- コンボ名バッジ -->
        ${comboName ? `
          <div class="house-combo-badge house-fullset-badge">
            ✨ ${comboName}
          </div>
        ` : ''}

        <!-- ビジュアル家パネル -->
        ${visualPanel}

        <!-- レイヤー積み上げ -->
        <div class="house-layers-stack">
          ${rows.join('')}
        </div>

        <!-- 装飾レイヤー（全体オーバーレイ） -->
        ${decoRow}
      </div>
    `;
  }

  /**
   * ビジュアル家画像パネルを描画する
   * 各レイヤーの style_wood / style_ice 等の layerImages PNG を縦積みで表示。
   * 画像が未配置のスタイルは何も表示しない（絵文字バーが代替として機能する）。
   *
   * @param {Object} sections   - セクション解放状態
   * @param {Object} layerStyles - レイヤーIDごとのスタイルID
   * @returns {string} HTML文字列
   */
  _renderVisualHouse(sections, layerStyles) {
    const imgs = LAYER_ORDER_TOP.map(id => {
      const isUnlocked = id === 'floor1' || sections[id];
      if (!isUnlocked) return '';

      const styleId = layerStyles[id] || 'style_wood';
      const style   = getStyleById(styleId);
      const imgPath = style?.layerImages?.[id];
      if (!imgPath) return '';

      return `<img class="house-visual-img" src="${imgPath}" alt="${id}" loading="lazy"
                   onerror="this.closest('.house-visual-panel')?.remove()">`;
    }).filter(Boolean);

    if (imgs.length === 0) return '';

    return `
      <div class="house-visual-panel">
        <div class="house-visual-stack">
          ${imgs.join('')}
        </div>
      </div>
    `;
  }

  _renderLayerRow(id, sections, layerStyles, cleared, house) {
    const unlocked = id === 'floor1' || sections[id];
    const unlockAt = Config.HOUSE.SECTION_UNLOCK_WORLDS[id] || 0;
    const remaining = Math.max(0, unlockAt - cleared);

    if (!unlocked) {
      return `
        <div class="house-layer-row locked" data-section="${id}">
          <div class="layer-row-inner">
            <span class="layer-lock">🔒</span>
            <span class="layer-name">${LAYER_LABELS[id]}</span>
            <span class="layer-unlock-hint">あと${remaining}ワールドで解放！</span>
          </div>
        </div>
      `;
    }

    const styleId = layerStyles[id] || 'style_wood';
    const style   = getStyleById(styleId);
    const emoji   = style?.layerEmoji?.[id] || style?.emoji || '🏠';
    const color   = style?.color || '#a0522d';
    const colorDk = style?.colorDark || '#6b3a1f';

    // 内部アイテムチップ（家具など）
    const floorData = house[id] || {};
    const furniture = (floorData.furniture || []).filter(Boolean).slice(0, 4);
    const itemChips = furniture.map(itemId => {
      const item = getItemById(itemId);
      return item ? `<span class="overview-item-chip" title="${item.name}">${item.imageFallback}</span>` : '';
    }).join('');

    return `
      <div class="house-layer-row unlocked" data-section="${id}"
           style="background: linear-gradient(135deg, ${color}, ${colorDk});"
           role="button" tabindex="0">
        <div class="layer-row-left">
          <span class="layer-style-emoji">${emoji}</span>
          <div class="layer-info">
            <span class="layer-name">${LAYER_LABELS[id]}</span>
            <span class="layer-style-name">${style?.name || ''}</span>
          </div>
        </div>
        <div class="layer-row-right">
          ${itemChips || `<span class="layer-empty-hint">→ くわしく</span>`}
          <button class="layer-style-btn" data-section="${id}" title="スタイルをかえる">🎨</button>
        </div>
      </div>
    `;
  }

  _renderDecoLayer(sections, layerStyles, cleared) {
    const unlocked = sections.exterior;
    const unlockAt = Config.HOUSE.SECTION_UNLOCK_WORLDS.exterior || 13;

    if (!unlocked) {
      const remaining = Math.max(0, unlockAt - cleared);
      return `
        <div class="house-deco-overlay-row locked">
          <span class="deco-lock">🔒 そうしょくレイヤー あと${remaining}ワールドで解放！</span>
        </div>
      `;
    }

    const styleId = layerStyles.decoration;
    const style   = getStyleById(styleId);

    return `
      <div class="house-deco-overlay-row unlocked" data-section="decoration" role="button">
        <div class="deco-overlay-preview ${style?.decoAnimClass || ''}">
          <span class="deco-emoji">${style?.emoji || '✨'}</span>
          <span class="deco-label">そうしょく: ${style?.name || '（なし）'}</span>
          <span class="deco-desc">${style?.decoDesc || 'スタイルをえらぼう！'}</span>
          <button class="layer-style-btn" data-section="decoration">🎨</button>
        </div>
      </div>
    `;
  }

  // ─── セクション詳細ビュー ─────────────────────

  _renderSectionDetail(house) {
    return `
      <div class="section-detail-view">
        ${this._renderSectionTabs(house)}
        <div class="section-detail-content">
          ${this._renderCurrentSection(house)}
        </div>
      </div>
    `;
  }

  _renderSectionTabs(house) {
    const order = ['garden', 'floor1', 'floor2', 'floor3', 'tower', 'decoration'];
    const tabs = order.map(id => {
      const unlocked = id === 'floor1' || house.sections[id];
      const active   = this._view === id;
      return `
        <button class="house-tab-btn ${active ? 'active' : ''} ${!unlocked ? 'locked' : ''}"
                data-section="${id}" ${!unlocked ? 'disabled' : ''}>
          ${!unlocked ? '🔒 ' : ''}${LAYER_LABELS[id] || id}
        </button>
      `;
    }).join('');
    return `<div class="house-tabs">${tabs}</div>`;
  }

  _renderCurrentSection(house) {
    switch (this._view) {
      case VIEW.DECORATION: return this._renderDecoSection(house);
      case VIEW.GARDEN:     return this._renderGardenSection(house);
      case VIEW.FLOOR1:     return this._renderFloorSection(house, 'floor1');
      case VIEW.FLOOR2:     return this._renderFloorSection(house, 'floor2');
      case VIEW.FLOOR3:     return this._renderFloorSection(house, 'floor3', true);
      case VIEW.TOWER:      return this._renderTowerSection(house);
      default:              return '';
    }
  }

  _renderDecoSection(house) {
    const styleId = house.layerStyles?.decoration;
    const style   = getStyleById(styleId);
    return `
      <div class="house-deco-detail-view">
        <div class="deco-preview-big ${style?.decoAnimClass || ''}">
          <span style="font-size:4rem">${style?.emoji || '✨'}</span>
          <p class="deco-name">${style?.name || 'そうしょくなし'}</p>
          <p class="deco-desc-detail">${style?.decoDesc || 'スタイルをえらんでそうしょくをつけよう！'}</p>
        </div>
        <button class="btn btn-large btn-warning house-craft-btn">
          🎨 スタイルをかえる
        </button>
      </div>
    `;
  }

  _renderGardenSection(house) {
    const count = HouseManager.getGardenSlotCount();
    const decos = [...(house.garden?.decorations || [])];
    while (decos.length < count) decos.push(null);

    const slots = decos.slice(0, count).map((id, i) => {
      const item = id ? getItemById(id) : null;
      return `
        <div class="house-garden-slot" data-slot="${i}" data-type="garden_deco">
          ${item
            ? `<span class="slot-fallback">${item.imageFallback}</span>`
            : `<span class="slot-empty-icon">＋</span>`
          }
        </div>`;
    }).join('');

    const monsterSlots = (house.garden?.monsters || [null,null,null]).map((id, i) => `
      <div class="house-monster-slot" data-slot="${i}" data-type="garden_monster">
        ${id ? `<span style="font-size:1.5rem">👾</span>` : `<span class="slot-empty-icon">🐾</span>`}
      </div>`).join('');

    return `
      <div class="house-garden-view">
        <div class="garden-deco-grid" style="grid-template-columns:repeat(4,1fr)">${slots}</div>
        <div class="garden-monster-row">
          <span class="garden-monster-label">なかまモンスター</span>${monsterSlots}
        </div>
      </div>`;
  }

  _renderFloorSection(house, key, isSpecial = false) {
    const data  = house[key] || {};
    const count = key === 'floor1'
      ? HouseManager.getFloor1SlotCount()
      : (Config.HOUSE.SECTION_SLOTS[`${key}_furniture`] || 8);
    const furniture = [...(data.furniture || [])];
    while (furniture.length < count) furniture.push(null);

    const wp = data.wallpaper ? getItemById(data.wallpaper) : null;
    const fl = data.floor     ? getItemById(data.floor)     : null;

    const slots = furniture.slice(0, count).map((id, i) => {
      const item = id ? getItemById(id) : null;
      return `
        <div class="house-furniture-slot${isSpecial ? ' special' : ''}"
             data-slot="${i}" data-floor="${key}" data-type="furniture">
          ${item
            ? `<span class="slot-fallback">${item.imageFallback}</span>`
            : `<span class="slot-empty-icon">＋</span>`
          }
        </div>`;
    }).join('');

    return `
      <div class="house-floor-view">
        <div class="room-bg-info">
          <span class="room-wallpaper-badge" data-type="wallpaper" data-floor="${key}">
            🖼️ ${wp ? wp.name : 'しろかべ'}
          </span>
          <span class="room-floor-badge" data-type="floor_item" data-floor="${key}">
            🟫 ${fl ? fl.name : 'きのゆか'}
          </span>
        </div>
        <div class="house-furniture-grid ${isSpecial ? 'grid-3col' : 'grid-4col'}">${slots}</div>
      </div>`;
  }

  _renderTowerSection(house) {
    const slots = (house.tower?.decorations || [null,null,null,null]).map((id, i) => {
      const item = id ? getItemById(id) : null;
      return `
        <div class="house-tower-slot" data-slot="${i}" data-type="tower_deco">
          ${item
            ? `<span class="tower-item-emoji">${item.imageFallback}</span>`
            : `<span class="slot-empty-icon">✦</span>`
          }
        </div>`;
    }).join('');

    return `
      <div class="house-tower-view">
        <div class="tower-star-bg">✨</div>
        <div class="house-tower-grid">${slots}</div>
        <p class="tower-legend-text">🌟 でんせつのとう 🌟</p>
      </div>`;
  }

  // ─────────────────────────────────────────────
  // フッター
  // ─────────────────────────────────────────────

  _renderFooter(collection, nextSection, nextMilestone, matchCount, comboName) {
    const pct = collection.total > 0
      ? Math.min(100, Math.floor((collection.crafted / collection.total) * 100))
      : 0;

    // ヒント
    const hints = [];
    if (nextSection)   hints.push({ r: nextSection.remaining,   text: `あと${nextSection.remaining}ワールドで「${LAYER_LABELS[nextSection.sectionId] || nextSection.sectionId}」解放！` });
    if (nextMilestone) hints.push({ r: nextMilestone.remaining, text: `あと${nextMilestone.remaining}ワールドでサプライズ！🎁` });
    hints.sort((a, b) => a.r - b.r);
    const hintHtml = hints.length > 0 ? `<div class="house-next-hint">✨ ${hints[0].text}</div>` : '';

    // フルセット状況
    let fullsetHtml = '';
    if (matchCount >= 2) {
      const bonuses = Config.HOUSE.FULLSET_BONUSES || [];
      const next = bonuses.find(b => b.layers > matchCount);
      fullsetHtml = `
        <div class="house-fullset-status">
          ${matchCount}レイヤー一致！
          ${next ? `あと${next.layers - matchCount}で次の演出` : '🏆 MAXボーナス！'}
        </div>
      `;
    }

    return `
      <div class="house-footer">
        <div class="house-collection-bar">
          <span class="collection-label">🏠 コレクション</span>
          <div class="collection-progress">
            <div class="collection-fill" style="width:${pct}%"></div>
          </div>
          <span class="collection-count">${collection.crafted}/${collection.total}</span>
        </div>
        ${fullsetHtml}
        ${hintHtml}
      </div>`;
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._container) return;

    // もどる / 全景に戻る
    this._container.querySelector('.house-back-btn')?.addEventListener('click', () => {
      if (this._view === VIEW.OVERVIEW) {
        GameStore.setState('app.currentScreen', 'bookshelf');
      } else {
        this._view = VIEW.OVERVIEW;
        this._render();
      }
    });

    // 📷 写真館
    this._container.querySelector('.house-photo-btn')?.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'photo');
    });

    // スタイル変更ボタン（合成屋→スタイルタブへ）
    this._container.querySelector('.house-craft-btn')?.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'house_build');
      GameStore.setState('app.houseBuildMode', 'style');
    });

    // 全景：レイヤー行タップ → 詳細へ
    this._container.querySelectorAll('.house-layer-row.unlocked').forEach(el => {
      el.addEventListener('click', (e) => {
        // 🎨ボタンへのバブルアップは除外
        if (e.target.closest('.layer-style-btn')) return;
        this._view = el.dataset.section;
        this._render();
      });
    });

    // 装飾レイヤー行タップ
    this._container.querySelector('.house-deco-overlay-row.unlocked')?.addEventListener('click', (e) => {
      if (e.target.closest('.layer-style-btn')) return;
      this._view = VIEW.DECORATION;
      this._render();
    });

    // 🎨ボタン → スタイル選択画面へ（該当レイヤーを引き継ぐ）
    this._container.querySelectorAll('.layer-style-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const section = btn.dataset.section;
        GameStore.setState('app.currentScreen', 'house_build');
        GameStore.setState('app.houseBuildMode', 'style');
        GameStore.setState('app.styleTargetLayer', section);
      });
    });

    // セクションタブ
    this._container.querySelectorAll('.house-tab-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        this._view = btn.dataset.section;
        this._render();
      });
    });

    // スロットタップ → 合成屋（配置モード）へ
    this._container.querySelectorAll('[data-type]').forEach(slot => {
      slot.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'craftsman');
        GameStore.setState('app.craftsmanMode', 'place');
        GameStore.setState('app.craftsmanTarget', {
          type:  slot.dataset.type,
          slot:  parseInt(slot.dataset.slot ?? '0', 10),
          floor: slot.dataset.floor || this._view,
        });
      });
    });
  }
}

export default HouseScreen;
