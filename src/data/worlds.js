/**
 * worlds.js - Grimoire Guardians
 * ワールド定義データ（Phase 0.1 - 1年生算数）
 *
 * 日本文教出版の教科書単元に基づく。
 * 各ワールドは本棚画面に表示される1枚のカードに対応する。
 *
 * B案採用（2026-02-20 Gemini承認）:
 *   - たしざん・ひきざんをきほん／おうように分割
 *   - 8ワールド・120問構成（各ワールド15問に統一）
 *   - おうようワールドはスキップ不可（必須ルート）
 *
 * ロック解除順: world_1 → 2 → 3 → 4 → 5 → 5b → 6 → 6b
 *
 * @version 2.0
 * @date 2026-02-20
 */

/**
 * Phase 0.1 ワールド一覧（1年生算数 M1-01〜M1-06b）
 * @type {Object[]}
 */
export const WORLDS = [
  // ============================================================
  // world_1: M1-01 なかまづくりと かず（無料）
  // 1〜5の数の認識・数え方・大小比較
  // ============================================================
  {
    id: 'world_1',
    unitId: 'M1-01',
    title: 'なかまづくりと かず',
    description: '1〜5の かずを まなぼう',
    difficulty: 1,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_1.png',
      iconLocked: 'assets/icons/worlds/world_1_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #FFD700, #FFA500)'
    },
    order: 1,
    freeToPlay: true,
    events: []
  },

  // ============================================================
  // world_2: M1-02 10までの かず（無料）
  // 6〜10の数・数の順序・漢数字
  // ============================================================
  {
    id: 'world_2',
    unitId: 'M1-02',
    title: '10までの かず',
    description: '6〜10の かずを まなぼう',
    difficulty: 1,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_2.png',
      iconLocked: 'assets/icons/worlds/world_2_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)'
    },
    order: 2,
    freeToPlay: true,
    events: []
  },

  // ============================================================
  // world_3: M1-03 なんばんめ（無料）
  // 順序・位置の理解（前から・後ろから・何番目）
  // ============================================================
  {
    id: 'world_3',
    unitId: 'M1-03',
    title: 'なんばんめ',
    description: 'じゅんばんと いちを まなぼう',
    difficulty: 1,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_3.png',
      iconLocked: 'assets/icons/worlds/world_3_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #A8E6CF, #7ED321)'
    },
    order: 3,
    freeToPlay: true,
    events: []
  },

  // ============================================================
  // world_4: M1-04 いくつと いくつ（有料）
  // 数の合成・分解（10までの数の組み合わせ）
  // ============================================================
  {
    id: 'world_4',
    unitId: 'M1-04',
    title: 'いくつと いくつ',
    description: 'かずの くみあわせを まなぼう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_4.png',
      iconLocked: 'assets/icons/worlds/world_4_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #F093FB, #F5576C)'
    },
    order: 4,
    freeToPlay: false,
    events: []
  },

  // ============================================================
  // world_5: M1-05 たしざん（1）きほん（有料）
  // 10以内の足し算基礎・足して10になる数・穴埋め算
  // ============================================================
  {
    id: 'world_5',
    unitId: 'M1-05',
    title: 'たしざん（1）きほん',
    description: 'あわせると いくつ？',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_5.png',
      iconLocked: 'assets/icons/worlds/world_5_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)'
    },
    order: 5,
    freeToPlay: false,
    events: []
  },

  // ============================================================
  // world_5b: M1-05b たしざん（1）おうよう（有料・必須）
  // 文章題・穴埋め・式の選択・混合判断
  // ============================================================
  {
    id: 'world_5b',
    unitId: 'M1-05b',
    title: 'たしざん（1）おうよう',
    description: 'もんだいを といてみよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_5b.png',
      iconLocked: 'assets/icons/worlds/world_5b_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)'
    },
    order: 6,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ]
  },

  // ============================================================
  // world_6: M1-06 ひきざん（1）きほん（有料）
  // 10以内の引き算基礎・穴埋め引き算
  // ============================================================
  {
    id: 'world_6',
    unitId: 'M1-06',
    title: 'ひきざん（1）きほん',
    description: 'のこりは いくつ？',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_6.png',
      iconLocked: 'assets/icons/worlds/world_6_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #904AE2, #667eea)'
    },
    order: 7,
    freeToPlay: false,
    events: []
  },

  // ============================================================
  // world_6b: M1-06b ひきざん（1）おうよう（有料・必須・最終）
  // 文章題・ちがいを求める・たし引き混合判断
  // Phase 0.1 最終ワールド（クリアでフェーズ完了）
  // ============================================================
  {
    id: 'world_6b',
    unitId: 'M1-06b',
    title: 'ひきざん（1）おうよう',
    description: 'たし・ひきを つかいこなそう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_6b.png',
      iconLocked: 'assets/icons/worlds/world_6b_locked.png'
    },
    theme: {
      gradient: 'linear-gradient(135deg, #5433FF, #20BDFF)'
    },
    order: 8,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' },
      { triggerAt: -1, type: 'phase_complete' }
    ]
  }
];

/**
 * IDでワールドを取得する
 * @param {string} worldId
 * @returns {Object|undefined}
 */
export function getWorldById(worldId) {
  return WORLDS.find(w => w.id === worldId);
}

export default WORLDS;
