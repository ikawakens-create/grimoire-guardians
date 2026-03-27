/**
 * ShipRenderer.js - Grimoire Guardians
 * 船の見た目を PNG レイヤー合成で描画するコンポーネント
 *
 * 用途:
 *   - ShipBuildScreen: メインプレビュー（large 表示）
 *   - BookshelfScreen: ミニプレビュー（small 表示）
 *   - 将来の QuizScreen 演出
 *
 * @version 1.0
 * @date 2026-03-28
 */

import { SLOT_ORDER } from '../data/shipItems.js';

// オーラエフェクトの CSS クラス名マップ
const OURA_CLASS = {
  fire:   'ship-oura-fire',
  bubble: 'ship-oura-bubble',
  star:   'ship-oura-star',
  fog:    'ship-oura-fog',
};

// renderMini の LRU キャッシュ（最大 20 エントリ）
const _miniCache = new Map();
const MINI_CACHE_MAX = 20;

/**
 * @param {string} key
 * @param {HTMLCanvasElement} canvas
 */
function _cacheSet(key, canvas) {
  if (_miniCache.size >= MINI_CACHE_MAX) {
    // 最も古いエントリを削除（Map は挿入順を保持）
    _miniCache.delete(_miniCache.keys().next().value);
  }
  _miniCache.set(key, canvas);
}

class ShipRenderer {
  /**
   * @param {Object} shipState   - GameStore の ship 状態スナップショット
   * @param {'small'|'medium'|'large'} displaySize - 表示サイズ
   */
  constructor(shipState, displaySize) {
    this._state       = shipState;
    this._displaySize = displaySize;
  }

  // ─────────────────────────────────────────────
  // 公開メソッド
  // ─────────────────────────────────────────────

  /**
   * 同期 HTML 生成（初回マウント用）
   * @returns {HTMLElement}
   */
  render() {
    const el = document.createElement('div');
    el.className = `ship-renderer ship-renderer-${this._displaySize}`;
    el.setAttribute('data-size', this._displaySize);
    el.innerHTML = this._buildInnerHTML(this._state);
    this._attachErrorHandlers(el);
    return el;
  }

  /**
   * 差分更新（再描画を最小化）
   * @param {Object} newShipState
   * @param {HTMLElement} container - render() が返した要素
   */
  update(newShipState, container) {
    if (!container) return;

    // PNG スロット差分更新
    const SLOTS = ['katachi', 'senbi', 'senshu', 'suishin', 'hata'];
    SLOTS.forEach(slot => {
      const newPartId = newShipState[slot];
      const img = container.querySelector(`.ship-layer-${slot}`);
      if (!img) return;

      const newSrc = newPartId
        ? `assets/ships/${slot}/${newPartId}.png`
        : '';

      if (img.getAttribute('data-src') !== newSrc) {
        img.setAttribute('data-src', newSrc);
        if (newSrc) {
          img.src = newSrc;
          img.hidden = false;
        } else {
          img.src = '';
          img.hidden = true;
        }
      }
    });

    // オーラ差分更新
    const ouraEl = container.querySelector('.ship-layer-oura');
    if (ouraEl) {
      const ouraClass = newShipState.oura
        ? `ship-layer ship-layer-oura ${OURA_CLASS[newShipState.oura] ?? ''}`
        : 'ship-layer ship-layer-oura';
      ouraEl.className = ouraClass;
    }

    this._state = newShipState;
  }

  // ─────────────────────────────────────────────
  // 静的メソッド
  // ─────────────────────────────────────────────

  /**
   * ミニプレビュー用 Canvas 描画（LRU キャッシュ付き）
   * @param {Object} shipState
   * @param {number} width
   * @param {number} height
   * @returns {Promise<HTMLCanvasElement>}
   */
  static async renderMini(shipState, width, height) {
    const cacheKey = `${JSON.stringify(shipState)}_${width}x${height}`;
    if (_miniCache.has(cacheKey)) {
      // LRU: 使ったエントリを末尾へ移動
      const cached = _miniCache.get(cacheKey);
      _miniCache.delete(cacheKey);
      _miniCache.set(cacheKey, cached);
      return cached;
    }

    const canvas  = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    const ctx     = canvas.getContext('2d');

    // 水面背景
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#56CCF2');
    grad.addColorStop(1, '#1565C0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // PNG スロットを順番に描画
    const SLOTS = ['katachi', 'senbi', 'senshu', 'suishin', 'hata'];
    for (const slot of SLOTS) {
      const partId = shipState[slot];
      if (!partId) continue;
      try {
        const img = await ShipRenderer._loadImage(`assets/ships/${slot}/${partId}.png`);
        ctx.drawImage(img, 0, 0, width, height);
      } catch {
        // 画像がない場合はスキップ
      }
    }

    _cacheSet(cacheKey, canvas);
    return canvas;
  }

  // ─────────────────────────────────────────────
  // プライベート
  // ─────────────────────────────────────────────

  /**
   * 内部 HTML を生成する
   * @param {Object} ship
   * @returns {string}
   */
  _buildInnerHTML(ship) {
    const layers = [];

    // z0: 水面（CSS のみ）
    layers.push('<div class="ship-layer ship-layer-water"></div>');

    // z1〜z5: PNG スロット（SLOT_ORDER の oura を除く順で）
    const PNG_SLOTS = SLOT_ORDER.filter(s => s !== 'oura');
    for (const slot of PNG_SLOTS) {
      const partId = ship[slot];
      if (partId) {
        const src = `assets/ships/${slot}/${partId}.png`;
        layers.push(
          `<img class="ship-layer ship-layer-${slot}"` +
          ` src="${src}"` +
          ` data-src="${src}"` +
          ` alt="" loading="lazy">`
        );
      } else {
        layers.push(
          `<img class="ship-layer ship-layer-${slot}"` +
          ` src="" data-src="" alt="" hidden>`
        );
      }
    }

    // z6: オーラ（CSS エフェクト）
    const ouraClass = ship.oura
      ? `ship-layer ship-layer-oura ${OURA_CLASS[ship.oura] ?? ''}`
      : 'ship-layer ship-layer-oura';
    layers.push(`<div class="${ouraClass}"></div>`);

    return layers.join('');
  }

  /**
   * img 要素に onerror ハンドラを設定（404 時は非表示にして壊れレイアウトを防ぐ）
   * @param {HTMLElement} container
   */
  _attachErrorHandlers(container) {
    container.querySelectorAll('img.ship-layer').forEach(img => {
      img.addEventListener('error', () => {
        img.src   = '';
        img.hidden = true;
      });
    });
  }

  /**
   * 画像をロードして返す（キャッシュなし・renderMini 専用）
   * @param {string} src
   * @returns {Promise<HTMLImageElement>}
   */
  static _loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error(`画像ロード失敗: ${src}`));
      img.src = src;
    });
  }
}

export default ShipRenderer;
