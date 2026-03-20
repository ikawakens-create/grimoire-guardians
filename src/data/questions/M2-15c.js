/**
 * M2-15c.js - Grimoire Guardians 問題データ
 * ユニット: M2-15c「そうふくしゅう③」— Zone 4（図形・3桁・分数）
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 図形 ──
  {
    id: 'M2-15c-Q01',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: 'ちょうほうけいの へんは なんほんですか？',
    choices: ['3ほん', '4ほん', '5ほん', '6ほん'],
    correctAnswer: '4ほん'
  },
  {
    id: 'M2-15c-Q02',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: 'せいほうけいの 4つの かどは みんな なんどですか？',
    choices: ['45ど', '60ど', '90ど', '120ど'],
    correctAnswer: '90ど'
  },
  {
    id: 'M2-15c-Q03',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: '1辺が 5cmの せいほうけいの まわりの ながさは？',
    choices: ['10cm', '15cm', '20cm', '25cm'],
    correctAnswer: '20cm'
  },
  {
    id: 'M2-15c-Q04',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: 'たて 3cm、よこ 7cmの ちょうほうけいの まわりの ながさは？',
    choices: ['10cm', '20cm', '21cm', '28cm'],
    correctAnswer: '20cm'
  },
  {
    id: 'M2-15c-Q05',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: 'さんかくけいの ちょうてんは いくつですか？',
    choices: ['2つ', '3つ', '4つ', '5つ'],
    correctAnswer: '3つ'
  },
  {
    id: 'M2-15c-Q06',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: 'せいほうけいは ちょうほうけいの なかまですか？',
    choices: ['はい', 'いいえ', 'ときどき', 'わからない'],
    correctAnswer: 'はい'
  },
  {
    id: 'M2-15c-Q07',
    unitId: 'M2-15c',
    step: 1,
    type: 'text',
    question: 'まわりの ながさが 32cmの せいほうけいの 1辺は？',
    choices: ['4cm', '6cm', '8cm', '16cm'],
    correctAnswer: '8cm'
  },

  // ── Step 2: 3桁の計算 ──
  {
    id: 'M2-15c-Q08',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: '356 + 487 = ？',
    choices: ['833', '843', '853', '863'],
    correctAnswer: '843'
  },
  {
    id: 'M2-15c-Q09',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: '700 - 284 = ？',
    choices: ['406', '416', '426', '436'],
    correctAnswer: '416'
  },
  {
    id: 'M2-15c-Q10',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: '468 + 275 = ？',
    choices: ['733', '743', '753', '763'],
    correctAnswer: '743'
  },
  {
    id: 'M2-15c-Q11',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: '903 - 567 = ？',
    choices: ['326', '336', '346', '356'],
    correctAnswer: '336'
  },
  {
    id: 'M2-15c-Q12',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: 'りんごが 245こ あります。\n378こ もらうと ぜんぶで なんこですか？',
    choices: ['613こ', '623こ', '633こ', '643こ'],
    correctAnswer: '623こ'
  },
  {
    id: 'M2-15c-Q13',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: '1000 - 378 = ？',
    choices: ['612', '622', '632', '642'],
    correctAnswer: '622'
  },
  {
    id: 'M2-15c-Q14',
    unitId: 'M2-15c',
    step: 2,
    type: 'text',
    question: '574 + 268 = ？',
    choices: ['832', '842', '852', '862'],
    correctAnswer: '842'
  },

  // ── Step 3: 分数 ──
  {
    id: 'M2-15c-Q15',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: '2/5 + 3/5 = ？',
    choices: ['4/5', '5/5（=1）', '5/10', '1/5'],
    correctAnswer: '5/5（=1）'
  },
  {
    id: 'M2-15c-Q16',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: '7/8 - 3/8 = ？',
    choices: ['3/8', '4/8', '4/16', '7/8'],
    correctAnswer: '4/8'
  },
  {
    id: 'M2-15c-Q17',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: '1 - 2/6 = ？ （1 = 6/6 として かんがえましょう）',
    choices: ['2/6', '4/6', '3/6', '6/6'],
    correctAnswer: '4/6'
  },
  {
    id: 'M2-15c-Q18',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: '1/4 と 3/4 では どちらが おおきいですか？',
    choices: ['1/4', '3/4', 'おなじ', 'わからない'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-15c-Q19',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: 'テープが 5/6m あります。\n2/6m つかうと のこりは なんmですか？',
    choices: ['2/6m', '3/6m', '7/6m', '5/6m'],
    correctAnswer: '3/6m'
  },
  {
    id: 'M2-15c-Q20',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: '4/4 は いくつですか？',
    choices: ['1/4', '1', '4', '0'],
    correctAnswer: '1'
  },
  {
    id: 'M2-15c-Q21',
    unitId: 'M2-15c',
    step: 3,
    type: 'text',
    question: '1/3 + 1/3 + 1/3 = ？',
    choices: ['2/3', '3/3（=1）', '3/9', '1/3'],
    correctAnswer: '3/3（=1）'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
