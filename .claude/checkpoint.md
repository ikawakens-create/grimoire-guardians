# セッション引き継ぎ

**保存日時**: 2026-04-14

---

## 今日やったこと

### マイハウス スタイル画像生成（スプライトシート配置）

Basic ティア 5スタイル + Special ティア 1スタイルの spritesheet.png を生成・配置完了。

#### 処理済みスタイル

| スタイル | ティア | サイズ | 状態 |
|---------|-------|--------|------|
| style_wood | Basic | 1024×1032px | ✅ 配置済み |
| style_stone | Basic | 1024×1032px | ✅ 配置済み |
| style_brick | Basic | 1024×1032px | ✅ 配置済み |
| style_bamboo | Basic | 1024×1032px | ✅ 配置済み |
| style_forest | Basic | 1024×1032px | ✅ 配置済み |
| style_ice | Special | 1024×1376px | 🔄 画像生成済み・main未アップ・処理待ち |

#### 処理手順（確立済みパターン）

- 屋根・壁セクション: `rembg` で透過処理
- 庭セクション（Section 3 or 4）: 元画像を保持（rembg で草が消えるため）
- forest は Section1（丘）も元画像保持、Section2（ドア）のみ rembg

---

## 未コミットの変更

なし（working tree clean）

---

## 次にやること（優先順）

### 【最優先】style_ice の処理

1. ユーザーが main に画像をアップロード
2. `git pull origin main`
3. 処理スクリプト実行（屋根〜Floor1 rembg、Gardenは元画像保持）
4. コミット & プッシュ

### 【その次】残り Special 4スタイルのプロンプト生成・画像処理

| スタイル | 方向性 | 状態 |
|---------|-------|------|
| style_sakura | **和風茶室**（低い切妻屋根・縁側・桜が覆いかぶさる） | ⬜ プロンプト未作成 |
| style_candy | お菓子の家 | ⬜ プロンプト未作成 |
| style_flame | 炎の家 | ⬜ プロンプト未作成 |
| style_sea | 海の家 | ⬜ プロンプト未作成 |

### 【その後】Legend ティア 5スタイル（1024×2064px・5セクション）

| スタイル | テーマ |
|---------|-------|
| style_black | 黒・闇 |
| style_thunder | 雷 |
| style_moon | 月 |
| style_jewel | 宝石 |
| style_star | 星 |

---

## 未解決のバグ・問題

なし

---

## 重要なメモ

### ティア別スプライトシート仕様

| ティア | 対象スタイル | キャンバスサイズ | セクション数 | セクション順 |
|-------|-----------|--------------|------------|------------|
| Basic | wood/stone/brick/bamboo/forest | 1024×1032px | 3 | tower/floor1/garden |
| Special | ice/sakura/candy/flame/sea | 1024×1376px | 4 | tower/floor2/floor1/garden |
| Legend | black/thunder/moon/jewel/star | 1024×2064px | 5? | tower/floor3/floor2/floor1/garden? ※要確認 |

### 各セクションの Y 座標（Special ティア）

| セクション | Y範囲 | 内容 |
|-----------|------|------|
| Section 1 | 0–343 | TOWER（塔・屋根） |
| Section 2 | 344–687 | FLOOR 2（2階） |
| Section 3 | 688–1031 | FLOOR 1（1階・ドア） |
| Section 4 | 1032–1375 | GARDEN（庭） |

**ドア配置ルール（Special）**: ドア底辺は Y 991 以上（Section 3 下端 1031 から 40px 以上余白）

### プロンプト品質ルール（確立済み）

1. 屋根の形を全スタイルで差別化（三角/ギャンブレル/パゴダ/ドーム/ダイヤモンドスパイア）
2. 建物の形そのものでも個性を出す（高床式/ホビット穴/etc）
3. ドア含有ルールを必ず明記（ドアが庭セクションにはみ出す問題への対処）
4. 草の発光グラデーション禁止を明記
5. Building width = 320px（1/3 of canvas）を厳守指示

### ブランチ情報

- **開発ブランチ**: `claude/session-april-10-morning-n3eft`
- **現在の SW バージョン**: `v2.3.9`
- **sw.js の ASSETS[] 更新**: style_* の spritesheet.png を全部追加する必要あり（画像配置完了後にまとめて対応）
