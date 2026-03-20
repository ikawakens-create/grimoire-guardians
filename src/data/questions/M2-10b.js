/**
 * M2-10b.js - Grimoire Guardians 問題データ
 * ユニット: M2-10b「九九 3のだん」
 * プール: 9問 / 出題: 9問（全問出題）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  {
    id: 'M2-10b-Q01',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 1 = ？',
    choices: ['1', '2', '3', '6'],
    correctAnswer: '3'
  },
  {
    id: 'M2-10b-Q02',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 2 = ？',
    choices: ['3', '6', '9', '12'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10b-Q03',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 3 = ？',
    choices: ['6', '7', '9', '12'],
    correctAnswer: '9'
  },
  {
    id: 'M2-10b-Q04',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 4 = ？',
    choices: ['9', '11', '12', '15'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10b-Q05',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 5 = ？',
    choices: ['12', '13', '15', '18'],
    correctAnswer: '15'
  },
  {
    id: 'M2-10b-Q06',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 6 = ？',
    choices: ['15', '17', '18', '21'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10b-Q07',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 7 = ？',
    choices: ['18', '20', '21', '24'],
    correctAnswer: '21'
  },
  {
    id: 'M2-10b-Q08',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 8 = ？',
    choices: ['21', '22', '24', '27'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10b-Q09',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 9 = ？',
    choices: ['24', '25', '27', '30'],
    correctAnswer: '27'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
