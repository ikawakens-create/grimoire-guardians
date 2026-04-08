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
  SKIN_RARITY,
  FRAGMENTS_NEEDED,
  RARITY_LABEL as SKIN_RARITY_LABEL,
  getObtainHint,
} from '../data/skinItems.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
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
    name:     'ガルド',
    title:    'カメの老職人',
    emoji:    '🐢',
    image:    'assets/npcs/meister.png',
    color:    '#5d8a4e',
    bgColor:  'rgba(93,138,78,0.15)',
    locked:   false,
    dialogues: {
      idle: [
        '……なにを作る？',
        '急いで作ったものは長持ちしない。丁寧にやれ。',
        '素材さえあれば、なんでも化けるぞ。',
        'ほぅ……いい素材だ。腕が鳴るな。',
        '今日もいい仕事をしよう。ゆっくりと、確実に。',
      ],
      craftSuccess: [
        'ほぅ……いい出来だ。',
        'できた。これは長持ちするぞ。',
        '丁寧に作ると、こうなる。',
        '……うむ。わしの目に狂いはなかった。',
        '素材がいいと、仕事が楽しくなる。',
      ],
      craftFail: [
        '素材が足りん。もっと集めてこい。',
        '……焦るな。素材が揃ってからだ。',
        '材料なしには作れん。当然のことだ。',
      ],
      alreadyCrafted: [
        'それはもう作ったじゃろう。大切にしろよ。',
        '同じものを二つ作る必要はない。',
      ],
    },
  },
  tailor: {
    id:       'tailor',
    name:     'ピコ',
    title:    'チョウチョのデザイナー',
    emoji:    '🦋',
    image:    'assets/npcs/tailor.png',
    color:    '#e056a0',
    bgColor:  'rgba(224,86,160,0.15)',
    locked:   true, // ENABLE_SKINS で解放
    dialogues: {
      idle: [
        'いらっしゃい！今日はどんな色にする？',
        'そのスキン、絶対似合うよ！着てみて！',
        '素材3つ持ってきてくれたら、すぐ縫ってあげる！',
        'ガルドじいさんみたいに渋くなりたい……でもかわいい方が勝っちゃう！',
        'わたし、すきなものを作ってる時が一番たのしい！',
      ],
      craftSuccess: [
        'できた〜〜！！似合う！絶対似合う！！',
        'ど？かわいいでしょ！！わたしのさいしんさく！',
        'やった！これ最高じゃない！？！？',
        'ガルドじいさんにも見せてあげよう！',
        'うわ〜〜好き！！これ絶対お気に入りになるよ！！',
      ],
      craftFail: [
        'あ〜！素材が足りないよ〜！もう少しだったのに！',
        'ちょっと待って！素材を集めてから来てね！',
        '材料がないと縫えないの……ごめんね〜！',
      ],
      alreadyCrafted: [
        'それはもう作ったよ！すごく似合ってたよね！',
        'これは持ってるよ！ほかのも作ってみよう！',
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
    this._dialogueTimer = null;  // セリフローテーション用インターバル
    this._craftTimers = [];      // クラフト儀式タイマー群
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

    this._dialogue = this._buildWelcomeDialogue();
    this._render();

    // NPCエリアにスライドインアニメを付与
    setTimeout(() => {
      this._element?.querySelector('.craftsman-left')?.classList.add('slide-in-left');
    }, 50);

    // セリフローテーション開始
    this._startDialogueRotation();

    Logger.info('[CraftsmanScreen] 表示: npc=' + this._npc);
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    if (this._dialogueTimer) { clearInterval(this._dialogueTimer); this._dialogueTimer = null; }
    this._craftTimers.forEach(t => clearTimeout(t));
    this._craftTimers = [];
    this._isCrafting = false;
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
          ${this._renderHeroZone()}
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
            <!-- 素材カード -->
            <div class="facility-mat-cards">
              ${['wood','stone','brick','gem','star_fragment'].map(id => {
                const amt = materials[id] || 0;
                return `<div class="mat-card${amt === 0 ? ' mat-empty' : ''}"><span class="mat-card-emoji">${MATERIAL_EMOJI[id]}</span><span class="mat-card-count">${amt}</span></div>`;
              }).join('')}
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
            <img src="${npcData.image}" alt="${npcData.name}" class="craft-npc-img"
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
      let hintText = '';
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

      // 未解放カードに解放ヒントを表示
      if (!unlocked) {
        hintText = this._cardObtainHint(skin, frags);
      }

      // 未解放はシルエット（SUPER_RAREは金色）
      const imgFilter = this._skinImgFilter(skin, unlocked);

      return `
        <div class="craft-item-card ${statusClass} ${this._selectedSkin === skin.id ? 'selected' : ''}"
             data-skin-id="${skin.id}" role="button" tabindex="0">
          <div class="craft-item-img">
            <img src="${skin.image}" alt="${skin.name}"
                 style="${imgFilter}"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <span style="display:none;font-size:2.5rem">${skin.emoji}</span>
          </div>
          <p class="craft-item-name">${unlocked ? skin.name : '？？？'}</p>
          ${badge}
          ${hintText ? `<p class="skin-card-hint">${hintText}</p>` : ''}
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
        ${this._renderHeroZone()}
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

  // ─────────────────────────────────────────────
  // テイラー補助メソッド
  // ─────────────────────────────────────────────

  /**
   * スキン画像に適用する filter スタイルを返す
   * @param {object} skin
   * @param {boolean} unlocked
   * @returns {string} CSS style 文字列（例 "filter:brightness(0)"）
   */
  _skinImgFilter(skin, unlocked) {
    if (unlocked) return '';
    if (skin.rarity === SKIN_RARITY.SUPER_RARE) {
      return 'filter:brightness(0) sepia(1) saturate(3) hue-rotate(5deg)';
    }
    return 'filter:brightness(0)';
  }

  /**
   * スキンカード上に表示するコンパクトな解放ヒントを返す
   * @param {object} skin
   * @param {number} frags - 現在のかけら数
   * @returns {string}
   */
  _cardObtainHint(skin, frags) {
    const streak = GameStore.getState('player.streak') || 1;
    switch (skin.obtain?.method) {
      case SKIN_OBTAIN.CRAFT: {
        const { missing } = SkinManager.canCraft(skin.id);
        const MOJI = { wood:'🌲',stone:'⛰️',brick:'🧱',gem:'💎',star_fragment:'✨',
                       cloth:'🧶',paint:'🎨',crown:'👑',cape:'🧣',magic_orb:'🔮' };
        const parts = Object.entries(missing || {})
          .slice(0, 2)
          .map(([m, n]) => `${MOJI[m] ?? m}×${n}`)
          .join(' ');
        return parts ? `あと ${parts}` : '';
      }
      case SKIN_OBTAIN.STREAK: {
        const left = Math.max(0, (skin.obtain.streakDays || 0) - streak);
        return left > 0 ? `あと${left}にち` : 'もうすぐ！';
      }
      case SKIN_OBTAIN.FRAGMENT:
        return `かけら ${frags}/${FRAGMENTS_NEEDED}`;
      default:
        return 'ひみつのにゅうしゅ';
    }
  }

  /**
   * スキン解放祝福モーダルを表示する。
   * craft / streak / milestone など解放経路を問わず使用可能。
   * @param {object}   skin      - 解放されたスキンオブジェクト
   * @param {Function} onEquip   - 「きがえる！」ボタン押下時のコールバック
   * @param {Function} onClose   - 「あとで」ボタン押下時のコールバック
   */
  _showUnlockModal(skin, onEquip, onClose) {
    // オーバーレイ
    const overlay = document.createElement('div');
    overlay.className = 'skin-unlock-overlay';

    // モーダル本体
    const modal = document.createElement('div');
    modal.className = 'skin-unlock-modal';

    // ヘッダー
    const header = document.createElement('p');
    header.className = 'skin-unlock-header';
    header.textContent = '✨ ゲット！';
    modal.appendChild(header);

    // CharacterAvatar xl を生成し、新しく解放されたスキンの画像を上書き表示する
    // （craft() は unlock のみで equip しないため、現在のスキンではなく新スキンを見せる）
    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'skin-unlock-avatar';
    const avatar = new CharacterAvatar('xl');
    avatarWrap.appendChild(avatar.render());

    // 解放されたスキンの画像・絵文字に上書き
    const avatarImg = avatarWrap.querySelector('.char-avatar-img');
    if (avatarImg) {
      avatarImg.src = skin.image;
      avatarImg.alt = skin.name;
    }
    const avatarEmoji = avatarWrap.querySelector('.char-avatar-emoji');
    if (avatarEmoji) avatarEmoji.textContent = skin.emoji || '🧙';

    modal.appendChild(avatarWrap);

    // スキン名・レアリティ
    const nameEl = document.createElement('p');
    nameEl.className = 'skin-unlock-name';
    nameEl.textContent = skin.name;
    modal.appendChild(nameEl);

    const rarityEl = document.createElement('p');
    rarityEl.className = 'skin-unlock-rarity';
    rarityEl.textContent = SKIN_RARITY_LABEL[skin.rarity] ?? '';
    modal.appendChild(rarityEl);

    // ボタン行
    const btnRow = document.createElement('div');
    btnRow.className = 'skin-unlock-btn-row';

    const equipBtn = document.createElement('button');
    equipBtn.type = 'button';
    equipBtn.className = 'button skin-unlock-equip-btn';
    equipBtn.textContent = '👗 きがえる！';
    equipBtn.addEventListener('click', () => {
      avatar.stopTalking();
      overlay.remove();
      onEquip();
    });

    const laterBtn = document.createElement('button');
    laterBtn.type = 'button';
    laterBtn.className = 'button button-secondary skin-unlock-later-btn';
    laterBtn.textContent = 'あとで';
    laterBtn.addEventListener('click', () => {
      avatar.stopTalking();
      overlay.remove();
      onClose();
    });

    btnRow.appendChild(equipBtn);
    btnRow.appendChild(laterBtn);
    modal.appendChild(btnRow);

    overlay.appendChild(modal);
    this._container.appendChild(overlay);

    // 表示後に victoryPose + RARE_DROP SE
    SoundManager.playSFX(SoundType.RARE_DROP);
    setTimeout(() => {
      avatar.victoryPose(skin.reactions?.correct ?? '✨');
    }, 100);
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
  // ウェルカム演出・セリフローテーション
  // ─────────────────────────────────────────────

  _startDialogueRotation() {
    if (this._dialogueTimer) { clearInterval(this._dialogueTimer); this._dialogueTimer = null; }
    this._dialogueTimer = setInterval(() => {
      if (this._isCrafting) return;
      this._dialogue = this._getDialogue('idle');
      const bubble = this._element?.querySelector('.npc-dialogue');
      if (bubble) bubble.textContent = this._dialogue;
    }, 3500);
  }

  _buildWelcomeDialogue() {
    const name = GameStore.getState('player.name') || 'きみ';
    if (this._npc === NPC.MEISTER) {
      const craftables = this._findCraftableItems();
      if (craftables.length > 0) {
        return `${name}！いいとこに来た！${craftables[0].name}が作れるぞ！`;
      }
      const almost = this._findAlmostCraftableItem();
      if (almost) {
        const { missing } = HouseManager.checkCraftable(almost.id);
        const parts = Object.entries(missing).slice(0, 2)
          .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ');
        return `${name}！もう少しだ！あと${parts}で${almost.name}が作れる！`;
      }
    } else if (this._npc === NPC.TAILOR) {
      const craftables = this._findCraftableSkins();
      if (craftables.length > 0) {
        return `${name}！いいとこに来た！${craftables[0].name}が作れるよ！！`;
      }
    }
    return this._getDialogue('idle');
  }

  _findCraftableItems() {
    const crafted = (GameStore.getState('house') || {}).crafted || [];
    const result = [];
    for (const cat of MEISTER_CATEGORIES) {
      for (const item of cat.items()) {
        if (crafted.includes(item.id)) continue;
        if (!HouseManager.isSectionUnlocked(item.section)) continue;
        const { craftable } = HouseManager.checkCraftable(item.id);
        if (craftable) result.push(item);
      }
    }
    return result;
  }

  _findAlmostCraftableItem() {
    const crafted = (GameStore.getState('house') || {}).crafted || [];
    const materials = GameStore.getState('inventory.materials') || {};
    let best = null, bestRatio = 0;
    for (const cat of MEISTER_CATEGORIES) {
      for (const item of cat.items()) {
        if (crafted.includes(item.id) || !item.recipe) continue;
        if (!HouseManager.isSectionUnlocked(item.section)) continue;
        const entries = Object.entries(item.recipe);
        if (!entries.length) continue;
        let total = 0, have = 0;
        for (const [mat, req] of entries) {
          total += req;
          have += Math.min(materials[mat] || 0, req);
        }
        const ratio = total ? have / total : 0;
        if (ratio > bestRatio && ratio < 1) { bestRatio = ratio; best = item; }
      }
    }
    return best;
  }

  _findCraftableSkins() {
    return COLLECTIBLE_SKINS.filter(skin => {
      if (SkinManager.isUnlocked(skin.id)) return false;
      if (skin.obtain?.method !== SKIN_OBTAIN.CRAFT) return false;
      return SkinManager.canCraft(skin.id).craftable;
    });
  }

  // ─────────────────────────────────────────────
  // 「いまつくれる！」ヒーローゾーン
  // ─────────────────────────────────────────────

  _renderHeroZone() {
    const isTailor  = this._npc === NPC.TAILOR;
    const craftables = isTailor ? this._findCraftableSkins() : this._findCraftableItems();

    if (craftables.length === 0) {
      if (isTailor) return '';
      const almost = this._findAlmostCraftableItem();
      if (!almost) return '';
      const { missing } = HouseManager.checkCraftable(almost.id);
      const missingStr = Object.entries(missing)
        .map(([m, n]) => `${MATERIAL_EMOJI[m]}×${n}`).join(' ');
      return `
        <div class="craftable-hero almost-zone">
          <p class="hero-label">⏳ あとすこし！</p>
          <div class="hero-almost-item">
            <span class="hero-item-big-emoji">${almost.imageFallback}</span>
            <div class="hero-almost-info">
              <span class="hero-item-name">${almost.name}</span>
              <span class="hero-item-missing">あと ${missingStr}</span>
            </div>
          </div>
        </div>
      `;
    }

    const cards = craftables.slice(0, 3).map(item => {
      const emoji    = isTailor ? item.emoji : item.imageFallback;
      const dataAttr = isTailor
        ? `data-skin-id="${item.id}"`
        : `data-item-id="${item.id}"`;
      const extraCls = isTailor ? '' : 'craft-item-card';
      return `
        <div class="hero-item-card ${extraCls} glow-pulse" ${dataAttr} role="button" tabindex="0">
          <span class="hero-item-big-emoji">${emoji}</span>
          <span class="hero-item-name">${item.name}</span>
          <span class="hero-craft-badge">✨ つくれる！</span>
        </div>
      `;
    }).join('');

    return `
      <div class="craftable-hero">
        <p class="hero-label">✨ いまつくれる！</p>
        <div class="hero-cards">${cards}</div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────
  // クラフトの儀式 + リビール演出
  // ─────────────────────────────────────────────

  _startCraftRitual(type, itemId) {
    if (this._isCrafting) return;
    this._isCrafting = true;

    // ボタンを即座に無効化してフィードバック
    const craftBtn = this._element?.querySelector('.tailor-craft-btn, .craft-do-btn');
    if (craftBtn) {
      craftBtn.disabled = true;
      craftBtn.innerHTML = '✨ クラフト中！';
    }

    // セリフローテーションを一時停止
    if (this._dialogueTimer) { clearInterval(this._dialogueTimer); this._dialogueTimer = null; }

    const updateBubble = (text) => {
      this._dialogue = text;
      const bubble = this._element?.querySelector('.npc-dialogue');
      if (!bubble) return;
      bubble.textContent = text;
      bubble.classList.remove('bounce');
      void bubble.offsetWidth;
      bubble.classList.add('bounce');
    };

    updateBubble('よし！はじめるぞ！');
    const t1 = setTimeout(() => updateBubble('いち！'), 600);
    const t2 = setTimeout(() => updateBubble('に！'), 1200);
    const t3 = setTimeout(() => {
      updateBubble('さん！できた！！！');
      SoundManager.playSFX(SoundType.CORRECT);
      const avatar = this._element?.querySelector('.facility-npc-avatar');
      if (avatar) {
        avatar.classList.remove('bounce');
        void avatar.offsetWidth;
        avatar.classList.add('bounce');
      }
    }, 1800);

    const t4 = setTimeout(() => {
      this._isCrafting = false;
      if (type === 'item') {
        const result = HouseManager.craft(itemId);
        if (result.success) {
          const item = getItemById(itemId);
          this._showCraftReveal('item', item, () => {
            this._dialogue = this._getDialogue('craftSuccess');
            this._showShipPartToast(itemId);
            this._render();
            this._startDialogueRotation();
          });
        } else {
          this._dialogue = result.reason?.includes('済み')
            ? this._getDialogue('alreadyCrafted')
            : this._getDialogue('craftFail');
          this._render();
          this._startDialogueRotation();
        }
      } else if (type === 'skin') {
        const result = SkinManager.craft(itemId);
        if (result.success) {
          const skin = COLLECTIBLE_SKINS.find(s => s.id === itemId);
          this._showCraftReveal('skin', skin, () => {
            this._showUnlockModal(
              skin,
              () => { SkinManager.equip(itemId); GameStore.setState('app.currentScreen', 'wardrobe'); },
              () => {
                this._selectedSkin = itemId;
                this._craftMsg = null;
                this._render();
                this._startDialogueRotation();
              }
            );
          });
        } else {
          this._craftMsg = `❌ ${result.reason}`;
          this._dialogue = this._getDialogue('craftFail');
          this._render();
          this._startDialogueRotation();
        }
      }
      Logger.info(`[CraftsmanScreen] クラフト儀式完了: type=${type} id=${itemId}`);
    }, 2400);

    this._craftTimers.push(t1, t2, t3, t4);
  }

  _showCraftReveal(type, item, onDone) {
    const overlay = document.createElement('div');
    overlay.className = `craft-reveal-overlay${type === 'skin' ? ' reveal-dark' : ''}`;

    const inner = document.createElement('div');
    inner.className = 'craft-reveal-inner';

    if (type === 'skin' && item?.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name || '';
      img.className = 'craft-reveal-skin-img';
      img.onerror = () => { img.style.display = 'none'; emojiEl.style.display = 'block'; };
      inner.appendChild(img);
    }

    const emojiEl = document.createElement('span');
    emojiEl.className = 'craft-reveal-emoji';
    emojiEl.textContent = (type === 'skin' ? item?.emoji : item?.imageFallback) || '✨';
    if (type === 'skin' && item?.image) emojiEl.style.display = 'none';
    inner.appendChild(emojiEl);

    const nameEl = document.createElement('p');
    nameEl.className = 'craft-reveal-name';
    nameEl.textContent = item?.name || '';
    inner.appendChild(nameEl);

    const sparks = document.createElement('div');
    sparks.className = 'craft-reveal-sparks';
    sparks.innerHTML = '<span>✨</span><span>⭐</span><span>💫</span><span>✨</span>';
    inner.appendChild(sparks);

    overlay.appendChild(inner);
    this._container.appendChild(overlay);

    // scale(0) → scale(1) アニメを次フレームで発火
    requestAnimationFrame(() => requestAnimationFrame(() => {
      inner.classList.add('reveal-show');
    }));

    const duration = type === 'skin' ? 1800 : 1200;
    const t = setTimeout(() => {
      overlay.style.transition = 'opacity 0.3s';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.remove(); onDone(); }, 300);
    }, duration);
    this._craftTimers.push(t);
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
      this._startCraftRitual('skin', id);
    });

    // スキン装備ボタン
    this._container.querySelector('.tailor-equip-btn')?.addEventListener('click', () => {
      const id = this._container.querySelector('.tailor-equip-btn')?.dataset.skinId;
      if (!id) return;
      SkinManager.equip(id);
      GameStore.setState('app.currentScreen', 'wardrobe');
    });
  }

  // ─────────────────────────────────────────────
  // クラフト処理（ハンマー演出つき）
  // ─────────────────────────────────────────────

  _doCraft(itemId) {
    this._startCraftRitual('item', itemId);
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
        GameStore.setState('app.currentScreen', 'ship_build');
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
