/**
 * M2-11.js - Grimoire Guardians 問題データ
 * ユニット: M2-11「さんかくけいと しかくけい」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 辺と頂点の数（基本） ──
  {
    id: 'M2-11-Q01',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'さんかくけいの へんは なんほんですか？',
    choices: ['2ほん', '3ほん', '4ほん', '5ほん'],
    correctAnswer: '3ほん'
  },
  {
    id: 'M2-11-Q02',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'しかくけいの へんは なんほんですか？',
    choices: ['3ほん', '4ほん', '5ほん', '6ほん'],
    correctAnswer: '4ほん'
  },
  {
    id: 'M2-11-Q03',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'さんかくけいの ちょうてんは いくつですか？',
    choices: ['2つ', '3つ', '4つ', '5つ'],
    correctAnswer: '3つ'
  },
  {
    id: 'M2-11-Q04',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'しかくけいの ちょうてんは いくつですか？',
    choices: ['3つ', '4つ', '5つ', '6つ'],
    correctAnswer: '4つ'
  },
  {
    id: 'M2-11-Q05',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'さんかくけいの かどは いくつですか？',
    choices: ['2つ', '3つ', '4つ', '5つ'],
    correctAnswer: '3つ'
  },
  {
    id: 'M2-11-Q06',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'しかくけいの かどは いくつですか？',
    choices: ['2つ', '3つ', '4つ', '5つ'],
    correctAnswer: '4つ'
  },
  {
    id: 'M2-11-Q07',
    unitId: 'M2-11',
    step: 1,
    type: 'text',
    question: 'ちょくせん 3ほんで かこんだ かたちを なんと いいますか？',
    choices: ['まるいかたち', 'さんかくけい', 'しかくけい', 'ごかくけい'],
    correctAnswer: 'さんかくけい'
  },

  // ── Step 2: 形の識別 ──
  {
    id: 'M2-11-Q08',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'ちょくせん 4ほんで かこんだ かたちを なんと いいますか？',
    choices: ['さんかくけい', 'しかくけい', 'まるいかたち', 'ごかくけい'],
    correctAnswer: 'しかくけい'
  },
  {
    id: 'M2-11-Q09',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'へんが 3ほんの かたちは どれですか？',
    choices: ['まるいかたち', 'しかくけい', 'さんかくけい', 'ろっかくけい'],
    correctAnswer: 'さんかくけい'
  },
  {
    id: 'M2-11-Q10',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'ちょうてんが 4つの かたちは どれですか？',
    choices: ['さんかくけい', 'まるいかたち', 'しかくけい', 'にかくけい'],
    correctAnswer: 'しかくけい'
  },
  {
    id: 'M2-11-Q11',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'まるい かたちは、さんかくけいですか？',
    choices: ['はい', 'いいえ', 'しかくけいです', 'わからない'],
    correctAnswer: 'いいえ'
  },
  {
    id: 'M2-11-Q12',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'さんかくけいと しかくけい、へんの かずが おおいのは？',
    choices: ['さんかくけい', 'しかくけい', 'おなじ', 'わからない'],
    correctAnswer: 'しかくけい'
  },
  {
    id: 'M2-11-Q13',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'さんかくけいを 2まい あわせると できる かたちは？',
    choices: ['さんかくけい', 'しかくけい', 'まる', 'ごかくけい'],
    correctAnswer: 'しかくけい'
  },
  {
    id: 'M2-11-Q14',
    unitId: 'M2-11',
    step: 2,
    type: 'text',
    question: 'しかくけいを 2まいに きると できる かたちは？',
    choices: ['しかくけい 2つ', 'さんかくけい 2つ', 'まる 2つ', 'かわらない'],
    correctAnswer: 'さんかくけい 2つ'
  },

  // ── Step 3: 応用・特徴の比較 ──
  {
    id: 'M2-11-Q15',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'さんかくけいの ちょうてんと しかくけいの ちょうてんを あわせると いくつですか？',
    choices: ['5つ', '6つ', '7つ', '8つ'],
    correctAnswer: '7つ'
  },
  {
    id: 'M2-11-Q16',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'さんかくけいと しかくけいの へんの かずを あわせると なんほんですか？',
    choices: ['5ほん', '6ほん', '7ほん', '8ほん'],
    correctAnswer: '7ほん'
  },
  {
    id: 'M2-11-Q17',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'ちょうてんが 3つより おおい かたちは どれですか？',
    choices: ['さんかくけい', 'しかくけい', 'どちらも3つ', 'どちらもちがう'],
    correctAnswer: 'しかくけい'
  },
  {
    id: 'M2-11-Q18',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'さんかくけいが 3まい あります。\nへんは ぜんぶで なんほんですか？',
    choices: ['6ほん', '9ほん', '12ほん', '15ほん'],
    correctAnswer: '9ほん'
  },
  {
    id: 'M2-11-Q19',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'しかくけいが 2まい あります。\nちょうてんは ぜんぶで いくつですか？',
    choices: ['4つ', '6つ', '8つ', '10つ'],
    correctAnswer: '8つ'
  },
  {
    id: 'M2-11-Q20',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'へんが 3ほんで、ちょうてんが 3つの かたちは？',
    choices: ['まる', 'しかくけい', 'さんかくけい', 'ごかくけい'],
    correctAnswer: 'さんかくけい'
  },
  {
    id: 'M2-11-Q21',
    unitId: 'M2-11',
    step: 3,
    type: 'text',
    question: 'へんが 4ほんで、ちょうてんが 4つの かたちは？',
    choices: ['まる', 'さんかくけい', 'しかくけい', 'ごかくけい'],
    correctAnswer: 'しかくけい'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
