/**
 * M1-07.js - Grimoire Guardians 問題データ
 * ユニット: M1-07「20までの かず」
 *
 * 対象: 小学1年生、11〜20の数の認識
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: 11〜15を かぞえよう（プール5問 → 3問出題）
 *   Step2: 16〜20を かぞえよう（プール5問 → 3問出題）
 *   Step3: おおきい・ちいさい（プール5問 → 3問出題）
 *   Step4: じゅんばんに ならべよう（プール5問 → 3問出題）
 *   Step5: 10の まとまり（プール5問 → 3問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 11〜15を かぞえよう
  // =====================================================
  {
    id: 'M1-07-Q01',
    unitId: 'M1-07',
    step: 1,
    type: 'choice',
    question: '🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓\nいちごは いくつ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '11',
    explanation: 'いちごを かぞえると 11こ ありますね。'
  },
  {
    id: 'M1-07-Q02',
    unitId: 'M1-07',
    step: 1,
    type: 'choice',
    question: '🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟\nほしは いくつ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '13',
    explanation: 'ほしを かぞえると 13こ ありますね。'
  },
  {
    id: 'M1-07-Q03',
    unitId: 'M1-07',
    step: 1,
    type: 'choice',
    question: '🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣🐣\nひよこは いくつ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '15',
    explanation: 'ひよこを かぞえると 15こ ありますね。'
  },
  {
    id: 'M1-07-Q16',
    unitId: 'M1-07',
    step: 1,
    type: 'choice',
    question: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎\nりんごは いくつ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '12',
    explanation: 'りんごを かぞえると 12こ ありますね。'
  },
  {
    id: 'M1-07-Q17',
    unitId: 'M1-07',
    step: 1,
    type: 'choice',
    question: '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐\nほしは いくつ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '14',
    explanation: 'ほしを かぞえると 14こ ありますね。'
  },

  // =====================================================
  // Step2: 16〜20を かぞえよう
  // =====================================================
  {
    id: 'M1-07-Q04',
    unitId: 'M1-07',
    step: 2,
    type: 'choice',
    question: '🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐🫐\nブルーベリーは いくつ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '16',
    explanation: 'ブルーベリーを かぞえると 16こ ありますね。'
  },
  {
    id: 'M1-07-Q05',
    unitId: 'M1-07',
    step: 2,
    type: 'choice',
    question: '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈\nにじは いくつ？',
    choices: ['16', '17', '18', '19'],
    correctAnswer: '18',
    explanation: 'にじを かぞえると 18こ ありますね。'
  },
  {
    id: 'M1-07-Q06',
    unitId: 'M1-07',
    step: 2,
    type: 'choice',
    question: '🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸\nはなは いくつ？',
    choices: ['18', '19', '20', '21'],
    correctAnswer: '20',
    explanation: 'はなを かぞえると 20こ ありますね。'
  },
  {
    id: 'M1-07-Q18',
    unitId: 'M1-07',
    step: 2,
    type: 'choice',
    question: '🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸🐸\nかえるは いくつ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '17',
    explanation: 'かえるを かぞえると 17こ ありますね。'
  },
  {
    id: 'M1-07-Q19',
    unitId: 'M1-07',
    step: 2,
    type: 'choice',
    question: '🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭\nあめは いくつ？',
    choices: ['17', '18', '19', '20'],
    correctAnswer: '19',
    explanation: 'あめを かぞえると 19こ ありますね。'
  },

  // =====================================================
  // Step3: おおきい・ちいさい（11〜20の大小比較）
  // =====================================================
  {
    id: 'M1-07-Q07',
    unitId: 'M1-07',
    step: 3,
    type: 'choice',
    question: '13 と 17\nどちらが おおきい？',
    choices: ['13', '15', '17', '20'],
    correctAnswer: '17',
    explanation: '13より 17の ほうが おおきいですね。'
  },
  {
    id: 'M1-07-Q08',
    unitId: 'M1-07',
    step: 3,
    type: 'choice',
    question: '19 と 15\nどちらが ちいさい？',
    choices: ['15', '17', '19', '20'],
    correctAnswer: '15',
    explanation: '19より 15の ほうが ちいさいですね。'
  },
  {
    id: 'M1-07-Q09',
    unitId: 'M1-07',
    step: 3,
    type: 'choice',
    question: '12・18・15\nいちばん おおきい かずは？',
    choices: ['12', '15', '18', '20'],
    correctAnswer: '18',
    explanation: '12・15・18の なかで、18が いちばん おおきいです。'
  },
  {
    id: 'M1-07-Q20',
    unitId: 'M1-07',
    step: 3,
    type: 'choice',
    question: '11・16・14\nいちばん ちいさい かずは？',
    choices: ['11', '14', '16', '20'],
    correctAnswer: '11',
    explanation: '11・14・16の なかで、11が いちばん ちいさいです。'
  },
  {
    id: 'M1-07-Q21',
    unitId: 'M1-07',
    step: 3,
    type: 'choice',
    question: '20 と 11\nどちらが おおきい？',
    choices: ['11', '15', '20', '17'],
    correctAnswer: '20',
    explanation: '20の ほうが 11より おおきいですね。'
  },

  // =====================================================
  // Step4: じゅんばんに ならべよう（数列の穴埋め）
  // =====================================================
  {
    id: 'M1-07-Q10',
    unitId: 'M1-07',
    step: 4,
    type: 'choice',
    question: '14, 15, □, 17\n□に はいる かずは？',
    choices: ['13', '15', '16', '18'],
    correctAnswer: '16',
    explanation: '1ずつ ふえているので、□は 16ですね。'
  },
  {
    id: 'M1-07-Q11',
    unitId: 'M1-07',
    step: 4,
    type: 'choice',
    question: '11, □, 13, 14\n□に はいる かずは？',
    choices: ['10', '12', '14', '15'],
    correctAnswer: '12',
    explanation: '1ずつ ふえているので、□は 12ですね。'
  },
  {
    id: 'M1-07-Q12',
    unitId: 'M1-07',
    step: 4,
    type: 'choice',
    question: '17, 18, 19, □\nつぎの かずは？',
    choices: ['18', '19', '20', '21'],
    correctAnswer: '20',
    explanation: '1ずつ ふえているので、つぎは 20ですね。'
  },
  {
    id: 'M1-07-Q22',
    unitId: 'M1-07',
    step: 4,
    type: 'choice',
    question: '□, 13, 14, 15\n□に はいる かずは？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '12',
    explanation: '1ずつ ふえているので、□は 12ですね。'
  },
  {
    id: 'M1-07-Q23',
    unitId: 'M1-07',
    step: 4,
    type: 'choice',
    question: '16, 17, □, 19\n□に はいる かずは？',
    choices: ['15', '17', '18', '20'],
    correctAnswer: '18',
    explanation: '1ずつ ふえているので、□は 18ですね。'
  },

  // =====================================================
  // Step5: 10の まとまり（十の位・一の位の理解）
  // =====================================================
  {
    id: 'M1-07-Q13',
    unitId: 'M1-07',
    step: 5,
    type: 'choice',
    question: '10と 4を あわせると？',
    choices: ['13', '14', '15', '40'],
    correctAnswer: '14',
    explanation: '10と4を あわせると 14です。'
  },
  {
    id: 'M1-07-Q14',
    unitId: 'M1-07',
    step: 5,
    type: 'choice',
    question: '10と 8を あわせると？',
    choices: ['16', '17', '18', '19'],
    correctAnswer: '18',
    explanation: '10と8を あわせると 18です。'
  },
  {
    id: 'M1-07-Q15',
    unitId: 'M1-07',
    step: 5,
    type: 'choice',
    question: '16は 10と いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6',
    explanation: '16は 10と6で できています。'
  },
  {
    id: 'M1-07-Q24',
    unitId: 'M1-07',
    step: 5,
    type: 'choice',
    question: '10と 7を あわせると？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '17',
    explanation: '10と7を あわせると 17です。'
  },
  {
    id: 'M1-07-Q25',
    unitId: 'M1-07',
    step: 5,
    type: 'choice',
    question: '19は 10と いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '19は 10と9で できています。'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 3 },
  { step: 3, pick: 3 },
  { step: 4, pick: 3 },
  { step: 5, pick: 3 }
];

export default questions;
