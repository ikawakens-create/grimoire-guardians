/**
 * M2-12b.js - Grimoire Guardians 問題データ
 * ユニット: M2-12b「ずけい まとめ」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 形の名前と特徴（復習） ──
  {
    id: 'M2-12b-Q01',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: '4つの かどが みんな ちょっかくで、4つの へんが みんな おなじ ながさの かたちは？',
    choices: ['ちょうほうけい', 'さんかくけい', 'せいほうけい', 'まる'],
    correctAnswer: 'せいほうけい'
  },
  {
    id: 'M2-12b-Q02',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: '3つの へんと 3つの ちょうてんを もつ かたちは？',
    choices: ['ちょうほうけい', 'せいほうけい', 'さんかくけい', 'まる'],
    correctAnswer: 'さんかくけい'
  },
  {
    id: 'M2-12b-Q03',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: 'ちょっかくが 4つある かたちは どれですか？',
    choices: ['さんかくけい', 'ちょうほうけい', 'まる', 'さんかくけい と ちょうほうけい'],
    correctAnswer: 'ちょうほうけい'
  },
  {
    id: 'M2-12b-Q04',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: 'つぎの うち、しかくけいは どれですか？',
    choices: ['さんかくけい', 'まる', 'ちょうほうけい', 'どれも ちがう'],
    correctAnswer: 'ちょうほうけい'
  },
  {
    id: 'M2-12b-Q05',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: 'せいほうけいは ちょうほうけいの なかまですか？',
    choices: ['はい', 'いいえ', 'ときどき', 'さんかくけいのなかま'],
    correctAnswer: 'はい'
  },
  {
    id: 'M2-12b-Q06',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: 'さんかくけいの かどは いくつですか？',
    choices: ['2つ', '3つ', '4つ', '5つ'],
    correctAnswer: '3つ'
  },
  {
    id: 'M2-12b-Q07',
    unitId: 'M2-12b',
    step: 1,
    type: 'text',
    question: 'ちょうほうけいの へんは なんほんですか？',
    choices: ['3ほん', '4ほん', '5ほん', '6ほん'],
    correctAnswer: '4ほん'
  },

  // ── Step 2: 混合問題 ──
  {
    id: 'M2-12b-Q08',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: 'さんかくけい 2まいと ちょうほうけい 1まいの ちょうてんを あわせると いくつですか？',
    choices: ['8つ', '9つ', '10つ', '12つ'],
    correctAnswer: '10つ'
  },
  {
    id: 'M2-12b-Q09',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: 'せいほうけい 3まいの へんを ぜんぶ あわせると なんほんですか？',
    choices: ['9ほん', '12ほん', '15ほん', '16ほん'],
    correctAnswer: '12ほん'
  },
  {
    id: 'M2-12b-Q10',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: '1辺が 6cmの せいほうけいと たて 4cm よこ 8cmの ちょうほうけい、まわりの ながさが ながいのは？',
    choices: ['せいほうけい', 'ちょうほうけい', 'おなじ', 'わからない'],
    correctAnswer: 'ちょうほうけい'
  },
  {
    id: 'M2-12b-Q11',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: 'まわりの ながさが 12cmの さんかくけいが あります。\n3つの へんが おなじ ながさのとき、1辺は なんcmですか？',
    choices: ['2cm', '3cm', '4cm', '6cm'],
    correctAnswer: '4cm'
  },
  {
    id: 'M2-12b-Q12',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: 'ちょうほうけいを まんなかで よこに きると できる かたちは？',
    choices: ['さんかくけい 2つ', 'せいほうけい 2つ', 'ちょうほうけい 2つ', 'まる 2つ'],
    correctAnswer: 'ちょうほうけい 2つ'
  },
  {
    id: 'M2-12b-Q13',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: 'ちょっかくを もつ かたちを ぜんぶ えらぶと？',
    choices: ['さんかくけい だけ', 'ちょうほうけい だけ', 'ちょうほうけいと せいほうけい', 'ぜんぶ'],
    correctAnswer: 'ちょうほうけいと せいほうけい'
  },
  {
    id: 'M2-12b-Q14',
    unitId: 'M2-12b',
    step: 2,
    type: 'text',
    question: 'たて 3cm、よこ 5cmの ちょうほうけいの まわりは なんcmですか？',
    choices: ['8cm', '15cm', '16cm', '20cm'],
    correctAnswer: '16cm'
  },

  // ── Step 3: 発展 ──
  {
    id: 'M2-12b-Q15',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: 'まわりの ながさが 20cmの せいほうけいの 1辺は なんcmですか？',
    choices: ['4cm', '5cm', '10cm', '20cm'],
    correctAnswer: '5cm'
  },
  {
    id: 'M2-12b-Q16',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: '「4つの かどが ちょっかく」という じょうけんを みたす かたちを えらぶと？',
    choices: ['さんかくけい', 'ちょうほうけい と せいほうけい', 'さんかくけい と ちょうほうけい', 'ぜんぶ'],
    correctAnswer: 'ちょうほうけい と せいほうけい'
  },
  {
    id: 'M2-12b-Q17',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: 'せいほうけいと ちょうほうけいで おなじ ところは？',
    choices: ['へんの ながさ', 'ちょっかくが 4つ', '4つの へんが おなじ', 'まわりの ながさ'],
    correctAnswer: 'ちょっかくが 4つ'
  },
  {
    id: 'M2-12b-Q18',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: 'ちょうほうけい 2まいを あわせて せいほうけいに するには、たてと よこの ながさを どうしますか？',
    choices: ['たてを 2ばいに する', 'よこを 2ばいに する', 'たては そのまま よこを はんぶんに', 'たてと よこを おなじに する'],
    correctAnswer: 'よこを 2ばいに する'
  },
  {
    id: 'M2-12b-Q19',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: '1辺が 8cmの せいほうけいの まわりの ながさは なんcmですか？',
    choices: ['16cm', '24cm', '32cm', '64cm'],
    correctAnswer: '32cm'
  },
  {
    id: 'M2-12b-Q20',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: 'さんかくけいの へんの かずと ちょうほうけいの へんの かずを かけると いくつですか？',
    choices: ['7', '12', '16', '3'],
    correctAnswer: '12'
  },
  {
    id: 'M2-12b-Q21',
    unitId: 'M2-12b',
    step: 3,
    type: 'text',
    question: 'まわりの ながさが 24cmの ちょうほうけいで たてが 4cmのとき、よこは なんcmですか？',
    choices: ['6cm', '8cm', '10cm', '12cm'],
    correctAnswer: '8cm'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
