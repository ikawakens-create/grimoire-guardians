/**
 * M1-10d.js - Grimoire Guardians 問題データ
 * ユニット: M1-10d「くりあがりのおうよう」
 *
 * 対象: 小学1年生、くりあがりたし算の総合練習
 * 準拠: 日本文教出版 算数1年
 *
 * 【このワールドのゴール】
 *   9のせかい・8のせかい・7のせかい・6のせかい、
 *   すべての くりあがりを じゆうに つかいこなせるようになる。
 *   文章題で どの計算をするか考える力もつける。
 *
 * カテゴリ構成（15問）
 *   A: まぜこぜ くりあがり（Q1〜Q8）- ランダム出題
 *   B: 穴埋め逆算（Q9〜Q11）
 *   C: 文章題（Q12〜Q14）
 *   D: チャレンジ問題（Q15）
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // カテゴリA: まぜこぜ くりあがり（全パターン混合）
  // =====================================================
  {
    id: 'M1-10d-Q01',
    unitId: 'M1-10d',
    type: 'choice',
    question: '9 + 6 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１５',
    explanation: '9 + 1 = 10、6を「1と5」に わけて 10 + 5 = 15。'
  },
  {
    id: 'M1-10d-Q02',
    unitId: 'M1-10d',
    type: 'choice',
    question: '8 + 4 = ？',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '8 + 2 = 10、4を「2と2」に わけて 10 + 2 = 12。'
  },
  {
    id: 'M1-10d-Q03',
    unitId: 'M1-10d',
    type: 'choice',
    question: '7 + 5 = ？',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '7 + 3 = 10、5を「3と2」に わけて 10 + 2 = 12。'
  },
  {
    id: 'M1-10d-Q04',
    unitId: 'M1-10d',
    type: 'choice',
    question: '6 + 7 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '6 + 4 = 10、7を「4と3」に わけて 10 + 3 = 13。'
  },
  {
    id: 'M1-10d-Q05',
    unitId: 'M1-10d',
    type: 'choice',
    question: '9 + 9 = ？',
    choices: ['１７', '１８', '１９', '２０'],
    correctAnswer: '１８',
    explanation: '9 + 1 = 10、9を「1と8」に わけて 10 + 8 = 18。'
  },
  {
    id: 'M1-10d-Q06',
    unitId: 'M1-10d',
    type: 'choice',
    question: '8 + 8 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１６',
    explanation: '8 + 2 = 10、8を「2と6」に わけて 10 + 6 = 16。'
  },
  {
    id: 'M1-10d-Q07',
    unitId: 'M1-10d',
    type: 'choice',
    question: '7 + 9 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１６',
    explanation: '7 + 3 = 10、9を「3と6」に わけて 10 + 6 = 16。'
  },
  {
    id: 'M1-10d-Q08',
    unitId: 'M1-10d',
    type: 'choice',
    question: '6 + 8 = ？',
    choices: ['１３', '１４', '１５', '１６'],
    correctAnswer: '１４',
    explanation: '6 + 4 = 10、8を「4と4」に わけて 10 + 4 = 14。'
  },

  // =====================================================
  // カテゴリB: 穴埋め逆算
  // =====================================================
  {
    id: 'M1-10d-Q09',
    unitId: 'M1-10d',
    type: 'choice',
    question: '□ + 7 = 15\n□に はいる かずは？',
    choices: ['６', '７', '８', '９'],
    correctAnswer: '８',
    explanation: '8 + 7 = 15 です。15 - 7 = 8 で かんがえても いいですね。'
  },
  {
    id: 'M1-10d-Q10',
    unitId: 'M1-10d',
    type: 'choice',
    question: '9 + □ = 17\n□に はいる かずは？',
    choices: ['６', '７', '８', '９'],
    correctAnswer: '８',
    explanation: '9 + 8 = 17 です。17 - 9 = 8 で かんがえても いいですね。'
  },
  {
    id: 'M1-10d-Q11',
    unitId: 'M1-10d',
    type: 'choice',
    question: '6 + □ = 11\n□に はいる かずは？',
    choices: ['４', '５', '６', '７'],
    correctAnswer: '５',
    explanation: '6 + 5 = 11 です。6 + 4 = 10、10 + 1 = 11 なので □は 5。'
  },

  // =====================================================
  // カテゴリC: 文章題
  // =====================================================
  {
    id: 'M1-10d-Q12',
    unitId: 'M1-10d',
    type: 'choice',
    question: 'あかい はな が 8こ、きいろい はなが 6こ さいています。\nはな は ぜんぶで なんこ？',
    choices: ['１３こ', '１４こ', '１５こ', '１６こ'],
    correctAnswer: '１４こ',
    explanation: '8 + 6 = 14。8 + 2 = 10、6を「2と4」に わけて 10 + 4 = 14こ です。'
  },
  {
    id: 'M1-10d-Q13',
    unitId: 'M1-10d',
    type: 'choice',
    question: 'バスに 9にん のっています。\nつぎの バスていで 7にん のってきました。\nぜんぶで なんにん？',
    choices: ['１５にん', '１６にん', '１７にん', '１８にん'],
    correctAnswer: '１６にん',
    explanation: '9 + 7 = 16。9 + 1 = 10、7を「1と6」に わけて 10 + 6 = 16にん です。'
  },
  {
    id: 'M1-10d-Q14',
    unitId: 'M1-10d',
    type: 'choice',
    question: 'たまごが 7こ あります。\nもらった たまごと あわせると 11こに なりました。\nもらった たまごは なんこ？',
    choices: ['３こ', '４こ', '５こ', '６こ'],
    correctAnswer: '４こ',
    explanation: '7 + □ = 11。11 - 7 = 4 なので、もらったのは 4こ です。'
  },

  // =====================================================
  // カテゴリD: チャレンジ問題
  // =====================================================
  {
    id: 'M1-10d-Q15',
    unitId: 'M1-10d',
    type: 'choice',
    question: '【チャレンジ】\n9 + 8 と おなじ こたえに なる しきは どれ？',
    choices: ['8 + 8', '7 + 9', '8 + 9', '6 + 9'],
    correctAnswer: '8 + 9',
    explanation: '9 + 8 = 17。8 + 9 = 17 で おなじ です。たし算は じゅんばんを かえても おなじ こたえ！'
  }
];

export default questions;
