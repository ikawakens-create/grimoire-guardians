/**
 * M2-01.js - Grimoire Guardians 問題データ
 * ユニット: M2-01「2けたの たしざん（くりあがりなし）」
 *
 * 対象: 小学2年生、2桁の筆算たしざん（くりあがりなし）
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: 2けた＋1けた（くりあがりなし）（プール15問 → 5問出題）
 *   Step2: 2けた＋2けた（くりあがりなし）（プール15問 → 5問出題）
 *   Step3: □を つかった もんだい     （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 2けた＋1けた（くりあがりなし）
  // =====================================================
  {
    id: 'M2-01-Q01',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '23 ＋ 4 ＝ ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-01-Q02',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '35 ＋ 2 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-01-Q03',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '41 ＋ 6 ＝ ？',
    choices: ['45', '46', '47', '48'],
    correctAnswer: '47'
  },
  {
    id: 'M2-01-Q04',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '52 ＋ 3 ＝ ？',
    choices: ['53', '54', '55', '56'],
    correctAnswer: '55'
  },
  {
    id: 'M2-01-Q05',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '63 ＋ 4 ＝ ？',
    choices: ['65', '66', '67', '68'],
    correctAnswer: '67'
  },
  {
    id: 'M2-01-Q06',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '71 ＋ 5 ＝ ？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '76'
  },
  {
    id: 'M2-01-Q07',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '84 ＋ 2 ＝ ？',
    choices: ['84', '85', '86', '87'],
    correctAnswer: '86'
  },
  {
    id: 'M2-01-Q08',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '92 ＋ 6 ＝ ？',
    choices: ['96', '97', '98', '99'],
    correctAnswer: '98'
  },
  {
    id: 'M2-01-Q09',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '25 ＋ 3 ＝ ？',
    choices: ['26', '27', '28', '29'],
    correctAnswer: '28'
  },
  {
    id: 'M2-01-Q10',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '46 ＋ 2 ＝ ？',
    choices: ['46', '47', '48', '49'],
    correctAnswer: '48'
  },
  {
    id: 'M2-01-Q11',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '57 ＋ 1 ＝ ？',
    choices: ['56', '57', '58', '59'],
    correctAnswer: '58'
  },
  {
    id: 'M2-01-Q12',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '64 ＋ 5 ＝ ？',
    choices: ['67', '68', '69', '70'],
    correctAnswer: '69'
  },
  {
    id: 'M2-01-Q13',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '73 ＋ 3 ＝ ？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '76'
  },
  {
    id: 'M2-01-Q14',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '81 ＋ 6 ＝ ？',
    choices: ['85', '86', '87', '88'],
    correctAnswer: '87'
  },
  {
    id: 'M2-01-Q15',
    unitId: 'M2-01',
    step: 1,
    type: 'choice',
    question: '90 ＋ 7 ＝ ？',
    choices: ['95', '96', '97', '98'],
    correctAnswer: '97'
  },

  // =====================================================
  // Step2: 2けた＋2けた（くりあがりなし）
  // =====================================================
  {
    id: 'M2-01-Q16',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '21 ＋ 13 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-01-Q17',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '32 ＋ 14 ＝ ？',
    choices: ['44', '45', '46', '47'],
    correctAnswer: '46'
  },
  {
    id: 'M2-01-Q18',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '43 ＋ 12 ＝ ？',
    choices: ['53', '54', '55', '56'],
    correctAnswer: '55'
  },
  {
    id: 'M2-01-Q19',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '54 ＋ 23 ＝ ？',
    choices: ['75', '76', '77', '78'],
    correctAnswer: '77'
  },
  {
    id: 'M2-01-Q20',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '65 ＋ 21 ＝ ？',
    choices: ['84', '85', '86', '87'],
    correctAnswer: '86'
  },
  {
    id: 'M2-01-Q21',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '23 ＋ 34 ＝ ？',
    choices: ['55', '56', '57', '58'],
    correctAnswer: '57'
  },
  {
    id: 'M2-01-Q22',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '11 ＋ 25 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-01-Q23',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '41 ＋ 32 ＝ ？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73'
  },
  {
    id: 'M2-01-Q24',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '53 ＋ 14 ＝ ？',
    choices: ['65', '66', '67', '68'],
    correctAnswer: '67'
  },
  {
    id: 'M2-01-Q25',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '62 ＋ 21 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-01-Q26',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '14 ＋ 23 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-01-Q27',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '25 ＋ 31 ＝ ？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '56'
  },
  {
    id: 'M2-01-Q28',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '36 ＋ 42 ＝ ？',
    choices: ['76', '77', '78', '79'],
    correctAnswer: '78'
  },
  {
    id: 'M2-01-Q29',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '47 ＋ 21 ＝ ？',
    choices: ['66', '67', '68', '69'],
    correctAnswer: '68'
  },
  {
    id: 'M2-01-Q30',
    unitId: 'M2-01',
    step: 2,
    type: 'choice',
    question: '50 ＋ 38 ＝ ？',
    choices: ['86', '87', '88', '89'],
    correctAnswer: '88'
  },

  // =====================================================
  // Step3: □を つかった もんだい
  // =====================================================
  {
    id: 'M2-01-Q31',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 4 ＝ 27\n□は いくつ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-01-Q32',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '35 ＋ □ ＝ 37\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M2-01-Q33',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 12 ＝ 46\n□は いくつ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-01-Q34',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '54 ＋ □ ＝ 77\n□は いくつ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-01-Q35',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 21 ＝ 86\n□は いくつ？',
    choices: ['63', '64', '65', '66'],
    correctAnswer: '65'
  },
  {
    id: 'M2-01-Q36',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 34 ＝ 57\n□は いくつ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-01-Q37',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '11 ＋ □ ＝ 36\n□は いくつ？',
    choices: ['23', '24', '25', '26'],
    correctAnswer: '25'
  },
  {
    id: 'M2-01-Q38',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 32 ＝ 73\n□は いくつ？',
    choices: ['39', '40', '41', '42'],
    correctAnswer: '41'
  },
  {
    id: 'M2-01-Q39',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '53 ＋ □ ＝ 67\n□は いくつ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14'
  },
  {
    id: 'M2-01-Q40',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 21 ＝ 83\n□は いくつ？',
    choices: ['60', '61', '62', '63'],
    correctAnswer: '62'
  },
  {
    id: 'M2-01-Q41',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 3 ＝ 47\n□は いくつ？',
    choices: ['42', '43', '44', '45'],
    correctAnswer: '44'
  },
  {
    id: 'M2-01-Q42',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '84 ＋ □ ＝ 86\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M2-01-Q43',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 3 ＝ 76\n□は いくつ？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73'
  },
  {
    id: 'M2-01-Q44',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '81 ＋ □ ＝ 87\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M2-01-Q45',
    unitId: 'M2-01',
    step: 3,
    type: 'choice',
    question: '□ ＋ 7 ＝ 97\n□は いくつ？',
    choices: ['88', '89', '90', '91'],
    correctAnswer: '90'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
