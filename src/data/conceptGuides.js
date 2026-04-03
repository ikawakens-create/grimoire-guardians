/**
 * conceptGuides.js - Grimoire Guardians
 * ConceptVisualizer 用ユニット別ガイド定義
 *
 * 構造:
 *   difficulty     - 説明の丁寧さ 'easy' | 'normal' | 'detailed'
 *                    easy:     対話のみ or steps 1〜2個（さっと説明）
 *                    normal:   steps 2〜3個 + マイクロ体験
 *                    detailed: steps 4〜5個 + マイクロ体験（くりあがり・掛け算など）
 *   dialogue       - フクロウ先生とプレイヤーの対話ステップ
 *   steps          - ビジュアルアニメーション定義（各ステップは自己完結）
 *                    content: [{ emoji, count, style }]
 *                    style: 'normal' | 'highlight' | 'ten' | 'accent'
 *   microChallenge - マイクロ体験問題（null の場合はスキップ）
 *
 * 漢字制限:
 *   grade: 1 → 全てひらがな・カタカナのみ
 *   grade: 2 → 1年生配当漢字まで
 *
 * 新教科・新学年の追加方法:
 *   このファイルにエントリを追記するだけ。worlds.js は触らなくてよい。
 *
 * Ph5（Grade1 全33件）・Ph6（Grade2 全42件）で順次追加予定
 *
 * @version 1.1
 * @date 2026-04-03
 */

export const CONCEPT_GUIDES = {

  // ─────────────────────────────────────────
  // Grade 1
  // ─────────────────────────────────────────

  'M1-01': {
    grade: 1,
    difficulty: 'easy',       // かずかぞえ → さっと説明でOK
    type: 'counting',
    dialogue: [
      { speaker: 'owl',    text: 'えを みながら かずを かぞえてみよう！' },
      { speaker: 'player', text: 'やってみる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍎', count: 3, style: 'normal' },
          { emoji: '🍊', count: 2, style: 'highlight' },
        ],
        label: 'くだものは ぜんぶで いくつ？',
      },
      {
        content: [
          { emoji: '🍎', count: 3, style: 'normal' },
          { emoji: '🍊', count: 2, style: 'highlight' },
        ],
        label: '🍎3こ と 🍊2こ → ぜんぶで 5こ！',
      },
    ],
    microChallenge: {
      question: 'りんごは いくつ？\n🍎🍎🍎',
      choices: ['2', '3', '4'],
      correct: 1,
    },
  },

  'M1-07': {
    grade: 1,
    difficulty: 'normal',     // 20までのかず → 10のまとまりを視覚化
    type: 'large_numbers',
    dialogue: [
      { speaker: 'owl',    text: '10より おおきい かずも かぞえてみよう！\n10の まとまりが ポイントだよ！' },
      { speaker: 'player', text: 'なるほど！ やってみる！' },
    ],
    steps: [
      {
        content: [{ emoji: '⭐', count: 10, style: 'ten' }],
        label: '10の まとまりが 1つ → 10！',
      },
      {
        content: [
          { emoji: '⭐', count: 10, style: 'ten' },
          { emoji: '⭐', count: 7,  style: 'highlight' },
        ],
        label: '10と 7で → 17！',
      },
    ],
    microChallenge: {
      question: '10と 7で いくつ？',
      choices: ['16', '17', '18'],
      correct: 1,
    },
  },

  // ─────────────────────────────────────────
  // 難易度ガイド（データ作成時の参考）
  //
  // easy:
  //   対話のみ、または steps 1〜2個
  //   対象: かず・なかまづくり・じゅんばん など
  //
  // normal:
  //   steps 2〜3個 + マイクロ体験
  //   対象: たしざん・ひきざん・時計・長さ など
  //
  // detailed:
  //   steps 4〜5個 + マイクロ体験（丁寧な段階説明）
  //   対象: くりあがり・くりさがり・掛け算・ひっさん・分数 など
  //   Ph4B以降で順次実装予定
  // ─────────────────────────────────────────

};
