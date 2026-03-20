/**
 * M2-10d.js - Grimoire Guardians 問題データ
 * ユニット: M2-10d「九九 5のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10d-Q01',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 1 = ？',
    choices: ['1', '5', '10', '15'],
    correctAnswer: '5'
  },
  {
    id: 'M2-10d-Q02',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 2 = ？',
    choices: ['5', '8', '10', '15'],
    correctAnswer: '10'
  },
  {
    id: 'M2-10d-Q03',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 3 = ？',
    choices: ['10', '13', '15', '20'],
    correctAnswer: '15'
  },
  {
    id: 'M2-10d-Q04',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 4 = ？',
    choices: ['15', '18', '20', '25'],
    correctAnswer: '20'
  },
  {
    id: 'M2-10d-Q05',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 5 = ？',
    choices: ['20', '22', '25', '30'],
    correctAnswer: '25'
  },
  {
    id: 'M2-10d-Q06',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 6 = ？',
    choices: ['25', '28', '30', '35'],
    correctAnswer: '30'
  },
  {
    id: 'M2-10d-Q07',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 7 = ？',
    choices: ['30', '33', '35', '40'],
    correctAnswer: '35'
  },
  {
    id: 'M2-10d-Q08',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 8 = ？',
    choices: ['35', '38', '40', '45'],
    correctAnswer: '40'
  },
  {
    id: 'M2-10d-Q09',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 9 = ？',
    choices: ['40', '42', '45', '50'],
    correctAnswer: '45'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
