/**
 * M2-03.js - Grimoire Guardians 問題データ
 * ユニット: M2-03「2けたの ひきざん（くりさがりなし）」
 *
 * 対象: 小学2年生、2桁の筆算ひきざん（くりさがりなし）
 * 準拠: 日本文教出版 算数2年
 *
 * Step構成（シャッフル出題）
 *   Step1: 2けた－1けた（くりさがりなし）（プール15問 → 5問出題）
 *   Step2: 2けた－2けた（くりさがりなし）（プール15問 → 5問出題）
 *   Step3: 文章題（くりさがりなし）       （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 2けた－1けた（くりさがりなし）
  // =====================================================
  {
    id: 'M2-03-Q01',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '27 － 4 ＝ ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q02',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '39 － 2 ＝ ？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-03-Q03',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '48 － 5 ＝ ？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-03-Q04',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '56 － 3 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-03-Q05',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '67 － 4 ＝ ？',
    choices: ['61', '62', '63', '64'],
    correctAnswer: '63'
  },
  {
    id: 'M2-03-Q06',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '75 － 2 ＝ ？',
    choices: ['71', '72', '73', '74'],
    correctAnswer: '73'
  },
  {
    id: 'M2-03-Q07',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '89 － 6 ＝ ？',
    choices: ['81', '82', '83', '84'],
    correctAnswer: '83'
  },
  {
    id: 'M2-03-Q08',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '98 － 5 ＝ ？',
    choices: ['91', '92', '93', '94'],
    correctAnswer: '93'
  },
  {
    id: 'M2-03-Q09',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '29 － 6 ＝ ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q10',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '48 － 3 ＝ ？',
    choices: ['43', '44', '45', '46'],
    correctAnswer: '45'
  },
  {
    id: 'M2-03-Q11',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '57 － 4 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-03-Q12',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '69 － 7 ＝ ？',
    choices: ['60', '61', '62', '63'],
    correctAnswer: '62'
  },
  {
    id: 'M2-03-Q13',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '74 － 3 ＝ ？',
    choices: ['69', '70', '71', '72'],
    correctAnswer: '71'
  },
  {
    id: 'M2-03-Q14',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '86 － 4 ＝ ？',
    choices: ['80', '81', '82', '83'],
    correctAnswer: '82'
  },
  {
    id: 'M2-03-Q15',
    unitId: 'M2-03',
    step: 1,
    type: 'choice',
    question: '97 － 6 ＝ ？',
    choices: ['89', '90', '91', '92'],
    correctAnswer: '91'
  },

  // =====================================================
  // Step2: 2けた－2けた（くりさがりなし）
  // =====================================================
  {
    id: 'M2-03-Q16',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '37 － 14 ＝ ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q17',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '56 － 32 ＝ ？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '24'
  },
  {
    id: 'M2-03-Q18',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '79 － 43 ＝ ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-03-Q19',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '85 － 52 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q20',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '96 － 73 ＝ ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q21',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '47 － 21 ＝ ？',
    choices: ['24', '25', '26', '27'],
    correctAnswer: '26'
  },
  {
    id: 'M2-03-Q22',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '68 － 34 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-03-Q23',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '89 － 56 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q24',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '75 － 31 ＝ ？',
    choices: ['42', '43', '44', '45'],
    correctAnswer: '44'
  },
  {
    id: 'M2-03-Q25',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '98 － 64 ＝ ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-03-Q26',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '54 － 21 ＝ ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q27',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '67 － 45 ＝ ？',
    choices: ['20', '21', '22', '23'],
    correctAnswer: '22'
  },
  {
    id: 'M2-03-Q28',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '83 － 51 ＝ ？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '32'
  },
  {
    id: 'M2-03-Q29',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '76 － 23 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-03-Q30',
    unitId: 'M2-03',
    step: 2,
    type: 'choice',
    question: '95 － 42 ＝ ？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },

  // =====================================================
  // Step3: 文章題（くりさがりなし）
  // =====================================================
  {
    id: 'M2-03-Q31',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'りんごが 27こ あります。4こ たべました。\nのこりは なんこ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q32',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 39ほん あります。2ほん つかいました。\nのこりは なんぼん？',
    choices: ['35', '36', '37', '38'],
    correctAnswer: '37'
  },
  {
    id: 'M2-03-Q33',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'こどもが 48にん います。5にん かえりました。\nのこりは なんにん？',
    choices: ['41', '42', '43', '44'],
    correctAnswer: '43'
  },
  {
    id: 'M2-03-Q34',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'シールが 37まい あります。14まい つかいました。\nのこりは なんまい？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q35',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'おはじきが 85こ あります。52こ あげました。\nのこりは なんこ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q36',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'はなが 56ほん あります。32ほん つみました。\nのこりは なんぼん？',
    choices: ['22', '23', '24', '25'],
    correctAnswer: '24'
  },
  {
    id: 'M2-03-Q37',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'ふうせんが 75こ あります。31こ とびました。\nのこりは なんこ？',
    choices: ['42', '43', '44', '45'],
    correctAnswer: '44'
  },
  {
    id: 'M2-03-Q38',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'どんぐりが 96こ あります。73こ あげました。\nのこりは なんこ？',
    choices: ['21', '22', '23', '24'],
    correctAnswer: '23'
  },
  {
    id: 'M2-03-Q39',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'カードが 68まい あります。34まい くばりました。\nのこりは なんまい？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-03-Q40',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'おかしが 79こ あります。43こ たべました。\nのこりは なんこ？',
    choices: ['34', '35', '36', '37'],
    correctAnswer: '36'
  },
  {
    id: 'M2-03-Q41',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'ほんが 89さつ あります。56さつ よみました。\nのこりは なんさつ？',
    choices: ['31', '32', '33', '34'],
    correctAnswer: '33'
  },
  {
    id: 'M2-03-Q42',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'たまごが 98こ あります。64こ りょうりに つかいました。\nのこりは なんこ？',
    choices: ['32', '33', '34', '35'],
    correctAnswer: '34'
  },
  {
    id: 'M2-03-Q43',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'いすが 83きゃく あります。51きゃく つかいました。\nのこりは なんきゃく？',
    choices: ['30', '31', '32', '33'],
    correctAnswer: '32'
  },
  {
    id: 'M2-03-Q44',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'はさみが 76ほん あります。23ほん かしました。\nのこりは なんぼん？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  },
  {
    id: 'M2-03-Q45',
    unitId: 'M2-03',
    step: 3,
    type: 'choice',
    question: 'くれよんが 95ほん あります。42ほん つかいました。\nのこりは なんぼん？',
    choices: ['51', '52', '53', '54'],
    correctAnswer: '53'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
