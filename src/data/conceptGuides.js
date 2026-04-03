/**
 * conceptGuides.js - Grimoire Guardians
 * ConceptVisualizer 用ユニット別ガイド定義
 *
 * 構造:
 *   dialogue      - フクロウ先生とプレイヤーの対話ステップ
 *   steps         - ビジュアルアニメーション定義（Ph4で実装）
 *   microChallenge - マイクロ体験問題（null の場合はスキップ）
 *
 * 漢字制限:
 *   grade: 1 → 全てひらがな・カタカナのみ
 *   grade: 2 → 1年生配当漢字まで
 *
 * Ph5（Grade1 全33件）・Ph6（Grade2 全42件）で順次追加予定
 *
 * @version 1.0
 * @date 2026-04-03
 */

export const CONCEPT_GUIDES = {

  // ─────────────────────────────────────────
  // Grade 1
  // ─────────────────────────────────────────

  'M1-01': {
    grade: 1,
    type: 'counting',
    dialogue: [
      { speaker: 'owl',    text: 'えを みながら かずを かぞえてみよう！' },
      { speaker: 'player', text: 'やってみる！' },
    ],
    steps: [],  // Ph4Aで実装
    microChallenge: {
      question: 'りんごは いくつ？\n🍎🍎🍎',
      choices: ['2', '3', '4'],
      correct: 1,
    },
  },

  'M1-07': {
    grade: 1,
    type: 'addition_carry',
    dialogue: [
      { speaker: 'owl',    text: '10を こえる たしざんに ちょうせん！\n10の かたまりを つくると かんたんだよ！' },
      { speaker: 'player', text: 'なるほど！ やってみる！' },
    ],
    steps: [],  // Ph4Aで実装
    microChallenge: {
      question: '8 ＋ 5 は？',
      choices: ['12', '13', '14'],
      correct: 1,
    },
  },

};
