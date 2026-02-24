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
 * カテゴリ構成（15問）
 *   Step1: 10-□の確認          3問  （視覚的・簡単）
 *   Step2: 数を10と●に分ける   4問  （分解だけに集中）
 *   Step3: 逆さくらんぼ発見     4問  （ヒント付き2段階）
 *   Step4: 自分でやってみよう   4問  （ヒントなし・独力）
 *
 * ひらめきポイント:
 *   「11を10と1に分けたら、10からひくだけ！」
 *   「さくらんぼ算は引き算にも使えるんだ！」
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // Step1: 10-□の確認（3問）
  // 10からの引き算パターンを視覚的に確認する
  // =====================================================
  {
    id: 'M1-11a-Q01',
    unitId: 'M1-11a',
    type: 'choice',
    question: '10 - 9 = ？\n（10こから 9こ とると のこりは？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },
  {
    id: 'M1-11a-Q02',
    unitId: 'M1-11a',
    type: 'choice',
    question: '10 - 7 = ？\n（10こから 7こ とると のこりは？）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11a-Q03',
    unitId: 'M1-11a',
    type: 'choice',
    question: '10 - 4 = ？\n（10こから 4こ とると のこりは？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },

  // =====================================================
  // Step2: 数を10と●に分ける練習（4問）
  // 11〜16を「10といくつ」に分ける感覚を身につける
  // 「さくらんぼ」を逆から使うイメージ
  // =====================================================
  {
    id: 'M1-11a-Q04',
    unitId: 'M1-11a',
    type: 'choice',
    question: '11は 10と いくつ？\n（11 = 10 + □）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },
  {
    id: 'M1-11a-Q05',
    unitId: 'M1-11a',
    type: 'choice',
    question: '13は 10と いくつ？\n（13 = 10 + □）',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11a-Q06',
    unitId: 'M1-11a',
    type: 'choice',
    question: '15は 10と いくつ？\n（15 = 10 + □）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11a-Q07',
    unitId: 'M1-11a',
    type: 'choice',
    question: '12は 10と いくつ？\n（12 = 10 + □）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },

  // =====================================================
  // Step3: 逆さくらんぼで「ひらめく」（4問）
  // 「11を10と1に分けて → 10からひいて → 残りをたす」の2段階をヒント付きで体験
  // 子どもが自然に「あ、こうすればいいんだ！」とひらめく設計
  // =====================================================
  {
    id: 'M1-11a-Q08',
    unitId: 'M1-11a',
    type: 'choice',
    question: '11 - 9 = ？\n（ヒント: 10 - 9 = 1、\nのこりの 1と あわせると？）',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-11a-Q09',
    unitId: 'M1-11a',
    type: 'choice',
    question: '13 - 8 = ？\n（ヒント: 10 - 8 = 2、\nつぎ 2 + 3 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11a-Q10',
    unitId: 'M1-11a',
    type: 'choice',
    question: '12 - 7 = ？\n（ヒント: 10 - 7 = 3、\nつぎ 3 + 2 = ？）',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-11a-Q11',
    unitId: 'M1-11a',
    type: 'choice',
    question: '15 - 9 = ？\n（ヒント: 10 - 9 = 1、\nつぎ 1 + 5 = ？）',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },

  // =====================================================
  // Step4: 自分でやってみよう（4問）
  // ヒントなしで減加法を使って解く。ひらめいた方法を自力で使いこなす
  // =====================================================
  {
    id: 'M1-11a-Q12',
    unitId: 'M1-11a',
    type: 'choice',
    question: '11 - 8 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11a-Q13',
    unitId: 'M1-11a',
    type: 'choice',
    question: '14 - 6 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11a-Q14',
    unitId: 'M1-11a',
    type: 'choice',
    question: '16 - 9 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11a-Q15',
    unitId: 'M1-11a',
    type: 'choice',
    question: '12 - 5 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  }
];

export default questions;
