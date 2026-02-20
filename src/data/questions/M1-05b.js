/**
 * M1-05b.js - Grimoire Guardians 問題データ
 * ユニット: M1-05b「たしざん（1）おうよう」
 *
 * 対象: 小学1年生、たしざん応用（M1-05きほんの次）
 * 準拠: 日本文教出版 算数1年（きほん単元の発展）
 *
 * カテゴリ構成（15問）
 *   A: もんだいぶん（標準的な文章題）4問
 *   B: あなうめ もんだいぶん（穴埋め文章題）4問
 *   C: しきを えらぼう（式の選択）3問
 *   D: どちらが おおきい？（式の大小比較）2問
 *   E: まとめ もんだい（複合・応用）2問
 *
 * Gemini承認仕様: 15問・CLEAR_THRESHOLD 60%・スキップ不可
 *
 * @version 1.0
 * @date 2026-02-20
 */

/** @type {Array<{id:string, unitId:string, type:string, question:string, choices:string[], correctAnswer:string}>} */
const questions = [

  // =====================================================
  // カテゴリA: もんだいぶん（標準的な文章題）
  // 場面をイメージして式を立て答える
  // =====================================================
  {
    id: 'M1-05b-Q01',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'あかい はなが 4ほん、\nしろい はなが 3ぼん あります。\nぜんぶで なんぼん？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05b-Q02',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'ふうせんが 5こ あります。\n3こ もらいました。\nぜんぶで なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05b-Q03',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'えんぴつが 2ほん、\nクレヨンが 7ほん あります。\nあわせて なんぼん？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-05b-Q04',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'こどもが 3にん います。\nおとなが 5にん います。\nぜんぶで なんにん？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },

  // =====================================================
  // カテゴリB: あなうめ もんだいぶん（穴埋め文章題）
  // □に入る数を文章から読み取る
  // =====================================================
  {
    id: 'M1-05b-Q05',
    unitId: 'M1-05b',
    type: 'choice',
    question: '□ + 3 = 8\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05b-Q06',
    unitId: 'M1-05b',
    type: 'choice',
    question: '6 + □ = 10\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05b-Q07',
    unitId: 'M1-05b',
    type: 'choice',
    question: '2 + □ = 6\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05b-Q08',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'ちょうが 6ぴき います。\nあと なんびき くれば 10ぴきに なる？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },

  // =====================================================
  // カテゴリC: しきを えらぼう（式の選択）
  // 場面に合った式を4択から選ぶ
  // =====================================================
  {
    id: 'M1-05b-Q09',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'ねこが 4ひき います。\n3びき きました。\nしきは どれ？',
    choices: ['4 + 3', '4 - 3', '3 + 3', '4 + 4'],
    correctAnswer: '4 + 3'
  },
  {
    id: 'M1-05b-Q10',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'みかんが 5こ あります。\n2こ もらいました。\nしきは どれ？',
    choices: ['5 - 2', '5 + 2', '2 + 2', '5 + 5'],
    correctAnswer: '5 + 2'
  },
  {
    id: 'M1-05b-Q11',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'りんごが 3こ、なしが 6こ あります。\nあわせた かずの しきは どれ？',
    choices: ['6 - 3', '3 + 3', '3 + 6', '6 + 6'],
    correctAnswer: '3 + 6'
  },

  // =====================================================
  // カテゴリD: どちらが おおきい？（式の大小比較）
  // 計算せずに or 計算して比較する
  // =====================================================
  {
    id: 'M1-05b-Q12',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'どちらが おおきい？\n5 + 2  と  3 + 4',
    choices: ['5 + 2', '3 + 4', 'おなじ', 'わからない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M1-05b-Q13',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'どちらが おおきい？\n4 + 5  と  6 + 4',
    choices: ['4 + 5', '6 + 4', 'おなじ', 'わからない'],
    correctAnswer: '6 + 4'
  },

  // =====================================================
  // カテゴリE: まとめ もんだい（応用）
  // きほんとおうようを組み合わせた総合問題
  // =====================================================
  {
    id: 'M1-05b-Q14',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'みかんが 4こ、りんごが 4こ あります。\nあわせて なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05b-Q15',
    unitId: 'M1-05b',
    type: 'choice',
    question: 'はこに ボールが 7こ あります。\n□こ はいると 10こに なります。\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  }
];

export default questions;
