/**
 * M2-10g.js - Grimoire Guardians 問題データ
 * ユニット: M2-10g「九九 8のだん」
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
    id: 'M2-10g-Q01',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8のだんは 8ずつ ふえるよ！\n8 × 1 = ？',
    choices: ['4', '6', '8', '16'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10g-Q02',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 1 = 8 だよ。\nでは 8 × 2 = ？',
    choices: ['8', '14', '16', '24'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10g-Q03',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 2 = 16 だよ。\nでは 8 × 3 = ？',
    choices: ['16', '21', '24', '32'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10g-Q04',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 3 = 24 だよ。\nでは 8 × 4 = ？',
    choices: ['24', '28', '32', '40'],
    correctAnswer: '32'
  },
  {
    id: 'M2-10g-Q05',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 4 = 32 だよ。\nでは 8 × 5 = ？',
    choices: ['32', '36', '40', '48'],
    correctAnswer: '40'
  },
  {
    id: 'M2-10g-Q06',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 5 = 40 だよ。\nでは 8 × 6 = ？',
    choices: ['40', '44', '48', '56'],
    correctAnswer: '48'
  },
  {
    id: 'M2-10g-Q07',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 6 = 48 だよ。\nでは 8 × 7 = ？',
    choices: ['48', '52', '56', '64'],
    correctAnswer: '56'
  },
  {
    id: 'M2-10g-Q08',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 7 = 56 だよ。\nでは 8 × 8 = ？',
    choices: ['56', '60', '63', '64'],
    correctAnswer: '64'
  },
  {
    id: 'M2-10g-Q09',
    unitId: 'M2-10g',
    step: 1,
    type: 'text',
    question: '8 × 8 = 64 だよ。\nでは 8 × 9 = ？',
    choices: ['64', '68', '72', '80'],
    correctAnswer: '72'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10g-Q10',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 7 = ？',
    choices: ['49', '54', '56', '63'],
    correctAnswer: '56'
  },
  {
    id: 'M2-10g-Q11',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 4 = ？',
    choices: ['28', '32', '36', '40'],
    correctAnswer: '32'
  },
  {
    id: 'M2-10g-Q12',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 9 = ？',
    choices: ['63', '72', '76', '81'],
    correctAnswer: '72'
  },
  {
    id: 'M2-10g-Q13',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 3 = ？',
    choices: ['21', '24', '27', '32'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10g-Q14',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 1 = ？',
    choices: ['4', '6', '8', '16'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10g-Q15',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 6 = ？',
    choices: ['42', '48', '54', '56'],
    correctAnswer: '48'
  },
  {
    id: 'M2-10g-Q16',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 8 = ？',
    choices: ['56', '63', '64', '72'],
    correctAnswer: '64'
  },
  {
    id: 'M2-10g-Q17',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 5 = ？',
    choices: ['35', '40', '45', '48'],
    correctAnswer: '40'
  },
  {
    id: 'M2-10g-Q18',
    unitId: 'M2-10g',
    step: 2,
    type: 'text',
    question: '8 × 2 = ？',
    choices: ['14', '16', '18', '24'],
    correctAnswer: '16'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10g-Q19',
    unitId: 'M2-10g',
    step: 3,
    type: 'text',
    question: '8 × □ = 56\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10g-Q20',
    unitId: 'M2-10g',
    step: 3,
    type: 'text',
    question: '8 × □ = 32\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10g-Q21',
    unitId: 'M2-10g',
    step: 3,
    type: 'text',
    question: 'たこやきが 1パックに 8こ ずつ はいっています。\n9パック かうと、\nたこやきは ぜんぶで なんこですか？',
    choices: ['63こ', '64こ', '72こ', '81こ'],
    correctAnswer: '72こ'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
