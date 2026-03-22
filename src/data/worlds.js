/**
 * worlds.js - Grimoire Guardians
 * ワールド定義データ（Phase 0.1 + Phase 0.2 + Phase 0.3）
 *
 * 日本文教出版の教科書単元に基づく。
 * 各ワールドは本棚画面に表示される1枚のカードに対応する。
 *
 * B案採用（2026-02-20 Gemini承認）:
 *   - たしざん・ひきざんをきほん／おうように分割
 *   - 8ワールド・120問構成（各ワールド15問に統一）
 *
 * Phase 0.2 更新（2026-02-24）:
 *   - world_8 を world_8a/8b/8c に分割（なんじ・なんじはん・5分単位）
 *   - world_7〜10cにイベントを追加
 *   - orderを全体で振り直し（合計25ワールド）
 *
 * Phase 0.3 更新（2026-02-26）:
 *   - world_13 にイベント追加
 *   - world_14a〜16b のイベント設定（合計33ワールド）
 *
 * ロック解除順:
 *   Phase 0.1: world_1 → 2 → 3 → 4 → 5 → 5b → 6 → 6b
 *   Phase 0.2: world_7 → 8a → 8b → 8c → 9 → 10a → 10b → 10c → 10d
 *              → 11a → 11b → 11c → 11d → 12a → 12b → 12c → 13
 *   Phase 0.3: world_14a → 14b → 14c → 14d → 15a → 15b → 16a → 16b
 *
 * Phase 2 更新（2026-03-19）:
 *   - Grade 2 深海グリモア m2_01〜m2_15d（42ワールド）追加
 *   - grade / zone フィールド追加（Grade 2 ワールドのみ）
 *
 * @version 5.0
 * @date 2026-03-19
 */

/**
 * Phase 0.1 + Phase 0.2 ワールド一覧
 * @type {Object[]}
 */
export const WORLDS = [
  // ============================================================
  // world_1: M1-01 なかまづくりと かず（無料）
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
    events: [],
    storyDesc: 'やみが かくした さいしょの グリモア！\nかずの きほんを とりもどせ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_2: M1-02 10までの かず（無料）
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
      { triggerAt: 10, type: 'omikuji' }
    ],
    storyDesc: '10までの かずが はいった グリモア！\nかずを かぞえる まほうが もどってくる！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_3: M1-03 なんばんめ（無料）
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
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'じゅんばんの まほうが はいった グリモア！\nどこに いるかが わかるように なるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_4: M1-04 いくつと いくつ（有料）
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
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'たしざんの まほうが はいった グリモア！\nあわせる ちからが めざめる！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_5: M1-05 たしざん（1）きほん（有料）
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
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'ひきざんの まほうが はいった グリモア！\nのこりを かぞえる ちからが もどる！',
    actMoment: null,
    facilityUnlock: 'tanuki',
  },

  // ============================================================
  // world_5b: M1-05b たしざん（1）おうよう（有料・必須）
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
    ],
    storyDesc: 'たしざん おうようの グリモア！\nいろんな もんだいに つかえるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_6: M1-06 ひきざん（1）きほん（有料）
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
    events: [],
    storyDesc: 'ひきざん きほんの グリモア！\nのこりを もとめる まほうが つよくなる！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_6b: M1-06b ひきざん（1）おうよう（有料・Phase 0.1 最終）
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
    ],
    storyDesc: 'ひきざん おうようの グリモア！\nこれで まちに あたらしい なかまが やってくる……！',
    actMoment: 'act2_start',
    facilityUnlock: 'farm',
  },

  // ============================================================
  // Phase 0.2 実装ワールド（M1-07〜M1-12c）
  // ============================================================

  // ============================================================
  // world_7: M1-07 20までの かず
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
    events: [
      { triggerAt: 8, type: 'treasure' }
    ],
    storyDesc: '20までの かずの グリモア！\nおおきい かずが わかるように なるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_8a: M1-08a なんじ（ちょうど）
  // SVGアナログ時計を使った時刻読み（type:'clock'問題）
  // ============================================================
  {
    id: 'world_8a',
    unitId: 'M1-08a',
    title: 'なんじ（ちょうど）',
    description: 'とけいで ちょうどの じこくを よもう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_8a.png',
      iconLocked: 'assets/icons/worlds/world_8a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #11998E, #38EF7D)' },
    order: 10,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'とけいの グリモア！\nじかんを よむ まほうが めざめるぞ！',
    actMoment: null,
    facilityUnlock: 'guildmaster',
  },

  // ============================================================
  // world_8b: M1-08b なんじはん
  // ============================================================
  {
    id: 'world_8b',
    unitId: 'M1-08b',
    title: 'なんじはん',
    description: 'ながいはりが 6を さすとき「はん」',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_8b.png',
      iconLocked: 'assets/icons/worlds/world_8b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #56ab2f, #a8e063)' },
    order: 11,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'なんじはんの グリモア！\nとけいの まほうが ふかまるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_8c: M1-08c ５ふんたんいに ちょうせん！
  // ============================================================
  {
    id: 'world_8c',
    unitId: 'M1-08c',
    title: '５ふんたんいに ちょうせん！',
    description: 'ながいはりが さす かずに ５を かけよう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_8c.png',
      iconLocked: 'assets/icons/worlds/world_8c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #f7971e, #ffd200)' },
    order: 12,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: '5ふんたんいの グリモア！\nとけいを かんぺきに よめるように なるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_9: M1-09 さくらんぼ算のひみつ
  // くりあがりの橋渡し。補数と分解を体得する
  // ============================================================
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
    order: 13,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'さくらんぼ算の グリモア！\nかずを わける まほうが うまれるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_10a: M1-10a くりあがり（9のせかい）
  // ============================================================
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
    order: 14,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'くりあがり（9）の グリモア！\nおおきい たしざんの とびらが ひらく！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_10b: M1-10b くりあがり（8のせかい）
  // ============================================================
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
    order: 15,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'くりあがり（8）の グリモア！\nまほうが どんどん つよくなる！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_10c: M1-10c くりあがり（7・6のせかい）
  // ============================================================
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
    order: 16,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'three_paths' }
    ],
    storyDesc: 'くりあがり（7・6）の グリモア！\nふういんが どんどん かいふくしていく！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_10d: M1-10d くりあがりのおうよう
  // ============================================================
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
    order: 17,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ],
    storyDesc: 'くりあがり おうようの グリモア！\nたしざんの まほうが かんぜんに そなわるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_11a: M1-11a 10からひくひみつ（繰り下がり橋渡し）
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
    order: 18,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'くりさがりの ひみつが はいった グリモア！\nひきざんの おくぎが めざめるぞ！',
    actMoment: null,
    facilityUnlock: null,
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
    order: 19,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'くりさがり（11・12）の グリモア！\nむずかしい ひきざんが できるようになるぞ！',
    actMoment: null,
    facilityUnlock: null,
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
    order: 20,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'くりさがり（13〜18）の グリモア！\nふういんが なかばを こえた……だが なにかが……！',
    actMoment: 'act3_start',
    facilityUnlock: null,
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
    order: 21,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ],
    storyDesc: 'くりさがり おうようの グリモア！\nやみの きりを はねのけろ！',
    actMoment: null,
    facilityUnlock: null,
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
    order: 22,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: '3つの たしざんの グリモア！\nまだ あきらめるな！ ふういんを まもれ！',
    actMoment: null,
    facilityUnlock: null,
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
    order: 23,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: '3つの ひきざんの グリモア！\nやみの こうげきを うけながらも まけるな！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_12c: M1-12c たしざん・ひきざんまじり（Phase 0.2 最終）
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
    order: 24,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'たし・ひきまじりの グリモア！\nりょうほうの まほうで やみに たちむかえ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_13: M1-13 かたちあそび（Phase 0.2 追加）
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
    order: 25,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'treasure' }
    ],
    storyDesc: 'かたちの グリモア！\nまわりの ものを みる まほうが めざめるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // world_13b: M1-13b かたちづくり（Phase 0.2 追加）
  // ============================================================
  {
    id: 'world_13b',
    unitId: 'M1-13b',
    title: 'かたちづくり',
    description: 'さんかく・しかく・まるを まなぼう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_13b.png',
      iconLocked: 'assets/icons/worlds/world_13b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
    order: 26,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'treasure' }
    ],
    storyDesc: 'かたちづくりの グリモア！\nかたちを つかいこなす まほうが そなわるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // ============================================================
  // Phase 0.3 ワールド（M1-14〜M1-16）
  // ============================================================

  // world_14a: M1-14a かずの よみかき（10のまとまり）
  // ============================================================
  {
    id: 'world_14a',
    unitId: 'M1-14a',
    title: 'かずの よみかき',
    description: '10のまとまりで 100まで かぞえよう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14a.png',
      iconLocked: 'assets/icons/worlds/world_14a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    order: 27,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'おおきいかず よみかきの グリモア！\nやみよ……もうすぐ きみの まけだ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_14b: M1-14b かずの じゅんばん と だいしょう
  // ============================================================
  {
    id: 'world_14b',
    unitId: 'M1-14b',
    title: 'かずの じゅんばん',
    description: 'かずを ならべたり くらべたり しよう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14b.png',
      iconLocked: 'assets/icons/worlds/world_14b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #55efc4, #00b894)' },
    order: 28,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'かずの じゅんばんの グリモア！\nきりが はれていく……！ もうすぐ だぞ！！',
    actMoment: 'act4_start',
    facilityUnlock: null,
  },

  // world_14c_1: M1-14c-1 2桁のたしざん①（ひっ算 B+C モード）
  // ============================================================
  {
    id: 'world_14c_1',
    unitId: 'M1-14c-1',
    title: '2桁のたしざん①',
    description: 'ひっ算で いちのくらいから こたえよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14c.png',
      iconLocked: 'assets/icons/worlds/world_14c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)' },
    order: 29,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'ひっ算の グリモア！\nいちのくらいから じゅんばんに こたえよう！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_14c: M1-14c おおきい かず の たしざん
  // ============================================================
  {
    id: 'world_14c',
    unitId: 'M1-14c',
    title: 'おおきいかずの たしざん',
    description: '100まで の たしざんに ちょうせん！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14c.png',
      iconLocked: 'assets/icons/worlds/world_14c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)' },
    order: 29,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'おおきいかず たしざんの グリモア！\nひかりが あつまってきたぞ！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_14c_2: M1-14c-2 2桁のたしざん②（ひっ算 A モード）
  // ============================================================
  {
    id: 'world_14c_2',
    unitId: 'M1-14c-2',
    title: '2桁のたしざん②',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14c.png',
      iconLocked: 'assets/icons/worlds/world_14c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)' },
    order: 30,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'monster' }],
    storyDesc: 'ひっ算 チャレンジ！\nこんどは こたえを まるごと えらぼう！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_14c_big: M1-14c-big 2桁＋2桁のたしざん（B+C のみ）
  // ============================================================
  {
    id: 'world_14c_big',
    unitId: 'M1-14c-big',
    title: '2桁＋2桁のたしざん',
    description: '2桁どうしの たしざんに ちょうせん！',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14c.png',
      iconLocked: 'assets/icons/worlds/world_14c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #e17055, #d63031)' },
    order: 31,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '2桁＋2桁！\nひっ算で しっかり けいさんしよう！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_14c_3dig: M1-14c-3dig 3桁のたしざん（B+C のみ）
  // ============================================================
  {
    id: 'world_14c_3dig',
    unitId: 'M1-14c-3dig',
    title: '3桁のたしざん',
    description: '3桁の たしざんに ちょうせん！',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14c.png',
      iconLocked: 'assets/icons/worlds/world_14c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #d63031, #c0392b)' },
    order: 32,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '3桁の ひっ算！\nひゃくのくらいまで こたえよう！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_10a_1: M1-10a-1 くりあがりのたしざん①（9のせかい）B+C
  // ============================================================
  {
    id: 'world_10a_1',
    unitId: 'M1-10a-1',
    title: 'くりあがり①（9のせかい）',
    description: 'ひっ算で くりあがりを けいさんしよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_10a.png',
      iconLocked: 'assets/icons/worlds/world_10a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)' },
    order: 32,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: 'くりあがりの グリモア！\nひっ算で いちのくらいから こたえよう！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_10a_2: M1-10a-2 くりあがりのたしざん②（9のせかい）A
  // ============================================================
  {
    id: 'world_10a_2',
    unitId: 'M1-10a-2',
    title: 'くりあがり②（9のせかい）',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_10a.png',
      iconLocked: 'assets/icons/worlds/world_10a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)' },
    order: 33,
    freeToPlay: false,
    events: [{ triggerAt: 10, type: 'monster' }],
    storyDesc: 'くりあがりチャレンジ！\nこんどは こたえを まるごと えらぼう！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_10b_1/2 くりあがり8
  // ============================================================
  {
    id: 'world_10b_1',
    unitId: 'M1-10b-1',
    title: 'くりあがり①（8のせかい）',
    description: 'ひっ算で くりあがりを けいさんしよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_10b.png', iconLocked: 'assets/icons/worlds/world_10b_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    order: 34,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '8のせかいの くりあがり！\nひっ算で こたえよう！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_10b_2',
    unitId: 'M1-10b-2',
    title: 'くりあがり②（8のせかい）',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_10b.png', iconLocked: 'assets/icons/worlds/world_10b_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    order: 35,
    freeToPlay: false,
    events: [{ triggerAt: 10, type: 'monster' }],
    storyDesc: '8のせかい チャレンジ！\nこたえを まるごと えらぼう！',
    actMoment: null, facilityUnlock: null,
  },

  // world_10c_1/2 くりあがり7・6
  // ============================================================
  {
    id: 'world_10c_1',
    unitId: 'M1-10c-1',
    title: 'くりあがり①（7・6のせかい）',
    description: 'ひっ算で くりあがりを けいさんしよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_10c.png', iconLocked: 'assets/icons/worlds/world_10c_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #55efc4, #00b894)' },
    order: 36,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '7と6のせかいの くりあがり！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_10c_2',
    unitId: 'M1-10c-2',
    title: 'くりあがり②（7・6のせかい）',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_10c.png', iconLocked: 'assets/icons/worlds/world_10c_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #55efc4, #00b894)' },
    order: 37,
    freeToPlay: false,
    events: [{ triggerAt: 10, type: 'monster' }],
    storyDesc: '7と6のせかい チャレンジ！\nこたえを まるごと えらぼう！',
    actMoment: null, facilityUnlock: null,
  },

  // world_14d: M1-14d おおきい かず の ひきざん
  // ============================================================
  {
    id: 'world_14d',
    unitId: 'M1-14d',
    title: 'おおきいかずの ひきざん',
    description: '100まで の ひきざんに ちょうせん！',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_14d.png',
      iconLocked: 'assets/icons/worlds/world_14d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #fd79a8, #e84393)' },
    order: 30,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'おおきいかず ひきざんの グリモア！\nやみの ちからが よわまってきた！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_14d_1/2 2桁のひきざん
  // ============================================================
  {
    id: 'world_14d_1',
    unitId: 'M1-14d-1',
    title: '2桁のひきざん①',
    description: 'ひっ算で いちのくらいから こたえよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_14d.png', iconLocked: 'assets/icons/worlds/world_14d_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #fd79a8, #e84393)' },
    order: 38,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: 'ひっ算の ひきざん！\nいちのくらいから じゅんばんに こたえよう！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_14d_2',
    unitId: 'M1-14d-2',
    title: '2桁のひきざん②',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_14d.png', iconLocked: 'assets/icons/worlds/world_14d_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #fd79a8, #e84393)' },
    order: 39,
    freeToPlay: false,
    events: [{ triggerAt: 10, type: 'monster' }],
    storyDesc: 'ひっ算 ひきざんチャレンジ！\nこたえを まるごと えらぼう！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_14d_big',
    unitId: 'M1-14d-big',
    title: '2桁－2桁のひきざん',
    description: '2桁どうしの ひきざんに ちょうせん！',
    difficulty: 4,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_14d.png', iconLocked: 'assets/icons/worlds/world_14d_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #e84393, #d63031)' },
    order: 40,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '2桁－2桁！\nひっ算で しっかり けいさんしよう！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_14d_3dig',
    unitId: 'M1-14d-3dig',
    title: '3桁のひきざん',
    description: '3桁の ひきざんを ひっ算で ときあかせ！',
    difficulty: 5,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_14d.png', iconLocked: 'assets/icons/worlds/world_14d_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #d63031, #b71c1c)' },
    order: 41,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '3桁のひきざん！\nひっ算で いちのくらいから じゅんに こたえよう！',
    actMoment: null, facilityUnlock: null,
  },

  // world_11b_1/2 くりさがり11・12
  // ============================================================
  {
    id: 'world_11b_1',
    unitId: 'M1-11b-1',
    title: 'くりさがり①（11・12のせかい）',
    description: 'ひっ算で くりさがりを けいさんしよう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_11b.png', iconLocked: 'assets/icons/worlds/world_11b_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)' },
    order: 41,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: 'くりさがりの グリモア！\nひっ算で いちのくらいから こたえよう！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_11b_2',
    unitId: 'M1-11b-2',
    title: 'くりさがり②（11・12のせかい）',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 3,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_11b.png', iconLocked: 'assets/icons/worlds/world_11b_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)' },
    order: 42,
    freeToPlay: false,
    events: [{ triggerAt: 10, type: 'monster' }],
    storyDesc: 'くりさがりチャレンジ！\nこたえを まるごと えらぼう！',
    actMoment: null, facilityUnlock: null,
  },

  // world_11c_1/2 くりさがり13〜18
  // ============================================================
  {
    id: 'world_11c_1',
    unitId: 'M1-11c-1',
    title: 'くりさがり①（13〜18のせかい）',
    description: 'ひっ算で くりさがりを けいさんしよう！',
    difficulty: 4,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_11c.png', iconLocked: 'assets/icons/worlds/world_11c_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #fab1a0, #e17055)' },
    order: 43,
    freeToPlay: false,
    events: [{ triggerAt: 8, type: 'omikuji' }],
    storyDesc: '13〜18の くりさがり！\nひっ算で いちのくらいから こたえよう！',
    actMoment: null, facilityUnlock: null,
  },
  {
    id: 'world_11c_2',
    unitId: 'M1-11c-2',
    title: 'くりさがり②（13〜18のせかい）',
    description: 'ひっ算の かたちで こたえを えらぼう！',
    difficulty: 4,
    totalQuestions: 15,
    assets: { icon: 'assets/icons/worlds/world_11c.png', iconLocked: 'assets/icons/worlds/world_11c_locked.png' },
    theme: { gradient: 'linear-gradient(135deg, #fab1a0, #e17055)' },
    order: 44,
    freeToPlay: false,
    events: [{ triggerAt: 10, type: 'monster' }],
    storyDesc: '13〜18チャレンジ！\nこたえを まるごと えらぼう！',
    actMoment: null, facilityUnlock: null,
  },

  // world_15a: M1-15a なんじ なんぷん（〜30ぷん）
  // ============================================================
  {
    id: 'world_15a',
    unitId: 'M1-15a',
    title: 'なんじなんぷん①',
    description: 'とけいで 1〜30ぷんを よもう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_15a.png',
      iconLocked: 'assets/icons/worlds/world_15a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)' },
    order: 31,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'なんじなんぷん（前半）の グリモア！\nあと3さつ！ まけるな！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_15b: M1-15b なんじ なんぷん（31ぷん〜）
  // ============================================================
  {
    id: 'world_15b',
    unitId: 'M1-15b',
    title: 'なんじなんぷん②',
    description: 'とけいで 31〜59ぷんを よもう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_15b.png',
      iconLocked: 'assets/icons/worlds/world_15b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #81ecec, #00cec9)' },
    order: 32,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'three_paths' }
    ],
    storyDesc: 'なんじなんぷん（後半）の グリモア！\nあと2さつ！ きぼうの ひかりが みえてきた！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_16a: M1-16a ずを つかって（たしざん 文章題）
  // ============================================================
  {
    id: 'world_16a',
    unitId: 'M1-16a',
    title: 'たしざん もんだい',
    description: 'ずをつかって たしざんの もんだいを とこう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_16a.png',
      iconLocked: 'assets/icons/worlds/world_16a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)' },
    order: 33,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'たしざん ぶんしょうだいの グリモア！\nさいご の 1さつ まで きた……！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // world_16b: M1-16b ずを つかって（ひきざん 文章題）Phase 0.3 最終
  // ============================================================
  {
    id: 'world_16b',
    unitId: 'M1-16b',
    title: 'ひきざん もんだい',
    description: 'ずをつかって ひきざんの もんだいを とこう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/world_16b.png',
      iconLocked: 'assets/icons/worlds/world_16b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #fab1a0, #e17055)' },
    order: 34,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'さいごの グリモア！\nぜんぶ とりもどす！ ふういんを かんせいさせろ！！',
    actMoment: 'finale_unlock',
    facilityUnlock: null,
  },

  // ============================================================
  // Phase 2 Grade 2 深海グリモア ワールド（m2_01〜m2_15d）
  // ============================================================

  // ===== Zone 1 浅瀬（7本）— 筆算 =====

  // m2_01: M2-01 2けたのたしざん きほん（無料）
  {
    id: 'm2_01',
    unitId: 'M2-01',
    grade: 2,
    zone: 'zone1',
    title: '2けたの たしざん（B+C）',
    description: 'いちのくらい・じゅうのくらいを じゅんに こたえよう',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_01.png',
      iconLocked: 'assets/icons/worlds/m2_01_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #00C9FF, #92FE9D)' },
    order: 35,
    freeToPlay: true,
    events: [],
    storyDesc: 'しんかいグリモアの とびらが ひらいた！\nたしざんの まほうを とりもどせ！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 1, pick: 8 }, { step: 2, pick: 7 }],
  },


  // m2_01_a: M2-01 2けたのたしざん（こたえを まるごと かく）
  {
    id: 'm2_01_a',
    unitId: 'M2-01',
    grade: 2,
    zone: 'zone1',
    title: '2けたの たしざん（A）',
    description: 'こたえを まるごと かこう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_01.png',
      iconLocked: 'assets/icons/worlds/m2_01_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #00C9FF, #92FE9D)' },
    order: 36,
    freeToPlay: true,
    events: [],
    storyDesc: 'ひっさんの こたえを まるごと かこう！
つぎの とびらが ひらく！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 4, pick: 10 }, { step: 3, pick: 5 }],
  },
  // m2_02: M2-02 くりあがりのたしざん（無料）
  {
    id: 'm2_02',
    unitId: 'M2-02',
    grade: 2,
    zone: 'zone1',
    title: 'くりあがりたしざん（B+C）',
    description: 'いちのくらいから じゅんに こたえよう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_02.png',
      iconLocked: 'assets/icons/worlds/m2_02_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #11998E, #38EF7D)' },
    order: 36,
    freeToPlay: true,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'くりあがりの なみを こえろ！\nふねは まだ はしりつづける……！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 1, pick: 8 }, { step: 2, pick: 7 }],
  },


  // m2_02_a: M2-02 くりあがりのたしざん（こたえを まるごと かく）
  {
    id: 'm2_02_a',
    unitId: 'M2-02',
    grade: 2,
    zone: 'zone1',
    title: 'くりあがりたしざん（A）',
    description: 'こたえを まるごと かこう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_02.png',
      iconLocked: 'assets/icons/worlds/m2_02_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #11998E, #38EF7D)' },
    order: 37,
    freeToPlay: true,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'くりあがりの こたえを まるごと かこう！
まほうが つよくなる！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 4, pick: 10 }, { step: 3, pick: 5 }],
  },
  // m2_02b: M2-02b 2けた+2けたのたしざん（無料）
  {
    id: 'm2_02b',
    unitId: 'M2-02b',
    grade: 2,
    zone: 'zone1',
    title: '2けた＋2けたの たしざん',
    description: 'おおきな たしざんに ちょうせん！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_02b.png',
      iconLocked: 'assets/icons/worlds/m2_02b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #56AB2F, #A8E063)' },
    order: 37,
    freeToPlay: true,
    events: [
      { triggerAt: 8, type: 'treasure' }
    ],
    storyDesc: 'あさせの かいじゅうが あらわれた！\nたしざんで たちむかえ！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 1, pick: 8 }, { step: 2, pick: 7 }],
  },

  // m2_03: M2-03 2けたのひきざん きほん
  {
    id: 'm2_03',
    unitId: 'M2-03',
    grade: 2,
    zone: 'zone1',
    title: '2けたの ひきざん（B+C）',
    description: 'いちのくらい・じゅうのくらいを じゅんに こたえよう',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_03.png',
      iconLocked: 'assets/icons/worlds/m2_03_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    order: 38,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'ひきざんの まほうが めざめた！\nうみの そこへと すすんでいく……',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 1, pick: 8 }, { step: 2, pick: 7 }],
  },


  // m2_03_a: M2-03 2けたのひきざん（こたえを まるごと かく）
  {
    id: 'm2_03_a',
    unitId: 'M2-03',
    grade: 2,
    zone: 'zone1',
    title: '2けたの ひきざん（A）',
    description: 'こたえを まるごと かこう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_03.png',
      iconLocked: 'assets/icons/worlds/m2_03_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    order: 39,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'ひきざんの こたえを まるごと かこう！
うみの そこへと すすめ！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 4, pick: 10 }, { step: 3, pick: 5 }],
  },
  // m2_03b: M2-03b くりさがりのひきざん
  {
    id: 'm2_03b',
    unitId: 'M2-03b',
    grade: 2,
    zone: 'zone1',
    title: 'くりさがりひきざん（B+C）',
    description: 'いちのくらいから じゅんに こたえよう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_03b.png',
      iconLocked: 'assets/icons/worlds/m2_03b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #4776E6, #8E54E9)' },
    order: 39,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'くりさがりの なみが おそってきた！\nまけるな！ ふねを まもれ！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 1, pick: 8 }, { step: 2, pick: 7 }],
  },


  // m2_03b_a: M2-03b くりさがりのひきざん（こたえを まるごと かく）
  {
    id: 'm2_03b_a',
    unitId: 'M2-03b',
    grade: 2,
    zone: 'zone1',
    title: 'くりさがりひきざん（A）',
    description: 'こたえを まるごと かこう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_03b.png',
      iconLocked: 'assets/icons/worlds/m2_03b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #4776E6, #8E54E9)' },
    order: 40,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'くりさがりの こたえを まるごと かこう！
まけるな！ ふねを まもれ！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 4, pick: 10 }, { step: 3, pick: 5 }],
  },
  // m2_04: M2-04 2けた±2けたのけいさん おうよう
  {
    id: 'm2_04',
    unitId: 'M2-04',
    grade: 2,
    zone: 'zone1',
    title: '2けたの けいさん おうよう',
    description: 'たし・ひきを つかいこなそう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_04.png',
      iconLocked: 'assets/icons/worlds/m2_04_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #F09819, #EDDE5D)' },
    order: 40,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'あさせの ラストバトル！\nたし・ひきを かんぺきに つかえ！',
    actMoment: null,
    facilityUnlock: null,
    stepConfig: [{ step: 1, pick: 8 }, { step: 2, pick: 7 }],
  },

  // m2_04b: M2-04b Zone 1 ミニまとめ（筆算総まとめ）
  {
    id: 'm2_04b',
    unitId: 'M2-04b',
    grade: 2,
    zone: 'zone1',
    title: 'ひっさん まとめ',
    description: 'たし・ひきざんを まとめて ふりかえろう',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_04b.png',
      iconLocked: 'assets/icons/worlds/m2_04b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #36D1DC, #5B86E5)' },
    order: 41,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'あさせを せいはした！\nさんごしょうが まっている……！',
    actMoment: 'zone2_start',
    facilityUnlock: 'takozou',
  },

  // ===== Zone 2 サンゴ礁（9本）— 数・量・時刻 =====

  // m2_05: M2-05 ながさをはかろう（cm・mm・m）
  {
    id: 'm2_05',
    unitId: 'M2-05',
    grade: 2,
    zone: 'zone2',
    title: 'ながさを はかろう',
    description: 'cm・mm・m を つかって ながさを はかろう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_05.png',
      iconLocked: 'assets/icons/worlds/m2_05_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FF6B6B, #FEC89A)' },
    order: 42,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'さんごしょうの グリモアに ちかづく！\nながさの まほうが めざめるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_06a: M2-06a 大きい数①（100まで）
  {
    id: 'm2_06a',
    unitId: 'M2-06a',
    grade: 2,
    zone: 'zone2',
    title: 'おおきい かず①',
    description: '100までの かずを よんだり かいたり しよう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_06a.png',
      iconLocked: 'assets/icons/worlds/m2_06a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FDA085, #F6D365)' },
    order: 43,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'さんごが ひかっている！\nおおきい かずの ひみつが みえてくる！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_06b: M2-06b 大きい数②（1000まで）
  {
    id: 'm2_06b',
    unitId: 'M2-06b',
    grade: 2,
    zone: 'zone2',
    title: 'おおきい かず②',
    description: '1000までの かずを まなぼう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_06b.png',
      iconLocked: 'assets/icons/worlds/m2_06b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #F093FB, #F5576C)' },
    order: 44,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: '1000の すうじの まほうが ひびく！\nもっと おおきな かずへ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_07: M2-07 水のかさ（dL・L）
  {
    id: 'm2_07',
    unitId: 'M2-07',
    grade: 2,
    zone: 'zone2',
    title: 'みずの かさ',
    description: 'dL・L を つかって かさを はかろう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_07.png',
      iconLocked: 'assets/icons/worlds/m2_07_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0cebeb, #20e3b2)' },
    order: 45,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'treasure' }
    ],
    storyDesc: 'うみの みずが てらす グリモア！\nかさを はかる まほうが そなわるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_08: M2-08 重さ（g・kg）
  {
    id: 'm2_08',
    unitId: 'M2-08',
    grade: 2,
    zone: 'zone2',
    title: 'おもさを はかろう',
    description: 'g・kg を つかって おもさを はかろう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_08.png',
      iconLocked: 'assets/icons/worlds/m2_08_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' },
    order: 46,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'さんごの おくに グリモアが ねむる！\nおもさの まほうで たどりつけ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_09a: M2-09a 時こくと時間①（なんじなんぷん）
  {
    id: 'm2_09a',
    unitId: 'M2-09a',
    grade: 2,
    zone: 'zone2',
    title: 'じこくと じかん①',
    description: 'なんじ なんぷんを よんでみよう',
    difficulty: 2,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_09a.png',
      iconLocked: 'assets/icons/worlds/m2_09a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FDC830, #F37335)' },
    order: 47,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'じかんの グリモアが みつかった！\nとけいを よむ まほうが つよくなる！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_09b: M2-09b 時こくと時間②（何時間後・何分後）
  {
    id: 'm2_09b',
    unitId: 'M2-09b',
    grade: 2,
    zone: 'zone2',
    title: 'じこくと じかん②',
    description: 'なんじかんご・なんぷんごを もとめよう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_09b.png',
      iconLocked: 'assets/icons/worlds/m2_09b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FF512F, #F09819)' },
    order: 48,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'じかんの かいじゅうが あらわれた！\nけいさんの まほうで たちむかえ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_09c: M2-09c 時刻計算（文章題）
  {
    id: 'm2_09c',
    unitId: 'M2-09c',
    grade: 2,
    zone: 'zone2',
    title: 'じかんの もんだい',
    description: 'じこくの もんだいを ぶんしょうで といてみよう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_09c.png',
      iconLocked: 'assets/icons/worlds/m2_09c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #c0392b, #8e44ad)' },
    order: 49,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'じかんの グリモアを まもる ボスが！\nぶんしょうだいで かちぬけ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_09d: M2-09d Zone 2 ミニまとめ（数・量・時刻まとめ）
  {
    id: 'm2_09d',
    unitId: 'M2-09d',
    grade: 2,
    zone: 'zone2',
    title: 'さんごしょう まとめ',
    description: 'かず・りょう・じこくを まとめて ふりかえろう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_09d.png',
      iconLocked: 'assets/icons/worlds/m2_09d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #eb3349, #f45c43)' },
    order: 50,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'さんごしょうを せいはした！\nなかがたの ふねが やってきた！',
    actMoment: 'zone3_start',
    facilityUnlock: 'rina',
  },

  // ===== Zone 3 外洋（11本）— 九九（totalQuestions:9 ＝ 全問出題） =====

  // m2_10a: M2-10a 九九 2のだん
  {
    id: 'm2_10a',
    unitId: 'M2-10a',
    grade: 2,
    zone: 'zone3',
    title: '九九 2のだん',
    description: '2のだんを そらで いえるように なろう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10a.png',
      iconLocked: 'assets/icons/worlds/m2_10a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0077B6, #0096C7)' },
    order: 51,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'omikuji' }
    ],
    storyDesc: 'がいようへ とびだした！\n九九の まほうが めざめていく……！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10b: M2-10b 九九 3のだん
  {
    id: 'm2_10b',
    unitId: 'M2-10b',
    grade: 2,
    zone: 'zone3',
    title: '九九 3のだん',
    description: '3のだんを そらで いえるように なろう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10b.png',
      iconLocked: 'assets/icons/worlds/m2_10b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0096C7, #00B4D8)' },
    order: 52,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'three_paths' }
    ],
    storyDesc: '3のだんの まほうが ひびく！\nなみが たかくなってきた……！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10c: M2-10c 九九 4のだん
  {
    id: 'm2_10c',
    unitId: 'M2-10c',
    grade: 2,
    zone: 'zone3',
    title: '九九 4のだん',
    description: '4のだんを そらで いえるように なろう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10c.png',
      iconLocked: 'assets/icons/worlds/m2_10c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #00B4D8, #48CAE4)' },
    order: 53,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'monster' }
    ],
    storyDesc: '4のだんの かいじゅうが あらわれた！\nまほうで たちむかえ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10d: M2-10d 九九 5のだん
  {
    id: 'm2_10d',
    unitId: 'M2-10d',
    grade: 2,
    zone: 'zone3',
    title: '九九 5のだん',
    description: '5のだんを そらで いえるように なろう！',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10d.png',
      iconLocked: 'assets/icons/worlds/m2_10d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #48CAE4, #90E0EF)' },
    order: 54,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'treasure' }
    ],
    storyDesc: '5のだんの ひかりが あたりを てらす！\nふかみ船長と なかまに なった！',
    actMoment: null,
    facilityUnlock: 'fukami',
  },

  // m2_10e: M2-10e 九九 6のだん
  {
    id: 'm2_10e',
    unitId: 'M2-10e',
    grade: 2,
    zone: 'zone3',
    title: '九九 6のだん',
    description: '6のだんを そらで いえるように なろう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10e.png',
      iconLocked: 'assets/icons/worlds/m2_10e_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #023E8A, #0077B6)' },
    order: 55,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'omikuji' }
    ],
    storyDesc: '6のだんに さしかかった……\nここから むずかしくなるぞ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10f: M2-10f 九九 7のだん
  {
    id: 'm2_10f',
    unitId: 'M2-10f',
    grade: 2,
    zone: 'zone3',
    title: '九九 7のだん',
    description: '7のだんを そらで いえるように なろう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10f.png',
      iconLocked: 'assets/icons/worlds/m2_10f_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #03045E, #023E8A)' },
    order: 56,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'monster' }
    ],
    storyDesc: '7のだんの かいじゅうが おそいかかる！\nまけるな！ まほうを だせ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10g: M2-10g 九九 8のだん
  {
    id: 'm2_10g',
    unitId: 'M2-10g',
    grade: 2,
    zone: 'zone3',
    title: '九九 8のだん',
    description: '8のだんを そらで いえるように なろう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10g.png',
      iconLocked: 'assets/icons/worlds/m2_10g_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #240046, #03045E)' },
    order: 57,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'three_paths' }
    ],
    storyDesc: '8のだんの あらなみが おそう！\nここまで きたら あとすこし！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10h: M2-10h 九九 9のだん
  {
    id: 'm2_10h',
    unitId: 'M2-10h',
    grade: 2,
    zone: 'zone3',
    title: '九九 9のだん',
    description: '9のだんを そらで いえるように なろう！',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10h.png',
      iconLocked: 'assets/icons/worlds/m2_10h_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #10002B, #240046)' },
    order: 58,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'monster' }
    ],
    storyDesc: '9のだんの ラストに はいった！\nあとひとつ……！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10i: M2-10i 九九 1のだん・0のかけざん
  {
    id: 'm2_10i',
    unitId: 'M2-10i',
    grade: 2,
    zone: 'zone3',
    title: '九九 1のだん・0のかけざん',
    description: '1のだんと 0のかけざんを まなぼう',
    difficulty: 2,
    dropRateMultiplier: 0.55,
    totalQuestions: 9,
    assets: {
      icon: 'assets/icons/worlds/m2_10i.png',
      iconLocked: 'assets/icons/worlds/m2_10i_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #C77DFF, #7B2FBE)' },
    order: 59,
    freeToPlay: false,
    events: [
      { triggerAt: 6, type: 'treasure' }
    ],
    storyDesc: '1のだんの ひみつが あきらかに！\nかけざんの まほうが かんせいした！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10j: M2-10j 九九 文章題（かけざんをつかおう）
  {
    id: 'm2_10j',
    unitId: 'M2-10j',
    grade: 2,
    zone: 'zone3',
    title: 'かけざん もんだい',
    description: 'かけざんを つかった もんだいを といてみよう',
    difficulty: 3,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_10j.png',
      iconLocked: 'assets/icons/worlds/m2_10j_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #7B2FBE, #5A189A)' },
    order: 60,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'かけざん ぶんしょうだいの グリモア！\nがいようの ボスが ちかづいてきた……！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_10k: M2-10k 九九 総まとめ（Zone 3 最終）
  {
    id: 'm2_10k',
    unitId: 'M2-10k',
    grade: 2,
    zone: 'zone3',
    title: '九九 そうまとめ',
    description: '九九を ぜんぶ つかいこなそう！',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_10k.png',
      iconLocked: 'assets/icons/worlds/m2_10k_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #3C096C, #10002B)' },
    order: 61,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'がいようを せいはした！\nおおがたのふねの せっけいずが てにはいった！',
    actMoment: 'zone4_start',
    facilityUnlock: null,
  },

  // ===== Zone 4 深海（11本）— 図形・3桁筆算・分数 =====

  // m2_11: M2-11 三角形と四角形
  {
    id: 'm2_11',
    unitId: 'M2-11',
    grade: 2,
    zone: 'zone4',
    title: 'さんかくけいと しかくけい',
    description: 'さんかくけいと しかくけいを まなぼう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_11.png',
      iconLocked: 'assets/icons/worlds/m2_11_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0f0c29, #302b63)' },
    order: 62,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'しんかいへの とびらが ひらいた……\nかたちの グリモアが ねむっている！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_12: M2-12 長方形・正方形・直角
  {
    id: 'm2_12',
    unitId: 'M2-12',
    grade: 2,
    zone: 'zone4',
    title: 'ちょうほうけい・せいほうけい',
    description: 'ちょうほうけいと せいほうけいの ちがいを まなぼう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_12.png',
      iconLocked: 'assets/icons/worlds/m2_12_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #24243e, #302b63)' },
    order: 63,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'monster' }
    ],
    storyDesc: 'ちょっかくの かいじゅうが あらわれた！\nかたちの まほうで たちむかえ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_12b: M2-12b 図形ミニまとめ
  {
    id: 'm2_12b',
    unitId: 'M2-12b',
    grade: 2,
    zone: 'zone4',
    title: 'ずけい まとめ',
    description: 'かたちの まほうを まとめて たしかめよう',
    difficulty: 3,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_12b.png',
      iconLocked: 'assets/icons/worlds/m2_12b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
    order: 64,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: 'ずけいのグリモアを かいふくした！\nつぎは ひっさんの ちょうせん！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_13a: M2-13a 3けたのたしざん
  {
    id: 'm2_13a',
    unitId: 'M2-13a',
    grade: 2,
    zone: 'zone4',
    title: '3けたの たしざん',
    description: '3けたの ひっさんたしざんに ちょうせん！',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_13a.png',
      iconLocked: 'assets/icons/worlds/m2_13a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0f3460, #16213e)' },
    order: 65,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ],
    storyDesc: 'しんかいの やみが ふかくなる……\n3けたの まほうで きりひらけ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_13b: M2-13b 3けたのひきざん
  {
    id: 'm2_13b',
    unitId: 'M2-13b',
    grade: 2,
    zone: 'zone4',
    title: '3けたの ひきざん',
    description: '3けたの ひっさんひきざんに ちょうせん！',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_13b.png',
      iconLocked: 'assets/icons/worlds/m2_13b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #000428, #004e92)' },
    order: 66,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'やみの かいじゅうが あらわれた！\nひきざんの まほうで たちむかえ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_13c: M2-13c 3けた筆算ミニまとめ
  {
    id: 'm2_13c',
    unitId: 'M2-13c',
    grade: 2,
    zone: 'zone4',
    title: '3けた ひっさん まとめ',
    description: '3けたの たし・ひきを まとめて たしかめよう',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_13c.png',
      iconLocked: 'assets/icons/worlds/m2_13c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0a3d62, #1e3799)' },
    order: 67,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' }
    ],
    storyDesc: '3けた ひっさんの グリモアを かいふく！\nつぎは ぶんすうの むずかしさが まつ……',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_14a: M2-14a 分数のきほん（1/2・1/3）
  {
    id: 'm2_14a',
    unitId: 'M2-14a',
    grade: 2,
    zone: 'zone4',
    title: 'ぶんすうの きほん',
    description: '1/2や 1/3を まなぼう',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_14a.png',
      iconLocked: 'assets/icons/worlds/m2_14a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #192a56, #273c75)' },
    order: 68,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'three_paths' }
    ],
    storyDesc: 'ぶんすうの グリモアが みつかった！\nわけることの まほうが めざめる……！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_14b: M2-14b 分数のたしざん
  {
    id: 'm2_14b',
    unitId: 'M2-14b',
    grade: 2,
    zone: 'zone4',
    title: 'ぶんすうの たしざん',
    description: 'ぶんすうを たしてみよう',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_14b.png',
      iconLocked: 'assets/icons/worlds/m2_14b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0c2461, #1e3799)' },
    order: 69,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'ぶんすうの かいじゅうが おそいかかる！\nたしざんの まほうで はねかえせ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_14c: M2-14c 分数のひきざん
  {
    id: 'm2_14c',
    unitId: 'M2-14c',
    grade: 2,
    zone: 'zone4',
    title: 'ぶんすうの ひきざん',
    description: 'ぶんすうを ひいてみよう',
    difficulty: 4,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_14c.png',
      iconLocked: 'assets/icons/worlds/m2_14c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #1B1464, #2C3E50)' },
    order: 70,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'omikuji' }
    ],
    storyDesc: 'やみが うずまく しんかいのそこ……\nひきざんの まほうで てらしだせ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_14d: M2-14d 分数のおうよう（文章題）
  {
    id: 'm2_14d',
    unitId: 'M2-14d',
    grade: 2,
    zone: 'zone4',
    title: 'ぶんすうの おうよう',
    description: 'ぶんすうの ぶんしょうもんだいを といてみよう',
    difficulty: 5,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_14d.png',
      iconLocked: 'assets/icons/worlds/m2_14d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0f0c29, #1B1464)' },
    order: 71,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'グランド・レヴィアサンの きざしが……！\nぜんぶの まほうを あつめろ！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_14e: M2-14e 分数ミニまとめ（Zone 4 最終）
  {
    id: 'm2_14e',
    unitId: 'M2-14e',
    grade: 2,
    zone: 'zone4',
    title: 'ぶんすう まとめ',
    description: 'ぶんすうの まほうを まとめて たしかめよう',
    difficulty: 5,
    dropRateMultiplier: 0.55,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_14e.png',
      iconLocked: 'assets/icons/worlds/m2_14e_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #1a0533, #0f0c29)' },
    order: 72,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'treasure' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'しんかいを せいはした！\nおおがたのふねが かんせいした！！',
    actMoment: 'zone5_start',
    facilityUnlock: null,
  },

  // ===== Zone 5 海底都市（4本）— 総復習 =====

  // m2_15a: M2-15a 総復習①（たしざん・ひきざん・大きな数）
  {
    id: 'm2_15a',
    unitId: 'M2-15a',
    grade: 2,
    zone: 'zone5',
    title: 'そうふくしゅう①',
    description: 'たし・ひきざんと おおきな かずを ふりかえろう',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_15a.png',
      iconLocked: 'assets/icons/worlds/m2_15a_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #005c97, #363795)' },
    order: 73,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'omikuji' }
    ],
    storyDesc: 'かいていとしに とうちゃくした！\nさいごの たたかいに むけて まほうを みがけ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_15b: M2-15b 総復習②（九九・かけざん）
  {
    id: 'm2_15b',
    unitId: 'M2-15b',
    grade: 2,
    zone: 'zone5',
    title: 'そうふくしゅう②',
    description: '九九と かけざんを ふりかえろう',
    difficulty: 4,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_15b.png',
      iconLocked: 'assets/icons/worlds/m2_15b_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #1e3c72, #2a5298)' },
    order: 74,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'three_paths' }
    ],
    storyDesc: 'かいていとしが ひかりで あふれる！\n九九の まほうを ふりしぼれ！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_15c: M2-15c 総復習③（図形・分数）
  {
    id: 'm2_15c',
    unitId: 'M2-15c',
    grade: 2,
    zone: 'zone5',
    title: 'そうふくしゅう③',
    description: 'ずけいと ぶんすうを ふりかえろう',
    difficulty: 5,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_15c.png',
      iconLocked: 'assets/icons/worlds/m2_15c_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #0a0a2a, #1e3c72)' },
    order: 75,
    freeToPlay: false,
    events: [
      { triggerAt: 10, type: 'monster' }
    ],
    storyDesc: 'グランド・レヴィアサンが めを さます……！\nすべての まほうで むかえうて！！',
    actMoment: null,
    facilityUnlock: null,
  },

  // m2_15d: M2-15d グランド・レヴィアサン 決戦！（Grade 2 フィナーレ）
  {
    id: 'm2_15d',
    unitId: 'M2-15d',
    grade: 2,
    zone: 'zone5',
    title: 'グランド・レヴィアサン けっせん！',
    description: 'すべての まほうを つかって たたかえ！',
    difficulty: 5,
    totalQuestions: 15,
    assets: {
      icon: 'assets/icons/worlds/m2_15d.png',
      iconLocked: 'assets/icons/worlds/m2_15d_locked.png'
    },
    theme: { gradient: 'linear-gradient(135deg, #FDC830, #F37335)' },
    order: 76,
    freeToPlay: false,
    events: [
      { triggerAt: 8, type: 'monster' },
      { triggerAt: -1, type: 'phase_complete' }
    ],
    storyDesc: 'しんかいグリモアの さいごの たたかい！\nグランド・レヴィアサンを たおせ！！',
    actMoment: 'grade2_finale_unlock',
    facilityUnlock: null,
  },
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
