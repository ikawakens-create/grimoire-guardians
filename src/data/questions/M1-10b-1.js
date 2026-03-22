/**
 * M1-10b-1.js「くりあがりのたしざん①（8のせかい）」（ひっ算 B+C）
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  {
    id: 'M1-10b-1-Q01',
    unitId: 'M1-10b-1',
    step: 1,
    type: 'choice',
    question: '8 ＋ 2 ＝ ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '10'
  },
  {
    id: 'M1-10b-1-Q02',
    unitId: 'M1-10b-1',
    step: 1,
    type: 'choice',
    question: '8 ＋ 3 ＝ ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '11'
  },
  {
    id: 'M1-10b-1-Q03',
    unitId: 'M1-10b-1',
    step: 1,
    type: 'choice',
    question: '8 ＋ 4 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10b-1-Q04',
    unitId: 'M1-10b-1',
    step: 1,
    type: 'choice',
    question: '8 ＋ 5 ＝ ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '13'
  },
  {
    id: 'M1-10b-1-Q05',
    unitId: 'M1-10b-1',
    step: 1,
    type: 'choice',
    question: '8 ＋ 6 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  {
    id: 'M1-10b-1-Q06',
    unitId: 'M1-10b-1',
    step: 2,
    type: 'choice',
    question: '8 ＋ 7 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  },
  {
    id: 'M1-10b-1-Q07',
    unitId: 'M1-10b-1',
    step: 2,
    type: 'choice',
    question: '8 ＋ 8 ＝ ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '16'
  },
  {
    id: 'M1-10b-1-Q08',
    unitId: 'M1-10b-1',
    step: 2,
    type: 'choice',
    question: '8 ＋ 9 ＝ ？',
    choices: ['14', '15', '16', '17'],
    correctAnswer: '17'
  },
  {
    id: 'M1-10b-1-Q09',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 3 ＝ ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '11'
  },
  {
    id: 'M1-10b-1-Q10',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 6 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  {
    id: 'M1-10b-1-Q11',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 4 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10b-1-Q12',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 8 ＝ ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '16'
  },
  {
    id: 'M1-10b-1-Q13',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 5 ＝ ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '13'
  },
  {
    id: 'M1-10b-1-Q14',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 7 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  },
  {
    id: 'M1-10b-1-Q15',
    unitId: 'M1-10b-1',
    step: 3,
    type: 'choice',
    question: '8 ＋ 9 ＝ ？',
    choices: ['14', '15', '16', '17'],
    correctAnswer: '17'
  }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 3 }, { step: 3, pick: 7 }];
export { questions, stepConfig };
export default questions;
