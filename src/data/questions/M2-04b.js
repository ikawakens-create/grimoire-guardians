/**
 * M2-04b.js - Grimoire Guardians 問題データ
 * ユニット: M2-04b「ひっさん まとめ（Zone 1 そうまとめ）」
 *
 * 対象: 小学2年生、2桁の筆算 たしざん・ひきざん 総復習
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: たしざん 総復習（混合）（プール15問 → 5問出題）
 *   Step2: ひきざん 総復習（混合）（プール15問 → 5問出題）
 *   Step3: 文章題 総復習（混合） （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: たしざん 総復習
  // =====================================================
  {
    id: 'M2-04b-Q01',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '24 ＋ 13 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04b-Q02',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '35 ＋ 17 ＝ ？',
    choices: ['50', '51', '52', '53'],
    correctAnswer: '52'
  },
  {
    id: 'M2-04b-Q03',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '46 ＋ 28 ＝ ？',
    choices: ['72', '73', '74', '75'],
    correctAnswer: '74'
  },
  {
    id: 'M2-04b-Q04',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '57 ＋ 36 ＝ ？',
    choices: ['91', '92', '93', '94'],
    correctAnswer: '93'
  },
  {
    id: 'M2-04b-Q05',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '63 ＋ 29 ＝ ？',
    choices: ['90', '91', '92', '93'],
    correctAnswer: '92'
  },
  {
    id: 'M2-04b-Q06',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '27 ＋ 4 ＝ ？',
    choices: ['29', '30', '31', '32'],
    correctAnswer: '31'
  },
  {
    id: 'M2-04b-Q07',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '38 ＋ 5 ＝ ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-04b-Q08',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '49 ＋ 7 ＝ ？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '56'
  },
  {
    id: 'M2-04b-Q09',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '52 ＋ 3 ＝ ？',
    choices: ['53', '54', '55', '56'],
    correctAnswer: '55'
  },
  {
    id: 'M2-04b-Q10',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '73 ＋ 6 ＝ ？',
    choices: ['77', '78', '79', '80'],
    correctAnswer: '79'
  },
  {
    id: 'M2-04b-Q11',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '31 ＋ 45 ＝ ？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '76'
  },
  {
    id: 'M2-04b-Q12',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '48 ＋ 39 ＝ ？',
    choices: ['85', '86', '87', '88'],
    correctAnswer: '87'
  },
  {
    id: 'M2-04b-Q13',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '56 ＋ 14 ＝ ？',
    choices: ['68', '69', '70', '71'],
    correctAnswer: '70'
  },
  {
    id: 'M2-04b-Q14',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '64 ＋ 28 ＝ ？',
    choices: ['90', '91', '92', '93'],
    correctAnswer: '92'
  },
  {
    id: 'M2-04b-Q15',
    unitId: 'M2-04b',
    step: 1,
    type: 'choice',
    question: '75 ＋ 15 ＝ ？',
    choices: ['88', '89', '90', '91'],
    correctAnswer: '90'
  },

  // =====================================================
  // Step2: ひきざん 総復習
  // =====================================================
  {
    id: 'M2-04b-Q16',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '47 － 13 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-04b-Q17',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '52 － 17 ＝ ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '35'
  },
  {
    id: 'M2-04b-Q18',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '65 － 28 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04b-Q19',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '73 － 35 ＝ ？',
    choices: ['36', '37', '38', '39'],
    correctAnswer: '38'
  },
  {
    id: 'M2-04b-Q20',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '84 － 45 ＝ ？',
    choices: ['37', '38', '39', '40'],
    correctAnswer: '39'
  },
  {
    id: 'M2-04b-Q21',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '91 － 58 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-04b-Q22',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '36 － 5 ＝ ？',
    choices: ['29', '30', '31', '32'],
    correctAnswer: '31'
  },
  {
    id: 'M2-04b-Q23',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '72 － 8 ＝ ？',
    choices: ['62', '63', '64', '65'],
    correctAnswer: '64'
  },
  {
    id: 'M2-04b-Q24',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '85 － 6 ＝ ？',
    choices: ['77', '78', '79', '80'],
    correctAnswer: '79'
  },
  {
    id: 'M2-04b-Q25',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '94 － 7 ＝ ？',
    choices: ['85', '86', '87', '88'],
    correctAnswer: '87'
  },
  {
    id: 'M2-04b-Q26',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '53 － 21 ＝ ？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '32'
  },
  {
    id: 'M2-04b-Q27',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '76 － 39 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04b-Q28',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '87 － 48 ＝ ？',
    choices: ['37', '38', '39', '40'],
    correctAnswer: '39'
  },
  {
    id: 'M2-04b-Q29',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '96 － 54 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '42'
  },
  {
    id: 'M2-04b-Q30',
    unitId: 'M2-04b',
    step: 2,
    type: 'choice',
    question: '63 － 26 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },

  // =====================================================
  // Step3: 文章題 総復習（たし・ひき混合）
  // =====================================================
  {
    id: 'M2-04b-Q31',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'あおいふうせんが 24こ、あかいふうせんが 13こ あります。\nあわせて なんこ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04b-Q32',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'おはじきが 52こ あります。17こ つかいました。\nのこりは なんこ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '35'
  },
  {
    id: 'M2-04b-Q33',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'ほんが 46さつ あります。28さつ かいました。\nあわせて なんさつ？',
    choices: ['72', '73', '74', '75'],
    correctAnswer: '74'
  },
  {
    id: 'M2-04b-Q34',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'たまごが 73こ あります。35こ りょうりに つかいました。\nのこりは なんこ？',
    choices: ['36', '37', '38', '39'],
    correctAnswer: '38'
  },
  {
    id: 'M2-04b-Q35',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'こどもが 57にん います。36にん やってきました。\nあわせて なんにん？',
    choices: ['91', '92', '93', '94'],
    correctAnswer: '93'
  },
  {
    id: 'M2-04b-Q36',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'みかんが 84こ あります。45こ くばりました。\nのこりは なんこ？',
    choices: ['37', '38', '39', '40'],
    correctAnswer: '39'
  },
  {
    id: 'M2-04b-Q37',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'カードが 63まい あります。29まい もらいました。\nあわせて なんまい？',
    choices: ['90', '91', '92', '93'],
    correctAnswer: '92'
  },
  {
    id: 'M2-04b-Q38',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 91ほん あります。58ほん くばりました。\nのこりは なんぼん？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-04b-Q39',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'りんごが 38こ あります。5こ もらいました。\nあわせて なんこ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-04b-Q40',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 72こ あります。8こ たべました。\nのこりは なんこ？',
    choices: ['62', '63', '64', '65'],
    correctAnswer: '64'
  },
  {
    id: 'M2-04b-Q41',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'シールが 31まい あります。45まい もらいました。\nあわせて なんまい？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '76'
  },
  {
    id: 'M2-04b-Q42',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'ジュースが 76ほん あります。39ほん くばりました。\nのこりは なんぼん？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04b-Q43',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'いちごが 49こ あります。7こ もらいました。\nあわせて なんこ？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '56'
  },
  {
    id: 'M2-04b-Q44',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'あめが 85こ あります。6こ たべました。\nのこりは なんこ？',
    choices: ['77', '78', '79', '80'],
    correctAnswer: '79'
  },
  {
    id: 'M2-04b-Q45',
    unitId: 'M2-04b',
    step: 3,
    type: 'choice',
    question: 'はなが 48ほん あります。39ほん もらいました。\nあわせて なんぼん？',
    choices: ['85', '86', '87', '88'],
    correctAnswer: '87'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
