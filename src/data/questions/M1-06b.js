/**
 * M1-06b.js - Grimoire Guardians 問題データ
 * ユニット: M1-06b「ひきざん（1）おうよう」
 *
 * 対象: 小学1年生、ひきざん応用（M1-06きほんの次）
 * 準拠: 日本文教出版 算数1年（きほん単元の発展）
 *
 * Step構成（シャッフル出題）
 *   Step1: もんだいぶん（プール6問 → 4問出題）
 *   Step2: ちがいを もとめよう（プール5問 → 3問出題）
 *   Step3: あなうめ もんだいぶん（プール5問 → 4問出題）
 *   Step4: しきを えらぼう + まとめ（プール6問 → 4問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: もんだいぶん（標準的なひき算文章題）
  // =====================================================
  {
    id: 'M1-06b-Q01',
    unitId: 'M1-06b',
    step: 1,
    type: 'choice',
    question: 'ふうせんが 9こ あります。\n4こ とんで いきました。\nのこりは なんこ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06b-Q02',
    unitId: 'M1-06b',
    step: 1,
    type: 'choice',
    question: 'こどもが 8にん います。\n3にん かえりました。\nのこりは なんにん？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06b-Q03',
    unitId: 'M1-06b',
    step: 1,
    type: 'choice',
    question: 'えんぴつが 10ぽん あります。\n6ぽん つかいました。\nのこりは なんぽん？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06b-Q04',
    unitId: 'M1-06b',
    step: 1,
    type: 'choice',
    question: 'たまごが 9こ あります。\n3こ わりました。\nのこりは なんこ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-06b-Q16',
    unitId: 'M1-06b',
    step: 1,
    type: 'choice',
    question: 'りんごが 7こ あります。\n5こ たべました。\nのこりは なんこ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-06b-Q17',
    unitId: 'M1-06b',
    step: 1,
    type: 'choice',
    question: 'きんぎょが 10びき います。\n4びき にがしました。\nのこりは なんびき？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },

  // =====================================================
  // Step2: ちがいを もとめよう（差を求める文章題）
  // =====================================================
  {
    id: 'M1-06b-Q05',
    unitId: 'M1-06b',
    step: 2,
    type: 'choice',
    question: 'みかんが 8こ、りんごが 5こ あります。\nみかんは りんごより なんこ おおい？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06b-Q06',
    unitId: 'M1-06b',
    step: 2,
    type: 'choice',
    question: 'ねこが 3びき、いぬが 7ひき います。\nちがいは なんびき？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-06b-Q07',
    unitId: 'M1-06b',
    step: 2,
    type: 'choice',
    question: 'あかい ふうせんが 9こ、\nあおい ふうせんが 6こ あります。\nあかい ふうせんは あおより なんこ おおい？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06b-Q18',
    unitId: 'M1-06b',
    step: 2,
    type: 'choice',
    question: 'おとこのこが 6にん、\nおんなのこが 4にん います。\nちがいは なんにん？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-06b-Q19',
    unitId: 'M1-06b',
    step: 2,
    type: 'choice',
    question: 'えんぴつが 10ぽん、\nクレヨンが 7ほん あります。\nえんぴつは クレヨンより なんぼん おおい？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },

  // =====================================================
  // Step3: あなうめ もんだいぶん（穴埋め文章題）
  // =====================================================
  {
    id: 'M1-06b-Q08',
    unitId: 'M1-06b',
    step: 3,
    type: 'choice',
    question: '10 - □ = 7\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06b-Q09',
    unitId: 'M1-06b',
    step: 3,
    type: 'choice',
    question: '8 - □ = 8\n□は いくつ？',
    choices: ['0', '1', '2', '3'],
    correctAnswer: '0'
  },
  {
    id: 'M1-06b-Q10',
    unitId: 'M1-06b',
    step: 3,
    type: 'choice',
    question: '□ - 4 = 5\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-06b-Q20',
    unitId: 'M1-06b',
    step: 3,
    type: 'choice',
    question: '9 - □ = 4\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-06b-Q21',
    unitId: 'M1-06b',
    step: 3,
    type: 'choice',
    question: '□ - 6 = 2\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },

  // =====================================================
  // Step4: しきを えらぼう + まとめ（たし・ひき混合）
  // =====================================================
  {
    id: 'M1-06b-Q11',
    unitId: 'M1-06b',
    step: 4,
    type: 'choice',
    question: 'ねこが 7ひき います。\n2ひき にげました。\nのこりを もとめる しきは どれ？',
    choices: ['7 + 2', '7 - 2', '2 - 7', '7 + 7'],
    correctAnswer: '7 - 2'
  },
  {
    id: 'M1-06b-Q12',
    unitId: 'M1-06b',
    step: 4,
    type: 'choice',
    question: 'りんごが 6こ、みかんが 4こ あります。\nちがいを もとめる しきは どれ？',
    choices: ['6 + 4', '4 + 6', '6 - 4', '4 - 6'],
    correctAnswer: '6 - 4'
  },
  {
    id: 'M1-06b-Q13',
    unitId: 'M1-06b',
    step: 4,
    type: 'choice',
    question: 'はじめに 3こ あります。\n5こ もらいました。\nぜんぶを もとめる しきは どれ？',
    choices: ['5 - 3', '3 - 5', '3 + 5', '5 + 5'],
    correctAnswer: '3 + 5'
  },
  {
    id: 'M1-06b-Q14',
    unitId: 'M1-06b',
    step: 4,
    type: 'choice',
    question: 'りんごが 5こ、みかんが 8こ あります。\nりんごは みかんより なんこ すくない？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-06b-Q15',
    unitId: 'M1-06b',
    step: 4,
    type: 'choice',
    question: 'つるが 9わ います。\n3わ とんで いきました。\nのこりは なんわ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M1-06b-Q22',
    unitId: 'M1-06b',
    step: 4,
    type: 'choice',
    question: 'バスに 10にん のっています。\n□にん おりたので 4にんに なりました。\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 3 },
  { step: 3, pick: 4 },
  { step: 4, pick: 4 }
];

export default questions;
