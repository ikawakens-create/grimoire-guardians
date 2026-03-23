/**
 * M2-10d.js - Grimoire Guardians 問題データ
 * ユニット: M2-10d「九九 5のだん」
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
    id: 'M2-10d-Q01',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5のだんは 5ずつ ふえるよ！\n5 × 1 = ？',
    choices: ['1', '5', '10', '15'],
    correctAnswer: '5'
  },
  {
    id: 'M2-10d-Q02',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 1 = 5 だよ。\nでは 5 × 2 = ？',
    choices: ['5', '8', '10', '15'],
    correctAnswer: '10'
  },
  {
    id: 'M2-10d-Q03',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 2 = 10 だよ。\nでは 5 × 3 = ？',
    choices: ['10', '13', '15', '20'],
    correctAnswer: '15'
  },
  {
    id: 'M2-10d-Q04',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 3 = 15 だよ。\nでは 5 × 4 = ？',
    choices: ['15', '18', '20', '25'],
    correctAnswer: '20'
  },
  {
    id: 'M2-10d-Q05',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 4 = 20 だよ。\nでは 5 × 5 = ？',
    choices: ['20', '22', '25', '30'],
    correctAnswer: '25'
  },
  {
    id: 'M2-10d-Q06',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 5 = 25 だよ。\nでは 5 × 6 = ？',
    choices: ['25', '28', '30', '35'],
    correctAnswer: '30'
  },
  {
    id: 'M2-10d-Q07',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 6 = 30 だよ。\nでは 5 × 7 = ？',
    choices: ['30', '33', '35', '40'],
    correctAnswer: '35'
  },
  {
    id: 'M2-10d-Q08',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 7 = 35 だよ。\nでは 5 × 8 = ？',
    choices: ['35', '38', '40', '45'],
    correctAnswer: '40'
  },
  {
    id: 'M2-10d-Q09',
    unitId: 'M2-10d',
    step: 1,
    type: 'text',
    question: '5 × 8 = 40 だよ。\nでは 5 × 9 = ？',
    choices: ['40', '42', '45', '50'],
    correctAnswer: '45'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10d-Q10',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 7 = ？',
    choices: ['28', '30', '35', '42'],
    correctAnswer: '35'
  },
  {
    id: 'M2-10d-Q11',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 4 = ？',
    choices: ['16', '18', '20', '24'],
    correctAnswer: '20'
  },
  {
    id: 'M2-10d-Q12',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 9 = ？',
    choices: ['40', '42', '45', '54'],
    correctAnswer: '45'
  },
  {
    id: 'M2-10d-Q13',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 3 = ？',
    choices: ['12', '13', '15', '20'],
    correctAnswer: '15'
  },
  {
    id: 'M2-10d-Q14',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 1 = ？',
    choices: ['1', '5', '10', '15'],
    correctAnswer: '5'
  },
  {
    id: 'M2-10d-Q15',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 6 = ？',
    choices: ['24', '28', '30', '36'],
    correctAnswer: '30'
  },
  {
    id: 'M2-10d-Q16',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 8 = ？',
    choices: ['35', '40', '42', '48'],
    correctAnswer: '40'
  },
  {
    id: 'M2-10d-Q17',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 2 = ？',
    choices: ['6', '8', '10', '12'],
    correctAnswer: '10'
  },
  {
    id: 'M2-10d-Q18',
    unitId: 'M2-10d',
    step: 2,
    type: 'text',
    question: '5 × 5 = ？',
    choices: ['20', '25', '30', '36'],
    correctAnswer: '25'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10d-Q19',
    unitId: 'M2-10d',
    step: 3,
    type: 'text',
    question: '5 × □ = 35\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10d-Q20',
    unitId: 'M2-10d',
    step: 3,
    type: 'text',
    question: '5 × □ = 20\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10d-Q21',
    unitId: 'M2-10d',
    step: 3,
    type: 'text',
    question: 'えんぴつが 1はこに 5ほん ずつ はいっています。\n6はこ あると、\nえんぴつは ぜんぶで なんぼんですか？',
    choices: ['25ほん', '30ほん', '35ほん', '40ほん'],
    correctAnswer: '30ほん'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
