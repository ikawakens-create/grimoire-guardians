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

import { Config } from '../core/Config.js';
import { GameStore } from '../core/GameStore.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';
import MemoryIsleScreen from './MemoryIsleScreen.js';

// 素材絵文字
const MATERIAL_EMOJI = {
  wood: '🌲', stone: '⛰️', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};

/**
 * 街SVGのホットスポット定義
 * position: { left, top, width, height } は画像コンテナに対する %
 */
const HOTSPOTS = [
  {
    id: 'house',
    label: '🏠 わたしのいえ',
    sublabel: 'いえをかんしょう！',
    screen: 'house',
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
  {
    id: 'memory_isle',
    label: '🏝️ きおくのいせき',
    sublabel: 'モンスターをあつめよう',
    screen: 'memory_isle',
    // 右側エリア（元ロックゾーン）
    pos: { left: '82%', top: '35%', width: '16%', height: '55%' },
    alwaysUnlocked: true,
    isMain: false,
  },
];


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

    const materials    = GameStore.getState('inventory.materials') || {};
    const isFirstVisit = !localStorage.getItem('gg_town_visited');

    const el = document.createElement('div');
    el.className = 'town-screen';
    el.innerHTML = `
      <!-- 街マップ（背景 + ホットスポット） -->
      <div class="town-map-wrap">

        <!-- SVGプレースホルダー（画像なし時の常時表示） -->
        <div class="town-svg-bg" aria-hidden="true">
          ${this._renderTownSVG()}
        </div>

        <!-- 実画像（あれば上書き） -->
        <img class="town-map-img"
             src="assets/town/town_bg.png"
             alt=""
             onerror="this.style.display='none'">

        <!-- タップ可能なホットスポット -->
        ${HOTSPOTS.map(h => this._renderHotspot(h, isFirstVisit)).join('')}

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
  _renderTownSVG() {
    return `
      <svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg"
           width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <!-- 夜空グラデ -->
          <linearGradient id="gg-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#04081a"/>
            <stop offset="45%"  stop-color="#0d1840"/>
            <stop offset="80%"  stop-color="#1a1845"/>
            <stop offset="100%" stop-color="#0a0d20"/>
          </linearGradient>
          <!-- 山グラデ -->
          <linearGradient id="mtn-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#111830"/>
            <stop offset="100%" stop-color="#070b18"/>
          </linearGradient>
          <!-- 地面グラデ -->
          <linearGradient id="gnd-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#1d4a0c"/>
            <stop offset="100%" stop-color="#0b2206"/>
          </linearGradient>
          <!-- 月グロー -->
          <radialGradient id="moon-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#fffce8" stop-opacity="1"/>
            <stop offset="55%"  stop-color="#fff5b0" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#d4c860" stop-opacity="0"/>
          </radialGradient>
          <!-- 暖色窓グロー -->
          <radialGradient id="win-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#ffd966" stop-opacity="1"/>
            <stop offset="100%" stop-color="#ff7700" stop-opacity="0"/>
          </radialGradient>
          <!-- 魔法窓グロー -->
          <radialGradient id="win-magic" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#dd88ff" stop-opacity="1"/>
            <stop offset="100%" stop-color="#5500bb" stop-opacity="0"/>
          </radialGradient>
          <!-- 炎グロー -->
          <radialGradient id="fire-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stop-color="#ffe066" stop-opacity="1"/>
            <stop offset="40%"  stop-color="#ff8800" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#cc3300" stop-opacity="0"/>
          </radialGradient>
          <!-- ぼかし(霧) -->
          <filter id="blur-fog"><feGaussianBlur stdDeviation="9"/></filter>
          <!-- ソフトグロー -->
          <filter id="f-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <!-- 強グロー -->
          <filter id="f-glow2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <!-- 木目 -->
          <pattern id="pat-wood" width="16" height="8" patternUnits="userSpaceOnUse">
            <rect width="16" height="8" fill="#7c4a28"/>
            <line x1="0" y1="2" x2="16" y2="2.5" stroke="#8f5c36" stroke-width="0.7" opacity="0.5"/>
            <line x1="0" y1="5.5" x2="16" y2="5" stroke="#673818" stroke-width="0.7" opacity="0.4"/>
          </pattern>
          <!-- 石材 -->
          <pattern id="pat-stone" width="22" height="14" patternUnits="userSpaceOnUse">
            <rect width="22" height="14" fill="#5c5468"/>
            <rect x="0" y="0"  width="11" height="7"  fill="#686080" opacity="0.45"/>
            <rect x="11" y="7" width="11" height="7"  fill="#504860" opacity="0.45"/>
            <rect x="1" y="1" width="9" height="5" fill="none" stroke="#7a7088" stroke-width="0.3" opacity="0.35"/>
            <rect x="12" y="8" width="9" height="5" fill="none" stroke="#7a7088" stroke-width="0.3" opacity="0.35"/>
          </pattern>
          <!-- 魔法石 -->
          <pattern id="pat-magic" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="#200645"/>
            <text x="3" y="18" fill="#5a20a0" font-size="14" opacity="0.35">✦</text>
          </pattern>
        </defs>

        <!-- ===== 夜空 ===== -->
        <rect width="960" height="540" fill="url(#gg-sky)"/>
        <!-- オーロラ風アクセント -->
        <ellipse cx="220" cy="110" rx="270" ry="70" fill="#180640" opacity="0.45"/>
        <ellipse cx="680" cy="90"  rx="220" ry="55" fill="#0a1638" opacity="0.35"/>

        <!-- ===== 星 ===== -->
        <g opacity="0.9">
          <circle cx="40"  cy="20"  r="1.2" fill="white"/>
          <circle cx="78"  cy="44"  r="0.9" fill="white" opacity="0.7"/>
          <circle cx="118" cy="16"  r="1.1" fill="white"/>
          <circle cx="152" cy="52"  r="0.7" fill="white" opacity="0.6"/>
          <circle cx="190" cy="28"  r="1.4" fill="#ffe0a0"/>
          <circle cx="228" cy="65"  r="0.8" fill="white" opacity="0.8"/>
          <circle cx="260" cy="13"  r="1.0" fill="white"/>
          <circle cx="292" cy="40"  r="0.6" fill="white" opacity="0.5"/>
          <circle cx="325" cy="24"  r="1.2" fill="white"/>
          <circle cx="360" cy="55"  r="0.9" fill="white" opacity="0.7"/>
          <circle cx="395" cy="11"  r="0.8" fill="white"/>
          <circle cx="428" cy="46"  r="1.2" fill="#dde8ff"/>
          <circle cx="462" cy="22"  r="0.7" fill="white" opacity="0.6"/>
          <circle cx="496" cy="60"  r="1.0" fill="white"/>
          <circle cx="532" cy="16"  r="1.3" fill="white"/>
          <circle cx="568" cy="38"  r="0.8" fill="white" opacity="0.8"/>
          <circle cx="602" cy="53"  r="0.9" fill="#ffc8a0" opacity="0.9"/>
          <circle cx="638" cy="20"  r="1.0" fill="white"/>
          <circle cx="672" cy="46"  r="0.7" fill="white" opacity="0.6"/>
          <circle cx="708" cy="13"  r="1.2" fill="white"/>
          <circle cx="742" cy="36"  r="0.8" fill="white" opacity="0.7"/>
          <circle cx="778" cy="22"  r="1.1" fill="#e0deff"/>
          <circle cx="815" cy="50"  r="0.7" fill="white" opacity="0.5"/>
          <circle cx="852" cy="16"  r="1.0" fill="white"/>
          <circle cx="888" cy="43"  r="1.2" fill="white"/>
          <circle cx="922" cy="26"  r="0.8" fill="white" opacity="0.8"/>
          <circle cx="948" cy="56"  r="0.9" fill="white" opacity="0.6"/>
          <!-- 小さな星 -->
          <circle cx="60"  cy="72"  r="0.6" fill="white" opacity="0.5"/>
          <circle cx="175" cy="80"  r="0.5" fill="white" opacity="0.4"/>
          <circle cx="310" cy="68"  r="0.6" fill="white" opacity="0.5"/>
          <circle cx="445" cy="78"  r="0.5" fill="white" opacity="0.45"/>
          <circle cx="588" cy="72"  r="0.6" fill="white" opacity="0.5"/>
          <circle cx="720" cy="80"  r="0.5" fill="white" opacity="0.4"/>
          <circle cx="855" cy="70"  r="0.6" fill="white" opacity="0.5"/>
          <!-- 星座ライン -->
          <line x1="118" y1="16" x2="152" y2="52" stroke="white" stroke-width="0.3" opacity="0.2"/>
          <line x1="152" y1="52" x2="190" y2="28" stroke="white" stroke-width="0.3" opacity="0.2"/>
          <line x1="532" y1="16" x2="568" y2="38" stroke="white" stroke-width="0.3" opacity="0.18"/>
          <line x1="568" y1="38" x2="602" y2="53" stroke="white" stroke-width="0.3" opacity="0.18"/>
          <line x1="708" y1="13" x2="742" y2="36" stroke="white" stroke-width="0.3" opacity="0.2"/>
          <line x1="742" y1="36" x2="778" y2="22" stroke="white" stroke-width="0.3" opacity="0.2"/>
        </g>

        <!-- ===== 月 ===== -->
        <circle cx="138" cy="68" r="58" fill="#fffce8" opacity="0.06" filter="url(#blur-fog)"/>
        <circle cx="138" cy="68" r="38" fill="#fffce8" opacity="0.12" filter="url(#blur-fog)"/>
        <circle cx="138" cy="68" r="26" fill="#fffce0" opacity="0.88" filter="url(#f-glow)"/>
        <circle cx="138" cy="68" r="23" fill="#fffff5"/>
        <!-- 月の模様 -->
        <circle cx="145" cy="60" r="5"  fill="#f0e8c0" opacity="0.35"/>
        <circle cx="130" cy="74" r="3.5" fill="#f0e8c0" opacity="0.28"/>
        <!-- 三日月の影 -->
        <circle cx="148" cy="62" r="20" fill="#0d1540" opacity="0.88"/>

        <!-- ===== 遠景の山 ===== -->
        <polygon points="0,310 90,215 178,268 265,198 352,238 438,178 524,228 610,172 696,222 782,186 868,228 960,195 960,320 0,320"
                 fill="url(#mtn-grad)" opacity="0.65"/>
        <!-- 手前の丘 -->
        <polygon points="0,355 110,290 215,322 318,278 424,308 530,272 636,302 742,282 848,314 960,288 960,370 0,370"
                 fill="#0c1c38" opacity="0.75"/>

        <!-- ===== 地面 ===== -->
        <rect x="0" y="405" width="960" height="135" fill="url(#gnd-grad)"/>
        <rect x="0" y="403" width="960" height="5"  fill="#265a12" opacity="0.9"/>
        <rect x="0" y="405" width="960" height="10" fill="#224f0f" opacity="0.7"/>
        <!-- 石畳の道 -->
        <ellipse cx="480" cy="462" rx="390" ry="24" fill="#3c2c1c" opacity="0.75"/>
        <ellipse cx="480" cy="460" rx="375" ry="19" fill="#4a3822" opacity="0.55"/>
        <!-- 石のテクスチャ -->
        <ellipse cx="290" cy="458" rx="24" ry="9"  fill="#564030" opacity="0.5"/>
        <ellipse cx="355" cy="465" rx="19" ry="7"  fill="#564030" opacity="0.4"/>
        <ellipse cx="415" cy="458" rx="22" ry="8"  fill="#564030" opacity="0.5"/>
        <ellipse cx="476" cy="466" rx="25" ry="9"  fill="#564030" opacity="0.4"/>
        <ellipse cx="536" cy="459" rx="19" ry="8"  fill="#564030" opacity="0.5"/>
        <ellipse cx="594" cy="466" rx="23" ry="8"  fill="#564030" opacity="0.4"/>
        <ellipse cx="652" cy="459" rx="20" ry="7"  fill="#564030" opacity="0.5"/>
        <!-- 炉の地面光 -->
        <ellipse cx="447" cy="435" rx="110" ry="22" fill="#ff8800" opacity="0.07"/>

        <!-- ===== 背景の木々 ===== -->
        <rect x="44"  y="355" width="8" height="50" fill="#3c1e08" opacity="0.7"/>
        <ellipse cx="48"  cy="342" rx="26" ry="32" fill="#0c2808" opacity="0.7"/>
        <ellipse cx="36"  cy="352" rx="18" ry="22" fill="#0f3009" opacity="0.65"/>
        <rect x="912" y="350" width="8" height="52" fill="#3c1e08" opacity="0.6"/>
        <ellipse cx="916" cy="337" rx="28" ry="34" fill="#0c2808" opacity="0.6"/>
        <ellipse cx="928" cy="348" rx="19" ry="24" fill="#0f3009" opacity="0.6"/>

        <!-- 建物間の木（左中） -->
        <rect x="316" y="356" width="11" height="62" fill="#3c1e08"/>
        <ellipse cx="322" cy="342" rx="28" ry="34" fill="#1c4c10"/>
        <ellipse cx="310" cy="352" rx="20" ry="25" fill="#205512"/>
        <ellipse cx="336" cy="347" rx="22" ry="27" fill="#184010"/>
        <!-- ホタル -->
        <circle cx="307" cy="332" r="2.5" fill="#44ff88" opacity="0.75" filter="url(#f-glow)"/>
        <circle cx="338" cy="356" r="1.8" fill="#66ffaa" opacity="0.65" filter="url(#f-glow)"/>
        <circle cx="295" cy="350" r="1.5" fill="#55ee77" opacity="0.55" filter="url(#f-glow)"/>

        <!-- 建物間の木（中右） -->
        <rect x="574" y="362" width="10" height="55" fill="#3c1e08"/>
        <ellipse cx="579" cy="348" rx="24" ry="29" fill="#184010"/>
        <ellipse cx="568" cy="358" rx="17" ry="21" fill="#1c4a12"/>
        <ellipse cx="592" cy="353" rx="19" ry="23" fill="#163a0d"/>
        <!-- ホタル -->
        <circle cx="547" cy="356" r="2" fill="#ffff44" opacity="0.65" filter="url(#f-glow)"/>
        <circle cx="560" cy="344" r="1.5" fill="#ffff88" opacity="0.55" filter="url(#f-glow)"/>

        <!-- ===== いえ（左・ホットスポット対応: x≈50–285, y≈130–440） ===== -->
        <!-- 影 -->
        <ellipse cx="172" cy="438" rx="92" ry="12" fill="black" opacity="0.32"/>
        <!-- 壁（木目） -->
        <rect x="58" y="293" width="228" height="150" fill="url(#pat-wood)"/>
        <rect x="58" y="293" width="228" height="150" fill="#7c4a28" opacity="0.25"/>
        <rect x="58" y="293" width="228" height="150" fill="none" stroke="#5a3015" stroke-width="2.5"/>
        <!-- 窓（左）暖色グロー -->
        <rect x="72" y="316" width="58" height="54" fill="#1e1006" rx="6"/>
        <rect x="74" y="318" width="54" height="50" fill="#ffcc55" rx="5" opacity="0.92"/>
        <rect x="74" y="318" width="54" height="50" fill="url(#win-warm)" rx="5"/>
        <line x1="101" y1="318" x2="101" y2="368" stroke="#7c4a28" stroke-width="2.5" opacity="0.55"/>
        <line x1="74"  y1="343" x2="128" y2="343" stroke="#7c4a28" stroke-width="2.5" opacity="0.55"/>
        <ellipse cx="101" cy="343" rx="40" ry="32" fill="#ffcc44" opacity="0.11" filter="url(#blur-fog)"/>
        <!-- 窓（右） -->
        <rect x="186" y="316" width="58" height="54" fill="#1e1006" rx="6"/>
        <rect x="188" y="318" width="54" height="50" fill="#ffcc55" rx="5" opacity="0.92"/>
        <rect x="188" y="318" width="54" height="50" fill="url(#win-warm)" rx="5"/>
        <line x1="215" y1="318" x2="215" y2="368" stroke="#7c4a28" stroke-width="2.5" opacity="0.55"/>
        <line x1="188" y1="343" x2="242" y2="343" stroke="#7c4a28" stroke-width="2.5" opacity="0.55"/>
        <ellipse cx="215" cy="343" rx="40" ry="32" fill="#ffcc44" opacity="0.11" filter="url(#blur-fog)"/>
        <!-- ドア -->
        <rect x="138" y="353" width="62" height="90" fill="#4a2008" rx="6"/>
        <rect x="141" y="356" width="56" height="85" fill="#5c2e10" rx="5"/>
        <ellipse cx="169" cy="356" rx="28" ry="12" fill="#5c2e10"/>
        <circle cx="192" cy="400" r="5.5" fill="#c8a020"/>
        <circle cx="192" cy="400" r="3.5" fill="#b09018"/>
        <ellipse cx="169" cy="438" rx="42" ry="15" fill="#ffaa00" opacity="0.07"/>
        <!-- 基礎 -->
        <rect x="56" y="440" width="232" height="9" fill="#5a3a15" rx="3"/>
        <!-- 屋根 -->
        <polygon points="44,295 303,295 172,146" fill="#903c2c"/>
        <polygon points="172,146 303,295 272,295 172,178" fill="#a84538" opacity="0.38"/>
        <line x1="44"  y1="295" x2="172" y2="146" stroke="#6c281a" stroke-width="3"/>
        <line x1="303" y1="295" x2="172" y2="146" stroke="#6c281a" stroke-width="3"/>
        <!-- 屋根の瓦ライン -->
        <line x1="85"  y1="258" x2="170" y2="160" stroke="#6c281a" stroke-width="0.6" opacity="0.4"/>
        <line x1="128" y1="268" x2="171" y2="154" stroke="#6c281a" stroke-width="0.6" opacity="0.4"/>
        <line x1="222" y1="264" x2="173" y2="157" stroke="#6c281a" stroke-width="0.6" opacity="0.4"/>
        <line x1="265" y1="276" x2="174" y2="164" stroke="#6c281a" stroke-width="0.6" opacity="0.4"/>
        <!-- 煙突 -->
        <rect x="213" y="168" width="26" height="55" fill="#6c3020"/>
        <rect x="210" y="165" width="32" height="9"  fill="#7c3828" rx="3"/>
        <!-- 煙 -->
        <circle cx="226" cy="158" r="13" fill="#9898a8" opacity="0.38"/>
        <circle cx="232" cy="143" r="10" fill="#9898a8" opacity="0.30"/>
        <circle cx="222" cy="130" r="8"  fill="#8888a0" opacity="0.24"/>
        <circle cx="228" cy="118" r="7"  fill="#8888a0" opacity="0.18"/>
        <!-- 看板 -->
        <rect x="138" y="296" width="70" height="22" fill="#8c6814" rx="4"/>
        <rect x="140" y="298" width="66" height="18" fill="#7a5c12" rx="3"/>
        <text x="173" y="312" text-anchor="middle" fill="#ffd880" font-family="sans-serif" font-size="10" font-weight="bold">わたしのいえ</text>
        <!-- ランタン -->
        <rect x="123" y="388" width="8" height="22" fill="#5a3010"/>
        <rect x="118" y="392" width="18" height="26" fill="#3a1e08" rx="3"/>
        <rect x="120" y="394" width="14" height="22" fill="#ffd944" rx="2" opacity="0.92"/>
        <ellipse cx="127" cy="405" rx="18" ry="14" fill="#ffaa00" opacity="0.14" filter="url(#blur-fog)"/>
        <!-- 柵 -->
        <line x1="46" y1="438" x2="56" y2="408" stroke="#6a3818" stroke-width="2.5"/>
        <line x1="34" y1="438" x2="44" y2="408" stroke="#6a3818" stroke-width="2.5"/>
        <line x1="22" y1="438" x2="32" y2="408" stroke="#6a3818" stroke-width="2.5"/>
        <line x1="22" y1="422" x2="56" y2="418" stroke="#6a3818" stroke-width="2"/>
        <!-- 花 -->
        <circle cx="90" cy="433" r="4.5" fill="#ff88aa" filter="url(#f-glow)"/>
        <circle cx="101" cy="431" r="3.5" fill="#ff99bb" filter="url(#f-glow)"/>
        <circle cx="80"  cy="430" r="4"   fill="#ffaacc" filter="url(#f-glow)"/>

        <!-- ===== ごうせいや（中央・x≈355–540, y≈180–440） ===== -->
        <!-- 影 -->
        <ellipse cx="447" cy="440" rx="92" ry="11" fill="black" opacity="0.35"/>
        <!-- 壁（石材） -->
        <rect x="360" y="290" width="175" height="155" fill="url(#pat-stone)"/>
        <rect x="360" y="290" width="175" height="155" fill="#5c5068" opacity="0.18"/>
        <rect x="360" y="290" width="175" height="155" fill="none" stroke="#4a4060" stroke-width="2.5"/>
        <!-- 炉口 -->
        <rect x="406" y="365" width="84" height="80" fill="#100c14" rx="4"/>
        <ellipse cx="448" cy="365" rx="42" ry="17" fill="#100c14"/>
        <!-- 炎 -->
        <ellipse cx="448" cy="422" rx="36" ry="14" fill="#ee4400" opacity="0.82"/>
        <ellipse cx="448" cy="415" rx="26" ry="20" fill="#ff8800" opacity="0.9"/>
        <ellipse cx="448" cy="407" rx="18" ry="18" fill="#ffcc00" opacity="0.88"/>
        <ellipse cx="448" cy="402" rx="11" ry="12" fill="#ffff88" opacity="0.9" filter="url(#f-glow)"/>
        <!-- 炎の周囲グロー -->
        <ellipse cx="448" cy="402" rx="64" ry="48" fill="#ff8800" opacity="0.11" filter="url(#blur-fog)"/>
        <ellipse cx="448" cy="442" rx="85" ry="22" fill="#ff6600" opacity="0.08" filter="url(#blur-fog)"/>
        <!-- 炉の縁石 -->
        <rect x="404" y="363" width="88" height="6"  fill="#7e6252"/>
        <rect x="402" y="440" width="92" height="6"  fill="#7e6252"/>
        <rect x="402" y="363" width="6"  height="83" fill="#7e6252"/>
        <rect x="488" y="363" width="6"  height="83" fill="#7e6252"/>
        <!-- 窓（左） -->
        <rect x="370" y="306" width="52" height="46" fill="#18141e" rx="5"/>
        <rect x="372" y="308" width="48" height="42" fill="#4e6888" rx="4" opacity="0.55"/>
        <line x1="396" y1="308" x2="396" y2="350" stroke="#3a4860" stroke-width="1.5" opacity="0.8"/>
        <line x1="372" y1="329" x2="420" y2="329" stroke="#3a4860" stroke-width="1.5" opacity="0.8"/>
        <!-- 窓（右） -->
        <rect x="474" y="306" width="52" height="46" fill="#18141e" rx="5"/>
        <rect x="476" y="308" width="48" height="42" fill="#4e6888" rx="4" opacity="0.55"/>
        <line x1="500" y1="308" x2="500" y2="350" stroke="#3a4860" stroke-width="1.5" opacity="0.8"/>
        <line x1="476" y1="329" x2="524" y2="329" stroke="#3a4860" stroke-width="1.5" opacity="0.8"/>
        <!-- 屋根（スレート） -->
        <polygon points="353,292 542,292 447,196" fill="#646470"/>
        <polygon points="353,292 447,196 398,292" fill="#787884" opacity="0.38"/>
        <line x1="353" y1="292" x2="447" y2="196" stroke="#4e4e5e" stroke-width="2.5"/>
        <line x1="542" y1="292" x2="447" y2="196" stroke="#4e4e5e" stroke-width="2.5"/>
        <line x1="353" y1="292" x2="542" y2="292" stroke="#3e3e50" stroke-width="3.5"/>
        <!-- 煙突 -->
        <rect x="430" y="206" width="28" height="64" fill="#5c5c64"/>
        <rect x="427" y="204" width="34" height="10" fill="#6a6a74" rx="3"/>
        <!-- 煙・火花 -->
        <circle cx="444" cy="198" r="10" fill="#808090" opacity="0.34"/>
        <circle cx="450" cy="184" r="8"  fill="#888898" opacity="0.27"/>
        <circle cx="440" cy="172" r="6"  fill="#888898" opacity="0.22"/>
        <circle cx="456" cy="190" r="2.5" fill="#ff8800" opacity="0.65" filter="url(#f-glow)"/>
        <circle cx="436" cy="180" r="2"   fill="#ffcc00" opacity="0.55" filter="url(#f-glow)"/>
        <circle cx="448" cy="175" r="1.8" fill="#ffee44" opacity="0.5"  filter="url(#f-glow)"/>
        <!-- 看板 -->
        <rect x="388" y="242" width="122" height="30" fill="#8c6814" rx="5"/>
        <rect x="390" y="244" width="118" height="26" fill="#7a5c12" rx="4"/>
        <text x="449" y="262" text-anchor="middle" fill="#ffd880" font-family="sans-serif" font-size="13" font-weight="bold">ごうせいや</text>
        <!-- 金床サイン -->
        <line x1="449" y1="272" x2="449" y2="282" stroke="#888" stroke-width="1.5"/>
        <ellipse cx="449" cy="287" rx="11" ry="6" fill="#8a8090"/>
        <!-- 道具掛け -->
        <line x1="363" y1="360" x2="363" y2="393" stroke="#808088" stroke-width="1.5"/>
        <ellipse cx="363" cy="357" rx="6.5" ry="4.5" fill="#9a8070" opacity="0.85"/>
        <line x1="377" y1="357" x2="377" y2="396" stroke="#808088" stroke-width="1.5"/>
        <ellipse cx="377" cy="354" rx="5.5" ry="4" fill="#9a8070" opacity="0.8"/>
        <!-- 樽と薪 -->
        <rect x="362" y="415" width="31" height="29" fill="#7c5028" rx="4"/>
        <line x1="362" y1="423" x2="393" y2="423" stroke="#5c3518" stroke-width="2"/>
        <line x1="362" y1="431" x2="393" y2="431" stroke="#5c3518" stroke-width="2"/>
        <rect x="504" y="416" width="42" height="11" fill="#7c5028" rx="2"/>
        <rect x="507" y="405" width="36" height="11" fill="#8c5a30" rx="2"/>
        <rect x="511" y="394" width="28" height="11" fill="#7a4a20" rx="2"/>

        <!-- ===== まどうしょこ（中央右・x≈600–763, y≈165–440） ===== -->
        <!-- 影 -->
        <ellipse cx="683" cy="440" rx="86" ry="11" fill="black" opacity="0.42"/>
        <!-- 壁（魔法石） -->
        <rect x="604" y="274" width="157" height="172" fill="url(#pat-magic)"/>
        <rect x="604" y="274" width="157" height="172" fill="#300858" opacity="0.6"/>
        <rect x="604" y="274" width="157" height="172" fill="none" stroke="#4c1880" stroke-width="2.5"/>
        <!-- 魔法窓（左）アーチ -->
        <rect x="614" y="294" width="46" height="67" fill="#080318" rx="5"/>
        <ellipse cx="637" cy="294" rx="23" ry="10" fill="#080318"/>
        <rect x="616" y="296" width="42" height="63" fill="#9955cc" rx="4" opacity="0.72"/>
        <rect x="616" y="296" width="42" height="63" fill="url(#win-magic)" rx="4"/>
        <ellipse cx="637" cy="328" rx="28" ry="36" fill="#cc88ff" opacity="0.18" filter="url(#blur-fog)"/>
        <line x1="637" y1="296" x2="637" y2="359" stroke="#6828a4" stroke-width="1.5" opacity="0.6"/>
        <line x1="616" y1="327" x2="658" y2="327" stroke="#6828a4" stroke-width="1.5" opacity="0.6"/>
        <!-- 魔法窓（右） -->
        <rect x="704" y="294" width="46" height="67" fill="#080318" rx="5"/>
        <ellipse cx="727" cy="294" rx="23" ry="10" fill="#080318"/>
        <rect x="706" y="296" width="42" height="63" fill="#9955cc" rx="4" opacity="0.72"/>
        <rect x="706" y="296" width="42" height="63" fill="url(#win-magic)" rx="4"/>
        <ellipse cx="727" cy="328" rx="28" ry="36" fill="#cc88ff" opacity="0.18" filter="url(#blur-fog)"/>
        <line x1="727" y1="296" x2="727" y2="359" stroke="#6828a4" stroke-width="1.5" opacity="0.6"/>
        <line x1="706" y1="327" x2="748" y2="327" stroke="#6828a4" stroke-width="1.5" opacity="0.6"/>
        <!-- ドア -->
        <rect x="658" y="374" width="50" height="72" fill="#18053a" rx="5"/>
        <ellipse cx="683" cy="374" rx="25" ry="12" fill="#18053a"/>
        <rect x="658" y="374" width="50" height="72" fill="none" stroke="#9944cc" stroke-width="1.5" rx="5" opacity="0.7"/>
        <ellipse cx="683" cy="374" rx="25" ry="12" fill="none" stroke="#9944cc" stroke-width="1.5" opacity="0.7"/>
        <circle cx="700" cy="412" r="5"   fill="#cc88ff"/>
        <circle cx="700" cy="412" r="3.2" fill="#aa66dd"/>
        <ellipse cx="683" cy="442" rx="36" ry="12" fill="#9944cc" opacity="0.08" filter="url(#blur-fog)"/>
        <!-- 塔 -->
        <rect x="655" y="220" width="56" height="56" fill="#3c0a72"/>
        <rect x="663" y="230" width="16" height="23" fill="#060115" rx="3"/>
        <rect x="665" y="232" width="12" height="19" fill="#bb88ff" rx="2" opacity="0.82"/>
        <rect x="686" y="230" width="16" height="23" fill="#060115" rx="3"/>
        <rect x="688" y="232" width="12" height="19" fill="#bb88ff" rx="2" opacity="0.82"/>
        <ellipse cx="683" cy="241" rx="34" ry="22" fill="#aa66ff" opacity="0.14" filter="url(#blur-fog)"/>
        <!-- 尖塔 -->
        <polygon points="600,276 764,276 682,172" fill="#4c1a8c"/>
        <polygon points="600,276 682,172 638,276" fill="#5c2a9c" opacity="0.38"/>
        <circle cx="682" cy="172" r="9" fill="#cc88ff" opacity="0.65" filter="url(#f-glow2)"/>
        <circle cx="682" cy="172" r="4.5" fill="#eeccff"/>
        <line x1="600" y1="276" x2="682" y2="172" stroke="#3c106c" stroke-width="2.5"/>
        <line x1="764" y1="276" x2="682" y2="172" stroke="#3c106c" stroke-width="2.5"/>
        <!-- 看板 -->
        <rect x="618" y="224" width="130" height="28" fill="#280650" rx="5"/>
        <rect x="620" y="226" width="126" height="24" fill="#1e0440" rx="4"/>
        <text x="683" y="243" text-anchor="middle" fill="#cc88ff" font-family="sans-serif" font-size="12" font-weight="bold">まどうしょこ</text>
        <!-- 魔法クリスタル -->
        <polygon points="692,420 697,400 702,420" fill="#c0a0ff" opacity="0.72" filter="url(#f-glow)"/>
        <polygon points="692,420 697,408 702,420" fill="#e0c8ff" opacity="0.9"/>
        <!-- 魔法ルーン -->
        <text x="608" y="362" fill="#8844bb" font-size="17" opacity="0.48" filter="url(#f-glow)">✦</text>
        <text x="752" y="344" fill="#7733aa" font-size="15" opacity="0.38" filter="url(#f-glow)">✧</text>
        <text x="760" y="372" fill="#aa66cc" font-size="13" opacity="0.32" filter="url(#f-glow)">⋆</text>
        <!-- 壁のグロー縁取り -->
        <rect x="604" y="274" width="157" height="172" fill="none" stroke="#7733aa" stroke-width="1" opacity="0.28" rx="4"/>

        <!-- ===== ロックエリア（右・霧） ===== -->
        <!-- 建物シルエット -->
        <rect x="800" y="305" width="142" height="142" fill="#28243a" rx="8" opacity="0.42"/>
        <polygon points="793,307 947,307 870,213" fill="#343048" opacity="0.45"/>
        <rect x="852" y="240" width="36" height="68" fill="#28243a" opacity="0.32"/>
        <polygon points="848,242 892,242 870,198" fill="#303044" opacity="0.36"/>
        <circle cx="870" cy="198" r="5" fill="#6060a8" opacity="0.3"/>
        <!-- 霧のオーバーレイ -->
        <rect x="782" y="212" width="183" height="243" fill="#6878b8" opacity="0.18" rx="15" filter="url(#blur-fog)"/>
        <rect x="790" y="228" width="168" height="225" fill="#8090c0" opacity="0.14" rx="12"/>

        <!-- ===== 前景の草・花 ===== -->
        <ellipse cx="55"  cy="430" rx="42" ry="13" fill="#1c4210" opacity="0.72"/>
        <ellipse cx="912" cy="432" rx="40" ry="12" fill="#1c4210" opacity="0.65"/>
        <ellipse cx="322" cy="434" rx="24" ry="9"  fill="#1e4812" opacity="0.7"/>
        <ellipse cx="562" cy="430" rx="20" ry="8"  fill="#1e4812" opacity="0.62"/>
        <ellipse cx="778" cy="434" rx="26" ry="10" fill="#1c4010" opacity="0.65"/>
        <!-- 前景花 -->
        <circle cx="30"  cy="422" r="4"   fill="#ff99bb" opacity="0.85" filter="url(#f-glow)"/>
        <circle cx="16"  cy="430" r="3"   fill="#ffaacc" opacity="0.75"/>
        <circle cx="42"  cy="427" r="3.5" fill="#ff88aa" opacity="0.82" filter="url(#f-glow)"/>
        <circle cx="933" cy="424" r="3.5" fill="#aaddff" opacity="0.75" filter="url(#f-glow)"/>
        <circle cx="945" cy="432" r="2.8" fill="#bbccff" opacity="0.65"/>
        <!-- 追加ホタル -->
        <circle cx="248" cy="350" r="2.8" fill="#44ff88" opacity="0.72" filter="url(#f-glow)"/>
        <circle cx="264" cy="340" r="2"   fill="#66ffaa" opacity="0.62" filter="url(#f-glow)"/>
        <circle cx="598" cy="378" r="2.2" fill="#cc55ff" opacity="0.52" filter="url(#f-glow)"/>
        <circle cx="590" cy="367" r="1.8" fill="#bb44ee" opacity="0.44" filter="url(#f-glow)"/>
        <circle cx="782" cy="348" r="2.5" fill="#44aaff" opacity="0.48" filter="url(#f-glow)"/>
      </svg>
    `;
  }

  /** ホットスポットボタンのHTML */
  _renderHotspot(hotspot, isFirstVisit) {
    // 現バージョンの HOTSPOTS はすべて alwaysUnlocked: true
    if (!hotspot.alwaysUnlocked) return '';

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
        if (!screen) return;

        // きおくのいせきはモーダル方式で開く（画面遷移しない）
        if (screen === 'memory_isle' && Config.FEATURES.ENABLE_MEMORY_ISLE) {
          const memoryScreen = new MemoryIsleScreen();
          memoryScreen.open();
          return;
        }

        this.hide();
        GameStore.setState('app.currentScreen', screen);
      });
    });
  }
}

export default TownScreen;
