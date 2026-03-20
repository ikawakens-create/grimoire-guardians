/**
 * M2-14c.js - Grimoire Guardians 問題データ
 * ユニット: M2-14c「ぶんすうの ひきざん」
 * プール: 21問 / 出題: 15問（同分母のひきざん）
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 4ぶんの ── ひきざん ──
  {
    id: 'M2-14c-Q01',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '3/4 - 1/4 = ？',
    choices: ['1/4', '2/4', '2/8', '3/4'],
    correctAnswer: '2/4'
  },
  {
    id: 'M2-14c-Q02',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '4/4 - 1/4 = ？',
    choices: ['2/4', '3/4', '3/8', '1/4'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14c-Q03',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '3/4 - 2/4 = ？',
    choices: ['0/4', '1/4', '1/8', '2/4'],
    correctAnswer: '1/4'
  },
  {
    id: 'M2-14c-Q04',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '2/4 - 2/4 = ？',
    choices: ['0/4（=0）', '1/4', '2/4', '4/4'],
    correctAnswer: '0/4（=0）'
  },
  {
    id: 'M2-14c-Q05',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '1 - 1/4 = ？ （1 = 4/4 として かんがえましょう）',
    choices: ['1/4', '2/4', '3/4', '4/4'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14c-Q06',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '4/4 - 2/4 = ？',
    choices: ['1/4', '2/4', '2/8', '4/4'],
    correctAnswer: '2/4'
  },
  {
    id: 'M2-14c-Q07',
    unitId: 'M2-14c',
    step: 1,
    type: 'text',
    question: '4/4 - 4/4 = ？',
    choices: ['0', '1/4', '1', '4'],
    correctAnswer: '0'
  },

  // ── Step 2: 5・6・3ぶんの ── ひきざん ──
  {
    id: 'M2-14c-Q08',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '4/5 - 2/5 = ？',
    choices: ['1/5', '2/5', '2/10', '4/5'],
    correctAnswer: '2/5'
  },
  {
    id: 'M2-14c-Q09',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '5/5 - 3/5 = ？',
    choices: ['1/5', '2/5', '3/5', '5/5'],
    correctAnswer: '2/5'
  },
  {
    id: 'M2-14c-Q10',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '5/6 - 2/6 = ？',
    choices: ['2/6', '3/6', '3/12', '5/6'],
    correctAnswer: '3/6'
  },
  {
    id: 'M2-14c-Q11',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '6/6 - 4/6 = ？',
    choices: ['1/6', '2/6', '2/12', '4/6'],
    correctAnswer: '2/6'
  },
  {
    id: 'M2-14c-Q12',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '2/3 - 1/3 = ？',
    choices: ['0/3', '1/3', '1/6', '2/3'],
    correctAnswer: '1/3'
  },
  {
    id: 'M2-14c-Q13',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '3/3 - 2/3 = ？',
    choices: ['0/3', '1/3', '1/6', '2/3'],
    correctAnswer: '1/3'
  },
  {
    id: 'M2-14c-Q14',
    unitId: 'M2-14c',
    step: 2,
    type: 'text',
    question: '7/8 - 3/8 = ？',
    choices: ['3/8', '4/8', '4/16', '7/8'],
    correctAnswer: '4/8'
  },

  // ── Step 3: 文章題 ──
  {
    id: 'M2-14c-Q15',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: 'テープが 4/5m あります。\n1/5m つかうと のこりは なんmですか？',
    choices: ['2/5m', '3/5m', '3/10m', '5/5m'],
    correctAnswer: '3/5m'
  },
  {
    id: 'M2-14c-Q16',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: 'ジュースが 3/4L あります。\n1/4L のむと のこりは なんLですか？',
    choices: ['1/4L', '2/4L', '2/8L', '4/4L'],
    correctAnswer: '2/4L'
  },
  {
    id: 'M2-14c-Q17',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: '5/6 - □/6 = 2/6\n□に はいる かずは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3'
  },
  {
    id: 'M2-14c-Q18',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: '1 - 3/5 = ？ （1 = 5/5 として かんがえましょう）',
    choices: ['1/5', '2/5', '3/5', '5/5'],
    correctAnswer: '2/5'
  },
  {
    id: 'M2-14c-Q19',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: 'ケーキの 5/6 から 3/6 たべると のこりは？',
    choices: ['1/6', '2/6', '3/6', '5/6'],
    correctAnswer: '2/6'
  },
  {
    id: 'M2-14c-Q20',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: '3/4 + 2/4 - 1/4 = ？',
    choices: ['3/4', '4/4（=1）', '4/12', '2/4'],
    correctAnswer: '4/4（=1）'
  },
  {
    id: 'M2-14c-Q21',
    unitId: 'M2-14c',
    step: 3,
    type: 'text',
    question: '□/5 - 2/5 = 2/5\n□に はいる かずは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
