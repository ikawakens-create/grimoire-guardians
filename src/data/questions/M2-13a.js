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
    type: 'text',
    question: '100 + 200 = ？',
    choices: ['200', '300', '400', '500'],
    correctAnswer: '300'
  },
  {
    id: 'M2-13a-Q02',
    unitId: 'M2-13a',
    step: 1,
    type: 'text',
    question: '123 + 456 = ？',
    choices: ['569', '579', '589', '679'],
    correctAnswer: '579'
  },
  {
    id: 'M2-13a-Q03',
    unitId: 'M2-13a',
    step: 1,
    type: 'text',
    question: '312 + 241 = ？',
    choices: ['453', '543', '553', '563'],
    correctAnswer: '553'
  },
  {
    id: 'M2-13a-Q04',
    unitId: 'M2-13a',
    step: 1,
    type: 'text',
    question: '415 + 203 = ？',
    choices: ['608', '618', '625', '628'],
    correctAnswer: '618'
  },
  {
    id: 'M2-13a-Q05',
    unitId: 'M2-13a',
    step: 1,
    type: 'text',
    question: '200 + 350 = ？',
    choices: ['450', '500', '550', '600'],
    correctAnswer: '550'
  },
  {
    id: 'M2-13a-Q06',
    unitId: 'M2-13a',
    step: 1,
    type: 'text',
    question: '532 + 145 = ？',
    choices: ['667', '677', '687', '697'],
    correctAnswer: '677'
  },
  {
    id: 'M2-13a-Q07',
    unitId: 'M2-13a',
    step: 1,
    type: 'text',
    question: '400 + 100 = ？',
    choices: ['400', '500', '600', '700'],
    correctAnswer: '500'
  },

  // ── Step 2: 繰り上がり1回 ──
  {
    id: 'M2-13a-Q08',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '145 + 238 = ？',
    choices: ['373', '383', '393', '403'],
    correctAnswer: '383'
  },
  {
    id: 'M2-13a-Q09',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '263 + 174 = ？',
    choices: ['427', '437', '443', '447'],
    correctAnswer: '437'
  },
  {
    id: 'M2-13a-Q10',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '176 + 214 = ？',
    choices: ['380', '390', '400', '410'],
    correctAnswer: '390'
  },
  {
    id: 'M2-13a-Q11',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '358 + 124 = ？',
    choices: ['472', '482', '492', '502'],
    correctAnswer: '482'
  },
  {
    id: 'M2-13a-Q12',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '247 + 316 = ？',
    choices: ['553', '563', '573', '583'],
    correctAnswer: '563'
  },
  {
    id: 'M2-13a-Q13',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '435 + 248 = ？',
    choices: ['673', '683', '693', '703'],
    correctAnswer: '683'
  },
  {
    id: 'M2-13a-Q14',
    unitId: 'M2-13a',
    step: 2,
    type: 'text',
    question: '162 + 379 = ？',
    choices: ['531', '541', '551', '561'],
    correctAnswer: '541'
  },

  // ── Step 3: 繰り上がり2回以上 ──
  {
    id: 'M2-13a-Q15',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '456 + 387 = ？',
    choices: ['833', '843', '853', '863'],
    correctAnswer: '843'
  },
  {
    id: 'M2-13a-Q16',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '275 + 468 = ？',
    choices: ['733', '743', '753', '763'],
    correctAnswer: '743'
  },
  {
    id: 'M2-13a-Q17',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '289 + 456 = ？',
    choices: ['635', '645', '745', '755'],
    correctAnswer: '745'
  },
  {
    id: 'M2-13a-Q18',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '594 + 267 = ？',
    choices: ['851', '861', '871', '881'],
    correctAnswer: '861'
  },
  {
    id: 'M2-13a-Q19',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '678 + 245 = ？',
    choices: ['903', '913', '923', '933'],
    correctAnswer: '923'
  },
  {
    id: 'M2-13a-Q20',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '576 + 389 = ？',
    choices: ['945', '955', '965', '975'],
    correctAnswer: '965'
  },
  {
    id: 'M2-13a-Q21',
    unitId: 'M2-13a',
    step: 3,
    type: 'text',
    question: '467 + 375 = ？',
    choices: ['822', '832', '842', '852'],
    correctAnswer: '842'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
