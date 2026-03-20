/**
 * M2-13b.js - Grimoire Guardians 問題データ
 * ユニット: M2-13b「3けたの ひきざん」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 繰り下がりなし ──
  {
    id: 'M2-13b-Q01',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '500 - 200 = ？',
    choices: ['200', '300', '400', '700'],
    correctAnswer: '300'
  },
  {
    id: 'M2-13b-Q02',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '789 - 456 = ？',
    choices: ['323', '333', '343', '353'],
    correctAnswer: '333'
  },
  {
    id: 'M2-13b-Q03',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '697 - 243 = ？',
    choices: ['444', '454', '464', '474'],
    correctAnswer: '454'
  },
  {
    id: 'M2-13b-Q04',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '865 - 312 = ？',
    choices: ['543', '553', '563', '573'],
    correctAnswer: '553'
  },
  {
    id: 'M2-13b-Q05',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '750 - 250 = ？',
    choices: ['400', '500', '600', '1000'],
    correctAnswer: '500'
  },
  {
    id: 'M2-13b-Q06',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '978 - 534 = ？',
    choices: ['424', '434', '444', '454'],
    correctAnswer: '444'
  },
  {
    id: 'M2-13b-Q07',
    unitId: 'M2-13b',
    step: 1,
    type: 'text',
    question: '846 - 523 = ？',
    choices: ['313', '323', '333', '343'],
    correctAnswer: '323'
  },

  // ── Step 2: 繰り下がり1回 ──
  {
    id: 'M2-13b-Q08',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '523 - 148 = ？',
    choices: ['365', '375', '385', '395'],
    correctAnswer: '375'
  },
  {
    id: 'M2-13b-Q09',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '764 - 237 = ？',
    choices: ['517', '527', '537', '547'],
    correctAnswer: '527'
  },
  {
    id: 'M2-13b-Q10',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '831 - 274 = ？',
    choices: ['547', '557', '567', '577'],
    correctAnswer: '557'
  },
  {
    id: 'M2-13b-Q11',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '645 - 382 = ？',
    choices: ['253', '263', '273', '283'],
    correctAnswer: '263'
  },
  {
    id: 'M2-13b-Q12',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '492 - 165 = ？',
    choices: ['317', '327', '337', '347'],
    correctAnswer: '327'
  },
  {
    id: 'M2-13b-Q13',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '723 - 456 = ？',
    choices: ['257', '267', '277', '287'],
    correctAnswer: '267'
  },
  {
    id: 'M2-13b-Q14',
    unitId: 'M2-13b',
    step: 2,
    type: 'text',
    question: '514 - 279 = ？',
    choices: ['225', '235', '245', '255'],
    correctAnswer: '235'
  },

  // ── Step 3: 繰り下がり2回以上 ──
  {
    id: 'M2-13b-Q15',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '803 - 456 = ？',
    choices: ['337', '347', '357', '367'],
    correctAnswer: '347'
  },
  {
    id: 'M2-13b-Q16',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '700 - 384 = ？',
    choices: ['306', '316', '326', '336'],
    correctAnswer: '316'
  },
  {
    id: 'M2-13b-Q17',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '900 - 267 = ？',
    choices: ['623', '633', '643', '653'],
    correctAnswer: '633'
  },
  {
    id: 'M2-13b-Q18',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '601 - 378 = ？',
    choices: ['213', '223', '233', '243'],
    correctAnswer: '223'
  },
  {
    id: 'M2-13b-Q19',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '852 - 487 = ？',
    choices: ['355', '365', '375', '385'],
    correctAnswer: '365'
  },
  {
    id: 'M2-13b-Q20',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '735 - 569 = ？',
    choices: ['156', '166', '176', '186'],
    correctAnswer: '166'
  },
  {
    id: 'M2-13b-Q21',
    unitId: 'M2-13b',
    step: 3,
    type: 'text',
    question: '1000 - 456 = ？',
    choices: ['534', '544', '554', '564'],
    correctAnswer: '544'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
