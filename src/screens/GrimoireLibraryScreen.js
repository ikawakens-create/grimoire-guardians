/**
 * GrimoireLibraryScreen.js - Grimoire Guardians
 * 魔導書庫（グリモア・ライブラリ）画面
 *
 * - クリア済みユニットが魔法の本として棚に並ぶ
 * - Lv2: スペルカード（学習内容の振り返り）
 * - Lv3: 秘密の書斎（隠しストーリー）
 * - Lv4: 星座マップ（クリア星座）
 * - NPC: フクロウ先生（毎回違うセリフ）
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';
import WORLDS from '../data/worlds.js';

// フクロウ先生のセリフ
const OWL_DIALOGUES = {
  idle: [
    'ようこそ、まどうしょこへ！どんな本が読みたいかね？',
    'ここにはお前が学んだすべての知識が眠っておる。',
    '本とは、知識の結晶じゃ。大切にするのじゃよ。',
    '新しい本が増えると、わしもうれしいのじゃ！',
    '星の地図は、まだまだ広がるぞ…',
  ],
  bookOpen: [
    'ほほう、その本に興味があるのか！',
    'それはお前が学んだ大切な知識じゃ！',
    'よく覚えているかね？',
  ],
  secretRoom: [
    '…秘密の書斎へようこそ。ここは選ばれた者だけが入れる場所じゃ。',
  ],
};

// ユニットID → 学習内容の説明（スペルカード用）
const SPELL_CARD_DATA = {
  'world_1':  { spell: '1〜5のかず', desc: '1から5までのかずをよんだり、かいたりできる！', emoji: '1️⃣' },
  'world_2':  { spell: '6〜10のかず', desc: '6から10までのかずをよんだり、かいたりできる！', emoji: '🔟' },
  'world_3':  { spell: 'なんばんめ', desc: 'じゅんばんをあらわすことばがわかる！', emoji: '📍' },
  'world_4':  { spell: 'たしざん①', desc: 'かんたんなたしざんができる！', emoji: '➕' },
  'world_5':  { spell: 'ひきざん①', desc: 'かんたんなひきざんができる！', emoji: '➖' },
  'world_6':  { spell: '10までのかず', desc: '10までのかずをくらべることができる！', emoji: '🔢' },
  'world_7':  { spell: '20までのかず', desc: '20までのかずがわかる！', emoji: '2️⃣' },
  'world_8a': { spell: 'なんじ・ちょうど', desc: 'とけいのちょうどの時こくがよめる！', emoji: '🕐' },
  'world_8b': { spell: 'なんじはん', desc: 'とけいの「はん」がよめる！', emoji: '🕧' },
  'world_8c': { spell: '5ふんたんい', desc: 'とけいを5ふんごとによめる！', emoji: '⏰' },
  'world_9':  { spell: 'さくらんぼ算', desc: 'さくらんぼ算でたしざんができる！', emoji: '🍒' },
  'world_10a': { spell: 'くりあがり(9)', desc: '9のたしざん（くりあがり）ができる！', emoji: '✨' },
  'world_10b': { spell: 'くりあがり(8)', desc: '8のたしざん（くりあがり）ができる！', emoji: '✨' },
  'world_10c': { spell: 'くりあがり(7・6)', desc: '7・6のたしざん（くりあがり）ができる！', emoji: '✨' },
  'world_10d': { spell: 'くりあがりおうよう', desc: 'くりあがりのおうようもんだいができる！', emoji: '🌟' },
  'world_11a': { spell: '10からひくひみつ', desc: '10からひく方法がわかる！', emoji: '🔑' },
  'world_11b': { spell: 'くりさがり(11・12)', desc: '11・12のひきざん（くりさがり）ができる！', emoji: '⬇️' },
  'world_11c': { spell: 'くりさがり(13〜18)', desc: '13から18のひきざん（くりさがり）ができる！', emoji: '⬇️' },
  'world_11d': { spell: 'くりさがりおうよう', desc: 'くりさがりのおうようもんだいができる！', emoji: '🌟' },
  'world_12a': { spell: '3つのかず(たし)', desc: '3つのかずのたしざんができる！', emoji: '3️⃣' },
  'world_12b': { spell: '3つのかず(ひき)', desc: '3つのかずのひきざんができる！', emoji: '3️⃣' },
  'world_12c': { spell: 'たし・ひきまじり', desc: 'たしざんとひきざんをまぜてとける！', emoji: '🔀' },
  'world_13':  { spell: 'かたちあそび', desc: 'いろんなかたちのなまえがわかる！', emoji: '🔷' },
  'world_14a': { spell: 'おおきなかず①', desc: '100までのかずがよめる！', emoji: '💯' },
  'world_14b': { spell: 'おおきなかず②', desc: 'かずのじゅんばんがわかる！', emoji: '📈' },
  'world_14c': { spell: 'おおきなかずたし', desc: 'おおきなかずのたしざんができる！', emoji: '🏆' },
  'world_14d': { spell: 'おおきなかずひき', desc: 'おおきなかずのひきざんができる！', emoji: '🏆' },
  'world_15a': { spell: 'なんじなんぷん①', desc: 'とけいを30ぷんまでよめる！', emoji: '🕐' },
  'world_15b': { spell: 'なんじなんぷん②', desc: 'とけいを59ぷんまでよめる！', emoji: '🕑' },
  'world_16a': { spell: 'ずをつかって(たし)', desc: 'ずをつかってたしざんもんだいがとける！', emoji: '📊' },
  'world_16b': { spell: 'ずをつかって(ひき)', desc: 'ずをつかってひきざんもんだいがとける！', emoji: '📊' },
};

export class GrimoireLibraryScreen {
  constructor() {
    this._container  = null;
    this._element    = null;
    this._dialogue   = '';
    this._selectedBook = null;  // 選択中のワールドID
  }

  show(container) {
    this._container = container;
    this._dialogue  = this._randomDialogue('idle');
    this._render();
    Logger.info('[GrimoireLibraryScreen] 表示');
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

    const libLevel    = GameStore.getState('town.buildings.library.level') || 1;
    const clearedUnits = TownManager.getClearedUnits();
    const npcCfg      = Config.TOWN.NPCS.find(n => n.id === 'owl_librarian');
    const contentCfg  = Config.TOWN.LEVEL_PERKS.library;

    const el = document.createElement('div');
    el.className = 'library-screen';
    el.innerHTML = `
      <div class="library-bg" style="background-image:url('assets/town/library_bg.png')"></div>

      <div class="library-header">
        <button class="btn-icon library-back-btn">← まち</button>
        <h1 class="library-title">🏛️ まどうしょこ</h1>
        <span class="library-lv-badge">Lv${libLevel}</span>
      </div>

      <!-- フクロウ先生 -->
      <div class="library-npc-row">
        <div class="library-npc-avatar">
          <img src="${npcCfg?.image || ''}" alt="フクロウ先生"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="npc-emoji-fallback" style="display:none">🦉</div>
        </div>
        <div class="npc-bubble library-bubble">
          <p class="npc-dialogue">${this._dialogue}</p>
        </div>
      </div>

      <!-- 本棚 -->
      <div class="library-shelf-area">
        <div class="library-progress-hint">
          📖 ${clearedUnits.length} / ${WORLDS.length} さつクリア
        </div>
        <div class="library-bookshelf">
          ${this._renderBooks(clearedUnits, libLevel)}
        </div>
      </div>

      <!-- スペルカード（選択中の本の詳細） -->
      ${this._selectedBook && libLevel >= 2
        ? this._renderSpellCard(this._selectedBook)
        : ''}

      <!-- Lv3: 秘密の書斎ボタン -->
      ${libLevel >= 3
        ? `<button class="btn library-secret-btn">🔮 ひみつのしょさい</button>`
        : ''}
    `;

    this._container.appendChild(el);
    this._element = el;
    this._bindEvents();
  }

  _renderBooks(clearedUnits, libLevel) {
    const maxBooks = libLevel >= 2 ? WORLDS.length : 5;
    return WORLDS.slice(0, maxBooks).map(world => {
      const isCleared = clearedUnits.includes(world.id);
      const spell     = SPELL_CARD_DATA[world.id];
      const isSelected = this._selectedBook === world.id;

      return `
        <div class="library-book ${isCleared ? 'cleared' : 'uncleared'} ${isSelected ? 'selected' : ''}"
             data-world="${world.id}" role="button" tabindex="0"
             title="${world.title}">
          <div class="book-spine">
            <span class="book-emoji">${spell?.emoji || '📖'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  _renderSpellCard(worldId) {
    const spell   = SPELL_CARD_DATA[worldId];
    const world   = WORLDS.find(w => w.id === worldId);
    const cleared = TownManager.getClearedUnits().includes(worldId);
    if (!spell || !cleared) return '';

    const prog = GameStore.getState(`progress.worlds.${worldId}`) || {};
    const pct  = prog.percentage ? Math.round(prog.percentage * 100) : 0;
    const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : '⭐';

    return `
      <div class="spell-card">
        <div class="spell-card-header">
          <span class="spell-emoji">${spell.emoji}</span>
          <div>
            <p class="spell-title">✨ ${spell.spell}</p>
            <p class="spell-stars">${stars} ${pct}点</p>
          </div>
        </div>
        <p class="spell-desc">${spell.desc}</p>
        <p class="spell-world-name">${world?.title || ''}</p>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // イベント
  // ─────────────────────────────────────────

  _bindEvents() {
    if (!this._element) return;

    this._element.querySelector('.library-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });

    this._element.querySelectorAll('.library-book.cleared').forEach(book => {
      book.addEventListener('click', () => {
        const wid = book.dataset.world;
        this._selectedBook = this._selectedBook === wid ? null : wid;
        this._dialogue     = this._randomDialogue('bookOpen');
        this._render();
      });
    });

    this._element.querySelector('.library-secret-btn')?.addEventListener('click', () => {
      this._dialogue = this._randomDialogue('secretRoom');
      this._showSecretModal();
    });
  }

  _showSecretModal() {
    const modal = document.createElement('div');
    modal.className = 'library-secret-modal';
    modal.innerHTML = `
      <div class="secret-modal-inner">
        <p class="secret-modal-title">🔮 ひみつのしょさい</p>
        <p class="secret-modal-body">
          ここにはまだ、だれも読んだことのない本が眠っている…<br>
          これからも学び続ければ、秘密が明かされるじゃろう。<br>
          <small>（ストーリーは今後追加予定）</small>
        </p>
        <button class="btn btn-large secret-modal-close">とじる</button>
      </div>
    `;
    this._element.appendChild(modal);
    modal.querySelector('.secret-modal-close')?.addEventListener('click', () => modal.remove());
  }

  _randomDialogue(scene) {
    const lines = OWL_DIALOGUES[scene] || OWL_DIALOGUES.idle;
    return lines[Math.floor(Math.random() * lines.length)];
  }
}

export default GrimoireLibraryScreen;
