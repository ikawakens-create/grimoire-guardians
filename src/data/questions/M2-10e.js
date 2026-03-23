/**
 * M2-10e.js - Grimoire Guardians 問題データ
 * ユニット: M2-10e「九九 6のだん」
 *
 * Step構成（シャッフル出題）
 *   Step1: じゅんばんに おぼえよう（ヒントつき・プール9問 → 4問出題）
 *   Step2: おぼえたかな？（ヒントなし・順不同・プール9問 → 3問出題）
 *   Step3: おうよう（逆向き・文章題・プール3問 → 2問出題）
 *
 * @version 2.0
 * @date 2026-03-23
 */

const questions = [

  // =====================================================
  // Step1: じゅんばんに おぼえよう（ヒントつき）
  // =====================================================
  {
    id: 'M2-10e-Q01',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6のだんは 6ずつ ふえるよ！\n6 × 1 = ？',
    choices: ['1', '5', '6', '12'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10e-Q02',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 1 = 6 だよ。\nでは 6 × 2 = ？',
    choices: ['6', '10', '12', '18'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10e-Q03',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 2 = 12 だよ。\nでは 6 × 3 = ？',
    choices: ['12', '15', '18', '24'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10e-Q04',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 3 = 18 だよ。\nでは 6 × 4 = ？',
    choices: ['18', '21', '24', '30'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10e-Q05',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 4 = 24 だよ。\nでは 6 × 5 = ？',
    choices: ['24', '27', '30', '36'],
    correctAnswer: '30'
  },
  {
    id: 'M2-10e-Q06',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 5 = 30 だよ。\nでは 6 × 6 = ？',
    choices: ['30', '33', '36', '42'],
    correctAnswer: '36'
  },
  {
    id: 'M2-10e-Q07',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 6 = 36 だよ。\nでは 6 × 7 = ？',
    choices: ['36', '40', '42', '48'],
    correctAnswer: '42'
  },
  {
    id: 'M2-10e-Q08',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 7 = 42 だよ。\nでは 6 × 8 = ？',
    choices: ['42', '45', '48', '54'],
    correctAnswer: '48'
  },
  {
    id: 'M2-10e-Q09',
    unitId: 'M2-10e',
    step: 1,
    type: 'text',
    question: '6 × 8 = 48 だよ。\nでは 6 × 9 = ？',
    choices: ['48', '51', '54', '60'],
    correctAnswer: '54'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10e-Q10',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 7 = ？',
    choices: ['35', '42', '48', '49'],
    correctAnswer: '42'
  },
  {
    id: 'M2-10e-Q11',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 4 = ？',
    choices: ['20', '24', '28', '30'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10e-Q12',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 9 = ？',
    choices: ['48', '54', '56', '63'],
    correctAnswer: '54'
  },
  {
    id: 'M2-10e-Q13',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 3 = ？',
    choices: ['15', '18', '21', '24'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10e-Q14',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 1 = ？',
    choices: ['1', '5', '6', '12'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10e-Q15',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 6 = ？',
    choices: ['30', '35', '36', '42'],
    correctAnswer: '36'
  },
  {
    id: 'M2-10e-Q16',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 8 = ？',
    choices: ['42', '48', '54', '56'],
    correctAnswer: '48'
  },
  {
    id: 'M2-10e-Q17',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 5 = ？',
    choices: ['24', '28', '30', '35'],
    correctAnswer: '30'
  },
  {
    id: 'M2-10e-Q18',
    unitId: 'M2-10e',
    step: 2,
    type: 'text',
    question: '6 × 2 = ？',
    choices: ['10', '12', '14', '18'],
    correctAnswer: '12'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10e-Q19',
    unitId: 'M2-10e',
    step: 3,
    type: 'text',
    question: '6 × □ = 42\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10e-Q20',
    unitId: 'M2-10e',
    step: 3,
    type: 'text',
    question: '6 × □ = 24\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10e-Q21',
    unitId: 'M2-10e',
    step: 3,
    type: 'text',
    question: 'ケーキが 1はこに 6こ ずつ はいっています。\n5はこ あると、\nケーキは ぜんぶで なんこですか？',
    choices: ['24こ', '30こ', '36こ', '42こ'],
    correctAnswer: '30こ'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
