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
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 13,
    correctAnswer: '38',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q02',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 37,
    operand2: 18,
    correctAnswer: '55',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q03',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 46,
    operand2: 23,
    correctAnswer: '69',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q04',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 58,
    operand2: 27,
    correctAnswer: '85',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q05',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 34,
    operand2: 19,
    correctAnswer: '53',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q06',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 32,
    correctAnswer: '79',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q07',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 56,
    operand2: 29,
    correctAnswer: '85',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q08',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 63,
    operand2: 14,
    correctAnswer: '77',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q09',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 29,
    operand2: 35,
    correctAnswer: '64',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q10',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 39,
    correctAnswer: '80',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q11',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 55,
    operand2: 28,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q12',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 62,
    operand2: 35,
    correctAnswer: '97',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q13',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 74,
    operand2: 16,
    correctAnswer: '90',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q14',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 48,
    operand2: 44,
    correctAnswer: '92',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q15',
    unitId: 'M2-04',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 38,
    correctAnswer: '91',
    hitsuzanMode: 'digit-by-digit'
  },

  // =====================================================
  // Step2: ひきざん混合（くりさがりあり・なし）
  // =====================================================
  {
    id: 'M2-04-Q16',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 57,
    operand2: 23,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q17',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 64,
    operand2: 28,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q18',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 72,
    operand2: 41,
    correctAnswer: '31',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q19',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 83,
    operand2: 47,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q20',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 91,
    operand2: 55,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q21',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 45,
    operand2: 12,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q22',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 56,
    operand2: 29,
    correctAnswer: '27',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q23',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 67,
    operand2: 34,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q24',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 78,
    operand2: 45,
    correctAnswer: '33',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q25',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 89,
    operand2: 53,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q26',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 93,
    operand2: 48,
    correctAnswer: '45',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q27',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 74,
    operand2: 37,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q28',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 61,
    operand2: 24,
    correctAnswer: '37',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q29',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 85,
    operand2: 39,
    correctAnswer: '46',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-04-Q30',
    unitId: 'M2-04',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 92,
    operand2: 56,
    correctAnswer: '36',
    hitsuzanMode: 'digit-by-digit'
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
