/**
 * M2-04.js - Grimoire Guardians 問題データ
 * ユニット: M2-04「2けたの けいさん おうよう（たし・ひき 混合）」
 *
 * 対象: 小学2年生、2桁のたしざん・ひきざん 混合応用
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: たしざん混合（くりあがりあり・なし）（プール15問 → 5問出題）
 *   Step2: ひきざん混合（くりさがりあり・なし）（プール15問 → 5問出題）
 *   Step3: 文章題（たし・ひき混合）             （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: たしざん混合（くりあがりあり・なし）
  // =====================================================
  {
    id: 'M2-04-Q01',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '25 ＋ 13 ＝ ？',
    choices: ['36', '37', '38', '39'],
    correctAnswer: '38'
  },
  {
    id: 'M2-04-Q02',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '37 ＋ 18 ＝ ？',
    choices: ['53', '54', '55', '56'],
    correctAnswer: '55'
  },
  {
    id: 'M2-04-Q03',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '46 ＋ 23 ＝ ？',
    choices: ['67', '68', '69', '70'],
    correctAnswer: '69'
  },
  {
    id: 'M2-04-Q04',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '58 ＋ 27 ＝ ？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '85'
  },
  {
    id: 'M2-04-Q05',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '34 ＋ 19 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-04-Q06',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '47 ＋ 32 ＝ ？',
    choices: ['77', '78', '79', '80'],
    correctAnswer: '79'
  },
  {
    id: 'M2-04-Q07',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '56 ＋ 29 ＝ ？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '85'
  },
  {
    id: 'M2-04-Q08',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '63 ＋ 14 ＝ ？',
    choices: ['75', '76', '77', '78'],
    correctAnswer: '77'
  },
  {
    id: 'M2-04-Q09',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '29 ＋ 35 ＝ ？',
    choices: ['62', '63', '64', '65'],
    correctAnswer: '64'
  },
  {
    id: 'M2-04-Q10',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '41 ＋ 39 ＝ ？',
    choices: ['78', '79', '80', '81'],
    correctAnswer: '80'
  },
  {
    id: 'M2-04-Q11',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '55 ＋ 28 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-04-Q12',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '62 ＋ 35 ＝ ？',
    choices: ['95', '96', '97', '98'],
    correctAnswer: '97'
  },
  {
    id: 'M2-04-Q13',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '74 ＋ 16 ＝ ？',
    choices: ['88', '89', '90', '91'],
    correctAnswer: '90'
  },
  {
    id: 'M2-04-Q14',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '48 ＋ 44 ＝ ？',
    choices: ['90', '91', '92', '93'],
    correctAnswer: '92'
  },
  {
    id: 'M2-04-Q15',
    unitId: 'M2-04',
    step: 1,
    type: 'choice',
    question: '53 ＋ 38 ＝ ？',
    choices: ['89', '90', '91', '92'],
    correctAnswer: '91'
  },

  // =====================================================
  // Step2: ひきざん混合（くりさがりあり・なし）
  // =====================================================
  {
    id: 'M2-04-Q16',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '57 － 23 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-04-Q17',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '64 － 28 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q18',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '72 － 41 ＝ ？',
    choices: ['29', '30', '31', '32'],
    correctAnswer: '31'
  },
  {
    id: 'M2-04-Q19',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '83 － 47 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q20',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '91 － 55 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q21',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '45 － 12 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-04-Q22',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '56 － 29 ＝ ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-04-Q23',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '67 － 34 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-04-Q24',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '78 － 45 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-04-Q25',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '89 － 53 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q26',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '93 － 48 ＝ ？',
    choices: ['43', '44', '45', '46'],
    correctAnswer: '45'
  },
  {
    id: 'M2-04-Q27',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '74 － 37 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04-Q28',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '61 － 24 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04-Q29',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '85 － 39 ＝ ？',
    choices: ['44', '45', '46', '47'],
    correctAnswer: '46'
  },
  {
    id: 'M2-04-Q30',
    unitId: 'M2-04',
    step: 2,
    type: 'choice',
    question: '92 － 56 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },

  // =====================================================
  // Step3: 文章題（たし・ひき混合）
  // =====================================================
  {
    id: 'M2-04-Q31',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'はこに あめが 25こ あります。13こ もらいました。\nあわせて なんこ？',
    choices: ['36', '37', '38', '39'],
    correctAnswer: '38'
  },
  {
    id: 'M2-04-Q32',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'みかんが 64こ あります。28こ たべました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q33',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'こどもが 37にん います。18にん やってきました。\nあわせて なんにん？',
    choices: ['53', '54', '55', '56'],
    correctAnswer: '55'
  },
  {
    id: 'M2-04-Q34',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'ほんが 83さつ あります。47さつ よみました。\nのこりは なんさつ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q35',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'はなが 46ほん あります。23ほん もらいました。\nあわせて なんぼん？',
    choices: ['67', '68', '69', '70'],
    correctAnswer: '69'
  },
  {
    id: 'M2-04-Q36',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 72ほん あります。41ほん くばりました。\nのこりは なんぼん？',
    choices: ['29', '30', '31', '32'],
    correctAnswer: '31'
  },
  {
    id: 'M2-04-Q37',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'カードが 34まい あります。19まい もらいました。\nあわせて なんまい？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-04-Q38',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'りんごが 91こ あります。55こ くばりました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q39',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'バスに 56にん のっています。29にん おりました。\nのこりは なんにん？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-04-Q40',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 63こ あります。14こ ひろいました。\nあわせて なんこ？',
    choices: ['75', '76', '77', '78'],
    correctAnswer: '77'
  },
  {
    id: 'M2-04-Q41',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'おはじきが 89こ あります。53こ あげました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-04-Q42',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'たまごが 47こ あります。32こ かいました。\nあわせて なんこ？',
    choices: ['77', '78', '79', '80'],
    correctAnswer: '79'
  },
  {
    id: 'M2-04-Q43',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'シールが 74まい あります。37まい つかいました。\nのこりは なんまい？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-04-Q44',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'ふうせんが 55こ あります。28こ とびました。\nのこりは なんこ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-04-Q45',
    unitId: 'M2-04',
    step: 3,
    type: 'choice',
    question: 'いちごが 29こ あります。35こ もらいました。\nあわせて なんこ？',
    choices: ['62', '63', '64', '65'],
    correctAnswer: '64'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
