/**
 * M2-10g.js - Grimoire Guardians 問題データ
 * ユニット: M2-10g「九九 8のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10g-Q01',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 1 = ？',
    choices: ['4', '6', '8', '16'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10g-Q02',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 2 = ？',
    choices: ['8', '14', '16', '24'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10g-Q03',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 3 = ？',
    choices: ['16', '21', '24', '32'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10g-Q04',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 4 = ？',
    choices: ['24', '28', '32', '40'],
    correctAnswer: '32'
  },
  {
    id: 'M2-10g-Q05',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 5 = ？',
    choices: ['32', '36', '40', '48'],
    correctAnswer: '40'
  },
  {
    id: 'M2-10g-Q06',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 6 = ？',
    choices: ['40', '44', '48', '56'],
    correctAnswer: '48'
  },
  {
    id: 'M2-10g-Q07',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 7 = ？',
    choices: ['48', '52', '56', '64'],
    correctAnswer: '56'
  },
  {
    id: 'M2-10g-Q08',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 8 = ？',
    choices: ['56', '60', '63', '64'],
    correctAnswer: '64'
  },
  {
    id: 'M2-10g-Q09',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 9 = ？',
    choices: ['63', '64', '72', '81'],
    correctAnswer: '72'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
