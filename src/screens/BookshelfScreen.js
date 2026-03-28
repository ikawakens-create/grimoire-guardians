/**
 * BookshelfScreen.js - Grimoire Guardians
 * 本棚画面（ワールド選択）
 *
 * 変更履歴:
 *   v1.2 (2026-03-20): Grade 2 対応（グレードタブ・ゾーン別フィルタ・封印ゲージ分離）
 *   v1.1 (2026-02-22): ストリーク表示 + ワールドクリアアニメーション追加
 *   v1.0 (2026-02-17): 初版
 *
 * @version 1.2
 * @date 2026-03-20
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import BookCard from '../components/BookCard.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import WORLDS from '../data/worlds.js';
import { SEAL_GAUGE_TEXT, FINAL_BATTLE, NG_PLUS } from '../data/storyData.js';
import InventoryScreen from './InventoryScreen.js';
import MemoryIsleScreen from './MemoryIsleScreen.js';
import ShipRenderer from '../components/ShipRenderer.js';

/**
 * BookshelfScreen クラス
 * ワールド選択画面を生成・管理する
 *
 * @example
 * const screen = new BookshelfScreen(
 *   document.getElementById('game-screen'),
 *   (worldData) => console.log('World selected:', worldData.id),
 *   'world_1'   // クリア直後のワールドID（省略可）
 * );
 * screen.render();
 */
class BookshelfScreen {
  /**
   * @param {HTMLElement} container       - 描画先の親要素
   * @param {Function}    onWorldSelect   - ワールド選択時のコールバック (worldData) => void
   * @param {string|null} [newlyClearedWorldId] - 直前にクリアしたワールドID（アニメーション用）
   */
  constructor(container, onWorldSelect, newlyClearedWorldId = null) {
    this.container             = container;
    this.onWorldSelect         = onWorldSelect;
    this._newlyClearedWorldId  = newlyClearedWorldId;

    /** @type {HTMLElement|null} */
    this.element = null;
    /** @type {BookCard[]} */
    this.cards = [];
    /** @type {Function|null} GameStore 購読解除関数 */
    this._unsubscribe = null;
    /** @type {number|null} requestAnimationFrame ID（destroy 時にキャンセル） */
    this._rafId = null;
    /** @type {number[]} setTimeout ID 一覧（destroy 時に clearTimeout） */
    this._timers = [];
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  /**
   * 画面を生成して container に描画する
   * @returns {BookshelfScreen} メソッドチェーン用
   */
  render() {
    Logger.info('[BookshelfScreen] Rendering...');

    const screen = document.createElement('div');
    screen.className = 'bookshelf-screen screen-transition-enter';

    // Act3（世界20以降）は霧のエフェクト（Grade 1 のみ）
    const currentGrade = GameStore.getState('app.currentGrade') || 1;
    const storyAct = GameStore.getState('app.storyAct') || 1;
    if (currentGrade === 1 && storyAct >= 3) {
      screen.classList.add('bookshelf-fog');
    }

    // ヘッダー
    screen.appendChild(this._buildHeader());

    // 封印ゲージバナー
    screen.appendChild(this._buildSealGauge());

    // カードグリッド
    const grid = document.createElement('div');
    grid.className = 'bookshelf-grid';
    grid.id = 'bookshelf-grid';
    screen.appendChild(grid);

    this.element = screen;
    this.container.appendChild(screen);

    // カードを生成
    this._buildCards(grid);

    // NG+ セクション（Grade 1 かつ ngPlusUnlocked のときのみ）
    if (currentGrade === 1 && GameStore.getState('app.ngPlusUnlocked')) {
      screen.appendChild(this._buildNgPlusSection());
    }

    // GameStore の変更を購読（ライセンス変更でロック状態を同期）
    this._unsubscribe = GameStore.subscribe((path) => {
      if (path === 'license.core.licensed' || path === '*') {
        this._syncLockStates();
      }
    });

    Logger.info('[BookshelfScreen] Rendered');
    SoundManager.playBGM(SoundType.BGM_BOOKSHELF);

    // 次フレームで非同期演出を処理（DOM完成後に適用）
    const needsClearAnim  = !!this._newlyClearedWorldId;
    const pendingUpgrade  = GameStore.getState('app.pendingShipUpgrade');
    if (needsClearAnim || pendingUpgrade) {
      this._rafId = requestAnimationFrame(() => {
        this._rafId = null;
        // クリア直後カードアニメーション
        if (needsClearAnim) this._animateWorldClear(this._newlyClearedWorldId);
        // 船アップグレード演出（async・fire-and-forget）
        if (pendingUpgrade) {
          GameStore.setState('app.pendingShipUpgrade', null);
          this._showShipUpgradeCutin(pendingUpgrade);
        }
      });
    }

    return this;
  }

  /**
   * 画面を破棄する
   */
  destroy() {
    // RAF キャンセル（クリアアニメーション中断時のメモリリーク防止）
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    // setTimeout キャンセル（スパークル生成タイマー）
    this._timers.forEach(id => clearTimeout(id));
    this._timers = [];

    // カードをクリーンアップ
    this.cards.forEach(card => card.destroy());
    this.cards = [];

    // BGM 停止
    SoundManager.stopBGM();

    // GameStore 購読を解除
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }

    // DOM 削除
    if (this.element) {
      this.element.remove();
      this.element = null;
    }

    Logger.info('[BookshelfScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベートメソッド
  // ─────────────────────────────────────────

  /**
   * 現在表示中のグレードのワールド一覧を返す
   * @returns {Object[]}
   * @private
   */
  _gradeWorlds() {
    const grade = GameStore.getState('app.currentGrade') || 1;
    if (grade === 2) {
      return WORLDS.filter(w => w.grade === 2);
    }
    return WORLDS.filter(w => !w.grade || w.grade === 1);
  }

  /**
   * ヘッダー要素を生成する（ストリークバッジ・グレードタブ含む）
   * @returns {HTMLElement}
   * @private
   */
  _buildHeader() {
    const header = document.createElement('header');
    header.className = 'bookshelf-header';

    const currentGrade = GameStore.getState('app.currentGrade') || 1;

    // グレードに応じたタイトル
    let titleText;
    if (currentGrade === 2) {
      const worldProgress = GameStore.getState('progress.worlds') || {};
      const g2Worlds = WORLDS.filter(w => w.grade === 2);
      const g2Cleared = g2Worlds.filter(w => worldProgress[w.id]?.cleared).length;
      const zone = Config.GRADE2.ZONES.slice().reverse().find(z => g2Cleared >= z.unlockWorlds)
        || Config.GRADE2.ZONES[0];
      titleText = `${zone.emoji} 深海グリモア — ${zone.name}`;
    } else {
      const storyAct = GameStore.getState('app.storyAct') || 1;
      const actTitles = {
        1: 'ふういんされたグリモア',
        2: 'グリモアをとりもどせ！',
        3: '🌫️ やみにおおわれたほんだな',
        4: '✨ さいごのグリモアへ！'
      };
      titleText = actTitles[storyAct] || 'ほんだな';
    }
    const title = document.createElement('h1');
    title.className = 'bookshelf-title';
    title.id = 'bookshelf-title';
    title.textContent = titleText;

    // プレイヤー名（空文字列の場合は「プレイヤー」にフォールバック）
    const rawName    = GameStore.getState('player.name');
    const playerName = rawName && rawName.trim() ? rawName.trim() : 'プレイヤー';
    const playerInfo = document.createElement('div');
    playerInfo.className = 'bookshelf-player';
    playerInfo.textContent = `${playerName} さん`;

    // キャラクターアバター（小）
    const avatar = new CharacterAvatar('sm').render();
    avatar.style.cursor = 'pointer';
    avatar.title = 'スキンをかえる';
    avatar.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'craftsman');
    });

    // 右側バッジ群
    const rightGroup = document.createElement('div');
    rightGroup.className = 'bookshelf-header-right';

    // グレードタブ（Grade 2 が有効なときのみ表示）
    if (Config.FEATURES.ENABLE_GRADE2) {
      const worldProgress = GameStore.getState('progress.worlds') || {};
      const g1Worlds = WORLDS.filter(w => !w.grade || w.grade === 1);
      const g1Cleared = g1Worlds.filter(w => worldProgress[w.id]?.cleared).length;
      // Grade 2 は Grade 1 を 1 ワールド以上クリアするか DEBUG_CHEATS 有効で解放
      const grade2Unlocked = g1Cleared > 0 || Config.DEBUG.ENABLE_CHEATS;

      const tabWrap = document.createElement('div');
      tabWrap.className = 'grade-tab-wrap';

      [1, 2].forEach(g => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'grade-tab' + (g === currentGrade ? ' grade-tab-active' : '');
        btn.textContent = g === 1 ? '1年生' : '2年生';
        btn.dataset.grade = String(g);
        if (g === 2 && !grade2Unlocked) {
          btn.disabled = true;
          btn.title = '1年生を すすめると かいほうされます';
        }
        btn.addEventListener('click', () => this._switchGrade(g));
        tabWrap.appendChild(btn);
      });

      rightGroup.appendChild(tabWrap);
    }

    // きおくのいせきボタン（Grade 1 のみ）
    if (currentGrade === 1) {
      const memoryBtn = document.createElement('button');
      memoryBtn.type = 'button';
      memoryBtn.className = 'button button-small bookshelf-memory-btn';
      const clearCounts = GameStore.getState('memory.clearCounts') ?? {};
      const collected   = GameStore.getState('memory.collected') ?? [];
      const nearlyReady = Object.entries(clearCounts).filter(([wId, cnt]) => {
        const mon = /** @type {any} */ (window.__MONSTERS_BY_WORLD?.[wId]);
        return cnt > 0 && cnt < 3 && !collected.includes(mon?.id ?? '');
      }).length;
      const badgeHTML = nearlyReady > 0 ? `<span class="memory-badge-dot"></span>` : '';
      memoryBtn.innerHTML = `🏛️ いせき${badgeHTML}`;
      memoryBtn.addEventListener('click', () => {
        new MemoryIsleScreen().open();
      });
      rightGroup.appendChild(memoryBtn);
    }

    // まちボタン（いえ・合成屋等のハブ）
    if (Config.FEATURES.ENABLE_HOUSE_BUILD) {
      const townBtn = document.createElement('button');
      townBtn.type = 'button';
      townBtn.className = 'button button-small bookshelf-town-btn';
      const guildBadge = GameStore.getState('guild.newQuestBadge')
        ? '<span class="memory-badge-dot"></span>' : '';
      townBtn.innerHTML = `🏘️ まち${guildBadge}`;
      townBtn.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'town');
      });
      rightGroup.appendChild(townBtn);
    }

    // マイふねボタン（Grade 2 解放後のみ表示）
    if (Config.FEATURES.ENABLE_GRADE2) {
      const shipBtn = document.createElement('button');
      shipBtn.type = 'button';
      shipBtn.className = 'button button-small bookshelf-ship-btn';
      const hasCraftable = this._hasNewShipParts();
      shipBtn.innerHTML = `⛵ マイふね${hasCraftable ? '<span class="memory-badge-dot"></span>' : ''}`;
      shipBtn.addEventListener('click', () => {
        GameStore.setState('app.currentScreen', 'ship_build');
      });
      rightGroup.appendChild(shipBtn);
    }

    // もちものボタン
    const inventoryBtn = document.createElement('button');
    inventoryBtn.type = 'button';
    inventoryBtn.className = 'button button-small bookshelf-inventory-btn';
    inventoryBtn.textContent = '🎒 もちもの';
    inventoryBtn.addEventListener('click', () => {
      new InventoryScreen().open();
    });
    rightGroup.appendChild(inventoryBtn);

    // ストリークバッジ
    const streak = GameStore.getState('player.streak') || 1;
    if (streak >= 1) {
      const streakBadge = document.createElement('div');
      streakBadge.className = 'streak-badge' + (streak >= 3 ? ' streak-badge-hot' : '');
      streakBadge.innerHTML = `
        <span class="streak-fire">${streak >= 3 ? '🔥' : '📅'}</span>
        <span class="streak-count">${streak}</span>
        <span class="streak-label">日れんぞく</span>
      `;
      rightGroup.appendChild(streakBadge);
    }

    // クリア数バッジ（現在のグレードのみカウント）
    const gradeWorlds  = this._gradeWorlds();
    const worlds       = GameStore.getState('progress.worlds') || {};
    const clearedCount = gradeWorlds.filter(w => worlds[w.id]?.cleared).length;
    const statsBadge   = document.createElement('div');
    statsBadge.className = 'bookshelf-stats';
    statsBadge.innerHTML = `
      <span class="stats-badge">
        ⭐ ${clearedCount} / ${gradeWorlds.length} クリア
      </span>
    `;
    rightGroup.appendChild(statsBadge);

    // 保護者ボタン（目立たないよう最後に配置）
    const parentBtn = document.createElement('button');
    parentBtn.type = 'button';
    parentBtn.className = 'button button-small bookshelf-parent-btn';
    parentBtn.textContent = '🔒';
    parentBtn.title = '保護者ダッシュボード';
    parentBtn.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'parent_dashboard');
    });
    rightGroup.appendChild(parentBtn);

    header.appendChild(title);
    header.appendChild(playerInfo);
    header.appendChild(avatar);
    header.appendChild(rightGroup);

    return header;
  }

  /**
   * NG+ セクションを生成する（全33ワールドクリア後のみ表示）
   * NG+ ワールドデータは未実装のため、現在はロック状態のティーザー表示
   * @returns {HTMLElement}
   * @private
   */
  _buildNgPlusSection() {
    const section = document.createElement('div');
    section.className = 'ng-plus-section';

    // バナー
    const banner = document.createElement('div');
    banner.className = 'ng-plus-banner';

    const bannerIcon = document.createElement('span');
    bannerIcon.className = 'ng-plus-banner-icon';
    bannerIcon.textContent = '🌟';

    const bannerTitle = document.createElement('span');
    bannerTitle.className = 'ng-plus-banner-title';
    bannerTitle.textContent = 'NG+ モード';

    const bannerSub = document.createElement('p');
    bannerSub.className = 'ng-plus-banner-sub';
    bannerSub.textContent = NG_PLUS.introText.replace(/\n/g, ' ');

    banner.appendChild(bannerIcon);
    banner.appendChild(bannerTitle);
    banner.appendChild(bannerSub);
    section.appendChild(banner);

    // ロックされたワールドカード群（G1 全33ワールドを NG+ カードとして表示）
    const grid = document.createElement('div');
    grid.className = 'ng-plus-grid';

    const g1Worlds = WORLDS.filter(w => !w.grade || w.grade === 1);
    g1Worlds.forEach(w => {
      const card = document.createElement('div');
      card.className = 'ng-plus-card';
      card.setAttribute('aria-label', `${w.title || w.id} NG+（準備中）`);

      const lockIcon = document.createElement('div');
      lockIcon.className = 'ng-plus-card-lock';
      lockIcon.textContent = '🔒';

      const ngBadge = document.createElement('div');
      ngBadge.className = 'ng-plus-card-badge';
      ngBadge.textContent = 'NG+';

      const titleEl = document.createElement('div');
      titleEl.className = 'ng-plus-card-title';
      titleEl.textContent = w.title || w.id;

      card.appendChild(lockIcon);
      card.appendChild(ngBadge);
      card.appendChild(titleEl);
      grid.appendChild(card);
    });

    section.appendChild(grid);

    // 準備中の案内テキスト
    const coming = document.createElement('p');
    coming.className = 'ng-plus-coming-soon';
    coming.textContent = '🚧 まもなく かいほう！ たのしみに まっていてね！';
    section.appendChild(coming);

    return section;
  }

  /**
   * 封印ゲージバナーを生成する（グレード別）
   * @returns {HTMLElement}
   * @private
   */
  _buildSealGauge() {
    const currentGrade = GameStore.getState('app.currentGrade') || 1;
    const gradeWorlds  = this._gradeWorlds();
    const total        = gradeWorlds.length;

    let current, gaugeIcon, gaugeText;
    if (currentGrade === 2) {
      const worldProgress = GameStore.getState('progress.worlds') || {};
      current   = gradeWorlds.filter(w => worldProgress[w.id]?.cleared).length;
      gaugeIcon = '🌊';
      if (current === 0)        gaugeText = '深海グリモアの ぼうけんを はじめよう！';
      else if (current < 7)     gaugeText = `${current}さつ かいふく！ 浅瀬を すすもう！`;
      else if (current < 16)    gaugeText = `${current}さつ！ サンゴ礁の ひみつが わかってきた！`;
      else if (current < 27)    gaugeText = `${current}さつ！ 九九マスター まであとすこし！`;
      else if (current < 38)    gaugeText = `${current}さつ！ 深海に ちかづいている…！`;
      else if (current < total) gaugeText = `のこり ${total - current}さつ！ 海底都市が みえてきた！`;
      else                      gaugeText = '深海グリモア ぜんぶ とりもどした！';
    } else {
      current   = GameStore.getState('app.sealStrength') || 0;
      gaugeIcon = '📖';
      gaugeText = SEAL_GAUGE_TEXT.getComment(current);
    }

    const pct = total > 0 ? Math.round((current / total) * 100) : 0;

    const wrap = document.createElement('div');
    wrap.className = 'seal-gauge-wrap';
    wrap.id = 'seal-gauge-wrap';
    wrap.innerHTML = `
      <div class="seal-gauge-label">
        <span class="seal-gauge-icon">${gaugeIcon}</span>
        <span class="seal-gauge-text">${gaugeText}</span>
        <span class="seal-gauge-count">${current} / ${total}</span>
      </div>
      <div class="seal-gauge-bar" role="progressbar"
           aria-valuenow="${current}" aria-valuemin="0" aria-valuemax="${total}">
        <div class="seal-gauge-fill" style="width:${pct}%"></div>
      </div>
    `;
    return wrap;
  }

  /**
   * ワールドカードを一括生成してグリッドに追加する（グレード別）
   * @param {HTMLElement} grid
   * @private
   */
  _buildCards(grid) {
    const licensed      = GameStore.getState('license.core.licensed');
    const worldProgress = GameStore.getState('progress.worlds') || {};
    const currentGrade  = GameStore.getState('app.currentGrade') || 1;
    const gradeWorlds   = this._gradeWorlds();

    // ── 段階表示：クリア済み最大 order + PROGRESSIVE_REVEAL_AHEAD 先まで表示 ──
    const ahead = Config.GAME.PROGRESSIVE_REVEAL_AHEAD;
    const highestClearedOrder = gradeWorlds.reduce(
      (max, w) => (worldProgress[w.id]?.cleared ? Math.max(max, w.order) : max), 0
    );
    const maxVisibleOrder = highestClearedOrder + ahead;
    const visibleWorlds   = gradeWorlds.filter(w => w.order <= maxVisibleOrder);
    const hiddenCount     = gradeWorlds.length - visibleWorlds.length;
    // ────────────────────────────────────────────────────────────────────────

    // 「つぎはここ！」バッジを付けるワールドを特定する
    let nextWorldId = null;
    for (const worldDef of visibleWorlds) {
      const locked = !worldDef.freeToPlay && !licensed;
      if (locked) continue;
      const prog = worldProgress[worldDef.id];
      if (!prog || !prog.cleared) {
        nextWorldId = worldDef.id;
        break;
      }
    }

    // Grade 2 はゾーンヘッダーを挿入する
    let lastZone = null;

    visibleWorlds.forEach(worldDef => {
      // Grade 2 ゾーンヘッダー
      if (currentGrade === 2 && worldDef.zone && worldDef.zone !== lastZone) {
        lastZone = worldDef.zone;
        const zoneDef = Config.GRADE2.ZONES.find(z => z.id === worldDef.zone);
        if (zoneDef) {
          const zoneHeader = document.createElement('div');
          zoneHeader.className = 'bookshelf-zone-header';
          zoneHeader.innerHTML = `
            <span class="zone-header-emoji">${zoneDef.emoji}</span>
            <span class="zone-header-name">${zoneDef.name}</span>
            <span class="zone-header-desc">${zoneDef.description}</span>
          `;
          grid.appendChild(zoneHeader);
        }
      }

      const progress = worldProgress[worldDef.id] || {
        cleared: false,
        score: 0,
        maxScore: worldDef.totalQuestions,
        percentage: 0
      };

      // ロック判定: 無料ワールドはアンロック、有料はライセンス必要
      const locked = !worldDef.freeToPlay && !licensed;

      const cardData = {
        ...worldDef,
        progress,
        locked,
        isNextRecommended: worldDef.id === nextWorldId
      };

      const card = new BookCard(
        cardData,
        grid,
        (data) => this._handleWorldSelect(data)
      );

      card.render();
      this.cards.push(card);
    });

    // ??? カード：まだ封印されているグリモアの存在を示す（cards には追加しない）
    if (hiddenCount > 0) {
      const mysteryCard = document.createElement('div');
      mysteryCard.className = 'bookshelf-mystery-card';
      mysteryCard.setAttribute('aria-hidden', 'true');
      mysteryCard.innerHTML = `
        <div class="mystery-icon">🌫️</div>
        <div class="mystery-title">??? グリモア</div>
        <div class="mystery-desc">まだ ふういんされた まま……</div>
        <div class="mystery-count">あと ${hiddenCount} さつ</div>
      `;
      grid.appendChild(mysteryCard);
    }

    // 最終決戦ドア（Grade 1 のみ: world_16b クリア後に出現）
    if (currentGrade === 1) {
      this._buildFinalBattleDoor(grid);
    }
  }

  /**
   * 最終決戦ドアカードをグリッドに追加する
   * world_16b クリア後かつ finalBattleCleared === false の場合のみ表示
   * @param {HTMLElement} grid
   * @private
   */
  _buildFinalBattleDoor(grid) {
    const worldProgress    = GameStore.getState('progress.worlds') || {};
    const unlockWorldProg  = worldProgress[FINAL_BATTLE.unlockAfterWorld];
    const unlocked         = unlockWorldProg?.cleared === true;
    const alreadyCleared   = GameStore.getState('app.finalBattleCleared') === true;

    if (!unlocked) return;

    const door = document.createElement('div');
    door.className = 'final-battle-door' + (alreadyCleared ? ' final-battle-door-cleared' : '');
    door.innerHTML = `
      <div class="fbd-glow"></div>
      <div class="fbd-icon">${alreadyCleared ? '👑' : '⚔️'}</div>
      <div class="fbd-title">${alreadyCleared ? 'さいしゅうけっせん（クリアずみ）' : 'さいしゅうけっせん！'}</div>
      <div class="fbd-desc">${alreadyCleared ? 'もう一度いどもう！' : 'やみのまじんをたおせ！'}</div>
    `;
    door.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      GameStore.setState('app.currentScreen', 'final_battle');
    });
    grid.appendChild(door);
  }

  /**
   * ライセンス変更時にカードのロック状態を同期する
   * @private
   */
  _syncLockStates() {
    const licensed    = GameStore.getState('license.core.licensed');
    const gradeWorlds = this._gradeWorlds();
    Logger.debug('[BookshelfScreen] Syncing lock states, licensed:', licensed);

    this.cards.forEach((card, index) => {
      const worldDef = gradeWorlds[index];
      if (!worldDef) return;
      const shouldBeLocked = !worldDef.freeToPlay && !licensed;
      card.setLocked(shouldBeLocked);
    });
  }

  /**
   * クリア直後のワールドカードにお祝いアニメーションを適用する
   * @param {string} worldId - クリアしたワールドID
   * @private
   */
  _animateWorldClear(worldId) {
    const gradeWorlds = this._gradeWorlds();
    const worldIndex  = gradeWorlds.findIndex(w => w.id === worldId);
    if (worldIndex < 0) return;

    const card = this.cards[worldIndex];
    if (!card || !card.element) return;

    Logger.info(`[BookshelfScreen] Animating world clear: ${worldId}`);

    // カードに解放アニメーションクラスを付与
    card.element.classList.add('world-clear-animate');

    // スパークルを生成してカード上にオーバーレイ
    this._spawnSparkles(card.element);

    // アニメーション終了後にクラスを除去
    const removeTimer = setTimeout(() => {
      if (card.element) {
        card.element.classList.remove('world-clear-animate');
      }
    }, 1500);
    this._timers.push(removeTimer);
  }

  /**
   * カード上にキラキラパーティクルを生成する
   * @param {HTMLElement} cardEl
   * @private
   */
  _spawnSparkles(cardEl) {
    const count = 8;
    const rect  = cardEl.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const spawnTimer = setTimeout(() => {
        if (!this.element) return;  // 画面破棄済みなら何もしない

        const sparkle = document.createElement('div');
        sparkle.className = 'world-clear-sparkle';

        // カード内のランダム位置
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        sparkle.style.left = `${x}px`;
        sparkle.style.top  = `${y}px`;

        // ランダムな大きさ
        const size = 12 + Math.random() * 16;
        sparkle.style.width  = `${size}px`;
        sparkle.style.height = `${size}px`;

        cardEl.style.position = 'relative';
        cardEl.appendChild(sparkle);

        // 1秒後に削除
        const removeTimer = setTimeout(() => sparkle.remove(), 1000);
        this._timers.push(removeTimer);
      }, i * 120);
      this._timers.push(spawnTimer);
    }
  }

  /**
   * 「つくれる！」バッジ判定
   * クラフト可能な未クラフト船パーツが1件以上あれば true
   * @returns {boolean}
   * @private
   */
  _hasNewShipParts() {
    const ship      = GameStore.getState('ship');
    const crafted   = ship?.crafted ?? [];
    const materials = GameStore.getState('inventory.materials') ?? {};
    // 動的 import を避けるため SHIP_PARTS は import 先で参照
    // BookshelfScreen は shipItems を直接 import しないので
    // GameStore だけで判断できる簡易チェック: 未クラフトかつ pearl 1個以上あるか
    const hasPearl = (materials.pearl ?? 0) >= 1;
    const allCrafted = crafted.length >= 13; // パーツ総数と一致したら全完成
    return hasPearl && !allCrafted;
  }

  /**
   * グレードを切り替える（タブクリック時）
   * @param {number} grade - 1 | 2
   * @private
   */
  _switchGrade(grade) {
    if ((GameStore.getState('app.currentGrade') || 1) === grade) return;
    GameStore.setState('app.currentGrade', grade);

    // Grade 2 に初めて切り替えた時: 船名未設定ならダイアログ表示
    if (grade === 2 && !GameStore.getState('ship.nameSetByUser')) {
      import('../screens/ShipBuildScreen.js').then(({ showShipNameDialog }) => {
        showShipNameDialog(this.container);
      });
    }

    this._rebuildGradeView();
  }

  /**
   * グレード切り替え後にゲージ・グリッド・タイトルを再構築する
   * @private
   */
  _rebuildGradeView() {
    if (!this.element) return;

    // 霧エフェクト更新
    const currentGrade = GameStore.getState('app.currentGrade') || 1;
    const storyAct = GameStore.getState('app.storyAct') || 1;
    this.element.classList.toggle('bookshelf-fog', currentGrade === 1 && storyAct >= 3);

    // タイトル更新
    const titleEl = this.element.querySelector('#bookshelf-title');
    if (titleEl) {
      if (currentGrade === 2) {
        const worldProgress = GameStore.getState('progress.worlds') || {};
        const g2Worlds  = WORLDS.filter(w => w.grade === 2);
        const g2Cleared = g2Worlds.filter(w => worldProgress[w.id]?.cleared).length;
        const zone = Config.GRADE2.ZONES.slice().reverse().find(z => g2Cleared >= z.unlockWorlds)
          || Config.GRADE2.ZONES[0];
        titleEl.textContent = `${zone.emoji} 深海グリモア — ${zone.name}`;
      } else {
        const stAct = GameStore.getState('app.storyAct') || 1;
        const acts = { 1: 'ふういんされたグリモア', 2: 'グリモアをとりもどせ！',
          3: '🌫️ やみにおおわれたほんだな', 4: '✨ さいごのグリモアへ！' };
        titleEl.textContent = acts[stAct] || 'ほんだな';
      }
    }

    // グレードタブのアクティブ状態更新
    this.element.querySelectorAll('.grade-tab').forEach(btn => {
      const g = parseInt(btn.dataset.grade, 10);
      btn.classList.toggle('grade-tab-active', g === currentGrade);
    });

    // 封印ゲージ再構築
    const oldGauge = this.element.querySelector('#seal-gauge-wrap');
    if (oldGauge) oldGauge.replaceWith(this._buildSealGauge());

    // カード再構築
    this.cards.forEach(card => card.destroy());
    this.cards = [];
    const grid = this.element.querySelector('#bookshelf-grid');
    if (grid) {
      grid.innerHTML = '';
      this._buildCards(grid);
    }

    // クリア数バッジ更新
    const gradeWorlds  = this._gradeWorlds();
    const worlds       = GameStore.getState('progress.worlds') || {};
    const clearedCount = gradeWorlds.filter(w => worlds[w.id]?.cleared).length;
    const statsBadge   = this.element.querySelector('.bookshelf-stats');
    if (statsBadge) {
      statsBadge.innerHTML = `<span class="stats-badge">⭐ ${clearedCount} / ${gradeWorlds.length} クリア</span>`;
    }
  }

  /**
   * 船アップグレード演出を表示する（Phase D: ShipRenderer canvas 版）
   * @param {'medium'|'large_blueprint'} type
   * @returns {Promise<void>}
   * @private
   */
  async _showShipUpgradeCutin(type) {
    if (!this.element) return;

    const isMedium = type === 'medium';
    const title    = isMedium ? 'ふねが おおきくなった！' : 'だいがたかんせんの せっけいずを てにいれた！';
    const body     = isMedium
      ? 'ちゅうがたふね に なったぞ！\nパーツスロットが ふえたよ！'
      : 'ギルドで クラフトすると\nおおきな ふねに なれるぞ！';

    // ShipRenderer.renderMini() で before/after を生成
    // 呼び出し時点で ship.size はすでに新サイズに更新済みのため
    // medium 時: before=small（旧サイズ） / after=medium（現在）
    const ship       = GameStore.getState('ship');
    const beforeSize = isMedium ? 'small' : ship.size;
    const currentCanvas = await ShipRenderer.renderMini({ ...ship, size: beforeSize }, 120, 80).catch(() => null);
    const afterCanvas   = isMedium
      ? await ShipRenderer.renderMini(ship, 120, 80).catch(() => null)
      : null;

    const overlay = document.createElement('div');
    overlay.className = 'ship-upgrade-cutin';
    overlay.innerHTML = `
      <div class="ship-upgrade-cutin-box">
        <div class="ship-upgrade-cutin-ship" id="upgrade-ship-slot"></div>
        <div class="ship-upgrade-cutin-title">${title}</div>
        <div class="ship-upgrade-cutin-body">${body.replace(/\n/g, '<br>')}</div>
        <div class="ship-upgrade-cutin-npc">タコぞう「すごいぞ！」</div>
        <button class="button button-large ship-upgrade-cutin-ok">つぎへ ▶</button>
      </div>
    `;
    this.element.appendChild(overlay);

    // canvas を ship slot に挿入
    const shipSlot = overlay.querySelector('#upgrade-ship-slot');
    if (shipSlot) {
      if (isMedium && currentCanvas && afterCanvas) {
        currentCanvas.className = 'upgrade-ship-before';
        afterCanvas.className   = 'upgrade-ship-after';
        const arrow = document.createElement('span');
        arrow.className   = 'upgrade-ship-arrow';
        arrow.textContent = '→';
        shipSlot.appendChild(currentCanvas);
        shipSlot.appendChild(arrow);
        shipSlot.appendChild(afterCanvas);
      } else if (currentCanvas) {
        currentCanvas.className = 'upgrade-ship-single';
        shipSlot.appendChild(currentCanvas);
      }
    }

    // ボタンタップ or オーバーレイ外タップで閉じる
    await new Promise(resolve => {
      overlay.querySelector('.ship-upgrade-cutin-ok')
        .addEventListener('click', resolve, { once: true });
      overlay.addEventListener('click', e => {
        if (e.target === overlay) resolve();
      });
    });

    // 設計図取得フラグをここで確定（消費後に立てる）
    if (type === 'large_blueprint') {
      GameStore.setState('app.largeBlueprintObtained', true);
    }

    overlay.classList.add('ship-upgrade-cutin-out');
    await new Promise(r => {
      const tid = setTimeout(r, 300);
      this._timers.push(tid);
    });
    overlay.remove();
  }

  /**
   * ワールド選択時の処理
   * @param {Object} worldData - 選択されたワールドデータ
   * @private
   */
  _handleWorldSelect(worldData) {
    Logger.info(`[BookshelfScreen] World selected: ${worldData.id} (${worldData.title})`);

    // GameStore に選択ワールドを記録
    GameStore.setState('currentSession.worldId', worldData.id);
    GameStore.setState('currentSession.unitId', worldData.unitId);

    // コールバックで画面遷移を通知
    if (this.onWorldSelect) {
      this.onWorldSelect(worldData);
    }
  }
}

export default BookshelfScreen;
