/**
 * TownScreen.js - Grimoire Guardians
 * 街のメインハブ画面
 *
 * - 背景: assets/town/town_bg.png（Gemini生成・差し替え可）
 * - 施設カード: 施設Lvに応じて建物画像が変化
 * - 通知バッジ: 農場収穫可能・商店無料アイテムなど
 * - 施設解放アニメーション: 初解放時にお祝い演出
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';

export class TownScreen {
  constructor() {
    this._container = null;
    this._element   = null;
    this._unsubscribe = null;
  }

  // ─────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────

  show(container) {
    this._container = container;
    // 解放チェック（クイズ後に戻ってきたとき用）
    TownManager.checkAndUnlockBuildings();
    this._render();
    Logger.info('[TownScreen] 表示');
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

    const buildings  = TownManager.getAllBuildingStates();
    const notifs     = TownManager.getNotifications();

    const el = document.createElement('div');
    el.className = 'town-screen';
    el.innerHTML = `
      <div class="town-bg" style="background-image:url('assets/town/town_bg.png')"></div>

      <div class="town-header">
        <button class="btn-icon town-back-btn">← ほんだな</button>
        <h1 class="town-title">✨ まほうのまち ✨</h1>
        <div class="town-header-spacer"></div>
      </div>

      <div class="town-buildings-grid">
        ${buildings.map(b => this._renderBuildingCard(b, notifs[b.config.id])).join('')}
      </div>

      <div class="town-footer">
        <button class="btn btn-large town-quiz-btn">📚 クイズへ →</button>
      </div>
    `;

    this._container.appendChild(el);
    this._element = el;
    this._bindEvents();
  }

  _renderBuildingCard(state, hasNotif) {
    const { config, level, isUnlocked, isLockedByWorlds, worldsLeft, buildingImagePath } = state;

    if (!isUnlocked) {
      // ロック状態
      return `
        <div class="town-building-card locked" data-building="${config.id}">
          <div class="building-img-wrap">
            <div class="building-lock-icon">🔒</div>
            <div class="building-emoji-placeholder">${config.emoji}</div>
          </div>
          <p class="building-name">${config.name}</p>
          <p class="building-unlock-hint">あと${worldsLeft}ワールド</p>
        </div>
      `;
    }

    const notifBadge = hasNotif
      ? `<span class="building-notif-badge">!</span>` : '';
    const lvBadge = `<span class="building-lv-badge">Lv${level}</span>`;

    return `
      <div class="town-building-card unlocked" data-building="${config.id}" role="button" tabindex="0">
        <div class="building-img-wrap">
          <img src="${buildingImagePath}" alt="${config.name}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="building-emoji-placeholder" style="display:none">${config.emoji}</div>
          ${lvBadge}
          ${notifBadge}
        </div>
        <p class="building-name">${config.name}</p>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    if (!this._element) return;

    this._element.querySelector('.town-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'bookshelf');
    });

    this._element.querySelector('.town-quiz-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'bookshelf');
    });

    this._element.querySelectorAll('.town-building-card.unlocked').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.building;
        const cfg = Config.TOWN.BUILDINGS.find(b => b.id === id);
        if (cfg?.screen) {
          GameStore.setState('app.currentScreen', cfg.screen);
        }
      });
    });
  }
}

export default TownScreen;
