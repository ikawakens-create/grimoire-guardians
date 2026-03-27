# 船ビルド実装計画 — Phase C：アセット生成

**前提**: Phase B（ShipBuildScreen UI）実装済み
**日付**: 2026-03-27

---

## Phase C の目的

Phase B で実装した ShipRenderer が参照する PNG 素材を作成する。
PNG がなければ `<img>` タグは空表示になるが、フォールバック処理があるので画面は壊れない。

---

## アセット一覧

### 小型船ベース

| ファイルパス | 内容 |
|------------|------|
| `assets/ships/katachi/small_base.png` | 小型船ベース（CSS filter で色変え） |

小型スキンは CSS filter のみで対応するため PNG は **1枚だけ**。

```css
/* 例: 赤スキン */
.skin-red { filter: hue-rotate(340deg) saturate(1.5); }
```

---

### 船パーツ PNG（6テーマ × スロット）

各 PNG サイズ: **480×320px**、透過背景（PNG-24）

#### katachi（船体形状）スロット

| ファイル | テーマ | 内容 |
|--------|--------|------|
| `assets/ships/katachi/katachi_pirate.png`  | かいぞく | 黒い船体、破れた木板、大砲の穴 |
| `assets/ships/katachi/katachi_coral.png`   | さんご   | ピンク・橙のサンゴ模様 |
| `assets/ships/katachi/katachi_pearl.png`   | にんぎょ | 白銀の船体、真珠装飾 |
| `assets/ships/katachi/katachi_ghost.png`   | ゆうれい | 半透明・ぼんやりした輪郭 |
| `assets/ships/katachi/katachi_dragon.png`  | りゅう   | 赤黒い龍の鱗模様 |
| `assets/ships/katachi/katachi_space.png`   | うちゅう | 金属シルバー、星型の窓 |

#### suishin（推進・帆）スロット

| ファイル | テーマ | 内容 |
|--------|--------|------|
| `assets/ships/suishin/suishin_skull.png`   | かいぞく | どくろ模様の大きな帆 |
| `assets/ships/suishin/suishin_fan.png`     | さんご   | 扇形の橙い帆 |
| `assets/ships/suishin/suishin_wave.png`    | にんぎょ | 波型にうねる青い帆 |
| `assets/ships/suishin/suishin_dark.png`    | ゆうれい | 黒い煙を吐くスクリュー |
| `assets/ships/suishin/suishin_magic.png`   | りゅう   | 炎が渦巻く魔法推進 |
| `assets/ships/suishin/suishin_rocket.png`  | うちゅう | ロケット噴射エンジン |

#### senshu（船首）スロット ※large のみ

| ファイル | テーマ | 内容 |
|--------|--------|------|
| `assets/ships/senshu/senshu_cannon.png`    | かいぞく | 黒い大砲 |
| `assets/ships/senshu/senshu_mermaid.png`   | にんぎょ | 人魚の女神像 |
| `assets/ships/senshu/senshu_ghost.png`     | ゆうれい | 幽霊の顔（目が光る） |
| `assets/ships/senshu/senshu_dragon.png`    | りゅう   | 龍の頭部 |
| `assets/ships/senshu/senshu_crystal.png`   | うちゅう | 透明な水晶の砲台 |

#### senbi（船尾）スロット ※large のみ

| ファイル | テーマ | 内容 |
|--------|--------|------|
| `assets/ships/senbi/senbi_broom.png`       | ゆうれい | ほうきのしっぽ |
| `assets/ships/senbi/senbi_rainbow.png`     | にんぎょ | 虹色の尾 |
| `assets/ships/senbi/senbi_dragon.png`      | りゅう   | 龍のしっぽ |
| `assets/ships/senbi/senbi_rocket.png`      | うちゅう | ロケットのノズル |

#### hata（旗）スロット

| ファイル | テーマ | 内容 |
|--------|--------|------|
| `assets/ships/hata/hata_skull.png`         | かいぞく・ゆうれい | どくろ旗 |
| `assets/ships/hata/hata_coral.png`         | さんご   | サンゴ模様旗 |
| `assets/ships/hata/hata_star.png`          | にんぎょ・うちゅう | 星型旗 |
| `assets/ships/hata/hata_dragon.png`        | りゅう   | 龍の家紋旗 |

---

## 画像生成プロンプト（船パーツ共通スタイル）

以下を**全パーツ**に適用するスタイルアンカー。

```
SHARED STYLE ANCHOR — Ship Part PNG (apply to ALL parts):
- Art style: 2D digital illustration, bold flat color, cel-shaded, game asset style
- Perspective: Slight side-angle (≈15° from directly side), showing the part clearly
- Size: The illustrated element fills roughly 60–75% of the 480×320 canvas
- Background: Fully transparent (PNG-24 with alpha channel) — NO background colors, gradients, or shadows
- Lines: Clean black outlines, 2–3px weight
- Lighting: Soft top-left light source, subtle highlight on upper surfaces
- Palette: Vibrant, saturated game-appropriate colors — avoid realistic/muted tones
- Detail level: Medium — readable at thumbnail size (120×80px), not overly complex
- Style reference: Animal Crossing sea-craft × Yo-kai Watch × One Piece chibi
- Target audience: Japanese elementary school children (ages 7–9)
- CRITICAL: Each PNG layer must be designed to composite perfectly on top of
  a 480×320 ship base — draw ONLY the specific part, not the full ship
```

---

### かいぞくセット プロンプト集

#### katachi_pirate.png

```
Game asset PNG, transparent background, 480x320px.
A chibi pirate ship hull/body viewed from the side (slight 3/4 angle).
Dark weathered wooden planks with visible wood grain and metal bolts.
Three circular cannon porthole openings along the side (no cannons shown — separate layer).
Tattered edges at the bottom. Small skull-and-crossbones carved into the wood near the bow.
Black and dark-brown color scheme. Slightly cartoony, not realistic.
The hull occupies the lower 2/3 of the canvas. Top portion transparent for masts/sails.
STYLE ANCHOR: cel-shaded 2D, clean outlines, vibrant chibi game art.
No background, pure alpha channel outside the hull.
```

#### suishin_skull.png

```
Game asset PNG, transparent background, 480x320px.
A single large billowing pirate sail for a chibi-style ship, viewed from the side.
The sail is white/cream colored with a large black skull-and-crossbones (jolly roger)
painted in the center. The sail is slightly puffed out as if catching wind.
Rope rigging visible on the edges. Sail positioned in the upper-center of canvas.
Lower and side areas fully transparent (this layer sits on top of the ship hull).
STYLE ANCHOR: cel-shaded 2D, clean outlines, game asset.
```

---

### にんぎょセット プロンプト集

#### katachi_pearl.png

```
Game asset PNG, transparent background, 480x320px.
A chibi mermaid-themed ship hull, side view.
The hull is smooth and lustrous, like a giant polished pearl or abalone shell.
Silver-white and soft iridescent blue-green color. Small pearls embedded along the rim.
Delicate wave engravings. The bow curves upward gracefully like a shell lip.
Lower 2/3 of canvas, top transparent.
STYLE ANCHOR: cel-shaded 2D, clean outlines, vibrant chibi game art.
```

#### senshu_mermaid.png

```
Game asset PNG, transparent background, 480x320px.
A chibi mermaid figurehead for the bow of a ship.
The mermaid is carved from shimmering pale wood/crystal, facing forward.
She has flowing silver-blue hair, a gentle smile, arms outstretched.
Scale details on her tail catching light. Positioned at left-center of the canvas
(the bow of the ship would be to the left). Small in scale relative to canvas.
STYLE ANCHOR: cel-shaded 2D, game asset chibi style.
```

---

### さんごセット プロンプト集

#### katachi_coral.png

```
Game asset PNG, transparent background, 480x320px.
A chibi ship hull covered in pink and orange coral formations.
The ship body is warm orange-brown wood, with clusters of pink branching coral
growing along the sides and around the edges. Some coral pieces have tiny
fish hiding in them. Rounded, friendly shapes. Lower 2/3 of canvas.
STYLE ANCHOR: cel-shaded 2D, vibrant warm colors, game asset.
```

---

### ゆうれいセット プロンプト集

#### katachi_ghost.png

```
Game asset PNG, transparent background, 480x320px.
A ghost ship hull with a spooky chibi style.
The hull is semi-transparent looking, pale grayish-blue with a slight glow effect.
Tattered, fraying wood edges. Ghostly mist wisps floating around the bottom.
Two glowing yellow eyes visible in the hull as porthole windows.
Slightly wobbling/warped shape as if not quite solid. Lower 2/3 of canvas.
STYLE ANCHOR: cel-shaded 2D, eerie but cute, chibi game asset.
```

---

### りゅうセット プロンプト集

#### katachi_dragon.png

```
Game asset PNG, transparent background, 480x320px.
A dragon-scale chibi ship hull — fierce and impressive.
The hull is covered in overlapping dark red and black dragon scales.
The bow of the ship curves upward into a dragon's lower jaw (teeth visible).
Glowing amber veins of fire run along the scale seams.
Golden spikes along the top edge of the hull. Imposing but chibi-proportioned.
Lower 2/3 of canvas.
STYLE ANCHOR: cel-shaded 2D, dramatic but cute, game asset.
```

---

### うちゅうセット プロンプト集

#### katachi_space.png

```
Game asset PNG, transparent background, 480x320px.
A space-age chibi spaceship-boat hybrid hull.
The hull is sleek, metallic silver with a smooth aerodynamic shape.
Small circular windows like portholes. Glowing blue energy lines along the hull edges.
Star-shaped rivets. A small satellite dish mounted on one side.
Futuristic but still clearly a "ship" with chibi proportions.
Lower 2/3 of canvas.
STYLE ANCHOR: cel-shaded 2D, sci-fi but cute, game asset.
```

---

## Grade 2 NPC プロンプト集

共通スタイルアンカーは `画像生成プロンプト集_v1.0.md` の「共通スタイル指定」と同じ。

### タコぞう（captain_takuzo）

**ファイル:** `assets/npcs/g2/captain_takuzo.png`
**役割:** 深海グリモアのナビゲーター、船長、子供の相棒

```
APPLY SHARED NPC STYLE ANCHOR from 画像生成プロンプト集_v1.0.md first.

A chibi sea captain octopus character named "Tako-zo" (タコぞう).
He is a round, cheerful purple octopus wearing a tiny navy blue captain's hat
with a gold anchor emblem on the front. He has eight small tentacles — two are
raised in a thumbs-up/wave gesture, and two hold a tiny treasure map.
His eyes are enormous, bright, and round with golden irises, full of adventure.
He wears a small red captain's coat with oversized golden buttons.
A tiny compass hangs from a chain around his "neck" (where body meets head).
Expression: pure excitement — huge grin, eyes sparkling, one tentacle pointing
dramatically forward as if shouting "FULL SPEED AHEAD!"
Signature detail: he always has one tentacle holding an open treasure map,
and his captain hat is slightly too big and tips to one side.
Background: pure white, for alpha masking.
```

### 人魚の算術士 リーナ（mermaid_lina）

**ファイル:** `assets/npcs/g2/mermaid_lina.png`
**役割:** 九九を教える人魚の先生

```
APPLY SHARED NPC STYLE ANCHOR.

A chibi mermaid character who is also a math teacher.
She has shimmering teal-blue hair in a high ponytail with small starfish clips.
Her upper body wears a pale blue vest decorated with equation symbols (×, ÷, +).
Her mermaid tail is iridescent pink-to-purple gradient, with scale patterns.
She carries a large chalkboard eraser shaped like a fish in one hand,
and writes "9×9=?" in glowing bubbles in the air with the other.
Round glasses perched on her nose. Warm, encouraging teacher expression.
Signature detail: her glasses are shaped like tiny multiplication signs (×).
Background: pure white.
```

### サンゴの大工さん（coral_daiku）

**ファイル:** `assets/npcs/g2/coral_daiku.png`
**役割:** 図形・形を教えるクラフトマン

```
APPLY SHARED NPC STYLE ANCHOR.

A friendly chibi hermit crab wearing a large pink coral shell as his house/backpack.
He has bright orange claws — one holds a carpenter's square (L-shaped ruler)
and the other holds a tiny hammer. He wears a tool belt made of seaweed.
A hard hat shaped like a sand dollar sits on his head.
Small, round, and stocky proportions — clearly strong and hardworking.
Expression: proud craftsman smile, one claw raised showing the carpenter's square.
Signature detail: tiny blueprints of geometric shapes (triangle, circle, square)
visibly rolled up and tucked into his tool belt.
Background: pure white.
```

### 灯台守のおじいさん（lighthouse_ojii）

**ファイル:** `assets/npcs/g2/lighthouse_ojii.png`
**役割:** 時刻・時計を教える老人

```
APPLY SHARED NPC STYLE ANCHOR.

A wise, kind elderly sea turtle character who lives in a lighthouse.
He has a worn, dark green shell on his back shaped like a lighthouse —
a tiny glowing light at the top. Long white eyebrows and a flowing white beard.
He wears a cozy navy-blue fisherman's sweater and carries a large pocket watch
in one flipper. The watch face is clearly visible with clock hands.
Warm crinkled eyes, a gentle patient smile. Moves slowly but wisely.
Signature detail: his shell is a miniature lighthouse with an actual working
glowing yellow dot at the top. The pocket watch shows exactly 3:00.
Background: pure white.
```

### 海の賢者（sea_sage）

**ファイル:** `assets/npcs/g2/sea_sage.png`
**役割:** ストーリー進行・深海の謎を語る

```
APPLY SHARED NPC STYLE ANCHOR.

A mysterious and ancient-looking chibi anglerfish wizard.
Deep sea dark blue-black skin with bioluminescent spots glowing soft blue-green.
A long curved lure antenna above his head, glowing at the tip.
He wears a flowing dark robe covered in glowing mathematical symbols and sea charts.
Long flowing white beard (unusual for a fish). Carries a staff topped
with a glowing deep-sea lantern. Ancient, wise expression — half-closed eyes,
knowing smile. Despite looking mysterious, still clearly cute and chibi.
Signature detail: his antenna lure glows in the shape of a question mark.
Background: pure white.
```

---

## 生成後の配置手順

```bash
# 1. 透過処理（NPC のみ。船パーツは生成時から透過で作るのでスキップ可）
python3 scripts/remove_bg.py assets/npcs/g2/captain_takuzo.png

# 2. ファイル配置
assets/
  ships/
    katachi/   ← katachi_*.png, small_base.png
    suishin/   ← suishin_*.png
    senshu/    ← senshu_*.png
    senbi/     ← senbi_*.png
    hata/      ← hata_*.png
  npcs/
    g2/        ← captain_takuzo.png, mermaid_lina.png, ...

# 3. sw.js の ASSETS[] に追加（Phase B-5 の手順と同じ）
```

---

## テスト確認項目

- [ ] 各 PNG が 480×320px であること
- [ ] 透過部分が正しく抜けていること
- [ ] ShipRenderer の各レイヤーに正しく表示されること
- [ ] thumbCrop が shipItems.js の設定と一致していること
- [ ] Grade 2 NPC が zone カットインで正しく表示されること
- [ ] sw.js キャッシュに新パスが追加されていること
