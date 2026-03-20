/**
 * M2-10h.js - Grimoire Guardians 問題データ
 * ユニット: M2-10h「九九 9のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10h-Q01',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 1 = ？',
    choices: ['1', '8', '9', '18'],
    correctAnswer: '9'
  },
  {
    id: 'M2-10h-Q02',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 2 = ？',
    choices: ['9', '16', '18', '27'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10h-Q03',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 3 = ？',
    choices: ['18', '24', '27', '36'],
    correctAnswer: '27'
  },
  {
    id: 'M2-10h-Q04',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 4 = ？',
    choices: ['27', '32', '36', '45'],
    correctAnswer: '36'
  },
  {
    id: 'M2-10h-Q05',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 5 = ？',
    choices: ['36', '40', '45', '54'],
    correctAnswer: '45'
  },
  {
    id: 'M2-10h-Q06',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 6 = ？',
    choices: ['45', '48', '54', '63'],
    correctAnswer: '54'
  },
  {
    id: 'M2-10h-Q07',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 7 = ？',
    choices: ['54', '56', '63', '72'],
    correctAnswer: '63'
  },
  {
    id: 'M2-10h-Q08',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 8 = ？',
    choices: ['63', '64', '72', '81'],
    correctAnswer: '72'
  },
  {
    id: 'M2-10h-Q09',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 9 = ？',
    choices: ['72', '76', '81', '90'],
    correctAnswer: '81'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
