/**
 * M1-09.js - Grimoire Guardians 問題データ
 * ユニット: M1-09「さくらんぼ算のひみつ」
 *
 * 対象: 小学1年生、くりあがりのための補数・分解
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: 「10に する」れんしゅう（プール8問 → 3問出題）
 *   Step2: 「わける」れんしゅう（プール8問 → 3問出題）
 *   Step3: さくらんぼ算で たしざん（プール8問 → 3問出題）
 *   Step4: 分解のバリエーション（プール7問 → 3問出題）
 *   Step5: まとめ・おうよう（プール7問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 「10に する」れんしゅう
  // =====================================================
  {
    id: 'M1-09-Q01',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '9に いくつ たすと 10に なる？\n9 + □ = 10',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '１',
    explanation: '9 + 1 = 10 です。'
  },
  {
    id: 'M1-09-Q02',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '8に いくつ たすと 10に なる？\n8 + □ = 10',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '8 + 2 = 10 です。'
  },
  {
    id: 'M1-09-Q03',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '7に いくつ たすと 10に なる？\n7 + □ = 10',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '３',
    explanation: '7 + 3 = 10 です。'
  },
  {
    id: 'M1-09-Q16',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '5に いくつ たすと 10に なる？\n5 + □ = 10',
    choices: ['３', '４', '５', '６'],
    correctAnswer: '５',
    explanation: '5 + 5 = 10 です。'
  },
  {
    id: 'M1-09-Q17',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '4に いくつ たすと 10に なる？\n4 + □ = 10',
    choices: ['４', '５', '６', '７'],
    correctAnswer: '６',
    explanation: '4 + 6 = 10 です。'
  },
  {
    id: 'M1-09-Q26',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '6に いくつ たすと 10に なる？\n6 + □ = 10',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '6 + 4 = 10 です。'
  },
  {
    id: 'M1-09-Q27',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '2に いくつ たすと 10に なる？\n2 + □ = 10',
    choices: ['６', '７', '８', '９'],
    correctAnswer: '８',
    explanation: '2 + 8 = 10 です。'
  },
  {
    id: 'M1-09-Q28',
    unitId: 'M1-09',
    step: 1,
    type: 'choice',
    question: '1に いくつ たすと 10に なる？\n1 + □ = 10',
    choices: ['７', '８', '９', '１０'],
    correctAnswer: '９',
    explanation: '1 + 9 = 10 です。'
  },

  // =====================================================
  // Step2: 「わける」れんしゅう
  // =====================================================
  {
    id: 'M1-09-Q04',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '3を 1と □に わけよう\n3 → 1 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '3は 1と2に わけられます。'
  },
  {
    id: 'M1-09-Q05',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '4を 2と □に わけよう\n4 → 2 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '4は 2と2に わけられます。'
  },
  {
    id: 'M1-09-Q06',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '5を 3と □に わけよう\n5 → 3 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '5は 3と2に わけられます。'
  },
  {
    id: 'M1-09-Q18',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '6を 4と □に わけよう\n6 → 4 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '6は 4と2に わけられます。'
  },
  {
    id: 'M1-09-Q19',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '5を 2と □に わけよう\n5 → 2 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '３',
    explanation: '5は 2と3に わけられます。'
  },
  {
    id: 'M1-09-Q29',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '4を 1と □に わけよう\n4 → 1 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '３',
    explanation: '4は 1と3に わけられます。'
  },
  {
    id: 'M1-09-Q30',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '6を 2と □に わけよう\n6 → 2 と □',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '6は 2と4に わけられます。'
  },
  {
    id: 'M1-09-Q31',
    unitId: 'M1-09',
    step: 2,
    type: 'choice',
    question: '7を 4と □に わけよう\n7 → 4 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '３',
    explanation: '7は 4と3に わけられます。'
  },

  // =====================================================
  // Step3: さくらんぼ算で たしざん
  // =====================================================
  {
    id: 'M1-09-Q07',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n9 + 2 = ？\n（9に 1たすと10、2を「1と1」に わける）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '9 + 1 = 10、10 + 1 = 11。答えは 11です！'
  },
  {
    id: 'M1-09-Q08',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n8 + 3 = ？\n（8に 2たすと10、3を「2と1」に わける）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '8 + 2 = 10、10 + 1 = 11。答えは 11です！'
  },
  {
    id: 'M1-09-Q09',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n9 + 3 = ？\n（9に 1たすと10、3を「1と2」に わける）',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '9 + 1 = 10、10 + 2 = 12。答えは 12です！'
  },
  {
    id: 'M1-09-Q20',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n7 + 5 = ？\n（7に 3たすと10、5を「3と2」に わける）',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '7 + 3 = 10、10 + 2 = 12。答えは 12です！'
  },
  {
    id: 'M1-09-Q21',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n6 + 5 = ？\n（6に 4たすと10、5を「4と1」に わける）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '6 + 4 = 10、10 + 1 = 11。答えは 11です！'
  },
  {
    id: 'M1-09-Q32',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n8 + 6 = ？\n（8に 2たすと10、6を「2と4」に わける）',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１４',
    explanation: '8 + 2 = 10、10 + 4 = 14。答えは 14です！'
  },
  {
    id: 'M1-09-Q33',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n9 + 5 = ？\n（9に 1たすと10、5を「1と4」に わける）',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１４',
    explanation: '9 + 1 = 10、10 + 4 = 14。答えは 14です！'
  },
  {
    id: 'M1-09-Q34',
    unitId: 'M1-09',
    step: 3,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n7 + 6 = ？\n（7に 3たすと10、6を「3と3」に わける）',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１３',
    explanation: '7 + 3 = 10、10 + 3 = 13。答えは 13です！'
  },

  // =====================================================
  // Step4: 分解のバリエーション
  // =====================================================
  {
    id: 'M1-09-Q10',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '6に いくつ たすと 10に なる？\n6 + □ = 10',
    choices: ['３', '４', '５', '６'],
    correctAnswer: '４',
    explanation: '6 + 4 = 10 です。'
  },
  {
    id: 'M1-09-Q11',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '7を 3と □に わけよう\n7 → 3 と □',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '7は 3と4に わけられます。'
  },
  {
    id: 'M1-09-Q12',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '8を 6と □に わけよう\n8 → 6 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '8は 6と2に わけられます。'
  },
  {
    id: 'M1-09-Q22',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '9を 5と □に わけよう\n9 → 5 と □',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '9は 5と4に わけられます。'
  },
  {
    id: 'M1-09-Q23',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '3に いくつ たすと 10に なる？\n3 + □ = 10',
    choices: ['５', '６', '７', '８'],
    correctAnswer: '７',
    explanation: '3 + 7 = 10 です。'
  },
  {
    id: 'M1-09-Q35',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '8を 3と □に わけよう\n8 → 3 と □',
    choices: ['３', '４', '５', '６'],
    correctAnswer: '５',
    explanation: '8は 3と5に わけられます。'
  },
  {
    id: 'M1-09-Q36',
    unitId: 'M1-09',
    step: 4,
    type: 'choice',
    question: '9を 2と □に わけよう\n9 → 2 と □',
    choices: ['５', '６', '７', '８'],
    correctAnswer: '７',
    explanation: '9は 2と7に わけられます。'
  },

  // =====================================================
  // Step5: まとめ・さくらんぼ算のおうよう
  // =====================================================
  {
    id: 'M1-09-Q13',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n9 + 4 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '9 + 1 = 10、4を「1と3」に わけて、10 + 3 = 13。答えは 13です！'
  },
  {
    id: 'M1-09-Q14',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n8 + 5 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '8 + 2 = 10、5を「2と3」に わけて、10 + 3 = 13。答えは 13です！'
  },
  {
    id: 'M1-09-Q15',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n7 + 4 = ？',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '7 + 3 = 10、4を「3と1」に わけて、10 + 1 = 11。答えは 11です！'
  },
  {
    id: 'M1-09-Q24',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n6 + 7 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '6 + 4 = 10、7を「4と3」に わけて、10 + 3 = 13。答えは 13です！'
  },
  {
    id: 'M1-09-Q25',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n8 + 7 = ？',
    choices: ['１３', '１４', '１５', '１６'],
    correctAnswer: '１５',
    explanation: '8 + 2 = 10、7を「2と5」に わけて、10 + 5 = 15。答えは 15です！'
  },
  {
    id: 'M1-09-Q37',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n9 + 8 = ？',
    choices: ['１５', '１６', '１７', '１８'],
    correctAnswer: '１７',
    explanation: '9 + 1 = 10、8を「1と7」に わけて、10 + 7 = 17。答えは 17です！'
  },
  {
    id: 'M1-09-Q38',
    unitId: 'M1-09',
    step: 5,
    type: 'choice',
    question: 'さくらんぼ算で かんがえよう！\n6 + 8 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１４',
    explanation: '6 + 4 = 10、8を「4と4」に わけて、10 + 4 = 14。答えは 14です！'
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
