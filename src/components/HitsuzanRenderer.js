/**
 * HitsuzanRenderer.js - Grimoire Guardians
 * ひっ算（筆算）表示コンポーネント
 *
 * 機能:
 *   - 縦式レイアウトの HTML 文字列を生成（2桁・3桁を自動判別）
 *   - 桁ごとの □（未回答）/ 確定済み数字を表示
 *   - 繰り上がり / 繰り下がりアニメーション（一の位→十の位、十の位→百の位）
 *   - digit-by-digit モード用の桁選択肢生成
 *   - full-answer モード用の全体選択肢生成
 *
 * 対応桁数: 2桁・3桁（operand1 >= 100 または operand2 >= 100 で自動的に3桁モード）
 *
 * @version 2.0
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

    // 一の位の繰り上がり/繰り下がり
    const hasOnesCarry  = operator === '+' && (operand1 % 10 + operand2 % 10) >= 10;
    const hasOnesBorrow = operator === '-' && (operand1 % 10) < (operand2 % 10);

    // 十の位の繰り上がり/繰り下がり（一の位の桁上がりを考慮）
    const op1Tens = Math.floor(operand1 / 10) % 10;
    const op2Tens = Math.floor(operand2 / 10) % 10;
    const hasTensCarry  = operator === '+'
      && (op1Tens + op2Tens + (hasOnesCarry ? 1 : 0)) >= 10;
    const hasTensBorrow = operator === '-'
      && (op1Tens - (hasOnesBorrow ? 1 : 0)) < op2Tens;

    // 後方互換: hasCarry / hasBorrow は一の位分
    const hasCarry  = hasOnesCarry;
    const hasBorrow = hasOnesBorrow;

    return {
      result, onesDigit, tensDigit, hundredsDigit,
      hasCarry, hasBorrow,
      hasOnesCarry, hasOnesBorrow,
      hasTensCarry, hasTensBorrow
    };
  }

  // ============================================================
  // HTML 生成
  // ============================================================

  /**
   * ひっ算ボックスの HTML 文字列を生成する
   * operand1 または operand2 が 100 以上なら自動的に3桁モードで描画する。
   *
   * state の各フィールド:
   *   'blank'  → □（未回答）
   *   number   → 確定済みの数字
   *
   * @param {number} operand1
   * @param {number} operand2
   * @param {string} operator - '+' | '-'
   * @param {{
   *   onesState?: 'blank'|number,
   *   tensState?: 'blank'|number,
   *   hundredsState?: 'blank'|number,
   *   carryVisible?: boolean,
   *   tensCarryVisible?: boolean,
   *   activeDigit?: 'ones'|'tens'|'hundreds'|null
   * }} [state]
   * @returns {string} HTML 文字列
   */
  static renderHTML(operand1, operand2, operator, state = {}) {
    const {
      onesState        = 'blank',
      tensState        = 'blank',
      hundredsState    = 'blank',
      carryVisible     = false,     // 一の位 → 十の位 の繰り上がり
      tensCarryVisible = false,     // 十の位 → 百の位 の繰り上がり
      activeDigit      = 'ones'
    } = state;

    const is3digit = operand1 >= 100 || operand2 >= 100;

    // operand1 の各桁
    const op1Hundreds = Math.floor(operand1 / 100);
    const op1Tens     = Math.floor(operand1 / 10) % 10;
    const op1Ones     = operand1 % 10;

    // operand2 の各桁
    const op2Hundreds = Math.floor(operand2 / 100);
    const op2Tens     = Math.floor(operand2 / 10) % 10;

    // 答え欄セルを生成するヘルパー
    const makeAnswerCell = (digitName, digitState) => {
      const isActive = activeDigit === digitName ? ' hitsuzan-active' : '';
      return digitState === 'blank'
        ? `<span class="hitsuzan-digit hitsuzan-blank${isActive}" data-digit="${digitName}">□</span>`
        : `<span class="hitsuzan-digit hitsuzan-confirmed" data-digit="${digitName}">${digitState}</span>`;
    };

    const onesCell     = makeAnswerCell('ones',     onesState);
    const tensCell     = makeAnswerCell('tens',     tensState);
    const hundredsCell = makeAnswerCell('hundreds', hundredsState);

    // operand1 行
    const op1HundredsCell = is3digit
      ? (op1Hundreds > 0 ? `<span class="hitsuzan-digit">${op1Hundreds}</span>`
                         : `<span class="hitsuzan-digit hitsuzan-spacer">0</span>`)
      : '';
    const op1TensCell = (is3digit || op1Tens > 0 || Math.floor(operand1 / 10) > 0)
      ? `<span class="hitsuzan-digit">${op1Tens}</span>`
      : `<span class="hitsuzan-digit hitsuzan-spacer">0</span>`;

    // operand2 行
    const op2HundredsCell = is3digit
      ? (op2Hundreds > 0 ? `<span class="hitsuzan-digit">${op2Hundreds}</span>`
                         : `<span class="hitsuzan-digit hitsuzan-spacer">0</span>`)
      : '';
    const op2TensCell = (is3digit || operand2 >= 10)
      ? `<span class="hitsuzan-digit">${op2Tens}</span>`
      : `<span class="hitsuzan-digit hitsuzan-spacer">0</span>`;

    // 繰り上がり行（3桁は2か所、2桁は1か所）
    const carryHidden      = carryVisible     ? 'carry-appear' : 'hidden';
    const tensCarryHidden  = tensCarryVisible ? 'carry-appear' : 'hidden';

    const carryRow = is3digit
      ? `<div class="hitsuzan-carry-row">
           <span class="hitsuzan-carry-num ${tensCarryHidden}" data-carry="tens">1</span>
           <span class="hitsuzan-carry-num ${carryHidden}"     data-carry="ones">1</span>
         </div>`
      : `<div class="hitsuzan-carry-row">
           <span class="hitsuzan-carry-num ${carryHidden}" data-carry="ones">1</span>
         </div>`;

    // 答え行
    const answerRow = is3digit
      ? `${hundredsCell}${tensCell}${onesCell}`
      : `${tensCell}${onesCell}`;

    return `
      <div class="hitsuzan-box">
        ${carryRow}
        <div class="hitsuzan-row">
          ${op1HundredsCell}
          ${op1TensCell}
          <span class="hitsuzan-digit">${op1Ones}</span>
        </div>
        <div class="hitsuzan-row">
          <span class="hitsuzan-operator">${operator === '+' ? '＋' : '－'}</span>
          ${op2HundredsCell}
          ${op2TensCell}
          <span class="hitsuzan-digit">${operand2 % 10}</span>
        </div>
        <div class="hitsuzan-line"></div>
        <div class="hitsuzan-row hitsuzan-answer-row">
          ${answerRow}
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
   * 一の位 → 十の位 の繰り上がりをアニメーション付きで表示する
   * （data-carry="ones" の要素を対象にする）
   *
   * @param {HTMLElement} containerEl
   */
  static showCarry(containerEl) {
    const carry = containerEl.querySelector('[data-carry="ones"]');
    if (!carry) return;
    carry.classList.remove('hidden');
    carry.classList.remove('carry-appear');
    void carry.offsetHeight;
    carry.classList.add('carry-appear');
  }

  /**
   * 十の位 → 百の位 の繰り上がりをアニメーション付きで表示する
   * （data-carry="tens" の要素を対象にする）
   *
   * @param {HTMLElement} containerEl
   */
  static showTensCarry(containerEl) {
    const carry = containerEl.querySelector('[data-carry="tens"]');
    if (!carry) return;
    carry.classList.remove('hidden');
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

  /**
   * 百の位の□をアクティブ（点滅）状態にする
   *
   * @param {HTMLElement} containerEl
   */
  static activateHundreds(containerEl) {
    const tensCell     = containerEl.querySelector('[data-digit="tens"]');
    const hundredsCell = containerEl.querySelector('[data-digit="hundreds"]');
    if (tensCell)     tensCell.classList.remove('hitsuzan-active');
    if (hundredsCell) hundredsCell.classList.add('hitsuzan-active');
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
