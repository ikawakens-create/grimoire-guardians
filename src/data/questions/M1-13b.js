/**
 * M1-13b.js - Grimoire Guardians 問題データ
 * ユニット: M1-13b「かたちづくり」
 *
 * 対象: 小学1年生、平面図形の認識（さんかく・しかく・まる）
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: かたちの なまえ（プール9問 → 3問出題）
 *   Step2: なかまさがし（プール12問 → 4問出題）
 *   Step3: かたちを かぞえよう（プール12問 → 4問出題）
 *   Step4: 文章題・チャレンジ（プール12問 → 4問出題）
 *
 * 設計方針:
 *   - 全問 distractorPool 形式 + renderAs:'shape' で SVG 形を表示
 *   - ShapeFace._TEXT_MAP に登録されたテキストを選択肢として使用
 *   - 「さんかく」「しかく」「まる」の3種類が均等に登場するよう問題を設計
 *
 * @version 1.0
 * @date 2026-03-13
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かたちの なまえ（9問）
  // 身近なものが3種類の平面図形のどれか識別する
  // =====================================================

  {
    id: 'M1-13b-Q01',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'とけいの　もじばんは　どの　かたち？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q02',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'おにぎりを　うえから　みた　かたちは？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q03',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'ハンカチは　どの　かたち？',
    correctAnswer: 'しかく',
    distractorPool: [
      'さんかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q04',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'ピザを　まるごと　みると　どの　かたち？',
    correctAnswer: 'まる',
    distractorPool: [
      'しかく',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q05',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'どうろの　「とまれ」　きごうの　かたちは？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'まる',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step2: なかまさがし（12問）
  // 正しい「なかま」の形を選ぶ
  // =====================================================

  {
    id: 'M1-13b-Q06',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'まるの　なかまは　どれ？　ボールと　おなじ　かたちを　えらぼう',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q07',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'ノートや　ふうとうと　おなじ　かたちは？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q08',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'やまや　やねと　おなじ　かたちは？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q09',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'めだまやきの　きみは　どの　かたち？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q10',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'ピザを　4とうぶんに　きると　どんな　かたちが　できる？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'まる',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q11',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'ドアや　まどと　おなじ　かたちは？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step3: かたちを かぞえよう（12問）
  // 数や組み合わせの問題
  // =====================================================

  {
    id: 'M1-13b-Q12',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'しかくを　まっすぐ　よこに　はんぶんに　きりました。できた　かたちは　どれ？',
    correctAnswer: 'しかく',
    distractorPool: [
      'さんかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q13',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'いちばん　かどが　おおい　かたちは？',
    correctAnswer: 'しかく',
    distractorPool: [
      'さんかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q14',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'かどが　まったく　ない　かたちは？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q15',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'かどが　3つ　ある　かたちは？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q16',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'かどが　4つ　ある　かたちは？',
    correctAnswer: 'しかく',
    distractorPool: [
      'さんかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step4: 文章題・チャレンジ（12問）
  // =====================================================

  {
    id: 'M1-13b-Q17',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'ゆきちゃんは　まるい　かたちの　えを　かきたいです。どの　かたちを　えらびますか？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q18',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'けんとくんは　かみを　3つの　かど　ができるように　おりました。どの　かたちに　なりましたか？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q19',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'はなこさんは　4つの　かどが　ある　かたちの　カードを　もっています。どの　かたちですか？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q20',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'しかくを　はんぶんに　きると　どんな　かたちが　2まい　できますか？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'まる',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step1 追加プール①（合計9問 → pick 3）
  // =====================================================

  {
    id: 'M1-13b-Q21',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'まんまるな　おつきさまは　どの　かたち？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step2 追加プール①（合計12問 → pick 4）
  // =====================================================

  {
    id: 'M1-13b-Q22',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'コインを　うえから　みると　どの　かたち？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q23',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'おりがみを　1まい　ひろげると　どの　かたち？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step3 追加プール①（合計12問 → pick 4）
  // =====================================================

  {
    id: 'M1-13b-Q24',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: '4本の　まっすぐな　せんで　かこわれた　かたちは？',
    correctAnswer: 'しかく',
    distractorPool: [
      'さんかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q25',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: '3本の　まっすぐな　せんで　かこわれた　かたちは？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q26',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'まっすぐな　せんが　まったく　ない　かたちは？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step4 追加プール①（合計12問 → pick 4）
  // =====================================================

  {
    id: 'M1-13b-Q27',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'たろうくんは　かどが　ひとつも　ない　かたちの　クッキーを　もっています。どの　かたちですか？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q28',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'はるかさんは　4つの　かどが　ある　かたちの　ふうとうを　もっています。どの　かたちですか？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q29',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'けんじくんが　かいた　かたちは　かどが　3つ　ありました。どの　かたちですか？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q30',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'ゆかさんは　くるくる　まわしても　いつも　おなじ　みための　かたちを　かきました。どの　かたちですか？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step1 追加プール②（Q31〜Q33: 合計9問 → pick 3）
  // バランス: まる×3, さんかく×3, しかく×3
  // =====================================================

  {
    id: 'M1-13b-Q31',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'スマートフォンを　うえから　みると　どの　かたち？',
    correctAnswer: 'しかく',
    distractorPool: [
      'さんかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q32',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'きって（はがきに　はる　ちいさな　もの）は　どの　かたち？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q33',
    unitId: 'M1-13b',
    step: 1,
    type: 'choice',
    renderAs: 'shape',
    question: 'さんかくじょうぎは　どの　かたち？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step2 追加プール②（Q34〜Q37: 合計12問 → pick 4）
  // バランス: まる×4, さんかく×4, しかく×4
  // =====================================================

  {
    id: 'M1-13b-Q34',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'パーティーの　とんがりぼうしは　どの　かたち？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'まる',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q35',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'おさらを　うえから　みると　どの　かたち？',
    correctAnswer: 'まる',
    distractorPool: [
      'しかく',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q36',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'えんぴつの　さきっぽを　よこから　みると　どの　かたち？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q37',
    unitId: 'M1-13b',
    step: 2,
    type: 'choice',
    renderAs: 'shape',
    question: 'たたみを　うえから　みると　どの　かたち？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step3 追加プール②（Q38〜Q41: 合計12問 → pick 4）
  // バランス: まる×4, さんかく×4, しかく×4
  // =====================================================

  {
    id: 'M1-13b-Q38',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'へんが　3つの　かたちは　どれ？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q39',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'まわりを　どこを　さわっても　かどが　ない　かたちは？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q40',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: '3つの　てんを　むすぶと　できる　かたちは？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'まる',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q41',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'どの　むきに　ひっくりかえしても　おなじ　かたちに　なるのは？',
    correctAnswer: 'まる',
    distractorPool: [
      'しかく',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step4 追加プール②（Q42〜Q45: 合計12問 → pick 4）
  // バランス: まる×4, さんかく×4, しかく×4
  // =====================================================

  {
    id: 'M1-13b-Q42',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'あかりちゃんは　おつきさまの　えを　かきたいです。どの　かたちを　かきますか？',
    correctAnswer: 'まる',
    distractorPool: [
      'さんかく',
      'しかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q43',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'けいすけくんは　かみで　やまの　かたちを　つくりました。どの　かたちですか？',
    correctAnswer: 'さんかく',
    distractorPool: [
      'しかく',
      'まる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q44',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'さつきちゃんは　かどが　4つ　ある　かたちの　シールを　ノートに　はりました。どの　かたちですか？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13b-Q45',
    unitId: 'M1-13b',
    step: 4,
    type: 'choice',
    renderAs: 'shape',
    question: 'りょうくんは　へんが　4つ　ある　かたちの　ぞうきんで　そうじを　しました。どの　かたちですか？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
    ],
    image: null,
    choiceImages: null,
  },

];

// ─── stepConfig ──────────────────────────────────────────────────────────────
// シャッフル出題の設定: 各ステップから何問出題するかを定義する

export const stepConfig = [
  { step: 1, pick: 3 },   // Step1: かたちの なまえ（9問から3問）
  { step: 2, pick: 4 },   // Step2: なかまさがし（12問から4問）
  { step: 3, pick: 4 },   // Step3: かたちを かぞえよう（12問から4問）
  { step: 4, pick: 4 },   // Step4: 文章題・チャレンジ（12問から4問）
];

export default questions;
