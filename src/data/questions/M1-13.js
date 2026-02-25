/**
 * M1-13.js - Grimoire Guardians 問題データ
 * ユニット: M1-13「かたちあそび」
 *
 * 対象: 小学1年生、立体図形の認識（はこ・まる・つつのかたち）
 * 準拠: 日本文教出版 算数1年
 *
 * Step構成（シャッフル出題）
 *   Step1: かたちの なまえ（プール5問 → 3問出題）
 *   Step2: なかまさがし（プール6問 → 4問出題）
 *   Step3: ころがる・ころがらない（プール5問 → 3問出題）
 *   Step4: 面を数えよう（プール4問 → 3問出題）
 *   Step5: 文章題・チャレンジ（プール4問 → 2問出題）
 *
 * 設計方針:
 *   - 全問 distractorPool 形式で出題（毎回異なる不正解が出題される）
 *   - 向き・見た目の変化で答えが変わる問題を除外
 *   - 「両方が正解になりうる」問題を除外
 *   - 画像拡張に対応（image / choiceImages は null → nanobanana で後から設定可能）
 *
 * @version 2.0
 * @date 2026-02-25
 */

/** @type {Array} */
const questions = [

  // =====================================================
  // Step1: かたちの なまえ（5問）
  // 身近なものが3種類の立体（はこ・まる・つつ）のどれか識別する
  // =====================================================

  {
    id: 'M1-13-Q01',
    unitId: 'M1-13',
    step: 1,
    type: 'choice',
    question: 'さいころは　どの　かたち？',
    correctAnswer: 'はこの　かたち',
    distractorPool: [
      'まるの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q02',
    unitId: 'M1-13',
    step: 1,
    type: 'choice',
    question: 'テニスボールは　どの　かたち？',
    correctAnswer: 'まるの　かたち',
    distractorPool: [
      'はこの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q03',
    unitId: 'M1-13',
    step: 1,
    type: 'choice',
    question: 'ツナかん（空きかん）は　どの　かたち？',
    correctAnswer: 'つつの　かたち',
    distractorPool: [
      'はこの　かたち',
      'まるの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q16',
    unitId: 'M1-13',
    step: 1,
    type: 'choice',
    question: 'ぎゅうにゅうパックは　どの　かたち？',
    correctAnswer: 'はこの　かたち',
    distractorPool: [
      'まるの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q17',
    unitId: 'M1-13',
    step: 1,
    type: 'choice',
    question: 'トイレットペーパーのしんは　どの　かたち？',
    correctAnswer: 'つつの　かたち',
    distractorPool: [
      'はこの　かたち',
      'まるの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step2: なかまさがし（6問）
  // 「同じかたちのもの」を選ぶ
  // =====================================================

  {
    id: 'M1-13-Q04',
    unitId: 'M1-13',
    step: 2,
    type: 'choice',
    question: 'ビー玉と　おなじ　かたちの\nものは　どれ？',
    correctAnswer: 'テニスボール',
    distractorPool: [
      'つみき（四角い）',
      'ツナかん',
      'さいころ',
      'ストロー',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q05',
    unitId: 'M1-13',
    step: 2,
    type: 'choice',
    question: '消しゴムの　はこと　おなじ\nかたちの　ものは　どれ？',
    correctAnswer: 'クッキーの　はこ',
    distractorPool: [
      'ボール',
      'ストロー',
      'テニスボール',
      'トイレットペーパーの　しん',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q06',
    unitId: 'M1-13',
    step: 2,
    type: 'choice',
    question: 'ストローと　おなじ　かたちの\nものは　どれ？',
    correctAnswer: 'ツナかん',
    distractorPool: [
      'さいころ',
      'ボール',
      'つみき',
      'ビー玉',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q07',
    unitId: 'M1-13',
    step: 2,
    type: 'choice',
    question: 'つぎの　うち、はこのかたちで\nないものは　どれ？',
    correctAnswer: 'ビー玉',
    distractorPool: [
      'さいころ',
      '消しゴムの　はこ',
      'つみき',
      'クッキーの　はこ',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q18',
    unitId: 'M1-13',
    step: 2,
    type: 'choice',
    question: 'トイレットペーパーのしんと\nおなじかたちは　どれ？',
    correctAnswer: 'ストロー',
    distractorPool: [
      'さいころ',
      'ボール',
      'つみき',
      'ビー玉',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q19',
    unitId: 'M1-13',
    step: 2,
    type: 'choice',
    question: 'さいころと　おなじ\nかたちは　どれ？',
    correctAnswer: 'つみき',
    distractorPool: [
      'ボール',
      'ストロー',
      'ビー玉',
      'ツナかん',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step3: ころがる・ころがらない（5問）
  // =====================================================

  {
    id: 'M1-13-Q08',
    unitId: 'M1-13',
    step: 3,
    type: 'choice',
    question: 'ころがらない　かたちは　どれ？',
    correctAnswer: 'はこの　かたち',
    distractorPool: [
      'まるの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q09',
    unitId: 'M1-13',
    step: 3,
    type: 'choice',
    question: 'たてにも　よこにも、\nどこでも　ころがる　かたちは？',
    correctAnswer: 'まるの　かたち',
    distractorPool: [
      'はこの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q10',
    unitId: 'M1-13',
    step: 3,
    type: 'choice',
    question: 'ツナかんを　よこに　ねかせたら\nどうなるかな？',
    correctAnswer: '一方向だけ　ころがる',
    distractorPool: [
      'どこでも　ころがる',
      'ころがらない',
      'うごかない',
      'とびはねる',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q20',
    unitId: 'M1-13',
    step: 3,
    type: 'choice',
    question: 'さかみちに　おいたら\nころがるのは　どれ？',
    correctAnswer: 'まるの　かたち',
    distractorPool: [
      'はこの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q21',
    unitId: 'M1-13',
    step: 3,
    type: 'choice',
    question: 'はこのかたちを　さかみちに\nおいたら　どうなる？',
    correctAnswer: 'ころがらない',
    distractorPool: [
      'どこでも　ころがる',
      '一方向だけ　ころがる',
      'とびはねる',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step4: 面を数えよう（4問）
  // =====================================================

  {
    id: 'M1-13-Q11',
    unitId: 'M1-13',
    step: 4,
    type: 'choice',
    question: 'はこのかたちの　平らな面は\nぜんぶで　なんまい？\n（上・下・前・後ろ・左・右）',
    correctAnswer: '6まい',
    distractorPool: [
      '4まい',
      '5まい',
      '8まい',
      '3まい',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q12',
    unitId: 'M1-13',
    step: 4,
    type: 'choice',
    question: 'つつのかたちの　上と下の\nまるい面は　なんまい？',
    correctAnswer: '2まい',
    distractorPool: [
      '1まい',
      '3まい',
      '4まい',
      '0まい',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q13',
    unitId: 'M1-13',
    step: 4,
    type: 'choice',
    question: 'まるのかたち（ボール）に\n平らな面は　いくつ？',
    correctAnswer: '0（ない）',
    distractorPool: [
      '1まい',
      '2まい',
      '6まい',
      '3まい',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q22',
    unitId: 'M1-13',
    step: 4,
    type: 'choice',
    question: 'つつのかたちに　まるくない\nひらたい面は　なんまい？',
    correctAnswer: '0（ない）',
    distractorPool: [
      '1まい',
      '2まい',
      '4まい',
      '6まい',
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // Step5: 文章題・チャレンジ（4問）
  // 複数の条件を AND で組み合わせて答えを一意に絞る
  // =====================================================

  {
    id: 'M1-13-Q14',
    unitId: 'M1-13',
    step: 5,
    type: 'choice',
    question: 'つぎの　3つに　あてはまる\nかたちは　どれ？\n\n・ころがらない\n・つみかさねられる\n・平らな面が　6まい',
    correctAnswer: 'はこの　かたち',
    distractorPool: [
      'まるの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q15',
    unitId: 'M1-13',
    step: 5,
    type: 'choice',
    question: 'はこのかたちと　つつのかたちに\nりょうほう　あてはまるのは？',
    correctAnswer: 'つみあげられる',
    distractorPool: [
      'ころがる',
      'まるい面が　ある',
      'どこでも　ころがる',
      '平らな面が　ない',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q23',
    unitId: 'M1-13',
    step: 5,
    type: 'choice',
    question: 'まるくて、どこでもころがって、\nひらたい面がない　かたちは？',
    correctAnswer: 'まるの　かたち',
    distractorPool: [
      'はこの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q24',
    unitId: 'M1-13',
    step: 5,
    type: 'choice',
    question: 'よこにねかせると\nころがる　かたちを　えらぼう\n（2つあるよ）\n\nどちらが「どこでも」ころがる？',
    correctAnswer: 'まるの　かたち',
    distractorPool: [
      'はこの　かたち',
      'つつの　かたち',
    ],
    image: null,
    choiceImages: null,
  }
];

export const stepConfig = [
  { step: 1, pick: 3 },
  { step: 2, pick: 4 },
  { step: 3, pick: 3 },
  { step: 4, pick: 3 },
  { step: 5, pick: 2 }
];

export default questions;
