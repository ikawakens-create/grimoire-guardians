/**
 * M1-05.js - Grimoire Guardians 問題データ
 * ユニット: M1-05「たしざん（1）きほん」
 *
 * 対象: 小学1年生、10以内の足し算基礎
 * 準拠: 日本文教出版 算数1年「あわせて いくつ／ふえると いくつ」
 *
 * カテゴリ構成（15問）
 *   A: かんたん たしざん（数字のたし算）3問
 *   B: えを みて たしざん（絵を見て合計を数える）3問
 *   C: たして 10に なる（足して10・補数の感覚）3問
 *   D: □を もとめよう（穴埋めたし算）3問
 *   E: かんたん もんだい（簡単な文章題）3問
 *
 * 設計ポイント（人間開発者提案より）:
 *   「10までの足し算 → 足して10 → 穴埋め算」の段階的な流れを意識
 *
 * @version 1.0
 * @date 2026-02-20
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // カテゴリA: かんたん たしざん（数字のたし算）
  // 基本的な10以内の加法
  // =====================================================
  {
    id: 'M1-05-Q01',
    unitId: 'M1-05',
    type: 'choice',
    question: '2 + 3 = □\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q02',
    unitId: 'M1-05',
    type: 'choice',
    question: '3 + 4 = □\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q03',
    unitId: 'M1-05',
    type: 'choice',
    question: '4 + 5 = □\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // カテゴリB: えを みて たしざん（絵を数えてたし算）
  // =====================================================
  {
    id: 'M1-05-Q04',
    unitId: 'M1-05',
    type: 'choice',
    question: '🍎🍎 と 🍎🍎🍎\nあわせて いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q05',
    unitId: 'M1-05',
    type: 'choice',
    question: '🐱🐱🐱 と 🐱🐱🐱🐱\nあわせて いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q06',
    unitId: 'M1-05',
    type: 'choice',
    question: '⭐⭐⭐⭐ と ⭐⭐\nあわせて いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },

  // =====================================================
  // カテゴリC: たして 10に なる（補数の感覚を育てる）
  // 繰り上がり算（Phase 0.2）の基礎となる重要カテゴリ
  // =====================================================
  {
    id: 'M1-05-Q07',
    unitId: 'M1-05',
    type: 'choice',
    question: '1 + 9 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q08',
    unitId: 'M1-05',
    type: 'choice',
    question: '3 + 7 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q09',
    unitId: 'M1-05',
    type: 'choice',
    question: '6 + 4 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },

  // =====================================================
  // カテゴリD: □を もとめよう（穴埋めたし算）
  // □ + ○ = △ の形で□を求める
  // =====================================================
  {
    id: 'M1-05-Q10',
    unitId: 'M1-05',
    type: 'choice',
    question: '1 + □ = 5\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05-Q11',
    unitId: 'M1-05',
    type: 'choice',
    question: '3 + □ = 7\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05-Q12',
    unitId: 'M1-05',
    type: 'choice',
    question: '□ + 5 = 10\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },

  // =====================================================
  // カテゴリE: かんたん もんだい（簡単な文章題）
  // =====================================================
  {
    id: 'M1-05-Q13',
    unitId: 'M1-05',
    type: 'choice',
    question: 'ねこが 3びき います。\n2びき きました。\nぜんぶで なんびき？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q14',
    unitId: 'M1-05',
    type: 'choice',
    question: 'えんぴつが 4ほん あります。\n3ほん もらいました。\nぜんぶで なんぼん？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q15',
    unitId: 'M1-05',
    type: 'choice',
    question: 'りんごが 2こ、みかんが 4こ あります。\nあわせて なんこ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  }
];

export default questions;
