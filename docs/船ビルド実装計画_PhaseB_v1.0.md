# 船ビルド実装計画 — Phase B

**対象ブランチ**: `claude/morning-session-march-27-PTGcw`
**前提**: Phase A（コアロジック）は実装・バグ修正済みでコミット済み
**日付**: 2026-03-27

---

## Phase B の目的

現行の絵文字ベース ShipBuildScreen を、**レイヤー PNG コンポジット**方式に全面刷新する。
プレイヤーが船の各パーツを視覚的に組み合わせて「自分だけの船」を作れるようにする。

---

## 変更ファイル一覧（5ファイル）

| # | ファイル | 種別 | 内容 |
|---|---------|------|------|
| B-1 | `src/data/shipItems.js` | 全面書き換え | 新スロット ID 対応パーツ定義 |
| B-2 | `src/components/ShipRenderer.js` | 新規作成 | PNG レイヤー合成コンポーネント |
| B-3 | `src/screens/ShipBuildScreen.js` | 全面書き換え | 新スロット UI・オンボーディング・テーマ演出 |
| B-4 | `src/styles/components.css` | 追記 | 船ビルド UI スタイル |
| B-5 | `sw.js` | 追記 | バージョン更新・新アセットパス追加 |

---

## アーキテクチャ概要

### レイヤー構造（480×320px）

```
z-index 順（下→上）
  0 : 水面（CSS グラジエント / アニメーション）
  1 : katachi（船体形状 PNG）
  2 : senbi（船尾 PNG）
  3 : senshu（船首 PNG）
  4 : suishin（推進・帆 PNG）
  5 : hata（旗 PNG）
  6 : oura（オーラ CSS エフェクト: fire / bubble / star / fog / null）
```

各レイヤーは `position: absolute; top:0; left:0; width:100%; height:100%` で重ねる。
PNG はすべて透過背景（480×320px）。

### PNG パス規則

```
assets/ships/{slotId}/{itemId}.png

例:
  assets/ships/katachi/katachi_pirate.png
  assets/ships/suishin/suishin_wave.png
  assets/ships/katachi/small_base.png      ← 小型船ベース（CSS filter で着色）
```

### 小型船スキン

`small_base.png` 1枚 + CSS `filter: hue-rotate() saturate() brightness()` で色違いを表現。
追加 PNG なしでバリエーション対応。

---

## B-1: `src/data/shipItems.js` 全面書き換え

### 変更点

現行の旧スロット名（hull/sail/figurehead/flag/deck/glow）を
新スロット名（katachi/suishin/senshu/senbi/hata/oura）に統一する。

### 新スロット定義

```js
export const SLOT_ORDER = ['katachi', 'suishin', 'senshu', 'senbi', 'hata', 'oura'];
```

### `thumbCrop` フィールド（新規追加）

パーツカード サムネイル表示用のクロップ設定。

```js
// 例
thumbCrop: { objectPosition: 'center 40%', scale: 1.2 }
```

### 小型船スキン定義（SMALL_SKINS）

```js
export const SMALL_SKINS = [
  { id: 'skin_default', name: 'ふつうのふね',  emoji: '⛵', filter: null },
  { id: 'skin_red',     name: 'あかいふね',    emoji: '⛵', filter: 'hue-rotate(340deg) saturate(1.5)' },
  { id: 'skin_blue',    name: 'あおいふね',    emoji: '⛵', filter: 'hue-rotate(200deg) saturate(1.3)' },
  { id: 'skin_star',    name: 'ほしのふね',    emoji: '🌟', filter: 'hue-rotate(40deg) brightness(1.2)',
    craftCost: { pearl: 1 } },
];
```

### SHIP_PARTS 定義（新スロット名版）

```js
export const SHIP_PARTS = [
  // ── かいぞくセット ──
  {
    id:         'katachi_pirate',
    slotId:     'katachi',           // ← 旧 partType
    name:       'かいぞくのふねがら',
    emoji:      '🏴‍☠️',
    rarity:     RARITY.RARE,
    minSize:    'medium',
    craftCost:  { pearl: 3, coral: 2 },
    themeSetId: 'pirate',
    pngPath:    'assets/ships/katachi/katachi_pirate.png',
    thumbCrop:  { objectPosition: 'center', scale: 1.0 },
  },
  // ... 他パーツ同様
];
```

### ヘルパー関数

```js
export function getPartById(id)           // ID → パーツ定義
export function getPartsBySlot(slotId)    // スロット別フィルタ（旧 getPartsByType）
export function filterBySize(parts, size) // サイズフィルタ（既存維持）
```

---

## B-2: `src/components/ShipRenderer.js`（新規作成）

### 役割

船の見た目を描画する専用コンポーネント。ShipBuildScreen・BookshelfScreen（miniプレビュー）・将来のQuizScreen演出で共用する。

### インターフェース

```js
class ShipRenderer {
  /**
   * @param {Object} shipState   - GameStore の ship 状態スナップショット
   * @param {'medium'|'large'|'small'} displaySize
   */
  constructor(shipState, displaySize) { ... }

  /**
   * 同期 HTML 生成（初回マウント用）
   * @returns {HTMLElement}
   */
  render() { ... }

  /**
   * 差分更新（再描画を最小化）
   * @param {Object} newShipState
   * @param {HTMLElement} container - render() が返した要素
   */
  update(newShipState, container) { ... }

  /**
   * ミニプレビュー用 Canvas 描画（LRU キャッシュ付き）
   * @param {number} width
   * @param {number} height
   * @returns {Promise<HTMLCanvasElement>}
   */
  static async renderMini(shipState, width, height) { ... }
}

export default ShipRenderer;
```

### render() の HTML 構造

```html
<div class="ship-renderer" data-size="medium">
  <!-- z0: 水面（CSS のみ、DOM 要素なし） -->
  <div class="ship-layer ship-layer-water"></div>
  <img class="ship-layer ship-layer-katachi" src="assets/ships/katachi/katachi_pirate.png" alt="">
  <img class="ship-layer ship-layer-senbi"   src="assets/ships/senbi/senbi_xxx.png" alt="">
  <img class="ship-layer ship-layer-senshu"  src="..." alt="">
  <img class="ship-layer ship-layer-suishin" src="..." alt="">
  <img class="ship-layer ship-layer-hata"    src="..." alt="">
  <div class="ship-layer ship-layer-oura ship-oura-fire"></div>
</div>
```

スロットが未装備の場合は `img` を出力しない（または `src=""` + `hidden`）。

### update() の差分戦略

```js
update(newState, container) {
  const SLOTS = ['katachi','senbi','senshu','suishin','hata'];
  SLOTS.forEach(slot => {
    const newPartId = newState[slot];
    const img = container.querySelector(`.ship-layer-${slot}`);
    // src が変わった時だけ更新
    const newSrc = newPartId ? `assets/ships/${slot}/${newPartId}.png` : '';
    if (img.src !== newSrc) img.src = newSrc;
  });
  // oura クラス更新
  const ouraEl = container.querySelector('.ship-layer-oura');
  ouraEl.className = `ship-layer ship-layer-oura ${newState.oura ? `ship-oura-${newState.oura}` : ''}`;
}
```

### renderMini() の LRU キャッシュ

キャッシュキー: `${JSON.stringify(shipState)}_${width}x${height}`
キャッシュサイズ上限: 20エントリ（Map + LRU eviction）

---

## B-3: `src/screens/ShipBuildScreen.js` 全面書き換え

### 変更後の画面構成

```
┌──────────────────────────────────────────┐
│ ヘッダー: 船名 + 大型艦進行バー(blueprint時) │
├──────────────────────────────────────────┤
│                                          │
│   ShipRenderer（480×320 or 縮小版）       │
│   ↑ 各スロット位置にホットスポットボタン      │
│                                          │
├──────────────────────────────────────────┤
│ スロットパネル（横スクロール）              │
│  [かたち] [すいしん] [せんしゅ] ...        │
├──────────────────────────────────────────┤
│ パーツ一覧（選択スロットのパーツが縦グリッド）│
│  [パーツカード] [クラフトボタン or 装備ボタン]│
├──────────────────────────────────────────┤
│ テーマセット達成バー                       │
├──────────────────────────────────────────┤
│ ← もどる                                 │
└──────────────────────────────────────────┘
```

### オンボーディング（初回表示）

```js
// ship.shipBuildGuideShown === false の時のみ実行
_showOnboarding() {
  // katachi ホットスポットだけパルスアニメ
  // 他スロットはオーバーレイで暗くする
  // タップ後: shipBuildGuideShown = true, 全スロット解放
}
```

### 大型艦ロードマップ UI

```js
// app.largeBlueprintObtained === true の時のみヘッダーに表示
_renderBlueprintProgress() {
  const cost = Config.GRADE2.LARGE_SHIP_CRAFT_COST;
  // { pearl:5, coral:5, anchor:3, deepstone:2 } の進捗バーを表示
  // 素材が揃ったら「クラフト！」ボタンを表示
}
```

### テーマ達成演出

```js
_checkThemeCompletion(ship) {
  // Config.GRADE2.THEME_SETS のいずれかが全パーツ装備済みか確認
  // 達成時: テーマ名 + oura 提案モーダル表示
}
```

### スロット ID と GameStore の対応

| Config スロット | GameStore キー | 旧キー（Phase B で移行） |
|---------------|--------------|----------------------|
| katachi | ship.katachi | ship.hull |
| suishin | ship.suishin | ship.sail |
| senshu  | ship.senshu  | ship.figurehead |
| senbi   | ship.senbi   | ship.deck |
| hata    | ship.hata    | ship.flag |
| oura    | ship.oura    | ship.glow |

**Phase B の SaveManager 追記箇所**（`_migrateShipState` 内のコメント参照）:

```js
const keyMap = { hull:'katachi', sail:'suishin',
                 figurehead:'senshu', deck:'senbi',
                 flag:'hata', glow:'oura' };
Object.entries(keyMap).forEach(([oldKey, newKey]) => {
  if (oldKey in ship) { ship[newKey] = ship[oldKey]; delete ship[oldKey]; }
});
```

### SLOTS_BY_SIZE 更新

```js
const SLOTS_BY_SIZE = {
  small:  ['katachi'],
  medium: ['katachi', 'suishin', 'hata'],
  large:  ['katachi', 'suishin', 'senshu', 'senbi', 'hata', 'oura'],
};
```

---

## B-4: `src/styles/components.css` 追記

### 追加するクラス

```css
/* 船レンダラー本体 */
.ship-renderer { position: relative; width: 480px; height: 320px; overflow: hidden; }
.ship-layer    { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

/* 水面レイヤー */
.ship-layer-water { background: linear-gradient(180deg, #56CCF2 0%, #1565C0 100%);
                    animation: waterWave 3s ease-in-out infinite; }

/* オーラエフェクト */
.ship-oura-fire   { ... }
.ship-oura-bubble { ... }
.ship-oura-star   { ... }
.ship-oura-fog    { ... }

/* ホットスポット */
.ship-hotspot { position: absolute; border-radius: 50%; ... }
.ship-hotspot.active { box-shadow: 0 0 0 4px var(--color-primary); }
.ship-hotspot.pulse  { animation: hotspotPulse 1.5s ease-in-out infinite; }

/* パーツカード */
.part-card          { ... }
.part-card-equipped { border: 2px solid var(--color-success); }
.part-card-locked   { opacity: 0.5; }

/* 大型艦進行バー */
.blueprint-progress     { ... }
.blueprint-progress-bar { ... }

/* テーマ達成バッジ */
.theme-badge        { ... }
.theme-badge-done   { background: var(--color-warning); animation: themeGlow 1s ease-in-out infinite; }

/* アップグレードカットイン（BookshelfScreen 用） */
.ship-upgrade-cutin     { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.85);
                          display: flex; align-items: center; justify-content: center; }
.ship-upgrade-cutin-box { background: var(--color-surface); border-radius: 20px; padding: 32px;
                          text-align: center; max-width: 360px; }
.ship-upgrade-cutin-ship  { font-size: 64px; margin-bottom: 16px; }
.ship-upgrade-cutin-title { font-size: 22px; font-weight: bold; margin-bottom: 12px; }
.ship-upgrade-cutin-body  { font-size: 14px; line-height: 1.8; margin-bottom: 16px; }
.ship-upgrade-cutin-npc   { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 20px; }
.ship-upgrade-cutin-out   { animation: fadeOut 0.3s ease forwards; }
```

---

## B-5: `sw.js` 更新

```js
const SW_VERSION = '2.1.2';  // ← 2.1.1 から bump

// ASSETS[] に追加するパス（パーツ画像が出来次第追記）
'assets/ships/katachi/katachi_pirate.png',
'assets/ships/katachi/katachi_coral.png',
// ... 全パーツ PNG
```

---

## 実装順序（直列）

```
B-1: shipItems.js 書き換え
  ↓
B-2: ShipRenderer.js 新規作成
  ↓
B-3: ShipBuildScreen.js 書き換え（ShipRenderer を import）
  ↓
B-4: components.css 追記
  ↓
B-5: sw.js 更新
  ↓
バグ確認コミット
```

---

## バグリスク事前対策

| リスク | 対策 |
|--------|------|
| 旧スロットキー（hull 等）が残ったセーブで ShipBuildScreen が壊れる | `_migrateShipState` の Phase B 追記を最初に実行 |
| PNG が存在しない状態でレイヤーが壊れる | `img.onerror` で透明フォールバック画像をセット |
| `renderMini` が大量の Canvas を生成してメモリリーク | LRU キャッシュ上限 20 エントリを厳守 |
| テーマ達成が毎回発火する | `ship.completedThemes[]` 配列に記録して二重発火防止 |
| GameStore の ship キー名が変わって ResultScreen・BookshelfScreen が壊れる | `_migrateShipState` 完了後のみ新キー参照、それ以外は旧キーも `??` でフォールバック |
| `show()` が複数回呼ばれて重複購読 | 既存の `_unsubscribe()` パターン維持 |

---

## GameStore `ship` 状態（Phase B 完了後）

```js
ship: {
  name:               'グリモア号',
  size:               'small',       // 'small' | 'medium' | 'large'
  displaySize:        null,          // null | 'small'（ちいさくみせる）
  // スロット（新キー名）
  katachi:            null,          // 装備中パーツID or null
  suishin:            null,
  senshu:             null,
  senbi:              null,
  hata:               null,
  oura:               null,          // 'fire'|'bubble'|'star'|'fog'|null
  // メタ
  crafted:            [],            // クラフト済みパーツID配列
  completedThemes:    [],            // 達成済みテーマID配列（二重発火防止）
  nameSetByUser:      false,
  shipBuildGuideShown: false,
  largeCrafted:       false,         // 大型艦クラフト完了フラグ（Phase B で追加）
}
```

---

## 参照: Phase A で追加した関連定義

- `Config.GRADE2.SHIP_PARTS` — 6スロット定義（katachi/suishin/senshu/senbi/hata/oura）
- `Config.GRADE2.THEME_SETS` — 6テーマセット（pirate/coral/mermaid/ghost/dragon/space）
- `Config.GRADE2.LARGE_SHIP_CRAFT_COST` — `{ pearl:5, coral:5, anchor:3, deepstone:2 }`
- `GameStore.app.pendingShipUpgrade` — null | 'medium' | 'large_blueprint'
- `GameStore.app.largeBlueprintObtained` — boolean
- `GameStore.ship.shipBuildGuideShown` — boolean
- `SaveManager._migrateShipState()` — Phase B スロットキー移行コメント済み
