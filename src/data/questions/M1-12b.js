/**
 * M1-12b.js - Grimoire Guardians 問題データ
 * ユニット: M1-12b「3つのかずのひきざん」
 *
 * 対象: 小学1年生、3つの数の引き算
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   「引き算も同じルール！左から順番に！」のひらめきを促す。
 *   例題→考え方→問題の流れで、繰り下がりなし・ありの両パターンをカバー。
 *   答えが0になる問題を含め「0も正解！」の達成感演出を設ける。
 *   文章題で生活場面に結びつけて定着させる。
 *
 * Step構成（シャッフル出題）
 *   Step1: 例題・2段階ブロックアニメ（プール5問 → 3問出題）
 *   Step2: 考え方・中間□ヒント（プール6問 → 4問出題）
 *   Step3: 問題・繰り下がりなし（プール5問 → 3問出題）
 *   Step4: 問題・繰り下がりあり（プール4問 → 3問出題）
 *   Step5: 文章題（プール4問 → 2問出題）
 *
 * ひらめきポイント:
 *   「引き算も同じルール！左から順番に！」
 *   「答えがれいになっても正解！」（Q05 で達成演出）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 例題（5問）
  // ブロックが2回減るアニメーションと対応
  // =====================================================
  {
    id: 'M1-12b-Q01',
    unitId: 'M1-12b',
    step: 1,
    type: 'choice',
    question: '10 - 3 - 2 = ？\n（まず 10 - 3 = 7、\nつぎ 7 - 2 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '10 - 3 = 7、7 - 2 = 5。答えは5！'
  },
  {
    id: 'M1-12b-Q02',
    unitId: 'M1-12b',
    step: 1,
    type: 'choice',
    question: '9 - 4 - 2 = ？\n（まず 9 - 4 = 5、\nつぎ 5 - 2 = ？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: '9 - 4 = 5、5 - 2 = 3。答えは3！'
  },
  {
    id: 'M1-12b-Q03',
    unitId: 'M1-12b',
    step: 1,
    type: 'choice',
    question: '8 - 3 - 1 = ？\n（まず 8 - 3 = 5、\nつぎ 5 - 1 = ？）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: '8 - 3 = 5、5 - 1 = 4。答えは4！'
  },
  {
    id: 'M1-12b-Q16',
    unitId: 'M1-12b',
    step: 1,
    type: 'choice',
    question: '7 - 4 - 1 = ？\n（まず 7 - 4 = 3、\nつぎ 3 - 1 = ？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '7 - 4 = 3、3 - 1 = 2。答えは2！'
  },
  {
    id: 'M1-12b-Q17',
    unitId: 'M1-12b',
    step: 1,
    type: 'choice',
    question: '6 - 2 - 2 = ？\n（まず 6 - 2 = 4、\nつぎ 4 - 2 = ？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '6 - 2 = 4、4 - 2 = 2。答えは2！'
  },

  // =====================================================
  // Step2: 考え方（6問）
  // 中間の□を意識させる。答えが0の問題で達成感演出
  // =====================================================
  {
    id: 'M1-12b-Q04',
    unitId: 'M1-12b',
    step: 2,
    type: 'choice',
    question: '7 - 2 - 3 = ？\n（まず 7 - 2 = □ を かんがえよう）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '7 - 2 = 5、5 - 3 = 2。答えは2！'
  },
  {
    id: 'M1-12b-Q05',
    unitId: 'M1-12b',
    step: 2,
    type: 'choice',
    question: '5 - 3 - 2 = ？\n（こたえは れいに なるよ！）',
    choices: ['0', '1', '2', '3'],
    correctAnswer: '0',
    explanation: '5 - 3 = 2、2 - 2 = 0。答えは0！れいでも正解！'
  },
  {
    id: 'M1-12b-Q06',
    unitId: 'M1-12b',
    step: 2,
    type: 'choice',
    question: '14 - 5 - 3 = ？\n（まず 14 - 5 = □ を かんがえよう）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '14 - 5 = 9（繰り下がり！）、9 - 3 = 6。答えは6！'
  },
  {
    id: 'M1-12b-Q07',
    unitId: 'M1-12b',
    step: 2,
    type: 'choice',
    question: '13 - 4 - 4 = ？\n（まず 13 - 4 = □ を かんがえよう）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '13 - 4 = 9（繰り下がり！）、9 - 4 = 5。答えは5！'
  },
  {
    id: 'M1-12b-Q18',
    unitId: 'M1-12b',
    step: 2,
    type: 'choice',
    question: '8 - 5 - 2 = ？\n（まず 8 - 5 = □ を かんがえよう）',
    choices: ['0', '1', '2', '3'],
    correctAnswer: '1',
    explanation: '8 - 5 = 3、3 - 2 = 1。答えは1！'
  },
  {
    id: 'M1-12b-Q19',
    unitId: 'M1-12b',
    step: 2,
    type: 'choice',
    question: '12 - 5 - 4 = ？\n（まず 12 - 5 = □ を かんがえよう）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: '12 - 5 = 7（繰り下がり！）、7 - 4 = 3。答えは3！'
  },

  // =====================================================
  // Step3: 問題・繰り下がりなし（5問）
  // 自力で2回の引き算を実行する
  // =====================================================
  {
    id: 'M1-12b-Q08',
    unitId: 'M1-12b',
    step: 3,
    type: 'choice',
    question: '9 - 3 - 2 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-12b-Q09',
    unitId: 'M1-12b',
    step: 3,
    type: 'choice',
    question: '8 - 4 - 1 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-12b-Q10',
    unitId: 'M1-12b',
    step: 3,
    type: 'choice',
    question: '6 - 2 - 3 = ？',
    choices: ['0', '1', '2', '3'],
    correctAnswer: '1'
  },
  {
    id: 'M1-12b-Q20',
    unitId: 'M1-12b',
    step: 3,
    type: 'choice',
    question: '7 - 3 - 2 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-12b-Q21',
    unitId: 'M1-12b',
    step: 3,
    type: 'choice',
    question: '8 - 2 - 4 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },

  // =====================================================
  // Step4: 問題・繰り下がりあり（4問）
  // M1-11で習った繰り下がりを使う
  // =====================================================
  {
    id: 'M1-12b-Q11',
    unitId: 'M1-12b',
    step: 4,
    type: 'choice',
    question: '12 - 4 - 5 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-12b-Q12',
    unitId: 'M1-12b',
    step: 4,
    type: 'choice',
    question: '15 - 6 - 4 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-12b-Q13',
    unitId: 'M1-12b',
    step: 4,
    type: 'choice',
    question: '11 - 3 - 5 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-12b-Q22',
    unitId: 'M1-12b',
    step: 4,
    type: 'choice',
    question: '13 - 5 - 3 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },

  // =====================================================
  // Step5: 文章題（4問）
  // 生活場面から3つの数の引き算を読み取る
  // =====================================================
  {
    id: 'M1-12b-Q14',
    unitId: 'M1-12b',
    step: 5,
    type: 'choice',
    question: 'りんごが 10こ あります。\n3こ たべて、2こ あげました。\nのこりは なんこ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '10 - 3 = 7、7 - 2 = 5。のこりは5こです。'
  },
  {
    id: 'M1-12b-Q15',
    unitId: 'M1-12b',
    step: 5,
    type: 'choice',
    question: 'シールが 13まい あります。\n5まい あげて、4まい なくしました。\nのこりは なんまい？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '13 - 5 = 8（繰り下がり！）、8 - 4 = 4。のこりは4まいです。'
  },
  {
    id: 'M1-12b-Q23',
    unitId: 'M1-12b',
    step: 5,
    type: 'choice',
    question: 'あめが 9こ あります。\n3こ たべて、4こ あげました。\nのこりは なんこ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '9 - 3 = 6、6 - 4 = 2。のこりは2こです。'
  },
  {
    id: 'M1-12b-Q24',
    unitId: 'M1-12b',
    step: 5,
    type: 'choice',
    question: 'おはじきが 11こ あります。\n4こ なくして、3こ あげました。\nのこりは なんこ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '11 - 4 = 7（繰り下がり！）、7 - 3 = 4。のこりは4こです。'
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
