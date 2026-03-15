/**
 * M1-14d.js - Grimoire Guardians 問題データ
 * ユニット: M1-14d「おおきい かず の ひきざん」
 *
 * 対象: 小学1年生、100までの範囲でくりさがりのない引き算
 * 準拠: 日本文教出版 算数1年
 *
 * 【ひみつ】
 *   じゅうのくらいは じゅうのくらいどうし、
 *   いちのくらいは いちのくらいどうし、
 *   べつべつに ひくと かんたん！
 *
 * 設計方針:
 *   14c（たしざん）と同じ3ステップ構造。くりさがりは発生しない計算に限定。
 *   「逆順」でたし算の感覚をそのまま使えることを体感させる。
 *
 * Step構成（シャッフル出題）
 *   Step1: じゅうのくらいどうし（プール9問 → 4問出題）
 *   Step2: いちのくらいをとりだす（プール10問 → 5問出題）
 *   Step3: いちのくらいどうし（くりさがりなし）（プール9問 → 4問出題）
 *   Step4: まとめ・文章題（プール7問 → 2問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: じゅうのくらいどうし（プール9問）
  // =====================================================
  {
    id: 'M1-14d-Q01',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '50 - 20 = ？\n（ごじゅう ひく にじゅう）',
    choices: ['20', '30', '40', '50'],
    correctAnswer: '30',
    explanation: '50（5つ）－ 20（2つ）= 30（3つ）。10のまとまりで かんがえよう！'
  },
  {
    id: 'M1-14d-Q02',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '80 - 30 = ？\n（はちじゅう ひく さんじゅう）',
    choices: ['40', '50', '60', '70'],
    correctAnswer: '50',
    explanation: '80（8つ）－ 30（3つ）= 50（5つ）。'
  },
  {
    id: 'M1-14d-Q03',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '90 - 50 = ？\n（きゅうじゅう ひく ごじゅう）',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '40',
    explanation: '90（9つ）－ 50（5つ）= 40（4つ）。'
  },
  {
    id: 'M1-14d-Q04',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '100 - 30 = ？\n（ひゃく ひく さんじゅう）',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '70',
    explanation: '100（10つ）－ 30（3つ）= 70（7つ）。'
  },
  {
    id: 'M1-14d-Q16',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '60 - 40 = ？\n（ろくじゅう ひく よんじゅう）',
    choices: ['10', '15', '20', '25'],
    correctAnswer: '20',
    explanation: '60（6つ）－ 40（4つ）= 20（2つ）。'
  },
  {
    id: 'M1-14d-Q17',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '100 - 60 = ？\n（ひゃく ひく ろくじゅう）',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '40',
    explanation: '100（10つ）－ 60（6つ）= 40（4つ）。'
  },
  {
    id: 'M1-14d-Q24',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '70 - 30 = ？\n（ななじゅう ひく さんじゅう）',
    choices: ['30', '40', '50', '60'],
    correctAnswer: '40',
    explanation: '70（7つ）－ 30（3つ）= 40（4つ）。'
  },
  {
    id: 'M1-14d-Q25',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '90 - 20 = ？\n（きゅうじゅう ひく にじゅう）',
    choices: ['60', '70', '80', '90'],
    correctAnswer: '70',
    explanation: '90（9つ）－ 20（2つ）= 70（7つ）。'
  },
  {
    id: 'M1-14d-Q26',
    unitId: 'M1-14d',
    step: 1,
    type: 'choice',
    question: '80 - 50 = ？\n（はちじゅう ひく ごじゅう）',
    choices: ['20', '30', '40', '50'],
    correctAnswer: '30',
    explanation: '80（8つ）－ 50（5つ）= 30（3つ）。'
  },

  // =====================================================
  // Step2: いちのくらいをとりだす（プール10問）
  // =====================================================
  {
    id: 'M1-14d-Q05',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '37 - 7 = ？\n（ひみつ: いちのくらいを とりだそう！）',
    choices: ['27', '28', '29', '30'],
    correctAnswer: '30',
    explanation: '37は 30と 7。7－7 = 0。だから 30 + 0 = 30！'
  },
  {
    id: 'M1-14d-Q06',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '48 - 8 = ？',
    choices: ['38', '39', '40', '41'],
    correctAnswer: '40',
    explanation: '48は 40と 8。8－8 = 0。だから 40！'
  },
  {
    id: 'M1-14d-Q07',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '25 - 5 = ？',
    choices: ['18', '19', '20', '21'],
    correctAnswer: '20',
    explanation: '25は 20と 5。5－5 = 0。だから 20！'
  },
  {
    id: 'M1-14d-Q08',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '56 - 6 = ？',
    choices: ['48', '49', '50', '51'],
    correctAnswer: '50',
    explanation: '56は 50と 6。6－6 = 0。だから 50！'
  },
  {
    id: 'M1-14d-Q09',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '93 - 3 = ？',
    choices: ['88', '89', '90', '91'],
    correctAnswer: '90',
    explanation: '93は 90と 3。3－3 = 0。だから 90！'
  },
  {
    id: 'M1-14d-Q18',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '74 - 4 = ？',
    choices: ['68', '69', '70', '71'],
    correctAnswer: '70',
    explanation: '74は 70と 4。4－4 = 0。だから 70！'
  },
  {
    id: 'M1-14d-Q19',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '89 - 9 = ？',
    choices: ['78', '79', '80', '81'],
    correctAnswer: '80',
    explanation: '89は 80と 9。9－9 = 0。だから 80！'
  },
  {
    id: 'M1-14d-Q27',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '62 - 2 = ？',
    choices: ['58', '59', '60', '61'],
    correctAnswer: '60',
    explanation: '62は 60と 2。2－2 = 0。だから 60！'
  },
  {
    id: 'M1-14d-Q28',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '41 - 1 = ？',
    choices: ['38', '39', '40', '41'],
    correctAnswer: '40',
    explanation: '41は 40と 1。1－1 = 0。だから 40！'
  },
  {
    id: 'M1-14d-Q29',
    unitId: 'M1-14d',
    step: 2,
    type: 'choice',
    question: '85 - 5 = ？',
    choices: ['78', '79', '80', '81'],
    correctAnswer: '80',
    explanation: '85は 80と 5。5－5 = 0。だから 80！'
  },

  // =====================================================
  // Step3: いちのくらいのひきざん（くりさがりなし）（プール9問）
  // =====================================================
  {
    id: 'M1-14d-Q10',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '49 - 3 = ？\n（ひみつ: いちのくらいだけ ひこう！）',
    choices: ['44', '45', '46', '47'],
    correctAnswer: '46',
    explanation: '49は 40と 9。9－3 = 6。だから 40 + 6 = 46！'
  },
  {
    id: 'M1-14d-Q11',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '68 - 5 = ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63',
    explanation: '68は 60と 8。8－5 = 3。だから 60 + 3 = 63！'
  },
  {
    id: 'M1-14d-Q12',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '37 - 4 = ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33',
    explanation: '37は 30と 7。7－4 = 3。だから 30 + 3 = 33！'
  },
  {
    id: 'M1-14d-Q13',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '86 - 2 = ？',
    choices: ['82', '83', '84', '85'],
    correctAnswer: '84',
    explanation: '86は 80と 6。6－2 = 4。だから 80 + 4 = 84！'
  },
  {
    id: 'M1-14d-Q20',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '58 - 4 = ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '54',
    explanation: '58は 50と 8。8－4 = 4。だから 50 + 4 = 54！'
  },
  {
    id: 'M1-14d-Q21',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '79 - 6 = ？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73',
    explanation: '79は 70と 9。9－6 = 3。だから 70 + 3 = 73！'
  },
  {
    id: 'M1-14d-Q30',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '27 - 3 = ？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '24',
    explanation: '27は 20と 7。7－3 = 4。だから 20 + 4 = 24！'
  },
  {
    id: 'M1-14d-Q31',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '95 - 2 = ？',
    choices: ['91', '92', '93', '94'],
    correctAnswer: '93',
    explanation: '95は 90と 5。5－2 = 3。だから 90 + 3 = 93！'
  },
  {
    id: 'M1-14d-Q32',
    unitId: 'M1-14d',
    step: 3,
    type: 'choice',
    question: '46 - 3 = ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43',
    explanation: '46は 40と 6。6－3 = 3。だから 40 + 3 = 43！'
  },

  // =====================================================
  // Step4: まとめ・文章題（プール7問）
  // =====================================================
  {
    id: 'M1-14d-Q14',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'クッキーが 50まい あります。\n20まい たべました。のこりは なんまい？',
    choices: ['20まい', '25まい', '30まい', '35まい'],
    correctAnswer: '30まい',
    explanation: '50 - 20 = 30。じゅうのくらいどうしを ひけばOK！'
  },
  {
    id: 'M1-14d-Q15',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'カードが 47まい あります。\n3まい あげました。のこりは なんまい？',
    choices: ['42まい', '43まい', '44まい', '45まい'],
    correctAnswer: '44まい',
    explanation: '47 - 3 = 44。いちのくらいだけ ひいたら OK！'
  },
  {
    id: 'M1-14d-Q22',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'ボールが 70こ あります。\n20こ つかいました。のこりは なんこ？',
    choices: ['40こ', '45こ', '50こ', '55こ'],
    correctAnswer: '50こ',
    explanation: '70 - 20 = 50。じゅうのくらいどうしを ひけばOK！'
  },
  {
    id: 'M1-14d-Q23',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'クッキーが 86こ あります。\n2こ たべました。のこりは なんこ？',
    choices: ['82こ', '83こ', '84こ', '85こ'],
    correctAnswer: '84こ',
    explanation: '86 - 2 = 84。いちのくらいだけ ひいたら OK！'
  },
  {
    id: 'M1-14d-Q33',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'おかしが 90こ あります。\n40こ たべました。のこりは なんこ？',
    choices: ['40こ', '45こ', '50こ', '55こ'],
    correctAnswer: '50こ',
    explanation: '90 - 40 = 50。じゅうのくらいどうしを ひけばOK！'
  },
  {
    id: 'M1-14d-Q34',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'どんぐりが 59こ あります。\n6こ あげました。のこりは なんこ？',
    choices: ['51こ', '52こ', '53こ', '54こ'],
    correctAnswer: '53こ',
    explanation: '59 - 6 = 53。いちのくらいだけ ひいたら OK！'
  },
  {
    id: 'M1-14d-Q35',
    unitId: 'M1-14d',
    step: 4,
    type: 'choice',
    question: 'えんぴつが 80ほん あります。\n30ほん つかいました。のこりは なんほん？',
    choices: ['40ほん', '45ほん', '50ほん', '55ほん'],
    correctAnswer: '50ほん',
    explanation: '80 - 30 = 50。じゅうのくらいどうしを ひけばOK！'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 5 },
  { step: 3, pick: 4 },
  { step: 4, pick: 2 }
];

export default questions;
