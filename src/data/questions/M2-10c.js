/**
 * M2-10c.js - Grimoire Guardians 問題データ
 * ユニット: M2-10c「九九 4のだん」
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
    id: 'M2-10c-Q01',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4のだんは 4ずつ ふえるよ！\n4 × 1 = ？',
    choices: ['2', '3', '4', '8'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10c-Q02',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 1 = 4 だよ。\nでは 4 × 2 = ？',
    choices: ['4', '6', '8', '12'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10c-Q03',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 2 = 8 だよ。\nでは 4 × 3 = ？',
    choices: ['8', '10', '12', '16'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10c-Q04',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 3 = 12 だよ。\nでは 4 × 4 = ？',
    choices: ['12', '14', '16', '20'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10c-Q05',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 4 = 16 だよ。\nでは 4 × 5 = ？',
    choices: ['16', '18', '20', '24'],
    correctAnswer: '20'
  },
  {
    id: 'M2-10c-Q06',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 5 = 20 だよ。\nでは 4 × 6 = ？',
    choices: ['20', '22', '24', '28'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10c-Q07',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 6 = 24 だよ。\nでは 4 × 7 = ？',
    choices: ['24', '26', '28', '32'],
    correctAnswer: '28'
  },
  {
    id: 'M2-10c-Q08',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 7 = 28 だよ。\nでは 4 × 8 = ？',
    choices: ['28', '30', '32', '36'],
    correctAnswer: '32'
  },
  {
    id: 'M2-10c-Q09',
    unitId: 'M2-10c',
    step: 1,
    type: 'text',
    question: '4 × 8 = 32 だよ。\nでは 4 × 9 = ？',
    choices: ['32', '34', '36', '40'],
    correctAnswer: '36'
  },

  // =====================================================
  // Step2: おぼえたかな？（ヒントなし・順不同）
  // =====================================================
  {
    id: 'M2-10c-Q10',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 6 = ？',
    choices: ['20', '24', '28', '30'],
    correctAnswer: '24'
  },
  {
    id: 'M2-10c-Q11',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 3 = ？',
    choices: ['9', '10', '12', '16'],
    correctAnswer: '12'
  },
  {
    id: 'M2-10c-Q12',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 9 = ？',
    choices: ['32', '36', '40', '45'],
    correctAnswer: '36'
  },
  {
    id: 'M2-10c-Q13',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 7 = ？',
    choices: ['24', '28', '32', '35'],
    correctAnswer: '28'
  },
  {
    id: 'M2-10c-Q14',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 1 = ？',
    choices: ['2', '3', '4', '8'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10c-Q15',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 5 = ？',
    choices: ['15', '20', '24', '25'],
    correctAnswer: '20'
  },
  {
    id: 'M2-10c-Q16',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 8 = ？',
    choices: ['27', '30', '32', '36'],
    correctAnswer: '32'
  },
  {
    id: 'M2-10c-Q17',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 4 = ？',
    choices: ['12', '14', '16', '20'],
    correctAnswer: '16'
  },
  {
    id: 'M2-10c-Q18',
    unitId: 'M2-10c',
    step: 2,
    type: 'text',
    question: '4 × 2 = ？',
    choices: ['6', '8', '10', '12'],
    correctAnswer: '8'
  },

  // =====================================================
  // Step3: おうよう（逆向き・文章題）
  // =====================================================
  {
    id: 'M2-10c-Q19',
    unitId: 'M2-10c',
    step: 3,
    type: 'text',
    question: '4 × □ = 28\n□ に あてはまる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10c-Q20',
    unitId: 'M2-10c',
    step: 3,
    type: 'text',
    question: '4 × □ = 16\n□ に あてはまる かずは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M2-10c-Q21',
    unitId: 'M2-10c',
    step: 3,
    type: 'text',
    question: 'いすが 1れつに 4きゃく ずつ ならんでいます。\n7れつ あると、\nいすは ぜんぶで なんきゃくですか？',
    choices: ['24きゃく', '28きゃく', '32きゃく', '36きゃく'],
    correctAnswer: '28きゃく'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 2 }
];

export default questions;
