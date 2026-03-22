/**
 * M2-04d.js - Grimoire Guardians 問題データ
 * ユニット: M2-04d「3桁のひきざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 小学2年生、3桁のひきざん
 * モード: digit-by-digit のみ（暗算困難のためAモードなし）
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
  { id: 'M2-04d-Q01', unitId: 'M2-04d', step: 1, type: 'hitsuzan', operator: '-', operand1: 127, operand2: 4,  correctAnswer: '123', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q02', unitId: 'M2-04d', step: 1, type: 'hitsuzan', operator: '-', operand1: 246, operand2: 5,  correctAnswer: '241', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q03', unitId: 'M2-04d', step: 1, type: 'hitsuzan', operator: '-', operand1: 355, operand2: 3,  correctAnswer: '352', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q04', unitId: 'M2-04d', step: 1, type: 'hitsuzan', operator: '-', operand1: 437, operand2: 7,  correctAnswer: '430', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q05', unitId: 'M2-04d', step: 1, type: 'hitsuzan', operator: '-', operand1: 516, operand2: 2,  correctAnswer: '514', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q06', unitId: 'M2-04d', step: 1, type: 'hitsuzan', operator: '-', operand1: 627, operand2: 6,  correctAnswer: '621', hitsuzanMode: 'digit-by-digit' },

  // Step2: 3桁-2桁（繰り下がりなし）
  { id: 'M2-04d-Q07', unitId: 'M2-04d', step: 2, type: 'hitsuzan', operator: '-', operand1: 168, operand2: 45, correctAnswer: '123', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q08', unitId: 'M2-04d', step: 2, type: 'hitsuzan', operator: '-', operand1: 287, operand2: 53, correctAnswer: '234', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q09', unitId: 'M2-04d', step: 2, type: 'hitsuzan', operator: '-', operand1: 357, operand2: 46, correctAnswer: '311', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q10', unitId: 'M2-04d', step: 2, type: 'hitsuzan', operator: '-', operand1: 458, operand2: 35, correctAnswer: '423', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q11', unitId: 'M2-04d', step: 2, type: 'hitsuzan', operator: '-', operand1: 566, operand2: 64, correctAnswer: '502', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q12', unitId: 'M2-04d', step: 2, type: 'hitsuzan', operator: '-', operand1: 637, operand2: 27, correctAnswer: '610', hitsuzanMode: 'digit-by-digit' },

  // Step3: 3桁-2桁（繰り下がりあり）
  { id: 'M2-04d-Q13', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 173, operand2: 48, correctAnswer: '125', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q14', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 291, operand2: 57, correctAnswer: '234', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q15', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 421, operand2: 75, correctAnswer: '346', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q16', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 525, operand2: 68, correctAnswer: '457', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q17', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 612, operand2: 84, correctAnswer: '528', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q18', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 714, operand2: 75, correctAnswer: '639', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04d-Q19', unitId: 'M2-04d', step: 3, type: 'hitsuzan', operator: '-', operand1: 831, operand2: 83, correctAnswer: '748', hitsuzanMode: 'digit-by-digit' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
