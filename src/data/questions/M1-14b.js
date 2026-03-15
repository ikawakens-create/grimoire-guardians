/**
 * M1-14b.js - Grimoire Guardians 問題データ
 * ユニット: M1-14b「かずの じゅんばん と だいしょう」
 *
 * 対象: 小学1年生、数直線・大小比較・数列の穴埋め
 * 準拠: 日本文教出版 算数1年
 *
 * 設計方針:
 *   14aで「読み書き」を習得したあと、今度は「並べる・比べる」力をつける。
 *   数直線で数の位置感覚を養い、大小記号（大きい・小さい）へつなぐ。
 *   最後に「いくつ大きい」「いくつ小さい」で14c（たしざん）の橋渡し。
 *
 * Step構成（シャッフル出題）
 *   Step1: すうちょくせんで ならべよう（プール9問 → 4問出題）
 *   Step2: おおきい・ちいさい くらべよう（プール10問 → 5問出題）
 *   Step3: じゅんばんに ならべよう（プール8問 → 3問出題）
 *   Step4: いくつ おおきい・ちいさい（プール8問 → 3問出題）
 *
 * @version 2.1
 * @date 2026-03-15
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: すうちょくせんで ならべよう（プール9問）
  // =====================================================
  {
    id: 'M1-14b-Q01',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[10 → □ → 30 → 40]\nすうちょくせんの □に はいる かずは？',
    choices: ['15', '20', '25', '22'],
    correctAnswer: '20',
    explanation: '10、20、30、40 と 10ずつ ふえていきます。'
  },
  {
    id: 'M1-14b-Q02',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[50 → □ → 70 → 80]\nすうちょくせんの □に はいる かずは？',
    choices: ['55', '60', '65', '62'],
    correctAnswer: '60',
    explanation: '50、60、70、80 と 10ずつ ふえていきます。'
  },
  {
    id: 'M1-14b-Q03',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[□ → 40 → 50 → 60]\nすうちょくせんの □に はいる かずは？',
    choices: ['20', '25', '30', '35'],
    correctAnswer: '30',
    explanation: '10ずつ ふえているので、40の まえは 30。'
  },
  {
    id: 'M1-14b-Q04',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[80 → 90 → □]\nすうちょくせんの □に はいる かずは？',
    choices: ['95', '99', '100', '110'],
    correctAnswer: '100',
    explanation: '10ずつ ふえているので、90の つぎは 100（ひゃく）。'
  },
  {
    id: 'M1-14b-Q16',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[30 → □ → 50 → 60]\nすうちょくせんの □に はいる かずは？',
    choices: ['35', '40', '45', '42'],
    correctAnswer: '40',
    explanation: '30、40、50、60 と 10ずつ ふえていきます。'
  },
  {
    id: 'M1-14b-Q17',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[□ → 60 → 70 → 80]\nすうちょくせんの □に はいる かずは？',
    choices: ['40', '45', '50', '55'],
    correctAnswer: '50',
    explanation: '10ずつ ふえているので、60の まえは 50。'
  },
  {
    id: 'M1-14b-Q24',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[20 → 30 → □ → 50]\nすうちょくせんの □に はいる かずは？',
    choices: ['35', '38', '40', '45'],
    correctAnswer: '40',
    explanation: '20、30、40、50 と 10ずつ ふえていきます。'
  },
  {
    id: 'M1-14b-Q25',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[60 → 70 → □ → 90]\nすうちょくせんの □に はいる かずは？',
    choices: ['72', '75', '80', '85'],
    correctAnswer: '80',
    explanation: '60、70、80、90 と 10ずつ ふえていきます。'
  },
  {
    id: 'M1-14b-Q26',
    unitId: 'M1-14b',
    step: 1,
    type: 'choice',
    question: '[□ → 20 → 30 → 40]\nすうちょくせんの □に はいる かずは？',
    choices: ['5', '8', '10', '15'],
    correctAnswer: '10',
    explanation: '10ずつ ふえているので、20の まえは 10。'
  },

  // =====================================================
  // Step2: おおきい・ちいさい くらべよう（プール10問）
  // =====================================================
  {
    id: 'M1-14b-Q05',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '40 と 70、どちらが おおきい？',
    choices: ['40', '70', 'おなじ', 'わからない'],
    correctAnswer: '70',
    explanation: '70のほうが おおきい かずです。'
  },
  {
    id: 'M1-14b-Q06',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '83 と 38、どちらが ちいさい？',
    choices: ['83', '38', 'おなじ', 'わからない'],
    correctAnswer: '38',
    explanation: '83は はちじゅうさん、38は さんじゅうはち。38のほうが ちいさい。'
  },
  {
    id: 'M1-14b-Q07',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '65 と 56、どちらが おおきい？',
    choices: ['65', '56', 'おなじ', 'わからない'],
    correctAnswer: '65',
    explanation: '65（ろくじゅうご）のほうが 56（ごじゅうろく）より おおきい。'
  },
  {
    id: 'M1-14b-Q08',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '79 と 97、どちらが ちいさい？',
    choices: ['97', '79', 'おなじ', 'わからない'],
    correctAnswer: '79',
    explanation: '79（ななじゅうきゅう）のほうが 97（きゅうじゅうなな）より ちいさい。'
  },
  {
    id: 'M1-14b-Q09',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '[25、52、20]の なかで\nいちばん おおきい かずは？',
    choices: ['25', '52', '20', 'おなじ'],
    correctAnswer: '52',
    explanation: '52（ごじゅうに）がいちばん おおきい。'
  },
  {
    id: 'M1-14b-Q18',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '33 と 73、どちらが おおきい？',
    choices: ['33', '73', 'おなじ', 'わからない'],
    correctAnswer: '73',
    explanation: '73（ななじゅうさん）のほうが 33（さんじゅうさん）より おおきい。'
  },
  {
    id: 'M1-14b-Q19',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '[40、14、41]の なかで\nいちばん ちいさい かずは？',
    choices: ['40', '14', '41', 'おなじ'],
    correctAnswer: '14',
    explanation: '14（じゅうし）がいちばん ちいさい。'
  },
  {
    id: 'M1-14b-Q27',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '28 と 82、どちらが おおきい？',
    choices: ['28', '82', 'おなじ', 'わからない'],
    correctAnswer: '82',
    explanation: '82（はちじゅうに）のほうが 28（にじゅうはち）より おおきい。'
  },
  {
    id: 'M1-14b-Q28',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '[55、15、51]の なかで\nいちばん おおきい かずは？',
    choices: ['55', '15', '51', 'おなじ'],
    correctAnswer: '55',
    explanation: '55（ごじゅうご）がいちばん おおきい。'
  },
  {
    id: 'M1-14b-Q29',
    unitId: 'M1-14b',
    step: 2,
    type: 'choice',
    question: '46 と 64、どちらが ちいさい？',
    choices: ['64', '46', 'おなじ', 'わからない'],
    correctAnswer: '46',
    explanation: '46（よんじゅうろく）のほうが 64（ろくじゅうし）より ちいさい。'
  },

  // =====================================================
  // Step3: じゅんばんに ならべよう（プール8問）
  // =====================================================
  {
    id: 'M1-14b-Q10',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[43、34、30] を\nちいさい じゅんに ならべると？',
    choices: ['43、34、30', '30、34、43', '34、43、30', '30、43、34'],
    correctAnswer: '30、34、43',
    explanation: '30 < 34 < 43 の じゅんに ちいさい。'
  },
  {
    id: 'M1-14b-Q11',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[81、18、80] を\nおおきい じゅんに ならべると？',
    choices: ['18、80、81', '81、80、18', '80、81、18', '81、18、80'],
    correctAnswer: '81、80、18',
    explanation: '81 > 80 > 18 の じゅんに おおきい。'
  },
  {
    id: 'M1-14b-Q12',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[60、6、66] を\nちいさい じゅんに ならべると？',
    choices: ['66、60、6', '6、60、66', '60、6、66', '6、66、60'],
    correctAnswer: '6、60、66',
    explanation: '6 < 60 < 66 の じゅんに ちいさい。'
  },
  {
    id: 'M1-14b-Q20',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[71、17、70] を\nちいさい じゅんに ならべると？',
    choices: ['71、70、17', '17、70、71', '70、71、17', '17、71、70'],
    correctAnswer: '17、70、71',
    explanation: '17 < 70 < 71 の じゅんに ちいさい。'
  },
  {
    id: 'M1-14b-Q21',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[90、9、99] を\nおおきい じゅんに ならべると？',
    choices: ['9、90、99', '99、90、9', '90、99、9', '99、9、90'],
    correctAnswer: '99、90、9',
    explanation: '99 > 90 > 9 の じゅんに おおきい。'
  },
  {
    id: 'M1-14b-Q30',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[24、42、22] を\nおおきい じゅんに ならべると？',
    choices: ['22、24、42', '42、24、22', '24、42、22', '42、22、24'],
    correctAnswer: '42、24、22',
    explanation: '42 > 24 > 22 の じゅんに おおきい。'
  },
  {
    id: 'M1-14b-Q31',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[38、83、30] を\nちいさい じゅんに ならべると？',
    choices: ['83、38、30', '30、38、83', '38、30、83', '30、83、38'],
    correctAnswer: '30、38、83',
    explanation: '30 < 38 < 83 の じゅんに ちいさい。'
  },
  {
    id: 'M1-14b-Q32',
    unitId: 'M1-14b',
    step: 3,
    type: 'choice',
    question: '[55、50、5] を\nおおきい じゅんに ならべると？',
    choices: ['5、50、55', '55、50、5', '50、55、5', '55、5、50'],
    correctAnswer: '55、50、5',
    explanation: '55 > 50 > 5 の じゅんに おおきい。'
  },

  // =====================================================
  // Step4: いくつ おおきい・ちいさい（プール8問）
  // =====================================================
  {
    id: 'M1-14b-Q13',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '50より 10 おおきい かずは？',
    choices: ['40', '51', '60', '70'],
    correctAnswer: '60',
    explanation: '50から 10 すすむと 60。'
  },
  {
    id: 'M1-14b-Q14',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '80より 10 ちいさい かずは？',
    choices: ['50', '60', '70', '80'],
    correctAnswer: '70',
    explanation: '80から 10 もどると 70。'
  },
  {
    id: 'M1-14b-Q15',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '45より 3 おおきい かずは？',
    choices: ['42', '47', '48', '49'],
    correctAnswer: '48',
    explanation: '45から 3 すすむと 48。'
  },
  {
    id: 'M1-14b-Q22',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '70より 20 おおきい かずは？',
    choices: ['80', '85', '90', '100'],
    correctAnswer: '90',
    explanation: '70から 20 すすむと 90。'
  },
  {
    id: 'M1-14b-Q23',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '60より 10 ちいさい かずは？',
    choices: ['40', '50', '55', '60'],
    correctAnswer: '50',
    explanation: '60から 10 もどると 50。'
  },
  {
    id: 'M1-14b-Q33',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '30より 20 おおきい かずは？',
    choices: ['40', '50', '51', '60'],
    correctAnswer: '50',
    explanation: '30から 20 すすむと 50。'
  },
  {
    id: 'M1-14b-Q34',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '90より 30 ちいさい かずは？',
    choices: ['50', '55', '60', '70'],
    correctAnswer: '60',
    explanation: '90から 30 もどると 60。'
  },
  {
    id: 'M1-14b-Q35',
    unitId: 'M1-14b',
    step: 4,
    type: 'choice',
    question: '62より 2 ちいさい かずは？',
    choices: ['58', '59', '60', '61'],
    correctAnswer: '60',
    explanation: '62から 2 もどると 60。'
  }
];

export const stepConfig = [
  { step: 1, pick: 4 },
  { step: 2, pick: 5 },
  { step: 3, pick: 3 },
  { step: 4, pick: 3 }
];

export default questions;
