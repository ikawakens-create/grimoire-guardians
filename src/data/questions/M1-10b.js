/**
 * M1-10b.js - Grimoire Guardians 問題データ
 * ユニット: M1-10b「くりあがり（8のせかい）」
 *
 * 対象: 小学1年生、8+nの繰り上がりたし算
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: 補数 + 8+n きほん（プール12問 → 7問出題）
 *   Step2: 交換法則 + あなうめ（プール8問 → 5問出題）
 *   Step3: もんだいぶん（プール7問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 補数 + 8+n きほん
  // =====================================================
  {
    id: 'M1-10b-Q01',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: 'まず かくにん！\n8に いくつ たすと 10に なる？\n8 + □ = 10',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '8 + 2 = 10 です。8のせかいの くりあがりの ひみつです！'
  },
  {
    id: 'M1-10b-Q02',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 3 = ？\n（ヒント：8 + 2 = 10、3を「2と1」に わけよう）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '8 + 2 = 10、10 + 1 = 11。3を「2と1」に わけると 11！'
  },
  {
    id: 'M1-10b-Q03',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 4 = ？',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１２',
    explanation: '8 + 2 = 10、4を「2と2」に わけて、10 + 2 = 12。答えは 12！'
  },
  {
    id: 'M1-10b-Q04',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 5 = ？',
    choices: ['１２', '１３', '１４', '１５'],
    correctAnswer: '１３',
    explanation: '8 + 2 = 10、5を「2と3」に わけて、10 + 3 = 13。答えは 13！'
  },
  {
    id: 'M1-10b-Q05',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 6 = ？',
    choices: ['１３', '１４', '１５', '１６'],
    correctAnswer: '１４',
    explanation: '8 + 2 = 10、6を「2と4」に わけて、10 + 4 = 14。答えは 14！'
  },
  {
    id: 'M1-10b-Q06',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 7 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１５',
    explanation: '8 + 2 = 10、7を「2と5」に わけて、10 + 5 = 15。答えは 15！'
  },
  {
    id: 'M1-10b-Q07',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 8 = ？',
    choices: ['１４', '１５', '１６', '１７'],
    correctAnswer: '１６',
    explanation: '8 + 2 = 10、8を「2と6」に わけて、10 + 6 = 16。答えは 16！'
  },
  {
    id: 'M1-10b-Q08',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + 9 = ？',
    choices: ['１５', '１６', '１７', '１８'],
    correctAnswer: '１７',
    explanation: '8 + 2 = 10、9を「2と7」に わけて、10 + 7 = 17。答えは 17！'
  },
  {
    id: 'M1-10b-Q16',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8は あと いくつで 10に なる？',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '8 + 2 = 10 です。8から 2つ すすむと 10になります。'
  },
  {
    id: 'M1-10b-Q19',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + □ = 10\nこの □に はいる かずは？',
    choices: ['０', '１', '２', '３'],
    correctAnswer: '２',
    explanation: '8 + 2 = 10 です。8のせかいでは 2が かぎのかずです。'
  },
  {
    id: 'M1-10b-Q20',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '4を「2と□」に わけよう\n8のせかいで つかう わけかたは？\n4 → 2 と □',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '２',
    explanation: '4は 2と2に わけられます。8のせかいで 4を わけるときは「2と2」です。'
  },
  {
    id: 'M1-10b-Q21',
    unitId: 'M1-10b',
    step: 1,
    type: 'choice',
    question: '8 + □ = 11\n□は いくつ？',
    choices: ['１', '２', '３', '４'],
    correctAnswer: '３',
    explanation: '8 + 3 = 11 です。8 + 2 = 10、あと 1で 11なので □は 3。'
  },

  // =====================================================
  // Step2: 交換法則 + あなうめ
  // =====================================================
  {
    id: 'M1-10b-Q09',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '3 + 8 = ？\n（ヒント：8 + 3 と おなじ こたえだよ）',
    choices: ['１０', '１１', '１２', '１３'],
    correctAnswer: '１１',
    explanation: '3 + 8 = 8 + 3 = 11 です。たし算は じゅんばんを かえても おなじ！'
  },
  {
    id: 'M1-10b-Q10',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '6 + 8 = ？\n（ヒント：8 + 6 と おなじ こたえだよ）',
    choices: ['１３', '１４', '１５', '１６'],
    correctAnswer: '１４',
    explanation: '6 + 8 = 8 + 6 = 14 です。おおきい ほうから かんがえると かんたん！'
  },
  {
    id: 'M1-10b-Q11',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '8 + □ = 14\n□に はいる かずは？',
    choices: ['４', '５', '６', '７'],
    correctAnswer: '６',
    explanation: '8 + 6 = 14 です。'
  },
  {
    id: 'M1-10b-Q12',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '□ + 8 = 16\n□に はいる かずは？',
    choices: ['６', '７', '８', '９'],
    correctAnswer: '８',
    explanation: '8 + 8 = 16 です。8たす8は 16！'
  },
  {
    id: 'M1-10b-Q17',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '8 + □ = 12\n□に はいる かずは？',
    choices: ['２', '３', '４', '５'],
    correctAnswer: '４',
    explanation: '8 + 4 = 12 です。8 + 2 = 10、10 + 2 = 12なので □は 4。'
  },
  {
    id: 'M1-10b-Q22',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '5 + 8 = ？\n（ヒント：8 + 5 と おなじ こたえだよ）',
    choices: ['１１', '１２', '１３', '１４'],
    correctAnswer: '１３',
    explanation: '5 + 8 = 8 + 5 = 13 です。たし算は じゅんばんを かえても おなじ！'
  },
  {
    id: 'M1-10b-Q23',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '□ + 8 = 15\n□に はいる かずは？',
    choices: ['５', '６', '７', '８'],
    correctAnswer: '７',
    explanation: '7 + 8 = 15 です。'
  },
  {
    id: 'M1-10b-Q24',
    unitId: 'M1-10b',
    step: 2,
    type: 'choice',
    question: '9 + 8 = ？\n（ヒント：8 + 9 と おなじ こたえだよ）',
    choices: ['１５', '１６', '１７', '１８'],
    correctAnswer: '１７',
    explanation: '9 + 8 = 8 + 9 = 17 です。じゅんばんを かえて かんがえよう！'
  },

  // =====================================================
  // Step3: もんだいぶん
  // =====================================================
  {
    id: 'M1-10b-Q13',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 8ほん、ふでが 5ほん あります。\nあわせて なんぼん？',
    choices: ['１２ほん', '１３ほん', '１４ほん', '１５ほん'],
    correctAnswer: '１３ほん',
    explanation: '8 + 5 = 13。8 + 2 = 10、10 + 3 = 13ほん です。'
  },
  {
    id: 'M1-10b-Q14',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 8こ、まつぼっくりが 9こ あります。\nあわせて なんこ？',
    choices: ['１５こ', '１６こ', '１７こ', '１８こ'],
    correctAnswer: '１７こ',
    explanation: '8 + 9 = 17。8 + 2 = 10、10 + 7 = 17こ です。'
  },
  {
    id: 'M1-10b-Q15',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'バスに 8にん のっています。\n4にん のってきました。\nぜんぶで なんにん？',
    choices: ['１１にん', '１２にん', '１３にん', '１４にん'],
    correctAnswer: '１２にん',
    explanation: '8 + 4 = 12。8 + 2 = 10、10 + 2 = 12にん です。'
  },
  {
    id: 'M1-10b-Q18',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'きんぎょが 8ひき います。\n7ひき ふえました。\nぜんぶで なんびき？',
    choices: ['１４ひき', '１５ひき', '１６ひき', '１７ひき'],
    correctAnswer: '１５ひき',
    explanation: '8 + 7 = 15。8 + 2 = 10、10 + 5 = 15ひき です。'
  },
  {
    id: 'M1-10b-Q25',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'あかい おはじきが 8こ、あおい おはじきが 6こ あります。\nあわせて なんこ？',
    choices: ['１２こ', '１３こ', '１４こ', '１５こ'],
    correctAnswer: '１４こ',
    explanation: '8 + 6 = 14。8 + 2 = 10、10 + 4 = 14こ です。'
  },
  {
    id: 'M1-10b-Q26',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'はこに チョコレートが 8こ はいっています。\n3こ もらいました。\nぜんぶで なんこ？',
    choices: ['１０こ', '１１こ', '１２こ', '１３こ'],
    correctAnswer: '１１こ',
    explanation: '8 + 3 = 11。8 + 2 = 10、10 + 1 = 11こ です。'
  },
  {
    id: 'M1-10b-Q27',
    unitId: 'M1-10b',
    step: 3,
    type: 'choice',
    question: 'こどもが 8にん います。\n8にん やってきました。\nぜんぶで なんにん？',
    choices: ['１４にん', '１５にん', '１６にん', '１７にん'],
    correctAnswer: '１６にん',
    explanation: '8 + 8 = 16。8 + 2 = 10、10 + 6 = 16にん です。'
  }
];

export const stepConfig = [
  { step: 1, pick: 7 },
  { step: 2, pick: 5 },
  { step: 3, pick: 3 }
];

export default questions;
