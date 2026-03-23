/**
 * M2-10h.js - Grimoire Guardians 問題データ
 * ユニット: M2-10h「九九 9のだん」
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
    id: 'M2-10h-Q01',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9のだんは 9ずつ ふえるよ！\n9 × 1 = ？',
    choices: ['1', '8', '9', '18'],
    correctAnswer: '9'
  },
  {
    id: 'M2-10h-Q02',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 1 = 9 だよ。\nでは 9 × 2 = ？',
    choices: ['9', '16', '18', '27'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10h-Q03',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 2 = 18 だよ。\nでは 9 × 3 = ？',
    choices: ['18', '24', '27', '36'],
    correctAnswer: '27'
  },
  {
    id: 'M2-10h-Q04',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 3 = 27 だよ。\nでは 9 × 4 = ？',
    choices: ['27', '32', '36', '45'],
    correctAnswer: '36'
  },
  {
    id: 'M2-10h-Q05',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 4 = 36 だよ。\nでは 9 × 5 = ？',
    choices: ['36', '40', '45', '54'],
    correctAnswer: '45'
  },
  {
    id: 'M2-10h-Q06',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 5 = 45 だよ。\nでは 9 × 6 = ？',
    choices: ['45', '48', '54', '63'],
    correctAnswer: '54'
  },
  {
    id: 'M2-10h-Q07',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 6 = 54 だよ。\nでは 9 × 7 = ？',
    choices: ['54', '56', '63', '72'],
    correctAnswer: '63'
  },
  {
    id: 'M2-10h-Q08',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 7 = 63 だよ。\nでは 9 × 8 = ？',
    choices: ['63', '64', '72', '81'],
    correctAnswer: '72'
  },
  {
    id: 'M2-10h-Q09',
    unitId: 'M2-10h',
    step: 1,
    type: 'text',
    question: '9 × 8 = 72 だよ。\nでは 9 × 9 = ？',
    choices: ['72', '76', '81', '90'],
    correctAnswer: '81'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10h-Q10',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 7 = ？',
    choices: ['54', '63', '64', '72'],
    correctAnswer: '63'
  },
  {
    id: 'M2-10h-Q11',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 4 = ？',
    choices: ['32', '36', '40', '45'],
    correctAnswer: '36'
  },
  {
    id: 'M2-10h-Q12',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 9 = ？',
    choices: ['72', '76', '81', '90'],
    correctAnswer: '81'
  },
  {
    id: 'M2-10h-Q13',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 3 = ？',
    choices: ['24', '27', '30', '36'],
    correctAnswer: '27'
  },
  {
    id: 'M2-10h-Q14',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 1 = ？',
    choices: ['1', '8', '9', '18'],
    correctAnswer: '9'
  },
  {
    id: 'M2-10h-Q15',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 6 = ？',
    choices: ['48', '54', '56', '63'],
    correctAnswer: '54'
  },
  {
    id: 'M2-10h-Q16',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 8 = ？',
    choices: ['63', '72', '76', '81'],
    correctAnswer: '72'
  },
  {
    id: 'M2-10h-Q17',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 5 = ？',
    choices: ['40', '45', '48', '54'],
    correctAnswer: '45'
  },
  {
    id: 'M2-10h-Q18',
    unitId: 'M2-10h',
    step: 2,
    type: 'text',
    question: '9 × 2 = ？',
    choices: ['16', '18', '20', '27'],
    correctAnswer: '18'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10h-Q19',
    unitId: 'M2-10h',
    step: 3,
    type: 'text',
    question: '9 × □ = 63\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10h-Q20',
    unitId: 'M2-10h',
    step: 3,
    type: 'text',
    question: '9 × □ = 36\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10h-Q21',
    unitId: 'M2-10h',
    step: 3,
    type: 'text',
    question: '9人の チームが 8チーム あります。\nぜんいんで なんにんですか？',
    choices: ['63にん', '72にん', '76にん', '81にん'],
    correctAnswer: '72にん'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
