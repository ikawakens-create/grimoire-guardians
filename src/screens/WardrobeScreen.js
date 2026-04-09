/**
 * WardrobeScreen.js - Grimoire Guardians
 * きがえや（スキン試着室）
 *
 * 機能:
 *   - キャラクター200px中央プレビュー（タップで即座に切り替え）
 *   - カテゴリタブによるスキン絞り込み
 *   - 3列グリッド（タップターゲット48px以上確保）
 *   - 未解放スキンのシルエット表示（SUPER_RAREは金色）
 *   - ロック条件の具体的な表示（あとN日/あとX素材/かけらN/3）
 *   - 解放済みスキンの即装備＋軽い演出
 *   - コレクション進捗（N/24）表示
 *
 * @version 1.0
 * @date 2026-04-07
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import { SkinManager } from '../core/SkinManager.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import {
  SKINS, COLLECTIBLE_SKINS, SKIN_OBTAIN, SKIN_RARITY,
  RARITY_LABEL, FRAGMENTS_NEEDED, getSkinById,
} from '../data/skinItems.js';

// ─── カテゴリ定義 ──────────────────────────────────────────
const CATEGORIES = [
  { id: 'all',    label: 'すべて'     },
  { id: 'cool',   label: 'かっこいい' },
  { id: 'cute',   label: 'かわいい'   },
  { id: 'funny',  label: 'おもしろ'   },
  { id: 'secret', label: 'ひみつ'     },
];

// ─── リアクションプレビューボタン定義 ─────────────────────
// fn(avatar, skin, playerName, streak) → void
const REACTION_BTNS = [
  {
    emoji: '✨',
    label: 'せいかい！',
    fn: (av, sk) => av.victoryPose(sk.reactions?.correct),
  },
  {
    emoji: '😅',
    label: 'おしい！',
    fn: (av, sk) => av.sadReact(sk.reactions?.wrong),
  },
  {
    emoji: '🔥',
    label: 'コンボ！',
    fn: (av, sk) => av.startTalking(
      sk.reactions?.combo3 ?? sk.reactions?.correct ?? '🔥', 1500
    ),
  },
  {
    emoji: '👋',
    label: 'あいさつ',
    fn: (av, _sk, name, streak) => av.greet(name, streak),
  },
];

// 素材絵文字
const MAT_EMOJI = {
  wood: '🌲', stone: '⛰️', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};

export class WardrobeScreen {
  /**
   * @param {HTMLElement} container - 描画先のコンテナ
   * @param {Function}    onBack    - もどるボタン押下時のコールバック
   */
  constructor(container, onBack) {
    this._container = container;
    this._onBack    = onBack;
    this._el        = null;

    /** @type {string} 現在選択中のカテゴリ */
    this._category = 'all';

    /** @type {string} プレビュー中のスキンID（未確定） */
    this._previewId = SkinManager.getCurrentSkinId();

    /** @type {CharacterAvatar|null} プレビューアバターインスタンス（使い回す） */
    this._avatar = null;

    /** @type {number|null} 自動greetの遅延タイマーID */
    this._greetTimer = null;
  }

  // ─────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────

  render() {
    if (this._el) this._el.remove();

    const el = document.createElement('div');
    el.className = 'wardrobe-screen';

    el.appendChild(this._buildHeader());
    el.appendChild(this._buildBody());

    this._el = el;
    this._container.appendChild(el);
  }

  destroy() {
    clearTimeout(this._greetTimer);
    this._greetTimer = null;
    if (this._avatar) {
      this._avatar.stopTalking();
      this._avatar = null;
    }
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
  }

  // ─────────────────────────────────────────────
  // Private — 構築
  // ─────────────────────────────────────────────

  /** ヘッダー（もどる・タイトル・コレクション数） */
  _buildHeader() {
    const stats = SkinManager.getCollectionStats();

    const header = document.createElement('header');
    header.className = 'wardrobe-header';

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'button button-secondary button-small';
    backBtn.textContent = 'もどる';
    backBtn.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._onBack();
    });

    const title = document.createElement('div');
    title.className = 'wardrobe-title';
    title.textContent = '👗 きがえや';

    const progress = document.createElement('div');
    progress.className = 'wardrobe-collection-badge';
    progress.textContent = `🎭 ${stats.unlocked}/${stats.total}`;

    header.appendChild(backBtn);
    header.appendChild(title);
    header.appendChild(progress);

    return header;
  }

  /** メイン2カラム（プレビュー左・グリッド右） */
  _buildBody() {
    const body = document.createElement('div');
    body.className = 'wardrobe-body';

    body.appendChild(this._buildPreviewPanel());
    body.appendChild(this._buildGridPanel());

    return body;
  }

  /** 左カラム：CharacterAvatar プレビュー + スキン情報 + リアクションボタン + 装備ボタン */
  _buildPreviewPanel() {
    const skin = getSkinById(this._previewId);

    const panel = document.createElement('div');
    panel.className = 'wardrobe-preview-panel';
    // カテゴリに応じた背景色クラスを付与（all は無指定）
    if (skin.category) panel.dataset.cat = skin.category;

    // ─ アバター（CharacterAvatar xl・インスタンス初回生成 or 再利用）
    const charWrap = document.createElement('div');
    charWrap.className = 'wardrobe-char-wrap';

    if (!this._avatar) {
      this._avatar = new CharacterAvatar('xl', 'normal', { skinIdOverride: this._previewId });
    }
    charWrap.appendChild(this._avatar.render());
    panel.appendChild(charWrap);

    // ─ スキン名・レアリティ
    const nameEl = document.createElement('div');
    nameEl.className = 'wardrobe-skin-name';
    nameEl.dataset.rarity = skin.rarity ?? '';
    nameEl.textContent = skin.name;
    panel.appendChild(nameEl);

    const rarityEl = document.createElement('div');
    rarityEl.className = 'wardrobe-skin-rarity';
    rarityEl.textContent = RARITY_LABEL[skin.rarity] ?? '';
    panel.appendChild(rarityEl);

    // ─ リアクションプレビューボタン群
    const reactionSection = document.createElement('div');
    reactionSection.className = 'wardrobe-reaction-section';

    const hint = document.createElement('div');
    hint.className = 'wardrobe-reaction-hint';
    hint.textContent = '👆 たたいてためしてみて！';
    reactionSection.appendChild(hint);

    const btnRow = document.createElement('div');
    btnRow.className = 'wardrobe-reaction-btns';

    REACTION_BTNS.forEach(def => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wardrobe-reaction-btn';
      btn.innerHTML = `<span class="wrb-emoji">${def.emoji}</span><span class="wrb-label">${def.label}</span>`;
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        // 再生中はglow演出
        btn.classList.add('is-playing');
        setTimeout(() => btn.classList.remove('is-playing'), 1800);
        const name   = GameStore.getState('player.name')   || 'プレイヤー';
        const streak = GameStore.getState('player.streak') || 1;
        def.fn(this._avatar, skin, name, streak);
      });
      btnRow.appendChild(btn);
    });

    reactionSection.appendChild(btnRow);
    panel.appendChild(reactionSection);

    // ─ 装備ボタン
    panel.appendChild(this._buildActionButton(this._previewId));

    return panel;
  }

  /** 右カラム：カテゴリタブ＋スキングリッド */
  _buildGridPanel() {
    const panel = document.createElement('div');
    panel.className = 'wardrobe-grid-panel';

    // カテゴリタブ
    const tabs = document.createElement('div');
    tabs.className = 'wardrobe-category-tabs';
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wardrobe-tab' + (this._category === cat.id ? ' active' : '');
      btn.textContent = cat.label;
      btn.dataset.cat = cat.id;
      btn.addEventListener('click', () => {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._category = cat.id;
        this._refreshGridPanel(panel);
      });
      tabs.appendChild(btn);
    });
    panel.appendChild(tabs);

    // グリッド
    panel.appendChild(this._buildGrid());

    return panel;
  }

  /** スキン3列グリッド */
  _buildGrid() {
    const grid = document.createElement('div');
    grid.className = 'wardrobe-skin-grid';

    const skins = this._category === 'all'
      ? COLLECTIBLE_SKINS
      : COLLECTIBLE_SKINS.filter(s => s.category === this._category);

    skins.forEach(skin => {
      grid.appendChild(this._buildSkinCard(skin));
    });

    return grid;
  }

  /** 1枚のスキンカード */
  _buildSkinCard(skin) {
    const unlocked  = SkinManager.isUnlocked(skin.id);
    const equipped  = SkinManager.getCurrentSkinId() === skin.id;
    const previewing = this._previewId === skin.id;
    const isSuperRare = skin.rarity === SKIN_RARITY.SUPER_RARE;

    const card = document.createElement('div');
    card.className = 'wardrobe-skin-card'
      + (previewing  ? ' previewing' : '')
      + (equipped    ? ' equipped'   : '')
      + (unlocked    ? ' unlocked'   : ' locked')
      + (!unlocked && isSuperRare ? ' super-rare' : '');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.dataset.skinId = skin.id;

    const imgEl = document.createElement('img');
    imgEl.src = skin.image;
    imgEl.alt = skin.name;
    imgEl.className = 'wardrobe-card-img';

    // シルエット色はCSSで制御（.locked img → 黒、.locked.super-rare img → 金色）

    imgEl.addEventListener('error', () => {
      imgEl.style.display = 'none';
      const emojiEl = document.createElement('span');
      emojiEl.className = 'wardrobe-card-emoji';
      emojiEl.textContent = skin.emoji;
      if (!unlocked) emojiEl.style.filter = 'grayscale(1) brightness(0.5)';
      card.prepend(emojiEl);
    });

    card.appendChild(imgEl);

    // 装備中バッジ
    if (equipped) {
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = 'そうびちゅう';
      card.appendChild(badge);
    } else if (previewing) {
      const badge = document.createElement('span');
      badge.className = 'card-badge';
      badge.textContent = '▶ みてる';
      card.appendChild(badge);
    }

    card.addEventListener('click', () => this._selectSkin(skin.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') this._selectSkin(skin.id);
    });

    return card;
  }

  /** アクションボタン（装備状態に応じて変化） */
  _buildActionButton(skinId) {
    const unlocked = SkinManager.isUnlocked(skinId);
    const equipped = SkinManager.getCurrentSkinId() === skinId;
    const skin     = getSkinById(skinId);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wardrobe-action-btn';

    if (equipped) {
      btn.textContent = '✓ そうびちゅう';
      btn.classList.add('equipped');
      btn.disabled = true;
    } else if (unlocked) {
      btn.textContent = '👗 きがえる！';
      btn.classList.add('equip');
      btn.addEventListener('click', () => this._equipSkin(skinId));
    } else {
      btn.textContent = this._renderObtainHint(skin);
      btn.classList.add('locked');
      btn.disabled = true;
    }

    return btn;
  }

  /** ロック条件テキスト生成 */
  _renderObtainHint(skin) {
    const o = skin.obtain;
    switch (o.method) {
      case SKIN_OBTAIN.CRAFT: {
        const { craftable, missing } = SkinManager.canCraft(skin.id);
        if (craftable) return '✂️ きがえや で つくる！';
        const parts = Object.entries(missing || {})
          .map(([mat, cnt]) => `${MAT_EMOJI[mat] ?? mat}×${cnt}`)
          .join(' ');
        return `🔒 あと ${parts}`;
      }
      case SKIN_OBTAIN.STREAK: {
        const streak = GameStore.getState('player.streak') || 1;
        const left   = Math.max(0, o.streakDays - streak);
        return left > 0 ? `🔒 あと${left}にち れんぞく` : '✨ もうすぐ！';
      }
      case SKIN_OBTAIN.FRAGMENT: {
        const frags = SkinManager.getFragmentCount(skin.id);
        return `💎 かけら ${frags}/${FRAGMENTS_NEEDED}`;
      }
      case SKIN_OBTAIN.MILESTONE:
        return '🏆 とくべつな みちのり';
      case SKIN_OBTAIN.TREASURE:
        return '💎 たからばこから でるかも';
      default:
        return '🔒 まだ かいほうされていないよ';
    }
  }

  // ─────────────────────────────────────────────
  // Private — インタラクション
  // ─────────────────────────────────────────────

  /** スキンカードをタップしてプレビュー */
  _selectSkin(skinId) {
    if (this._previewId === skinId) return;
    SoundManager.playSFX(SoundType.BUTTON_CLICK);
    this._previewId = skinId;

    // アバターをスキン切り替え（ポップイン演出は refresh() 内で CSS が担う）
    if (this._avatar) this._avatar.updateSkin(skinId);

    this._refreshPreviewPanel();
    this._refreshGridCards();

    // スキン選択直後に自動 greet（0.3秒後）
    clearTimeout(this._greetTimer);
    this._greetTimer = setTimeout(() => {
      if (!this._avatar) return;
      const name   = GameStore.getState('player.name')   || 'プレイヤー';
      const streak = GameStore.getState('player.streak') || 1;
      this._avatar.greet(name, streak);
    }, 300);
  }

  /** きがえる！実行 */
  _equipSkin(skinId) {
    const result = SkinManager.equip(skinId);
    if (!result.success) return;

    SoundManager.playSFX(SoundType.CORRECT_ANSWER);
    this._showEquipEffect();
    // プレビューパネルとグリッドを更新（ボタン状態変化）
    this._refreshPreviewPanel();
    this._refreshGridCards();
  }

  /** 装備時の演出（victoryPose + 全画面フラッシュ） */
  _showEquipEffect() {
    if (!this._el) return;

    // CharacterAvatar の victoryPose で bounce + セリフ
    if (this._avatar) {
      const skin = getSkinById(this._previewId);
      this._avatar.victoryPose(skin.reactions?.correct);
    }

    // 全画面フラッシュ
    const flash = document.createElement('div');
    flash.className = 'wardrobe-equip-flash';
    this._el.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  }

  // ─────────────────────────────────────────────
  // Private — 部分更新
  // ─────────────────────────────────────────────

  /** プレビューパネルだけ再描画 */
  _refreshPreviewPanel() {
    if (!this._el) return;
    const old = this._el.querySelector('.wardrobe-preview-panel');
    if (!old) return;
    // _avatar インスタンスは使い回すため、次の _buildPreviewPanel では
    // this._avatar が非 null のまま render() だけ呼ばれる
    const next = this._buildPreviewPanel();
    next.classList.add('wardrobe-pop-in');
    old.replaceWith(next);
  }

  /** グリッドカードのみ再描画（カテゴリ変更・装備変更時） */
  _refreshGridPanel(panel) {
    if (!panel) return;
    // カテゴリタブを更新
    panel.querySelectorAll('.wardrobe-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === this._category);
    });
    // グリッドだけ差し替え
    const oldGrid = panel.querySelector('.wardrobe-skin-grid');
    if (oldGrid) oldGrid.replaceWith(this._buildGrid());
  }

  /** グリッドカードの選択・装備状態だけ更新（再描画最小化） */
  _refreshGridCards() {
    if (!this._el) return;
    const cards = this._el.querySelectorAll('.wardrobe-skin-card');
    cards.forEach(card => {
      const id = card.dataset.skinId;
      if (!id) return;
      const previewing = id === this._previewId;
      const equipped   = SkinManager.getCurrentSkinId() === id;
      card.classList.toggle('previewing', previewing);
      card.classList.toggle('equipped', equipped);
    });
  }
}

export default WardrobeScreen;
