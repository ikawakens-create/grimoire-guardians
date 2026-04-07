/**
 * skinItems.js - Grimoire Guardians
 * スキン定義データ（全24種 + デフォルト）
 *
 * 拡張方法: SKINS 配列末尾に追記するだけでOK（seasonal等）
 * 画像: assets/skins/{id}.png（240×360px 透過PNG、Gemini生成）
 *
 * @version 1.0
 * @date 2026-03-01
 */

// ─── 定数 ──────────────────────────────────────────────────
export const SKIN_RARITY = {
  COMMON:     1,  // ★
  UNCOMMON:   2,  // ★★
  RARE:       3,  // ★★★
  SUPER_RARE: 4,  // ★★★★
};

export const SKIN_CATEGORY = {
  COOL:   'cool',
  CUTE:   'cute',
  FUNNY:  'funny',
  SECRET: 'secret',
};

export const SKIN_OBTAIN = {
  FREE:      'free',       // 最初から解放
  CRAFT:     'craft',      // テイラークラフト
  FRAGMENT:  'fragment',   // かけら×3で解放
  STREAK:    'streak',     // ログイン連続日数
  MILESTONE: 'milestone',  // 進捗マイルストーン
  TREASURE:  'treasure',   // 宝箱直接ドロップ（超レア）
  SEASONAL:  'seasonal',   // 季節イベント（将来実装）
};

export const FRAGMENTS_NEEDED = 3;

// ─── スキン定義（拡張は配列末尾に追記） ────────────────────
export const SKINS = [

  // ──────────────────────────────────
  // デフォルト（カウント外・常時解放）
  // ──────────────────────────────────
  {
    id:          'default',
    name:        'デフォルトまどうし',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/default.png',
    emoji:       '🧙',
    description: 'グリモアガーディアンの基本スタイル。すべての冒険はここから始まる。',
    obtain:      { method: SKIN_OBTAIN.FREE },
    reactions: {
      correct: 'やったぞ！',
      wrong:   'つぎは まけない！',
      combo3:  '3かいも せいかい！',
      combo5:  '5れんぞく！まほうが あふれる！',
      greet:   '{name}！{n}にちめだぞ！きょうも いくか！',
    },
    voiceFreq: 300,
  },

  // ──────────────────────────────────
  // ⚔️ つよい系（6種）
  // ──────────────────────────────────
  {
    id:          'knight_silver',
    name:        'きらきらナイト',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/knight_silver.png',
    emoji:       '🛡️',
    description:  '銀色にかがやく全身鎧！大きなたてとかがやく剣を持つ正統派ヒーロー。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 1,
                   recipe: { stone: 5, cloth: 3 } },
    reactions: {
      correct: 'たてで まもった！',
      wrong:   'もう いちど！',
      combo3:  '3れんぞく！ほこらしい！',
      combo5:  '5れんぞく！きしどうの ちかい！',
      greet:   '{name}！{n}にちも まもるぞ！',
    },
    voiceFreq: 260,
  },
  {
    id:          'mage_fire',
    name:        'ほのおのまどうし',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/mage_fire.png',
    emoji:       '🔥',
    description: '燃えさかる炎をまとった赤いローブ。杖からもほのおが吹き出てる！',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 1,
                   recipe: { wood: 5, paint: 3 } },
    reactions: {
      correct: 'もえるぜ！',
      wrong:   'つぎは もやす！',
      combo3:  'ファイヤー！3れんぞく！',
      combo5:  '5かいも！もえすぎて きえそう！🔥',
      greet:   '{name}！{n}にちめ！きょうも もやすか！',
    },
    voiceFreq: 280,
  },
  {
    id:          'mage_ice',
    name:        'こおりのまどうし',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/mage_ice.png',
    emoji:       '❄️',
    description: '氷の結晶がかがやく白銀のローブ。体のまわりに雪の結晶がただよってる。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 2,
                   recipe: { gem: 3, cloth: 4 } },
    reactions: {
      correct: 'こおった！せいかい！',
      wrong:   'とけるな…',
      combo3:  'れんぞく！こちこち！',
      combo5:  '5れんぞく…ぜんぶ こおらせた',
      greet:   '{name}…{n}にちめ だね',
    },
    voiceFreq: 340,
  },
  {
    id:          'ninja_dark',
    name:        'くらやみのニンジャ',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/ninja_dark.png',
    emoji:       '🥷',
    description: '全身まっ黒の忍装束。手裏剣を2こ持っていて、目だけが赤く光ってる。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 2,
                   recipe: { cloth: 6, paint: 2 } },
    reactions: {
      correct: 'シュッ！',
      wrong:   '…つぎがある',
      combo3:  '3れんぞく！にんじゃ！',
      combo5:  '5れんぞく…かげのように うごく',
      greet:   '{name}、{n}にちめ…忍',
    },
    voiceFreq: 240,
  },
  {
    id:          'knight_dragon',
    name:        'りゅうのきし',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/knight_dragon.png',
    emoji:       '🐉',
    description: '背中にドラゴンの翼が生えた赤い鎧！ランスを持ち、炎をまとっている。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 3,
                   recipe: { gem: 5, magic_orb: 1 } },
    reactions: {
      correct: 'ドラゴンの ちから！',
      wrong:   'まだまだ！',
      combo3:  '3れんぞく！炎を まとう！',
      combo5:  '5れんぞく！りゅうが めざめた！🐉',
      greet:   '{name}！{n}にちも つよくなれ！',
    },
    voiceFreq: 250,
  },
  {
    id:          'swordsman_thunder',
    name:        'かみなりの剣士',
    category:    SKIN_CATEGORY.COOL,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/swordsman_thunder.png',
    emoji:       '⚡',
    description: '紫の稲妻をまとった漆黒の剣士。全身に雷が走り、かっこよさMAX！',
    obtain:      { method: SKIN_OBTAIN.FRAGMENT, fragmentId: 'swordsman_thunder' },
    reactions: {
      correct: 'ビリビリ！せいかい！',
      wrong:   'かみなり おとした！',
      combo3:  '3れんぞく！いなずま！',
      combo5:  '5れんぞく！でんげきが とまらない！⚡',
      greet:   '{name}！{n}にちも かっとべ！',
    },
    voiceFreq: 290,
  },

  // ──────────────────────────────────
  // 🌸 かわいい系（6種）
  // ──────────────────────────────────
  {
    id:          'dancer_sakura',
    name:        'さくらのおどり子',
    category:    SKIN_CATEGORY.CUTE,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/dancer_sakura.png',
    emoji:       '🌸',
    description: '桜色のおどり子のいしょう。はなリボンをつけて、おうぎを持つ和風スタイル。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 1,
                   recipe: { cloth: 5, paint: 2 } },
    reactions: {
      correct: 'はなびら！せいかい！',
      wrong:   'つぎは まいあがる！',
      combo3:  '3れんぞく！おどる！🌸',
      combo5:  '5れんぞく！さくらが さく！🌸🌸',
      greet:   '{name}！{n}にちめ♪ いっしょに まいましょ！',
    },
    voiceFreq: 400,
  },
  {
    id:          'rabbit_traveler',
    name:        'うさぎのたびびと',
    category:    SKIN_CATEGORY.CUTE,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/rabbit_traveler.png',
    emoji:       '🐰',
    description: 'うさぎ耳のフードをかぶった旅人スタイル。かわいい短剣もばっちり決まってる。',
    obtain:      { method: SKIN_OBTAIN.STREAK, streakDays: 7 },
    reactions: {
      correct: 'ぴょん！せいかい！',
      wrong:   'ぴょこぴょこ！つぎは まける か！',
      combo3:  '3れんぞく！うさぴょん！',
      combo5:  '5れんぞく！ぴょんぴょんとまらない！🐰',
      greet:   '{name}！{n}にちめの ぼうけん！いくよ！',
    },
    voiceFreq: 420,
  },
  {
    id:          'fairy_princess',
    name:        'ようせいのひめ',
    category:    SKIN_CATEGORY.CUTE,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/fairy_princess.png',
    emoji:       '🧚',
    description: 'はんとうめいの羽がきれいなようせい。花のかんむりをつけて、光るステッキ持ち。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 2,
                   recipe: { cloth: 6, gem: 1, star_fragment: 1 } },
    reactions: {
      correct: 'きらきら！せいかい！',
      wrong:   'つぎは まほうで！',
      combo3:  '3れんぞく！ようせいまほう！',
      combo5:  '5れんぞく！はねが ひかりだした！✨',
      greet:   '{name}♪{n}にちめも いっしょ！',
    },
    voiceFreq: 450,
  },
  {
    id:          'princess_magic',
    name:        'まほうのプリンセス',
    category:    SKIN_CATEGORY.CUTE,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/princess_magic.png',
    emoji:       '👸',
    description: 'キラキラのドレスに大きなティアラ。星のステッキがキラリと光る！',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 2,
                   recipe: { cloth: 5, crown: 1 } },
    reactions: {
      correct: 'ティアラが かがやく！',
      wrong:   'おうじょは まけない！',
      combo3:  '3れんぞく！おしろが よろこぶ！',
      combo5:  '5れんぞく！プリンセスの きせき！👸',
      greet:   '{name}！{n}にちも てつだうよ！',
    },
    voiceFreq: 430,
  },
  {
    id:          'mermaid',
    name:        'マーメイドまほうし',
    category:    SKIN_CATEGORY.CUTE,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/mermaid.png',
    emoji:       '🧜',
    description: '人魚のいしょう（陸でもちゃんと歩けてる笑）。かいの杖のまわりに泡がただよう。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 3,
                   recipe: { gem: 4, star_fragment: 3 } },
    reactions: {
      correct: 'ぷくぷく！せいかい！',
      wrong:   'あわになれ！',
      combo3:  '3れんぞく！なみのまほう！',
      combo5:  '5れんぞく！うみが よろこんでる！🧜',
      greet:   '{name}！{n}にちめも およごう！',
    },
    voiceFreq: 460,
  },
  {
    id:          'ballerina',
    name:        'ふわふわバレリーナ',
    category:    SKIN_CATEGORY.CUTE,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/ballerina.png',
    emoji:       '🩰',
    description: 'ふわふわのチュチュスカートにバレエシューズ。かわいい花束を持っている。',
    obtain:      { method: SKIN_OBTAIN.FRAGMENT, fragmentId: 'ballerina' },
    reactions: {
      correct: 'くるくる！せいかい！',
      wrong:   'バレエ つづける！',
      combo3:  '3れんぞく！ぐらん！ぐらん！',
      combo5:  '5れんぞく！ぶたいに はなが とぶ！🩰',
      greet:   '{name}♪{n}にちめ はじめよ！',
    },
    voiceFreq: 440,
  },

  // ──────────────────────────────────
  // 😄 おもしろ系（6種）
  // ──────────────────────────────────
  {
    id:          'bear_kigurumi',
    name:        'くまの着ぐるみ',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/bear_kigurumi.png',
    emoji:       '🐻',
    description: 'ふわふわのくまコス。おなかがぷっくり、ちっちゃい手がかわいい着ぐるみ。',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 1,
                   recipe: { cloth: 6 } },
    reactions: {
      correct: 'ぐるぐるー！',
      wrong:   'くまさんも がんばる！',
      combo3:  '3かいも！ぐるぐる！',
      combo5:  '5かいも！ぐるぐるぐるぐるー！🐻',
      greet:   '{name}！{n}にちも いっしょだよ！',
    },
    voiceFreq: 380,
  },
  {
    id:          'ragged_adventurer',
    name:        'ボロボロぼうけんしゃ',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/ragged_adventurer.png',
    emoji:       '⛰️',
    description: 'ボロ布の服に傷だらけ。でっかい木の棒を持って、なぜか自信まんまんな顔！',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 1,
                   recipe: { wood: 5, cloth: 2 } },
    reactions: {
      correct: 'こんなの よゆう！',
      wrong:   'ボロボロでも まけるか！',
      combo3:  '3れんぞく！ボロでも つよい！',
      combo5:  '5れんぞく！ボロが きんいろに みえてきた！',
      greet:   '{name}！{n}にちめも つっぱしる！',
    },
    voiceFreq: 320,
  },
  {
    id:          'dinosaur_cos',
    name:        'ティラノコスチューム',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/dinosaur_cos.png',
    emoji:       '🦖',
    description: '本格的なT-REXの着ぐるみ。ちっちゃい手が少しだけ見えてるのがポイント😂',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 2,
                   recipe: { cloth: 8, paint: 2 } },
    reactions: {
      correct: 'がおー！せいかい！',
      wrong:   'がおー…くやしい！',
      combo3:  '3れんぞく！ティラノ あばれる！',
      combo5:  '5れんぞく！ティラノ むてき！がおがお！🦖',
      greet:   '{name}！{n}にちめだ！がおー！',
    },
    voiceFreq: 350,
  },
  {
    id:          'ghost_pajama',
    name:        'おばけパジャマ',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/ghost_pajama.png',
    emoji:       '👻',
    description: '白いシーツのおばけコス。目の穴からちゃんと足が出てるのが見える笑。',
    obtain:      { method: SKIN_OBTAIN.STREAK, streakDays: 14 },
    reactions: {
      correct: 'ひゅー！せいかい！',
      wrong:   'ひゅーん…つぎがある',
      combo3:  '3れんぞく！おばけパワー！',
      combo5:  '5れんぞく！おばけが のりうつった！👻',
      greet:   '{name}…{n}にちめも でるよ…',
    },
    voiceFreq: 360,
  },
  {
    id:          'robot_hakase',
    name:        'ロボットはかせ',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/robot_hakase.png',
    emoji:       '🤖',
    description: '段ボールで作ったロボットのよろい！ボタンがいっぱいで、頭から煙が出てる。',
    obtain:      { method: SKIN_OBTAIN.FRAGMENT, fragmentId: 'robot_hakase' },
    reactions: {
      correct: 'けいさん かんりょう！',
      wrong:   'エラー！さいけいさん！',
      combo3:  '3れんぞく！ロボット むてき！',
      combo5:  '5れんぞく！ロボット かいぞう！🤖',
      greet:   '{name}！{n}にちめ ぶんせき かいし！',
    },
    voiceFreq: 300,
  },
  {
    id:          'tomato_costume',
    name:        'ごきげんなトマト',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/tomato_costume.png',
    emoji:       '🍅',
    description: 'まるまるトマトの着ぐるみ。手足だけ出ていて、とってもごきげんな顔してる。',
    obtain:      { method: SKIN_OBTAIN.STREAK, streakDays: 30 },
    reactions: {
      correct: 'まるまる！せいかい！',
      wrong:   'トマトは まけない！',
      combo3:  '3れんぞく！まるまるー！',
      combo5:  '5れんぞく！ごきげん さいこう！🍅',
      greet:   '{name}！{n}にちめ ごきげん！',
    },
    voiceFreq: 480,
  },

  // ──────────────────────────────────
  // 🔮 ひみつ系（6種）
  // ──────────────────────────────────
  {
    id:          'pirate_captain',
    name:        'かいぞくキャプテン',
    category:    SKIN_CATEGORY.SECRET,
    rarity:      SKIN_RARITY.UNCOMMON,
    image:       'assets/skins/pirate_captain.png',
    emoji:       '🏴‍☠️',
    description: 'ド派手な海賊帽と金の装飾コート。宝の地図を片手にカトラス持ち！',
    obtain:      { method: SKIN_OBTAIN.STREAK, streakDays: 21 },
    reactions: {
      correct: 'うみを せいかい！',
      wrong:   'かいぞく あきらめぬ！',
      combo3:  '3れんぞく！たからみつけた！',
      combo5:  '5れんぞく！ふねが すすむ！🏴‍☠️',
      greet:   '{name}！{n}にちめも うみへ！',
    },
    voiceFreq: 270,
  },
  {
    id:          'astronaut',
    name:        'うちゅうひこうし',
    category:    SKIN_CATEGORY.SECRET,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/astronaut.png',
    emoji:       '🚀',
    description: '本格的な宇宙服とヘルメット。まわりに星がただよっていて、ちょっとぷかぷかしてる。',
    obtain:      { method: SKIN_OBTAIN.MILESTONE, milestoneId: 'worlds_16_clear' },
    reactions: {
      correct: 'こうか せいこう！',
      wrong:   'つぎの きどうで！',
      combo3:  '3れんぞく！ほしを こえた！',
      combo5:  '5れんぞく！うちゅうに とどいた！🚀',
      greet:   '{name}！{n}にちめ しゅっぱつ！',
    },
    voiceFreq: 310,
  },
  {
    id:          'rainbow_witch',
    name:        'にじのまじょ',
    category:    SKIN_CATEGORY.SECRET,
    rarity:      SKIN_RARITY.RARE,
    image:       'assets/skins/rainbow_witch.png',
    emoji:       '🌈',
    description: '7色グラデーションのドレスに虹の杖。どこを見てもきれいな色がかがやいてる。',
    obtain:      { method: SKIN_OBTAIN.MILESTONE, milestoneId: 'library_lv3' },
    reactions: {
      correct: 'にじいろ！せいかい！',
      wrong:   'つぎは 7いろで！',
      combo3:  '3れんぞく！にじの まほう！',
      combo5:  '5れんぞく！そらに にじが かかった！🌈',
      greet:   '{name}♪{n}にちめも にじいろ！',
    },
    voiceFreq: 420,
  },
  {
    id:          'royal_eternal',
    name:        'えいえんのおうさま',
    category:    SKIN_CATEGORY.SECRET,
    rarity:      SKIN_RARITY.SUPER_RARE,
    image:       'assets/skins/royal_eternal.png',
    emoji:       '👑',
    description: '全身宝石と金でできた王族のいしょう。あまりのきらびやかさに目がいたくなる…？',
    obtain:      { method: SKIN_OBTAIN.TREASURE },
    reactions: {
      correct: 'えいえんの せいかい！',
      wrong:   'おうさまも まつ！',
      combo3:  '3れんぞく！えいえんの つよさ！',
      combo5:  '5れんぞく！おうこくが ひかる！👑',
      greet:   '{name}！{n}にちめ よくきた！',
    },
    voiceFreq: 230,
  },
  {
    id:          'demon_king',
    name:        'まおう',
    category:    SKIN_CATEGORY.SECRET,
    rarity:      SKIN_RARITY.SUPER_RARE,
    image:       'assets/skins/demon_king.png',
    emoji:       '😈',
    description: '黒マントに悪魔の角、やみのオーラ。でも顔はちょっとかわいい…強さの証明スキン！',
    obtain:      { method: SKIN_OBTAIN.MILESTONE, milestoneId: 'all_worlds_clear' },
    reactions: {
      correct: 'やみが こたえた！',
      wrong:   'ふふ…つぎは まける か？',
      combo3:  '3れんぞく！やみのちから！',
      combo5:  '5れんぞく…おまえは まおうを こえるか',
      greet:   '{name}…{n}にちめも きたのか',
    },
    voiceFreq: 220,
  },
  {
    id:          'grimoire_guardian',
    name:        'グリモアガーディアン',
    category:    SKIN_CATEGORY.SECRET,
    rarity:      SKIN_RARITY.SUPER_RARE,
    image:       'assets/skins/grimoire_guardian.png',
    emoji:       '📖',
    description: 'グリモアガーディアンの真の姿。魔法書をまとった守護者——これがゲームの象徴だ。',
    obtain:      { method: SKIN_OBTAIN.MILESTONE, milestoneId: 'all_facilities_max' },
    reactions: {
      correct: 'グリモアが ひかる！',
      wrong:   'まだ まけない…',
      combo3:  '3れんぞく！グリモアの おまもり！',
      combo5:  '5れんぞく！すべての グリモアが めざめる！📖',
      greet:   '{name}！{n}にちめも まもる！',
    },
    voiceFreq: 260,
  },
];

// ─── ユーティリティ ────────────────────────────────────────

/** 全スキン（デフォルト除く24種） */
export const COLLECTIBLE_SKINS = SKINS.filter(s => s.id !== 'default');

/** IDでスキンを取得 */
export function getSkinById(id) {
  return SKINS.find(s => s.id === id) || SKINS[0];
}

/** カテゴリでフィルタ */
export function getSkinsByCategory(category) {
  return COLLECTIBLE_SKINS.filter(s => s.category === category);
}

/** レアリティラベル */
export const RARITY_LABEL = {
  [SKIN_RARITY.COMMON]:     '★ コモン',
  [SKIN_RARITY.UNCOMMON]:   '★★ アンコモン',
  [SKIN_RARITY.RARE]:       '★★★ レア',
  [SKIN_RARITY.SUPER_RARE]: '★★★★ ちょうレア！',
};

/** 入手方法の説明テキスト */
export function getObtainHint(skin) {
  const o = skin.obtain;
  switch (o.method) {
    case SKIN_OBTAIN.FREE:      return '最初から持ってるよ！';
    case SKIN_OBTAIN.CRAFT:     return `テイラーLv${o.tailorLevel}でクラフト`;
    case SKIN_OBTAIN.FRAGMENT:  return `宝箱のかけら×${FRAGMENTS_NEEDED}で合成`;
    case SKIN_OBTAIN.STREAK:    return `${o.streakDays}日れんぞくログイン`;
    case SKIN_OBTAIN.MILESTONE: return 'とくべつな実績で解放';
    case SKIN_OBTAIN.TREASURE:  return '宝箱から直接ドロップ（超レア！）';
    case SKIN_OBTAIN.SEASONAL:  return 'きせつのイベントで入手';
    default: return '？？？';
  }
}

export default SKINS;
