/**
 * M1-14c-3dig.js - Grimoire Guardians 問題データ
 * ユニット: M1-14c-3dig「3桁のたしざん」（ひっ算 B+C モードのみ）
 *
 * 対象: 3桁のたしざん（繰り上がりなし・あり）
 * モード: digit-by-digit のみ（暗算困難のため full-answer なし）
 *
 * Step構成
 *   Step1: 3桁+1桁（繰り上がりなし）（プール6問 → 5問）
 *   Step2: 3桁+2桁（繰り上がりなし）（プール6問 → 5問）
 *   Step3: 3桁+2桁（繰り上がりあり）（プール7問 → 5問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [

  // Step1: 3桁+1桁（繰り上がりなし）
  {
    id: 'M1-14c-3dig-Q01',
    unitId: 'M1-14c-3dig',
    step: 1,
    type: 'choice',
    question: '123 ＋ 4 ＝ ？',
    choices: ['125', '126', '127', '128'],
    correctAnswer: '127'
  },
  {
    id: 'M1-14c-3dig-Q02',
    unitId: 'M1-14c-3dig',
    step: 1,
    type: 'choice',
    question: '231 ＋ 5 ＝ ？',
    choices: ['234', '235', '236', '237'],
    correctAnswer: '236'
  },
  {
    id: 'M1-14c-3dig-Q03',
    unitId: 'M1-14c-3dig',
    step: 1,
    type: 'choice',
    question: '342 ＋ 3 ＝ ？',
    choices: ['343', '344', '345', '346'],
    correctAnswer: '345'
  },
  {
    id: 'M1-14c-3dig-Q04',
    unitId: 'M1-14c-3dig',
    step: 1,
    type: 'choice',
    question: '413 ＋ 6 ＝ ？',
    choices: ['417', '418', '419', '420'],
    correctAnswer: '419'
  },
  {
    id: 'M1-14c-3dig-Q05',
    unitId: 'M1-14c-3dig',
    step: 1,
    type: 'choice',
    question: '521 ＋ 7 ＝ ？',
    choices: ['526', '527', '528', '529'],
    correctAnswer: '528'
  },
  {
    id: 'M1-14c-3dig-Q06',
    unitId: 'M1-14c-3dig',
    step: 1,
    type: 'choice',
    question: '630 ＋ 8 ＝ ？',
    choices: ['636', '637', '638', '639'],
    correctAnswer: '638'
  },

  // Step2: 3桁+2桁（繰り上がりなし）
  {
    id: 'M1-14c-3dig-Q07',
    unitId: 'M1-14c-3dig',
    step: 2,
    type: 'choice',
    question: '123 ＋ 45 ＝ ？',
    choices: ['166', '167', '168', '169'],
    correctAnswer: '168'
  },
  {
    id: 'M1-14c-3dig-Q08',
    unitId: 'M1-14c-3dig',
    step: 2,
    type: 'choice',
    question: '234 ＋ 53 ＝ ？',
    choices: ['285', '286', '287', '288'],
    correctAnswer: '287'
  },
  {
    id: 'M1-14c-3dig-Q09',
    unitId: 'M1-14c-3dig',
    step: 2,
    type: 'choice',
    question: '312 ＋ 46 ＝ ？',
    choices: ['356', '357', '358', '359'],
    correctAnswer: '358'
  },
  {
    id: 'M1-14c-3dig-Q10',
    unitId: 'M1-14c-3dig',
    step: 2,
    type: 'choice',
    question: '421 ＋ 35 ＝ ？',
    choices: ['454', '455', '456', '457'],
    correctAnswer: '456'
  },
  {
    id: 'M1-14c-3dig-Q11',
    unitId: 'M1-14c-3dig',
    step: 2,
    type: 'choice',
    question: '503 ＋ 64 ＝ ？',
    choices: ['565', '566', '567', '568'],
    correctAnswer: '567'
  },
  {
    id: 'M1-14c-3dig-Q12',
    unitId: 'M1-14c-3dig',
    step: 2,
    type: 'choice',
    question: '611 ＋ 27 ＝ ？',
    choices: ['636', '637', '638', '639'],
    correctAnswer: '638'
  },

  // Step3: 3桁+2桁（繰り上がりあり）
  {
    id: 'M1-14c-3dig-Q13',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '123 ＋ 48 ＝ ？',
    choices: ['169', '170', '171', '172'],
    correctAnswer: '171'
  },
  {
    id: 'M1-14c-3dig-Q14',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '234 ＋ 57 ＝ ？',
    choices: ['289', '290', '291', '292'],
    correctAnswer: '291'
  },
  {
    id: 'M1-14c-3dig-Q15',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '345 ＋ 76 ＝ ？',
    choices: ['419', '420', '421', '422'],
    correctAnswer: '421'
  },
  {
    id: 'M1-14c-3dig-Q16',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '456 ＋ 68 ＝ ？',
    choices: ['522', '523', '524', '525'],
    correctAnswer: '524'
  },
  {
    id: 'M1-14c-3dig-Q17',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '527 ＋ 84 ＝ ？',
    choices: ['609', '610', '611', '612'],
    correctAnswer: '611'
  },
  {
    id: 'M1-14c-3dig-Q18',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '638 ＋ 75 ＝ ？',
    choices: ['711', '712', '713', '714'],
    correctAnswer: '713'
  },
  {
    id: 'M1-14c-3dig-Q19',
    unitId: 'M1-14c-3dig',
    step: 3,
    type: 'choice',
    question: '749 ＋ 83 ＝ ？',
    choices: ['830', '831', '832', '833'],
    correctAnswer: '832'
  }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export { questions, stepConfig };
export default questions;
