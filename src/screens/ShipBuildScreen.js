/**
 * ShipBuildScreen.js - Grimoire Guardians
 * 船カスタマイズ画面（マイふね）
 *
 * show/hide 方式（index.js の _shipBuildScreen で一度だけ生成して使い回す）。
 * 船体の各部位をタップして選択 → パーツ一覧から即時装備。
 * 素材が揃ったパーツはその場でクラフト可能。
 *
 * @version 1.0
 * @date 2026-03-21
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import {
  SHIP_PARTS,
  SMALL_SKINS,
  RARITY_LABEL,
  getPartsByType,
  filterBySize,
} from '../data/shipItems.js';

// 船サイズに応じて使用できるスロット
const SLOTS_BY_SIZE = {
  small:  [],
  medium: ['hull', 'sail', 'figurehead', 'flag'],
  large:  ['hull', 'sail', 'figurehead', 'flag', 'deck', 'glow'],
};

export class ShipBuildScreen {
  constructor() {
    /** @type {HTMLElement|null} */
    this._container = null;
    /** @type {HTMLElement|null} */
    this._el = null;
    /** @type {string|null} 現在選択中のスロット */
    this._activeSlot = null;
    /** @type {Function|null} GameStore 購読解除関数 */
    this._unsubscribe = null;
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

    // 既存購読があれば先に解除（多重登録防止）
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
    this._render();

    // GameStore の変化を監視して再描画（素材が増えた時など）
    this._unsubscribe = GameStore.subscribe((path) => {
      if (path.startsWith('ship.') || path.startsWith('inventory.')) {
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
  // 描画
  // ─────────────────────────────────────────────

  _render() {
    if (!this._el) return;

    const ship     = GameStore.getState('ship');
    const dispSize = ship.displaySize ?? ship.size;   // 「ちいさくみせる」上書き考慮
    const slots    = SLOTS_BY_SIZE[ship.size] ?? [];

    this._el.innerHTML = `
      <div class="ship-build-inner">

        ${this._renderHeader(ship)}
        ${this._renderShipPreview(ship, dispSize)}
        ${this._renderThemeSets(ship)}
        ${this._renderSlotPanel(ship, dispSize, slots)}
        ${ship.size === 'large' ? this._renderDisplayToggle(ship) : ''}

        <div class="ship-build-footer">
          <button type="button" class="button button-secondary ship-back-btn">← もどる</button>
        </div>
      </div>
    `;

    this._bindEvents(ship, dispSize, slots);
  }

  // ─── ヘッダー（船名 + 名前変更ボタン）─────────

  _renderHeader(ship) {
    return `
      <div class="ship-build-header">
        <span class="ship-name-display">⛵ ${this._esc(ship.name)}</span>
        <button type="button" class="button button-small ship-rename-btn">✏️ なまえをかえる</button>
      </div>
    `;
  }

  // ─── 船プレビュー（絵文字ベース + アニメーション）────

  _renderShipPreview(ship, dispSize) {
    // アニメーションクラス
    let animClass = 'ship-anim-bob';
    if (ship.size === 'medium' || ship.size === 'large') animClass += ' ship-anim-sail';

    // 装備パーツの表示絵文字を組み立て
    const hullEmoji = this._getEquippedEmoji(ship, 'hull', '🛥️');
    const sailEmoji = this._getEquippedEmoji(ship, 'sail', '🎌');
    const flagEmoji = this._getEquippedEmoji(ship, 'flag', '🚩');
    const fhdEmoji  = this._getEquippedEmoji(ship, 'figurehead', '🐬');

    // small（または「ちいさくみせる」ON）は skin のみ表示
    if (dispSize === 'small') {
      const skinId    = ship.hull ?? 'skin_default';
      const skin      = SMALL_SKINS.find(s => s.id === skinId) ?? SMALL_SKINS[0];
      return `
        <div class="ship-preview-area ${animClass}">
          <div class="ship-emoji-large">${skin.emoji}</div>
          <div class="ship-size-label">小型船</div>
        </div>
      `;
    }

    // medium / large
    const hasGlow  = ship.size === 'large' && ship.glow;
    const glowClass = hasGlow ? 'ship-glow-part' : '';
    const sizeLabel = ship.size === 'medium' ? '中型船' : '大型船艦';

    // ホットスポット: 各部位をタップ可能に
    const slots = SLOTS_BY_SIZE[ship.size] ?? [];
    const hotspotsHTML = slots.map(slotId => {
      const def = Config.GRADE2.SHIP_PARTS.find(p => p.id === slotId);
      const label = def?.name ?? slotId;
      const isActive = this._activeSlot === slotId;
      return `
        <button type="button"
          class="ship-hotspot${isActive ? ' ship-hotspot-active' : ''}"
          data-slot="${slotId}"
          aria-label="${label}を選択">
          ${label}
        </button>
      `;
    }).join('');

    return `
      <div class="ship-preview-area ${animClass}">
        <div class="ship-preview-emoji ${glowClass}">
          <span class="ship-hull-part">${hullEmoji}</span>
          <span class="ship-sail-part">${sailEmoji}</span>
          <span class="ship-flag-part">${flagEmoji}</span>
          ${ship.size === 'large' ? `<span class="ship-fhd-part">${fhdEmoji}</span>` : ''}
        </div>
        <div class="ship-hotspots">${hotspotsHTML}</div>
        <div class="ship-size-label">${sizeLabel}</div>
      </div>
    `;
  }

  // ─── テーマセット進捗 ──────────────────────────

  _renderThemeSets(ship) {
    const equippedIds = new Set(
      ['hull','sail','figurehead','flag','deck','glow']
        .map(s => ship[s])
        .filter(Boolean)
    );
    const completedSets = ship.completedThemeSets ?? [];

    const setHTML = Config.GRADE2.THEME_SETS.map(set => {
      const owned  = set.parts.filter(id => (ship.crafted ?? []).includes(id)).length;
      const equipped = set.parts.filter(id => equippedIds.has(id)).length;
      const total  = set.parts.length;
      const done   = completedSets.includes(set.id);

      const stars = set.parts.map((_, i) => `<span class="theme-star${i < owned ? ' theme-star-filled' : ''}">★</span>`).join('');

      return `
        <div class="theme-set-item${done ? ' theme-set-done' : ''}">
          <span class="theme-set-emoji">${set.emoji}</span>
          <span class="theme-set-name">${set.name}</span>
          <span class="theme-set-stars">${stars}</span>
          ${owned < total
            ? `<span class="theme-set-hint">あと${total - owned}つ</span>`
            : equipped === total
              ? `<span class="theme-set-badge theme-complete-badge">✨かんせい！</span>`
              : `<span class="theme-set-hint">そうびしよう！</span>`
          }
        </div>
      `;
    }).join('');

    return `<div class="theme-sets-row">${setHTML}</div>`;
  }

  // ─── スロットパネル ────────────────────────────

  _renderSlotPanel(ship, dispSize, slots) {
    // small はスキン選択
    if (ship.size === 'small') {
      return this._renderSkinPanel(ship);
    }

    if (!this._activeSlot) {
      return `<div class="slot-panel slot-panel-hint">ふねのぶぶんをタップしてえらんでね</div>`;
    }

    const def      = Config.GRADE2.SHIP_PARTS.find(p => p.id === this._activeSlot);
    const slotLabel = def?.name ?? this._activeSlot;
    const candidates = filterBySize(getPartsByType(this._activeSlot), ship.size);
    const materials  = GameStore.getState('inventory.materials') ?? {};
    const equipped   = ship[this._activeSlot];
    const crafted    = ship.crafted ?? [];

    const partsHTML = candidates.map(part => {
      const isEquipped  = equipped === part.id;
      const isCrafted   = crafted.includes(part.id);
      const canCraft    = !isCrafted && this._canAfford(part.craftCost, materials);
      const costHTML    = this._renderCostBadge(part.craftCost, materials, isCrafted);
      const rarityLabel = RARITY_LABEL[part.rarity] ?? '';

      let btnClass = 'ship-part-card';
      if (isEquipped)   btnClass += ' ship-part-equipped';
      if (!isCrafted)   btnClass += ' ship-part-locked';

      return `
        <div class="${btnClass}" data-part-id="${part.id}">
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

  // ─── 小型スキンパネル ──────────────────────────

  _renderSkinPanel(ship) {
    const materials = GameStore.getState('inventory.materials') ?? {};
    const crafted   = ship.crafted ?? [];
    const equipped  = ship.hull ?? 'skin_default';

    const skinsHTML = SMALL_SKINS.map(skin => {
      const isEquipped = equipped === skin.id;
      const isCrafted  = !skin.craftCost || crafted.includes(skin.id) || skin.id === 'skin_default';
      const canCraft   = skin.craftCost && !isCrafted && this._canAfford(skin.craftCost, materials);
      const costHTML   = skin.craftCost ? this._renderCostBadge(skin.craftCost, materials, isCrafted) : '';

      return `
        <div class="ship-part-card${isEquipped ? ' ship-part-equipped' : ''}${!isCrafted ? ' ship-part-locked' : ''}"
             data-part-id="${skin.id}">
          <div class="part-emoji">${skin.emoji}</div>
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

  // ─── 表示サイズトグル（大型船のみ）────────────

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

    // ホットスポット（部位選択）
    this._el.querySelectorAll('.ship-hotspot').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._activeSlot = btn.dataset.slot;
        this._render();
      });
    });

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
    // スキンの場合は hull スロットに入れる
    const skinDef = SMALL_SKINS.find(s => s.id === partId);
    if (skinDef) {
      GameStore.setState('ship.hull', partId);
      this._showEquipEffect();
      return;
    }

    const part = SHIP_PARTS.find(p => p.id === partId);
    if (!part) return;

    GameStore.setState(`ship.${part.partType}`, partId);
    this._showEquipEffect();
    this._checkThemeSetCompletion();
    Logger.info(`[ShipBuildScreen] equipped: ${partId} → ${part.partType}`);
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

    // 素材消費
    Object.entries(part.craftCost).forEach(([mat, cnt]) => {
      GameStore.setState(`inventory.materials.${mat}`, (materials[mat] ?? 0) - cnt);
    });

    // クラフト済みリストに追加
    const crafted = [...(GameStore.getState('ship.crafted') ?? [])];
    if (!crafted.includes(part.id)) crafted.push(part.id);
    GameStore.setState('ship.crafted', crafted);

    // クラフト直後に自動装備
    this._equipPart(part.id);

    Logger.info(`[ShipBuildScreen] crafted: ${part.id}`);
  }

  // ─────────────────────────────────────────────
  // テーマセット完成チェック
  // ─────────────────────────────────────────────

  _checkThemeSetCompletion() {
    const ship     = GameStore.getState('ship');
    const equipped = new Set(
      ['hull','sail','figurehead','flag','deck','glow']
        .map(s => ship[s])
        .filter(Boolean)
    );
    const completed = [...(ship.completedThemeSets ?? [])];
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

    // フォーカス時に全選択（iOS は setTimeout(0) が必要）
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
      // GameStore subscriber が自動で _render() を呼ぶため明示呼び出し不要
      Logger.info(`[ShipBuildScreen] ship renamed: ${newName}`);
    });

    overlay.querySelector('.name-cancel-btn').addEventListener('click', () => {
      overlay.remove();
    });

    (this._el ?? document.body).appendChild(overlay);

    // 少し遅らせてフォーカス（モーダルが DOM に追加された後）
    requestAnimationFrame(() => input.focus());
  }

  // ─────────────────────────────────────────────
  // 演出
  // ─────────────────────────────────────────────

  /** パーツ装備時のきらきらエフェクト */
  _showEquipEffect() {
    const preview = this._el?.querySelector('.ship-preview-area');
    if (!preview) return;
    preview.classList.remove('ship-equip-flash');
    // reflow を挟んで animation を再起動
    void preview.offsetWidth;
    preview.classList.add('ship-equip-flash');
    setTimeout(() => preview.classList.remove('ship-equip-flash'), 600);
  }

  /** テーマセット完成演出 */
  _showThemeCompleteEffect(set) {
    const banner = document.createElement('div');
    banner.className = 'theme-complete-overlay';
    banner.innerHTML = `
      <div class="theme-complete-content theme-complete-badge">
        <div class="theme-complete-emoji">${set.emoji}</div>
        <div class="theme-complete-name">${set.name}</div>
        <div class="theme-complete-msg">✨ かんせい！</div>
      </div>
    `;
    (this._el ?? document.body).appendChild(banner);
    SoundManager.playSFX(SoundType.ITEM_GET);
    setTimeout(() => banner.remove(), 2500);
  }

  // ─────────────────────────────────────────────
  // ヘルパー
  // ─────────────────────────────────────────────

  /**
   * 素材が足りるか判定
   * @param {Object} cost
   * @param {Object} materials
   * @returns {boolean}
   */
  _canAfford(cost, materials) {
    return Object.entries(cost).every(([mat, cnt]) => (materials[mat] ?? 0) >= cnt);
  }

  /**
   * クラフトコスト表示 HTML
   * @param {Object} cost
   * @param {Object} materials
   * @param {boolean} isCrafted
   * @returns {string}
   */
  _renderCostBadge(cost, materials, isCrafted) {
    if (isCrafted) return '';
    const lines = Object.entries(cost).map(([mat, cnt]) => {
      const have    = materials[mat] ?? 0;
      const enough  = have >= cnt;
      return `<span class="cost-item${enough ? ' cost-ok' : ' cost-ng'}">${mat}×${cnt}</span>`;
    }).join(' ');
    return `<div class="part-cost">${lines}</div>`;
  }

  /**
   * 装備中パーツの絵文字を返す（未装備はデフォルト値）
   * @param {Object} ship
   * @param {string} slotId
   * @param {string} fallback
   * @returns {string}
   */
  _getEquippedEmoji(ship, slotId, fallback) {
    const partId = ship[slotId];
    if (!partId) return fallback;
    const part = SHIP_PARTS.find(p => p.id === partId);
    return part?.emoji ?? fallback;
  }

  /**
   * XSS 対策: 文字列をエスケープ
   * @param {string} str
   * @returns {string}
   */
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
  const maxLen = Config.GRADE2.SHIP_NAME_MAX_LENGTH;
  const currentName = GameStore.getState('ship.name') ?? 'グリモア号';
  // XSS 対策: value 属性に埋め込む前にエスケープ
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
