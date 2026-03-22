/**
 * M1-14c-big.js - Grimoire Guardians 問題データ
 * ユニット: M1-14c-big「2桁＋2桁のたしざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 小学1年生〜2年生、2桁+2桁のたしざん
 * モード: digit-by-digit のみ（暗算では難しいため A モードなし）
 *
 * Step構成
 *   Step1: 繰り上がりなし（プール6問 → 5問）
 *   Step2: 繰り上がりあり（プール6問 → 5問）
 *   Step3: まじりあい（プール7問 → 5問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

/** @type {Array} */
const questions = [

  // Step1: 繰り上がりなし
  {
    id: 'M1-14c-big-Q01',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'choice',
    question: '21 ＋ 13 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '34'
  },
  {
    id: 'M1-14c-big-Q02',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'choice',
    question: '32 ＋ 15 ＝ ？',
    choices: ['44', '45', '46', '47'],
    correctAnswer: '47'
  },
  {
    id: 'M1-14c-big-Q03',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'choice',
    question: '41 ＋ 23 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '64'
  },
  {
    id: 'M1-14c-big-Q04',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'choice',
    question: '53 ＋ 24 ＝ ？',
    choices: ['74', '75', '76', '77'],
    correctAnswer: '77'
  },
  {
    id: 'M1-14c-big-Q05',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'choice',
    question: '30 ＋ 46 ＝ ？',
    choices: ['73', '74', '75', '76'],
    correctAnswer: '76'
  },
  {
    id: 'M1-14c-big-Q06',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'choice',
    question: '25 ＋ 33 ＝ ？',
    choices: ['55', '56', '57', '58'],
    correctAnswer: '58'
  },

  // Step2: 繰り上がりあり
  {
    id: 'M1-14c-big-Q07',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'choice',
    question: '23 ＋ 18 ＝ ？',
    choices: ['38', '39', '40', '41'],
    correctAnswer: '41'
  },
  {
    id: 'M1-14c-big-Q08',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'choice',
    question: '36 ＋ 27 ＝ ？',
    choices: ['60', '61', '62', '63'],
    correctAnswer: '63'
  },
  {
    id: 'M1-14c-big-Q09',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'choice',
    question: '45 ＋ 37 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },
  {
    id: 'M1-14c-big-Q10',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'choice',
    question: '57 ＋ 25 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },
  {
    id: 'M1-14c-big-Q11',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'choice',
    question: '48 ＋ 34 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },
  {
    id: 'M1-14c-big-Q12',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'choice',
    question: '64 ＋ 18 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },

  // Step3: まじりあい
  {
    id: 'M1-14c-big-Q13',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '34 ＋ 52 ＝ ？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '86'
  },
  {
    id: 'M1-14c-big-Q14',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '47 ＋ 36 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '83'
  },
  {
    id: 'M1-14c-big-Q15',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '25 ＋ 41 ＝ ？',
    choices: ['63', '64', '65', '66'],
    correctAnswer: '66'
  },
  {
    id: 'M1-14c-big-Q16',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '53 ＋ 29 ＝ ？',
    choices: ['79', '80', '81', '82'],
    correctAnswer: '82'
  },
  {
    id: 'M1-14c-big-Q17',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '68 ＋ 15 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '83'
  },
  {
    id: 'M1-14c-big-Q18',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '37 ＋ 46 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '83'
  },
  {
    id: 'M1-14c-big-Q19',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'choice',
    question: '72 ＋ 19 ＝ ？',
    choices: ['88', '89', '90', '91'],
    correctAnswer: '91'
  }
];

/** @type {{step: number, pick: number}[]} */
const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
