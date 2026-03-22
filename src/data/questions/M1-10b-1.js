/**
 * M1-10b-1.js「くりあがりのたしざん①（8のせかい）」（ひっ算 B+C）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  { id: 'M1-10b-1-Q01', unitId: 'M1-10b-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 2, correctAnswer: '10', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q02', unitId: 'M1-10b-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 3, correctAnswer: '11', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q03', unitId: 'M1-10b-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 4, correctAnswer: '12', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q04', unitId: 'M1-10b-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 5, correctAnswer: '13', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q05', unitId: 'M1-10b-1', step: 1, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 6, correctAnswer: '14', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q06', unitId: 'M1-10b-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 7, correctAnswer: '15', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q07', unitId: 'M1-10b-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 8, correctAnswer: '16', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q08', unitId: 'M1-10b-1', step: 2, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 9, correctAnswer: '17', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q09', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 3, correctAnswer: '11', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q10', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 6, correctAnswer: '14', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q11', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 4, correctAnswer: '12', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q12', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 8, correctAnswer: '16', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q13', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 5, correctAnswer: '13', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q14', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 7, correctAnswer: '15', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-10b-1-Q15', unitId: 'M1-10b-1', step: 3, type: 'hitsuzan', operator: '+', operand1: 8, operand2: 9, correctAnswer: '17', hitsuzanMode: 'digit-by-digit' }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 3 }, { step: 3, pick: 7 }];
export { questions, stepConfig };
export default questions;
