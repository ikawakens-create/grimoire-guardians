/**
 * M1-06.js - Grimoire Guardians 問題データ
 * ユニット: M1-06「ひきざん（1）きほん」
 *
 * 対象: 小学1年生、10以内の引き算基礎
 * 準拠: 日本文教出版 算数1年「のこりは いくつ／ちがいは いくつ」
 *
 * カテゴリ構成（15問）
 *   A: かんたん ひきざん（数字のひき算）3問
 *   B: えを みて ひきざん（絵を見て残りを数える）3問
 *   C: 10から ひく（10を基準とした引き算）3問
 *   D: □を もとめよう（穴埋めひき算）3問
 *   E: かんたん もんだい（簡単な文章題）3問
 *
 * @version 1.0
 * @date 2026-02-20
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // カテゴリA: かんたん ひきざん（数字のひき算）
  // =====================================================
  {
    id: 'M1-06-Q01',
    unitId: 'M1-06',
    type: 'choice',
    question: '5 - 2 = □\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q02',
    unitId: 'M1-06',
    type: 'choice',
    question: '7 - 3 = □\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q03',
    unitId: 'M1-06',
    type: 'choice',
    question: '9 - 5 = □\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },

  // =====================================================
  // カテゴリB: えを みて ひきざん（絵→残りを数える）
  // =====================================================
  {
    id: 'M1-06-Q04',
    unitId: 'M1-06',
    type: 'choice',
    question: '🍎🍎🍎🍎🍎 から\n🍎🍎 とると のこりは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q05',
    unitId: 'M1-06',
    type: 'choice',
    question: '🌸🌸🌸🌸🌸🌸🌸 から\n🌸🌸🌸 とると のこりは？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q06',
    unitId: 'M1-06',
    type: 'choice',
    question: '⭐⭐⭐⭐⭐⭐⭐⭐ から\n⭐⭐⭐⭐⭐ とると のこりは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },

  // =====================================================
  // カテゴリC: 10から ひく（10を基準とした引き算）
  // 補数の感覚を引き算でも育てる
  // =====================================================
  {
    id: 'M1-06-Q07',
    unitId: 'M1-06',
    type: 'choice',
    question: '10 - 1 = □\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-06-Q08',
    unitId: 'M1-06',
    type: 'choice',
    question: '10 - 4 = □\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-06-Q09',
    unitId: 'M1-06',
    type: 'choice',
    question: '10 - 7 = □\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },

  // =====================================================
  // カテゴリD: □を もとめよう（穴埋めひき算）
  // =====================================================
  {
    id: 'M1-06-Q10',
    unitId: 'M1-06',
    type: 'choice',
    question: '5 - □ = 3\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-06-Q11',
    unitId: 'M1-06',
    type: 'choice',
    question: '8 - □ = 5\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06-Q12',
    unitId: 'M1-06',
    type: 'choice',
    question: '□ - 3 = 6\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // カテゴリE: かんたん もんだい（簡単な文章題）
  // =====================================================
  {
    id: 'M1-06-Q13',
    unitId: 'M1-06',
    type: 'choice',
    question: 'りんごが 7こ あります。\n3こ たべました。\nのこりは なんこ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06-Q14',
    unitId: 'M1-06',
    type: 'choice',
    question: 'えんぴつが 9ほん あります。\n4ほん つかいました。\nのこりは なんぼん？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06-Q15',
    unitId: 'M1-06',
    type: 'choice',
    question: 'ねこが 6びき います。\n2びき にげました。\nのこりは なんびき？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  }
];

export default questions;
