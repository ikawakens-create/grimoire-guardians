/**
 * M1-14d-big.js「2桁－2桁のひきざん」（ひっ算 B+C のみ）
 * 暗算では難しいため A モードなし
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 繰り下がりなし
  { id: 'M1-14d-big-Q01', unitId: 'M1-14d-big', step: 1, type: 'hitsuzan', operator: '-', operand1: 47, operand2: 23, correctAnswer: '24', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q02', unitId: 'M1-14d-big', step: 1, type: 'hitsuzan', operator: '-', operand1: 56, operand2: 31, correctAnswer: '25', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q03', unitId: 'M1-14d-big', step: 1, type: 'hitsuzan', operator: '-', operand1: 68, operand2: 45, correctAnswer: '23', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q04', unitId: 'M1-14d-big', step: 1, type: 'hitsuzan', operator: '-', operand1: 79, operand2: 36, correctAnswer: '43', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q05', unitId: 'M1-14d-big', step: 1, type: 'hitsuzan', operator: '-', operand1: 85, operand2: 52, correctAnswer: '33', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q06', unitId: 'M1-14d-big', step: 1, type: 'hitsuzan', operator: '-', operand1: 97, operand2: 64, correctAnswer: '33', hitsuzanMode: 'digit-by-digit' },
  // Step2: 繰り下がりあり
  { id: 'M1-14d-big-Q07', unitId: 'M1-14d-big', step: 2, type: 'hitsuzan', operator: '-', operand1: 41, operand2: 23, correctAnswer: '18', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q08', unitId: 'M1-14d-big', step: 2, type: 'hitsuzan', operator: '-', operand1: 63, operand2: 27, correctAnswer: '36', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q09', unitId: 'M1-14d-big', step: 2, type: 'hitsuzan', operator: '-', operand1: 52, operand2: 38, correctAnswer: '14', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q10', unitId: 'M1-14d-big', step: 2, type: 'hitsuzan', operator: '-', operand1: 74, operand2: 46, correctAnswer: '28', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q11', unitId: 'M1-14d-big', step: 2, type: 'hitsuzan', operator: '-', operand1: 83, operand2: 57, correctAnswer: '26', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q12', unitId: 'M1-14d-big', step: 2, type: 'hitsuzan', operator: '-', operand1: 92, operand2: 65, correctAnswer: '27', hitsuzanMode: 'digit-by-digit' },
  // Step3: まじりあい
  { id: 'M1-14d-big-Q13', unitId: 'M1-14d-big', step: 3, type: 'hitsuzan', operator: '-', operand1: 86, operand2: 52, correctAnswer: '34', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q14', unitId: 'M1-14d-big', step: 3, type: 'hitsuzan', operator: '-', operand1: 83, operand2: 47, correctAnswer: '36', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q15', unitId: 'M1-14d-big', step: 3, type: 'hitsuzan', operator: '-', operand1: 66, operand2: 41, correctAnswer: '25', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q16', unitId: 'M1-14d-big', step: 3, type: 'hitsuzan', operator: '-', operand1: 75, operand2: 39, correctAnswer: '36', hitsuzanMode: 'digit-by-digit' },
  { id: 'M1-14d-big-Q17', unitId: 'M1-14d-big', step: 3, type: 'hitsuzan', operator: '-', operand1: 91, operand2: 54, correctAnswer: '37', hitsuzanMode: 'digit-by-digit' }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 5 }, { step: 3, pick: 5 }];
export { questions, stepConfig };
export default questions;
