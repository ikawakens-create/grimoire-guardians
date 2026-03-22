/**
 * M1-11c-2.js「くりさがりのひきざん②（13〜18のせかい）」（ひっ算 A）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  {
    id: 'M1-11c-2-Q01',
    unitId: 'M1-11c-2',
    step: 1,
    type: 'choice',
    question: '13 － 4 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-2-Q02',
    unitId: 'M1-11c-2',
    step: 1,
    type: 'choice',
    question: '13 － 5 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-2-Q03',
    unitId: 'M1-11c-2',
    step: 1,
    type: 'choice',
    question: '14 － 5 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-2-Q04',
    unitId: 'M1-11c-2',
    step: 1,
    type: 'choice',
    question: '14 － 8 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-2-Q05',
    unitId: 'M1-11c-2',
    step: 1,
    type: 'choice',
    question: '15 － 6 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-2-Q06',
    unitId: 'M1-11c-2',
    step: 2,
    type: 'choice',
    question: '16 － 7 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-2-Q07',
    unitId: 'M1-11c-2',
    step: 2,
    type: 'choice',
    question: '16 － 9 ＝ ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11c-2-Q08',
    unitId: 'M1-11c-2',
    step: 2,
    type: 'choice',
    question: '17 － 8 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-2-Q09',
    unitId: 'M1-11c-2',
    step: 2,
    type: 'choice',
    question: '17 － 9 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-2-Q10',
    unitId: 'M1-11c-2',
    step: 2,
    type: 'choice',
    question: '18 － 9 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-2-Q11',
    unitId: 'M1-11c-2',
    step: 3,
    type: 'choice',
    question: '13 － 7 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-2-Q12',
    unitId: 'M1-11c-2',
    step: 3,
    type: 'choice',
    question: '14 － 6 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-2-Q13',
    unitId: 'M1-11c-2',
    step: 3,
    type: 'choice',
    question: '15 － 7 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-2-Q14',
    unitId: 'M1-11c-2',
    step: 3,
    type: 'choice',
    question: '16 － 8 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-2-Q15',
    unitId: 'M1-11c-2',
    step: 3,
    type: 'choice',
    question: '17 － 9 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 4 }, { step: 3, pick: 6 }];
export { questions, stepConfig };
export default questions;
