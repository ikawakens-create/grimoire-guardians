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
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 4,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q02',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 35,
    operand2: 2,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q03',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 6,
    correctAnswer: '47',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q04',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 52,
    operand2: 3,
    correctAnswer: '55',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q05',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 63,
    operand2: 4,
    correctAnswer: '67',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q06',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 71,
    operand2: 5,
    correctAnswer: '76',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q07',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 84,
    operand2: 2,
    correctAnswer: '86',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q08',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 92,
    operand2: 6,
    correctAnswer: '98',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q09',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 3,
    correctAnswer: '28',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q10',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 46,
    operand2: 2,
    correctAnswer: '48',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q11',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 57,
    operand2: 1,
    correctAnswer: '58',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q12',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 64,
    operand2: 5,
    correctAnswer: '69',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q13',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 73,
    operand2: 3,
    correctAnswer: '76',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q14',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 81,
    operand2: 6,
    correctAnswer: '87',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q15',
    unitId: 'M2-01',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 90,
    operand2: 7,
    correctAnswer: '97',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step2: 2けた＋2けた（くりあがりなし）
  // =====================================================
  {
    id: 'M2-01-Q16',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 21,
    operand2: 13,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q17',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 32,
    operand2: 14,
    correctAnswer: '46',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q18',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 43,
    operand2: 12,
    correctAnswer: '55',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q19',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 54,
    operand2: 23,
    correctAnswer: '77',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q20',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 65,
    operand2: 21,
    correctAnswer: '86',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q21',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 34,
    correctAnswer: '57',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q22',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 11,
    operand2: 25,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q23',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 32,
    correctAnswer: '73',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q24',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 14,
    correctAnswer: '67',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q25',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 62,
    operand2: 21,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q26',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 14,
    operand2: 23,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q27',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 31,
    correctAnswer: '56',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q28',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 42,
    correctAnswer: '78',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q29',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 21,
    correctAnswer: '68',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-01-Q30',
    unitId: 'M2-01',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 50,
    operand2: 38,
    correctAnswer: '88',
    hitsuzanMode: 'digit-by-digit'
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
  // =====================================================
  // Step4: こたえを まるごと かく（full-answer）
  // Step1+2と同じ数式を hitsuzanMode:full-answer で出題
  // =====================================================
  {
    id: 'M2-01-FA01',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 4,
    correctAnswer: '27',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA02',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 35,
    operand2: 2,
    correctAnswer: '37',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA03',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 6,
    correctAnswer: '47',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA04',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 52,
    operand2: 3,
    correctAnswer: '55',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA05',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 63,
    operand2: 4,
    correctAnswer: '67',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA06',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 71,
    operand2: 5,
    correctAnswer: '76',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA07',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 84,
    operand2: 2,
    correctAnswer: '86',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA08',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 92,
    operand2: 6,
    correctAnswer: '98',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA09',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 3,
    correctAnswer: '28',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA10',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 46,
    operand2: 2,
    correctAnswer: '48',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA11',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 57,
    operand2: 1,
    correctAnswer: '58',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA12',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 64,
    operand2: 5,
    correctAnswer: '69',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA13',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 73,
    operand2: 3,
    correctAnswer: '76',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA14',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 81,
    operand2: 6,
    correctAnswer: '87',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA15',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 90,
    operand2: 7,
    correctAnswer: '97',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA16',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 21,
    operand2: 13,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA17',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 32,
    operand2: 14,
    correctAnswer: '46',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA18',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 43,
    operand2: 12,
    correctAnswer: '55',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA19',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 54,
    operand2: 23,
    correctAnswer: '77',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA20',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 65,
    operand2: 21,
    correctAnswer: '86',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA21',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 34,
    correctAnswer: '57',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA22',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 11,
    operand2: 25,
    correctAnswer: '36',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA23',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 32,
    correctAnswer: '73',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA24',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 14,
    correctAnswer: '67',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA25',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 62,
    operand2: 21,
    correctAnswer: '83',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA26',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 14,
    operand2: 23,
    correctAnswer: '37',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA27',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 31,
    correctAnswer: '56',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA28',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 42,
    correctAnswer: '78',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA29',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 21,
    correctAnswer: '68',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-01-FA30',
    unitId: 'M2-01',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 50,
    operand2: 38,
    correctAnswer: '88',
    hitsuzanMode: 'full-answer'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
