/**
 * M2-10b.js - Grimoire Guardians 問題データ
 * ユニット: M2-10b「九九 3のだん」
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
    id: 'M2-10b-Q01',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3のだんは 3ずつ ふえるよ！\n3 × 1 = ？',
    choices: ['1', '2', '3', '6'],
    correctAnswer: '3'
  },
  {
    id: 'M2-10b-Q02',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 1 = 3 だよ。\nでは 3 × 2 = ？',
    choices: ['3', '6', '9', '12'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10b-Q03',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 2 = 6 だよ。\nでは 3 × 3 = ？',
    choices: ['6', '7', '9', '12'],
    correctAnswer: '9'
  },
  {
    id: 'M2-10b-Q04',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 3 = 9 だよ。\nでは 3 × 4 = ？',
    choices: ['9', '11', '12', '15'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10b-Q05',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 4 = 12 だよ。\nでは 3 × 5 = ？',
    choices: ['12', '13', '15', '18'],
    correctAnswer: '15'
  },
  {
    id: 'M2-10b-Q06',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 5 = 15 だよ。\nでは 3 × 6 = ？',
    choices: ['15', '17', '18', '21'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10b-Q07',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 6 = 18 だよ。\nでは 3 × 7 = ？',
    choices: ['18', '20', '21', '24'],
    correctAnswer: '21'
  },
  {
    id: 'M2-10b-Q08',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 7 = 21 だよ。\nでは 3 × 8 = ？',
    choices: ['21', '22', '24', '27'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10b-Q09',
    unitId: 'M2-10b',
    step: 1,
    type: 'text',
    question: '3 × 8 = 24 だよ。\nでは 3 × 9 = ？',
    choices: ['24', '25', '27', '30'],
    correctAnswer: '27'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10b-Q10',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 7 = ？',
    choices: ['18', '21', '24', '28'],
    correctAnswer: '21'
  },
  {
    id: 'M2-10b-Q11',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 4 = ？',
    choices: ['8', '10', '12', '16'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10b-Q12',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 9 = ？',
    choices: ['24', '25', '27', '30'],
    correctAnswer: '27'
  },
  {
    id: 'M2-10b-Q13',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 2 = ？',
    choices: ['4', '5', '6', '9'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10b-Q14',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 6 = ？',
    choices: ['15', '18', '21', '24'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10b-Q15',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 1 = ？',
    choices: ['1', '2', '3', '6'],
    correctAnswer: '3'
  },
  {
    id: 'M2-10b-Q16',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 8 = ？',
    choices: ['21', '24', '27', '32'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10b-Q17',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 5 = ？',
    choices: ['10', '12', '15', '20'],
    correctAnswer: '15'
  },
  {
    id: 'M2-10b-Q18',
    unitId: 'M2-10b',
    step: 2,
    type: 'text',
    question: '3 × 3 = ？',
    choices: ['6', '8', '9', '12'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10b-Q19',
    unitId: 'M2-10b',
    step: 3,
    type: 'text',
    question: '3 × □ = 21\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10b-Q20',
    unitId: 'M2-10b',
    step: 3,
    type: 'text',
    question: '3 × □ = 12\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10b-Q21',
    unitId: 'M2-10b',
    step: 3,
    type: 'text',
    question: '1さらに クッキーが 3まい ずつ のっています。\nさらが 8まい あると、\nクッキーは ぜんぶで なんまいですか？',
    choices: ['21まい', '24まい', '27まい', '30まい'],
    correctAnswer: '24まい'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
