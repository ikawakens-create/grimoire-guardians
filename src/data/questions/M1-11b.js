/**
 * M1-11b.js - Grimoire Guardians 問題データ
 * ユニット: M1-11b「くりさがり（11・12のせかい）」
 *
 * 対象: 小学1年生、繰り下がりの引き算（11, 12 台）
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   M1-11a で身につけた減加法を使い、11-□ と 12-□ を体系的に練習する。
 *   例題でさくらんぼ図のイメージを確認し、考え方問題で定着させ、
 *   問題フェーズでは自力で解けるようにする。
 *
 * カテゴリ構成（15問）
 *   例題（アニメ誘導）:         3問  Q01-Q03
 *   考え方（中間□ヒント）:     4問  Q04-Q07
 *   問題（11のせかい）:         4問  Q08-Q11
 *   問題（12のせかい）:         4問  Q12-Q15
 *
 * ひらめきポイント:
 *   「11は10と1、12は10と2……自分で言えたら勝ち！」
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // 例題（3問）
  // さくらんぼ図が動くアニメーション演出と対応。
  // ヒントを問題文に埋め込み、方法を再確認する
  // =====================================================
  {
    id: 'M1-11b-Q01',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 9 = ？\n（11を 10と 1に わけよう！\n10 - 9 = 1、1 + 1 = ？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-11b-Q02',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 7 = ？\n（10 - 7 = 3、3 + 1 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-11b-Q03',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 8 = ？\n（12を 10と 2に わけよう！\n10 - 8 = 2、2 + 2 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },

  // =====================================================
  // 考え方（4問）
  // 中間の□を示して2段階の思考を促す。
  // 子どもが「なぜこうなるか」を理解しながら解く
  // =====================================================
  {
    id: 'M1-11b-Q04',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 3 = ？\n（まず 10 - 3 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11b-Q05',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 4 = ？\n（まず 10 - 4 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11b-Q06',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 5 = ？\n（まず 10 - 5 = □ を かんがえよう）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11b-Q07',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 6 = ？\n（まず 10 - 6 = □ を かんがえよう）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },

  // =====================================================
  // 問題: 11のせかい（4問）
  // ヒントなし。自力で減加法を使いこなす
  // =====================================================
  {
    id: 'M1-11b-Q08',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 2 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11b-Q09',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 4 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-Q10',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 6 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11b-Q11',
    unitId: 'M1-11b',
    type: 'choice',
    question: '11 - 8 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },

  // =====================================================
  // 問題: 12のせかい（4問）
  // =====================================================
  {
    id: 'M1-11b-Q12',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 3 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11b-Q13',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 5 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-Q14',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 7 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11b-Q15',
    unitId: 'M1-11b',
    type: 'choice',
    question: '12 - 9 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  }
];

export default questions;
