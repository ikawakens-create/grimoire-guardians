# セッション引き継ぎ

**保存日時**: 2026-04-10

---

## 今日やったこと

### マイハウス UX 全面刷新（コミット済み）

**コミット**: `30a79f0` — feat: マイハウス UX 全面刷新（divプレビュー・左右レイアウト・ティアロック）

#### 変更内容

**HouseBuildScreen.js**
- SVG断面図を廃止し、実スプライト divスタックに置き換え
- `_renderHousePreview()`: flexの比例高さで各レイヤーを実画像表示
  - `hb-layer-slot.hb-available`: タップで選択・スタイルタブへ自動切替
  - `hb-layer-slot.hb-tier-locked`: ティアが低いため存在しない階層（ロック表示）
  - `hb-layer-slot.hb-world-locked`: ワールドクリア不足（ロック表示）
- `_bindEvents()`: `.layer-tap-btn` → `.hb-layer-slot.hb-available` に更新
- `_applyStyle()`: 適用レイヤーに `hb-flash` アニメーション（0.4秒）追加
- `_renderStyleOptions()`: 2列グリッド・ティアバッジ（🟤🔵🟣）・レイヤー互換フィルタ

**HouseScreen.js**
- 全景ビューを横画面向け左右分割レイアウトに変更
  - 左55%：家ビジュアル（スプライト合成）が主役
  - 右45%：レイヤーリスト＋装飾行
  - 「きせかえ」ボタンを家画像の下にオーバーレイ表示
- `house-craft-btn` を `querySelectorAll` 対応に変更（複数ボタン）

**components.css**
- `.house-overview-body` / `.house-overview-left` / `.house-overview-right` 追加
- `.house-visual-stack` を `width: 100%` / `max-width: 260px` に変更
- `.style-card-grid-v4` を3列→2列に変更
- `.hb-*` スタイル群すべて追加（hb-house-preview, hb-layer-slot, hb-selected,
  hb-tier-locked, hb-world-locked, hb-layer-label-overlay, hb-flash）
- `.sc-tier-badge` 追加

---

## 未コミットの変更

なし（working tree clean）

---

## 次にやること（優先順）

### 【最優先】動作確認

ブラウザで開いてテスト：
1. HouseBuildScreen で家プレビューが実画像で表示されるか（style_wood）
2. レイヤータップでスタイルタブが開き、タップしたレイヤーが選択状態になるか
3. スタイルカードをタップすると家プレビューが即変化し、フラッシュアニメーションが出るか
4. ティアロック・ワールドロックが正しく表示されるか
5. HouseScreen で家が左55%に大きく表示されるか

### 【その後】残り14スタイルの画像生成

style_wood 動作確認後、各ティアのプロンプトを確定して順次生成：
- Basic 残り4（stone / brick / bamboo / forest）
- Special 5（ice / sakura / candy / flame / sea）
- Legend 5（black / thunder / moon / jewel / star）

---

## 未解決のバグ・問題

なし（確認待ち）

---

## 重要なメモ

### ブランチ・バージョン情報
- **現在のブランチ**: `claude/session-april-10-morning-n3eft`
- **現在の SW バージョン**: `v2.3.9`（sw.js）
- **spritesheet.png**: style_wood のみ実画像・残り14スタイルはプレースホルダー

### ティア別スプライトシート仕様
| ティア | 対象スタイル | キャンバスサイズ | セクション数 |
|-------|-----------|--------------|------------|
| Basic  | wood/stone/brick/bamboo/forest | 1024×1032px | 3（tower/floor1/garden） |
| Special | ice/sakura/candy/flame/sea | 1024×1376px | 4（tower/floor2/floor1/garden） |
| Legend | black/thunder/moon/jewel/star | 1024×2064px | 5（tower/floor3/floor2/floor1/garden） |

### getSpriteLayerSpec() のロジック（styleItems.js）
- `style.sections` 配列順に積算してY座標を計算
- legendティアの tower だけ sh=688、それ以外は sh=344
- bgSizePct = totalH / sh * 100、bgPosPct = sy / (totalH - sh) * 100

### 実装済みの主要 API

**CharacterAvatar（v2.1）**
```js
const avatar = new CharacterAvatar('md');
avatar.updateSkin(skinId);
avatar.greet(name, streak);
avatar.victoryPose(line);
```

**WardrobeScreen（リアクションプレビュー付き試着室）**
- `GameStore.setState('app.currentScreen', 'wardrobe')` で遷移
- スキン選択 → 0.3秒後に自動 greet
- REACTION_BTNS: correct/wrong/combo3/greet の4種試し再生
- Create/Destroy パターン
