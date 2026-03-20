/**
 * M2-15a.js - Grimoire Guardians 問題データ
 * ユニット: M2-15a「そうふくしゅう①」— Zone 1+2（2桁計算・計量・時刻）
 * プール: 21問 / 出題: 15問
 * @version 1.0
 * @date 2026-03-20
 */

const questions = [
  // ── Step 1: 2桁のたしざん・ひきざん ──
  {
    id: 'M2-15a-Q01',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '67 + 35 = ？',
    choices: ['92', '102', '112', '122'],
    correctAnswer: '102'
  },
  {
    id: 'M2-15a-Q02',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '82 - 47 = ？',
    choices: ['25', '35', '45', '55'],
    correctAnswer: '35'
  },
  {
    id: 'M2-15a-Q03',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '48 + 56 = ？',
    choices: ['94', '104', '114', '124'],
    correctAnswer: '104'
  },
  {
    id: 'M2-15a-Q04',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '100 - 63 = ？',
    choices: ['27', '37', '47', '57'],
    correctAnswer: '37'
  },
  {
    id: 'M2-15a-Q05',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '73 + 58 = ？',
    choices: ['121', '131', '141', '151'],
    correctAnswer: '131'
  },
  {
    id: 'M2-15a-Q06',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '125 - 48 = ？',
    choices: ['67', '77', '87', '97'],
    correctAnswer: '77'
  },
  {
    id: 'M2-15a-Q07',
    unitId: 'M2-15a',
    step: 1,
    type: 'text',
    question: '99 + 23 = ？',
    choices: ['112', '122', '132', '142'],
    correctAnswer: '122'
  },

  // ── Step 2: 長さ・重さ・かさ ──
  {
    id: 'M2-15a-Q08',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '1m30cm は なんcmですか？',
    choices: ['103cm', '130cm', '13cm', '300cm'],
    correctAnswer: '130cm'
  },
  {
    id: 'M2-15a-Q09',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '250cm は なんm なんcmですか？',
    choices: ['2m5cm', '2m50cm', '25m0cm', '20m50cm'],
    correctAnswer: '2m50cm'
  },
  {
    id: 'M2-15a-Q10',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '1L と 500mL を あわせると なんmLですか？',
    choices: ['500mL', '1500mL', '1050mL', '2000mL'],
    correctAnswer: '1500mL'
  },
  {
    id: 'M2-15a-Q11',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '1kg200g は なんgですか？',
    choices: ['120g', '1020g', '1200g', '12000g'],
    correctAnswer: '1200g'
  },
  {
    id: 'M2-15a-Q12',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '85cm + 35cm = ？',
    choices: ['1m10cm', '1m20cm', '1m25cm', '120cm'],
    correctAnswer: '1m20cm'
  },
  {
    id: 'M2-15a-Q13',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '2L - 700mL = ？',
    choices: ['1L200mL', '1L300mL', '1L700mL', '1300mL'],
    correctAnswer: '1L300mL'
  },
  {
    id: 'M2-15a-Q14',
    unitId: 'M2-15a',
    step: 2,
    type: 'text',
    question: '3kg - 800g = ？',
    choices: ['2kg100g', '2kg200g', '2kg800g', '2200g'],
    correctAnswer: '2kg200g'
  },

  // ── Step 3: 時刻・大きい数 ──
  {
    id: 'M2-15a-Q15',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: '2時40分の 1時間20分あとは なんじ なんぷんですか？',
    choices: ['3時50分', '4時00分', '4時10分', '4時20分'],
    correctAnswer: '4時00分'
  },
  {
    id: 'M2-15a-Q16',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: '午前10時30分から 午後1時まで は なんじかん なんぷんですか？',
    choices: ['2時間20分', '2時間30分', '3時間30分', '3時間'],
    correctAnswer: '2時間30分'
  },
  {
    id: 'M2-15a-Q17',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: '100を 10こ あつめた かずは？',
    choices: ['100', '1000', '10000', '100000'],
    correctAnswer: '1000'
  },
  {
    id: 'M2-15a-Q18',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: '500 + 800 = ？',
    choices: ['1200', '1300', '1400', '1500'],
    correctAnswer: '1300'
  },
  {
    id: 'M2-15a-Q19',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: '3時15分の 45分あとは なんじ なんぷんですか？',
    choices: ['3時55分', '4時00分', '4時05分', '4時15分'],
    correctAnswer: '4時00分'
  },
  {
    id: 'M2-15a-Q20',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: '1000より 200おおきい かずは？',
    choices: ['800', '1002', '1020', '1200'],
    correctAnswer: '1200'
  },
  {
    id: 'M2-15a-Q21',
    unitId: 'M2-15a',
    step: 3,
    type: 'text',
    question: 'えんぴつが 128ほん あります。\n56ほん くばると のこりは なんほんですか？',
    choices: ['62ほん', '72ほん', '82ほん', '184ほん'],
    correctAnswer: '72ほん'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
