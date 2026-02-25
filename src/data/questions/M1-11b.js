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
 * Step構成（シャッフル出題）
 *   Step1: 例題・アニメ誘導（プール5問 → 3問出題）
 *   Step2: 考え方・中間□ヒント（プール6問 → 4問出題）
 *   Step3: 11のせかい（プール6問 → 4問出題）
 *   Step4: 12のせかい（プール6問 → 4問出題）
 *
 * ひらめきポイント:
 *   「11は10と1、12は10と2……自分で言えたら勝ち！」
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 例題（5問）
  // さくらんぼ図が動くアニメーション演出と対応。
  // ヒントを問題文に埋め込み、方法を再確認する
  // =====================================================
  {
    id: 'M1-11b-Q01',
    unitId: 'M1-11b',
    step: 1,
    type: 'choice',
    question: '11 - 9 = ？\n（11を 10と 1に わけよう！\n10 - 9 = 1、1 + 1 = ？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '11 = 10 + 1。10 - 9 = 1、1 + 1 = 2。答えは2！'
  },
  {
    id: 'M1-11b-Q02',
    unitId: 'M1-11b',
    step: 1,
    type: 'choice',
    question: '11 - 7 = ？\n（10 - 7 = 3、3 + 1 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '11 = 10 + 1。10 - 7 = 3、3 + 1 = 4。答えは4！'
  },
  {
    id: 'M1-11b-Q03',
    unitId: 'M1-11b',
    step: 1,
    type: 'choice',
    question: '12 - 8 = ？\n（12を 10と 2に わけよう！\n10 - 8 = 2、2 + 2 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '12 = 10 + 2。10 - 8 = 2、2 + 2 = 4。答えは4！'
  },
  {
    id: 'M1-11b-Q16',
    unitId: 'M1-11b',
    step: 1,
    type: 'choice',
    question: '11 - 6 = ？\n（11を 10と 1に わけよう！\n10 - 6 = 4、4 + 1 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: '11 = 10 + 1。10 - 6 = 4、4 + 1 = 5。答えは5！'
  },
  {
    id: 'M1-11b-Q17',
    unitId: 'M1-11b',
    step: 1,
    type: 'choice',
    question: '12 - 9 = ？\n（12を 10と 2に わけよう！\n10 - 9 = 1、1 + 2 = ？）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: '12 = 10 + 2。10 - 9 = 1、1 + 2 = 3。答えは3！'
  },

  // =====================================================
  // Step2: 考え方（6問）
  // 中間の□を示して2段階の思考を促す
  // =====================================================
  {
    id: 'M1-11b-Q04',
    unitId: 'M1-11b',
    step: 2,
    type: 'choice',
    question: '11 - 3 = ？\n（まず 10 - 3 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '10 - 3 = 7、7 + 1 = 8。答えは8！'
  },
  {
    id: 'M1-11b-Q05',
    unitId: 'M1-11b',
    step: 2,
    type: 'choice',
    question: '12 - 4 = ？\n（まず 10 - 4 = □ を かんがえよう）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '10 - 4 = 6、6 + 2 = 8。答えは8！'
  },
  {
    id: 'M1-11b-Q06',
    unitId: 'M1-11b',
    step: 2,
    type: 'choice',
    question: '11 - 5 = ？\n（まず 10 - 5 = □ を かんがえよう）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '10 - 5 = 5、5 + 1 = 6。答えは6！'
  },
  {
    id: 'M1-11b-Q07',
    unitId: 'M1-11b',
    step: 2,
    type: 'choice',
    question: '12 - 6 = ？\n（まず 10 - 6 = □ を かんがえよう）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '10 - 6 = 4、4 + 2 = 6。答えは6！'
  },
  {
    id: 'M1-11b-Q18',
    unitId: 'M1-11b',
    step: 2,
    type: 'choice',
    question: '11 - 2 = ？\n（まず 10 - 2 = □ を かんがえよう）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '10 - 2 = 8、8 + 1 = 9。答えは9！'
  },
  {
    id: 'M1-11b-Q19',
    unitId: 'M1-11b',
    step: 2,
    type: 'choice',
    question: '12 - 7 = ？\n（まず 10 - 7 = □ を かんがえよう）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '10 - 7 = 3、3 + 2 = 5。答えは5！'
  },

  // =====================================================
  // Step3: 11のせかい（6問）
  // ヒントなし。自力で減加法を使いこなす
  // =====================================================
  {
    id: 'M1-11b-Q08',
    unitId: 'M1-11b',
    step: 3,
    type: 'choice',
    question: '11 - 2 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11b-Q09',
    unitId: 'M1-11b',
    step: 3,
    type: 'choice',
    question: '11 - 4 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-Q10',
    unitId: 'M1-11b',
    step: 3,
    type: 'choice',
    question: '11 - 6 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11b-Q11',
    unitId: 'M1-11b',
    step: 3,
    type: 'choice',
    question: '11 - 8 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11b-Q20',
    unitId: 'M1-11b',
    step: 3,
    type: 'choice',
    question: '11 - 3 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11b-Q21',
    unitId: 'M1-11b',
    step: 3,
    type: 'choice',
    question: '11 - 7 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },

  // =====================================================
  // Step4: 12のせかい（6問）
  // =====================================================
  {
    id: 'M1-11b-Q12',
    unitId: 'M1-11b',
    step: 4,
    type: 'choice',
    question: '12 - 3 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11b-Q13',
    unitId: 'M1-11b',
    step: 4,
    type: 'choice',
    question: '12 - 5 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11b-Q14',
    unitId: 'M1-11b',
    step: 4,
    type: 'choice',
    question: '12 - 7 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11b-Q15',
    unitId: 'M1-11b',
    step: 4,
    type: 'choice',
    question: '12 - 9 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11b-Q22',
    unitId: 'M1-11b',
    step: 4,
    type: 'choice',
    question: '12 - 4 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11b-Q23',
    unitId: 'M1-11b',
    step: 4,
    type: 'choice',
    question: '12 - 6 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 4 },
  { step: 3, pick: 4 },
  { step: 4, pick: 4 }
];

export default questions;
