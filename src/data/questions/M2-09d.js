/**
 * M2-09d.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-09d「さんごしょう まとめ（Zone 2 そうまとめ）」
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 * @version 1.0
 * @date 2026-03-19
 */

const questions = [
  // ── Step 1: ながさ・かさ・おもさ 総復習 (15問) ──
  {
    id: 'M2-09d-Q01',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '1cm は なんmm ですか？',
    choices: ['1mm', '5mm', '10mm', '100mm'],
    correctAnswer: '10mm'
  },
  {
    id: 'M2-09d-Q02',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '3cm5mm は なんmm ですか？',
    choices: ['35mm', '38mm', '305mm', '350mm'],
    correctAnswer: '35mm'
  },
  {
    id: 'M2-09d-Q03',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '1L は なんdL ですか？',
    choices: ['1dL', '5dL', '10dL', '100dL'],
    correctAnswer: '10dL'
  },
  {
    id: 'M2-09d-Q04',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '1dL は なんmL ですか？',
    choices: ['10mL', '50mL', '100mL', '1000mL'],
    correctAnswer: '100mL'
  },
  {
    id: 'M2-09d-Q05',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '1kg は なんg ですか？',
    choices: ['10g', '100g', '500g', '1000g'],
    correctAnswer: '1000g'
  },
  {
    id: 'M2-09d-Q06',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '2L3dL は なんdL ですか？',
    choices: ['23dL', '25dL', '203dL', '230dL'],
    correctAnswer: '23dL'
  },
  {
    id: 'M2-09d-Q07',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '2kg500g は なんg ですか？',
    choices: ['250g', '2500g', '2050g', '20500g'],
    correctAnswer: '2500g'
  },
  {
    id: 'M2-09d-Q08',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: 'えんぴつが 12cm3mm、ものさしが 15cm あります。どちらが ながいですか？',
    choices: ['えんぴつ', 'ものさし', 'おなじ', 'わからない'],
    correctAnswer: 'ものさし'
  },
  {
    id: 'M2-09d-Q09',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: 'バケツに 3L、じょうろに 15dL の みずが あります。どちらが おおいですか？',
    choices: ['バケツ', 'じょうろ', 'おなじ', 'わからない'],
    correctAnswer: 'おなじ'
  },
  {
    id: 'M2-09d-Q10',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: 'りんごが 750g、みかんが 1kg あります。どちらが おもいですか？',
    choices: ['りんご', 'みかん', 'おなじ', 'わからない'],
    correctAnswer: 'みかん'
  },
  {
    id: 'M2-09d-Q11',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: 'テープが 4cm8mm と 3cm5mm あります。あわせると なんcm なんmmですか？',
    choices: ['7cm3mm', '8cm3mm', '7cm13mm', '8cm13mm'],
    correctAnswer: '8cm3mm'
  },
  {
    id: 'M2-09d-Q12',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: 'やかんに 2L5dL の みずが あります。1L3dL つかいました。のこりは なんdL ですか？',
    choices: ['10dL', '12dL', '14dL', '16dL'],
    correctAnswer: '12dL'
  },
  {
    id: 'M2-09d-Q13',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '50mm は なんcm ですか？',
    choices: ['3cm', '4cm', '5cm', '6cm'],
    correctAnswer: '5cm'
  },
  {
    id: 'M2-09d-Q14',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: '3000g は なんkg ですか？',
    choices: ['1kg', '2kg', '3kg', '4kg'],
    correctAnswer: '3kg'
  },
  {
    id: 'M2-09d-Q15',
    unitId: 'M2-09d',
    step: 1,
    type: 'text',
    question: 'にもつが 2kg300g と 1kg500g あります。あわせると なんkg なんgですか？',
    choices: ['3kg500g', '3kg700g', '3kg800g', '4kg800g'],
    correctAnswer: '3kg800g'
  },

  // ── Step 2: おおきいかず 総復習 (15問) ──
  {
    id: 'M2-09d-Q16',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '100を 3こ あつめた かずは なんですか？',
    choices: ['30', '130', '300', '3000'],
    correctAnswer: '300'
  },
  {
    id: 'M2-09d-Q17',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '647 は 100が なんこ、10が なんこ、1が なんこ ですか？',
    choices: ['6・4・7', '60・4・7', '6・47・0', '64・0・7'],
    correctAnswer: '6・4・7'
  },
  {
    id: 'M2-09d-Q18',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '□に あてはまる かずは なんですか？\n100が5こ、10が□こ、1が3こ → 523',
    choices: ['1こ', '2こ', '3こ', '5こ'],
    correctAnswer: '2こ'
  },
  {
    id: 'M2-09d-Q19',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '380 より 10 おおきい かずは なんですか？',
    choices: ['370', '381', '390', '480'],
    correctAnswer: '390'
  },
  {
    id: 'M2-09d-Q20',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '560 より 100 ちいさい かずは なんですか？',
    choices: ['450', '460', '550', '660'],
    correctAnswer: '460'
  },
  {
    id: 'M2-09d-Q21',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: 'おおきい かずは どちらですか？\n462 と 426',
    choices: ['462', '426', 'おなじ', 'わからない'],
    correctAnswer: '462'
  },
  {
    id: 'M2-09d-Q22',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: 'ちいさい かずは どれですか？\n530・503・350',
    choices: ['530', '503', '350', 'おなじ'],
    correctAnswer: '350'
  },
  {
    id: 'M2-09d-Q23',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '□に あてはまる かずは なんですか？\n400 ＜ □ ＜ 600',
    choices: ['300', '400', '500', '600'],
    correctAnswer: '500'
  },
  {
    id: 'M2-09d-Q24',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: 'ちいさい じゅんに ならべましょう。\n719・197・791',
    choices: ['197・719・791', '197・791・719', '719・197・791', '791・719・197'],
    correctAnswer: '197・719・791'
  },
  {
    id: 'M2-09d-Q25',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: 'おかしが 356こ あります。あと なんこ で 400こ になりますか？',
    choices: ['34こ', '44こ', '54こ', '64こ'],
    correctAnswer: '44こ'
  },
  {
    id: 'M2-09d-Q26',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '1000 は 100が なんこ ですか？',
    choices: ['1こ', '10こ', '100こ', '1000こ'],
    correctAnswer: '10こ'
  },
  {
    id: 'M2-09d-Q27',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '820 より 10 ちいさい かずは なんですか？',
    choices: ['800', '810', '820', '830'],
    correctAnswer: '810'
  },
  {
    id: 'M2-09d-Q28',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: '3けたの かずで いちばん おおきい かずは なんですか？',
    choices: ['900', '990', '999', '1000'],
    correctAnswer: '999'
  },
  {
    id: 'M2-09d-Q29',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: 'おおきい じゅんに ならべましょう。\n245・524・452',
    choices: ['524・452・245', '452・524・245', '245・452・524', '524・245・452'],
    correctAnswer: '524・452・245'
  },
  {
    id: 'M2-09d-Q30',
    unitId: 'M2-09d',
    step: 2,
    type: 'text',
    question: 'としょかんに 本が 634さつ あります。100さつ かいたすと なんさつ になりますか？',
    choices: ['634さつ', '644さつ', '734さつ', '744さつ'],
    correctAnswer: '734さつ'
  },

  // ── Step 3: じこく・じかん 総復習 (15問) ──
  {
    id: 'M2-09d-Q31',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: '1じかん は なんぷん ですか？',
    choices: ['30ぷん', '50ぷん', '60ぷん', '100ぷん'],
    correctAnswer: '60ぷん'
  },
  {
    id: 'M2-09d-Q32',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: '午前 と 午後 を あわせると いちにちは なんじかん ですか？',
    choices: ['12じかん', '20じかん', '24じかん', '48じかん'],
    correctAnswer: '24じかん'
  },
  {
    id: 'M2-09d-Q33',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: '午前10時15分 の 30ぷん ご は なんじ なんぷん ですか？',
    choices: ['午前10時35分', '午前10時45分', '午前11時15分', '午前11時45分'],
    correctAnswer: '午前10時45分'
  },
  {
    id: 'M2-09d-Q34',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: '2時50分 の 20ぷん ご は なんじ なんぷん ですか？',
    choices: ['2時60分', '2時70分', '3時10分', '3時20分'],
    correctAnswer: '3時10分'
  },
  {
    id: 'M2-09d-Q35',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: '3時20分 から 4時00分 まで なんぷん ですか？',
    choices: ['20ぷん', '30ぷん', '40ぷん', '50ぷん'],
    correctAnswer: '40ぷん'
  },
  {
    id: 'M2-09d-Q36',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'べんきょうを 午後3時にはじめて、45ぷん べんきょうしました。おわりの じこくは なんじ なんぷん ですか？',
    choices: ['午後3時35分', '午後3時45分', '午後3時55分', '午後4時15分'],
    correctAnswer: '午後3時45分'
  },
  {
    id: 'M2-09d-Q37',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'えいがが 午後1時30分 に はじまって、午後3時00分 に おわりました。えいがは なんじかん なんぷん ですか？',
    choices: ['1じかん', '1じかん30ぷん', '2じかん', '2じかん30ぷん'],
    correctAnswer: '1じかん30ぷん'
  },
  {
    id: 'M2-09d-Q38',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'でんしゃが 10時45分に でて、40ぷん のって つきました。ついた じこくは なんじ なんぷん ですか？',
    choices: ['11時15分', '11時25分', '11時35分', '11時45分'],
    correctAnswer: '11時25分'
  },
  {
    id: 'M2-09d-Q39',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'ゲームを 1じかん15ぷん しました。はじまりが 午後4時00分 なら おわりは なんじ なんぷん ですか？',
    choices: ['午後4時15分', '午後5時00分', '午後5時15分', '午後5時30分'],
    correctAnswer: '午後5時15分'
  },
  {
    id: 'M2-09d-Q40',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'そうじが 午後2時10分 に おわりました。35ぷん まえに はじめた ので、はじまりは なんじ なんぷん ですか？',
    choices: ['午後1時25分', '午後1時35分', '午後1時45分', '午後2時45分'],
    correctAnswer: '午後1時35分'
  },
  {
    id: 'M2-09d-Q41',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'としょかんに 午前9時30分 から 午前11時30分 まで いました。なんじかん いましたか？',
    choices: ['1じかん', '1じかん30ぷん', '2じかん', '2じかん30ぷん'],
    correctAnswer: '2じかん'
  },
  {
    id: 'M2-09d-Q42',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'バスが 8時55分 に でます。いえを 20ぷん まえに でるには なんじ なんぷん に でればいいですか？',
    choices: ['8時25分', '8時35分', '8時45分', '9時15分'],
    correctAnswer: '8時35分'
  },
  {
    id: 'M2-09d-Q43',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'おひるやすみが 12時15分 から 1時00分 まであります。なんぷん ですか？',
    choices: ['35ぷん', '40ぷん', '45ぷん', '50ぷん'],
    correctAnswer: '45ぷん'
  },
  {
    id: 'M2-09d-Q44',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'ひなたさんは 午前8時に いえを でて、午後3時15分に かえりました。そとに いた じかんは なんじかん なんぷん ですか？',
    choices: ['6じかん45ぷん', '7じかん15ぷん', '7じかん45ぷん', '8じかん15ぷん'],
    correctAnswer: '7じかん15ぷん'
  },
  {
    id: 'M2-09d-Q45',
    unitId: 'M2-09d',
    step: 3,
    type: 'text',
    question: 'かけっこで 1いが 12びょう、2いが 15びょう でした。さは なんびょう ですか？',
    choices: ['2びょう', '3びょう', '4びょう', '5びょう'],
    correctAnswer: '3びょう'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
