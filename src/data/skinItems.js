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
  },
  {
    id:          'ragged_adventurer',
    name:        'ボロボロぼうけんしゃ',
    category:    SKIN_CATEGORY.FUNNY,
    rarity:      SKIN_RARITY.COMMON,
    image:       'assets/skins/ragged_adventurer.png',
    emoji:       '🪨',
    description: 'ボロ布の服に傷だらけ。でっかい木の棒を持って、なぜか自信まんまんな顔！',
    obtain:      { method: SKIN_OBTAIN.CRAFT, tailorLevel: 1,
                   recipe: { wood: 5, cloth: 2 } },
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
