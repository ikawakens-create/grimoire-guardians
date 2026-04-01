/**
 * ShipBuildScreen.js - Grimoire Guardians
 * 船カスタマイズ画面（マイふね）Phase B
 *
 * Phase B の変更:
 *   - 絵文字ベースプレビュー → ShipRenderer（PNG レイヤー合成）
 *   - スロット名を新名称に統一（katachi/suishin/senshu/senbi/hata/oura）
 *   - 初回オンボーディング（katachi ホットスポットをパルスアニメ）
 *   - 大型艦ロードマップ UI（largeBlueprintObtained 時）
 *   - テーマ達成演出を completedThemeSets でニ重発火防止
 *
 * show/hide 方式（index.js で一度だけ生成して使い回す）。
 *
 * @version 2.0
 * @date 2026-03-28
 */

import { GameStore }        from '../core/GameStore.js';
import { Config }           from '../core/Config.js';
import Logger               from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import ShipRenderer         from '../components/ShipRenderer.js';
import {
  SHIP_PARTS,
  SMALL_SKINS,
  RARITY_LABEL,
  getPartsBySlot,
  filterBySize,
} from '../data/shipItems.js';

// 船サイズに応じて使用できるスロット（新スロット名）
const SLOTS_BY_SIZE = {
  small:  ['katachi'],
  medium: ['katachi', 'suishin', 'hata'],
  large:  ['katachi', 'suishin', 'senshu', 'senbi', 'hata', 'oura'],
};

// スロット日本語ラベル
const SLOT_LABEL = {
  katachi: 'ふねがら',
  suishin: 'すいしん・ほ',
  senshu:  'へさきかざり',
  senbi:   'とものかざり',
  hata:    'はた',
  oura:    'オーラ',
};

export class ShipBuildScreen {
  constructor() {
    /** @type {HTMLElement|null} */
    this._container  = null;
    /** @type {HTMLElement|null} */
    this._el         = null;
    /** @type {string|null} 現在選択中のスロット */
    this._activeSlot = null;
    /** @type {Function|null} GameStore 購読解除関数 */
    this._unsubscribe = null;
    /** @type {ShipRenderer|null} */
    this._renderer   = null;
    /** @type {HTMLElement|null} */
    this._rendererEl = null;
  }

  // ─────────────────────────────────────────────
  // 公開メソッド
  // ─────────────────────────────────────────────

  /**
   * 画面を表示する
   * @param {HTMLElement} container
   */
  show(container) {
    this._container = container;
    SoundManager.playBGM(SoundType.BGM_HARBOR);

    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }

    if (!this._el) {
      this._el = document.createElement('div');
      this._el.className = 'ship-build-screen';
      container.appendChild(this._el);
    } else {
      this._el.style.display = '';
    }

    this._activeSlot = null;
    this._renderer   = null;
    this._rendererEl = null;
    this._render();

    // GameStore の変化を監視（素材増加・スロット更新・設計図取得など）
    this._unsubscribe = GameStore.subscribe((path) => {
      if (path.startsWith('ship.') || path.startsWith('inventory.')) {
        const ship = GameStore.getState('ship');
        // ShipRenderer の差分更新（フル再描画を避ける）
        if (this._rendererEl && this._renderer) {
          this._renderer.update(ship, this._rendererEl);
        }
        // パネル部分のみ再描画
        this._updatePanels(ship);
      }
      // 設計図取得時はフル再描画（ロードマップUIの表示/非表示が変わるため）
      if (path === 'app.largeBlueprintObtained') {
        this._render();
      }
    });

    Logger.info('[ShipBuildScreen] shown');
  }

  /** 画面を非表示にする */
  hide() {
    if (this._el) this._el.style.display = 'none';
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    Logger.info('[ShipBuildScreen] hidden');
  }

  // ─────────────────────────────────────────────
  // 描画（フル再描画）
  // ─────────────────────────────────────────────

  _render() {
    if (!this._el) return;

    const ship     = GameStore.getState('ship');
    const dispSize = ship.displaySize ?? ship.size;
    const slots    = SLOTS_BY_SIZE[ship.size] ?? [];

    this._el.innerHTML = `
      <div class="ship-build-inner">

        ${this._renderHeader(ship)}
        ${GameStore.getState('app.largeBlueprintObtained') ? this._renderBlueprintProgress(ship) : ''}

        <div class="ship-build-preview-wrap">
          <div id="ship-renderer-mount"></div>
          <div class="ship-hotspots" id="ship-hotspots"></div>
          <div class="ship-size-label">${this._sizeLabelText(ship.size)}</div>
        </div>

        ${ship.size !== 'small' ? `<div class="slot-tab-bar" id="slot-tab-bar">${this._renderSlotTabs(ship, slots)}</div>` : ''}

        ${this._renderThemeSets(ship)}

        <div id="ship-slot-panel">
          ${this._renderSlotPanel(ship, dispSize, slots)}
        </div>

        ${ship.size === 'large' ? this._renderDisplayToggle(ship) : ''}

        <div class="ship-build-footer">
          <button type="button" class="button button-secondary ship-back-btn">← もどる</button>
        </div>
      </div>
    `;

    // ShipRenderer をマウント（small は PNG なし → 絵文字プレビューを使う）
    const mountEl = this._el.querySelector('#ship-renderer-mount');
    if (mountEl) {
      if (ship.size === 'small') {
        this._renderer   = null;
        this._rendererEl = null;
        mountEl.appendChild(this._renderSmallPreview(ship));
      } else {
        this._renderer   = new ShipRenderer(ship, dispSize);
        this._rendererEl = this._renderer.render();
        mountEl.appendChild(this._rendererEl);
      }
    }

    // ホットスポットを生成
    this._renderHotspots(ship, slots);

    this._bindEvents(ship, dispSize, slots);

    // 初回オンボーディング
    if (!ship.shipBuildGuideShown && ship.size !== 'small') {
      this._showOnboarding();
    }
  }

  // ─── パネル部分のみ更新（差分再描画）──────────

  _updatePanels(ship) {
    if (!this._el) return;
    const dispSize = ship.displaySize ?? ship.size;
    const slots    = SLOTS_BY_SIZE[ship.size] ?? [];

    // 小型船プレビューの差分更新
    if (ship.size === 'small') {
      const mountEl = this._el.querySelector('#ship-renderer-mount');
      if (mountEl) {
        mountEl.innerHTML = '';
        mountEl.appendChild(this._renderSmallPreview(ship));
      }
    }

    // スロットタブ更新
    const tabBarEl = this._el.querySelector('#slot-tab-bar');
    if (tabBarEl) {
      tabBarEl.innerHTML = this._renderSlotTabs(ship, slots);
      this._bindSlotTabs();
    }

    const panelEl = this._el.querySelector('#ship-slot-panel');
    if (panelEl) {
      panelEl.innerHTML = this._renderSlotPanel(ship, dispSize, slots);
      this._bindPanelEvents(ship);
    }

    // ホットスポット更新（アクティブ状態の反映）
    this._renderHotspots(ship, slots);
  }

  // ─────────────────────────────────────────────
  // 各セクション描画
  // ─────────────────────────────────────────────

  // ─── 小型船プレビュー（絵文字 + CSS filter）──

  /**
   * 小型船用プレビュー要素を生成する
   * ShipRenderer は PNG を前提とするため small では使用しない
   * @param {Object} ship
   * @returns {HTMLElement}
   */
  _renderSmallPreview(ship) {
    const skinId = ship.katachi ?? 'skin_default';
    const skin   = SMALL_SKINS.find(s => s.id === skinId) ?? SMALL_SKINS[0];
    const filterStyle = skin.filter ?? '';

    const el = document.createElement('div');
    el.className = 'ship-small-preview';
    el.innerHTML = `
      <img class="ship-small-img"
           src="assets/ships/katachi/small_base.png"
           alt="${skin.name}">
      <div class="ship-small-name">${skin.name}</div>
    `;

    // CSS filter を img に適用（PNG が color emoji より確実に hue-rotate が効く）
    const img = el.querySelector('img');
    if (filterStyle) img.style.filter = filterStyle;

    // small_base.png 未生成時は絵文字にフォールバック
    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'ship-small-emoji';
      if (filterStyle) fallback.style.filter = filterStyle;
      fallback.textContent = skin.emoji;
      img.replaceWith(fallback);
    });

    return el;
  }

  // ─── ヘッダー ──────────────────────────────

  _renderHeader(ship) {
    return `
      <div class="ship-build-header">
        <span class="ship-name-display">⛵ ${this._esc(ship.name)}</span>
        <button type="button" class="button button-small ship-rename-btn">✏️ なまえをかえる</button>
      </div>
    `;
  }

  // ─── 大型艦ロードマップ UI ─────────────────

  _renderBlueprintProgress(ship) {
    const cost = Config.GRADE2.LARGE_SHIP_CRAFT_COST;
    const mats = GameStore.getState('inventory.materials') ?? {};
    const canCraft = Object.entries(cost).every(([m, n]) => (mats[m] ?? 0) >= n);

    const barsHTML = Object.entries(cost).map(([mat, need]) => {
      const have  = mats[mat] ?? 0;
      const pct   = Math.min(100, Math.floor((have / need) * 100));
      const ok    = have >= need;
      return `
        <div class="blueprint-mat-row">
          <span class="blueprint-mat-name">${mat}</span>
          <div class="blueprint-progress">
            <div class="blueprint-progress-bar${ok ? ' blueprint-bar-done' : ''}"
                 style="width:${pct}%"></div>
          </div>
          <span class="blueprint-mat-count${ok ? ' blueprint-count-ok' : ''}">${have}/${need}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="blueprint-section">
        <div class="blueprint-title">🗺️ たいがたかんけんぞう</div>
        <div class="blueprint-bars">${barsHTML}</div>
        ${canCraft && !ship.largeCrafted
          ? `<button type="button" class="button button-success blueprint-craft-btn">⚓ かんけんぞうをつくる！</button>`
          : ship.largeCrafted
            ? `<div class="blueprint-done-badge">✅ かんけんぞう かんせい！</div>`
            : ''
        }
      </div>
    `;
  }

  // ─── ホットスポット ────────────────────────

  _renderHotspots(ship, slots) {
    const hotspotsEl = this._el?.querySelector('#ship-hotspots');
    if (!hotspotsEl) return;

    // small は「かたち」1スロットのみ
    const visibleSlots = ship.size === 'small' ? [] : slots;

    hotspotsEl.innerHTML = visibleSlots.map(slotId => {
      const label    = SLOT_LABEL[slotId] ?? slotId;
      const isActive = this._activeSlot === slotId;
      // 初回オンボーディング中は katachi だけパルス
      const isPulse  = !ship.shipBuildGuideShown && slotId === 'katachi';
      return `
        <button type="button"
          class="ship-hotspot${isActive ? ' active' : ''}${isPulse ? ' pulse' : ''}"
          data-slot="${slotId}"
          aria-label="${label}を選択">
          ${label}
        </button>
      `;
    }).join('');

    // ホットスポットイベント
    hotspotsEl.querySelectorAll('.ship-hotspot').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._activeSlot = btn.dataset.slot;
        // オンボーディング中なら完了させる
        if (!ship.shipBuildGuideShown) {
          GameStore.setState('ship.shipBuildGuideShown', true);
        }
        this._updatePanels(GameStore.getState('ship'));
      });
    });
  }

  // ─── スロットタブ（横スクロール）──────────────

  /**
   * スロット選択タブ一覧 HTML を生成する
   * ホットスポットタップと同じ動作をする補助 UI
   */
  _renderSlotTabs(ship, slots) {
    return slots.map(slotId => {
      const label    = SLOT_LABEL[slotId] ?? slotId;
      const isActive = this._activeSlot === slotId;
      const partId   = ship[slotId];
      const hasItem  = !!partId;
      return `
        <button type="button"
          class="slot-tab${isActive ? ' slot-tab-active' : ''}${hasItem ? ' slot-tab-filled' : ''}"
          data-slot="${slotId}">
          ${label}
        </button>
      `;
    }).join('');
  }

  // ─── テーマセット進捗 ──────────────────────

  _renderThemeSets(ship) {
    const equippedIds = new Set(
      ['katachi','suishin','senshu','senbi','hata','oura']
        .map(s => ship[s])
        .filter(Boolean)
    );
    const completedSets = ship.completedThemeSets ?? [];

    const setHTML = Config.GRADE2.THEME_SETS.map(set => {
      const owned    = set.parts.filter(id => (ship.crafted ?? []).includes(id)).length;
      const equipped = set.parts.filter(id => equippedIds.has(id)).length;
      const total    = set.parts.length;
      const done     = completedSets.includes(set.id);

      const stars = set.parts.map((_, i) =>
        `<span class="theme-star${i < owned ? ' theme-star-filled' : ''}">★</span>`
      ).join('');

      return `
        <div class="theme-set-item${done ? ' theme-set-done' : ''}">
          <span class="theme-set-emoji">${set.emoji}</span>
          <span class="theme-set-name">${set.name}</span>
          <span class="theme-set-stars">${stars}</span>
          ${owned < total
            ? `<span class="theme-set-hint">あと${total - owned}つ</span>`
            : equipped === total
              ? `<span class="theme-badge theme-badge-done">✨かんせい！</span>`
              : `<span class="theme-set-hint">そうびしよう！</span>`
          }
        </div>
      `;
    }).join('');

    return `<div class="theme-sets-row">${setHTML}</div>`;
  }

  // ─── スロットパネル ────────────────────────

  _renderSlotPanel(ship, dispSize, slots) {
    // small はスキン選択
    if (ship.size === 'small') {
      return this._renderSkinPanel(ship);
    }

    if (!this._activeSlot) {
      return `<div class="slot-panel slot-panel-hint">ふねのぶぶんをタップしてえらんでね</div>`;
    }

    const slotLabel  = SLOT_LABEL[this._activeSlot] ?? this._activeSlot;
    const candidates = filterBySize(getPartsBySlot(this._activeSlot), ship.size);
    const materials  = GameStore.getState('inventory.materials') ?? {};
    const equipped   = ship[this._activeSlot];
    const crafted    = ship.crafted ?? [];

    const partsHTML = candidates.map(part => {
      const isEquipped = equipped === part.id;
      const isCrafted  = crafted.includes(part.id);
      const canCraft   = !isCrafted && this._canAfford(part.craftCost, materials);
      const costHTML   = this._renderCostBadge(part.craftCost, materials, isCrafted);
      const rarityLabel = RARITY_LABEL[part.rarity] ?? '';

      let cardClass = 'part-card';
      if (isEquipped) cardClass += ' part-card-equipped';
      if (!isCrafted) cardClass += ' part-card-locked';

      return `
        <div class="${cardClass}" data-part-id="${part.id}">
          <div class="part-emoji">${part.emoji}</div>
          <div class="part-name">${part.name}</div>
          <div class="part-rarity">${rarityLabel}</div>
          ${costHTML}
          ${isEquipped
            ? `<div class="part-status part-status-equipped">✅ そうびちゅう</div>`
            : isCrafted
              ? `<button type="button" class="button button-small part-equip-btn" data-equip="${part.id}">つける</button>`
              : canCraft
                ? `<button type="button" class="button button-small button-success part-craft-btn" data-craft="${part.id}">つくる！</button>`
                : `<div class="part-status part-status-locked">🔒 あつめよう</div>`
          }
        </div>
      `;
    }).join('');

    return `
      <div class="slot-panel">
        <div class="slot-panel-title">えらんでいるぶぶん：${slotLabel}</div>
        <div class="slot-panel-parts">${partsHTML}</div>
      </div>
    `;
  }

  // ─── 小型スキンパネル ──────────────────────

  _renderSkinPanel(ship) {
    const materials = GameStore.getState('inventory.materials') ?? {};
    const crafted   = ship.crafted ?? [];
    const equipped  = ship.katachi ?? 'skin_default';

    const skinsHTML = SMALL_SKINS.map(skin => {
      const isEquipped = equipped === skin.id;
      const isCrafted  = !skin.craftCost || crafted.includes(skin.id) || skin.id === 'skin_default';
      const canCraft   = skin.craftCost && !isCrafted && this._canAfford(skin.craftCost, materials);
      const costHTML   = skin.craftCost ? this._renderCostBadge(skin.craftCost, materials, isCrafted) : '';

      // CSS filter でスキン色をプレビュー
      const filterStyle = skin.filter ? `style="filter:${skin.filter}"` : '';

      return `
        <div class="part-card${isEquipped ? ' part-card-equipped' : ''}${!isCrafted ? ' part-card-locked' : ''}"
             data-part-id="${skin.id}">
          <div class="part-emoji" ${filterStyle}>${skin.emoji}</div>
          <div class="part-name">${skin.name}</div>
          ${costHTML}
          ${isEquipped
            ? `<div class="part-status part-status-equipped">✅ いまのふね</div>`
            : isCrafted
              ? `<button type="button" class="button button-small part-equip-btn" data-equip="${skin.id}">これにする</button>`
              : canCraft
                ? `<button type="button" class="button button-small button-success part-craft-btn" data-craft="${skin.id}">つくる！</button>`
                : `<div class="part-status part-status-locked">🔒 あつめよう</div>`
          }
        </div>
      `;
    }).join('');

    return `
      <div class="slot-panel">
        <div class="slot-panel-title">ふねのみため</div>
        <div class="slot-panel-parts">${skinsHTML}</div>
      </div>
    `;
  }

  // ─── 表示サイズトグル（大型船のみ）──────────

  _renderDisplayToggle(ship) {
    const isSmall = ship.displaySize === 'small';
    return `
      <div class="display-size-toggle">
        <button type="button" class="button button-small ship-display-toggle-btn">
          ${isSmall ? '🛳️ もとにもどす' : '⛵ ちいさくみせる'}
        </button>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents(ship, dispSize, slots) {
    if (!this._el) return;

    // もどるボタン
    this._el.querySelector('.ship-back-btn')?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      GameStore.setState('app.currentScreen', 'bookshelf');
    });

    // 名前変更ボタン
    this._el.querySelector('.ship-rename-btn')?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._showRenameDialog(ship.name);
    });

    // 表示サイズトグル
    this._el.querySelector('.ship-display-toggle-btn')?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      const current = GameStore.getState('ship.displaySize');
      GameStore.setState('ship.displaySize', current === 'small' ? null : 'small');
    });

    // 大型艦クラフトボタン
    this._el.querySelector('.blueprint-craft-btn')?.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._showLargeCraftConfirm();
    });

    // スロットタブ
    this._bindSlotTabs();

    this._bindPanelEvents(ship);
  }

  _bindSlotTabs() {
    this._el?.querySelectorAll('.slot-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._activeSlot = btn.dataset.slot;
        const ship = GameStore.getState('ship');
        if (!ship.shipBuildGuideShown) {
          GameStore.setState('ship.shipBuildGuideShown', true);
        }
        this._updatePanels(ship);
      });
    });
  }

  _bindPanelEvents(ship) {
    if (!this._el) return;

    // パーツ装備ボタン
    this._el.querySelectorAll('.part-equip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._equipPart(btn.dataset.equip);
      });
    });

    // パーツクラフトボタン
    this._el.querySelectorAll('.part-craft-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._showCraftConfirm(btn.dataset.craft);
      });
    });
  }

  // ─────────────────────────────────────────────
  // 装備・クラフト処理
  // ─────────────────────────────────────────────

  /**
   * パーツを装備する（即時反映）
   * @param {string} partId
   */
  _equipPart(partId) {
    // スキンの場合は katachi スロットに入れる
    const skinDef = SMALL_SKINS.find(s => s.id === partId);
    if (skinDef) {
      GameStore.setState('ship.katachi', partId);
      SoundManager.playSFX(SoundType.SHIP.EQUIP_PART);
      this._showEquipEffect();
      return;
    }

    const part = SHIP_PARTS.find(p => p.id === partId);
    if (!part) return;

    GameStore.setState(`ship.${part.slotId}`, partId);
    SoundManager.playSFX(SoundType.SHIP.EQUIP_PART);
    this._showEquipEffect();
    this._checkThemeSetCompletion();
    Logger.info(`[ShipBuildScreen] equipped: ${partId} → ${part.slotId}`);
  }

  /**
   * クラフト確認ダイアログを表示
   * @param {string} partId
   */
  _showCraftConfirm(partId) {
    const skinDef = SMALL_SKINS.find(s => s.id === partId);
    const part    = skinDef ?? SHIP_PARTS.find(p => p.id === partId);
    if (!part) return;

    const materials = GameStore.getState('inventory.materials') ?? {};
    const costLines = Object.entries(part.craftCost)
      .map(([mat, cnt]) => `${mat} × ${cnt}（いま: ${materials[mat] ?? 0}）`)
      .join('<br>');

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay ship-craft-modal';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-title">${part.emoji} ${part.name} をつくる？</div>
        <div class="modal-body">${costLines}</div>
        <div class="modal-actions">
          <button type="button" class="button button-success craft-confirm-btn">つくる！</button>
          <button type="button" class="button button-secondary craft-cancel-btn">やめる</button>
        </div>
      </div>
    `;

    overlay.querySelector('.craft-confirm-btn').addEventListener('click', () => {
      this._doCraft(part);
      overlay.remove();
    });
    overlay.querySelector('.craft-cancel-btn').addEventListener('click', () => {
      overlay.remove();
    });

    (this._el ?? document.body).appendChild(overlay);
  }

  /**
   * クラフト実行
   * @param {Object} part
   */
  _doCraft(part) {
    const materials = GameStore.getState('inventory.materials') ?? {};
    if (!this._canAfford(part.craftCost, materials)) return;

    Object.entries(part.craftCost).forEach(([mat, cnt]) => {
      GameStore.setState(`inventory.materials.${mat}`, (materials[mat] ?? 0) - cnt);
    });

    const crafted = [...(GameStore.getState('ship.crafted') ?? [])];
    if (!crafted.includes(part.id)) crafted.push(part.id);
    GameStore.setState('ship.crafted', crafted);

    SoundManager.playSFX(SoundType.SHIP.CRAFT_PART);

    // クラフト直後に自動装備
    this._equipPart(part.id);

    Logger.info(`[ShipBuildScreen] crafted: ${part.id}`);
  }

  // ─── 大型艦クラフト ────────────────────────

  _showLargeCraftConfirm() {
    const cost = Config.GRADE2.LARGE_SHIP_CRAFT_COST;
    const materials = GameStore.getState('inventory.materials') ?? {};
    const costLines = Object.entries(cost)
      .map(([mat, cnt]) => `${mat} × ${cnt}`)
      .join('<br>');

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay ship-craft-modal';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-title">⚓ たいがたかんけんぞうをつくる？</div>
        <div class="modal-body">${costLines}</div>
        <div class="modal-actions">
          <button type="button" class="button button-success large-craft-confirm-btn">つくる！</button>
          <button type="button" class="button button-secondary large-craft-cancel-btn">やめる</button>
        </div>
      </div>
    `;

    overlay.querySelector('.large-craft-confirm-btn').addEventListener('click', () => {
      this._doLargeCraft(cost, materials);
      overlay.remove();
    });
    overlay.querySelector('.large-craft-cancel-btn').addEventListener('click', () => {
      overlay.remove();
    });

    (this._el ?? document.body).appendChild(overlay);
  }

  _doLargeCraft(cost, materials) {
    if (!Object.entries(cost).every(([m, n]) => (materials[m] ?? 0) >= n)) return;

    Object.entries(cost).forEach(([mat, cnt]) => {
      GameStore.setState(`inventory.materials.${mat}`, (materials[mat] ?? 0) - cnt);
    });

    GameStore.setState('ship.size', 'large');
    GameStore.setState('ship.largeCrafted', true);

    SoundManager.playSFX(SoundType.SHIP.LARGE_COMPLETE);
    Logger.info('[ShipBuildScreen] 大型艦 crafted');
    this._render();
  }

  // ─────────────────────────────────────────────
  // テーマセット完成チェック
  // ─────────────────────────────────────────────

  _checkThemeSetCompletion() {
    const ship     = GameStore.getState('ship');
    const equipped = new Set(
      ['katachi','suishin','senshu','senbi','hata','oura']
        .map(s => ship[s])
        .filter(Boolean)
    );
    const completed   = [...(ship.completedThemeSets ?? [])];
    let newlyCompleted = null;

    for (const set of Config.GRADE2.THEME_SETS) {
      const isComplete  = set.parts.every(id => equipped.has(id));
      const alreadyDone = completed.includes(set.id);

      if (isComplete && !alreadyDone) {
        completed.push(set.id);
        newlyCompleted = set;
      }
    }

    if (newlyCompleted) {
      GameStore.setState('ship.completedThemeSets', completed);
      this._showThemeCompleteEffect(newlyCompleted);
    }
  }

  // ─────────────────────────────────────────────
  // オンボーディング（初回）
  // ─────────────────────────────────────────────

  _showOnboarding() {
    const hotspotsEl = this._el?.querySelector('#ship-hotspots');
    if (!hotspotsEl) return;

    // katachi 以外をオーバーレイで暗くする
    const overlay = document.createElement('div');
    overlay.className = 'ship-onboarding-overlay';
    overlay.innerHTML = `
      <div class="ship-onboarding-hint">
        <span class="ship-onboarding-arrow">↓</span>
        「ふねがら」をタップしてみよう！
      </div>
    `;
    this._el.appendChild(overlay);

    // katachi ホットスポットだけ前面に出す
    const katachiBtn = hotspotsEl.querySelector('[data-slot="katachi"]');
    if (katachiBtn) {
      katachiBtn.style.zIndex = '201';
      katachiBtn.addEventListener('click', () => {
        overlay.remove();
      }, { once: true });
    }

    // オーバーレイタップで閉じる
    overlay.addEventListener('click', () => {
      GameStore.setState('ship.shipBuildGuideShown', true);
      overlay.remove();
    });
  }

  // ─────────────────────────────────────────────
  // 名前変更ダイアログ
  // ─────────────────────────────────────────────

  _showRenameDialog(currentName) {
    const maxLen = Config.GRADE2.SHIP_NAME_MAX_LENGTH;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay ship-rename-modal';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-title">ふねのなまえ</div>
        <input
          type="text"
          class="ship-name-input"
          value="${this._esc(currentName)}"
          maxlength="${maxLen}"
          placeholder="グリモア号"
        />
        <div class="ship-name-counter"><span class="ship-name-len">${currentName.length}</span> / ${maxLen}</div>
        <div class="modal-actions">
          <button type="button" class="button button-success name-confirm-btn">これにする！</button>
          <button type="button" class="button button-secondary name-cancel-btn">やめる</button>
        </div>
      </div>
    `;

    const input   = overlay.querySelector('.ship-name-input');
    const lenSpan = overlay.querySelector('.ship-name-len');

    input.addEventListener('focus', () => {
      setTimeout(() => input.select(), 0);
    });
    input.addEventListener('input', () => {
      lenSpan.textContent = input.value.length;
    });

    overlay.querySelector('.name-confirm-btn').addEventListener('click', () => {
      const newName = input.value.trim() || 'グリモア号';
      GameStore.setState('ship.name', newName);
      GameStore.setState('ship.nameSetByUser', true);
      overlay.remove();
      Logger.info(`[ShipBuildScreen] ship renamed: ${newName}`);
    });
    overlay.querySelector('.name-cancel-btn').addEventListener('click', () => {
      overlay.remove();
    });

    (this._el ?? document.body).appendChild(overlay);
    requestAnimationFrame(() => input.focus());
  }

  // ─────────────────────────────────────────────
  // 演出
  // ─────────────────────────────────────────────

  _showEquipEffect() {
    if (!this._rendererEl) return;
    this._rendererEl.classList.remove('ship-equip-flash');
    void this._rendererEl.offsetWidth;
    this._rendererEl.classList.add('ship-equip-flash');
    setTimeout(() => this._rendererEl?.classList.remove('ship-equip-flash'), 600);
  }

  _showThemeCompleteEffect(set) {
    const banner = document.createElement('div');
    banner.className = 'theme-complete-overlay';
    banner.innerHTML = `
      <div class="theme-complete-content theme-badge theme-badge-done">
        <div class="theme-complete-emoji">${set.emoji}</div>
        <div class="theme-complete-name">${set.name}</div>
        <div class="theme-complete-msg">✨ かんせい！</div>
      </div>
    `;
    (this._el ?? document.body).appendChild(banner);
    SoundManager.playSFX(SoundType.SHIP.THEME_COMPLETE);

    // バナー消去後、oura 提案モーダルを表示（set.oura が設定されている場合のみ）
    setTimeout(() => {
      banner.remove();
      if (set.oura) {
        this._showOuraProposal(set);
      }
    }, 2500);
  }

  /**
   * テーマ達成時のオーラ提案モーダル
   * @param {Object} set - Config.GRADE2.THEME_SETS のエントリ
   */
  _showOuraProposal(set) {
    const ship    = GameStore.getState('ship');
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay ship-oura-proposal';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-title">${set.emoji} ${set.name} かんせい！</div>
        <div class="modal-body">
          おすすめのオーラ「<strong>${set.oura}</strong>」をつける？
        </div>
        <div class="modal-actions">
          <button type="button" class="button button-success oura-yes-btn">つける！</button>
          <button type="button" class="button button-secondary oura-no-btn">あとで</button>
        </div>
      </div>
    `;

    overlay.querySelector('.oura-yes-btn').addEventListener('click', () => {
      GameStore.setState('ship.oura', set.oura);
      overlay.remove();
      Logger.info(`[ShipBuildScreen] oura 提案承諾: ${set.oura}`);
    });
    overlay.querySelector('.oura-no-btn').addEventListener('click', () => {
      overlay.remove();
    });

    (this._el ?? document.body).appendChild(overlay);
  }

  // ─────────────────────────────────────────────
  // ヘルパー
  // ─────────────────────────────────────────────

  _sizeLabelText(size) {
    return { small: '小型船', medium: '中型船', large: '大型艦' }[size] ?? '';
  }

  _canAfford(cost, materials) {
    return Object.entries(cost).every(([mat, cnt]) => (materials[mat] ?? 0) >= cnt);
  }

  _renderCostBadge(cost, materials, isCrafted) {
    if (isCrafted) return '';
    const lines = Object.entries(cost).map(([mat, cnt]) => {
      const have   = materials[mat] ?? 0;
      const enough = have >= cnt;
      return `<span class="cost-item${enough ? ' cost-ok' : ' cost-ng'}">${mat}×${cnt}</span>`;
    }).join(' ');
    return `<div class="part-cost">${lines}</div>`;
  }

  _esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

// ─────────────────────────────────────────────
// 船の名前入力ダイアログ（Grade 2 初回入場時）
// index.js から呼び出す
// ─────────────────────────────────────────────

/**
 * Grade 2 初回入場時の船名入力ダイアログを表示する
 * ship.nameSetByUser === false の時だけ呼ぶこと
 * @param {HTMLElement} container
 */
export function showShipNameDialog(container) {
  const maxLen      = Config.GRADE2.SHIP_NAME_MAX_LENGTH;
  const currentName = GameStore.getState('ship.name') ?? 'グリモア号';
  const escapedName = String(currentName)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay ship-intro-modal';
  overlay.innerHTML = `
    <div class="modal-content ship-intro-content">
      <div class="ship-intro-npc">🐙 船長タコぞう</div>
      <div class="ship-intro-msg">
        「これがおまえのふねだ！<br>なまえをつけてやれ！」
      </div>
      <input
        type="text"
        class="ship-name-input"
        value="${escapedName}"
        maxlength="${maxLen}"
        placeholder="グリモア号"
      />
      <div class="ship-name-counter"><span class="ship-name-len">${currentName.length}</span> / ${maxLen}</div>
      <button type="button" class="button button-success ship-intro-confirm-btn">これにする！</button>
    </div>
  `;

  const input   = overlay.querySelector('.ship-name-input');
  const lenSpan = overlay.querySelector('.ship-name-len');

  input.addEventListener('focus', () => {
    setTimeout(() => input.select(), 0);
  });
  input.addEventListener('input', () => {
    lenSpan.textContent = input.value.length;
  });

  overlay.querySelector('.ship-intro-confirm-btn').addEventListener('click', () => {
    const newName = input.value.trim() || 'グリモア号';
    GameStore.setState('ship.name', newName);
    GameStore.setState('ship.nameSetByUser', true);
    overlay.remove();
    Logger.info(`[ShipNameDialog] named: ${newName}`);
  });

  container.appendChild(overlay);
  requestAnimationFrame(() => input.focus());
}

export default ShipBuildScreen;
