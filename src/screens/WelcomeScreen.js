/**
 * WelcomeScreen.js - Grimoire Guardians
 * ようこそ画面（初回起動時のみ表示）
 *
 * フロー:
 *   1. プロローグスライド（6枚）
 *      - slide_01: 古い本が光る（キャラなし）
 *      - slide_02: 召喚中（キャラ登場・normal）
 *      - slide_03: まちに降り立つ（キャラ・フクロウ先生）
 *      - slide_04: 使命の説明（キャラなし）
 *      - slide_05: 名前入力（キャラ・フクロウ先生吹き出し）
 *      - slide_06: 決意（名前入りセリフ・キャラhappy）
 *   2. 名前確定 → GameStore保存 → onComplete()
 *
 * 表示条件: player.createdAt === null（セーブデータがない新規プレイヤー）
 *
 * @version 2.0
 * @date 2026-03-16
 */

import Logger from '../core/Logger.js';
import { GameStore } from '../core/GameStore.js';
import { SaveManager } from '../core/SaveManager.js';
import { SoundManager, SoundType } from '../core/SoundManager.js';
import { CharacterAvatar } from '../components/CharacterAvatar.js';
import { PROLOGUE_SLIDES, STORY_IMAGES } from '../data/storyData.js';

class WelcomeScreen {
  /**
   * @param {HTMLElement} container   - 描画先の親要素
   * @param {Function}    onComplete  - 完了コールバック () => void
   */
  constructor(container, onComplete) {
    this._container  = container;
    this._onComplete = onComplete;
    this._el         = null;
    this._playerName = '';
    this._currentSlide = 0;
  }

  // ─────────────────────────────────────────
  // パブリックメソッド
  // ─────────────────────────────────────────

  render() {
    Logger.info('[WelcomeScreen] Rendering...');
    SoundManager.playBGM(SoundType.BGM_TITLE);

    const el = document.createElement('div');
    el.className = 'welcome-screen';
    this._el = el;
    this._container.appendChild(el);

    this._showSlide(0);

    Logger.info('[WelcomeScreen] Rendered');
    return this;
  }

  destroy() {
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
    Logger.info('[WelcomeScreen] Destroyed');
  }

  // ─────────────────────────────────────────
  // プライベート: スライド表示
  // ─────────────────────────────────────────

  /**
   * 指定インデックスのスライドを表示する
   * @param {number} idx
   */
  _showSlide(idx) {
    if (!this._el) return;
    this._currentSlide = idx;
    const slide = PROLOGUE_SLIDES[idx];
    if (!slide) return;

    this._el.innerHTML = '';

    if (slide.isNameInput) {
      this._renderNameInputSlide(slide);
    } else if (slide.isDecision) {
      this._renderDecisionSlide(slide);
    } else {
      this._renderStorySlide(slide, idx);
    }
  }

  // ─────────────────────────────────────────
  // プライベート: 通常ストーリースライド
  // ─────────────────────────────────────────

  _renderStorySlide(slide, idx) {
    const el = document.createElement('div');
    el.className = 'prologue-slide';

    // 背景画像 or グラデーション
    const bg = document.createElement('div');
    bg.className = 'prologue-bg';
    if (slide.image) {
      const img = document.createElement('img');
      img.src       = slide.image;
      img.className = 'prologue-bg-img';
      img.alt       = '';
      img.addEventListener('error', () => {
        img.style.display = 'none';
        bg.style.background = slide.bgFallback;
        if (slide.emojiFallback) {
          bg.innerHTML += `<span class="prologue-bg-emoji">${slide.emojiFallback}</span>`;
        }
      });
      bg.appendChild(img);
    } else {
      bg.style.background = slide.bgFallback;
      if (slide.emojiFallback) {
        bg.innerHTML = `<span class="prologue-bg-emoji">${slide.emojiFallback}</span>`;
      }
    }
    el.appendChild(bg);

    // キャラアバター
    if (slide.showCharacter) {
      const charWrap = document.createElement('div');
      charWrap.className = 'prologue-char-wrap';
      const avatar = new CharacterAvatar('lg', slide.characterEmotion || 'normal');
      charWrap.appendChild(avatar.render());
      el.appendChild(charWrap);
    }

    // NPC（フクロウ先生）吹き出し
    if (slide.npc && slide.npcText) {
      const bubble = this._makeNpcBubble(slide.npcText);
      el.appendChild(bubble);
    }

    // メインテキスト
    if (slide.text) {
      const textEl = document.createElement('div');
      textEl.className = 'prologue-main-text';
      textEl.innerHTML = slide.text.replace(/\n/g, '<br>');
      el.appendChild(textEl);
    }
    if (slide.subText) {
      const subEl = document.createElement('div');
      subEl.className = 'prologue-sub-text';
      subEl.innerHTML = slide.subText.replace(/\n/g, '<br>');
      el.appendChild(subEl);
    }

    // ナビゲーション（スキップ + 次へ）
    el.appendChild(this._makeNav(idx));

    this._el.appendChild(el);
    requestAnimationFrame(() => el.classList.add('prologue-slide-in'));
  }

  // ─────────────────────────────────────────
  // プライベート: 名前入力スライド（slide_05）
  // ─────────────────────────────────────────

  _renderNameInputSlide(slide) {
    const el = document.createElement('div');
    el.className = 'prologue-slide prologue-slide-name';
    el.style.background = slide.bgFallback;

    // キャラ
    if (slide.showCharacter) {
      const charWrap = document.createElement('div');
      charWrap.className = 'prologue-char-wrap';
      const avatar = new CharacterAvatar('lg', slide.characterEmotion || 'normal');
      charWrap.appendChild(avatar.render());
      el.appendChild(charWrap);
    }

    // フクロウ先生吹き出し
    if (slide.npcText) {
      el.appendChild(this._makeNpcBubble(slide.npcText));
    }

    // 名前入力フォーム
    const form = document.createElement('div');
    form.className = 'prologue-name-form';
    form.innerHTML = `
      <input
        id="prologue-name-input"
        class="welcome-name-input"
        type="text"
        placeholder="ひらがな・かんじで 8もじまで"
        maxlength="8"
        inputmode="text"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <button class="button button-large prologue-name-btn" type="button">
        きめた！ ✓
      </button>
    `;
    el.appendChild(form);

    // スキップ
    el.appendChild(this._makeSkipBtn());

    this._el.appendChild(el);

    // イベント設定
    const input = el.querySelector('#prologue-name-input');
    const btn   = el.querySelector('.prologue-name-btn');

    const confirmName = () => {
      this._playerName = input.value.trim() || 'プレイヤー';
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._showSlide(6); // → slide_06（決意）
    };

    btn.addEventListener('click', confirmName);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); confirmName(); }
    });

    requestAnimationFrame(() => el.classList.add('prologue-slide-in'));

    setTimeout(() => input.focus(), 400);
  }

  // ─────────────────────────────────────────
  // プライベート: 決意スライド（slide_06）
  // ─────────────────────────────────────────

  _renderDecisionSlide(slide) {
    const el = document.createElement('div');
    el.className = 'prologue-slide prologue-slide-decision';
    if (slide.image) {
      const img = document.createElement('img');
      img.src       = slide.image;
      img.className = 'prologue-bg-img';
      img.alt       = '';
      img.addEventListener('error', () => { img.style.display = 'none'; });
      el.insertBefore(img, el.firstChild);
    } else {
      el.style.background = slide.bgFallback;
    }

    // キャラ（happy）
    const charWrap = document.createElement('div');
    charWrap.className = 'prologue-char-wrap prologue-char-decision';
    const avatar = new CharacterAvatar('lg', 'happy');
    charWrap.appendChild(avatar.render());
    el.appendChild(charWrap);

    // 決意テキスト（名前入り）— innerHTML に直接入れず DOM API で挿入（XSS防止）
    const name = this._playerName || 'プレイヤー';
    const textEl = document.createElement('div');
    textEl.className = 'prologue-decision-text';
    const strong = document.createElement('strong');
    strong.textContent = name;
    textEl.append('よし、', strong, '！', document.createElement('br'),
                  'いっしょに グリモアを とりもどそう！');
    el.appendChild(textEl);

    // スタートボタン
    const btn = document.createElement('button');
    btn.className   = 'button button-large prologue-start-btn';
    btn.textContent = 'ぼうけん スタート！ 🚀';
    btn.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      this._finalize();
    });
    el.appendChild(btn);

    this._el.appendChild(el);
    requestAnimationFrame(() => el.classList.add('prologue-slide-in'));
  }

  // ─────────────────────────────────────────
  // プライベート: 確定処理
  // ─────────────────────────────────────────

  _finalize() {
    const name = this._playerName || 'プレイヤー';

    GameStore.setState('player.name',         name);
    GameStore.setState('player.createdAt',    new Date().toISOString());
    GameStore.setState('player.lastPlayedAt', new Date().toISOString());
    GameStore.setState('player.streak',       1);
    GameStore.setState('app.prologueShown',   true);

    SaveManager.save().catch(err =>
      Logger.warn('[WelcomeScreen] Save failed:', err)
    );

    Logger.info(`[WelcomeScreen] Player name set: "${name}"`);

    if (typeof this._onComplete === 'function') {
      this._onComplete();
    }
  }

  // ─────────────────────────────────────────
  // プライベート: 共通UI部品
  // ─────────────────────────────────────────

  /**
   * フクロウ先生の吹き出しを生成する
   * @param {string} text
   * @returns {HTMLElement}
   */
  _makeNpcBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'prologue-npc-bubble';
    bubble.innerHTML = `
      <img src="${STORY_IMAGES.npcs.fukurou}"
           class="prologue-npc-icon"
           onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'🦉',className:'prologue-npc-emoji'}))">
      <p class="prologue-npc-text">${text.replace(/\n/g, '<br>')}</p>
    `;
    return bubble;
  }

  /**
   * ナビゲーションボタン（スキップ + 次へ）を生成する
   * @param {number} currentIdx
   * @returns {HTMLElement}
   */
  _makeNav(currentIdx) {
    const nav = document.createElement('div');
    nav.className = 'prologue-nav';

    const skipBtn = this._makeSkipBtn();
    nav.appendChild(skipBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className   = 'button button-large prologue-next-btn';
    nextBtn.textContent = 'つぎへ →';
    nextBtn.addEventListener('click', () => {
      SoundManager.playSFX(SoundType.BUTTON_CLICK);
      const next = currentIdx + 1;
      // slide_04（idx=3）の次は slide_05（名前入力）
      this._showSlide(next);
    });
    nav.appendChild(nextBtn);

    return nav;
  }

  /**
   * スキップボタンを生成する
   * @returns {HTMLElement}
   */
  _makeSkipBtn() {
    const btn = document.createElement('button');
    btn.className   = 'prologue-skip-btn';
    btn.textContent = 'とばす';
    btn.addEventListener('click', () => {
      // スキップ時は名前入力スライドに飛ぶ
      if (this._currentSlide < 5) {
        SoundManager.playSFX(SoundType.BUTTON_CLICK);
        this._showSlide(5); // slide_05（名前入力）
      }
    });
    return btn;
  }
}

export default WelcomeScreen;
