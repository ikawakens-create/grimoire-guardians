/**
 * M1-14d-big.js「2桁－2桁のひきざん」（ひっ算 B+C のみ）
 * 暗算では難しいため A モードなし
 * @version 1.0 @date 2026-03-22
 */
const questions = [
  // Step1: 繰り下がりなし
  {
    id: 'M1-14d-big-Q01',
    unitId: 'M1-14d-big',
    step: 1,
    type: 'choice',
    question: '47 － 23 ＝ ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '24'
  },
  {
    id: 'M1-14d-big-Q02',
    unitId: 'M1-14d-big',
    step: 1,
    type: 'choice',
    question: '56 － 31 ＝ ？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '25'
  },
  {
    id: 'M1-14d-big-Q03',
    unitId: 'M1-14d-big',
    step: 1,
    type: 'choice',
    question: '68 － 45 ＝ ？',
    choices: ['20', '21', '22', '23'],
    correctAnswer: '23'
  },
  {
    id: 'M1-14d-big-Q04',
    unitId: 'M1-14d-big',
    step: 1,
    type: 'choice',
    question: '79 － 36 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '43'
  },
  {
    id: 'M1-14d-big-Q05',
    unitId: 'M1-14d-big',
    step: 1,
    type: 'choice',
    question: '85 － 52 ＝ ？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '33'
  },
  {
    id: 'M1-14d-big-Q06',
    unitId: 'M1-14d-big',
    step: 1,
    type: 'choice',
    question: '97 － 64 ＝ ？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '33'
  },
  // Step2: 繰り下がりあり
  {
    id: 'M1-14d-big-Q07',
    unitId: 'M1-14d-big',
    step: 2,
    type: 'choice',
    question: '41 － 23 ＝ ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '18'
  },
  {
    id: 'M1-14d-big-Q08',
    unitId: 'M1-14d-big',
    step: 2,
    type: 'choice',
    question: '63 － 27 ＝ ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '36'
  },
  {
    id: 'M1-14d-big-Q09',
    unitId: 'M1-14d-big',
    step: 2,
    type: 'choice',
    question: '52 － 38 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  {
    id: 'M1-14d-big-Q10',
    unitId: 'M1-14d-big',
    step: 2,
    type: 'choice',
    question: '74 － 46 ＝ ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '28'
  },
  {
    id: 'M1-14d-big-Q11',
    unitId: 'M1-14d-big',
    step: 2,
    type: 'choice',
    question: '83 － 57 ＝ ？',
    choices: ['23', '24', '25', '26'],
    correctAnswer: '26'
  },
  {
    id: 'M1-14d-big-Q12',
    unitId: 'M1-14d-big',
    step: 2,
    type: 'choice',
    question: '92 － 65 ＝ ？',
    choices: ['24', '25', '26', '27'],
    correctAnswer: '27'
  },
  // Step3: まじりあい
  {
    id: 'M1-14d-big-Q13',
    unitId: 'M1-14d-big',
    step: 3,
    type: 'choice',
    question: '86 － 52 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '34'
  },
  {
    id: 'M1-14d-big-Q14',
    unitId: 'M1-14d-big',
    step: 3,
    type: 'choice',
    question: '83 － 47 ＝ ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '36'
  },
  {
    id: 'M1-14d-big-Q15',
    unitId: 'M1-14d-big',
    step: 3,
    type: 'choice',
    question: '66 － 41 ＝ ？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '25'
  },
  {
    id: 'M1-14d-big-Q16',
    unitId: 'M1-14d-big',
    step: 3,
    type: 'choice',
    question: '75 － 39 ＝ ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '36'
  },
  {
    id: 'M1-14d-big-Q17',
    unitId: 'M1-14d-big',
    step: 3,
    type: 'choice',
    question: '91 － 54 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '37'
  }
];
const stepConfig = [{ step: 1, pick: 5 }, { step: 2, pick: 5 }, { step: 3, pick: 5 }];
export { questions, stepConfig };
export default questions;
