/**
 * M1-02.js - Grimoire Guardians 問題データ
 * ユニット: M1-02「10までの かず」
 *
 * 対象: 小学1年生、6〜10の数の認識・順序・大小・漢数字
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: かずを かぞえよう（プール5問 → 3問出題）
 *   Step2: かずの じゅんじょ（プール6問 → 4問出題）
 *   Step3: おおきい・ちいさい（プール6問 → 4問出題）
 *   Step4: かんじの かず（プール6問 → 4問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かずを かぞえよう（6〜10を数える）
  // =====================================================
  {
    id: 'M1-02-Q01',
    unitId: 'M1-02',
    step: 1,
    type: 'choice',
    question: '🍎🍎🍎🍎🍎🍎\nりんごは いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-02-Q02',
    unitId: 'M1-02',
    step: 1,
    type: 'choice',
    question: '⭐⭐⭐⭐⭐⭐⭐⭐\nほしは いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-02-Q03',
    unitId: 'M1-02',
    step: 1,
    type: 'choice',
    question: '🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸\nはなは いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-02-Q16',
    unitId: 'M1-02',
    step: 1,
    type: 'choice',
    question: '🐸🐸🐸🐸🐸🐸🐸\nかえるは いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-02-Q17',
    unitId: 'M1-02',
    step: 1,
    type: 'choice',
    question: '🍭🍭🍭🍭🍭🍭🍭🍭🍭\nあめは いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step2: かずの じゅんじょ（順序・前後・間）
  // =====================================================
  {
    id: 'M1-02-Q04',
    unitId: 'M1-02',
    step: 2,
    type: 'choice',
    question: '6の つぎの かずは いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-02-Q05',
    unitId: 'M1-02',
    step: 2,
    type: 'choice',
    question: '9の まえの かずは いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '8'
  },
  {
    id: 'M1-02-Q06',
    unitId: 'M1-02',
    step: 2,
    type: 'choice',
    question: '7と 9の あいだの かずは？',
    choices: ['6', '7', '8', '10'],
    correctAnswer: '8'
  },
  {
    id: 'M1-02-Q07',
    unitId: 'M1-02',
    step: 2,
    type: 'choice',
    question: '7、8、□、10\n□には なにが はいる？',
    choices: ['6', '7', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-02-Q18',
    unitId: 'M1-02',
    step: 2,
    type: 'choice',
    question: '6、□、8\n□には なにが はいる？',
    choices: ['5', '6', '7', '9'],
    correctAnswer: '7'
  },
  {
    id: 'M1-02-Q19',
    unitId: 'M1-02',
    step: 2,
    type: 'choice',
    question: '10の まえの かずは いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step3: おおきい・ちいさい（大小比較）
  // =====================================================
  {
    id: 'M1-02-Q08',
    unitId: 'M1-02',
    step: 3,
    type: 'choice',
    question: '5より おおきい かずは どれ？',
    choices: ['3', '4', '5', '7'],
    correctAnswer: '7'
  },
  {
    id: 'M1-02-Q09',
    unitId: 'M1-02',
    step: 3,
    type: 'choice',
    question: '8より ちいさい かずは どれ？',
    choices: ['8', '9', '6', '10'],
    correctAnswer: '6'
  },
  {
    id: 'M1-02-Q10',
    unitId: 'M1-02',
    step: 3,
    type: 'choice',
    question: 'いちばん おおきい かずは どれ？',
    choices: ['7', '9', '6', '3'],
    correctAnswer: '9'
  },
  {
    id: 'M1-02-Q11',
    unitId: 'M1-02',
    step: 3,
    type: 'choice',
    question: '6 と 8\nどちらが おおきい？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '8'
  },
  {
    id: 'M1-02-Q20',
    unitId: 'M1-02',
    step: 3,
    type: 'choice',
    question: 'いちばん ちいさい かずは どれ？',
    choices: ['10', '7', '6', '9'],
    correctAnswer: '6'
  },
  {
    id: 'M1-02-Q21',
    unitId: 'M1-02',
    step: 3,
    type: 'choice',
    question: '9より おおきい かずは どれ？',
    choices: ['6', '7', '8', '10'],
    correctAnswer: '10'
  },

  // =====================================================
  // Step4: かんじの かず（漢数字の読み書き）
  // =====================================================
  {
    id: 'M1-02-Q12',
    unitId: 'M1-02',
    step: 4,
    type: 'choice',
    question: '「七」は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-02-Q13',
    unitId: 'M1-02',
    step: 4,
    type: 'choice',
    question: '「十」は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-02-Q14',
    unitId: 'M1-02',
    step: 4,
    type: 'choice',
    question: '「9」を かんじで かくと？',
    choices: ['七', '八', '九', '十'],
    correctAnswer: '九'
  },
  {
    id: 'M1-02-Q15',
    unitId: 'M1-02',
    step: 4,
    type: 'choice',
    question: '「六」は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-02-Q22',
    unitId: 'M1-02',
    step: 4,
    type: 'choice',
    question: '「8」を かんじで かくと？',
    choices: ['六', '七', '八', '九'],
    correctAnswer: '八'
  },
  {
    id: 'M1-02-Q23',
    unitId: 'M1-02',
    step: 4,
    type: 'choice',
    question: '「八」は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 4 },
  { step: 3, pick: 4 },
  { step: 4, pick: 4 }
];

export default questions;
