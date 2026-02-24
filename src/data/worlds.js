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
    events: [
      { triggerAt: 10, type: 'omikuji' }   // ロードマップ: おみくじ（10問目）
    ]
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
    events: [
      { triggerAt: 8, type: 'three_paths' } // ロードマップ: 3つの道（8問目）
    ]
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
    events: [
      { triggerAt: 10, type: 'monster' }    // ロードマップ: モンスターバトル（10問目）
    ]
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
    events: [
      { triggerAt: 10, type: 'treasure' }   // ロードマップ: 宝箱チャレンジ（10問目）
    ]
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
  },

  // ============================================================
  // Phase 0.2 スタブワールド（M1-07〜M1-10d）
  // 問題データ未実装のため loader: null。ロック解除チェーン維持用
  // ============================================================

  {
    id: 'world_7',
    unitId: 'M1-07',
    title: '20までの かず',
    description: 'もっと おおきな かずを まなぼう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_7.png',
      iconLocked: 'assets/icons/worlds/world_7_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #00C6FF, #0072FF)' },
    order: 9,
    freeToPlay: false,
    events: []
  },

  {
    id: 'world_8',
    unitId: 'M1-08',
    title: 'なんじ・なんじはん',
    description: 'とけいの よみかたを まなぼう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_8.png',
      iconLocked: 'assets/icons/worlds/world_8_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #11998E, #38EF7D)' },
    order: 10,
    freeToPlay: false,
    events: []
  },

  {
    id: 'world_9',
    unitId: 'M1-09',
    title: 'さくらんぼ算のひみつ',
    description: 'くりあがりの じゅんびを しよう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_9.png',
      iconLocked: 'assets/icons/worlds/world_9_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FFD700, #FF6B6B)' },
    order: 11,
    freeToPlay: false,
    events: []
  },

  {
    id: 'world_10a',
    unitId: 'M1-10a',
    title: 'くりあがり（9のせかい）',
    description: '9を つかった くりあがりに ちょうせん！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_10a.png',
      iconLocked: 'assets/icons/worlds/world_10a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)' },
    order: 12,
    freeToPlay: false,
    events: []
  },

  {
    id: 'world_10b',
    unitId: 'M1-10b',
    title: 'くりあがり（8のせかい）',
    description: '8を つかった くりあがりに ちょうせん！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_10b.png',
      iconLocked: 'assets/icons/worlds/world_10b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FF6B35, #F7C59F)' },
    order: 13,
    freeToPlay: false,
    events: []
  },

  {
    id: 'world_10c',
    unitId: 'M1-10c',
    title: 'くりあがり（7・6のせかい）',
    description: '7と6を つかった くりあがり！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_10c.png',
      iconLocked: 'assets/icons/worlds/world_10c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #F7971E, #FFD200)' },
    order: 14,
    freeToPlay: false,
    events: []
  },

  {
    id: 'world_10d',
    unitId: 'M1-10d',
    title: 'くりあがりのおうよう',
    description: 'くりあがりを つかいこなそう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_10d.png',
      iconLocked: 'assets/icons/worlds/world_10d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #56AB2F, #A8E063)' },
    order: 15,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ]
  },

  // ============================================================
  // Phase 0.2 実装済みワールド（M1-11a〜M1-12c）
  // ============================================================

  // ============================================================
  // world_11a: M1-11a 10からひくひみつ（事前練習）
  // 繰り下がり前の橋渡し。減加法のひらめきを育てる
  // ============================================================
  {
    id: 'world_11a',
    unitId: 'M1-11a',
    title: '10からひくひみつ',
    description: 'くりさがりの じゅんびを しよう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_11a.png',
      iconLocked: 'assets/icons/worlds/world_11a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #1CB5E0, #000851)' },
    order: 16,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ]
  },

  // ============================================================
  // world_11b: M1-11b くりさがり（11・12のせかい）
  // ============================================================
  {
    id: 'world_11b',
    unitId: 'M1-11b',
    title: 'くりさがり（11・12のせかい）',
    description: '11と12の くりさがりに ちょうせん！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_11b.png',
      iconLocked: 'assets/icons/worlds/world_11b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #4776E6, #8E54E9)' },
    order: 17,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ]
  },

  // ============================================================
  // world_11c: M1-11c くりさがり（13〜18のせかい）
  // ============================================================
  {
    id: 'world_11c',
    unitId: 'M1-11c',
    title: 'くりさがり（13〜18のせかい）',
    description: 'もっと おおきな くりさがりに ちょうせん！',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_11c.png',
      iconLocked: 'assets/icons/worlds/world_11c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #360033, #0b8793)' },
    order: 18,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ]
  },

  // ============================================================
  // world_11d: M1-11d くりさがりのおうよう
  // ============================================================
  {
    id: 'world_11d',
    unitId: 'M1-11d',
    title: 'くりさがりのおうよう',
    description: 'くりさがりを つかいこなそう！',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_11d.png',
      iconLocked: 'assets/icons/worlds/world_11d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)' },
    order: 19,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ]
  },

  // ============================================================
  // world_12a: M1-12a 3つのかずのたしざん
  // ============================================================
  {
    id: 'world_12a',
    unitId: 'M1-12a',
    title: '3つのかずのたしざん',
    description: '3つの かずを たしてみよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_12a.png',
      iconLocked: 'assets/icons/worlds/world_12a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #cc2b5e, #753a88)' },
    order: 20,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ]
  },

  // ============================================================
  // world_12b: M1-12b 3つのかずのひきざん
  // ============================================================
  {
    id: 'world_12b',
    unitId: 'M1-12b',
    title: '3つのかずのひきざん',
    description: '3つの かずを ひいてみよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_12b.png',
      iconLocked: 'assets/icons/worlds/world_12b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #8E0E00, #1F1C18)' },
    order: 21,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ]
  },

  // ============================================================
  // world_12c: M1-12c たしざん・ひきざんまじり
  // Phase 0.2 最終実装ワールド
  // ============================================================
  {
    id: 'world_12c',
    unitId: 'M1-12c',
    title: 'たしざん・ひきざんまじり',
    description: 'たし・ひきを つかいこなせ！',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_12c.png',
      iconLocked: 'assets/icons/worlds/world_12c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #373B44, #4286f4)' },
    order: 22,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' },
      { triggerAt: -1, type: 'phase_complete' }
    ]
  },

  // ============================================================
  // world_13: M1-13 かたちあそび（スタブ）
  // ============================================================
  {
    id: 'world_13',
    unitId: 'M1-13',
    title: 'かたちあそび',
    description: 'いろいろな かたちを まなぼう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_13.png',
      iconLocked: 'assets/icons/worlds/world_13_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #e1eec3, #f05053)' },
    order: 23,
    freeToPlay: false,
    events: []
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
