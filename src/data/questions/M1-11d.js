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
 * カテゴリ構成（15問）
 *   混合スピード練習（図なし自力）:         6問  Q01-Q06
 *   文章題:                                4問  Q07-Q10
 *   くりあがり足し算との混合:               3問  Q11-Q13
 *   腕試し（逆算・穴埋め）:                2問  Q14-Q15
 *
 * ひらめきポイント:
 *   「くりあがりもくりさがりも、さくらんぼ1本で全部解ける！」
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // 混合スピード練習（6問）
  // 11〜17台からランダム。さくらんぼ図なし・自力で素早く解く
  // =====================================================
  {
    id: 'M1-11d-Q01',
    unitId: 'M1-11d',
    type: 'choice',
    question: '11 - 3 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11d-Q02',
    unitId: 'M1-11d',
    type: 'choice',
    question: '14 - 8 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11d-Q03',
    unitId: 'M1-11d',
    type: 'choice',
    question: '12 - 9 = ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-11d-Q04',
    unitId: 'M1-11d',
    type: 'choice',
    question: '16 - 7 = ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-11d-Q05',
    unitId: 'M1-11d',
    type: 'choice',
    question: '13 - 6 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11d-Q06',
    unitId: 'M1-11d',
    type: 'choice',
    question: '15 - 8 = ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },

  // =====================================================
  // 文章題（4問）
  // 日常の場面から式を立てて繰り下がりを使う
  // =====================================================
  {
    id: 'M1-11d-Q07',
    unitId: 'M1-11d',
    type: 'choice',
    question: 'りんごが 13こ あります。\n5こ たべました。\nのこりは なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-11d-Q08',
    unitId: 'M1-11d',
    type: 'choice',
    question: 'シールが 11まい あります。\n4まい あげました。\nのこりは なんまい？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-11d-Q09',
    unitId: 'M1-11d',
    type: 'choice',
    question: 'えんぴつが 15ほん あります。\n9ほん なくしました。\nのこりは なんぼん？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11d-Q10',
    unitId: 'M1-11d',
    type: 'choice',
    question: 'こどもが 17にん います。\n8にん かえりました。\nのこりは なんにん？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // くりあがり足し算との混合（3問）
  // + と - の記号を正しく読んで使い分ける力をつける
  // M1-10（くりあがり）の復習も兼ねる
  // =====================================================
  {
    id: 'M1-11d-Q11',
    unitId: 'M1-11d',
    type: 'choice',
    question: '8 + 6 = ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14'
  },
  {
    id: 'M1-11d-Q12',
    unitId: 'M1-11d',
    type: 'choice',
    question: '13 - 7 = ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-11d-Q13',
    unitId: 'M1-11d',
    type: 'choice',
    question: '9 + 4 = ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '13'
  },

  // =====================================================
  // 腕試し（2問）
  // 逆算・穴埋め問題。M1-11 完全攻略の達成感演出
  // =====================================================
  {
    id: 'M1-11d-Q14',
    unitId: 'M1-11d',
    type: 'choice',
    // 17-9=8 の逆算。□を求める
    question: '□ - 9 = 8\n□は いくつ？',
    choices: ['14', '15', '17', '18'],
    correctAnswer: '17'
  },
  {
    id: 'M1-11d-Q15',
    unitId: 'M1-11d',
    type: 'choice',
    // 14-8=6 の逆算。□を求める
    question: '14 - □ = 6\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  }
];

export default questions;
