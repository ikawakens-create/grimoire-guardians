/**
 * M1-14c-2.js - Grimoire Guardians 問題データ
 * ユニット: M1-14c-2「2桁のたしざん②」（ひっ算 A モード）
 *
 * 対象: 小学1年生、2桁+1桁のたしざん（繰り上がりなし）
 * モード: full-answer（答え全体を一発で選ぶ）
 *
 * Step構成
 *   Step1: 一の位が小さい（プール6問 → 4問）
 *   Step2: 一の位が大きい（プール6問 → 4問）
 *   Step3: まじりあい（プール7問 → 7問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

/** @type {Array} */
const questions = [

  // Step1
  {
    id: 'M1-14c-2-Q01',
    unitId: 'M1-14c-2',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 21,
    operand2: 3,
    correctAnswer: '24',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q02',
    unitId: 'M1-14c-2',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 32,
    operand2: 2,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q03',
    unitId: 'M1-14c-2',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 43,
    operand2: 1,
    correctAnswer: '44',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q04',
    unitId: 'M1-14c-2',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 51,
    operand2: 3,
    correctAnswer: '54',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q05',
    unitId: 'M1-14c-2',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 62,
    operand2: 2,
    correctAnswer: '64',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q06',
    unitId: 'M1-14c-2',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 33,
    operand2: 1,
    correctAnswer: '34',
    hitsuzanMode: 'full-answer'
  },

  // Step2
  {
    id: 'M1-14c-2-Q07',
    unitId: 'M1-14c-2',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 21,
    operand2: 5,
    correctAnswer: '26',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q08',
    unitId: 'M1-14c-2',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 32,
    operand2: 5,
    correctAnswer: '37',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q09',
    unitId: 'M1-14c-2',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 41,
    operand2: 7,
    correctAnswer: '48',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q10',
    unitId: 'M1-14c-2',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 50,
    operand2: 9,
    correctAnswer: '59',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q11',
    unitId: 'M1-14c-2',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 23,
    operand2: 6,
    correctAnswer: '29',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q12',
    unitId: 'M1-14c-2',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 60,
    operand2: 8,
    correctAnswer: '68',
    hitsuzanMode: 'full-answer'
  },

  // Step3
  {
    id: 'M1-14c-2-Q13',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 24,
    operand2: 3,
    correctAnswer: '27',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q14',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 35,
    operand2: 4,
    correctAnswer: '39',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q15',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 42,
    operand2: 6,
    correctAnswer: '48',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q16',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 71,
    operand2: 5,
    correctAnswer: '76',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q17',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 53,
    operand2: 4,
    correctAnswer: '57',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q18',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 80,
    operand2: 7,
    correctAnswer: '87',
    hitsuzanMode: 'full-answer'
  },
  {
    id: 'M1-14c-2-Q19',
    unitId: 'M1-14c-2',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 61,
    operand2: 8,
    correctAnswer: '69',
    hitsuzanMode: 'full-answer'
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
