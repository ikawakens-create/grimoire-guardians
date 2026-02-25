/**
 * M1-08c.js - Grimoire Guardians 問題データ
 * ユニット: M1-08c「５ふんたんいに ちょうせん！」
 *
 * 対象: 小学1年生（先取り）〜2年生、5分単位の時刻読み
 * 準拠: 日本文教出版 算数1年・2年
 *
 * Step構成（シャッフル出題）
 *   Step1: ながいはりと ふんすう（プール5問 → 5問出題）
 *   Step2: 時計を よもう（プール7問 → 5問出題）
 *   Step3: まとめ・確認（プール5問 → 5問出題）
 *
 * 【時計の読み方ポイント】
 *   ながいはり（分針）が さす かずに 5を かけた ものが ふんすう
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: ながいはりと ふんすう（準備問題）
  // =====================================================
  {
    id: 'M1-08c-Q01',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'とけいの よみかた：\nながいはりが さす かずに 5を かけると ふんすうに なります。\n\nながいはりが 1を さしているとき、なんぷん？',
    choices: ['１ふん', '２ふん', '５ふん', '１０ふん'],
    correctAnswer: '５ふん',
    explanation: '1 × 5 = 5 なので 5ふんです。'
  },
  {
    id: 'M1-08c-Q02',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 2を さしているとき、なんぷん？\n（ヒント：2 × 5 = ？）',
    choices: ['５ふん', '１０ふん', '１５ふん', '２０ふん'],
    correctAnswer: '１０ふん',
    explanation: '2 × 5 = 10 なので 10ふんです。'
  },
  {
    id: 'M1-08c-Q03',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 3を さしているとき、なんぷん？\n（ヒント：3 × 5 = ？）',
    choices: ['１０ふん', '１５ふん', '２０ふん', '３０ふん'],
    correctAnswer: '１５ふん',
    explanation: '3 × 5 = 15 なので 15ふんです。'
  },
  {
    id: 'M1-08c-Q04',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 9を さしているとき、なんぷん？\n（ヒント：9 × 5 = ？）',
    choices: ['３０ふん', '４０ふん', '４５ふん', '５０ふん'],
    correctAnswer: '４５ふん',
    explanation: '9 × 5 = 45 なので 45ふんです。'
  },
  {
    id: 'M1-08c-Q05',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 4を さしているとき、なんぷん？\n（ヒント：4 × 5 = ？）',
    choices: ['１５ふん', '２０ふん', '２５ふん', '３０ふん'],
    correctAnswer: '２０ふん',
    explanation: '4 × 5 = 20 なので 20ふんです。'
  },

  // =====================================================
  // Step2: 時計を みて「なんじ なんぷん？」（SVG時計）
  // =====================================================
  {
    id: 'M1-08c-Q06',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 2, minute: 10 },
    question: 'なんじ なんぷん ですか？\n（ながいはりが さす かずに 5を かけてみよう）',
    choices: ['２じ５ふん', '２じ１０ふん', '２じ１５ふん', '３じ１０ふん'],
    correctAnswer: '２じ１０ふん',
    explanation: 'みじかいはり→2じ。ながいはり2→2×5=10ふん。2じ10ふん です。'
  },
  {
    id: 'M1-08c-Q07',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 3, minute: 15 },
    question: 'なんじ なんぷん ですか？',
    choices: ['３じ１０ふん', '３じ１５ふん', '３じ２０ふん', '４じ１５ふん'],
    correctAnswer: '３じ１５ふん',
    explanation: 'みじかいはり→3じ。ながいはり3→3×5=15ふん。3じ15ふん です。'
  },
  {
    id: 'M1-08c-Q08',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 1, minute: 30 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１じ２０ふん', '１じ３０ふん', '１じはん', '２じ３０ふん'],
    correctAnswer: '１じ３０ふん',
    explanation: 'みじかいはり→1じ。ながいはり6→6×5=30ふん。1じ30ふん です。'
  },
  {
    id: 'M1-08c-Q09',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 5, minute: 45 },
    question: 'なんじ なんぷん ですか？',
    choices: ['５じ４０ふん', '５じ４５ふん', '６じ４５ふん', '５じ５０ふん'],
    correctAnswer: '５じ４５ふん',
    explanation: 'みじかいはり→5じ。ながいはり9→9×5=45ふん。5じ45ふん です。'
  },
  {
    id: 'M1-08c-Q10',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 8, minute: 20 },
    question: 'なんじ なんぷん ですか？',
    choices: ['８じ１５ふん', '８じ２０ふん', '８じ２５ふん', '９じ２０ふん'],
    correctAnswer: '８じ２０ふん',
    explanation: 'みじかいはり→8じ。ながいはり4→4×5=20ふん。8じ20ふん です。'
  },
  {
    id: 'M1-08c-Q11',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 11, minute: 50 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１１じ４５ふん', '１１じ５０ふん', '１１じ５５ふん', '１２じ５０ふん'],
    correctAnswer: '１１じ５０ふん',
    explanation: 'みじかいはり→11じ。ながいはり10→10×5=50ふん。11じ50ふん です。'
  },
  {
    id: 'M1-08c-Q12',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 4, minute: 25 },
    question: 'なんじ なんぷん ですか？',
    choices: ['４じ２０ふん', '４じ２５ふん', '４じ３０ふん', '５じ２５ふん'],
    correctAnswer: '４じ２５ふん',
    explanation: 'みじかいはり→4じ。ながいはり5→5×5=25ふん。4じ25ふん です。'
  },

  // =====================================================
  // Step3: まとめ・確認（難しめの時刻）
  // =====================================================
  {
    id: 'M1-08c-Q13',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 7, minute: 35 },
    question: 'なんじ なんぷん ですか？',
    choices: ['７じ３０ふん', '７じ３５ふん', '７じ４０ふん', '８じ３５ふん'],
    correctAnswer: '７じ３５ふん',
    explanation: 'みじかいはり→7じ。ながいはり7→7×5=35ふん。7じ35ふん です。'
  },
  {
    id: 'M1-08c-Q14',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 9, minute: 5 },
    question: 'なんじ なんぷん ですか？',
    choices: ['９じ０ふん', '９じ５ふん', '９じ１０ふん', '１０じ５ふん'],
    correctAnswer: '９じ５ふん',
    explanation: 'みじかいはり→9じ。ながいはり1→1×5=5ふん。9じ5ふん です。'
  },
  {
    id: 'M1-08c-Q15',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 12, minute: 55 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１２じ４５ふん', '１２じ５０ふん', '１２じ５５ふん', '１じ５５ふん'],
    correctAnswer: '１２じ５５ふん',
    explanation: 'みじかいはり→12じ。ながいはり11→11×5=55ふん。12じ55ふん です。'
  },
  {
    id: 'M1-08c-Q16',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 6, minute: 40 },
    question: 'なんじ なんぷん ですか？',
    choices: ['６じ３５ふん', '６じ４０ふん', '６じ４５ふん', '７じ４０ふん'],
    correctAnswer: '６じ４０ふん',
    explanation: 'みじかいはり→6じ。ながいはり8→8×5=40ふん。6じ40ふん です。'
  },
  {
    id: 'M1-08c-Q17',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 10, minute: 55 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１０じ４５ふん', '１０じ５０ふん', '１０じ５５ふん', '１１じ５５ふん'],
    correctAnswer: '１０じ５５ふん',
    explanation: 'みじかいはり→10じ。ながいはり11→11×5=55ふん。10じ55ふん です。'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
