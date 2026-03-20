/**
 * M2-10f.js - Grimoire Guardians 問題データ
 * ユニット: M2-10f「九九 7のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10f-Q01',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 1 = ？',
    choices: ['1', '6', '7', '14'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10f-Q02',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 2 = ？',
    choices: ['7', '12', '14', '21'],
    correctAnswer: '14'
  },
  {
    id: 'M2-10f-Q03',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 3 = ？',
    choices: ['14', '18', '21', '28'],
    correctAnswer: '21'
  },
  {
    id: 'M2-10f-Q04',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 4 = ？',
    choices: ['21', '24', '28', '35'],
    correctAnswer: '28'
  },
  {
    id: 'M2-10f-Q05',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 5 = ？',
    choices: ['28', '32', '35', '42'],
    correctAnswer: '35'
  },
  {
    id: 'M2-10f-Q06',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 6 = ？',
    choices: ['35', '38', '42', '49'],
    correctAnswer: '42'
  },
  {
    id: 'M2-10f-Q07',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 7 = ？',
    choices: ['42', '46', '49', '56'],
    correctAnswer: '49'
  },
  {
    id: 'M2-10f-Q08',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 8 = ？',
    choices: ['49', '52', '56', '63'],
    correctAnswer: '56'
  },
  {
    id: 'M2-10f-Q09',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 9 = ？',
    choices: ['56', '60', '63', '70'],
    correctAnswer: '63'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
