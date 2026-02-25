/**
 * M1-10a.js - Grimoire Guardians 問題データ
 * ユニット: M1-10a「くりあがり（9のせかい）」
 *
 * 対象: 小学1年生、9+nの繰り上がりたし算
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: 補数の かくにん（プール4問 → 3問出題）
 *   Step2: 9+nの きほん（プール8問 → 7問出題）
 *   Step3: あなうめ・もんだいぶん（プール6問 → 5問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 補数の かくにん
  // =====================================================
  {
    id: 'M1-10a-Q01',
    unitId: 'M1-10a',
    step: 1,
    type: 'choice',
    question: 'まず かくにん！\n9に いくつ たすと 10に なる？\n9 + □ = 10',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '１',
    explanation: '9 + 1 = 10 です。9のせかいの くりあがりの ひみつです！'
  },
  {
    id: 'M1-10a-Q02',
    unitId: 'M1-10a',
    step: 1,
    type: 'choice',
    question: '9 + 2 = ？\n（ヒント：9 + 1 = 10、2を「1と1」に わけよう）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '9 + 1 = 10、10 + 1 = 11。答えは 11！'
  },
  {
    id: 'M1-10a-Q16',
    unitId: 'M1-10a',
    step: 1,
    type: 'choice',
    question: '9は あと いくつで 10に なる？',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '１',
    explanation: '9 + 1 = 10 です。9のつぎは 10だから、あと 1つです。'
  },
  {
    id: 'M1-10a-Q17',
    unitId: 'M1-10a',
    step: 1,
    type: 'choice',
    question: '9 + □ = 11\n□は いくつ？',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '9 + 2 = 11 です。9 + 1 = 10、あと 1で 11です。'
  },

  // =====================================================
  // Step2: 9+nの きほん
  // =====================================================
  {
    id: 'M1-10a-Q03',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 3 = ？',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '9 + 1 = 10、3を「1と2」に わけて、10 + 2 = 12。答えは 12！'
  },
  {
    id: 'M1-10a-Q04',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 4 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '9 + 1 = 10、4を「1と3」に わけて、10 + 3 = 13。答えは 13！'
  },
  {
    id: 'M1-10a-Q05',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 5 = ？',
    choices: ['１３', '１４', '１５', '１６'],
    correctAnswer: '１４',
    explanation: '9 + 1 = 10、5を「1と4」に わけて、10 + 4 = 14。答えは 14！'
  },
  {
    id: 'M1-10a-Q06',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 6 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１５',
    explanation: '9 + 1 = 10、6を「1と5」に わけて、10 + 5 = 15。答えは 15！'
  },
  {
    id: 'M1-10a-Q07',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 7 = ？',
    choices: ['１５', '１６', '１７', '１８'],
    correctAnswer: '１６',
    explanation: '9 + 1 = 10、7を「1と6」に わけて、10 + 6 = 16。答えは 16！'
  },
  {
    id: 'M1-10a-Q08',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 8 = ？',
    choices: ['１６', '１７', '１８', '１９'],
    correctAnswer: '１７',
    explanation: '9 + 1 = 10、8を「1と7」に わけて、10 + 7 = 17。答えは 17！'
  },
  {
    id: 'M1-10a-Q09',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '9 + 9 = ？',
    choices: ['１７', '１８', '１９', '２０'],
    correctAnswer: '１８',
    explanation: '9 + 1 = 10、9を「1と8」に わけて、10 + 8 = 18。答えは 18！'
  },
  {
    id: 'M1-10a-Q18',
    unitId: 'M1-10a',
    step: 2,
    type: 'choice',
    question: '4 + 9 = ？\n（ヒント：9 + 4 と おなじ こたえだよ）',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '4 + 9 = 9 + 4 = 13。たし算は じゅんばんを かえても おなじ！'
  },

  // =====================================================
  // Step3: あなうめ・もんだいぶん
  // =====================================================
  {
    id: 'M1-10a-Q10',
    unitId: 'M1-10a',
    step: 3,
    type: 'choice',
    question: '9 + □ = 13\n□に はいる かずは？',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '9 + 4 = 13 です。'
  },
  {
    id: 'M1-10a-Q11',
    unitId: 'M1-10a',
    step: 3,
    type: 'choice',
    question: '□ + 9 = 16\n□に はいる かずは？',
    choices: ['５', '６', '７', '８'],
    correctAnswer: '７',
    explanation: '7 + 9 = 16 です。'
  },
  {
    id: 'M1-10a-Q12',
    unitId: 'M1-10a',
    step: 3,
    type: 'choice',
    question: '9 + □ = 18\n□に はいる かずは？',
    choices: ['７', '８', '９', '１０'],
    correctAnswer: '９',
    explanation: '9 + 9 = 18 です。'
  },
  {
    id: 'M1-10a-Q13',
    unitId: 'M1-10a',
    step: 3,
    type: 'choice',
    question: 'りんごが 9こ、みかんが 5こ あります。\nあわせて なんこ？',
    choices: ['１３こ', '１４こ', '１５こ', '１６こ'],
    correctAnswer: '１４こ',
    explanation: '9 + 5 = 14。9 + 1 = 10、10 + 4 = 14こ です。'
  },
  {
    id: 'M1-10a-Q14',
    unitId: 'M1-10a',
    step: 3,
    type: 'choice',
    question: 'かめが 9ひき、かえるが 3びき います。\nあわせて なんびき？',
    choices: ['１１ひき', '１２ひき', '１３ひき', '１４ひき'],
    correctAnswer: '１２ひき',
    explanation: '9 + 3 = 12。9 + 1 = 10、10 + 2 = 12ひき です。'
  },
  {
    id: 'M1-10a-Q15',
    unitId: 'M1-10a',
    step: 3,
    type: 'choice',
    question: '9 + □ = 15\n□に はいる かずは？',
    choices: ['４', '５', '６', '７'],
    correctAnswer: '６',
    explanation: '9 + 6 = 15 です。'
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 7 },
  { step: 3, pick: 5 }
];

export default questions;
