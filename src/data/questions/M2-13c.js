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
    type: 'text',
    question: '234 + 521 = ？',
    choices: ['745', '755', '765', '775'],
    correctAnswer: '755'
  },
  {
    id: 'M2-13c-Q02',
    unitId: 'M2-13c',
    step: 1,
    type: 'text',
    question: '876 - 543 = ？',
    choices: ['323', '333', '343', '353'],
    correctAnswer: '333'
  },
  {
    id: 'M2-13c-Q03',
    unitId: 'M2-13c',
    step: 1,
    type: 'text',
    question: '300 + 400 = ？',
    choices: ['600', '700', '800', '900'],
    correctAnswer: '700'
  },
  {
    id: 'M2-13c-Q04',
    unitId: 'M2-13c',
    step: 1,
    type: 'text',
    question: '600 - 300 = ？',
    choices: ['200', '300', '400', '900'],
    correctAnswer: '300'
  },
  {
    id: 'M2-13c-Q05',
    unitId: 'M2-13c',
    step: 1,
    type: 'text',
    question: '152 + 437 = ？',
    choices: ['579', '589', '599', '609'],
    correctAnswer: '589'
  },
  {
    id: 'M2-13c-Q06',
    unitId: 'M2-13c',
    step: 1,
    type: 'text',
    question: '987 - 654 = ？',
    choices: ['323', '333', '343', '353'],
    correctAnswer: '333'
  },
  {
    id: 'M2-13c-Q07',
    unitId: 'M2-13c',
    step: 1,
    type: 'text',
    question: '413 + 286 = ？',
    choices: ['689', '699', '709', '719'],
    correctAnswer: '699'
  },

  // ── Step 2: 繰り上がり/繰り下がりあり 混合 ──
  {
    id: 'M2-13c-Q08',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '347 + 285 = ？',
    choices: ['622', '632', '642', '652'],
    correctAnswer: '632'
  },
  {
    id: 'M2-13c-Q09',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '731 - 258 = ？',
    choices: ['463', '473', '483', '493'],
    correctAnswer: '473'
  },
  {
    id: 'M2-13c-Q10',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '468 + 375 = ？',
    choices: ['823', '833', '843', '853'],
    correctAnswer: '843'
  },
  {
    id: 'M2-13c-Q11',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '824 - 367 = ？',
    choices: ['447', '457', '467', '477'],
    correctAnswer: '457'
  },
  {
    id: 'M2-13c-Q12',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '256 + 489 = ？',
    choices: ['735', '745', '755', '765'],
    correctAnswer: '745'
  },
  {
    id: 'M2-13c-Q13',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '500 - 238 = ？',
    choices: ['252', '262', '272', '282'],
    correctAnswer: '262'
  },
  {
    id: 'M2-13c-Q14',
    unitId: 'M2-13c',
    step: 2,
    type: 'text',
    question: '374 + 259 = ？',
    choices: ['623', '633', '643', '653'],
    correctAnswer: '633'
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
    type: 'text',
    question: '576 + 248 = ？',
    choices: ['814', '824', '834', '844'],
    correctAnswer: '824'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
