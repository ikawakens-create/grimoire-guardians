/**
 * FarmScreen.js - Grimoire Guardians
 * 魔法農場画面
 *
 * - クイズN問クリアで収穫できる植物育成システム
 * - 区画数は農場Lvに応じて増加
 * - 収穫時レア素材ボーナスあり
 * - 種まき: 素材を選んで植える
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { TownManager } from '../core/TownManager.js';

const MATERIAL_EMOJI = {
  wood: '🪵', stone: '🪨', brick: '🧱', gem: '💎',
  star_fragment: '✨', cloth: '🧶', paint: '🎨',
  crown: '👑', cape: '🧣', magic_orb: '🔮',
};
const MATERIAL_NAME = {
  wood: 'まるた', stone: 'いし', brick: 'れんが', gem: 'ほうせき',
  star_fragment: 'ほしのかけら',
};

// 種ごとの見た目（芽→実）
const SEED_PLANTS = {
  wood:  { growing: '🌱', ready: '🌳', emoji: '🪵' },
  stone: { growing: '🌿', ready: '🏔️', emoji: '🪨' },
  brick: { growing: '🌾', ready: '🧱', emoji: '🧱' },
  gem:   { growing: '💎', ready: '🔮', emoji: '💎' },
};

// 植えられる種（素材）の一覧
const PLANTABLE = Object.keys(Config.TOWN.FARM.HARVEST_TABLE || { wood: 1, stone: 1, brick: 1, gem: 1 });

export class FarmScreen {
  constructor() {
    this._container       = null;
    this._element         = null;
    this._selectedPlot    = null;   // 種まきモード: 選択中のプロットindex
    this._showSeedPicker  = false;  // 種選択UIを表示中か
    this._resultMsg       = null;   // 収穫結果メッセージ
  }

  show(container) {
    this._container = container;
    this._render();
    Logger.info('[FarmScreen] 表示');
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

    const farmLevel  = GameStore.getState('town.buildings.farm.level') || 0;
    const plotStates = TownManager.getFarmPlots();
    const quizTotal  = GameStore.getState('town.farm.quizTotal') || 0;
    const materials  = GameStore.getState('inventory.materials') || {};
    const harvestN   = Config.TOWN.FARM.HARVEST_QUIZ_COUNT;

    const el = document.createElement('div');
    el.className = 'farm-screen facility-screen';
    el.style.cssText = '--fac-color:#38a169;--fac-bg:#f0fff4';
    el.innerHTML = `
      <!-- ヘッダー -->
      <div class="farm-header facility-header">
        <button class="btn-icon farm-back-btn" style="color:#fff">← まち</button>
        <h1 class="farm-title facility-title">🌱 まほうのうじょう</h1>
        <span class="farm-lv-badge facility-lv-badge">Lv${farmLevel}</span>
      </div>

      <!-- 2カラム本体 -->
      <div class="facility-body">

        <!-- 左: ガイド + 素材 -->
        <aside class="facility-left">
          <div class="facility-npc-wrap">
            <div class="facility-npc-avatar">🧑‍🌾</div>
            <p class="facility-npc-name">のうじょう</p>
          </div>
          <div class="facility-bubble">
            <p>🌟 たねをまいて、クイズを<strong>${harvestN}もん</strong>こたえると しゅうかくできるよ！</p>
            <p class="farm-quiz-count" style="margin-top:6px">これまで: <strong>${quizTotal}もん</strong></p>
          </div>
          <div class="facility-mat-chips">
            ${PLANTABLE.map(m =>
              `<span class="mat-chip">${MATERIAL_EMOJI[m]}${materials[m]||0}</span>`
            ).join('')}
          </div>
        </aside>

        <!-- 右: 農場プロット -->
        <div class="facility-right" style="position:relative">
          ${this._resultMsg
            ? `<div class="farm-result-msg">${this._resultMsg}</div>`
            : ''}
          <div class="farm-plots">
            ${plotStates.map(p => this._renderPlot(p)).join('')}
          </div>
          <!-- 種選択ピッカー -->
          ${this._showSeedPicker
            ? this._renderSeedPicker(materials)
            : ''}
        </div>
      </div>
    `;

    this._container.appendChild(el);
    this._element = el;
    this._bindEvents(plotStates);
  }

  _renderPlot(plotState) {
    const { index, state, seed } = plotState;
    const plant = seed ? SEED_PLANTS[seed] : null;

    if (state === 'empty') {
      const isSelected = this._selectedPlot === index;
      return `
        <div class="farm-plot empty ${isSelected ? 'selected-plot' : ''}"
             data-plot="${index}" data-state="empty" role="button" tabindex="0">
          <div class="plot-icon">🟫</div>
          <p class="plot-label">たねをまく</p>
        </div>
      `;
    }

    if (state === 'growing') {
      const plot = plotState.plot;
      const current = GameStore.getState('town.farm.quizTotal') || 0;
      const remaining = Math.max(0, plot.readyQuizTotal - current);
      return `
        <div class="farm-plot growing" data-plot="${index}" data-state="growing">
          <div class="plot-icon">${plant?.growing || '🌱'}</div>
          <p class="plot-label">そだってる…</p>
          <p class="plot-progress">あと${remaining}もん</p>
        </div>
      `;
    }

    // ready
    return `
      <div class="farm-plot ready" data-plot="${index}" data-state="ready" role="button" tabindex="0">
        <div class="plot-icon harvest-bounce">${plant?.ready || '🌳'}</div>
        <p class="plot-label">🎉 しゅうかく！</p>
      </div>
    `;
  }

  _renderSeedPicker(materials) {
    const seeds = PLANTABLE.filter(m => (materials[m] || 0) >= 1);
    const harvestTable = Config.TOWN.FARM.HARVEST_TABLE || {};

    return `
      <div class="seed-picker">
        <p class="seed-picker-title">🌰 どのたねをまく？（プロット ${this._selectedPlot + 1}）</p>
        <div class="seed-picker-list">
          ${seeds.length
            ? seeds.map(m => {
                const def = harvestTable[m];
                const rare = def?.rare;
                return `
                  <button class="seed-btn" data-seed="${m}">
                    <span class="seed-emoji">${MATERIAL_EMOJI[m]}</span>
                    <span class="seed-name">${MATERIAL_NAME[m] || m}</span>
                    <span class="seed-yield">→ ${MATERIAL_EMOJI[def?.gives || m]}+1${rare ? ` (${Math.round(rare.chance*100)}%で${MATERIAL_EMOJI[rare.material]})` : ''}</span>
                  </button>
                `;
              }).join('')
            : `<p class="seed-empty">まける素材がない！</p>`
          }
        </div>
        <button class="btn btn-small btn-secondary seed-cancel-btn">キャンセル</button>
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // イベント
  // ─────────────────────────────────────────

  _bindEvents(plotStates) {
    if (!this._element) return;

    this._element.querySelector('.farm-back-btn')?.addEventListener('click', () => {
      this.hide();
      GameStore.setState('app.currentScreen', 'town');
    });

    // プロットタップ
    this._element.querySelectorAll('.farm-plot').forEach(plotEl => {
      const idx   = parseInt(plotEl.dataset.plot, 10);
      const state = plotEl.dataset.state;

      plotEl.addEventListener('click', () => {
        this._resultMsg = null;
        if (state === 'empty') {
          this._selectedPlot   = idx;
          this._showSeedPicker = true;
          this._render();
        } else if (state === 'ready') {
          const result = TownManager.harvestPlot(idx);
          if (result.success) {
            const mat  = MATERIAL_EMOJI[result.material] || result.material;
            const bonus = result.bonus ? ` + ${MATERIAL_EMOJI[result.bonus]}ボーナス！🎉` : '';
            this._resultMsg = `🌟 ${mat} をしゅうかくした！${bonus}`;
          }
          this._showSeedPicker = false;
          this._selectedPlot   = null;
          this._render();
        }
      });
    });

    // 種選択
    this._element.querySelectorAll('.seed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const seed = btn.dataset.seed;
        const plotIdx = this._selectedPlot;
        const result = TownManager.plantSeed(plotIdx, seed);
        this._resultMsg = result.success
          ? `${MATERIAL_EMOJI[seed]} をプロット${plotIdx + 1}にまいた！クイズを${Config.TOWN.FARM.HARVEST_QUIZ_COUNT}もんこたえよう！`
          : result.reason;
        this._showSeedPicker = false;
        this._selectedPlot   = null;
        this._render();
      });
    });

    this._element.querySelector('.seed-cancel-btn')?.addEventListener('click', () => {
      this._showSeedPicker = false;
      this._selectedPlot   = null;
      this._render();
    });
  }
}

export default FarmScreen;
