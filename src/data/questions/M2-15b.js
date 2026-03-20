/**
 * M2-15b.js - Grimoire Guardians 問題データ
 * ユニット: M2-15b「そうふくしゅう②」— Zone 3（九九・かけざん）
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 2〜5のだん ──
  {
    id: 'M2-15b-Q01',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '2 × 7 = ？',
    choices: ['12', '13', '14', '16'],
    correctAnswer: '14'
  },
  {
    id: 'M2-15b-Q02',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '3 × 6 = ？',
    choices: ['15', '17', '18', '21'],
    correctAnswer: '18'
  },
  {
    id: 'M2-15b-Q03',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '4 × 8 = ？',
    choices: ['28', '30', '32', '36'],
    correctAnswer: '32'
  },
  {
    id: 'M2-15b-Q04',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '5 × 6 = ？',
    choices: ['25', '28', '30', '35'],
    correctAnswer: '30'
  },
  {
    id: 'M2-15b-Q05',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '2 × 9 = ？',
    choices: ['16', '17', '18', '20'],
    correctAnswer: '18'
  },
  {
    id: 'M2-15b-Q06',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '4 × 5 = ？',
    choices: ['16', '18', '20', '24'],
    correctAnswer: '20'
  },
  {
    id: 'M2-15b-Q07',
    unitId: 'M2-15b',
    step: 1,
    type: 'text',
    question: '3 × 9 = ？',
    choices: ['24', '25', '27', '30'],
    correctAnswer: '27'
  },

  // ── Step 2: 6〜9のだん ──
  {
    id: 'M2-15b-Q08',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '6 × 7 = ？',
    choices: ['36', '40', '42', '48'],
    correctAnswer: '42'
  },
  {
    id: 'M2-15b-Q09',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '7 × 8 = ？',
    choices: ['49', '52', '56', '63'],
    correctAnswer: '56'
  },
  {
    id: 'M2-15b-Q10',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '8 × 9 = ？',
    choices: ['63', '64', '72', '81'],
    correctAnswer: '72'
  },
  {
    id: 'M2-15b-Q11',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '9 × 9 = ？',
    choices: ['72', '76', '81', '90'],
    correctAnswer: '81'
  },
  {
    id: 'M2-15b-Q12',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '6 × 9 = ？',
    choices: ['48', '51', '54', '60'],
    correctAnswer: '54'
  },
  {
    id: 'M2-15b-Q13',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '7 × 7 = ？',
    choices: ['42', '46', '49', '56'],
    correctAnswer: '49'
  },
  {
    id: 'M2-15b-Q14',
    unitId: 'M2-15b',
    step: 2,
    type: 'text',
    question: '8 × 8 = ？',
    choices: ['56', '60', '63', '64'],
    correctAnswer: '64'
  },

  // ── Step 3: 九九の混合・文章題 ──
  {
    id: 'M2-15b-Q15',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: 'えんぴつが 1ひとに 6ほん ずつ あります。\n8にんぶん は なんほんですか？',
    choices: ['42ほん', '48ほん', '54ほん', '56ほん'],
    correctAnswer: '48ほん'
  },
  {
    id: 'M2-15b-Q16',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: '□ × 7 = 56\n□に はいる かずは？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M2-15b-Q17',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: '9 × □ = 54\n□に はいる かずは？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M2-15b-Q18',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: 'よこ 7こ、たて 6こ ならんだ タイルは ぜんぶで なんこですか？',
    choices: ['36こ', '42こ', '48こ', '56こ'],
    correctAnswer: '42こ'
  },
  {
    id: 'M2-15b-Q19',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: '4 × 9 と こたえが おなじな しきは どれですか？',
    choices: ['9 × 4', '4 + 9', '9 - 4', '9 ÷ 4'],
    correctAnswer: '9 × 4'
  },
  {
    id: 'M2-15b-Q20',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: '3 × 8 = 24 のとき、8 × 3 は？',
    choices: ['11', '18', '24', '32'],
    correctAnswer: '24'
  },
  {
    id: 'M2-15b-Q21',
    unitId: 'M2-15b',
    step: 3,
    type: 'text',
    question: 'くりの き 7本に、1本あたり 9こ くりが なっています。\nぜんぶで なんこですか？',
    choices: ['56こ', '63こ', '72こ', '81こ'],
    correctAnswer: '63こ'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
