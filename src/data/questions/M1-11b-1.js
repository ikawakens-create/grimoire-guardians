/**
 * M1-11b-1.js「くりさがりのひきざん①（11・12のせかい）」（ひっ算 B+C）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 11のせかい
  { id: 'M1-11b-1-Q01', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 2, correctAnswer: '9', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q02', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 3, correctAnswer: '8', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q03', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 4, correctAnswer: '7', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q04', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 5, correctAnswer: '6', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q05', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 6, correctAnswer: '5', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q06', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 7, correctAnswer: '4', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q07', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 8, correctAnswer: '3', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q08', unitId: 'M1-11b-1', step: 1, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 9, correctAnswer: '2', hitsuzanMode: 'digit-by-digit' },
  // Step2: 12のせかい
  { id: 'M1-11b-1-Q09', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 3, correctAnswer: '9', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q10', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 4, correctAnswer: '8', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q11', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 5, correctAnswer: '7', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q12', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 6, correctAnswer: '6', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q13', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 7, correctAnswer: '5', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q14', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 8, correctAnswer: '4', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q15', unitId: 'M1-11b-1', step: 2, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 9, correctAnswer: '3', hitsuzanMode: 'digit-by-digit' },
  // Step3: まじりあい
  { id: 'M1-11b-1-Q16', unitId: 'M1-11b-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 4, correctAnswer: '7', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q17', unitId: 'M1-11b-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 5, correctAnswer: '7', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q18', unitId: 'M1-11b-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 8, correctAnswer: '3', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q19', unitId: 'M1-11b-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 12, operand2: 9, correctAnswer: '3', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-11b-1-Q20', unitId: 'M1-11b-1', step: 3, type: 'hitsuzan', operator: '-', operand1: 11, operand2: 6, correctAnswer: '5', hitsuzanMode: 'digit-by-digit' }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 5 }, { step: 3, pick: 5 }];
export { questions, stepConfig };
export default questions;
