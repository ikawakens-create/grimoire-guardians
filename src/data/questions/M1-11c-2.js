/**
 * M1-11c-2.js「くりさがりのひきざん②（13〜18のせかい）」（ひっ算 A）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  { id: 'M1-11c-2-Q01', unitId: 'M1-11c-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 13, operand2: 4, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q02', unitId: 'M1-11c-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 13, operand2: 5, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q03', unitId: 'M1-11c-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 14, operand2: 5, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q04', unitId: 'M1-11c-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 14, operand2: 8, correctAnswer: '6', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q05', unitId: 'M1-11c-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 15, operand2: 6, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q06', unitId: 'M1-11c-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 16, operand2: 7, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q07', unitId: 'M1-11c-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 16, operand2: 9, correctAnswer: '7', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q08', unitId: 'M1-11c-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 17, operand2: 8, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q09', unitId: 'M1-11c-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 17, operand2: 9, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q10', unitId: 'M1-11c-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 18, operand2: 9, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q11', unitId: 'M1-11c-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 13, operand2: 7, correctAnswer: '6', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q12', unitId: 'M1-11c-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 14, operand2: 6, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q13', unitId: 'M1-11c-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 15, operand2: 7, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q14', unitId: 'M1-11c-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 16, operand2: 8, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11c-2-Q15', unitId: 'M1-11c-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 17, operand2: 9, correctAnswer: '8', hitsuzanMode: 'full-answer' }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 4 }, { step: 3, pick: 6 }];
export { questions, stepConfig };
export default questions;
