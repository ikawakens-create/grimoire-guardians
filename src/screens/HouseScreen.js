/**
 * HouseScreen.js - Grimoire Guardians
 * 家ビルドシステム メイン画面
 *
 * ★ v2.0 改訂点:
 *  - デフォルト表示を「全景ビュー（家全体が見える）」に変更
 *  - セクション解放時に祝福アニメーションモーダルを表示
 *  - マイルストーン達成時の演出
 *  - 各セクションをタップすると詳細ビューに切替
 *
 * @version 2.0
 * @date 2026-02-26
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import { getItemById, HOUSE_SECTION } from '../data/houseItems.js';

// ビューモード
const VIEW = {
  OVERVIEW: 'overview',   // ★ 全景ビュー（デフォルト）
  EXTERIOR: 'exterior',
  GARDEN:   'garden',
  FLOOR1:   'floor1',
  FLOOR2:   'floor2',
  FLOOR3:   'floor3',
  TOWER:    'tower',
};

const SECTION_LABELS = {
  exterior: 'そとがわ',
  garden:   'にわ',
  floor1:   '1かい',
  floor2:   '2かい',
  floor3:   '3かい',
  tower:    'とう',
};

// セクションのアイコン（全景ビューで使う）
const SECTION_ICONS = {
  tower:    '🌟',
  floor3:   '✨',
  floor2:   '📚',
  floor1:   '🏠',
  exterior: '🎨',
  garden:   '🌸',
};

export class HouseScreen {
  constructor() {
    this._view = VIEW.OVERVIEW;
    this._container = null;
    this._unsubscribe = null;
    this._celebrationQueue = []; // 解放演出キュー
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;
    this._view = VIEW.OVERVIEW;

    // ワールドクリア後のセクション解放＋マイルストーンチェック
    const { newSections, newMilestones } = HouseManager.checkProgressUnlocks();
    if (newSections.length > 0 || newMilestones.length > 0) {
      this._celebrationQueue = [
        ...newSections.map(s => ({ type: 'section', sectionId: s })),
        ...newMilestones.map(m => ({ type: 'milestone', milestone: m })),
      ];
    }

    this._render();

    this._unsubscribe = GameStore.subscribe((state, path) => {
      if (path && (path.startsWith('house') || path.startsWith('inventory'))) {
        this._render();
      }
    });

    // 解放演出があれば少し待ってから表示
    if (this._celebrationQueue.length > 0) {
      setTimeout(() => this._showNextCelebration(), 600);
    }

    Logger.info('[HouseScreen] v2 表示');
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    if (this._container) this._container.innerHTML = '';
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
      const label = SECTION_LABELS[item.sectionId] || item.sectionId;
      const icon  = SECTION_ICONS[item.sectionId] || '🎉';
      overlay.innerHTML = `
        <div class="celebration-card">
          <div class="celebration-burst">${icon}</div>
          <h2 class="celebration-title">かいほう！</h2>
          <p class="celebration-body">「<strong>${label}</strong>」が<br>あたらしく解放されました！</p>
          <p class="celebration-sub">タップしてかくにん</p>
        </div>
      `;
    } else {
      const m = item.milestone;
      overlay.innerHTML = `
        <div class="celebration-card milestone-card">
          <div class="celebration-burst">🎁</div>
          <h2 class="celebration-title">マイルストーン！</h2>
          <p class="celebration-body">${m.message.replace(/\n/g, '<br>')}</p>
          <p class="celebration-sub">タップしてとじる</p>
        </div>
      `;
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
    // アニメーション開始
    requestAnimationFrame(() => overlay.classList.add('active'));
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;
    const house = GameStore.getState('house');
    const collection = HouseManager.getCollectionRate();
    const nextSection = HouseManager.getNextSectionToUnlock();
    const nextMilestone = HouseManager.getNextMilestone();

    this._container.innerHTML = `
      <div class="house-screen">
        ${this._renderHeader()}
        <div class="house-view-area">
          ${this._view === VIEW.OVERVIEW
            ? this._renderOverview(house)
            : this._renderSectionDetail(house)
          }
        </div>
        ${this._renderFooter(collection, nextSection, nextMilestone)}
      </div>
    `;
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
        <button class="btn btn-small btn-warning house-craft-btn">
          🔨 ごしょくにん
        </button>
      </div>
    `;
  }

  // ★ 全景ビュー（メインの見せ場）
  // 家を縦方向に積み上げた「ジオラマ」的UI
  _renderOverview(house) {
    const sections = house.sections;

    // 上から下へ: tower → floor3 → floor2 → floor1 → garden(+exterior)
    const sectionOrder = ['tower', 'floor3', 'floor2', 'floor1', 'garden'];

    const rows = sectionOrder.map(id => {
      const unlocked = sections[id];
      const icon = SECTION_ICONS[id] || '🏠';
      const label = SECTION_LABELS[id] || id;

      if (id === 'garden') {
        // 庭は外観スタイル＋庭デコを合わせて表示
        return this._renderOverviewGardenRow(house, unlocked);
      }

      if (!unlocked) {
        const condition = Config.HOUSE.SECTION_UNLOCK_WORLDS[id] || '?';
        const cleared = HouseManager._getClearedWorldCount();
        const remaining = Math.max(0, condition - cleared);
        return `
          <div class="overview-section locked" data-section="${id}">
            <div class="overview-section-header">
              <span class="overview-icon">${icon}</span>
              <span class="overview-label">${label}</span>
              <span class="overview-lock-badge">🔒 あと${remaining}ワールド</span>
            </div>
            <div class="overview-silhouette">
              ${Array(4).fill('<span class="silhouette-dot"></span>').join('')}
            </div>
          </div>
        `;
      }

      // 解放済み: 配置されたアイテムのアイコンを並べる
      const floorData = house[id] || {};
      const furniture = floorData.furniture || [];
      const itemIcons = furniture
        .filter(Boolean)
        .slice(0, 6)
        .map(itemId => {
          const item = getItemById(itemId);
          return item ? `<span class="overview-item-chip" title="${item.name}">${item.imageFallback}</span>` : '';
        }).join('');
      const emptyCount = Math.max(0, 4 - furniture.filter(Boolean).length);
      const emptyChips = Array(Math.min(emptyCount, 4)).fill('<span class="overview-empty-chip">＋</span>').join('');

      return `
        <div class="overview-section unlocked" data-section="${id}" role="button" tabindex="0">
          <div class="overview-section-header">
            <span class="overview-icon">${icon}</span>
            <span class="overview-label">${label}</span>
            <span class="overview-tap-hint">→ くわしく</span>
          </div>
          <div class="overview-items-row">
            ${itemIcons || emptyChips || '<span class="overview-empty-hint">かぐをおこう！</span>'}
          </div>
        </div>
      `;
    });

    return `
      <div class="house-overview">
        ${rows.join('<div class="overview-floor-divider"></div>')}
      </div>
    `;
  }

  _renderOverviewGardenRow(house, unlocked) {
    if (!unlocked) {
      const condition = Config.HOUSE.SECTION_UNLOCK_WORLDS.garden || 4;
      const cleared = HouseManager._getClearedWorldCount();
      const remaining = Math.max(0, condition - cleared);
      return `
        <div class="overview-section locked overview-garden-row" data-section="garden">
          <div class="overview-section-header">
            <span class="overview-icon">🌸</span>
            <span class="overview-label">にわ</span>
            <span class="overview-lock-badge">🔒 あと${remaining}ワールド</span>
          </div>
        </div>
      `;
    }

    // 外観画像 + 庭デコ
    const exteriorItem = getItemById(house.exteriorStyle);
    const decos = (house.garden.decorations || []).filter(Boolean).slice(0, 5)
      .map(id => { const it = getItemById(id); return it ? it.imageFallback : ''; }).join(' ');

    return `
      <div class="overview-section unlocked overview-garden-row" data-section="garden" role="button" tabindex="0">
        <div class="overview-exterior-preview">
          ${exteriorItem?.image
            ? `<img src="${exteriorItem.image}" alt="${exteriorItem.name}" class="overview-house-thumb"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
            : ''
          }
          <div class="overview-house-fallback" ${exteriorItem?.image ? 'style="display:none"' : ''}>
            ${exteriorItem?.imageFallback || '🏕️'}
          </div>
        </div>
        <div class="overview-garden-decos">
          ${decos || '<span class="overview-empty-hint">🌸 にわにおこう！</span>'}
        </div>
      </div>
    `;
  }

  // セクション詳細ビュー（タブ切替後）
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
    const order = ['exterior', 'garden', 'floor1', 'floor2', 'floor3', 'tower'];
    const tabs = order
      .filter(id => !(id === 'exterior' && !house.sections.garden))
      .map(id => {
        const unlocked = house.sections[id];
        const active = this._view === id;
        return `
          <button class="house-tab-btn ${active ? 'active' : ''} ${!unlocked ? 'locked' : ''}"
                  data-section="${id}" ${!unlocked ? 'disabled' : ''}>
            ${!unlocked ? '🔒 ' : ''}${SECTION_LABELS[id] || id}
          </button>
        `;
      }).join('');
    return `<div class="house-tabs">${tabs}</div>`;
  }

  _renderCurrentSection(house) {
    switch (this._view) {
      case VIEW.EXTERIOR: return this._renderExteriorSection(house);
      case VIEW.GARDEN:   return this._renderGardenSection(house);
      case VIEW.FLOOR1:   return this._renderFloorSection(house, 'floor1');
      case VIEW.FLOOR2:   return this._renderFloorSection(house, 'floor2');
      case VIEW.FLOOR3:   return this._renderFloorSection(house, 'floor3', true);
      case VIEW.TOWER:    return this._renderTowerSection(house);
      default:            return '';
    }
  }

  _renderExteriorSection(house) {
    const styleItem = getItemById(house.exteriorStyle) || { name: 'テント', imageFallback: '🏕️', image: null };
    return `
      <div class="house-exterior-view">
        <div class="house-exterior-wrapper">
          ${styleItem.image
            ? `<img src="${styleItem.image}" alt="${styleItem.name}" class="house-exterior-img"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
            : ''
          }
          <div class="house-exterior-fallback" ${styleItem.image ? 'style="display:none"' : ''}>
            ${styleItem.imageFallback}
          </div>
        </div>
        <p class="house-style-name">${styleItem.name}</p>
        ${house.sections.exterior ? this._renderExteriorDecos(house.exteriorDeco) : ''}
      </div>
    `;
  }

  _renderExteriorDecos(deco) {
    const badges = Object.entries(deco)
      .filter(([, id]) => id)
      .map(([slot, id]) => {
        const item = getItemById(id);
        return item ? `<span class="ext-deco-chip" title="${item.name}">${item.imageFallback}</span>` : '';
      }).join('');
    return badges ? `<div class="exterior-deco-chips">${badges}</div>` : '';
  }

  _renderGardenSection(house) {
    const count = HouseManager.getGardenSlotCount();
    const decos = [...(house.garden.decorations || [])];
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

    const monsterSlots = (house.garden.monsters || [null,null,null]).map((id, i) => `
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
    const data = house[key] || {};
    const count = key === 'floor1' ? HouseManager.getFloor1SlotCount() : (Config.HOUSE.SECTION_SLOTS[`${key}_furniture`] || 8);
    const furniture = [...(data.furniture || [])];
    while (furniture.length < count) furniture.push(null);

    const wp = data.wallpaper ? getItemById(data.wallpaper) : null;
    const fl = data.floor ? getItemById(data.floor) : null;

    const slots = furniture.slice(0, count).map((id, i) => {
      const item = id ? getItemById(id) : null;
      return `
        <div class="house-furniture-slot${isSpecial ? ' special' : ''}" data-slot="${i}" data-floor="${key}" data-type="furniture">
          ${item ? `<span class="slot-fallback">${item.imageFallback}</span>` : `<span class="slot-empty-icon">＋</span>`}
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
          ${item ? `<span class="tower-item-emoji">${item.imageFallback}</span>` : `<span class="slot-empty-icon">✦</span>`}
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

  _renderFooter(collection, nextSection, nextMilestone) {
    const pct = collection.total > 0
      ? Math.min(100, Math.floor((collection.crafted / collection.total) * 100))
      : 0;

    // 次のイベントヒント（セクション解放 or マイルストーン、近い方を優先）
    let hintHtml = '';
    const hints = [];
    if (nextSection) hints.push({ remaining: nextSection.remaining, text: `あと${nextSection.remaining}ワールドで「${SECTION_LABELS[nextSection.sectionId]}」解放！` });
    if (nextMilestone) hints.push({ remaining: nextMilestone.remaining, text: `あと${nextMilestone.remaining}ワールドでサプライズ！🎁` });
    hints.sort((a, b) => a.remaining - b.remaining);
    if (hints.length > 0) {
      hintHtml = `<div class="house-next-hint">✨ ${hints[0].text}</div>`;
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

    // 合成屋ボタン
    this._container.querySelector('.house-craft-btn')?.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'craftsman');
    });

    // 全景ビューのセクションをタップ → 詳細へ
    this._container.querySelectorAll('.overview-section.unlocked').forEach(el => {
      el.addEventListener('click', () => {
        this._view = el.dataset.section;
        this._render();
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
          type: slot.dataset.type,
          slot: parseInt(slot.dataset.slot ?? '0', 10),
          floor: slot.dataset.floor || this._view,
        });
      });
    });
  }
}

export default HouseScreen;
