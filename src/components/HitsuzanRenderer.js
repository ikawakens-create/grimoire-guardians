/**
 * HitsuzanRenderer.js - Grimoire Guardians
 * ひっ算（筆算）表示コンポーネント
 *
 * 機能:
 *   - 縦式レイアウトの HTML 文字列を生成
 *   - 桁ごとの □（未回答）/ 確定済み数字を表示
 *   - 繰り上がり / 繰り下がりアニメーション
 *   - digit-by-digit モード用の桁選択肢生成
 *   - full-answer モード用の全体選択肢生成
 *
 * 対応桁数: 最大3桁の計算結果まで
 *
 * @version 1.0
 * @date 2026-03-22
 */

export class HitsuzanRenderer {

  // ============================================================
  // 計算ロジック
  // ============================================================

  /**
   * 計算結果と桁情報を返す
   *
   * @param {number} operand1 - 上の数
   * @param {number} operand2 - 下の数
   * @param {string} operator - '+' | '-'
   * @returns {{
   *   result: number,
   *   onesDigit: number,
   *   tensDigit: number,
   *   hundredsDigit: number,
   *   hasCarry: boolean,
   *   hasBorrow: boolean
   * }}
   */
  static compute(operand1, operand2, operator) {
    const result = operator === '+' ? operand1 + operand2 : operand1 - operand2;

    const onesDigit     = result % 10;
    const tensDigit     = Math.floor(result / 10) % 10;
    const hundredsDigit = Math.floor(result / 100);

    // 繰り上がり: 一の位どうしの合計が 10 以上
    const hasCarry  = operator === '+' && (operand1 % 10 + operand2 % 10) >= 10;
    // 繰り下がり: 引かれる一の位が引く一の位より小さい
    const hasBorrow = operator === '-' && (operand1 % 10) < (operand2 % 10);

    return { result, onesDigit, tensDigit, hundredsDigit, hasCarry, hasBorrow };
  }

  // ============================================================
  // HTML 生成
  // ============================================================

  /**
   * ひっ算ボックスの HTML 文字列を生成する
   *
   * state.onesState / tensState:
   *   'blank'  → □（未回答）
   *   number   → 確定済みの数字
   *
   * @param {number} operand1
   * @param {number} operand2
   * @param {string} operator - '+' | '-'
   * @param {{
   *   onesState?: 'blank'|number,
   *   tensState?: 'blank'|number,
   *   carryVisible?: boolean,
   *   activeDigit?: 'ones'|'tens'|null
   * }} [state]
   * @returns {string} HTML 文字列
   */
  static renderHTML(operand1, operand2, operator, state = {}) {
    const {
      onesState    = 'blank',
      tensState    = 'blank',
      carryVisible = false,
      activeDigit  = 'ones'
    } = state;

    const { hasCarry, hasBorrow } = this.compute(operand1, operand2, operator);

    // operand1 の桁
    const op1Tens = Math.floor(operand1 / 10);
    const op1Ones = operand1 % 10;

    // operand2 の桁（1桁か2桁か）
    const op2Tens       = Math.floor(operand2 / 10);
    const hasTwoDigitOp2 = operand2 >= 10;

    // キャリー/ボロー表示
    const carryHidden = carryVisible ? '' : 'hidden';
    const carryLabel  = operator === '+' ? '1' : '1';

    // 答え欄の一の位セル
    const onesActive = activeDigit === 'ones' ? ' hitsuzan-active' : '';
    const onesCell = onesState === 'blank'
      ? `<span class="hitsuzan-digit hitsuzan-blank${onesActive}" data-digit="ones">□</span>`
      : `<span class="hitsuzan-digit hitsuzan-confirmed" data-digit="ones">${onesState}</span>`;

    // 答え欄の十の位セル
    const tensActive = activeDigit === 'tens' ? ' hitsuzan-active' : '';
    const tensCell = tensState === 'blank'
      ? `<span class="hitsuzan-digit hitsuzan-blank${tensActive}" data-digit="tens">□</span>`
      : `<span class="hitsuzan-digit hitsuzan-confirmed" data-digit="tens">${tensState}</span>`;

    // operand2 の十の位セル（1桁なら空白スペーサー）
    const op2TensCell = hasTwoDigitOp2
      ? `<span class="hitsuzan-digit">${op2Tens}</span>`
      : `<span class="hitsuzan-digit hitsuzan-spacer">0</span>`;

    // operand1 の十の位セル（1桁の場合はスペーサー）
    const op1TensCell = op1Tens > 0
      ? `<span class="hitsuzan-digit">${op1Tens}</span>`
      : `<span class="hitsuzan-digit hitsuzan-spacer">0</span>`;

    return `
      <div class="hitsuzan-box">
        <!-- 繰り上がり/繰り下がり行 -->
        <div class="hitsuzan-carry-row">
          <span class="hitsuzan-carry-num ${carryHidden}">${carryLabel}</span>
        </div>
        <!-- 上の数（operand1）行 -->
        <div class="hitsuzan-row">
          ${op1TensCell}
          <span class="hitsuzan-digit">${op1Ones}</span>
        </div>
        <!-- 演算子 + 下の数（operand2）行 -->
        <div class="hitsuzan-row">
          <span class="hitsuzan-operator">${operator === '+' ? '＋' : '－'}</span>
          ${op2TensCell}
          <span class="hitsuzan-digit">${operand2 % 10}</span>
        </div>
        <!-- 横線 -->
        <div class="hitsuzan-line"></div>
        <!-- 答え行 -->
        <div class="hitsuzan-row hitsuzan-answer-row">
          ${tensCell}
          ${onesCell}
        </div>
      </div>
    `;
  }

  // ============================================================
  // DOM 操作（既存要素への更新）
  // ============================================================

  /**
   * 特定の桁を確定済み数字に更新する
   *
   * @param {HTMLElement} containerEl - .hitsuzan-box を含む親要素
   * @param {'ones'|'tens'} digit
   * @param {number} value
   */
  static fillDigit(containerEl, digit, value) {
    const cell = containerEl.querySelector(`[data-digit="${digit}"]`);
    if (!cell) return;
    cell.textContent = String(value);
    cell.classList.remove('hitsuzan-blank', 'hitsuzan-active');
    cell.classList.add('hitsuzan-confirmed', 'hitsuzan-fill-in');
  }

  /**
   * 繰り上がり / 繰り下がりをアニメーション付きで表示する
   *
   * @param {HTMLElement} containerEl
   */
  static showCarry(containerEl) {
    const carry = containerEl.querySelector('.hitsuzan-carry-num');
    if (!carry) return;
    carry.classList.remove('hidden');
    // アニメーションリセット → 再生
    carry.classList.remove('carry-appear');
    void carry.offsetHeight;
    carry.classList.add('carry-appear');
  }

  /**
   * 十の位の□をアクティブ（点滅）状態にする
   *
   * @param {HTMLElement} containerEl
   */
  static activateTens(containerEl) {
    const onesCell = containerEl.querySelector('[data-digit="ones"]');
    const tensCell = containerEl.querySelector('[data-digit="tens"]');
    if (onesCell) onesCell.classList.remove('hitsuzan-active');
    if (tensCell) tensCell.classList.add('hitsuzan-active');
  }

  // ============================================================
  // 選択肢生成
  // ============================================================

  /**
   * 桁選択肢を生成する（digit-by-digit モード用）
   * 正解の桁 ± ランダムな誤答で 4択を作る
   *
   * @param {number} correctDigit - 正解の桁（0〜9）
   * @param {number} [count=4]    - 選択肢数
   * @returns {string[]} シャッフル済み選択肢文字列配列
   */
  static generateDigitChoices(correctDigit, count = 4) {
    const candidates = new Set([correctDigit]);
    // 0〜9 から正解を除いた候補をシャッフル
    const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => n !== correctDigit);
    for (let i = range.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [range[i], range[j]] = [range[j], range[i]];
    }
    range.slice(0, count - 1).forEach(n => candidates.add(n));

    const arr = Array.from(candidates);
    // 全体をシャッフル（正解位置をランダム化）
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.map(String);
  }

  /**
   * 全体選択肢を生成する（full-answer モード用）
   * 正解の数値に近い誤答を 4択で生成する
   *
   * @param {number} correctAnswer - 正解の数値
   * @param {number} [count=4]     - 選択肢数
   * @returns {string[]} シャッフル済み選択肢文字列配列
   */
  static generateFullChoices(correctAnswer, count = 4) {
    const candidates = new Set([correctAnswer]);
    // ±1〜3, ±10, ±11 の範囲で誤答候補を生成
    const deltas = [1, -1, 2, -2, 3, -3, 10, -10, 11, -11, 9, -9];
    const shuffledDeltas = [...deltas].sort(() => Math.random() - 0.5);

    for (const d of shuffledDeltas) {
      if (candidates.size >= count) break;
      const candidate = correctAnswer + d;
      if (candidate >= 0 && !candidates.has(candidate)) {
        candidates.add(candidate);
      }
    }

    // 足りなければ正解+連番で補充
    let extra = correctAnswer + 1;
    while (candidates.size < count) {
      if (!candidates.has(extra) && extra >= 0) candidates.add(extra);
      extra++;
    }

    const arr = Array.from(candidates);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.map(String);
  }
}

export default HitsuzanRenderer;
