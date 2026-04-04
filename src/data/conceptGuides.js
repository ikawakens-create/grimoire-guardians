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

  // ─────────────────────────────────────────
  // Grade 2 — Zone 1: 2けた筆算
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

  'M2-02': {
    grade: 2,
    difficulty: 'normal',       // くりあがりたしざん → 🟡が10こで🔵に変換する視覚化
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: 'いちのくらいが 10こに なったら 十のくらいに くりあがるよ！' },
      { speaker: 'player', text: 'くりあがるって どういうこと？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 1, style: 'ten' },
          { emoji: '🟡', count: 7, style: 'normal' },
        ],
        label: '17は 十が 1つ と 一が 7つ',
      },
      {
        content: [
          { emoji: '🔵', count: 1, style: 'ten' },
          { emoji: '🟡', count: 7, style: 'normal' },
          { emoji: '🟡', count: 5, style: 'highlight' },
        ],
        label: '5を たすと 一のくらいが 12こ！',
      },
      {
        content: [
          { emoji: '🔵', count: 2, style: 'ten' },
          { emoji: '🟡', count: 2, style: 'highlight' },
        ],
        label: '12こ → 十に 1つ くりあがって → 22！',
      },
    ],
    microChallenge: {
      question: '17 + 5 = ？',
      choices: ['21', '22', '23'],
      correct: 1,
    },
  },

  'M2-02b': {
    grade: 2,
    difficulty: 'normal',       // 2けた+2けたのたしざん → くらいごとに積み上げる
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: '2けたと 2けたを たすときは くらいを そろえて かんがえよう！' },
      { speaker: 'player', text: 'くらいを そろえると らくになるの？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 2, style: 'ten' },
          { emoji: '🟡', count: 4, style: 'normal' },
        ],
        label: '24 = 十が 2つ と 一が 4つ',
      },
      {
        content: [
          { emoji: '🔵', count: 1, style: 'highlight' },
          { emoji: '🟡', count: 3, style: 'highlight' },
        ],
        label: 'たすのは 13 = 十が 1つ と 一が 3つ',
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
      question: '24 + 13 = ？',
      choices: ['36', '37', '38'],
      correct: 1,
    },
  },

  'M2-03': {
    grade: 2,
    difficulty: 'normal',       // くりさがりなし2けたひきざん → 🟩(残る)🔴(消える)で取り除く視覚化
    type: 'vertical_subtraction',
    dialogue: [
      { speaker: 'owl',    text: 'くらいごとに ひくと すっきり わかるよ！' },
      { speaker: 'player', text: 'くらいごとに ひくんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🟩', count: 3, style: 'ten' },
          { emoji: '🟩', count: 6, style: 'normal' },
        ],
        label: '36 = 十が 3つ と 一が 6つ',
      },
      {
        content: [
          { emoji: '🟩', count: 3, style: 'ten' },
          { emoji: '🟩', count: 4, style: 'normal' },
          { emoji: '🟩', count: 2, style: 'accent' },
        ],
        label: '一のくらいから 2 を ひく → 4のこる',
      },
      {
        content: [
          { emoji: '🟩', count: 2, style: 'normal' },
          { emoji: '🟩', count: 1, style: 'accent' },
          { emoji: '🟩', count: 4, style: 'normal' },
        ],
        label: '十のくらいから 1 を ひく → 24！',
      },
    ],
    microChallenge: {
      question: '36 - 12 = ？',
      choices: ['22', '24', '26'],
      correct: 1,
    },
  },

  'M2-03b': {
    grade: 2,
    difficulty: 'normal',       // くりさがりひきざん → 十の位から「かりる」流れを色変化で表現
    type: 'vertical_subtraction',
    dialogue: [
      { speaker: 'owl',    text: '一のくらいが たりないときは 十のくらいから かりてくるよ！' },
      { speaker: 'player', text: 'かりてくるの！？ おもしろい！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🟩', count: 3, style: 'ten' },
          { emoji: '🟩', count: 2, style: 'normal' },
        ],
        label: '32 = 十が 3つ と 一が 2つ',
      },
      {
        content: [
          { emoji: '🟩', count: 2, style: 'ten' },
          { emoji: '🟠', count: 1, style: 'highlight' },
          { emoji: '🟩', count: 12, style: 'normal' },
        ],
        label: '一のくらいに 十から 1つ かりる → 12こに！',
      },
      {
        content: [
          { emoji: '🟩', count: 2, style: 'ten' },
          { emoji: '🟩', count: 5, style: 'normal' },
          { emoji: '🟩', count: 7, style: 'accent' },
        ],
        label: '12 - 7 = 5 → のこりは 25！',
      },
    ],
    microChallenge: {
      question: '32 - 7 = ？',
      choices: ['24', '25', '26'],
      correct: 1,
    },
  },

  'M2-04': {
    grade: 2,
    difficulty: 'normal',       // たし算・ひき算おうよう → どちらのしきかを見きわめる
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: 'たすのか ひくのか もんだいをよく よんで かんがえよう！' },
      { speaker: 'player', text: 'どっちか まちがえそう… よく よむね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 4, style: 'ten' },
          { emoji: '🟡', count: 5, style: 'normal' },
        ],
        label: 'はじめに 45こ ある',
      },
      {
        content: [
          { emoji: '🔵', count: 4, style: 'ten' },
          { emoji: '🟡', count: 5, style: 'normal' },
          { emoji: '🟡', count: 3, style: 'highlight' },
        ],
        label: '3こ ふえた → たすのか ひくのか？',
      },
      {
        content: [
          { emoji: '🔵', count: 4, style: 'ten' },
          { emoji: '🟡', count: 8, style: 'highlight' },
        ],
        label: 'ふえた → たしざん！ 45 + 3 = 48！',
      },
    ],
    microChallenge: {
      question: '45 + 3 = ？',
      choices: ['42', '47', '48'],
      correct: 2,
    },
  },

  'M2-04b': {
    grade: 2,
    difficulty: 'easy',         // Zone 1 ミニまとめ → 応援メッセージ
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: 'たしざんも ひきざんも くらいを そろえれば だいじょうぶ！' },
      { speaker: 'player', text: 'うん！ やってみる！' },
    ],
    steps: [],
    microChallenge: null,
  },

  // ─────────────────────────────────────────
  // Grade 2 — Zone 2: 数・量・じこく
  // ─────────────────────────────────────────

  'M2-05': {
    grade: 2,
    difficulty: 'normal',       // ながさ → ブロック変換パターンで 10mm=1cm を視覚化
    type: 'measurement',
    dialogue: [
      { speaker: 'owl',    text: '1cmは 10mmが あつまった ながさだよ！' },
      { speaker: 'player', text: '10こ あつまると 1cmに なるんだ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🟦', count: 10, style: 'normal' },
        ],
        label: '10mm が あつまると…',
      },
      {
        content: [
          { emoji: '🟩', count: 1, style: 'highlight' },
        ],
        label: '1cm に なる！',
      },
      {
        content: [
          { emoji: '🟩', count: 3, style: 'normal' },
          { emoji: '🟦', count: 5, style: 'highlight' },
        ],
        label: '3cm 5mm = 35mm だよ！',
      },
    ],
    microChallenge: {
      question: '2cm 3mm は なんmm？',
      choices: ['20mm', '23mm', '32mm'],
      correct: 1,
    },
  },

  'M2-06a': {
    grade: 2,
    difficulty: 'normal',       // 大きい数①（100まで）→ 🔴(百)🔵(十)🟡(一) 3色ブロック
    type: 'large_numbers',
    dialogue: [
      { speaker: 'owl',    text: '100は 十のまとまりが 10こ あつまった かずだよ！' },
      { speaker: 'player', text: 'じゅうが 10こで 100！ おおきい！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔴', count: 1, style: 'highlight' },
        ],
        label: '🔴 = 100のまとまり（百のくらい）',
      },
      {
        content: [
          { emoji: '🔴', count: 1, style: 'ten' },
          { emoji: '🔵', count: 3, style: 'normal' },
          { emoji: '🟡', count: 2, style: 'normal' },
        ],
        label: '132 = 百が 1つ・十が 3つ・一が 2つ',
      },
    ],
    microChallenge: {
      question: '百が 2つ・十が 4つ・一が 1つ → なんのかず？',
      choices: ['214', '241', '421'],
      correct: 1,
    },
  },

  'M2-06b': {
    grade: 2,
    difficulty: 'normal',       // 大きい数②（1000まで）→ 🟣を千の位に追加
    type: 'large_numbers',
    dialogue: [
      { speaker: 'owl',    text: '100が 10こ あつまると 1000に なるよ！ あたらしい くらいだ！' },
      { speaker: 'player', text: 'ひゃくのくらいの 上が あるんだ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🟣', count: 1, style: 'highlight' },
        ],
        label: '🟣 = 1000のまとまり（千のくらい）',
      },
      {
        content: [
          { emoji: '🟣', count: 1, style: 'ten' },
          { emoji: '🔴', count: 2, style: 'normal' },
          { emoji: '🔵', count: 3, style: 'normal' },
          { emoji: '🟡', count: 4, style: 'normal' },
        ],
        label: '1234 = 千が 1つ・百が 2つ・十が 3つ・一が 4つ',
      },
    ],
    microChallenge: {
      question: '千が 1つ・百が 5つ は いくつ？',
      choices: ['150', '1050', '1500'],
      correct: 2,
    },
  },

  'M2-07': {
    grade: 2,
    difficulty: 'normal',       // 水のかさ → 🥛(dL)🪣(L) 容器イメージで単位変換
    type: 'measurement',
    dialogue: [
      { speaker: 'owl',    text: 'コップ 1ぱいぶんが 1dL。その 10ぱいぶんが 1L だよ！' },
      { speaker: 'player', text: 'コップで かぞえれば わかるね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🥛', count: 1, style: 'highlight' },
        ],
        label: 'コップ 1ぱい = 1dL',
      },
      {
        content: [
          { emoji: '🥛', count: 10, style: 'normal' },
        ],
        label: 'コップ 10ぱい あつまると…',
      },
      {
        content: [
          { emoji: '🪣', count: 1, style: 'highlight' },
        ],
        label: '1L に なる！ 1L = 10dL',
      },
    ],
    microChallenge: {
      question: '3L は なんdL？',
      choices: ['13dL', '30dL', '300dL'],
      correct: 1,
    },
  },

  'M2-08': {
    grade: 2,
    difficulty: 'normal',       // 重さ → ⚖️天秤 + g・kg 単位変換
    type: 'measurement',
    dialogue: [
      { speaker: 'owl',    text: '1000gが あつまると 1kgに なるよ！ りんご 1こが だいたい 200gくらいだよ！' },
      { speaker: 'player', text: 'りんごで かんがえると わかりやすい！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍎', count: 1, style: 'highlight' },
        ],
        label: 'りんご 1こ ≒ 200g',
      },
      {
        content: [
          { emoji: '🍎', count: 5, style: 'normal' },
        ],
        label: 'りんご 5こ ≒ 1000g',
      },
      {
        content: [
          { emoji: '⚖️', count: 1, style: 'highlight' },
        ],
        label: '1000g = 1kg！ おもさを くらべよう！',
      },
    ],
    microChallenge: {
      question: '2kg は なんg？',
      choices: ['200g', '1200g', '2000g'],
      correct: 2,
    },
  },

  'M2-09a': {
    grade: 2,
    difficulty: 'normal',       // じこく① → 時計emoji + ながいはり・みじかいはりの読み方
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: 'ながい はりが ふんを、みじかい はりが じを あらわすよ！' },
      { speaker: 'player', text: 'はりが 2ほん あるんだね！ よく みてみる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🕐', count: 1, style: 'normal' },
        ],
        label: 'みじかい はり → 1じ',
      },
      {
        content: [
          { emoji: '🕧', count: 1, style: 'highlight' },
        ],
        label: 'ながい はりが まんなか → 30ぷん（はん）',
      },
      {
        content: [
          { emoji: '🕜', count: 1, style: 'highlight' },
        ],
        label: '1じ 30ぷん = 1じはん！',
      },
    ],
    microChallenge: {
      question: '3じ 30ぷんの とけいは どれ？',
      choices: ['🕒', '🕞', '🕓'],
      correct: 1,
    },
  },

  'M2-09b': {
    grade: 2,
    difficulty: 'normal',       // じこく② → 時間が流れる「前→後」の計算
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: '30ぷん たつと とけいの はりは どこに うごくかな？' },
      { speaker: 'player', text: 'はりが うごくんだ！ かんがえてみる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🕑', count: 1, style: 'normal' },
        ],
        label: 'いまは 2じ',
      },
      {
        content: [
          { emoji: '🕑', count: 1, style: 'accent' },
          { emoji: '➡️', count: 1, style: 'normal' },
          { emoji: '🕞', count: 1, style: 'highlight' },
        ],
        label: '30ぷん たつと → 2じ 30ぷん！',
      },
    ],
    microChallenge: {
      question: '3じから 1じかん たつと なんじ？',
      choices: ['2じ', '4じ', '5じ'],
      correct: 1,
    },
  },

  'M2-09c': {
    grade: 2,
    difficulty: 'easy',         // じこく文章題 → 対話で読み方の整理
    type: 'clock',
    dialogue: [
      { speaker: 'owl',    text: 'もんだいに「なんじかん後」「なんぷん後」が でてきたら たしざんで かんがえよう！' },
      { speaker: 'player', text: 'じかんの たしざんか！ やってみる！' },
    ],
    steps: [],
    microChallenge: null,
  },

  'M2-09d': {
    grade: 2,
    difficulty: 'easy',         // Zone 2 ミニまとめ → 応援
    type: 'measurement',
    dialogue: [
      { speaker: 'owl',    text: 'ながさ・かさ・おもさ・じこく… たくさん おぼえたね！' },
      { speaker: 'player', text: 'ぜんぶ できるように なってきた！' },
    ],
    steps: [],
    microChallenge: null,
  },

  // ─────────────────────────────────────────
  // Grade 2 — Zone 3: 九九
  // ─────────────────────────────────────────

  'M2-10b': {
    grade: 2,
    difficulty: 'normal',       // 九九3のだん → 3ずつふえるリズム体験
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '3のだんは 3ずつ ふえていくよ。リズムで おぼえよう！' },
      { speaker: 'player', text: '3・6・9・12… きもちいい！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍊', count: 3, style: 'normal' },
        ],
        label: '3こ はいった ふくろが 1つ → 3こ',
      },
      {
        content: [
          { emoji: '🍊', count: 3, style: 'normal' },
          { emoji: '🍊', count: 3, style: 'highlight' },
          { emoji: '🍊', count: 3, style: 'ten' },
        ],
        label: 'ふくろが 3つ → 3×3＝9こ！',
      },
    ],
    microChallenge: {
      question: '3 × 4 は いくつ？',
      choices: ['9', '12', '15'],
      correct: 1,
    },
  },

  'M2-10c': {
    grade: 2,
    difficulty: 'normal',       // 九九4のだん → 4ずつのまとまり体験
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '4のだんは 4ずつ ふえていくよ！' },
      { speaker: 'player', text: '4まいずつ かぞえよう！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🌸', count: 4, style: 'normal' },
        ],
        label: '4まい はいった たばが 1つ → 4まい',
      },
      {
        content: [
          { emoji: '🌸', count: 4, style: 'normal' },
          { emoji: '🌸', count: 4, style: 'highlight' },
        ],
        label: 'たばが 2つ → 4×2＝8まい！',
      },
    ],
    microChallenge: {
      question: '4 × 3 は いくつ？',
      choices: ['8', '12', '16'],
      correct: 1,
    },
  },

  'M2-10d': {
    grade: 2,
    difficulty: 'normal',       // 九九5のだん → 5の倍数は必ず5か0で終わる！
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '5のだんの こたえは かならず 5か 0で おわるよ！' },
      { speaker: 'player', text: 'ほんとだ！ かんたんに わかる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '⭐', count: 5, style: 'normal' },
        ],
        label: '5こ はいった ふくろが 1つ → 5こ',
      },
      {
        content: [
          { emoji: '⭐', count: 5, style: 'normal' },
          { emoji: '⭐', count: 5, style: 'highlight' },
          { emoji: '⭐', count: 5, style: 'ten' },
          { emoji: '⭐', count: 5, style: 'normal' },
        ],
        label: 'ふくろが 4つ → 5×4＝20こ！（0でおわる！）',
      },
    ],
    microChallenge: {
      question: '5 × 6 は いくつ？',
      choices: ['25', '30', '35'],
      correct: 1,
    },
  },

  'M2-10e': {
    grade: 2,
    difficulty: 'normal',       // 九九6のだん → 6ずつのまとまり体験
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '6のだんは すこし むずかしい けど ゆっくり かんがえよう！' },
      { speaker: 'player', text: 'さいころの めは 6つまで あるね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🎲', count: 6, style: 'normal' },
        ],
        label: '6こ はいった ふくろが 1つ → 6こ',
      },
      {
        content: [
          { emoji: '🎲', count: 6, style: 'normal' },
          { emoji: '🎲', count: 6, style: 'highlight' },
          { emoji: '🎲', count: 6, style: 'ten' },
        ],
        label: 'ふくろが 3つ → 6×3＝18こ！',
      },
    ],
    microChallenge: {
      question: '6 × 4 は いくつ？',
      choices: ['18', '24', '30'],
      correct: 1,
    },
  },

  'M2-10f': {
    grade: 2,
    difficulty: 'normal',       // 九九7のだん → 7の段は難しい、でも一番かっこいい！
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '7のだんは むずかしい けど いちばん かっこいいよ！' },
      { speaker: 'player', text: 'かっこいい！ ぜったい おぼえる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🌟', count: 7, style: 'normal' },
        ],
        label: '7こ はいった ふくろが 1つ → 7こ',
      },
      {
        content: [
          { emoji: '🌟', count: 7, style: 'normal' },
          { emoji: '🌟', count: 7, style: 'highlight' },
          { emoji: '🌟', count: 7, style: 'ten' },
        ],
        label: 'ふくろが 3つ → 7×3＝21こ！',
      },
    ],
    microChallenge: {
      question: '7 × 4 は いくつ？',
      choices: ['21', '28', '35'],
      correct: 1,
    },
  },

  'M2-10g': {
    grade: 2,
    difficulty: 'normal',       // 九九8のだん → タコの足は8本！
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: 'タコの あしは 8ほん！ 8のだんで かぞえてみよう！' },
      { speaker: 'player', text: 'タコで おぼえる！ おもしろい！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🐙', count: 1, style: 'normal' },
        ],
        label: 'タコ 1ぴき → あしが 8ほん',
      },
      {
        content: [
          { emoji: '🐙', count: 1, style: 'normal' },
          { emoji: '🐙', count: 1, style: 'highlight' },
          { emoji: '🐙', count: 1, style: 'ten' },
        ],
        label: 'タコ 3びき → 8×3＝24ほん！',
      },
    ],
    microChallenge: {
      question: '8 × 4 は いくつ？',
      choices: ['24', '32', '40'],
      correct: 1,
    },
  },

  'M2-10h': {
    grade: 2,
    difficulty: 'normal',       // 九九9のだん → こたえのくらいをたすといつも9！
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '9のだんは ふしぎ！ こたえの 十のくらいと 一のくらいを たすと いつも 9に なるよ！' },
      { speaker: 'player', text: 'ほんとだ！ 9・18・27… ぜんぶ 9に なる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍇', count: 9, style: 'normal' },
        ],
        label: '9こ はいった ふくろが 1つ → 9こ',
      },
      {
        content: [
          { emoji: '🍇', count: 9, style: 'normal' },
          { emoji: '🍇', count: 9, style: 'highlight' },
          { emoji: '🍇', count: 9, style: 'ten' },
        ],
        label: '9×3＝27（2＋7＝9！ ふしぎ！）',
      },
    ],
    microChallenge: {
      question: '9 × 4 は いくつ？',
      choices: ['27', '36', '45'],
      correct: 1,
    },
  },

  'M2-10i': {
    grade: 2,
    difficulty: 'normal',       // 九九1のだん・0のかけざん → そのまま！0はぜんぶきえる！
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: '1×なんでも = そのまま！ 0×なんでも = 0！ まほうみたい！' },
      { speaker: 'player', text: '0を かけると ぜんぶ きえちゃうの！？' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍎', count: 1, style: 'highlight' },
        ],
        label: '1×5 = そのまま 5！',
      },
      {
        content: [
          { emoji: '✨', count: 1, style: 'accent' },
        ],
        label: '0×5 = 0！ ぜんぶ きえる まほう！',
      },
    ],
    microChallenge: {
      question: '1 × 7 は いくつ？',
      choices: ['0', '1', '7'],
      correct: 2,
    },
  },

  'M2-10j': {
    grade: 2,
    difficulty: 'normal',       // 九九文章題 → 「Nこずつ×Mぐるーぷ」のしきの立て方
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: 'もんだいのなかに「〇こずつ」「△グループ」が でてきたら かけざんだよ！' },
      { speaker: 'player', text: 'まず「こずつ」を さがすんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍬', count: 3, style: 'normal' },
        ],
        label: '「3こずつ」→ かける かず',
      },
      {
        content: [
          { emoji: '🍬', count: 3, style: 'normal' },
          { emoji: '🍬', count: 3, style: 'highlight' },
          { emoji: '🍬', count: 3, style: 'ten' },
          { emoji: '🍬', count: 3, style: 'normal' },
        ],
        label: '「4グループ」→ 3×4＝12こ！',
      },
    ],
    microChallenge: {
      question: '5こずつ 3グループ → ぜんぶで なんこ？',
      choices: ['8こ', '15こ', '53こ'],
      correct: 1,
    },
  },

  'M2-10k': {
    grade: 2,
    difficulty: 'normal',       // 九九総まとめ → 全9段のアイコンで達成感演出
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: 'ぜんぶの くくを マスターしたね！ すごい！' },
      { speaker: 'player', text: 'ぜんぶ いえるよ！ やったー！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍬', count: 1, style: 'normal' },
          { emoji: '🍊', count: 1, style: 'normal' },
          { emoji: '🌸', count: 1, style: 'normal' },
          { emoji: '⭐', count: 1, style: 'normal' },
          { emoji: '🎲', count: 1, style: 'highlight' },
          { emoji: '🌟', count: 1, style: 'normal' },
          { emoji: '🐙', count: 1, style: 'normal' },
          { emoji: '🍇', count: 1, style: 'normal' },
          { emoji: '🍎', count: 1, style: 'normal' },
        ],
        label: 'くくを ぜんぶ せいふくしたぞ！',
      },
    ],
    microChallenge: {
      question: '7 × 8 は いくつ？',
      choices: ['48', '54', '56'],
      correct: 2,
    },
  },

  // ─────────────────────────────────────────
  // Grade 2 — Zone 4: 図形・3けた筆算
  // ─────────────────────────────────────────

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

  'M2-11': {
    grade: 2,
    difficulty: 'normal',       // 三角形と四角形 → 辺の数をかぞえる体験
    type: 'shape',
    dialogue: [
      { speaker: 'owl',    text: 'かたちの なまえは へんの かずで きまるよ！' },
      { speaker: 'player', text: 'へんを かぞえれば わかるんだ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔺', count: 1, style: 'highlight' },
        ],
        label: '三かくけい → へんが 3つ・かどが 3つ',
      },
      {
        content: [
          { emoji: '🔷', count: 1, style: 'highlight' },
        ],
        label: '四かくけい → へんが 4つ・かどが 4つ',
      },
    ],
    microChallenge: {
      question: 'へんが 3つの かたちは どれ？',
      choices: ['三かくけい', '四かくけい', 'まる'],
      correct: 0,
    },
  },

  'M2-12': {
    grade: 2,
    difficulty: 'normal',       // 長方形・正方形・直角 → 直角の概念（かどがぴったり）
    type: 'shape',
    dialogue: [
      { speaker: 'owl',    text: 'かどが ぴったり 90ど に なっているのが ちょっかくだよ！' },
      { speaker: 'player', text: 'かどを みれば ちょっかくか わかるんだ！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔲', count: 1, style: 'normal' },
        ],
        label: 'ちょうほうけい → ぜんぶのかどが ちょっかく！',
      },
      {
        content: [
          { emoji: '🟥', count: 1, style: 'highlight' },
        ],
        label: 'せいほうけい → 4つのへんが みんな おなじ ながさ！',
      },
    ],
    microChallenge: {
      question: '4つのへんが みんな おなじ ながさの かたちは？',
      choices: ['ちょうほうけい', 'せいほうけい', '三かくけい'],
      correct: 1,
    },
  },

  'M2-12b': {
    grade: 2,
    difficulty: 'easy',         // 図形ミニまとめ → 応援
    type: 'shape',
    dialogue: [
      { speaker: 'owl',    text: 'かたちの なまえと とくちょうを おぼえたね！' },
      { speaker: 'player', text: 'へんと かどを みれば ぜんぶ わかる！' },
    ],
    steps: [],
    microChallenge: null,
  },

  'M2-13a': {
    grade: 2,
    difficulty: 'detailed',     // 3けたのたしざん → 🔴🔵🟡の3色でくらいが1つ増える体験
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: '3けたのたしざんも くらいを そろえれば だいじょうぶ！' },
      { speaker: 'player', text: '百のくらいが あるんだね！ やってみる！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔴', count: 1, style: 'ten' },
          { emoji: '🔵', count: 2, style: 'normal' },
          { emoji: '🟡', count: 3, style: 'normal' },
        ],
        label: '123 = 百が 1つ・十が 2つ・一が 3つ',
      },
      {
        content: [
          { emoji: '🔴', count: 2, style: 'highlight' },
          { emoji: '🔵', count: 3, style: 'highlight' },
          { emoji: '🟡', count: 4, style: 'highlight' },
        ],
        label: 'たすのは 234 = 百が 2つ・十が 3つ・一が 4つ',
      },
      {
        content: [
          { emoji: '🔴', count: 3, style: 'ten' },
          { emoji: '🔵', count: 5, style: 'normal' },
          { emoji: '🟡', count: 7, style: 'highlight' },
        ],
        label: 'くらいごとに たすと → 357！',
      },
    ],
    microChallenge: {
      question: '123 + 234 = ？',
      choices: ['347', '357', '367'],
      correct: 1,
    },
  },

  'M2-13b': {
    grade: 2,
    difficulty: 'detailed',     // 3けたのひきざん → 🟩🟥の色コントラストで取り除く視覚化
    type: 'vertical_subtraction',
    dialogue: [
      { speaker: 'owl',    text: '3けたの ひきざんも くらいごとに ひいていこう！' },
      { speaker: 'player', text: 'ひとつずつ ていねいに やればいいんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🟩', count: 4, style: 'ten' },
          { emoji: '🟩', count: 5, style: 'normal' },
          { emoji: '🟩', count: 6, style: 'normal' },
        ],
        label: '456 = 百が 4つ・十が 5つ・一が 6つ',
      },
      {
        content: [
          { emoji: '🟩', count: 4, style: 'ten' },
          { emoji: '🟩', count: 5, style: 'normal' },
          { emoji: '🟩', count: 3, style: 'normal' },
          { emoji: '🟩', count: 3, style: 'accent' },
        ],
        label: '一のくらいから 3 を ひく → 3 のこる',
      },
      {
        content: [
          { emoji: '🟩', count: 2, style: 'ten' },
          { emoji: '🟩', count: 2, style: 'accent' },
          { emoji: '🟩', count: 3, style: 'normal' },
          { emoji: '🟩', count: 3, style: 'normal' },
        ],
        label: '百と十を ひいて → 223！',
      },
    ],
    microChallenge: {
      question: '456 - 233 = ？',
      choices: ['213', '223', '233'],
      correct: 1,
    },
  },

  'M2-13c': {
    grade: 2,
    difficulty: 'easy',         // 3けた筆算ミニまとめ → 応援
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: '3けたのたしざん・ひきざんも くらいを そろえれば できるね！' },
      { speaker: 'player', text: 'くらいそろえは まかせて！' },
    ],
    steps: [],
    microChallenge: null,
  },

  // ─────────────────────────────────────────
  // Grade 2 — Zone 5: 分数
  // ─────────────────────────────────────────

  'M2-14a': {
    grade: 2,
    difficulty: 'detailed',     // 分数きほん → 🍕全体とひとかけらで「ぶんし/ぶんぼ」を視覚化
    type: 'fraction',
    dialogue: [
      { speaker: 'owl',    text: 'おなじ おおきさに わけた 1つぶんが ぶんすうだよ！' },
      { speaker: 'player', text: 'ピザを わけたら わかりそう！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍕', count: 2, style: 'normal' },
        ],
        label: 'ピザを 2つに わけると…',
      },
      {
        content: [
          { emoji: '🍕', count: 1, style: 'highlight' },
          { emoji: '🍕', count: 1, style: 'accent' },
        ],
        label: '1かけらが 1/2（にぶんのいち）！',
      },
      {
        content: [
          { emoji: '🍕', count: 1, style: 'highlight' },
          { emoji: '🍕', count: 1, style: 'accent' },
          { emoji: '🍕', count: 1, style: 'accent' },
        ],
        label: '3つに わけた 1かけらは 1/3（さんぶんのいち）！',
      },
    ],
    microChallenge: {
      question: 'ピザを 4つに わけた 1かけらは？',
      choices: ['1/2', '1/3', '1/4'],
      correct: 2,
    },
  },

  'M2-14b': {
    grade: 2,
    difficulty: 'normal',       // 分数のたしざん → 🍕ピースを足す視覚化
    type: 'fraction',
    dialogue: [
      { speaker: 'owl',    text: 'おなじ わけかたのぶんすうは ピースを たすだけ！' },
      { speaker: 'player', text: 'かけらを あわせるんだね！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍕', count: 1, style: 'normal' },
          { emoji: '🍕', count: 1, style: 'highlight' },
        ],
        label: '1/4 + 1/4 → ピースを あわせると…',
      },
      {
        content: [
          { emoji: '🍕', count: 2, style: 'highlight' },
        ],
        label: '2/4！ ぶんしだけ たせばいい！',
      },
    ],
    microChallenge: {
      question: '1/5 + 2/5 = ？',
      choices: ['2/10', '3/5', '3/10'],
      correct: 1,
    },
  },

  'M2-14c': {
    grade: 2,
    difficulty: 'normal',       // 分数のひきざん → 🍕ピースが減る視覚化
    type: 'fraction',
    dialogue: [
      { speaker: 'owl',    text: 'ぶんすうの ひきざんも ぶんしだけ ひけばいい！' },
      { speaker: 'player', text: 'たしざんと おなじ やりかたか！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🍕', count: 3, style: 'normal' },
        ],
        label: '3/4のピースから…',
      },
      {
        content: [
          { emoji: '🍕', count: 2, style: 'normal' },
          { emoji: '🍕', count: 1, style: 'accent' },
        ],
        label: '1/4を ひくと → 2/4！',
      },
    ],
    microChallenge: {
      question: '4/5 - 2/5 = ？',
      choices: ['1/5', '2/5', '3/5'],
      correct: 1,
    },
  },

  'M2-14d': {
    grade: 2,
    difficulty: 'easy',         // 分数文章題 → もんだいぶんからわけかたを読み取る
    type: 'fraction',
    dialogue: [
      { speaker: 'owl',    text: 'もんだいに「〇つに わけた 1つぶん」が でたら ぶんすうだよ！' },
      { speaker: 'player', text: 'わけかたを みつければ できる！' },
    ],
    steps: [],
    microChallenge: null,
  },

  'M2-14e': {
    grade: 2,
    difficulty: 'easy',         // 分数ミニまとめ → 応援
    type: 'fraction',
    dialogue: [
      { speaker: 'owl',    text: 'ぶんすうの たしざん・ひきざん バッチリだね！' },
      { speaker: 'player', text: 'ぶんしを たしたり ひいたり できるよ！' },
    ],
    steps: [],
    microChallenge: null,
  },

  // ─────────────────────────────────────────
  // Grade 2 — Zone 6: 総復習・最終決戦
  // ─────────────────────────────────────────

  'M2-15a': {
    grade: 2,
    difficulty: 'easy',         // 総復習① たしざん・ひきざん・大きな数
    type: 'vertical_addition',
    dialogue: [
      { speaker: 'owl',    text: 'くらいを そろえて たしたり ひいたり できるようになったね！' },
      { speaker: 'player', text: '大きい かずでも だいじょうぶ！' },
    ],
    steps: [],
    microChallenge: null,
  },

  'M2-15b': {
    grade: 2,
    difficulty: 'easy',         // 総復習② 九九・かけざん
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: 'くくを ぜんぶ おぼえたのは すごい！ じしんをもって！' },
      { speaker: 'player', text: 'くくは もう まかせて！' },
    ],
    steps: [],
    microChallenge: null,
  },

  'M2-15c': {
    grade: 2,
    difficulty: 'easy',         // 総復習③ 図形・分数
    type: 'fraction',
    dialogue: [
      { speaker: 'owl',    text: 'かたちも ぶんすうも できるようになったね！' },
      { speaker: 'player', text: 'いろんな ことを まなんだ！' },
    ],
    steps: [],
    microChallenge: null,
  },

  'M2-15d': {
    grade: 2,
    difficulty: 'normal',       // グランド・レヴィアサン決戦 → Grade2で学んだ力を振り返り出撃！
    type: 'multiplication',
    dialogue: [
      { speaker: 'owl',    text: 'グリモアを まもるときが きた！ これまでの ちからを みせよう！' },
      { speaker: 'player', text: 'ぜんぶ できる！ たたかう！' },
    ],
    steps: [
      {
        content: [
          { emoji: '🔵', count: 2, style: 'ten' },
          { emoji: '🟡', count: 4, style: 'normal' },
        ],
        label: '2けたのたしざん・ひきざんを おぼえたね！',
      },
      {
        content: [
          { emoji: '🍬', count: 1, style: 'normal' },
          { emoji: '🍊', count: 1, style: 'normal' },
          { emoji: '⭐', count: 1, style: 'normal' },
          { emoji: '🌟', count: 1, style: 'normal' },
          { emoji: '🐙', count: 1, style: 'highlight' },
          { emoji: '🍇', count: 1, style: 'normal' },
        ],
        label: 'くくも ぜんぶ せいふくした！',
      },
      {
        content: [
          { emoji: '🔺', count: 1, style: 'normal' },
          { emoji: '🔲', count: 1, style: 'normal' },
          { emoji: '🍕', count: 1, style: 'highlight' },
        ],
        label: 'かたちも ぶんすうも つよくなった！ いくぞ！',
      },
    ],
    microChallenge: null,
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
