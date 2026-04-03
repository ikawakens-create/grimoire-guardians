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

  'M1-06': {
    grade: 1,
    difficulty: 'normal',       // ひきざん → 絵で「取る」イメージを視覚化
    type: 'subtraction',
    dialogue: [
      { speaker: 'owl',    text: 'りんごが 5こ。2こ たべたら のこりは いくつ？' },
      { speaker: 'player', text: 'たべちゃうの！？ かぞえてみる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍎', count: 5, style: 'normal' },
        ],
        label: 'はじめに 5こ あるよ',
      },
      {
        content: [
          { emoji: '🍎', count: 3, style: 'normal' },
          { emoji: '🍎', count: 2, style: 'accent' },
        ],
        label: '2こ たべた → のこりは 3こ！',
      },
    ],
    microChallenge: {
      question: '7 - 3 = ？',
      choices: ['3', '4', '5'],
      correct: 1,
    },
  },

  'M1-11a': {
    grade: 1,
    difficulty: 'detailed',     // くりさがり橋渡し → さくらんぼ逆を4ステップで丁寧に
    type: 'kurisagari',
    dialogue: [
      { speaker: 'owl',    text: 'たしざんの さくらんぼ、ひきざんにも つかえるんだ！' },
      { speaker: 'player', text: 'え！ どういうこと？！' },
    ],
    steps: [
      {
        content: [
          { emoji: '💎', count: 11, style: 'normal' },
        ],
        label: '11こ あるよ',
      },
      {
        content: [
          { emoji: '💎', count: 10, style: 'ten' },
          { emoji: '💎', count: 1,  style: 'highlight' },
        ],
        label: '11を "10と 1"に わけよう！',
      },
      {
        content: [
          { emoji: '💎', count: 7,  style: 'ten' },
          { emoji: '💎', count: 3,  style: 'accent' },
        ],
        label: '10から 3を とると… 7のこる！',
      },
      {
        content: [
          { emoji: '💎', count: 7, style: 'highlight' },
          { emoji: '💎', count: 1, style: 'normal' },
        ],
        label: '7と 1を あわせて → 8！ これが くりさがり！',
      },
    ],
    microChallenge: {
      question: '11 - 3 = ？',
      choices: ['7', '8', '9'],
      correct: 1,
    },
  },

  'M1-11b': {
    grade: 1,
    difficulty: 'detailed',     // くりさがり11・12 → 12のさくらんぼ逆を4ステップで定着
    type: 'kurisagari',
    dialogue: [
      { speaker: 'owl',    text: 'さくらんぼざんで 12のせかいも いけるよ！' },
      { speaker: 'player', text: '12も できるの！？' },
    ],
    steps: [
      {
        content: [
          { emoji: '💎', count: 12, style: 'normal' },
        ],
        label: '12こ あるよ',
      },
      {
        content: [
          { emoji: '💎', count: 10, style: 'ten' },
          { emoji: '💎', count: 2,  style: 'highlight' },
        ],
        label: '12を "10と 2"に わけよう！',
      },
      {
        content: [
          { emoji: '💎', count: 5, style: 'ten' },
          { emoji: '💎', count: 5, style: 'accent' },
        ],
        label: '10から 5を とると… 5のこる！',
      },
      {
        content: [
          { emoji: '💎', count: 5, style: 'highlight' },
          { emoji: '💎', count: 2, style: 'normal' },
        ],
        label: '5と 2を あわせて → 7！',
      },
    ],
    microChallenge: {
      question: '12 - 5 = ？',
      choices: ['6', '7', '8'],
      correct: 1,
    },
  },

  'M1-08a': {
    grade: 1,
    difficulty: 'easy',         // なんじちょうど → 時計絵文字で「みじかいはり＝じ」を直感化
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: 'みじかいはりが さす かずが "じ"だよ！' },
      { speaker: 'player', text: 'みじかいはりを みればいいんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🕒', count: 1, style: 'normal' },
        ],
        label: 'みじかいはりが 3を さしてる → 3じ！',
      },
      {
        content: [
          { emoji: '🕔', count: 1, style: 'highlight' },
        ],
        label: 'みじかいはりが 4を さしてる → 4じ！',
      },
    ],
    microChallenge: {
      question: 'みじかいはりが 6を さしているよ。なんじ？',
      choices: ['5じ', '6じ', '7じ'],
      correct: 1,
    },
  },

  // ─────────────────────────────────────────
  // Grade 2
  // ─────────────────────────────────────────

  'M2-01': {
    grade: 2,
    difficulty: 'normal',       // 2けた筆算 → 🔵🟡ブロックでくらいの概念を視覚化
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: 'くらいを そろえると たしざんが かんたんになるよ！' },
      { speaker: 'player', text: 'くらいって なに？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 2, style: 'ten' },
          { emoji: '🟡', count: 3, style: 'normal' },
        ],
        label: '23は 10が 2つ と 1が 3つ',
      },
      {
        content: [
          { emoji: '🔵', count: 1, style: 'ten' },
          { emoji: '🟡', count: 4, style: 'highlight' },
        ],
        label: '14は 10が 1つ と 1が 4つ',
      },
      {
        content: [
          { emoji: '🔵', count: 3, style: 'ten' },
          { emoji: '🟡', count: 7, style: 'highlight' },
        ],
        label: 'くらいごとに たすと → 37！',
      },
    ],
    microChallenge: {
      question: '23 + 14 = ？',
      choices: ['36', '37', '38'],
      correct: 1,
    },
  },

  'M2-10a': {
    grade: 2,
    difficulty: 'normal',       // 九九2のだん → かけ算＝おなじ数のまとまりを体験
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '2×3は "2こが 3つぶん" ということだよ！' },
      { speaker: 'player', text: 'ぜんぶ かぞえなくても わかるの！？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍬', count: 2, style: 'normal' },
        ],
        label: '2こ はいった ふくろが 1つ → 2こ',
      },
      {
        content: [
          { emoji: '🍬', count: 2, style: 'normal' },
          { emoji: '🍬', count: 2, style: 'highlight' },
          { emoji: '🍬', count: 2, style: 'ten' },
        ],
        label: 'ふくろが 3つ → 2×3＝6こ！',
      },
    ],
    microChallenge: {
      question: '2 × 4 は いくつ？',
      choices: ['6', '7', '8'],
      correct: 2,
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
