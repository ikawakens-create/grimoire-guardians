/**
 * M1-12c.js - Grimoire Guardians 問題データ
 * ユニット: M1-12c「たしざん・ひきざんまじり」
 *
 * 対象: 小学1年生、3つの数の足し算・引き算混合
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   「記号が混ざっても、見た通りに左から！+なら足す、-なら引く、それだけ！」
 *   例題で+を青・-を赤の色分け（演出）を体感し、考え方問題で中間□を練習し、
 *   問題フェーズでは繰り上がり・繰り下がりとの組み合わせにも挑戦する。
 *
 * Step構成（シャッフル出題）
 *   Step1: 例題・色分けアニメ（プール5問 → 3問出題）
 *   Step2: 考え方・中間□・記号確認（プール6問 → 4問出題）
 *   Step3: 問題・繰り上がり・繰り下がりなし（プール5問 → 3問出題）
 *   Step4: 問題・繰り上がり・繰り下がりあり（プール4問 → 3問出題）
 *   Step5: 文章題（プール4問 → 2問出題）
 *
 * ひらめきポイント:
 *   「記号が混ざっても、見た通りに左から！+なら足す、-なら引く、それだけ！」
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 例題（5問）
  // 「+は青、-は赤」の色分け演出と対応
  // =====================================================
  {
    id: 'M1-12c-Q01',
    unitId: 'M1-12c',
    step: 1,
    type: 'choice',
    question: '3 + 4 - 2 = ？\n（まず 3 + 4 = 7、\nつぎ 7 - 2 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '3 + 4 = 7、7 - 2 = 5。答えは5！'
  },
  {
    id: 'M1-12c-Q02',
    unitId: 'M1-12c',
    step: 1,
    type: 'choice',
    question: '8 - 3 + 4 = ？\n（まず 8 - 3 = 5、\nつぎ 5 + 4 = ？）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '8 - 3 = 5、5 + 4 = 9。答えは9！'
  },
  {
    id: 'M1-12c-Q03',
    unitId: 'M1-12c',
    step: 1,
    type: 'choice',
    question: '5 + 6 - 4 = ？\n（まず 5 + 6 = 11、\nつぎ 11 - 4 = ？）',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '5 + 6 = 11（繰り上がり！）、11 - 4 = 7。答えは7！'
  },
  {
    id: 'M1-12c-Q16',
    unitId: 'M1-12c',
    step: 1,
    type: 'choice',
    question: '4 + 5 - 3 = ？\n（まず 4 + 5 = 9、\nつぎ 9 - 3 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '4 + 5 = 9、9 - 3 = 6。答えは6！'
  },
  {
    id: 'M1-12c-Q17',
    unitId: 'M1-12c',
    step: 1,
    type: 'choice',
    question: '6 - 2 + 5 = ？\n（まず 6 - 2 = 4、\nつぎ 4 + 5 = ？）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '6 - 2 = 4、4 + 5 = 9。答えは9！'
  },

  // =====================================================
  // Step2: 考え方（6問）
  // 中間の□を意識させる。Q07は繰り上がり+繰り下がりの最難関
  // =====================================================
  {
    id: 'M1-12c-Q04',
    unitId: 'M1-12c',
    step: 2,
    type: 'choice',
    question: '6 + 3 - 4 = ？\n（まず 6 + 3 = □ を かんがえよう）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '6 + 3 = 9、9 - 4 = 5。答えは5！'
  },
  {
    id: 'M1-12c-Q05',
    unitId: 'M1-12c',
    step: 2,
    type: 'choice',
    question: '9 - 4 + 6 = ？\n（まず 9 - 4 = □ を かんがえよう）',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '11',
    explanation: '9 - 4 = 5、5 + 6 = 11。答えは11！'
  },
  {
    id: 'M1-12c-Q06',
    unitId: 'M1-12c',
    step: 2,
    type: 'choice',
    question: '7 + 3 - 5 = ？\n（まず 7 + 3 = □ を かんがえよう）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '7 + 3 = 10、10 - 5 = 5。答えは5！'
  },
  {
    id: 'M1-12c-Q07',
    unitId: 'M1-12c',
    step: 2,
    type: 'choice',
    question: '7 + 5 - 8 = ？\n（くりあがり + くりさがり！）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: '7 + 5 = 12（繰り上がり！）、12 - 8 = 4（繰り下がり！）。答えは4！'
  },
  {
    id: 'M1-12c-Q18',
    unitId: 'M1-12c',
    step: 2,
    type: 'choice',
    question: '5 + 4 - 2 = ？\n（まず 5 + 4 = □ を かんがえよう）',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '5 + 4 = 9、9 - 2 = 7。答えは7！'
  },
  {
    id: 'M1-12c-Q19',
    unitId: 'M1-12c',
    step: 2,
    type: 'choice',
    question: '8 - 5 + 7 = ？\n（まず 8 - 5 = □ を かんがえよう）',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '10',
    explanation: '8 - 5 = 3、3 + 7 = 10。答えは10！'
  },

  // =====================================================
  // Step3: 問題・繰り上がり・繰り下がりなし（5問）
  // =====================================================
  {
    id: 'M1-12c-Q08',
    unitId: 'M1-12c',
    step: 3,
    type: 'choice',
    question: '2 + 5 - 3 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-12c-Q09',
    unitId: 'M1-12c',
    step: 3,
    type: 'choice',
    question: '4 + 6 - 7 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-12c-Q10',
    unitId: 'M1-12c',
    step: 3,
    type: 'choice',
    question: '7 - 4 + 3 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-12c-Q20',
    unitId: 'M1-12c',
    step: 3,
    type: 'choice',
    question: '3 + 4 - 5 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-12c-Q21',
    unitId: 'M1-12c',
    step: 3,
    type: 'choice',
    question: '6 - 1 + 4 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step4: 問題・繰り上がり・繰り下がりあり（4問）
  // =====================================================
  {
    id: 'M1-12c-Q11',
    unitId: 'M1-12c',
    step: 4,
    type: 'choice',
    question: '9 + 3 - 5 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-12c-Q12',
    unitId: 'M1-12c',
    step: 4,
    type: 'choice',
    question: '8 + 4 - 6 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-12c-Q13',
    unitId: 'M1-12c',
    step: 4,
    type: 'choice',
    question: '13 - 6 + 4 = ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '11'
  },
  {
    id: 'M1-12c-Q22',
    unitId: 'M1-12c',
    step: 4,
    type: 'choice',
    question: '7 + 6 - 4 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step5: 文章題（4問）
  // たし算・引き算が混在する生活場面を読む
  // =====================================================
  {
    id: 'M1-12c-Q14',
    unitId: 'M1-12c',
    step: 5,
    type: 'choice',
    question: 'ふうせんが 6こ あります。\n4こ もらって、3こ われました。\nのこりは なんこ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '6 + 4 = 10、10 - 3 = 7。のこりは7こです。'
  },
  {
    id: 'M1-12c-Q15',
    unitId: 'M1-12c',
    step: 5,
    type: 'choice',
    question: 'こどもが 8にん います。\n5にん かえって、3にん きました。\nなんにん？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '8 - 5 = 3、3 + 3 = 6。6にんです。'
  },
  {
    id: 'M1-12c-Q23',
    unitId: 'M1-12c',
    step: 5,
    type: 'choice',
    question: 'ねこが 9ひき います。\n4ひき きえて、6ひき きました。\nなんびき？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '11',
    explanation: '9 - 4 = 5、5 + 6 = 11。11ひきです。'
  },
  {
    id: 'M1-12c-Q24',
    unitId: 'M1-12c',
    step: 5,
    type: 'choice',
    question: 'りんごが 5こ あります。\n7こ もらって、4こ たべました。\nのこりは なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '5 + 7 = 12（繰り上がり！）、12 - 4 = 8。のこりは8こです。'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 4 },
  { step: 3, pick: 3 },
  { step: 4, pick: 3 },
  { step: 5, pick: 2 }
];

export default questions;
