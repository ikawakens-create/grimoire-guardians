# セッション引き継ぎ

**保存日時**: 2026-04-16

---

## 今日やったこと

### マイハウス スプライトシート — Special 5スタイル完了

| スタイル | コミット | 処理方法 |
|---------|---------|---------|
| style_ice | `0bf1397` | rembg + 白抜き + グレースパークル精密除去 |
| style_sakura | `b31620a` | rembg + スパークルピクセル単位置換 |
| style_candy | `6f6362b` | rembg + ラベルテキスト除去 + スパークル精密除去 |
| style_flame | `6f6362b` | rembg（夜空）+ 溶岩gardenソリッド保持 |
| style_sea | `b1021e7` | tower:rembg / floor2〜floor1:空色検出除去（B>R+40）/ oceanソリッド保持 |

---

## 未コミットの変更

なし（working tree clean）

---

## 次にやること（優先順）

### 【最優先】Legend 5スタイルのプロンプト作成・画像生成・処理

Legend ティア仕様（`styleItems.js` 確認済み）:
- **キャンバスサイズ**: 1024×2064px
- **セクション数**: 5（tower:688px / floor3:344px / floor2:344px / floor1:344px / garden:344px）

生成順とテーマ:
1. **style_black**（くろのしろ）— 黒い城 / ガーゴイル / 紫の煙 / 鎖
2. **style_thunder**（かみなりのしろ）— 雷と嵐の城
3. **style_moon**（つきのしろ）— 月光の城
4. **style_jewel**（ほうせきのしろ）— 宝石・水晶の城
5. **style_star**（ほしのしろ）— 星空の城

### 【その後】動作確認（ブラウザ）

全15スタイル完了後:
- HouseBuildScreen で全スタイルプレビューが出るか確認
- ティアロック・ワールドロック表示の確認
- sw.js の ASSETS[] に全 spritesheet.png パスを追加 + SW_VERSION バンプ

---

## 未解決のバグ・問題

なし

---

## 重要なメモ

### 現在の完了状況

| ティア | スタイル | 状態 |
|-------|---------|------|
| Basic | wood / stone / brick / bamboo / forest | ✅ 全5完了（1024×1032px） |
| Special | ice / sakura / candy / flame / sea | ✅ 全5完了（1024×1376px） |
| Legend | black / thunder / moon / jewel / star | ⬜ 未着手（1024×2064px） |

### ブランチ・バージョン情報

- **現在のブランチ**: `claude/morning-session-4-16-RTHpA`
- **現在の SW バージョン**: `v2.3.9`（sw.js）

### Legend ティアのスプライトシート仕様

| セクション | Y範囲 | 高さ |
|-----------|------|------|
| tower（ROW1+2） | 0〜687 | 688px |
| floor3（ROW3） | 688〜1031 | 344px |
| floor2（ROW4） | 1032〜1375 | 344px |
| floor1（ROW5） | 1376〜1719 | 344px |
| garden（ROW6） | 1720〜2063 | 344px |

### 処理スクリプト 再利用パターン

```python
# 白背景スタイル（Basic・Special標準）
# → tower〜floor1: rembg / garden: 白抜き（arr[white, 3]=0）

# 暗い背景スタイル（flame・Legend系）
# → tower〜floor1: rembg / garden: ソリッド保持

# 青空背景スタイル（sea）
# → tower: rembg / floor2〜floor1: 空色検出（b > r+40）& b>150 & g>130

# スパークル検出（全スタイル共通）
# (np.abs(r-g)<25) & (np.abs(r-b)<25) & (r>140) & (r<230) & 右下領域(Y>=180, X>=700)
```

### Gemini プロンプト品質ルール（確立済み）

- `[CANVAS]` に必ず 1024×NNNN と各セクション Y 範囲を明記
- `[!! DOOR CONTAINMENT RULE — CRITICAL !!]` 必須
- `[NEGATIVE PROMPT]` に `sparkle artifact in corners` `text labels` `section guidelines` を必須記載
- 背景は必ず指定（白 / 空色 / 夜空）
- 他スタイルとの差別化: シルエット形状・構図の非対称性・使用色相を変える

### 各スタイルの差別化まとめ（生成済み）

| スタイル | 構図の特徴 |
|---------|----------|
| sakura | 非対称（桜の木が右）/ 横長 / 和風茶室 |
| candy | 左右対称 / 縦長タワー / お菓子密集 |
| flame | 非対称（建物左・炎右）/ 夜景・暗い空 |
| sea | 桟橋上の家 / 水中セクションあり / 明るい昼間 |
| black | 次回 → サクラ・キャンディ・フレイム・シーと全部違う構図で |
