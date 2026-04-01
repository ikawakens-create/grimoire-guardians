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
import { HOUSE_STYLES, getStyleById } from '../data/styleItems.js';

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

/** SVG内の各レイヤーの描画エリア（viewBox 480×540 基準の座標） */
const LAYER_ZONES = {
  tower:  { y: 15,  h: 100, rx: 18, shape: 'triangle' },
  floor3: { y: 120, h: 95,  rx: 12 },
  floor2: { y: 222, h: 100, rx: 12 },
  floor1: { y: 328, h: 110, rx: 12 },
  garden: { y: 444, h: 85,  rx: 12 },
};

/** レイヤーゾーンのホットスポット（コンテナに対する % — landscape右半分に置くので左起点） */
const LAYER_HOTSPOT_POS = {
  tower:  { top: '3%',  height: '18%' },
  floor3: { top: '22%', height: '18%' },
  floor2: { top: '41%', height: '19%' },
  floor1: { top: '61%', height: '20%' },
  garden: { top: '82%', height: '16%' },
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

          <!-- 左パネル: 家の断面図 + タップゾーン -->
          <div class="house-cross-section-wrap">
            ${this._renderCrossSection(house)}
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
  // 左パネル: 家の断面図SVG
  // ─────────────────────────────────────────────

  _renderCrossSection(house) {
    const sections    = house.sections    || {};
    const layerStyles = house.layerStyles || {};

    // 各レイヤーの色を現在のスタイルから取得
    const getLayerColor = (id) => {
      const sid   = layerStyles[id] || 'style_wood';
      const style = getStyleById(sid);
      return { color: style?.color || '#a0522d', dark: style?.colorDark || '#6b3a1f' };
    };

    const isUnlocked = (id) => id === 'floor1' || !!sections[id];

    // SVGレイヤーを描画
    const layers = STYLE_LAYERS.map(layer => {
      const unlocked = isUnlocked(layer.id);
      const { color, dark } = getLayerColor(layer.id);
      const z = LAYER_ZONES[layer.id];
      const sid = `grad-${layer.id}`;
      const isSelected = this._selectedLayer === layer.id && this._tab === 'style';

      if (layer.id === 'tower') {
        // てっぺんは三角形
        return `
          <defs>
            <linearGradient id="${sid}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="${unlocked ? color : '#444'}"/>
              <stop offset="100%" stop-color="${unlocked ? dark : '#333'}"/>
            </linearGradient>
          </defs>
          <polygon
            points="240,${z.y} 80,${z.y + z.h} 400,${z.y + z.h}"
            fill="url(#${sid})"
            stroke="${isSelected ? '#fff' : 'none'}"
            stroke-width="${isSelected ? 3 : 0}"
            opacity="${unlocked ? 1 : 0.35}"
          />
          <text x="240" y="${z.y + z.h - 18}"
                text-anchor="middle" fill="${unlocked ? 'white' : '#666'}"
                font-family="sans-serif" font-size="20" font-weight="bold">${layer.emoji}</text>
          <text x="240" y="${z.y + z.h - 2}"
                text-anchor="middle" fill="${unlocked ? 'rgba(255,255,255,0.85)' : '#666'}"
                font-family="sans-serif" font-size="13">${unlocked ? layer.label : '🔒 ロック'}</text>
        `;
      }

      return `
        <defs>
          <linearGradient id="${sid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${unlocked ? color : '#444'}"/>
            <stop offset="100%" stop-color="${unlocked ? dark : '#333'}"/>
          </linearGradient>
        </defs>
        <rect
          x="20" y="${z.y}" width="440" height="${z.h}" rx="${z.rx}"
          fill="url(#${sid})"
          stroke="${isSelected ? '#fff' : 'rgba(255,255,255,0.15)'}"
          stroke-width="${isSelected ? 3 : 1}"
          opacity="${unlocked ? 1 : 0.35}"
        />
        <text x="240" y="${z.y + z.h / 2 - 6}"
              text-anchor="middle" fill="${unlocked ? 'white' : '#666'}"
              font-family="sans-serif" font-size="22" font-weight="bold">${layer.emoji}</text>
        <text x="240" y="${z.y + z.h / 2 + 14}"
              text-anchor="middle" fill="${unlocked ? 'rgba(255,255,255,0.9)' : '#666'}"
              font-family="sans-serif" font-size="14">${unlocked ? layer.label : '🔒 ロック中'}</text>
      `;
    });

    // タップゾーンボタン（SVGの上に重ねるHTML）
    const tapZones = STYLE_LAYERS.map(layer => {
      const unlocked = isUnlocked(layer.id);
      if (!unlocked) return '';
      const pos = LAYER_HOTSPOT_POS[layer.id];
      const isSelected = this._selectedLayer === layer.id && this._tab === 'style';
      return `
        <button class="layer-tap-btn ${isSelected ? 'selected' : ''}"
                data-layer="${layer.id}"
                style="top:${pos.top};height:${pos.height};"
                aria-label="${layer.label}をえらぶ">
        </button>
      `;
    }).join('');

    return `
      <div class="cross-section-inner">
        <svg viewBox="0 0 480 540"
             xmlns="http://www.w3.org/2000/svg"
             width="100%" height="100%"
             preserveAspectRatio="xMidYMid meet">
          <!-- 背景 -->
          <rect width="480" height="540" fill="#1a1a4e"/>
          ${layers.join('')}
        </svg>
        <!-- 透明タップゾーン（SVGの上に重ねる） -->
        <div class="layer-tap-zones">
          ${tapZones}
        </div>
      </div>
    `;
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

    const layerLabel = STYLE_LAYERS.find(l => l.id === this._selectedLayer)?.label || '';

    const cards = HOUSE_STYLES.map(style => {
      const owned      = unlockedStyles.includes(style.id);
      const isCurrent  = style.id === currentStyleId;
      const unlockAt   = Config.HOUSE.STYLE_UNLOCK_WORLDS?.[style.id] ?? 0;
      const worldsLeft = Math.max(0, unlockAt - clearedWorlds);

      return `
        <div class="style-card-v4 ${isCurrent ? 'is-current' : ''} ${!owned ? 'is-locked' : 'is-owned'} rarity-${style.tier || 'basic'}"
             data-style-id="${style.id}"
             style="--sc:${style.color};--sd:${style.colorDark};"
             role="button" tabindex="${owned ? '0' : '-1'}">
          <div class="sc-preview" style="background:linear-gradient(135deg,${style.color},${style.colorDark})">
            <span class="sc-emoji">${style.layerEmoji?.[this._selectedLayer] || style.emoji}</span>
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

    // レイヤータップゾーン
    this._element.querySelectorAll('.layer-tap-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._selectedLayer = btn.dataset.layer;
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
