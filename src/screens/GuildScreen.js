/**
 * GuildScreen.js - Grimoire Guardians
 * ギルド画面 — クエストボード v2.0
 *
 * ・メインクエスト / サブクエスト / デイリーミッションを表示
 * ・クエスト受注 → 進捗チェック → 報告 → 報酬付与 → 施設解放
 *
 * @version 2.0
 * @date 2026-03-25
 */

import { GameStore }          from '../core/GameStore.js';
import { Config }             from '../core/Config.js';
import Logger                 from '../core/Logger.js';
import { SaveManager }        from '../core/SaveManager.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import HapticFeedback         from '../utils/HapticFeedback.js';
import { ALL_QUESTS, getDailyPool, getQuestById } from '../data/questData.js';
import { getWorldById }       from '../data/worlds.js';
import { getMaterialEmoji, getMaterialName } from '../utils/materialUtils.js';

// ─────────────────────────────────────────────────────────────────────────────
// 定数
// ─────────────────────────────────────────────────────────────────────────────

/** 素材絵文字マップ */
const MATERIAL_EMOJI = {
  wood:          '🌲',
  stone:         '⛰️',
  brick:         '🧱',
  gem:           '💎',
  star_fragment: '✨',
  cloth:         '🧶',
  paint:         '🎨',
  crown:         '👑',
  cape:          '🧣',
  magic_orb:     '🔮',
};

/** NPCセリフ（状況別） */
const DIALOGUES = {
  default: [
    'よく来たな。クエストを受注して、まちに貢献せよ！',
    'デイリーミッションから始めるのがおすすめだ。',
    '修行は続けているか？力をつけてこい！',
  ],
  has_active: [
    '受注中のクエストを忘れるな！完了したら報告しに来い。',
    '進捗はどうだ？達成できたら報告するんだぞ。',
  ],
  has_reportable: [
    'おお！クエストが完了しているぞ、報告しに来い！',
    '達成できたようだな。報告を待っていたぞ！',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// クラス
// ─────────────────────────────────────────────────────────────────────────────

export class GuildScreen {
  constructor() {
    this._container = null;
    this._el        = null;
  }

  // ── ライフサイクル ─────────────────────────────────────────────────────────

  show(container) {
    this._container = container;
    this._refreshDailyIfNeeded();
    this._render();
    Logger.info('[GuildScreen] 表示');
  }

  hide() {
    if (this._el) { this._el.remove(); this._el = null; }
  }

  // ── デイリーリセット ───────────────────────────────────────────────────────

  /**
   * 日付が変わっていたらデイリーミッションを再生成する。
   * 期限切れの isDaily エントリを activeQuests からも除去する。
   */
  _refreshDailyIfNeeded() {
    const now = new Date();
    // 午前4時以前は「前日」とみなす
    if (now.getHours() < Config.GUILD.DAILY_RESET_HOUR) {
      now.setDate(now.getDate() - 1);
    }
    const today = now.toISOString().slice(0, 10); // 'YYYY-MM-DD'

    const daily = GameStore.getState('guild.daily');
    if (daily && daily.date === today) return;  // 既に今日分が生成済み

    // 期限切れのデイリークエストを受注リストから除去
    const active = (GameStore.getState('guild.activeQuests') || []).filter(a => !a.isDaily);
    GameStore.setState('guild.activeQuests', active);

    // 新しいデイリーをランダムに選出
    const pool     = getDailyPool();
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked   = shuffled.slice(0, Config.GUILD.DAILY_MISSION_COUNT);

    GameStore.setState('guild.daily', {
      date:     today,
      missions: picked.map(q => ({ questId: q.id, done: false })),
    });

    SaveManager.save().catch(e => Logger.warn('[GuildScreen] daily save failed:', e));
  }

  // ── レンダリング ───────────────────────────────────────────────────────────

  _render() {
    if (!this._container) return;
    if (this._el) this._el.remove();

    const guildLevel  = GameStore.getState('town.buildings.guild.level') || 1;
    const npcCfg      = Config.TOWN.NPCS.find(n => n.id === 'guild_master');
    const activeList  = GameStore.getState('guild.activeQuests') || [];

    // 「報告できる」クエストがあるかチェック（NPCセリフ決定用）
    const hasReportable = activeList.some(entry => {
      const def = this._findQuestDef(entry.questId);
      return def && this._checkAllRequirements(def, entry);
    });

    let dialoguePool = DIALOGUES.default;
    if (hasReportable)           dialoguePool = DIALOGUES.has_reportable;
    else if (activeList.length)  dialoguePool = DIALOGUES.has_active;
    const dialogue = dialoguePool[Math.floor(Math.random() * dialoguePool.length)];

    const el = document.createElement('div');
    el.className = 'guild-screen facility-screen';
    el.style.cssText = '--fac-color:#4a6fa5;--fac-bg:#f0f4ff';

    // ヘッダー + NPC は静的データのみなので innerHTML 可
    el.innerHTML = `
      <div class="guild-header facility-header">
        <button class="btn-icon guild-back-btn" style="color:#fff">← まち</button>
        <h1 class="facility-title">⚔️ ギルド</h1>
        <span class="facility-lv-badge">Lv${guildLevel}</span>
      </div>

      <div class="facility-body">
        <aside class="facility-left">
          <div class="facility-npc-wrap">
            <div class="facility-npc-avatar">
              <img src="${npcCfg?.image || ''}" alt="ギルドマスター"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="npc-emoji-fallback" style="display:none">⚔️</div>
            </div>
            <p class="facility-npc-name">ギルドマスター</p>
          </div>
          <div class="facility-bubble guild-bubble"></div>
        </aside>

        <div class="guild-board facility-right">
          <section class="guild-section">
            <h2 class="guild-section-title">📅 デイリーミッション</h2>
            <div id="guild-daily-list"></div>
          </section>

          <section class="guild-section" id="guild-active-section">
            <h2 class="guild-section-title">⚔️ 受注中のクエスト</h2>
            <div id="guild-active-list"></div>
          </section>

          <section class="guild-section">
            <h2 class="guild-section-title">📋 うけられるクエスト</h2>
            <div id="guild-available-list"></div>
          </section>
        </div>
      </div>
    `;

    this._container.appendChild(el);
    this._el = el;

    // セリフは textContent でセット（XSS対策）
    el.querySelector('.guild-bubble').textContent = dialogue;

    // 各セクションを構築
    this._buildDailySection();
    this._buildActiveSection();
    this._buildAvailableSection();

    // 大型艦クラフトセクション（設計図取得済み & 未クラフトの場合のみ）
    if (GameStore.getState('app.largeBlueprintObtained') && !GameStore.getState('ship.largeCrafted')) {
      const board = this._el?.querySelector('.guild-board');
      if (board) board.appendChild(this._buildLargeShipCraftSection());
    }

    this._bindEvents();
  }

  // ── デイリーセクション ────────────────────────────────────────────────────

  _buildDailySection() {
    const list = this._el?.querySelector('#guild-daily-list');
    if (!list) return;

    const daily    = GameStore.getState('guild.daily');
    const missions = daily?.missions || [];

    if (missions.length === 0) {
      list.appendChild(this._emptyMsg('きょうのミッションはありません'));
      return;
    }

    missions.forEach(m => {
      const def = getDailyPool().find(q => q.id === m.questId);
      if (!def) return;
      const activeEntry = (GameStore.getState('guild.activeQuests') || [])
        .find(a => a.questId === m.questId);
      list.appendChild(this._buildDailyCard(def, m.done, activeEntry));
    });
  }

  /**
   * @param {import('../data/questData.js').QuestDef} def
   * @param {boolean} done
   * @param {object|undefined} activeEntry
   */
  _buildDailyCard(def, done, activeEntry) {
    const card = document.createElement('div');
    card.className = `guild-quest-card guild-quest-card--daily${done ? ' guild-quest-card--done' : ''}`;

    // タイトル
    const titleEl = document.createElement('p');
    titleEl.className = 'quest-card-title';
    titleEl.textContent = def.title;

    // 報酬
    const rewardEl = document.createElement('p');
    rewardEl.className = 'quest-card-reward';
    rewardEl.textContent = `ほうしゅう: ${this._rewardSummary(def.rewards.completion)}`;

    // アクション
    const actionEl = document.createElement('div');
    actionEl.className = 'quest-card-action';

    if (done) {
      const doneSpan = document.createElement('span');
      doneSpan.className = 'guild-done-badge';
      doneSpan.textContent = '✅ かんりょう！';
      actionEl.appendChild(doneSpan);
    } else if (!activeEntry) {
      const btn = this._makeBtn('うける', 'accept', def.id, 'guild-btn--accept');
      btn.dataset.isDaily = 'true';
      actionEl.appendChild(btn);
    } else {
      const allMet = this._checkAllRequirements(def, activeEntry);
      if (allMet) {
        actionEl.appendChild(this._makeBtn('✅ 報告する', 'report', def.id, 'guild-btn--report'));
      } else {
        const inProgress = document.createElement('span');
        inProgress.className = 'guild-inprogress';
        inProgress.textContent = '進行中…';
        actionEl.appendChild(inProgress);
      }
    }

    card.appendChild(titleEl);
    card.appendChild(rewardEl);
    card.appendChild(actionEl);
    return card;
  }

  // ── 受注中セクション ──────────────────────────────────────────────────────

  _buildActiveSection() {
    const list    = this._el?.querySelector('#guild-active-list');
    const section = this._el?.querySelector('#guild-active-section');
    if (!list || !section) return;

    // デイリーではない受注中クエストのみ表示
    const activeList = (GameStore.getState('guild.activeQuests') || []).filter(a => !a.isDaily);

    if (activeList.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = '';

    activeList.forEach(entry => {
      const def = getQuestById(entry.questId);
      if (!def) return;
      list.appendChild(this._buildQuestCard(def, entry, 'active'));
    });
  }

  // ── 受付可能セクション ────────────────────────────────────────────────────

  _buildAvailableSection() {
    const list = this._el?.querySelector('#guild-available-list');
    if (!list) return;

    const available = this._getAvailableQuests();
    if (available.length === 0) {
      list.appendChild(this._emptyMsg('いまはうけられるクエストがありません'));
      return;
    }

    available.forEach(def => {
      list.appendChild(this._buildQuestCard(def, null, 'available'));
    });
  }

  /**
   * クエストカードを DOM で構築する
   * @param {import('../data/questData.js').QuestDef} def
   * @param {object|null} activeEntry
   * @param {'active'|'available'} mode
   */
  _buildQuestCard(def, activeEntry, mode) {
    const card = document.createElement('div');
    card.className = `guild-quest-card guild-quest-card--${mode}`;

    // タイトル
    const titleEl = document.createElement('p');
    titleEl.className = 'quest-card-title';
    titleEl.textContent = def.title;

    // 依頼NPC
    const npcCfg = Config.TOWN.NPCS.find(n => n.id === def.npcId);
    const npcEl  = document.createElement('p');
    npcEl.className = 'quest-card-npc';
    npcEl.textContent = `依頼：${npcCfg?.name || def.npcId}`;

    // 条件リスト（active モードのみチェックマーク表示）
    const reqList = document.createElement('ul');
    reqList.className = 'quest-req-list';
    def.requirements.forEach(req => {
      const li    = document.createElement('li');
      li.className = 'quest-req-item';

      if (mode === 'active') {
        const met   = this._checkRequirement(req, activeEntry);
        const check = document.createElement('span');
        check.className = met ? 'quest-req-check quest-req-check--met' : 'quest-req-check';
        check.textContent = met ? '✅' : '⬜';
        li.appendChild(check);
      }

      const label = document.createElement('span');
      label.textContent = this._requirementLabel(req);
      li.appendChild(label);
      reqList.appendChild(li);
    });

    // 報酬
    const rewardEl = document.createElement('p');
    rewardEl.className = 'quest-card-reward';
    rewardEl.textContent = `ほうしゅう: ${this._rewardSummary(def.rewards.completion)}`;

    // アクションボタン
    const actionEl = document.createElement('div');
    actionEl.className = 'quest-card-action';

    if (mode === 'available') {
      const activeList  = GameStore.getState('guild.activeQuests') || [];
      const regularCount = activeList.filter(a => !a.isDaily).length;
      const atMax        = regularCount >= Config.GUILD.MAX_ACTIVE_QUESTS;
      const btn = this._makeBtn(
        atMax ? `同時受注は${Config.GUILD.MAX_ACTIVE_QUESTS}つまで` : '依頼を受ける',
        'accept', def.id, 'guild-btn--accept'
      );
      btn.disabled = atMax;
      actionEl.appendChild(btn);
    } else {
      const allMet = this._checkAllRequirements(def, activeEntry);
      if (allMet) {
        actionEl.appendChild(this._makeBtn('✅ 報告する', 'report', def.id, 'guild-btn--report'));
      } else {
        const inProgress = document.createElement('span');
        inProgress.className = 'guild-inprogress';
        inProgress.textContent = '進行中…';
        actionEl.appendChild(inProgress);
      }
    }

    card.appendChild(titleEl);
    card.appendChild(npcEl);
    card.appendChild(reqList);
    card.appendChild(rewardEl);
    card.appendChild(actionEl);
    return card;
  }

  // ── ロジック ───────────────────────────────────────────────────────────────

  /** ALL_QUESTS と DAILY_POOL の両方を検索してクエスト定義を返す */
  _findQuestDef(questId) {
    return getQuestById(questId) || getDailyPool().find(q => q.id === questId);
  }

  /** 受注可能なクエスト一覧を返す（完了済み・受注中・解放条件未達は除く） */
  _getAvailableQuests() {
    const completed = GameStore.getState('guild.completedQuests') || [];
    const active    = GameStore.getState('guild.activeQuests')    || [];
    const activeIds = active.map(a => a.questId);

    return ALL_QUESTS.filter(q => {
      if (completed.includes(q.id))                            return false;
      if (activeIds.includes(q.id))                            return false;
      if (q.unlockAfter?.some(id => !completed.includes(id))) return false;
      return true;
    });
  }

  /** 全条件を満たしているか */
  _checkAllRequirements(def, activeEntry) {
    return def.requirements.every(req => this._checkRequirement(req, activeEntry));
  }

  /**
   * 個別条件チェック
   * ・clear / score: GameStore の progress.worlds から判定
   * ・multi_clear / __any__ / __clock__: activeEntry.progress から判定（E-3 で更新）
   */
  _checkRequirement(req, activeEntry) {
    const progress = activeEntry?.progress || {};

    // ワイルドカード系
    if (req.worldId === '__any__')   return (progress['__any__']   || 0) >= 1;
    if (req.worldId === '__clock__') return (progress['__clock__'] || 0) >= 1;

    switch (req.type) {
      case 'clear':
        return !!GameStore.getState(`progress.worlds.${req.worldId}.cleared`);

      case 'score': {
        // percentage は 0-100 で保存されている
        const pct = GameStore.getState(`progress.worlds.${req.worldId}.percentage`) || 0;
        return pct >= Math.round((req.minScore || 0) * 100);
      }

      case 'multi_clear':
        return (progress[req.worldId] || 0) >= (req.count || 1);

      default:
        return false;
    }
  }

  /** 条件の表示テキストを生成 */
  _requirementLabel(req) {
    const world = (req.worldId !== '__any__' && req.worldId !== '__clock__')
      ? getWorldById(req.worldId)
      : null;
    const wname = world?.title || req.worldId;  // worlds.js は title フィールドを使用

    switch (req.type) {
      case 'clear':
        if (req.worldId === '__any__')   return 'なんでもいいので1回クリア';
        if (req.worldId === '__clock__') return '時計のワールドを1回クリア';
        return `「${wname}」を1回クリア`;

      case 'score': {
        const pct = Math.round((req.minScore || 0) * 100);
        if (req.worldId === '__any__') return `正答率${pct}%以上でクリア`;
        return `「${wname}」を${pct}%以上でクリア`;
      }

      case 'multi_clear':
        return `「${wname}」を${req.count}回クリア`;

      default:
        return req.worldId;
    }
  }

  /** 報酬の要約テキストを生成 */
  _rewardSummary(rewards) {
    if (!rewards || rewards.length === 0) return 'なし';
    return rewards.map(r => {
      if (r.type === 'material') {
        return `${MATERIAL_EMOJI[r.id] || r.id}×${r.amount}`;
      }
      if (r.type === 'quest_item') {
        const cfg = Config.GUILD.QUEST_ITEMS[r.id];
        return cfg ? `${cfg.emoji} ${cfg.name}` : r.id;
      }
      return r.id;
    }).join('  ');
  }

  // ── クエスト受注 ───────────────────────────────────────────────────────────

  _acceptQuest(questId, isDaily = false) {
    const active = [...(GameStore.getState('guild.activeQuests') || [])];

    // 重複受注防止
    if (active.some(a => a.questId === questId)) return;

    // 通常クエストのみ上限チェック
    if (!isDaily) {
      const regularCount = active.filter(a => !a.isDaily).length;
      if (regularCount >= Config.GUILD.MAX_ACTIVE_QUESTS) return;
    }

    active.push({ questId, acceptedAt: Date.now(), progress: {}, isDaily });
    GameStore.setState('guild.activeQuests', active);
    SaveManager.save().catch(e => Logger.warn('[GuildScreen] save failed:', e));
    Logger.info(`[GuildScreen] クエスト受注: ${questId} (daily=${isDaily})`);
    this._render();
  }

  // ── クエスト報告 ───────────────────────────────────────────────────────────

  _reportQuest(questId) {
    const activeList = [...(GameStore.getState('guild.activeQuests') || [])];
    const entryIdx   = activeList.findIndex(a => a.questId === questId);
    if (entryIdx < 0) return;

    const entry = activeList[entryIdx];
    const def   = this._findQuestDef(questId);
    if (!def)                                   return;
    if (!this._checkAllRequirements(def, entry)) return;

    const isDaily = !!entry.isDaily;

    // ── 報酬付与 ──
    this._grantRewards(def.rewards.completion);

    // 初回クリアボーナス（デイリーには適用しない）
    if (!isDaily && def.rewards.firstClear) {
      const completed = GameStore.getState('guild.completedQuests') || [];
      if (!completed.includes(questId)) {
        this._grantRewards(def.rewards.firstClear);
      }
    }

    // ── 受注リストから除去 ──
    activeList.splice(entryIdx, 1);
    GameStore.setState('guild.activeQuests', activeList);

    if (isDaily) {
      // デイリー → done: true をセット（completedQuests には追加しない）
      const daily = GameStore.getState('guild.daily');
      if (daily?.missions) {
        const updated = daily.missions.map(m =>
          m.questId === questId ? { ...m, done: true } : m
        );
        GameStore.setState('guild.daily', { ...daily, missions: updated });
      }
    } else {
      // 通常クエスト → completedQuests に追加
      const completed = [...(GameStore.getState('guild.completedQuests') || [])];
      if (!completed.includes(questId)) completed.push(questId);
      GameStore.setState('guild.completedQuests', completed);
    }

    SaveManager.save().catch(e => Logger.warn('[GuildScreen] save failed:', e));
    SoundManager.playSFX(SoundType.UI?.BUTTON_CLICK);
    HapticFeedback.success?.();
    Logger.info(`[GuildScreen] クエスト報告完了: ${questId}`);
    this._render();
  }

  // ── 報酬付与 ──────────────────────────────────────────────────────────────

  _grantRewards(rewards) {
    if (!rewards) return;
    rewards.forEach(r => {
      if (r.type === 'material') {
        const cur = GameStore.getState(`inventory.materials.${r.id}`) || 0;
        GameStore.setState(`inventory.materials.${r.id}`, cur + r.amount);

      } else if (r.type === 'quest_item') {
        // questItems は動的にキーが増えるので object ごと書き直す
        const items = { ...(GameStore.getState('guild.questItems') || {}) };
        items[r.id] = (items[r.id] || 0) + 1;
        GameStore.setState('guild.questItems', items);

        // 施設解放アイテムなら建物をアンロック
        const itemCfg = Config.GUILD.QUEST_ITEMS[r.id];
        if (itemCfg?.unlocks) {
          this._unlockFacility(itemCfg.unlocks);
        }
      }
    });
  }

  /** 施設を解放する（level 0 → 1） */
  _unlockFacility(facilityId) {
    const cur = GameStore.getState(`town.buildings.${facilityId}.level`) || 0;
    if (cur >= 1) return;  // 既に解放済み
    GameStore.setState(`town.buildings.${facilityId}.level`, 1);
    Logger.info(`[GuildScreen] 施設解放: ${facilityId}`);
  }

  // ── ユーティリティ ────────────────────────────────────────────────────────

  /** ボタン要素を生成 */
  _makeBtn(label, action, questId, extraClass) {
    const btn = document.createElement('button');
    btn.className = `guild-btn ${extraClass}`;
    btn.textContent = label;   // textContent でセット（XSS対策）
    btn.dataset.action  = action;
    btn.dataset.questId = questId;
    return btn;
  }

  /** 空メッセージ要素を生成 */
  _emptyMsg(text) {
    const p = document.createElement('p');
    p.className = 'guild-empty-msg';
    p.textContent = text;
    return p;
  }

  // ── 大型艦クラフト（Phase E） ─────────────────────────────────────────────

  /**
   * 大型艦クラフトセクションを構築して返す
   * 条件: app.largeBlueprintObtained === true && ship.largeCrafted === false
   * @returns {HTMLElement}
   */
  _buildLargeShipCraftSection() {
    const cost    = Config.GRADE2.LARGE_SHIP_CRAFT_COST;
    const mats    = GameStore.getState('inventory.materials') ?? {};
    const canCraft = Object.entries(cost).every(([id, n]) => (mats[id] ?? 0) >= n);

    const section = document.createElement('section');
    section.className = 'guild-section guild-largeship-section';

    const costRows = Object.entries(cost).map(([id, n]) => {
      const have = mats[id] ?? 0;
      const ok   = have >= n;
      return `
        <div class="craft-cost-row">
          ${getMaterialEmoji(id)} ${getMaterialName(id)} × ${n}
          <span class="${ok ? 'cost-ok' : 'cost-ng'}">（もち: ${have}）</span>
        </div>`;
    }).join('');

    section.innerHTML = `
      <h2 class="guild-section-title">🚢 → 🛳️ だいがたかんせんクラフト</h2>
      ${costRows}
      <button type="button" class="button button-large guild-largeship-btn"
              ${canCraft ? '' : 'disabled'}>
        ${canCraft ? '⚒️ クラフトする！' : '素材が たりない…'}
      </button>
    `;

    section.querySelector('.guild-largeship-btn')?.addEventListener('click', () => {
      this._craftLargeShip(cost);
    });

    return section;
  }

  /**
   * 大型艦をクラフトする（素材消費 → フラグ更新 → 演出）
   * @param {Object} cost - Config.GRADE2.LARGE_SHIP_CRAFT_COST
   */
  async _craftLargeShip(cost) {
    // 二重実行防止（ボタン連打ガード）
    if (GameStore.getState('ship.largeCrafted')) return;

    // クリック時点の最新素材で再検証してから消費
    const mats     = GameStore.getState('inventory.materials') ?? {};
    const canCraft = Object.entries(cost).every(([id, n]) => (mats[id] ?? 0) >= n);
    if (!canCraft) return;

    const newMats = { ...mats };
    Object.entries(cost).forEach(([id, n]) => { newMats[id] = (newMats[id] ?? 0) - n; });
    GameStore.setState('inventory.materials', newMats);

    // フラグ更新
    GameStore.setState('ship.largeCrafted', true);
    GameStore.setState('ship.size', 'large');

    // フルスクリーン完成演出
    await this._showLargeShipCompleteAnim();

    // 大型艦完成クエスト相当のバッジ通知
    GameStore.setState('guild.newQuestBadge', true);
  }

  /**
   * 大型艦完成アニメーションを表示し、ボタンが押されるまで待つ
   * @returns {Promise<void>}
   */
  _showLargeShipCompleteAnim() {
    const overlay = document.createElement('div');
    overlay.className = 'largeship-complete-overlay';
    overlay.innerHTML = `
      <div class="largeship-complete-box">
        <div class="largeship-complete-emoji">🛳️</div>
        <div class="largeship-complete-title">だいがたかんせん かんせい！！</div>
        <div class="largeship-complete-body">
          タコぞう「やったー！！！これが……伝説のふねだ！！」
        </div>
        <button type="button" class="button button-large largeship-complete-ok">ふねを みる！</button>
      </div>
    `;
    document.body.appendChild(overlay);

    return new Promise(resolve => {
      overlay.querySelector('.largeship-complete-ok').addEventListener('click', () => {
        overlay.remove();
        GameStore.setState('app.currentScreen', 'ship_build');
        resolve();
      });
    });
  }

  // ── イベント ──────────────────────────────────────────────────────────────

  _bindEvents() {
    if (!this._el) return;

    this._el.querySelector('.guild-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });

    // ボタンはイベント委譲で処理（render 後にバインドし直す必要なし）
    this._el.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn || btn.disabled) return;

      const { action, questId, isDaily } = btn.dataset;

      if (action === 'accept') {
        this._acceptQuest(questId, isDaily === 'true');
      } else if (action === 'report') {
        this._reportQuest(questId);
      }
    });
  }
}

export default GuildScreen;
