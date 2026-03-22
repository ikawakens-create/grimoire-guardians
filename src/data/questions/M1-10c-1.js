/**
 * M1-10c-1.js「くりあがりのたしざん①（7・6のせかい）」（ひっ算 B+C）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 7のせかい
  {
    id: 'M1-10c-1-Q01',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 3 ＝ ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '10'
  },
  {
    id: 'M1-10c-1-Q02',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 4 ＝ ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '11'
  },
  {
    id: 'M1-10c-1-Q03',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 5 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10c-1-Q04',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 6 ＝ ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '13'
  },
  {
    id: 'M1-10c-1-Q05',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 7 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  {
    id: 'M1-10c-1-Q06',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 8 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  },
  {
    id: 'M1-10c-1-Q07',
    unitId: 'M1-10c-1',
    step: 1,
    type: 'choice',
    question: '7 ＋ 9 ＝ ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '16'
  },
  // Step2: 6のせかい
  {
    id: 'M1-10c-1-Q08',
    unitId: 'M1-10c-1',
    step: 2,
    type: 'choice',
    question: '6 ＋ 4 ＝ ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '10'
  },
  {
    id: 'M1-10c-1-Q09',
    unitId: 'M1-10c-1',
    step: 2,
    type: 'choice',
    question: '6 ＋ 5 ＝ ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '11'
  },
  {
    id: 'M1-10c-1-Q10',
    unitId: 'M1-10c-1',
    step: 2,
    type: 'choice',
    question: '6 ＋ 6 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10c-1-Q11',
    unitId: 'M1-10c-1',
    step: 2,
    type: 'choice',
    question: '6 ＋ 7 ＝ ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '13'
  },
  {
    id: 'M1-10c-1-Q12',
    unitId: 'M1-10c-1',
    step: 2,
    type: 'choice',
    question: '6 ＋ 8 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  {
    id: 'M1-10c-1-Q13',
    unitId: 'M1-10c-1',
    step: 2,
    type: 'choice',
    question: '6 ＋ 9 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  },
  // Step3: まじりあい
  {
    id: 'M1-10c-1-Q14',
    unitId: 'M1-10c-1',
    step: 3,
    type: 'choice',
    question: '7 ＋ 5 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10c-1-Q15',
    unitId: 'M1-10c-1',
    step: 3,
    type: 'choice',
    question: '6 ＋ 6 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10c-1-Q16',
    unitId: 'M1-10c-1',
    step: 3,
    type: 'choice',
    question: '7 ＋ 8 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  },
  {
    id: 'M1-10c-1-Q17',
    unitId: 'M1-10c-1',
    step: 3,
    type: 'choice',
    question: '6 ＋ 9 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 4 }, { step: 3, pick: 6 }];
export { questions, stepConfig };
export default questions;
