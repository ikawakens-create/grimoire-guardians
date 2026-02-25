/**
 * M1-16b.js - Grimoire Guardians 問題データ
 * ユニット: M1-16b「ずを つかって（ひきざん 文章題）」
 *
 * 対象: 小学1年生、ひき算を使う文章題
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   「のこりはいくつ」と「ちがいはいくつ」の2つの場面を丁寧に扱う。
 *   「のこり」：食べた・使った・あげた → ひき算
 *   「ちがい」：どちらがおおい・どれだけちがう → ひき算（比較）
 *   後半で100までの数を使い、M1-14dとの連携を意識する。
 *
 * カテゴリ構成（15問）
 *   Category A: のこりは いくつ（小さい数）（5問）← やさしい
 *   Category B: ちがいは いくつ（5問）← 比較型は少し難しい
 *   Category C: 100まで の ひきざん 文章題（5問）← 14dとの連携
 *
 * @version 1.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Category A: のこりは いくつ（5問）
  // 「食べた」「使った」「あげた」= ひき算
  // =====================================================
  {
    id: 'M1-16b-Q01',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎 りんごが 10こ あります。\n3こ たべました。のこりは なんこ？',
    choices: ['5こ', '6こ', '7こ', '8こ'],
    correctAnswer: '7こ',
    explanation: '10 - 3 = 7。「たべた」「つかった」はひき算のサイン！'
  },
  {
    id: 'M1-16b-Q02',
    unitId: 'M1-16b',
    type: 'choice',
    question: 'おはじきが 15こ あります。\n6こ つかいました。のこりは なんこ？',
    choices: ['7こ', '8こ', '9こ', '10こ'],
    correctAnswer: '9こ',
    explanation: '15 - 6 = 9。'
  },
  {
    id: 'M1-16b-Q03',
    unitId: 'M1-16b',
    type: 'choice',
    question: '⭐ シールが 18まい あります。\n9まい おともだちに あげました。\nのこりは なんまい？',
    choices: ['7まい', '8まい', '9まい', '10まい'],
    correctAnswer: '9まい',
    explanation: '18 - 9 = 9。「あげた」のでひき算！'
  },
  {
    id: 'M1-16b-Q04',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🎂 ケーキが 12こ あります。\n5こ たべました。のこりは なんこ？',
    choices: ['5こ', '6こ', '7こ', '8こ'],
    correctAnswer: '7こ',
    explanation: '12 - 5 = 7。'
  },
  {
    id: 'M1-16b-Q05',
    unitId: 'M1-16b',
    type: 'choice',
    question: '📚 本が 20さつ あります。\n7さつ かえしました。のこりは なんさつ？',
    choices: ['11さつ', '12さつ', '13さつ', '14さつ'],
    correctAnswer: '13さつ',
    explanation: '20 - 7 = 13。'
  },

  // =====================================================
  // Category B: ちがいは いくつ（5問）
  // 「どちらがおおい」「どれだけちがう」型の比較問題
  // =====================================================
  {
    id: 'M1-16b-Q06',
    unitId: 'M1-16b',
    type: 'choice',
    question: 'みきさんは シールを 9まい、\nゆうさんは 6まい もっています。\nみきさんは ゆうさんより なんまい おおい？',
    choices: ['2まい', '3まい', '4まい', '5まい'],
    correctAnswer: '3まい',
    explanation: '9 - 6 = 3。「ちがい」はひき算で わかる！'
  },
  {
    id: 'M1-16b-Q07',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🌸 赤いはなが 13ほん、\n🌼 しろいはなが 8ほん あります。\nちがいは なんほん？',
    choices: ['4ほん', '5ほん', '6ほん', '7ほん'],
    correctAnswer: '5ほん',
    explanation: '13 - 8 = 5。「ちがい」をしらべるときもひき算！'
  },
  {
    id: 'M1-16b-Q08',
    unitId: 'M1-16b',
    type: 'choice',
    question: 'Aくんは 17てん、Bくんは 11てん。\nちがいは なんてん？',
    choices: ['4てん', '5てん', '6てん', '7てん'],
    correctAnswer: '6てん',
    explanation: '17 - 11 = 6。'
  },
  {
    id: 'M1-16b-Q09',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🐱 ねこが 15ひき、🐶 いぬが 9ひき います。\nねこは いぬより なんびき おおい？',
    choices: ['4ひき', '5ひき', '6ひき', '7ひき'],
    correctAnswer: '6ひき',
    explanation: '15 - 9 = 6。'
  },
  {
    id: 'M1-16b-Q10',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🍎 りんごが 20こ、\n🍊 みかんが 12こ あります。\nちがいは なんこ？',
    choices: ['6こ', '7こ', '8こ', '9こ'],
    correctAnswer: '8こ',
    explanation: '20 - 12 = 8。'
  },

  // =====================================================
  // Category C: 100まで の ひきざん 文章題（5問）
  // M1-14dで学んだ100までのひき算を文章題で応用
  // =====================================================
  {
    id: 'M1-16b-Q11',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🍬 おかしが 50こ あります。\n20こ たべました。のこりは なんこ？',
    choices: ['20こ', '25こ', '30こ', '35こ'],
    correctAnswer: '30こ',
    explanation: '50 - 20 = 30。じゅうのくらいどうしを ひけばOK！'
  },
  {
    id: 'M1-16b-Q12',
    unitId: 'M1-16b',
    type: 'choice',
    question: '💎 ビー玉が 47こ あります。\n3こ おともだちに あげました。\nのこりは なんこ？',
    choices: ['42こ', '43こ', '44こ', '45こ'],
    correctAnswer: '44こ',
    explanation: '47 - 3 = 44。いちのくらいだけ ひけばOK！'
  },
  {
    id: 'M1-16b-Q13',
    unitId: 'M1-16b',
    type: 'choice',
    question: '📚 本が 68さつ あります。\n5さつ かえしました。のこりは なんさつ？',
    choices: ['61さつ', '62さつ', '63さつ', '64さつ'],
    correctAnswer: '63さつ',
    explanation: '68 - 5 = 63。いちのくらいだけ ひけばOK！'
  },
  {
    id: 'M1-16b-Q14',
    unitId: 'M1-16b',
    type: 'choice',
    question: '🔵 青いボールが 75こ、\n🔴 赤いボールが 72こ あります。\nちがいは なんこ？',
    choices: ['1こ', '2こ', '3こ', '4こ'],
    correctAnswer: '3こ',
    explanation: '75 - 72 = 3。いちのくらいどうしを ひけばOK！'
  },
  {
    id: 'M1-16b-Q15',
    unitId: 'M1-16b',
    type: 'choice',
    question: '💴 100えん もって います。\n37えんの おかしを かいました。\nのこりは なんえん？',
    choices: ['53えん', '60えん', '63えん', '67えん'],
    correctAnswer: '63えん',
    explanation: '100 - 37 = 63。（100 - 30 = 70、70 - 7 = 63）'
  }
];

export default questions;
