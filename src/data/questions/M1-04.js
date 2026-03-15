/**
 * M1-04.js - Grimoire Guardians 問題データ
 * ユニット: M1-04「いくつと いくつ」
 *
 * 対象: 小学1年生、数の合成・分解（たしざんの基礎）
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: ○と いくつ？（プール12問 → 5問出題）
 *   Step2: □を もとめよう（プール11問 → 5問出題）
 *   Step3: わけると いくつ？（プール9問 → 5問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: ○と いくつ？（合成：残りを答える）
  // =====================================================
  {
    id: 'M1-04-Q01',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '3は 1と いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-04-Q02',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '5は 2と いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q03',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '7は 3と いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q04',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '8は 5と いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q05',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '9は 4と いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-04-Q06',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '10は 6と いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q16',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '6は 2と いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q17',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '10は 7と いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q22',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '4は 1と いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q23',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '9は 6と いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q24',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '8は 1と いくつ？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M1-04-Q25',
    unitId: 'M1-04',
    step: 1,
    type: 'choice',
    question: '10は 9と いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },

  // =====================================================
  // Step2: □を もとめよう（穴埋め合成）
  // =====================================================
  {
    id: 'M1-04-Q07',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '□と 3で 5に なります。\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-04-Q08',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '□と 2で 7に なります。\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M1-04-Q09',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '4と □で 9に なります。\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-04-Q10',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '6と □で 10に なります。\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q11',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '10は 3と □。\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '7'
  },
  {
    id: 'M1-04-Q18',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '□と 4で 8に なります。\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q19',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '1と □で 6に なります。\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-04-Q26',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '□と 5で 9に なります。\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q27',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '3と □で 8に なります。\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '5'
  },
  {
    id: 'M1-04-Q28',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '□と 6で 10に なります。\n□は いくつ？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q29',
    unitId: 'M1-04',
    step: 2,
    type: 'choice',
    question: '2と □で 10に なります。\n□は いくつ？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },

  // =====================================================
  // Step3: わけると いくつ？（分解の文脈）
  // =====================================================
  {
    id: 'M1-04-Q12',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'りんごが 5こ あります。\n2こと □こに わけると？\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q13',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 8ほん あります。\n4ほんと □ほんに わけると？\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q14',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'こどもが 9にん います。\n5にんと □にんに わけると？\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q15',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'おかしが 10こ あります。\n7こと □こに わけると？\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q20',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'ボールが 7こ あります。\n3こと □こに わけると？\n□は いくつ？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '4'
  },
  {
    id: 'M1-04-Q21',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'ねこが 6びき います。\n4びきと □びきに わけると？\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },
  {
    id: 'M1-04-Q30',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'はなが 9ほん あります。\n6ほんと □ほんに わけると？\n□は いくつ？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  },
  {
    id: 'M1-04-Q31',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'あめが 10こ あります。\n4こと □こに わけると？\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M1-04-Q32',
    unitId: 'M1-04',
    step: 3,
    type: 'choice',
    question: 'とりが 8わ います。\n2わと □わに わけると？\n□は いくつ？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
