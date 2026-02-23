/**
 * SoundManager.js - Grimoire Guardians
 * サウンド管理システム
 *
 * 現在の実装：Web Audio API による合成音（音声ファイル不要）
 * 差し替え方針：将来ファイルベースに移行する場合は _SYNTH_CONFIGS を削除し
 *               playSFX / playBGM の実装部分（"── 合成音再生 ──"以降）を
 *               Audio/HTMLAudioElement ベースに置き換えるだけでよい。
 *
 * iOS 制約：最初のユーザー操作（タップ）後に AudioContext を resume する。
 *           _unlock() がその役割を担う。
 *
 * @version 2.0
 * @date 2026-02-23
 */

import { Config } from './Config.js';
import Logger from './Logger.js';

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

  // BGM（合成音では未対応、将来ファイルで実装）
  BGM_TITLE:          'bgm_title',
  BGM_BOOKSHELF:      'bgm_bookshelf',
  BGM_QUIZ:           'bgm_quiz',
  BGM_BOSS:           'bgm_boss',
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
   */
  static _playTone(notes) {
    if (!this._audioContext || !this._unlocked) return;
    const ctx = this._audioContext;
    const now = ctx.currentTime;

    notes.forEach(({ freq, type, duration, gain, delay }) => {
      try {
        const osc      = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + delay);

        const vol = gain * this.sfxVolume * this.masterVolume;
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
   * BGM を再生する（現フェーズでは合成音未対応。将来ファイルで実装）
   * @param {string} bgmType
   * @param {Object} [options]
   */
  static playBGM(bgmType, options = {}) {
    if (!Config.UI.ENABLE_SOUND || this.isMuted) return;
    if (this.currentBGM === bgmType) return;
    this.currentBGM = bgmType;
    Logger.debug('[Sound] BGM:', bgmType, '(file-based BGM: future implementation)');
  }

  /** BGM を停止する */
  static stopBGM(options = {}) {
    this.currentBGM = null;
  }

  /** 全サウンドを停止する */
  static stopAll() {
    this.currentBGM = null;
  }

  /**
   * ミュート切り替え
   * @param {boolean} muted
   */
  static setMuted(muted) {
    this.isMuted = muted;
    Logger.info(`[Sound] ${muted ? '🔇 Muted' : '🔊 Unmuted'}`);
    if (muted) this.stopAll();
  }

  /** @param {number} volume 0.0〜1.0 */
  static setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /** @param {number} volume 0.0〜1.0 */
  static setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  /** @param {number} volume 0.0〜1.0 */
  static setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
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

  /** 設定をインポートする */
  static importSettings(settings) {
    if (settings.isMuted      !== undefined) this.setMuted(settings.isMuted);
    if (settings.masterVolume !== undefined) this.setMasterVolume(settings.masterVolume);
    if (settings.sfxVolume    !== undefined) this.setSFXVolume(settings.sfxVolume);
    if (settings.bgmVolume    !== undefined) this.setBGMVolume(settings.bgmVolume);
    Logger.info('[Sound] Settings imported');
  }

  /** Phase 1 以降でサウンドファイルをプリロードする（予約） */
  static async preload(soundTypes) {
    Logger.debug('[Sound] preload (reserved for file-based implementation):', soundTypes);
  }
}

export default SoundManager;
