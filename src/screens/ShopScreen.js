/**
 * ShopScreen.js - Grimoire Guardians
 * 商店画面
 *
 * - NPC: タヌキ商人（ランダムセリフ）
 * - 日替わり無料アイテム（毎日0時リセット）
 * - 素材トレード（商店Lvに応じて選択肢が増える）
 * - ランダムイベント（将来拡張用スタブ）
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';

const TANUKI_DIALOGUES = {
  idle: [
    'いらっしゃい！今日もいい商売をしようじゃないか！',
    'なんでも交換するぞ！安いもんだ、安いもんだ！',
    'たぬきのしょうばいは信用第一！…たぶんな。',
    '今日の無料アイテムは持ったか？忘れるなよ！',
    '素材がありすぎる？じゃあ交換しようぜ！',
  ],
  tradeSuccess: [
    'ありがとよ！またきてくれ！',
    'お互い得した取引だな！',
    'いい交換だったぜ！',
  ],
  tradeFail: [
    '素材が足りないじゃないか！',
    'もっと集めてから来てくれ！',
  ],
  freeClaim: [
    'サービスだ！また明日もきてくれ！',
    '毎日来てくれるのがうれしいぜ！',
  ],
  alreadyClaimed: [
    '今日の分はもう渡したぞ！明日またきてくれ！',
    '欲しいのはわかるが、一日一回だ！',
  ],
};

const MATERIAL_EMOJI = {
  wood: '🪵', stone: '🪨', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};
const MATERIAL_NAME = {
  wood: 'きのき', stone: 'いし', brick: 'れんが', gem: 'ほうせき',
  star_fragment: 'ほしのかけら', cloth: 'ぬの', paint: 'えのぐ',
  crown: 'おうかん', cape: 'マント', magic_orb: 'まほうのたま',
};

export class ShopScreen {
  constructor() {
    this._container = null;
    this._element   = null;
    this._dialogue  = '';
  }

  show(container) {
    this._container = container;
    this._dialogue  = this._randomDialogue('idle');
    this._render();
    Logger.info('[ShopScreen] 表示');
  }

  hide() {
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────

  _render() {
    if (!this._container) return;
    if (this._element) this._element.remove();

    const shopLevel   = GameStore.getState('town.buildings.shop.level') || 0;
    const materials   = GameStore.getState('inventory.materials') || {};
    const freeItem    = TownManager.getDailyFreeItem();
    const trades      = TownManager.getAvailableTrades();
    const npcCfg      = Config.TOWN.NPCS.find(n => n.id === 'tanuki_merchant');

    const el = document.createElement('div');
    el.className = 'shop-screen facility-screen';
    el.style.cssText = '--fac-color:#d97706;--fac-bg:#fffaed';
    el.innerHTML = `
      <!-- ヘッダー -->
      <div class="shop-header facility-header">
        <button class="btn-icon shop-back-btn" style="color:#fff">← まち</button>
        <h1 class="shop-title facility-title">🛒 しょうてん</h1>
        <span class="shop-lv-badge facility-lv-badge">Lv${shopLevel}</span>
      </div>

      <!-- 2カラム本体 -->
      <div class="facility-body">

        <!-- 左: タヌキ商人 -->
        <aside class="facility-left">
          <div class="facility-npc-wrap">
            <div class="facility-npc-avatar">
              <img src="${npcCfg?.image || ''}" alt="タヌキ商人"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="npc-emoji-fallback" style="display:none">🦝</div>
            </div>
            <p class="facility-npc-name">タヌキ商人</p>
          </div>
          <div class="facility-bubble">
            <p id="shop-dialogue">${this._dialogue}</p>
          </div>
          <div class="facility-mat-chips">
            ${['wood','stone','brick','gem','star_fragment']
              .map(m => `<span class="mat-chip">${MATERIAL_EMOJI[m]}${materials[m]||0}</span>`)
              .join('')}
          </div>
        </aside>

        <!-- 右: コンテンツ -->
        <div class="facility-right" style="overflow-y:auto">

          <!-- 日替わり無料アイテム -->
          <div class="shop-section">
            <h2 class="shop-section-title">🎁 きょうの むりょうアイテム</h2>
            ${freeItem
              ? `<div class="shop-free-item">
                   <span class="free-item-emoji">${MATERIAL_EMOJI[freeItem]}</span>
                   <span class="free-item-name">${MATERIAL_NAME[freeItem] || freeItem} ×1</span>
                   <button class="btn btn-large btn-success shop-claim-btn" data-item="${freeItem}">
                     うけとる！
                   </button>
                 </div>`
              : `<div class="shop-free-claimed">
                   <p>✅ きょうはもううけとりました</p>
                   <p class="shop-reset-hint">（毎日あさ0時にリセット）</p>
                 </div>`
            }
          </div>

          <!-- 素材トレード -->
          <div class="shop-section">
            <h2 class="shop-section-title">🔄 こうかん</h2>
            <div class="shop-trades">
              ${trades.length
                ? trades.map((t, i) => this._renderTrade(t, i, materials)).join('')
                : `<p class="shop-empty">もうすこしでこうかんできるよ！</p>`
              }
            </div>
          </div>
        </div>
      </div>
    `;

    this._container.appendChild(el);
    this._element = el;
    this._bindEvents();
  }

  _renderTrade(trade, index, materials) {
    const { give, receive } = trade;
    const have    = materials[give.material] || 0;
    const canAfford = have >= give.amount;

    return `
      <div class="shop-trade-row ${canAfford ? 'can-afford' : 'cannot-afford'}">
        <div class="trade-give">
          <span class="trade-emoji">${MATERIAL_EMOJI[give.material]}</span>
          <span class="trade-count">${give.amount}</span>
        </div>
        <span class="trade-arrow">→</span>
        <div class="trade-receive">
          <span class="trade-emoji">${MATERIAL_EMOJI[receive.material]}</span>
          <span class="trade-count">${receive.amount}</span>
        </div>
        <button class="btn btn-small ${canAfford ? 'btn-warning' : 'btn-secondary'} trade-btn"
                data-trade="${index}" ${canAfford ? '' : 'disabled'}>
          ${canAfford ? 'こうかん！' : `あと${give.amount - have}`}
        </button>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    if (!this._element) return;

    this._element.querySelector('.shop-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });

    // 無料アイテム受取
    this._element.querySelector('.shop-claim-btn')?.addEventListener('click', () => {
      const result = TownManager.claimDailyFreeItem();
      if (result.success) {
        this._dialogue = this._randomDialogue('freeClaim');
      } else {
        this._dialogue = this._randomDialogue('alreadyClaimed');
      }
      this._render();
    });

    // トレード実行
    this._element.querySelectorAll('.trade-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.trade, 10);
        const result = TownManager.executeTrade(idx);
        if (result.success) {
          this._dialogue = this._randomDialogue('tradeSuccess');
        } else {
          this._dialogue = this._randomDialogue('tradeFail');
        }
        this._render();
      });
    });
  }

  _randomDialogue(scene) {
    const lines = TANUKI_DIALOGUES[scene] || TANUKI_DIALOGUES.idle;
    return lines[Math.floor(Math.random() * lines.length)];
  }
}

export default ShopScreen;
