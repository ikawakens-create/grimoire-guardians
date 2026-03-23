/**
 * M2-09a.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-09a「じこくと じかん①（時刻の 読み方・午前午後）」
 *
 * 対象: 小学2年生、時刻の読み取り・午前/午後
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 時刻の 読み取り（とけい）   （プール15問 → 5問出題）
 *   Step2: 午前・午後 と 時刻         （プール15問 → 5問出題）
 *   Step3: 文章題（時刻の よみかた）   （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 時刻の 読み取り（とけい）
  // ※ type:'clock' を使い ClockFace.js で SVG レンダリング
  // =====================================================
  {
    id: 'M2-09a-Q01',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 3, minute: 15 },
    choices: ['3時10分', '3時15分', '3時20分', '4時15分'],
    correctAnswer: '3時15分'
  },
  {
    id: 'M2-09a-Q02',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 6, minute: 30 },
    choices: ['5時30分', '6時25分', '6時30分', '6時35分'],
    correctAnswer: '6時30分'
  },
  {
    id: 'M2-09a-Q03',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 9, minute: 45 },
    choices: ['9時40分', '9時45分', '9時50分', '10時45分'],
    correctAnswer: '9時45分'
  },
  {
    id: 'M2-09a-Q04',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 12, minute: 0 },
    choices: ['11時55分', '12時0分', '12時5分', '1時0分'],
    correctAnswer: '12時0分'
  },
  {
    id: 'M2-09a-Q05',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 2, minute: 20 },
    choices: ['2時15分', '2時20分', '2時25分', '3時20分'],
    correctAnswer: '2時20分'
  },
  {
    id: 'M2-09a-Q06',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 7, minute: 55 },
    choices: ['7時50分', '7時55分', '8時0分', '8時5分'],
    correctAnswer: '7時55分'
  },
  {
    id: 'M2-09a-Q07',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 4, minute: 10 },
    choices: ['4時5分', '4時10分', '4時15分', '5時10分'],
    correctAnswer: '4時10分'
  },
  {
    id: 'M2-09a-Q08',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 11, minute: 35 },
    choices: ['11時30分', '11時35分', '11時40分', '12時35分'],
    correctAnswer: '11時35分'
  },
  {
    id: 'M2-09a-Q09',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 5, minute: 40 },
    choices: ['5時35分', '5時40分', '5時45分', '6時40分'],
    correctAnswer: '5時40分'
  },
  {
    id: 'M2-09a-Q10',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 8, minute: 25 },
    choices: ['8時20分', '8時25分', '8時30分', '9時25分'],
    correctAnswer: '8時25分'
  },
  {
    id: 'M2-09a-Q11',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 10, minute: 50 },
    choices: ['10時45分', '10時50分', '10時55分', '11時50分'],
    correctAnswer: '10時50分'
  },
  {
    id: 'M2-09a-Q12',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 1, minute: 5 },
    choices: ['1時0分', '1時5分', '1時10分', '2時5分'],
    correctAnswer: '1時5分'
  },
  {
    id: 'M2-09a-Q13',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 3, minute: 47 },
    choices: ['3時42分', '3時47分', '3時52分', '4時47分'],
    correctAnswer: '3時47分'
  },
  {
    id: 'M2-09a-Q14',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 6, minute: 13 },
    choices: ['6時8分', '6時13分', '6時18分', '7時13分'],
    correctAnswer: '6時13分'
  },
  {
    id: 'M2-09a-Q15',
    unitId: 'M2-09a',
    step: 1,
    type: 'clock',
    question: 'とけいを よみましょう。\nなんじ なんぷん？',
    clockFace: { hour: 9, minute: 28 },
    choices: ['9時23分', '9時28分', '9時33分', '10時28分'],
    correctAnswer: '9時28分'
  },

  // =====================================================
  // Step2: 午前・午後 と 時刻
  // =====================================================
  {
    id: 'M2-09a-Q16',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '1日は なんじかん？',
    choices: ['12じかん', '24じかん', '60じかん', '100じかん'],
    correctAnswer: '24じかん'
  },
  {
    id: 'M2-09a-Q17',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午前は ひるまえの なんじから なんじまで？',
    choices: ['0時〜6時', '0時〜12時', '6時〜12時', '12時〜24時'],
    correctAnswer: '0時〜12時'
  },
  {
    id: 'M2-09a-Q18',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午後は ひるすぎの なんじから なんじまで？',
    choices: ['0時〜12時', '6時〜18時', '12時〜24時', '18時〜24時'],
    correctAnswer: '12時〜24時'
  },
  {
    id: 'M2-09a-Q19',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: 'あさ 8じに おきました。\nこれは 午前 ですか 午後 ですか？',
    choices: ['午前', '午後', 'どちらでもない', 'わからない'],
    correctAnswer: '午前'
  },
  {
    id: 'M2-09a-Q20',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: 'よる 7じに ねました。\nこれは 午前 ですか 午後 ですか？',
    choices: ['午前', '午後', 'どちらでもない', 'わからない'],
    correctAnswer: '午後'
  },
  {
    id: 'M2-09a-Q21',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午前10時は、24じかんせいでは なんじ？',
    choices: ['2じ', '10じ', '12じ', '22じ'],
    correctAnswer: '10じ'
  },
  {
    id: 'M2-09a-Q22',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午後3時は、24じかんせいでは なんじ？',
    choices: ['3じ', '13じ', '15じ', '27じ'],
    correctAnswer: '15じ'
  },
  {
    id: 'M2-09a-Q23',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午後8時は、24じかんせいでは なんじ？',
    choices: ['8じ', '18じ', '20じ', '28じ'],
    correctAnswer: '20じ'
  },
  {
    id: 'M2-09a-Q24',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '1じかんは なんぷん？',
    choices: ['10ぷん', '30ぷん', '60ぷん', '100ぷん'],
    correctAnswer: '60ぷん'
  },
  {
    id: 'M2-09a-Q25',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '1ぷんは なんびょう？',
    choices: ['10びょう', '30びょう', '60びょう', '100びょう'],
    correctAnswer: '60びょう'
  },
  {
    id: 'M2-09a-Q26',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '2じかんは なんぷん？',
    choices: ['20ぷん', '60ぷん', '120ぷん', '200ぷん'],
    correctAnswer: '120ぷん'
  },
  {
    id: 'M2-09a-Q27',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '120ぷんは なんじかん？',
    choices: ['1じかん', '2じかん', '12じかん', '120じかん'],
    correctAnswer: '2じかん'
  },
  {
    id: 'M2-09a-Q28',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: 'お昼の12時は 午前 ですか 午後 ですか？',
    choices: ['午前', '午後', 'どちらでもない（正午）', 'わからない'],
    correctAnswer: 'どちらでもない（正午）'
  },
  {
    id: 'M2-09a-Q29',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午前0時は 1日の はじまり ですか、おわり ですか？',
    choices: ['はじまり（真夜中）', 'おわり（真夜中）', 'ひるまえ', 'わからない'],
    correctAnswer: 'はじまり（真夜中）'
  },
  {
    id: 'M2-09a-Q30',
    unitId: 'M2-09a',
    step: 2,
    type: 'choice',
    question: '午後6時は 24じかんせいでは なんじ？',
    choices: ['6じ', '16じ', '18じ', '24じ'],
    correctAnswer: '18じ'
  },

  // =====================================================
  // Step3: 文章題（時刻の よみかた）
  // =====================================================
  {
    id: 'M2-09a-Q31',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'がっこうが はじまる じこくは 午前8時30分です。\nこれは ひる より まえ ですか、あと ですか？',
    choices: ['まえ（午前）', 'あと（午後）', 'ちょうど ひる', 'わからない'],
    correctAnswer: 'まえ（午前）'
  },
  {
    id: 'M2-09a-Q32',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'ゆうごはんを たべる じこくは 午後7時です。\n24じかんせいでは なんじ？',
    choices: ['7じ', '17じ', '19じ', '27じ'],
    correctAnswer: '19じ'
  },
  {
    id: 'M2-09a-Q33',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'あさ 6時45分に おきました。\nとけいの はりは どこを さしていますか？',
    choices: ['6と 45', '6と 9（45分）', '7と 45', '45と 6'],
    correctAnswer: '6と 9（45分）'
  },
  {
    id: 'M2-09a-Q34',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'テレビが 午後3時15分に はじまります。\nいまは 午後3時です。\nあと なんぷんで はじまりますか？',
    choices: ['5ぷん', '10ぷん', '15ぷん', '30ぷん'],
    correctAnswer: '15ぷん'
  },
  {
    id: 'M2-09a-Q35',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'がっこうが おわる じこくは 午後3時です。\nいえに かえるのに 20ぷん かかります。\nいえに つく じこくは？',
    choices: ['午後2時40分', '午後3時20分', '午後4時0分', '午後3時40分'],
    correctAnswer: '午後3時20分'
  },
  {
    id: 'M2-09a-Q36',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: '午前と 午後を あわせると 1日は なんじかん？',
    choices: ['12じかん', '20じかん', '24じかん', '48じかん'],
    correctAnswer: '24じかん'
  },
  {
    id: 'M2-09a-Q37',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'おべんとうを たべる じこくは 午後0時です。\nこれを べつの いいかたで いうと？',
    choices: ['午前12時', '正午', '午後12時', '夜中'],
    correctAnswer: '正午'
  },
  {
    id: 'M2-09a-Q38',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'えいがが 午後2時に はじまって\n2じかん30ぷん つづきます。\nおわる じこくは？',
    choices: ['午後4時', '午後4時20分', '午後4時30分', '午後5時'],
    correctAnswer: '午後4時30分'
  },
  {
    id: 'M2-09a-Q39',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'あさ おきた じこくは 午前7時20分です。\nよる ねた じこくは 午後9時30分です。\nおきていた じかんは どちら？',
    choices: ['午前のほうが ながい', '午後のほうが ながい', 'おなじ', 'わからない'],
    correctAnswer: '午後のほうが ながい'
  },
  {
    id: 'M2-09a-Q40',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'バスが 午前10時45分に しゅっぱつします。\nいまは 午前10時30分です。\nあと なんぷんで しゅっぱつしますか？',
    choices: ['10ぷん', '15ぷん', '20ぷん', '45ぷん'],
    correctAnswer: '15ぷん'
  },
  {
    id: 'M2-09a-Q41',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'しゅくだいを 午後4時に はじめて\n午後5時に おわりました。\nかかった じかんは？',
    choices: ['30ぷん', '1じかん', '1じかん30ぷん', '2じかん'],
    correctAnswer: '1じかん'
  },
  {
    id: 'M2-09a-Q42',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'おふろに はいる じこくは 午後7時30分です。\nそれは なんじかんせい？',
    choices: ['7じ30ぷん', '17じ30ぷん', '19じ30ぷん', '27じ30ぷん'],
    correctAnswer: '19じ30ぷん'
  },
  {
    id: 'M2-09a-Q43',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'にっきに「ごご2じはんに こうえんへ いった」と かいてあります。\nこれは なんじなんぷん？',
    choices: ['午前2時30分', '午後2時30分', '午前14時30分', '午後14時30分'],
    correctAnswer: '午後2時30分'
  },
  {
    id: 'M2-09a-Q44',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: 'じゅぎょうが 午前9時に はじまり\n午前10時40分に おわりました。\nじゅぎょうは なんぷん？',
    choices: ['40ぷん', '60ぷん', '100ぷん', '140ぷん'],
    correctAnswer: '100ぷん'
  },
  {
    id: 'M2-09a-Q45',
    unitId: 'M2-09a',
    step: 3,
    type: 'choice',
    question: '3じかんは なんぷん？',
    choices: ['30ぷん', '60ぷん', '180ぷん', '360ぷん'],
    correctAnswer: '180ぷん'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
