/**
 * M1-16a.js - Grimoire Guardians 問題データ
 * ユニット: M1-16a「ずを つかって（たしざん 文章題）」
 *
 * 対象: 小学1年生、たし算を使う文章題
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   「ずをつかってかんがえよう」は、場面を言葉で読み取り、
 *   正しい演算（たし算）を選んで計算する力を育てる最終関門。
 *   絵文字で場面を視覚化し、「あわせて」「ぜんぶで」「ふえると」
 *   などのキーワードを使ってたし算の場面を識別する力を養う。
 *
 *   数値は小さい数（1〜20）から始め、後半で100までの数も扱う。
 *
 * Step構成（シャッフル出題）
 *   Step1: あわせていくつ（小さい数）（プール7問 → 5問出題）
 *   Step2: ふえると いくつ（プール7問 → 5問出題）
 *   Step3: 100まで の たしざん 文章題（プール7問 → 5問出題）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: あわせていくつ（小さい数）（プール7問）
  // =====================================================
  {
    id: 'M1-16a-Q01',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: '🍎🍎🍎🍎🍎 りんごが 5こ、\n🍊🍊🍊 みかんが 3こ あります。\nあわせて なんこ？',
    choices: ['6こ', '7こ', '8こ', '9こ'],
    correctAnswer: '8こ',
    explanation: '5 + 3 = 8。「あわせて」はたし算のサイン！'
  },
  {
    id: 'M1-16a-Q02',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: '✏️✏️✏️✏️✏️✏️ えんぴつが 6ほん、\n🖍️🖍️🖍️🖍️ クレヨンが 4ほん あります。\nあわせて なんほん？',
    choices: ['8ほん', '9ほん', '10ほん', '11ほん'],
    correctAnswer: '10ほん',
    explanation: '6 + 4 = 10。「あわせて」はたし算！'
  },
  {
    id: 'M1-16a-Q03',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: '🌸🌸🌸🌸🌸🌸🌸 赤いはなが 7ほん、\n🌼🌼🌼🌼🌼🌼🌼🌼 しろいはなが 8ほん あります。\nあわせて なんほん？',
    choices: ['13ほん', '14ほん', '15ほん', '16ほん'],
    correctAnswer: '15ほん',
    explanation: '7 + 8 = 15。'
  },
  {
    id: 'M1-16a-Q04',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: 'きのう どんぐりを 8こ ひろいました。\nきょう 4こ ひろいました。\nあわせて なんこ？',
    choices: ['10こ', '11こ', '12こ', '13こ'],
    correctAnswer: '12こ',
    explanation: '8 + 4 = 12。「あわせて」はたし算！'
  },
  {
    id: 'M1-16a-Q05',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: 'こうえんに 子どもが 12にん、\nおとなが 5にん います。\nあわせて なんにん？',
    choices: ['15にん', '16にん', '17にん', '18にん'],
    correctAnswer: '17にん',
    explanation: '12 + 5 = 17。'
  },
  {
    id: 'M1-16a-Q16',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: '📚 本が 11さつ、\n📖 マンガが 7さつ あります。\nあわせて なんさつ？',
    choices: ['16さつ', '17さつ', '18さつ', '19さつ'],
    correctAnswer: '18さつ',
    explanation: '11 + 7 = 18。「あわせて」はたし算！'
  },
  {
    id: 'M1-16a-Q17',
    unitId: 'M1-16a',
    step: 1,
    type: 'choice',
    question: '🎂 ケーキが 6こ、\n🍪 クッキーが 8こ あります。\nあわせて なんこ？',
    choices: ['12こ', '13こ', '14こ', '15こ'],
    correctAnswer: '14こ',
    explanation: '6 + 8 = 14。「あわせて」はたし算！'
  },

  // =====================================================
  // Step2: ふえると いくつ（プール7問）
  // =====================================================
  {
    id: 'M1-16a-Q06',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: '🍓🍓🍓🍓🍓🍓🍓🍓 いちごが 8こ あります。\n🍓🍓🍓 3こ もらいました。\nなんこに なりましたか？',
    choices: ['9こ', '10こ', '11こ', '12こ'],
    correctAnswer: '11こ',
    explanation: '8 + 3 = 11。「もらった」のでたし算！'
  },
  {
    id: 'M1-16a-Q07',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: 'おはじきが 14こ あります。\n5こ もらって なんこに なりましたか？',
    choices: ['16こ', '17こ', '18こ', '19こ'],
    correctAnswer: '19こ',
    explanation: '14 + 5 = 19。'
  },
  {
    id: 'M1-16a-Q08',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: 'バスに 15にん のっています。\n🚌 ていりゅうじょで 6にん のってきました。\nなんにんに なりましたか？',
    choices: ['19にん', '20にん', '21にん', '22にん'],
    correctAnswer: '21にん',
    explanation: '15 + 6 = 21。「のってきた」のでたし算！'
  },
  {
    id: 'M1-16a-Q09',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: '📚 本が 18さつ あります。\nきょう としょかんで 7さつ かりました。\nぜんぶで なんさつ？',
    choices: ['23さつ', '24さつ', '25さつ', '26さつ'],
    correctAnswer: '25さつ',
    explanation: '18 + 7 = 25。'
  },
  {
    id: 'M1-16a-Q10',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: '⭐ シールが 24まい あります。\n11まい もらって なんまいに なりましたか？',
    choices: ['33まい', '34まい', '35まい', '36まい'],
    correctAnswer: '35まい',
    explanation: '24 + 11 = 35。'
  },
  {
    id: 'M1-16a-Q18',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: '⭐ シールが 16まい あります。\n7まい もらいました。\nなんまいに なりましたか？',
    choices: ['21まい', '22まい', '23まい', '24まい'],
    correctAnswer: '23まい',
    explanation: '16 + 7 = 23。「もらった」のでたし算！'
  },
  {
    id: 'M1-16a-Q19',
    unitId: 'M1-16a',
    step: 2,
    type: 'choice',
    question: '📚 本が 22さつ あります。\nきょう 8さつ かりました。\nぜんぶで なんさつ？',
    choices: ['28さつ', '29さつ', '30さつ', '31さつ'],
    correctAnswer: '30さつ',
    explanation: '22 + 8 = 30。'
  },

  // =====================================================
  // Step3: 100まで の たしざん 文章題（プール7問）
  // =====================================================
  {
    id: 'M1-16a-Q11',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '🔴 赤いボールが 20こ、\n🔵 青いボールが 30こ あります。\nあわせて なんこ？',
    choices: ['40こ', '50こ', '60こ', '70こ'],
    correctAnswer: '50こ',
    explanation: '20 + 30 = 50。じゅうのくらいどうしを たせばOK！'
  },
  {
    id: 'M1-16a-Q12',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '👦 男のこが 35にん、\n👧 女のこが 4にん います。\nあわせて なんにん？',
    choices: ['37にん', '38にん', '39にん', '40にん'],
    correctAnswer: '39にん',
    explanation: '35 + 4 = 39。いちのくらいだけ たせばOK！'
  },
  {
    id: 'M1-16a-Q13',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '💎 ビーズが 42こ あります。\n6こ もらいました。ぜんぶで なんこ？',
    choices: ['46こ', '47こ', '48こ', '49こ'],
    correctAnswer: '48こ',
    explanation: '42 + 6 = 48。'
  },
  {
    id: 'M1-16a-Q14',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '📚 本が 53さつ あります。\nきのう としょかんで 20さつ かりました。\nぜんぶで なんさつ？',
    choices: ['63さつ', '73さつ', '75さつ', '83さつ'],
    correctAnswer: '73さつ',
    explanation: '53 + 20 = 73。じゅうのくらいだけ たせばOK！'
  },
  {
    id: 'M1-16a-Q15',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '🍬 おかしが 61こ あります。\nおみやげで 8こ もらいました。\nぜんぶで なんこ？',
    choices: ['67こ', '68こ', '69こ', '70こ'],
    correctAnswer: '69こ',
    explanation: '61 + 8 = 69。いちのくらいだけ たせばOK！'
  },
  {
    id: 'M1-16a-Q20',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '🔵 青いボールが 43こ、\n🔴 赤いボールが 20こ あります。\nあわせて なんこ？',
    choices: ['53こ', '61こ', '63こ', '65こ'],
    correctAnswer: '63こ',
    explanation: '43 + 20 = 63。じゅうのくらいだけ たせばOK！'
  },
  {
    id: 'M1-16a-Q21',
    unitId: 'M1-16a',
    step: 3,
    type: 'choice',
    question: '⭐ シールが 52まい あります。\n6まい もらいました。\nぜんぶで なんまい？',
    choices: ['55まい', '56まい', '57まい', '58まい'],
    correctAnswer: '58まい',
    explanation: '52 + 6 = 58。いちのくらいだけ たせばOK！'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
