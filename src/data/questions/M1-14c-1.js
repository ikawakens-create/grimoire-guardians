/**
 * M1-14c-1.js - Grimoire Guardians 問題データ
 * ユニット: M1-14c-1「2桁のたしざん①」（ひっ算 B+C モード）
 *
 * 対象: 小学1年生、2桁+1桁のたしざん（繰り上がりなし）
 * モード: digit-by-digit（一の位 → 十の位の順に答える）
 *
 * Step構成
 *   Step1: 一の位が 1〜4（プール6問 → 4問出題）
 *   Step2: 一の位が 5〜9（プール6問 → 4問出題）
 *   Step3: まじりあい（プール7問 → 7問出題）
 *
 * @version 1.0
 * @date 2026-03-22
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 一の位が小さい（合計一の位が 1〜4）
  // =====================================================
  {
    id: 'M1-14c-1-Q01',
    unitId: 'M1-14c-1',
    step: 1,
    type: 'choice',
    question: '21 ＋ 3 ＝ ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '24'
  },
  {
    id: 'M1-14c-1-Q02',
    unitId: 'M1-14c-1',
    step: 1,
    type: 'choice',
    question: '32 ＋ 2 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '34'
  },
  {
    id: 'M1-14c-1-Q03',
    unitId: 'M1-14c-1',
    step: 1,
    type: 'choice',
    question: '43 ＋ 1 ＝ ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '44'
  },
  {
    id: 'M1-14c-1-Q04',
    unitId: 'M1-14c-1',
    step: 1,
    type: 'choice',
    question: '51 ＋ 3 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '54'
  },
  {
    id: 'M1-14c-1-Q05',
    unitId: 'M1-14c-1',
    step: 1,
    type: 'choice',
    question: '62 ＋ 2 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '64'
  },
  {
    id: 'M1-14c-1-Q06',
    unitId: 'M1-14c-1',
    step: 1,
    type: 'choice',
    question: '33 ＋ 1 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '34'
  },

  // =====================================================
  // Step2: 一の位が大きい（合計一の位が 5〜9、繰り上がりなし）
  // =====================================================
  {
    id: 'M1-14c-1-Q07',
    unitId: 'M1-14c-1',
    step: 2,
    type: 'choice',
    question: '21 ＋ 5 ＝ ？',
    choices: ['23', '24', '25', '26'],
    correctAnswer: '26'
  },
  {
    id: 'M1-14c-1-Q08',
    unitId: 'M1-14c-1',
    step: 2,
    type: 'choice',
    question: '32 ＋ 5 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '37'
  },
  {
    id: 'M1-14c-1-Q09',
    unitId: 'M1-14c-1',
    step: 2,
    type: 'choice',
    question: '41 ＋ 7 ＝ ？',
    choices: ['45', '46', '47', '48'],
    correctAnswer: '48'
  },
  {
    id: 'M1-14c-1-Q10',
    unitId: 'M1-14c-1',
    step: 2,
    type: 'choice',
    question: '50 ＋ 9 ＝ ？',
    choices: ['56', '57', '58', '59'],
    correctAnswer: '59'
  },
  {
    id: 'M1-14c-1-Q11',
    unitId: 'M1-14c-1',
    step: 2,
    type: 'choice',
    question: '23 ＋ 6 ＝ ？',
    choices: ['26', '27', '28', '29'],
    correctAnswer: '29'
  },
  {
    id: 'M1-14c-1-Q12',
    unitId: 'M1-14c-1',
    step: 2,
    type: 'choice',
    question: '60 ＋ 8 ＝ ？',
    choices: ['65', '66', '67', '68'],
    correctAnswer: '68'
  },

  // =====================================================
  // Step3: まじりあい（いろいろな2桁+1桁）
  // =====================================================
  {
    id: 'M1-14c-1-Q13',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '24 ＋ 3 ＝ ？',
    choices: ['24', '25', '26', '27'],
    correctAnswer: '27'
  },
  {
    id: 'M1-14c-1-Q14',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '35 ＋ 4 ＝ ？',
    choices: ['36', '37', '38', '39'],
    correctAnswer: '39'
  },
  {
    id: 'M1-14c-1-Q15',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '42 ＋ 6 ＝ ？',
    choices: ['45', '46', '47', '48'],
    correctAnswer: '48'
  },
  {
    id: 'M1-14c-1-Q16',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '71 ＋ 5 ＝ ？',
    choices: ['73', '74', '75', '76'],
    correctAnswer: '76'
  },
  {
    id: 'M1-14c-1-Q17',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '53 ＋ 4 ＝ ？',
    choices: ['54', '55', '56', '57'],
    correctAnswer: '57'
  },
  {
    id: 'M1-14c-1-Q18',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '80 ＋ 7 ＝ ？',
    choices: ['84', '85', '86', '87'],
    correctAnswer: '87'
  },
  {
    id: 'M1-14c-1-Q19',
    unitId: 'M1-14c-1',
    step: 3,
    type: 'choice',
    question: '61 ＋ 8 ＝ ？',
    choices: ['66', '67', '68', '69'],
    correctAnswer: '69'
  }
];

/** @type {{step: number, pick: number}[]} */
const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 4 },
  { step: 3, pick: 7 }
];

export { questions, stepConfig };
export default questions;
