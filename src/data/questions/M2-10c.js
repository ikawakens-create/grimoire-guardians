/**
 * M2-10c.js - Grimoire Guardians 問題データ
 * ユニット: M2-10c「九九 4のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10c-Q01',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 1 = ？',
    choices: ['2', '3', '4', '8'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10c-Q02',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 2 = ？',
    choices: ['4', '6', '8', '12'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10c-Q03',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 3 = ？',
    choices: ['8', '10', '12', '16'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10c-Q04',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 4 = ？',
    choices: ['12', '14', '16', '20'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10c-Q05',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 5 = ？',
    choices: ['16', '18', '20', '24'],
    correctAnswer: '20'
  },
  {
    id: 'M2-10c-Q06',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 6 = ？',
    choices: ['20', '22', '24', '28'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10c-Q07',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 7 = ？',
    choices: ['24', '26', '28', '32'],
    correctAnswer: '28'
  },
  {
    id: 'M2-10c-Q08',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 8 = ？',
    choices: ['28', '30', '32', '36'],
    correctAnswer: '32'
  },
  {
    id: 'M2-10c-Q09',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 9 = ？',
    choices: ['32', '34', '36', '40'],
    correctAnswer: '36'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
