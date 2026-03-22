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
    type: 'hitsuzan',
    operator: '+',
    operand1: 17,
    operand2: 4,
    correctAnswer: '21',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q02',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 28,
    operand2: 5,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q03',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 7,
    correctAnswer: '43',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q04',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 45,
    operand2: 8,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q05',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 57,
    operand2: 6,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q06',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 63,
    operand2: 9,
    correctAnswer: '72',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q07',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 74,
    operand2: 8,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q08',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 86,
    operand2: 7,
    correctAnswer: '93',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q09',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 19,
    operand2: 3,
    correctAnswer: '22',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q10',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 9,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q11',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 38,
    operand2: 4,
    correctAnswer: '42',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q12',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 6,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q13',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 56,
    operand2: 8,
    correctAnswer: '64',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q14',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 69,
    operand2: 7,
    correctAnswer: '76',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q15',
    unitId: 'M2-02',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 77,
    operand2: 5,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step2: 2けた＋2けた（くりあがりあり）
  // =====================================================
  {
    id: 'M2-02-Q16',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 14,
    operand2: 19,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q17',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 17,
    correctAnswer: '42',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q18',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 28,
    correctAnswer: '64',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q19',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 36,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q20',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 58,
    operand2: 24,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q21',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 19,
    operand2: 15,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q22',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 27,
    operand2: 36,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q23',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 38,
    operand2: 45,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q24',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 49,
    operand2: 14,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q25',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 28,
    correctAnswer: '81',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q26',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 16,
    operand2: 27,
    correctAnswer: '43',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q27',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 29,
    operand2: 13,
    correctAnswer: '42',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q28',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 37,
    operand2: 46,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q29',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 48,
    operand2: 35,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-02-Q30',
    unitId: 'M2-02',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 59,
    operand2: 23,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
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
  },
  // =====================================================
  // Step4: こたえを まるごと かく（full-answer）
  // Step1+2と同じ数式を hitsuzanMode:full-answer で出題
  // =====================================================
  {
    id: 'M2-02-FA01',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 17,
    operand2: 4,
    correctAnswer: '21',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA02',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 28,
    operand2: 5,
    correctAnswer: '33',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA03',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 7,
    correctAnswer: '43',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA04',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 45,
    operand2: 8,
    correctAnswer: '53',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA05',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 57,
    operand2: 6,
    correctAnswer: '63',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA06',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 63,
    operand2: 9,
    correctAnswer: '72',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA07',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 74,
    operand2: 8,
    correctAnswer: '82',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA08',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 86,
    operand2: 7,
    correctAnswer: '93',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA09',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 19,
    operand2: 3,
    correctAnswer: '22',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA10',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 9,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA11',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 38,
    operand2: 4,
    correctAnswer: '42',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA12',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 6,
    correctAnswer: '53',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA13',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 56,
    operand2: 8,
    correctAnswer: '64',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA14',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 69,
    operand2: 7,
    correctAnswer: '76',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA15',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 77,
    operand2: 5,
    correctAnswer: '82',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA16',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 14,
    operand2: 19,
    correctAnswer: '33',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA17',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 17,
    correctAnswer: '42',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA18',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 28,
    correctAnswer: '64',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA19',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 36,
    correctAnswer: '83',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA20',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 58,
    operand2: 24,
    correctAnswer: '82',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA21',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 19,
    operand2: 15,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA22',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 27,
    operand2: 36,
    correctAnswer: '63',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA23',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 38,
    operand2: 45,
    correctAnswer: '83',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA24',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 49,
    operand2: 14,
    correctAnswer: '63',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA25',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 28,
    correctAnswer: '81',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA26',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 16,
    operand2: 27,
    correctAnswer: '43',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA27',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 29,
    operand2: 13,
    correctAnswer: '42',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA28',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 37,
    operand2: 46,
    correctAnswer: '83',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA29',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 48,
    operand2: 35,
    correctAnswer: '83',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-02-FA30',
    unitId: 'M2-02',
    step: 4,
    type: 'hitsuzan',
    operator: '+',
    operand1: 59,
    operand2: 23,
    correctAnswer: '82',
    hitsuzanMode: 'full-answer'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
