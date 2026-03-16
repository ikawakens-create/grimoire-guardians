/**
 * storyData.js - Grimoire Guardians
 * ストーリー全テキスト・画像パス・Gemini生成プロンプト 一元管理
 *
 * 世界設定：
 *   昔の賢者たちが33冊のグリモア（知識の本）で「やみのまじん（無知の化身）」を封印した。
 *   知識が薄れると封印が弱まり、やみはグリモアを33の世界に散らして封印を解こうとしている。
 *   プレイヤー＝召喚されたガーディアン。問題を解く＝グリモアを取り戻す＝封印を回復する。
 *
 * @version 1.0
 * @date 2026-03-16
 */

// ─────────────────────────────────────────
// 画像パス定義
// ─────────────────────────────────────────

export const STORY_IMAGES = {
  prologue: {
    slide01: 'assets/story/prologue/slide_01.png',
    slide02: 'assets/story/prologue/slide_02.png',
    slide03: 'assets/story/prologue/slide_03.png',
    slide04: 'assets/story/prologue/slide_04.png',
    slide06: 'assets/story/prologue/slide_06.png',
  },
  actEvents: {
    act2Town:   'assets/story/act_events/act2_town.png',
    act3Fog:    'assets/story/act_events/act3_fog.png',
    act4Light:  'assets/story/act_events/act4_light.png',
  },
  boss: {
    normal:    'assets/story/boss/yami_normal.png',
    damaged:   'assets/story/boss/yami_damaged.png',
    defeated:  'assets/story/boss/yami_defeated.png',
  },
  finale: {
    lightBurst: 'assets/story/finale/light_burst.png',
    certificate: 'assets/story/finale/certificate_bg.png',
  },
  npcs: {
    fukurou:     'assets/npcs/fukurou.png',
    tanuki:      'assets/npcs/tanuki.png',
    guildmaster: 'assets/npcs/guildmaster.png',
  },
};

/*
 * 📸 Gemini Image 3 生成プロンプト（英語）
 *
 * slide_01:
 * "A dark cozy library at night, a magical old grimoire glowing with golden light
 *  on a wooden desk, dust particles floating, warm candlelight atmosphere,
 *  kawaii soft illustration style for Japanese children"
 *
 * slide_02:
 * "A child surrounded by swirling golden magical light particles, being summoned
 *  through a portal, eyes closed in wonder, soft pastel fantasy background,
 *  kawaii style for Japanese elementary school children"
 *
 * slide_03:
 * "A magical colorful fantasy town at dusk, cobblestone streets, glowing lanterns,
 *  small cute shops and houses, an owl wizard character welcoming a visitor,
 *  kawaii RPG illustration for Japanese children, warm inviting atmosphere"
 *
 * slide_04:
 * "33 glowing magical books floating scattered across dark cloudy sky worlds,
 *  a shadowy dark spirit figure in background, kawaii ominous illustration,
 *  Japanese children's game art style"
 *
 * slide_06:
 * "A determined young adventurer standing heroically in front of a magical town,
 *  clenching fist, colorful fantasy setting, kawaii illustration style,
 *  Japanese children's educational game"
 *
 * act3_fog:
 * "Dark purple magical fog seeping through cracks in a glowing seal,
 *  ominous atmosphere but not too scary for children, kawaii dark fantasy,
 *  Japanese children's game background"
 *
 * act4_light:
 * "Golden magical light breaking through dark clouds, rays of hope,
 *  a magical town slowly becoming visible, kawaii hopeful illustration,
 *  Japanese children's educational game"
 *
 * yami_normal:
 * "A cute but menacing shadow spirit boss character, made of dark purple smoke
 *  and sparkling darkness, glowing red eyes, NOT scary for 6-year-olds,
 *  kawaii villain design, Japanese children's game"
 *
 * yami_damaged:
 * "Same shadow spirit character but with cracks of golden light breaking through
 *  its body, weakening, kawaii style, Japanese children's game"
 *
 * yami_defeated:
 * "Shadow spirit character being sealed inside a glowing magical circle,
 *  dissolving into light particles, peaceful ending, kawaii style"
 *
 * fukurou:
 * "Wise old owl wizard character, wearing purple robe and glasses, holding a staff,
 *  friendly and warm expression, chibi kawaii style, Japanese children's game NPC"
 *
 * tanuki:
 * "Friendly raccoon dog shopkeeper character, wearing a merchant's hat,
 *  cheerful grinning expression, chibi kawaii style, Japanese children's game NPC"
 *
 * guildmaster:
 * "Heroic guild master knight character, wearing light armor, confident pose,
 *  kind strong expression, chibi kawaii style, Japanese children's game NPC"
 */

// ─────────────────────────────────────────
// プロローグ スライド定義（6枚）
// ─────────────────────────────────────────

export const PROLOGUE_SLIDES = [
  {
    id: 'slide_01',
    image:       STORY_IMAGES.prologue.slide01,
    bgFallback:  'linear-gradient(135deg, #1a1a2e, #16213e)',
    emojiFallback: '📘',
    showCharacter: false,
    text: 'これは…\nなんの ほんだろう？',
    subText: null,
  },
  {
    id: 'slide_02',
    image:       STORY_IMAGES.prologue.slide02,
    bgFallback:  'linear-gradient(135deg, #f7971e, #ffd200)',
    emojiFallback: '✨',
    showCharacter: true,
    characterEmotion: 'normal',
    text: 'あけた しゅんかん……',
    subText: 'ひかりに つつまれて……',
  },
  {
    id: 'slide_03',
    image:       STORY_IMAGES.prologue.slide03,
    bgFallback:  'linear-gradient(135deg, #4776E6, #8E54E9)',
    emojiFallback: '🏘️',
    showCharacter: true,
    characterEmotion: 'normal',
    npc: 'fukurou',
    npcText: 'おお！ ついに きたか！\nきみこそが よげんの\nガーディアン じゃ！',
    text: null,
  },
  {
    id: 'slide_04',
    image:       STORY_IMAGES.prologue.slide04,
    bgFallback:  'linear-gradient(135deg, #232526, #414345)',
    emojiFallback: '📚',
    showCharacter: false,
    npc: 'fukurou',
    npcText: null,
    text: 'やみのまじんが グリモア（ちしきの ほん）を\n33の せかいに ちらして しまった……',
    subText: 'ぜんぶ とりもどすまで\nもとの せかいには かえれない！',
  },
  {
    id: 'slide_05',
    image:       null,
    bgFallback:  'linear-gradient(135deg, #6B48FF, #2D1B69)',
    emojiFallback: '🧙',
    showCharacter: true,
    characterEmotion: 'normal',
    isNameInput: true,
    npc: 'fukurou',
    npcText: 'きみの なまえを\nおしえて くれるか？',
    text: null,
  },
  {
    id: 'slide_06',
    image:       STORY_IMAGES.prologue.slide06,
    bgFallback:  'linear-gradient(135deg, #11998e, #38ef7d)',
    emojiFallback: '⚔️',
    showCharacter: true,
    characterEmotion: 'happy',
    isDecision: true,
    text: null,
    // テキストは動的に生成: 「よし、[名前]！いっしょにグリモアをとりもどそう！」
  },
];

// ─────────────────────────────────────────
// ACT 転換カットイン定義
// ─────────────────────────────────────────

export const ACT_CUTINS = {
  /** Act2開始 = world_6b（8ワールドクリア）後 */
  act2: {
    triggerAfterWorld: 'world_6b',
    image:      STORY_IMAGES.actEvents.act2Town,
    bgFallback: 'linear-gradient(135deg, #f093fb, #f5576c)',
    icon:       '🏘️',
    actLabel:   'Act 2',
    characterEmotion: 'happy',
    showCharacter: true,
    npc: 'tanuki',
    npcText: 'にぎやかに なってきたなあ〜！\nみんな あつまってきたで〜！',
    title: 'まちが にぎやかに なってきた！',
  },
  /** Act3突入 = world_11c（20ワールドクリア）後（最重要） */
  act3: {
    triggerAfterWorld: 'world_11c',
    image:      STORY_IMAGES.actEvents.act3Fog,
    bgFallback: 'linear-gradient(135deg, #1a1a2e, #2d1b69)',
    icon:       '🌫️',
    actLabel:   'Act 3',
    characterEmotion: 'sad',
    showCharacter: true,
    npc: 'fukurou',
    npcText: 'ぐっ……！ ふういんに ひびが……！\nやみのまじんが さいごの ちからで\nおしかえしてきておる……！',
    subNpcText: 'だいじょうぶ じゃ。きみが おる。',
    title: 'ふういんに ひびが はいった……！',
    addFogEffect: true,
  },
  /** Act4開始 = world_14b（28ワールドクリア）後 */
  act4: {
    triggerAfterWorld: 'world_14b',
    image:      STORY_IMAGES.actEvents.act4Light,
    bgFallback: 'linear-gradient(135deg, #f7971e, #ffd200)',
    icon:       '✨',
    actLabel:   'Act 4',
    characterEmotion: 'happy',
    showCharacter: true,
    npc: 'fukurou',
    npcText: 'きりが うすれてきた……！\nもうすこし じゃ！！',
    title: 'きぼうの ひかりが もどってきた！',
    removeFogEffect: true,
  },
  /** finale解放 = world_16b（全34ワールドクリア）後 */
  finale: {
    triggerAfterWorld: 'world_16b',
    bgFallback: 'linear-gradient(135deg, #0f0c29, #302b63)',
    icon:       '⚔️',
    actLabel:   'さいしゅうけっせん',
    title:      'やみのまじんが さいごの ていこうを……！！',
    npcText:    'グリモア 33さつの ちしきが きみに ある！\nいざ……さいしゅうけっせんへ！！',
    characterEmotion: 'happy',
    showCharacter: true,
    npc: 'fukurou',
  },
};

// ─────────────────────────────────────────
// NPC 初対面シーン（施設解放時）
// ─────────────────────────────────────────

export const NPC_FIRST_MEET = {
  /** world_5クリア後（5ワールドクリア）：タヌキ商人登場 */
  tanuki: {
    triggerAfterWorld: 'world_5',
    npc: 'tanuki',
    characterEmotion: 'normal',
    title: '🦝 あたらしい おみせが まちに やってきた！',
    npcText: 'はじめまして〜！\nうわさを きいてきたで！\nなんでも とりそろえてるで〜！',
    actionLabel: 'おみせに いく',
    actionScreen: 'shop',
  },
  /** world_8a（10ワールドクリア）：ギルドマスター登場 */
  guildmaster: {
    triggerAfterWorld: 'world_8a',
    npc: 'guildmaster',
    characterEmotion: 'happy',
    title: '⚔️ ギルドが けっせいされた！',
    npcText: '10さつの ちしき……\nきみは ほんもの の ガーディアンだ。\nいっしょに たたかおう！',
    actionLabel: 'ギルドに いく',
    actionScreen: 'guild',
  },
  /** world_6b（8ワールドクリア）：農場解放 */
  farm: {
    triggerAfterWorld: 'world_6b',
    npc: 'fukurou',
    characterEmotion: 'happy',
    title: '🌱 まほうの たねが みつかった！',
    npcText: 'グリモアの なかに たねが はいっておった！\nのうじょうで そだてて みよう！',
    actionLabel: 'のうじょうへ いく',
    actionScreen: 'farm',
  },
};

// ─────────────────────────────────────────
// フクロウ先生 ワールドクリアコメント
// ─────────────────────────────────────────

export const FUKUROU_CLEAR_COMMENTS = {
  // Act1（worlds 1〜7）
  world_1:  'グリモア1さつめを とりもどした！\nかずの まほうが めざめてきたぞ！',
  world_2:  '10までの かずを マスター！\nふういんが すこし かいふくした！',
  world_3:  'なんばんめ を かんぺきに こたえた！\nじゅんじょの まほうが つかえるぞ！',
  world_4:  'たしざんの グリモアを とりもどした！\nたす まほうは たびに かかせないぞ！',
  world_5:  'ひきざんも バッチリじゃ！\nまちに あたらしい なかまが やってくるぞ！',
  world_5b: 'ひきざんの おうようも クリア！\nすごい ちしきじゃ！',
  world_6:  '10までの かず ぜんぶ マスター！\nふういんが どんどん つよくなるぞ！',
  world_6b: '10のかずの おうようも せいこう！\nグリモアが かがやいておるぞ！',
  // Act2（worlds 8〜19）
  world_7:  '20までの かず！\nまちに あたらしい まほう が とどいたぞ！',
  world_8a: 'とけいの グリモアじゃ！\nじかんを よむ まほうは たびに かかせないぞ！',
  world_8b: 'なんじはんも ばっちり！\nとけいの ちしきが ふかまったぞ！',
  world_8c: '5ふんたんいも クリア！\nとけい の うごきが わかってきたな！',
  world_9:  'さくらんぼ算の グリモアじゃ！\nかずを わける まほうは つよいぞ！',
  world_10a: 'くりあがり 9のせかい クリア！\nおおきな たしざんの とびらが ひらいた！',
  world_10b: 'くりあがり 8も だいじょうぶ！\nますます ちからが ついてきたぞ！',
  world_10c: 'くりあがり 7・6も クリア！\nふういんが どんどん かいふくしていくぞ！',
  world_10d: 'くりあがりの おうよう も クリア！\nギルドの なかまたちも よろこんでおるぞ！',
  world_11a: 'くりさがりの ひみつを とりもどした！\nひくまほうが つよくなったぞ！',
  world_11b: '11・12の くりさがりも クリア！\nむずかしい もんだいに まけなかったな！',
  world_11c: '13〜18の くりさがりも せいこう！\nすごい ちしき じゃ！',
  world_11d: 'くりさがりの おうよう も クリア！\nひきざんの グリモアが かがやいておる！',
  world_12a: '3つの たしざん！\nたくさんの かずを たす まほうが うまれたぞ！',
  world_12b: '3つの ひきざんも クリア！\nまほうの はばが ひろがったな！',
  world_12c: 'まじりの けいさんも マスター！\nりょうほうの まほうが つかえるぞ！',
  world_13:  'かたちの グリモア！\nたてやよこを みわける まほうが めざめたぞ！',
  // Act3（worlds 14a〜19 → 実際は world_14a〜16b の一部）
  world_14a: 'おおきいかずの よみかき！\nふういんの ちからが どんどん つよくなるぞ！',
  world_14b: 'かずの じゅんばんと だいしょうも クリア！\nやみが おそれておるぞ……！',
  world_14c: 'おおきいかずの たしざんも せいこう！\nふういんが もうすぐ かんせいするぞ！',
  world_14d: 'おおきいかずの ひきざんも クリア！\nやみよ、もうすぐ だぞ……！！',
  // Act4（worlds 15a〜16b）
  world_15a: 'なんじなんぷん 前半も クリア！\nきぼうの ひかりが ちかづいてきたぞ！',
  world_15b: 'なんじなんぷん 後半も クリア！\nもうすこし！ まけるな！！',
  world_16a: 'ずをつかって・たしざん 文章題も クリア！\nあと 1さつ！！',
  world_16b: '33さつ ぜんぶ とりもどした！！\nしかし……まだ おわっておらん！！\nやみのまじんが さいごの ていこうを…！！',
};

// ─────────────────────────────────────────
// 最終決戦ステージ 定義
// ─────────────────────────────────────────

export const FINAL_BATTLE = {
  /** 解放条件：world_16b（33番目）クリア後 */
  unlockAfterWorld: 'world_16b',

  /** バトル開幕カットイン */
  openingCutin: {
    steps: [
      {
        type: 'dark',
        text:    '……ゆるさぬ！',
        subText: 'さいごの ちからで あらがってやる……！！',
        bossImage: STORY_IMAGES.boss.normal,
        bgFallback: 'linear-gradient(135deg, #0f0c29, #302b63)',
        characterEmotion: 'normal',
      },
      {
        type: 'rally',
        npc:     'fukurou',
        npcText: 'おそれるな！\nきみが 33さつ とりもどした\nちしきの ちからが ある！！\nつかえ！！',
        characterEmotion: 'happy',
        bgFallback: 'linear-gradient(135deg, #6B48FF, #2D1B69)',
      },
      {
        type: 'standoff',
        text:    'さあ……けっさいの とき！！',
        characterEmotion: 'normal',
        bossImage: STORY_IMAGES.boss.normal,
        bgFallback: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        showStartButton: true,
        startLabel: 'けっせん かいし！！ ⚔️',
      },
    ],
  },

  /** バトル中 ボスセリフ（HP段階別） */
  bossDialogue: {
    hp100: 'ふははは……かかってこい！',
    hp75:  'ちっ……やるじゃないか……',
    hp50:  'ば、ばかな……！ ちしきの ちから……！',
    hp25:  'こんなはずでは……！ こんな……！！',
    hp0:   'う……うわあああ……！！',
  },

  /** バトル中 フクロウセリフ（正解連続時） */
  fukurouStreak: {
    streak3:  'すごい！ どんどん いけ！',
    streak5:  'やみが よわっておるぞ！！',
    streak10: 'もうすぐ だ！！ まけるな！！',
  },

  /** 問題数 */
  questionCount: 30,

  /** 合格ライン別の勝利演出 */
  victoryVariants: {
    perfect:  { min: 30, label: 'かんぺきしょうり！！',   emoji: '🌟🌟🌟' },
    great:    { min: 20, label: 'だいしょうり！！',       emoji: '⭐⭐⭐' },
    survived: { min: 0,  label: 'かろうじて ふういんした…', emoji: '⭐' },
  },

  /** 勝利カットイン */
  victoryCutin: [
    {
      bossImage:       STORY_IMAGES.boss.defeated,
      bgFallback:      'linear-gradient(135deg, #f7971e, #ffd200)',
      characterEmotion:'happy',
      text:    'ちしきの ひかりが やみを とじこめた！！',
      subText: 'グリモア 33さつが かがやいている……！',
    },
    {
      bgFallback:      'linear-gradient(135deg, #11998e, #38ef7d)',
      characterEmotion:'happy',
      text:    'やみのまじんは ふたたび ふういんされた！！',
      subText: null,
      // → グランドフィナーレへ
    },
  ],
};

// ─────────────────────────────────────────
// グランドフィナーレ 定義
// ─────────────────────────────────────────

export const GRAND_FINALE = {
  npcMessages: [
    {
      npc:  'fukurou',
      text: 'やったぞ！ きみこそが ほんもの の\nグリモア・ガーディアン じゃ！！',
      delay: 0,
    },
    {
      npc:  'tanuki',
      text: 'また まいどあり〜！\nいつでも きてなー！！',
      delay: 1500,
    },
    {
      npc:  'guildmaster',
      text: 'いっしょに たたかえて……\nこうえいだった！！',
      delay: 3000,
    },
  ],
  certificateTitle: 'グリモア・ガーディアン',
  certificateBody:  'かずの次元の ふういんを まもった',
  certificateFrom:  '🦉 フクロウ先生 より',
  nextDimensionName: '🌊 つぎの次元（じゅんびちゅう）',
  nextDimensionToast: 'もうすぐ あたらしい じげんが ひらくぞ！\nたのしみに まっていてくれ！',
};

// ─────────────────────────────────────────
// 単元イントロ 定義（UnitIntroScreen用）
// ─────────────────────────────────────────

export const UNIT_INTROS = {
  'M1-01': {
    hint:             '1から5の かずを かぞえよう！\nりんごが なんこ あるか みてみよう！',
    image:            'assets/tutorial/M1-01.png',
    imagePlaceholder: { bg: '#FFF9C4', emoji: '🍎', label: '1〜5のかず' },
    // Gemini prompt: "5 red apples arranged in a row, cute counting illustration
    //  for Japanese 1st graders, soft pastel kawaii style, no text"
  },
  'M1-02': {
    hint:             '6から10の かずを おぼえよう！\n10の かたまりを みつけよう！',
    image:            'assets/tutorial/M1-02.png',
    imagePlaceholder: { bg: '#E8F5E9', emoji: '🔢', label: '6〜10のかず' },
  },
  'M1-03': {
    hint:             'まえから なんばんめ？\nうしろから なんばんめ？\nじゅんばんを かぞえよう！',
    image:            'assets/tutorial/M1-03.png',
    imagePlaceholder: { bg: '#E3F2FD', emoji: '🐣', label: 'なんばんめ' },
  },
  'M1-04': {
    hint:             'たしざんは ぜんぶで いくつ？\nあわせると なんこに なるか かんがえよう！',
    image:            'assets/tutorial/M1-04.png',
    imagePlaceholder: { bg: '#FFF3E0', emoji: '➕', label: 'たしざん①' },
  },
  'M1-05': {
    hint:             'ひきざんは のこりが いくつ？\nとった あとで なんこ のこるか かんがえよう！',
    image:            'assets/tutorial/M1-05.png',
    imagePlaceholder: { bg: '#FCE4EC', emoji: '➖', label: 'ひきざん①' },
  },
  'M1-05b': {
    hint:             'ひきざんの むずかしい もんだいに ちょうせん！\nおちついて かんがえよう！',
    image:            'assets/tutorial/M1-05b.png',
    imagePlaceholder: { bg: '#F8BBD0', emoji: '🎯', label: 'ひきざん応用' },
  },
  'M1-06': {
    hint:             '10までの かずを マスターしよう！\n10の まとまりが だいじ！',
    image:            'assets/tutorial/M1-06.png',
    imagePlaceholder: { bg: '#E8EAF6', emoji: '🔟', label: '10までのかず' },
  },
  'M1-06b': {
    hint:             '10までの かずの おうよう！\nいろんな もんだいに ちょうせん！',
    image:            'assets/tutorial/M1-06b.png',
    imagePlaceholder: { bg: '#EDE7F6', emoji: '💡', label: '10までのかず応用' },
  },
  'M1-07': {
    hint:             '20までの かずを かぞえよう！\n10の たばと バラを わけて かんがえよう！',
    image:            'assets/tutorial/M1-07.png',
    imagePlaceholder: { bg: '#E0F2F1', emoji: '2️⃣0️⃣', label: '20までのかず' },
  },
  'M1-08a': {
    hint:             'ちょうどの じかんを よもう！\nながい はりが 12を さしていたら ちょうど！',
    image:            'assets/tutorial/M1-08a.png',
    imagePlaceholder: { bg: '#FFF8E1', emoji: '🕛', label: 'なんじちょうど' },
    // Gemini prompt: "Analog clock showing exactly 3 o'clock, large clear clock face,
    //  educational illustration for Japanese 1st graders, kawaii style"
  },
  'M1-08b': {
    hint:             'なんじはんを よもう！\nながい はりが 6を さしていたら はん！',
    image:            'assets/tutorial/M1-08b.png',
    imagePlaceholder: { bg: '#FFF8E1', emoji: '🕧', label: 'なんじはん' },
  },
  'M1-08c': {
    hint:             '5ふんたんいの じかんを よもう！\nながい はりが どこに あるか みよう！',
    image:            'assets/tutorial/M1-08c.png',
    imagePlaceholder: { bg: '#FFF8E1', emoji: '⏰', label: '5ふんたんい' },
  },
  'M1-09': {
    hint:             'さくらんぼ算は かずを ふたつに わける！\n8 は 5と3 に わけられるよ！',
    image:            'assets/tutorial/M1-09.png',
    imagePlaceholder: { bg: '#FFE4E1', emoji: '🍒', label: 'さくらんぼ算' },
    // Gemini prompt: "Cherry blossom number decomposition illustration: number 8 splits
    //  into 5 and 3 with curved arrows and cherries, cute kawaii educational style,
    //  soft pink pastel colors, for Japanese 1st graders, no text"
  },
  'M1-10a': {
    hint:             'くりあがりは 10の たばを つかう！\n9＋3 は 9と1で 10 つくって、あと2！',
    image:            'assets/tutorial/M1-10a.png',
    imagePlaceholder: { bg: '#E1F0FF', emoji: '🔟', label: 'くりあがり（9）' },
    // Gemini prompt: "Number 10 bundle concept illustration: 9 blocks + 1 block = 10 bundle
    //  then +2 remaining, step by step kawaii educational style for Japanese children"
  },
  'M1-10b': {
    hint:             '8の せかいの くりあがり！\n8＋5 は 8と2で 10 つくって、あと3！',
    image:            'assets/tutorial/M1-10b.png',
    imagePlaceholder: { bg: '#DDEEFF', emoji: '8️⃣', label: 'くりあがり（8）' },
  },
  'M1-10c': {
    hint:             '7と6の くりあがり！\nまず 10の たばを つくろう！',
    image:            'assets/tutorial/M1-10c.png',
    imagePlaceholder: { bg: '#D5E8FF', emoji: '7️⃣', label: 'くりあがり（7・6）' },
  },
  'M1-10d': {
    hint:             'くりあがりの おうよう！\nこれまで ならったことを ぜんぶ つかおう！',
    image:            'assets/tutorial/M1-10d.png',
    imagePlaceholder: { bg: '#CCE5FF', emoji: '🌟', label: 'くりあがり応用' },
  },
  'M1-11a': {
    hint:             'くりさがりは 10から ひく！\n13－7 は 10から7を ひいて 3、あと3！',
    image:            'assets/tutorial/M1-11a.png',
    imagePlaceholder: { bg: '#FFE0B2', emoji: '💡', label: 'くりさがり（10から）' },
    // Gemini prompt: "Number decomposition for borrowing subtraction: 13 splits into 10+3,
    //  then 10-7=3, then 3+3=6, step arrows, kawaii educational Japanese children illustration"
  },
  'M1-11b': {
    hint:             '11と12の くりさがり！\nさくらんぼ算で バラして かんがえよう！',
    image:            'assets/tutorial/M1-11b.png',
    imagePlaceholder: { bg: '#FFD180', emoji: '1️⃣1️⃣', label: 'くりさがり（11・12）' },
  },
  'M1-11c': {
    hint:             '13から18の くりさがり！\nおちついて ひとつずつ！',
    image:            'assets/tutorial/M1-11c.png',
    imagePlaceholder: { bg: '#FFC06A', emoji: '1️⃣3️⃣', label: 'くりさがり（13〜18）' },
  },
  'M1-11d': {
    hint:             'くりさがりの おうよう！\nむずかしい もんだいも きみなら だいじょうぶ！',
    image:            'assets/tutorial/M1-11d.png',
    imagePlaceholder: { bg: '#FFB74D', emoji: '🎯', label: 'くりさがり応用' },
  },
  'M1-12a': {
    hint:             '3つの かずを たそう！\nさきに たせる ものから たしていこう！',
    image:            'assets/tutorial/M1-12a.png',
    imagePlaceholder: { bg: '#F3E5F5', emoji: '3️⃣➕', label: '3つのかずのたしざん' },
  },
  'M1-12b': {
    hint:             '3つの かずを ひこう！\nじゅんばんに ひいていこう！',
    image:            'assets/tutorial/M1-12b.png',
    imagePlaceholder: { bg: '#EDE7F6', emoji: '3️⃣➖', label: '3つのかずのひきざん' },
  },
  'M1-12c': {
    hint:             'たしざんと ひきざん まじり！\nきごうを よく みて かんがえよう！',
    image:            'assets/tutorial/M1-12c.png',
    imagePlaceholder: { bg: '#E8EAF6', emoji: '➕➖', label: 'たし・ひきまじり' },
  },
  'M1-13': {
    hint:             'かたちの なまえを おぼえよう！\nまる・さんかく・しかくは どれ？',
    image:            'assets/tutorial/M1-13.png',
    imagePlaceholder: { bg: '#E8F5E9', emoji: '🔷', label: 'かたちあそび' },
  },
  'M1-14a': {
    hint:             'おおきいかずの よみかきに ちょうせん！\n100より おおきい かずも だいじょうぶ！',
    image:            'assets/tutorial/M1-14a.png',
    imagePlaceholder: { bg: '#E3F2FD', emoji: '💯', label: 'おおきいかず（よみかき）' },
  },
  'M1-14b': {
    hint:             'かずの じゅんばんと おおきさを くらべよう！\nどっちが おおきい？',
    image:            'assets/tutorial/M1-14b.png',
    imagePlaceholder: { bg: '#E1F5FE', emoji: '📏', label: 'かずのじゅんばん' },
  },
  'M1-14c': {
    hint:             '100までの おおきいかずの たしざん！\n10の たばを かぞえよう！',
    image:            'assets/tutorial/M1-14c.png',
    imagePlaceholder: { bg: '#E0F7FA', emoji: '💯➕', label: 'おおきいかずのたしざん' },
  },
  'M1-14d': {
    hint:             '100までの おおきいかずの ひきざん！\nおちついて ひとつずつ！',
    image:            'assets/tutorial/M1-14d.png',
    imagePlaceholder: { bg: '#E0F7FA', emoji: '💯➖', label: 'おおきいかずのひきざん' },
  },
  'M1-15a': {
    hint:             'なんじなんぷん の よみかた（〜30ぷん）！\nながい はりの いちに ちゅうもく！',
    image:            'assets/tutorial/M1-15a.png',
    imagePlaceholder: { bg: '#FFF8E1', emoji: '🕐', label: 'なんじなんぷん（前半）' },
  },
  'M1-15b': {
    hint:             'なんじなんぷん の よみかた（31〜59ぷん）！\nながい はりが どこに あるか よく みよう！',
    image:            'assets/tutorial/M1-15b.png',
    imagePlaceholder: { bg: '#FFF8E1', emoji: '🕔', label: 'なんじなんぷん（後半）' },
  },
  'M1-16a': {
    hint:             'ずを かいて かんがえよう（たしざん）！\nえを かくと わかりやすく なるよ！',
    image:            'assets/tutorial/M1-16a.png',
    imagePlaceholder: { bg: '#F9FBE7', emoji: '📝', label: 'ずをつかって・たしざん' },
  },
  'M1-16b': {
    hint:             'ずを かいて かんがえよう（ひきざん）！\nこれが さいごの グリモア！\nぜんりょくで いこう！！',
    image:            'assets/tutorial/M1-16b.png',
    imagePlaceholder: { bg: '#F1F8E9', emoji: '🏁', label: 'ずをつかって・ひきざん' },
  },
};

// ─────────────────────────────────────────
// 封印ゲージ テキスト（ブックシェルフ表示用）
// ─────────────────────────────────────────

export const SEAL_GAUGE_TEXT = {
  /** sealStrength（0〜33）に応じたフクロウ先生コメント */
  getComment(sealStrength) {
    if (sealStrength === 0)  return 'ふういんが よわまっておる……！\nグリモアを とりもどすのじゃ！';
    if (sealStrength <= 7)   return `${sealStrength}さつ かいふく！ よい ちょうしじゃ！`;
    if (sealStrength <= 19)  return `${sealStrength}さつ！ まちが にぎやかに なってきたぞ！`;
    if (sealStrength === 20) return 'ふういんに ひびが……！ いそぐのじゃ！！';
    if (sealStrength <= 27)  return `のこり ${33 - sealStrength}さつ……まけるな！！`;
    if (sealStrength <= 32)  return `もうすこし！ あと ${33 - sealStrength}さつ！！`;
    if (sealStrength === 33) return 'グリモア ぜんぶ とりもどした！\nあとは さいしゅうけっせん だ！！';
    return `のこり ${33 - sealStrength}さつ！`;
  },
};

// ─────────────────────────────────────────
// デイリーミッション定義（GuildScreen用）
// ─────────────────────────────────────────

export const DAILY_MISSIONS = [
  {
    id:      'daily_grimoire',
    emoji:   '📘',
    label:   'きょうの グリモア',
    desc:    'きょうの ワールドを クリアしよう！',
    reward:  { type: 'multiplier', value: 3, label: '素材×3' },
    diff:    'かんたん',
  },
  {
    id:      'streak_5',
    emoji:   '🔥',
    label:   '5もん れんぞくせいかい',
    desc:    'クイズで 5もん つづけて せいかい！',
    reward:  { type: 'material', id: 'gem', count: 1, label: '💎×1' },
    diff:    'ふつう',
  },
  {
    id:      'clear_3',
    emoji:   '⭐',
    label:   '3つの ワールドを クリア',
    desc:    'きょう 3つの ワールドを クリアしよう！',
    reward:  { type: 'material', id: 'star_fragment', count: 2, label: '✨×2' },
    diff:    'ふつう',
  },
  {
    id:      'master_test',
    emoji:   '🏆',
    label:   'グリモアマスター しけん',
    desc:    'ランダム25もんに ちょうせん！',
    reward:  { type: 'material', id: 'magic_orb', count: 1, label: '🔮×1' },
    diff:    'むずかしい',
  },
];

// ─────────────────────────────────────────
// NG+（かくれワールド）定義
// ─────────────────────────────────────────

export const NG_PLUS = {
  unlockCondition:    '全33ワールドクリア後',
  worldSuffix:        '_ng',
  clearThreshold:     0.75,
  rewardMaterial:     'magic_orb',
  rewardCount:        1,
  legendarySkinFrags: 7,
  legendarySkinLabel: '伝説スキン',
  introText:          'しんの グリモアが あらわれた……！\nより つよい ふういんが のこっておったのじゃ！',
};

export default {
  STORY_IMAGES,
  PROLOGUE_SLIDES,
  ACT_CUTINS,
  NPC_FIRST_MEET,
  FUKUROU_CLEAR_COMMENTS,
  FINAL_BATTLE,
  GRAND_FINALE,
  UNIT_INTROS,
  SEAL_GAUGE_TEXT,
  DAILY_MISSIONS,
  NG_PLUS,
};
