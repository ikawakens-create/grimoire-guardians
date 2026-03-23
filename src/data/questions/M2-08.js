/**
 * M2-08.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-08「おもさを はかろう（kg・g）」
 *
 * 対象: 小学2年生、重さの単位（kg・g）
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 1kg＝1000g の 単位変換（プール15問 → 5問出題）
 *   Step2: おもさの 計算         （プール15問 → 5問出題）
 *   Step3: 文章題               （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 1kg＝1000g の 単位変換
  // =====================================================
  {
    id: 'M2-08-Q01',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '1kg は なんg？',
    choices: ['10g', '100g', '1000g', '10000g'],
    correctAnswer: '1000g'
  },
  {
    id: 'M2-08-Q02',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '2kg は なんg？',
    choices: ['200g', '1002g', '2000g', '20000g'],
    correctAnswer: '2000g'
  },
  {
    id: 'M2-08-Q03',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '3kg は なんg？',
    choices: ['300g', '1003g', '3000g', '30000g'],
    correctAnswer: '3000g'
  },
  {
    id: 'M2-08-Q04',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '5kg は なんg？',
    choices: ['500g', '1005g', '5000g', '50000g'],
    correctAnswer: '5000g'
  },
  {
    id: 'M2-08-Q05',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '1000g は なんkg？',
    choices: ['1kg', '10kg', '100kg', '1000kg'],
    correctAnswer: '1kg'
  },
  {
    id: 'M2-08-Q06',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '2000g は なんkg？',
    choices: ['1kg', '2kg', '20kg', '200kg'],
    correctAnswer: '2kg'
  },
  {
    id: 'M2-08-Q07',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '5000g は なんkg？',
    choices: ['1kg', '5kg', '50kg', '500kg'],
    correctAnswer: '5kg'
  },
  {
    id: 'M2-08-Q08',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '1kg 500g は なんg？',
    choices: ['500g', '1005g', '1500g', '15000g'],
    correctAnswer: '1500g'
  },
  {
    id: 'M2-08-Q09',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '2kg 300g は なんg？',
    choices: ['300g', '2003g', '2300g', '23000g'],
    correctAnswer: '2300g'
  },
  {
    id: 'M2-08-Q10',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '3kg 700g は なんg？',
    choices: ['700g', '3007g', '3700g', '37000g'],
    correctAnswer: '3700g'
  },
  {
    id: 'M2-08-Q11',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '1500g は なんkg なんg？',
    choices: ['1kg 5g', '1kg 50g', '1kg 500g', '15kg'],
    correctAnswer: '1kg 500g'
  },
  {
    id: 'M2-08-Q12',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '2400g は なんkg なんg？',
    choices: ['2kg 4g', '2kg 40g', '2kg 400g', '24kg'],
    correctAnswer: '2kg 400g'
  },
  {
    id: 'M2-08-Q13',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '4kg は なんg？',
    choices: ['400g', '1004g', '4000g', '40000g'],
    correctAnswer: '4000g'
  },
  {
    id: 'M2-08-Q14',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '3000g は なんkg？',
    choices: ['1kg', '3kg', '30kg', '300kg'],
    correctAnswer: '3kg'
  },
  {
    id: 'M2-08-Q15',
    unitId: 'M2-08',
    step: 1,
    type: 'choice',
    question: '4kg 200g は なんg？',
    choices: ['200g', '4002g', '4200g', '42000g'],
    correctAnswer: '4200g'
  },

  // =====================================================
  // Step2: おもさの 計算
  // =====================================================
  {
    id: 'M2-08-Q16',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '300g と 400g を あわせると なんg？',
    choices: ['100g', '500g', '700g', '1200g'],
    correctAnswer: '700g'
  },
  {
    id: 'M2-08-Q17',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '500g と 600g を あわせると なんg？',
    choices: ['100g', '1000g', '1100g', '5600g'],
    correctAnswer: '1100g'
  },
  {
    id: 'M2-08-Q18',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '800g から 300g を ひくと なんg？',
    choices: ['300g', '500g', '800g', '1100g'],
    correctAnswer: '500g'
  },
  {
    id: 'M2-08-Q19',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '1kg と 500g を あわせると なんg？',
    choices: ['600g', '1005g', '1500g', '5000g'],
    correctAnswer: '1500g'
  },
  {
    id: 'M2-08-Q20',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '2kg から 800g を ひくと なんg？',
    choices: ['800g', '1000g', '1200g', '2800g'],
    correctAnswer: '1200g'
  },
  {
    id: 'M2-08-Q21',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '1kg 200g と 1kg 300g を あわせると\nなんkg なんg？',
    choices: ['1kg 500g', '2kg 500g', '2kg 5g', '3kg'],
    correctAnswer: '2kg 500g'
  },
  {
    id: 'M2-08-Q22',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '3kg 400g から 1kg 200g を ひくと\nなんkg なんg？',
    choices: ['1kg 200g', '2kg 200g', '2kg 400g', '4kg 600g'],
    correctAnswer: '2kg 200g'
  },
  {
    id: 'M2-08-Q23',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '200g と 200g と 200g を あわせると なんg？',
    choices: ['200g', '400g', '600g', '800g'],
    correctAnswer: '600g'
  },
  {
    id: 'M2-08-Q24',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '1kg から 350g を ひくと なんg？',
    choices: ['350g', '650g', '750g', '1350g'],
    correctAnswer: '650g'
  },
  {
    id: 'M2-08-Q25',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '450g と 550g を あわせると なんg？\nそれは なんkg？',
    choices: ['900g（0.9kg）', '100g（0.1kg）', '1000g（1kg）', '1100g（1.1kg）'],
    correctAnswer: '1000g（1kg）'
  },
  {
    id: 'M2-08-Q26',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '500g と 500g を あわせると なんkg？',
    choices: ['0.5kg', '1kg', '5kg', '10kg'],
    correctAnswer: '1kg'
  },
  {
    id: 'M2-08-Q27',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '2kg 500g と 500g を あわせると なんkg？',
    choices: ['2kg', '3kg', '2kg 100g', '3kg 500g'],
    correctAnswer: '3kg'
  },
  {
    id: 'M2-08-Q28',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '4kg 800g と 4kg 800g を あわせると なんkg なんg？',
    choices: ['8kg 600g', '8kg 800g', '9kg 600g', '9kg 800g'],
    correctAnswer: '9kg 600g'
  },
  {
    id: 'M2-08-Q29',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '700g と 600g を あわせると なんg？',
    choices: ['100g', '1000g', '1300g', '13000g'],
    correctAnswer: '1300g'
  },
  {
    id: 'M2-08-Q30',
    unitId: 'M2-08',
    step: 2,
    type: 'choice',
    question: '1kg 600g から 900g を ひくと なんg？',
    choices: ['500g', '700g', '900g', '1700g'],
    correctAnswer: '700g'
  },

  // =====================================================
  // Step3: 文章題
  // =====================================================
  {
    id: 'M2-08-Q31',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'すいかが 3kg、メロンが 2kg あります。\nあわせて なんkg？',
    choices: ['1kg', '5kg', '6kg', '32kg'],
    correctAnswer: '5kg'
  },
  {
    id: 'M2-08-Q32',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'りんごが 800g、なしが 600g あります。\nあわせて なんg？',
    choices: ['200g', '1200g', '1400g', '8600g'],
    correctAnswer: '1400g'
  },
  {
    id: 'M2-08-Q33',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'かばんの おもさは 1kg 500g です。\nほんを いれたら 2kg 300g に なりました。\nほんの おもさは なんg？',
    choices: ['500g', '700g', '800g', '900g'],
    correctAnswer: '800g'
  },
  {
    id: 'M2-08-Q34',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'たまごが 1こ 60g あります。\n10この おもさは なんg？',
    choices: ['60g', '160g', '600g', '1060g'],
    correctAnswer: '600g'
  },
  {
    id: 'M2-08-Q35',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'Aの にもつは 4kg、Bの にもつは 3kg 500g。\nどちらが おもい？',
    choices: ['A', 'B', 'おなじ', 'わからない'],
    correctAnswer: 'A'
  },
  {
    id: 'M2-08-Q36',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'みかんが 1こ 100g あります。\n8この おもさは なんg？',
    choices: ['108g', '180g', '800g', '1800g'],
    correctAnswer: '800g'
  },
  {
    id: 'M2-08-Q37',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'スイカが 3kg 200g、メロンが 1kg 400g。\nちがいは なんkg なんg？',
    choices: ['1kg 800g', '2kg 800g', '4kg 600g', '3kg 200g'],
    correctAnswer: '1kg 800g'
  },
  {
    id: 'M2-08-Q38',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: '1kg の さとう ぶくろを 3ふくろ かいました。\nあわせて なんkg？',
    choices: ['1kg', '3kg', '10kg', '30kg'],
    correctAnswer: '3kg'
  },
  {
    id: 'M2-08-Q39',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'からの はこの おもさは 300g です。\nりんごを いれたら 1kg 100g に なりました。\nりんごの おもさは なんg？',
    choices: ['400g', '600g', '700g', '800g'],
    correctAnswer: '800g'
  },
  {
    id: 'M2-08-Q40',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'ねこの おもさは 3kg 200g、\nいぬの おもさは 5kg 700g です。\nあわせて なんkg なんg？',
    choices: ['8kg 900g', '8kg 100g', '9kg 900g', '2kg 500g'],
    correctAnswer: '8kg 900g'
  },
  {
    id: 'M2-08-Q41',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'じゃがいもが 2kg、にんじんが 500g。\nあわせて なんg？',
    choices: ['700g', '1500g', '2500g', '25000g'],
    correctAnswer: '2500g'
  },
  {
    id: 'M2-08-Q42',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: '5kg の にもつを 2人で わけます。\nひとりぶんは なんkg？',
    choices: ['2kg', '2kg 500g', '3kg', '5kg'],
    correctAnswer: '2kg 500g'
  },
  {
    id: 'M2-08-Q43',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'A、B、Cの おもさは\nA=200g、B=350g、C=450g です。\nいちばん おもいのは？',
    choices: ['A', 'B', 'C', 'おなじ'],
    correctAnswer: 'C'
  },
  {
    id: 'M2-08-Q44',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'おかあさんの おもさは 54kg。\nこどもの おもさは 23kg。\nあわせて なんkg？',
    choices: ['31kg', '67kg', '77kg', '87kg'],
    correctAnswer: '77kg'
  },
  {
    id: 'M2-08-Q45',
    unitId: 'M2-08',
    step: 3,
    type: 'choice',
    question: 'えびが 350g、さかなが 650g あります。\nあわせると なんkg？',
    choices: ['0.5kg', '1kg', '1.5kg', '3kg'],
    correctAnswer: '1kg'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
