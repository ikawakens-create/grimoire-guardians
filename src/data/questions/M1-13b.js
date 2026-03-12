/**
 * M1-13b.js - Grimoire Guardians 問題データ
 * ユニット: M1-13b「かたちづくり」
 *
 * 対象: 小学1年生、平面図形の認識（さんかく・しかく・まる）
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: かたちの なまえ（プール5問 → 3問出題）
 *   Step2: なかまさがし（プール6問 → 4問出題）
 *   Step3: かたちを かぞえよう（プール5問 → 4問出題）
 *   Step4: 文章題・チャレンジ（プール4問 → 4問出題）
 *
 * 設計方針:
 *   - 全問 distractorPool 形式 + renderAs:'shape' で SVG 形を表示
 *   - ShapeFace.SHAPE_TEXT_MAP に登録されたテキストを選択肢として使用
 *   - 「さんかく」「しかく」「まる」の3種類が均等に登場するよう問題を設計
 *
 * @version 1.0
 * @date 2026-03-13
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かたちの なまえ（5問）
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
  // Step2: なかまさがし（6問）
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
  // Step3: かたちを かぞえよう（5問）
  // 数や組み合わせの問題
  // =====================================================

  {
    id: 'M1-13b-Q12',
    unitId: 'M1-13b',
    step: 3,
    type: 'choice',
    renderAs: 'shape',
    question: 'さんかく2まいを　あわせると　なに　かたちに　なる？',
    correctAnswer: 'しかく',
    distractorPool: [
      'まる',
      'さんかく',
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
  // Step4: 文章題・チャレンジ（4問）
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

];

// ─── stepConfig ──────────────────────────────────────────────────────────────
// シャッフル出題の設定: 各ステップから何問出題するかを定義する

export const stepConfig = [
  { step: 1, pick: 3 },   // Step1: かたちの なまえ（5問から3問）
  { step: 2, pick: 4 },   // Step2: なかまさがし（6問から4問）
  { step: 3, pick: 4 },   // Step3: かたちを かぞえよう（5問から4問）
  { step: 4, pick: 4 },   // Step4: 文章題・チャレンジ（4問から4問）
];

export default questions;
