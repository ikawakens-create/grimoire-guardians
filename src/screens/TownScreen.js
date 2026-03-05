/**
 * TownScreen.js - Grimoire Guardians
 * 街のメインハブ画面 v2.0
 *
 * v2.0 変更点:
 *  - 画像タップ方式のホットスポットUIに全面刷新
 *  - 施設カードを廃止 → 街全景SVGの上に透明タップ領域を重ねる
 *  - house_build + house を「いえ」1つの入口に統合
 *  - ヘッダーオーバーレイに素材バー追加
 *  - 「クイズへ」フッターを廃止
 *  - ロック施設は霧エフェクトで地図上に表示（タップ不可）
 *  - 初回訪問時にパルスアニメで「いえ」を誘導
 *
 * @version 2.0
 * @date 2026-03-05
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';

// 素材絵文字
const MATERIAL_EMOJI = {
  wood: '🪵', stone: '🪨', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
};

/**
 * 街SVGのホットスポット定義
 * position: { left, top, width, height } は画像コンテナに対する %
 */
const HOTSPOTS = [
  {
    id: 'house_build',
    label: '🏠 わたしのいえ',
    sublabel: 'いえをたてよう！',
    screen: 'house_build',
    // 左側の大きな家（SVG内 x:50-285, y:130-430 / 960×540）
    pos: { left: '5%', top: '24%', width: '24%', height: '60%' },
    alwaysUnlocked: true,
    isMain: true,
  },
  {
    id: 'craftsman',
    label: '🔨 ごうせいや',
    sublabel: 'ものをつくる',
    screen: 'craftsman',
    // 中央左（SVG内 x:355-540, y:180-430）
    pos: { left: '37%', top: '33%', width: '19%', height: '54%' },
    alwaysUnlocked: true,
    isMain: false,
  },
  {
    id: 'library',
    label: '🏛️ まどうしょこ',
    sublabel: 'ユニットをみる',
    screen: 'library',
    // 中央右（SVG内 x:600-760, y:165-430）
    pos: { left: '62.5%', top: '31%', width: '17%', height: '56%' },
    alwaysUnlocked: true,
    isMain: false,
  },
];

// ロック施設の霧エフェクト表示エリア（タップ不可）
const LOCKED_ZONE = {
  pos: { left: '82%', top: '35%', width: '16%', height: '55%' },
};

export class TownScreen {
  constructor() {
    this._container  = null;
    this._element    = null;
    this._unsubscribe = null;
  }

  // ─────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────

  show(container) {
    this._container = container;
    TownManager.checkAndUnlockBuildings();
    this._render();
    Logger.info('[TownScreen] v2.0 表示');
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────

  _render() {
    if (!this._container) return;
    if (this._element) this._element.remove();

    const materials  = GameStore.getState('inventory.materials') || {};
    const buildings  = TownManager.getAllBuildingStates();
    const isFirstVisit = !localStorage.getItem('gg_town_visited');

    const el = document.createElement('div');
    el.className = 'town-screen';
    el.innerHTML = `
      <!-- 街マップ（背景 + ホットスポット） -->
      <div class="town-map-wrap">

        <!-- SVGプレースホルダー（画像なし時の常時表示） -->
        <div class="town-svg-bg" aria-hidden="true">
          ${this._renderTownSVG(buildings)}
        </div>

        <!-- 実画像（あれば上書き） -->
        <img class="town-map-img"
             src="assets/town/town_bg.png"
             alt=""
             onerror="this.style.display='none'">

        <!-- ロック施設の霧エリア -->
        <div class="town-locked-fog"
             style="left:${LOCKED_ZONE.pos.left};top:${LOCKED_ZONE.pos.top};width:${LOCKED_ZONE.pos.width};height:${LOCKED_ZONE.pos.height}">
          <span class="town-lock-icon">🔒</span>
          <span class="town-lock-text">もっとすすめたら<br>ひらくよ！</span>
        </div>

        <!-- タップ可能なホットスポット -->
        ${HOTSPOTS.map(h => this._renderHotspot(h, buildings, isFirstVisit)).join('')}

      </div>

      <!-- ヘッダーオーバーレイ -->
      <div class="town-header-overlay">
        <button class="btn-icon town-back-btn" aria-label="ほんだなにもどる">← ほんだな</button>
        <span class="town-title-overlay">✨ まほうのまち ✨</span>
        <div class="town-material-bar">
          ${['wood','stone','brick','gem'].map(id =>
            `<span class="town-mat-chip">${MATERIAL_EMOJI[id]}<span class="town-mat-num">${materials[id] || 0}</span></span>`
          ).join('')}
        </div>
      </div>
    `;

    this._container.appendChild(el);
    this._element = el;

    // 初回訪問フラグを立てる
    if (isFirstVisit) {
      localStorage.setItem('gg_town_visited', '1');
    }

    this._bindEvents();
  }

  /** 街全景のSVGプレースホルダー */
  _renderTownSVG(buildings) {
    return `
      <svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"
           width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="gg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0f0c29"/>
            <stop offset="60%" stop-color="#302b63"/>
            <stop offset="100%" stop-color="#1a0533"/>
          </linearGradient>
          <filter id="fog">
            <feGaussianBlur stdDeviation="6"/>
          </filter>
        </defs>

        <!-- 夜空 -->
        <rect width="960" height="540" fill="url(#gg-sky)"/>

        <!-- 星 -->
        <circle cx="80"  cy="40"  r="2"   fill="white" opacity="0.9"/>
        <circle cx="200" cy="25"  r="1.5" fill="white" opacity="0.7"/>
        <circle cx="340" cy="55"  r="1.5" fill="white" opacity="0.6"/>
        <circle cx="480" cy="20"  r="2"   fill="white" opacity="0.8"/>
        <circle cx="620" cy="45"  r="1.5" fill="white" opacity="0.7"/>
        <circle cx="760" cy="30"  r="2"   fill="white" opacity="0.9"/>
        <circle cx="870" cy="60"  r="1.5" fill="white" opacity="0.5"/>
        <circle cx="150" cy="80"  r="1"   fill="white" opacity="0.6"/>
        <circle cx="550" cy="70"  r="1"   fill="white" opacity="0.7"/>
        <circle cx="700" cy="85"  r="1"   fill="white" opacity="0.5"/>
        <circle cx="920" cy="35"  r="1.5" fill="white" opacity="0.8"/>

        <!-- 地面 -->
        <ellipse cx="480" cy="470" rx="500" ry="80" fill="#1a3a0a" opacity="0.9"/>
        <rect x="0" y="430" width="960" height="110" fill="#1e4a0d"/>

        <!-- 小道 -->
        <ellipse cx="480" cy="445" rx="400" ry="18" fill="#5a3a1a" opacity="0.4"/>

        <!-- ────── いえ（左・大） ────── -->
        <!-- 家の土台 -->
        <rect x="55" y="290" width="230" height="145" fill="#7a4a28" rx="8"/>
        <!-- 1階の窓 -->
        <rect x="80"  y="320" width="50" height="45" fill="#87CEEB" rx="4" opacity="0.8"/>
        <rect x="185" y="320" width="50" height="45" fill="#87CEEB" rx="4" opacity="0.8"/>
        <!-- ドア -->
        <rect x="140" y="350" width="50" height="85" fill="#5a2e0a" rx="4"/>
        <circle cx="181" cy="395" r="4" fill="#f0c040"/>
        <!-- 屋根 -->
        <polygon points="50,290 295,290 172,155" fill="#8B3A2A"/>
        <!-- 屋根のハイライト -->
        <polygon points="172,155 295,290 270,290 172,185" fill="#a04535" opacity="0.5"/>
        <!-- 煙突 -->
        <rect x="215" y="175" width="22" height="45" fill="#6b3020"/>
        <!-- 煙 -->
        <circle cx="226" cy="168" r="10" fill="#888" opacity="0.4"/>
        <circle cx="232" cy="155" r="8"  fill="#888" opacity="0.3"/>

        <!-- ────── ごうせいや（中央） ────── -->
        <rect x="365" y="285" width="165" height="150" fill="#5a5a5a" rx="8"/>
        <!-- 扉 -->
        <rect x="418" y="360" width="60" height="75" fill="#3a3a3a" rx="4"/>
        <circle cx="470" cy="398" r="4" fill="#c0a030"/>
        <!-- 窓 -->
        <rect x="375" y="305" width="45" height="40" fill="#87CEEB" rx="4" opacity="0.7"/>
        <rect x="465" y="305" width="45" height="40" fill="#87CEEB" rx="4" opacity="0.7"/>
        <!-- 屋根 -->
        <polygon points="360,285 535,285 448,195" fill="#707070"/>
        <!-- 看板 -->
        <rect x="390" y="235" width="115" height="32" fill="#8B6914" rx="5"/>
        <text x="448" y="256" text-anchor="middle" fill="white" font-family="sans-serif" font-size="14" font-weight="bold">ごうせいや</text>

        <!-- ────── まどうしょこ（中央右） ────── -->
        <rect x="608" y="270" width="145" height="165" fill="#3a1060" rx="8"/>
        <!-- 窓（魔法的な光） -->
        <rect x="620" y="290" width="40" height="55" fill="#b06aff" rx="4" opacity="0.7"/>
        <rect x="700" y="290" width="40" height="55" fill="#b06aff" rx="4" opacity="0.7"/>
        <!-- ドア -->
        <rect x="655" y="365" width="45" height="70" fill="#260a45" rx="4"/>
        <circle cx="693" cy="400" r="3" fill="#f0c0ff"/>
        <!-- 屋根（三角） -->
        <polygon points="600,270 760,270 680,168" fill="#4a1a80"/>
        <!-- 塔のとんがり -->
        <polygon points="680,168 660,270 700,270" fill="#5a2a90"/>
        <!-- 看板 -->
        <rect x="620" y="215" width="120" height="30" fill="#3a0a70" rx="5"/>
        <text x="680" y="235" text-anchor="middle" fill="#d0a0ff" font-family="sans-serif" font-size="12" font-weight="bold">まどうしょこ</text>

        <!-- ────── ロック施設（右・霧） ────── -->
        <rect x="800" y="295" width="135" height="140" fill="#2a2a2a" rx="8" opacity="0.5"/>
        <polygon points="795,295 940,295 868,210" fill="#3a3a3a" opacity="0.5"/>
        <!-- 霧 -->
        <rect x="783" y="230" width="177" height="220" fill="rgba(120,120,180,0.35)" rx="12" filter="url(#fog)"/>

        <!-- 木 -->
        <rect x="305" y="375" width="12" height="55" fill="#5a3010"/>
        <ellipse cx="311" cy="360" rx="22" ry="25" fill="#2d6a1a"/>
        <rect x="560" y="380" width="10" height="50" fill="#5a3010"/>
        <ellipse cx="565" cy="365" rx="18" ry="20" fill="#2d6a1a"/>
      </svg>
    `;
  }

  /** ホットスポットボタンのHTML */
  _renderHotspot(hotspot, buildings, isFirstVisit) {
    // house_build はつねに解放済み扱い
    const bState = hotspot.alwaysUnlocked
      ? { isUnlocked: true, level: 1 }
      : buildings.find(b => b.config.id === hotspot.id) || { isUnlocked: false };

    if (!bState.isUnlocked) return '';

    const isFirst = isFirstVisit && hotspot.isMain;
    const { left, top, width, height } = hotspot.pos;

    return `
      <button class="town-hotspot-btn ${hotspot.isMain ? 'is-main' : ''} ${isFirst ? 'first-visit-pulse' : ''}"
              data-screen="${hotspot.screen}"
              style="left:${left};top:${top};width:${width};height:${height};"
              aria-label="${hotspot.label}">
        <span class="town-hotspot-label">
          <span class="hotspot-name">${hotspot.label}</span>
          <span class="hotspot-sub">${hotspot.sublabel}</span>
        </span>
        ${isFirst ? '<span class="hotspot-guide-arrow">👆 ここをタップ！</span>' : ''}
      </button>
    `;
  }

  // ─────────────────────────────────────────
  // イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    if (!this._element) return;

    // ← ほんだな
    this._element.querySelector('.town-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'bookshelf');
    });

    // ホットスポットタップ → 画面遷移
    this._element.querySelectorAll('.town-hotspot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const screen = btn.dataset.screen;
        if (screen) {
          this.hide();
          GameStore.setState('app.currentScreen', screen);
        }
      });
    });
  }
}

export default TownScreen;
