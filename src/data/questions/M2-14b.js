/**
 * M2-14b.js - Grimoire Guardians 問題データ
 * ユニット: M2-14b「ぶんすうの たしざん」
 * プール: 21問 / 出題: 15問（同分母のたしざん）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 2ぶんの ── たしざん ──
  {
    id: 'M2-14b-Q01',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '1/2 + 1/2 = ？',
    choices: ['1/4', '1/2', '2/2（=1）', '2/4'],
    correctAnswer: '2/2（=1）'
  },
  // ── Step 1: 4ぶんの ── たしざん ──
  {
    id: 'M2-14b-Q02',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '1/4 + 1/4 = ？',
    choices: ['1/4', '2/4', '2/8', '1/2'],
    correctAnswer: '2/4'
  },
  {
    id: 'M2-14b-Q03',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '1/4 + 2/4 = ？',
    choices: ['2/4', '3/4', '3/8', '4/4'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14b-Q04',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '2/4 + 2/4 = ？',
    choices: ['2/4', '3/4', '4/4（=1）', '4/8'],
    correctAnswer: '4/4（=1）'
  },
  {
    id: 'M2-14b-Q05',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '1/4 + 3/4 = ？',
    choices: ['3/4', '4/4（=1）', '4/8', '1/4'],
    correctAnswer: '4/4（=1）'
  },
  {
    id: 'M2-14b-Q06',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '3/4 + 0/4 = ？',
    choices: ['0/4', '3/4', '4/4', '3/8'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14b-Q07',
    unitId: 'M2-14b',
    step: 1,
    type: 'text',
    question: '0/4 + 1/4 = ？',
    choices: ['0/4', '1/4', '1/8', '4/1'],
    correctAnswer: '1/4'
  },

  // ── Step 2: 5・6ぶんの ── たしざん ──
  {
    id: 'M2-14b-Q08',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '1/5 + 2/5 = ？',
    choices: ['2/5', '3/5', '3/10', '1/5'],
    correctAnswer: '3/5'
  },
  {
    id: 'M2-14b-Q09',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '2/5 + 3/5 = ？',
    choices: ['4/5', '5/5（=1）', '5/10', '3/5'],
    correctAnswer: '5/5（=1）'
  },
  {
    id: 'M2-14b-Q10',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '1/6 + 3/6 = ？',
    choices: ['3/6', '4/6', '4/12', '1/6'],
    correctAnswer: '4/6'
  },
  {
    id: 'M2-14b-Q11',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '2/6 + 4/6 = ？',
    choices: ['5/6', '6/6（=1）', '6/12', '4/6'],
    correctAnswer: '6/6（=1）'
  },
  {
    id: 'M2-14b-Q12',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '3/5 + 1/5 = ？',
    choices: ['3/5', '4/5', '4/10', '5/5'],
    correctAnswer: '4/5'
  },
  {
    id: 'M2-14b-Q13',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '1/3 + 1/3 = ？',
    choices: ['1/3', '2/3', '2/6', '1/6'],
    correctAnswer: '2/3'
  },
  {
    id: 'M2-14b-Q14',
    unitId: 'M2-14b',
    step: 2,
    type: 'text',
    question: '2/3 + 1/3 = ？',
    choices: ['2/3', '3/3（=1）', '3/6', '1/3'],
    correctAnswer: '3/3（=1）'
  },

  // ── Step 3: 文章題 ──
  {
    id: 'M2-14b-Q15',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: 'テープが 2/5m あります。\n1/5m のびると ぜんぶで なんmですか？',
    choices: ['2/5m', '3/5m', '3/10m', '1/5m'],
    correctAnswer: '3/5m'
  },
  {
    id: 'M2-14b-Q16',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: 'ジュースを 1/4L のみました。\nもう 2/4L のむと ぜんぶで なんLのみましたか？',
    choices: ['2/4L', '3/4L', '3/8L', '1/4L'],
    correctAnswer: '3/4L'
  },
  {
    id: 'M2-14b-Q17',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: 'ケーキの 1/6 と 2/6 を たすと？',
    choices: ['2/6', '3/6', '3/12', '1/6'],
    correctAnswer: '3/6'
  },
  {
    id: 'M2-14b-Q18',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: '3/8 + 5/8 = ？',
    choices: ['7/8', '8/8（=1）', '8/16', '5/8'],
    correctAnswer: '8/8（=1）'
  },
  {
    id: 'M2-14b-Q19',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: '1/4 + 1/4 = ？',
    choices: ['1/4', '2/4', '2/8', '4/4'],
    correctAnswer: '2/4'
  },
  {
    id: 'M2-14b-Q20',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: '□/6 + 1/6 = 4/6\n□に はいる かずは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M2-14b-Q21',
    unitId: 'M2-14b',
    step: 3,
    type: 'text',
    question: '2/5 + □/5 = 5/5（=1）\n□に はいる かずは？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '3'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
