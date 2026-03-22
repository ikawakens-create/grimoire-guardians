/**
 * M1-14d-1.js「2桁のひきざん①」（ひっ算 B+C）
 * 対象: 2桁-1桁（繰り下がりなし）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 一の位が小さい
  {
    id: 'M1-14d-1-Q01',
    unitId: 'M1-14d-1',
    step: 1,
    type: 'choice',
    question: '24 － 3 ＝ ？',
    choices: ['18', '19', '20', '21'],
    correctAnswer: '21'
  },
  {
    id: 'M1-14d-1-Q02',
    unitId: 'M1-14d-1',
    step: 1,
    type: 'choice',
    question: '35 － 2 ＝ ？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '33'
  },
  {
    id: 'M1-14d-1-Q03',
    unitId: 'M1-14d-1',
    step: 1,
    type: 'choice',
    question: '47 － 4 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '43'
  },
  {
    id: 'M1-14d-1-Q04',
    unitId: 'M1-14d-1',
    step: 1,
    type: 'choice',
    question: '56 － 3 ＝ ？',
    choices: ['50', '51', '52', '53'],
    correctAnswer: '53'
  },
  {
    id: 'M1-14d-1-Q05',
    unitId: 'M1-14d-1',
    step: 1,
    type: 'choice',
    question: '68 － 5 ＝ ？',
    choices: ['60', '61', '62', '63'],
    correctAnswer: '63'
  },
  {
    id: 'M1-14d-1-Q06',
    unitId: 'M1-14d-1',
    step: 1,
    type: 'choice',
    question: '79 － 6 ＝ ？',
    choices: ['70', '71', '72', '73'],
    correctAnswer: '73'
  },
  // Step2: 一の位が大きい
  {
    id: 'M1-14d-1-Q07',
    unitId: 'M1-14d-1',
    step: 2,
    type: 'choice',
    question: '49 － 7 ＝ ？',
    choices: ['39', '40', '41', '42'],
    correctAnswer: '42'
  },
  {
    id: 'M1-14d-1-Q08',
    unitId: 'M1-14d-1',
    step: 2,
    type: 'choice',
    question: '58 － 6 ＝ ？',
    choices: ['49', '50', '51', '52'],
    correctAnswer: '52'
  },
  {
    id: 'M1-14d-1-Q09',
    unitId: 'M1-14d-1',
    step: 2,
    type: 'choice',
    question: '67 － 5 ＝ ？',
    choices: ['59', '60', '61', '62'],
    correctAnswer: '62'
  },
  {
    id: 'M1-14d-1-Q10',
    unitId: 'M1-14d-1',
    step: 2,
    type: 'choice',
    question: '89 － 7 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },
  {
    id: 'M1-14d-1-Q11',
    unitId: 'M1-14d-1',
    step: 2,
    type: 'choice',
    question: '96 － 4 ＝ ？',
    choices: ['89', '90', '91', '92'],
    correctAnswer: '92'
  },
  {
    id: 'M1-14d-1-Q12',
    unitId: 'M1-14d-1',
    step: 2,
    type: 'choice',
    question: '75 － 3 ＝ ？',
    choices: ['69', '70', '71', '72'],
    correctAnswer: '72'
  },
  // Step3
  {
    id: 'M1-14d-1-Q13',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '37 － 4 ＝ ？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '33'
  },
  {
    id: 'M1-14d-1-Q14',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '64 － 2 ＝ ？',
    choices: ['59', '60', '61', '62'],
    correctAnswer: '62'
  },
  {
    id: 'M1-14d-1-Q15',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '85 － 3 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },
  {
    id: 'M1-14d-1-Q16',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '46 － 5 ＝ ？',
    choices: ['38', '39', '40', '41'],
    correctAnswer: '41'
  },
  {
    id: 'M1-14d-1-Q17',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '98 － 6 ＝ ？',
    choices: ['89', '90', '91', '92'],
    correctAnswer: '92'
  },
  {
    id: 'M1-14d-1-Q18',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '53 － 1 ＝ ？',
    choices: ['49', '50', '51', '52'],
    correctAnswer: '52'
  },
  {
    id: 'M1-14d-1-Q19',
    unitId: 'M1-14d-1',
    step: 3,
    type: 'choice',
    question: '77 － 4 ＝ ？',
    choices: ['70', '71', '72', '73'],
    correctAnswer: '73'
  }
];
const stepConfig = [{ step: 1, pick: 4 }, { step: 2, pick: 4 }, { step: 3, pick: 7 }];
export { questions, stepConfig };
export default questions;
