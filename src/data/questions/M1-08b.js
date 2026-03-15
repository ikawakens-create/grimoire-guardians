/**
 * M1-08b.js - Grimoire Guardians 問題データ
 * ユニット: M1-08b「なんじはん」
 *
 * 対象: 小学1年生、アナログ時計の読み方（〇時半）
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: なんじはん？（プール9問 → 5問出題）
 *   Step2: ちょうど か はん か 判別（プール8問 → 5問出題）
 *   Step3: しくみ + 確認（プール9問 → 5問出題）
 *
 * 【時計の読み方ポイント】
 *   ながいはり（分針）が ６ を さすとき → 「はん」（30ぷん）
 *   みじかいはりは ちょうどと はんの あいだに ある
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: なんじはん？（基本9問）
  // =====================================================
  {
    id: 'M1-08b-Q01',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 1, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１じ', '１じはん', '２じ', '２じはん'],
    correctAnswer: '１じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。１じはん です。'
  },
  {
    id: 'M1-08b-Q02',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 3, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['２じはん', '３じ', '３じはん', '４じ'],
    correctAnswer: '３じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。３じはん です。'
  },
  {
    id: 'M1-08b-Q03',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 6, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['５じはん', '６じ', '６じはん', '７じ'],
    correctAnswer: '６じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。６じはん です。'
  },
  {
    id: 'M1-08b-Q04',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 9, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['８じはん', '９じ', '９じはん', '１０じ'],
    correctAnswer: '９じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。９じはん です。'
  },
  {
    id: 'M1-08b-Q05',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 11, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１０じはん', '１１じ', '１１じはん', '１２じ'],
    correctAnswer: '１１じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。１１じはん です。'
  },
  {
    id: 'M1-08b-Q06',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 5, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['４じはん', '５じ', '５じはん', '６じ'],
    correctAnswer: '５じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。５じはん です。'
  },
  {
    id: 'M1-08b-Q18',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 2, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１じはん', '２じ', '２じはん', '３じ'],
    correctAnswer: '２じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。２じはん です。'
  },
  {
    id: 'M1-08b-Q19',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 4, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['３じはん', '４じ', '４じはん', '５じ'],
    correctAnswer: '４じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。４じはん です。'
  },
  {
    id: 'M1-08b-Q20',
    unitId: 'M1-08b',
    step: 1,
    type: 'clock',
    clockFace: { hour: 12, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１１じはん', '１２じ', '１２じはん', '１じ'],
    correctAnswer: '１２じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。１２じはん です。'
  },

  // =====================================================
  // Step2: ちょうど か はん か 判別（混在8問）
  // =====================================================
  {
    id: 'M1-08b-Q07',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 4, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['３じはん', '４じ', '４じはん', '５じ'],
    correctAnswer: '４じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。４じ です。'
  },
  {
    id: 'M1-08b-Q08',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 7, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['６じはん', '７じ', '７じはん', '８じ'],
    correctAnswer: '７じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。７じはん です。'
  },
  {
    id: 'M1-08b-Q09',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 2, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１じはん', '２じ', '２じはん', '３じ'],
    correctAnswer: '２じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。２じ です。'
  },
  {
    id: 'M1-08b-Q16',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 10, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['９じはん', '１０じ', '１０じはん', '１１じ'],
    correctAnswer: '１０じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。１０じはん です。'
  },
  {
    id: 'M1-08b-Q17',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 12, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['１１じはん', '１２じ', '１２じはん', '１じ'],
    correctAnswer: '１２じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。１２じ です。'
  },
  {
    id: 'M1-08b-Q21',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 8, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['７じはん', '８じ', '８じはん', '９じ'],
    correctAnswer: '８じはん',
    explanation: 'ながいはりが ６ をさしているので「はん」です。８じはん です。'
  },
  {
    id: 'M1-08b-Q22',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 3, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['２じはん', '３じ', '３じはん', '４じ'],
    correctAnswer: '３じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。３じ です。'
  },
  {
    id: 'M1-08b-Q23',
    unitId: 'M1-08b',
    step: 2,
    type: 'clock',
    clockFace: { hour: 6, minute: 0 },
    question: 'なんじ ですか？',
    choices: ['５じはん', '６じ', '６じはん', '７じ'],
    correctAnswer: '６じ',
    explanation: 'ながいはりが 12 をさしているので「ちょうど」です。６じ です。'
  },

  // =====================================================
  // Step3: しくみを りかいしよう + 確認問題（9問）
  // =====================================================
  {
    id: 'M1-08b-Q10',
    unitId: 'M1-08b',
    step: 3,
    type: 'choice',
    question: '「はん」は なんぷんの こと？',
    choices: ['１５ふん', '２０ふん', '３０ふん', '４５ふん'],
    correctAnswer: '３０ふん',
    explanation: '「はん」は 30ぷんの こと です。'
  },
  {
    id: 'M1-08b-Q11',
    unitId: 'M1-08b',
    step: 3,
    type: 'choice',
    question: 'ながいはりが ６を さしているとき\nそれは なんぷんの とき？',
    choices: ['０ふん（ちょうど）', '１５ふん', '３０ふん（はん）', '４５ふん'],
    correctAnswer: '３０ふん（はん）',
    explanation: 'ながいはりが 6 をさしているとき、30ぷん（はん）です。'
  },
  {
    id: 'M1-08b-Q12',
    unitId: 'M1-08b',
    step: 3,
    type: 'choice',
    question: '２じはんの 1じかんあとは なんじ？',
    choices: ['２じ', '２じはん', '３じ', '３じはん'],
    correctAnswer: '３じはん',
    explanation: '2じはんの 1じかんあとは 3じはん です。'
  },
  {
    id: 'M1-08b-Q13',
    unitId: 'M1-08b',
    step: 3,
    type: 'clock',
    clockFace: { hour: 8, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['７じはん', '８じ', '８じはん', '９じ'],
    correctAnswer: '８じはん',
    explanation: 'ながいはりが ６ → はん。８じはん です。'
  },
  {
    id: 'M1-08b-Q14',
    unitId: 'M1-08b',
    step: 3,
    type: 'clock',
    clockFace: { hour: 12, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['１１じはん', '１２じ', '１２じはん', '１じ'],
    correctAnswer: '１２じはん',
    explanation: 'ながいはりが ６ → はん。１２じはん です。'
  },
  {
    id: 'M1-08b-Q15',
    unitId: 'M1-08b',
    step: 3,
    type: 'clock',
    clockFace: { hour: 4, minute: 30 },
    question: 'なんじ なんじはん ですか？',
    choices: ['３じはん', '４じ', '４じはん', '５じはん'],
    correctAnswer: '４じはん',
    explanation: 'ながいはりが ６ → はん。４じはん です。'
  },
  {
    id: 'M1-08b-Q24',
    unitId: 'M1-08b',
    step: 3,
    type: 'choice',
    question: '５じはんの 1じかんまえは なんじ？',
    choices: ['４じ', '４じはん', '５じ', '６じはん'],
    correctAnswer: '４じはん',
    explanation: '5じはんの 1じかんまえは 4じはん です。'
  },
  {
    id: 'M1-08b-Q25',
    unitId: 'M1-08b',
    step: 3,
    type: 'choice',
    question: 'ながいはりが 12を さしているとき\nそれは なんぷんの とき？',
    choices: ['０ふん（ちょうど）', '１５ふん', '３０ふん（はん）', '６０ふん'],
    correctAnswer: '０ふん（ちょうど）',
    explanation: 'ながいはりが 12 をさしているとき、0ぷん（ちょうど）です。'
  },
  {
    id: 'M1-08b-Q26',
    unitId: 'M1-08b',
    step: 3,
    type: 'choice',
    question: '９じはんの 2じかんあとは なんじ？',
    choices: ['１０じはん', '１１じ', '１１じはん', '１２じ'],
    correctAnswer: '１１じはん',
    explanation: '9じはんから 2じかん すすむと 11じはん になります。'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
