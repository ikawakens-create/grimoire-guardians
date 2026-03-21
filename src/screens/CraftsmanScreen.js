/**
 * CraftsmanScreen.js - Grimoire Guardians
 * 合成屋（ものづくりのいえ）画面
 *
 * NPCキャラクターが素材を受け取ってアイテムを作ってくれる演出つきクラフト画面。
 *
 * キャラクター:
 *   🔨 マイスター（ドワーフの合成師）- 家パーツ・家具・庭デコ担当
 *   ✂️  テイラー（仕立て屋のうさぎ）- スキン担当（将来実装・現在は予告のみ）
 *
 * 今後のスキン実装に向けてアーキテクチャを分離済み:
 *   - NPC選択タブ（MEISTER / TAILOR）
 *   - TAILOR は ENABLE_SKINS フラグで解放
 *
 * @version 1.0
 * @date 2026-02-26
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import { TownManager } from '../core/TownManager.js';
import { SkinManager } from '../core/SkinManager.js';
import {
  COLLECTIBLE_SKINS,
  SKIN_CATEGORY,
  SKIN_OBTAIN,
  FRAGMENTS_NEEDED,
  RARITY_LABEL as SKIN_RARITY_LABEL,
  getObtainHint,
} from '../data/skinItems.js';
import {
  getItemById,
  RARITY,
  GARDEN_ITEMS,
} from '../data/houseItems.js';

// ─────────────────────────────────────────────
// NPC定義
// ─────────────────────────────────────────────
const NPC = {
  MEISTER: 'meister',
  TAILOR:  'tailor',
};

const NPC_DATA = {
  meister: {
    id:       'meister',
    name:     'マイスター',
    title:    'ドワーフの合成師',
    emoji:    '🔨',
    image:    'assets/npcs/meister.png',
    color:    '#c87941',
    bgColor:  'rgba(200,121,65,0.15)',
    locked:   false,
    // ランダムセリフ（場面ごと）
    dialogues: {
      idle: [
        'やあ！なにをつくるかね？',
        '素材をもってきてくれ！なんでも作るぞ！',
        'ドワーフのうでをなめるなよ！',
        '今日もいい仕事をしようではないか！',
        '素材があれば、どんなものでも！',
      ],
      craftSuccess: [
        'できたぞ！いい出来だ！',
        'ほれ、完成じゃ！どうじゃ？',
        'わしの腕は本物だろう？',
        'これでお前の家が豪華になるな！',
        '素晴らしい出来栄えじゃ！',
      ],
      craftFail: [
        '素材が足りないのう…',
        'もっと素材を集めてきてくれ！',
        '材料がなければ作れないぞ！',
      ],
      alreadyCrafted: [
        'それはもう作ったじゃろう！',
        'すでに持っておるぞ？',
      ],
    },
  },
  tailor: {
    id:       'tailor',
    name:     'テイラー',
    title:    'うさぎの仕立て屋',
    emoji:    '✂️',
    image:    'assets/npcs/tailor.png',
    color:    '#d479c8',
    bgColor:  'rgba(212,121,200,0.15)',
    locked:   true, // ENABLE_SKINS で解放
    dialogues: {
      idle: [
        'もうすぐ準備ができるわ、待っててね！',
        'スキンの世界へようこそ…まだ準備中だけど！',
      ],
    },
  },
};

// カテゴリー定義（現在 HouseBuildScreen で配置できるのは庭デコのみ）
const MEISTER_CATEGORIES = [
  { id: 'garden', label: '🌸 にわデコ', items: () => GARDEN_ITEMS },
];

const RARITY_LABEL = {
  [RARITY.COMMON]:     'コモン',
  [RARITY.UNCOMMON]:   'アンコモン',
  [RARITY.RARE]:       'レア ⭐',
  [RARITY.SUPER_RARE]: 'ちょうレア！✨',
};

const MATERIAL_EMOJI = {
  wood: '🌲', stone: '⛰️', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};

// メインタブ定義
const MAIN_TABS = [
  { id: 'craft',   label: '🔨 つくる' },
  { id: 'upgrade', label: '⬆️ しせつ強化' },
];

// スキンカテゴリータブ（テイラー担当）
const TAILOR_CATEGORIES = [
  { id: 'cool',   label: '⚔️ つよい系' },
  { id: 'cute',   label: '🌸 かわいい系' },
  { id: 'funny',  label: '😄 おもしろ系' },
  { id: 'secret', label: '🌟 ひみつ系' },
];

export class CraftsmanScreen {
  constructor() {
    this._container = null;
    this._element = null;
    this._npc = NPC.MEISTER;
    this._mainTab = 'craft';       // 'craft' | 'upgrade'
    this._category = 'garden';
    this._selectedItem = null;   // 選択中アイテムID
    this._isCrafting = false;    // クラフトアニメ中フラグ
    this._dialogue = '';
    this._unsubscribe = null;
    this._upgradeMsg = null;     // アップグレード結果メッセージ
    // テイラータブ用
    this._skinCategory = 'cool'; // 現在のスキンカテゴリー
    this._selectedSkin = null;   // 選択中スキンID
    this._craftMsg = null;       // クラフト結果メッセージ
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;

    // 配置モードで呼ばれた場合
    const mode = GameStore.getState('app.craftsmanMode');
    if (mode === 'place') {
      this._category = 'garden';
    }

    this._dialogue = this._getDialogue('idle');
    this._render();
    Logger.info('[CraftsmanScreen] 表示: npc=' + this._npc);
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    GameStore.setState('app.craftsmanMode', null);
    GameStore.setState('app.craftsmanTarget', null);
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;
    if (this._element) this._element.remove();

    const materials = GameStore.getState('inventory.materials') || {};
    const house = GameStore.getState('house');
    const npcData = NPC_DATA[this._npc];

    const rightContent = this._mainTab === 'upgrade'
      ? this._renderUpgradeTab()
      : this._npc === NPC.TAILOR
        ? (Config.FEATURES.ENABLE_SKINS && (GameStore.getState('town.buildings.craftsman.level') || 1) >= Config.SKIN.TAILOR_UNLOCK_LEVEL
            ? this._renderTailorTab()
            : this._renderTailorLocked())
        : `
          ${this._renderCategoryTabs()}
          <div class="craftsman-content">
            <div class="craft-item-list">${this._renderItemList(materials, house)}</div>
            ${this._selectedItem ? this._renderDetailPanel(this._selectedItem, materials, house) : ''}
          </div>
        `;

    const _tmp = document.createElement('div');
    _tmp.innerHTML = `
      <div class="craftsman-screen facility-screen"
           style="--fac-color:${npcData.color};--fac-bg:#fff5e6;--npc-color:${npcData.color};--npc-bg:${npcData.bgColor}">

        <!-- ヘッダー -->
        ${this._renderHeader(materials)}

        <!-- 2カラム本体 -->
        <div class="facility-body">

          <!-- 左: NPC -->
          <aside class="facility-left craftsman-left">
            <!-- NPC切り替えタブ -->
            ${this._renderNpcSelector()}
            <!-- NPC アバター + ふきだし -->
            ${this._renderNpcPanel(npcData)}
            <!-- 素材チップ -->
            <div class="facility-mat-chips">
              ${['wood','stone','brick','gem','star_fragment']
                .map(id => `<span class="mat-chip">${MATERIAL_EMOJI[id]}${materials[id]||0}</span>`)
                .join('')}
            </div>
          </aside>

          <!-- 右: コンテンツ -->
          <div class="facility-right">
            <!-- メインタブ（つくる / 施設強化） -->
            <div class="craft-main-tabs">
              ${MAIN_TABS.map(t => `
                <button class="craft-main-tab-btn ${this._mainTab === t.id ? 'active' : ''}" data-main-tab="${t.id}">
                  ${t.label}
                </button>
              `).join('')}
            </div>
            ${rightContent}
          </div>
        </div>

        ${this._isCrafting ? this._renderCraftingAnimation() : ''}
      </div>
    `;
    this._element = _tmp.firstElementChild;
    this._container.appendChild(this._element);

    this._bindEvents();
  }

  _renderHeader(_materials) {
    return `
      <div class="craftsman-header facility-header">
        <button class="btn-icon craft-back-btn" style="color:#fff">← まち</button>
        <h1 class="facility-title">🔨 ものづくりのいえ</h1>
      </div>
    `;
  }

  _renderNpcSelector() {
    const tailorLocked = !Config.FEATURES.ENABLE_SKINS;
    return `
      <div class="npc-selector">
        <button class="npc-tab-btn ${this._npc === NPC.MEISTER ? 'active' : ''}" data-npc="meister">
          ${NPC_DATA.meister.emoji} ${NPC_DATA.meister.name}
        </button>
        <button class="npc-tab-btn ${this._npc === NPC.TAILOR ? 'active' : ''} ${tailorLocked ? 'locked' : ''}"
                data-npc="tailor">
          ${NPC_DATA.tailor.emoji} ${NPC_DATA.tailor.name}
          ${tailorLocked ? '<span class="coming-soon-badge">もうすぐ！</span>' : ''}
        </button>
      </div>
    `;
  }

  _renderNpcPanel(npcData) {
    return `
      <div class="npc-panel">
        <div class="facility-npc-wrap">
          <div class="npc-avatar facility-npc-avatar">
            <img src="${npcData.image}" alt="${npcData.name}"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="npc-emoji-fallback" style="display:none">${npcData.emoji}</div>
          </div>
          <p class="npc-name-badge" style="color:${npcData.color}">${npcData.name}</p>
        </div>
        <div class="npc-bubble facility-bubble">
          <p class="npc-dialogue">${this._dialogue}</p>
        </div>
      </div>
    `;
  }

  _renderTailorLocked() {
    return `
      <div class="tailor-locked">
        <div class="tailor-locked-icon">✂️</div>
        <p class="tailor-locked-title">スキン屋さん、じゅんびちゅう！</p>
        <p class="tailor-locked-body">
          もうすぐ、キャラクターのふくや<br>アクセサリーが作れるようになるよ！<br>
          <small>（合成屋をLv${Config.SKIN.TAILOR_UNLOCK_LEVEL}にしよう！）</small>
        </p>
        <div class="tailor-preview-items">
          <span>👑</span><span>🧣</span><span>🔮</span><span>🧶</span><span>🎨</span>
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // テイラー（スキン）タブ
  // ─────────────────────────────────────────────

  _renderTailorTab() {
    const stats   = SkinManager.getCollectionStats();
    const msgHtml = this._craftMsg
      ? `<div class="tailor-craft-msg">${this._craftMsg}</div>` : '';

    // カテゴリータブ
    const catTabs = TAILOR_CATEGORIES.map(c => `
      <button class="craft-cat-btn ${this._skinCategory === c.id ? 'active' : ''}"
              data-skin-cat="${c.id}">${c.label}</button>
    `).join('');

    // スキンカード一覧
    const skinsInCat = COLLECTIBLE_SKINS.filter(s => s.category === this._skinCategory);
    const skinCards  = skinsInCat.map(skin => {
      const unlocked = SkinManager.isUnlocked(skin.id);
      const equipped = SkinManager.getCurrentSkinId() === skin.id;
      const frags    = SkinManager.getFragmentCount(skin.id);
      const { craftable } = (skin.obtain.method === SKIN_OBTAIN.CRAFT)
        ? SkinManager.canCraft(skin.id)
        : { craftable: false };

      let statusClass = 'skin-locked';
      let badge = '';
      if (equipped) {
        statusClass = 'skin-equipped';
        badge = '<span class="skin-badge badge-equipped">✓ そうびちゅう</span>';
      } else if (unlocked) {
        statusClass = 'skin-unlocked';
        badge = '<span class="skin-badge badge-unlocked">✓ もってる</span>';
      } else if (craftable) {
        statusClass = 'skin-craftable glow-pulse';
        badge = '<span class="skin-badge badge-craftable">✨ つくれる！</span>';
      } else if (skin.obtain.method === SKIN_OBTAIN.FRAGMENT && frags > 0) {
        statusClass = 'skin-fragment-progress';
        badge = `<span class="skin-badge badge-frag">💎${frags}/${FRAGMENTS_NEEDED}</span>`;
      }

      return `
        <div class="craft-item-card ${statusClass} ${this._selectedSkin === skin.id ? 'selected' : ''}"
             data-skin-id="${skin.id}" role="button" tabindex="0">
          <div class="craft-item-img">
            <img src="${skin.image}" alt="${skin.name}"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <span style="display:none;font-size:2.5rem">${skin.emoji}</span>
          </div>
          <p class="craft-item-name">${skin.name}</p>
          ${badge}
        </div>
      `;
    }).join('') || '<p class="craft-empty">スキンがありません</p>';

    // 詳細パネル
    const detailHtml = this._selectedSkin
      ? this._renderSkinDetail(this._selectedSkin)
      : '';

    return `
      <div class="tailor-tab">
        ${msgHtml}
        <div class="tailor-stats">
          🎭 コレクション: ${stats.unlocked}/${stats.total} (${stats.completion}%)
        </div>
        <div class="craft-category-tabs">${catTabs}</div>
        <div class="craftsman-content">
          <div class="craft-item-list">${skinCards}</div>
          ${detailHtml}
        </div>
      </div>
    `;
  }

  _renderSkinDetail(skinId) {
    const skin     = COLLECTIBLE_SKINS.find(s => s.id === skinId);
    if (!skin) return '';

    const unlocked = SkinManager.isUnlocked(skin.id);
    const equipped = SkinManager.getCurrentSkinId() === skin.id;
    const frags    = SkinManager.getFragmentCount(skin.id);

    let actionBtn = '';

    if (equipped) {
      actionBtn = `<button class="btn btn-large btn-secondary" disabled>✓ そうびちゅう</button>`;
    } else if (unlocked) {
      actionBtn = `
        <button class="btn btn-large btn-success tailor-equip-btn" data-skin-id="${skin.id}">
          👗 きがえる！
        </button>
      `;
    } else if (skin.obtain.method === SKIN_OBTAIN.CRAFT) {
      const { craftable, missing } = SkinManager.canCraft(skin.id);
      const materials = GameStore.getState('inventory.materials') || {};
      const recipe    = skin.obtain.recipe || {};
      const MOJI = { wood:'🌲',stone:'⛰️',brick:'🧱',gem:'💎',star_fragment:'✨',cloth:'🧶',paint:'🎨',crown:'👑',cape:'🧣',magic_orb:'🔮' };
      const recipeHtml = Object.entries(recipe).map(([m, req]) => {
        const have = materials[m] || 0;
        return `<span class="recipe-chip ${have >= req ? 'ok' : 'ng'}">${MOJI[m]} ${have}/${req}</span>`;
      }).join('');
      if (craftable) {
        actionBtn = `
          <div class="detail-recipe-row">${recipeHtml}</div>
          <button class="btn btn-large btn-warning tailor-craft-btn" data-skin-id="${skin.id}">
            ✂️ つくる！
          </button>
        `;
      } else {
        actionBtn = `
          <div class="detail-recipe-row">${recipeHtml}</div>
          <button class="btn btn-large btn-secondary" disabled>素材が足りない…</button>
        `;
      }
    } else if (skin.obtain.method === SKIN_OBTAIN.FRAGMENT) {
      actionBtn = `
        <div class="skin-frag-row">
          ${'💎'.repeat(frags)}${'🔘'.repeat(Math.max(0, FRAGMENTS_NEEDED - frags))}
          <span class="frag-count">${frags}/${FRAGMENTS_NEEDED}</span>
        </div>
        <button class="btn btn-large btn-secondary" disabled>
          宝箱からかけらを集めよう！
        </button>
      `;
    } else {
      actionBtn = `
        <button class="btn btn-large btn-secondary" disabled>
          ${getObtainHint(skin)}
        </button>
      `;
    }

    return `
      <div class="craft-detail-panel">
        <div class="detail-header">
          <span class="detail-big-emoji">${skin.emoji}</span>
          <div class="detail-info">
            <p class="detail-name">${skin.name}</p>
            <p class="detail-rarity rarity-${skin.rarity}">${SKIN_RARITY_LABEL[skin.rarity] || ''}</p>
          </div>
        </div>
        <p class="detail-obtain-hint">${getObtainHint(skin)}</p>
        ${actionBtn}
      </div>
    `;
  }

  _renderCategoryTabs() {
    const tabs = MEISTER_CATEGORIES.map(cat => `
      <button class="craft-cat-btn ${this._category === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label}
      </button>
    `).join('');
    return `<div class="craft-category-tabs">${tabs}</div>`;
  }

  _renderItemList(materials, house) {
    const cat = MEISTER_CATEGORIES.find(c => c.id === this._category);
    if (!cat) return '<p class="craft-empty">カテゴリーなし</p>';

    const items = cat.items();
    if (!items.length) return '<p class="craft-empty">アイテムがありません</p>';

    const crafted = house.crafted || [];

    return items.map(item => {
      const isCrafted = crafted.includes(item.id);
      const isFree    = !item.recipe;
      const { craftable, missing } = HouseManager.checkCraftable(item.id);
      const isSelected = this._selectedItem === item.id;
      const sectionUnlocked = HouseManager.isSectionUnlocked(item.section);

      let statusClass = 'item-locked';
      let badge = '';

      if (isCrafted) {
        statusClass = 'item-crafted';
        badge = '<span class="craft-badge badge-crafted">✓ もってる</span>';
      } else if (!sectionUnlocked) {
        statusClass = 'item-section-locked';
        badge = '<span class="craft-badge badge-section">🔒 あとで</span>';
      } else if (isFree) {
        statusClass = 'item-free';
        badge = '<span class="craft-badge badge-free">むりょう</span>';
      } else if (craftable) {
        statusClass = 'item-craftable glow-pulse';
        badge = '<span class="craft-badge badge-craftable">✨ つくれる！</span>';
      } else {
        const missingStr = Object.entries(missing)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`)
          .join(' ');
        badge = `<span class="craft-badge badge-missing">あと ${missingStr}</span>`;
      }

      return `
        <div class="craft-item-card ${statusClass} ${isSelected ? 'selected' : ''}"
             data-item-id="${item.id}" role="button" tabindex="0">
          <div class="craft-item-img">
            ${item.image
              ? `<img src="${item.image}" alt="${item.name}"
                      onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                 <span style="display:none;font-size:2rem">${item.imageFallback}</span>`
              : `<span style="font-size:2rem">${item.imageFallback}</span>`
            }
          </div>
          <p class="craft-item-name">${item.name}</p>
          ${badge}
        </div>
      `;
    }).join('');
  }

  _renderDetailPanel(itemId, materials, house) {
    const item = getItemById(itemId);
    if (!item) return '';

    const crafted = house.crafted || [];
    const isCrafted = crafted.includes(item.id);
    const isFree = !item.recipe;
    const { craftable, missing } = HouseManager.checkCraftable(item.id);
    const sectionUnlocked = HouseManager.isSectionUnlocked(item.section);

    // レシピ行
    let recipeHtml = '';
    if (isFree) {
      recipeHtml = `<p class="detail-recipe-free">🎁 むりょうでつかえます！</p>`;
    } else if (item.recipe) {
      const rows = Object.entries(item.recipe).map(([mat, req]) => {
        const have = materials[mat] || 0;
        const ok   = have >= req;
        return `<span class="recipe-chip ${ok ? 'ok' : 'ng'}">${MATERIAL_EMOJI[mat]} ${have}/${req}</span>`;
      }).join('');
      recipeHtml = `<div class="detail-recipe-row">${rows}</div>`;
    }

    // アクションボタン
    let actionBtn = '';
    if (!sectionUnlocked) {
      actionBtn = `<button class="btn btn-large btn-secondary" disabled>🔒 まだ解放されていません</button>`;
    } else if (isCrafted || isFree) {
      actionBtn = `
        <button class="btn btn-large btn-success craft-place-btn" data-item-id="${item.id}">
          ✅ いえにかざる
        </button>
      `;
    } else if (craftable) {
      actionBtn = `
        <button class="btn btn-large btn-warning craft-do-btn" data-item-id="${item.id}">
          🔨 つくる！
        </button>
      `;
    } else {
      const missingStr = Object.entries(missing)
        .map(([m, n]) => `${MATERIAL_EMOJI[m]}あと${n}`)
        .join('、');
      actionBtn = `
        <button class="btn btn-large btn-secondary" disabled>
          素材が足りない… (${missingStr})
        </button>
      `;
    }

    return `
      <div class="craft-detail-panel">
        <div class="detail-header">
          <span class="detail-big-emoji">${item.imageFallback}</span>
          <div class="detail-info">
            <p class="detail-name">${item.name}</p>
            <p class="detail-rarity rarity-${item.rarity}">${RARITY_LABEL[item.rarity] || item.rarity}</p>
          </div>
        </div>
        ${recipeHtml}
        ${actionBtn}
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // 施設強化タブ
  // ─────────────────────────────────────────────

  _renderUpgradeTab() {
    const buildings = TownManager.getAllBuildingStates();
    const maxAllowed = TownManager.getMaxAllowedLevel();
    const msg = this._upgradeMsg
      ? `<div class="upgrade-result-msg">${this._upgradeMsg}</div>` : '';

    const rows = buildings.map(state => {
      const { config, level, isUnlocked, canUpgrade, canAfford, cost, missing, nextPerk, maxAllowed: stateMax } = state;
      const maxLevel = Config.TOWN.MAX_BUILDING_LEVEL;
      const isHub    = config.isUpgradeHub;

      let actionHtml = '';
      if (!isUnlocked) {
        actionHtml = `<span class="upgrade-status locked">🔒 ${state.worldsLeft}ワールド後</span>`;
      } else if (level >= maxLevel) {
        actionHtml = `<span class="upgrade-status max">✨ MAX</span>`;
      } else if (!isHub && level >= maxAllowed) {
        actionHtml = `<span class="upgrade-status hub-lock">合成屋をLv${level+1}に！</span>`;
      } else if (!canAfford) {
        const missingStr = Object.entries(missing)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ');
        actionHtml = `<span class="upgrade-status no-mat">${missingStr}</span>`;
      } else {
        const costStr = Object.entries(cost)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ');
        actionHtml = `
          <button class="btn btn-small btn-warning upgrade-do-btn" data-building="${config.id}">
            ⬆️ ${costStr}
          </button>
        `;
      }

      return `
        <div class="upgrade-row ${isUnlocked ? '' : 'locked'}">
          <div class="upgrade-row-left">
            <span class="upgrade-emoji">${config.emoji}</span>
            <div class="upgrade-info">
              <p class="upgrade-name">${config.name}</p>
              ${isUnlocked && level < maxLevel && nextPerk
                ? `<p class="upgrade-perk">次: ${nextPerk}</p>` : ''}
            </div>
          </div>
          <div class="upgrade-row-right">
            <span class="upgrade-lv">Lv${Math.max(1, level)}</span>
            ${actionHtml}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="upgrade-tab">
        ${msg}
        <p class="upgrade-hint">
          🔨 合成屋のレベルが上がると、他の施設もレベルアップできるよ！
        </p>
        <div class="upgrade-list">
          ${rows}
        </div>
      </div>
    `;
  }

  // クラフト中アニメーション（ハンマー演出）
  _renderCraftingAnimation() {
    return `
      <div class="crafting-overlay">
        <div class="crafting-hammer">🔨</div>
        <p class="crafting-text">せいさくちゅう…</p>
        <div class="crafting-sparks">✨ ⭐ 💫 ✨</div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // セリフ取得
  // ─────────────────────────────────────────────

  _getDialogue(scene) {
    const npcData = NPC_DATA[this._npc];
    const lines = npcData.dialogues[scene] || npcData.dialogues.idle;
    return lines[Math.floor(Math.random() * lines.length)];
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._container) return;

    // もどるボタン（街へ）
    this._container.querySelector('.craft-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });

    // メインタブ切替
    this._container.querySelectorAll('.craft-main-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._mainTab    = btn.dataset.mainTab;
        this._upgradeMsg = null;
        this._selectedItem = null;
        this._render();
      });
    });

    // 施設アップグレードボタン
    this._container.querySelectorAll('.upgrade-do-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const buildingId = btn.dataset.building;
        const result = TownManager.upgrade(buildingId);
        this._upgradeMsg = result.success
          ? `✅ ${Config.TOWN.BUILDINGS.find(b => b.id === buildingId)?.name} を Lv${result.newLevel} にした！`
          : `❌ ${result.reason}`;
        this._dialogue = result.success
          ? this._getDialogue('craftSuccess')
          : this._getDialogue('craftFail');
        this._render();
      });
    });

    // NPC切替タブ
    this._container.querySelectorAll('.npc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('locked') && !Config.FEATURES.ENABLE_SKINS) {
          // スキン未実装のため切替だけ許可（予告表示のため）
        }
        this._npc = btn.dataset.npc;
        this._selectedItem = null;
        this._dialogue = this._getDialogue('idle');
        this._render();
      });
    });

    // カテゴリータブ
    this._container.querySelectorAll('.craft-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._category = btn.dataset.cat;
        this._selectedItem = null;
        this._render();
      });
    });

    // アイテムカードタップ
    this._container.querySelectorAll('.craft-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.itemId;
        this._selectedItem = this._selectedItem === id ? null : id;
        this._render();
      });
    });

    // 🔨 つくる！ボタン
    this._container.querySelector('.craft-do-btn')?.addEventListener('click', () => {
      const id = this._container.querySelector('.craft-do-btn')?.dataset.itemId;
      if (id) this._doCraft(id);
    });

    // ✅ かざるボタン
    this._container.querySelector('.craft-place-btn')?.addEventListener('click', () => {
      const id = this._container.querySelector('.craft-place-btn')?.dataset.itemId;
      if (id) this._doPlace(id);
    });

    // ──────────── テイラータブ ────────────

    // スキンカテゴリータブ切替
    this._container.querySelectorAll('[data-skin-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        this._skinCategory = btn.dataset.skinCat;
        this._selectedSkin = null;
        this._craftMsg     = null;
        this._render();
      });
    });

    // スキンカードタップ（詳細表示）
    this._container.querySelectorAll('[data-skin-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.skinId;
        this._selectedSkin = this._selectedSkin === id ? null : id;
        this._craftMsg     = null;
        this._render();
      });
    });

    // スキンクラフトボタン
    this._container.querySelector('.tailor-craft-btn')?.addEventListener('click', () => {
      const id = this._container.querySelector('.tailor-craft-btn')?.dataset.skinId;
      if (!id) return;
      const result = SkinManager.craft(id);
      this._craftMsg = result.success
        ? `✨ ${COLLECTIBLE_SKINS.find(s => s.id === id)?.name}をゲット！`
        : `❌ ${result.reason}`;
      this._dialogue = result.success
        ? this._getDialogue('craftSuccess')
        : this._getDialogue('craftFail');
      this._render();
    });

    // スキン装備ボタン
    this._container.querySelector('.tailor-equip-btn')?.addEventListener('click', () => {
      const id = this._container.querySelector('.tailor-equip-btn')?.dataset.skinId;
      if (!id) return;
      SkinManager.equip(id);
      this._craftMsg = '👗 きがえたよ！';
      this._render();
    });
  }

  // ─────────────────────────────────────────────
  // クラフト処理（ハンマー演出つき）
  // ─────────────────────────────────────────────

  _doCraft(itemId) {
    if (this._isCrafting) return;
    this._isCrafting = true;
    this._render();

    // クラフトアニメーション（Config.HOUSE.CRAFT_ANIM_DURATIONms）
    const duration = Config.HOUSE?.CRAFT_ANIM_DURATION || 1200;

    setTimeout(() => {
      this._isCrafting = false;
      const result = HouseManager.craft(itemId);

      if (result.success) {
        this._dialogue = this._getDialogue('craftSuccess');
        // 船パーツが完成した時に「マイふねに装備できるよ！」トーストを表示
        this._showShipPartToast(itemId);
      } else if (result.reason?.includes('済み')) {
        this._dialogue = this._getDialogue('alreadyCrafted');
      } else {
        this._dialogue = this._getDialogue('craftFail');
      }

      this._render();
      Logger.info(`[CraftsmanScreen] クラフト: ${itemId} → ${result.success}`);
    }, duration);
  }

  // ─────────────────────────────────────────────
  // 配置処理（HouseManagerに委譲）
  // ─────────────────────────────────────────────

  /**
   * 船パーツのクラフト完了後にトーストを出す
   * shipItems.js の SHIP_PARTS に該当 ID があれば表示
   * @param {string} itemId
   * @private
   */
  _showShipPartToast(itemId) {
    // 動的 import で shipItems を参照（循環依存を避けるため）
    import('../data/shipItems.js').then(({ SHIP_PARTS, SMALL_SKINS }) => {
      const isShipPart = [...SHIP_PARTS, ...SMALL_SKINS].some(p => p.id === itemId);
      if (!isShipPart) return;

      const toast = document.createElement('div');
      toast.className = 'skin-toast';   // 既存トーストスタイルを流用
      toast.style.cssText = 'bottom:80px;cursor:pointer;';
      toast.textContent = '⛵ マイふねに装備できるよ！';
      toast.addEventListener('click', () => {
        import('../core/GameStore.js').then(({ GameStore }) => {
          GameStore.setState('app.currentScreen', 'ship_build');
        });
        toast.remove();
      });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }).catch(() => { /* ship パーツでなければ何もしない */ });
  }

  _doPlace(itemId) {
    const item = getItemById(itemId);
    if (!item) return;

    const target = GameStore.getState('app.craftsmanTarget');
    let placed = false;
    let message = '';

    if (this._category === 'furniture' || item.section?.startsWith('floor')) {
      const floor = target?.floor || item.section || 'floor1';
      const furniture = [...(GameStore.getState(`house.${floor}.furniture`) || [])];
      const emptyIdx = target?.slot !== undefined
        ? target.slot
        : furniture.findIndex(s => s === null);
      if (emptyIdx >= 0) {
        placed = HouseManager.setFurniture(floor, emptyIdx, itemId);
        message = placed ? `${floor}のかぐにおきました！` : 'スロットがいっぱいです';
      } else {
        message = 'スロットがいっぱいです';
      }
    } else if (this._category === 'garden') {
      const decos = [...(GameStore.getState('house.garden.decorations') || [])];
      const emptyIdx = target?.slot !== undefined
        ? target.slot
        : decos.findIndex(s => s === null);
      if (emptyIdx >= 0) {
        placed = HouseManager.setGardenDeco(emptyIdx, itemId);
        message = placed ? 'にわにおきました！🌸' : '庭スロットがいっぱいです';
      } else {
        message = '庭スロットがいっぱいです';
      }
    } else if (this._category === 'exterior') {
      placed = HouseManager.setExteriorStyle(itemId);
      message = placed ? 'いえのスタイルをかえました！🏠' : '変更できませんでした';
    } else if (this._category === 'deco') {
      if (item.slot) {
        placed = HouseManager.setExteriorDeco(item.slot, itemId);
        message = placed ? 'そとにかざりました！' : '外観装飾に失敗しました';
      }
    } else if (this._category === 'wallfloor') {
      const floor = target?.floor || 'floor1';
      if (item.id.startsWith('wallpaper')) {
        placed = HouseManager.setFloor1Wallpaper(itemId);
        message = placed ? 'かべがみをかえました！' : '変更できませんでした';
      } else {
        placed = HouseManager.setFloor1Floor(itemId);
        message = placed ? 'ゆかをかえました！' : '変更できませんでした';
      }
    } else if (this._category === 'tower') {
      const decos = [...(GameStore.getState('house.tower.decorations') || [])];
      const emptyIdx = decos.findIndex(s => s === null);
      if (emptyIdx >= 0) {
        placed = HouseManager.setTowerDeco(emptyIdx, itemId);
        message = placed ? 'とうにかざりました！✨' : '失敗しました';
      }
    }

    if (placed) {
      this._dialogue = message || this._getDialogue('craftSuccess');
      GameStore.setState('app.craftsmanTarget', null);
    } else {
      this._dialogue = message || this._getDialogue('craftFail');
    }

    this._render();
  }
}

export default CraftsmanScreen;
