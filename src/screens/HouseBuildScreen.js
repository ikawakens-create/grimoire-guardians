/**
 * HouseBuildScreen.js - Grimoire Guardians
 * 家ビルド・スタイル編集画面 v4.0
 *
 * v4.0 変更点:
 *  - 家の断面図SVGをタップして編集するUI に全面刷新
 *  - 左半分: 家の断面図（現在のスタイルで色付け）+ レイヤータップゾーン
 *  - 右半分: オプションパネル（スタイル選択 / にわかざり）
 *  - タブ: 「🎨 いろ・もよう」 vs 「🌸 にわをかざる」
 *  - スタイル選択は即適用（プレビュー確認ステップを廃止）
 *  - にわアイテム: カード内に「つくる！」ボタン直接内蔵（詳細パネル廃止）
 *  - 家具・かべがみ・ゆか・タワー機能を完全削除
 *  - 素材不足表示: 「あと🌲が2こ」（× 記号を避ける）
 *  - 成功時: 大きな「できた！🎉」アニメーション
 *
 * @version 4.0
 * @date 2026-03-05
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import {
  GARDEN_ITEMS,
  RARITY,
} from '../data/houseItems.js';
import { HOUSE_STYLES, getStyleById, getSpriteLayerSpec } from '../data/styleItems.js';

// 素材絵文字マップ
const MATERIAL_EMOJI = {
  wood: '🌲', stone: '⛰️', brick: '🧱', gem: '💎',
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

/** スタイル編集対象レイヤー（そうしょくは除外） */
const STYLE_LAYERS = [
  { id: 'garden', label: '🌿 にわ',   emoji: '🌿' },
  { id: 'floor1', label: '🏠 1かい',  emoji: '🏠' },
  { id: 'floor2', label: '🏠 2かい',  emoji: '🏠' },
  { id: 'floor3', label: '🏠 3かい',  emoji: '🏠' },
  { id: 'tower',  label: '⭐ てっぺん', emoji: '⭐' },
];

/** 家プレビューの表示順（上から下）と表示ラベル */
const DISPLAY_ORDER = ['tower', 'floor3', 'floor2', 'floor1', 'garden'];
const LAYER_LABEL = {
  tower: 'てっぺん', floor3: '3かい', floor2: '2かい', floor1: '1かい', garden: 'にわ',
};

export class HouseBuildScreen {
  constructor() {
    this._container     = null;
    this._element       = null;
    this._tab           = 'style';          // 'style' | 'garden'
    this._selectedLayer = 'floor1';         // 現在選択中のレイヤー
    this._craftResult   = null;             // { success, message }
    this._toastTimer    = null;             // トースト自動消去タイマー（競合防止）
    this._unsubscribe   = null;
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;
    SoundManager.playBGM(SoundType.BGM_HOUSE);

    // 前画面から引き継いだターゲットレイヤーがあれば適用
    const targetLayer = GameStore.getState('app.styleTargetLayer');
    if (targetLayer && STYLE_LAYERS.find(l => l.id === targetLayer)) {
      this._selectedLayer = targetLayer;
    }
    GameStore.setState('app.styleTargetLayer', null);

    // セクション・スタイル解放チェック（HouseScreenを経由しない場合も確実に実行）
    HouseManager.checkProgressUnlocks();
    HouseManager.checkAndUnlockStyles();

    this._tab         = 'style';
    this._craftResult = null;
    this._render();

    // インベントリ・家の状態変化で素材バー・スタイルカードを再描画
    this._unsubscribe = GameStore.subscribe((state, path) => {
      if (path && (path.startsWith('inventory') || path.startsWith('house'))) {
        this._render();
      }
    });

    Logger.info('[HouseBuildScreen] v4.0 表示: layer=' + this._selectedLayer);
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    if (this._toastTimer)  { clearTimeout(this._toastTimer); this._toastTimer = null; }
    GameStore.setState('app.houseBuildMode',   null);
    GameStore.setState('app.houseEditTarget',  null);
    GameStore.setState('app.styleTargetLayer', null);
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────────
  // レンダリング（全体）
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;
    if (this._element) this._element.remove();

    const materials = GameStore.getState('inventory.materials') || {};
    const house     = GameStore.getState('house');

    const _tmp = document.createElement('div');
    _tmp.innerHTML = `
      <div class="house-build-screen">

        <!-- ヘッダー -->
        ${this._renderHeader(materials)}

        <!-- メインレイアウト（左: 家断面図 / 右: オプション） -->
        <div class="house-build-body">

          <!-- 左パネル: リアル家プレビュー（タップでレイヤー選択） -->
          <div class="house-cross-section-wrap">
            ${this._renderHousePreview(house)}
          </div>

          <!-- 右パネル: オプション -->
          <div class="house-options-panel">
            ${this._renderTabBar()}
            <div class="house-options-content">
              ${this._tab === 'style'
                ? this._renderStyleOptions(house)
                : this._renderGardenOptions(materials, house)
              }
            </div>
          </div>

        </div>

        <!-- 操作結果トースト -->
        ${this._craftResult ? this._renderToast() : ''}

      </div>
    `;
    this._element = _tmp.firstElementChild;
    this._container.appendChild(this._element);
    this._bindEvents();
  }

  // ─────────────────────────────────────────────
  // ヘッダー
  // ─────────────────────────────────────────────

  _renderHeader(materials) {
    const matDisplay = ['wood','stone','brick','gem','star_fragment']
      .map(id => `<span class="mat-chip">${MATERIAL_EMOJI[id]}<span class="mat-num">${materials[id] || 0}</span></span>`)
      .join('');
    return `
      <div class="build-header">
        <button class="btn-icon build-back-btn" aria-label="もどる">← もどる</button>
        <span class="build-title">🏠 わたしのいえ</span>
        <div class="build-mat-bar">${matDisplay}</div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // 左パネル: リアル家プレビュー（divスタック）
  // ─────────────────────────────────────────────

  /** 1かいのスタイルのティアで「使えるレイヤー」を決定 */
  _getAvailableLayers(house) {
    const floor1StyleId = house.layerStyles?.floor1 || 'style_wood';
    const floor1Style   = getStyleById(floor1StyleId);
    return new Set(floor1Style?.sections || ['tower', 'floor1', 'garden']);
  }

  _renderHousePreview(house) {
    const sections        = house.sections    || {};
    const layerStyles     = house.layerStyles || {};
    const availableLayers = this._getAvailableLayers(house);
    const cleared         = HouseManager._getClearedWorldCount?.() ?? 0;

    const divs = DISPLAY_ORDER.map(id => {
      const isSelected    = this._selectedLayer === id && this._tab === 'style';
      const tierAvailable = availableLayers.has(id);
      const worldUnlocked = id === 'floor1' || !!sections[id];

      // ティアロック（1かいのスタイルが低ティアのためこのレイヤーが存在しない）
      if (!tierAvailable) {
        const hint = id === 'floor3' ? 'レジェンドスタイルで解放！' : 'スペシャルスタイルで解放！';
        return `
          <div class="hb-layer-slot hb-tier-locked" data-layer="${id}">
            <span class="hb-lock-icon">🔒</span>
            <span class="hb-lock-hint">${hint}</span>
          </div>`;
      }

      // ワールド進捗ロック（まだクリア数が足りない）
      if (!worldUnlocked) {
        const unlockAt  = Config.HOUSE.SECTION_UNLOCK_WORLDS?.[id] || 0;
        const remaining = Math.max(0, unlockAt - cleared);
        return `
          <div class="hb-layer-slot hb-world-locked" data-layer="${id}">
            <span class="hb-lock-icon">🔒</span>
            <span class="hb-lock-hint">あと${remaining}ワールド</span>
          </div>`;
      }

      // 編集可能なレイヤー
      const styleId = layerStyles[id] || 'style_wood';
      const style   = getStyleById(styleId);
      const spec    = getSpriteLayerSpec(style, id);
      const flexVal = spec?.aspectH || 344;

      const bgStyle = spec
        ? `background-image:url('${style.spritesheet}');background-size:${spec.bgSize};background-position:${spec.bgPos};background-color:${style.color};`
        : `background-color:${style.color};`;

      return `
        <div class="hb-layer-slot hb-available ${isSelected ? 'hb-selected' : ''}"
             data-layer="${id}"
             style="flex:${flexVal};${bgStyle}"
             role="button" tabindex="0" aria-label="${LAYER_LABEL[id]}をえらぶ">
          <div class="hb-layer-label-overlay ${isSelected ? 'visible' : ''}">${LAYER_LABEL[id]}</div>
        </div>`;
    }).join('');

    return `<div class="hb-house-preview">${divs}</div>`;
  }

  // ─────────────────────────────────────────────
  // タブバー
  // ─────────────────────────────────────────────

  _renderTabBar() {
    return `
      <div class="build-tab-bar">
        <button class="build-tab-btn ${this._tab === 'style' ? 'active' : ''}" data-tab="style">
          🎨 いろ・もよう
        </button>
        <button class="build-tab-btn ${this._tab === 'garden' ? 'active' : ''}" data-tab="garden">
          🌸 にわをかざる
        </button>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // 右パネル: スタイル選択
  // ─────────────────────────────────────────────

  _renderStyleOptions(house) {
    const unlockedStyles = house.unlockedStyles || ['style_wood'];
    const layerStyles    = house.layerStyles    || {};
    const currentStyleId = layerStyles[this._selectedLayer] || 'style_wood';
    const clearedWorlds  = HouseManager._getClearedWorldCount?.() ?? 0;
    const layerLabel     = LAYER_LABEL[this._selectedLayer] || this._selectedLayer;

    // このレイヤーに対応するスタイルだけ表示（sectionsにこのレイヤーが含まれるもの）
    const compatibleStyles = HOUSE_STYLES.filter(s =>
      s.sections?.includes(this._selectedLayer)
    );

    const TIER_BADGE = { basic: '🟤', special: '🔵', legend: '🟣' };

    const cards = compatibleStyles.map(style => {
      const owned      = unlockedStyles.includes(style.id);
      const isCurrent  = style.id === currentStyleId;
      const unlockAt   = Config.HOUSE.STYLE_UNLOCK_WORLDS?.[style.id] ?? 0;
      const worldsLeft = Math.max(0, unlockAt - clearedWorlds);

      const spec = style.spritesheet ? getSpriteLayerSpec(style, this._selectedLayer) : null;
      const previewStyle = spec
        ? `background-image:url('${style.spritesheet}');background-size:${spec.bgSize};background-position:${spec.bgPos};`
        : `background:linear-gradient(135deg,${style.color},${style.colorDark});`;

      return `
        <div class="style-card-v4 ${isCurrent ? 'is-current' : ''} ${!owned ? 'is-locked' : 'is-owned'} rarity-${style.tier || 'basic'}"
             data-style-id="${style.id}"
             style="--sc:${style.color};--sd:${style.colorDark};"
             role="button" tabindex="${owned ? '0' : '-1'}">
          <div class="sc-preview" style="${previewStyle}">
            ${!spec ? `<span class="sc-emoji">${style.layerEmoji?.[this._selectedLayer] || style.emoji}</span>` : ''}
            <span class="sc-tier-badge">${TIER_BADGE[style.tier] || ''}</span>
            ${isCurrent ? '<span class="sc-badge-now">いま</span>' : ''}
            ${!owned ? `<span class="sc-badge-lock">🔒 あと${worldsLeft}W</span>` : ''}
          </div>
          <div class="sc-info">
            <span class="sc-name">${style.name}</span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="style-options-wrap">
        <p class="style-layer-hint">👆 <strong>${layerLabel}</strong> のいろをえらんでね</p>
        <div class="style-card-grid-v4">
          ${cards}
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // 右パネル: にわかざり
  // ─────────────────────────────────────────────

  _renderGardenOptions(materials, house) {
    // にわセクションがロック中の場合は子供向けメッセージを表示
    if (!house.sections?.garden) {
      const clearedWorlds = HouseManager._getClearedWorldCount?.() ?? 0;
      const needed  = Config.HOUSE.SECTION_UNLOCK_WORLDS?.garden ?? 7;
      const left    = Math.max(0, needed - clearedWorlds);
      return `
        <div class="garden-locked-banner">
          <span class="garden-locked-emoji">🌱</span>
          <p class="garden-locked-title">にわはまだひらいていないよ！</p>
          <p class="garden-locked-hint">あと <strong>${left}ワールド</strong> クリアしたらひらくよ！</p>
        </div>
      `;
    }

    const crafted = house.crafted || [];

    const cards = GARDEN_ITEMS.map(item => {
      const isCrafted = crafted.includes(item.id);
      const { craftable, missing } = HouseManager.checkCraftable(item.id);
      const isFree    = !item.recipe;

      let btnHtml = '';
      if (isCrafted) {
        btnHtml = `<button class="gc-btn gc-btn-done" disabled>✓ もってる</button>`;
      } else if (isFree) {
        btnHtml = `<button class="gc-btn gc-btn-free garden-craft-btn" data-item-id="${item.id}">✅ むりょう！</button>`;
      } else if (craftable) {
        btnHtml = `<button class="gc-btn gc-btn-craft garden-craft-btn" data-item-id="${item.id}">🔨 つくる！</button>`;
      } else {
        // 素材不足 → 「あと🌲が2こ」形式（× 記号なし）
        const missingStr = Object.entries(missing)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}が${n}こ`)
          .join(' ');
        btnHtml = `<button class="gc-btn gc-btn-locked" disabled>あと${missingStr}</button>`;
      }

      return `
        <div class="garden-card ${isCrafted ? 'is-crafted' : ''} ${RARITY_CLASS[item.rarity] || ''}">
          <div class="gc-icon">
            ${item.image
              ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                 <span class="gc-fallback" style="display:none">${item.imageFallback}</span>`
              : `<span class="gc-fallback">${item.imageFallback}</span>`
            }
          </div>
          <div class="gc-body">
            <p class="gc-name">${item.name}</p>
            ${item.recipe
              ? `<p class="gc-recipe">${Object.entries(item.recipe).map(([m,n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ')}</p>`
              : ''
            }
            ${btnHtml}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="garden-options-wrap">
        <p class="garden-section-hint">🌸 にわにかざるものをつくろう！</p>
        <div class="garden-card-list">
          ${cards}
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // トースト
  // ─────────────────────────────────────────────

  _renderToast() {
    const { success, message } = this._craftResult;
    return `
      <div class="build-toast ${success ? 'toast-success' : 'toast-error'}" role="alert">
        ${message}
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._element) return;

    // ← もどる
    this._element.querySelector('.build-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });

    // タブ切替
    this._element.querySelectorAll('.build-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._tab = btn.dataset.tab;
        this._render();
      });
    });

    // 家プレビューの編集可能レイヤーをタップ
    this._element.querySelectorAll('.hb-layer-slot.hb-available').forEach(slot => {
      slot.addEventListener('click', () => {
        this._selectedLayer = slot.dataset.layer;
        this._tab = 'style';   // スタイルタブに自動切替
        this._render();
      });
    });

    // スタイルカード選択 → 即適用
    if (this._tab === 'style') {
      this._element.querySelectorAll('.style-card-v4.is-owned').forEach(card => {
        card.addEventListener('click', () => {
          this._applyStyle(card.dataset.styleId);
        });
      });
    }

    // にわアイテム「つくる！」ボタン
    if (this._tab === 'garden') {
      this._element.querySelectorAll('.garden-craft-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this._doCraft(btn.dataset.itemId);
        });
      });
    }
  }

  // ─────────────────────────────────────────────
  // スタイル即適用
  // ─────────────────────────────────────────────

  _applyStyle(styleId) {
    const style = getStyleById(styleId);
    const ok    = HouseManager.setLayerStyle(this._selectedLayer, styleId);
    if (ok) {
      this._craftResult = {
        success: true,
        message: `✨ ${style?.name || 'スタイル'} にかわった！`,
      };
    } else {
      this._craftResult = { success: false, message: '❌ かえられませんでした' };
    }
    this._render();
    // 適用したレイヤーにフラッシュアニメーションを付与
    if (ok) {
      const slot = this._element?.querySelector(`.hb-layer-slot[data-layer="${this._selectedLayer}"]`);
      if (slot) {
        slot.classList.add('hb-flash');
        setTimeout(() => slot.classList.remove('hb-flash'), 400);
      }
    }
    // 前のタイマーをキャンセルしてから新しくセット（連打しても競合しない）
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this._craftResult = null; this._render(); }, 2000);
  }

  // ─────────────────────────────────────────────
  // にわクラフト
  // ─────────────────────────────────────────────

  _doCraft(itemId) {
    const result = HouseManager.craft(itemId);
    if (result.success) {
      const item = GARDEN_ITEMS.find(i => i.id === itemId);
      this._craftResult = {
        success: true,
        message: `🎉 できた！ ${item?.imageFallback || ''} ${item?.name || ''}`,
      };
    } else {
      this._craftResult = {
        success: false,
        message: `❌ ${result.reason || 'つくれませんでした'}`,
      };
    }
    this._render();
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this._craftResult = null; this._render(); }, 2500);
  }
}

export default HouseBuildScreen;
