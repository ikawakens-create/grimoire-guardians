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
    type: 'choice',
    question: '13 ＋ 21 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-02b-Q02',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '24 ＋ 32 ＝ ？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '56'
  },
  {
    id: 'M2-02b-Q03',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '31 ＋ 45 ＝ ？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '76'
  },
  {
    id: 'M2-02b-Q04',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '42 ＋ 53 ＝ ？',
    choices: ['93', '94', '95', '96'],
    correctAnswer: '95'
  },
  {
    id: 'M2-02b-Q05',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '51 ＋ 24 ＝ ？',
    choices: ['73', '74', '75', '76'],
    correctAnswer: '75'
  },
  {
    id: 'M2-02b-Q06',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '12 ＋ 35 ＝ ？',
    choices: ['45', '46', '47', '48'],
    correctAnswer: '47'
  },
  {
    id: 'M2-02b-Q07',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '33 ＋ 44 ＝ ？',
    choices: ['75', '76', '77', '78'],
    correctAnswer: '77'
  },
  {
    id: 'M2-02b-Q08',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '22 ＋ 51 ＝ ？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73'
  },
  {
    id: 'M2-02b-Q09',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '41 ＋ 13 ＝ ？',
    choices: ['52', '53', '54', '55'],
    correctAnswer: '54'
  },
  {
    id: 'M2-02b-Q10',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '60 ＋ 25 ＝ ？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '85'
  },
  {
    id: 'M2-02b-Q11',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '34 ＋ 21 ＝ ？',
    choices: ['53', '54', '55', '56'],
    correctAnswer: '55'
  },
  {
    id: 'M2-02b-Q12',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '15 ＋ 22 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-02b-Q13',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '23 ＋ 54 ＝ ？',
    choices: ['75', '76', '77', '78'],
    correctAnswer: '77'
  },
  {
    id: 'M2-02b-Q14',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '61 ＋ 28 ＝ ？',
    choices: ['87', '88', '89', '90'],
    correctAnswer: '89'
  },
  {
    id: 'M2-02b-Q15',
    unitId: 'M2-02b',
    step: 1,
    type: 'choice',
    question: '40 ＋ 46 ＝ ？',
    choices: ['84', '85', '86', '87'],
    correctAnswer: '86'
  },

  // =====================================================
  // Step2: 2けた＋2けた（くりあがりあり）
  // =====================================================
  {
    id: 'M2-02b-Q16',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '16 ＋ 19 ＝ ？',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '35'
  },
  {
    id: 'M2-02b-Q17',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '27 ＋ 18 ＝ ？',
    choices: ['43', '44', '45', '46'],
    correctAnswer: '45'
  },
  {
    id: 'M2-02b-Q18',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '34 ＋ 29 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02b-Q19',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '45 ＋ 38 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02b-Q20',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '56 ＋ 27 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02b-Q21',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '18 ＋ 16 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-02b-Q22',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '26 ＋ 37 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02b-Q23',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '37 ＋ 46 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02b-Q24',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '48 ＋ 15 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02b-Q25',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '59 ＋ 14 ＝ ？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73'
  },
  {
    id: 'M2-02b-Q26',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '17 ＋ 28 ＝ ？',
    choices: ['43', '44', '45', '46'],
    correctAnswer: '45'
  },
  {
    id: 'M2-02b-Q27',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '28 ＋ 14 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '42'
  },
  {
    id: 'M2-02b-Q28',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '39 ＋ 43 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '82'
  },
  {
    id: 'M2-02b-Q29',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '47 ＋ 38 ＝ ？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '85'
  },
  {
    id: 'M2-02b-Q30',
    unitId: 'M2-02b',
    step: 2,
    type: 'choice',
    question: '58 ＋ 26 ＝ ？',
    choices: ['82', '83', '84', '85'],
    correctAnswer: '84'
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
