/**
 * M2-10a.js - Grimoire Guardians 問題データ
 * ユニット: M2-10a「九九 2のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10a-Q01',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 1 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M2-10a-Q02',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 2 = ？',
    choices: ['2', '4', '6', '8'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10a-Q03',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 3 = ？',
    choices: ['4', '5', '6', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10a-Q04',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 4 = ？',
    choices: ['6', '7', '8', '10'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10a-Q05',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 5 = ？',
    choices: ['8', '9', '10', '12'],
    correctAnswer: '10'
  },
  {
    id: 'M2-10a-Q06',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 6 = ？',
    choices: ['10', '11', '12', '14'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10a-Q07',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 7 = ？',
    choices: ['12', '13', '14', '16'],
    correctAnswer: '14'
  },
  {
    id: 'M2-10a-Q08',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 8 = ？',
    choices: ['14', '15', '16', '18'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10a-Q09',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 9 = ？',
    choices: ['16', '17', '18', '20'],
    correctAnswer: '18'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
