/**
 * M1-01.js - Grimoire Guardians 問題データ
 * ユニット: M1-01「なかまづくりと かず」
 *
 * 対象: 小学1年生、1〜5の数の認識
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: かずを かぞえよう（プール8問 → 3問出題）
 *   Step2: かずと えを むすぼう（プール8問 → 3問出題）
 *   Step3: つぎの かずは？（プール8問 → 3問出題）
 *   Step4: おおきい・ちいさい（プール8問 → 3問出題）
 *   Step5: かずの よみかた（プール6問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-13
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かずを かぞえよう（絵を見て数を答える）
  // =====================================================
  {
    id: 'M1-01-Q01',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🍎🍎🍎\nりんごは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-01-Q02',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '⭐⭐\nほしは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q03',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🌸🌸🌸🌸\nはなは いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q16',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🐶\nいぬは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },
  {
    id: 'M1-01-Q17',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🍌🍌🍌🍌🍌\nバナナは いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q26',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🐱🐱🐱\nねこは いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-01-Q27',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🍓🍓\nいちごは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q28',
    unitId: 'M1-01',
    step: 1,
    type: 'choice',
    question: '🐥🐥🐥🐥\nひよこは いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },

  // =====================================================
  // Step2: かずと えを むすぼう（数字↔絵のマッチング）
  // =====================================================
  {
    id: 'M1-01-Q04',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「3」は どれ？',
    choices: ['🐸🐸', '🐸🐸🐸', '🐸🐸🐸🐸', '🐸'],
    correctAnswer: '🐸🐸🐸'
  },
  {
    id: 'M1-01-Q05',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「1」は どれ？',
    choices: ['🐱🐱', '🐱🐱🐱', '🐱', '🐱🐱🐱🐱'],
    correctAnswer: '🐱'
  },
  {
    id: 'M1-01-Q06',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「5」は どれ？',
    choices: ['🎈🎈🎈', '🎈🎈🎈🎈🎈', '🎈🎈', '🎈🎈🎈🎈'],
    correctAnswer: '🎈🎈🎈🎈🎈'
  },
  {
    id: 'M1-01-Q18',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「2」は どれ？',
    choices: ['🍭', '🍭🍭🍭', '🍭🍭', '🍭🍭🍭🍭'],
    correctAnswer: '🍭🍭'
  },
  {
    id: 'M1-01-Q19',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「4」は どれ？',
    choices: ['🌙🌙🌙', '🌙🌙🌙🌙🌙', '🌙🌙', '🌙🌙🌙🌙'],
    correctAnswer: '🌙🌙🌙🌙'
  },
  {
    id: 'M1-01-Q29',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「3」は どれ？',
    choices: ['🌟🌟', '🌟🌟🌟🌟', '🌟🌟🌟', '🌟'],
    correctAnswer: '🌟🌟🌟'
  },
  {
    id: 'M1-01-Q30',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「5」は どれ？',
    choices: ['🍀🍀🍀🍀', '🍀🍀', '🍀🍀🍀', '🍀🍀🍀🍀🍀'],
    correctAnswer: '🍀🍀🍀🍀🍀'
  },
  {
    id: 'M1-01-Q31',
    unitId: 'M1-01',
    step: 2,
    type: 'choice',
    question: '「2」は どれ？',
    choices: ['🐥🐥🐥', '🐥🐥', '🐥🐥🐥🐥', '🐥'],
    correctAnswer: '🐥🐥'
  },

  // =====================================================
  // Step3: つぎの かずは？（数列の次を答える）
  // =====================================================
  {
    id: 'M1-01-Q07',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '1, 2, 3, □\nつぎは なに？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q08',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '2, 3, 4, □\nつぎは なに？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q09',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '□, 2, 3, 4\nさいしょは なに？',
    choices: ['1', '2', '3', '5'],
    correctAnswer: '1'
  },
  {
    id: 'M1-01-Q20',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '3, 4, □, 6\n□に はいる かずは？',
    choices: ['2', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q21',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '1, □, 3\n□に はいる かずは？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q32',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '□, 3, 4, 5\nさいしょは なに？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q33',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '2, □, 4\n□に はいる かずは？',
    choices: ['1', '2', '3', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-01-Q34',
    unitId: 'M1-01',
    step: 3,
    type: 'choice',
    question: '1, 2, □, 4, 5\n□に はいる かずは？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },

  // =====================================================
  // Step4: おおきい・ちいさい（数の大小比較）
  // =====================================================
  {
    id: 'M1-01-Q10',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: '3 と 5\nどちらが おおきい？',
    choices: ['3', '4', '5', '2'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q11',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: '1 と 4\nどちらが おおきい？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q12',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: '2 と 1\nどちらが ちいさい？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },
  {
    id: 'M1-01-Q22',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: 'いちばん おおきい かずは どれ？',
    choices: ['2', '4', '3', '1'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q23',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: 'いちばん ちいさい かずは どれ？',
    choices: ['5', '3', '1', '4'],
    correctAnswer: '1'
  },
  {
    id: 'M1-01-Q35',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: '2 と 5\nどちらが ちいさい？',
    choices: ['1', '2', '3', '5'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q36',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: '3 と 4\nどちらが おおきい？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q37',
    unitId: 'M1-01',
    step: 4,
    type: 'choice',
    question: 'いちばん おおきい かずは どれ？',
    choices: ['1', '3', '5', '2'],
    correctAnswer: '5'
  },

  // =====================================================
  // Step5: かずの よみかた（ひらがな↔数字）
  // =====================================================
  {
    id: 'M1-01-Q13',
    unitId: 'M1-01',
    step: 5,
    type: 'choice',
    question: '「さん」は どれ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-01-Q14',
    unitId: 'M1-01',
    step: 5,
    type: 'choice',
    question: '「に」は どれ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q15',
    unitId: 'M1-01',
    step: 5,
    type: 'choice',
    question: '「ご」は どれ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q24',
    unitId: 'M1-01',
    step: 5,
    type: 'choice',
    question: '「いち」は どれ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },
  {
    id: 'M1-01-Q25',
    unitId: 'M1-01',
    step: 5,
    type: 'choice',
    question: '「し」は どれ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q38',
    unitId: 'M1-01',
    step: 5,
    type: 'choice',
    question: '「よん」は どれ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 3 },
  { step: 3, pick: 3 },
  { step: 4, pick: 3 },
  { step: 5, pick: 3 }
];

export default questions;
