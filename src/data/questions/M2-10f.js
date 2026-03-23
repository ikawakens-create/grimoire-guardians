/**
 * M2-10f.js - Grimoire Guardians 問題データ
 * ユニット: M2-10f「九九 7のだん」
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
    id: 'M2-10f-Q01',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7のだんは 7ずつ ふえるよ！\n7 × 1 = ？',
    choices: ['1', '6', '7', '14'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10f-Q02',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 1 = 7 だよ。\nでは 7 × 2 = ？',
    choices: ['7', '12', '14', '21'],
    correctAnswer: '14'
  },
  {
    id: 'M2-10f-Q03',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 2 = 14 だよ。\nでは 7 × 3 = ？',
    choices: ['14', '18', '21', '28'],
    correctAnswer: '21'
  },
  {
    id: 'M2-10f-Q04',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 3 = 21 だよ。\nでは 7 × 4 = ？',
    choices: ['21', '24', '28', '35'],
    correctAnswer: '28'
  },
  {
    id: 'M2-10f-Q05',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 4 = 28 だよ。\nでは 7 × 5 = ？',
    choices: ['28', '32', '35', '42'],
    correctAnswer: '35'
  },
  {
    id: 'M2-10f-Q06',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 5 = 35 だよ。\nでは 7 × 6 = ？',
    choices: ['35', '38', '42', '49'],
    correctAnswer: '42'
  },
  {
    id: 'M2-10f-Q07',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 6 = 42 だよ。\nでは 7 × 7 = ？',
    choices: ['42', '46', '49', '56'],
    correctAnswer: '49'
  },
  {
    id: 'M2-10f-Q08',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 7 = 49 だよ。\nでは 7 × 8 = ？',
    choices: ['49', '52', '56', '63'],
    correctAnswer: '56'
  },
  {
    id: 'M2-10f-Q09',
    unitId: 'M2-10f',
    step: 1,
    type: 'text',
    question: '7 × 8 = 56 だよ。\nでは 7 × 9 = ？',
    choices: ['56', '60', '63', '70'],
    correctAnswer: '63'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10f-Q10',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 7 = ？',
    choices: ['42', '48', '49', '56'],
    correctAnswer: '49'
  },
  {
    id: 'M2-10f-Q11',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 4 = ？',
    choices: ['24', '28', '32', '36'],
    correctAnswer: '28'
  },
  {
    id: 'M2-10f-Q12',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 9 = ？',
    choices: ['56', '63', '64', '72'],
    correctAnswer: '63'
  },
  {
    id: 'M2-10f-Q13',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 3 = ？',
    choices: ['18', '21', '24', '27'],
    correctAnswer: '21'
  },
  {
    id: 'M2-10f-Q14',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 1 = ？',
    choices: ['1', '6', '7', '14'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10f-Q15',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 6 = ？',
    choices: ['36', '40', '42', '48'],
    correctAnswer: '42'
  },
  {
    id: 'M2-10f-Q16',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 8 = ？',
    choices: ['48', '54', '56', '64'],
    correctAnswer: '56'
  },
  {
    id: 'M2-10f-Q17',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 5 = ？',
    choices: ['30', '35', '40', '45'],
    correctAnswer: '35'
  },
  {
    id: 'M2-10f-Q18',
    unitId: 'M2-10f',
    step: 2,
    type: 'text',
    question: '7 × 2 = ？',
    choices: ['12', '14', '16', '21'],
    correctAnswer: '14'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10f-Q19',
    unitId: 'M2-10f',
    step: 3,
    type: 'text',
    question: '7 × □ = 49\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10f-Q20',
    unitId: 'M2-10f',
    step: 3,
    type: 'text',
    question: '7 × □ = 28\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10f-Q21',
    unitId: 'M2-10f',
    step: 3,
    type: 'text',
    question: '1しゅうかんは 7にちです。\n3しゅうかん では なんにちに なりますか？',
    choices: ['14にち', '21にち', '28にち', '35にち'],
    correctAnswer: '21にち'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
