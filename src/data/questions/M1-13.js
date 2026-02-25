/**
 * M1-13.js - Grimoire Guardians 問題データ
 * ユニット: M1-13「かたちあそび」
 *
 * 対象: 小学1年生、立体図形の認識（はこ・まる・つつのかたち）
 * 準拠: 日本文教出版 算数1年
 *
 * カテゴリ構成（合計15問）:
 *   A: かたちの なまえ（Q01〜Q03）  身近なものを3つの形に分類
 *   B: なかま さがし（Q04〜Q07）    同じ形のものをグループから選ぶ
 *   C: ころがる・ころがらない（Q08〜Q10）  特性で形を識別
 *   D: 面を数えよう（Q11〜Q13）     平らな面の数で形を識別
 *   E: 文章題・チャレンジ（Q14〜Q15）  複数条件から形を絞る
 *
 * 設計方針:
 *   - 全問 distractorPool 形式で出題（毎回異なる不正解が出題される）
 *   - 向き・見た目の変化で答えが変わる問題を除外
 *   - 「両方が正解になりうる」問題を除外
 *   - 画像拡張に対応（image / choiceImages は null → nanobanana で後から設定可能）
 *
 * @version 1.0
 * @date 2026-02-24
 */

/** @type {Array<import('../units.js').Question>} */
const questions = [

  // =====================================================
  // カテゴリA: かたちの なまえ
  // 身近なものが3種類の立体（はこ・まる・つつ）のどれか識別する
  // distractorPool = 残り2つの形の名前（毎回順番が変わる）
  // =====================================================

  {
    id: 'M1-13-Q01',
    unitId: 'M1-13',
    type: 'choice',
    question: 'さいころは　どの　かたち？',
    correctAnswer: 'はこの　かたち',
    distractorPool: [
      'まるの　かたち',
      'つつの　かたち',
    ],
    image: null,        // nanobanana で さいころの画像を設定できる
    choiceImages: null, // nanobanana で 各かたちのアイコンを設定できる
  },

  {
    id: 'M1-13-Q02',
    unitId: 'M1-13',
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

  // =====================================================
  // カテゴリB: なかま さがし
  // 「同じかたちのもの」を選ぶ。distractorPool に4つ以上あるので
  // 毎回ランダムに2つの不正解が選ばれ、消去法のパターンが変化する
  // =====================================================

  {
    id: 'M1-13-Q04',
    unitId: 'M1-13',
    type: 'choice',
    // ビー玉（まるのかたち）→ 同じかたちを選ぶ
    question: 'ビー玉と　おなじ　かたちの\nものは　どれ？',
    correctAnswer: 'テニスボール',
    distractorPool: [
      'つみき（四角い）',  // はこのかたち
      'ツナかん',          // つつのかたち
      'さいころ',          // はこのかたち
      'ストロー',          // つつのかたち
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q05',
    unitId: 'M1-13',
    type: 'choice',
    // 消しゴムの箱（はこのかたち）→ 同じかたちを選ぶ
    question: '消しゴムの　はこと　おなじ\nかたちの　ものは　どれ？',
    correctAnswer: 'クッキーの　はこ',
    distractorPool: [
      'ボール',              // まるのかたち
      'ストロー',            // つつのかたち
      'テニスボール',        // まるのかたち
      'トイレットペーパーの　しん',  // つつのかたち
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q06',
    unitId: 'M1-13',
    type: 'choice',
    // ストロー（つつのかたち）→ 同じかたちを選ぶ
    question: 'ストローと　おなじ　かたちの\nものは　どれ？',
    correctAnswer: 'ツナかん',
    distractorPool: [
      'さいころ',    // はこのかたち
      'ボール',      // まるのかたち
      'つみき',      // はこのかたち
      'ビー玉',      // まるのかたち
    ],
    image: null,
    choiceImages: null,
  },

  {
    id: 'M1-13-Q07',
    unitId: 'M1-13',
    type: 'choice',
    // 3つの中で仲間外れを選ぶ（正解: ビー玉＝まるのかたち、他ははこのかたち）
    // distractorPool = はこのかたちのもの（正解:ビー玉）
    question: 'つぎの　うち、はこのかたちで\nないものは　どれ？',
    correctAnswer: 'ビー玉',
    distractorPool: [
      'さいころ',          // はこのかたち（不正解として出る）
      '消しゴムの　はこ',  // はこのかたち
      'つみき',            // はこのかたち
      'クッキーの　はこ',  // はこのかたち
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // カテゴリC: ころがる・ころがらない
  // 「どこでもころがる＝まる」「ころがらない＝はこ」を明確に区別
  // 「つつはころがるが一方向のみ」という細かい区別は Q10 で扱う
  // =====================================================

  {
    id: 'M1-13-Q08',
    unitId: 'M1-13',
    type: 'choice',
    // はこのかたちだけが転がらない（まる・つつはどちらも転がる）
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
    type: 'choice',
    // 「たてにも よこにも」を明記してまるとつつを区別する
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
    type: 'choice',
    // 缶を横に寝かせた場合→一方向だけ転がる（つつの特性）
    // 「よこに ねかせて」で向きを明示し曖昧さをなくす
    question: 'ツナかんを　よこに　ねかせたら\nどうなるかな？',
    correctAnswer: '一方向だけ　ころがる',
    distractorPool: [
      'どこでも　ころがる',   // まるの特性（誤り）
      'ころがらない',          // はこの特性（誤り）
      'うごかない',            // 明らかな誤りだが低学年には有効
      'とびはねる',            // 明らかな誤り（易しい消去肢）
    ],
    image: null,
    choiceImages: null,
  },

  // =====================================================
  // カテゴリD: 面を数えよう
  // 数値が答えなので向き・解釈で変わらない。最も明確なカテゴリ
  // =====================================================

  {
    id: 'M1-13-Q11',
    unitId: 'M1-13',
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
    type: 'choice',
    // 「上と下のまるいところ」と明示して側面（曲面）との混同を防ぐ
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

  // =====================================================
  // カテゴリE: 文章題・チャレンジ
  // 複数の条件を AND で組み合わせて答えを一意に絞る
  // =====================================================

  {
    id: 'M1-13-Q14',
    unitId: 'M1-13',
    type: 'choice',
    // 3条件すべてに当てはまるのは「はこのかたち」だけ
    // ・ころがらない → はこ○ / まる× / つつ×
    // ・つみかさねられる → はこ○ / まる○ / つつ○（この1条件だけでは絞れない）
    // ・平らな面が6まい → はこ○ だけ
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
    type: 'choice',
    // 「はこ」と「つつ」の共通点を選ぶチャレンジ問題
    // ・つみあげられる → 両方○（正解）
    // ・ころがる → はこ× → 共通でない
    // ・まるい面がある → はこ× → 共通でない
    // ・どこでもころがる → つつ× → 共通でない
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

];

export default questions;
