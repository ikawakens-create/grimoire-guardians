/**
 * M1-14c.js - Grimoire Guardians 問題データ
 * ユニット: M1-14c「おおきい かず の たしざん」
 *
 * 対象: 小学1年生、100までの範囲でくりあがりのない足し算
 * 準拠: 日本文教出版 算数1年
 *
 * 【ひみつ】
 *   じゅうのくらいは じゅうのくらいどうし、
 *   いちのくらいは いちのくらいどうし、
 *   べつべつに たすと かんたん！
 *
 * 設計方針:
 *   3つのステップで無理なく習得できるよう段階設計。
 *   くりあがりは発生しない計算に限定（くりあがりはM1-10で学習済み）。
 *
 * Step構成（シャッフル出題）
 *   Step1: じゅうのくらいどうし（プール6問 → 4問出題）
 *   Step2: じゅうのくらいに いちのくらいを たす（プール7問 → 5問出題）
 *   Step3: いちのくらいどうし（くりあがりなし）（プール6問 → 4問出題）
 *   Step4: まとめ・文章題（プール4問 → 2問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: じゅうのくらいどうし（プール6問）
  // =====================================================
  {
    id: 'M1-14c-Q01',
    unitId: 'M1-14c',
    step: 1,
    type: 'choice',
    question: '20 + 30 = ？\n（にじゅう たす さんじゅう）',
    choices: ['40', '50', '60', '70'],
    correctAnswer: '50',
    explanation: '20（2つ）＋ 30（3つ）= 50（5つ）。10のまとまりで かんがえよう！'
  },
  {
    id: 'M1-14c-Q02',
    unitId: 'M1-14c',
    step: 1,
    type: 'choice',
    question: '40 + 50 = ？\n（よんじゅう たす ごじゅう）',
    choices: ['70', '80', '90', '100'],
    correctAnswer: '90',
    explanation: '40（4つ）＋ 50（5つ）= 90（9つ）。'
  },
  {
    id: 'M1-14c-Q03',
    unitId: 'M1-14c',
    step: 1,
    type: 'choice',
    question: '30 + 40 = ？\n（さんじゅう たす よんじゅう）',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '70',
    explanation: '30（3つ）＋ 40（4つ）= 70（7つ）。'
  },
  {
    id: 'M1-14c-Q04',
    unitId: 'M1-14c',
    step: 1,
    type: 'choice',
    question: '20 + 60 = ？\n（にじゅう たす ろくじゅう）',
    choices: ['60', '70', '80', '90'],
    correctAnswer: '80',
    explanation: '20（2つ）＋ 60（6つ）= 80（8つ）。'
  },
  {
    id: 'M1-14c-Q16',
    unitId: 'M1-14c',
    step: 1,
    type: 'choice',
    question: '10 + 70 = ？\n（じゅう たす ななじゅう）',
    choices: ['60', '70', '80', '90'],
    correctAnswer: '80',
    explanation: '10（1つ）＋ 70（7つ）= 80（8つ）。'
  },
  {
    id: 'M1-14c-Q17',
    unitId: 'M1-14c',
    step: 1,
    type: 'choice',
    question: '50 + 20 = ？\n（ごじゅう たす にじゅう）',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '70',
    explanation: '50（5つ）＋ 20（2つ）= 70（7つ）。'
  },

  // =====================================================
  // Step2: じゅうのくらいに いちのくらいを たす（プール7問）
  // =====================================================
  {
    id: 'M1-14c-Q05',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '30 + 4 = ？\n（さんじゅう たす し）',
    choices: ['33', '34', '35', '36'],
    correctAnswer: '34',
    explanation: '30と 4を あわせると 34（さんじゅうし）。'
  },
  {
    id: 'M1-14c-Q06',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '50 + 7 = ？\n（ごじゅう たす なな）',
    choices: ['55', '56', '57', '58'],
    correctAnswer: '57',
    explanation: '50と 7を あわせると 57（ごじゅうなな）。'
  },
  {
    id: 'M1-14c-Q07',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '20 + 9 = ？\n（にじゅう たす きゅう）',
    choices: ['27', '28', '29', '30'],
    correctAnswer: '29',
    explanation: '20と 9を あわせると 29（にじゅうきゅう）。'
  },
  {
    id: 'M1-14c-Q08',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '60 + 5 = ？\n（ろくじゅう たす ご）',
    choices: ['63', '64', '65', '66'],
    correctAnswer: '65',
    explanation: '60と 5を あわせると 65（ろくじゅうご）。'
  },
  {
    id: 'M1-14c-Q09',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '80 + 3 = ？\n（はちじゅう たす さん）',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83',
    explanation: '80と 3を あわせると 83（はちじゅうさん）。'
  },
  {
    id: 'M1-14c-Q18',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '40 + 6 = ？\n（よんじゅう たす ろく）',
    choices: ['44', '45', '46', '47'],
    correctAnswer: '46',
    explanation: '40と 6を あわせると 46（よんじゅうろく）。'
  },
  {
    id: 'M1-14c-Q19',
    unitId: 'M1-14c',
    step: 2,
    type: 'choice',
    question: '70 + 8 = ？\n（ななじゅう たす はち）',
    choices: ['76', '77', '78', '79'],
    correctAnswer: '78',
    explanation: '70と 8を あわせると 78（ななじゅうはち）。'
  },

  // =====================================================
  // Step3: いちのくらいどうし（くりあがりなし）（プール6問）
  // =====================================================
  {
    id: 'M1-14c-Q10',
    unitId: 'M1-14c',
    step: 3,
    type: 'choice',
    question: '43 + 5 = ？\n（ひみつ: いちのくらいだけ たそう！）',
    choices: ['46', '47', '48', '49'],
    correctAnswer: '48',
    explanation: '43は 40と 3。3 + 5 = 8。だから 40 + 8 = 48！'
  },
  {
    id: 'M1-14c-Q11',
    unitId: 'M1-14c',
    step: 3,
    type: 'choice',
    question: '62 + 7 = ？',
    choices: ['67', '68', '69', '70'],
    correctAnswer: '69',
    explanation: '62は 60と 2。2 + 7 = 9。だから 60 + 9 = 69！'
  },
  {
    id: 'M1-14c-Q12',
    unitId: 'M1-14c',
    step: 3,
    type: 'choice',
    question: '35 + 4 = ？',
    choices: ['37', '38', '39', '40'],
    correctAnswer: '39',
    explanation: '35は 30と 5。5 + 4 = 9。だから 30 + 9 = 39！'
  },
  {
    id: 'M1-14c-Q13',
    unitId: 'M1-14c',
    step: 3,
    type: 'choice',
    question: '71 + 6 = ？',
    choices: ['76', '77', '78', '79'],
    correctAnswer: '77',
    explanation: '71は 70と 1。1 + 6 = 7。だから 70 + 7 = 77！'
  },
  {
    id: 'M1-14c-Q20',
    unitId: 'M1-14c',
    step: 3,
    type: 'choice',
    question: '54 + 3 = ？',
    choices: ['55', '56', '57', '58'],
    correctAnswer: '57',
    explanation: '54は 50と 4。4 + 3 = 7。だから 50 + 7 = 57！'
  },
  {
    id: 'M1-14c-Q21',
    unitId: 'M1-14c',
    step: 3,
    type: 'choice',
    question: '81 + 4 = ？',
    choices: ['83', '84', '85', '86'],
    correctAnswer: '85',
    explanation: '81は 80と 1。1 + 4 = 5。だから 80 + 5 = 85！'
  },

  // =====================================================
  // Step4: まとめ・文章題（プール4問）
  // =====================================================
  {
    id: 'M1-14c-Q14',
    unitId: 'M1-14c',
    step: 4,
    type: 'choice',
    question: 'りんごが 30こ、みかんが 20こ あります。\nあわせて なんこ？',
    choices: ['40こ', '50こ', '60こ', '70こ'],
    correctAnswer: '50こ',
    explanation: '30 + 20 = 50。じゅうのくらいどうしを たせばOK！'
  },
  {
    id: 'M1-14c-Q15',
    unitId: 'M1-14c',
    step: 4,
    type: 'choice',
    question: 'シールが 45まい あります。\n3まい もらいました。ぜんぶで なんまい？',
    choices: ['46まい', '47まい', '48まい', '49まい'],
    correctAnswer: '48まい',
    explanation: '45 + 3 = 48。いちのくらいだけ たしたら OK！'
  },
  {
    id: 'M1-14c-Q22',
    unitId: 'M1-14c',
    step: 4,
    type: 'choice',
    question: 'えんぴつが 30ほん、ペンが 40ほん あります。\nあわせて なんほん？',
    choices: ['50ほん', '60ほん', '70ほん', '80ほん'],
    correctAnswer: '70ほん',
    explanation: '30 + 40 = 70。じゅうのくらいどうしを たせばOK！'
  },
  {
    id: 'M1-14c-Q23',
    unitId: 'M1-14c',
    step: 4,
    type: 'choice',
    question: 'カードが 62まい あります。\n5まい もらいました。ぜんぶで なんまい？',
    choices: ['65まい', '66まい', '67まい', '68まい'],
    correctAnswer: '67まい',
    explanation: '62 + 5 = 67。いちのくらいだけ たしたら OK！'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 5 },
  { step: 3, pick: 4 },
  { step: 4, pick: 2 }
];

export default questions;
