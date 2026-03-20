/**
 * M2-09b.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-09b「じこくと じかん②（じこくの 計算）」
 *
 * 対象: 小学2年生、時刻と経過時間の計算
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 〇ふん後の じこく（1時間をまたがない）（プール15問 → 5問出題）
 *   Step2: 〇ふん後の じこく（1時間をまたぐ）    （プール15問 → 5問出題）
 *   Step3: 経過じかんを もとめる（なんぷんかん）  （プール15問 → 5問出題）
 *
 * @version 1.0-draft
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 〇ふん後の じこく（1時間をまたがない）
  // =====================================================
  {
    id: 'M2-09b-Q01',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '3時10分の 20ふんごは なんじ なんぷん？',
    choices: ['3時20分', '3時25分', '3時30分', '3時40分'],
    correctAnswer: '3時30分'
  },
  {
    id: 'M2-09b-Q02',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '5時15分の 30ふんごは なんじ なんぷん？',
    choices: ['5時35分', '5時40分', '5時45分', '6時15分'],
    correctAnswer: '5時45分'
  },
  {
    id: 'M2-09b-Q03',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '2時20分の 15ふんごは なんじ なんぷん？',
    choices: ['2時30分', '2時35分', '2時40分', '3時5分'],
    correctAnswer: '2時35分'
  },
  {
    id: 'M2-09b-Q04',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '8時0分の 45ふんごは なんじ なんぷん？',
    choices: ['8時40分', '8時45分', '8時50分', '9時0分'],
    correctAnswer: '8時45分'
  },
  {
    id: 'M2-09b-Q05',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '10時5分の 10ふんごは なんじ なんぷん？',
    choices: ['10時10分', '10時15分', '10時20分', '11時5分'],
    correctAnswer: '10時15分'
  },
  {
    id: 'M2-09b-Q06',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '1時30分の 25ふんごは なんじ なんぷん？',
    choices: ['1時45分', '1時50分', '1時55分', '2時25分'],
    correctAnswer: '1時55分'
  },
  {
    id: 'M2-09b-Q07',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '7時40分の 10ふんごは なんじ なんぷん？',
    choices: ['7時45分', '7時50分', '7時55分', '8時10分'],
    correctAnswer: '7時50分'
  },
  {
    id: 'M2-09b-Q08',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '4時10分の 40ふんごは なんじ なんぷん？',
    choices: ['4時40分', '4時45分', '4時50分', '5時10分'],
    correctAnswer: '4時50分'
  },
  {
    id: 'M2-09b-Q09',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '9時20分の 30ふんごは なんじ なんぷん？',
    choices: ['9時40分', '9時45分', '9時50分', '10時20分'],
    correctAnswer: '9時50分'
  },
  {
    id: 'M2-09b-Q10',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '11時15分の 30ふんごは なんじ なんぷん？',
    choices: ['11時35分', '11時40分', '11時45分', '12時15分'],
    correctAnswer: '11時45分'
  },
  {
    id: 'M2-09b-Q11',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '6時25分の 20ふんごは なんじ なんぷん？',
    choices: ['6時35分', '6時40分', '6時45分', '7時25分'],
    correctAnswer: '6時45分'
  },
  {
    id: 'M2-09b-Q12',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '3時5分の 50ふんごは なんじ なんぷん？',
    choices: ['3時45分', '3時50分', '3時55分', '4時5分'],
    correctAnswer: '3時55分'
  },
  {
    id: 'M2-09b-Q13',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '2時0分の 1じかんごは なんじ？',
    choices: ['2時0分', '2時60分', '3時0分', '3時60分'],
    correctAnswer: '3時0分'
  },
  {
    id: 'M2-09b-Q14',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '7時30分の 20ふんごは なんじ なんぷん？',
    choices: ['7時45分', '7時50分', '7時55分', '8時0分'],
    correctAnswer: '7時50分'
  },
  {
    id: 'M2-09b-Q15',
    unitId: 'M2-09b',
    step: 1,
    type: 'choice',
    question: '10時35分の 15ふんごは なんじ なんぷん？',
    choices: ['10時45分', '10時50分', '10時55分', '11時35分'],
    correctAnswer: '10時50分'
  },

  // =====================================================
  // Step2: 〇ふん後の じこく（1時間をまたぐ）
  // =====================================================
  {
    id: 'M2-09b-Q16',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '3時50分の 20ふんごは なんじ なんぷん？',
    choices: ['3時60分', '3時70分', '4時0分', '4時10分'],
    correctAnswer: '4時10分'
  },
  {
    id: 'M2-09b-Q17',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '5時45分の 30ふんごは なんじ なんぷん？',
    choices: ['5時75分', '6時5分', '6時15分', '6時30分'],
    correctAnswer: '6時15分'
  },
  {
    id: 'M2-09b-Q18',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '7時40分の 25ふんごは なんじ なんぷん？',
    choices: ['7時65分', '8時0分', '8時5分', '8時25分'],
    correctAnswer: '8時5分'
  },
  {
    id: 'M2-09b-Q19',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '9時55分の 10ふんごは なんじ なんぷん？',
    choices: ['9時65分', '10時0分', '10時5分', '10時10分'],
    correctAnswer: '10時5分'
  },
  {
    id: 'M2-09b-Q20',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '11時50分の 20ふんごは なんじ なんぷん？',
    choices: ['11時70分', '12時0分', '12時10分', '12時20分'],
    correctAnswer: '12時10分'
  },
  {
    id: 'M2-09b-Q21',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '2時35分の 40ふんごは なんじ なんぷん？',
    choices: ['2時75分', '3時5分', '3時15分', '3時35分'],
    correctAnswer: '3時15分'
  },
  {
    id: 'M2-09b-Q22',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '4時48分の 15ふんごは なんじ なんぷん？',
    choices: ['4時63分', '5時0分', '5時3分', '5時13分'],
    correctAnswer: '5時3分'
  },
  {
    id: 'M2-09b-Q23',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '6時30分の 45ふんごは なんじ なんぷん？',
    choices: ['6時75分', '7時5分', '7時15分', '7時30分'],
    correctAnswer: '7時15分'
  },
  {
    id: 'M2-09b-Q24',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '8時55分の 30ふんごは なんじ なんぷん？',
    choices: ['8時85分', '9時15分', '9時25分', '9時30分'],
    correctAnswer: '9時25分'
  },
  {
    id: 'M2-09b-Q25',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '10時40分の 35ふんごは なんじ なんぷん？',
    choices: ['10時75分', '11時5分', '11時15分', '11時35分'],
    correctAnswer: '11時15分'
  },
  {
    id: 'M2-09b-Q26',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '1時58分の 5ふんごは なんじ なんぷん？',
    choices: ['1時63分', '2時0分', '2時3分', '2時5分'],
    correctAnswer: '2時3分'
  },
  {
    id: 'M2-09b-Q27',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '3時25分の 1じかんごは なんじ なんぷん？',
    choices: ['3時85分', '4時25分', '4時35分', '5時25分'],
    correctAnswer: '4時25分'
  },
  {
    id: 'M2-09b-Q28',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '7時15分の 1じかん30ぷんごは なんじ なんぷん？',
    choices: ['7時75分', '8時30分', '8時45分', '9時15分'],
    correctAnswer: '8時45分'
  },
  {
    id: 'M2-09b-Q29',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '11時30分の 50ふんごは なんじ なんぷん？',
    choices: ['11時80分', '12時10分', '12時20分', '12時30分'],
    correctAnswer: '12時20分'
  },
  {
    id: 'M2-09b-Q30',
    unitId: 'M2-09b',
    step: 2,
    type: 'choice',
    question: '9時45分の 1じかんごは なんじ なんぷん？',
    choices: ['9時105分', '10時45分', '10時55分', '11時45分'],
    correctAnswer: '10時45分'
  },

  // =====================================================
  // Step3: 経過じかんを もとめる（なんぷんかん）
  // =====================================================
  {
    id: 'M2-09b-Q31',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '3時10分から 3時40分まで なんぷんかん？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '40ぷん'],
    correctAnswer: '30ぷん'
  },
  {
    id: 'M2-09b-Q32',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '5時0分から 5時45分まで なんぷんかん？',
    choices: ['40ぷん', '45ぷん', '50ぷん', '55ぷん'],
    correctAnswer: '45ぷん'
  },
  {
    id: 'M2-09b-Q33',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '9時20分から 10時20分まで なんぷんかん？',
    choices: ['30ぷん', '45ぷん', '60ぷん', '120ぷん'],
    correctAnswer: '60ぷん'
  },
  {
    id: 'M2-09b-Q34',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '2時50分から 3時10分まで なんぷんかん？',
    choices: ['10ぷん', '15ぷん', '20ぷん', '25ぷん'],
    correctAnswer: '20ぷん'
  },
  {
    id: 'M2-09b-Q35',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '7時15分から 8時30分まで なんぷんかん？',
    choices: ['60ぷん', '75ぷん', '85ぷん', '90ぷん'],
    correctAnswer: '75ぷん'
  },
  {
    id: 'M2-09b-Q36',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '10時30分から 11時0分まで なんぷんかん？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '60ぷん'],
    correctAnswer: '30ぷん'
  },
  {
    id: 'M2-09b-Q37',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '4時0分から 4時55分まで なんぷんかん？',
    choices: ['45ぷん', '50ぷん', '55ぷん', '60ぷん'],
    correctAnswer: '55ぷん'
  },
  {
    id: 'M2-09b-Q38',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '6時40分から 7時10分まで なんぷんかん？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '35ぷん'],
    correctAnswer: '30ぷん'
  },
  {
    id: 'M2-09b-Q39',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '1時0分から 2時30分まで なんぷんかん？',
    choices: ['60ぷん', '90ぷん', '120ぷん', '150ぷん'],
    correctAnswer: '90ぷん'
  },
  {
    id: 'M2-09b-Q40',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '8時25分から 9時5分まで なんぷんかん？',
    choices: ['30ぷん', '35ぷん', '40ぷん', '45ぷん'],
    correctAnswer: '40ぷん'
  },
  {
    id: 'M2-09b-Q41',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '11時10分から 11時50分まで なんぷんかん？',
    choices: ['30ぷん', '35ぷん', '40ぷん', '45ぷん'],
    correctAnswer: '40ぷん'
  },
  {
    id: 'M2-09b-Q42',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '3時0分から 5時0分まで なんじかんかん？',
    choices: ['1じかん', '2じかん', '3じかん', '5じかん'],
    correctAnswer: '2じかん'
  },
  {
    id: 'M2-09b-Q43',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '7時30分から 8時0分まで なんぷんかん？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '38ぷん'],
    correctAnswer: '30ぷん'
  },
  {
    id: 'M2-09b-Q44',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '2時15分から 3時45分まで なんぷんかん？',
    choices: ['60ぷん', '90ぷん', '105ぷん', '120ぷん'],
    correctAnswer: '90ぷん'
  },
  {
    id: 'M2-09b-Q45',
    unitId: 'M2-09b',
    step: 3,
    type: 'choice',
    question: '9時50分から 10時20分まで なんぷんかん？',
    choices: ['20ぷん', '25ぷん', '30ぷん', '35ぷん'],
    correctAnswer: '30ぷん'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
