/**
 * M2-10j.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-10j「かけざん もんだい」
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 * @version 1.0-draft
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 2〜5のだん 文章題 (15問) ──
  {
    id: 'M2-10j-Q01',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'ふくろに あめが 2こ はいっています。\nふくろが 3つ あると、あめは ぜんぶで なんこですか？',
    choices: ['5こ', '6こ', '7こ', '8こ'],
    correctAnswer: '6こ'
  },
  {
    id: 'M2-10j-Q02',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'えんぴつが 1ひとに 2ほん ずつ あります。\n4にんぶん は なんぼんですか？',
    choices: ['6ほん', '7ほん', '8ほん', '9ほん'],
    correctAnswer: '8ほん'
  },
  {
    id: 'M2-10j-Q03',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'タコの あしは 8ほんです。\nタコが 2ひき いると、あしは ぜんぶで なんぼんですか？',
    choices: ['10ほん', '14ほん', '16ほん', '18ほん'],
    correctAnswer: '16ほん'
  },
  {
    id: 'M2-10j-Q04',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '1はこに クッキーが 3まい はいっています。\n4はこ あると、クッキーは なんまいですか？',
    choices: ['9まい', '10まい', '12まい', '15まい'],
    correctAnswer: '12まい'
  },
  {
    id: 'M2-10j-Q05',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'てぶくろは 1そくで 2まい つかいます。\n5そく では なんまいですか？',
    choices: ['7まい', '8まい', '9まい', '10まい'],
    correctAnswer: '10まい'
  },
  {
    id: 'M2-10j-Q06',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'はなびらが 1りんに 3まい あります。\nはなが 5りん さいています。\nはなびらは ぜんぶで なんまいですか？',
    choices: ['8まい', '12まい', '15まい', '18まい'],
    correctAnswer: '15まい'
  },
  {
    id: 'M2-10j-Q07',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '4人の こどもが それぞれ 2こ ずつ おかしを もっています。\nあわせて なんこですか？',
    choices: ['6こ', '7こ', '8こ', '9こ'],
    correctAnswer: '8こ'
  },
  {
    id: 'M2-10j-Q08',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'サッカーチームは 5人 います。\nチームが 3つ あると ぜんぶで なんにんですか？',
    choices: ['8にん', '12にん', '15にん', '20にん'],
    correctAnswer: '15にん'
  },
  {
    id: 'M2-10j-Q09',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '3だん の たなが 4つ あります。\nたなは ぜんぶで なんだんですか？',
    choices: ['9だん', '10だん', '12だん', '15だん'],
    correctAnswer: '12だん'
  },
  {
    id: 'M2-10j-Q10',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '1まいの かみを おると 4まいに なります。\n3まい おると なんまいになりますか？',
    choices: ['7まい', '9まい', '12まい', '16まい'],
    correctAnswer: '12まい'
  },
  {
    id: 'M2-10j-Q11',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '5円玉が 4まい あります。\nあわせて なんえんですか？',
    choices: ['9えん', '15えん', '20えん', '25えん'],
    correctAnswer: '20えん'
  },
  {
    id: 'M2-10j-Q12',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: 'おにぎりが 1さらに 2こ のっています。\n5さら あると なんこですか？',
    choices: ['7こ', '8こ', '9こ', '10こ'],
    correctAnswer: '10こ'
  },
  {
    id: 'M2-10j-Q13',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '3ほんずつ たばねた はなたばが 5たば あります。\nはなは ぜんぶで なんぼんですか？',
    choices: ['8ほん', '12ほん', '15ほん', '18ほん'],
    correctAnswer: '15ほん'
  },
  {
    id: 'M2-10j-Q14',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '2ほんずつ まとめた えんぴつが 5たば あります。\nえんぴつは ぜんぶで なんぼんですか？',
    choices: ['7ほん', '9ほん', '10ほん', '12ほん'],
    correctAnswer: '10ほん'
  },
  {
    id: 'M2-10j-Q15',
    unitId: 'M2-10j',
    step: 1,
    type: 'text',
    question: '4まいずつ カードを くばります。\n4にんに くばると なんまいですか？',
    choices: ['8まい', '12まい', '16まい', '20まい'],
    correctAnswer: '16まい'
  },

  // ── Step 2: 6〜9のだん 文章題 (15問) ──
  {
    id: 'M2-10j-Q16',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: 'むしの あしは 6ほんです。\nむしが 3びき いると あしは ぜんぶで なんぼんですか？',
    choices: ['9ほん', '14ほん', '18ほん', '24ほん'],
    correctAnswer: '18ほん'
  },
  {
    id: 'M2-10j-Q17',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '1しゅうに 7日 あります。\n3しゅうは なんにちですか？',
    choices: ['14にち', '18にち', '21にち', '24にち'],
    correctAnswer: '21にち'
  },
  {
    id: 'M2-10j-Q18',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: 'たこやきが 1パックに 8こ はいっています。\n3パック かうと なんこですか？',
    choices: ['16こ', '21こ', '24こ', '27こ'],
    correctAnswer: '24こ'
  },
  {
    id: 'M2-10j-Q19',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '9えんの あめを 4こ かいます。\nだいきんは なんえんですか？',
    choices: ['27えん', '32えん', '36えん', '40えん'],
    correctAnswer: '36えん'
  },
  {
    id: 'M2-10j-Q20',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '6まいずつ かさなった かみが 4つ あります。\nかみは ぜんぶで なんまいですか？',
    choices: ['18まい', '20まい', '24まい', '28まい'],
    correctAnswer: '24まい'
  },
  {
    id: 'M2-10j-Q21',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: 'クモの あしは 8ほんです。\nクモが 4ひき いると あしは ぜんぶで なんぼんですか？',
    choices: ['24ほん', '28ほん', '32ほん', '36ほん'],
    correctAnswer: '32ほん'
  },
  {
    id: 'M2-10j-Q22',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: 'バスに 7にん のれます。\nバスが 5だい あると なんにん のれますか？',
    choices: ['28にん', '30にん', '35にん', '42にん'],
    correctAnswer: '35にん'
  },
  {
    id: 'M2-10j-Q23',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '9cmの テープが 6ほん あります。\nぜんぶ つなげると なんcmですか？',
    choices: ['45cm', '48cm', '54cm', '63cm'],
    correctAnswer: '54cm'
  },
  {
    id: 'M2-10j-Q24',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: 'さかなが 8ひきずつ 7つの すいそうに います。\nぜんぶで なんびきですか？',
    choices: ['48ひき', '54ひき', '56ひき', '63ひき'],
    correctAnswer: '56ひき'
  },
  {
    id: 'M2-10j-Q25',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '6このだんご が 7ほん あります。\nだんごは ぜんぶで なんこですか？',
    choices: ['36こ', '40こ', '42こ', '48こ'],
    correctAnswer: '42こ'
  },
  {
    id: 'M2-10j-Q26',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '7えんの シールを 8まい かいます。\nだいきんは なんえんですか？',
    choices: ['49えん', '54えん', '56えん', '63えん'],
    correctAnswer: '56えん'
  },
  {
    id: 'M2-10j-Q27',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '9にんずつ 9つの グループに わかれました。\nぜんぶで なんにんですか？',
    choices: ['72にん', '81にん', '90にん', '99にん'],
    correctAnswer: '81にん'
  },
  {
    id: 'M2-10j-Q28',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '8まいずつ わけた かみが 8たば あります。\nかみは ぜんぶで なんまいですか？',
    choices: ['56まい', '60まい', '63まい', '64まい'],
    correctAnswer: '64まい'
  },
  {
    id: 'M2-10j-Q29',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: 'はちの あしは 6ほんです。\nはちが 7ひき いると あしは なんぼんですか？',
    choices: ['36ほん', '40ほん', '42ほん', '48ほん'],
    correctAnswer: '42ほん'
  },
  {
    id: 'M2-10j-Q30',
    unitId: 'M2-10j',
    step: 2,
    type: 'text',
    question: '9日ずつ の まとまりが 8こ あります。\nぜんぶで なんにちですか？',
    choices: ['63にち', '64にち', '72にち', '81にち'],
    correctAnswer: '72にち'
  },

  // ── Step 3: 混合・やや難しい文章題 (15問) ──
  {
    id: 'M2-10j-Q31',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'いちごが 6こずつ 4さら あります。\n3こ たべると のこりは なんこですか？',
    choices: ['18こ', '20こ', '21こ', '24こ'],
    correctAnswer: '21こ'
  },
  {
    id: 'M2-10j-Q32',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'えんぴつが 7ほんずつ 5たば あります。\nそのうち 8ほん つかうと のこりは なんぼんですか？',
    choices: ['25ほん', '27ほん', '29ほん', '35ほん'],
    correctAnswer: '27ほん'
  },
  {
    id: 'M2-10j-Q33',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'ノートが 1さつ 8えん です。\n3さつ かうと ぜんぶで なんえんですか？',
    choices: ['16えん', '21えん', '24えん', '32えん'],
    correctAnswer: '24えん'
  },
  {
    id: 'M2-10j-Q34',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '□ × 3 = 18\n□に あてはまる かずは なんですか？',
    choices: ['4', '5', '6', '7'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10j-Q35',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '7 × □ = 35\n□に あてはまる かずは なんですか？',
    choices: ['3', '4', '5', '6'],
    correctAnswer: '5'
  },
  {
    id: 'M2-10j-Q36',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '□ × 8 = 48\n□に あてはまる かずは なんですか？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '6'
  },
  {
    id: 'M2-10j-Q37',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '9 × □ = 63\n□に あてはまる かずは なんですか？',
    choices: ['5', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: 'M2-10j-Q38',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'りょうてに 5このりんごを もった こどもが 6にん います。\nりんごは ぜんぶで なんこですか？',
    choices: ['25こ', '30こ', '36こ', '45こ'],
    correctAnswer: '30こ'
  },
  {
    id: 'M2-10j-Q39',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '4cmの ひごが あります。\nこれを 9ほん つなぐと なんcmですか？',
    choices: ['27cm', '32cm', '36cm', '40cm'],
    correctAnswer: '36cm'
  },
  {
    id: 'M2-10j-Q40',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'みかんが 8こずつ 入った はこが 7はこ あります。\n9こ たべると のこりは なんこですか？',
    choices: ['47こ', '48こ', '49こ', '56こ'],
    correctAnswer: '47こ'
  },
  {
    id: 'M2-10j-Q41',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'こどもが 9にん います。\nひとりに 6このくり を くばると ぜんぶで なんこ いりますか？',
    choices: ['45こ', '48こ', '54こ', '63こ'],
    correctAnswer: '54こ'
  },
  {
    id: 'M2-10j-Q42',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '3 × 6 と おなじ こたえは どれですか？',
    choices: ['2 × 8', '4 × 5', '6 × 3', '2 × 9'],
    correctAnswer: '6 × 3'
  },
  {
    id: 'M2-10j-Q43',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: 'よこ 4こ、たて 7こ ならんだ タイルが あります。\nぜんぶで なんこですか？',
    choices: ['21こ', '24こ', '28こ', '32こ'],
    correctAnswer: '28こ'
  },
  {
    id: 'M2-10j-Q44',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '□ × 9 = 72\n□に あてはまる かずは なんですか？',
    choices: ['6', '7', '8', '9'],
    correctAnswer: '8'
  },
  {
    id: 'M2-10j-Q45',
    unitId: 'M2-10j',
    step: 3,
    type: 'text',
    question: '2つの かけざんの こたえを くらべます。\n5 × 8 と 4 × 9 では どちらが おおきいですか？',
    choices: ['5 × 8', '4 × 9', 'おなじ', 'わからない'],
    correctAnswer: '5 × 8'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
