/**
 * M1-11c-1.js「くりさがりのひきざん①（13〜18のせかい）」（ひっ算 B+C）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 13〜15
  {
    id: 'M1-11c-1-Q01',
    unitId: 'M1-11c-1',
    step: 1,
    type: 'choice',
    question: '13 － 4 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-1-Q02',
    unitId: 'M1-11c-1',
    step: 1,
    type: 'choice',
    question: '13 － 5 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-1-Q03',
    unitId: 'M1-11c-1',
    step: 1,
    type: 'choice',
    question: '14 － 5 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-1-Q04',
    unitId: 'M1-11c-1',
    step: 1,
    type: 'choice',
    question: '14 － 8 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-1-Q05',
    unitId: 'M1-11c-1',
    step: 1,
    type: 'choice',
    question: '15 － 6 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-1-Q06',
    unitId: 'M1-11c-1',
    step: 1,
    type: 'choice',
    question: '15 － 9 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  // Step2: 16〜18
  {
    id: 'M1-11c-1-Q07',
    unitId: 'M1-11c-1',
    step: 2,
    type: 'choice',
    question: '16 － 7 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-1-Q08',
    unitId: 'M1-11c-1',
    step: 2,
    type: 'choice',
    question: '16 － 9 ＝ ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11c-1-Q09',
    unitId: 'M1-11c-1',
    step: 2,
    type: 'choice',
    question: '17 － 8 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-1-Q10',
    unitId: 'M1-11c-1',
    step: 2,
    type: 'choice',
    question: '17 － 9 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-1-Q11',
    unitId: 'M1-11c-1',
    step: 2,
    type: 'choice',
    question: '18 － 9 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  // Step3: まじりあい
  {
    id: 'M1-11c-1-Q12',
    unitId: 'M1-11c-1',
    step: 3,
    type: 'choice',
    question: '13 － 7 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-1-Q13',
    unitId: 'M1-11c-1',
    step: 3,
    type: 'choice',
    question: '14 － 6 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-1-Q14',
    unitId: 'M1-11c-1',
    step: 3,
    type: 'choice',
    question: '15 － 7 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-1-Q15',
    unitId: 'M1-11c-1',
    step: 3,
    type: 'choice',
    question: '16 － 8 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-1-Q16',
    unitId: 'M1-11c-1',
    step: 3,
    type: 'choice',
    question: '17 － 9 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-1-Q17',
    unitId: 'M1-11c-1',
    step: 3,
    type: 'choice',
    question: '18 － 9 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 4 }, { step: 3, pick: 6 }];
export { questions, stepConfig };
export default questions;
