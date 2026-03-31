# セッション引き継ぎ

**保存日時**: 2026-03-31

## 今日やったこと
- CLAUDE.md 全面リライト（PART A/B/C構造・漢字制限・2ペルソナ評価ループ）→ main マージ（PR #102）
- Gemini の旧 CLAUDE.md とのコンフリクトをリベースで解消
- ルート直下モンスター画像残骸 `mon_*.png.png`（13ファイル）削除 → main マージ（PR #104）
- Router 汎用化: `_persistentScreens` Map 導入・index.js 833行→743行 → main マージ（PR #105）
- GameStore 分割: `initialState.js` 新規作成・factory関数化・GameStore.js 860行→617行 → main マージ（PR #106）

## 未コミットの変更
なし（クリーン）

## 次にやること（優先順）
1. **スキン画像の生成・配置**（rembg 環境セットアップ済み）
   - 全25種スキンを Gemini Imagen で生成 → `assets/skins/{id}.png` に配置
   - rembg で背景除去 → 240×360px リサイズ
2. **サウンド本実装**（Phase 3 以降で良い）
   - SoundManager.js の Oscillator モック → Audio バッファ再生（mp3/wav）

## 完了済みタスク（消込）
- ✅ CLAUDE.md 全面リライト
- ✅ モンスター画像残骸削除
- ✅ M2-10a〜h 問題拡充（実装済み確認）
- ✅ Router 汎用化（PR #105）
- ✅ GameStore 分割（PR #106）
- ✅ 技術的負債（高優先度）全解消

## 未解決のバグ・問題
- なし

## 重要なメモ
- 高優先度の技術的負債はすべて完了。残りは「サウンド本実装（中）」のみ
- rembg[cpu] / pillow インストール済み（セッションスタートフック確認済み）
- sw.js の ASSETS[] は新ファイル追加時に必ず更新すること
- 次の大きなタスクはスキン画像生成（Gemini Imagen 連携が必要）
