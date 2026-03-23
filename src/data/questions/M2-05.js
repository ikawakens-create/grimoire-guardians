/**
 * M2-05.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-05「ながさを はかろう（cm・mm）」
 *
 * 対象: 小学2年生、長さの単位（cm・mm）
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 1cm＝10mm の 単位変換   （プール15問 → 5問出題）
 *   Step2: cm と mm の 混合表記    （プール15問 → 5問出題）
 *   Step3: 文章題（ながさの 計算）  （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 1cm＝10mm の 単位変換
  // =====================================================
  {
    id: 'M2-05-Q01',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '1cm は なんmm？',
    choices: ['1mm', '5mm', '10mm', '100mm'],
    correctAnswer: '10mm'
  },
  {
    id: 'M2-05-Q02',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '2cm は なんmm？',
    choices: ['2mm', '12mm', '20mm', '200mm'],
    correctAnswer: '20mm'
  },
  {
    id: 'M2-05-Q03',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '3cm は なんmm？',
    choices: ['3mm', '13mm', '30mm', '300mm'],
    correctAnswer: '30mm'
  },
  {
    id: 'M2-05-Q04',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '5cm は なんmm？',
    choices: ['5mm', '15mm', '50mm', '500mm'],
    correctAnswer: '50mm'
  },
  {
    id: 'M2-05-Q05',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '7cm は なんmm？',
    choices: ['7mm', '17mm', '70mm', '700mm'],
    correctAnswer: '70mm'
  },
  {
    id: 'M2-05-Q06',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '4cm は なんmm？',
    choices: ['4mm', '14mm', '40mm', '400mm'],
    correctAnswer: '40mm'
  },
  {
    id: 'M2-05-Q07',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '6cm は なんmm？',
    choices: ['6mm', '16mm', '60mm', '600mm'],
    correctAnswer: '60mm'
  },
  {
    id: 'M2-05-Q08',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '8cm は なんmm？',
    choices: ['8mm', '18mm', '80mm', '800mm'],
    correctAnswer: '80mm'
  },
  {
    id: 'M2-05-Q09',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '9cm は なんmm？',
    choices: ['9mm', '19mm', '90mm', '900mm'],
    correctAnswer: '90mm'
  },
  {
    id: 'M2-05-Q10',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '10cm は なんmm？',
    choices: ['10mm', '50mm', '100mm', '1000mm'],
    correctAnswer: '100mm'
  },
  {
    id: 'M2-05-Q11',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '20mm は なんcm？',
    choices: ['1cm', '2cm', '5cm', '20cm'],
    correctAnswer: '2cm'
  },
  {
    id: 'M2-05-Q12',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '30mm は なんcm？',
    choices: ['1cm', '3cm', '5cm', '30cm'],
    correctAnswer: '3cm'
  },
  {
    id: 'M2-05-Q13',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '50mm は なんcm？',
    choices: ['3cm', '5cm', '10cm', '50cm'],
    correctAnswer: '5cm'
  },
  {
    id: 'M2-05-Q14',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '70mm は なんcm？',
    choices: ['5cm', '7cm', '10cm', '70cm'],
    correctAnswer: '7cm'
  },
  {
    id: 'M2-05-Q15',
    unitId: 'M2-05',
    step: 1,
    type: 'choice',
    question: '90mm は なんcm？',
    choices: ['7cm', '9cm', '10cm', '90cm'],
    correctAnswer: '9cm'
  },

  // =====================================================
  // Step2: cm と mm の 混合表記
  // =====================================================
  {
    id: 'M2-05-Q16',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '1cm 5mm は なんmm？',
    choices: ['6mm', '15mm', '51mm', '150mm'],
    correctAnswer: '15mm'
  },
  {
    id: 'M2-05-Q17',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '2cm 3mm は なんmm？',
    choices: ['5mm', '23mm', '32mm', '203mm'],
    correctAnswer: '23mm'
  },
  {
    id: 'M2-05-Q18',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '3cm 7mm は なんmm？',
    choices: ['10mm', '37mm', '73mm', '307mm'],
    correctAnswer: '37mm'
  },
  {
    id: 'M2-05-Q19',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '4cm 1mm は なんmm？',
    choices: ['5mm', '14mm', '41mm', '401mm'],
    correctAnswer: '41mm'
  },
  {
    id: 'M2-05-Q20',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '5cm 6mm は なんmm？',
    choices: ['11mm', '56mm', '65mm', '506mm'],
    correctAnswer: '56mm'
  },
  {
    id: 'M2-05-Q21',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '6cm 4mm は なんmm？',
    choices: ['10mm', '46mm', '64mm', '604mm'],
    correctAnswer: '64mm'
  },
  {
    id: 'M2-05-Q22',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '7cm 2mm は なんmm？',
    choices: ['9mm', '27mm', '72mm', '702mm'],
    correctAnswer: '72mm'
  },
  {
    id: 'M2-05-Q23',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '8cm 8mm は なんmm？',
    choices: ['16mm', '88mm', '98mm', '808mm'],
    correctAnswer: '88mm'
  },
  {
    id: 'M2-05-Q24',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '9cm 3mm は なんmm？',
    choices: ['12mm', '39mm', '93mm', '903mm'],
    correctAnswer: '93mm'
  },
  {
    id: 'M2-05-Q25',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '24mm は なんcm なんmm？',
    choices: ['1cm 4mm', '2cm 4mm', '4cm 2mm', '2cm 14mm'],
    correctAnswer: '2cm 4mm'
  },
  {
    id: 'M2-05-Q26',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '35mm は なんcm なんmm？',
    choices: ['2cm 5mm', '3cm 5mm', '5cm 3mm', '3cm 15mm'],
    correctAnswer: '3cm 5mm'
  },
  {
    id: 'M2-05-Q27',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '46mm は なんcm なんmm？',
    choices: ['3cm 6mm', '4cm 6mm', '6cm 4mm', '4cm 16mm'],
    correctAnswer: '4cm 6mm'
  },
  {
    id: 'M2-05-Q28',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '58mm は なんcm なんmm？',
    choices: ['4cm 8mm', '5cm 8mm', '8cm 5mm', '5cm 18mm'],
    correctAnswer: '5cm 8mm'
  },
  {
    id: 'M2-05-Q29',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '63mm は なんcm なんmm？',
    choices: ['3cm 6mm', '5cm 3mm', '6cm 3mm', '6cm 13mm'],
    correctAnswer: '6cm 3mm'
  },
  {
    id: 'M2-05-Q30',
    unitId: 'M2-05',
    step: 2,
    type: 'choice',
    question: '79mm は なんcm なんmm？',
    choices: ['6cm 9mm', '7cm 2mm', '7cm 9mm', '9cm 7mm'],
    correctAnswer: '7cm 9mm'
  },

  // =====================================================
  // Step3: 文章題（ながさの 計算）
  // =====================================================
  {
    id: 'M2-05-Q31',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'えんぴつの ながさは 12cm です。\n5cm けずりました。のこりは なんcm？',
    choices: ['5cm', '6cm', '7cm', '8cm'],
    correctAnswer: '7cm'
  },
  {
    id: 'M2-05-Q32',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'りぼんが 8cm あります。\n6cm もらいました。あわせて なんcm？',
    choices: ['12cm', '13cm', '14cm', '15cm'],
    correctAnswer: '14cm'
  },
  {
    id: 'M2-05-Q33',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'テープが 15cm あります。\n7cm きりました。のこりは なんcm？',
    choices: ['6cm', '7cm', '8cm', '9cm'],
    correctAnswer: '8cm'
  },
  {
    id: 'M2-05-Q34',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'ものさしは 30cm、えんぴつは 18cm。\nちがいは なんcm？',
    choices: ['10cm', '11cm', '12cm', '13cm'],
    correctAnswer: '12cm'
  },
  {
    id: 'M2-05-Q35',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'いとが 24cm あります。\n9cm つかいました。のこりは なんcm？',
    choices: ['13cm', '14cm', '15cm', '16cm'],
    correctAnswer: '15cm'
  },
  {
    id: 'M2-05-Q36',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'あおい テープは 13cm、あかい テープは 9cm。\nあわせて なんcm？',
    choices: ['20cm', '21cm', '22cm', '23cm'],
    correctAnswer: '22cm'
  },
  {
    id: 'M2-05-Q37',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'ながい ぼうは 45cm、みじかい ぼうは 27cm。\nちがいは なんcm？',
    choices: ['16cm', '17cm', '18cm', '19cm'],
    correctAnswer: '18cm'
  },
  {
    id: 'M2-05-Q38',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'リボンが 36cm あります。\n18cm つかいました。のこりは なんcm？',
    choices: ['16cm', '17cm', '18cm', '19cm'],
    correctAnswer: '18cm'
  },
  {
    id: 'M2-05-Q39',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'テープAは 17cm、テープBは 25cm。\nあわせて なんcm？',
    choices: ['40cm', '41cm', '42cm', '43cm'],
    correctAnswer: '42cm'
  },
  {
    id: 'M2-05-Q40',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 13cm でした。\n4cm みじかくなりました。いまは なんcm？',
    choices: ['7cm', '8cm', '9cm', '10cm'],
    correctAnswer: '9cm'
  },
  {
    id: 'M2-05-Q41',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'りぼんが 28cm あります。\n16cm つかいました。のこりは なんcm？',
    choices: ['10cm', '11cm', '12cm', '13cm'],
    correctAnswer: '12cm'
  },
  {
    id: 'M2-05-Q42',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'つくえの たては 65cm、よこは 45cm。\nたては よこより なんcm ながい？',
    choices: ['18cm', '19cm', '20cm', '21cm'],
    correctAnswer: '20cm'
  },
  {
    id: 'M2-05-Q43',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'かわの ながさは 75cm、みちは 48cm。\nかわは みちより なんcm ながい？',
    choices: ['25cm', '26cm', '27cm', '28cm'],
    correctAnswer: '27cm'
  },
  {
    id: 'M2-05-Q44',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'きのう 23cm の えだを きりました。\nきょうは 16cm きりました。\nあわせて なんcm？',
    choices: ['37cm', '38cm', '39cm', '40cm'],
    correctAnswer: '39cm'
  },
  {
    id: 'M2-05-Q45',
    unitId: 'M2-05',
    step: 3,
    type: 'choice',
    question: 'テープが 52cm あります。\n27cm つかいました。のこりは なんcm？',
    choices: ['23cm', '24cm', '25cm', '26cm'],
    correctAnswer: '25cm'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
