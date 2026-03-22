/**
 * M2-03.js - Grimoire Guardians 問題データ
 * ユニット: M2-03「2けたの ひきざん（くりさがりなし）」
 *
 * 対象: 小学2年生、2桁の筆算ひきざん（くりさがりなし）
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: 2けた－1けた（くりさがりなし）（プール15問 → 5問出題）
 *   Step2: 2けた－2けた（くりさがりなし）（プール15問 → 5問出題）
 *   Step3: 文章題（くりさがりなし）       （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 2けた－1けた（くりさがりなし）
  // =====================================================
  {
    id: 'M2-03-Q01',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 27,
    operand2: 4,
    correctAnswer: '23',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q02',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 39,
    operand2: 2,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q03',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 48,
    operand2: 5,
    correctAnswer: '43',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q04',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 56,
    operand2: 3,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q05',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 67,
    operand2: 4,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q06',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 75,
    operand2: 2,
    correctAnswer: '73',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q07',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 89,
    operand2: 6,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q08',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 98,
    operand2: 5,
    correctAnswer: '93',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q09',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 29,
    operand2: 6,
    correctAnswer: '23',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q10',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 48,
    operand2: 3,
    correctAnswer: '45',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q11',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 57,
    operand2: 4,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q12',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 69,
    operand2: 7,
    correctAnswer: '62',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q13',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 74,
    operand2: 3,
    correctAnswer: '71',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q14',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 86,
    operand2: 4,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q15',
    unitId: 'M2-03',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 97,
    operand2: 6,
    correctAnswer: '91',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step2: 2けた－2けた（くりさがりなし）
  // =====================================================
  {
    id: 'M2-03-Q16',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 37,
    operand2: 14,
    correctAnswer: '23',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q17',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 56,
    operand2: 32,
    correctAnswer: '24',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q18',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 79,
    operand2: 43,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q19',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 85,
    operand2: 52,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q20',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 96,
    operand2: 73,
    correctAnswer: '23',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q21',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 47,
    operand2: 21,
    correctAnswer: '26',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q22',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 68,
    operand2: 34,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q23',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 89,
    operand2: 56,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q24',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 75,
    operand2: 31,
    correctAnswer: '44',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q25',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 98,
    operand2: 64,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q26',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 54,
    operand2: 21,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q27',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 67,
    operand2: 45,
    correctAnswer: '22',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q28',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 83,
    operand2: 51,
    correctAnswer: '32',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q29',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 76,
    operand2: 23,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03-Q30',
    unitId: 'M2-03',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 95,
    operand2: 42,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step3: 文章題（くりさがりなし）
  // =====================================================
  {
    id: 'M2-03-Q31',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'りんごが 27こ あります。4こ たべました。\nのこりは なんこ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q32',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 39ほん あります。2ほん つかいました。\nのこりは なんぼん？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-03-Q33',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'こどもが 48にん います。5にん かえりました。\nのこりは なんにん？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-03-Q34',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'シールが 37まい あります。14まい つかいました。\nのこりは なんまい？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q35',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'おはじきが 85こ あります。52こ あげました。\nのこりは なんこ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q36',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'はなが 56ほん あります。32ほん つみました。\nのこりは なんぼん？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '24'
  },
  {
    id: 'M2-03-Q37',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'ふうせんが 75こ あります。31こ とびました。\nのこりは なんこ？',
    choices: ['42', '43', '44', '45'],
    correctAnswer: '44'
  },
  {
    id: 'M2-03-Q38',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 96こ あります。73こ あげました。\nのこりは なんこ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q39',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'カードが 68まい あります。34まい くばりました。\nのこりは なんまい？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-03-Q40',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'おかしが 79こ あります。43こ たべました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-03-Q41',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'ほんが 89さつ あります。56さつ よみました。\nのこりは なんさつ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q42',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'たまごが 98こ あります。64こ りょうりに つかいました。\nのこりは なんこ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-03-Q43',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'いすが 83きゃく あります。51きゃく つかいました。\nのこりは なんきゃく？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '32'
  },
  {
    id: 'M2-03-Q44',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'はさみが 76ほん あります。23ほん かしました。\nのこりは なんぼん？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-03-Q45',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'くれよんが 95ほん あります。42ほん つかいました。\nのこりは なんぼん？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  }
  // =====================================================
  // Step4: こたえを まるごと かく（full-answer）
  // Step1+2と同じ数式を hitsuzanMode:full-answer で出題
  // =====================================================
  {
    id: 'M2-03-FA01',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 27,
    operand2: 4,
    correctAnswer: '23',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA02',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 39,
    operand2: 2,
    correctAnswer: '37',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA03',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 48,
    operand2: 5,
    correctAnswer: '43',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA04',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 56,
    operand2: 3,
    correctAnswer: '53',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA05',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 67,
    operand2: 4,
    correctAnswer: '63',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA06',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 75,
    operand2: 2,
    correctAnswer: '73',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA07',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 89,
    operand2: 6,
    correctAnswer: '83',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA08',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 98,
    operand2: 5,
    correctAnswer: '93',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA09',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 29,
    operand2: 6,
    correctAnswer: '23',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA10',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 48,
    operand2: 3,
    correctAnswer: '45',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA11',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 57,
    operand2: 4,
    correctAnswer: '53',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA12',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 69,
    operand2: 7,
    correctAnswer: '62',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA13',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 74,
    operand2: 3,
    correctAnswer: '71',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA14',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 86,
    operand2: 4,
    correctAnswer: '82',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA15',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 97,
    operand2: 6,
    correctAnswer: '91',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA16',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 37,
    operand2: 14,
    correctAnswer: '23',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA17',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 56,
    operand2: 32,
    correctAnswer: '24',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA18',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 79,
    operand2: 43,
    correctAnswer: '36',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA19',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 85,
    operand2: 52,
    correctAnswer: '33',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA20',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 96,
    operand2: 73,
    correctAnswer: '23',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA21',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 47,
    operand2: 21,
    correctAnswer: '26',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA22',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 68,
    operand2: 34,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA23',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 89,
    operand2: 56,
    correctAnswer: '33',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA24',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 75,
    operand2: 31,
    correctAnswer: '44',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA25',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 98,
    operand2: 64,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA26',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 54,
    operand2: 21,
    correctAnswer: '33',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA27',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 67,
    operand2: 45,
    correctAnswer: '22',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA28',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 83,
    operand2: 51,
    correctAnswer: '32',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA29',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 76,
    operand2: 23,
    correctAnswer: '53',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M2-03-FA30',
    unitId: 'M2-03',
    step: 4,
    type: 'hitsuzan',
    operator: '-',
    operand1: 95,
    operand2: 42,
    correctAnswer: '53',
    hitsuzanMode: 'full-answer'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
