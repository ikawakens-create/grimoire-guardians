# /review — コードレビュー

コミット・PR前に品質チェックを行う。`.claude/agents/reviewer.md` のルールで検査する。

## 使い方
```
/review                    # 現在の git diff をレビュー
/review src/screens/FarmScreen.js   # 特定ファイルをレビュー
```

## 実行手順

1. `git diff` または指定ファイルを読む
2. `.claude/agents/reviewer.md` のチェックリストを全項目確認する
3. 以下フォーマットで結果を出力する

## 出力フォーマット

```
## 🔍 コードレビュー結果

### ✅ 問題なし
-

### 🚨 必須修正（コミット前に直す）
-（問題点 + 差分形式の修正案）

### ⚠️ 推奨修正（できれば直す）
-

### 💡 提案（任意）
-

---
🟢 コミットOK / 🔴 修正してから再レビュー
```

## このプロジェクト固有の重点チェック

- `GameStore.subscribe((path, newValue, oldValue) => ...)` の引数順
- `top`/`left`/`width`/`height` アニメーション禁止（`transform` を使う）
- Show/Hide 画面の `hide()` 実装漏れ
- `sw.js` の `ASSETS[]` 追加漏れ・`SW_VERSION` 更新漏れ
