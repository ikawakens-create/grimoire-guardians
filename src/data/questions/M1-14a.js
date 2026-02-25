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
 * カテゴリ構成（15問）
 *   Step1: 10のまとまりを かぞえよう（4問）← 一番やさしい
 *   Step2: なんじゅうを よもう（4問）
 *   Step3: じゅうの くらいと いちの くらい（4問）← 概念的にやや難しい
 *   Step4: まとめ（3問）
 *
 * @version 1.0
 * @date 2026-02-25
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string, explanation:string}>} */
const questions = [

  // =====================================================
  // Step1: 10のまとまりを かぞえよう（4問）
  // 10のまとまりがいくつあるかを数える
  // =====================================================
  {
    id: 'M1-14a-Q01',
    unitId: 'M1-14a',
    type: 'choice',
    question: '🔲🔲\n10の まとまりが 2つ あります。\nぜんぶで いくつ？',
    choices: ['10', '20', '30', '40'],
    correctAnswer: '20',
    explanation: '10の まとまりが 2つ → 10 + 10 = 20'
  },
  {
    id: 'M1-14a-Q02',
    unitId: 'M1-14a',
    type: 'choice',
    question: '🔲🔲🔲🔲🔲\n10の まとまりが 5つ あります。\nぜんぶで いくつ？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '50',
    explanation: '10の まとまりが 5つ → 50'
  },
  {
    id: 'M1-14a-Q03',
    unitId: 'M1-14a',
    type: 'choice',
    question: '10の まとまりが 8つ あります。\nぜんぶで いくつ？',
    choices: ['60', '70', '80', '90'],
    correctAnswer: '80',
    explanation: '10の まとまりが 8つ → 80'
  },
  {
    id: 'M1-14a-Q04',
    unitId: 'M1-14a',
    type: 'choice',
    question: '10の まとまりが 10こ あります。\nぜんぶで いくつ？',
    choices: ['80', '90', '100', '110'],
    correctAnswer: '100',
    explanation: '10の まとまりが 10こ → 100（ひゃく）'
  },

  // =====================================================
  // Step2: なんじゅうを よもう（4問）
  // 数字とよみ方の対応を覚える
  // =====================================================
  {
    id: 'M1-14a-Q05',
    unitId: 'M1-14a',
    type: 'choice',
    question: '40 は なんと よみますか？',
    choices: ['さんじゅう', 'よんじゅう', 'ごじゅう', 'ろくじゅう'],
    correctAnswer: 'よんじゅう',
    explanation: '40 → よんじゅう'
  },
  {
    id: 'M1-14a-Q06',
    unitId: 'M1-14a',
    type: 'choice',
    question: '70 は なんと よみますか？',
    choices: ['ろくじゅう', 'ななじゅう', 'はちじゅう', 'きゅうじゅう'],
    correctAnswer: 'ななじゅう',
    explanation: '70 → ななじゅう'
  },
  {
    id: 'M1-14a-Q07',
    unitId: 'M1-14a',
    type: 'choice',
    question: '「ろくじゅう」は どの かずですか？',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '60',
    explanation: 'ろくじゅう → 60'
  },
  {
    id: 'M1-14a-Q08',
    unitId: 'M1-14a',
    type: 'choice',
    question: '「きゅうじゅう」は どの かずですか？',
    choices: ['70', '80', '90', '100'],
    correctAnswer: '90',
    explanation: 'きゅうじゅう → 90'
  },

  // =====================================================
  // Step3: じゅうのくらいと いちのくらい（4問）
  // 十の位・一の位の分離を理解する
  // =====================================================
  {
    id: 'M1-14a-Q09',
    unitId: 'M1-14a',
    type: 'choice',
    question: '35 = 30 + □\n□に はいる かずは いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '35は 30と 5。いちのくらいは 5。'
  },
  {
    id: 'M1-14a-Q10',
    unitId: 'M1-14a',
    type: 'choice',
    question: '48 = 40 + □\n□に はいる かずは いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '48は 40と 8。いちのくらいは 8。'
  },
  {
    id: 'M1-14a-Q11',
    unitId: 'M1-14a',
    type: 'choice',
    question: '60 + 3 = □\n□に はいる かずは いくつ？',
    choices: ['36', '63', '64', '66'],
    correctAnswer: '63',
    explanation: '60（ろくじゅう）と 3（さん）で 63。'
  },
  {
    id: 'M1-14a-Q12',
    unitId: 'M1-14a',
    type: 'choice',
    question: '20 + 7 = □\n□に はいる かずは いくつ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27',
    explanation: '20（にじゅう）と 7（なな）で 27。'
  },

  // =====================================================
  // Step4: まとめ（3問）
  // Step1〜Step3の総合確認
  // =====================================================
  {
    id: 'M1-14a-Q13',
    unitId: 'M1-14a',
    type: 'choice',
    question: '10が 4つ あります。ぜんぶで いくつ？',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '40',
    explanation: '10が 4つ → 10×4 = 40'
  },
  {
    id: 'M1-14a-Q14',
    unitId: 'M1-14a',
    type: 'choice',
    question: '67は 60と □\n□に はいる かずは？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '67 = 60 + 7。いちのくらいは 7。'
  },
  {
    id: 'M1-14a-Q15',
    unitId: 'M1-14a',
    type: 'choice',
    question: '80は 10が □こ\n□に はいる かずは？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '80 ÷ 10 = 8。10が 8こ で 80。'
  }
];

export default questions;
