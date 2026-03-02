/**
 * PhotoScreen.js - Grimoire Guardians
 * マイハウス写真館 v1.0
 *
 * 家の全景 + キャラクター + フォトフレーム + スタンプを合成して
 * Canvas に描画し、端末へダウンロードできる写真機能。
 *
 * 使い方: HouseScreen の 📷 ボタンから遷移
 *
 * @version 1.0
 * @date 2026-03-01
 */

import { GameStore } from '../core/GameStore.js';
import { Config } from '../core/Config.js';
import Logger from '../core/Logger.js';
import { HouseManager } from '../core/HouseManager.js';
import { getStyleById } from '../data/styleItems.js';

/** レイヤー表示順（下から上） */
const LAYER_ORDER = ['garden', 'floor1', 'floor2', 'floor3', 'tower', 'decoration'];

/** レイヤーラベル */
const LAYER_LABELS = {
  garden: 'にわ', floor1: '1かい', floor2: '2かい',
  floor3: '3かい', tower: 'てっぺん', decoration: 'そうしょく',
};

export class PhotoScreen {
  constructor() {
    this._container = null;
    this._element = null;
    this._unsubscribe = null;
    /** 配置済みスタンプ [{ emoji, x, y, id }] */
    this._stamps = [];
    this._nextStampId = 0;
    /** ドラッグ中のスタンプ情報 */
    this._dragging = null;
  }

  // ─────────────────────────────────────────────
  // ライフサイクル
  // ─────────────────────────────────────────────

  show(container) {
    this._container = container;
    // 保存済みスタンプ配置を復元
    this._stamps = (GameStore.getState('house.photo.stampPlacements') || []).map((s, i) => ({
      ...s, id: i,
    }));
    this._nextStampId = this._stamps.length;
    this._render();
    Logger.info('[PhotoScreen] 表示');
  }

  hide() {
    if (this._unsubscribe) { this._unsubscribe(); this._unsubscribe = null; }
    this._saveStampPlacements();
    if (this._element) { this._element.remove(); this._element = null; }
  }

  // ─────────────────────────────────────────────
  // レンダリング
  // ─────────────────────────────────────────────

  _render() {
    if (!this._container) return;

    const photo    = GameStore.getState('house.photo') || {};
    const poses    = Config.HOUSE.PHOTO_POSES || [];
    const frames   = Config.HOUSE.PHOTO_FRAMES || [];
    const allStamps= Config.HOUSE.PHOTO_STAMPS || [];

    const currentPose  = photo.currentPose  || 'normal';
    const currentFrame = photo.currentFrame || 'frame_simple';
    const unlockedFrames = photo.unlockedFrames || ['frame_simple'];
    const unlockedStamps = photo.unlockedStamps || [];

    if (this._element) this._element.remove();
    const _tmp = document.createElement('div');
    _tmp.innerHTML = `
      <div class="photo-screen">

        ${this._renderHeader()}

        <!-- プレビューエリア -->
        <div class="photo-preview-area">
          ${this._renderHousePreview(currentPose, currentFrame)}
        </div>

        <!-- コントロール -->
        <div class="photo-controls">

          <!-- ポーズ選択 -->
          <div class="photo-control-section">
            <span class="photo-ctrl-label">ポーズ</span>
            <div class="photo-pose-row">
              ${poses.map(p => `
                <button class="photo-pose-btn ${currentPose === p.id ? 'active' : ''}"
                        data-pose="${p.id}" title="${p.label}">
                  ${p.emoji}
                  <span>${p.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- フレーム選択 -->
          <div class="photo-control-section">
            <span class="photo-ctrl-label">フレーム</span>
            <div class="photo-frame-row">
              ${frames.map(f => {
                const locked = !unlockedFrames.includes(f.id);
                return `
                  <button class="photo-frame-btn ${currentFrame === f.id ? 'active' : ''} ${locked ? 'locked' : ''}"
                          data-frame="${f.id}" ${locked ? 'disabled' : ''} title="${f.name}">
                    <span style="color:${f.color}">${f.emoji}</span>
                    <span class="frame-name">${locked ? '🔒' : f.name}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- スタンプ選択 -->
          <div class="photo-control-section">
            <span class="photo-ctrl-label">スタンプ (${unlockedStamps.length}/${allStamps.length})</span>
            <div class="photo-stamp-palette">
              ${allStamps.map(emoji => {
                const owned = unlockedStamps.includes(emoji);
                return `
                  <button class="photo-stamp-pick ${owned ? 'owned' : 'locked'}"
                          data-stamp="${emoji}" ${!owned ? 'disabled title="宝箱でゲット！"' : ''}>
                    ${owned ? emoji : '❓'}
                  </button>
                `;
              }).join('')}
              ${unlockedStamps.length > 0 ? `
                <button class="photo-stamp-clear btn btn-small btn-danger">
                  🗑️ けす
                </button>
              ` : ''}
            </div>
          </div>

        </div>

        <!-- 保存ボタン -->
        <div class="photo-save-area">
          <button class="btn btn-large btn-success photo-save-btn">
            📸 ほぞん！
          </button>
        </div>

      </div>
    `;
    this._element = _tmp.firstElementChild;
    this._container.appendChild(this._element);

    this._bindEvents();
    this._restoreStampDOM();
  }

  _renderHeader() {
    return `
      <div class="photo-header">
        <button class="btn-icon photo-back-btn" aria-label="もどる">←</button>
        <h2 class="photo-title">📷 マイハウスしゃしんかん</h2>
        <div></div>
      </div>
    `;
  }

  /**
   * 家のプレビューをHTML/CSSで構築
   * 各レイヤーをテーマカラーのブロックとして積み上げる
   */
  _renderHousePreview(poseId, frameId) {
    const house    = GameStore.getState('house');
    const sections = house.sections || {};
    const styles   = house.layerStyles || {};

    const poses    = Config.HOUSE.PHOTO_POSES || [];
    const pose     = poses.find(p => p.id === poseId) || poses[0];
    const frames   = Config.HOUSE.PHOTO_FRAMES || [];
    const frame    = frames.find(f => f.id === frameId) || frames[0];

    const { comboName, bonus } = HouseManager.getFullsetBonus();
    const bonusClass = bonus ? `house-fullset-${bonus.effect.replace('_', '-')}` : '';

    // レイヤーを積み上げ（下から: garden → tower → decoration）
    const visibleLayers = LAYER_ORDER.filter(id => {
      if (id === 'decoration') return sections.exterior;
      if (id === 'garden')     return true; // garden は floor1 と一体
      return sections[id];
    });

    const layerBlocks = visibleLayers.map(id => {
      const styleId = id === 'decoration' ? styles.decoration : styles[id] || 'style_wood';
      const style   = styleId ? getStyleById(styleId) : null;
      const emoji   = style?.layerEmoji?.[id] || style?.emoji || '🏠';
      const color   = style?.color || '#a0522d';
      const colorDk = style?.colorDark || '#6b3a1f';
      const animCls = id === 'decoration' && style ? style.decoAnimClass : '';
      const isDecoLayer = id === 'decoration';

      return `
        <div class="photo-layer photo-layer-${id} ${isDecoLayer ? 'photo-layer-deco' : ''}
             ${animCls}" style="${isDecoLayer
               ? `background: none; border: none;`
               : `background: linear-gradient(135deg, ${color}, ${colorDk});`}">
          <span class="photo-layer-emoji">${emoji}</span>
          <span class="photo-layer-label">${LAYER_LABELS[id] || id}</span>
        </div>
      `;
    }).reverse(); // 上に表示するものが先

    // キャラクター
    const playerName = GameStore.getState('player.name') || 'プレイヤー';
    const skinId     = GameStore.getState('player.currentSkin') || 'default';
    const charEmoji  = '🧙';

    // 統計テキスト
    const worlds    = GameStore.getState('progress.worlds') || {};
    const cleared   = Object.values(worlds).filter(w => w?.cleared).length;
    const today     = new Date().toLocaleDateString('ja-JP');

    // フレームのCSSスタイル
    const frameStyle = `border: 6px solid ${frame?.color || '#fff'}; box-shadow: 0 0 12px ${frame?.color || '#fff'}88;`;

    return `
      <div class="photo-canvas-wrapper ${bonusClass}">
        <div class="photo-frame-wrap" style="${frameStyle}" id="photo-preview-frame">

          <!-- フレーム装飾（上） -->
          <div class="photo-frame-deco photo-frame-deco-top">
            ${frame?.emoji || ''} ${frame?.name || ''}
          </div>

          <!-- 家レイヤー積み上げ -->
          <div class="photo-house-stack">
            ${layerBlocks.join('')}
          </div>

          <!-- キャラクター -->
          <div class="photo-character-wrap ${pose?.css || ''}" aria-label="キャラクター ${pose?.label}">
            <div class="photo-character-inner">
              <div class="photo-char-sprite">${charEmoji}</div>
              <div class="photo-char-skin-label">${skinId === 'default' ? '' : skinId}</div>
            </div>
          </div>

          <!-- コンボバッジ -->
          ${comboName ? `
            <div class="photo-combo-badge house-fullset-badge">
              ✨ ${comboName}
            </div>
          ` : ''}

          <!-- フッター情報 -->
          <div class="photo-info-bar">
            <span class="photo-player-name">${playerName}</span>
            <span class="photo-world-count">🌟 ${cleared}/33</span>
            <span class="photo-date">${today}</span>
          </div>

          <!-- フレーム装飾（下） -->
          <div class="photo-frame-deco photo-frame-deco-bottom">
            ${frame?.emoji || ''} ${frame?.emoji || ''} ${frame?.emoji || ''}
          </div>

          <!-- スタンプ配置エリア（タップでスタンプを貼れる） -->
          <div class="photo-stamp-area" id="photo-stamp-area">
          </div>

        </div>
      </div>
    `;
  }

  /** 保存したスタンプを DOM に復元 */
  _restoreStampDOM() {
    const area = this._container?.querySelector('#photo-stamp-area');
    if (!area) return;
    this._stamps.forEach(s => {
      const el = this._createStampEl(s);
      area.appendChild(el);
    });
  }

  // ─────────────────────────────────────────────
  // イベントバインド
  // ─────────────────────────────────────────────

  _bindEvents() {
    if (!this._container) return;

    // もどる
    this._container.querySelector('.photo-back-btn')?.addEventListener('click', () => {
      GameStore.setState('app.currentScreen', 'house');
    });

    // ポーズ選択
    this._container.querySelectorAll('.photo-pose-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        HouseManager.setPhotoSetting('currentPose', btn.dataset.pose);
        this._render();
      });
    });

    // フレーム選択
    this._container.querySelectorAll('.photo-frame-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        HouseManager.setPhotoSetting('currentFrame', btn.dataset.frame);
        this._render();
      });
    });

    // スタンプ選択 → プレビューエリアにタップで貼る
    this._container.querySelectorAll('.photo-stamp-pick.owned').forEach(btn => {
      btn.addEventListener('click', () => {
        this._pendingStamp = btn.dataset.stamp;
        // 視覚的フィードバック
        this._container.querySelectorAll('.photo-stamp-pick').forEach(b => b.classList.remove('selecting'));
        btn.classList.add('selecting');
      });
    });

    // スタンプ消去
    this._container.querySelector('.photo-stamp-clear')?.addEventListener('click', () => {
      this._stamps = [];
      const area = this._container?.querySelector('#photo-stamp-area');
      if (area) area.innerHTML = '';
      this._saveStampPlacements();
    });

    // スタンプ配置エリアへのタップ
    const stampArea = this._container.querySelector('#photo-stamp-area');
    if (stampArea) {
      stampArea.addEventListener('click', (e) => {
        if (!this._pendingStamp) return;
        const rect = stampArea.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this._addStamp(this._pendingStamp, x, y, stampArea);
        this._pendingStamp = null;
        this._container.querySelectorAll('.photo-stamp-pick').forEach(b => b.classList.remove('selecting'));
      });
    }

    // 保存ボタン
    this._container.querySelector('.photo-save-btn')?.addEventListener('click', () => {
      this._savePhoto();
    });
  }

  // ─────────────────────────────────────────────
  // スタンプ操作
  // ─────────────────────────────────────────────

  _addStamp(emoji, xPct, yPct, area) {
    const stamp = { emoji, x: xPct, y: yPct, id: this._nextStampId++ };
    this._stamps.push(stamp);
    const el = this._createStampEl(stamp);
    area.appendChild(el);
    this._saveStampPlacements();
  }

  _createStampEl(stamp) {
    const el = document.createElement('span');
    el.className = 'photo-stamp';
    el.textContent = stamp.emoji;
    el.dataset.stampId = stamp.id;
    el.style.left = `${stamp.x}%`;
    el.style.top  = `${stamp.y}%`;

    // ダブルタップ → 削除
    let tapCount = 0;
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      tapCount++;
      if (tapCount >= 2) {
        el.remove();
        this._stamps = this._stamps.filter(s => s.id !== stamp.id);
        this._saveStampPlacements();
        tapCount = 0;
      } else {
        setTimeout(() => { tapCount = 0; }, 400);
      }
    });

    return el;
  }

  _saveStampPlacements() {
    const placements = this._stamps.map(({ emoji, x, y }) => ({ emoji, x, y }));
    HouseManager.setPhotoSetting('stampPlacements', placements);
  }

  // ─────────────────────────────────────────────
  // 写真保存（Canvas合成 → ダウンロード）
  // ─────────────────────────────────────────────

  async _savePhoto() {
    const frame = this._container.querySelector('#photo-preview-frame');
    if (!frame) return;

    // シャッターフラッシュ演出
    const flash = document.createElement('div');
    flash.className = 'photo-shutter-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    try {
      // Canvas に描画
      const canvas  = document.createElement('canvas');
      const W = 600, H = 800;
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      const house    = GameStore.getState('house');
      const sections = house.sections || {};
      const styles   = house.layerStyles || {};
      const photo    = house.photo || {};
      const frames   = Config.HOUSE.PHOTO_FRAMES || [];
      const frameData = frames.find(f => f.id === (photo.currentFrame || 'frame_simple')) || frames[0];
      const poses    = Config.HOUSE.PHOTO_POSES || [];
      const poseData = poses.find(p => p.id === (photo.currentPose || 'normal')) || poses[0];

      // ─── 背景グラデーション ───────────────────────────
      const gradient = ctx.createLinearGradient(0, 0, 0, H);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // ─── 家レイヤー ───────────────────────────────────
      const layerH = { garden: 80, floor1: 130, floor2: 110, floor3: 100, tower: 110 };
      const totalH = Object.values(layerH).reduce((a, b) => a + b, 0); // 530
      let yOffset = (H - 80) - totalH; // フッター80px残す

      const visibleLayers = ['garden', 'floor1', 'floor2', 'floor3', 'tower']
        .filter(id => id === 'floor1' || id === 'garden' || sections[id]);

      // 下から描く（garden が一番下）
      for (const layerId of visibleLayers) {
        const styleId = styles[layerId] || 'style_wood';
        const style   = getStyleById(styleId);
        const h       = layerH[layerId] || 100;
        const lx      = 60, lw = W - 120;

        // ブロック背景
        const grad = ctx.createLinearGradient(lx, yOffset, lx + lw, yOffset + h);
        grad.addColorStop(0, style?.color || '#a0522d');
        grad.addColorStop(1, style?.colorDark || '#6b3a1f');
        ctx.fillStyle = grad;
        this._roundRect(ctx, lx, yOffset, lw, h, 12);
        ctx.fill();

        // 枠線
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1.5;
        this._roundRect(ctx, lx, yOffset, lw, h, 12);
        ctx.stroke();

        // レイヤー絵文字
        const emoji = style?.layerEmoji?.[layerId] || style?.emoji || '🏠';
        ctx.font = `${h * 0.45}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(emoji, W / 2, yOffset + h * 0.62);

        // レイヤー名
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.textAlign = 'right';
        ctx.fillText(LAYER_LABELS[layerId], lx + lw - 8, yOffset + h - 10);

        yOffset += h;
      }

      // ─── 装飾オーバーレイ（テキスト）────────────────
      if (sections.exterior && styles.decoration) {
        const decStyle = getStyleById(styles.decoration);
        if (decStyle) {
          ctx.font = '28px serif';
          ctx.textAlign = 'center';
          ctx.globalAlpha = 0.5;
          ctx.fillText(decStyle.emoji, W * 0.15, H * 0.3);
          ctx.fillText(decStyle.emoji, W * 0.85, H * 0.3);
          ctx.globalAlpha = 1;
        }
      }

      // ─── キャラクター ────────────────────────────────
      const charEmoji = '🧙';
      const charX = W - 130, charY = H - 280;
      ctx.save();
      if (poseData?.id === 'cool') {
        ctx.translate(charX + 40, charY + 60);
        ctx.rotate(-0.09);
        ctx.translate(-(charX + 40), -(charY + 60));
      } else if (poseData?.id === 'banzai') {
        ctx.translate(charX + 40, charY + 60);
        ctx.scale(1, 0.95);
        ctx.translate(-(charX + 40), -(charY + 60));
      } else if (poseData?.id === 'bow') {
        ctx.translate(charX + 40, charY + 10);
        ctx.rotate(0.44);
        ctx.translate(-(charX + 40), -(charY + 10));
      }
      ctx.font = '88px serif';
      ctx.textAlign = 'left';
      ctx.fillText(charEmoji, charX, charY + 80);
      ctx.restore();

      // ─── コンボバッジ ────────────────────────────────
      const { comboName } = HouseManager.getFullsetBonus();
      if (comboName) {
        ctx.fillStyle = 'rgba(255, 220, 0, 0.9)';
        this._roundRect(ctx, 30, 20, W - 60, 44, 22);
        ctx.fill();
        ctx.font = 'bold 20px sans-serif';
        ctx.fillStyle = '#1a1a2e';
        ctx.textAlign = 'center';
        ctx.fillText(`✨ ${comboName}`, W / 2, 48);
      }

      // ─── スタンプ ────────────────────────────────────
      const stampArea = this._container?.querySelector('#photo-stamp-area');
      if (stampArea) {
        const areaRect = stampArea.getBoundingClientRect();
        // スタンプ位置をCanvas座標に変換（簡易: % → px）
        for (const stamp of this._stamps) {
          const sx = (stamp.x / 100) * W;
          const sy = (stamp.y / 100) * H;
          ctx.font = '36px serif';
          ctx.textAlign = 'center';
          ctx.fillText(stamp.emoji, sx, sy);
        }
      }

      // ─── フッター情報 ────────────────────────────────
      const playerName = GameStore.getState('player.name') || 'プレイヤー';
      const worlds2    = GameStore.getState('progress.worlds') || {};
      const cleared2   = Object.values(worlds2).filter(w => w?.cleared).length;
      const today      = new Date().toLocaleDateString('ja-JP');

      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, H - 72, W, 72);
      ctx.font = 'bold 18px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.fillText(playerName, 16, H - 44);
      ctx.textAlign = 'center';
      ctx.fillText(`🌟 ${cleared2}/33 クリア`, W / 2, H - 44);
      ctx.textAlign = 'right';
      ctx.fillText(today, W - 16, H - 44);

      // ─── フレーム枠 ──────────────────────────────────
      ctx.strokeStyle = frameData?.color || '#fff';
      ctx.lineWidth = 12;
      this._roundRect(ctx, 6, 6, W - 12, H - 12, 16);
      ctx.stroke();
      // フレーム絵文字コーナー
      if (frameData?.emoji) {
        const fe = frameData.emoji;
        ctx.font = '28px serif';
        ctx.textAlign = 'left';
        ctx.fillText(fe, 14, 42);
        ctx.textAlign = 'right';
        ctx.fillText(fe, W - 14, 42);
        ctx.fillText(fe, W - 14, H - 14);
        ctx.textAlign = 'left';
        ctx.fillText(fe, 14, H - 14);
      }

      // ─── ダウンロード ────────────────────────────────
      const dataUrl = canvas.toDataURL('image/png');
      const link    = document.createElement('a');
      const ts      = new Date().toISOString().slice(0, 10);
      link.download = `grimoire-house-${ts}.png`;
      link.href     = dataUrl;
      link.click();

      Logger.info('[PhotoScreen] 写真ほぞん完了');
      this._showToast('📸 ほぞんしました！');

    } catch (err) {
      Logger.error('[PhotoScreen] 写真ほぞんエラー:', err);
      this._showToast('❌ ほぞんできませんでした');
    }
  }

  /** Canvas 角丸矩形ヘルパー */
  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /** トースト表示 */
  _showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'craft-result-toast toast-success';
    toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);z-index:9999;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }
}

export default PhotoScreen;
