/**
 * M2-06b.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-06b「おおきい かず②（大小・じゅんばん）」
 *
 * 対象: 小学2年生、3桁の数の大小比較・順序
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 数の 大小 比較（プール15問 → 5問出題）
 *   Step2: 数の じゅんばん・ならびかえ（プール15問 → 5問出題）
 *   Step3: 文章題             （プール15問 → 5問出題）
 *
 * @version 1.0
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 数の 大小 比較
  // =====================================================
  {
    id: 'M2-06b-Q01',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '300 と 200、どちらが おおきい？',
    choices: ['300', '200', 'おなじ', 'わからない'],
    correctAnswer: '300'
  },
  {
    id: 'M2-06b-Q02',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '456 と 465、どちらが おおきい？',
    choices: ['456', '465', 'おなじ', 'わからない'],
    correctAnswer: '465'
  },
  {
    id: 'M2-06b-Q03',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '723 と 732、どちらが おおきい？',
    choices: ['723', '732', 'おなじ', 'わからない'],
    correctAnswer: '732'
  },
  {
    id: 'M2-06b-Q04',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '589 と 598、どちらが おおきい？',
    choices: ['589', '598', 'おなじ', 'わからない'],
    correctAnswer: '598'
  },
  {
    id: 'M2-06b-Q05',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '841 と 814、どちらが おおきい？',
    choices: ['841', '814', 'おなじ', 'わからない'],
    correctAnswer: '841'
  },
  {
    id: 'M2-06b-Q06',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '376 と 376、どちらが おおきい？',
    choices: ['376（左）', '376（右）', 'おなじ', 'わからない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M2-06b-Q07',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '620 と 602、どちらが おおきい？',
    choices: ['620', '602', 'おなじ', 'わからない'],
    correctAnswer: '620'
  },
  {
    id: 'M2-06b-Q08',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '100 と 99、どちらが おおきい？',
    choices: ['100', '99', 'おなじ', 'わからない'],
    correctAnswer: '100'
  },
  {
    id: 'M2-06b-Q09',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '999 と 1000、どちらが おおきい？',
    choices: ['999', '1000', 'おなじ', 'わからない'],
    correctAnswer: '1000'
  },
  {
    id: 'M2-06b-Q10',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '480 と 408、どちらが おおきい？',
    choices: ['480', '408', 'おなじ', 'わからない'],
    correctAnswer: '480'
  },
  {
    id: 'M2-06b-Q11',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '517 と 571、どちらが ちいさい？',
    choices: ['517', '571', 'おなじ', 'わからない'],
    correctAnswer: '517'
  },
  {
    id: 'M2-06b-Q12',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '265 と 256、どちらが ちいさい？',
    choices: ['265', '256', 'おなじ', 'わからない'],
    correctAnswer: '256'
  },
  {
    id: 'M2-06b-Q13',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '834 と 843、どちらが ちいさい？',
    choices: ['834', '843', 'おなじ', 'わからない'],
    correctAnswer: '834'
  },
  {
    id: 'M2-06b-Q14',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '700 と 699、どちらが ちいさい？',
    choices: ['700', '699', 'おなじ', 'わからない'],
    correctAnswer: '699'
  },
  {
    id: 'M2-06b-Q15',
    unitId: 'M2-06b',
    step: 1,
    type: 'choice',
    question: '403 と 340、どちらが おおきい？',
    choices: ['403', '340', 'おなじ', 'わからない'],
    correctAnswer: '403'
  },

  // =====================================================
  // Step2: 数の じゅんばん・ならびかえ
  // =====================================================
  {
    id: 'M2-06b-Q16',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '245、524、452 の中で\nいちばん おおきい かずは？',
    choices: ['245', '524', '452', 'どれも おなじ'],
    correctAnswer: '524'
  },
  {
    id: 'M2-06b-Q17',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '318、381、138 の中で\nいちばん ちいさい かずは？',
    choices: ['318', '381', '138', 'どれも おなじ'],
    correctAnswer: '138'
  },
  {
    id: 'M2-06b-Q18',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '671、617、761 の中で\nいちばん おおきい かずは？',
    choices: ['671', '617', '761', 'どれも おなじ'],
    correctAnswer: '761'
  },
  {
    id: 'M2-06b-Q19',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '492、429、924 の中で\nいちばん ちいさい かずは？',
    choices: ['492', '429', '924', 'どれも おなじ'],
    correctAnswer: '429'
  },
  {
    id: 'M2-06b-Q20',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '550、505、500 を おおきい じゅんに ならべると\nさいしょは どれ？',
    choices: ['550', '505', '500', 'どれも おなじ'],
    correctAnswer: '550'
  },
  {
    id: 'M2-06b-Q21',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '380、308、830 を ちいさい じゅんに ならべると\nさいしょは どれ？',
    choices: ['380', '308', '830', 'どれも おなじ'],
    correctAnswer: '308'
  },
  {
    id: 'M2-06b-Q22',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '□、200、300、400\n□に はいる かずは いくつ？',
    choices: ['50', '100', '150', '500'],
    correctAnswer: '100'
  },
  {
    id: 'M2-06b-Q23',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '600、□、800、900\n□に はいる かずは いくつ？',
    choices: ['650', '700', '750', '710'],
    correctAnswer: '700'
  },
  {
    id: 'M2-06b-Q24',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '110、120、130、□\n□に はいる かずは いくつ？',
    choices: ['131', '135', '140', '200'],
    correctAnswer: '140'
  },
  {
    id: 'M2-06b-Q25',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '750、760、770、□\n□に はいる かずは いくつ？',
    choices: ['771', '775', '780', '800'],
    correctAnswer: '780'
  },
  {
    id: 'M2-06b-Q26',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '170、270、370、□\n□に はいる かずは いくつ？',
    choices: ['380', '470', '400', '371'],
    correctAnswer: '470'
  },
  {
    id: 'M2-06b-Q27',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '500より おおきくて 600より ちいさい かずは？',
    choices: ['499', '500', '550', '600'],
    correctAnswer: '550'
  },
  {
    id: 'M2-06b-Q28',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '800より ちいさくて 700より おおきい かずは？',
    choices: ['700', '750', '800', '850'],
    correctAnswer: '750'
  },
  {
    id: 'M2-06b-Q29',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '254、245、542、452 の中で\n2ばんめに おおきい かずは？',
    choices: ['254', '245', '542', '452'],
    correctAnswer: '452'
  },
  {
    id: 'M2-06b-Q30',
    unitId: 'M2-06b',
    step: 2,
    type: 'choice',
    question: '319、391、913、193 の中で\n2ばんめに ちいさい かずは？',
    choices: ['319', '391', '913', '193'],
    correctAnswer: '319'
  },

  // =====================================================
  // Step3: 文章題
  // =====================================================
  {
    id: 'M2-06b-Q31',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'Aさんは シールを 342まい、\nBさんは 324まい もっています。\nどちらが おおい？',
    choices: ['Aさん', 'Bさん', 'おなじ', 'わからない'],
    correctAnswer: 'Aさん'
  },
  {
    id: 'M2-06b-Q32',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'えんぴつが 3はこ あります。\n1はこに 100ぽん はいっています。\nあわせて なんぼん？',
    choices: ['3ぽん', '30ぽん', '300ぽん', '1000ぽん'],
    correctAnswer: '300ぽん'
  },
  {
    id: 'M2-06b-Q33',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '400えん と 300えん、\nどちらが たかい？',
    choices: ['400えん', '300えん', 'おなじ', 'わからない'],
    correctAnswer: '400えん'
  },
  {
    id: 'M2-06b-Q34',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '学校に 男子が 256にん、\n女子が 265にん います。\nどちらが おおい？',
    choices: ['男子', '女子', 'おなじ', 'わからない'],
    correctAnswer: '女子'
  },
  {
    id: 'M2-06b-Q35',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'みかんが 487こ、りんごが 478こ あります。\nどちらが おおい？',
    choices: ['みかん', 'りんご', 'おなじ', 'わからない'],
    correctAnswer: 'みかん'
  },
  {
    id: 'M2-06b-Q36',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '3年生の ほんすうは 621さつ、\n2年生は 612さつ です。\nどちらが おおい？',
    choices: ['3年生', '2年生', 'おなじ', 'わからない'],
    correctAnswer: '3年生'
  },
  {
    id: 'M2-06b-Q37',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'A市の にんずうは 843にん、\nB市は 834にん です。\nどちらが すくない？',
    choices: ['A市', 'B市', 'おなじ', 'わからない'],
    correctAnswer: 'B市'
  },
  {
    id: 'M2-06b-Q38',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'あかい ふうせんが 500こ、\nあおい ふうせんが 490こ あります。\nちがいは なんこ？',
    choices: ['1こ', '5こ', '10こ', '100こ'],
    correctAnswer: '10こ'
  },
  {
    id: 'M2-06b-Q39',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '3まいの カードに 7、2、5 と かいてあります。\nいちばん おおきい 3けたの かずは？',
    choices: ['275', '527', '572', '752'],
    correctAnswer: '752'
  },
  {
    id: 'M2-06b-Q40',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '3まいの カードに 4、1、8 と かいてあります。\nいちばん ちいさい 3けたの かずは？',
    choices: ['148', '184', '418', '841'],
    correctAnswer: '148'
  },
  {
    id: 'M2-06b-Q41',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'あなたは 680えん もっています。\n700えんの おもちゃを かえますか？',
    choices: ['かえる', 'かえない', 'ちょうど', 'わからない'],
    correctAnswer: 'かえない'
  },
  {
    id: 'M2-06b-Q42',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '3まいの カードに 6、3、9 と かいてあります。\n2ばんめに おおきい 3けたの かずは？',
    choices: ['369', '639', '693', '963'],
    correctAnswer: '693'
  },
  {
    id: 'M2-06b-Q43',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'としょかんの ほんが 576さつ あります。\n100さつ かいました。\nあわせて なんさつ？',
    choices: ['576さつ', '576さつ', '676さつ', '666さつ'],
    correctAnswer: '676さつ'
  },
  {
    id: 'M2-06b-Q44',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: 'Aチームは 348てん、Bチームは 384てん、\nCチームは 438てん です。\nいちばん おおい チームは？',
    choices: ['Aチーム', 'Bチーム', 'Cチーム', 'おなじ'],
    correctAnswer: 'Cチーム'
  },
  {
    id: 'M2-06b-Q45',
    unitId: 'M2-06b',
    step: 3,
    type: 'choice',
    question: '950より おおきくて 1000より ちいさい かずは？',
    choices: ['949', '950', '975', '1000'],
    correctAnswer: '975'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
