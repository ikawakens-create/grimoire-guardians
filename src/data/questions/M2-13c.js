/**
 * M2-13c.js - Grimoire Guardians 問題データ
 * ユニット: M2-13c「3けた ひっさん まとめ」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: たしざん・ひきざん 混合（易） ──
  {
    id: 'M2-13c-Q01',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 234,
    operand2: 521,
    correctAnswer: '755',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q02',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 876,
    operand2: 543,
    correctAnswer: '333',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q03',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 300,
    operand2: 400,
    correctAnswer: '700',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q04',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 600,
    operand2: 300,
    correctAnswer: '300',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q05',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 152,
    operand2: 437,
    correctAnswer: '589',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q06',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '-',
    operand1: 987,
    operand2: 654,
    correctAnswer: '333',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q07',
    unitId: 'M2-13c',
    step: 1,
    type: 'hitsuzan',
    operator: '+',
    operand1: 413,
    operand2: 286,
    correctAnswer: '699',
    hitsuzanMode: 'digit-by-digit'
  },

  // ── Step 2: 繰り上がり/繰り下がりあり 混合 ──
  {
    id: 'M2-13c-Q08',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 347,
    operand2: 285,
    correctAnswer: '632',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q09',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 731,
    operand2: 258,
    correctAnswer: '473',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q10',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 468,
    operand2: 375,
    correctAnswer: '843',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q11',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 824,
    operand2: 367,
    correctAnswer: '457',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q12',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 256,
    operand2: 489,
    correctAnswer: '745',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q13',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '-',
    operand1: 500,
    operand2: 238,
    correctAnswer: '262',
    hitsuzanMode: 'digit-by-digit'
  },
  {
    id: 'M2-13c-Q14',
    unitId: 'M2-13c',
    step: 2,
    type: 'hitsuzan',
    operator: '+',
    operand1: 374,
    operand2: 259,
    correctAnswer: '633',
    hitsuzanMode: 'digit-by-digit'
  },

  // ── Step 3: 文章題・発展 ──
  {
    id: 'M2-13c-Q15',
    unitId: 'M2-13c',
    step: 3,
    type: 'text',
    question: 'えんぴつが 238ほん あります。\n456ほん もらうと ぜんぶで なんほんですか？',
    choices: ['684ほん', '694ほん', '704ほん', '714ほん'],
    correctAnswer: '694ほん'
  },
  {
    id: 'M2-13c-Q16',
    unitId: 'M2-13c',
    step: 3,
    type: 'text',
    question: 'シールが 700まい あります。\n384まい つかうと のこりは なんまいですか？',
    choices: ['306まい', '316まい', '326まい', '336まい'],
    correctAnswer: '316まい'
  },
  {
    id: 'M2-13c-Q17',
    unitId: 'M2-13c',
    step: 3,
    type: 'text',
    question: '367 + □ = 800\n□に はいる かずは？',
    choices: ['423', '433', '443', '453'],
    correctAnswer: '433'
  },
  {
    id: 'M2-13c-Q18',
    unitId: 'M2-13c',
    step: 3,
    type: 'text',
    question: 'あか 456まい、あお 378まいの カードが あります。\nぜんぶで なんまいですか？',
    choices: ['824まい', '834まい', '844まい', '854まい'],
    correctAnswer: '834まい'
  },
  {
    id: 'M2-13c-Q19',
    unitId: 'M2-13c',
    step: 3,
    type: 'text',
    question: '900 - □ = 543\n□に はいる かずは？',
    choices: ['347', '357', '367', '377'],
    correctAnswer: '357'
  },
  {
    id: 'M2-13c-Q20',
    unitId: 'M2-13c',
    step: 3,
    type: 'text',
    question: 'こどもが 156にん、おとなが 287にん います。\nぜんぶで なんにんですか？',
    choices: ['433にん', '443にん', '453にん', '463にん'],
    correctAnswer: '443にん'
  },
  {
    id: 'M2-13c-Q21',
    unitId: 'M2-13c',
    step: 3,
    type: 'hitsuzan',
    operator: '+',
    operand1: 576,
    operand2: 248,
    correctAnswer: '824',
    hitsuzanMode: 'digit-by-digit'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
