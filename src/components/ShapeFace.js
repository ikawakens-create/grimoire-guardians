/**
 * ShapeFace.js - Grimoire Guardians
 * 形問題用 SVG レンダラー
 *
 * 問題の選択肢に立体・平面の形を SVG で表示するコンポーネント。
 * ClockFace.js と同じ設計パターン（静的クラス）を採用。
 *
 * 対応する形:
 *   立体（M1-13 かたちあそび）: box（はこ）/ sphere（まる）/ cylinder（つつ）
 *   平面（M1-13b かたちづくり）: triangle（さんかく）/ square（しかく）/ circle（まる）
 *
 * @version 1.0
 * @date 2026-03-13
 */

export class ShapeFace {

  /**
   * 選択肢テキストから形キーへのマッピング。
   * distractorPool に含まれるすべての選択肢テキストを網羅することで
   * 「1つだけ形なし・テキストのみ」という見た目の崩れを防ぐ。
   *
   * ※ M1-13 の「まるの　かたち」と M1-13b の「まる」は
   *    テキストが異なるため衝突しない。
   */
  static textToKey(text) {
    return ShapeFace._TEXT_MAP[text] ?? null;
  }

  /**
   * 形キーから SVG HTML 文字列を生成する。
   * 未知のキー・null の場合はフォールバック（？マーク）を返す。
   *
   * @param {string|null} shapeKey - 形キー
   * @param {number} [size=120] - SVG の表示サイズ（px）
   * @returns {string} SVG HTML 文字列
   *
   * @example
   * ShapeFace.renderSVG('box', 100);
   * ShapeFace.renderSVG(ShapeFace.textToKey('はこの　かたち'));
   */
  static renderSVG(shapeKey, size = 120) {
    switch (shapeKey) {
      case 'box':      return ShapeFace._box(size);
      case 'sphere':   return ShapeFace._sphere(size);
      case 'cylinder': return ShapeFace._cylinder(size);
      case 'triangle': return ShapeFace._triangle(size);
      case 'square':   return ShapeFace._square(size);
      case 'circle':   return ShapeFace._circle(size);
      default:         return ShapeFace._fallback(size);
    }
  }

  // ─── 内部ヘルパー ────────────────────────────────────────────

  /** @private SVG ラッパー */
  static _wrap(inner, size, ariaLabel) {
    return (
      `<svg viewBox="0 0 120 120" width="${size}" height="${size}" ` +
      `xmlns="http://www.w3.org/2000/svg" aria-label="${ariaLabel}" role="img">` +
      inner +
      `</svg>`
    );
  }

  // ─── 立体図形 ────────────────────────────────────────────────

  /** @private はこの かたち（直方体・アイソメトリック風） */
  static _box(size) {
    const s =
      // 上面（明るい黄色）
      `<polygon points="15,42 85,42 100,22 30,22" fill="#fad9a0" stroke="#8b5c2a" stroke-width="2.5" stroke-linejoin="round"/>` +
      // 正面（オレンジ）
      `<polygon points="15,42 85,42 85,97 15,97" fill="#f6a84e" stroke="#8b5c2a" stroke-width="2.5" stroke-linejoin="round"/>` +
      // 右面（濃いオレンジ）
      `<polygon points="85,42 100,22 100,77 85,97" fill="#d97c20" stroke="#8b5c2a" stroke-width="2.5" stroke-linejoin="round"/>`;
    return ShapeFace._wrap(s, size, 'はこのかたち');
  }

  /** @private まるの かたち（球体・ボール） */
  static _sphere(size) {
    const s =
      // 影（ぼかし代わりの暗い円）
      `<circle cx="62" cy="65" r="46" fill="#1a5fa8" opacity="0.18"/>` +
      // 本体（青）
      `<circle cx="60" cy="60" r="46" fill="#4a9ef5" stroke="#1e6fc4" stroke-width="2.5"/>` +
      // ハイライト（大・白半透明）
      `<ellipse cx="44" cy="42" rx="14" ry="10" fill="white" opacity="0.35"/>` +
      // ハイライト（小・白）
      `<ellipse cx="40" cy="39" rx="7" ry="5" fill="white" opacity="0.65"/>`;
    return ShapeFace._wrap(s, size, 'まるのかたち（ボール）');
  }

  /** @private つつの かたち（円柱・かん） */
  static _cylinder(size) {
    const s =
      // 底面（暗い緑）
      `<ellipse cx="60" cy="93" rx="38" ry="11" fill="#2e9b65" stroke="#1a6b45" stroke-width="2"/>` +
      // 胴体（中間の緑）
      `<rect x="22" y="30" width="76" height="63" fill="#5ecb87"/>` +
      // 胴体の輪郭線（左右）
      `<line x1="22" y1="30" x2="22" y2="93" stroke="#1a6b45" stroke-width="2.5"/>` +
      `<line x1="98" y1="30" x2="98" y2="93" stroke="#1a6b45" stroke-width="2.5"/>` +
      // 上面（明るい緑）
      `<ellipse cx="60" cy="30" rx="38" ry="11" fill="#85dba5" stroke="#1a6b45" stroke-width="2.5"/>` +
      // ハイライト
      `<ellipse cx="50" cy="27" rx="12" ry="4" fill="white" opacity="0.4"/>`;
    return ShapeFace._wrap(s, size, 'つつのかたち');
  }

  // ─── 平面図形 ────────────────────────────────────────────────

  /** @private さんかく（正三角形） */
  static _triangle(size) {
    const s =
      // 影
      `<polygon points="62,15 112,107 12,107" fill="#c0246a" opacity="0.18"/>` +
      // 本体（ピンク）
      `<polygon points="60,12 110,105 10,105" fill="#f06292" stroke="#c0246a" stroke-width="3" stroke-linejoin="round"/>` +
      // ハイライト（上部の淡い三角）
      `<polygon points="60,18 82,58 38,58" fill="white" opacity="0.2"/>`;
    return ShapeFace._wrap(s, size, 'さんかく');
  }

  /** @private しかく（正方形） */
  static _square(size) {
    const s =
      // 影
      `<rect x="19" y="21" width="84" height="84" rx="5" fill="#c49a00" opacity="0.18"/>` +
      // 本体（黄色）
      `<rect x="17" y="17" width="84" height="84" rx="5" fill="#fdd835" stroke="#c49a00" stroke-width="3"/>` +
      // ハイライト（左上の淡い四角）
      `<rect x="21" y="21" width="36" height="36" rx="4" fill="white" opacity="0.22"/>`;
    return ShapeFace._wrap(s, size, 'しかく');
  }

  /** @private まる（円） */
  static _circle(size) {
    const s =
      // 影
      `<circle cx="62" cy="63" r="48" fill="#7b31c8" opacity="0.18"/>` +
      // 本体（紫）
      `<circle cx="60" cy="60" r="48" fill="#ab47bc" stroke="#7b31c8" stroke-width="3"/>` +
      // ハイライト（大）
      `<ellipse cx="44" cy="43" rx="14" ry="10" fill="white" opacity="0.3"/>` +
      // ハイライト（小）
      `<ellipse cx="40" cy="40" rx="7" ry="5" fill="white" opacity="0.6"/>`;
    return ShapeFace._wrap(s, size, 'まる');
  }

  /** @private 未知の形キー用フォールバック */
  static _fallback(size) {
    const s =
      `<circle cx="60" cy="60" r="52" fill="#eeeeee" stroke="#cccccc" stroke-width="3"/>` +
      `<text x="60" y="60" text-anchor="middle" dominant-baseline="central" ` +
      `font-size="44" font-family="sans-serif" fill="#aaaaaa">?</text>`;
    return ShapeFace._wrap(s, size, 'かたち');
  }
}

/** @private テキスト → 形キー のマッピング（ShapeFace クラス外で定義） */
ShapeFace._TEXT_MAP = {
  // M1-13 かたちあそび（立体）
  'はこの　かたち': 'box',
  'まるの　かたち': 'sphere',
  'つつの　かたち': 'cylinder',
  // M1-13b かたちづくり（平面）
  'さんかく': 'triangle',
  'しかく':   'square',
  'まる':     'circle',
};

export default ShapeFace;
