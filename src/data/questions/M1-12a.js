/**
 * M1-12a.js - Grimoire Guardians 問題データ
 * ユニット: M1-12a「3つのかずのたしざん」
 *
 * 対象: 小学1年生、3つの数の足し算
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   「左から順番に計算するだけ！2回たし算したら終わり！」のひらめきを促す。
 *   例題でアニメーション付きの2段階計算を見せ、考え方問題で中間の□を意識させ、
 *   問題フェーズでは自力で素早く解けるよう誘導する。
 *   後半にM1-10（くりあがり）との連携問題を含める。
 *
 * Step構成（シャッフル出題）
 *   Step1: 例題・2段階アニメ（プール5問 → 3問出題）
 *   Step2: 考え方・中間□ヒント（プール6問 → 4問出題）
 *   Step3: 問題・答え10以下（プール5問 → 3問出題）
 *   Step4: 問題・答え11〜15（プール4問 → 3問出題）
 *   Step5: くりあがりとの連携（プール4問 → 2問出題）
 *
 * ひらめきポイント:
 *   「左から順番に計算するだけ！2回たし算したら終わり！」
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 例題（5問）
  // 「まず左の2つを足す → 残り1つを足す」の手順を
  // 問題文のヒントで体感させる
  // =====================================================
  {
    id: 'M1-12a-Q01',
    unitId: 'M1-12a',
    step: 1,
    type: 'choice',
    question: '1 + 2 + 3 = ？\n（まず 1 + 2 = 3、\nつぎ 3 + 3 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '1 + 2 = 3、3 + 3 = 6。答えは6！'
  },
  {
    id: 'M1-12a-Q02',
    unitId: 'M1-12a',
    step: 1,
    type: 'choice',
    question: '3 + 4 + 2 = ？\n（まず 3 + 4 = 7、\nつぎ 7 + 2 = ？）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '3 + 4 = 7、7 + 2 = 9。答えは9！'
  },
  {
    id: 'M1-12a-Q03',
    unitId: 'M1-12a',
    step: 1,
    type: 'choice',
    question: '2 + 5 + 3 = ？\n（まず 2 + 5 = 7、\nつぎ 7 + 3 = ？）',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '10',
    explanation: '2 + 5 = 7、7 + 3 = 10。答えは10！'
  },
  {
    id: 'M1-12a-Q16',
    unitId: 'M1-12a',
    step: 1,
    type: 'choice',
    question: '2 + 3 + 4 = ？\n（まず 2 + 3 = 5、\nつぎ 5 + 4 = ？）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '2 + 3 = 5、5 + 4 = 9。答えは9！'
  },
  {
    id: 'M1-12a-Q17',
    unitId: 'M1-12a',
    step: 1,
    type: 'choice',
    question: '4 + 1 + 3 = ？\n（まず 4 + 1 = 5、\nつぎ 5 + 3 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '4 + 1 = 5、5 + 3 = 8。答えは8！'
  },

  // =====================================================
  // Step2: 考え方（6問）
  // 中間の□を意識させて2ステップを習慣づける
  // =====================================================
  {
    id: 'M1-12a-Q04',
    unitId: 'M1-12a',
    step: 2,
    type: 'choice',
    question: '4 + 3 + 2 = ？\n（まず 4 + 3 = □ を かんがえよう）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '4 + 3 = 7、7 + 2 = 9。答えは9！'
  },
  {
    id: 'M1-12a-Q05',
    unitId: 'M1-12a',
    step: 2,
    type: 'choice',
    question: '2 + 6 + 1 = ？\n（まず 2 + 6 = □ を かんがえよう）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '2 + 6 = 8、8 + 1 = 9。答えは9！'
  },
  {
    id: 'M1-12a-Q06',
    unitId: 'M1-12a',
    step: 2,
    type: 'choice',
    question: '5 + 2 + 4 = ？\n（まず 5 + 2 = □ を かんがえよう）',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '11',
    explanation: '5 + 2 = 7、7 + 4 = 11。答えは11！'
  },
  {
    id: 'M1-12a-Q07',
    unitId: 'M1-12a',
    step: 2,
    type: 'choice',
    question: '3 + 3 + 3 = ？\n（ぜんぶ おなじ かず！）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '3 + 3 = 6、6 + 3 = 9。答えは9！'
  },
  {
    id: 'M1-12a-Q18',
    unitId: 'M1-12a',
    step: 2,
    type: 'choice',
    question: '4 + 4 + 2 = ？\n（まず 4 + 4 = □ を かんがえよう）',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '10',
    explanation: '4 + 4 = 8、8 + 2 = 10。答えは10！'
  },
  {
    id: 'M1-12a-Q19',
    unitId: 'M1-12a',
    step: 2,
    type: 'choice',
    question: '1 + 5 + 3 = ？\n（まず 1 + 5 = □ を かんがえよう）',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '1 + 5 = 6、6 + 3 = 9。答えは9！'
  },

  // =====================================================
  // Step3: 問題・答え10以下（5問）
  // 繰り上がりなし。3つの数の計算に慣れる
  // =====================================================
  {
    id: 'M1-12a-Q08',
    unitId: 'M1-12a',
    step: 3,
    type: 'choice',
    question: '1 + 3 + 4 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-12a-Q09',
    unitId: 'M1-12a',
    step: 3,
    type: 'choice',
    question: '2 + 2 + 5 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-12a-Q10',
    unitId: 'M1-12a',
    step: 3,
    type: 'choice',
    question: '3 + 2 + 3 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-12a-Q20',
    unitId: 'M1-12a',
    step: 3,
    type: 'choice',
    question: '2 + 1 + 6 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-12a-Q21',
    unitId: 'M1-12a',
    step: 3,
    type: 'choice',
    question: '1 + 4 + 2 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },

  // =====================================================
  // Step4: 問題・答え11〜15（4問）
  // 10を超える足し算（途中の繰り上がりなし）
  // =====================================================
  {
    id: 'M1-12a-Q11',
    unitId: 'M1-12a',
    step: 4,
    type: 'choice',
    question: '4 + 5 + 3 = ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '12'
  },
  {
    id: 'M1-12a-Q12',
    unitId: 'M1-12a',
    step: 4,
    type: 'choice',
    question: '6 + 3 + 2 = ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '11'
  },
  {
    id: 'M1-12a-Q13',
    unitId: 'M1-12a',
    step: 4,
    type: 'choice',
    question: '5 + 4 + 3 = ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '12'
  },
  {
    id: 'M1-12a-Q22',
    unitId: 'M1-12a',
    step: 4,
    type: 'choice',
    question: '2 + 4 + 6 = ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '12'
  },

  // =====================================================
  // Step5: くりあがりとの連携（4問）
  // M1-10で学んだ繰り上がりが途中で発生するパターン
  // =====================================================
  {
    id: 'M1-12a-Q14',
    unitId: 'M1-12a',
    step: 5,
    type: 'choice',
    question: '9 + 2 + 3 = ？\n（まず 9 + 2 = □ を かんがえよう）',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14',
    explanation: '9 + 2 = 11（繰り上がり！）、11 + 3 = 14。答えは14！'
  },
  {
    id: 'M1-12a-Q15',
    unitId: 'M1-12a',
    step: 5,
    type: 'choice',
    question: '8 + 4 + 2 = ？\n（まず 8 + 4 = □ を かんがえよう）',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14',
    explanation: '8 + 4 = 12（繰り上がり！）、12 + 2 = 14。答えは14！'
  },
  {
    id: 'M1-12a-Q23',
    unitId: 'M1-12a',
    step: 5,
    type: 'choice',
    question: '7 + 5 + 3 = ？\n（まず 7 + 5 = □ を かんがえよう）',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '15',
    explanation: '7 + 5 = 12（繰り上がり！）、12 + 3 = 15。答えは15！'
  },
  {
    id: 'M1-12a-Q24',
    unitId: 'M1-12a',
    step: 5,
    type: 'choice',
    question: '6 + 6 + 2 = ？\n（まず 6 + 6 = □ を かんがえよう）',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14',
    explanation: '6 + 6 = 12（繰り上がり！）、12 + 2 = 14。答えは14！'
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
