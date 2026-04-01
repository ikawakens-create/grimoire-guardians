# セッション引き継ぎ

**保存日時**: 2026-04-01

## 今日やったこと
- docs: 技術的負債2項目（Router汎用化・GameStore分割）を解消済みに更新（CLAUDE.md・progress.md）
- BGM音楽9曲をGeminiで作成・リネーム・`assets/sounds/bgm/` に配置
  - bgm_title / bgm_bookshelf / bgm_town / bgm_quiz / bgm_boss / bgm_result / bgm_house / bgm_harbor / bgm_farm
- SoundManager.js をMP3ファイル再生（HTMLAudioElement）に全面実装（合成音BGM廃止）
- sw.js を v2.3.6 にバンプ・MP3 9曲をキャッシュ対象に追加
- 全画面（15画面）にBGM割り当てを実装（TownScreen・HouseScreen・HouseBuildScreen・ShipBuildScreen・FarmScreen・ResultScreen・FinalBattleScreen）
- バグ修正：iOS自動再生制限でBGMが無音になる問題を `_unlock()` でリトライ処理を追加して修正

## 未コミットの変更
なし（クリーン）

## 次にやること（優先順）
1. **スキン画像の生成・配置**（`.claude/tasks/skin-images-plan.md` に詳細プランあり）
   - Gemini Imagen で全25種生成 → `assets/skins/{id}.png` に配置
   - rembg で背景除去 → 240×360px にリサイズ
2. **サウンド本実装（SE）**：効果音もMP3ファイルに置き換え（現在はOscillatorモック）
3. **Grade 3 準備**（`dimensionConfig.js` に次元定義あり・未着手）

## 未解決のバグ・問題
- なし

## 重要なメモ
- BGMはすべて `assets/sounds/bgm/` に配置済み・SW v2.3.6 でキャッシュ対象
- SE（効果音）はまだ Oscillator モック。Gemini で SE を作成するときは短め（0.5〜3秒）で作ること
- sw.js の ASSETS[] は新ファイル追加時に必ず更新すること
- 技術的負債の残項目：サウンド本実装（中優先度）のみ
