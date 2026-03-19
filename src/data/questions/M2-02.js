/**
 * M2-02.js - Grimoire Guardians 問題データ
 * ユニット: M2-02「くりあがりの たしざん」
 *
 * 対象: 小学2年生、2桁の筆算たしざん（くりあがりあり）
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: 2けた＋1けた（くりあがりあり）（プール15問 → 5問出題）
 *   Step2: 2けた＋2けた（くりあがりあり）（プール15問 → 5問出題）
 *   Step3: □を つかった もんだい     （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 2けた＋1けた（くりあがりあり）
  // =====================================================
  {
    id: 'M2-02-Q01',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '17 ＋ 4 ＝ ？',
    choices: ['20', '21', '22', '23'],
    correctAnswer: '21'
  },
  {
    id: 'M2-02-Q02',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '28 ＋ 5 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-02-Q03',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '36 ＋ 7 ＝ ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-02-Q04',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '45 ＋ 8 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-02-Q05',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '57 ＋ 6 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02-Q06',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '63 ＋ 9 ＝ ？',
    choices: ['70', '71', '72', '73'],
    correctAnswer: '72'
  },
  {
    id: 'M2-02-Q07',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '74 ＋ 8 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '82'
  },
  {
    id: 'M2-02-Q08',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '86 ＋ 7 ＝ ？',
    choices: ['91', '92', '93', '94'],
    correctAnswer: '93'
  },
  {
    id: 'M2-02-Q09',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '19 ＋ 3 ＝ ？',
    choices: ['20', '21', '22', '23'],
    correctAnswer: '22'
  },
  {
    id: 'M2-02-Q10',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '25 ＋ 9 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-02-Q11',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '38 ＋ 4 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '42'
  },
  {
    id: 'M2-02-Q12',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '47 ＋ 6 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-02-Q13',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '56 ＋ 8 ＝ ？',
    choices: ['62', '63', '64', '65'],
    correctAnswer: '64'
  },
  {
    id: 'M2-02-Q14',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '69 ＋ 7 ＝ ？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '76'
  },
  {
    id: 'M2-02-Q15',
    unitId: 'M2-02',
    step: 1,
    type: 'choice',
    question: '77 ＋ 5 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '82'
  },

  // =====================================================
  // Step2: 2けた＋2けた（くりあがりあり）
  // =====================================================
  {
    id: 'M2-02-Q16',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '14 ＋ 19 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-02-Q17',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '25 ＋ 17 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '42'
  },
  {
    id: 'M2-02-Q18',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '36 ＋ 28 ＝ ？',
    choices: ['62', '63', '64', '65'],
    correctAnswer: '64'
  },
  {
    id: 'M2-02-Q19',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '47 ＋ 36 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02-Q20',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '58 ＋ 24 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '82'
  },
  {
    id: 'M2-02-Q21',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '19 ＋ 15 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-02-Q22',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '27 ＋ 36 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02-Q23',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '38 ＋ 45 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02-Q24',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '49 ＋ 14 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-02-Q25',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '53 ＋ 28 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '81'
  },
  {
    id: 'M2-02-Q26',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '16 ＋ 27 ＝ ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-02-Q27',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '29 ＋ 13 ＝ ？',
    choices: ['40', '41', '42', '43'],
    correctAnswer: '42'
  },
  {
    id: 'M2-02-Q28',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '37 ＋ 46 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02-Q29',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '48 ＋ 35 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-02-Q30',
    unitId: 'M2-02',
    step: 2,
    type: 'choice',
    question: '59 ＋ 23 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '82'
  },

  // =====================================================
  // Step3: □を つかった もんだい（くりあがりあり）
  // =====================================================
  {
    id: 'M2-02-Q31',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 4 ＝ 21\n□は いくつ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '17'
  },
  {
    id: 'M2-02-Q32',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '28 ＋ □ ＝ 33\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M2-02-Q33',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 7 ＝ 43\n□は いくつ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-02-Q34',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '45 ＋ □ ＝ 53\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M2-02-Q35',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 6 ＝ 63\n□は いくつ？',
    choices: ['55', '56', '57', '58'],
    correctAnswer: '57'
  },
  {
    id: 'M2-02-Q36',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 17 ＝ 42\n□は いくつ？',
    choices: ['23', '24', '25', '26'],
    correctAnswer: '25'
  },
  {
    id: 'M2-02-Q37',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '19 ＋ □ ＝ 34\n□は いくつ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '15'
  },
  {
    id: 'M2-02-Q38',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 28 ＝ 64\n□は いくつ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-02-Q39',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '47 ＋ □ ＝ 83\n□は いくつ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-02-Q40',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 36 ＝ 63\n□は いくつ？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-02-Q41',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 9 ＝ 22\n□は いくつ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '13'
  },
  {
    id: 'M2-02-Q42',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '25 ＋ □ ＝ 34\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M2-02-Q43',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 35 ＝ 83\n□は いくつ？',
    choices: ['46', '47', '48', '49'],
    correctAnswer: '48'
  },
  {
    id: 'M2-02-Q44',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '29 ＋ □ ＝ 42\n□は いくつ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '13'
  },
  {
    id: 'M2-02-Q45',
    unitId: 'M2-02',
    step: 3,
    type: 'choice',
    question: '□ ＋ 27 ＝ 43\n□は いくつ？',
    choices: ['14', '15', '16', '17'],
    correctAnswer: '16'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
