/**
 * M1-11c.js - Grimoire Guardians 問題データ
 * ユニット: M1-11c「くりさがり（13〜18のせかい）」
 *
 * 対象: 小学1年生、繰り下がりの引き算（13〜18 台）
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   M1-11b（11・12台）を習得済みの前提で、より大きな数の繰り下がりに挑戦する。
 *   「どんな数でも、10と●に分けたら同じ！」のひらめきを定着させる。
 *   13〜18 の主要な引き算パターンをバランスよくカバーする。
 *   ※ 18-8=10 のように答えが10になるパターンは繰り下がりの範囲外のため除外。
 *
 * Step構成（シャッフル出題）
 *   Step1: 例題・アニメ誘導（プール5問 → 3問出題）
 *   Step2: 考え方・ヒント付き（プール5問 → 3問出題）
 *   Step3: 13〜15のせかい（プール7問 → 5問出題）
 *   Step4: 16〜18のせかい（プール6問 → 4問出題）
 *
 * ひらめきポイント:
 *   「どんな大きさでも、10と●に分けたら同じ！パターンだから覚えなくていい！」
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 例題（5問）
  // 大きい数でも減加法が使えることを示す
  // =====================================================
  {
    id: 'M1-11c-Q01',
    unitId: 'M1-11c',
    step: 1,
    type: 'choice',
    question: '13 - 8 = ？\n（13を 10と 3に わけよう！\n10 - 8 = 2、2 + 3 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: '13 = 10 + 3。10 - 8 = 2、2 + 3 = 5。答えは5！'
  },
  {
    id: 'M1-11c-Q02',
    unitId: 'M1-11c',
    step: 1,
    type: 'choice',
    question: '15 - 7 = ？\n（15を 10と 5に わけよう！\n10 - 7 = 3、3 + 5 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '15 = 10 + 5。10 - 7 = 3、3 + 5 = 8。答えは8！'
  },
  {
    id: 'M1-11c-Q03',
    unitId: 'M1-11c',
    step: 1,
    type: 'choice',
    question: '17 - 9 = ？\n（17を 10と 7に わけよう！\n10 - 9 = 1、1 + 7 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '17 = 10 + 7。10 - 9 = 1、1 + 7 = 8。答えは8！'
  },
  {
    id: 'M1-11c-Q16',
    unitId: 'M1-11c',
    step: 1,
    type: 'choice',
    question: '14 - 8 = ？\n（14を 10と 4に わけよう！\n10 - 8 = 2、2 + 4 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '14 = 10 + 4。10 - 8 = 2、2 + 4 = 6。答えは6！'
  },
  {
    id: 'M1-11c-Q17',
    unitId: 'M1-11c',
    step: 1,
    type: 'choice',
    question: '16 - 9 = ？\n（16を 10と 6に わけよう！\n10 - 9 = 1、1 + 6 = ？）',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '16 = 10 + 6。10 - 9 = 1、1 + 6 = 7。答えは7！'
  },

  // =====================================================
  // Step2: 考え方（5問）
  // ヒントを減らして自力でのステップを促す
  // =====================================================
  {
    id: 'M1-11c-Q04',
    unitId: 'M1-11c',
    step: 2,
    type: 'choice',
    question: '14 - 6 = ？\n（まず 10 - 6 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '10 - 6 = 4、4 + 4 = 8。答えは8！'
  },
  {
    id: 'M1-11c-Q05',
    unitId: 'M1-11c',
    step: 2,
    type: 'choice',
    question: '16 - 8 = ？\n（まず 10 - 8 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '10 - 8 = 2、2 + 6 = 8。答えは8！'
  },
  {
    id: 'M1-11c-Q06',
    unitId: 'M1-11c',
    step: 2,
    type: 'choice',
    question: '18 - 9 = ？\n（まず 10 - 9 = □ を かんがえよう）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '10 - 9 = 1、1 + 8 = 9。答えは9！'
  },
  {
    id: 'M1-11c-Q18',
    unitId: 'M1-11c',
    step: 2,
    type: 'choice',
    question: '13 - 5 = ？\n（まず 10 - 5 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '10 - 5 = 5、5 + 3 = 8。答えは8！'
  },
  {
    id: 'M1-11c-Q19',
    unitId: 'M1-11c',
    step: 2,
    type: 'choice',
    question: '15 - 8 = ？\n（まず 10 - 8 = □ を かんがえよう）',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '10 - 8 = 2、2 + 5 = 7。答えは7！'
  },

  // =====================================================
  // Step3: 13〜15のせかい（7問）
  // 自力で解く。13・14・15台の代表的パターン
  // =====================================================
  {
    id: 'M1-11c-Q07',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '13 - 4 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q08',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '13 - 7 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-Q09',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '14 - 9 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11c-Q10',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '15 - 6 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q11',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '15 - 9 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-Q20',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '13 - 6 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11c-Q21',
    unitId: 'M1-11c',
    step: 3,
    type: 'choice',
    question: '14 - 7 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },

  // =====================================================
  // Step4: 16〜18のせかい（6問）
  // 最も大きい数の繰り下がり。自信をつける達成感を演出
  // =====================================================
  {
    id: 'M1-11c-Q12',
    unitId: 'M1-11c',
    step: 4,
    type: 'choice',
    question: '16 - 7 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q13',
    unitId: 'M1-11c',
    step: 4,
    type: 'choice',
    question: '16 - 9 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11c-Q14',
    unitId: 'M1-11c',
    step: 4,
    type: 'choice',
    question: '17 - 8 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q15',
    unitId: 'M1-11c',
    step: 4,
    type: 'choice',
    question: '13 - 9 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-11c-Q22',
    unitId: 'M1-11c',
    step: 4,
    type: 'choice',
    question: '17 - 9 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-Q23',
    unitId: 'M1-11c',
    step: 4,
    type: 'choice',
    question: '18 - 9 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 3 },
  { step: 3, pick: 5 },
  { step: 4, pick: 4 }
];

export default questions;
