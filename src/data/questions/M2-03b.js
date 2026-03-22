/**
 * M2-03b.js - Grimoire Guardians 問題データ
 * ユニット: M2-03b「くりさがりの ひきざん」
 *
 * 対象: 小学2年生、2桁の筆算ひきざん（くりさがりあり）
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: 2けた－1けた（くりさがりあり）（プール15問 → 5問出題）
 *   Step2: 2けた－2けた（くりさがりあり）（プール15問 → 5問出題）
 *   Step3: 文章題（くりさがりあり）       （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 2けた－1けた（くりさがりあり）
  // =====================================================
  {
    id: 'M2-03b-Q01',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 21,
    operand2: 4,
    correctAnswer: '17',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q02',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 32,
    operand2: 5,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q03',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 43,
    operand2: 7,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q04',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 54,
    operand2: 8,
    correctAnswer: '46',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q05',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 65,
    operand2: 9,
    correctAnswer: '56',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q06',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 73,
    operand2: 5,
    correctAnswer: '68',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q07',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 82,
    operand2: 4,
    correctAnswer: '78',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q08',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 91,
    operand2: 6,
    correctAnswer: '85',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q09',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 24,
    operand2: 7,
    correctAnswer: '17',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q10',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 35,
    operand2: 8,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q11',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 46,
    operand2: 9,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q12',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 53,
    operand2: 6,
    correctAnswer: '47',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q13',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 64,
    operand2: 7,
    correctAnswer: '57',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q14',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 72,
    operand2: 8,
    correctAnswer: '64',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q15',
    unitId: 'M2-03b',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 81,
    operand2: 3,
    correctAnswer: '78',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step2: 2けた－2けた（くりさがりあり）
  // =====================================================
  {
    id: 'M2-03b-Q16',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 31,
    operand2: 14,
    correctAnswer: '17',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q17',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 53,
    operand2: 27,
    correctAnswer: '26',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q18',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 62,
    operand2: 38,
    correctAnswer: '24',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q19',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 74,
    operand2: 45,
    correctAnswer: '29',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q20',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 85,
    operand2: 57,
    correctAnswer: '28',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q21',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 43,
    operand2: 16,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q22',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 51,
    operand2: 28,
    correctAnswer: '23',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q23',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 72,
    operand2: 39,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q24',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 83,
    operand2: 47,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q25',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 94,
    operand2: 58,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q26',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 46,
    operand2: 19,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q27',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 61,
    operand2: 34,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q28',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 75,
    operand2: 38,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q29',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 84,
    operand2: 46,
    correctAnswer: '38',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-03b-Q30',
    unitId: 'M2-03b',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 93,
    operand2: 57,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step3: 文章題（くりさがりあり）
  // =====================================================
  {
    id: 'M2-03b-Q31',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'あめが 21こ あります。4こ たべました。\nのこりは なんこ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '17'
  },
  {
    id: 'M2-03b-Q32',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 32ほん あります。5ほん つかいました。\nのこりは なんぼん？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-03b-Q33',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'こどもが 43にん います。7にん かえりました。\nのこりは なんにん？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-03b-Q34',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'りんごが 31こ あります。14こ くばりました。\nのこりは なんこ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '17'
  },
  {
    id: 'M2-03b-Q35',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'みかんが 53こ あります。27こ たべました。\nのこりは なんこ？',
    choices: ['24', '25', '26', '27'],
    correctAnswer: '26'
  },
  {
    id: 'M2-03b-Q36',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'カードが 62まい あります。38まい あげました。\nのこりは なんまい？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '24'
  },
  {
    id: 'M2-03b-Q37',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'ふうせんが 74こ あります。45こ とびました。\nのこりは なんこ？',
    choices: ['27', '28', '29', '30'],
    correctAnswer: '29'
  },
  {
    id: 'M2-03b-Q38',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'シールが 72まい あります。39まい つかいました。\nのこりは なんまい？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03b-Q39',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 83こ あります。47こ あげました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-03b-Q40',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'おはじきが 51こ あります。28こ かりました。\nのこりは なんこ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03b-Q41',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'ほんが 75さつ あります。38さつ よみました。\nのこりは なんさつ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-03b-Q42',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'たまごが 84こ あります。46こ りょうりに つかいました。\nのこりは なんこ？',
    choices: ['36', '37', '38', '39'],
    correctAnswer: '38'
  },
  {
    id: 'M2-03b-Q43',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'はなが 46ほん あります。19ほん かざりに つかいました。\nのこりは なんぼん？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-03b-Q44',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'くれよんが 61ほん あります。34ほん おれました。\nのこりは なんぼん？',
    choices: ['25', '26', '27', '28'],
    correctAnswer: '27'
  },
  {
    id: 'M2-03b-Q45',
    unitId: 'M2-03b',
    step: 3,
    type: 'choice',
    question: 'いちごが 93こ あります。57こ たべました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
