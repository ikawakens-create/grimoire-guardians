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
- Type: 2D game asset layer for compositing. Draw ONLY the specified part.
- Art style: Flat cel-shaded illustration. Bold, clean. NOT painterly, NOT realistic.
- Outline: 4–5px clean black outlines (must survive 4× downscale to 120×80px thumbnail)
- Cel-shading: 1 hard shadow band only (terminator at 65% from top-left light source).
  1 top-left specular highlight strip. NO gradient fills. NO multi-band shading.
- Canvas: 480×320px, pure white background (#FFFFFF) — for alpha masking after generation.
  NO shadows cast on background. NO ground plane. NO environment.
- Background note: White background will be removed via rembg after upload to GitHub.
  Areas described as "Transparent" in each prompt = regions that should contain
  ONLY white background (draw nothing there — leave pure white).
- GLOBAL PHYSICS: Wind direction = RIGHT (→). All sails, flags, smoke, flames,
  and exhaust must flow/billow toward the RIGHT side of canvas. No exceptions.
- Mast x-position: When present, center mast at exactly x=40% (≈192px from left).
  suishin and hata masts MUST share this same x-coordinate for perfect alignment.
- Thumbnail rule: Primary silhouette must read as a distinct shape at 120×80px.
  Max 1 focal detail element visible at thumbnail. No fine-line-only identifiers.
- Style reference: Animal Crossing sea-craft × Yo-kai Watch × One Piece chibi
- Target: Japanese elementary school children (ages 7–9). Never frightening.
- Disambiguation: If two interpretations exist, choose the bolder/simpler one.
```

---

### かいぞくセット プロンプト集

#### katachi_pirate.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — katachi (hull body), pirate theme
Layer order: Bottom layer (composited under everything)
Layers ON TOP: suishin_skull, senshu_cannon, hata_skull
Thumbnail: 120×80px — dark plank hull silhouette must be instantly recognizable
DRAW ONLY: The hull body. DO NOT DRAW: cannons, masts, sails, flags,
figureheads, stern decorations, water, ocean, sky, any background,
any other ship parts. Hull body ONLY.

[CANVAS MAP]
Hull: x=5–95%, y=35–98%
Bow (left): rises to y=35% at x=8%, angled at ≈30° above horizontal
Stern (right): blunt vertical edge at x=92%, deck line at y=42%
Deck top edge: roughly horizontal x=8–92%, y≈40–42%
Waterline bottom edge: irregular tattered line at y≈96–98%
Transparent region: entire upper canvas above deck line (y=0–40%)

[SILHOUETTE]
Classic side-view ship hull: broad and low. Bow curves upward-left at 30°.
Stern blunt and vertical. Hull widest point (belly) at y=70%.
Bottom edge rough and tattered — NOT a straight line.

[PALETTE — PIRATE THEME CONTRACT]
#1a0f07 = primary wood (dark near-black planks)
#3d2010 = secondary wood (dark brown grain highlights)
#5c3a1e = tertiary wood (mid-brown raised plank edges)
#4a4a4a = iron bolts and cannon porthole rings
#7a3c1a = rust accent (porthole edges, bolt patches)
#c8c0a0 = skull carving (off-white)

[SURFACE]
Horizontal planks: dense grain lines, alternating #1a0f07 and #3d2010 rows.
Each plank ≈8px tall at full size. Grain = horizontal parallel strokes.
CEL-SHADING: 1 hard shadow band across lower hull (y=72–98%), hard-edge terminator.
1 specular highlight strip along top-left deck edge.

[DETAIL ELEMENTS]
- 3 circular cannon porthole openings along hull centerline (y≈55%), evenly spaced.
  Each porthole: diameter ≈30px. Iron ring frame #4a4a4a. Interior solid black.
  NO cannons inside — cannons are a separate senshu layer.
- Iron bolts (#4a4a4a) at plank intersections, every ≈40px horizontally.
- Small skull-and-crossbones carving (#c8c0a0) near bow (x≈18%, y≈50%).
  Chibi skull: round form, oval eye sockets, wide flat teeth. NOT terrifying.
- Lower hull edge: 3–4 irregular tattered wood splits.

[THEME CONTRACT]
This is the reference file for all PIRATE theme parts.
suishin_skull, senshu_cannon, hata_skull must match this wood and iron palette.
```

#### suishin_skull.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — suishin (sail), pirate theme
Layer order: ON TOP of katachi_pirate. hata_skull sits ON TOP.
Thumbnail: 120×80px — large billowing sail with Jolly Roger must read clearly
DRAW ONLY: Exactly ONE sail, ONE mast, and minimal rigging. Nothing else.
DO NOT DRAW: hull body, figureheads, stern decorations, ANY other sails,
ANY other masts, ANY background sails or rigging behind the main sail,
water, sky, background, sea creatures. ONE SAIL ONLY — if you draw more than
one sail or more than one mast, the image is WRONG.

[CANVAS MAP]
Mast: vertical pole at x=40% (≈192px), from y=95% down to y=10%
Yard arm: horizontal bar crossing mast at y=25%, spanning x=18–70%
Sail: attached to yard arm, billowing RIGHT. x=18–68%, y=24–80%
Rigging: 2 stay ropes from mast top (y=10%) to canvas corners
Transparent: x=0–17%, x=69–100%, y=0–23% (above yard arm)

[SILHOUETTE]
Sail shape: roughly square, pronounced right-side billow.
Left edge (luff): slightly concave (taut against wind).
Right edge: convex bulge, maximum at x=65%.
Top edge: straight along yard arm. Bottom edge: slightly concave.

[PALETTE — PIRATE THEME CONTRACT]
#f5f0e0 = aged sail cloth (cream-white base)
#d8d0b8 = sail shadow band (lower-right sail surface)
#3d2010 = mast wood (match katachi_pirate #3d2010)
#4a4a4a = iron yard arm hardware
#f5f5f5 = Jolly Roger skull and bones (near-white on cream sail)

[SURFACE]
Sail: flat #f5f0e0 base. Subtle horizontal warp thread lines (low contrast, 2px spacing).
1 hard shadow band (#d8d0b8) across right-lower sail quadrant.
Mast: #3d2010 wood, vertical grain, 1 highlight strip on left face.

[DETAIL ELEMENTS]
- Jolly Roger centered on sail at ≈(x=38%, y=45%). Occupies 45% of sail width.
  Skull: SOLID WHITE FILL (#f5f5f5) — NOT outline-only. High contrast on cream background.
  Round chibi skull: large circular eye sockets (filled dark), wide flat grin.
  NOT terrifying — almost cute. Think "friendly Halloween".
  Crossbones: two femur bones in bold X, SOLID WHITE FILL, thick rounded ends.
  The entire Jolly Roger must be clearly visible at 120×80px thumbnail.
- 3 rope ratlines on left side of mast (horizontal rungs, y=30–90%).
- Tattered sail bottom edge: 2–3 small triangular rips, lower-right.

[MAST ALIGNMENT CRITICAL]
Mast at x=40% (192px). hata_skull mast MUST share this exact position.
These two masts are the SAME mast and must align perfectly when composited.

[THEME CONTRACT]
Match katachi_pirate: mast wood #3d2010, iron hardware #4a4a4a.
```

#### senshu_cannon.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senshu (bow ornament), pirate theme
Layer order: ON TOP of katachi_pirate, at bow (left side)
Thumbnail: 120×80px — chunky cannon silhouette pointing left must be identifiable
CRITICAL: FLAT 2D SIDE VIEW ONLY. No 3D perspective. No isometric view.
This is a flat cel-shaded 2D game asset — draw as if looking at the cannon
directly from the SIDE (90° profile view). NOT from above-front. NOT from 3/4 angle.
DRAW ONLY: The cannon and its mounting carriage. DO NOT DRAW: hull body,
sails, mast, flags, cannonballs in flight, smoke effects.
NOTE: 2 stacked cannonballs on the bracket (static prop) ARE included.

[CANVAS MAP]
Cannon barrel: x=5–52%, y=30–55% (diagonal, angled upward-left ≈15°)
Mounting carriage: x=20–55%, y=50–80%
Connection edge (right): x=52–58% — attaches to hull bow
Two stacked cannonballs: x=40–55%, y=68–80%
Transparent: y=0–28%, x=59–100%

[SILHOUETTE]
FLAT 2D SIDE VIEW: the cannon is drawn as a pure side profile — like a technical
drawing or classic video game sprite. Width is clearly visible, depth is NOT.
Barrel: thick flat rectangle tapering slightly. Angled 15° above horizontal.
Muzzle (left): slightly flared opening, faces left edge.
Breech (right): round and heavy. Touch-hole visible on top surface.
The carriage below is also a flat 2D side view — two wheels visible as flat circles.

[PALETTE — PIRATE THEME CONTRACT]
#2a2a2a = cannon barrel (dark iron)
#1a1a1a = barrel shadow side (1 hard shadow band, underside)
#3d3d3d = barrel highlight face (top-left lit)
#7a3c1a = rust patches (match katachi_pirate #7a3c1a)
#3d2010 = wooden carriage (match katachi_pirate wood)
#4a4a4a = iron wheel hubs and barrel bands
#c8c0a0 = skull embossing (match katachi_pirate carving color)

[SURFACE]
Barrel: flat #2a2a2a. 1 hard shadow band on lower half.
3 decorative iron bands around barrel at 25%, 55%, 85% of barrel length.
Rust patches (#7a3c1a) near breech and band edges.
Carriage: wood planks (#3d2010) with iron wheel axle (#4a4a4a).

[DETAIL ELEMENTS]
- Skull-and-crossbones deeply embossed on barrel top (x≈30%, y≈35%).
  Same chibi skull style as katachi_pirate carving. Color #c8c0a0.
- Short coiled rope fuse hanging from touch-hole. Rope color #8a6040.
- Two cannonballs (sphere, #2a2a2a with highlight) stacked in pyramid on carriage.

[CONNECTION EDGE]
Right mounting bracket (x≈55%): beveled trapezoidal socket shape.
Texture matches hull wood (#3d2010) with visible iron mounting bolts.
NOT a plain cut — implies it is bolted into the hull bow.

[THEME CONTRACT]
Match katachi_pirate: wood #3d2010, iron #4a4a4a, rust #7a3c1a.
```

#### hata_skull.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — hata (flag), pirate + ghost theme (SHARED)
Layer order: ON TOP of suishin layer
Thumbnail: 120×80px — black flag with Jolly Roger on dark mast = instantly readable
CRITICAL — OUTPUT EXACTLY ONE FLAG: Generate a single image with one flag and
one mast. DO NOT generate multiple versions, reference panels, design previews,
or two flags side by side. ONE image, ONE flag, ONE mast. Nothing else.
DRAW ONLY: One flag and upper mast section only. DO NOT DRAW: hull, sails,
any ship body, ocean, sky, background, clouds.

[CANVAS MAP]
Flag mast: x=40% (≈192px) — MUST match suishin_skull mast x-position exactly
Mast visible: y=5–55% (lower mast hidden behind suishin sail layer)
Flag: x=40–80%, y=8–42%
Transparent: all areas outside flag and mast section

[SILHOUETTE]
Flag: rectangular. Left edge straight (attached to mast).
Right edge: jagged — 3 irregular triangular rips (well-worn).
Top edge: straight. Bottom edge: mostly straight, slight droop at right.
Flag billows moderately RIGHT (heavy fabric, not extreme).

[PALETTE — PIRATE/GHOST SHARED CONTRACT]
#0d0d0d = flag surface (near-black)
#1a1a1a = flag shadow area (lower-right, 1 shadow band)
#3d2010 = mast wood (match katachi_pirate #3d2010)
#f5f5f5 = Jolly Roger design (near-white)
#4a4a4a = iron halyard cleat at mast top

[SURFACE]
Flag: flat #0d0d0d. Very subtle fabric weave texture (1px grid, barely visible).
1 shadow band (#1a1a1a) across lower-right quarter.

[DETAIL ELEMENTS]
- Jolly Roger centered on flag (x≈58%, y≈22%):
  MUST MATCH suishin_skull skull exactly — same chibi round skull, same X-bones.
  Bold #f5f5f5 on #0d0d0d. High contrast, readable at thumbnail.
- Right edge: 3 sharp V-shaped rips (NOT fringe — clean triangular cuts).
- Iron halyard cleat bolted at mast top (y≈7%).
- Thin white halyard rope tying flag hoist edge to mast.

[MAST ALIGNMENT CRITICAL]
Mast at EXACTLY x=40% from the left edge (= 192px from left on a 480px canvas).
This is slightly LEFT OF CENTER — do NOT place at center (x=50%). EXACTLY x=40%.
MUST match suishin_skull mast position exactly.
The two masts are the SAME mast — perfect composite alignment required.

[THEME CONTRACT]
Match katachi_pirate mast wood #3d2010.
Jolly Roger skull MUST match suishin_skull skull style exactly.
This flag is SHARED with ゆうれいセット — works for both pirate and ghost themes.
```

---

### にんぎょセット プロンプト集

#### katachi_pearl.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — katachi (hull body), pearl/mermaid theme
Layer order: Bottom layer
Layers ON TOP: suishin_wave, senshu_mermaid, hata_star, senbi_rainbow
Thumbnail: 120×80px — lustrous pale hull with pearl strands must read as distinct theme
DRAW ONLY: Hull body only. DO NOT DRAW: masts, sails, figureheads, flags,
stern fins, water, waves, ocean, background, mermaids on the hull surface.

[CANVAS MAP]
IDENTICAL silhouette template to katachi_pirate (consistent hull shape across ALL themes).
Hull: x=5–95%, y=35–98%
Bow (left): rises to y=35% at x=8%, 30° upward angle
Bow tip: smooth shell-spiral curl (small decorative difference from pirate bow)
Stern (right): blunt at x=92%, deck line at y=42%
Transparent: y=0–40%

[SILHOUETTE]
Same base shape as katachi_pirate. Only the bow tip differs: ends in a smooth
shell-spiral curl, not a flat point.

[PALETTE — PEARL/MERMAID THEME CONTRACT]
#e8eef5 = hull primary (pale silver-white, shell base)
#f0e8d8 = hull highlight (warm pearl tone, top-left lit surface)
#c8c0b8 = hull shadow band (cool grey, lower hull)
#a8d8d0 = waterline accent (aqua-teal, bottom edge only)
#d0d8e0 = pearl bead color
#ffffff = pearl specular dot (single bright highlight per pearl)
NOTE: DO NOT generate rainbow or oil-slick iridescent effects.
Achieve shell quality through flat color + 1 highlight strip only.

[SURFACE]
Hull base: flat #e8eef5. Smooth — minimal line detail. Appears polished.
1 warm highlight strip (#f0e8d8) along top-left deck edge only.
1 hard shadow band (#c8c0b8) across lower hull (y=72–98%).
Waterline: #a8d8d0 applied ONLY at hull bottom edge (y=92–98%).

[DETAIL ELEMENTS]
- 3 horizontal strands of pearl beads along hull sides:
  Top strand: y≈48%, pearls every 20px, each diameter ≈8px
  Mid strand: y≈58%, same spacing
  Lower strand: y≈68%, same spacing
  Pearl: #d0d8e0 base with single #ffffff specular dot at top-left.
- Wave engravings along upper hull edge (y=42–47%): sinusoidal pattern,
  low-relief (2px dark line, 1px light line above). 3 full wave cycles.
- Bow spiral: small shell-spiral curl at bow tip (x=5–12%, y=36–44%).

[THEME CONTRACT]
This is the reference file for all PEARL/MERMAID theme parts.
suishin_wave, senshu_mermaid, senbi_rainbow, hata_star must reference this palette.
```

#### suishin_wave.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — suishin (sail), pearl/mermaid theme
Layer order: ON TOP of katachi_pearl. hata_star sits ON TOP.
Thumbnail: 120×80px — wave-curved organic sail silhouette is DISTINCT from rectangular sails
DRAW ONLY: Wave-shaped sail and mast. DO NOT DRAW: hull, figurehead, flags,
stern decoration, water, sea creatures, mermaids, background.

[CANVAS MAP]
Mast: x=40% (192px), y=10–95%
Yard arm: x=18–65%, y=22%
Sail: x=18–65%, y=22–82%
Transparent: all areas outside sail and mast

[SILHOUETTE]
KEY DIFFERENCE: sail edge is NOT rectangular — it undulates.
Top edge: gentle upward arc (billowing). Left edge: sinusoidal S-curve.
Right edge: broad rightward billow (convex, maximum at x=60%).
Bottom edge: sinusoidal curve, 1 full wave cycle.
Impression: the sail sways like it is gently moving underwater.

[PALETTE — PEARL THEME CONTRACT]
#c8e4e0 = sail light area (pale aqua, top-left lit)
#3a8f8a = sail shadow area (deep teal, 1 hard shadow band on lower-right)
#a8d8d0 = sail mid-tone (match katachi_pearl aqua-teal)
#3d2010 = mast wood (consistent across ALL themes)
#f0e8f8 = crescent moon motif (near-white)
#d0d8e0 = bubble circles (match katachi_pearl pearl bead color)

[SURFACE]
Sail: flat #c8e4e0 base. Fish-scale pattern across surface: overlapping rounded scales,
each ≈16px wide × 12px tall, offset grid layout. Scale lines: #a8d8d0.
DO NOT make scales too fine — at thumbnail they become subtle texture, not individual shapes.
1 hard shadow band (#3a8f8a) on lower-right sail quadrant.

[DETAIL ELEMENTS]
- Crescent moon at sail center (x=40%, y=45%). Width ≈18% of sail. Color #f0e8f8.
- 5 bubble circles around moon: ring outline only (#d0d8e0), no fill.
  Sizes: 2 large (≈12px), 3 small (≈6px).
- 3 sparkle glints (4-point star, #ffffff) near right sail edge.

[MAST ALIGNMENT]
x=40% (192px). Match suishin_skull and hata_star positions.

[THEME CONTRACT]
Match katachi_pearl: aqua-teal #a8d8d0, deep teal #3a8f8a.
Mast wood #3d2010 consistent across all themes.
```

#### senshu_mermaid.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senshu (figurehead), pearl/mermaid theme
Layer order: ON TOP of katachi_pearl, at bow (left side)
Thumbnail: 120×80px — mermaid with outstretched arms facing left = guardian of the bow
DRAW ONLY: The mermaid figurehead and its mounting bracket. DO NOT DRAW: hull body,
sails, mast, flags, ocean, waves, other mermaids, background.

[CANVAS MAP]
Mermaid figure: x=4–42%, y=18–78% (fills 38% canvas width, 60% canvas height)
Mounting bracket (right side): x=38–50%, y=52–72%
Transparent: x=51–100%, y=0–17%, y=79–100%

[SILHOUETTE]
The figurehead is NOT small — it fills the canvas map region confidently.
Body orientation: facing LEFT (bow direction), slight upward tilt.
Pose: arms spread wide and lifted upward-outward (guardian stance).
Head: chibi proportions — large round head, prominent eyes, hair billowing RIGHT.
Tail: extends backward-right toward mounting bracket.

[PALETTE — PEARL THEME CONTRACT]
#e8eef5 = carved body (match katachi_pearl hull primary — carved from same material)
#a8d8d0 = tail scales (match katachi_pearl aqua-teal)
#c8e8e0 = tail highlight (light aqua)
#f0e8d8 = hair (match katachi_pearl warm highlight tone)
#d0d8e0 = pearl wrist accessory (match pearl bead color)
#3a8f8a = tail shadow and deep scale areas

[SURFACE]
Carved material: pale pearl-white crystal. NOT wood, NOT stone.
Surface: #e8eef5 flat base with 1 highlight strip on upper-left surfaces.
This is a sculpture — clean, smooth, no skin texture.
Tail: overlapping round scales in #a8d8d0 with #c8e8e0 highlights on upper scales.
DO NOT generate iridescent/rainbow coloring — flat cel-shaded only.

[DETAIL ELEMENTS]
- Hair: long (#f0e8d8), flowing to the RIGHT in 3–4 distinct strands.
- Tail fin: at lower-right, 2 fin lobes pointing downward-left.
- Pearl bracelet on one wrist: 5 pearls (#d0d8e0) with #fff highlight dots.
- Expression: brave, joyful — large chibi eyes wide open, confident smile.

[CONNECTION EDGE]
Right mounting bracket (x=38–50%): trapezoidal beveled socket shape.
Material: #e8eef5 crystal with iron mounting bolts (#4a4a4a).
Implies the figurehead is firmly mounted into the hull bow.

[THEME CONTRACT]
Match katachi_pearl: body #e8eef5, scales #a8d8d0, hair #f0e8d8.
```

#### senbi_rainbow.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senbi (stern decoration), pearl/mermaid theme
Layer order: ON TOP of katachi_pearl, at stern (right side)
Thumbnail: 120×80px — dramatic V-shaped fin opening right = instantly distinct silhouette
DRAW ONLY: The mermaid tail fin. DO NOT DRAW: hull body, sails, mast, flags,
figureheads, water, ocean, background, full mermaid body.

[CANVAS MAP]
Fin base (connects to hull stern): x=8–30%, y=35–65%
Upper fin lobe: x=22–92%, y=8–45% (sweeps upper-right)
Lower fin lobe: x=22–92%, y=55–98% (sweeps lower-right)
Central notch (V-gap): x=70–92%, y=45–55%

[SILHOUETTE]
Large V-shaped caudal fin, opening to the right.
Upper lobe: broad, rounded tip at (x=88%, y=12%). Curves gracefully upward.
Lower lobe: broad, rounded tip at (x=88%, y=90%). Curves gracefully downward.
Central notch: deep V-cut, reaching to x=65%.

[PALETTE — PEARL THEME CONTRACT]
Use FLAT CEL-SHADED COLOR BANDS — NOT gradients.
#3a8f8a = fin base color (deep teal, match katachi_pearl waterline)
#f0a0c0 = fin mid-color (warm pink at mid-fin)
#f5d060 = fin tip color (luminous gold at fin tips)
#c8e8ff = fin edge highlight (white-blue glint, outer edge only, 2px)
#a8d8d0 = scale area base (match katachi_pearl aqua-teal)

[SURFACE]
Scale area (left 40% of fin): overlapping round scales matching katachi_pearl style.
Membrane area (right 60%): smooth surface, thinner appearance.
Color bands: hard-edge cel-shading. Base → pink → gold. 3 distinct bands.
Fin edge: thin #c8e8ff highlight strip along outer fin silhouette (2px).

[DETAIL ELEMENTS]
- 3 light-refraction streaks near upper-right lobe tip: short diagonal #ffffff lines.
- 2 sparkle glints (#fff) at lobe tips.

[CONNECTION EDGE]
Left fin base (x=8–15%): smooth rounded cross-section, scale texture.
At x=8% fade opacity to 80%, at x=5% fully transparent.
The fin appears to GROW FROM the hull — no hard socket bracket.

[THEME CONTRACT]
Match katachi_pearl: teal #3a8f8a, aqua #a8d8d0.
```

#### hata_star.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — hata (flag), pearl/mermaid + space theme (SHARED)
Layer order: ON TOP of suishin layer
Thumbnail: 120×80px — large gold star on midnight blue = clear and bold
DRAW ONLY: Flag and upper mast section. DO NOT DRAW: hull, sails, ship body,
ocean, sky, clouds, background.

[CANVAS MAP]
Flag mast: x=40% (192px) — match suishin_wave mast position EXACTLY
Mast visible: y=5–55%
Flag: x=40–82%, y=7–40%
Transparent: all outside flag and mast

[SILHOUETTE]
Flag: clean rectangle. Slight rightward billow. Right edge barely curves —
this is a well-maintained flag, NOT tattered.

[PALETTE — PEARL/SPACE SHARED CONTRACT]
#0f1a3d = flag background (deep midnight blue)
#1a2a50 = flag shadow area (1 shadow band, lower-right)
#f5e060 = central star (bright gold-yellow)
#fff8d0 = star center glow (near-white inner highlight)
#c0d8f0 = small scatter stars (cool blue-white)
#3d2010 = mast wood (consistent across all themes)

[SURFACE]
Flag: flat #0f1a3d. Barely-visible fine weave texture. NO iridescent shimmer.
1 shadow band (#1a2a50) across lower-right quarter.

[DETAIL ELEMENTS]
- Central star: 5-pointed, centered on flag. Occupies 38% of flag height.
  Fill: #f5e060. Center highlight: #fff8d0 (small bright area at center).
  8 sparkle rays from each point: thin straight lines, #f5e060.
- 9 scatter stars: 3 medium (#f5e060) + 6 small (#c0d8f0), distributed across flag.
- 2 four-point sparkle glints (#fff) near central star.
- Iron cleat hardware at mast top.

[MAST ALIGNMENT]
x=40% (192px). MUST match suishin_wave mast position exactly.

[THEME CONTRACT]
Used for BOTH pearl and space themes.
Mast wood #3d2010 consistent across all themes.
```

---

### さんごセット プロンプト集

#### katachi_coral.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — katachi (hull body), coral theme
Layer order: Bottom layer
Layers ON TOP: suishin_fan, hata_coral
Thumbnail: 120×80px — warm orange hull with pink coral clusters = distinct warm theme
DRAW ONLY: Hull body with coral decoration. DO NOT DRAW: masts, sails, flags,
figureheads, stern pieces, water, freely swimming fish, background.
NOTE: tiny fish peeking from coral ON the hull ARE included.

[CANVAS MAP]
IDENTICAL silhouette template to katachi_pirate.
Hull: x=5–95%, y=35–98%
Bow (left): rises to y=35% at x=8%, 30° upward angle
Stern (right): blunt at x=92%, deck at y=42%
Transparent: y=0–40%

[SILHOUETTE]
Same base shape as katachi_pirate. Bow tip is a simple curved point.
This ensures consistent ship profile across all themes.

[PALETTE — CORAL THEME CONTRACT]
#6b3a1f = hull wood base (warm orange-brown)
#8a5030 = hull plank highlight (lighter grain)
#4a2810 = hull shadow band (lower hull)
#f5d8a0 = hull surface base (warm cream coating over wood)
#d64080 = coral deep pink (branch bases)
#f0a0c0 = coral candy pink (branch tips and blossoms)
#e87830 = coral orange accent (some clusters)
#4a8840 = sea anemone green (waterline fringe)
#f06020 = tiny hiding fish (orange body, white stripe)

[SURFACE]
Hull base: warm cream #f5d8a0 with subtle horizontal plank lines.
Wood grain (#6b3a1f) as low-contrast strokes over base.
1 hard shadow band (#4a2810) on lower hull (y=78–98%).
This is the BRIGHTEST, WARMEST hull of all themes.

[DETAIL ELEMENTS]
- Coral cluster 1 (LARGE, mid-hull): center at (x=45%, y=60%).
  Acropora-style: 5 main branches, each with 3–4 sub-branches.
  Branch tips: tiny 4-petal flower blossoms (#f0a0c0). Width ≈20% of canvas.
  Color: #d64080 base → #f0a0c0 tips.
- Coral cluster 2 (SMALL, bow): at (x=18%, y=58%). 2–3 branches, same style.
- Coral cluster 3 (SMALL, stern): at (x=78%, y=65%). 2–3 branches, same style.
- Tiny fish: 3 chibi fish hiding in coral clusters. Each ≈12×8px.
  Bright orange (#f06020) body, 1 white vertical stripe. Only front halves visible.
- Sea anemone fringe (#4a8840): wavy tentacles along hull bottom edge (y=93–98%).
  8–10 tentacles, 2–3px wide, wavy upward curves.

[THEME CONTRACT]
This is the reference file for CORAL theme.
suishin_fan and hata_coral must match: coral pink #d64080, #f0a0c0, orange #e87830.
```

#### suishin_fan.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — suishin (sail), coral theme
Layer order: ON TOP of katachi_coral. hata_coral sits ON TOP.
Thumbnail: 120×80px — fan arc silhouette is VERY distinct from all rectangular sails
DRAW ONLY: Fan-shaped sail and mast. DO NOT DRAW: hull, figurehead, flags,
stern decorations, background, ocean, sea creatures.

[CANVAS MAP]
Mast: x=40% (192px), from y=95% to y=62% (short mast — fan sits low)
Fan pivot: x=40%, y=62% (where fan meets mast top)
Fan arc: radius ≈45% of canvas height, opens ≈150°
Fan left edge: x=10%, y=60%. Fan right edge: x=70%, y=60%.
Fan apex (topmost point): x=40%, y=10%
Transparent: corners outside the fan arc, below mast

[SILHOUETTE]
Fan (扇子) shape: open arc ≈150°, pivot at bottom-center.
The fan is the PRIMARY silhouette — must read as an ARC at thumbnail.
NOT rectangular, NOT triangular. ARC shaped.
Slightly asymmetric: left side puffs forward 5px more (rightward wind catching the fan).

[PALETTE — CORAL THEME CONTRACT]
#e87830 = orange wedge sections (match katachi_coral #e87830)
#f0a0c0 = pink wedge sections (match katachi_coral candy pink)
#d64080 = wedge divider line / deep accent
#5c3020 = bamboo rib lines (dark brown bamboo)
#f5d8a0 = wedge face highlight (match katachi_coral hull cream)
#3d2010 = mast wood (consistent all themes)

[SURFACE]
Fan: 9 alternating wedge sections.
Orange wedges (1,3,5,7,9): #e87830. Pink wedges (2,4,6,8): #f0a0c0.
Bamboo rib lines (#5c3020, 2px) at each wedge boundary.
1 shadow band (#d64080, low opacity) on right half of fan (curves away from light).

[DETAIL ELEMENTS]
- At fan pivot (x=40%, y=62%): 2 starfish and 2 spiral shells painted on.
  Each ≈10px. Colors: #e87830 (starfish), #d64080 (shells).
- Orange ribbon bow tied at pivot.
- Very subtle scallop edge on fan arc tip: 3–4 tiny half-circle indentations.

[MAST ALIGNMENT]
x=40% (192px). Match all other theme mast positions.

[THEME CONTRACT]
Match katachi_coral: orange #e87830, deep pink #d64080, candy pink #f0a0c0.
Mast wood #3d2010 consistent across all themes.
```

#### hata_coral.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — hata (flag), coral theme
Layer order: ON TOP of suishin_fan
Thumbnail: 120×80px — branching coral tree on warm cream background = cheerful theme flag
DRAW ONLY: Flag and upper mast section. DO NOT DRAW: hull, sails, ship body,
ocean, background, fish, sea creatures.

[CANVAS MAP]
Flag mast: x=40% (192px) — match suishin_fan mast position EXACTLY
Mast visible: y=5–55%
Flag: x=40–82%, y=7–40%
Transparent: all outside flag and mast

[SILHOUETTE]
Flag: clean rectangle. Gentle rightward billow. NOT tattered — clean festival banner.

[PALETTE — CORAL THEME CONTRACT]
#f5d8a0 = flag background (match katachi_coral hull cream #f5d8a0)
#e8c888 = flag shadow area (darker cream, 1 shadow band)
#d64080 = coral tree trunk and branches (match katachi_coral deep pink)
#f0a0c0 = branch tips and blossoms (match katachi_coral candy pink)
#e87830 = starfish accent (match katachi_coral orange)
#f08060 = flag border outer stripe
#ffffff = flag border inner stripe
#3d2010 = mast wood

[SURFACE]
Flag: flat #f5d8a0. 1 shadow band (#e8c888) on lower-right.
Flag border: thin double stripe along all 4 edges. Outer #f08060, inner #fff (2px each).

[DETAIL ELEMENTS]
- Coral tree design centered on flag:
  Single trunk from flag center-bottom, 4 upward branches in candelabra shape.
  Symmetric. Each tip: 4-petal blossom in #f0a0c0 — MATCH katachi_coral blossom exactly.
  Trunk: #d64080. Tips: #f0a0c0. Coral tree occupies ≈60% of flag height.
- Starfish (#e87830): one 5-armed chibi star in upper-right flag corner. ≈12% of flag height.
- Iron cleat at mast top.

[MAST ALIGNMENT]
x=40% (192px). MUST match suishin_fan.

[THEME CONTRACT]
Match katachi_coral: cream #f5d8a0, deep pink #d64080, candy pink #f0a0c0, orange #e87830.
Coral blossom style MUST match katachi_coral exactly.
```

---

### ゆうれいセット プロンプト集

#### katachi_ghost.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — katachi (hull body), ghost theme
Layer order: Bottom layer
Layers ON TOP: suishin_dark, senshu_ghost, hata_skull (shared with pirate)
Thumbnail: 120×80px — pale blue warped hull with glowing porthole-eyes = spooky but cute
DRAW ONLY: Hull body only. DO NOT DRAW: masts, sails, flags, ghost characters
floating above hull, brooms, stern decorations, water, background, flying ghosts.
CRITICAL: Hull interior MUST be fully opaque. Use pale colors to imply ghostly
quality — NOT actual alpha transparency inside the hull.

[CANVAS MAP]
Same base hull silhouette as katachi_pirate with subtle warping (±5px on edges).
Hull: x=5–95%, y=35–98%
Bow: slightly drooping — tip at y=38% (2–3% lower than katachi_pirate)
Stern: blunt at x=92%
Transparent: y=0–40%

[SILHOUETTE]
SAME base as katachi_pirate with SUBTLE warping:
Hull edges slightly wobbly — NOT perfectly smooth curves. Bow droops slightly.
Lower hull edge: 2–3 irregular bumps. Overall still clearly a ship hull (±5px only).

[PALETTE — GHOST THEME CONTRACT]
#b0bfc8 = hull primary (pale grey-blue, SOLID OPAQUE)
#e8f0f5 = hull highlight (mist-white, top-left + wisp patches)
#8090a0 = hull shadow band (cool grey, 1 hard band)
#c8d8e0 = hull mid-tone
#a8e030 = porthole eye glow (yellow-green — THE signature ghost color)
#70a020 = porthole eye shadow (darker yellow-green, pupil area)
#2a2a3a = porthole frame (dark grey-navy)
NOTE: No element inside the hull uses alpha transparency. Colors only.

[SURFACE]
Hull: flat #b0bfc8. Faint eroded wood grain — very low contrast, barely visible.
Grain: #8090a0, 1px horizontal lines, irregular spacing (15–25px).
1 hard shadow band (#8090a0) on lower hull (y=75–98%).
Highlight area (#e8f0f5): irregular blob shape on upper-left hull — NOT a clean strip.
Hull appears solid but LOOKS like it might not be — through color irregularity only.

[DETAIL ELEMENTS]
- 2 porthole "eyes" — most important details:
  Left eye: (x=28%, y=55%). Right eye: (x=52%, y=55%).
  Each: circular, diameter ≈32px. Frame: #2a2a3a.
  Interior: bright #a8e030 iris + #70a020 pupil center.
  These portholes look EXACTLY like cartoon eyes. The ship is watching you.
  IMPORTANT: glow is achieved through bright fill color ONLY — NOT alpha glow.
- 2–3 mist wisps along bow area and hull lower-left:
  Shape: thin elongated comma shapes, #e8f0f5. Extend slightly beyond hull silhouette.
- Hull bottom edge: 3–4 irregular wood split notches (warped, haunted wood).

[OUTLINE]
4–5px outline — slightly irregular/wobbly (±1px), reinforces haunted quality.

[THEME CONTRACT]
This is the reference file for GHOST theme.
suishin_dark, senshu_ghost, senbi_broom must reference:
  grey-blue #b0bfc8, yellow-green glow #a8e030, shadow #8090a0.
hata_skull is SHARED with pirate theme — see かいぞくセット.
```

#### suishin_dark.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — suishin (propulsion), ghost theme
Layer order: ON TOP of katachi_ghost. hata_skull sits ON TOP.
Thumbnail: 120×80px — tall iron chimney + billowing purple-black smoke = ghost ship propulsion
DRAW ONLY: Chimney stack and smoke plume. DO NOT DRAW: hull body, sails, flags,
ghost characters standing on deck, brooms, background, ocean.
NOTE: ghost faces dissolved WITHIN the smoke ARE included (part of the smoke itself).

[CANVAS MAP]
Chimney body: x=65–75%, y=20–55%
Chimney base: x=65–75%, y=55–95%
Smoke plume: x=55–98%, y=0–35% (upper-right quadrant)
Transparent: x=0–54%, bottom areas outside chimney

[SILHOUETTE]
Chimney: narrow rectangle, slightly irregular edges (aged). ≈3° lean to the left.
Height: y=95% to y=20% (¾ of canvas). Width: ≈48px.
Smoke: large billowing cloud, RIGHT and UPWARD. 4–5 rounded lobes on outer edge.

[PALETTE — GHOST THEME CONTRACT]
#1a1a1a = chimney iron (primary)
#0d0d0d = chimney shadow side (right face, 1 shadow band)
#3a3a4a = chimney highlight face (slightly lighter, left face)
#7a3c1a = rust patches (#7a3c1a — iron degradation, consistent with pirate iron)
#4a4a6a = iron band color
#2a1a3d = smoke base color (dark purple-black)
#3a2a50 = smoke highlight area (slightly lighter purple)
#e8f0f5 = ghost faces in smoke (match katachi_ghost mist highlight)
#70d040 = ember sparks (bright green, complement to #a8e030 glow)

[SURFACE]
Chimney: flat #1a1a1a. Heavy rust patches (#7a3c1a). 1 shadow band on right face.
3 iron bands at y=30%, 45%, 60% of chimney height (#4a4a6a).
Smoke: flat #2a1a3d base. 1 highlight area (#3a2a50) on upper-left smoke lobe.
CEL-SHADED smoke: hard terminator between lit and shadow areas.

[DETAIL ELEMENTS]
- 3 ghost faces embedded in smoke:
  1 large (≈24px), 2 small (≈14px). Scattered, not clustered.
  Each: oval outline, two oval dark eyes, small O-shaped mouth.
  Color: #e8f0f5. SURPRISED expression (wide eyes, O-mouth) — NOT menacing.
- Green ember sparks (#70d040): 6–8 tiny diamonds (≈4×4px) floating upward-right.

[WIND DIRECTION]
Smoke billows RIGHT and UPWARD. Embers drift right.

[MAST ALIGNMENT]
NO mast — chimney is the propulsion element.
hata_skull flag mast remains independently at x=40%.

[THEME CONTRACT]
Match katachi_ghost: grey-blue tones, #e8f0f5 ghost details, #2a1a3d dark purple.
```

#### senshu_ghost.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senshu (bow ornament), ghost theme
Layer order: ON TOP of katachi_ghost, at bow (left side)
Thumbnail: 120×80px — large pale ghost face floating at left = supernatural bow presence
DRAW ONLY: Ghost figurehead. DO NOT DRAW: hull body, sails, chimney, flags,
brooms, other ghosts nearby, ocean, background.

[CANVAS MAP]
Ghost head/body: x=4–48%, y=14–78%
Ghost wispy tail: x=25–52%, y=55–88% (trails right toward hull)
Connection mist: x=45–55%, y=40–70% (transition zone to hull)
Transparent: x=53–100%, y=0–13%, y=79–100%

[SILHOUETTE]
Classic cartoon ghost form:
Upper 60%: round head/body. Diameter ≈38% of canvas width.
Lower 40%: 2–3 wispy tail extensions tapering to the right.
Primary read at thumbnail: large round circle = ghost head.

[PALETTE — GHOST THEME CONTRACT]
#b0bfc8 = ghost body (match katachi_ghost hull primary — same material)
#e8f0f5 = ghost highlight (inner bright area, top-left)
#8090a0 = ghost shadow side (1 shadow band, lower-right)
#a8e030 = eyes (match katachi_ghost porthole glow — IDENTICAL yellow-green)
#70a020 = eye inner shadow
#2a2a3a = eye pupil / eye outlines
Wispy tail tips: #b0bfc8 fading to transparent (soft alpha ONLY on tail wisps)

[SURFACE]
Ghost body: flat #b0bfc8, SOLID OPAQUE — NOT actually transparent.
The ghost looks ethereal through color alone, not through transparency.
1 highlight area (#e8f0f5) on upper-left of body.
1 hard shadow band (#8090a0) on lower-right.
Tail wisps: the ONLY place soft alpha is used.

[DETAIL ELEMENTS]
- Eyes: two large oval forms, each ≈20% of ghost head width.
  Outer: #a8e030 bright iris. Inner: #70a020 shadow. Tiny #2a2a3a pupil dot.
  Expression: ALARMED — wide open, slightly uneven (one bigger than the other).
  Suggest pulse with thin concentric ring (#c8f050) around each eye.
- Mouth: wide O-shape open in surprise/howl. #2a2a3a outline, no fill.
- Optional: 2 small stubby arms raised as if startled.
- 3 wispy tail extensions trailing RIGHT. Soft alpha at very tips only.

[CONNECTION EDGE]
Tail wisps (x=45–55%): become fully transparent at x=55%.
Ghost merges into hull bow via mist — NO hard bracket socket.

[THEME CONTRACT]
Match katachi_ghost: #b0bfc8 body, #a8e030 eyes (identical to porthole color).
The eyes should look like the SAME glow type as katachi_ghost portholes.
```

#### senbi_broom.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senbi (stern decoration), ghost theme
Layer order: ON TOP of katachi_ghost, at stern (right side)
Thumbnail: 120×80px — diagonal knotted stick ending in a ragged bristle fan = clearly a broom
DRAW ONLY: Broomstick and bristle end. DO NOT DRAW: hull body, witch characters,
sails, chimney, flags. NOTE: tiny ghost face details on bristle tips ARE included.

[CANVAS MAP]
Broom handle: diagonal from (x=30%, y=8%) to (x=88%, y=85%)
  (upper-center-left to lower-right, angled ≈40° from horizontal)
Bristle bundle: x=72–98%, y=55–98% (lower-right, where handle ends)
Transparent: upper-left area outside handle, most of left half

[SILHOUETTE]
Handle: long thin diagonal — dominant linear element.
Bristle end: large fan shape at handle end, spreading rightward and downward.
At thumbnail: diagonal line ending in ragged fan = broom is instantly readable.

[PALETTE — GHOST THEME CONTRACT]
#2a1a0a = broom handle (very dark knotted wood)
#3d2a1a = handle highlight (slightly lighter, left face)
#1a0f07 = handle shadow (darkest, right face)
#c0b060 = bristle straw (dusty yellow-grey)
#a09040 = bristle shadow area (darker straw)
#e8f0f5 = ghost face details (match katachi_ghost mist color)
#0d0d0d = black ribbon tie
#4a4a4a = iron ring at tie point

[SURFACE]
Handle: rough irregular knotted wood. NOT smooth.
3–4 small knob bumps along handle. 1 shadow band (#1a0f07) on right face.
Bristles: individual straw strands (#c0b060), each ≈2px wide.
Bundle tied tightly at left end, spreads rightward. 1 shadow band (#a09040) on lower bristles.

[DETAIL ELEMENTS]
- 3–4 individual straws with tiny ghost faces near tips:
  Each face: ≈8×6px. Two tiny dot eyes, tiny O-mouth. Color #e8f0f5.
  Effect: "something is WRONG with this broom."
- Black ribbon (#0d0d0d) tied at bristle bundle joint. Ribbon bow with two loops.
- Iron ring (#4a4a4a) around bundle.
- 2–3 pale ghost wisps (#e8f0f5) trailing off bristle tips. Soft alpha at very tips.

[CONNECTION EDGE]
Upper-left handle (x=28–35%): at x=30% fade to 70% opacity. Enters hull stern like a mast.
NOT a hard socket bracket — handle grows INTO the hull.

[THEME CONTRACT]
Match katachi_ghost: mist white #e8f0f5 for ghost details, consistent dark wood tones.
```

---

### りゅうセット プロンプト集

#### katachi_dragon.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — katachi (hull body), dragon theme
Layer order: Bottom layer
Layers ON TOP: suishin_magic, senshu_dragon, hata_dragon, senbi_dragon
Thumbnail: 120×80px — dark scale hull with gold dorsal spikes = instantly recognizable
DRAW ONLY: Hull body only. DO NOT DRAW: dragon head (that is senshu layer),
fire effects, sails, mast, flags, brooms, full dragon body, water, background.

[CANVAS MAP]
IDENTICAL base silhouette to katachi_pirate.
Hull: x=5–95%, y=35–98%
Bow: rises to y=35% at x=8%. Bow CURVES INTO a dragon's lower jaw.
  Jaw detail: at x=5–15%, y=38–50% — row of 4–5 flat chibi teeth visible.
Stern (right): blunt at x=92%, deck at y=42%.
Transparent: y=0–40%

[SILHOUETTE]
Same base as katachi_pirate with ONE addition: the bow tip forms a dragon's lower jaw.
Lower jaw extends ≈8px further left than standard bow point.
Teeth: 4–5 flat rectangular teeth along lower jaw edge, ≈8px wide × 10px tall.
Stern right edge (x=90–95%): very subtle tail scale pattern begins (2–3 scales only).
Implies the dragon's tail continues into senbi_dragon layer.

[PALETTE — DRAGON THEME CONTRACT]
#8a1010 = scale base crimson — USE THIS EXACT HEX
#1a0808 = scale shadow edge (every scale border) — USE THIS EXACT HEX
#f0c000 = gold spikes and dorsal fins — USE THIS EXACT HEX
#e06010 = amber vein glow (energy veins between scales) — USE THIS EXACT HEX
#c8a000 = gold spike shadow face
#f5e080 = gold spike highlight face
#f5f0e0 = dragon teeth (ivory-white)

[SURFACE]
Hull: FULLY covered in overlapping DIAMOND-shaped scales.
Scale size: ≈20×15px at full size. Layout: offset grid, each row offset half-scale-width.
Each scale: base #8a1010. Hard shadow (#1a0808) along bottom and right edges.
Small highlight dot (#c03020, slightly lighter crimson) at top-left of each scale.
Amber veins (#e06010): thin BRANCHING lines through scale seams.
  Main vein: runs from stern to bow along hull centerline.
  Branch veins: 45° off main vein every ≈60px. Width: 2px.
  Vein center: thin #f0c000 core line (1px) — makes it read as glowing.
1 hard shadow band on lower hull (y=78–98%).

[DETAIL ELEMENTS]
- Dorsal spikes along deck edge (y≈42%): 6 gold (#f0c000) triangular spikes.
  Heights (left to right): 12, 18, 22, 22, 18, 12px (tallest at center).
  Each spike: #f5e080 highlight (left face), #c8a000 shadow (right face).
- Dragon lower jaw teeth: 4–5 flat ivory (#f5f0e0) rectangles. Blunt tips — chibi-safe.

[THEME CONTRACT]
This is the REFERENCE FILE for DRAGON theme.
senshu_dragon, senbi_dragon, suishin_magic, hata_dragon MUST match:
  #8a1010 / #1a0808 / #f0c000 / #e06010 — exact same Hex codes.
```

#### suishin_magic.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — suishin (propulsion), dragon theme
Layer order: ON TOP of katachi_dragon. hata_dragon sits ON TOP.
Thumbnail: 120×80px — two dragon-scale vents firing a fire vortex rightward
DRAW ONLY: Fire exhaust vents and fire vortex. DO NOT DRAW: hull body, dragon head,
sails, mast, flags, broom, the dragon's body or tail, ocean, background.

[CANVAS MAP]
Top vent housing: x=55–72%, y=35–55%
Bottom vent housing: x=55–72%, y=55–75%
Fire vortex (combined): x=65–100%, y=20–90%
Transparent: x=0–54%, outside vents and fire

[SILHOUETTE]
Two curved vent housings at right-center of canvas.
From each vent, fire erupts rightward. The two plumes merge into a single spiral vortex.
Vortex shape: elongated teardrop pointing right. Primary read: two squares + large fire teardrop.

[PALETTE — DRAGON THEME CONTRACT]
#8a1010 = vent housing scales (MATCH katachi_dragon exactly)
#1a0808 = vent housing shadow edges
#f0c000 = vent housing gold trim (match katachi_dragon gold)
#c02000 = fire base (deep red, at vent outlets)
#e86000 = fire mid-flame (bright orange)
#f0c000 = fire tips (gold-yellow — SAME gold as dragon spikes, intentional)
#ffffff = fire core white (very center only, small)
#e06010 = amber ember sparks (match katachi_dragon vein color)

[SURFACE]
Vent housings: IDENTICAL diamond scale pattern to katachi_dragon.
Same scale size (≈20×15px), same #8a1010/#1a0808 shadow treatment.
Gold trim (#f0c000) around each vent opening rim.
Fire: CEL-SHADED with HARD EDGES between color bands — NOT gradient, NOT blur.
4 distinct bands from center outward: #ffffff → #f0c000 → #e86000 → #c02000.
Fire has SHAPE: 3–4 large cel-shaded flame tongue forms.
Spiral structure: curved streak marks within flame suggest rotation.

[DETAIL ELEMENTS]
- Amber ember sparks (#e06010): 5–6 small diamond shapes (≈5×5px) near vortex.
- Two fire plumes MERGE at x=70%: the two streams twist together visibly.

[WIND DIRECTION]
Fire flows RIGHT. All sparks drift right.

[MAST ALIGNMENT]
NO mast — fire drive has no sail. hata_dragon mast at x=40% is independent.

[THEME CONTRACT]
Match katachi_dragon EXACTLY: scale texture #8a1010/#1a0808, gold #f0c000, amber #e06010.
The vent housings must look like part of the SAME dragon-scale hull.
```

#### senshu_dragon.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senshu (figurehead), dragon theme
Layer order: ON TOP of katachi_dragon, at bow (left side)
Thumbnail: 120×80px — large dragon head facing left = powerful bow presence
DRAW ONLY: Dragon head and neck. DO NOT DRAW: hull body, fire vortex, flags,
broom, full dragon body, wings, claws in front, ocean, background.

[CANVAS MAP]
Dragon head: x=4–58%, y=10–82%
Neck (trailing right): x=40–60%, y=35–75%
Connection base (right edge): x=55–62%, y=35–75%
Transparent: x=63–100%, y=0–9%, y=83–100%

[SILHOUETTE]
Dragon head faces LEFT (bow direction). Large — fills left half of canvas.
Lower jaw: open ≈25°. Chibi jaw: flat rectangular teeth (NOT sharp fangs).
Head topline: from snout tip (x=4%) up over skull to neck (x=58%).
Two curved horns sweeping back-right from skull top.
Neck trails RIGHT, narrows to ≈18% of canvas width at right edge.

[PALETTE — DRAGON THEME CONTRACT]
MUST MATCH katachi_dragon EXACTLY — same dragon, same body:
#8a1010 = scale base crimson
#1a0808 = scale shadow edges
#f0c000 = horns and gold spine frill
#c8a000 = horn shadow face
#f5e080 = horn highlight face
#e06010 = eyes (match hull amber veins — dragon's eyes glow same color)
#f5f0e0 = teeth (match hull jaw teeth)

[SURFACE]
Scale texture: IDENTICAL to katachi_dragon. Same diamond scales, same offset grid.
Same ≈20×15px scale size. Same shadow per scale.
1 hard shadow band on lower jaw and neck underside.
Upper head surfaces lit from top-left: highlight on skull top and upper horn.

[DETAIL ELEMENTS]
- Eyes: large round amber (#e06010) with vertical slit pupils (#2a0808).
  Eye size: ≈18% of head height. Expression: DETERMINED CONCENTRATION.
  One eyebrow ridge furrowed inward. Not aggression — focused, powerful.
  Thin concentric amber ring around each iris (implies inner light).
- Horns: two, curving back-right. #f0c000/#c8a000/#f5e080 (match hull spikes exactly).
  Main horn: from skull top-left, curves back. Length ≈30% of canvas width.
  Secondary horn: smaller, beside main horn. Same curve direction.
  Snout horn: small 3rd horn at snout tip (≈8px).
- Gold spine frill: 5 spines (#f0c000) from skull crest down neck. Same style as hull spikes, smaller.
- Teeth: 4 flat ivory (#f5f0e0) teeth visible on lower jaw (same as hull jaw teeth).
- Fire wisps: 2 thin wisps of #e86000 flame curling from between teeth. VERY subtle.

[CONNECTION EDGE]
Right neck (x=55–62%): oval cross-section, scale texture continues onto edge.
Scale pattern merges with hull bow — NOT a plain cut.
The neck appears to be the SAME body as the hull.

[THEME CONTRACT]
Match katachi_dragon EXACTLY (same dragon). Scale size, color, and pattern MUST be identical.
```

#### senbi_dragon.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senbi (stern decoration), dragon theme
Layer order: ON TOP of katachi_dragon, at stern (right side)
Thumbnail: 120×80px — scaled tail in S-curve ending in diamond fin = dragon continuation
DRAW ONLY: Dragon tail and tail fin. DO NOT DRAW: hull body, dragon head,
fire vortex, mast, flags, brooms, ocean, background, full dragon body.

[CANVAS MAP]
Tail base (connects to hull): x=5–28%, y=35–70%
Tail body: S-curve from (x=5%, y=40%) to (x=85%, y=72%)
Tail fin: x=75–98%, y=45–95%
Dorsal spines: along tail body top edge
Transparent: upper-left area, y=0–34%

[SILHOUETTE]
Tail: long and muscular, narrowing from left (thick) to right (thin before fin).
S-curve sweep: DOWN from left (y=40%), then UP at right (y=72%).
Tail fin: two lobes opening right. Upper lobe: x=78–95%, y=45–55%.
Lower lobe: x=78–95%, y=68–92%.

[PALETTE — DRAGON THEME CONTRACT]
MUST MATCH katachi_dragon EXACTLY:
#8a1010 = scale base crimson
#1a0808 = scale shadow edges
#f0c000 = dorsal spines and fin tip spines
#c8a000 = spine shadow face
#e06010 = amber vein on tail underside
#4a0808 = fin membrane (dark crimson, thin web)

[SURFACE]
Scale texture: IDENTICAL to katachi_dragon and senshu_dragon. Same diamond scales.
Scale size decreases slightly: 20×15px near hull → 14×10px near fin.
Amber veins (#e06010) continue on tail underside — single main vein running right.
Fin membrane (#4a0808): thin web between lobes with amber vein lines radiating from base.
Fin outer edge: #f0c000 gold trim strip (2px) along entire fin silhouette.

[DETAIL ELEMENTS]
- Dorsal spines: 4 gold (#f0c000) spines along tail top. Heights decrease left→right (14→8px).
- Tail fin tip spines: 1 large gold spine at each lobe tip.
- Fire sparks (#e06010, #f0c000): 3–4 sparks trailing off fin tips, moving RIGHT.

[CONNECTION EDGE]
Left tail base (x=5–15%): round cross-section, scale texture continuous.
At x=5% fade to 80% opacity. At x=3% fully transparent.
Tail appears to GROW FROM hull stern — no hard socket bracket.
Scale pattern MUST match hull stern at overlap zone.

[THEME CONTRACT]
Match katachi_dragon EXACTLY (same dragon, same body). Scale MUST be identical.
```

#### hata_dragon.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — hata (flag), dragon theme
Layer order: ON TOP of suishin_magic (or katachi if no suishin)
Thumbnail: 120×80px — gold dragon kamon circle on near-black = heraldic and bold
DRAW ONLY: Flag and upper mast section. DO NOT DRAW: hull, fire vortex, dragon body,
brooms, ocean, sky, background.

[CANVAS MAP]
Flag mast: x=40% (192px) — match all other theme mast positions
Mast visible: y=5–55%
Flag: x=40–82%, y=7–40%
Transparent: outside flag and mast

[SILHOUETTE]
Flag: rectangle. Heavy fabric — BARELY billows. Only far-right tip flutters slightly.
This flag HANGS with gravity. This conveys: heavy, serious clan banner.
Fabric fold lines are VERTICAL (gravitational drape), not horizontal wind folds.

[PALETTE — DRAGON THEME CONTRACT]
#0d0d0d = flag surface (near-black, very slight crimson tint — NOT pure black)
#1a0d0d = flag shadow area (1 shadow band, lower-right)
#f0c000 = kamon dragon outline and border trim (match katachi_dragon gold EXACTLY)
#c8a000 = kamon shadow areas (match dragon gold shadow)
#8a0000 = flame motif inside kamon circle (deep dragon red)
#3d2010 = mast wood
#2a0808 = red tassel cord (very dark crimson-red)

[SURFACE]
Flag: flat #0d0d0d (slight crimson tint gives it a dragon quality).
Very subtle weave texture. 1 shadow band (#1a0d0d) on lower-right.
Gold border trim (#f0c000): thin double stripe along all 4 edges (3px outer, 2px inner).

[DETAIL ELEMENTS]
- Dragon kamon (家紋) centered on flag:
  Circular border: thin gold circle (#f0c000), diameter ≈55% of flag height.
  Dragon: eastern dragon coiled inside circle, head at top, tail at bottom.
  Rendered in THICK bold gold line art (#f0c000, 3px). Style: heraldic seal.
  Simplified, strong, minimal detail. Dragon eye: single small #8a0000 dot.
  Inside circle center: 4-pointed flame motif in #8a0000.
  Kamon occupies ≈55% of flag height. Bold and readable at thumbnail.
- Mast top: iron cap (#4a4a4a) with red tassel (#2a0808) hanging 12px below cap.

[WIND DIRECTION]
Flag BARELY moves. Only far-right tip shows slight flutter. Mostly hangs straight.

[MAST ALIGNMENT]
x=40% (192px). Match all other theme mast positions.

[THEME CONTRACT]
Match katachi_dragon: gold #f0c000, shadow gold #c8a000, dragon red #8a0000.
```

---

### うちゅうセット プロンプト集

#### katachi_space.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — katachi (hull body), space theme
Layer order: Bottom layer
Layers ON TOP: suishin_rocket, senshu_crystal, hata_star, senbi_rocket
Thumbnail: 120×80px — sleek angular silver hull with blue energy lines = clearly futuristic
DRAW ONLY: Hull body only. DO NOT DRAW: rocket nozzles, crystal cannon, sails, mast,
flags, satellite dish extending beyond hull, water, background.

[CANVAS MAP]
IDENTICAL base silhouette to other katachi hulls with one change: angular deck line.
Hull: x=5–95%, y=35–98%
Bow (left): pointed forward-left at ≈20° (more aerodynamic than pirate). Rounded tip.
Stern (right): vertical at x=92%, angular lower corner.
DECK SHAPE DIFFERENCE — two flat facets instead of single curved line:
  Facet 1: x=8–50%, y=42–44% (slopes very slightly downward toward midship)
  Facet 2: x=50–92%, y=40–44% (slopes very slightly upward toward stern)
  This angular facet is the KEY visual differentiator at thumbnail.
Transparent: y=0–40%

[SILHOUETTE]
KEY DIFFERENCE: two-facet angular deck top. All other hulls have smooth deck lines.
This angular facet + pointed bow = immediately distinct space theme silhouette.

[PALETTE — SPACE THEME CONTRACT]
#c0c8d0 = hull primary (chrome silver-white, lit surface) — USE THIS EXACT HEX
#8090a0 = hull shadow (slate blue-grey, 1 shadow band) — USE THIS EXACT HEX
#9098a8 = hull mid-tone
#40a0f0 = energy lines (electric blue) — USE THIS EXACT HEX
#60b8f8 = energy line highlight (brighter blue, line center)
#2060a0 = energy line shadow (deeper blue, line edge)
#e8f0ff = porthole interior glow (pale blue-white)
#303848 = porthole frame (dark blue-grey)

[SURFACE]
Hull base: flat #c0c8d0. Clean, smooth — NO wood grain, NO scale texture.
Two visible deck facets: upper surfaces (#c8d8e0, slightly lighter — facing light).
1 hard shadow band (#8090a0) on hull belly (y=75–98%).
Energy lines (cel-shaded — NOT blur or glow effect):
  Two parallel lines along upper hull edge (y=44%, y=47%). Width: 3px each.
  Single brighter line at waterline (y=88%). Width: 2px.
  Each line: #40a0f0 base, #60b8f8 center, #2060a0 edge.

[DETAIL ELEMENTS]
- 4 star-shaped porthole windows, evenly spaced along hull centerline (y≈55%):
  Each: diameter ≈28px. Frame: STAR SHAPE (#303848) — 8 points.
  Interior: #e8f0ff pale blue glow. This star-shaped frame is unique to this theme.
- Compact satellite dish on upper-left hull near bow (x=18%, y=45%):
  Diameter ≈16px. Material: #c0c8d0 (same chrome). Blue LED dot (#40a0f0) at center.
  Short mounting post below dish.
- Star-shaped rivets (≈6px, #c0c8d0) between porthole pairs.

[THEME CONTRACT]
This is the REFERENCE FILE for SPACE theme.
suishin_rocket, senshu_crystal, senbi_rocket must reference:
  Chrome #c0c8d0, shadow #8090a0, energy blue #40a0f0.
hata_star is SHARED with pearl theme — see にんぎょセット.
```

#### suishin_rocket.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — suishin (propulsion), space theme
Layer order: ON TOP of katachi_space. hata_star sits ON TOP.
Thumbnail: 120×80px — two chrome nozzles with blue-white exhaust = clearly rocket propulsion
DRAW ONLY: Twin rocket nozzles and exhaust plumes. DO NOT DRAW: hull body,
crystal cannon, flags, rest of the ship, ocean, background.

[CANVAS MAP]
Top nozzle housing: x=52–72%, y=28–50%
Bottom nozzle housing: x=52–72%, y=55–78%
Mounting bracket between nozzles: x=52–72%, y=50–55%
Combined exhaust plume: x=68–100%, y=15–95%
Transparent: x=0–51%, outside nozzles and exhaust

[SILHOUETTE]
Two chrome cylinders side by side at right-center.
Both fire simultaneously — exhausts merge into one large rightward plume.
At thumbnail: two rectangles (nozzles) + wide rightward teardrop (exhaust) = rocket propulsion.

[PALETTE — SPACE THEME CONTRACT]
#c0c8d0 = nozzle exterior (match katachi_space chrome EXACTLY)
#8090a0 = nozzle shadow face (1 hard shadow band on right face)
#e8f0ff = nozzle interior/mouth (pale glow at opening)
#40a0f0 = LED accent ring around each nozzle mouth (match katachi_space energy blue)
#4a4a5a = mounting bracket (dark grey-navy)
#f0f8ff = exhaust core (near-white, hottest center)
#60b8f8 = exhaust mid-range (light blue)
#40a0f0 = exhaust outer (electric blue)

[SURFACE]
Nozzle body: flat #c0c8d0. 1 shadow band (#8090a0) on right face.
1 highlight strip on top-left face of each nozzle.
Exhaust: CEL-SHADED with HARD EDGES — NOT gaussian blur:
  Core: #f0f8ff → Band 2: #60b8f8 → Band 3: #40a0f0 → soft alpha outer edge.
  (Exhaust outer edge is the ONLY acceptable soft alpha in this layer.)
  Combined exhaust fills x=68–100%.

[DETAIL ELEMENTS]
- 4 evenly-spaced bolts (#303848) around each nozzle mouth rim.
- Single horizontal venting slit on top of each nozzle (2px, #303848).
- Mounting bracket (#4a4a5a) with 2 bolts and blue LED strip on top edge.
- 4 thin energy rings (#40a0f0, 1px) radiating from each nozzle mouth rightward.
- 5–6 blue-white (+) energy sparks near nozzle mouths.

[WIND DIRECTION]
Exhaust plumes RIGHTWARD. Sparks also drift right.

[MAST ALIGNMENT]
NO mast — rocket drive. hata_star flag mast remains independently at x=40%.

[THEME CONTRACT]
Match katachi_space: chrome #c0c8d0, shadow #8090a0, energy blue #40a0f0.
Exhaust core #f0f8ff consistent with space theme white-hot center.
```

#### senshu_crystal.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senshu (bow ornament), space theme
Layer order: ON TOP of katachi_space, at bow (left side)
Thumbnail: 120×80px — elongated crystal prism pointing left = space-age bow weapon
DRAW ONLY: Crystal cannon and its mounting bracket. DO NOT DRAW: hull body,
rocket nozzles, flags, projectile in flight, explosion effects, background.
NOTE: charging energy rings AT the crystal tip ARE included.

[CANVAS MAP]
Crystal body: x=4–55%, y=22–72% (elongated hexagonal prism, pointing left)
Mounting bracket: x=42–58%, y=35–65%
Charging energy rings: x=4–18%, y=25–68% (at crystal tip)
Targeting beam: x=0–6%, y=46–48% (thin line at left canvas edge)
Transparent: x=59–100%, y=0–21%, y=73–100%

[SILHOUETTE]
Crystal: elongated hexagonal prism. Long axis from tip (x=4%, y=47%) to base (x=55%).
Length: ≈51% of canvas width. Width at widest (center): ≈25% of canvas height.
Tapers slightly from base (widest) to tip (narrowest, flat hexagonal face ≈4px).
At thumbnail: elongated rectangle with facet lines = crystal.

[PALETTE — SPACE THEME CONTRACT]
CRITICAL: Crystal is NOT transparent. It is OPAQUE with internal glow effect.
DO NOT make the crystal see-through to background.
#c8e8f8 = crystal base face (pale blue, cool and clean) — USE THIS EXACT HEX
#e8f4ff = crystal highlight facet (upper-left facing facets, brightest)
#7898b8 = crystal shadow facet (lower-right facing, darkest)
#98c8f0 = crystal mid-tone facet
#40a0f0 = energy core column inside crystal (bright column through center)
#60c0ff = charging rings at tip (match energy blue)
#c0c8d0 = mounting bracket (match katachi_space chrome EXACTLY)
#8090a0 = bracket shadow

[SURFACE]
Crystal facets: FLAT color per face. CEL-SHADED, NOT smooth gradient.
Each visible hexagonal face gets ONE flat color:
  Top-left face: #e8f4ff (highlight). Top-right: #c8e8f8 (primary).
  Left face: #c8e8f8. Bottom-left: #98c8f0 (mid-tone). Bottom-right: #7898b8 (shadow).
Internal energy: bright #40a0f0 column visible through crystal interior faces only.
DO NOT create a glow that bleeds outside the crystal silhouette.

[DETAIL ELEMENTS]
- 3 energy rings at crystal tip (x=4–18%):
  Thin circles (#60c0ff, 1px). Radii: 8, 14, 20px. Centered on crystal axis.
  CHARGING RINGS — static, not animated.
- Targeting beam: 2px line (#40a0f0) from crystal tip to left canvas edge. Very subtle.
- Constellation engravings on bracket: thin (#303848) star-map lines, 3–4 connected dot-line patterns.

[CONNECTION EDGE]
Right mounting bracket (x=52–58%): trapezoidal chrome bracket.
Chrome (#c0c8d0) with 4 mounting bolts (#303848).
Crystal is firmly held in bracket — appears physically secured.

[THEME CONTRACT]
Match katachi_space: chrome #c0c8d0, energy blue #40a0f0.
Crystal facets are SPECIFIC to this part — do not apply to other space parts.
```

#### senbi_rocket.png

```
[GAME ASSET BRIEF]
Type: Ship part layer — senbi (stern decoration), space theme
Layer order: ON TOP of katachi_space, at stern (right side)
Thumbnail: 120×80px — triangular cluster of 3 nozzles + massive combined exhaust = stern rockets
DRAW ONLY: Triple rocket nozzle cluster and exhaust. DO NOT DRAW: hull body,
crystal cannon, flags, suishin nozzles, full ship body, ocean, background.

[CANVAS MAP]
Top nozzle: x=5–30%, y=22–45%
Bottom nozzle: x=5–30%, y=57–80%
Center nozzle (smaller): x=8–25%, y=40–60%
Nozzle cluster housing connecting all three: x=5–32%, y=20–82%
Combined exhaust plume: x=25–100%, y=8–98%
Transparent: minimal — this is a LARGE element filling most of canvas

[SILHOUETTE]
Triangle formation: 3 nozzle openings at left side.
  Top mouth: circle at (x=18%, y=30%)
  Bottom mouth: circle at (x=18%, y=72%)
  Center mouth: smaller circle at (x=16%, y=50%)
Combined exhaust fills the entire right portion.
Exhaust plume shape: large rightward form — WIDER at right than at left (expanding thrust).

[PALETTE — SPACE THEME CONTRACT]
#c0c8d0 = nozzle cluster chrome housing (match katachi_space chrome)
#8090a0 = housing shadow faces
#303848 = nozzle frame and structural details
#40a0f0 = LED accent on each nozzle rim, navigation light on housing
#f0f8ff = exhaust core (near-white, MATCH suishin_rocket exhaust core)
#60b8f8 = exhaust mid (MATCH suishin_rocket)
#40a0f0 = exhaust outer (MATCH suishin_rocket — consistent energy blue)

[SURFACE]
Housing: flat #c0c8d0. 1 shadow band (#8090a0) on right face. Geometric chamfered edges.
Exhaust: IDENTICAL treatment to suishin_rocket:
  Core #f0f8ff → Band #60b8f8 → Outer #40a0f0 → soft alpha edge.
  3 individual plumes merge at x=30% into one massive combined plume.

[DETAIL ELEMENTS]
- Blue LED trim ring (#40a0f0) on each of the 3 nozzle mouths.
- Central ship emblem on housing face: 4-pointed star shape (#40a0f0). ≈15px.
- 2 triangular stabilizer fins: one on top edge of housing, one on bottom.
  Each: small right triangle, chrome #c0c8d0.
- 5 energy rings total: 2 large (from top/bottom nozzles) + 1 small (center).
  All extend rightward, 10px spacing between rings.
- 6–8 blue-white (+) sparks in exhaust near nozzle mouths.

[CONNECTION EDGE]
Left edge of housing (x=5–12%): slightly curved edge implying it wraps around hull stern.
At x=5%, fade to 80% opacity. Scale implies stern-sized proportions.

[THEME CONTRACT]
Match katachi_space: chrome #c0c8d0, #8090a0, energy blue #40a0f0.
Exhaust treatment MUST be IDENTICAL to suishin_rocket (same color progression).
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
# 1. 透過処理（船パーツ・NPC ともに白背景で生成 → GitHub upload 後に実行）
python3 scripts/remove_bg.py assets/ships/katachi/katachi_pirate.png
# または全船パーツ一括:
python3 scripts/remove_bg.py --only ships

# NPC も同様:
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
