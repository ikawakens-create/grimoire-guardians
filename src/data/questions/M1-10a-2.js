/**
 * M1-10a-2.js - Grimoire Guardians 問題データ
 * ユニット: M1-10a-2「くりあがりのたしざん②（9のせかい）」（ひっ算 A）
 *
 * 対象: 小学1年生、9+□の繰り上がりたしざん
 * モード: full-answer
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [
  { id: 'M1-10a-2-Q01', unitId: 'M1-10a-2', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 1, correctAnswer: '10', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q02', unitId: 'M1-10a-2', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 2, correctAnswer: '11', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q03', unitId: 'M1-10a-2', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 3, correctAnswer: '12', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q04', unitId: 'M1-10a-2', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 4, correctAnswer: '13', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q05', unitId: 'M1-10a-2', step: 1, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 5, correctAnswer: '14', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q06', unitId: 'M1-10a-2', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 6, correctAnswer: '15', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q07', unitId: 'M1-10a-2', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 7, correctAnswer: '16', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q08', unitId: 'M1-10a-2', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 8, correctAnswer: '17', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q09', unitId: 'M1-10a-2', step: 2, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 9, correctAnswer: '18', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q10', unitId: 'M1-10a-2', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 3, correctAnswer: '12', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q11', unitId: 'M1-10a-2', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 7, correctAnswer: '16', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q12', unitId: 'M1-10a-2', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 5, correctAnswer: '14', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q13', unitId: 'M1-10a-2', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 2, correctAnswer: '11', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q14', unitId: 'M1-10a-2', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 8, correctAnswer: '17', hitsuzanMode: 'full-answer' },
  { id: 'M1-10a-2-Q15', unitId: 'M1-10a-2', step: 3, type: 'hitsuzan', operator: '+', operand1: 9, operand2: 4, correctAnswer: '13', hitsuzanMode: 'full-answer' }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 4 },
  { step: 3, pick: 6 }
];

export { questions, stepConfig };
export default questions;
