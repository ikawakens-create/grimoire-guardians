/**
 * M2-04c.js - Grimoire Guardians 問題データ
 * ユニット: M2-04c「3桁のたしざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 小学2年生、3桁のたしざん
 * モード: digit-by-digit のみ（暗算困難のためAモードなし）
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
  { id: 'M2-04c-Q01', unitId: 'M2-04c', step: 1, type: 'hitsuzan', operator: '+', operand1: 123, operand2: 4,  correctAnswer: '127', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q02', unitId: 'M2-04c', step: 1, type: 'hitsuzan', operator: '+', operand1: 241, operand2: 5,  correctAnswer: '246', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q03', unitId: 'M2-04c', step: 1, type: 'hitsuzan', operator: '+', operand1: 352, operand2: 3,  correctAnswer: '355', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q04', unitId: 'M2-04c', step: 1, type: 'hitsuzan', operator: '+', operand1: 430, operand2: 7,  correctAnswer: '437', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q05', unitId: 'M2-04c', step: 1, type: 'hitsuzan', operator: '+', operand1: 514, operand2: 2,  correctAnswer: '516', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q06', unitId: 'M2-04c', step: 1, type: 'hitsuzan', operator: '+', operand1: 621, operand2: 6,  correctAnswer: '627', hitsuzanMode: 'digit-by-digit' },

  // Step2: 3桁+2桁（繰り上がりなし）
  { id: 'M2-04c-Q07', unitId: 'M2-04c', step: 2, type: 'hitsuzan', operator: '+', operand1: 123, operand2: 45, correctAnswer: '168', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q08', unitId: 'M2-04c', step: 2, type: 'hitsuzan', operator: '+', operand1: 234, operand2: 53, correctAnswer: '287', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q09', unitId: 'M2-04c', step: 2, type: 'hitsuzan', operator: '+', operand1: 311, operand2: 46, correctAnswer: '357', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q10', unitId: 'M2-04c', step: 2, type: 'hitsuzan', operator: '+', operand1: 423, operand2: 35, correctAnswer: '458', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q11', unitId: 'M2-04c', step: 2, type: 'hitsuzan', operator: '+', operand1: 502, operand2: 64, correctAnswer: '566', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q12', unitId: 'M2-04c', step: 2, type: 'hitsuzan', operator: '+', operand1: 610, operand2: 27, correctAnswer: '637', hitsuzanMode: 'digit-by-digit' },

  // Step3: 3桁+2桁（繰り上がりあり）
  { id: 'M2-04c-Q13', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 125, operand2: 48, correctAnswer: '173', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q14', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 234, operand2: 57, correctAnswer: '291', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q15', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 346, operand2: 75, correctAnswer: '421', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q16', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 457, operand2: 68, correctAnswer: '525', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q17', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 528, operand2: 84, correctAnswer: '612', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q18', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 639, operand2: 75, correctAnswer: '714', hitsuzanMode: 'digit-by-digit' },
  { id: 'M2-04c-Q19', unitId: 'M2-04c', step: 3, type: 'hitsuzan', operator: '+', operand1: 748, operand2: 83, correctAnswer: '831', hitsuzanMode: 'digit-by-digit' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
