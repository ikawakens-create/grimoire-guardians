/**
 * GuildScreen.js - Grimoire Guardians
 * ギルド画面（Phase 2で本実装予定）
 *
 * 現在はプレースホルダー表示のみ。
 * NPC: ギルドマスター（クエスト予告）
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';

const GUILD_MASTER_DIALOGUES = [
  '…よく来たな、勇者よ。ギルドはまもなく開く。',
  '今は準備中だ。だが、お前の力は必要になる。',
  'クエストはもうすぐ始まる。待っていてくれ。',
  '修行は続けているか？いい報告を待っているぞ。',
];

// 予告クエスト一覧（表示のみ）
const PREVIEW_QUESTS = [
  { emoji: '⭐', name: '10もんれんぞくせいかい', reward: '🪵×3', diff: 'かんたん' },
  { emoji: '🔥', name: '3つのワールドをクリア', reward: '💎×1', diff: 'ふつう' },
  { emoji: '💎', name: '5かい合成をする',         reward: '✨×2', diff: 'ふつう' },
  { emoji: '🌟', name: '1日で20もんこたえる',    reward: '🔮×1', diff: 'むずかしい' },
];

export class GuildScreen {
  constructor() {
    this._container = null;
    this._element   = null;
  }

  show(container) {
    this._container = container;
    this._render();
    Logger.info('[GuildScreen] 表示');
  }

  hide() {
    if (this._element) { this._element.remove(); this._element = null; }
  }

  _render() {
    if (!this._container) return;
    if (this._element) this._element.remove();

    const guildLevel = GameStore.getState('town.buildings.guild.level') || 0;
    const npcCfg     = Config.TOWN.NPCS.find(n => n.id === 'guild_master');
    const dialogue   = GUILD_MASTER_DIALOGUES[Math.floor(Math.random() * GUILD_MASTER_DIALOGUES.length)];

    const el = document.createElement('div');
    el.className = 'guild-screen';
    el.innerHTML = `
      <div class="guild-bg" style="background-image:url('assets/town/guild_bg.png')"></div>

      <div class="guild-header">
        <button class="btn-icon guild-back-btn">← まち</button>
        <h1 class="guild-title">⚔️ ギルド</h1>
        <span class="guild-lv-badge">Lv${guildLevel}</span>
      </div>

      <!-- ギルドマスター -->
      <div class="guild-npc-row">
        <div class="guild-npc-avatar">
          <img src="${npcCfg?.image || ''}" alt="ギルドマスター"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="npc-emoji-fallback" style="display:none">⚔️</div>
        </div>
        <div class="npc-bubble guild-bubble">
          <p class="npc-dialogue">${dialogue}</p>
        </div>
      </div>

      <!-- 工事中バナー -->
      <div class="guild-construction">
        <div class="construction-icon">🚧</div>
        <p class="construction-title">クエストシステム、じゅんびちゅう！</p>
        <p class="construction-body">
          まもなく、たくさんのクエストが登場するぞ！<br>
          修行を続けて、その日に備えよ。
        </p>
      </div>

      <!-- 予告クエスト一覧 -->
      <div class="guild-preview">
        <h2 class="guild-preview-title">📋 もうすぐ来るクエスト（よこく）</h2>
        <div class="guild-quest-list">
          ${PREVIEW_QUESTS.map(q => `
            <div class="guild-quest-row preview">
              <span class="quest-emoji">${q.emoji}</span>
              <div class="quest-info">
                <p class="quest-name">${q.name}</p>
                <p class="quest-diff">${q.diff}</p>
              </div>
              <div class="quest-reward">
                <span class="reward-label">ほうしゅう</span>
                <span class="reward-value">${q.reward}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this._container.appendChild(el);
    this._element = el;
    this._bindEvents();
  }

  _bindEvents() {
    this._element?.querySelector('.guild-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });
  }
}

export default GuildScreen;
