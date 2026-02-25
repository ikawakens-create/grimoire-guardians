/**
 * M1-11d.js - Grimoire Guardians 問題データ
 * ユニット: M1-11d「くりさがりのおうよう」
 *
 * 対象: 小学1年生、繰り下がりの引き算（総まとめ・応用）
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   M1-11a〜cで習得した繰り下がりを「使いこなす」ユニット。
 *   スピード練習・文章題・繰り上がりとの混合・穴埋めを通じて
 *   確実な定着と「全部できる！」という自信を育てる。
 *
 * Step構成（シャッフル出題）
 *   Step1: 混合スピード練習（プール9問 → 6問出題）
 *   Step2: 文章題（プール6問 → 4問出題）
 *   Step3: くりあがり足し算との混合（プール5問 → 3問出題）
 *   Step4: 腕試し・逆算・穴埋め（プール4問 → 2問出題）
 *
 * ひらめきポイント:
 *   「くりあがりもくりさがりも、さくらんぼ1本で全部解ける！」
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 混合スピード練習（9問）
  // 11〜17台からランダム。さくらんぼ図なし・自力で素早く解く
  // =====================================================
  {
    id: 'M1-11d-Q01',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '11 - 3 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11d-Q02',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '14 - 8 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11d-Q03',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '12 - 9 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11d-Q04',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '16 - 7 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11d-Q05',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '13 - 6 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11d-Q06',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '15 - 8 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11d-Q16',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '17 - 9 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11d-Q17',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '11 - 7 = ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-11d-Q18',
    unitId: 'M1-11d',
    step: 1,
    type: 'choice',
    question: '14 - 5 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step2: 文章題（6問）
  // 日常の場面から式を立てて繰り下がりを使う
  // =====================================================
  {
    id: 'M1-11d-Q07',
    unitId: 'M1-11d',
    step: 2,
    type: 'choice',
    question: 'りんごが 13こ あります。\n5こ たべました。\nのこりは なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '13 - 5 = 8。のこりは8こです。'
  },
  {
    id: 'M1-11d-Q08',
    unitId: 'M1-11d',
    step: 2,
    type: 'choice',
    question: 'シールが 11まい あります。\n4まい あげました。\nのこりは なんまい？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '11 - 4 = 7。のこりは7まいです。'
  },
  {
    id: 'M1-11d-Q09',
    unitId: 'M1-11d',
    step: 2,
    type: 'choice',
    question: 'えんぴつが 15ほん あります。\n9ほん なくしました。\nのこりは なんぼん？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6',
    explanation: '15 - 9 = 6。のこりは6ほんです。'
  },
  {
    id: 'M1-11d-Q10',
    unitId: 'M1-11d',
    step: 2,
    type: 'choice',
    question: 'こどもが 17にん います。\n8にん かえりました。\nのこりは なんにん？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '17 - 8 = 9。のこりは9にんです。'
  },
  {
    id: 'M1-11d-Q19',
    unitId: 'M1-11d',
    step: 2,
    type: 'choice',
    question: 'あめが 12こ あります。\n7こ たべました。\nのこりは なんこ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: '12 - 7 = 5。のこりは5こです。'
  },
  {
    id: 'M1-11d-Q20',
    unitId: 'M1-11d',
    step: 2,
    type: 'choice',
    question: 'おはじきが 16こ あります。\n9こ なくしました。\nのこりは なんこ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '16 - 9 = 7。のこりは7こです。'
  },

  // =====================================================
  // Step3: くりあがり足し算との混合（5問）
  // + と - の記号を正しく読んで使い分ける力をつける
  // =====================================================
  {
    id: 'M1-11d-Q11',
    unitId: 'M1-11d',
    step: 3,
    type: 'choice',
    question: '8 + 6 = ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14'
  },
  {
    id: 'M1-11d-Q12',
    unitId: 'M1-11d',
    step: 3,
    type: 'choice',
    question: '13 - 7 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11d-Q13',
    unitId: 'M1-11d',
    step: 3,
    type: 'choice',
    question: '9 + 4 = ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '13'
  },
  {
    id: 'M1-11d-Q21',
    unitId: 'M1-11d',
    step: 3,
    type: 'choice',
    question: '7 + 8 = ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '15'
  },
  {
    id: 'M1-11d-Q22',
    unitId: 'M1-11d',
    step: 3,
    type: 'choice',
    question: '16 - 8 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '8'
  },

  // =====================================================
  // Step4: 腕試し（4問）
  // 逆算・穴埋め問題。M1-11 完全攻略の達成感演出
  // =====================================================
  {
    id: 'M1-11d-Q14',
    unitId: 'M1-11d',
    step: 4,
    type: 'choice',
    question: '□ - 9 = 8\n□は いくつ？',
    choices: ['14', '15', '17', '18'],
    correctAnswer: '17',
    explanation: '8 + 9 = 17 なので、□ = 17です。'
  },
  {
    id: 'M1-11d-Q15',
    unitId: 'M1-11d',
    step: 4,
    type: 'choice',
    question: '14 - □ = 6\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '14 - 8 = 6 なので、□ = 8です。'
  },
  {
    id: 'M1-11d-Q23',
    unitId: 'M1-11d',
    step: 4,
    type: 'choice',
    question: '□ - 7 = 5\n□は いくつ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '12',
    explanation: '5 + 7 = 12 なので、□ = 12です。'
  },
  {
    id: 'M1-11d-Q24',
    unitId: 'M1-11d',
    step: 4,
    type: 'choice',
    question: '15 - □ = 8\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '15 - 7 = 8 なので、□ = 7です。'
  }
];

export const stepConfig = [
  { step: 1, pick: 6 },
  { step: 2, pick: 4 },
  { step: 3, pick: 3 },
  { step: 4, pick: 2 }
];

export default questions;
