/**
 * M1-10c.js - Grimoire Guardians 問題データ
 * ユニット: M1-10c「くりあがり（7・6のせかい）」
 *
 * 対象: 小学1年生、7+nと6+nの繰り上がりたし算
 * 準拠: 日本文教出版 算数1年
 *
 * 【くりあがりのポイント: 7・6のせかい】
 *   7に 3を たすと 10（補数3）
 *   6に 4を たすと 10（補数4）
 *   9のせかい（補数1）・8のせかい（補数2）よりも
 *   分ける数が大きくなるので、もう一段階考える力が必要。
 *
 * カテゴリ構成（15問）
 *   A: 7のせかい（Q1〜Q6）- 7+4から7+9
 *   B: 6のせかい（Q7〜Q11）- 6+5から6+9
 *   C: 穴埋め・文章題（Q12〜Q15）
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // カテゴリA: 7のせかい（補数3）
  // 7に3を足すと10。nを「3とのこり」に分ける
  // =====================================================
  {
    id: 'M1-10c-Q01',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7のせかいの かくにん！\n7に いくつ たすと 10？\n7 + □ = 10',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '３',
    explanation: '7 + 3 = 10 です。7のせかいでは、3が かぎのかずです！'
  },
  {
    id: 'M1-10c-Q02',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7 + 4 = ？\n（ヒント：7 + 3 = 10、4を「3と1」に わけよう）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '7 + 3 = 10、4を「3と1」に わけて、10 + 1 = 11。答えは 11！'
  },
  {
    id: 'M1-10c-Q03',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7 + 5 = ？',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '7 + 3 = 10、5を「3と2」に わけて、10 + 2 = 12。答えは 12！'
  },
  {
    id: 'M1-10c-Q04',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7 + 6 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '7 + 3 = 10、6を「3と3」に わけて、10 + 3 = 13。答えは 13！'
  },
  {
    id: 'M1-10c-Q05',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7 + 7 = ？',
    choices: ['１３', '１４', '１５', '１６'],
    correctAnswer: '１４',
    explanation: '7 + 3 = 10、7を「3と4」に わけて、10 + 4 = 14。答えは 14！'
  },
  {
    id: 'M1-10c-Q06',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7 + 8 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１５',
    explanation: '7 + 3 = 10、8を「3と5」に わけて、10 + 5 = 15。答えは 15！'
  },

  // =====================================================
  // カテゴリB: 6のせかい（補数4）
  // 6に4を足すと10。nを「4とのこり」に分ける
  // =====================================================
  {
    id: 'M1-10c-Q07',
    unitId: 'M1-10c',
    type: 'choice',
    question: '6のせかいの かくにん！\n6に いくつ たすと 10？\n6 + □ = 10',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '6 + 4 = 10 です。6のせかいでは、4が かぎのかずです！'
  },
  {
    id: 'M1-10c-Q08',
    unitId: 'M1-10c',
    type: 'choice',
    question: '6 + 5 = ？\n（ヒント：6 + 4 = 10、5を「4と1」に わけよう）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '6 + 4 = 10、5を「4と1」に わけて、10 + 1 = 11。答えは 11！'
  },
  {
    id: 'M1-10c-Q09',
    unitId: 'M1-10c',
    type: 'choice',
    question: '6 + 6 = ？',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '6 + 4 = 10、6を「4と2」に わけて、10 + 2 = 12。答えは 12！'
  },
  {
    id: 'M1-10c-Q10',
    unitId: 'M1-10c',
    type: 'choice',
    question: '6 + 7 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '6 + 4 = 10、7を「4と3」に わけて、10 + 3 = 13。答えは 13！'
  },
  {
    id: 'M1-10c-Q11',
    unitId: 'M1-10c',
    type: 'choice',
    question: '6 + 9 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１５',
    explanation: '6 + 4 = 10、9を「4と5」に わけて、10 + 5 = 15。答えは 15！'
  },

  // =====================================================
  // カテゴリC: 穴埋め・文章題
  // =====================================================
  {
    id: 'M1-10c-Q12',
    unitId: 'M1-10c',
    type: 'choice',
    question: '7 + □ = 13\n□に はいる かずは？',
    choices: ['４', '５', '６', '７'],
    correctAnswer: '６',
    explanation: '7 + 6 = 13 です。13 - 7 = 6 で かんがえても いいですね。'
  },
  {
    id: 'M1-10c-Q13',
    unitId: 'M1-10c',
    type: 'choice',
    question: '6 + □ = 14\n□に はいる かずは？',
    choices: ['６', '７', '８', '９'],
    correctAnswer: '８',
    explanation: '6 + 8 = 14 です。6 + 4 = 10、10 + 4 = 14 なので、□は 8です。'
  },
  {
    id: 'M1-10c-Q14',
    unitId: 'M1-10c',
    type: 'choice',
    question: 'きのこが 7こ、どんぐりが 6こ あります。\nあわせて なんこ？',
    choices: ['１２こ', '１３こ', '１４こ', '１５こ'],
    correctAnswer: '１３こ',
    explanation: '7 + 6 = 13。7 + 3 = 10、6を「3と3」に わけて 10 + 3 = 13こ です。'
  },
  {
    id: 'M1-10c-Q15',
    unitId: 'M1-10c',
    type: 'choice',
    question: 'あかい ちょうちょが 6ぴき、しろい ちょうちょが 9ひき います。\nあわせて なんびき？',
    choices: ['１３ひき', '１４ひき', '１５ひき', '１６ひき'],
    correctAnswer: '１５ひき',
    explanation: '6 + 9 = 15。6 + 4 = 10、9を「4と5」に わけて 10 + 5 = 15ひき です。'
  }
];

export default questions;
