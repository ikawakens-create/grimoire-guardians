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

  'M1-02': {
    grade: 1,
    difficulty: 'easy',
    type: 'counting',
    dialogue: [
      { speaker: 'owl',    text: '6から 10までの かずを かぞえてみよう！' },
      { speaker: 'player', text: 'いち、に、さん… かぞえられるよ！' },
    ],
    steps: [
      {
        content: [{ emoji: '⭐', count: 8, style: 'normal' }],
        label: 'ほしは いくつ？ ひとつずつ かぞえよう',
      },
    ],
    microChallenge: {
      question: '🌟🌟🌟🌟🌟🌟🌟\nほしは いくつ？',
      choices: ['6', '7', '8'],
      correct: 1,
    },
  },

  'M1-03': {
    grade: 1,
    difficulty: 'easy',
    type: 'ordinal',
    dialogue: [
      { speaker: 'owl',    text: 'まえから なんばんめか かぞえてみよう！' },
      { speaker: 'player', text: 'いちばんめ、にばんめ… できるよ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🐱', count: 1, style: 'accent' },
          { emoji: '🐱', count: 1, style: 'highlight' },
          { emoji: '🐱', count: 3, style: 'normal' },
        ],
        label: 'まえから 2ばんめは どのこ？',
      },
    ],
    microChallenge: {
      question: '🐱🐱🐱🐱🐱\nうしろから 2ばんめは まえから なんばんめ？',
      choices: ['3ばんめ', '4ばんめ', '5ばんめ'],
      correct: 1,
    },
  },

  'M1-08b': {
    grade: 1,
    difficulty: 'easy',
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: 'ながいはりが 6を さすと "はん"だよ！' },
      { speaker: 'player', text: '6で はんぶんなんだね！' },
    ],
    steps: [
      {
        content: [{ emoji: '🕧', count: 1, style: 'normal' }],
        label: 'みじかいはり 12・ながいはり 6 → 12じはん！',
      },
      {
        content: [{ emoji: '🕞', count: 1, style: 'highlight' }],
        label: 'みじかいはり 3・ながいはり 6 → 3じはん！',
      },
    ],
    microChallenge: {
      question: 'ながいはりが 6を さしているよ。\nみじかいはりが 7を さしたら？',
      choices: ['6じはん', '7じはん', '8じはん'],
      correct: 1,
    },
  },

  'M1-08c': {
    grade: 1,
    difficulty: 'easy',
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: 'ながいはりは 5とびで すすむよ！' },
      { speaker: 'player', text: '5・10・15… かぞえられるかな？' },
    ],
    steps: [
      {
        content: [{ emoji: '🕐', count: 1, style: 'normal' }],
        label: 'ながいはりが 1を さす → 5ふん',
      },
      {
        content: [{ emoji: '🕒', count: 1, style: 'highlight' }],
        label: 'ながいはりが 3を さす → 15ふん',
      },
    ],
    microChallenge: {
      question: 'ながいはりが 2を さしているよ。なんぷん？',
      choices: ['5ふん', '10ふん', '15ふん'],
      correct: 1,
    },
  },

  'M1-13': {
    grade: 1,
    difficulty: 'easy',
    type: 'shapes_3d',
    dialogue: [
      { speaker: 'owl',    text: 'はこ・まる・つつ、3つの かたちを おぼえよう！' },
      { speaker: 'player', text: 'ぜんぶ みたことある！' },
    ],
    steps: [
      {
        content: [
          { emoji: '📦', count: 1, style: 'normal' },
          { emoji: '⚽', count: 1, style: 'highlight' },
          { emoji: '🥫', count: 1, style: 'ten' },
        ],
        label: 'はこ・まる・つつ どれだ？',
      },
    ],
    microChallenge: {
      question: 'ころころ ころがる かたちは どれ？',
      choices: ['はこ', 'まる', 'つつ'],
      correct: 1,
    },
  },

  'M1-13b': {
    grade: 1,
    difficulty: 'easy',
    type: 'shapes_2d',
    dialogue: [
      { speaker: 'owl',    text: 'さんかく・しかく・まる、へいめんの かたちだよ！' },
      { speaker: 'player', text: 'えを かくときに つかうね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔺', count: 1, style: 'normal' },
          { emoji: '🟥', count: 1, style: 'highlight' },
          { emoji: '⭕', count: 1, style: 'ten' },
        ],
        label: 'さんかく・しかく・まる だよ！',
      },
    ],
    microChallenge: {
      question: 'かどが 4つ ある かたちは どれ？',
      choices: ['さんかく', 'しかく', 'まる'],
      correct: 1,
    },
  },

  'M1-14b': {
    grade: 1,
    difficulty: 'easy',
    type: 'number_order',
    dialogue: [
      { speaker: 'owl',    text: 'かずの ならびを みると おおきさが わかるよ！' },
      { speaker: 'player', text: 'どっちが おおきいか わかるかな？' },
    ],
    steps: [
      {
        content: [{ emoji: '🔢', count: 1, style: 'normal' }],
        label: '20・30・40… 10ずつ おおきくなるよ！',
      },
    ],
    microChallenge: {
      question: '23と 32、おおきいのは どっち？',
      choices: ['23', '32', 'おなじ'],
      correct: 1,
    },
  },

  'M1-16a': {
    grade: 1,
    difficulty: 'easy',
    type: 'word_problem',
    dialogue: [
      { speaker: 'owl',    text: 'もんだいを えに かくと こたえが みえてくるよ！' },
      { speaker: 'player', text: 'え！ えを かくといいの？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🐦', count: 5, style: 'normal' },
          { emoji: '🐦', count: 3, style: 'highlight' },
        ],
        label: 'とりが 5わ、3わ きた → あわせて？',
      },
    ],
    microChallenge: {
      question: 'こうえんに こどもが 4にん。\n3にん きたら ぜんぶで なんにん？',
      choices: ['6にん', '7にん', '8にん'],
      correct: 1,
    },
  },

  'M1-04': {
    grade: 1,
    difficulty: 'normal',
    type: 'complements',
    dialogue: [
      { speaker: 'owl',    text: '7は "5と 2"に わけられるよ！ほかにも いっぱいある！' },
      { speaker: 'player', text: 'ぜんぶで 7に なれば いいの？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🟣', count: 5, style: 'normal' },
          { emoji: '🟣', count: 2, style: 'highlight' },
        ],
        label: '7は 5と 2',
      },
      {
        content: [
          { emoji: '🟣', count: 4, style: 'ten' },
          { emoji: '🟣', count: 3, style: 'highlight' },
        ],
        label: '7は 4と 3も あるよ！',
      },
    ],
    microChallenge: {
      question: '7は 6と □。□は いくつ？',
      choices: ['1', '2', '3'],
      correct: 0,
    },
  },

  'M1-05': {
    grade: 1,
    difficulty: 'normal',
    type: 'addition',
    dialogue: [
      { speaker: 'owl',    text: 'たしざんは ふやすこと！いっしょに かぞえよう！' },
      { speaker: 'player', text: 'ふえたら たしざん！' },
    ],
    steps: [
      {
        content: [{ emoji: '🍡', count: 3, style: 'normal' }],
        label: 'はじめに 3こ あるよ',
      },
      {
        content: [
          { emoji: '🍡', count: 3, style: 'normal' },
          { emoji: '🍡', count: 4, style: 'highlight' },
        ],
        label: '4こ ふえた → ぜんぶで 7こ！',
      },
    ],
    microChallenge: {
      question: '4 + 3 = ？',
      choices: ['6', '7', '8'],
      correct: 1,
    },
  },

  'M1-05b': {
    grade: 1,
    difficulty: 'normal',
    type: 'addition_applied',
    dialogue: [
      { speaker: 'owl',    text: 'こんどは □を もとめてみよう！' },
      { speaker: 'player', text: '□って どうやって もとめるの？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍡', count: 3, style: 'normal' },
          { emoji: '❓', count: 1, style: 'highlight' },
        ],
        label: '3 + □ = 7。□は いくつ？',
      },
      {
        content: [
          { emoji: '🍡', count: 3, style: 'normal' },
          { emoji: '🍡', count: 4, style: 'highlight' },
        ],
        label: '7から 3を とると → □は 4！',
      },
    ],
    microChallenge: {
      question: '5 + □ = 9。□は いくつ？',
      choices: ['3', '4', '5'],
      correct: 1,
    },
  },

  'M1-06b': {
    grade: 1,
    difficulty: 'normal',
    type: 'subtraction_applied',
    dialogue: [
      { speaker: 'owl',    text: 'こんどは ひきざんで □を もとめよう！' },
      { speaker: 'player', text: 'むずかしそう…でも やってみる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍓', count: 5, style: 'normal' },
          { emoji: '🍓', count: 3, style: 'accent' },
        ],
        label: '8 - □ = 5。なんこ とった？',
      },
      {
        content: [
          { emoji: '🍓', count: 5, style: 'normal' },
          { emoji: '🍓', count: 3, style: 'highlight' },
        ],
        label: '8から 5を のこすと → □は 3！',
      },
    ],
    microChallenge: {
      question: '9 - □ = 6。□は いくつ？',
      choices: ['2', '3', '4'],
      correct: 1,
    },
  },

  'M1-10d': {
    grade: 1,
    difficulty: 'normal',
    type: 'kuriagari',
    dialogue: [
      { speaker: 'owl',    text: 'さくらんぼざんを つかって いろんな くりあがりを とこう！' },
      { speaker: 'player', text: 'もう なれてきたよ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '⭐', count: 7, style: 'normal' },
          { emoji: '⭐', count: 5, style: 'highlight' },
        ],
        label: '7 + 5。さくらんぼざんで といてみよう',
      },
      {
        content: [
          { emoji: '⭐', count: 10, style: 'ten' },
          { emoji: '⭐', count: 2,  style: 'highlight' },
        ],
        label: '5を "3と 2"に わけて 10＋2 → 12！',
      },
    ],
    microChallenge: {
      question: '8 + 5 = ？',
      choices: ['12', '13', '14'],
      correct: 1,
    },
  },

  'M1-11d': {
    grade: 1,
    difficulty: 'normal',
    type: 'kurisagari',
    dialogue: [
      { speaker: 'owl',    text: 'さくらんぼざんで いろんな くりさがりを とこう！' },
      { speaker: 'player', text: 'さくらんぼざん、つかいこなすぞ！' },
    ],
    steps: [
      {
        content: [{ emoji: '💎', count: 13, style: 'normal' }],
        label: '13 - 7。さくらんぼざんで といてみよう',
      },
      {
        content: [
          { emoji: '💎', count: 6, style: 'highlight' },
          { emoji: '💎', count: 3, style: 'normal' },
        ],
        label: '13を "10と 3"に → 10から 7で 3 → 3＋3＝6！',
      },
    ],
    microChallenge: {
      question: '14 - 6 = ？',
      choices: ['7', '8', '9'],
      correct: 1,
    },
  },

  'M1-12a': {
    grade: 1,
    difficulty: 'normal',
    type: 'three_addition',
    dialogue: [
      { speaker: 'owl',    text: '3つの かずも ひだりから じゅんばんに たせるよ！' },
      { speaker: 'player', text: 'ひとつずつ たしていけばいいの？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍬', count: 2, style: 'normal' },
          { emoji: '🍬', count: 3, style: 'highlight' },
        ],
        label: 'まず 2＋3＝5',
      },
      {
        content: [
          { emoji: '🍬', count: 5, style: 'ten' },
          { emoji: '🍬', count: 4, style: 'highlight' },
        ],
        label: 'つぎに 5＋4＝9！',
      },
    ],
    microChallenge: {
      question: '1 + 2 + 4 = ？',
      choices: ['6', '7', '8'],
      correct: 1,
    },
  },

  'M1-12b': {
    grade: 1,
    difficulty: 'normal',
    type: 'three_subtraction',
    dialogue: [
      { speaker: 'owl',    text: 'ひきざんも 3つ あるよ。ひだりから じゅんばんに ひこう！' },
      { speaker: 'player', text: 'ひとつずつ ひけばいいんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍎', count: 7, style: 'normal' },
          { emoji: '🍎', count: 2, style: 'accent' },
        ],
        label: 'まず 7－2＝5',
      },
      {
        content: [
          { emoji: '🍎', count: 5, style: 'ten' },
          { emoji: '🍎', count: 3, style: 'accent' },
        ],
        label: 'つぎに 5－3＝2！',
      },
    ],
    microChallenge: {
      question: '9 - 3 - 2 = ？',
      choices: ['3', '4', '5'],
      correct: 1,
    },
  },

  'M1-12c': {
    grade: 1,
    difficulty: 'normal',
    type: 'mixed',
    dialogue: [
      { speaker: 'owl',    text: 'たしざんか ひきざんか、しきを よんで かんがえよう！' },
      { speaker: 'player', text: '+か -か ちゃんと みるんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '⭐', count: 5, style: 'normal' },
          { emoji: '⭐', count: 3, style: 'highlight' },
        ],
        label: '5 + 3 → たしざん → 8',
      },
      {
        content: [
          { emoji: '⭐', count: 8, style: 'normal' },
          { emoji: '⭐', count: 2, style: 'accent' },
        ],
        label: '8 - 2 → ひきざん → 6',
      },
    ],
    microChallenge: {
      question: '6 + 2 - 4 = ？',
      choices: ['3', '4', '5'],
      correct: 1,
    },
  },

  'M1-14a': {
    grade: 1,
    difficulty: 'normal',
    type: 'large_numbers',
    dialogue: [
      { speaker: 'owl',    text: '100までの かずは 10のまとまりで かんがえよう！' },
      { speaker: 'player', text: 'さっきより おおきい かずだ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 5, style: 'ten' },
          { emoji: '🟡', count: 3, style: 'normal' },
        ],
        label: '10が 5つ と 1が 3つ → 53！',
      },
      {
        content: [{ emoji: '🔵', count: 10, style: 'ten' }],
        label: '10が 10こ → 100！',
      },
    ],
    microChallenge: {
      question: '10が 7つ と 1が 2つ で いくつ？',
      choices: ['62', '72', '82'],
      correct: 1,
    },
  },

  'M1-14c': {
    grade: 1,
    difficulty: 'normal',
    type: 'large_addition',
    dialogue: [
      { speaker: 'owl',    text: 'おおきい かずも くらいごとに たせるよ！' },
      { speaker: 'player', text: '10のくらいと 1のくらいに わけるんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 3, style: 'ten' },
          { emoji: '🟡', count: 4, style: 'normal' },
          { emoji: '🔵', count: 2, style: 'ten' },
          { emoji: '🟡', count: 5, style: 'highlight' },
        ],
        label: '34 と 25',
      },
      {
        content: [
          { emoji: '🔵', count: 5, style: 'ten' },
          { emoji: '🟡', count: 9, style: 'highlight' },
        ],
        label: 'くらいごとに たすと → 59！',
      },
    ],
    microChallenge: {
      question: '32 + 25 = ？',
      choices: ['56', '57', '58'],
      correct: 1,
    },
  },

  'M1-14d': {
    grade: 1,
    difficulty: 'normal',
    type: 'large_subtraction',
    dialogue: [
      { speaker: 'owl',    text: 'おおきい かずの ひきざんも くらいごとに ひこう！' },
      { speaker: 'player', text: 'くらいを みながら ひくんだ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 5, style: 'ten' },
          { emoji: '🟡', count: 7, style: 'normal' },
        ],
        label: '57から ひくよ',
      },
      {
        content: [
          { emoji: '🔵', count: 3, style: 'ten' },
          { emoji: '🟡', count: 4, style: 'highlight' },
        ],
        label: '57 - 23 → くらいごとに ひくと → 34！',
      },
    ],
    microChallenge: {
      question: '68 - 35 = ？',
      choices: ['32', '33', '34'],
      correct: 1,
    },
  },

  'M1-15a': {
    grade: 1,
    difficulty: 'normal',
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: 'ながいはりが さす かずを 5とびで よもう！' },
      { speaker: 'player', text: '5・10・15…かぞえていけばいいの！' },
    ],
    steps: [
      {
        content: [{ emoji: '🕑', count: 1, style: 'normal' }],
        label: 'みじかいはり 2・ながいはり 12 → 2じ ちょうど',
      },
      {
        content: [{ emoji: '🕝', count: 1, style: 'highlight' }],
        label: 'みじかいはり 2・ながいはり 6 → 2じ 30ぷん！',
      },
    ],
    microChallenge: {
      question: 'みじかいはりが 4、ながいはりが 3を さしているよ。なんじなんぷん？',
      choices: ['4じ 10ぷん', '4じ 15ぷん', '4じ 20ぷん'],
      correct: 1,
    },
  },

  'M1-15b': {
    grade: 1,
    difficulty: 'normal',
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: '30ぷん より おおきい ふんも 5とびで よめるよ！' },
      { speaker: 'player', text: '35・40・45…だんだん わかってきた！' },
    ],
    steps: [
      {
        content: [{ emoji: '🕟', count: 1, style: 'normal' }],
        label: 'ながいはりが 8 → 40ぷん！',
      },
      {
        content: [{ emoji: '🕠', count: 1, style: 'highlight' }],
        label: 'ながいはりが 9 → 45ぷん！',
      },
    ],
    microChallenge: {
      question: 'ながいはりが 11を さしているよ。なんぷん？',
      choices: ['50ぷん', '55ぷん', '60ぷん'],
      correct: 1,
    },
  },

  'M1-16b': {
    grade: 1,
    difficulty: 'normal',
    type: 'word_problem',
    dialogue: [
      { speaker: 'owl',    text: 'ちがいを もとめるときも えに かいてみよう！' },
      { speaker: 'player', text: 'どっちが おおいか えで わかるね！' },
    ],
    steps: [
      {
        content: [{ emoji: '🐰', count: 7, style: 'normal' }],
        label: 'うさぎが 7わ いるよ',
      },
      {
        content: [
          { emoji: '🐰', count: 4, style: 'normal' },
          { emoji: '🐰', count: 3, style: 'accent' },
        ],
        label: '3わ いなくなった → のこりは 4わ！',
      },
    ],
    microChallenge: {
      question: 'あめが 8こ あります。\n3こ たべたら のこりは なんこ？',
      choices: ['4こ', '5こ', '6こ'],
      correct: 1,
    },
  },

  'M1-09': {
    grade: 1,
    difficulty: 'detailed',
    type: 'kuriagari',
    dialogue: [
      { speaker: 'owl',    text: '9+3を かんたんに とく ひみつを おしえるよ！' },
      { speaker: 'player', text: '9+3って むずかしそう…' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍬', count: 9, style: 'normal' },
          { emoji: '🍬', count: 3, style: 'highlight' },
        ],
        label: '9と 3が ある',
      },
      {
        content: [
          { emoji: '🍬', count: 9, style: 'normal' },
          { emoji: '🍬', count: 1, style: 'accent' },
          { emoji: '🍬', count: 2, style: 'highlight' },
        ],
        label: '3を "1と 2"に わける！',
      },
      {
        content: [
          { emoji: '🍬', count: 10, style: 'ten' },
          { emoji: '🍬', count: 2,  style: 'highlight' },
        ],
        label: '9＋1で 10！のこり 2',
      },
      {
        content: [
          { emoji: '🍬', count: 10, style: 'ten' },
          { emoji: '🍬', count: 2,  style: 'highlight' },
        ],
        label: '10＋2＝12！これが さくらんぼざん！',
      },
    ],
    microChallenge: {
      question: '9 + 4 = ？',
      choices: ['12', '13', '14'],
      correct: 1,
    },
  },

  'M1-10a': {
    grade: 1,
    difficulty: 'detailed',
    type: 'kuriagari',
    dialogue: [
      { speaker: 'owl',    text: '9のせかいの くりあがりを さくらんぼざんで といてみよう！' },
      { speaker: 'player', text: '9って あと 1で 10に なるんだよね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '⭐', count: 9, style: 'normal' },
          { emoji: '⭐', count: 4, style: 'highlight' },
        ],
        label: '9 ＋ 4。9は あと 1で 10！',
      },
      {
        content: [
          { emoji: '⭐', count: 9, style: 'normal' },
          { emoji: '⭐', count: 1, style: 'accent' },
          { emoji: '⭐', count: 3, style: 'highlight' },
        ],
        label: '4を "1と 3"に わける！',
      },
      {
        content: [
          { emoji: '⭐', count: 10, style: 'ten' },
          { emoji: '⭐', count: 3,  style: 'highlight' },
        ],
        label: '9＋1で 10！',
      },
      {
        content: [
          { emoji: '⭐', count: 10, style: 'ten' },
          { emoji: '⭐', count: 3,  style: 'highlight' },
        ],
        label: '10＋3＝13！',
      },
    ],
    microChallenge: {
      question: '9 + 5 = ？',
      choices: ['13', '14', '15'],
      correct: 1,
    },
  },

  'M1-10b': {
    grade: 1,
    difficulty: 'detailed',
    type: 'kuriagari',
    dialogue: [
      { speaker: 'owl',    text: '8のせかいは あと 2で 10！さくらんぼざんで といてみよう！' },
      { speaker: 'player', text: '8は あと 2だから… わかった！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🌟', count: 8, style: 'normal' },
          { emoji: '🌟', count: 5, style: 'highlight' },
        ],
        label: '8 ＋ 5。8は あと 2で 10！',
      },
      {
        content: [
          { emoji: '🌟', count: 8, style: 'normal' },
          { emoji: '🌟', count: 2, style: 'accent' },
          { emoji: '🌟', count: 3, style: 'highlight' },
        ],
        label: '5を "2と 3"に わける！',
      },
      {
        content: [
          { emoji: '🌟', count: 10, style: 'ten' },
          { emoji: '🌟', count: 3,  style: 'highlight' },
        ],
        label: '8＋2で 10！',
      },
      {
        content: [
          { emoji: '🌟', count: 10, style: 'ten' },
          { emoji: '🌟', count: 3,  style: 'highlight' },
        ],
        label: '10＋3＝13！',
      },
    ],
    microChallenge: {
      question: '8 + 6 = ？',
      choices: ['13', '14', '15'],
      correct: 1,
    },
  },

  'M1-10c': {
    grade: 1,
    difficulty: 'detailed',
    type: 'kuriagari',
    dialogue: [
      { speaker: 'owl',    text: '7と 6のせかいも おなじように といてみよう！' },
      { speaker: 'player', text: 'もう なれてきた！どんな かずも とけるぞ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔮', count: 7, style: 'normal' },
          { emoji: '🔮', count: 6, style: 'highlight' },
        ],
        label: '7 ＋ 6。7は あと 3で 10！',
      },
      {
        content: [
          { emoji: '🔮', count: 7, style: 'normal' },
          { emoji: '🔮', count: 3, style: 'accent' },
          { emoji: '🔮', count: 3, style: 'highlight' },
        ],
        label: '6を "3と 3"に わける！',
      },
      {
        content: [
          { emoji: '🔮', count: 10, style: 'ten' },
          { emoji: '🔮', count: 3,  style: 'highlight' },
        ],
        label: '7＋3で 10！',
      },
      {
        content: [
          { emoji: '🔮', count: 10, style: 'ten' },
          { emoji: '🔮', count: 3,  style: 'highlight' },
        ],
        label: '10＋3＝13！',
      },
    ],
    microChallenge: {
      question: '7 + 7 = ？',
      choices: ['13', '14', '15'],
      correct: 1,
    },
  },

  'M1-11c': {
    grade: 1,
    difficulty: 'detailed',
    type: 'kurisagari',
    dialogue: [
      { speaker: 'owl',    text: '13から 18の くりさがりも さくらんぼざんで といてみよう！' },
      { speaker: 'player', text: 'おおきい かずも さくらんぼざんで いけるの！？' },
    ],
    steps: [
      {
        content: [{ emoji: '💫', count: 15, style: 'normal' }],
        label: '15 - 8。まず 15を わけよう',
      },
      {
        content: [
          { emoji: '💫', count: 10, style: 'ten' },
          { emoji: '💫', count: 5,  style: 'highlight' },
        ],
        label: '15を "10と 5"に わける！',
      },
      {
        content: [
          { emoji: '💫', count: 2, style: 'ten' },
          { emoji: '💫', count: 8, style: 'accent' },
        ],
        label: '10から 8を とると… 2のこる！',
      },
      {
        content: [
          { emoji: '💫', count: 2, style: 'highlight' },
          { emoji: '💫', count: 5, style: 'normal' },
        ],
        label: '2と 5を あわせて → 7！',
      },
    ],
    microChallenge: {
      question: '16 - 7 = ？',
      choices: ['8', '9', '10'],
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
