/**
 * M1-14c-3dig.js - Grimoire Guardians 問題データ
 * ユニット: M1-14c-3dig「3桁のたしざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 3桁のたしざん（繰り上がりなし・あり）
 * モード: digit-by-digit のみ（暗算困難のため full-answer なし）
 *
 * Step構成
 *   Step1: 3桁+1桁（繰り上がりなし）（プール6問 → 5問）
 *   Step2: 3桁+2桁（繰り上がりなし）（プール6問 → 5問）
 *   Step3: 3桁+2桁（繰り上がりあり）（プール7問 → 5問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [

  // Step1: 3桁+1桁（繰り上がりなし）
  { id: 'M1-14c-3dig-Q01', unitId: 'M1-14c-3dig', step: 1, type: 'hitsuzan', operator: '+', operand1: 123, operand2: 4, correctAnswer: '127', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q02', unitId: 'M1-14c-3dig', step: 1, type: 'hitsuzan', operator: '+', operand1: 231, operand2: 5, correctAnswer: '236', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q03', unitId: 'M1-14c-3dig', step: 1, type: 'hitsuzan', operator: '+', operand1: 342, operand2: 3, correctAnswer: '345', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q04', unitId: 'M1-14c-3dig', step: 1, type: 'hitsuzan', operator: '+', operand1: 413, operand2: 6, correctAnswer: '419', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q05', unitId: 'M1-14c-3dig', step: 1, type: 'hitsuzan', operator: '+', operand1: 521, operand2: 7, correctAnswer: '528', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q06', unitId: 'M1-14c-3dig', step: 1, type: 'hitsuzan', operator: '+', operand1: 630, operand2: 8, correctAnswer: '638', hitsuzanMode: 'digit-by-digit' },

  // Step2: 3桁+2桁（繰り上がりなし）
  { id: 'M1-14c-3dig-Q07', unitId: 'M1-14c-3dig', step: 2, type: 'hitsuzan', operator: '+', operand1: 123, operand2: 45, correctAnswer: '168', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q08', unitId: 'M1-14c-3dig', step: 2, type: 'hitsuzan', operator: '+', operand1: 234, operand2: 53, correctAnswer: '287', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q09', unitId: 'M1-14c-3dig', step: 2, type: 'hitsuzan', operator: '+', operand1: 312, operand2: 46, correctAnswer: '358', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q10', unitId: 'M1-14c-3dig', step: 2, type: 'hitsuzan', operator: '+', operand1: 421, operand2: 35, correctAnswer: '456', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q11', unitId: 'M1-14c-3dig', step: 2, type: 'hitsuzan', operator: '+', operand1: 503, operand2: 64, correctAnswer: '567', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q12', unitId: 'M1-14c-3dig', step: 2, type: 'hitsuzan', operator: '+', operand1: 611, operand2: 27, correctAnswer: '638', hitsuzanMode: 'digit-by-digit' },

  // Step3: 3桁+2桁（繰り上がりあり）
  { id: 'M1-14c-3dig-Q13', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 123, operand2: 48, correctAnswer: '171', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q14', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 234, operand2: 57, correctAnswer: '291', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q15', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 345, operand2: 76, correctAnswer: '421', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q16', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 456, operand2: 68, correctAnswer: '524', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q17', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 527, operand2: 84, correctAnswer: '611', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q18', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 638, operand2: 75, correctAnswer: '713', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14c-3dig-Q19', unitId: 'M1-14c-3dig', step: 3, type: 'hitsuzan', operator: '+', operand1: 749, operand2: 83, correctAnswer: '832', hitsuzanMode: 'digit-by-digit' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
