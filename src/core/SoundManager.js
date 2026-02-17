/**
 * SoundManager.js - Grimoire Guardians
 * サウンド管理システム（Phase 0: モック実装）
 * 
 * Phase 0では実際のサウンド再生は行わず、ログ出力のみ
 * Phase 1で実装予定
 * 
 * @version 1.0 (Mock)
 * @date 2026-02-15
 */

import { Config } from './Config.js';
import Logger from './Logger.js';

/**
 * サウンドタイプ定義
 */
export const SoundType = {
  // UI効果音
  BUTTON_CLICK: 'button_click',
  BUTTON_HOVER: 'button_hover',
  SCREEN_TRANSITION: 'screen_transition',
  
  // ゲーム効果音
  CORRECT_ANSWER: 'correct_answer',
  WRONG_ANSWER: 'wrong_answer',
  QUESTION_APPEAR: 'question_appear',
  
  // イベント効果音
  EVENT_START: 'event_start',
  TREASURE_OPEN: 'treasure_open',
  MONSTER_APPEAR: 'monster_appear',
  MONSTER_DEFEAT: 'monster_defeat',
  RARE_DROP: 'rare_drop',
  
  // クリア演出
  WORLD_CLEAR: 'world_clear',
  PHASE_CLEAR: 'phase_clear',
  
  // BGM
  BGM_TITLE: 'bgm_title',
  BGM_BOOKSHELF: 'bgm_bookshelf',
  BGM_QUIZ: 'bgm_quiz',
  BGM_BOSS: 'bgm_boss'
};

/**
 * SoundManager クラス（モック実装）
 * Phase 0ではログ出力のみ
 */
export class SoundManager {
  static isInitialized = false;
  static isMuted = false;
  static masterVolume = 1.0;
  static sfxVolume = 1.0;
  static bgmVolume = 0.5;
  
  // サウンドアセット（Phase 1で実装）
  static sounds = new Map();
  static currentBGM = null;

  /**
   * 初期化
   */
  static async init() {
    if (this.isInitialized) {
      Logger.warn('[Sound] Already initialized');
      return;
    }

    Logger.info('[Sound] Initializing (MOCK)...');
    
    // Phase 0: モック実装（実際のサウンド読み込みなし）
    Logger.info('[Sound] Mock mode enabled (Phase 0)');
    Logger.info('[Sound] Actual sound playback will be implemented in Phase 1');
    
    this.isInitialized = true;
  }

  /**
   * 効果音を再生
   * @param {string} soundType - サウンドタイプ
   * @param {Object} options - オプション
   */
  static playSFX(soundType, options = {}) {
    if (!Config.UI.ENABLE_SOUND) {
      return;
    }

    if (this.isMuted) {
      Logger.debug('[Sound] Muted, skipping SFX:', soundType);
      return;
    }

    // Phase 0: ログ出力のみ
    const volume = (options.volume || 1.0) * this.sfxVolume * this.masterVolume;
    Logger.debug(`[Sound] 🔊 SFX: ${soundType} (volume: ${volume.toFixed(2)})`);

    // Phase 1で実装予定:
    // - サウンドファイルの読み込み
    // - Web Audio API による再生
    // - 同時再生数の制限
    // - フェードイン/アウト
  }

  /**
   * BGMを再生
   * @param {string} bgmType - BGMタイプ
   * @param {Object} options - オプション
   */
  static playBGM(bgmType, options = {}) {
    if (!Config.UI.ENABLE_SOUND) {
      return;
    }

    if (this.isMuted) {
      Logger.debug('[Sound] Muted, skipping BGM:', bgmType);
      return;
    }

    // 既に同じBGMが再生中なら何もしない
    if (this.currentBGM === bgmType) {
      return;
    }

    // Phase 0: ログ出力のみ
    const volume = (options.volume || 1.0) * this.bgmVolume * this.masterVolume;
    const loop = options.loop !== undefined ? options.loop : true;
    
    Logger.debug(`[Sound] 🎵 BGM: ${bgmType} (volume: ${volume.toFixed(2)}, loop: ${loop})`);
    
    this.currentBGM = bgmType;

    // Phase 1で実装予定:
    // - 現在のBGMをフェードアウト
    // - 新しいBGMをフェードイン
    // - ループ再生
  }

  /**
   * BGMを停止
   * @param {Object} options - オプション
   */
  static stopBGM(options = {}) {
    if (!this.currentBGM) {
      return;
    }

    const fadeOut = options.fadeOut !== undefined ? options.fadeOut : true;
    
    Logger.debug(`[Sound] ⏹️ Stop BGM: ${this.currentBGM} (fadeOut: ${fadeOut})`);
    
    this.currentBGM = null;

    // Phase 1で実装予定:
    // - フェードアウト処理
  }

  /**
   * 全サウンドを停止
   */
  static stopAll() {
    Logger.debug('[Sound] 🛑 Stop all sounds');
    this.currentBGM = null;

    // Phase 1で実装予定:
    // - 全SFXを停止
    // - BGMを停止
  }

  /**
   * ミュート切り替え
   * @param {boolean} muted - ミュート状態
   */
  static setMuted(muted) {
    this.isMuted = muted;
    Logger.info(`[Sound] ${muted ? '🔇' : '🔊'} Muted: ${muted}`);

    if (muted) {
      this.stopAll();
    }
  }

  /**
   * マスターボリューム設定
   * @param {number} volume - 0.0 ~ 1.0
   */
  static setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    Logger.debug(`[Sound] 🔊 Master volume: ${this.masterVolume.toFixed(2)}`);
  }

  /**
   * SFXボリューム設定
   * @param {number} volume - 0.0 ~ 1.0
   */
  static setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    Logger.debug(`[Sound] 🔊 SFX volume: ${this.sfxVolume.toFixed(2)}`);
  }

  /**
   * BGMボリューム設定
   * @param {number} volume - 0.0 ~ 1.0
   */
  static setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    Logger.debug(`[Sound] 🔊 BGM volume: ${this.bgmVolume.toFixed(2)}`);
  }

  /**
   * プリロード（Phase 1で実装）
   * @param {Array<string>} soundTypes - プリロードするサウンドのリスト
   */
  static async preload(soundTypes) {
    Logger.debug('[Sound] Preload requested (MOCK):', soundTypes);
    
    // Phase 1で実装予定:
    // - サウンドファイルの事前読み込み
    // - プログレス通知
  }

  /**
   * サウンド設定をエクスポート
   * @returns {Object} サウンド設定
   */
  static exportSettings() {
    return {
      isMuted: this.isMuted,
      masterVolume: this.masterVolume,
      sfxVolume: this.sfxVolume,
      bgmVolume: this.bgmVolume
    };
  }

  /**
   * サウンド設定をインポート
   * @param {Object} settings - サウンド設定
   */
  static importSettings(settings) {
    if (settings.isMuted !== undefined) {
      this.setMuted(settings.isMuted);
    }
    if (settings.masterVolume !== undefined) {
      this.setMasterVolume(settings.masterVolume);
    }
    if (settings.sfxVolume !== undefined) {
      this.setSFXVolume(settings.sfxVolume);
    }
    if (settings.bgmVolume !== undefined) {
      this.setBGMVolume(settings.bgmVolume);
    }

    Logger.info('[Sound] Settings imported');
  }
}

// デフォルトエクスポート
export default SoundManager;
