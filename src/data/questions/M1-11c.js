/**
 * M1-11c.js - Grimoire Guardians 問題データ
 * ユニット: M1-11c「くりさがり（13〜18のせかい）」
 *
 * 対象: 小学1年生、繰り下がりの引き算（13〜18 台）
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   M1-11b（11・12台）を習得済みの前提で、より大きな数の繰り下がりに挑戦する。
 *   「どんな数でも、10と●に分けたら同じ！」のひらめきを定着させる。
 *   13〜18 の主要な引き算パターンをバランスよくカバーする。
 *   ※ 18-8=10 のように答えが10になるパターンは繰り下がりの範囲外のため除外。
 *
 * カテゴリ構成（15問）
 *   例題（アニメ誘導）:              3問  Q01-Q03（13・15・17台から各1問）
 *   考え方（ヒント付き中間□）:      3問  Q04-Q06（14・16・18台）
 *   問題（13〜15のせかい）:          5問  Q07-Q11
 *   問題（16〜18のせかい）:          4問  Q12-Q15
 *
 * ひらめきポイント:
 *   「どんな大きさでも、10と●に分けたら同じ！パターンだから覚えなくていい！」
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // 例題（3問）
  // 大きい数でも減加法が使えることを示す
  // =====================================================
  {
    id: 'M1-11c-Q01',
    unitId: 'M1-11c',
    type: 'choice',
    question: '13 - 8 = ？\n（13を 10と 3に わけよう！\n10 - 8 = 2、2 + 3 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11c-Q02',
    unitId: 'M1-11c',
    type: 'choice',
    question: '15 - 7 = ？\n（15を 10と 5に わけよう！\n10 - 7 = 3、3 + 5 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-Q03',
    unitId: 'M1-11c',
    type: 'choice',
    question: '17 - 9 = ？\n（17を 10と 7に わけよう！\n10 - 9 = 1、1 + 7 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },

  // =====================================================
  // 考え方（3問）
  // ヒントを減らして自力でのステップを促す
  // =====================================================
  {
    id: 'M1-11c-Q04',
    unitId: 'M1-11c',
    type: 'choice',
    question: '14 - 6 = ？\n（まず 10 - 6 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-Q05',
    unitId: 'M1-11c',
    type: 'choice',
    question: '16 - 8 = ？\n（まず 10 - 8 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11c-Q06',
    unitId: 'M1-11c',
    type: 'choice',
    question: '18 - 9 = ？\n（まず 10 - 9 = □ を かんがえよう）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // 問題: 13〜15のせかい（5問）
  // 自力で解く。13・14・15台の代表的パターン
  // =====================================================
  {
    id: 'M1-11c-Q07',
    unitId: 'M1-11c',
    type: 'choice',
    question: '13 - 4 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q08',
    unitId: 'M1-11c',
    type: 'choice',
    question: '13 - 7 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11c-Q09',
    unitId: 'M1-11c',
    type: 'choice',
    question: '14 - 9 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11c-Q10',
    unitId: 'M1-11c',
    type: 'choice',
    question: '15 - 6 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q11',
    unitId: 'M1-11c',
    type: 'choice',
    question: '15 - 9 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },

  // =====================================================
  // 問題: 16〜18のせかい（4問）
  // 最も大きい数の繰り下がり。自信をつける達成感を演出
  // =====================================================
  {
    id: 'M1-11c-Q12',
    unitId: 'M1-11c',
    type: 'choice',
    question: '16 - 7 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q13',
    unitId: 'M1-11c',
    type: 'choice',
    question: '16 - 9 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11c-Q14',
    unitId: 'M1-11c',
    type: 'choice',
    question: '17 - 8 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11c-Q15',
    unitId: 'M1-11c',
    type: 'choice',
    // 13台に戻ってまとめ。「どの数でも同じ！」を確認させる
    question: '13 - 9 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  }
];

export default questions;
