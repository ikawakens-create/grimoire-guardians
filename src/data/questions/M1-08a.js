/**
 * M1-08a.js - Grimoire Guardians 問題データ
 * ユニット: M1-08a「なんじ（ちょうど）」
 *
 * 対象: 小学1年生、アナログ時計の読み方（ちょうどの時刻）
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: 時計を よもう！（1〜6じ）（プール6問 → 5問出題）
 *   Step2: 時計を よもう！（7〜12じ）（プール6問 → 5問出題）
 *   Step3: しくみを りかいしよう（プール5問 → 5問出題）
 *
 * 【時計の読み方ポイント】
 *   みじかいはり（時針）→ なんじ かを あらわす
 *   ちょうどのとき ながいはり（分針）は 12 をさす
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 時計を よもう！（1〜6じ）
  // =====================================================
  {
    id: 'M1-08a-Q01',
    unitId: 'M1-08a',
    step: 1,
    type: 'clock',
    clockFace: { hour: 3, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１じ', '２じ', '３じ', '６じ'],
    correctAnswer: '３じ',
    explanation: 'みじかいはりが ３ を さしているので、３じ です。'
  },
  {
    id: 'M1-08a-Q04',
    unitId: 'M1-08a',
    step: 1,
    type: 'clock',
    clockFace: { hour: 1, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１じ', '２じ', '３じ', '１２じ'],
    correctAnswer: '１じ',
    explanation: 'みじかいはりが １ を さしているので、１じ です。'
  },
  {
    id: 'M1-08a-Q06',
    unitId: 'M1-08a',
    step: 1,
    type: 'clock',
    clockFace: { hour: 5, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['３じ', '４じ', '５じ', '６じ'],
    correctAnswer: '５じ',
    explanation: 'みじかいはりが ５ を さしているので、５じ です。'
  },
  {
    id: 'M1-08a-Q08',
    unitId: 'M1-08a',
    step: 1,
    type: 'clock',
    clockFace: { hour: 4, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['２じ', '３じ', '４じ', '５じ'],
    correctAnswer: '４じ',
    explanation: 'みじかいはりが ４ を さしているので、４じ です。'
  },
  {
    id: 'M1-08a-Q13',
    unitId: 'M1-08a',
    step: 1,
    type: 'clock',
    clockFace: { hour: 6, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['３じ', '６じ', '９じ', '１２じ'],
    correctAnswer: '６じ',
    explanation: 'みじかいはりが ６ を さしています。６じ です。'
  },
  {
    id: 'M1-08a-Q14',
    unitId: 'M1-08a',
    step: 1,
    type: 'clock',
    clockFace: { hour: 2, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１じ', '２じ', '３じ', '４じ'],
    correctAnswer: '２じ',
    explanation: 'みじかいはりが ２ を さしているので、２じ です。'
  },

  // =====================================================
  // Step2: 時計を よもう！（7〜12じ）
  // =====================================================
  {
    id: 'M1-08a-Q02',
    unitId: 'M1-08a',
    step: 2,
    type: 'clock',
    clockFace: { hour: 7, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['５じ', '６じ', '７じ', '８じ'],
    correctAnswer: '７じ',
    explanation: 'みじかいはりが ７ を さしているので、７じ です。'
  },
  {
    id: 'M1-08a-Q03',
    unitId: 'M1-08a',
    step: 2,
    type: 'clock',
    clockFace: { hour: 12, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['６じ', '９じ', '１０じ', '１２じ'],
    correctAnswer: '１２じ',
    explanation: 'みじかいはりが 12 を さしているので、１２じ です。'
  },
  {
    id: 'M1-08a-Q05',
    unitId: 'M1-08a',
    step: 2,
    type: 'clock',
    clockFace: { hour: 9, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['６じ', '８じ', '９じ', '１０じ'],
    correctAnswer: '９じ',
    explanation: 'みじかいはりが ９ を さしているので、９じ です。'
  },
  {
    id: 'M1-08a-Q07',
    unitId: 'M1-08a',
    step: 2,
    type: 'clock',
    clockFace: { hour: 11, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１０じ', '１１じ', '１２じ', '１じ'],
    correctAnswer: '１１じ',
    explanation: 'みじかいはりが 11 を さしているので、１１じ です。'
  },
  {
    id: 'M1-08a-Q09',
    unitId: 'M1-08a',
    step: 2,
    type: 'clock',
    clockFace: { hour: 8, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['６じ', '７じ', '８じ', '９じ'],
    correctAnswer: '８じ',
    explanation: 'みじかいはりが ８ を さしているので、８じ です。'
  },
  {
    id: 'M1-08a-Q15',
    unitId: 'M1-08a',
    step: 2,
    type: 'clock',
    clockFace: { hour: 10, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['８じ', '９じ', '１０じ', '１１じ'],
    correctAnswer: '１０じ',
    explanation: 'みじかいはりが 10 を さしているので、１０じ です。'
  },

  // =====================================================
  // Step3: しくみを りかいしよう（文章で考える）
  // =====================================================
  {
    id: 'M1-08a-Q10',
    unitId: 'M1-08a',
    step: 3,
    type: 'choice',
    question: 'みじかいはりが 12を さしているとき\nながいはりも 12を さしていたら なんじ？',
    choices: ['１２じ', '０じ', '２４じ', '６じ'],
    correctAnswer: '１２じ',
    explanation: 'みじかいはりが 12、ながいはりも 12のとき 12じです。'
  },
  {
    id: 'M1-08a-Q11',
    unitId: 'M1-08a',
    step: 3,
    type: 'choice',
    question: '６じの つぎ（1じかんご）は なんじ？',
    choices: ['５じ', '６じ', '７じ', '８じ'],
    correctAnswer: '７じ',
    explanation: '６じの 1じかんあとは ７じ です。'
  },
  {
    id: 'M1-08a-Q12',
    unitId: 'M1-08a',
    step: 3,
    type: 'choice',
    question: '１２じの つぎは なんじ？',
    choices: ['０じ', '１じ', '１３じ', '２じ'],
    correctAnswer: '１じ',
    explanation: '12じの つぎは また 1から はじまります。１じ です。'
  },
  {
    id: 'M1-08a-Q16',
    unitId: 'M1-08a',
    step: 3,
    type: 'choice',
    question: '「ちょうど」の ときは\nながいはりは どこを さしている？',
    choices: ['３', '６', '９', '１２'],
    correctAnswer: '１２',
    explanation: '「ちょうど」のとき、ながいはりは かならず 12を さしています。'
  },
  {
    id: 'M1-08a-Q17',
    unitId: 'M1-08a',
    step: 3,
    type: 'choice',
    question: '３じの 2じかんあとは なんじ？',
    choices: ['３じ', '４じ', '５じ', '６じ'],
    correctAnswer: '５じ',
    explanation: '3じから 2じかん すすむと 5じ になります。'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
