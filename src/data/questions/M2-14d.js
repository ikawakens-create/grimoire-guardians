/**
 * M2-14d.js - Grimoire Guardians 問題データ
 * ユニット: M2-14d「ぶんすうの おうよう」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 分数の比較・大小 ──
  {
    id: 'M2-14d-Q01',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: '1/3 と 2/3 では どちらが おおきいですか？',
    choices: ['1/3', '2/3', 'おなじ', 'わからない'],
    correctAnswer: '2/3'
  },
  {
    id: 'M2-14d-Q02',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: '3/5 と 4/5 では どちらが ちいさいですか？',
    choices: ['3/5', '4/5', 'おなじ', 'わからない'],
    correctAnswer: '3/5'
  },
  {
    id: 'M2-14d-Q03',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: '2/6 と 1/3 は おなじですか？（1/3 = 2/6）',
    choices: ['おなじ', '2/6 の ほうが おおきい', '1/3 の ほうが おおきい', 'くらべられない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M2-14d-Q04',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: '1/2 と 2/4 は おなじですか？',
    choices: ['おなじ', '1/2 の ほうが おおきい', '2/4 の ほうが おおきい', 'くらべられない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M2-14d-Q05',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: '3/4 と 1 では どちらが おおきいですか？',
    choices: ['3/4', '1', 'おなじ', 'わからない'],
    correctAnswer: '1'
  },
  {
    id: 'M2-14d-Q06',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: '4/5 は 1より おおきいですか？',
    choices: ['おおきい', 'ちいさい', 'おなじ', 'わからない'],
    correctAnswer: 'ちいさい'
  },
  {
    id: 'M2-14d-Q07',
    unitId: 'M2-14d',
    step: 1,
    type: 'text',
    question: 'ぶんし と ぶんぼが おなじ ぶんすうは いくつですか？（例：3/3）',
    choices: ['0', '1', '3', 'わからない'],
    correctAnswer: '1'
  },

  // ── Step 2: 数直線・位置 ──
  {
    id: 'M2-14d-Q08',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '0と1のあいだを 4つに わけたとき、左から 1つめの めもりは？',
    choices: ['1/4', '2/4', '3/4', '4/4'],
    correctAnswer: '1/4'
  },
  {
    id: 'M2-14d-Q09',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '0と1のあいだを 4つに わけたとき、左から 3つめの めもりは？',
    choices: ['1/4', '2/4', '3/4', '4/4'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14d-Q10',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '0と1のあいだを 5つに わけたとき、左から 2つめの めもりは？',
    choices: ['1/5', '2/5', '3/5', '5/5'],
    correctAnswer: '2/5'
  },
  {
    id: 'M2-14d-Q11',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '1/2 は 0と1の あいだの どこですか？',
    choices: ['左から 1/4 のあたり', 'ちょうど まんなか', '右から 1/4 のあたり', '1の ちかく'],
    correctAnswer: 'ちょうど まんなか'
  },
  {
    id: 'M2-14d-Q12',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '1/4 + 2/4 + 1/4 = ？',
    choices: ['3/4', '4/4（=1）', '4/12', '2/4'],
    correctAnswer: '4/4（=1）'
  },
  {
    id: 'M2-14d-Q13',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '3/5 - 1/5 + 2/5 = ？',
    choices: ['3/5', '4/5', '4/15', '5/5'],
    correctAnswer: '4/5'
  },
  {
    id: 'M2-14d-Q14',
    unitId: 'M2-14d',
    step: 2,
    type: 'text',
    question: '1 - 2/6 = ？ （1 = 6/6 として かんがえましょう）',
    choices: ['2/6', '4/6', '3/6', '6/6'],
    correctAnswer: '4/6'
  },

  // ── Step 3: 文章題・発展 ──
  {
    id: 'M2-14d-Q15',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: 'みずが 4/5L あります。\n3/5L つかうと のこりは なんLですか？',
    choices: ['1/5L', '2/5L', '7/5L', '3/5L'],
    correctAnswer: '1/5L'
  },
  {
    id: 'M2-14d-Q16',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: 'テープが 1/4m、1/4m、2/4m の 3つ あります。\nぜんぶ あわせると なんmですか？',
    choices: ['3/4m', '4/4m（=1m）', '3/12m', '4/12m'],
    correctAnswer: '4/4m（=1m）'
  },
  {
    id: 'M2-14d-Q17',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: '3/8L のんで、また 2/8L のみました。\nのんだ りょうは ぜんぶで なんLですか？',
    choices: ['4/8L', '5/8L', '5/16L', '6/8L'],
    correctAnswer: '5/8L'
  },
  {
    id: 'M2-14d-Q18',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: 'ある ながさの 2/6 と 3/6 と 1/6 を あわせると？',
    choices: ['5/6', '6/6（=1）', '6/18', '5/18'],
    correctAnswer: '6/6（=1）'
  },
  {
    id: 'M2-14d-Q19',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: 'つぎの なかで もっとも おおきいのは？',
    choices: ['2/5', '3/5', '1/5', '0/5'],
    correctAnswer: '3/5'
  },
  {
    id: 'M2-14d-Q20',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: '1/6 + 1/6 + 1/6 + 1/6 = ？',
    choices: ['1/6', '2/6', '4/6', '4/24'],
    correctAnswer: '4/6'
  },
  {
    id: 'M2-14d-Q21',
    unitId: 'M2-14d',
    step: 3,
    type: 'text',
    question: '1mの テープを つかいます。\n3/8m つかったあと さらに 2/8m つかいました。\nのこりは なんmですか？',
    choices: ['2/8m', '3/8m', '4/8m（=1/2m）', '5/8m'],
    correctAnswer: '3/8m'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
