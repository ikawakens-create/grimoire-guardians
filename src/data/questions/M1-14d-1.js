/**
 * M1-14d-1.js「2桁のひきざん①」（ひっ算 B+C）
 * 対象: 2桁-1桁（繰り下がりなし）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 一の位が小さい
  { id: 'M1-14d-1-Q01', unitId: 'M1-14d-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 24, operand2: 3, correctAnswer: '21', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q02', unitId: 'M1-14d-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 35, operand2: 2, correctAnswer: '33', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q03', unitId: 'M1-14d-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 47, operand2: 4, correctAnswer: '43', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q04', unitId: 'M1-14d-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 56, operand2: 3, correctAnswer: '53', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q05', unitId: 'M1-14d-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 68, operand2: 5, correctAnswer: '63', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q06', unitId: 'M1-14d-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 79, operand2: 6, correctAnswer: '73', hitsuzanMode: 'digit-by-digit' },
  // Step2: 一の位が大きい
  { id: 'M1-14d-1-Q07', unitId: 'M1-14d-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 49, operand2: 7, correctAnswer: '42', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q08', unitId: 'M1-14d-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 58, operand2: 6, correctAnswer: '52', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q09', unitId: 'M1-14d-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 67, operand2: 5, correctAnswer: '62', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q10', unitId: 'M1-14d-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 89, operand2: 7, correctAnswer: '82', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q11', unitId: 'M1-14d-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 96, operand2: 4, correctAnswer: '92', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q12', unitId: 'M1-14d-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 75, operand2: 3, correctAnswer: '72', hitsuzanMode: 'digit-by-digit' },
  // Step3
  { id: 'M1-14d-1-Q13', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 37, operand2: 4, correctAnswer: '33', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q14', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 64, operand2: 2, correctAnswer: '62', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q15', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 85, operand2: 3, correctAnswer: '82', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q16', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 46, operand2: 5, correctAnswer: '41', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q17', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 98, operand2: 6, correctAnswer: '92', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q18', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 53, operand2: 1, correctAnswer: '52', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-1-Q19', unitId: 'M1-14d-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 77, operand2: 4, correctAnswer: '73', hitsuzanMode: 'digit-by-digit' }
];
const stepConfig = [{ step: 1, pick: 4 }, { step: 2, pick: 4 }, { step: 3, pick: 7 }];
export { questions, stepConfig };
export default questions;
