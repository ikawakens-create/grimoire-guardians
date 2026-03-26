/**
 * questData.js - Grimoire Guardians
 * ギルドクエスト定義データ
 *
 * クエスト報酬には家具を含めない。
 * 素材報酬: wood / stone / brick / gem / star_fragment / cloth / paint / crown / cape / magic_orb
 * クエストアイテム: Config.GUILD.QUEST_ITEMS のキー文字列
 *
 * @version 1.0
 * @date 2026-03-25
 */

// ─────────────────────────────────────────────────────────────────────────────
// 型定義（JSDoc 用）
// ─────────────────────────────────────────────────────────────────────────────
/**
 * @typedef {Object} QuestReward
 * @property {'material'|'quest_item'} type
 * @property {string}  id      - 素材 ID またはクエストアイテム ID
 * @property {number}  [amount] - 素材の場合の個数
 */

/**
 * @typedef {Object} QuestRequirement
 * @property {'clear'|'perfect'|'score'|'multi_clear'} type
 * @property {string|string[]} worldId   - 対象ワールド ID（配列で複数指定可）
 * @property {number}  [count]           - クリア回数（multi_clear 時）
 * @property {number}  [minScore]        - 最低正答率（score 時、0.0〜1.0）
 */

/**
 * @typedef {Object} QuestDef
 * @property {string}           id
 * @property {'main'|'sub'|'daily_pool'} type
 * @property {string}           chapter    - 'ch1' | 'ch2' | ... | 'daily'
 * @property {string}           title
 * @property {string}           npcId      - Config.TOWN.NPCS の id
 * @property {string}           openingText  - 受注時のセリフ
 * @property {string}           closingText  - 報告時のセリフ
 * @property {QuestRequirement[]} requirements
 * @property {{ completion: QuestReward[], firstClear?: QuestReward[], perfect?: QuestReward[] }} rewards
 * @property {string[]}         [unlockAfter] - このクエスト解放に必要な完了済みクエスト ID
 */

// ─────────────────────────────────────────────────────────────────────────────
// 第1章「まちに仲間を集めよう」
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const CHAPTER1_QUESTS = [
  {
    id: 'Q1-1',
    type: 'main',
    chapter: 'ch1',
    title: '消えた数字を取り戻せ',
    npcId: 'guild_master',
    openingText:
      'まちの建物から数字が消えている。\n' +
      'パン屋の看板も、道の番地も……。\n' +
      '1〜10の数を取り戻してきてくれ！',
    closingText:
      '看板に数字が戻った！\n' +
      'でも……あっちの数字がまた消えてる？\n' +
      '誰かが妨害しているのかもしれない。',
    requirements: [
      { type: 'clear', worldId: 'world_1' },
      { type: 'clear', worldId: 'world_2' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'wood',  amount: 5 },
        { type: 'material', id: 'stone', amount: 3 },
      ],
      firstClear: [
        { type: 'material', id: 'stone', amount: 2 },
      ],
    },
  },

  {
    id: 'Q1-2',
    type: 'main',
    chapter: 'ch1',
    title: 'タヌキ商人を助けろ',
    npcId: 'guild_master',
    openingText:
      'ギルドに手紙が届いた。\n' +
      '「倉庫の木材が数え間違いで大混乱！\n' +
      'お祭りに間に合わない！助けてくれ」\n' +
      '──タヌキ商人より',
    closingText:
      'よくやった！タヌキ商人が助かった。\n' +
      '「この町に店を出してもいいか？\n' +
      'お前のおかげで決心がついたよ」\n' +
      '……商店と合成屋が開いた！',
    requirements: [
      { type: 'clear', worldId: 'world_4' },
      { type: 'clear', worldId: 'world_5' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'wood',  amount: 5 },
        { type: 'quest_item', id: 'shop_noren' },  // → 商店＆合成屋 解放
      ],
      perfect: [
        { type: 'material', id: 'brick', amount: 2 },
      ],
    },
    unlockAfter: ['Q1-1'],
  },

  {
    id: 'Q1-3',
    type: 'main',
    chapter: 'ch1',
    title: '木の家の鍵をつくろう',
    npcId: 'guild_master',
    openingText:
      'フクロウ先生から設計図のかけらが届いた。\n' +
      'タヌキの木材と合わせれば家の鍵ができる。\n' +
      'あとは「正確な数の力」が必要だ。\n' +
      '10までの数を完全に習得してこい！',
    closingText:
      'できた！🗝️ 木の家の鍵だ！\n' +
      'マイハウスに灯りが灯っているぞ。\n' +
      'さあ、好きなように飾るといい。',
    requirements: [
      { type: 'score', worldId: 'world_6', minScore: 0.8 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'wood',      amount: 3 },
        { type: 'material', id: 'stone',     amount: 3 },
        { type: 'quest_item', id: 'house_key' },  // → 家ビルド解放
      ],
      firstClear: [
        { type: 'material', id: 'brick', amount: 2 },
      ],
    },
    unlockAfter: ['Q1-2'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 第2章「時計塔の謎」
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const CHAPTER2_QUESTS = [
  {
    id: 'Q2-1',
    type: 'main',
    chapter: 'ch2',
    title: '時計塔が狂い始めた',
    npcId: 'owl_librarian',
    openingText:
      'まちの時計塔が突然狂い始めた。\n' +
      '時間がバラバラになると生活が崩れる！\n' +
      'まずは「ちょうど」の時刻から調べてくれ。',
    closingText:
      '1つ目の封印が安定した。\n' +
      'でも塔の深部がまだおかしい……\n' +
      '調べてみると、壁に謎の落書きがあった。',
    requirements: [
      { type: 'clear', worldId: 'world_8a' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'stone', amount: 4 },
        { type: 'material', id: 'paint', amount: 2 },
      ],
    },
    unlockAfter: ['Q1-3'],
  },

  {
    id: 'Q2-2',
    type: 'main',
    chapter: 'ch2',
    title: '針の向こうに誰かいる',
    npcId: 'owl_librarian',
    openingText:
      '落書きは「はんの時刻」で書かれた暗号だった。\n' +
      '解読すれば黒幕の手がかりが掴めるはず。\n' +
      '「はんの時刻」をマスターしてきてくれ！',
    closingText:
      '暗号が解けた！\n' +
      '「ここには昔、もうひとりの守護者がいた」\n' +
      '……いったい誰のことだ？',
    requirements: [
      { type: 'clear', worldId: 'world_8b' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'brick', amount: 3 },
        { type: 'material', id: 'paint', amount: 2 },
      ],
    },
    unlockAfter: ['Q2-1'],
  },

  {
    id: 'Q2-3',
    type: 'main',
    chapter: 'ch2',
    title: '時を守る者の誓い',
    npcId: 'owl_librarian',
    openingText:
      '記録によれば「封印を守るには\n' +
      '時刻を完璧に扱える者だけが鍵を持てる」。\n' +
      '時計の全てを90%以上でクリアせよ！',
    closingText:
      '時計塔の封印が完全に修復された！\n' +
      'フクロウ先生「実は私も昔……時刻が苦手で\n' +
      'この町を去ろうとしたことがあったんだ」\n' +
      '図書館に新しい本棚エリアが開いた。',
    requirements: [
      { type: 'score', worldId: 'world_8a',  minScore: 0.9 },
      { type: 'score', worldId: 'world_8b',  minScore: 0.9 },
      { type: 'score', worldId: 'world_8c',  minScore: 0.9 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'gem',   amount: 2 },
        { type: 'quest_item', id: 'clock_gear' },
      ],
      perfect: [
        { type: 'material', id: 'star_fragment', amount: 1 },
      ],
    },
    unlockAfter: ['Q2-2'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 第3章「くりあがりの魔物」
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const CHAPTER3_QUESTS = [
  {
    id: 'Q3-1',
    type: 'main',
    chapter: 'ch3',
    title: '9のせかいが崩れていく',
    npcId: 'guild_master',
    openingText:
      '9のせかいで魔力が暴走している！\n' +
      '「9＋何か」の計算が限界を超えると爆発する。\n' +
      '今すぐ食い止めてくれ！',
    closingText:
      '食い止めた！……でも完全じゃない。\n' +
      '魔物が再生能力を使って復活しかけてる。\n' +
      'トドメを刺すにはもう一度挑む必要がある！',
    requirements: [
      { type: 'multi_clear', worldId: 'world_10a', count: 2 },  // 再生能力 → 2回
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'gem',   amount: 2 },
        { type: 'material', id: 'stone', amount: 3 },
      ],
    },
    unlockAfter: ['Q2-3'],
  },

  {
    id: 'Q3-2',
    type: 'main',
    chapter: 'ch3',
    title: '連鎖！8・7・6のせかい',
    npcId: 'guild_master',
    openingText:
      '9を制したと思ったら今度は8・7・6が連鎖暴走中！\n' +
      '魔王が糸を引いているのか？\n' +
      '全て食い止めてくれ！',
    closingText:
      'やった……でも、なぜ連鎖が止まらなかったんだ？\n' +
      '魔王直属の将軍がいる気がする。\n' +
      'まだ先がある。気を引き締めろ。',
    requirements: [
      { type: 'multi_clear', worldId: 'world_10b', count: 2 },
      { type: 'clear',       worldId: 'world_10c' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'gem',   amount: 3 },
        { type: 'material', id: 'brick', amount: 3 },
      ],
    },
    unlockAfter: ['Q3-1'],
  },

  {
    id: 'Q3-3',
    type: 'main',
    chapter: 'ch3',
    title: 'くりあがりの将軍を倒せ',
    npcId: 'guild_master',
    openingText:
      '現れた！魔王直属の「くりあがりの将軍」だ！\n' +
      'こいつを倒すには全てのくりあがりを\n' +
      '完璧（90%以上）に習得する必要がある。\n' +
      '将軍の鎧は正解するたびに砕けていく！',
    closingText:
      '将軍を倒した！\n' +
      '将軍「……魔王はくりさがりの迷宮にいる……」\n' +
      '「くりあがりの達人」の称号を授ける！\n' +
      'まだ先は長い。覚悟しろ。',
    requirements: [
      { type: 'score', worldId: 'world_10a', minScore: 0.9 },
      { type: 'score', worldId: 'world_10b', minScore: 0.9 },
      { type: 'score', worldId: 'world_10c', minScore: 0.9 },
      { type: 'score', worldId: 'world_10d', minScore: 0.9 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'star_fragment', amount: 3 },
        { type: 'material', id: 'gem',           amount: 3 },
        { type: 'quest_item', id: 'flame_emblem' },
      ],
      firstClear: [
        { type: 'material', id: 'magic_orb', amount: 1 },
      ],
    },
    unlockAfter: ['Q3-2'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// サブクエスト：タヌキ商人の3部作
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const TANUKI_QUESTS = [
  {
    id: 'TQ-1',
    type: 'sub',
    chapter: 'sub_tanuki',
    title: 'ありがとう、また来てくれ',
    npcId: 'tanuki_merchant',
    openingText:
      '商店の開店初日。タヌキが少し寂しそうだ。\n' +
      '「実はワシ……昔から算数が苦手でな。\n' +
      'それで……大事な人を傷つけたことがある」\n' +
      '「でも今日はいい日だ。また来てくれよ」',
    closingText:
      '「お前と話してたら、少し楽になったよ。\n' +
      'これ、今日の特別サービスだ。受け取ってくれ」',
    requirements: [
      { type: 'clear', worldId: 'world_4' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'wood',  amount: 3 },
        { type: 'material', id: 'cloth', amount: 2 },
      ],
    },
    unlockAfter: ['Q1-2'],
  },

  {
    id: 'TQ-2',
    type: 'sub',
    chapter: 'sub_tanuki',
    title: '昔のワシは逃げてた',
    npcId: 'tanuki_merchant',
    openingText:
      '商店の奥に変な箱がある。\n' +
      '鍵はかかっていないのに、なぜか開かない。\n' +
      'ひきざんをクリアして「開く力」を見せてくれ。',
    closingText:
      '箱の中には古い日記が。\n' +
      '「算数の間違いで、大切な荷物を全部なくした。\n' +
      'それ以来、ずっと逃げてきた……」\n' +
      'タヌキが遠くを見ながらつぶやいた。',
    requirements: [
      { type: 'score', worldId: 'world_5', minScore: 0.8 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'cloth', amount: 3 },
        { type: 'material', id: 'paint', amount: 2 },
      ],
    },
    unlockAfter: ['TQ-1'],
  },

  {
    id: 'TQ-3',
    type: 'sub',
    chapter: 'sub_tanuki',
    title: 'もう逃げない',
    npcId: 'tanuki_merchant',
    openingText:
      'タヌキが子供たちに計算を教えようとしている。\n' +
      'でもうまく説明できない。\n' +
      'お前が手本を見せて、タヌキを助けてやれ！',
    closingText:
      '子供たちが「わかった！！」と喜んだ。\n' +
      'タヌキが静かに言った。\n' +
      '「……ありがとう。ワシも今日から守護者じゃ」\n' +
      '商店に「秘密の品揃え」が追加された！',
    requirements: [
      { type: 'score', worldId: 'world_12a', minScore: 0.8 },
      { type: 'score', worldId: 'world_12b', minScore: 0.8 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'crown', amount: 1 },
        { type: 'material', id: 'cloth', amount: 3 },
      ],
      firstClear: [
        { type: 'material', id: 'magic_orb', amount: 1 },
      ],
    },
    unlockAfter: ['TQ-2'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 第4章「くりさがりの迷宮」
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const CHAPTER4_QUESTS = [
  {
    id: 'Q4-1',
    type: 'main',
    chapter: 'ch4',
    title: '迷宮への入口',
    npcId: 'guild_master',
    openingText:
      '将軍の言い残した言葉通り、\n' +
      'くりさがりの迷宮があった。\n' +
      '入口だけで頭がくらくらする……\n' +
      '10から引く技を磨いて突破してこい！',
    closingText:
      '入口を突破した！\n' +
      'だが……中はもっと深い。\n' +
      '迷宮の罠はまだ先にある。',
    requirements: [
      { type: 'clear', worldId: 'world_11a' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'gem',   amount: 2 },
        { type: 'material', id: 'brick', amount: 2 },
      ],
    },
    unlockAfter: ['Q3-3'],
  },

  {
    id: 'Q4-2',
    type: 'main',
    chapter: 'ch4',
    title: '深部の罠',
    npcId: 'guild_master',
    openingText:
      '罠が連続で発動している！\n' +
      '11・12……13から18まで、\n' +
      'パターンが全部違う。\n' +
      '一つ一つ確実に解除していくしかない！',
    closingText:
      'ほとんどの罠を解除した……\n' +
      'でも深部でまだ何かが動いている。\n' +
      '最深部への道が見えてきた。',
    requirements: [
      { type: 'multi_clear', worldId: 'world_11b', count: 2 },
      { type: 'clear',       worldId: 'world_11c' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'gem',           amount: 3 },
        { type: 'material', id: 'star_fragment', amount: 1 },
      ],
    },
    unlockAfter: ['Q4-1'],
  },

  {
    id: 'Q4-3',
    type: 'main',
    chapter: 'ch4',
    title: 'くりさがりの守護者',
    npcId: 'guild_master',
    openingText:
      '現れた！迷宮の最深部に\n' +
      '「くりさがりの守護者」が待ち構えていた！\n' +
      'こいつを倒すにはくりさがり全てを\n' +
      '完璧に使いこなす必要がある。\n' +
      '全部90%以上でクリアしてこい！',
    closingText:
      '守護者を倒した！！\n' +
      '守護者「……奥に進む前に、一つ教えよう。\n' +
      'やみのまじんの本体は……この先だ……」\n' +
      '最後の道が、ついに開けた。',
    requirements: [
      { type: 'score', worldId: 'world_11a', minScore: 0.9 },
      { type: 'score', worldId: 'world_11b', minScore: 0.9 },
      { type: 'score', worldId: 'world_11c', minScore: 0.9 },
      { type: 'score', worldId: 'world_11d', minScore: 0.9 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'star_fragment', amount: 3 },
        { type: 'material', id: 'magic_orb',     amount: 1 },
        { type: 'material', id: 'crown',         amount: 1 },
      ],
      firstClear: [
        { type: 'material', id: 'magic_orb', amount: 1 },
      ],
    },
    unlockAfter: ['Q4-2'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 合成屋サブクエスト「ガルドとピコの物語」
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const CRAFTSMAN_QUESTS = [
  {
    id: 'MQ-1',
    type: 'sub',
    chapter: 'sub_craftsman',
    title: 'ガルドの弟子になりたい',
    npcId: 'meister',
    openingText:
      '……お、はじめて来たか。\n' +
      'まあ、まずは見てろ。\n' +
      '合成とはな、小さい力を組み合わせて\n' +
      '大きな力にすること。算数と同じだ。',
    closingText:
      'ほぅ……なかなかやるな。\n' +
      'お前なら弟子にしてやってもいいぞ。\n' +
      'ゆっくりと、だが確実に来い。',
    requirements: [
      { type: 'clear', worldId: 'world_9' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'stone', amount: 3 },
        { type: 'material', id: 'brick', amount: 2 },
      ],
    },
    unlockAfter: ['Q1-2'],
  },

  {
    id: 'MQ-2',
    type: 'sub',
    chapter: 'sub_craftsman',
    title: 'ピコの設計図',
    npcId: 'tailor',
    openingText:
      'ねえ聞いて！夢のスキンの設計図を描いたの！\n' +
      'でもガルドじいさんに見せたら\n' +
      '「素材が足りん」って……\n' +
      'お願い！完璧にこなして素材集めを手伝って！',
    closingText:
      'できた〜〜！！これがあれば\n' +
      '最高のスキンが作れる！\n' +
      'ガルドじいさんも褒めてくれたよ！',
    requirements: [
      { type: 'score', worldId: 'world_12c', minScore: 0.8 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'cloth', amount: 3 },
        { type: 'material', id: 'paint', amount: 2 },
      ],
    },
    unlockAfter: ['MQ-1'],
  },

  {
    id: 'MQ-3',
    type: 'sub',
    chapter: 'sub_craftsman',
    title: 'ふたりの最高傑作',
    npcId: 'meister',
    openingText:
      '……ピコが言っとった。\n' +
      'お前のことを「友達」だって。\n' +
      'ワシも久々に、本気で作りたくなった。\n' +
      '最後まで頼むぞ。',
    closingText:
      'ガルド「……できた。これが、最高傑作だ」\n' +
      'ピコ「やった〜〜！！みんなで作ったんだよ！\n' +
      'これ、ずっと飾っておこうね！！」',
    requirements: [
      { type: 'clear', worldId: 'world_16a' },
      { type: 'clear', worldId: 'world_16b' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'magic_orb',     amount: 1 },
        { type: 'material', id: 'crown',         amount: 1 },
        { type: 'material', id: 'star_fragment', amount: 3 },
      ],
      firstClear: [
        { type: 'material', id: 'cape', amount: 1 },
      ],
    },
    unlockAfter: ['MQ-2'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// デイリーミッション プール
// （毎日 Config.GUILD.DAILY_MISSION_COUNT 件をランダムに選出）
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const DAILY_POOL = [
  {
    id: 'D-any-clear',
    type: 'daily_pool',
    chapter: 'daily',
    title: '今日の特訓',
    npcId: 'guild_master',
    openingText: '好きなワールドを1回クリアしてこい！',
    closingText: '今日の特訓完了だ。この調子で続けろ！',
    requirements: [
      { type: 'clear', worldId: '__any__' },  // 任意のワールド
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'wood',  amount: 2 },
        { type: 'material', id: 'stone', amount: 1 },
      ],
    },
  },

  {
    id: 'D-score-80',
    type: 'daily_pool',
    chapter: 'daily',
    title: '精鋭任務',
    npcId: 'guild_master',
    openingText: '正答率80%以上で任意のワールドをクリアせよ！',
    closingText: '正確さが増してきたな。さすがだ！',
    requirements: [
      { type: 'score', worldId: '__any__', minScore: 0.8 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'stone', amount: 3 },
        { type: 'material', id: 'brick', amount: 1 },
      ],
    },
  },

  {
    id: 'D-score-100',
    type: 'daily_pool',
    chapter: 'daily',
    title: '完璧なる挑戦',
    npcId: 'guild_master',
    openingText: 'パーフェクト（100%）でクリアしてみせろ！',
    closingText: '完璧だ！グリモアが輝いているぞ！',
    requirements: [
      { type: 'score', worldId: '__any__', minScore: 1.0 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'gem',   amount: 1 },
        { type: 'material', id: 'brick', amount: 2 },
      ],
    },
  },

  {
    id: 'D-clock',
    type: 'daily_pool',
    chapter: 'daily',
    title: 'フクロウ先生の宿題',
    npcId: 'owl_librarian',
    openingText: '時計のワールドをどれかクリアしてきなさい。\n時刻を正確に読めることは大切なことよ。',
    closingText: 'よくできました。これからも続けなさい。',
    requirements: [
      { type: 'clear', worldId: '__clock__' },  // 時計系ワールド限定
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'paint', amount: 2 },
        { type: 'material', id: 'stone', amount: 2 },
      ],
    },
  },

  {
    id: 'D-tanuki-help',
    type: 'daily_pool',
    chapter: 'daily',
    title: 'タヌキの手伝い',
    npcId: 'tanuki_merchant',
    openingText: '計算ワールドを1つクリアして、腕試しをしてきな！',
    closingText: 'ありがとう！お礼に素材を置いといたぞ。',
    requirements: [
      { type: 'clear', worldId: '__any__' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'cloth', amount: 2 },
        { type: 'material', id: 'wood',  amount: 2 },
      ],
    },
  },

  // ── 合成屋NPCデイリー（既存と内容が被らないもののみ）─────────────────
  {
    id: 'D-tailor-double',
    type: 'daily_pool',
    chapter: 'daily',
    title: 'ピコのおつかい',
    npcId: 'tailor',
    openingText:
      '素材が2つ必要なの！\n' +
      'どれでもいいから2回クリアしてきて！',
    closingText:
      'ありがとう〜〜！！これで作れる！！',
    requirements: [
      { type: 'multi_clear', worldId: '__any__', count: 2 },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'cloth', amount: 2 },
        { type: 'material', id: 'gem',   amount: 1 },
      ],
    },
  },

  {
    id: 'D-shape',
    type: 'daily_pool',
    chapter: 'daily',
    title: 'フクロウ先生の形の宿題',
    npcId: 'owl_librarian',
    openingText:
      '「かたちあそび」の世界へ行きなさい。\n' +
      '形の知識は全ての学問の基礎よ。',
    closingText:
      'よくできました。形を覚えておくと、\n' +
      'いつか必ず役に立つわよ。',
    requirements: [
      { type: 'clear', worldId: 'world_13' },
    ],
    rewards: {
      completion: [
        { type: 'material', id: 'paint', amount: 2 },
        { type: 'material', id: 'gem',   amount: 1 },
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 全クエスト一覧（ID → 定義の Map）
// ─────────────────────────────────────────────────────────────────────────────

/** @type {QuestDef[]} */
export const ALL_QUESTS = [
  ...CHAPTER1_QUESTS,
  ...CHAPTER2_QUESTS,
  ...CHAPTER3_QUESTS,
  ...CHAPTER4_QUESTS,
  ...TANUKI_QUESTS,
  ...CRAFTSMAN_QUESTS,
];

/**
 * ID でクエスト定義を取得する
 * @param {string} id
 * @returns {QuestDef|undefined}
 */
export function getQuestById(id) {
  return ALL_QUESTS.find(q => q.id === id);
}

/**
 * デイリープールを取得する
 * @returns {QuestDef[]}
 */
export function getDailyPool() {
  return DAILY_POOL;
}

export default ALL_QUESTS;
