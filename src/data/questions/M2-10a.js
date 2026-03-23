/**
 * M2-10a.js - Grimoire Guardians 問題データ
 * ユニット: M2-10a「九九 2のだん」
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
    id: 'M2-10a-Q01',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2のだんは 2ずつ ふえるよ！\n2 × 1 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M2-10a-Q02',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 1 = 2 だよ。\nでは 2 × 2 = ？',
    choices: ['2', '4', '6', '8'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10a-Q03',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 2 = 4 だよ。\nでは 2 × 3 = ？',
    choices: ['4', '5', '6', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10a-Q04',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 3 = 6 だよ。\nでは 2 × 4 = ？',
    choices: ['6', '7', '8', '10'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10a-Q05',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 4 = 8 だよ。\nでは 2 × 5 = ？',
    choices: ['8', '9', '10', '12'],
    correctAnswer: '10'
  },
  {
    id: 'M2-10a-Q06',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 5 = 10 だよ。\nでは 2 × 6 = ？',
    choices: ['10', '11', '12', '14'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10a-Q07',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 6 = 12 だよ。\nでは 2 × 7 = ？',
    choices: ['12', '13', '14', '16'],
    correctAnswer: '14'
  },
  {
    id: 'M2-10a-Q08',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 7 = 14 だよ。\nでは 2 × 8 = ？',
    choices: ['14', '15', '16', '18'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10a-Q09',
    unitId: 'M2-10a',
    step: 1,
    type: 'text',
    question: '2 × 8 = 16 だよ。\nでは 2 × 9 = ？',
    choices: ['16', '17', '18', '20'],
    correctAnswer: '18'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10a-Q10',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 7 = ？',
    choices: ['12', '14', '16', '18'],
    correctAnswer: '14'
  },
  {
    id: 'M2-10a-Q11',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 3 = ？',
    choices: ['4', '6', '8', '9'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10a-Q12',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 9 = ？',
    choices: ['16', '17', '18', '20'],
    correctAnswer: '18'
  },
  {
    id: 'M2-10a-Q13',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 5 = ？',
    choices: ['8', '10', '12', '15'],
    correctAnswer: '10'
  },
  {
    id: 'M2-10a-Q14',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 1 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M2-10a-Q15',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 4 = ？',
    choices: ['6', '8', '10', '12'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10a-Q16',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 8 = ？',
    choices: ['14', '16', '18', '24'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10a-Q17',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 6 = ？',
    choices: ['10', '12', '14', '18'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10a-Q18',
    unitId: 'M2-10a',
    step: 2,
    type: 'text',
    question: '2 × 2 = ？',
    choices: ['2', '4', '6', '9'],
    correctAnswer: '4'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10a-Q19',
    unitId: 'M2-10a',
    step: 3,
    type: 'text',
    question: '2 × □ = 14\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10a-Q20',
    unitId: 'M2-10a',
    step: 3,
    type: 'text',
    question: '2 × □ = 8\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10a-Q21',
    unitId: 'M2-10a',
    step: 3,
    type: 'text',
    question: 'ふくろに みかんが 2こ ずつ はいっています。\nふくろが 6つ あると、\nみかんは ぜんぶで なんこですか？',
    choices: ['10こ', '12こ', '14こ', '16こ'],
    correctAnswer: '12こ'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
