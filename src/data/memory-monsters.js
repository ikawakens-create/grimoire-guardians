/**
 * memory-monsters.js - Grimoire Guardians
 * きおくのいせき モンスター定義（全40体）
 *
 * ※ モンスター名は現在すべて（仮）です。Geminiで画像生成後に正式名称に変更してください。
 * ※ 画像は assets/icons/monsters/{id}.png に配置すると自動で絵文字から差し替わります。
 *
 * レイヤー構成:
 *   Layer 1 (はじまりの遺跡): world_1〜world_8a  → mon_01〜mon_10 （可愛い・小さい）
 *   Layer 2 (ふかまりの遺跡): world_8b〜world_11c → mon_11〜mon_20 （個性的・ユニーク）
 *   Layer 3 (しんかの遺跡):   world_11d〜world_15a → mon_21〜mon_30 （強い・カッコいい）
 *   Layer 4 (おくのしん):     world_15b〜world_16b + 秘密7体 → mon_31〜mon_40 （伝説）
 *
 * 解放条件（レイヤーアンロック）:
 *   Layer 2: Layer 1 を 6体以上コレクト
 *   Layer 3: Layer 2 を 6体以上コレクト
 *   Layer 4: Layer 3 を 8体以上コレクト
 *
 * @version 1.0
 * @date 2026-02-26
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   emoji: string,
 *   worldId: string|null,
 *   layer: 1|2|3|4,
 *   rarity: 'common'|'uncommon'|'rare'|'legendary',
 *   flavorText: string,
 * }} MonsterDef
 */

/** @type {MonsterDef[]} */
export const MONSTERS = [
  // ══════════════════════════════════════════
  // LAYER 1 — はじまりの遺跡（可愛い・小さい）
  // ══════════════════════════════════════════
  {
    id: 'mon_01',
    name: '（仮）カズカメ',
    emoji: '🐢',
    worldId: 'world_1',
    layer: 1,
    rarity: 'common',
    flavorText: '甲羅に1〜5の数字が刻まれた古代カメ。ゆっくり歩きながら数を数えるのが得意。',
  },
  {
    id: 'mon_02',
    name: '（仮）ロッポリス',
    emoji: '🐰',
    worldId: 'world_2',
    layer: 1,
    rarity: 'common',
    flavorText: '6本の耳でぴょんぴょん数を数えるウサギ竜。10まで数えると大喜びする。',
  },
  {
    id: 'mon_03',
    name: '（仮）バンバンゲロ',
    emoji: '🐸',
    worldId: 'world_3',
    layer: 1,
    rarity: 'common',
    flavorText: 'いつも行列の1番を目指すちびカエル。「わたしがいちばん！」が口癖。',
  },
  {
    id: 'mon_04',
    name: '（仮）タスプタ',
    emoji: '🦕',
    worldId: 'world_4',
    layer: 1,
    rarity: 'common',
    flavorText: '＋の形の羽で飛ぶ、足し算大好きの翼竜。足せるものは全部足してしまう。',
  },
  {
    id: 'mon_05',
    name: '（仮）ヒクリス',
    emoji: '🐿️',
    worldId: 'world_5',
    layer: 1,
    rarity: 'common',
    flavorText: '引いた分だけ体が軽くなれるリス竜。荷物を引き算して身軽になるのが得意。',
  },
  {
    id: 'mon_06',
    name: '（仮）ヒクヒキ',
    emoji: '🦔',
    worldId: 'world_5b',
    layer: 1,
    rarity: 'common',
    flavorText: 'ヒクリスの遠い親戚。針で計算を刻む応用引き算の使い手。少し生意気。',
  },
  {
    id: 'mon_07',
    name: '（仮）トーテン',
    emoji: '🐞',
    worldId: 'world_6',
    layer: 1,
    rarity: 'common',
    flavorText: '10個の星模様が輝く古代テントウ虫。出会うと10まで数える幸運の虫。',
  },
  {
    id: 'mon_08',
    name: '（仮）ジュッポン',
    emoji: '🦗',
    worldId: 'world_6b',
    layer: 1,
    rarity: 'common',
    flavorText: '10本の足でリズムよく跳ねるバッタ竜。10の応用問題をカリカリ解く。',
  },
  {
    id: 'mon_09',
    name: '（仮）ハタザウル',
    emoji: '🦖',
    worldId: 'world_7',
    layer: 1,
    rarity: 'common',
    flavorText: 'ちょうど20歩でゴールに着く草食恐竜の子供。20までの数が大好き。',
  },
  {
    id: 'mon_10',
    name: '（仮）チクタン',
    emoji: '🐱',
    worldId: 'world_8a',
    layer: 1,
    rarity: 'uncommon',
    flavorText: 'ぴったりの時間にしか目を開かない古代ネコ竜。時計の針が止まると眠りにつく。',
  },

  // ══════════════════════════════════════════
  // LAYER 2 — ふかまりの遺跡（個性的・ユニーク）
  // ══════════════════════════════════════════
  {
    id: 'mon_11',
    name: '（仮）ハンコロ',
    emoji: '🐙',
    worldId: 'world_8b',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '半分の時間にしか姿を現さない半透明タコ妖怪。「はんじ」の時間帯が大好き。',
  },
  {
    id: 'mon_12',
    name: '（仮）ゴフンカニ',
    emoji: '🦀',
    worldId: 'world_8c',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '5分ごとにハサミを鳴らす時間管理の達人カニ竜。正確さにこだわる。',
  },
  {
    id: 'mon_13',
    name: '（仮）サクランボン',
    emoji: '🌸',
    worldId: 'world_9',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '数をぱかっと二つに分けるのが得意な桜の精霊。さくらんぼ算の守護者。',
  },
  {
    id: 'mon_14',
    name: '（仮）クリアガリ',
    emoji: '🐸',
    worldId: 'world_10a',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '9の壁をぽーんと超えてしまう進化カエル。繰り上がりジャンプが必殺技。',
  },
  {
    id: 'mon_15',
    name: '（仮）ハッチー',
    emoji: '🐝',
    worldId: 'world_10b',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '8本の針を持つ古代ハチ竜。刺さった数が増えていく不思議な力を持つ。',
  },
  {
    id: 'mon_16',
    name: '（仮）シチキツ',
    emoji: '🦊',
    worldId: 'world_10c',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '7にも6にも化けるいたずら好きなキツネ妖怪。繰り上がりの化かし合いが得意。',
  },
  {
    id: 'mon_17',
    name: '（仮）クリオニ',
    emoji: '👹',
    worldId: 'world_10d',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '繰り上がりを自在に操る小さな数字鬼。見た目は怖いが意外と優しい。',
  },
  {
    id: 'mon_18',
    name: '（仮）ヒミツガメ',
    emoji: '🐢',
    worldId: 'world_11a',
    layer: 2,
    rarity: 'uncommon',
    flavorText: '10の秘密を知っているのに、なかなか教えてくれない謎めいたカメの長老。',
  },
  {
    id: 'mon_19',
    name: '（仮）サガリムー',
    emoji: '👻',
    worldId: 'world_11b',
    layer: 2,
    rarity: 'uncommon',
    flavorText: 'するするっと繰り下がって消えてしまう幽霊。11〜12の世界に住んでいる。',
  },
  {
    id: 'mon_20',
    name: '（仮）ジュウハチウス',
    emoji: '🐲',
    worldId: 'world_11c',
    layer: 2,
    rarity: 'rare',
    flavorText: '18の力を秘めた子ドラゴン。まだ本気を出していないが、その目は深い知恵を宿す。',
  },

  // ══════════════════════════════════════════
  // LAYER 3 — しんかの遺跡（強い・カッコいい）
  // ══════════════════════════════════════════
  {
    id: 'mon_21',
    name: '（仮）オウリュウ',
    emoji: '🐉',
    worldId: 'world_11d',
    layer: 3,
    rarity: 'rare',
    flavorText: '繰り下がりを極めた蒼い炎を纏う若き龍。その炎は冷たいのに輝く。',
  },
  {
    id: 'mon_22',
    name: '（仮）トリデンス',
    emoji: '🦈',
    worldId: 'world_12a',
    layer: 3,
    rarity: 'rare',
    flavorText: '3本の尾で3方向を同時に攻撃できる古代深海魚。3つの力を一度に束ねる。',
  },
  {
    id: 'mon_23',
    name: '（仮）トリミナス',
    emoji: '🌊',
    worldId: 'world_12b',
    layer: 3,
    rarity: 'rare',
    flavorText: 'トリデンスのライバル。3方向に引力を放つ深海の支配者。引き算の化身。',
  },
  {
    id: 'mon_24',
    name: '（仮）ミックスリオン',
    emoji: '🦁',
    worldId: 'world_12c',
    layer: 3,
    rarity: 'rare',
    flavorText: 'たしざんとひきざんを瞬時に切り替える百獣の王。混合演算の極意を持つ。',
  },
  {
    id: 'mon_25',
    name: '（仮）カタチゴン',
    emoji: '🌀',
    worldId: 'world_13',
    layer: 3,
    rarity: 'rare',
    flavorText: '三角・四角・丸を自在に変形する幾何学の精霊。形の本質を見抜く眼を持つ。',
  },
  {
    id: 'mon_26',
    name: '（仮）マンモリウス',
    emoji: '🦣',
    worldId: 'world_14a',
    layer: 3,
    rarity: 'rare',
    flavorText: '大きな数を全て記憶に刻む古代マンモスの長老。100の世界の番人。',
  },
  {
    id: 'mon_27',
    name: '（仮）ジュンバントラ',
    emoji: '🐯',
    worldId: 'world_14b',
    layer: 3,
    rarity: 'rare',
    flavorText: '誰より速く大小と順番を見極める古代トラ竜。一瞬で答えを狩り取る。',
  },
  {
    id: 'mon_28',
    name: '（仮）タスドラゴ',
    emoji: '🔥',
    worldId: 'world_14c',
    layer: 3,
    rarity: 'rare',
    flavorText: '大きな数の足し算に特化した紅蓮のドラゴン。炎が数字を照らし答えを導く。',
  },
  {
    id: 'mon_29',
    name: '（仮）ヒクドラゴ',
    emoji: '❄️',
    worldId: 'world_14d',
    layer: 3,
    rarity: 'rare',
    flavorText: 'タスドラゴの宿命のライバル。冷気を操る引き算の龍。二体が揃うと伝説が生まれる。',
  },
  {
    id: 'mon_30',
    name: '（仮）クロノリュウ',
    emoji: '⏰',
    worldId: 'world_15a',
    layer: 3,
    rarity: 'rare',
    flavorText: '背中に時計盤を持ち、時間の流れを自在に操る古代竜。分針が剣になる。',
  },

  // ══════════════════════════════════════════
  // LAYER 4 — おくのしん（伝説）
  // ══════════════════════════════════════════
  {
    id: 'mon_31',
    name: '（仮）クロノジン',
    emoji: '🔮',
    worldId: 'world_15b',
    layer: 4,
    rarity: 'legendary',
    flavorText: '秒の単位まで完全に支配する時の神。クロノリュウが覚醒した究極の姿。',
  },
  {
    id: 'mon_32',
    name: '（仮）ゾウサン',
    emoji: '🐘',
    worldId: 'world_16a',
    layer: 4,
    rarity: 'legendary',
    flavorText: '文章の意味を瞬時に理解する大陸最古の象賢者。言葉の奥に隠れた数を見抜く。',
  },
  {
    id: 'mon_33',
    name: '（仮）ゾウヒキン',
    emoji: '🐘',
    worldId: 'world_16b',
    layer: 4,
    rarity: 'legendary',
    flavorText: 'ゾウサンの兄。引き算文章題を一瞬で解く沈黙の将軍。言葉が少ない分、力が深い。',
  },

  // ─── 秘密の7体（worldId なし：全Layer4コレクト後に解放予定）───
  {
    id: 'mon_34',
    name: '（仮）ゼロガミ',
    emoji: '✨',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: '「ゼロ」という概念を生み出した数学の始祖神。光の柱に包まれ、全身が純白に輝く。',
  },
  {
    id: 'mon_35',
    name: '（仮）インフィニタス',
    emoji: '♾️',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: '終わりのない数を宿す不死の龍。体に∞の紋章が青白く脈動する。倒すことは誰にもできない。',
  },
  {
    id: 'mon_36',
    name: '（仮）プリムス',
    emoji: '🗿',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: '素数の地点だけを踏んで歩く無敵の石鎧巨人。2・3・5・7の刻印が体に輝く。',
  },
  {
    id: 'mon_37',
    name: '（仮）カルキュロン',
    emoji: '⚙️',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: '古代文明が生み出した最終兵器。全身が精密な歯車と数式でできた計算の神。',
  },
  {
    id: 'mon_38',
    name: '（仮）オメガサウリア',
    emoji: '🌟',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: '全ての竜の頂点に立つ龍皇帝。五属性（火・水・雷・光・数）を同時に宿す究極の龍。',
  },
  {
    id: 'mon_39',
    name: '（仮）ケイサンオウ',
    emoji: '👑',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: '算術を極めた人型の神。纏う光が全て数式でできている。解けない問題は存在しない。',
  },
  {
    id: 'mon_40',
    name: '（仮）グリモア',
    emoji: '📖',
    worldId: null,
    layer: 4,
    rarity: 'legendary',
    flavorText: 'グリモア・ガーディアンズの守護者そのもの。古代の魔法書が意志を持ち目覚めた全知の存在。',
  },
];

// ─────────────────────────────────────────
// ユーティリティ
// ─────────────────────────────────────────

/** worldId からモンスターを取得 */
export function getMonsterByWorldId(worldId) {
  return MONSTERS.find(m => m.worldId === worldId) ?? null;
}

/** モンスターIDからモンスターを取得 */
export function getMonsterById(id) {
  return MONSTERS.find(m => m.id === id) ?? null;
}

/** レイヤー番号でモンスター一覧を取得 */
export function getMonstersByLayer(layer) {
  return MONSTERS.filter(m => m.layer === layer);
}

/** 各レイヤーのアンロックに必要なコレクト数 */
export const LAYER_UNLOCK_REQUIREMENTS = {
  1: 0,   // 常に開放
  2: 6,   // Layer 1 を 6体以上
  3: 6,   // Layer 2 を 6体以上
  4: 8,   // Layer 3 を 8体以上（通常モンスターのみ：mon_21〜30）
};

export default MONSTERS;
