/**
 * M1-11b-2.js「くりさがりのひきざん②（11・12のせかい）」（ひっ算 A）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  { id: 'M1-11b-2-Q01', unitId: 'M1-11b-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 2, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q02', unitId: 'M1-11b-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 3, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q03', unitId: 'M1-11b-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 4, correctAnswer: '7', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q04', unitId: 'M1-11b-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 5, correctAnswer: '6', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q05', unitId: 'M1-11b-2', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 7, correctAnswer: '4', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q06', unitId: 'M1-11b-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 3, correctAnswer: '9', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q07', unitId: 'M1-11b-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 4, correctAnswer: '8', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q08', unitId: 'M1-11b-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 6, correctAnswer: '6', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q09', unitId: 'M1-11b-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 8, correctAnswer: '4', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q10', unitId: 'M1-11b-2', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 9, correctAnswer: '3', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q11', unitId: 'M1-11b-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 4, correctAnswer: '7', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q12', unitId: 'M1-11b-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 5, correctAnswer: '7', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q13', unitId: 'M1-11b-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 8, correctAnswer: '3', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q14', unitId: 'M1-11b-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 9, correctAnswer: '3', hitsuzanMode: 'full-answer' },
  { id: 'M1-11b-2-Q15', unitId: 'M1-11b-2', step: 3, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 6, correctAnswer: '5', hitsuzanMode: 'full-answer' }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 5 }, { step: 3, pick: 5 }];
export { questions, stepConfig };
export default questions;
