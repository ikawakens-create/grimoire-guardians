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
 *   Step1: 10のまとまりを かぞえよう（プール9問 → 4問出題）
 *   Step2: なんじゅうを よもう（プール9問 → 4問出題）
 *   Step3: じゅうのくらいと いちのくらい（プール9問 → 4問出題）
 *   Step4: まとめ（プール8問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 10のまとまりを かぞえよう（プール9問）
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
  {
    id: 'M1-14a-Q24',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '10の まとまりが 4つ あります。\nぜんぶで いくつ？',
    choices: ['20', '30', '40', '50'],
    correctAnswer: '40',
    explanation: '10の まとまりが 4つ → 40'
  },
  {
    id: 'M1-14a-Q25',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '10の まとまりが 6つ あります。\nぜんぶで いくつ？',
    choices: ['40', '50', '60', '70'],
    correctAnswer: '60',
    explanation: '10の まとまりが 6つ → 60'
  },
  {
    id: 'M1-14a-Q26',
    unitId: 'M1-14a',
    step: 1,
    type: 'choice',
    question: '10の まとまりが 9つ あります。\nぜんぶで いくつ？',
    choices: ['70', '80', '90', '100'],
    correctAnswer: '90',
    explanation: '10の まとまりが 9つ → 90'
  },

  // =====================================================
  // Step2: なんじゅうを よもう（プール9問）
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
  {
    id: 'M1-14a-Q27',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '20 は なんと よみますか？',
    choices: ['じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう'],
    correctAnswer: 'にじゅう',
    explanation: '20 → にじゅう'
  },
  {
    id: 'M1-14a-Q28',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '「ごじゅう」は どの かずですか？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '50',
    explanation: 'ごじゅう → 50'
  },
  {
    id: 'M1-14a-Q29',
    unitId: 'M1-14a',
    step: 2,
    type: 'choice',
    question: '100 は なんと よみますか？',
    choices: ['きゅうじゅう', 'ひゃく', 'じゅう', 'せん'],
    correctAnswer: 'ひゃく',
    explanation: '100 → ひゃく'
  },

  // =====================================================
  // Step3: じゅうのくらいと いちのくらい（プール9問）
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
  {
    id: 'M1-14a-Q30',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '82 = 80 + □\n□に はいる かずは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '82は 80と 2。いちのくらいは 2。'
  },
  {
    id: 'M1-14a-Q31',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '40 + 9 = □\n□に はいる かずは いくつ？',
    choices: ['45', '47', '49', '50'],
    correctAnswer: '49',
    explanation: '40（よんじゅう）と 9（きゅう）で 49。'
  },
  {
    id: 'M1-14a-Q32',
    unitId: 'M1-14a',
    step: 3,
    type: 'choice',
    question: '91 = 90 + □\n□に はいる かずは いくつ？',
    choices: ['1', '2', '3', '9'],
    correctAnswer: '1',
    explanation: '91は 90と 1。いちのくらいは 1。'
  },

  // =====================================================
  // Step4: まとめ（プール8問）
  // =====================================================
  {
    id: 'M1-14a-Q13',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '10が 4つ あります。ぜんぶで いくつ？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '40',
    explanation: '10が 4つ → 40'
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
    explanation: '10が 8こ で 80。'
  },
  {
    id: 'M1-14a-Q22',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '10が 6つ あります。ぜんぶで いくつ？',
    choices: ['40', '50', '60', '70'],
    correctAnswer: '60',
    explanation: '10が 6つ → 60'
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
  },
  {
    id: 'M1-14a-Q33',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '10が 9つ あります。ぜんぶで いくつ？',
    choices: ['70', '80', '90', '100'],
    correctAnswer: '90',
    explanation: '10が 9つ → 90'
  },
  {
    id: 'M1-14a-Q34',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '54は 50と □\n□に はいる かずは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: '54 = 50 + 4。いちのくらいは 4。'
  },
  {
    id: 'M1-14a-Q35',
    unitId: 'M1-14a',
    step: 4,
    type: 'choice',
    question: '10が 5つ あります。ぜんぶで いくつ？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '50',
    explanation: '10が 5つ → 50'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 4 },
  { step: 3, pick: 4 },
  { step: 4, pick: 3 }
];

export default questions;
