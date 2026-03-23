/**
 * M2-07.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-07「みずの かさ（L・dL・mL）」
 *
 * 対象: 小学2年生、かさの単位（L・dL・mL）
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 1L＝10dL の 単位変換  （プール15問 → 5問出題）
 *   Step2: dL と mL の 関係      （プール15問 → 5問出題）
 *   Step3: かさの 文章題         （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 1L＝10dL の 単位変換
  // =====================================================
  {
    id: 'M2-07-Q01',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '1L は なんdL？',
    choices: ['1dL', '5dL', '10dL', '100dL'],
    correctAnswer: '10dL'
  },
  {
    id: 'M2-07-Q02',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '2L は なんdL？',
    choices: ['2dL', '12dL', '20dL', '200dL'],
    correctAnswer: '20dL'
  },
  {
    id: 'M2-07-Q03',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '3L は なんdL？',
    choices: ['3dL', '13dL', '30dL', '300dL'],
    correctAnswer: '30dL'
  },
  {
    id: 'M2-07-Q04',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '5L は なんdL？',
    choices: ['5dL', '15dL', '50dL', '500dL'],
    correctAnswer: '50dL'
  },
  {
    id: 'M2-07-Q05',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '20dL は なんL？',
    choices: ['2L', '5L', '10L', '20L'],
    correctAnswer: '2L'
  },
  {
    id: 'M2-07-Q06',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '30dL は なんL？',
    choices: ['1L', '3L', '10L', '30L'],
    correctAnswer: '3L'
  },
  {
    id: 'M2-07-Q07',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '50dL は なんL？',
    choices: ['5L', '10L', '15L', '50L'],
    correctAnswer: '5L'
  },
  {
    id: 'M2-07-Q08',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '1L 3dL は なんdL？',
    choices: ['4dL', '13dL', '31dL', '103dL'],
    correctAnswer: '13dL'
  },
  {
    id: 'M2-07-Q09',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '2L 5dL は なんdL？',
    choices: ['7dL', '25dL', '52dL', '205dL'],
    correctAnswer: '25dL'
  },
  {
    id: 'M2-07-Q10',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '4L 2dL は なんdL？',
    choices: ['6dL', '42dL', '24dL', '402dL'],
    correctAnswer: '42dL'
  },
  {
    id: 'M2-07-Q11',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '15dL は なんL なんdL？',
    choices: ['1L 5dL', '5L 1dL', '1L 15dL', '15L'],
    correctAnswer: '1L 5dL'
  },
  {
    id: 'M2-07-Q12',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '23dL は なんL なんdL？',
    choices: ['2L 3dL', '3L 2dL', '2L 13dL', '23L'],
    correctAnswer: '2L 3dL'
  },
  {
    id: 'M2-07-Q13',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '37dL は なんL なんdL？',
    choices: ['3L 7dL', '7L 3dL', '3L 17dL', '37L'],
    correctAnswer: '3L 7dL'
  },
  {
    id: 'M2-07-Q14',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '4L は なんdL？',
    choices: ['4dL', '14dL', '40dL', '400dL'],
    correctAnswer: '40dL'
  },
  {
    id: 'M2-07-Q15',
    unitId: 'M2-07',
    step: 1,
    type: 'choice',
    question: '40dL は なんL？',
    choices: ['1L', '4L', '10L', '40L'],
    correctAnswer: '4L'
  },

  // =====================================================
  // Step2: dL と mL の 関係（1dL＝100mL）
  // =====================================================
  {
    id: 'M2-07-Q16',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '1dL は なんmL？',
    choices: ['1mL', '10mL', '100mL', '1000mL'],
    correctAnswer: '100mL'
  },
  {
    id: 'M2-07-Q17',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '2dL は なんmL？',
    choices: ['2mL', '20mL', '200mL', '2000mL'],
    correctAnswer: '200mL'
  },
  {
    id: 'M2-07-Q18',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '5dL は なんmL？',
    choices: ['5mL', '50mL', '500mL', '5000mL'],
    correctAnswer: '500mL'
  },
  {
    id: 'M2-07-Q19',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '300mL は なんdL？',
    choices: ['1dL', '3dL', '30dL', '300dL'],
    correctAnswer: '3dL'
  },
  {
    id: 'M2-07-Q20',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '500mL は なんdL？',
    choices: ['1dL', '5dL', '50dL', '500dL'],
    correctAnswer: '5dL'
  },
  {
    id: 'M2-07-Q21',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '1L は なんmL？',
    choices: ['10mL', '100mL', '1000mL', '10000mL'],
    correctAnswer: '1000mL'
  },
  {
    id: 'M2-07-Q22',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '1000mL は なんL？',
    choices: ['1L', '10L', '100L', '1000L'],
    correctAnswer: '1L'
  },
  {
    id: 'M2-07-Q23',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '1L 5dL は なんmL？',
    choices: ['500mL', '1050mL', '1500mL', '15000mL'],
    correctAnswer: '1500mL'
  },
  {
    id: 'M2-07-Q24',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '2dL 50mL は なんmL？',
    choices: ['52mL', '250mL', '2050mL', '2500mL'],
    correctAnswer: '250mL'
  },
  {
    id: 'M2-07-Q25',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '3dL は なんmL？',
    choices: ['3mL', '30mL', '300mL', '3000mL'],
    correctAnswer: '300mL'
  },
  {
    id: 'M2-07-Q26',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '200mL は なんdL？',
    choices: ['1dL', '2dL', '20dL', '200dL'],
    correctAnswer: '2dL'
  },
  {
    id: 'M2-07-Q27',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '4dL は なんmL？',
    choices: ['4mL', '40mL', '400mL', '4000mL'],
    correctAnswer: '400mL'
  },
  {
    id: 'M2-07-Q28',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '700mL は なんdL？',
    choices: ['1dL', '7dL', '70dL', '700dL'],
    correctAnswer: '7dL'
  },
  {
    id: 'M2-07-Q29',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '1L と 500mL を あわせると なんmL？',
    choices: ['500mL', '1005mL', '1500mL', '5000mL'],
    correctAnswer: '1500mL'
  },
  {
    id: 'M2-07-Q30',
    unitId: 'M2-07',
    step: 2,
    type: 'choice',
    question: '6dL は なんmL？',
    choices: ['6mL', '60mL', '600mL', '6000mL'],
    correctAnswer: '600mL'
  },

  // =====================================================
  // Step3: かさの 文章題
  // =====================================================
  {
    id: 'M2-07-Q31',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'バケツに みずが 3L はいっています。\n2L つかいました。のこりは なんL？',
    choices: ['1L', '2L', '3L', '5L'],
    correctAnswer: '1L'
  },
  {
    id: 'M2-07-Q32',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'コップに ジュースが 4dL、\nびんに 6dL あります。あわせて なんdL？',
    choices: ['2dL', '8dL', '10dL', '46dL'],
    correctAnswer: '10dL'
  },
  {
    id: 'M2-07-Q33',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'やかんに みずが 2L 5dL はいっています。\n1L つかいました。のこりは なんL なんdL？',
    choices: ['1L 4dL', '1L 5dL', '2L 4dL', '3L 5dL'],
    correctAnswer: '1L 5dL'
  },
  {
    id: 'M2-07-Q34',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'AとBの ジュースを あわせると 1L です。\nAが 3dL のとき、Bは なんdL？',
    choices: ['3dL', '5dL', '7dL', '13dL'],
    correctAnswer: '7dL'
  },
  {
    id: 'M2-07-Q35',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'ペットボトルに みずが 500mL はいっています。\n200mL のみました。のこりは なんmL？',
    choices: ['200mL', '300mL', '400mL', '700mL'],
    correctAnswer: '300mL'
  },
  {
    id: 'M2-07-Q36',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: '1L の ジュースが 3ほん あります。\nあわせて なんL？',
    choices: ['1L', '3L', '10L', '30L'],
    correctAnswer: '3L'
  },
  {
    id: 'M2-07-Q37',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'みずを 8dL いれました。\nさらに 4dL いれました。あわせて なんdL？',
    choices: ['4dL', '8dL', '10dL', '12dL'],
    correctAnswer: '12dL'
  },
  {
    id: 'M2-07-Q38',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'バケツに みずが 5L あります。\nそれを 1L ずつ かんに いれると、\nなんかん できますか？',
    choices: ['1かん', '4かん', '5かん', '10かん'],
    correctAnswer: '5かん'
  },
  {
    id: 'M2-07-Q39',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'おふろに みずが 200L はいっています。\nそれは なんdL？',
    choices: ['20dL', '200dL', '2000dL', '20000dL'],
    correctAnswer: '2000dL'
  },
  {
    id: 'M2-07-Q40',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'コップAに 3dL、コップBに 5dL。\nちがいは なんdL？',
    choices: ['2dL', '3dL', '5dL', '8dL'],
    correctAnswer: '2dL'
  },
  {
    id: 'M2-07-Q41',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'ジュースが 1L 2dL あります。\n8dL のみました。のこりは なんdL？',
    choices: ['4dL', '6dL', '8dL', '10dL'],
    correctAnswer: '4dL'
  },
  {
    id: 'M2-07-Q42',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'みずを 1L 3dL と 2L 4dL あわせると\nなんL なんdL？',
    choices: ['3L 7dL', '3L 3dL', '4L 7dL', '3L 17dL'],
    correctAnswer: '3L 7dL'
  },
  {
    id: 'M2-07-Q43',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'なべに みずを 4L いれます。\n1L 5dL いれました。\nあと なんL なんdL いれますか？',
    choices: ['2L 5dL', '3L 5dL', '5L 5dL', '4L 5dL'],
    correctAnswer: '2L 5dL'
  },
  {
    id: 'M2-07-Q44',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: '500mL の ペットボトルが 2ほん あります。\nあわせて なんmL？',
    choices: ['500mL', '1000mL', '1500mL', '2000mL'],
    correctAnswer: '1000mL'
  },
  {
    id: 'M2-07-Q45',
    unitId: 'M2-07',
    step: 3,
    type: 'choice',
    question: 'みずを 6dL と 400mL あわせると なんmL？',
    choices: ['600mL', '640mL', '1000mL', '6400mL'],
    correctAnswer: '1000mL'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
