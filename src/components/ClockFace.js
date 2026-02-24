/**
 * ClockFace.js - Grimoire Guardians
 * SVGアナログ時計コンポーネント
 *
 * 時刻を受け取り、アナログ時計のSVG文字列を生成する。
 * 外部ライブラリ不要・純粋なSVGコードで描画する。
 *
 * 対象: 小学1年生（時計の読み方学習）
 *   - 1〜12の数字付き盤面
 *   - 太い時針（短針）・細い分針（長針）で視覚的に区別しやすい
 *   - 目盛り線（5分単位は太く・長く）
 *
 * @version 1.0
 * @date 2026-02-24
 */

export class ClockFace {
  /**
   * 指定した時刻のSVGアナログ時計文字列を生成する
   *
   * @param {number} hour   - 時（1〜12 または 0〜23、24時間制も受け付ける）
   * @param {number} minute - 分（0〜59）
   * @param {number} [size=180] - SVGの表示サイズ（px）
   * @returns {string} SVG HTML文字列
   *
   * @example
   * // 3時ちょうどの時計
   * ClockFace.renderSVG(3, 0);
   *
   * // 9時30分の時計（180pxで描画）
   * ClockFace.renderSVG(9, 30, 180);
   */
  static renderSVG(hour, minute, size = 180) {
    const cx = 100;
    const cy = 100;
    const faceRadius = 90;  // 盤面の半径

    // 時針の角度（度）: 時 × 30 + 分 × 0.5（分の影響を加味）
    // 12時位置を0度とし、-90度のオフセット（Math.cosで12時が上になるよう調整）
    const hourAngle  = ((hour % 12) * 30 + minute * 0.5 - 90) * (Math.PI / 180);
    // 分針の角度（度）: 分 × 6
    const minuteAngle = (minute * 6 - 90) * (Math.PI / 180);

    // 時針（短針）の先端座標
    const hourLen = 52;
    const hourX = cx + hourLen * Math.cos(hourAngle);
    const hourY = cy + hourLen * Math.sin(hourAngle);

    // 分針（長針）の先端座標
    const minuteLen = 73;
    const minuteX = cx + minuteLen * Math.cos(minuteAngle);
    const minuteY = cy + minuteLen * Math.sin(minuteAngle);

    // 1〜12の数字を盤面に配置（半径70の円上）
    const numRadius = 70;
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x = cx + numRadius * Math.cos(angle);
      const y = cy + numRadius * Math.sin(angle);
      numbers.push(
        `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" ` +
        `text-anchor="middle" dominant-baseline="central" ` +
        `font-family="'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" ` +
        `font-size="13" font-weight="bold" fill="#2a2a2a">${i}</text>`
      );
    }

    // 目盛り線（60本: 5分単位は太く長く、それ以外は細く短く）
    const ticks = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * (Math.PI / 180);
      const isHourTick = i % 5 === 0;
      const outerR = faceRadius - 3;
      const innerR = isHourTick ? faceRadius - 13 : faceRadius - 7;
      const x1 = cx + outerR * Math.cos(angle);
      const y1 = cy + outerR * Math.sin(angle);
      const x2 = cx + innerR * Math.cos(angle);
      const y2 = cy + innerR * Math.sin(angle);
      ticks.push(
        `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
        `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" ` +
        `stroke="${isHourTick ? '#555' : '#bbb'}" ` +
        `stroke-width="${isHourTick ? 2.5 : 1}" stroke-linecap="round"/>`
      );
    }

    // SVG文字列を組み立てて返す
    return (
      `<svg viewBox="0 0 200 200" width="${size}" height="${size}" ` +
      `xmlns="http://www.w3.org/2000/svg" aria-label="とけい ${hour}じ${minute > 0 ? minute + 'ふん' : ''}">` +

      // --- 外枠（飾り枠） ---
      `<circle cx="${cx}" cy="${cy}" r="${faceRadius + 6}" fill="#d4c9a8" stroke="#7a6a4a" stroke-width="3"/>` +

      // --- 盤面（白） ---
      `<circle cx="${cx}" cy="${cy}" r="${faceRadius}" fill="white" stroke="#9a8a6a" stroke-width="2"/>` +

      // --- 目盛り線 ---
      ticks.join('') +

      // --- 数字 ---
      numbers.join('') +

      // --- 時針（太く短い） ---
      `<line x1="${cx}" y1="${cy}" ` +
      `x2="${hourX.toFixed(1)}" y2="${hourY.toFixed(1)}" ` +
      `stroke="#1a1a1a" stroke-width="7" stroke-linecap="round"/>` +

      // --- 分針（細く長い） ---
      `<line x1="${cx}" y1="${cy}" ` +
      `x2="${minuteX.toFixed(1)}" y2="${minuteY.toFixed(1)}" ` +
      `stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>` +

      // --- 中心ドット ---
      `<circle cx="${cx}" cy="${cy}" r="7" fill="#c0392b"/>` +
      `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#1a1a1a"/>` +

      `</svg>`
    );
  }
}

export default ClockFace;
