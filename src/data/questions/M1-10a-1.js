/**
 * M1-10a-1.js - Grimoire Guardians 問題データ
 * ユニット: M1-10a-1「くりあがりのたしざん①（9のせかい）」（ひっ算 B+C）
 *
 * 対象: 小学1年生、9+□の繰り上がりたしざん
 * モード: digit-by-digit
 *
 * Step構成
 *   Step1: 9+1〜9+5（プール5問 → 5問）
 *   Step2: 9+6〜9+9（プール4問 → 4問）
 *   Step3: まじりあい（プール6問 → 6問）
 *
 * @version 1.0
 * @date 2026-03-22
 */

const questions = [
  // Step1
  {
    id: 'M1-10a-1-Q01',
    unitId: 'M1-10a-1',
    step: 1,
    type: 'choice',
    question: '9 ＋ 1 ＝ ？',
    choices: ['7', '8', '9', '10'],
    correctAnswer: '10'
  },
  {
    id: 'M1-10a-1-Q02',
    unitId: 'M1-10a-1',
    step: 1,
    type: 'choice',
    question: '9 ＋ 2 ＝ ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '11'
  },
  {
    id: 'M1-10a-1-Q03',
    unitId: 'M1-10a-1',
    step: 1,
    type: 'choice',
    question: '9 ＋ 3 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10a-1-Q04',
    unitId: 'M1-10a-1',
    step: 1,
    type: 'choice',
    question: '9 ＋ 4 ＝ ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '13'
  },
  {
    id: 'M1-10a-1-Q05',
    unitId: 'M1-10a-1',
    step: 1,
    type: 'choice',
    question: '9 ＋ 5 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  // Step2
  {
    id: 'M1-10a-1-Q06',
    unitId: 'M1-10a-1',
    step: 2,
    type: 'choice',
    question: '9 ＋ 6 ＝ ？',
    choices: ['12', '13', '14', '15'],
    correctAnswer: '15'
  },
  {
    id: 'M1-10a-1-Q07',
    unitId: 'M1-10a-1',
    step: 2,
    type: 'choice',
    question: '9 ＋ 7 ＝ ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '16'
  },
  {
    id: 'M1-10a-1-Q08',
    unitId: 'M1-10a-1',
    step: 2,
    type: 'choice',
    question: '9 ＋ 8 ＝ ？',
    choices: ['14', '15', '16', '17'],
    correctAnswer: '17'
  },
  {
    id: 'M1-10a-1-Q09',
    unitId: 'M1-10a-1',
    step: 2,
    type: 'choice',
    question: '9 ＋ 9 ＝ ？',
    choices: ['15', '16', '17', '18'],
    correctAnswer: '18'
  },
  // Step3
  {
    id: 'M1-10a-1-Q10',
    unitId: 'M1-10a-1',
    step: 3,
    type: 'choice',
    question: '9 ＋ 3 ＝ ？',
    choices: ['9', '10', '11', '12'],
    correctAnswer: '12'
  },
  {
    id: 'M1-10a-1-Q11',
    unitId: 'M1-10a-1',
    step: 3,
    type: 'choice',
    question: '9 ＋ 7 ＝ ？',
    choices: ['13', '14', '15', '16'],
    correctAnswer: '16'
  },
  {
    id: 'M1-10a-1-Q12',
    unitId: 'M1-10a-1',
    step: 3,
    type: 'choice',
    question: '9 ＋ 5 ＝ ？',
    choices: ['11', '12', '13', '14'],
    correctAnswer: '14'
  },
  {
    id: 'M1-10a-1-Q13',
    unitId: 'M1-10a-1',
    step: 3,
    type: 'choice',
    question: '9 ＋ 2 ＝ ？',
    choices: ['8', '9', '10', '11'],
    correctAnswer: '11'
  },
  {
    id: 'M1-10a-1-Q14',
    unitId: 'M1-10a-1',
    step: 3,
    type: 'choice',
    question: '9 ＋ 8 ＝ ？',
    choices: ['14', '15', '16', '17'],
    correctAnswer: '17'
  },
  {
    id: 'M1-10a-1-Q15',
    unitId: 'M1-10a-1',
    step: 3,
    type: 'choice',
    question: '9 ＋ 4 ＝ ？',
    choices: ['10', '11', '12', '13'],
    correctAnswer: '13'
  }
];

const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 4 },
  { step: 3, pick: 6 }
];

export { questions, stepConfig };
export default questions;
