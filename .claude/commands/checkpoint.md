# /checkpoint — セッション状態保存

作業を中断するときに現在の状態を `.claude/checkpoint.md` に保存する。
次のセッションで `/morning` を実行すると引き継ぎ情報として読み込まれる。

## 使い方
```
/checkpoint            # 現在の状態を保存
/checkpoint [メモ]     # メモを添えて保存
```

## 実行手順

1. `git status` と `git diff --stat` で現在の変更を確認
2. `git log --oneline -3` で直近のコミットを確認
3. `.claude/tasks/` の未完了タスクを確認
4. `.claude/checkpoint.md` を以下フォーマットで**上書き**保存する

## checkpoint.md の書き込みフォーマット

```markdown
# セッション引き継ぎ

**保存日時**: YYYY-MM-DD HH:MM

## 今日やったこと
-

## 未コミットの変更
（git status の内容）

## 次にやること（優先順）
1.
2.
3.

## 未解決のバグ・問題
-

## 重要なメモ
-
```
