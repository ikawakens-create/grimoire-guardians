/**
 * M2-14e.js - Grimoire Guardians 問題データ
 * ユニット: M2-14e「ぶんすう まとめ」
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 分数のきほん 復習 ──
  {
    id: 'M2-14e-Q01',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: '「4ぶんの3」を かずで かくと？',
    choices: ['4/3', '3/4', '3+4', '4-3'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14e-Q02',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: '1mを 5つに わけた 3つぶんは なんmですか？',
    choices: ['1/5m', '2/5m', '3/5m', '5/3m'],
    correctAnswer: '3/5m'
  },
  {
    id: 'M2-14e-Q03',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: '2/4 + 1/4 = ？',
    choices: ['2/4', '3/4', '3/8', '1/4'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14e-Q04',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: '5/6 - 2/6 = ？',
    choices: ['2/6', '3/6', '3/12', '7/6'],
    correctAnswer: '3/6'
  },
  {
    id: 'M2-14e-Q05',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: '6/6 は いくつですか？',
    choices: ['0', '1/6', '1', '6'],
    correctAnswer: '1'
  },
  {
    id: 'M2-14e-Q06',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: '1/4 と 3/4 では どちらが おおきいですか？',
    choices: ['1/4', '3/4', 'おなじ', 'くらべられない'],
    correctAnswer: '3/4'
  },
  {
    id: 'M2-14e-Q07',
    unitId: 'M2-14e',
    step: 1,
    type: 'text',
    question: 'ぶんぼが おおきい ぶんすうは 1つぶんが どうなりますか？',
    choices: ['おおきくなる', 'ちいさくなる', 'かわらない', 'わからない'],
    correctAnswer: 'ちいさくなる'
  },

  // ── Step 2: たしざん・ひきざん 混合 ──
  {
    id: 'M2-14e-Q08',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '3/5 + 2/5 = ？',
    choices: ['4/5', '5/5（=1）', '5/10', '1/5'],
    correctAnswer: '5/5（=1）'
  },
  {
    id: 'M2-14e-Q09',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '7/8 - 4/8 = ？',
    choices: ['2/8', '3/8', '3/16', '4/8'],
    correctAnswer: '3/8'
  },
  {
    id: 'M2-14e-Q10',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '1/3 + 1/3 + 1/3 = ？',
    choices: ['2/3', '3/3（=1）', '3/9', '1/3'],
    correctAnswer: '3/3（=1）'
  },
  {
    id: 'M2-14e-Q11',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '1 - 1/3 = ？ （1 = 3/3 として かんがえましょう）',
    choices: ['1/3', '2/3', '3/3', '0'],
    correctAnswer: '2/3'
  },
  {
    id: 'M2-14e-Q12',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '4/6 + 1/6 - 2/6 = ？',
    choices: ['2/6', '3/6', '3/18', '5/6'],
    correctAnswer: '3/6'
  },
  {
    id: 'M2-14e-Q13',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '□/5 - 1/5 = 3/5\n□に はいる かずは？',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '4'
  },
  {
    id: 'M2-14e-Q14',
    unitId: 'M2-14e',
    step: 2,
    type: 'text',
    question: '2/4 + □/4 = 4/4（=1）\n□に はいる かずは？',
    choices: ['1', '2', '3', '4'],
    correctAnswer: '2'
  },

  // ── Step 3: 総合文章題 ──
  {
    id: 'M2-14e-Q15',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: 'ジュースが 5/6L あります。\n2/6L のんで、また 1/6L のみました。\nのこりは なんLですか？',
    choices: ['1/6L', '2/6L', '3/6L', '5/6L'],
    correctAnswer: '2/6L'
  },
  {
    id: 'M2-14e-Q16',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: 'リボンが 1m あります。\n3/8m と 2/8m つかいました。\nのこりは なんmですか？',
    choices: ['2/8m', '3/8m', '5/8m', '8/8m'],
    correctAnswer: '3/8m'
  },
  {
    id: 'M2-14e-Q17',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: 'つぎの なかで いちばん おおきいのは？',
    choices: ['2/6', '3/6', '5/6', '4/6'],
    correctAnswer: '5/6'
  },
  {
    id: 'M2-14e-Q18',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: 'つぎの なかで いちばん ちいさいのは？',
    choices: ['1/2', '1/3', '1/4', '1/5'],
    correctAnswer: '1/5'
  },
  {
    id: 'M2-14e-Q19',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: '1/5m の テープを 3まい つなぐと なんmになりますか？',
    choices: ['1/5m', '2/5m', '3/5m', '3/15m'],
    correctAnswer: '3/5m'
  },
  {
    id: 'M2-14e-Q20',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: 'みずが 7/8L あります。\nなん L のむと 3/8L になりますか？',
    choices: ['3/8L', '4/8L', '7/8L', '10/8L'],
    correctAnswer: '4/8L'
  },
  {
    id: 'M2-14e-Q21',
    unitId: 'M2-14e',
    step: 3,
    type: 'text',
    question: '1/4 + 2/4 と 2/4 + 1/4 は おなじですか？',
    choices: ['おなじ（3/4）', 'ちがう', '1/4のほうが おおきい', '2/4のほうが おおきい'],
    correctAnswer: 'おなじ（3/4）'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
