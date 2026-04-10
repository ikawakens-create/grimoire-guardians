# セッション引き継ぎ

**保存日時**: 2026-04-10

---

## 今日やったこと

### マイハウス スプライトシート設計・プロンプト開発

スタイル別スプライトシートの AI 画像生成プロンプトを試行錯誤し、最終的に以下の新設計に到達。

**根本的な設計変更（塔問題の解決）：**
- 旧仕様：512×2064px・5セクション・全スタイル共通 → 細長く「塔」に見える問題
- 新仕様：3ティア制・キャンバス高さ＋建物幅をティア別に変更

| ティア | 対象スタイル | キャンバスサイズ | 建物幅 | セクション数 |
|-------|-----------|--------------|------|------------|
| Basic  | style_wood / stone / brick / bamboo / forest（unlockWorld 0-11） | 1024×1032px | ~480px | 3（屋根/1F/庭） |
| Special | style_ice / sakura / candy / flame / sea（unlockWorld 15-23） | 1024×1376px | ~720px | 4（屋根/2F/1F/庭） |
| Legend | style_black / thunder / moon / jewel / star（unlockWorld 25-33） | 1024×2064px | ~980px | 5（屋根tall/3F/2F/1F/庭） |

**style_wood の画像生成：完了・承認済み**
- 1024×1032px・ログキャビン・A フレーム屋根・リンゴの木・白いフェンス
- 白背景のまま（rembg 処理はコード実装後）

---

## 未コミットの変更

なし（working tree clean）

---

## 次にやること（優先順）

### 【最優先】マイハウス 3ティア対応コード実装（3ファイル）

新しいスプライトシート仕様（ティア別キャンバス高さ・セクション数）に対応するためコードを更新する。

**変更ファイル：**

| ファイル | 変更内容 |
|---------|---------|
| `src/data/styleItems.js` | 各スタイルに `spritesheetHeight`・`spritesheetWidth`・`sections` プロパティを追加 |
| `src/screens/HouseScreen.js` | ティア別 SPRITE_SPEC を動的に切り替え・セクション数対応 |
| `src/screens/HouseBuildScreen.js` | 同上（エディター側も同じ対応） |

**新 SPRITE_SPEC（ティア別）：**

```js
// Basic（3セクション・1032px）
const SPRITE_SPEC_BASIC = {
  roof:   { sy: 0,   sh: 344 },
  floor1: { sy: 344, sh: 344 },
  garden: { sy: 688, sh: 344 },
};

// Special（4セクション・1376px）
const SPRITE_SPEC_SPECIAL = {
  roof:   { sy: 0,    sh: 344 },
  floor2: { sy: 344,  sh: 344 },
  floor1: { sy: 688,  sh: 344 },
  garden: { sy: 1032, sh: 344 },
};

// Legend（5セクション・2064px）
const SPRITE_SPEC_LEGEND = {
  roof:   { sy: 0,    sh: 688 },
  floor3: { sy: 688,  sh: 344 },
  floor2: { sy: 1032, sh: 344 },
  floor1: { sy: 1376, sh: 344 },
  garden: { sy: 1720, sh: 344 },
};
```

**styleItems.js に追加するプロパティ（Basic 例）：**
```js
spritesheetHeight: 1032,
spritesheetWidth: 1024,
sections: ['roof', 'floor1', 'garden'],
```

### 【その後】style_wood 画像の rembg 処理・配置

コード実装後に以下を実施：
1. ユーザーが手元に持つ承認済み PNG を受け取る
2. `rembg` で白背景→透過処理
3. `assets/houses/style_wood/spritesheet.png` に配置

### 【さらにその後】残り14スタイルの画像生成

style_wood 動作確認後、各ティアのプロンプトを確定して順次生成：
- Basic 残り4（stone / brick / bamboo / forest）
- Special 5（ice / sakura / candy / flame / sea）
- Legend 5（black / thunder / moon / jewel / star）

---

## 未解決のバグ・問題

なし

---

## 重要なメモ

### ブランチ・バージョン情報
- **現在のブランチ**: `claude/session-april-10-morning-n3eft`
- **現在の SW バージョン**: `v2.3.9`（sw.js）
- **spritesheet.png**: 全15スタイルがプレースホルダー（2バイトのテキストファイル）

### 既存 SPRITE_SPEC（HouseBuildScreen.js・HouseScreen.js 現在値）
```js
const SPRITE_SPEC = {
  tower:  { sy: 0,    sh: 688, aspectW: 512, aspectH: 688, bgSize: '100% 300%', bgPos: '0% 0%'   },
  floor3: { sy: 688,  sh: 344, aspectW: 512, aspectH: 344, bgSize: '100% 600%', bgPos: '0% 40%'  },
  floor2: { sy: 1032, sh: 344, aspectW: 512, aspectH: 344, bgSize: '100% 600%', bgPos: '0% 60%'  },
  floor1: { sy: 1376, sh: 344, aspectW: 512, aspectH: 344, bgSize: '100% 600%', bgPos: '0% 80%'  },
  garden: { sy: 1720, sh: 344, aspectW: 512, aspectH: 344, bgSize: '100% 600%', bgPos: '0% 100%' },
};
```
→ 上記を3ティア対応に置き換えるのが次回の実装タスク

### CLAUDE.md ルール（特に重要なもの）
- 一度に触るファイルは最大3本
- 全ゲーム内テキストはひらがな（学年別漢字制限）
- `top/left/width/height` のアニメーション禁止（transform のみ）
- 既存ファイルを拡張できるのに新規ファイルを作らない
- `sw.js` の ASSETS[] 更新を忘れない

### 実装済みの主要 API（前セッションより引き継ぎ）

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
