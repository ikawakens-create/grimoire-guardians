/**
 * M1-14d-3dig.js - Grimoire Guardians 問題データ
 * ユニット: M1-14d-3dig「3桁のひきざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 3桁のひきざん（繰り下がりなし・あり）
 * モード: digit-by-digit のみ（暗算困難のため full-answer なし）
 *
 * Step構成
 *   Step1: 3桁-1桁（繰り下がりなし）（プール6問 → 5問）
 *   Step2: 3桁-2桁（繰り下がりなし）（プール6問 → 5問）
 *   Step3: 3桁-2桁（繰り下がりあり）（プール7問 → 5問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [

  // Step1: 3桁-1桁（繰り下がりなし）
  { id: 'M1-14d-3dig-Q01', unitId: 'M1-14d-3dig', step: 1, type: 'hitsuzan', operator: '-', operand1: 127, operand2: 4, correctAnswer: '123', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q02', unitId: 'M1-14d-3dig', step: 1, type: 'hitsuzan', operator: '-', operand1: 236, operand2: 5, correctAnswer: '231', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q03', unitId: 'M1-14d-3dig', step: 1, type: 'hitsuzan', operator: '-', operand1: 345, operand2: 3, correctAnswer: '342', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q04', unitId: 'M1-14d-3dig', step: 1, type: 'hitsuzan', operator: '-', operand1: 419, operand2: 6, correctAnswer: '413', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q05', unitId: 'M1-14d-3dig', step: 1, type: 'hitsuzan', operator: '-', operand1: 528, operand2: 7, correctAnswer: '521', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q06', unitId: 'M1-14d-3dig', step: 1, type: 'hitsuzan', operator: '-', operand1: 638, operand2: 8, correctAnswer: '630', hitsuzanMode: 'digit-by-digit' },

  // Step2: 3桁-2桁（繰り下がりなし）
  { id: 'M1-14d-3dig-Q07', unitId: 'M1-14d-3dig', step: 2, type: 'hitsuzan', operator: '-', operand1: 168, operand2: 45, correctAnswer: '123', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q08', unitId: 'M1-14d-3dig', step: 2, type: 'hitsuzan', operator: '-', operand1: 287, operand2: 53, correctAnswer: '234', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q09', unitId: 'M1-14d-3dig', step: 2, type: 'hitsuzan', operator: '-', operand1: 358, operand2: 46, correctAnswer: '312', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q10', unitId: 'M1-14d-3dig', step: 2, type: 'hitsuzan', operator: '-', operand1: 456, operand2: 35, correctAnswer: '421', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q11', unitId: 'M1-14d-3dig', step: 2, type: 'hitsuzan', operator: '-', operand1: 567, operand2: 64, correctAnswer: '503', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q12', unitId: 'M1-14d-3dig', step: 2, type: 'hitsuzan', operator: '-', operand1: 638, operand2: 27, correctAnswer: '611', hitsuzanMode: 'digit-by-digit' },

  // Step3: 3桁-2桁（繰り下がりあり）
  { id: 'M1-14d-3dig-Q13', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 171, operand2: 48, correctAnswer: '123', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q14', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 291, operand2: 57, correctAnswer: '234', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q15', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 421, operand2: 76, correctAnswer: '345', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q16', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 524, operand2: 68, correctAnswer: '456', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q17', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 611, operand2: 84, correctAnswer: '527', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q18', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 713, operand2: 75, correctAnswer: '638', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-3dig-Q19', unitId: 'M1-14d-3dig', step: 3, type: 'hitsuzan', operator: '-', operand1: 832, operand2: 83, correctAnswer: '749', hitsuzanMode: 'digit-by-digit' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
