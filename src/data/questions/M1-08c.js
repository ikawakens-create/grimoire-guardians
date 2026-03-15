/**
 * M1-08c.js - Grimoire Guardians 問題データ
 * ユニット: M1-08c「５ふんたんいに ちょうせん！」
 *
 * 対象: 小学1年生（先取り）〜2年生、5分単位の時刻読み
 * 準拠: 日本文教出版 算数1年・2年
 *
 * Step構成（シャッフル出題）
 *   Step1: ながいはりと ふんすう（プール8問 → 5問出題）
 *   Step2: 時計を よもう（プール10問 → 5問出題）
 *   Step3: まとめ・確認（プール8問 → 5問出題）
 *
 * 【時計の読み方ポイント】
 *   ながいはり（分針）が さす かずに 5を かけた ものが ふんすう
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: ながいはりと ふんすう（準備問題8問）
  // =====================================================
  {
    id: 'M1-08c-Q01',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'とけいの よみかた：\nながいはりが さす かずを 5、10、15… と 5ずつ かぞえると ふんすうが わかります。\n\nながいはりが 1を さしているとき、なんぷん？',
    choices: ['１ふん', '２ふん', '５ふん', '１０ふん'],
    correctAnswer: '５ふん',
    explanation: '5ずつ かぞえて 1こめは 5ふんです。'
  },
  {
    id: 'M1-08c-Q02',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 2を さしているとき、なんぷん？\n（ヒント：5、10 と かぞえよう）',
    choices: ['５ふん', '１０ふん', '１５ふん', '２０ふん'],
    correctAnswer: '１０ふん',
    explanation: '5ずつ かぞえて 2こめは 10ふんです。'
  },
  {
    id: 'M1-08c-Q03',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 3を さしているとき、なんぷん？\n（ヒント：5、10、15 と かぞえよう）',
    choices: ['１０ふん', '１５ふん', '２０ふん', '３０ふん'],
    correctAnswer: '１５ふん',
    explanation: '5ずつ かぞえて 3こめは 15ふんです。'
  },
  {
    id: 'M1-08c-Q04',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 9を さしているとき、なんぷん？\n（ヒント：5、10…40、45 と かぞえよう）',
    choices: ['３０ふん', '４０ふん', '４５ふん', '５０ふん'],
    correctAnswer: '４５ふん',
    explanation: '5ずつ かぞえて 9こめは 45ふんです。'
  },
  {
    id: 'M1-08c-Q05',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 4を さしているとき、なんぷん？\n（ヒント：5、10、15、20 と かぞえよう）',
    choices: ['１５ふん', '２０ふん', '２５ふん', '３０ふん'],
    correctAnswer: '２０ふん',
    explanation: '5ずつ かぞえて 4こめは 20ふんです。'
  },
  {
    id: 'M1-08c-Q18',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 5を さしているとき、なんぷん？\n（ヒント：5、10、15、20、25 と かぞえよう）',
    choices: ['２０ふん', '２５ふん', '３０ふん', '３５ふん'],
    correctAnswer: '２５ふん',
    explanation: '5ずつ かぞえて 5こめは 25ふんです。'
  },
  {
    id: 'M1-08c-Q19',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 10を さしているとき、なんぷん？\n（ヒント：5ずつ 10かいめを かぞえよう）',
    choices: ['４５ふん', '５０ふん', '５５ふん', '６０ふん'],
    correctAnswer: '５０ふん',
    explanation: '5ずつ かぞえて 10こめは 50ふんです。'
  },
  {
    id: 'M1-08c-Q20',
    unitId: 'M1-08c',
    step: 1,
    type: 'choice',
    question: 'ながいはりが 11を さしているとき、なんぷん？\n（ヒント：5ずつ 11かいめを かぞえよう）',
    choices: ['５０ふん', '５５ふん', '６０ふん', '４５ふん'],
    correctAnswer: '５５ふん',
    explanation: '5ずつ かぞえて 11こめは 55ふんです。'
  },

  // =====================================================
  // Step2: 時計を みて「なんじ なんぷん？」（SVG時計10問）
  // =====================================================
  {
    id: 'M1-08c-Q06',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 2, minute: 10 },
    question: 'なんじ なんぷん ですか？\n（ながいはりは どの かずを さしている？ 5ずつ かぞえよう）',
    choices: ['２じ５ふん', '２じ１０ふん', '２じ１５ふん', '３じ１０ふん'],
    correctAnswer: '２じ１０ふん',
    explanation: 'みじかいはり→2じ。ながいはりは 2→10ふん。2じ10ふん です。'
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
    explanation: 'みじかいはり→3じ。ながいはりは 3→15ふん。3じ15ふん です。'
  },
  {
    id: 'M1-08c-Q08',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 1, minute: 30 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１じ２０ふん', '１じ３０ふん', '１じ２５ふん', '２じ３０ふん'],
    correctAnswer: '１じ３０ふん',
    explanation: 'みじかいはり→1じ。ながいはりは 6→30ふん。1じ30ふん です。'
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
    explanation: 'みじかいはり→5じ。ながいはりは 9→45ふん。5じ45ふん です。'
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
    explanation: 'みじかいはり→8じ。ながいはりは 4→20ふん。8じ20ふん です。'
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
    explanation: 'みじかいはり→11じ。ながいはりは 10→50ふん。11じ50ふん です。'
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
    explanation: 'みじかいはり→4じ。ながいはりは 5→25ふん。4じ25ふん です。'
  },
  {
    id: 'M1-08c-Q21',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 10, minute: 5 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１０じ０ふん', '１０じ５ふん', '１０じ１０ふん', '１１じ５ふん'],
    correctAnswer: '１０じ５ふん',
    explanation: 'みじかいはり→10じ。ながいはりは 1→5ふん。10じ5ふん です。'
  },
  {
    id: 'M1-08c-Q22',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 3, minute: 50 },
    question: 'なんじ なんぷん ですか？',
    choices: ['３じ４５ふん', '３じ５０ふん', '３じ５５ふん', '４じ５０ふん'],
    correctAnswer: '３じ５０ふん',
    explanation: 'みじかいはり→3じ。ながいはりは 10→50ふん。3じ50ふん です。'
  },
  {
    id: 'M1-08c-Q23',
    unitId: 'M1-08c',
    step: 2,
    type: 'clock',
    clockFace: { hour: 7, minute: 20 },
    question: 'なんじ なんぷん ですか？',
    choices: ['７じ１５ふん', '７じ２０ふん', '７じ２５ふん', '８じ２０ふん'],
    correctAnswer: '７じ２０ふん',
    explanation: 'みじかいはり→7じ。ながいはりは 4→20ふん。7じ20ふん です。'
  },

  // =====================================================
  // Step3: まとめ・確認（難しめの時刻8問）
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
    explanation: 'みじかいはり→7じ。ながいはりは 7→35ふん。7じ35ふん です。'
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
    explanation: 'みじかいはり→9じ。ながいはりは 1→5ふん。9じ5ふん です。'
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
    explanation: 'みじかいはり→12じ。ながいはりは 11→55ふん。12じ55ふん です。'
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
    explanation: 'みじかいはり→6じ。ながいはりは 8→40ふん。6じ40ふん です。'
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
    explanation: 'みじかいはり→10じ。ながいはりは 11→55ふん。10じ55ふん です。'
  },
  {
    id: 'M1-08c-Q24',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 1, minute: 40 },
    question: 'なんじ なんぷん ですか？',
    choices: ['１じ３５ふん', '１じ４０ふん', '１じ４５ふん', '２じ４０ふん'],
    correctAnswer: '１じ４０ふん',
    explanation: 'みじかいはり→1じ。ながいはりは 8→40ふん。1じ40ふん です。'
  },
  {
    id: 'M1-08c-Q25',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 5, minute: 15 },
    question: 'なんじ なんぷん ですか？',
    choices: ['５じ１０ふん', '５じ１５ふん', '５じ２０ふん', '６じ１５ふん'],
    correctAnswer: '５じ１５ふん',
    explanation: 'みじかいはり→5じ。ながいはりは 3→15ふん。5じ15ふん です。'
  },
  {
    id: 'M1-08c-Q26',
    unitId: 'M1-08c',
    step: 3,
    type: 'clock',
    clockFace: { hour: 2, minute: 35 },
    question: 'なんじ なんぷん ですか？',
    choices: ['２じ３０ふん', '２じ３５ふん', '２じ４０ふん', '３じ３５ふん'],
    correctAnswer: '２じ３５ふん',
    explanation: 'みじかいはり→2じ。ながいはりは 7→35ふん。2じ35ふん です。'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
