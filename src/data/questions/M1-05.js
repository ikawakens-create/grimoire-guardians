/**
 * M1-05.js - Grimoire Guardians 問題データ
 * ユニット: M1-05「たしざん（1）きほん」
 *
 * 対象: 小学1年生、10以内の足し算基礎
 * 準拠: 日本文教出版 算数1年「あわせて いくつ／ふえると いくつ」
 *
 * Step構成（シャッフル出題）
 *   Step1: かんたん たしざん（プール8問 → 3問出題）
 *   Step2: えを みて たしざん（プール8問 → 3問出題）
 *   Step3: たして 10に なる（プール7問 → 3問出題）
 *   Step4: □を もとめよう（プール8問 → 3問出題）
 *   Step5: かんたん もんだい（プール7問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かんたん たしざん（基本的な10以内の加法）
  // =====================================================
  {
    id: 'M1-05-Q01',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '2 + 3 = □\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q02',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '3 + 4 = □\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q03',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '4 + 5 = □\n□は いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-05-Q16',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '1 + 6 = □\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q17',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '5 + 3 = □\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05-Q26',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '2 + 6 = □\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05-Q27',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '4 + 3 = □\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q28',
    unitId: 'M1-05',
    step: 1,
    type: 'choice',
    question: '6 + 2 = □\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },

  // =====================================================
  // Step2: えを みて たしざん（絵を数えてたし算）
  // =====================================================
  {
    id: 'M1-05-Q04',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🍎🍎 と 🍎🍎🍎\nあわせて いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q05',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🐱🐱🐱 と 🐱🐱🐱🐱\nあわせて いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q06',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '⭐⭐⭐⭐ と ⭐⭐\nあわせて いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-05-Q18',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🍭 と 🍭🍭🍭🍭\nあわせて いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q19',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🐸🐸🐸🐸🐸 と 🐸🐸\nあわせて いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q29',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🌸🌸🌸 と 🌸🌸🌸🌸🌸🌸\nあわせて いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-05-Q30',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🐶🐶 と 🐶🐶🐶🐶🐶🐶\nあわせて いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05-Q31',
    unitId: 'M1-05',
    step: 2,
    type: 'choice',
    question: '🍓🍓🍓🍓 と 🍓🍓🍓🍓🍓\nあわせて いくつ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },

  // =====================================================
  // Step3: たして 10に なる（補数の感覚を育てる）
  // =====================================================
  {
    id: 'M1-05-Q07',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '1 + 9 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q08',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '3 + 7 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q09',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '6 + 4 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q20',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '2 + 8 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q21',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '5 + 5 = □\n□は いくつ？',
    choices: ['8', '9', '10', '7'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q32',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '4 + 6 = □\n□は いくつ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '10'
  },
  {
    id: 'M1-05-Q33',
    unitId: 'M1-05',
    step: 3,
    type: 'choice',
    question: '7 + 3 = □\n□は いくつ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '10'
  },

  // =====================================================
  // Step4: □を もとめよう（穴埋めたし算）
  // =====================================================
  {
    id: 'M1-05-Q10',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '1 + □ = 5\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05-Q11',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '3 + □ = 7\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05-Q12',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '□ + 5 = 10\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q22',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '2 + □ = 9\n□は いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q23',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '□ + 3 = 8\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q34',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '4 + □ = 9\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q35',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '□ + 6 = 10\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-05-Q36',
    unitId: 'M1-05',
    step: 4,
    type: 'choice',
    question: '□ + 2 = 7\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },

  // =====================================================
  // Step5: かんたん もんだい（簡単な文章題）
  // =====================================================
  {
    id: 'M1-05-Q13',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'ねこが 3びき います。\n2びき きました。\nぜんぶで なんびき？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-05-Q14',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'えんぴつが 4ほん あります。\n3ほん もらいました。\nぜんぶで なんぼん？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-05-Q15',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'りんごが 2こ、みかんが 4こ あります。\nあわせて なんこ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-05-Q24',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'きんぎょが 5ひき います。\n4ひき ふえました。\nぜんぶで なんびき？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-05-Q25',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'バスに 6にん のっています。\n2にん のってきました。\nぜんぶで なんにん？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M1-05-Q37',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'いけに かめが 3びき います。\n6びき きました。\nぜんぶで なんびき？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
  },
  {
    id: 'M1-05-Q38',
    unitId: 'M1-05',
    step: 5,
    type: 'choice',
    question: 'あかい はなが 5ほん、\nきいろい はなが 4ほん あります。\nあわせて なんぼん？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '9'
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
