/**
 * M1-10a-1.js - Grimoire Guardians 問題データ
 * ユニット: M1-10a-1「くりあがりのたしざん①（9のせかい）」（ひっ算 B+C）
 *
 * 対象: 小学1年生、9+□の繰り上がりたしざん
 * モード: digit-by-digit
 *
 * Step構成
 *   Step1: 9+1〜9+5（プール5問 → 5問）
 *   Step2: 9+6〜9+9（プール4問 → 4問）
 *   Step3: まじりあい（プール6問 → 6問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [
  // Step1
  { id: 'M1-10a-1-Q01', unitId: 'M1-10a-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 1, correctAnswer: '10', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q02', unitId: 'M1-10a-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 2, correctAnswer: '11', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q03', unitId: 'M1-10a-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 3, correctAnswer: '12', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q04', unitId: 'M1-10a-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 4, correctAnswer: '13', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q05', unitId: 'M1-10a-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 5, correctAnswer: '14', hitsuzanMode: 'digit-by-digit' },
  // Step2
  { id: 'M1-10a-1-Q06', unitId: 'M1-10a-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 6, correctAnswer: '15', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q07', unitId: 'M1-10a-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 7, correctAnswer: '16', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q08', unitId: 'M1-10a-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 8, correctAnswer: '17', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q09', unitId: 'M1-10a-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 9, correctAnswer: '18', hitsuzanMode: 'digit-by-digit' },
  // Step3
  { id: 'M1-10a-1-Q10', unitId: 'M1-10a-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 3, correctAnswer: '12', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q11', unitId: 'M1-10a-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 7, correctAnswer: '16', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q12', unitId: 'M1-10a-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 5, correctAnswer: '14', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q13', unitId: 'M1-10a-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 2, correctAnswer: '11', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q14', unitId: 'M1-10a-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 8, correctAnswer: '17', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10a-1-Q15', unitId: 'M1-10a-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 4, correctAnswer: '13', hitsuzanMode: 'digit-by-digit' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 4 },
  { step: 3, pick: 6 }
];

export { questions, stepConfig };
export default questions;
