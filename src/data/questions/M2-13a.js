/**
 * M2-13a.js - Grimoire Guardians 問題データ
 * ユニット: M2-13a「3けたの たしざん」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 繰り上がりなし ──
  {
    id: 'M2-13a-Q01',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 100,
    operand2: 200,
    correctAnswer: '300',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q02',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 123,
    operand2: 456,
    correctAnswer: '579',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q03',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 312,
    operand2: 241,
    correctAnswer: '553',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q04',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 415,
    operand2: 203,
    correctAnswer: '618',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q05',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 200,
    operand2: 350,
    correctAnswer: '550',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q06',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 532,
    operand2: 145,
    correctAnswer: '677',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q07',
    unitId: 'M2-13a',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 400,
    operand2: 100,
    correctAnswer: '500',
    hitsuzanMode: 'digit-by-digit'
  },

  // ── Step 2: 繰り上がり1回 ──
  {
    id: 'M2-13a-Q08',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 145,
    operand2: 238,
    correctAnswer: '383',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q09',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 263,
    operand2: 174,
    correctAnswer: '437',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q10',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 176,
    operand2: 214,
    correctAnswer: '390',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q11',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 358,
    operand2: 124,
    correctAnswer: '482',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q12',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 247,
    operand2: 316,
    correctAnswer: '563',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q13',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 435,
    operand2: 248,
    correctAnswer: '683',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q14',
    unitId: 'M2-13a',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 162,
    operand2: 379,
    correctAnswer: '541',
    hitsuzanMode: 'digit-by-digit'
  },

  // ── Step 3: 繰り上がり2回以上 ──
  {
    id: 'M2-13a-Q15',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 456,
    operand2: 387,
    correctAnswer: '843',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q16',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 275,
    operand2: 468,
    correctAnswer: '743',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q17',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 289,
    operand2: 456,
    correctAnswer: '745',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q18',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 594,
    operand2: 267,
    correctAnswer: '861',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q19',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 678,
    operand2: 245,
    correctAnswer: '923',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q20',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 576,
    operand2: 389,
    correctAnswer: '965',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13a-Q21',
    unitId: 'M2-13a',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 467,
    operand2: 375,
    correctAnswer: '842',
    hitsuzanMode: 'digit-by-digit'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
