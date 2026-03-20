/**
 * M2-14a.js - Grimoire Guardians 問題データ
 * ユニット: M2-14a「ぶんすうの きほん」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 分数の意味・読み方 ──
  {
    id: 'M2-14a-Q01',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: 'ケーキを 2つに おなじく きったとき、1つぶんの おおきさを なんと いいますか？',
    choices: ['2ぶんの2', '2ぶんの1', '1ぶんの2', 'はんぶん'],
    correctAnswer: '2ぶんの1'
  },
  {
    id: 'M2-14a-Q02',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: '「2ぶんの1」を かずで かくと どうなりますか？',
    choices: ['2/1', '1/2', '1+2', '1-2'],
    correctAnswer: '1/2'
  },
  {
    id: 'M2-14a-Q03',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: 'テープを 3つに おなじく きって 1つぶんを とると なんぶんの なんですか？',
    choices: ['2ぶんの1', '3ぶんの1', '3ぶんの2', '4ぶんの1'],
    correctAnswer: '3ぶんの1'
  },
  {
    id: 'M2-14a-Q04',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: '1/4 は なんと よみますか？',
    choices: ['1ぶんの4', '4ぶんの1', '4ぶんの4', '4と1'],
    correctAnswer: '4ぶんの1'
  },
  {
    id: 'M2-14a-Q05',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: '1mを 2つに おなじく わけた 1つぶんは なんmですか？',
    choices: ['1/4m', '1/3m', '1/2m', '2m'],
    correctAnswer: '1/2m'
  },
  {
    id: 'M2-14a-Q06',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: '「3ぶんの2」を かずで かくと？',
    choices: ['3/2', '2/3', '2+3', '3-2'],
    correctAnswer: '2/3'
  },
  {
    id: 'M2-14a-Q07',
    unitId: 'M2-14a',
    step: 1,
    type: 'text',
    question: 'ぶんすうの したの かずを なんと いいますか？',
    choices: ['ぶんし', 'ぶんぼ', 'ぶんすう', 'ぶんかつ'],
    correctAnswer: 'ぶんぼ'
  },

  // ── Step 2: 分数の大小・1との関係 ──
  {
    id: 'M2-14a-Q08',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '1/2 と 1/3 では どちらが おおきいですか？',
    choices: ['1/2', '1/3', 'おなじ', 'わからない'],
    correctAnswer: '1/2'
  },
  {
    id: 'M2-14a-Q09',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '1/4 と 1/5 では どちらが おおきいですか？',
    choices: ['1/4', '1/5', 'おなじ', 'わからない'],
    correctAnswer: '1/4'
  },
  {
    id: 'M2-14a-Q10',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '2/2 と 1 は おなじですか？',
    choices: ['おなじ', 'ちがう（2/2の ほうが おおきい）', 'ちがう（1の ほうが おおきい）', 'わからない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M2-14a-Q11',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '3/3 は いくつと おなじですか？',
    choices: ['0', '1/3', '1', '3'],
    correctAnswer: '1'
  },
  {
    id: 'M2-14a-Q12',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '1/4 は 1を 4つに わけた いくつぶんですか？',
    choices: ['1つぶん', '2つぶん', '3つぶん', '4つぶん'],
    correctAnswer: '1つぶん'
  },
  {
    id: 'M2-14a-Q13',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '3/4 は 1を 4つに わけた いくつぶんですか？',
    choices: ['1つぶん', '2つぶん', '3つぶん', '4つぶん'],
    correctAnswer: '3つぶん'
  },
  {
    id: 'M2-14a-Q14',
    unitId: 'M2-14a',
    step: 2,
    type: 'text',
    question: '「ぶんし」とは ぶんすうの どこですか？',
    choices: ['したの かず', 'うえの かず', 'まんなかの せん', 'ぶんぼの 2ばい'],
    correctAnswer: 'うえの かず'
  },

  // ── Step 3: 応用 ──
  {
    id: 'M2-14a-Q15',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: '1/3m と 1/4m では どちらが みじかいですか？',
    choices: ['1/3m', '1/4m', 'おなじ', 'わからない'],
    correctAnswer: '1/4m'
  },
  {
    id: 'M2-14a-Q16',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: '1mを 5つに わけた 1つぶんは なんmですか？',
    choices: ['1/3m', '1/4m', '1/5m', '5m'],
    correctAnswer: '1/5m'
  },
  {
    id: 'M2-14a-Q17',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: '5/5 は いくつですか？',
    choices: ['1/5', '1', '5', '25'],
    correctAnswer: '1'
  },
  {
    id: 'M2-14a-Q18',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: '0/4 は いくつですか？',
    choices: ['0', '1/4', '1', '4'],
    correctAnswer: '0'
  },
  {
    id: 'M2-14a-Q19',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: 'ぶんぼが おおきいほど、1つぶんの おおきさは？',
    choices: ['おおきくなる', 'ちいさくなる', 'かわらない', 'わからない'],
    correctAnswer: 'ちいさくなる'
  },
  {
    id: 'M2-14a-Q20',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: '1/2 は 1/4 の なんばいですか？',
    choices: ['1ばい', '2ばい', '4ばい', 'はんぶん'],
    correctAnswer: '2ばい'
  },
  {
    id: 'M2-14a-Q21',
    unitId: 'M2-14a',
    step: 3,
    type: 'text',
    question: 'テープを 4つに わけた 4つぶんを とると ぜんぶで なんmですか（テープは 1m）？',
    choices: ['1/4m', '1/2m', '1m', '4m'],
    correctAnswer: '1m'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
