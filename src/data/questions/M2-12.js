/**
 * M2-12.js - Grimoire Guardians 問題データ
 * ユニット: M2-12「ちょうほうけい・せいほうけい」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 長方形・正方形の特徴 ──
  {
    id: 'M2-12-Q01',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: 'むかいあう へんの ながさが おなじで、かどが みんな ちょっかくの しかくけいを なんと いいますか？',
    choices: ['さんかくけい', 'ちょうほうけい', 'せいほうけい', 'ひしがた'],
    correctAnswer: 'ちょうほうけい'
  },
  {
    id: 'M2-12-Q02',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: '4つの へんが ぜんぶ おなじ ながさで、かどが みんな ちょっかくの かたちは？',
    choices: ['ちょうほうけい', 'さんかくけい', 'せいほうけい', 'ひしがた'],
    correctAnswer: 'せいほうけい'
  },
  {
    id: 'M2-12-Q03',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: 'ちょうほうけいの かどは みんな なんどですか？',
    choices: ['45ど', '60ど', '90ど', '120ど'],
    correctAnswer: '90ど'
  },
  {
    id: 'M2-12-Q04',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: 'せいほうけいの 4つの へんの ながさは？',
    choices: ['みんな ちがう', 'むかいあう へんだけ おなじ', 'みんな おなじ', '2つだけ おなじ'],
    correctAnswer: 'みんな おなじ'
  },
  {
    id: 'M2-12-Q05',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: 'ちょっかくは なんどの かどですか？',
    choices: ['45ど', '60ど', '90ど', '180ど'],
    correctAnswer: '90ど'
  },
  {
    id: 'M2-12-Q06',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: 'ちょうほうけいの むかいあう へんは？',
    choices: ['ながさが ちがう', 'ながさが おなじ', 'かならず 5cm', 'むかいあわない'],
    correctAnswer: 'ながさが おなじ'
  },
  {
    id: 'M2-12-Q07',
    unitId: 'M2-12',
    step: 1,
    type: 'text',
    question: 'せいほうけいは ちょうほうけいと いえますか？',
    choices: ['いえる', 'いえない', 'ときどき', 'わからない'],
    correctAnswer: 'いえる'
  },

  // ── Step 2: 辺の長さ・直角の確認 ──
  {
    id: 'M2-12-Q08',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: 'たて 3cm、よこ 5cmの ちょうほうけいが あります。\nむかいあう たての へんの ながさは？',
    choices: ['2cm', '3cm', '5cm', '8cm'],
    correctAnswer: '3cm'
  },
  {
    id: 'M2-12-Q09',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: '1辺が 4cmの せいほうけいが あります。\nぜんての へんの ながさを あわせると なんcmですか？',
    choices: ['4cm', '8cm', '12cm', '16cm'],
    correctAnswer: '16cm'
  },
  {
    id: 'M2-12-Q10',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: 'たて 6cm、よこ 4cmの ちょうほうけいの まわりの ながさは？',
    choices: ['10cm', '20cm', '24cm', '30cm'],
    correctAnswer: '20cm'
  },
  {
    id: 'M2-12-Q11',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: 'せいほうけいの 1辺が 7cm です。\nまわりの ながさは なんcmですか？',
    choices: ['14cm', '21cm', '28cm', '35cm'],
    correctAnswer: '28cm'
  },
  {
    id: 'M2-12-Q12',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: 'ちょうほうけいの ちょっかくは いくつ ありますか？',
    choices: ['1つ', '2つ', '3つ', '4つ'],
    correctAnswer: '4つ'
  },
  {
    id: 'M2-12-Q13',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: 'たて 5cm、よこ 5cmの しかくけいは なんと いいますか？',
    choices: ['ちょうほうけい', 'さんかくけい', 'せいほうけい', 'ひしがた'],
    correctAnswer: 'せいほうけい'
  },
  {
    id: 'M2-12-Q14',
    unitId: 'M2-12',
    step: 2,
    type: 'text',
    question: 'ちょうほうけいの たての へんが 3cm、よこの へんが 7cm です。\nひとつの むかいあう へんの ながさは？',
    choices: ['3cm と 3cm', '7cm と 7cm', '3cm と 7cm', '5cm と 5cm'],
    correctAnswer: '3cm と 7cm'
  },

  // ── Step 3: 応用・作図 ──
  {
    id: 'M2-12-Q15',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: 'まわりの ながさが 24cm の せいほうけいの 1辺は なんcmですか？',
    choices: ['4cm', '6cm', '8cm', '12cm'],
    correctAnswer: '6cm'
  },
  {
    id: 'M2-12-Q16',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: 'ちょうほうけいを たいかくせんで 2つに きると できる かたちは？',
    choices: ['ちょうほうけい 2つ', 'せいほうけい 2つ', 'さんかくけい 2つ', 'まる 2つ'],
    correctAnswer: 'さんかくけい 2つ'
  },
  {
    id: 'M2-12-Q17',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: 'せいほうけいの たいかくせんで 2つに きると できる かたちは？',
    choices: ['さんかくけい 2つ', 'せいほうけい 2つ', 'ちょうほうけい 2つ', 'まる 2つ'],
    correctAnswer: 'さんかくけい 2つ'
  },
  {
    id: 'M2-12-Q18',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: 'まわりの ながさが 18cmの ちょうほうけいが あります。\nたてが 4cmのとき、よこは なんcmですか？',
    choices: ['3cm', '5cm', '7cm', '9cm'],
    correctAnswer: '5cm'
  },
  {
    id: 'M2-12-Q19',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: 'ちょうほうけいと せいほうけいで ちがう ところは？',
    choices: ['かどの かず', 'へんの かず', 'へんの ながさ', 'ちょっかくの かず'],
    correctAnswer: 'へんの ながさ'
  },
  {
    id: 'M2-12-Q20',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: '1辺が 5cmの せいほうけいの なかに かける いちばん おおきい まるの はんけいは？',
    choices: ['2cm', '2.5cm', '5cm', '10cm'],
    correctAnswer: '2.5cm'
  },
  {
    id: 'M2-12-Q21',
    unitId: 'M2-12',
    step: 3,
    type: 'text',
    question: 'たて 4cm、よこ 6cmの ちょうほうけい 2まいを ならべると できる かたちの まわりの ながさは？',
    choices: ['20cm', '28cm', '32cm', '40cm'],
    correctAnswer: '28cm'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
