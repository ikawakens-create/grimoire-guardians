# 計画書：キャラクタースキン画像 生成計画（全25種）

---

## 🎯 目的

`assets/skins/*.png` に配置するキャラクタースキン画像を **Gemini Imagen** で制作する。
「グリモアガーディアンズ」のゲーム世界観（魔法・冒険・わくわく）に合わせ、
小学生が「このキャラ使いたい！」と思う商品品質で全25種を統一スタイルで揃える。

---

## 📐 技術仕様（全スキン共通・プロンプトに毎回必ず含める）

| 項目 | 仕様 |
|------|------|
| ファイル形式 | PNG（**白背景で生成 → 背景除去ツールで透過化**） |
| 最終サイズ | **240 × 360 px** |
| Gemini生成サイズ | **480 × 720 px**（2倍で生成 → 縮小） |
| アスペクト比 | **2 : 3（縦長）** |
| キャラ占有率 | 画面の **80〜90%**（余白は上下各5〜10%のみ） |
| 配置パス | `assets/skins/{id}.png` |
| 表示サイズ | sm=40px / md=80px / lg=120px（objectFit: contain） |

---

## 🎨 アートスタイル仕様（プロンプト毎回固定）

### ✅ 必ずこのスタイルにする
- **頭身：2頭身**（頭がとにかく大きいちびキャラ）
- **太い黒アウトライン**（240px換算で2〜3px相当の太さ）
- **フラットカラー + 1段階セルシェーディング**（シンプルな塗り、影色1色のみ）
- **鮮やかな高彩度**（くすみ・モノトーン・パステル過多は NG）
- **真っ白な単色背景**（#FFFFFF・影なし・グラデ背景 NG）
- **正面向き全身立ちポーズ**（両足で立つ・カメラ目線）
- 表情は**元気・ポジティブ**（暗い・怖い顔は NG。笑顔・ウィンク・ドヤ顔 OK）
- 参照スタイル：**妖怪ウォッチ × ポケモン不思議のダンジョン × スプラトゥーン**

### ❌ NG事項
- リアル調・写実的・3D的な質感
- 背景あり・影がついている
- くすんだ暗い色味
- 細すぎる線・つぶれた線
- 成人向け・怖すぎる表現

---

## 📝 Gemini 固定テンプレート

**全プロンプトの先頭に必ずこの固定文を入れる：**

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
```

**Negative prompt (same every time):**
```
realistic, 3D render, photorealistic, dark background, colored background, gradient background,
shadow under feet, thin outline, muted colors, dull palette, scary face, adult content,
overly detailed weapon, blurry, low quality, watermark, text, multiple characters,
surrounding aura, floating particles around body, energy aura, fire aura,
sparkles floating around character, petals floating around, bubbles floating around,
stars floating around character, speed lines around body, smoke or steam effects
```

---

## 📋 Gemini 用 完全プロンプト（25種・コピペで即使用可）

> **使い方**: 各スキンの「Gemini プロンプト」枠をそのままコピーして Gemini Imagen に貼り付ける。
> 最初に `default` を生成し、それをスタイル基準にして残り24種を作る。

---

### 🌟 STEP 0 — デフォルト（最初に生成・スタイル基準）

**`default` — デフォルトまどうし**
テーマ色：ネイビーブルー × ゴールド

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A cheerful young wizard child in a plush deep-navy robe covered in scattered glittering gold star patterns.
Tall pointed navy hat with a brilliant gold star at the tip. Right arm raised high holding a glowing magic staff topped with a sparkling gold star.
Giant sparkly round eyes wide with pure excitement, the biggest most joyful grin imaginable.
Small golden stars twinkle and orbit around the entire body.
Design this as the game's protagonist — bright, iconic, unmistakably heroic. This character must make kids think "I want to be THIS one!"
```

---

### ⚔️ STEP 1〜6 — つよい系（6種）

**`knight_silver` — きらきらナイト**
テーマ色：シルバー × ロイヤルブルー

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A tiny chibi knight child in full gleaming silver plate armor that shines like a polished mirror.
Royal blue flowing cape, an adorably round silver shield, and a short glowing sword raised in a triumphant hero pose.
Expression: maximum smug confidence — "I will protect EVERYONE!!" — chest puffed out with pure pride.
Silver sparkles and glints explode outward from the armor in all directions. Built different.
```

---

**`mage_fire` — ほのおのまどうし**
テーマ色：赤・オレンジ × 黒

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A fiery young mage child in a vivid red-orange robe with flame patterns and a sleek black pointed hat.
Staff tip erupting with massive roaring flames — blazing orange and hot red.
Intense fire aura wrapping the entire body like a living inferno.
Eyes wide open and gleaming with reckless excitement — "MAGIC TIIIIME!!!" energy.
The whole figure glows as if lit from within by fire. Absolutely scorching.
```

---

**`mage_ice` — こおりのまどうし**
テーマ色：ホワイト × アイスブルー

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A composed young ice mage child in a shimmering silver-white robe covered in intricate snowflake and crystal patterns.
Staff topped with a large glowing blue ice crystal. Perfect hexagonal snowflakes drift slowly all around the body.
Expression: supremely cool, slightly smug "I've already won" face — effortlessly confident, zero stress.
The entire design radiates crisp, frosty, elegant blue-white energy. Untouchably cool.
```

---

**`ninja_dark` — くらやみのニンジャ**
テーマ色：黒 × 赤

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A stealthy ninja child in a deep charcoal-dark ninja outfit, crouched in a dynamic low ninja stance.
Face completely wrapped in dark cloth — only a pair of glowing SCARLET red eyes visible. Pure mystery.
Holding a large shuriken in each hand, blades glinting with red-tinted light.
Red accent details throughout: blazing red eyes, red cord on shoulders, red-reflected blade edges — boosting visual contrast.
IMPORTANT: The dark outfit sits on white background — draw EXTRA THICK, clearly defined black outline so the full silhouette reads perfectly. Body radiates shadowy speed-blur lines suggesting supernatural quickness.
```

---

**`knight_dragon` — りゅうのきし**
テーマ色：赤 × 黒 × ゴールド

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A fierce young dragon knight child in magnificent red dragon-scale armor with a ferocious dragon-head helmet sporting real horns.
Compact but menacing dragon wings spread open from the back. Blazing red lance raised triumphantly overhead, wrapped in actual fire.
Explosive orange-red flame aura roaring around the entire body.
Expression: the most legendary "I AM THE STRONGEST IN THE WORLD!!" swagger face ever put on a chibi.
Gold trim on every edge — maximum ferocity, maximum glory.
```

---

**`swordsman_thunder` — かみなりの剣士**
テーマ色：黒 × 紫 × 黄（稲妻）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: An electrifying young swordsman child in jet-black cool combat outfit.
Purple and yellow lightning bolts CRACKLE and ZAP violently all over the entire body.
One hand gripping a massive, imposing black greatsword with electric arcs dancing along the blade.
Wild thunder aura erupting outward like a controlled explosion of pure energy.
Expression: cool sideways glance toward the upper distance — radiating "We are not on the same level" absolute confidence.
Black + purple + electric yellow pop dramatically on white background. Make the lightning POP.
```

---

### 🌸 STEP 7〜12 — かわいい系（6種）

**`dancer_sakura` — さくらのおどり子**
テーマ色：桜ピンク × 白

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A graceful young sakura dancer child in a gorgeous vivid cherry-blossom pink Japanese dancer outfit with layered flowing fabric.
Large adorable flower ribbon hair accessory — pink and white. Right hand gracefully holding an open decorative fan.
Hundreds of cherry blossom petals flutter and swirl all around the body in a beautiful storm of pink.
Expression: radiant, sparkling ear-to-ear smile that lights up the whole design.
Traditional Japanese beauty + irresistible kawaii energy. Bright, pure pink-and-white joy.
```

---

**`rabbit_traveler` — うさぎのたびびと**
テーマ色：クリーム × ブラウン

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: An adventurous young rabbit traveler child in a fluffy cream-colored hooded cloak with bunny ears sticking up perkily from the hood.
Brown traveler's vest, a tiny adorable dagger at the hip, and the cutest little backpack on the back.
Expression: unstoppable "I'm going EVERYWHERE and I'll be fine!!" mega-energetic grin.
Bunny ears perked up tall, radiating pure wanderlust and readiness for adventure.
Cozy + cute + ready-for-anything. Irresistibly huggable adventurer.
```

---

**`fairy_princess` — ようせいのひめ**
テーマ色：ラベンダー × 白 × エメラルドグリーン（翼）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A magical young fairy princess child in a gorgeous, airy lavender fluffy dress.
Two pairs (4 wings total) of large, shimmering translucent emerald-green fairy wings spread beautifully behind — each wing catching imaginary light.
Cute flower crown on head. Star-tipped wand sparkling brilliantly in hand.
Floating just slightly above the ground in a dreamy, weightless hover pose.
Expression: enchanted, starry-eyed blissful smile — like living in a fairy tale.
Golden stars and glittering motes scatter all around. Pure dream energy.
```

---

**`princess_magic` — まほうのプリンセス**
テーマ色：ピンク × ゴールド × ホワイト

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A dazzling young magic princess child in an absolutely SPARKLING pink dress with a massive, impossibly fluffy skirt.
Huge gorgeous gold tiara on head. Right hand holding a rainbow-tipped star wand with stylish flair.
Hearts ♥ and stars ★ bursting and glittering in every direction around the body.
Expression: one eye winked adorably — "I'm NUMBER ONE and I know it!!" — pure princess power radiating from every single pixel.
Maximum sparkle. Maximum confidence. This is what royalty looks like.
```

---

**`mermaid` — マーメイドまほうし**
テーマ色：ティール × 水色 × ゴールド

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A bright young mermaid mage child with a cute teal fish-scale patterned top half and a shimmering blue-green sparkling mermaid tail — standing upright on the tail fin as if it were legs.
Holding a beautiful staff decorated with sea shells and coral. Iridescent round bubbles float and drift all around.
Aqua sparkle aura shimmering across the whole body like sunlight through water.
Expression: "LOOK AT ME, LOOK AT ME!!" beaming, absolutely delighted smile.
Vivid teal + sky blue + gold — lush, vibrant, and absolutely stunning.
```

---

**`ballerina` — ふわふわバレリーナ**
テーマ色：パステルピンク × ホワイト

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A graceful young ballerina child in an absolutely ENORMOUS fluffy pastel pink tutu skirt — maximum volume, maximum puffiness, at least 5 layers of ruffles like a pink cloud explosion.
White ballet shoes tied with satin ribbons, standing en pointe (on tiptoes).
Holding a gorgeous, oversized bouquet of pink and white roses in both hands — so big it's almost as wide as the tutu.
Expression: "YAAAAY!!!" triumphant glow-up smile radiating pure joy and achievement.
The ultimate cute and elegant combo — the tutu is so big it takes up half the frame width.
```
**Negative prompt (add to base):**
```
floating petals, rose petals in air, floating stars, sparkles in air
```

---

### 😄 STEP 13〜18 — おもしろ系（6種）

**`bear_kigurumi` — くまの着ぐるみ**
テーマ色：クリーム × ブラウン

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A supremely cozy young child wearing the fluffiest, softest cream-colored bear onesie ever made.
Tiny round bear ears poking up from the hood. Tummy perfectly round and poofy like a ball. Tiny chubby round mitten-hands peeking out from the sleeves.
A cute bear face (embroidered-style dot-eyes and small nose) printed as a design on the tummy.
Expression: the single most content, blissful, happy "grrrr~!!" grin in existence — this character has ZERO problems in life.
Utter softness. Peak comfort. Completely irresistible.
```

---

**`ragged_adventurer` — ボロボロぼうけんしゃ**
テーマ色：ぼろぼろブラウン × ベージュ

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A hilariously determined young adventurer child in a completely destroyed outfit — multiple torn holes, patches sewn on top of other patches, literally falling apart.
Band-aids stuck ALL over the body: face, arms, legs, everywhere.
Holding an absurdly oversized wooden club in both tiny hands — way too big for this child.
Expression: unshakeable, jaw-droppingly smug "I AM UNDEFEATED" grin — completely oblivious to being an absolute disaster.
The comedy is the gap: the outfit looks like they lost every fight, but the face says they won every single one.
```

---

**`dinosaur_cos` — ティラノコスチューム**
テーマ色：グリーン × イエロー

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: An extremely excited young child wearing a bright vivid green T-Rex dinosaur onesie with a yellow belly, complete with a tail and a little spiky back ridge.
Tiny hilarious stubby T-Rex arms sticking out helplessly from both sides of the onesie (they're practically useless and that's the point).
Regular kids' sneakers peeking out from the bottom hem of the costume — the punchline of the whole design.
Expression: wide open "RAAAWR!!! I'M A T-REX!!!" face with maximum chaos and joyful energy.
This design must make people laugh the second they see it.
```

---

**`ghost_pajama` — おばけパジャマ**
テーマ色：ホワイト × ライトグレー

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: An adorable young child completely hidden under a soft, rounded PALE GREY sheet ghost costume draped over the whole body.
Two perfectly round eyeholes cut into the sheet, with wide, cheerful, sparkling happy eyes peering out.
Two small feet wearing colorful sneakers sticking out from the bottom — the cutest detail in the whole design.
The sheet has a soft, puffy, rounded ghost silhouette — gentle, friendly, zero scary.
Expression: pure "BOO!!" joyful energy — a ghost that is 100% cute and 0% frightening.
NOTE: Use pale grey (#DDDDDD) for the sheet — strong visible grey shading and thick outline so the full silhouette reads clearly against white.
```
**Negative prompt (add to base):**
```
pure white sheet, white costume blending with background
```

---

**`robot_hakase` — ロボットはかせ**
テーマ色：シルバー × イエロー × レッド（ボタン）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A gleeful young mad-scientist child wearing a homemade robot armor built from cardboard and scrap — silver-painted with visible dents, tape marks, and stickers everywhere.
Chest panel covered in a glorious array of colorful GLOWING buttons and switches: red, yellow, blue, green — all lit up and blinking.
Two wobbly antennae on top of the head — one slightly bent, one with a bright blinking red light at the tip.
Arms spread wide in a triumphant pose.
Expression: the ultimate "MWAHAHAHA!! IT IS COMPLETE!!!" evil-genius triumph grin.
Handmade charm + cute chaos + peak comedy scientist energy. Absolutely delightful.
```
**Negative prompt (add to base):**
```
steam, smoke, vapor, exhaust from robot
```

---

**`tomato_costume` — ごきげんなトマト**
テーマ色：レッド × グリーン（へた）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A joyfully unhinged young child wearing a round, perfectly spherical vivid red tomato onesie — a full tomato shape, bright and red and round.
Green tomato stem and leaf cluster on top of the head. Tiny arms and tiny legs poking straight out from the big round tomato body.
Expression: the single most deliriously, uncontrollably happy "YAHOOOOO!!!!!!" wide-open grin ever rendered in digital art.
This design DEMANDS the reaction "Wait... why are you a tomato?!" — and the answer is: why NOT?
Pure comedic gold. Guaranteed to be someone's favorite skin.
```

---

### 🔮 STEP 19〜24 — ひみつ系（6種）

**`pirate_captain` — かいぞくキャプテン**
テーマ色：ブラック × ゴールド × レッド

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A swaggering young pirate captain child in a massive skull-and-crossbones tricorn hat absolutely dripping with gold ornaments.
Flamboyant red-and-black captain's coat covered in clanking gold chains, medals, and decorations.
Right hand: a gleaming cutlass catching the light. Left hand: a dramatically unrolled treasure map.
Expression: commanding, larger-than-life "THAT TREASURE IS MINE!!!" legendary captain face — oozing pure confidence and sea-dog charisma.
This is what a 2-head chibi pirate king looks like. Iconic.
```

---

**`astronaut` — うちゅうひこうし**
テーマ色：ホワイト × シルバー × ライトブルー（バイザー）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A dreamy young astronaut child in a puffy, rounded white spacesuit — perfectly soft and round like a marshmallow.
Perfectly circular helmet with a light blue visor, revealing a huge beaming smile inside.
Spacesuit decorated with colorful mission patches and a shiny gold badge on the chest.
Floating just slightly off the ground, feet dangling — zero gravity vibes.
Expression: "WE ARE GOING TO SPAAAACE!!!" — pure wonder, pure dreams, pure excitement.
NOTE: White spacesuit needs visible grey cel-shading and thick black outline to read clearly against white background.
```
**Negative prompt (add to base):**
```
floating planets, floating stars around body, space objects around character
```

---

**`rainbow_witch` — にじのまじょ**
テーマ色：レインボーグラデーション（赤・橙・黄・緑・青・紫）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A wildly colorful young rainbow witch child. Dress, cape, AND pointed hat all display a full 7-color rainbow gradient flowing top to bottom: red → orange → yellow → green → blue → indigo → violet — each color band bold and distinct.
Rainbow-striped stockings on both legs continuing the gradient all the way to the shoes.
Holding a rainbow staff with a small perfect rainbow arc shooting from its sparkling tip — contained to the staff only.
Expression: proud, self-satisfied "Isn't this BEAUTIFUL?! Look at me!!" dazzling show-off smile.
Maximally loud, maximally colorful. The most colorful costume in any room.
```
**Negative prompt (add to base):**
```
sparkles around body, glitter in air, magic particles floating, stars around character
```

---

**`royal_eternal` — えいえんのおうさま**
テーマ色：ゴールド × マルチカラー宝石（パープル・ルビー・サファイア）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: An overwhelmingly majestic chibi young eternal king. Full royal outfit made entirely of shimmering gold fabric — top to bottom, pure gold.
Jewels encrusting every square centimeter of the outfit: purple amethyst, ruby red, sapphire blue, emerald green — all embedded directly into the costume, blazing with color.
Comically, absurdly ENORMOUS crown on head — wider than the shoulders, taller than the head itself, impossibly gorgeous and dripping with more jewels than seems physically possible.
Expression: supreme, unassailable "Hmph. THIS... is my power." legendary swagger face — one eyebrow raised, completely unbothered.
Over-the-top luxury. This character IS wealth. The comedy is how serious they look wearing all of this.
```
**Negative prompt (add to base):**
```
gold aura, radiant glow around body, light rays from character, halo effect
```

---

**`demon_king` — まおう**
テーマ色：ブラック × ダークパープル × レッド（目・オーラ）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: A chibi young demon king radiating dark power through design alone — no aura needed.
Sweeping jet-black cloak lined with deep purple, printed with crescent moons and jagged stars.
Two impressively LARGE curved demon horns on the head — bigger than the fists. Small but dramatic bat wings folded behind the back.
Sharp claw-like black gauntlets on both hands. Eyes glowing a vivid, brilliant crimson red — the most striking feature.
Expression: "MWAHAHAHA!!" — but because it's a 2-head chibi with a huge round head, simultaneously adorable.
This is the perfect balance: dangerously cool on the outside, secretly cute on the inside.
Kids must look at this and immediately think "I NEED this skin."
```
**Negative prompt (add to base):**
```
dark aura, shadow aura, purple mist around body, energy aura, dark smoke
```

---

**`grimoire_guardian` — グリモアガーディアン（最終スキン）**
テーマ色：ディープネイビー × ゴールド × ホワイト（光）

```
2-head chibi character, skin for kids mobile game "Grimoire Guardians".
Thick black outline, flat color + single-layer cel shading, vivid and bright color palette.
Front-facing full-body standing pose, pure white background (#FFFFFF), no shadows.
Vertical 2:3 composition, generate at 480×720px.
Japanese kids game art style inspired by Yo-kai Watch, Pokémon Mystery Dungeon, and Splatoon.
---
Character: The true form of the Grimoire Guardian — the ultimate symbol of this game.
Deep navy outer robe completely covered in glowing golden magic circle inscriptions and ancient rune patterns etched into every surface of the fabric — the robe itself IS the magic.
Left hand holding a large open ancient grimoire — brilliant golden light radiating from the pages of the book only, contained within the book's glow.
Right hand raised with two fingers pointing upward — a confident guardian's pose.
Expression: proud, brilliant, unbreakable "I will protect EVERYTHING!!" smile — the most beautiful, most powerful smile in the entire game.
This is the FINAL skin. Most iconic, most awe-inspiring, most legendary design possible. Make it perfect. Make it unforgettable.
```
**Negative prompt (add to base):**
```
pages flying around, white aura, magical aura, glowing pages in air, book pages floating
```

---

## 🏭 生成順序（この順番で生成する）

| 順番 | id | 理由 |
|------|-----|------|
| 1 | `default` | **スタイル基準**。これが決まったら以降のスタイルを統一 |
| 2 | `knight_silver` | テイラーLv1 最初の選択肢 |
| 3 | `mage_fire` | テイラーLv1 最初の選択肢 |
| 4 | `bear_kigurumi` | テイラーLv1 最初の選択肢 |
| 5 | `dancer_sakura` | テイラーLv1 最初の選択肢 |
| 6 | `ragged_adventurer` | テイラーLv1 最初の選択肢 |
| 7 | `rabbit_traveler` | 7日連続ログイン報酬 |
| 8〜12 | Lv2クラフト5種 | `mage_ice`, `ninja_dark`, `fairy_princess`, `princess_magic`, `dinosaur_cos` |
| 13〜15 | ストリーク報酬 | `ghost_pajama`, `pirate_captain`, `tomato_costume` |
| 16〜19 | Lv3クラフト＋フラグメント | `knight_dragon`, `mermaid`, `ballerina`, `swordsman_thunder`, `robot_hakase` |
| 20〜22 | SECRET（マイルストーン）| `astronaut`, `rainbow_witch`, `demon_king` |
| 23 | `royal_eternal` | 超レア宝箱ドロップ |
| 24 | `grimoire_guardian` | 全施設MAX マイルストーン |
| 25 | `grimoire_guardian` ※再確認 | 最終スキンとして最高品質で仕上げる |

---

## ✅ 品質チェックリスト（1枚ごとに確認）

| チェック項目 | OK の基準 |
|-------------|-----------|
| 頭身 | 2〜2.5頭身（頭がとにかく大きい） |
| 背景 | 白単色（生成時） → 背景除去後に透過PNGにする |
| 40px表示 | 40pxに縮小してもキャラが認識できる |
| アウトライン | 太くてはっきりしている |
| テーマカラー | そのスキンの色が一目でわかる |
| 表情 | 子供が「かわいい！」「かっこいい！」と言える |
| 個性 | 25枚並べたとき見分けがつく |
| ゲーム雰囲気 | 魔法・冒険・わくわく感がある |

---

## ⚠️ 注意点

- Gemini で生成後、**rembg**（ローカル・無制限・無料）または **remove.bg**（月50枚まで）で透過処理すること
- `ninja_dark` など黒系は背景除去後に輪郭を目視確認すること
- 画像は **480×720px で生成 → 240×360px に縮小**（画質劣化防止）
- 1枚ごとに `CharacterAvatar.lg`（120px）で実機確認してから次へ
- 全25枚完成後：**sw.js の `ASSETS[]` に全パスを追加 → `SW_VERSION` を上げる**

---

この計画で進めますか？（はい／修正して）
