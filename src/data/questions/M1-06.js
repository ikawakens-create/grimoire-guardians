/**
 * M1-06.js - Grimoire Guardians 問題データ
 * ユニット: M1-06「ひきざん（1）きほん」
 *
 * 対象: 小学1年生、10以内の引き算基礎
 * 準拠: 日本文教出版 算数1年「のこりは いくつ／ちがいは いくつ」
 *
 * Step構成（シャッフル出題）
 *   Step1: かんたん ひきざん（プール8問 → 3問出題）
 *   Step2: えを みて ひきざん（プール8問 → 3問出題）
 *   Step3: 10から ひく（プール7問 → 3問出題）
 *   Step4: □を もとめよう（プール8問 → 3問出題）
 *   Step5: かんたん もんだい（プール7問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かんたん ひきざん（数字のひき算）
  // =====================================================
  {
    id: 'M1-06-Q01',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '5 - 2 = □\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q02',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '7 - 3 = □\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q03',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '9 - 5 = □\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q16',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '6 - 2 = □\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q17',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '8 - 4 = □\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q26',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '7 - 5 = □\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-06-Q27',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '9 - 3 = □\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-06-Q28',
    unitId: 'M1-06',
    step: 1,
    type: 'choice',
    question: '8 - 6 = □\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },

  // =====================================================
  // Step2: えを みて ひきざん（絵→残りを数える）
  // =====================================================
  {
    id: 'M1-06-Q04',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🍎🍎🍎🍎🍎 から\n🍎🍎 とると のこりは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q05',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🌸🌸🌸🌸🌸🌸🌸 から\n🌸🌸🌸 とると のこりは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q06',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '⭐⭐⭐⭐⭐⭐⭐⭐ から\n⭐⭐⭐⭐⭐ とると のこりは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q18',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🐸🐸🐸🐸🐸🐸 から\n🐸 とると のこりは？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06-Q19',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🍭🍭🍭🍭🍭🍭🍭🍭🍭 から\n🍭🍭🍭🍭 とると のこりは？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06-Q29',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🐱🐱🐱🐱🐱🐱🐱 から\n🐱🐱🐱🐱 とると のこりは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q30',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓 から\n🍓🍓🍓🍓🍓🍓 とると のこりは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q31',
    unitId: 'M1-06',
    step: 2,
    type: 'choice',
    question: '🐶🐶🐶🐶🐶🐶 から\n🐶🐶🐶 とると のこりは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },

  // =====================================================
  // Step3: 10から ひく（10を基準とした引き算）
  // =====================================================
  {
    id: 'M1-06-Q07',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 1 = □\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-06-Q08',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 4 = □\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-06-Q09',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 7 = □\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q20',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 2 = □\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-06-Q21',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 6 = □\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q32',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 3 = □\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-06-Q33',
    unitId: 'M1-06',
    step: 3,
    type: 'choice',
    question: '10 - 8 = □\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },

  // =====================================================
  // Step4: □を もとめよう（穴埋めひき算）
  // =====================================================
  {
    id: 'M1-06-Q10',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '5 - □ = 3\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-06-Q11',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '8 - □ = 5\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q12',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '□ - 3 = 6\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-06-Q22',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '7 - □ = 4\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q23',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '□ - 5 = 3\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-06-Q34',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '9 - □ = 6\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q35',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '□ - 2 = 5\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-06-Q36',
    unitId: 'M1-06',
    step: 4,
    type: 'choice',
    question: '10 - □ = 5\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },

  // =====================================================
  // Step5: かんたん もんだい（簡単な文章題）
  // =====================================================
  {
    id: 'M1-06-Q13',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'りんごが 7こ あります。\n3こ たべました。\nのこりは なんこ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q14',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'えんぴつが 9ほん あります。\n4ほん つかいました。\nのこりは なんぼん？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06-Q15',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'ねこが 6びき います。\n2びき にげました。\nのこりは なんびき？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q24',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'こどもが 8にん います。\n3にん かえりました。\nのこりは なんにん？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06-Q25',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'ふうせんが 10こ あります。\n4こ とんでいきました。\nのこりは なんこ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-06-Q37',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'きんぎょが 9ひき います。\n5ひき にがしました。\nのこりは なんびき？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q38',
    unitId: 'M1-06',
    step: 5,
    type: 'choice',
    question: 'くりが 10こ あります。\n6こ たべました。\nのこりは なんこ？',
    choices: ['3', '4', '5', '6'],
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
