/**
 * M1-08b.js - Grimoire Guardians 問題データ
 * ユニット: M1-08b「なんじはん」
 *
 * 対象: 小学1年生、アナログ時計の読み方（〇時半）
 * 準拠: 日本文教出版 算数1年
 *
 * カテゴリ構成（15問）
 *   A: 時計を みて「なんじはん？」（Q1〜Q6）
 *      - type: 'clock', minute: 30
 *   B: 「なんじ？」か「なんじはん？」か判別（Q7〜Q9）
 *      - ちょうど と はん が混在するSVG時計
 *   C: はんの しくみを りかいしよう（Q10〜Q12）
 *      - type: 'choice' で文章で考える
 *   D: 確認問題（Q13〜Q15）
 *      - type: 'clock', minute: 30
 *
 * 【時計の読み方ポイント】
 *   ながいはり（分針）が ６ を さすとき → 「はん」（30ぷん）
 *   みじかいはりは ちょうどと はんの あいだに ある
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // カテゴリA: 時計を みて「なんじはん？」（基本6問）
  // =====================================================
  {
    id: 'M1-08b-Q01',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 1, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１じ', '１じはん', '２じ', '２じはん'],
    correctAnswer: '１じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 1と2の あいだなので 1じはん です。'
  },
  {
    id: 'M1-08b-Q02',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 3, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['２じはん', '３じ', '３じはん', '４じ'],
    correctAnswer: '３じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 3と4の あいだなので 3じはん です。'
  },
  {
    id: 'M1-08b-Q03',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 6, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['５じはん', '６じ', '６じはん', '７じ'],
    correctAnswer: '６じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 6と7の あいだなので 6じはん です。'
  },
  {
    id: 'M1-08b-Q04',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 9, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['８じはん', '９じ', '９じはん', '１０じ'],
    correctAnswer: '９じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 9と10の あいだなので 9じはん です。'
  },
  {
    id: 'M1-08b-Q05',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 11, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１０じはん', '１１じ', '１１じはん', '１２じ'],
    correctAnswer: '１１じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 11と12の あいだなので 11じはん です。'
  },
  {
    id: 'M1-08b-Q06',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 5, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['４じはん', '５じ', '５じはん', '６じ'],
    correctAnswer: '５じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 5と6の あいだなので 5じはん です。'
  },

  // =====================================================
  // カテゴリB: 「なんじ？」か「なんじはん？」か判別（混在）
  // ちょうど と はん を区別する力をつける
  // =====================================================
  {
    id: 'M1-08b-Q07',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 4, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['３じはん', '４じ', '４じはん', '５じ'],
    correctAnswer: '４じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。みじかいはりが ４ なので 4じ です。'
  },
  {
    id: 'M1-08b-Q08',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 7, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['６じはん', '７じ', '７じはん', '８じ'],
    correctAnswer: '７じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。みじかいはりは 7と8の あいだなので 7じはん です。'
  },
  {
    id: 'M1-08b-Q09',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 2, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１じはん', '２じ', '２じはん', '３じ'],
    correctAnswer: '２じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。みじかいはりが ２ なので 2じ です。'
  },

  // =====================================================
  // カテゴリC: はんの しくみを りかいしよう
  // 「はん」の意味・ながいはりと６の関係を理解する
  // =====================================================
  {
    id: 'M1-08b-Q10',
    unitId: 'M1-08b',
    type: 'choice',
    question: '「はん」は なんぷんの こと？',
    choices: ['１５ふん', '２０ふん', '３０ふん', '４５ふん'],
    correctAnswer: '３０ふん',
    explanation: '「はん」は 30ぷんの こと です。じかんを はんぶんにした かずですね。'
  },
  {
    id: 'M1-08b-Q11',
    unitId: 'M1-08b',
    type: 'choice',
    question: 'ながいはりが ６を さしているとき\nそれは なんぷんの とき？',
    choices: ['０ふん（ちょうど）', '１５ふん', '３０ふん（はん）', '４５ふん'],
    correctAnswer: '３０ふん（はん）',
    explanation: 'ながいはりが 6 をさしているとき、30ぷん（はん）です。'
  },
  {
    id: 'M1-08b-Q12',
    unitId: 'M1-08b',
    type: 'choice',
    question: '２じはんの 1じかんあとは なんじ？',
    choices: ['２じ', '２じはん', '３じ', '３じはん'],
    correctAnswer: '３じはん',
    explanation: '2じはんの 1じかんあとは 3じはん です。みじかいはりが 1つ すすみます。'
  },

  // =====================================================
  // カテゴリD: 確認問題（まとめ）
  // =====================================================
  {
    id: 'M1-08b-Q13',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 8, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['７じはん', '８じ', '８じはん', '９じ'],
    correctAnswer: '８じはん',
    explanation: 'ながいはりが ６ → はん。みじかいはりは 8と9の あいだなので 8じはん です。'
  },
  {
    id: 'M1-08b-Q14',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 12, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１１じはん', '１２じ', '１２じはん', '１じ'],
    correctAnswer: '１２じはん',
    explanation: 'ながいはりが ６ → はん。みじかいはりは 12と1の あいだなので 12じはん です。'
  },
  {
    id: 'M1-08b-Q15',
    unitId: 'M1-08b',
    type: 'clock',
    clockFace: { hour: 4, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['３じはん', '４じ', '４じはん', '５じはん'],
    correctAnswer: '４じはん',
    explanation: 'ながいはりが ６ → はん。みじかいはりは 4と5の あいだなので 4じはん です。'
  }
];

export default questions;
