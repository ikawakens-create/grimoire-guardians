/**
 * worldClearScenes.js — Grimoire Guardians
 * クリア後ミニストーリーデータ（Ph7）
 *
 * 各ワールドの初クリア時に表示する JRPG ダイアログボックス演出のデータ。
 * ClearStoryBanner.js が消費する。
 *
 * フィールド定義:
 *   @property {string} emoji        — このワールドのシンボル絵文字（Panel 1: グリモア演出）
 *   @property {string} nextEmoji    — 次ワールドの予告絵文字（Panel 3）
 *   @property {string|null} image   — 将来のゾーン背景画像パス（現在は null）
 *   @property {string} owlLine      — フクロウのセリフ。{name} プレースホルダー使用可（owlLine のみ）
 *   @property {string} grimoireLine — グリモア主役セリフ。プレースホルダー禁止
 *   @property {string} storyLine    — 世界への影響テキスト（1行）
 *   @property {string} nextWorldHint — 次ワールドの予告テキスト
 *
 * 漢字制限:
 *   Grade 1 ワールド → 全てひらがな
 *   Grade 2 ワールド → 全てひらがな（1年生配当漢字は使用可だが統一でひらがな）
 *
 * @version 1.1
 * @date 2026-04-07
 */

/**
 * ─────────────────────────────────────────────────────────────────
 * キャラクターガイド＆実装ルール（新規エントリ追加時に必ず参照）
 * ─────────────────────────────────────────────────────────────────
 *
 * 【フクロウ先生 owlLine 口調ルール】
 *   口調     : 「〜ぞ」「〜だ」系（ぶっきらぼうだが愛情のある師匠キャラ）
 *   序盤     : シンプルに称賛 → 「よくやったぞ！」
 *   難所     : 共感を示す   → 「むずかしかったな……でも やったぞ」
 *   Zone完了  : 感慨を込める  → 「……よく ここまで きた。ほんものだ」
 *   ラスボス前 : 緊張感を出す  → 「さいごの たたかいが はじまるぞ……いくか」
 *   ユーモア  : 意外性を表す  → 「1のだんが いちばん かんたんとは！ いいぞ！」
 *
 * 【grimoireLine バリエーション 3パターン】
 *   通常型 : 「〇〇の グリモアが もどってきた！」          ← 序盤〜中盤
 *   感情型 : 「ずっと まっていたぞ……！ やっと あえた」     ← Zone完了・後半
 *   予告型 : 「つぎの グリモアが さけんでいる……！」        ← Zone節目の締め
 *
 * 【storyLine ルール — 汎用フレーズ禁止】
 *   各Zoneの世界観に合わせた「具体的なシーン」を描写する。
 *   Zone1 みなと     : 港・船・灯台・風など
 *   Zone2 さんごしょう : 珊瑚・海流・海底の光・生き物
 *   Zone3 がいよう    : 嵐・大波・空・海鳥
 *   Zone4 しんかい図形  : 深海の形・幾何学的な光
 *   Zone5 しんかい3桁  : 深海の最深部・静寂・巨大な影
 *   Zone6 ぶんすう    : 分割・新たな魔法・発見
 *   Zone7 そうふくしゅう : 決戦の気配・回顧・感動
 *
 * 【variant（A版）ワールド 試練フレーム】
 *   m2_01_a / m2_02_a / m2_03_a / m2_03b_a は「より難しい試練」
 *   owlLine     : 「もっと きびしい しれんを のりこえたぞ！」系
 *   grimoireLine : 感情型を使う（「つよさを みせてくれた……！」）
 *   storyLine   : 「〇〇が つよくなった…もっと おおきな うみが よんでいる」系
 *
 * 【ゾーン別絵文字パレット】
 *   Zone1 みなと      : ⚓ 🚢 🌊 🧭 💨 🗺️
 *   Zone2 さんごしょう  : 🐠 💎 🦀 🐙 📏 ⏱️ 💧 ⚖️ ⏰
 *   Zone3 がいよう     : ✖️ ⚡ 🌪️ 🐋 🦈 🌊
 *   Zone4 しんかい図形  : 📐 🔺 🔷 ⬛ 🔶 ✨
 *   Zone5 しんかい3桁   : 💎 🔑 ⚔️ 🛡️ 🌑 🌟
 *   Zone6 ぶんすう     : 🍕 🎯 💫 🔮 🌸 ✨
 *   Zone7 そうふくしゅう : ⚔️ 🏆 🌈 🌟 💥 🎆
 * ─────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────
// Grade 1 ワールド（world_1 〜 world_16b）
// 全テキスト: ひらがなのみ
// ─────────────────────────────────────────
export const WORLD_CLEAR_SCENES = {

  // ── Act 1: はじまりの まち（world_1 〜 world_6b）────────────────

  'world_1': {
    emoji:        '🔢',
    nextEmoji:    '🔟',
    image:        null,
    owlLine:      '{name}！ さいしょの グリモアを とりもどしたぞ！',
    grimoireLine: 'なかまづくりの グリモアが もどってきた！',
    storyLine:    'まちの ひとびとが かずを かぞえられるように なった…',
    nextWorldHint:'つぎは 10までの かずの グリモアが まっているよ',
  },

  'world_2': {
    emoji:        '🔟',
    nextEmoji:    '📍',
    image:        null,
    owlLine:      '{name}！ よくやったぞ！',
    grimoireLine: '10までの かずの グリモアが もどってきた！',
    storyLine:    'こどもたちが たのしそうに かずを かぞえている…',
    nextWorldHint:'つぎは なんばんめの グリモアが まっているよ',
  },

  'world_3': {
    emoji:        '📍',
    nextEmoji:    '🤝',
    image:        null,
    owlLine:      '{name}！ すごいぞ！',
    grimoireLine: 'なんばんめの グリモアが もどってきた！',
    storyLine:    'みちで まいごに なる ことが なくなった…',
    nextWorldHint:'つぎは いくつと いくつの グリモアが まっているよ',
  },

  'world_4': {
    emoji:        '🤝',
    nextEmoji:    '➕',
    image:        null,
    owlLine:      '{name}！ よくやった！',
    grimoireLine: 'いくつと いくつの グリモアが もどってきた！',
    storyLine:    'まちが すこし あかるくなった…',
    nextWorldHint:'つぎは たしざんの グリモアが まっているよ',
  },

  'world_5': {
    emoji:        '➕',
    nextEmoji:    '✨',
    image:        null,
    owlLine:      '{name}！ たしざんを みにつけたぞ！',
    grimoireLine: 'たしざんの グリモアが もどってきた！',
    storyLine:    'まちに あわせる まほうが もどってきた…',
    nextWorldHint:'つぎは たしざん おうような グリモアが まっているよ',
  },

  'world_5b': {
    emoji:        '✨',
    nextEmoji:    '➖',
    image:        null,
    owlLine:      '{name}！ おうようまで できたぞ！',
    grimoireLine: 'たしざん おうような グリモアが もどってきた！',
    storyLine:    'ほんだなに ひかりが もどってきた…',
    nextWorldHint:'つぎは ひきざんの グリモアが まっているよ',
  },

  'world_6': {
    emoji:        '➖',
    nextEmoji:    '🌟',
    image:        null,
    owlLine:      '{name}！ ひきざんを みにつけたぞ！',
    grimoireLine: 'ひきざんの グリモアが もどってきた！',
    storyLine:    'のこりを もとめる まほうが よみがえった…',
    nextWorldHint:'つぎは ひきざん おうような グリモアが まっているよ',
  },

  'world_6b': {
    emoji:        '🌟',
    nextEmoji:    '🔢',
    image:        null,
    owlLine:      '{name}！ たしざんも ひきざんも できるぞ！',
    grimoireLine: 'ひきざん おうような グリモアが もどってきた！',
    storyLine:    'まちに あたらしい なかまが やってきた…',
    nextWorldHint:'つぎは 20までの かずの グリモアが まっているよ',
  },

  // ── Act 2: とけいと おおきい かず（world_7 〜 world_9）────────────

  'world_7': {
    emoji:        '🔢',
    nextEmoji:    '🕐',
    image:        null,
    owlLine:      '{name}！ おおきい かずも わかるぞ！',
    grimoireLine: '20までの かずの グリモアが もどってきた！',
    storyLine:    'きりが すこし うすくなってきた…',
    nextWorldHint:'つぎは とけいの グリモアが まっているよ',
  },

  'world_8a': {
    emoji:        '🕐',
    nextEmoji:    '🕧',
    image:        null,
    owlLine:      '{name}！ とけいが よめるように なったぞ！',
    grimoireLine: 'なんじの グリモアが もどってきた！',
    storyLine:    'まちの とけいが また うごきはじめた…',
    nextWorldHint:'つぎは なんじはんの グリモアが まっているよ',
  },

  'world_8b': {
    emoji:        '🕧',
    nextEmoji:    '⏰',
    image:        null,
    owlLine:      '{name}！ はんの じかんも わかるぞ！',
    grimoireLine: 'なんじはんの グリモアが もどってきた！',
    storyLine:    'とけいの まほうが ふかまってきた…',
    nextWorldHint:'つぎは 5ふんたんいの グリモアが まっているよ',
  },

  'world_8c': {
    emoji:        '⏰',
    nextEmoji:    '🍒',
    image:        null,
    owlLine:      '{name}！ 5ふんたんいも よめるぞ！',
    grimoireLine: '5ふんたんいの グリモアが もどってきた！',
    storyLine:    'まちの みんなが じかんを わすれなくなった…',
    nextWorldHint:'つぎは さくらんぼざんの グリモアが まっているよ',
  },

  'world_9': {
    emoji:        '🍒',
    nextEmoji:    '🔥',
    image:        null,
    owlLine:      '{name}！ さくらんぼざんの ひみつを みつけたぞ！',
    grimoireLine: 'さくらんぼざんの グリモアが もどってきた！',
    storyLine:    'かずを わける まほうが うまれた…',
    nextWorldHint:'つぎは くりあがりの グリモアが まっているよ',
  },

  // ── Act 3: くりあがりと くりさがり（world_10a 〜 world_11d）──────

  'world_10a': {
    emoji:        '🔥',
    nextEmoji:    '💪',
    image:        null,
    owlLine:      '{name}！ くりあがりを のりこえたぞ！',
    grimoireLine: 'くりあがり 9の グリモアが もどってきた！',
    storyLine:    'むずかしい たしざんの とびらが ひらいた…',
    nextWorldHint:'つぎは 8の くりあがりの グリモアが まっているよ',
  },

  'world_10b': {
    emoji:        '💪',
    nextEmoji:    '⚡',
    image:        null,
    owlLine:      '{name}！ また ひとつ のりこえたぞ！',
    grimoireLine: 'くりあがり 8の グリモアが もどってきた！',
    storyLine:    'まほうが どんどん つよくなっている…',
    nextWorldHint:'つぎは 7と 6の くりあがりの グリモアだ',
  },

  'world_10c': {
    emoji:        '⚡',
    nextEmoji:    '🌈',
    image:        null,
    owlLine:      '{name}！ 7と 6まで やりとげたぞ！',
    grimoireLine: 'くりあがり 7・6の グリモアが もどってきた！',
    storyLine:    'ふういんが どんどん かいふくしていく…',
    nextWorldHint:'つぎは くりあがり おうような グリモアだ',
  },

  'world_10d': {
    emoji:        '🌈',
    nextEmoji:    '💧',
    image:        null,
    owlLine:      '{name}！ くりあがりを かんぜんに みにつけたぞ！',
    grimoireLine: 'くりあがり おうようの グリモアが もどってきた！',
    storyLine:    'たしざんの まほうが かんぜんに そなわった…',
    nextWorldHint:'つぎは くりさがりの ひみつの グリモアだ',
  },

  'world_11a': {
    emoji:        '💧',
    nextEmoji:    '💫',
    image:        null,
    owlLine:      '{name}！ くりさがりの ひみつを みつけたぞ！',
    grimoireLine: '10からひくの グリモアが もどってきた！',
    storyLine:    'ひきざんの おくぎが めざめた…',
    nextWorldHint:'つぎは くりさがり 11・12の グリモアだ',
  },

  'world_11b': {
    emoji:        '💫',
    nextEmoji:    '🌙',
    image:        null,
    owlLine:      '{name}！ むずかしい くりさがりも できるぞ！',
    grimoireLine: 'くりさがり 11・12の グリモアが もどってきた！',
    storyLine:    'きりの なかから ひかりが みえる…',
    nextWorldHint:'つぎは 13から 18の くりさがりの グリモアだ',
  },

  'world_11c': {
    emoji:        '🌙',
    nextEmoji:    '🎆',
    image:        null,
    owlLine:      '{name}！ 13から 18まで やりとげたぞ！',
    grimoireLine: 'くりさがり 13〜18の グリモアが もどってきた！',
    storyLine:    'ふういんが なかばを こえた……なにかが ゆれている…',
    nextWorldHint:'つぎは くりさがり おうような グリモアだ',
  },

  'world_11d': {
    emoji:        '🎆',
    nextEmoji:    '🎯',
    image:        null,
    owlLine:      '{name}！ くりさがりも かんせいだぞ！',
    grimoireLine: 'くりさがり おうようの グリモアが もどってきた！',
    storyLine:    'やみの きりを はねのけた……まちが みえてきた…',
    nextWorldHint:'つぎは 3つの かずの たしざんの グリモアだ',
  },

  // ── Act 4: やみへの はんげき（world_12a 〜 world_13b）────────────

  'world_12a': {
    emoji:        '🎯',
    nextEmoji:    '🎪',
    image:        null,
    owlLine:      '{name}！ 3つの かずも とけたぞ！',
    grimoireLine: '3つの たしざんの グリモアが もどってきた！',
    storyLine:    'まちの みんなが ちからを あわせている…',
    nextWorldHint:'つぎは 3つの ひきざんの グリモアだ',
  },

  'world_12b': {
    emoji:        '🎪',
    nextEmoji:    '🎲',
    image:        null,
    owlLine:      '{name}！ やみに まけるな！',
    grimoireLine: '3つの ひきざんの グリモアが もどってきた！',
    storyLine:    'やみの こうげきを うけながらも まけていない…',
    nextWorldHint:'つぎは たしざん・ひきざん まじりの グリモアだ',
  },

  'world_12c': {
    emoji:        '🎲',
    nextEmoji:    '🔺',
    image:        null,
    owlLine:      '{name}！ たしざんも ひきざんも つかいこなすぞ！',
    grimoireLine: 'たし・ひきまじりの グリモアが もどってきた！',
    storyLine:    'りょうほうの まほうで やみに たちむかっている…',
    nextWorldHint:'つぎは かたちの グリモアだ',
  },

  'world_13': {
    emoji:        '🔺',
    nextEmoji:    '🔷',
    image:        null,
    owlLine:      '{name}！ かたちの ひみつを みつけたぞ！',
    grimoireLine: 'かたちあそびの グリモアが もどってきた！',
    storyLine:    'まわりの ものを みる まほうが めざめた…',
    nextWorldHint:'つぎは かたちづくりの グリモアだ',
  },

  'world_13b': {
    emoji:        '🔷',
    nextEmoji:    '📝',
    image:        null,
    owlLine:      '{name}！ かたちを つかいこなせるぞ！',
    grimoireLine: 'かたちづくりの グリモアが もどってきた！',
    storyLine:    'まちの かたちが もとに もどってきた…',
    nextWorldHint:'つぎは おおきい かずの グリモアだ',
  },

  // ── ラストスパート（world_14a 〜 world_16b）──────────────────────

  'world_14a': {
    emoji:        '📝',
    nextEmoji:    '📊',
    image:        null,
    owlLine:      '{name}！ おおきい かずを よみかきできるぞ！',
    grimoireLine: 'かずの よみかきの グリモアが もどってきた！',
    storyLine:    'やみよ……もうすぐ きみの まけだ…',
    nextWorldHint:'つぎは かずの じゅんばんの グリモアだ',
  },

  'world_14b': {
    emoji:        '📊',
    nextEmoji:    '⏱️',
    image:        null,
    owlLine:      '{name}！ かずの じゅんばんも わかるぞ！',
    grimoireLine: 'かずの じゅんばんの グリモアが もどってきた！',
    storyLine:    'きりが はれていく……もうすぐ だぞ！',
    nextWorldHint:'つぎは とけい（なんじなんぷん）の グリモアだ',
  },

  'world_15a': {
    emoji:        '⏱️',
    nextEmoji:    '🕰️',
    image:        null,
    owlLine:      '{name}！ なんじなんぷんも よめるぞ！',
    grimoireLine: 'なんじなんぷん（まえはん）の グリモアが もどってきた！',
    storyLine:    'あと すこし！ まちに ひかりが もどってきた…',
    nextWorldHint:'つぎは とけいの グリモア こうはんだ',
  },

  'world_15b': {
    emoji:        '🕰️',
    nextEmoji:    '📖',
    image:        null,
    owlLine:      '{name}！ とけいを かんぺきに よめるぞ！',
    grimoireLine: 'なんじなんぷん（こうはん）の グリモアが もどってきた！',
    storyLine:    'きぼうの ひかりが みえてきた！！',
    nextWorldHint:'つぎは たしざん もんだいの グリモアだ',
  },

  'world_16a': {
    emoji:        '📖',
    nextEmoji:    '🏆',
    image:        null,
    owlLine:      '{name}！ さいごの もんだいを といてきたぞ！',
    grimoireLine: 'たしざん もんだいの グリモアが もどってきた！',
    storyLine:    'さいごの ふういんが ゆらいでいる…！！',
    nextWorldHint:'つぎは さいごの グリモアだ……！',
  },

  'world_16b': {
    emoji:        '🏆',
    nextEmoji:    '🌈',
    image:        null,
    owlLine:      '{name}！ ついに やりとげたぞ！ グレード 1 かんりょうだ！',
    grimoireLine: 'ひきざん もんだいの グリモアが もどってきた！',
    storyLine:    'すべての ふういんが とけた……まちに ひかりが あふれている！',
    nextWorldHint:'すべての グリモアが もとに もどった！ つぎの ぼうけんへ！',
  },

  // ─────────────────────────────────────────
  // Grade 2 キーワールド（m2_01 〜 m2_15d）
  // 全テキスト: ひらがなのみ
  // ─────────────────────────────────────────

  'm2_01': {
    emoji:        '⚓',
    nextEmoji:    '🚢',
    image:        null,
    owlLine:      '{name}！ 2けたの たしざんを みにつけたぞ！',
    grimoireLine: '2けた たしざんの グリモアが もどってきた！',
    storyLine:    'みなとに あさやけが さしこんできた…',
    nextWorldHint:'つぎは もっと むずかしい たしざんの グリモアが まっているぞ',
  },

  'm2_01_a': {
    emoji:        '🚢',
    nextEmoji:    '🌊',
    image:        null,
    owlLine:      '{name}！ もっと きびしい しれんを のりこえたぞ！',
    grimoireLine: 'つよさを みせてくれた……！ グリモアが こたえた',
    storyLine:    'みなとの かぜが つよくなった……もっと おおきな うみが よんでいる',
    nextWorldHint:'くりあがりの なみが まっているぞ……いくか',
  },

  'm2_02': {
    emoji:        '🌊',
    nextEmoji:    '💨',
    image:        null,
    owlLine:      '{name}！ くりあがりの かべを やぶったぞ！',
    grimoireLine: 'くりあがり たしざんの グリモアが もどってきた！',
    storyLine:    'みなとの とうだいに あかるい ひかりが ともった…',
    nextWorldHint:'つぎは さらに きびしい くりあがりが まっているぞ',
  },

  'm2_02_a': {
    emoji:        '💨',
    nextEmoji:    '🗺️',
    image:        null,
    owlLine:      '{name}！ むずかしかったな……でも やったぞ！',
    grimoireLine: 'ここまで やれるとは……！ グリモアが ふるえた',
    storyLine:    'うみかぜが はげしく ふいた……まるで せかいが こたえているようだ',
    nextWorldHint:'つぎは 2けた どうしの おおきな たしざんだ',
  },

  'm2_02b': {
    emoji:        '🗺️',
    nextEmoji:    '⚓',
    image:        null,
    owlLine:      '{name}！ 2けた どうしの たしざんも できるぞ！',
    grimoireLine: '2けた＋2けたの グリモアが もどってきた！',
    storyLine:    'みなとに あたらしい ふねが にゅうこうした…',
    nextWorldHint:'こんどは ひきざんの グリモアが まっているぞ',
  },

  'm2_03': {
    emoji:        '🚢',
    nextEmoji:    '🌊',
    image:        null,
    owlLine:      '{name}！ 2けたの ひきざんを みにつけたぞ！',
    grimoireLine: '2けた ひきざんの グリモアが もどってきた！',
    storyLine:    'みなとの くものすきまから そらが みえてきた…',
    nextWorldHint:'つぎは もっと むずかしい ひきざんが まっているぞ',
  },

  'm2_03_a': {
    emoji:        '🌊',
    nextEmoji:    '💨',
    image:        null,
    owlLine:      '{name}！ きびしい しれんも のりこえたぞ！',
    grimoireLine: 'なんどでも たちむかう……！ グリモアが よろこんだ',
    storyLine:    'みなとの なみが おだやかに なってきた……ふねが すすみやすくなった',
    nextWorldHint:'くりさがりの ふかぶかしい グリモアが よんでいる',
  },

  'm2_03b': {
    emoji:        '💨',
    nextEmoji:    '🧭',
    image:        null,
    owlLine:      '{name}！ くりさがりの ひみつも わかったぞ！',
    grimoireLine: 'くりさがり ひきざんの グリモアが もどってきた！',
    storyLine:    'みなとの かすみが はれて とおくの うみが みえた…',
    nextWorldHint:'つぎは さらに きびしい くりさがりが まっているぞ',
  },

  'm2_03b_a': {
    emoji:        '🧭',
    nextEmoji:    '🗺️',
    image:        null,
    owlLine:      '{name}！ さいごの かべを のりこえたぞ……！',
    grimoireLine: 'ここまで きたか……！ グリモアが なきそうな かおをした',
    storyLine:    'みなとの ふるい とうだいが また ともった……むかしの まほうが もどってきた',
    nextWorldHint:'たしざん・ひきざん おうよう……しあげの グリモアだ',
  },

  'm2_04': {
    emoji:        '🗺️',
    nextEmoji:    '🚢',
    image:        null,
    owlLine:      '{name}！ おうようもんだいも へっちゃらだぞ！',
    grimoireLine: 'けいさん おうようの グリモアが もどってきた！',
    storyLine:    'みなとに あつまった ひとびとが よろこんでいる…',
    nextWorldHint:'つぎは みなとの さいごの グリモアだ……いよいよだぞ',
  },

  'm2_04b': {
    emoji:        '🚢',
    nextEmoji:    '🐠',
    image:        null,
    owlLine:      '{name}！ ……よく ここまで きた。ほんものだ',
    grimoireLine: 'ずっと まっていたぞ……！ みなとの グリモアが すべて もどった！',
    storyLine:    'みなとから だいかんせいの てきせんが しゅっぱんした……つぎの うみへ！',
    nextWorldHint:'さんごしょうが よんでいる……あたらしい ぼうけんの はじまりだ！',
  },

  'm2_05': {
    emoji:        '📏',
    nextEmoji:    '💎',
    image:        null,
    owlLine:      '{name}！ ながさの ひみつを みつけたぞ！',
    grimoireLine: 'ながさの グリモアが もどってきた！',
    storyLine:    'さんごしょうに しおの ながれが うまれた…',
    nextWorldHint:'つぎは おおきい かずの グリモアが まっているぞ',
  },

  'm2_06a': {
    emoji:        '💎',
    nextEmoji:    '🦀',
    image:        null,
    owlLine:      '{name}！ おおきい かずも よめるぞ！',
    grimoireLine: 'おおきい かず①の グリモアが もどってきた！',
    storyLine:    'さんごしょうの おくで ほうせきが きらめいた…',
    nextWorldHint:'つぎは もっと おおきい かずの グリモアだ',
  },

  'm2_06b': {
    emoji:        '🦀',
    nextEmoji:    '💧',
    image:        null,
    owlLine:      '{name}！ まんのくらいまで バッチリだぞ！',
    grimoireLine: 'おおきい かず②の グリモアが もどってきた！',
    storyLine:    'さんごのすきまから あおい ひかりが もれてきた…',
    nextWorldHint:'つぎは みずの かさを はかる グリモアだ',
  },

  'm2_08': {
    emoji:        '⚖️',
    nextEmoji:    '⏱️',
    image:        null,
    owlLine:      '{name}！ おもさの グリモアも てにはいったぞ！',
    grimoireLine: 'おもさの グリモアが もどってきた！',
    storyLine:    'さんごしょうの いわが すこし うごいた……なにかが めざめる…',
    nextWorldHint:'つぎは じこくと じかんの グリモアだ',
  },

  'm2_09b': {
    emoji:        '⏰',
    nextEmoji:    '🐙',
    image:        null,
    owlLine:      '{name}！ なんじかんごも わかるぞ！',
    grimoireLine: 'じかんの ながれの グリモアが もどってきた！',
    storyLine:    'さんごしょうに しずかな じかんが もどってきた…',
    nextWorldHint:'つぎは じかんの もんだいを ときあかす グリモアだ',
  },

  'm2_09c': {
    emoji:        '🐙',
    nextEmoji:    '🐠',
    image:        null,
    owlLine:      '{name}！ むずかしい ぶんしょうだいも とけたぞ！',
    grimoireLine: 'つぎの グリモアが さけんでいる……！ はやく きてくれ！',
    storyLine:    'さんごしょうの ぬしが すがたを あらわした……けっせんが ちかい…',
    nextWorldHint:'つぎは さんごしょう さいごの グリモアだ……おわりが みえてきたぞ',
  },

  'm2_09d': {
    emoji:        '🐠',
    nextEmoji:    '✖️',
    image:        null,
    owlLine:      '{name}！ ……さんごしょうを せいはしたぞ。すごい',
    grimoireLine: 'ずっと まっていたぞ……！ さんごしょうの グリモアが すべて もどった！',
    storyLine:    'さんごしょう ぜんたいが にじいろに かがやいた……なかがたの ふねが やってきた！',
    nextWorldHint:'がいようへ とびだせ……くくの まほうが めざめる ときだ！',
  },

  'm2_07': {
    emoji:        '💧',
    nextEmoji:    '⚖️',
    image:        null,
    owlLine:      '{name}！ みずの かさが わかるぞ！',
    grimoireLine: 'みずの かさの グリモアが もどってきた！',
    storyLine:    'さんごしょうの しおが きれいに すんできた…',
    nextWorldHint:'つぎは おもさを はかる グリモアだ',
  },

  'm2_09a': {
    emoji:        '⏱️',
    nextEmoji:    '⏰',
    image:        null,
    owlLine:      '{name}！ なんじなんぷんが よめるぞ！',
    grimoireLine: 'じこくの グリモアが もどってきた！',
    storyLine:    'さんごしょうに とけいの まほうが ひびいた…',
    nextWorldHint:'つぎは じかんの ながれを しる グリモアだ',
  },

  'm2_10a': {
    emoji:        '✖️',
    nextEmoji:    '⚡',
    image:        null,
    owlLine:      '{name}！ 2のだんを おぼえたぞ！',
    grimoireLine: '2のだんの グリモアが もどってきた！',
    storyLine:    'がいように でた！ おおきな なみが まえを ふさいでいる…',
    nextWorldHint:'つぎは 3のだんの グリモアだ……どんどん いくぞ！',
  },

  'm2_10b': {
    emoji:        '⚡',
    nextEmoji:    '🌊',
    image:        null,
    owlLine:      '{name}！ 2のつぎも きたぞ！ すごいな！',
    grimoireLine: '3のだんの グリモアが もどってきた！',
    storyLine:    'なみが ひとつ くずれた……まだまだ さきが あるぞ…',
    nextWorldHint:'4のだんが まっているぞ……まだ とまるな！',
  },

  'm2_10c': {
    emoji:        '🌊',
    nextEmoji:    '⚡',
    image:        null,
    owlLine:      '{name}！ どんどん つよくなってるな！',
    grimoireLine: '4のだんの グリモアが もどってきた！',
    storyLine:    'かぜが かわってきた……むかいかぜが すこし よわまってきた',
    nextWorldHint:'5のだんは とくべつだぞ……おりかえしの なみだ！',
  },

  'm2_10d': {
    emoji:        '⚡',
    nextEmoji:    '🌪️',
    image:        null,
    owlLine:      '{name}！ 5のだんは とくべつだぞ……やったな！',
    grimoireLine: '5のだんの グリモアが もどってきた！',
    storyLine:    'なみのてっぺんに のぼった……さきには もっと おおきな あらしが みえる…',
    nextWorldHint:'6のだん……あらしの かくしんに ふみこむぞ',
  },

  'm2_10e': {
    emoji:        '🌪️',
    nextEmoji:    '🐋',
    image:        null,
    owlLine:      '{name}！ むずかしく なってきたな……でも やったぞ！',
    grimoireLine: '6のだんの グリモアが もどってきた！',
    storyLine:    'あらしの なかで ふねが ゆれる……でも まだ すすめる…！',
    nextWorldHint:'7のだんが まっている……ここが いちばん の やまだ',
  },

  'm2_10f': {
    emoji:        '🐋',
    nextEmoji:    '🦈',
    image:        null,
    owlLine:      '{name}！ 7は こんなんだ……でも きみなら できる！',
    grimoireLine: '7のだんの グリモアが もどってきた！',
    storyLine:    'おおくじらが そばを とおった……ちからを もらった きがする…',
    nextWorldHint:'あと すこしだ！ 8のだんを のりこえろ……！',
  },

  'm2_10g': {
    emoji:        '🦈',
    nextEmoji:    '🌊',
    image:        null,
    owlLine:      '{name}！ あと すこしだ……！ がんばれ！',
    grimoireLine: '8のだんの グリモアが もどってきた！',
    storyLine:    'あらしが よわまってきた……さきに あおぞらが みえてきたぞ…！',
    nextWorldHint:'9のだんを のりこえれば……ほんものの まほうつかいだ！',
  },

  'm2_10h': {
    emoji:        '🌊',
    nextEmoji:    '⚡',
    image:        null,
    owlLine:      '{name}！ 9のだんまで！ ほんものの まほうつかいだ！',
    grimoireLine: '9のだんの グリモアが もどってきた！',
    storyLine:    'あらしが はれた……がいように まぶしい ひかりが さしこんだ！！',
    nextWorldHint:'さいごに 1のだん……これは きっと おどろくぞ！',
  },

  'm2_10i': {
    emoji:        '⚡',
    nextEmoji:    '🐋',
    image:        null,
    owlLine:      '{name}！ 1のだんが いちばん かんたんとは……！ いいぞ！',
    grimoireLine: '1のだん・0のかけざんの グリモアが もどってきた！',
    storyLine:    'なみが しずまり……うみが わらって いるように みえた',
    nextWorldHint:'くくの もんだい……しあげの グリモアが よんでいる',
  },

  'm2_10j': {
    emoji:        '🐋',
    nextEmoji:    '🌟',
    image:        null,
    owlLine:      '{name}！ くくの もんだいも かんぺきだぞ！',
    grimoireLine: 'つぎの グリモアが さけんでいる……！ はやくきてくれ！',
    storyLine:    'がいように おだやかな かぜが ふいた……しあげの とびらが ちかい',
    nextWorldHint:'くく そうまとめ……さいごの かべを のりこえろ！',
  },

  'm2_10k': {
    emoji:        '🌟',
    nextEmoji:    '📐',
    image:        null,
    owlLine:      '{name}！ くく ぜんだんを みにつけたぞ！！',
    grimoireLine: 'くく ぜんだんの グリモアが もどってきた！',
    storyLine:    'しんかい ぜんたいに まほうの ひかりが あふれた…！',
    nextWorldHint:'つぎは かたちの グリモアが まっているよ',
  },

  // ── Zone4: しんかい図形（m2_11 〜 m2_12b）──────────────────────

  'm2_11': {
    emoji:        '🔺',
    nextEmoji:    '🔷',
    image:        null,
    owlLine:      '{name}！ かたちの ひみつを みつけたぞ！',
    grimoireLine: 'さんかくけい・しかくけいの グリモアが もどってきた！',
    storyLine:    'うみそこに かがやく かたちが あらわれた……さんかくと しかく…',
    nextWorldHint:'つぎは ちょうほうけいと せいほうけいの グリモアだ',
  },

  'm2_12': {
    emoji:        '🔷',
    nextEmoji:    '📐',
    image:        null,
    owlLine:      '{name}！ ちょうほうけいも せいほうけいも わかるぞ！',
    grimoireLine: 'ちょうほうけい・せいほうけいの グリモアが もどってきた！',
    storyLine:    'しんかいの かべに うつくしい もよう が きざまれていく…',
    nextWorldHint:'つぎは ずけい そうまとめ……すべての かたちを てにいれろ',
  },

  'm2_12b': {
    emoji:        '📐',
    nextEmoji:    '💎',
    image:        null,
    owlLine:      '{name}！ ……すべての かたちを みやぶった。ほんものだ',
    grimoireLine: 'ずっと まっていたぞ……！ しんかいの ずけい グリモアが すべて もどった！',
    storyLine:    'うみそこに ふしぎな きかがくもようが ひろがった……せかいの かたちが みえる…',
    nextWorldHint:'さらに ふかく……3けたの けいさんが まっているぞ',
  },

  // ── Zone5: しんかい3桁（m2_13a 〜 m2_13c）────────────────────

  'm2_13a': {
    emoji:        '💎',
    nextEmoji:    '🔑',
    image:        null,
    owlLine:      '{name}！ 3けたの たしざんも できるぞ！',
    grimoireLine: '3けた たしざんの グリモアが もどってきた！',
    storyLine:    'あたりが しんと しずまった……ここが しんかいの さいしんぶだ',
    nextWorldHint:'つぎは 3けたの ひきざん……もう すこしで さいしんぶに たどりつく',
  },

  'm2_13b': {
    emoji:        '🔑',
    nextEmoji:    '⚔️',
    image:        null,
    owlLine:      '{name}！ 3けたの ひきざんも とけたぞ！',
    grimoireLine: '3けた ひきざんの グリモアが もどってきた！',
    storyLine:    'しんかいの あつい とびらが すこし ひらいた……おくから ひかりが もれる…',
    nextWorldHint:'3けた ひっさん まとめ……このとびらを こじあけろ！',
  },

  'm2_13c': {
    emoji:        '⚔️',
    nextEmoji:    '🍕',
    image:        null,
    owlLine:      '{name}！ ……3けたの けいさん、かんぜんせいはだ。すごい',
    grimoireLine: 'ずっと まっていたぞ……！ しんかい さいしんぶの グリモアが もどった！',
    storyLine:    'とびらが ひらいた……そのむこうに まったく あたらしい まほうが あった',
    nextWorldHint:'ぶんすうの まほうが よんでいる……あたらしい せかいへ！',
  },

  'm2_14a': {
    emoji:        '🍕',
    nextEmoji:    '🎯',
    image:        null,
    owlLine:      '{name}！ ぶんすうの ひみつを みつけたぞ！',
    grimoireLine: 'ぶんすうの グリモアが もどってきた！',
    storyLine:    'しんかいに ぶんかつの まほうが めざめた…',
    nextWorldHint:'つぎは ぶんすうの たしざんの グリモアだ',
  },

  'm2_14b': {
    emoji:        '🎯',
    nextEmoji:    '💫',
    image:        null,
    owlLine:      '{name}！ ぶんすうの たしざんも できるぞ！',
    grimoireLine: 'ぶんすう たしざんの グリモアが もどってきた！',
    storyLine:    'しんかいで ふたつの ひかりが ひとつに あわさった……あたらしい まほうが うまれた',
    nextWorldHint:'つぎは ぶんすうの ひきざん……わけるまほうを みにつけろ',
  },

  'm2_14c': {
    emoji:        '💫',
    nextEmoji:    '🔮',
    image:        null,
    owlLine:      '{name}！ ひくことも できるぞ！ すごいな！',
    grimoireLine: 'ぶんすう ひきざんの グリモアが もどってきた！',
    storyLine:    'ひかりが わかれて ちいさく かがやいた……ぶんすうの まほうが ふかまる…',
    nextWorldHint:'おうようもんだいが まっているぞ……ぶんすうを つかいこなせ',
  },

  'm2_14d': {
    emoji:        '🔮',
    nextEmoji:    '🌸',
    image:        null,
    owlLine:      '{name}！ おうようもんだいも へっちゃらだぞ！',
    grimoireLine: 'ぶんすう おうようの グリモアが もどってきた！',
    storyLine:    'しんかいに まほうじんが ひかりはじめた……ぶんすうが いきている',
    nextWorldHint:'ぶんすう そうまとめ……これが さいごの とびらだ',
  },

  'm2_14e': {
    emoji:        '🌸',
    nextEmoji:    '⚔️',
    image:        null,
    owlLine:      '{name}！ ……ぶんすう、かんぜんせいは。ほんものだ',
    grimoireLine: 'ずっと まっていたぞ……！ ぶんすうの グリモアが すべて もどった！',
    storyLine:    'しんかいに さくらのような ひかりが まいちった……あたらしい まほうが かいほうされた',
    nextWorldHint:'さあ……そうふくしゅうが はじまるぞ。さいごの ときが ちかい',
  },

  // ── Zone7: そうふくしゅう〜さいしゅうけっせん（m2_15a 〜 m2_15d）──

  'm2_15a': {
    emoji:        '⚔️',
    nextEmoji:    '🌟',
    image:        null,
    owlLine:      '{name}！ よく ここまで きたな……いよいよだぞ',
    grimoireLine: 'そうふくしゅう①の グリモアが もどってきた！',
    storyLine:    'これまでの まほうが ひとつひとつ よみがえる……うみの そこから きはくが ちかづいてくる…',
    nextWorldHint:'もう すこしで さいごだ……たたかいの まえに おさらいを しておけ',
  },

  'm2_15b': {
    emoji:        '🌟',
    nextEmoji:    '💥',
    image:        null,
    owlLine:      '{name}！ すべてを おぼえているな……たのもしいぞ',
    grimoireLine: 'そうふくしゅう②の グリモアが もどってきた！',
    storyLine:    'うみが しずかに ふるえている……グランド・レヴィアサンが めをさます…',
    nextWorldHint:'さいごの おさらい……これが おわれば けっせんだ',
  },

  'm2_15c': {
    emoji:        '💥',
    nextEmoji:    '🏆',
    image:        null,
    owlLine:      '{name}！ さいごの たたかいが はじまるぞ……いくか',
    grimoireLine: 'そうふくしゅう③の グリモアが もどってきた！',
    storyLine:    'しんかい ぜんたいが ふるえた……グランド・レヴィアサンが あらわれた…！',
    nextWorldHint:'グランド・レヴィアサン……さあ、けっせんだ！！',
  },

  'm2_15d': {
    emoji:        '🏆',
    nextEmoji:    '🌈',
    image:        null,
    owlLine:      '{name}！ グレード 2 ぜんぶ クリアだぞ！！！',
    grimoireLine: 'しんかいの グリモアが すべて もどってきた！',
    storyLine:    'やみが とけ…しんかいに あかるい ひかりが さしこんだ……！',
    nextWorldHint:'すべての ぼうけんを やりとげた！ つぎの せかいへ！',
  },
};

// ─────────────────────────────────────────
// フォールバックシーン生成（データ未定義ワールド用）
// ─────────────────────────────────────────

/**
 * WORLD_CLEAR_SCENES にデータがないワールド用の汎用シーンを生成する。
 * worldDef.title を使って「○○の グリモアが もどってきた！」と表示する。
 *
 * @param {Object|null} worldDef - getWorldById() の返り値
 * @returns {Object} シーンオブジェクト
 */
export function buildFallbackScene(worldDef) {
  // タイトルをひらがな的に使えるよう、漢字混入リスクを避けて汎用文言にフォールバック
  const titleHint = worldDef?.title ?? 'グリモア';
  return {
    emoji:        '📖',
    nextEmoji:    '✨',
    image:        null,
    owlLine:      '{name}！ グリモアを とりもどしたぞ！',
    grimoireLine: `${titleHint}の グリモアが もどってきた！`,
    storyLine:    'まちが すこし あかるくなった…',
    nextWorldHint:'つぎの グリモアを さがしにいこう！',
  };
}
