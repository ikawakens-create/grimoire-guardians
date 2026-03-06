# /status — 進捗確認

プロジェクト全体の現在地を確認する。

## 実行手順

1. `git log --oneline -10` でコミット履歴を確認
2. `.claude/progress.md` を読む
3. `.claude/tasks/` のファイルを一覧する
4. 以下フォーマットで出力する

## 出力フォーマット

```
## 📊 Grimoire Guardians 進捗レポート

### ✅ 完了済みフェーズ
- Phase 0.1–0.3: 33ワールド・700問
- Phase 1-D: 家ビルドシステム
- Phase 1-E: まちシステム
- Phase 1-F: スキンシステム
- Phase 1-H: きおくのいせき（フラグOFF）

### 🔄 進行中のタスク
（tasks/ のファイルから）

### ⬜ 次のフェーズ（未着手）
- Phase 1 音声: Web Audio API
- Phase 2: 2年生算数 M2シリーズ

### 📅 最近のコミット（直近5件）
（git log から）

### 🐛 未解決バグ
（checkpoint.md や tasks/ から）
```
