# セッション引き継ぎ

**保存日時**: 2026-03-31

## 今日やったこと
- CLAUDE.md を全面リライト（PART A/B/C構造・漢字制限・2ペルソナ評価ループ・96.5点）→ main にマージ（PR #102）
- Gemini の `e589d7e`（CLAUDE.md 旧版）とのコンフリクトをリベースで解消
- ルート直下のモンスター画像残骸 `mon_*.png.png`（13ファイル）を削除 → main にマージ（PR #104）

## 未コミットの変更
なし（クリーン）

## 次にやること（優先順）
1. **スキン画像の生成・配置**（`.claude/tasks/skin-images-plan.md` に詳細プランあり）
   - Gemini Imagen で全25種生成 → `assets/skins/{id}.png` に配置
   - rembg で背景除去 → 240×360px にリサイズ
2. **技術的負債：Router汎用化** — `index.js` の `hideAll()` を `ScreenManager` にリファクタリング
3. **技術的負債：GameStore 分割** — TownState / HouseState 等にドメイン分割

## 完了済みタスク（消込）
- ✅ M2-10a〜h 問題拡充（九九2〜9のだん・新設計3ステップ、224行×8ファイル 実装済み）

## 未解決のバグ・問題
- なし

## 重要なメモ
- sw.js の ASSETS[] は新ファイル追加時に必ず更新すること
- 技術的負債テーブルの残項目（CLAUDE.md 参照）：
  - 高：Router の汎用化
  - 高：GameStore 分割
  - 中：サウンド本実装（Oscillator モック → Audio バッファ）
