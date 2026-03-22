/**
 * M1-11b-1.js「くりさがりのひきざん①（11・12のせかい）」（ひっ算 B+C）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 11のせかい
  {
    id: 'M1-11b-1-Q01',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 2 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11b-1-Q02',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 3 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11b-1-Q03',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 4 ＝ ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-1-Q04',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 5 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11b-1-Q05',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 6 ＝ ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11b-1-Q06',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 7 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '4'
  },
  {
    id: 'M1-11b-1-Q07',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 8 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11b-1-Q08',
    unitId: 'M1-11b-1',
    step: 1,
    type: 'choice',
    question: '11 － 9 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  // Step2: 12のせかい
  {
    id: 'M1-11b-1-Q09',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 3 ＝ ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11b-1-Q10',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 4 ＝ ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11b-1-Q11',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 5 ＝ ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-1-Q12',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 6 ＝ ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11b-1-Q13',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 7 ＝ ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11b-1-Q14',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 8 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '4'
  },
  {
    id: 'M1-11b-1-Q15',
    unitId: 'M1-11b-1',
    step: 2,
    type: 'choice',
    question: '12 － 9 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  // Step3: まじりあい
  {
    id: 'M1-11b-1-Q16',
    unitId: 'M1-11b-1',
    step: 3,
    type: 'choice',
    question: '11 － 4 ＝ ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-1-Q17',
    unitId: 'M1-11b-1',
    step: 3,
    type: 'choice',
    question: '12 － 5 ＝ ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-1-Q18',
    unitId: 'M1-11b-1',
    step: 3,
    type: 'choice',
    question: '11 － 8 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11b-1-Q19',
    unitId: 'M1-11b-1',
    step: 3,
    type: 'choice',
    question: '12 － 9 ＝ ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11b-1-Q20',
    unitId: 'M1-11b-1',
    step: 3,
    type: 'choice',
    question: '11 － 6 ＝ ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '5'
  }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 5 }, { step: 3, pick: 5 }];
export { questions, stepConfig };
export default questions;
