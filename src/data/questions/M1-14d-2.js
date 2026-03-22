/**
 * M1-14d-2.js「2桁のひきざん②」（ひっ算 A）
 * 対象: 2桁-1桁（繰り下がりなし）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  { id: 'M1-14d-2-Q01', unitId: 'M1-14d-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 24, operand2: 3, correctAnswer: '21', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q02', unitId: 'M1-14d-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 35, operand2: 2, correctAnswer: '33', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q03', unitId: 'M1-14d-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 47, operand2: 4, correctAnswer: '43', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q04', unitId: 'M1-14d-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 56, operand2: 3, correctAnswer: '53', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q05', unitId: 'M1-14d-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 68, operand2: 5, correctAnswer: '63', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q06', unitId: 'M1-14d-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 79, operand2: 6, correctAnswer: '73', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q07', unitId: 'M1-14d-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 49, operand2: 7, correctAnswer: '42', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q08', unitId: 'M1-14d-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 58, operand2: 6, correctAnswer: '52', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q09', unitId: 'M1-14d-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 67, operand2: 5, correctAnswer: '62', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q10', unitId: 'M1-14d-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 89, operand2: 7, correctAnswer: '82', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q11', unitId: 'M1-14d-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 96, operand2: 4, correctAnswer: '92', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q12', unitId: 'M1-14d-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 75, operand2: 3, correctAnswer: '72', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q13', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 37, operand2: 4, correctAnswer: '33', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q14', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 64, operand2: 2, correctAnswer: '62', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q15', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 85, operand2: 3, correctAnswer: '82', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q16', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 46, operand2: 5, correctAnswer: '41', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q17', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 98, operand2: 6, correctAnswer: '92', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q18', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 53, operand2: 1, correctAnswer: '52', hitsuzanMode: 'full-answer' },
  { id: 'M1-14d-2-Q19', unitId: 'M1-14d-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 77, operand2: 4, correctAnswer: '73', hitsuzanMode: 'full-answer' }
];
const stepConfig = [{ step: 1, pick: 4 }, { step: 2, pick: 4 }, { step: 3, pick: 7 }];
export { questions, stepConfig };
export default questions;
