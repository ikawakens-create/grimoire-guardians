/**
 * M1-14a.js - Grimoire Guardians 問題データ
 * ユニット: M1-14a「かずの よみかき（10のまとまり）」
 *
 * 対象: 小学1年生、20〜100の数の読み書き・十の位と一の位の理解
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   「10のまとまり」という考え方を段階的に習得させる。
 *   20〜100を「10がいくつ」で理解し、十の位と一の位の分離へつなぐ。
 *
 * Step構成（シャッフル出題）
 *   Step1: 10のまとまりを かぞえよう（プール6問 → 4問出題）
 *   Step2: なんじゅうを よもう（プール6問 → 4問出題）
 *   Step3: じゅうのくらいと いちのくらい（プール6問 → 4問出題）
 *   Step4: まとめ（プール5問 → 3問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 10のまとまりを かぞえよう（プール6問）
  // =====================================================
  {
    id: 'M1-14a-Q01',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '🔲🔲\n10の まとまりが 2つ あります。\nぜんぶで いくつ？',
    choices: ['10', '20', '30', '40'],
    correctAnswer: '20',
    explanation: '10の まとまりが 2つ → 10 + 10 = 20'
  },
  {
    id: 'M1-14a-Q02',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '🔲🔲🔲🔲🔲\n10の まとまりが 5つ あります。\nぜんぶで いくつ？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '50',
    explanation: '10の まとまりが 5つ → 50'
  },
  {
    id: 'M1-14a-Q03',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '10の まとまりが 8つ あります。\nぜんぶで いくつ？',
    choices: ['60', '70', '80', '90'],
    correctAnswer: '80',
    explanation: '10の まとまりが 8つ → 80'
  },
  {
    id: 'M1-14a-Q04',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '10の まとまりが 10こ あります。\nぜんぶで いくつ？',
    choices: ['80', '90', '100', '110'],
    correctAnswer: '100',
    explanation: '10の まとまりが 10こ → 100（ひゃく）'
  },
  {
    id: 'M1-14a-Q16',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '🔲🔲🔲\n10の まとまりが 3つ あります。\nぜんぶで いくつ？',
    choices: ['20', '30', '40', '50'],
    correctAnswer: '30',
    explanation: '10の まとまりが 3つ → 10 + 10 + 10 = 30'
  },
  {
    id: 'M1-14a-Q17',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '10の まとまりが 7つ あります。\nぜんぶで いくつ？',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '70',
    explanation: '10の まとまりが 7つ → 70'
  },

  // =====================================================
  // Step2: なんじゅうを よもう（プール6問）
  // =====================================================
  {
    id: 'M1-14a-Q05',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '40 は なんと よみますか？',
    choices: ['さんじゅう', 'よんじゅう', 'ごじゅう', 'ろくじゅう'],
    correctAnswer: 'よんじゅう',
    explanation: '40 → よんじゅう'
  },
  {
    id: 'M1-14a-Q06',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '70 は なんと よみますか？',
    choices: ['ろくじゅう', 'ななじゅう', 'はちじゅう', 'きゅうじゅう'],
    correctAnswer: 'ななじゅう',
    explanation: '70 → ななじゅう'
  },
  {
    id: 'M1-14a-Q07',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '「ろくじゅう」は どの かずですか？',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '60',
    explanation: 'ろくじゅう → 60'
  },
  {
    id: 'M1-14a-Q08',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '「きゅうじゅう」は どの かずですか？',
    choices: ['70', '80', '90', '100'],
    correctAnswer: '90',
    explanation: 'きゅうじゅう → 90'
  },
  {
    id: 'M1-14a-Q18',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '30 は なんと よみますか？',
    choices: ['にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう'],
    correctAnswer: 'さんじゅう',
    explanation: '30 → さんじゅう'
  },
  {
    id: 'M1-14a-Q19',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '「はちじゅう」は どの かずですか？',
    choices: ['60', '70', '80', '90'],
    correctAnswer: '80',
    explanation: 'はちじゅう → 80'
  },

  // =====================================================
  // Step3: じゅうのくらいと いちのくらい（プール6問）
  // =====================================================
  {
    id: 'M1-14a-Q09',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '35 = 30 + □\n□に はいる かずは いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '35は 30と 5。いちのくらいは 5。'
  },
  {
    id: 'M1-14a-Q10',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '48 = 40 + □\n□に はいる かずは いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '48は 40と 8。いちのくらいは 8。'
  },
  {
    id: 'M1-14a-Q11',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '60 + 3 = □\n□に はいる かずは いくつ？',
    choices: ['36', '63', '64', '66'],
    correctAnswer: '63',
    explanation: '60（ろくじゅう）と 3（さん）で 63。'
  },
  {
    id: 'M1-14a-Q12',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '20 + 7 = □\n□に はいる かずは いくつ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27',
    explanation: '20（にじゅう）と 7（なな）で 27。'
  },
  {
    id: 'M1-14a-Q20',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '70 + 4 = □\n□に はいる かずは いくつ？',
    choices: ['72', '73', '74', '75'],
    correctAnswer: '74',
    explanation: '70（ななじゅう）と 4（し）で 74。'
  },
  {
    id: 'M1-14a-Q21',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '50 + 6 = □\n□に はいる かずは いくつ？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '56',
    explanation: '50（ごじゅう）と 6（ろく）で 56。'
  },

  // =====================================================
  // Step4: まとめ（プール5問）
  // =====================================================
  {
    id: 'M1-14a-Q13',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '10が 4つ あります。ぜんぶで いくつ？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '40',
    explanation: '10が 4つ → 10×4 = 40'
  },
  {
    id: 'M1-14a-Q14',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '67は 60と □\n□に はいる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '67 = 60 + 7。いちのくらいは 7。'
  },
  {
    id: 'M1-14a-Q15',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '80は 10が □こ\n□に はいる かずは？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '80 ÷ 10 = 8。10が 8こ で 80。'
  },
  {
    id: 'M1-14a-Q22',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '10が 6つ あります。ぜんぶで いくつ？',
    choices: ['40', '50', '60', '70'],
    correctAnswer: '60',
    explanation: '10が 6つ → 10×6 = 60'
  },
  {
    id: 'M1-14a-Q23',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '93は 90と □\n□に はいる かずは？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: '93 = 90 + 3。いちのくらいは 3。'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 4 },
  { step: 3, pick: 4 },
  { step: 4, pick: 3 }
];

export default questions;
