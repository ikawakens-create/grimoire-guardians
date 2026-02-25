/**
 * M1-05b.js - Grimoire Guardians 問題データ
 * ユニット: M1-05b「たしざん（1）おうよう」
 *
 * 対象: 小学1年生、たしざん応用（M1-05きほんの次）
 * 準拠: 日本文教出版 算数1年（きほん単元の発展）
 *
 * Step構成（シャッフル出題）
 *   Step1: もんだいぶん（プール6問 → 4問出題）
 *   Step2: あなうめ もんだいぶん（プール6問 → 4問出題）
 *   Step3: しきを えらぼう（プール5問 → 4問出題）
 *   Step4: まとめ もんだい（プール5問 → 3問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: もんだいぶん（標準的な文章題）
  // =====================================================
  {
    id: 'M1-05b-Q01',
    unitId: 'M1-05b',
    step: 1,
    type: 'choice',
    question: 'あかい はなが 4ほん、\nしろい はなが 3ぼん あります。\nぜんぶで なんぼん？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05b-Q02',
    unitId: 'M1-05b',
    step: 1,
    type: 'choice',
    question: 'ふうせんが 5こ あります。\n3こ もらいました。\nぜんぶで なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05b-Q03',
    unitId: 'M1-05b',
    step: 1,
    type: 'choice',
    question: 'えんぴつが 2ほん、\nクレヨンが 7ほん あります。\nあわせて なんぼん？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-05b-Q04',
    unitId: 'M1-05b',
    step: 1,
    type: 'choice',
    question: 'こどもが 3にん います。\nおとなが 5にん います。\nぜんぶで なんにん？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05b-Q16',
    unitId: 'M1-05b',
    step: 1,
    type: 'choice',
    question: 'きんぎょが 4ひき います。\n6ひき ふえました。\nぜんぶで なんびき？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05b-Q17',
    unitId: 'M1-05b',
    step: 1,
    type: 'choice',
    question: 'りんごが 1こ、みかんが 8こ あります。\nあわせて なんこ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step2: あなうめ もんだいぶん（穴埋め文章題）
  // =====================================================
  {
    id: 'M1-05b-Q05',
    unitId: 'M1-05b',
    step: 2,
    type: 'choice',
    question: '□ + 3 = 8\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05b-Q06',
    unitId: 'M1-05b',
    step: 2,
    type: 'choice',
    question: '6 + □ = 10\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05b-Q07',
    unitId: 'M1-05b',
    step: 2,
    type: 'choice',
    question: '2 + □ = 6\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05b-Q08',
    unitId: 'M1-05b',
    step: 2,
    type: 'choice',
    question: 'ちょうが 6ぴき います。\nあと なんびき くれば 10ぴきに なる？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05b-Q18',
    unitId: 'M1-05b',
    step: 2,
    type: 'choice',
    question: '□ + 7 = 10\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-05b-Q19',
    unitId: 'M1-05b',
    step: 2,
    type: 'choice',
    question: 'はこに 4こ あります。\nあと □こ いれると 9こに なります。\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },

  // =====================================================
  // Step3: しきを えらぼう（式の選択 + 大小比較）
  // =====================================================
  {
    id: 'M1-05b-Q09',
    unitId: 'M1-05b',
    step: 3,
    type: 'choice',
    question: 'ねこが 4ひき います。\n3びき きました。\nしきは どれ？',
    choices: ['4 + 3', '4 - 3', '3 + 3', '4 + 4'],
    correctAnswer: '4 + 3'
  },
  {
    id: 'M1-05b-Q10',
    unitId: 'M1-05b',
    step: 3,
    type: 'choice',
    question: 'みかんが 5こ あります。\n2こ もらいました。\nしきは どれ？',
    choices: ['5 - 2', '5 + 2', '2 + 2', '5 + 5'],
    correctAnswer: '5 + 2'
  },
  {
    id: 'M1-05b-Q11',
    unitId: 'M1-05b',
    step: 3,
    type: 'choice',
    question: 'りんごが 3こ、なしが 6こ あります。\nあわせた かずの しきは どれ？',
    choices: ['6 - 3', '3 + 3', '3 + 6', '6 + 6'],
    correctAnswer: '3 + 6'
  },
  {
    id: 'M1-05b-Q12',
    unitId: 'M1-05b',
    step: 3,
    type: 'choice',
    question: 'どちらが おおきい？\n5 + 2  と  3 + 4',
    choices: ['5 + 2', '3 + 4', 'おなじ', 'わからない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M1-05b-Q13',
    unitId: 'M1-05b',
    step: 3,
    type: 'choice',
    question: 'どちらが おおきい？\n4 + 5  と  6 + 4',
    choices: ['4 + 5', '6 + 4', 'おなじ', 'わからない'],
    correctAnswer: '6 + 4'
  },

  // =====================================================
  // Step4: まとめ もんだい（応用・総合）
  // =====================================================
  {
    id: 'M1-05b-Q14',
    unitId: 'M1-05b',
    step: 4,
    type: 'choice',
    question: 'みかんが 4こ、りんごが 4こ あります。\nあわせて なんこ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05b-Q15',
    unitId: 'M1-05b',
    step: 4,
    type: 'choice',
    question: 'はこに ボールが 7こ あります。\n□こ はいると 10こに なります。\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-05b-Q20',
    unitId: 'M1-05b',
    step: 4,
    type: 'choice',
    question: 'あかい クレヨンが 5ほん、\nあおい クレヨンが 3ほん あります。\nぜんぶで なんぼん？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05b-Q21',
    unitId: 'M1-05b',
    step: 4,
    type: 'choice',
    question: 'どちらが おおきい？\n2 + 7  と  4 + 6',
    choices: ['2 + 7', '4 + 6', 'おなじ', 'わからない'],
    correctAnswer: '4 + 6'
  },
  {
    id: 'M1-05b-Q22',
    unitId: 'M1-05b',
    step: 4,
    type: 'choice',
    question: 'こうえんに 8にん います。\n□にん きたので 10にんに なりました。\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 4 },
  { step: 3, pick: 4 },
  { step: 4, pick: 3 }
];

export default questions;
