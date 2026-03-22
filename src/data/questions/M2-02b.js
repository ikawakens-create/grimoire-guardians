/**
 * M2-02b.js - Grimoire Guardians 問題データ
 * ユニット: M2-02b「2けた＋2けたの たしざん（混合）」
 *
 * 対象: 小学2年生、2桁＋2桁の筆算たしざん（くりあがりあり・なし 混合）
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: 2けた＋2けた（くりあがりなし）（プール15問 → 5問出題）
 *   Step2: 2けた＋2けた（くりあがりあり）（プール15問 → 5問出題）
 *   Step3: 文章題（混合）               （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 2けた＋2けた（くりあがりなし）
  // =====================================================
  {
    id: 'M2-02b-Q01',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 13,
    operand2: 21,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q02',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 24,
    operand2: 32,
    correctAnswer: '56',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q03',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 31,
    operand2: 45,
    correctAnswer: '76',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q04',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 42,
    operand2: 53,
    correctAnswer: '95',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q05',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 51,
    operand2: 24,
    correctAnswer: '75',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q06',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 12,
    operand2: 35,
    correctAnswer: '47',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q07',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 33,
    operand2: 44,
    correctAnswer: '77',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q08',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 22,
    operand2: 51,
    correctAnswer: '73',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q09',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 13,
    correctAnswer: '54',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q10',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 60,
    operand2: 25,
    correctAnswer: '85',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q11',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 34,
    operand2: 21,
    correctAnswer: '55',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q12',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 15,
    operand2: 22,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q13',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 54,
    correctAnswer: '77',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q14',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 61,
    operand2: 28,
    correctAnswer: '89',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q15',
    unitId: 'M2-02b',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 40,
    operand2: 46,
    correctAnswer: '86',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step2: 2けた＋2けた（くりあがりあり）
  // =====================================================
  {
    id: 'M2-02b-Q16',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 16,
    operand2: 19,
    correctAnswer: '35',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q17',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 27,
    operand2: 18,
    correctAnswer: '45',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q18',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 34,
    operand2: 29,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q19',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 45,
    operand2: 38,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q20',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 56,
    operand2: 27,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q21',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 18,
    operand2: 16,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q22',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 26,
    operand2: 37,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q23',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 37,
    operand2: 46,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q24',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 48,
    operand2: 15,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q25',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 59,
    operand2: 14,
    correctAnswer: '73',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q26',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 17,
    operand2: 28,
    correctAnswer: '45',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q27',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 28,
    operand2: 14,
    correctAnswer: '42',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q28',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 39,
    operand2: 43,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q29',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 38,
    correctAnswer: '85',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02b-Q30',
    unitId: 'M2-02b',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 58,
    operand2: 26,
    correctAnswer: '84',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step3: 文章題（混合）
  // =====================================================
  {
    id: 'M2-02b-Q31',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'りんごが 13こ、みかんが 21こ あります。\nあわせて なんこ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-02b-Q32',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 24ほん あります。32ほん もらいました。\nあわせて なんぼん？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '56'
  },
  {
    id: 'M2-02b-Q33',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'きのう 45まい、きょう 38まい おりがみを つかいました。\nあわせて なんまい？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02b-Q34',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'こどもが 27にん います。18にん やってきました。\nあわせて なんにん？',
    choices: ['43', '44', '45', '46'],
    correctAnswer: '45'
  },
  {
    id: 'M2-02b-Q35',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'あかい たまが 34こ、しろい たまが 29こ あります。\nあわせて なんこ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02b-Q36',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'ほんが 51さつ あります。24さつ かいました。\nあわせて なんさつ？',
    choices: ['73', '74', '75', '76'],
    correctAnswer: '75'
  },
  {
    id: 'M2-02b-Q37',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'バスに 26にん のっています。37にん のってきました。\nあわせて なんにん？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02b-Q38',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'たまごが 48こ あります。35こ かいました。\nあわせて なんこ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02b-Q39',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'ひつじが 22ひき います。51ひき やってきました。\nあわせて なんびき？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73'
  },
  {
    id: 'M2-02b-Q40',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'はなが 60ぽん あります。25ほん もらいました。\nあわせて なんぼん？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '85'
  },
  {
    id: 'M2-02b-Q41',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'カードが 34まい あります。29まい もらいました。\nあわせて なんまい？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02b-Q42',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'いちごが 15こ、ぶどうが 22こ あります。\nあわせて なんこ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-02b-Q43',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 23こ あります。54こ ひろいました。\nあわせて なんこ？',
    choices: ['75', '76', '77', '78'],
    correctAnswer: '77'
  },
  {
    id: 'M2-02b-Q44',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'あかいふうせんが 16こ、あおいふうせんが 19こ あります。\nあわせて なんこ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '35'
  },
  {
    id: 'M2-02b-Q45',
    unitId: 'M2-02b',
    step: 3,
    type: 'choice',
    question: 'おはじきを きのう 58まい、きょう 26まい ひろいました。\nあわせて なんまい？',
    choices: ['82', '83', '84', '85'],
    correctAnswer: '84'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
