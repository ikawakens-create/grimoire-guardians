/**
 * M2-06a.js - Grimoire Guardians 問題データ（仮）
 * ユニット: M2-06a「おおきい かず①（100〜999 の 読み・構成）」
 *
 * 対象: 小学2年生、3桁の数の読み書き・構成
 * 準拠: 日本文教出版 算数2年
 * ※ 仮実装 — 子供の理解度に応じて問題を差し替える可能性あり
 *
 * Step構成（シャッフル出題）
 *   Step1: 100のまとまり（プール15問 → 5問出題）
 *   Step2: 3けたの かずの 構成   （プール15問 → 5問出題）
 *   Step3: 10ずつ・100ずつ かぞえる（プール15問 → 5問出題）
 *
 * @version 1.0-draft
 * @date 2026-03-19
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: 100 のまとまり
  // =====================================================
  {
    id: 'M2-06a-Q01',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '10を 10こ あつめると いくつ？',
    choices: ['10', '100', '1000', '50'],
    correctAnswer: '100'
  },
  {
    id: 'M2-06a-Q02',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100を 2こ あつめると いくつ？',
    choices: ['20', '102', '200', '1002'],
    correctAnswer: '200'
  },
  {
    id: 'M2-06a-Q03',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100を 5こ あつめると いくつ？',
    choices: ['50', '105', '500', '1005'],
    correctAnswer: '500'
  },
  {
    id: 'M2-06a-Q04',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100を 7こ あつめると いくつ？',
    choices: ['70', '107', '700', '1007'],
    correctAnswer: '700'
  },
  {
    id: 'M2-06a-Q05',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '300 は 100が なんこ？',
    choices: ['1こ', '2こ', '3こ', '30こ'],
    correctAnswer: '3こ'
  },
  {
    id: 'M2-06a-Q06',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '600 は 100が なんこ？',
    choices: ['6こ', '60こ', '16こ', '600こ'],
    correctAnswer: '6こ'
  },
  {
    id: 'M2-06a-Q07',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '900 は 100が なんこ？',
    choices: ['9こ', '90こ', '19こ', '900こ'],
    correctAnswer: '9こ'
  },
  {
    id: 'M2-06a-Q08',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100が 4こで いくつ？',
    choices: ['14', '40', '104', '400'],
    correctAnswer: '400'
  },
  {
    id: 'M2-06a-Q09',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100が 8こで いくつ？',
    choices: ['18', '80', '108', '800'],
    correctAnswer: '800'
  },
  {
    id: 'M2-06a-Q10',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '1000は 100が なんこ？',
    choices: ['1こ', '10こ', '100こ', '1000こ'],
    correctAnswer: '10こ'
  },
  {
    id: 'M2-06a-Q11',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100が 3こ と 10が 2こで いくつ？',
    choices: ['312', '320', '302', '32'],
    correctAnswer: '320'
  },
  {
    id: 'M2-06a-Q12',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100が 5こ と 1が 4こで いくつ？',
    choices: ['504', '540', '514', '54'],
    correctAnswer: '504'
  },
  {
    id: 'M2-06a-Q13',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '100が 7こ と 10が 3こで いくつ？',
    choices: ['703', '730', '713', '73'],
    correctAnswer: '730'
  },
  {
    id: 'M2-06a-Q14',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '460 は 100が なんこ と 10が なんこ？',
    choices: ['100が4こ、10が6こ', '100が6こ、10が4こ', '100が4こ、10が0こ', '100が46こ'],
    correctAnswer: '100が4こ、10が6こ'
  },
  {
    id: 'M2-06a-Q15',
    unitId: 'M2-06a',
    step: 1,
    type: 'choice',
    question: '850 は 100が なんこ と 10が なんこ？',
    choices: ['100が8こ、10が5こ', '100が5こ、10が8こ', '100が8こ、10が0こ', '100が85こ'],
    correctAnswer: '100が8こ、10が5こ'
  },

  // =====================================================
  // Step2: 3けたの かずの 構成
  // =====================================================
  {
    id: 'M2-06a-Q16',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が2こ、10が3こ、1が5こ\nあわせて いくつ？',
    choices: ['253', '235', '352', '523'],
    correctAnswer: '235'
  },
  {
    id: 'M2-06a-Q17',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が4こ、10が1こ、1が7こ\nあわせて いくつ？',
    choices: ['471', '417', '741', '174'],
    correctAnswer: '417'
  },
  {
    id: 'M2-06a-Q18',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が6こ、10が5こ、1が3こ\nあわせて いくつ？',
    choices: ['536', '653', '635', '365'],
    correctAnswer: '653'
  },
  {
    id: 'M2-06a-Q19',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '345の 百の くらいの かずは いくつ？',
    choices: ['3', '4', '5', '34'],
    correctAnswer: '3'
  },
  {
    id: 'M2-06a-Q20',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '572の 十の くらいの かずは いくつ？',
    choices: ['5', '7', '2', '57'],
    correctAnswer: '7'
  },
  {
    id: 'M2-06a-Q21',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '861の 一の くらいの かずは いくつ？',
    choices: ['8', '6', '1', '86'],
    correctAnswer: '1'
  },
  {
    id: 'M2-06a-Q22',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が3こ、10が0こ、1が8こ\nあわせて いくつ？',
    choices: ['308', '380', '830', '038'],
    correctAnswer: '308'
  },
  {
    id: 'M2-06a-Q23',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '709は 100が なんこ と 1が なんこ？',
    choices: ['100が7こ、1が9こ', '100が9こ、1が7こ', '100が7こ、1が0こ', '100が70こ'],
    correctAnswer: '100が7こ、1が9こ'
  },
  {
    id: 'M2-06a-Q24',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が5こ、10が8こ、1が2こ\nあわせて いくつ？',
    choices: ['825', '582', '258', '528'],
    correctAnswer: '582'
  },
  {
    id: 'M2-06a-Q25',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '934の 百の くらいの かずは いくつ？',
    choices: ['4', '3', '9', '93'],
    correctAnswer: '9'
  },
  {
    id: 'M2-06a-Q26',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '486の 十の くらいの かずは いくつ？',
    choices: ['4', '8', '6', '48'],
    correctAnswer: '8'
  },
  {
    id: 'M2-06a-Q27',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が1こ、10が2こ、1が3こ\nあわせて いくつ？',
    choices: ['321', '312', '231', '123'],
    correctAnswer: '123'
  },
  {
    id: 'M2-06a-Q28',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '100が9こ、10が9こ、1が9こ\nあわせて いくつ？',
    choices: ['909', '990', '999', '9999'],
    correctAnswer: '999'
  },
  {
    id: 'M2-06a-Q29',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '800 は どのように あらわせる？',
    choices: ['100が8こ', '10が8こ', '1が8こ', '8が100こ'],
    correctAnswer: '100が8こ'
  },
  {
    id: 'M2-06a-Q30',
    unitId: 'M2-06a',
    step: 2,
    type: 'choice',
    question: '270の 一の くらいの かずは いくつ？',
    choices: ['2', '7', '0', '27'],
    correctAnswer: '0'
  },

  // =====================================================
  // Step3: 10ずつ・100ずつ かぞえる
  // =====================================================
  {
    id: 'M2-06a-Q31',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '320の 10おおきい かずは いくつ？',
    choices: ['321', '330', '420', '310'],
    correctAnswer: '330'
  },
  {
    id: 'M2-06a-Q32',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '450の 100おおきい かずは いくつ？',
    choices: ['451', '460', '550', '350'],
    correctAnswer: '550'
  },
  {
    id: 'M2-06a-Q33',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '580の 10ちいさい かずは いくつ？',
    choices: ['579', '570', '480', '590'],
    correctAnswer: '570'
  },
  {
    id: 'M2-06a-Q34',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '700の 100ちいさい かずは いくつ？',
    choices: ['699', '710', '600', '800'],
    correctAnswer: '600'
  },
  {
    id: 'M2-06a-Q35',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '265の 1おおきい かずは いくつ？',
    choices: ['255', '264', '266', '275'],
    correctAnswer: '266'
  },
  {
    id: 'M2-06a-Q36',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '143の 10おおきい かずは いくつ？',
    choices: ['144', '153', '243', '133'],
    correctAnswer: '153'
  },
  {
    id: 'M2-06a-Q37',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '390の 10おおきい かずは いくつ？',
    choices: ['391', '400', '490', '380'],
    correctAnswer: '400'
  },
  {
    id: 'M2-06a-Q38',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '500の 1ちいさい かずは いくつ？',
    choices: ['499', '490', '400', '501'],
    correctAnswer: '499'
  },
  {
    id: 'M2-06a-Q39',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '810の 100ちいさい かずは いくつ？',
    choices: ['800', '811', '710', '910'],
    correctAnswer: '710'
  },
  {
    id: 'M2-06a-Q40',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '100、200、300、400、□\n□に はいる かずは いくつ？',
    choices: ['410', '450', '500', '600'],
    correctAnswer: '500'
  },
  {
    id: 'M2-06a-Q41',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '610、620、630、640、□\n□に はいる かずは いくつ？',
    choices: ['641', '645', '650', '700'],
    correctAnswer: '650'
  },
  {
    id: 'M2-06a-Q42',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '900、800、700、600、□\n□に はいる かずは いくつ？',
    choices: ['500', '550', '590', '610'],
    correctAnswer: '500'
  },
  {
    id: 'M2-06a-Q43',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '475の 100おおきい かずは いくつ？',
    choices: ['476', '485', '575', '375'],
    correctAnswer: '575'
  },
  {
    id: 'M2-06a-Q44',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '860の 10ちいさい かずは いくつ？',
    choices: ['859', '850', '760', '870'],
    correctAnswer: '850'
  },
  {
    id: 'M2-06a-Q45',
    unitId: 'M2-06a',
    step: 3,
    type: 'choice',
    question: '495、496、497、498、□\n□に はいる かずは いくつ？',
    choices: ['490', '498', '499', '500'],
    correctAnswer: '499'
  }
];

export const stepConfig = [
  { step: 1, pick: 5 },
  { step: 2, pick: 5 },
  { step: 3, pick: 5 }
];

export default questions;
