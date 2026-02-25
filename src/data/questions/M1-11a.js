/**
 * M1-11a.js - Grimoire Guardians 問題データ
 * ユニット: M1-11a「10からひくひみつ」（事前練習）
 *
 * 対象: 小学1年生、繰り下がりの引き算の前に習得する橋渡しユニット
 * 準拠: 日本文教出版 算数1年（M1-09「さくらんぼ算のひみつ」と同じ役割）
 *
 * 設計方針:
 *   繰り下がりに入る前に「10からひく」「数を10と●に分ける」を体験させ、
 *   減加法（10から引いて残りを足す）を子どもが自然に「ひらめく」よう段階的に導く。
 *
 * Step構成（シャッフル出題）
 *   Step1: 10-□の確認（プール6問 → 4問出題）
 *   Step2: 数を10と●に分ける（プール6問 → 4問出題）
 *   Step3: 逆さくらんぼ発見（プール6問 → 4問出題）
 *   Step4: 自分でやってみよう（プール6問 → 3問出題）
 *
 * ひらめきポイント:
 *   「11を10と1に分けたら、10からひくだけ！」
 *   「さくらんぼ算は引き算にも使えるんだ！」
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 10-□の確認（6問）
  // 10からの引き算パターンを視覚的に確認する
  // =====================================================
  {
    id: 'M1-11a-Q01',
    unitId: 'M1-11a',
    step: 1,
    type: 'choice',
    question: '10 - 9 = ？\n（10こから 9こ とると のこりは？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1',
    explanation: '10 - 9 = 1 です。10から9つとると1つのこります！'
  },
  {
    id: 'M1-11a-Q02',
    unitId: 'M1-11a',
    step: 1,
    type: 'choice',
    question: '10 - 7 = ？\n（10こから 7こ とると のこりは？）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: '10 - 7 = 3 です。10から7つとると3つのこります！'
  },
  {
    id: 'M1-11a-Q03',
    unitId: 'M1-11a',
    step: 1,
    type: 'choice',
    question: '10 - 4 = ？\n（10こから 4こ とると のこりは？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '10 - 4 = 6 です。10から4つとると6つのこります！'
  },
  {
    id: 'M1-11a-Q16',
    unitId: 'M1-11a',
    step: 1,
    type: 'choice',
    question: '10 - 6 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '10 - 6 = 4 です。'
  },
  {
    id: 'M1-11a-Q17',
    unitId: 'M1-11a',
    step: 1,
    type: 'choice',
    question: '10 - 3 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '10 - 3 = 7 です。'
  },
  {
    id: 'M1-11a-Q18',
    unitId: 'M1-11a',
    step: 1,
    type: 'choice',
    question: '10 - 8 = ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '10 - 8 = 2 です。'
  },

  // =====================================================
  // Step2: 数を10と●に分ける練習（6問）
  // 11〜16を「10といくつ」に分ける感覚を身につける
  // =====================================================
  {
    id: 'M1-11a-Q04',
    unitId: 'M1-11a',
    step: 2,
    type: 'choice',
    question: '11は 10と いくつ？\n（11 = 10 + □）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1',
    explanation: '11 = 10 + 1 です。11は10と1です！'
  },
  {
    id: 'M1-11a-Q05',
    unitId: 'M1-11a',
    step: 2,
    type: 'choice',
    question: '13は 10と いくつ？\n（13 = 10 + □）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: '13 = 10 + 3 です。13は10と3です！'
  },
  {
    id: 'M1-11a-Q06',
    unitId: 'M1-11a',
    step: 2,
    type: 'choice',
    question: '15は 10と いくつ？\n（15 = 10 + □）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '15 = 10 + 5 です。15は10と5です！'
  },
  {
    id: 'M1-11a-Q07',
    unitId: 'M1-11a',
    step: 2,
    type: 'choice',
    question: '12は 10と いくつ？\n（12 = 10 + □）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '12 = 10 + 2 です。12は10と2です！'
  },
  {
    id: 'M1-11a-Q19',
    unitId: 'M1-11a',
    step: 2,
    type: 'choice',
    question: '14は 10と いくつ？\n（14 = 10 + □）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: '14 = 10 + 4 です。14は10と4です！'
  },
  {
    id: 'M1-11a-Q20',
    unitId: 'M1-11a',
    step: 2,
    type: 'choice',
    question: '16は 10と いくつ？\n（16 = 10 + □）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '16 = 10 + 6 です。16は10と6です！'
  },

  // =====================================================
  // Step3: 逆さくらんぼで「ひらめく」（6問）
  // 「11を10と1に分けて → 10からひいて → 残りをたす」の2段階をヒント付きで体験
  // =====================================================
  {
    id: 'M1-11a-Q08',
    unitId: 'M1-11a',
    step: 3,
    type: 'choice',
    question: '11 - 9 = ？\n（ヒント: 10 - 9 = 1、\nのこりの 1と あわせると？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '11を10と1に分けて、10 - 9 = 1、1 + 1 = 2。答えは2！'
  },
  {
    id: 'M1-11a-Q09',
    unitId: 'M1-11a',
    step: 3,
    type: 'choice',
    question: '13 - 8 = ？\n（ヒント: 10 - 8 = 2、\nつぎ 2 + 3 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: '13を10と3に分けて、10 - 8 = 2、2 + 3 = 5。答えは5！'
  },
  {
    id: 'M1-11a-Q10',
    unitId: 'M1-11a',
    step: 3,
    type: 'choice',
    question: '12 - 7 = ？\n（ヒント: 10 - 7 = 3、\nつぎ 3 + 2 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '12を10と2に分けて、10 - 7 = 3、3 + 2 = 5。答えは5！'
  },
  {
    id: 'M1-11a-Q11',
    unitId: 'M1-11a',
    step: 3,
    type: 'choice',
    question: '15 - 9 = ？\n（ヒント: 10 - 9 = 1、\nつぎ 1 + 5 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '15を10と5に分けて、10 - 9 = 1、1 + 5 = 6。答えは6！'
  },
  {
    id: 'M1-11a-Q21',
    unitId: 'M1-11a',
    step: 3,
    type: 'choice',
    question: '14 - 6 = ？\n（ヒント: 10 - 6 = 4、\nつぎ 4 + 4 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '14を10と4に分けて、10 - 6 = 4、4 + 4 = 8。答えは8！'
  },
  {
    id: 'M1-11a-Q22',
    unitId: 'M1-11a',
    step: 3,
    type: 'choice',
    question: '16 - 8 = ？\n（ヒント: 10 - 8 = 2、\nつぎ 2 + 6 = ？）',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '16を10と6に分けて、10 - 8 = 2、2 + 6 = 8。答えは8！'
  },

  // =====================================================
  // Step4: 自分でやってみよう（6問）
  // ヒントなしで減加法を使って解く
  // =====================================================
  {
    id: 'M1-11a-Q12',
    unitId: 'M1-11a',
    step: 4,
    type: 'choice',
    question: '11 - 8 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11a-Q13',
    unitId: 'M1-11a',
    step: 4,
    type: 'choice',
    question: '14 - 6 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11a-Q14',
    unitId: 'M1-11a',
    step: 4,
    type: 'choice',
    question: '16 - 9 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11a-Q15',
    unitId: 'M1-11a',
    step: 4,
    type: 'choice',
    question: '12 - 5 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11a-Q23',
    unitId: 'M1-11a',
    step: 4,
    type: 'choice',
    question: '13 - 7 = ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11a-Q24',
    unitId: 'M1-11a',
    step: 4,
    type: 'choice',
    question: '15 - 6 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 4 },
  { step: 3, pick: 4 },
  { step: 4, pick: 3 }
];

export default questions;
