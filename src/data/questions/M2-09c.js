/**
 * M2-09c.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-09c「じかんの もんだい（文章題）」
 *
 * 対象: 小学2年生、時刻と時間の文章題
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 終わりの じこくを もとめる（プール15問 → 5問出題）
 *   Step2: 始まりの じこくを もとめる（プール15問 → 5問出題）
 *   Step3: かかった じかんを もとめる（プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 終わりの じこくを もとめる
  // =====================================================
  {
    id: 'M2-09c-Q01',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前9時に がっこうが はじまりました。\n45ふん じゅぎょうを しました。\nおわったのは なんじ なんぷん？',
    choices: ['午前9時40分', '午前9時45分', '午前9時50分', '午前10時'],
    correctAnswer: '午前9時45分'
  },
  {
    id: 'M2-09c-Q02',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午後2時30分に えいがが はじまりました。\n1じかん30ぷん つづきました。\nおわったのは なんじ なんぷん？',
    choices: ['午後3時30分', '午後4時', '午後4時30分', '午後5時'],
    correctAnswer: '午後4時'
  },
  {
    id: 'M2-09c-Q03',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前10時に しゅっぱつしました。\n2じかん たびました。\nつくのは なんじ？',
    choices: ['午前11時', '午前12時', '午後1時', '午後2時'],
    correctAnswer: '午前12時'
  },
  {
    id: 'M2-09c-Q04',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午後3時15分から べんきょうを はじめました。\n45ふん べんきょうしました。\nおわったのは なんじ なんぷん？',
    choices: ['午後3時55分', '午後4時', '午後4時0分', '午後4時15分'],
    correctAnswer: '午後4時0分'
  },
  {
    id: 'M2-09c-Q05',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前8時45分に でかけました。\n30ふん あるきました。\nつくのは なんじ なんぷん？',
    choices: ['午前9時10分', '午前9時15分', '午前9時20分', '午前9時45分'],
    correctAnswer: '午前9時15分'
  },
  {
    id: 'M2-09c-Q06',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午後1時から なわとびを しました。\n25ぷん しました。\nやめたのは なんじ なんぷん？',
    choices: ['午後1時20分', '午後1時25分', '午後1時30分', '午後2時'],
    correctAnswer: '午後1時25分'
  },
  {
    id: 'M2-09c-Q07',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前11時20分から おひるごはんを たべました。\n40ぷん で たべおわりました。\nなんじ なんぷん？',
    choices: ['午前11時55分', '午後12時', '午後12時0分', '午後12時10分'],
    correctAnswer: '午後12時0分'
  },
  {
    id: 'M2-09c-Q08',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午後4時から おふろに はいりました。\n20ぷん で あがりました。\nnなんじ なんぷん？',
    choices: ['午後4時15分', '午後4時20分', '午後4時25分', '午後5時'],
    correctAnswer: '午後4時20分'
  },
  {
    id: 'M2-09c-Q09',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前7時に おきて、30ぷんで あさごはんを たべました。\nたべおわったのは なんじ なんぷん？',
    choices: ['午前7時20分', '午前7時25分', '午前7時30分', '午前8時'],
    correctAnswer: '午前7時30分'
  },
  {
    id: 'M2-09c-Q10',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午後6時30分に しょくじを はじめました。\n1じかん かかりました。\nおわったのは なんじ なんぷん？',
    choices: ['午後7時', '午後7時30分', '午後7時0分', '午後8時'],
    correctAnswer: '午後7時30分'
  },
  {
    id: 'M2-09c-Q11',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: 'じゅくが 午後5時に はじまりました。\n1じかん30ぷん ありました。\nおわったのは なんじ なんぷん？',
    choices: ['午後6時', '午後6時30分', '午後7時', '午後7時30分'],
    correctAnswer: '午後6時30分'
  },
  {
    id: 'M2-09c-Q12',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前10時50分から じゅぎょうが はじまりました。\n45ふん で おわりました。\nおわったのは なんじ なんぷん？',
    choices: ['午前11時25分', '午前11時30分', '午前11時35分', '午後12時'],
    correctAnswer: '午前11時35分'
  },
  {
    id: 'M2-09c-Q13',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午後8時に テレビを みはじめました。\n1じかん みました。\nおわったのは なんじ？',
    choices: ['午後8時30分', '午後9時', '午後9時30分', '午後10時'],
    correctAnswer: '午後9時'
  },
  {
    id: 'M2-09c-Q14',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前9時30分に こうえんに つきました。\n2じかん あそびました。\nかえったのは なんじ なんぷん？',
    choices: ['午前11時', '午前11時30分', '午後12時', '午後12時30分'],
    correctAnswer: '午前11時30分'
  },
  {
    id: 'M2-09c-Q15',
    unitId: 'M2-09c',
    step: 1,
    type: 'choice',
    question: '午前6時45分に いえを でました。\n15ぷん あるきました。\ngakkouに ついたのは なんじ なんぷん？',
    choices: ['午前6時55分', '午前7時', '午前7時0分', '午前7時15分'],
    correctAnswer: '午前7時0分'
  },

  // =====================================================
  // Step2: 始まりの じこくを もとめる
  // =====================================================
  {
    id: 'M2-09c-Q16',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'がっこうが 午前9時45分に おわりました。\n45ぷん じゅぎょうを しました。\nはじまったのは なんじ？',
    choices: ['午前8時55分', '午前9時', '午前9時0分', '午前9時10分'],
    correctAnswer: '午前9時0分'
  },
  {
    id: 'M2-09c-Q17',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'えいがが 午後4時30分に おわりました。\n2じかん つづきました。\nはじまったのは なんじ なんぷん？',
    choices: ['午後2時', '午後2時30分', '午後3時', '午後3時30分'],
    correctAnswer: '午後2時30分'
  },
  {
    id: 'M2-09c-Q18',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'でんしゃが 午後3時15分に つきました。\n45ぷん のりました。\nのったのは なんじ なんぷん？',
    choices: ['午後2時20分', '午後2時25分', '午後2時30分', '午後3時0分'],
    correctAnswer: '午後2時30分'
  },
  {
    id: 'M2-09c-Q19',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'じゅくが 午後7時に おわりました。\n1じかん30ぷん ありました。\nはじまったのは なんじ なんぷん？',
    choices: ['午後4時30分', '午後5時', '午後5時30分', '午後6時'],
    correctAnswer: '午後5時30分'
  },
  {
    id: 'M2-09c-Q20',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'べんきょうが 午後5時0分に おわりました。\n30ぷん べんきょうしました。\nはじまったのは なんじ なんぷん？',
    choices: ['午後4時20分', '午後4時25分', '午後4時30分', '午後5時30分'],
    correctAnswer: '午後4時30分'
  },
  {
    id: 'M2-09c-Q21',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'あさごはんが 午前7時30分に おわりました。\n20ぷん かかりました。\nたべはじめたのは なんじ なんぷん？',
    choices: ['午前7時', '午前7時5分', '午前7時10分', '午前7時20分'],
    correctAnswer: '午前7時10分'
  },
  {
    id: 'M2-09c-Q22',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'テレビが 午後9時に おわりました。\n1じかん みました。\nみはじめたのは なんじ？',
    choices: ['午後7時', '午後7時30分', '午後8時', '午後8時30分'],
    correctAnswer: '午後8時'
  },
  {
    id: 'M2-09c-Q23',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'がっこうに 午前8時15分に つきました。\n15ぷん あるきました。\nいえを でたのは なんじ？',
    choices: ['午前7時55分', '午前8時', '午前8時0分', '午前8時5分'],
    correctAnswer: '午前8時0分'
  },
  {
    id: 'M2-09c-Q24',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'こうえんから かえったのは 午後5時でした。\n2じかん あそびました。\nいったのは なんじ？',
    choices: ['午後2時', '午後2時30分', '午後3時', '午後4時'],
    correctAnswer: '午後3時'
  },
  {
    id: 'M2-09c-Q25',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'じゅぎょうが 午前10時25分に おわりました。\n45ぷん じゅぎょうでした。\nはじまったのは なんじ なんぷん？',
    choices: ['午前9時30分', '午前9時35分', '午前9時40分', '午前10時'],
    correctAnswer: '午前9時40分'
  },
  {
    id: 'M2-09c-Q26',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'うんどうが 午後4時45分に おわりました。\n1じかん15ぷん しました。\nはじまったのは なんじ なんぷん？',
    choices: ['午後3時20分', '午後3時25分', '午後3時30分', '午後4時'],
    correctAnswer: '午後3時30分'
  },
  {
    id: 'M2-09c-Q27',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'ばんごはんが 午後7時20分に おわりました。\n40ぷん かかりました。\nたべはじめたのは なんじ なんぷん？',
    choices: ['午後6時30分', '午後6時35分', '午後6時40分', '午後7時'],
    correctAnswer: '午後6時40分'
  },
  {
    id: 'M2-09c-Q28',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'バスに 午後2時10分に つきました。\n25ぷん のりました。\nのったのは なんじ なんぷん？',
    choices: ['午後1時40分', '午後1時45分', '午後1時50分', '午後2時'],
    correctAnswer: '午後1時45分'
  },
  {
    id: 'M2-09c-Q29',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'おふろから あがったのは 午後8時10分でした。\n30ぷん はいりました。\nはいったのは なんじ なんぷん？',
    choices: ['午後7時30分', '午後7時35分', '午後7時40分', '午後8時'],
    correctAnswer: '午後7時40分'
  },
  {
    id: 'M2-09c-Q30',
    unitId: 'M2-09c',
    step: 2,
    type: 'choice',
    question: 'ひるねが 午後3時に おわりました。\n1じかん30ぷん ねました。\nねたのは なんじ なんぷん？',
    choices: ['午後1時', '午後1時30分', '午後2時', '午後2時30分'],
    correctAnswer: '午後1時30分'
  },

  // =====================================================
  // Step3: かかった じかんを もとめる
  // =====================================================
  {
    id: 'M2-09c-Q31',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'べんきょうを 午後4時に はじめて\n午後4時45分に おわりました。\nなんぷん べんきょうしましたか？',
    choices: ['35ぷん', '40ぷん', '45ぷん', '50ぷん'],
    correctAnswer: '45ぷん'
  },
  {
    id: 'M2-09c-Q32',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'がっこうに 午前8時に いって\n午後3時に かえりました。\nなんじかん いましたか？',
    choices: ['5じかん', '6じかん', '7じかん', '8じかん'],
    correctAnswer: '7じかん'
  },
  {
    id: 'M2-09c-Q33',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'ゲームを 午後3時15分から 午後4時0分まで しました。\nなんぷん しましたか？',
    choices: ['35ぷん', '40ぷん', '45ぷん', '60ぷん'],
    correctAnswer: '45ぷん'
  },
  {
    id: 'M2-09c-Q34',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'えいがが 午後1時30分から 午後3時30分まで ありました。\nなんじかん でしたか？',
    choices: ['1じかん', '1じかん30ぷん', '2じかん', '3じかん'],
    correctAnswer: '2じかん'
  },
  {
    id: 'M2-09c-Q35',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'そうじを 午前10時40分から 午前11時10分まで しました。\nなんぷん しましたか？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '40ぷん'],
    correctAnswer: '30ぷん'
  },
  {
    id: 'M2-09c-Q36',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'あるくのに 午前7時10分から 午前7時40分まで かかりました。\nなんぷん かかりましたか？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '35ぷん'],
    correctAnswer: '30ぷん'
  },
  {
    id: 'M2-09c-Q37',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'ほんを 午後2時から 午後3時30分まで よみました。\nなんぷん よみましたか？',
    choices: ['60ぷん', '90ぷん', '120ぷん', '130ぷん'],
    correctAnswer: '90ぷん'
  },
  {
    id: 'M2-09c-Q38',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'じゅくが 午後5時から 午後7時まで ありました。\nなんじかん でしたか？',
    choices: ['1じかん', '1じかん30ぷん', '2じかん', '2じかん30ぷん'],
    correctAnswer: '2じかん'
  },
  {
    id: 'M2-09c-Q39',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'りょうりが 午後5時20分に はじまって\n午後6時5分に おわりました。\nなんぷん かかりましたか？',
    choices: ['35ぷん', '40ぷん', '45ぷん', '55ぷん'],
    correctAnswer: '45ぷん'
  },
  {
    id: 'M2-09c-Q40',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'うんどうかいが 午前9時に はじまって\n午後0時に おわりました。\nなんじかん でしたか？',
    choices: ['2じかん', '3じかん', '4じかん', '5じかん'],
    correctAnswer: '3じかん'
  },
  {
    id: 'M2-09c-Q41',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'ピアノの れんしゅうを 午後3時30分から\n午後4時15分まで しました。\nなんぷん しましたか？',
    choices: ['35ぷん', '40ぷん', '45ぷん', '50ぷん'],
    correctAnswer: '45ぷん'
  },
  {
    id: 'M2-09c-Q42',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'どうぶつえんに 午前10時に いって\n午後4時に かえりました。\nなんじかん いましたか？',
    choices: ['4じかん', '5じかん', '6じかん', '7じかん'],
    correctAnswer: '6じかん'
  },
  {
    id: 'M2-09c-Q43',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'ねたのが 午後9時30分で、\nおきたのが 午前6時30分です。\nなんじかん ねましたか？',
    choices: ['7じかん', '8じかん', '9じかん', '10じかん'],
    correctAnswer: '9じかん'
  },
  {
    id: 'M2-09c-Q44',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'プールに 午前10時15分から 午前11時45分まで いました。\nなんぷん いましたか？',
    choices: ['60ぷん', '75ぷん', '90ぷん', '105ぷん'],
    correctAnswer: '90ぷん'
  },
  {
    id: 'M2-09c-Q45',
    unitId: 'M2-09c',
    step: 3,
    type: 'choice',
    question: 'たびが 午前8時に はじまって\n午後5時30分に おわりました。\nなんじかん なんぷん でしたか？',
    choices: ['8じかん30ぷん', '9じかん', '9じかん30ぷん', '10じかん'],
    correctAnswer: '9じかん30ぷん'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
