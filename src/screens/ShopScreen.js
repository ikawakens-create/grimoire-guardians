/**
 * ShopScreen.js - Grimoire Guardians
 * 商店画面 v2.0
 *
 * 変更点 (v2.0):
 *   - タヌキ商人をキャラクター語尾（〜タヌ）に統一
 *   - 無料アイテムを大型カード + 明日の予告表示に改修
 *   - 交換カードを可能/不可でソート・視覚差を強化
 *   - 所持素材を全10種グリッド表示に変更
 *   - 素材名バグ修正 (きのき → まるた, まほうのたま → まほうだま)
 *   - Lv0空状態に合成屋誘導を追加
 *
 * @version 2.0
 * @date 2026-03-08
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';

// ─────────────────────────────────────────────
// タヌキ商人のセリフ（語尾統一・子供向け）
// ─────────────────────────────────────────────
const TANUKI_DIALOGUES = {
  idle: [
    'なんでもこうかんするタヌ！',
    'きょうのプレゼント、もらったタヌか？',
    'そざいがあまったら こうかんするタヌよ！',
    'まいにちきてくれると うれしいタヌ！',
    'なんでもそろってるタヌよ〜！',
  ],
  tradeSuccess: [
    'やったータヌ！いいこうかんだったタヌ！',
    'ありがとうタヌ！またきてタヌ！',
    'おたがいとくしたタヌね！',
  ],
  tradeFail: [
    'そざいがたりないタヌ〜！',
    'もうすこしあつめてくるタヌ！',
  ],
  freeClaim: [
    'プレゼントだタヌ！またあしたもきてタヌ！',
    'まいにちきてくれてうれしいタヌ！',
  ],
  alreadyClaimed: [
    'またあしたくるタヌ！まってるタヌよ！',
    'きょうのぶんはもうわたしたタヌ！',
  ],
};

// ─────────────────────────────────────────────
// 素材定義（名前バグ修正済み）
// ─────────────────────────────────────────────
const MATERIAL_EMOJI = {
  wood: '🪵', stone: '🪨', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};
const MATERIAL_NAME = {
  wood:          'まるた',
  stone:         'いし',
  brick:         'れんが',
  gem:           'ほうせき',
  star_fragment: 'ほしのかけら',
  cloth:         'ぬの',
  paint:         'えのぐ',
  crown:         'おうかん',
  cape:          'マント',
  magic_orb:     'まほうだま',
};

// 全10素材を左パネルに表示する順序
const ALL_MATERIALS = [
  'wood', 'stone', 'brick', 'gem', 'star_fragment',
  'cloth', 'paint', 'crown', 'cape', 'magic_orb',
];

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

    const shopLevel = GameStore.getState('town.buildings.shop.level') || 0;
    const materials = GameStore.getState('inventory.materials') || {};
    const freeItem  = TownManager.getDailyFreeItem();
    const trades    = TownManager.getAvailableTrades();
    const npcCfg    = Config.TOWN.NPCS.find(n => n.id === 'tanuki_merchant');

    // 交換可能カードを上にソート（元インデックスを保持）
    const sortedTrades = trades
      .map((t, i) => ({ trade: t, origIndex: i, canAfford: (materials[t.give.material] || 0) >= t.give.amount }))
      .sort((a, b) => b.canAfford - a.canAfford);

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

        <!-- 左: タヌキ商人 + 所持素材（全10種） -->
        <aside class="facility-left shop-left">
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
          <!-- 全10素材グリッド -->
          <div class="shop-mat-grid">
            ${ALL_MATERIALS.map(m => {
              const count = materials[m] || 0;
              return `
                <div class="shop-mat-cell ${count === 0 ? 'is-zero' : ''}">
                  <span class="shop-mat-emoji">${MATERIAL_EMOJI[m]}</span>
                  <span class="shop-mat-count">×${count}</span>
                </div>`;
            }).join('')}
          </div>
        </aside>

        <!-- 右: コンテンツ -->
        <div class="facility-right shop-right">

          <!-- 日替わり無料アイテム（Lv0は非表示） -->
          ${shopLevel > 0 ? this._renderFreeItem(freeItem) : ''}

          <!-- 素材交換 -->
          <div class="shop-section">
            <h2 class="shop-section-title">🔄 こうかん</h2>
            ${this._renderTrades(sortedTrades, materials, shopLevel)}
          </div>

        </div>
      </div>
    `;

    this._container.appendChild(el);
    this._element = el;
    this._bindEvents();
  }

  // ─────────────────────────────────────────
  // 無料アイテムカード
  // ─────────────────────────────────────────

  _renderFreeItem(freeItem) {
    const tomorrowItem = this._getTomorrowItem();

    if (freeItem) {
      return `
        <div class="shop-section">
          <h2 class="shop-section-title">🎁 きょうのプレゼント！</h2>
          <div class="shop-free-card can-claim">
            <div class="free-card-item">
              <span class="free-card-emoji">${MATERIAL_EMOJI[freeItem]}</span>
              <span class="free-card-name">${MATERIAL_NAME[freeItem] || freeItem}</span>
              <span class="free-card-count">×1</span>
            </div>
            <button class="btn btn-large btn-success shop-claim-btn" data-item="${freeItem}">
              ✨ もらうタヌ！
            </button>
          </div>
        </div>`;
    }

    return `
      <div class="shop-section">
        <h2 class="shop-section-title">🎁 きょうのプレゼント</h2>
        <div class="shop-free-card already-claimed">
          <p class="free-claimed-msg">✅ もらったよ！またあしたね！</p>
          ${tomorrowItem ? `
            <div class="free-tomorrow-hint">
              <span class="tomorrow-label">あしたのプレゼント：</span>
              <span class="tomorrow-emoji">${MATERIAL_EMOJI[tomorrowItem]}</span>
              <span class="tomorrow-name">${MATERIAL_NAME[tomorrowItem]}</span>
            </div>` : ''}
        </div>
      </div>`;
  }

  // ─────────────────────────────────────────
  // 交換カード一覧
  // ─────────────────────────────────────────

  _renderTrades(sortedTrades, materials, shopLevel) {
    if (shopLevel === 0) {
      return `
        <div class="shop-empty-state">
          <p class="shop-empty-msg">🔒 しょうてんをレベルアップすると<br>こうかんできるよ！</p>
          <button class="btn btn-small btn-secondary shop-goto-craftsman-btn">
            ⚒️ ごうせいやへ
          </button>
        </div>`;
    }

    if (sortedTrades.length === 0) {
      return `<p class="shop-empty">もうすこしでこうかんできるタヌ！</p>`;
    }

    return `<div class="shop-trades-grid">
      ${sortedTrades.map(({ trade, origIndex, canAfford }) =>
        this._renderTradeCard(trade, origIndex, materials, canAfford)
      ).join('')}
    </div>`;
  }

  _renderTradeCard(trade, index, materials, canAfford) {
    const { give, receive } = trade;
    const have    = materials[give.material] || 0;
    const lacking = give.amount - have;

    return `
      <div class="shop-trade-card ${canAfford ? 'can-afford' : 'cannot-afford'}">
        <div class="trade-card-body">
          <div class="trade-side give-side">
            <span class="trade-big-emoji">${MATERIAL_EMOJI[give.material]}</span>
            <span class="trade-mat-name">${MATERIAL_NAME[give.material]}</span>
            <span class="trade-mat-amount">×${give.amount}</span>
          </div>
          <span class="trade-card-arrow">➡️</span>
          <div class="trade-side receive-side">
            <span class="trade-big-emoji">${MATERIAL_EMOJI[receive.material]}</span>
            <span class="trade-mat-name">${MATERIAL_NAME[receive.material]}</span>
            <span class="trade-mat-amount">×${receive.amount}</span>
          </div>
        </div>
        <div class="trade-card-status">
          <span class="trade-have-label">いまもってる：${MATERIAL_EMOJI[give.material]} ×${have}</span>
        </div>
        <button class="btn ${canAfford ? 'btn-warning trade-btn' : 'btn-secondary trade-btn-disabled'}"
                data-trade="${index}" ${canAfford ? '' : 'disabled'}>
          ${canAfford ? 'こうかん！' : `あと ${lacking} こ！`}
        </button>
      </div>`;
  }

  // ─────────────────────────────────────────
  // ユーティリティ
  // ─────────────────────────────────────────

  /** 翌日の無料アイテムを返す */
  _getTomorrowItem() {
    const dow = new Date().getDay();
    const tomorrowDow = (dow + 1) % 7;
    return Config.TOWN.SHOP.DAILY_FREE[tomorrowDow] || null;
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
      this._dialogue = this._randomDialogue(result.success ? 'freeClaim' : 'alreadyClaimed');
      this._render();
    });

    // 合成屋へ誘導
    this._element.querySelector('.shop-goto-craftsman-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'craftsman');
    });

    // 交換実行
    this._element.querySelectorAll('.trade-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.trade, 10);
        const result = TownManager.executeTrade(idx);
        this._dialogue = this._randomDialogue(result.success ? 'tradeSuccess' : 'tradeFail');
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
