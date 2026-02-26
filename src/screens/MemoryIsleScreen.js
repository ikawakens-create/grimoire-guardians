/**
 * MemoryIsleScreen.js - Grimoire Guardians
 * きおくのいせき画面（モンスターコレクションモーダル）
 *
 * 機能:
 *   - 4層の遺跡マップ（レイヤータブ）
 *   - モンスターシルエット → コレクト済みフルカラー表示
 *   - 個別モンスター詳細パネル
 *   - レイヤーアンロック状態表示
 *   - 図鑑コンプリート率バッジ
 *
 * 画像フォールバック:
 *   assets/icons/monsters/{id}.png を置くと自動で絵文字から差し替わる
 *
 * @version 1.0
 * @date 2026-02-26
 */

import { GameStore } from '../core/GameStore.js';
import HapticFeedback from '../utils/HapticFeedback.js';
import Logger from '../core/Logger.js';
import MONSTERS, {
  getMonstersByLayer,
  LAYER_UNLOCK_REQUIREMENTS,
} from '../data/memory-monsters.js';

// ─────────────────────────────────────────
// 定数
// ─────────────────────────────────────────

const LAYER_NAMES = {
  1: 'はじまりの遺跡',
  2: 'ふかまりの遺跡',
  3: 'しんかの遺跡',
  4: 'おくのしん',
};

const RARITY_LABEL = {
  common:    'コモン',
  uncommon:  'アンコモン',
  rare:      'レア',
  legendary: 'でんせつ',
};

// ─────────────────────────────────────────
// MemoryIsleScreen クラス
// ─────────────────────────────────────────

class MemoryIsleScreen {
  /**
   * @param {Function|null} [onClose] - 閉じたときのコールバック
   */
  constructor(onClose = null) {
    this.onClose      = onClose;
    /** @type {HTMLElement|null} */
    this.element      = null;
    this._activeLayer = 1;
  }

  // ─────────────────────────────────────────
  // パブリック
  // ─────────────────────────────────────────

  /** モーダルを開く */
  open() {
    if (this.element) return;

    const overlay = document.createElement('div');
    overlay.className = 'memory-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'きおくのいせき');
    overlay.innerHTML = this._buildHTML();

    this.element = overlay;
    document.body.appendChild(overlay);

    // フェードイン
    requestAnimationFrame(() => {
      overlay.classList.add('memory-overlay-visible');
    });

    this._bindEvents();
    this._renderGrid(this._activeLayer);

    Logger.info('[MemoryIsleScreen] Opened');
  }

  /** モーダルを閉じる */
  close() {
    if (!this.element) return;

    this.element.classList.remove('memory-overlay-visible');
    setTimeout(() => {
      this.element?.remove();
      this.element = null;
    }, 250);

    if (typeof this.onClose === 'function') this.onClose();
    Logger.info('[MemoryIsleScreen] Closed');
  }

  // ─────────────────────────────────────────
  // HTML 構築
  // ─────────────────────────────────────────

  _buildHTML() {
    const collected = GameStore.getState('memory.collected') ?? [];
    const total     = MONSTERS.filter(m => m.worldId !== null).length; // 秘密7体を除く
    const count     = collected.length;

    return `
      <div class="memory-modal">

        <!-- ヘッダー -->
        <div class="memory-header">
          <div class="memory-title">🏛️ きおくのいせき</div>
          <div class="memory-count-badge">${count} / 40 ひき</div>
          <button class="memory-close-btn" type="button" aria-label="とじる">✕</button>
        </div>

        <!-- レイヤータブ -->
        <div class="memory-tabs" role="tablist">
          ${[1, 2, 3, 4].map(layer => {
            const unlocked = this._isLayerUnlocked(layer);
            const layerCollected = this._countLayerCollected(layer);
            const layerTotal     = getMonstersByLayer(layer).filter(m => m.worldId !== null).length
                                 + (layer === 4 ? 0 : 0); // 秘密体は別カウント
            return `
              <button class="memory-tab ${layer === 1 ? 'memory-tab-active' : ''} ${!unlocked ? 'memory-tab-locked' : ''}"
                      role="tab"
                      data-layer="${layer}"
                      ${!unlocked ? 'aria-disabled="true"' : ''}
                      aria-label="${LAYER_NAMES[layer]}">
                <span class="memory-tab-name">${layer === 4 ? '🔒 ' : ''}第${layer}層</span>
                <span class="memory-tab-count">${layerCollected}/${layerTotal}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- レイヤー名 -->
        <div class="memory-layer-name" id="memory-layer-name">${LAYER_NAMES[1]}</div>

        <!-- モンスターグリッド -->
        <div class="memory-grid" id="memory-grid"></div>

        <!-- 詳細パネル（タップで表示） -->
        <div class="memory-detail" id="memory-detail" hidden></div>

      </div>
    `;
  }

  // ─────────────────────────────────────────
  // グリッド描画
  // ─────────────────────────────────────────

  /**
   * 指定レイヤーのモンスターグリッドを描画する
   * @param {number} layer
   */
  _renderGrid(layer) {
    const grid = this.element?.querySelector('#memory-grid');
    if (!grid) return;

    const layerName = this.element?.querySelector('#memory-layer-name');
    if (layerName) layerName.textContent = LAYER_NAMES[layer];

    const monsters  = getMonstersByLayer(layer);
    const collected = GameStore.getState('memory.collected') ?? [];
    const clearCounts = GameStore.getState('memory.clearCounts') ?? {};

    grid.innerHTML = monsters.map(m => {
      const isCollected  = collected.includes(m.id);
      const isSecret     = m.worldId === null;
      const clearCount   = isSecret ? 0 : (clearCounts[m.worldId] ?? 0);
      const progress     = isSecret ? 0 : Math.min(clearCount, 3);
      const hasPlayed    = isSecret ? false : clearCount > 0;

      let cardClass = 'memory-card';
      if (isCollected)       cardClass += ' memory-card-collected';
      else if (!hasPlayed)   cardClass += ' memory-card-locked';
      else                   cardClass += ' memory-card-silhouette';

      if (m.rarity === 'legendary') cardClass += ' memory-card-legendary';

      // 進捗ドット（3ドット）
      const dotsHTML = !isCollected && !isSecret ? `
        <div class="memory-card-progress">
          ${[1, 2, 3].map(n => `
            <span class="memory-dot ${progress >= n ? 'memory-dot-filled' : ''}"></span>
          `).join('')}
        </div>
      ` : '';

      // アイコン
      const iconHTML = `
        <div class="memory-icon-wrap">
          <span class="memory-emoji" aria-hidden="true">${isCollected || hasPlayed ? m.emoji : '？'}</span>
          ${isCollected ? `<img class="memory-img"
                               src="./assets/icons/monsters/${m.id}.png"
                               alt="${m.name}"
                               onerror="this.style.display='none'">` : ''}
        </div>
      `;

      // 名前
      const nameHTML = isCollected
        ? `<div class="memory-card-name">${m.name}</div>`
        : hasPlayed
          ? `<div class="memory-card-name memory-card-name-hint">${this._getUnitHint(m)}</div>`
          : `<div class="memory-card-name memory-card-name-unknown">？？？</div>`;

      return `
        <div class="${cardClass}"
             data-monster-id="${m.id}"
             data-collected="${isCollected}"
             role="button"
             tabindex="0"
             aria-label="${isCollected ? m.name : '未知のモンスター'}">
          ${iconHTML}
          ${nameHTML}
          ${dotsHTML}
        </div>
      `;
    }).join('');

    // カードタップイベント
    grid.querySelectorAll('.memory-card').forEach(card => {
      card.addEventListener('click', () => {
        HapticFeedback.light();
        const id = card.dataset.monsterId;
        this._showDetail(id);
      });
    });
  }

  // ─────────────────────────────────────────
  // 詳細パネル
  // ─────────────────────────────────────────

  /**
   * モンスター詳細パネルを表示する
   * @param {string} monsterId
   */
  _showDetail(monsterId) {
    const monster   = MONSTERS.find(m => m.id === monsterId);
    const panel     = this.element?.querySelector('#memory-detail');
    if (!monster || !panel) return;

    const collected   = GameStore.getState('memory.collected') ?? [];
    const clearCounts = GameStore.getState('memory.clearCounts') ?? {};
    const isCollected = collected.includes(monsterId);
    const isSecret    = monster.worldId === null;
    const clearCount  = isSecret ? 0 : (clearCounts[monster.worldId] ?? 0);

    if (!isCollected && !isSecret && clearCount === 0) {
      // まだ一度もプレイしていない → タップ不応答
      return;
    }

    panel.hidden = false;
    panel.innerHTML = `
      <div class="memory-detail-inner">
        <button class="memory-detail-close" type="button">✕</button>

        <div class="memory-detail-icon ${isCollected ? 'memory-detail-icon-collected' : 'memory-detail-icon-shadow'}">
          <span class="memory-detail-emoji">${isCollected ? monster.emoji : '？'}</span>
          ${isCollected ? `<img class="memory-detail-img"
                               src="./assets/icons/monsters/${monster.id}.png"
                               alt="${monster.name}"
                               onerror="this.style.display='none'">` : ''}
        </div>

        <div class="memory-detail-name ${isCollected ? '' : 'memory-detail-name-unknown'}">
          ${isCollected ? monster.name : '？？？'}
        </div>

        <div class="memory-detail-rarity memory-rarity-${monster.rarity}">
          ${RARITY_LABEL[monster.rarity]}
        </div>

        ${isCollected ? `
          <div class="memory-detail-flavor">${monster.flavorText}</div>
        ` : `
          <div class="memory-detail-hint">
            ${isSecret
              ? 'すべての モンスターを あつめると あらわれるかも…'
              : `「${this._getWorldTitle(monster.worldId)}」を<br><strong>あと ${3 - clearCount} かい</strong> クリアしよう！`
            }
          </div>
        `}

        ${isCollected ? `
          <div class="memory-detail-actions">
            <button class="button button-small memory-btn-house" type="button" data-monster-id="${monsterId}">
              🏠 いえに かざる
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // 詳細パネル閉じる
    panel.querySelector('.memory-detail-close').addEventListener('click', () => {
      panel.hidden = true;
    });

    // 家に飾るボタン（Phase 1-D で実装予定）
    panel.querySelector('.memory-btn-house')?.addEventListener('click', () => {
      HapticFeedback.medium();
      // TODO: Phase 1-D で家に飾る機能を実装
      const toast = document.createElement('div');
      toast.className = 'memory-toast';
      toast.textContent = '🏠 もうすぐ いえに かざれるよ！';
      this.element.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    });
  }

  // ─────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────

  _bindEvents() {
    // 閉じるボタン
    this.element.querySelector('.memory-close-btn').addEventListener('click', () => {
      this.close();
    });

    // オーバーレイ背景クリック
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) this.close();
    });

    // タブ切り替え
    this.element.querySelectorAll('.memory-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const layer = parseInt(tab.dataset.layer, 10);
        if (!this._isLayerUnlocked(layer)) {
          HapticFeedback.light();
          this._showLockedMessage(layer);
          return;
        }
        this._switchLayer(layer);
      });
    });
  }

  /**
   * レイヤーを切り替える
   * @param {number} layer
   */
  _switchLayer(layer) {
    HapticFeedback.light();
    this._activeLayer = layer;

    // タブ active 切り替え
    this.element.querySelectorAll('.memory-tab').forEach(tab => {
      tab.classList.toggle('memory-tab-active', parseInt(tab.dataset.layer, 10) === layer);
    });

    // 詳細パネルを閉じる
    const panel = this.element.querySelector('#memory-detail');
    if (panel) panel.hidden = true;

    this._renderGrid(layer);
  }

  // ─────────────────────────────────────────
  // ユーティリティ
  // ─────────────────────────────────────────

  /**
   * 指定レイヤーがアンロックされているか
   * @param {number} layer
   * @returns {boolean}
   */
  _isLayerUnlocked(layer) {
    if (layer === 1) return true;

    const collected   = GameStore.getState('memory.collected') ?? [];
    const prevLayer   = layer - 1;
    const prevMonsters = getMonstersByLayer(prevLayer);
    const prevCollected = prevMonsters.filter(m => collected.includes(m.id)).length;
    const required    = LAYER_UNLOCK_REQUIREMENTS[layer];

    return prevCollected >= required;
  }

  /**
   * 指定レイヤーのコレクト済み数
   * @param {number} layer
   * @returns {number}
   */
  _countLayerCollected(layer) {
    const collected = GameStore.getState('memory.collected') ?? [];
    return getMonstersByLayer(layer).filter(m => collected.includes(m.id)).length;
  }

  /**
   * ロックされているレイヤーへのヒントを表示する
   * @param {number} layer
   */
  _showLockedMessage(layer) {
    const prevLayer   = layer - 1;
    const required    = LAYER_UNLOCK_REQUIREMENTS[layer];
    const collected   = GameStore.getState('memory.collected') ?? [];
    const prevCollected = getMonstersByLayer(prevLayer).filter(m => collected.includes(m.id)).length;
    const remaining   = required - prevCollected;

    const toast = document.createElement('div');
    toast.className = 'memory-toast';
    toast.innerHTML = `🔒 第${prevLayer}層の モンスターを あと <strong>${remaining}ひき</strong> あつめよう！`;
    this.element.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  /**
   * ワールドIDからタイトルを取得（シルエット時のヒント表示用）
   * @param {string|null} worldId
   * @returns {string}
   */
  _getWorldTitle(worldId) {
    if (!worldId) return '？？？';
    // 動的インポートを避けるため、worldIdからユニット名を推測
    return worldId.replace('world_', 'ステージ ');
  }

  /**
   * シルエット表示時のユニットヒントテキスト
   * @param {MonsterDef} monster
   * @returns {string}
   */
  _getUnitHint(monster) {
    if (!monster.worldId) return '？？？';
    const clearCounts = GameStore.getState('memory.clearCounts') ?? {};
    const count = clearCounts[monster.worldId] ?? 0;
    return `あと ${3 - count} かい`;
  }
}

export default MemoryIsleScreen;
