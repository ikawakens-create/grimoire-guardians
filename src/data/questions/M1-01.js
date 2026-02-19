/**
 * M1-01.js - Grimoire Guardians 問題データ
 * ユニット: M1-01「なかまづくりと かず」
 *
 * 対象: 小学1年生、1〜5の数の認識
 * 準拠: 日本文教出版 算数1年
 *
 * カテゴリ構成（各3問 × 5カテゴリ = 15問）
 *   A: かずを かぞえよう（絵を見て数を答える）
 *   B: かずと えを むすぼう（数字と絵のマッチング）
 *   C: つぎの かずは？（数列の次を答える）
 *   D: おおきい・ちいさい（数の大小比較）
 *   E: かずの よみかた（ひらがなと数字の対応）
 *
 * @version 1.0
 * @date 2026-02-19
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // カテゴリA: かずを かぞえよう（絵を見て数を答える）
  // 絵（emoji）を数えて、正しい数字を選ぶ
  // =====================================================
  {
    id: 'M1-01-Q01',
    unitId: 'M1-01',
    type: 'choice',
    question: '🍎🍎🍎\nりんごは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-01-Q02',
    unitId: 'M1-01',
    type: 'choice',
    question: '⭐⭐\nほしは いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q03',
    unitId: 'M1-01',
    type: 'choice',
    question: '🌸🌸🌸🌸\nはなは いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },

  // =====================================================
  // カテゴリB: かずと えを むすぼう（数字→絵のマッチング）
  // 数字を見て、同じ数のemoji群を選ぶ
  // =====================================================
  {
    id: 'M1-01-Q04',
    unitId: 'M1-01',
    type: 'choice',
    question: '「3」は どれ？',
    choices: ['🐸🐸', '🐸🐸🐸', '🐸🐸🐸🐸', '🐸'],
    correctAnswer: '🐸🐸🐸'
  },
  {
    id: 'M1-01-Q05',
    unitId: 'M1-01',
    type: 'choice',
    question: '「1」は どれ？',
    choices: ['🐱🐱', '🐱🐱🐱', '🐱', '🐱🐱🐱🐱'],
    correctAnswer: '🐱'
  },
  {
    id: 'M1-01-Q06',
    unitId: 'M1-01',
    type: 'choice',
    question: '「5」は どれ？',
    choices: ['🎈🎈🎈', '🎈🎈🎈🎈🎈', '🎈🎈', '🎈🎈🎈🎈'],
    correctAnswer: '🎈🎈🎈🎈🎈'
  },

  // =====================================================
  // カテゴリC: つぎの かずは？（数列の次を答える）
  // 数の並びの続きを答える
  // =====================================================
  {
    id: 'M1-01-Q07',
    unitId: 'M1-01',
    type: 'choice',
    question: '1, 2, 3, □\nつぎは なに？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q08',
    unitId: 'M1-01',
    type: 'choice',
    question: '2, 3, 4, □\nつぎは なに？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q09',
    unitId: 'M1-01',
    type: 'choice',
    question: '□, 2, 3, 4\nさいしょは なに？',
    choices: ['1', '2', '3', '5'],
    correctAnswer: '1'
  },

  // =====================================================
  // カテゴリD: おおきい・ちいさい（数の大小比較）
  // 2つの数を比べてどちらが大きい/小さいか答える
  // =====================================================
  {
    id: 'M1-01-Q10',
    unitId: 'M1-01',
    type: 'choice',
    question: '3 と 5\nどちらが おおきい？',
    choices: ['3', '4', '5', '2'],
    correctAnswer: '5'
  },
  {
    id: 'M1-01-Q11',
    unitId: 'M1-01',
    type: 'choice',
    question: '1 と 4\nどちらが おおきい？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '4'
  },
  {
    id: 'M1-01-Q12',
    unitId: 'M1-01',
    type: 'choice',
    question: '2 と 1\nどちらが ちいさい？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },

  // =====================================================
  // カテゴリE: かずの よみかた（ひらがな↔数字）
  // ひらがなで書かれた読み方に対応する数字を選ぶ
  // =====================================================
  {
    id: 'M1-01-Q13',
    unitId: 'M1-01',
    type: 'choice',
    question: '「さん」は どれ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-01-Q14',
    unitId: 'M1-01',
    type: 'choice',
    question: '「に」は どれ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-01-Q15',
    unitId: 'M1-01',
    type: 'choice',
    question: '「ご」は どれ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  }
];

export default questions;
