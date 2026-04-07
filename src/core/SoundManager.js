/**
 * SoundManager.js - Grimoire Guardians
 * サウンド管理システム
 *
 * BGM：HTMLAudioElement（MP3ファイル）+ audio.loop = true
 * SFX：Web Audio API Oscillator（合成音）
 *
 * iOS 制約：最初のユーザー操作（タップ）前は audio.play() が失敗する。
 *           _unlock() がユーザー操作後に AudioContext resume + BGM リトライを行う。
 *
 * @version 2.1
 * @date 2026-03-06
 */

import { Config } from './Config.js';
import Logger from './Logger.js';
import { GameStore } from './GameStore.js';

// ─────────────────────────────────────────────────
// サウンドタイプ定数（外部から SoundType.XXX で参照）
// ─────────────────────────────────────────────────
export const SoundType = {
  // UI 操作
  BUTTON_CLICK:       'button_click',
  BUTTON_HOVER:       'button_hover',
  SCREEN_TRANSITION:  'screen_transition',

  // クイズ
  CORRECT_ANSWER:     'correct_answer',
  WRONG_ANSWER:       'wrong_answer',
  QUESTION_APPEAR:    'question_appear',

  // イベント
  EVENT_START:        'event_start',
  TREASURE_OPEN:      'treasure_open',
  MONSTER_APPEAR:     'monster_appear',
  MONSTER_DEFEAT:     'monster_defeat',
  RARE_DROP:          'rare_drop',

  // クリア演出
  WORLD_CLEAR:        'world_clear',
  PHASE_CLEAR:        'phase_clear',

  // 船ビルド（Phase F — モック。Web Audio 実装は Phase 1 Audio 待ち）
  SHIP: {
    EQUIP_PART:     'ship_equip_part',     // パーツ装備
    CRAFT_PART:     'ship_craft_part',     // パーツクラフト
    THEME_COMPLETE: 'ship_theme_complete', // テーマセット完成
    SIZE_UP:        'ship_size_up',        // サイズアップ
    LARGE_COMPLETE: 'ship_large_complete', // 大型艦完成
    WAVE_AMBIENT:   'ship_wave_ambient',   // 波音ループ（将来）
  },

  // キャラクター会話（ゴニョゴニョSE）
  TALK:               'talk',

  // BGM
  BGM_TITLE:          'bgm_title',
  BGM_BOOKSHELF:      'bgm_bookshelf',
  BGM_TOWN:           'bgm_town',
  BGM_QUIZ:           'bgm_quiz',
  BGM_BOSS:           'bgm_boss',
  BGM_RESULT:         'bgm_result',
  BGM_HOUSE:          'bgm_house',
  BGM_HARBOR:         'bgm_harbor',
  BGM_FARM:           'bgm_farm',
};

// ─────────────────────────────────────────────────
// 合成音の設定テーブル
// ─────────────────────────────────────────────────
// 各エントリは { freq, type, duration, gain, delay } の配列
//   freq     : 周波数 (Hz)
//   type     : OscillatorType ('sine'|'square'|'sawtooth'|'triangle')
//   duration : 鳴らす時間 (秒)
//   gain     : 音量 0.0〜1.0
//   delay    : 再生開始オフセット (秒)
//
// ここを書き換えるだけで音色を変更できる。
// ファイルに差し替える場合はこのテーブルごと削除してよい。
// ─────────────────────────────────────────────────
const _SYNTH_CONFIGS = {
  [SoundType.BUTTON_CLICK]: [
    { freq: 900,  type: 'sine',     duration: 0.07, gain: 0.25, delay: 0 },
  ],
  [SoundType.SCREEN_TRANSITION]: [
    { freq: 660,  type: 'sine',     duration: 0.08, gain: 0.18, delay: 0 },
  ],
  [SoundType.CORRECT_ANSWER]: [
    { freq: 523.25, type: 'sine',   duration: 0.12, gain: 0.45, delay: 0    },  // ド
    { freq: 659.25, type: 'sine',   duration: 0.12, gain: 0.45, delay: 0.1  },  // ミ
    { freq: 783.99, type: 'sine',   duration: 0.18, gain: 0.5,  delay: 0.2  },  // ソ
  ],
  [SoundType.WRONG_ANSWER]: [
    { freq: 250,  type: 'sawtooth', duration: 0.13, gain: 0.3,  delay: 0    },
    { freq: 220,  type: 'sawtooth', duration: 0.18, gain: 0.28, delay: 0.12 },
  ],
  [SoundType.WORLD_CLEAR]: [
    { freq: 523.25, type: 'sine',   duration: 0.15, gain: 0.5,  delay: 0    },  // ド
    { freq: 659.25, type: 'sine',   duration: 0.15, gain: 0.5,  delay: 0.12 },  // ミ
    { freq: 783.99, type: 'sine',   duration: 0.15, gain: 0.5,  delay: 0.24 },  // ソ
    { freq: 1046.5, type: 'sine',   duration: 0.35, gain: 0.6,  delay: 0.38 },  // 高ド
  ],
  [SoundType.PHASE_CLEAR]: [
    { freq: 523.25, type: 'sine',   duration: 0.15, gain: 0.5,  delay: 0    },
    { freq: 659.25, type: 'sine',   duration: 0.15, gain: 0.5,  delay: 0.12 },
    { freq: 783.99, type: 'sine',   duration: 0.15, gain: 0.5,  delay: 0.24 },
    { freq: 1046.5, type: 'sine',   duration: 0.15, gain: 0.6,  delay: 0.38 },
    { freq: 1318.5, type: 'sine',   duration: 0.4,  gain: 0.65, delay: 0.52 },  // 高ミ
  ],
  [SoundType.EVENT_START]: [
    { freq: 440,    type: 'triangle', duration: 0.18, gain: 0.4, delay: 0    },
    { freq: 554.37, type: 'triangle', duration: 0.18, gain: 0.4, delay: 0.14 },
    { freq: 659.25, type: 'triangle', duration: 0.28, gain: 0.5, delay: 0.28 },
  ],
  [SoundType.TREASURE_OPEN]: [
    { freq: 880,    type: 'sine',   duration: 0.1,  gain: 0.4,  delay: 0    },
    { freq: 1108.7, type: 'sine',   duration: 0.15, gain: 0.45, delay: 0.09 },
    { freq: 1318.5, type: 'sine',   duration: 0.25, gain: 0.5,  delay: 0.2  },
  ],
  [SoundType.MONSTER_APPEAR]: [
    { freq: 180,    type: 'sawtooth', duration: 0.25, gain: 0.4, delay: 0    },
    { freq: 150,    type: 'sawtooth', duration: 0.3,  gain: 0.35, delay: 0.2 },
  ],
  [SoundType.MONSTER_DEFEAT]: [
    { freq: 500,    type: 'sine',   duration: 0.1,  gain: 0.45, delay: 0    },
    { freq: 400,    type: 'sine',   duration: 0.1,  gain: 0.4,  delay: 0.08 },
    { freq: 600,    type: 'sine',   duration: 0.2,  gain: 0.5,  delay: 0.18 },
  ],
  [SoundType.RARE_DROP]: [
    { freq: 1046.5, type: 'sine',   duration: 0.1,  gain: 0.45, delay: 0    },
    { freq: 1318.5, type: 'sine',   duration: 0.1,  gain: 0.48, delay: 0.1  },
    { freq: 1567.98,type: 'sine',   duration: 0.25, gain: 0.55, delay: 0.22 },
  ],
  [SoundType.QUESTION_APPEAR]: [
    { freq: 660,    type: 'sine',   duration: 0.07, gain: 0.2,  delay: 0    },
  ],
};

// ─────────────────────────────────────────────────
// BGM ファイルパスマップ
// ─────────────────────────────────────────────────
const _BGM_FILES = {
  [SoundType.BGM_TITLE]:     'assets/sounds/bgm/bgm_title.mp3',
  [SoundType.BGM_BOOKSHELF]: 'assets/sounds/bgm/bgm_bookshelf.mp3',
  [SoundType.BGM_TOWN]:      'assets/sounds/bgm/bgm_town.mp3',
  [SoundType.BGM_QUIZ]:      'assets/sounds/bgm/bgm_quiz.mp3',
  [SoundType.BGM_BOSS]:      'assets/sounds/bgm/bgm_boss.mp3',
  [SoundType.BGM_RESULT]:    'assets/sounds/bgm/bgm_result.mp3',
  [SoundType.BGM_HOUSE]:     'assets/sounds/bgm/bgm_house.mp3',
  [SoundType.BGM_HARBOR]:    'assets/sounds/bgm/bgm_harbor.mp3',
  [SoundType.BGM_FARM]:      'assets/sounds/bgm/bgm_farm.mp3',
};

// ─────────────────────────────────────────────────
// SoundManager クラス
// ─────────────────────────────────────────────────
export class SoundManager {
  static isInitialized = false;
  static isMuted        = false;
  static masterVolume   = 1.0;
  static sfxVolume      = 1.0;
  static bgmVolume      = 0.5;

  /** @type {AudioContext|null} */
  static _audioContext  = null;
  /** @type {boolean} iOS 対策: ユーザー操作後に true になる */
  static _unlocked      = false;
  /** @type {Map<string, HTMLAudioElement>} BGM インスタンスキャッシュ */
  static _bgmCache  = new Map();

  static sounds    = new Map();
  static currentBGM = null;

  // ── 初期化 ──────────────────────────────────────

  /**
   * SoundManager を初期化する
   * AudioContext は最初のユーザー操作（_unlock）まで作らない
   */
  static async init() {
    if (this.isInitialized) return;

    Logger.info('[Sound] Initializing (Web Audio API)...');

    // ユーザー操作後にアンロックするリスナーを登録
    const unlockEvents = ['touchstart', 'touchend', 'mousedown', 'keydown'];
    const onUnlock = () => {
      this._unlock();
      unlockEvents.forEach(e => document.removeEventListener(e, onUnlock));
    };
    unlockEvents.forEach(e => document.addEventListener(e, onUnlock, { once: true }));

    this.isInitialized = true;
    Logger.info('[Sound] Ready (will activate on first user gesture)');
  }

  /**
   * 最初のユーザー操作で AudioContext を作成・再開する
   * @private
   */
  static _unlock() {
    if (this._unlocked) return;
    try {
      if (!this._audioContext) {
        this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this._audioContext.state === 'suspended') {
        this._audioContext.resume();
      }
      this._unlocked = true;
      Logger.info('[Sound] AudioContext unlocked');

      // ユーザー操作前に playBGM が呼ばれて失敗していた場合にリトライ
      if (this.currentBGM) {
        const audio = this._bgmCache.get(this.currentBGM);
        if (audio && audio.paused) {
          audio.play().catch(err => Logger.debug('[Sound] BGM retry failed:', err.message));
        }
      }
    } catch (err) {
      Logger.warn('[Sound] AudioContext not available:', err.message);
    }
  }

  // ── 合成音再生（内部ユーティリティ） ───────────

  /**
   * ノート設定配列から合成音を鳴らす
   * 将来ファイルベースに差し替える場合はこのメソッドを置き換える。
   * @private
   * @param {Array<{freq:number, type:string, duration:number, gain:number, delay:number}>} notes
   * @param {'sfx'|'bgm'} [volumeType='sfx'] - 音量チャンネル
   */
  static _playTone(notes, volumeType = 'sfx') {
    if (!this._audioContext || !this._unlocked) return;
    const ctx = this._audioContext;
    const now = ctx.currentTime;
    const channelVolume = volumeType === 'bgm' ? this.bgmVolume : this.sfxVolume;

    notes.forEach(({ freq, type, duration, gain, delay }) => {
      try {
        const osc      = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + delay);

        const vol = gain * channelVolume * this.masterVolume;
        gainNode.gain.setValueAtTime(0, now + delay);
        gainNode.gain.linearRampToValueAtTime(vol, now + delay + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

        osc.start(now + delay);
        osc.stop(now + delay + duration + 0.02);
      } catch (err) {
        Logger.debug('[Sound] Note error:', err.message);
      }
    });
  }

  // ── 公開 API ────────────────────────────────────

  /**
   * 効果音を再生する
   * @param {string} soundType - SoundType 定数
   * @param {Object} [options]
   * @param {number} [options.volume] - 個別音量 (0.0〜1.0)
   */
  static playSFX(soundType, options = {}) {
    if (!Config.UI.ENABLE_SOUND || this.isMuted) return;

    const notes = _SYNTH_CONFIGS[soundType];
    if (!notes) {
      Logger.debug('[Sound] No config for SFX:', soundType);
      return;
    }

    // 個別音量を掛け合わせて再生
    const volumeScale = options.volume ?? 1.0;
    const scaled = notes.map(n => ({ ...n, gain: n.gain * volumeScale }));
    this._playTone(scaled);
  }

  /**
   * キャラのゴニョゴニョSEを鳴らす（吹き出し表示と連動）
   * 60ms のサイン波を 80ms 間隔で 4 バースト再生する。
   * @param {number} [voiceFreq=380] - スキン固有の周波数（skinItems.js の voiceFreq）
   */
  static playTalk(voiceFreq = 380) {
    if (!Config.UI.ENABLE_SOUND || this.isMuted) return;
    const freq = (typeof voiceFreq === 'number' && voiceFreq > 0) ? voiceFreq : 380;
    const notes = [0, 0.08, 0.16, 0.24].map(delay => ({
      freq,
      type:     'sine',
      duration: 0.06,
      gain:     0.12,
      delay,
    }));
    this._playTone(notes);
  }

  /**
   * BGM を再生する（MP3ファイル・ループあり）
   * @param {string} bgmType - SoundType.BGM_* 定数
   */
  static playBGM(bgmType) {
    if (!Config.UI.ENABLE_SOUND || this.isMuted) return;
    if (this.currentBGM === bgmType) return;
    this.stopBGM();

    const path = _BGM_FILES[bgmType];
    if (!path) {
      Logger.debug('[Sound] No BGM file for:', bgmType);
      return;
    }

    // キャッシュ済みインスタンスを再利用、なければ新規作成
    if (!this._bgmCache.has(bgmType)) {
      const audio = new Audio(path);
      audio.loop = true;
      this._bgmCache.set(bgmType, audio);
    }

    const audio = this._bgmCache.get(bgmType);
    audio.volume = this.bgmVolume * this.masterVolume;
    audio.currentTime = 0;
    audio.play().catch(err => Logger.debug('[Sound] BGM play failed:', err.message));

    this.currentBGM = bgmType;
    Logger.debug('[Sound] BGM start:', bgmType);
  }

  /** BGM を停止する */
  static stopBGM() {
    if (this.currentBGM) {
      const audio = this._bgmCache.get(this.currentBGM);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      this.currentBGM = null;
    }
  }

  /** 全サウンドを停止する */
  static stopAll() {
    this.stopBGM();
  }

  /**
   * ミュート切り替え
   * @param {boolean} muted
   */
  static setMuted(muted) {
    this.isMuted = muted;
    Logger.info(`[Sound] ${muted ? '🔇 Muted' : '🔊 Unmuted'}`);
    if (muted) this.stopAll();
    GameStore.setState('sound.isMuted', muted);
  }

  /** @param {number} volume 0.0〜1.0 */
  static setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this._applyBGMVolume();
    GameStore.setState('sound.masterVolume', this.masterVolume);
  }

  /** @param {number} volume 0.0〜1.0 */
  static setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    GameStore.setState('sound.sfxVolume', this.sfxVolume);
  }

  /** @param {number} volume 0.0〜1.0 */
  static setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    this._applyBGMVolume();
    GameStore.setState('sound.bgmVolume', this.bgmVolume);
  }

  /** 再生中の BGM に現在の音量を反映する @private */
  static _applyBGMVolume() {
    if (this.currentBGM) {
      const audio = this._bgmCache.get(this.currentBGM);
      if (audio) audio.volume = this.bgmVolume * this.masterVolume;
    }
  }

  /** 設定をエクスポートする */
  static exportSettings() {
    return {
      isMuted:      this.isMuted,
      masterVolume: this.masterVolume,
      sfxVolume:    this.sfxVolume,
      bgmVolume:    this.bgmVolume,
    };
  }

  /**
   * 設定をインポートする（SaveManager からのロード時に使用）
   * GameStore への書き戻しは行わない（呼び出し元が既に setState 済みのため）
   */
  static importSettings(settings) {
    if (settings.isMuted      !== undefined) {
      this.isMuted = settings.isMuted;
      if (this.isMuted) this.stopAll();
    }
    if (settings.masterVolume !== undefined) this.masterVolume = Math.max(0, Math.min(1, settings.masterVolume));
    if (settings.sfxVolume    !== undefined) this.sfxVolume    = Math.max(0, Math.min(1, settings.sfxVolume));
    if (settings.bgmVolume    !== undefined) this.bgmVolume    = Math.max(0, Math.min(1, settings.bgmVolume));
    Logger.info('[Sound] Settings imported');
  }

  /** Phase 1 以降でサウンドファイルをプリロードする（予約） */
  static async preload(soundTypes) {
    Logger.debug('[Sound] preload (reserved for file-based implementation):', soundTypes);
  }
}

export default SoundManager;
