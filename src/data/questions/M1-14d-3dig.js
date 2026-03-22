/**
 * M1-14d-3dig.js - Grimoire Guardians 問題データ
 * ユニット: M1-14d-3dig「3桁のひきざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 3桁のひきざん（繰り下がりなし・あり）
 * モード: digit-by-digit のみ（暗算困難のため full-answer なし）
 *
 * Step構成
 *   Step1: 3桁-1桁（繰り下がりなし）（プール6問 → 5問）
 *   Step2: 3桁-2桁（繰り下がりなし）（プール6問 → 5問）
 *   Step3: 3桁-2桁（繰り下がりあり）（プール7問 → 5問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [

  // Step1: 3桁-1桁（繰り下がりなし）
  {
    id: 'M1-14d-3dig-Q01',
    unitId: 'M1-14d-3dig',
    step: 1,
    type: 'choice',
    question: '127 － 4 ＝ ？',
    choices: ['121', '122', '123', '124'],
    correctAnswer: '123'
  },
  {
    id: 'M1-14d-3dig-Q02',
    unitId: 'M1-14d-3dig',
    step: 1,
    type: 'choice',
    question: '236 － 5 ＝ ？',
    choices: ['229', '230', '231', '232'],
    correctAnswer: '231'
  },
  {
    id: 'M1-14d-3dig-Q03',
    unitId: 'M1-14d-3dig',
    step: 1,
    type: 'choice',
    question: '345 － 3 ＝ ？',
    choices: ['340', '341', '342', '343'],
    correctAnswer: '342'
  },
  {
    id: 'M1-14d-3dig-Q04',
    unitId: 'M1-14d-3dig',
    step: 1,
    type: 'choice',
    question: '419 － 6 ＝ ？',
    choices: ['411', '412', '413', '414'],
    correctAnswer: '413'
  },
  {
    id: 'M1-14d-3dig-Q05',
    unitId: 'M1-14d-3dig',
    step: 1,
    type: 'choice',
    question: '528 － 7 ＝ ？',
    choices: ['519', '520', '521', '522'],
    correctAnswer: '521'
  },
  {
    id: 'M1-14d-3dig-Q06',
    unitId: 'M1-14d-3dig',
    step: 1,
    type: 'choice',
    question: '638 － 8 ＝ ？',
    choices: ['628', '629', '630', '631'],
    correctAnswer: '630'
  },

  // Step2: 3桁-2桁（繰り下がりなし）
  {
    id: 'M1-14d-3dig-Q07',
    unitId: 'M1-14d-3dig',
    step: 2,
    type: 'choice',
    question: '168 － 45 ＝ ？',
    choices: ['121', '122', '123', '124'],
    correctAnswer: '123'
  },
  {
    id: 'M1-14d-3dig-Q08',
    unitId: 'M1-14d-3dig',
    step: 2,
    type: 'choice',
    question: '287 － 53 ＝ ？',
    choices: ['232', '233', '234', '235'],
    correctAnswer: '234'
  },
  {
    id: 'M1-14d-3dig-Q09',
    unitId: 'M1-14d-3dig',
    step: 2,
    type: 'choice',
    question: '358 － 46 ＝ ？',
    choices: ['310', '311', '312', '313'],
    correctAnswer: '312'
  },
  {
    id: 'M1-14d-3dig-Q10',
    unitId: 'M1-14d-3dig',
    step: 2,
    type: 'choice',
    question: '456 － 35 ＝ ？',
    choices: ['419', '420', '421', '422'],
    correctAnswer: '421'
  },
  {
    id: 'M1-14d-3dig-Q11',
    unitId: 'M1-14d-3dig',
    step: 2,
    type: 'choice',
    question: '567 － 64 ＝ ？',
    choices: ['501', '502', '503', '504'],
    correctAnswer: '503'
  },
  {
    id: 'M1-14d-3dig-Q12',
    unitId: 'M1-14d-3dig',
    step: 2,
    type: 'choice',
    question: '638 － 27 ＝ ？',
    choices: ['609', '610', '611', '612'],
    correctAnswer: '611'
  },

  // Step3: 3桁-2桁（繰り下がりあり）
  {
    id: 'M1-14d-3dig-Q13',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '171 － 48 ＝ ？',
    choices: ['121', '122', '123', '124'],
    correctAnswer: '123'
  },
  {
    id: 'M1-14d-3dig-Q14',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '291 － 57 ＝ ？',
    choices: ['232', '233', '234', '235'],
    correctAnswer: '234'
  },
  {
    id: 'M1-14d-3dig-Q15',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '421 － 76 ＝ ？',
    choices: ['343', '344', '345', '346'],
    correctAnswer: '345'
  },
  {
    id: 'M1-14d-3dig-Q16',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '524 － 68 ＝ ？',
    choices: ['454', '455', '456', '457'],
    correctAnswer: '456'
  },
  {
    id: 'M1-14d-3dig-Q17',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '611 － 84 ＝ ？',
    choices: ['525', '526', '527', '528'],
    correctAnswer: '527'
  },
  {
    id: 'M1-14d-3dig-Q18',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '713 － 75 ＝ ？',
    choices: ['636', '637', '638', '639'],
    correctAnswer: '638'
  },
  {
    id: 'M1-14d-3dig-Q19',
    unitId: 'M1-14d-3dig',
    step: 3,
    type: 'choice',
    question: '832 － 83 ＝ ？',
    choices: ['747', '748', '749', '750'],
    correctAnswer: '749'
  }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
