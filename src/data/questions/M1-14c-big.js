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
    type: 'hitsuzan',
    operator: '+',
    operand1: 21,
    operand2: 13,
    correctAnswer: '34',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q02',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 32,
    operand2: 15,
    correctAnswer: '47',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q03',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 23,
    correctAnswer: '64',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q04',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 24,
    correctAnswer: '77',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q05',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 30,
    operand2: 46,
    correctAnswer: '76',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q06',
    unitId: 'M1-14c-big',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 33,
    correctAnswer: '58',
    hitsuzanMode: 'digit-by-digit'
  },

  // Step2: 繰り上がりあり
  {
    id: 'M1-14c-big-Q07',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 18,
    correctAnswer: '41',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q08',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 36,
    operand2: 27,
    correctAnswer: '63',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q09',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 45,
    operand2: 37,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q10',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 57,
    operand2: 25,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q11',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 48,
    operand2: 34,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q12',
    unitId: 'M1-14c-big',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 64,
    operand2: 18,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },

  // Step3: まじりあい
  {
    id: 'M1-14c-big-Q13',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 34,
    operand2: 52,
    correctAnswer: '86',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q14',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 47,
    operand2: 36,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q15',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 25,
    operand2: 41,
    correctAnswer: '66',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q16',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 29,
    correctAnswer: '82',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q17',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 68,
    operand2: 15,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q18',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 37,
    operand2: 46,
    correctAnswer: '83',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M1-14c-big-Q19',
    unitId: 'M1-14c-big',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 72,
    operand2: 19,
    correctAnswer: '91',
    hitsuzanMode: 'digit-by-digit'
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
