/**
 * M2-10i.js - Grimoire Guardians 問題データ
 * ユニット: M2-10i「九九 1のだん・0のかけざん」
 * プール: 18問（1のだん9問 + 0のかけざん9問）/ 出題: 9問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── 1のだん（9問）──
  {
    id: 'M2-10i-Q01',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 1 = ？',
    choices: ['0', '1', '2', '3'],
    correctAnswer: '1'
  },
  {
    id: 'M2-10i-Q02',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 2 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M2-10i-Q03',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 3 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M2-10i-Q04',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 4 = ？',
    choices: ['3', '4', '5', '8'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10i-Q05',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 5 = ？',
    choices: ['1', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M2-10i-Q06',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 6 = ？',
    choices: ['5', '6', '7', '12'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10i-Q07',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 7 = ？',
    choices: ['6', '7', '8', '14'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10i-Q08',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 8 = ？',
    choices: ['7', '8', '9', '16'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10i-Q09',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '1 × 9 = ？',
    choices: ['8', '9', '10', '18'],
    correctAnswer: '9'
  },
  // ── 0のかけざん（9問）──
  {
    id: 'M2-10i-Q10',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '0 × 1 = ？',
    choices: ['0', '1', '2', '3'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q11',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '0 × 3 = ？',
    choices: ['0', '1', '3', '6'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q12',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '0 × 5 = ？',
    choices: ['0', '1', '5', '10'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q13',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '0 × 7 = ？',
    choices: ['0', '7', '14', '21'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q14',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '5 × 0 = ？',
    choices: ['0', '5', '10', '50'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q15',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '8 × 0 = ？',
    choices: ['0', '8', '16', '80'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q16',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '9 × 0 = ？',
    choices: ['0', '9', '18', '90'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q17',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '0 × 0 = ？',
    choices: ['0', '1', '2', '10'],
    correctAnswer: '0'
  },
  {
    id: 'M2-10i-Q18',
    unitId: 'M2-10i',
    step: 1,
    type: 'text',
    question: '100 × 0 = ？',
    choices: ['0', '1', '10', '100'],
    correctAnswer: '0'
  }
];

export const stepConfig = [
  { step: 1, pick: 9 }
];

export default questions;
