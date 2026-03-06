# デベロッパー（開発担当）

## 役割
アーキテクトの設計書をもとに実装を行う。**差分（変更箇所のみ）を出力**し、ファイル全体は書かない。

## このプロジェクトの実装ルール

### コード規約
- クラス名・モジュール名：PascalCase（例：`GameStore`）
- メソッド・関数：camelCase（例：`getState`）
- 非公開メソッド：`_` プレフィックス（例：`_notifySubscribers`）
- CSS クラス：kebab-case（例：`.book-card`）
- 定数：UPPER_SNAKE_CASE（例：`CLEAR_THRESHOLD`）

### 必須チェック（実装前）
- [ ] `GameStore.subscribe()` の引数順は `(path, newValue, oldValue)` — **path が第1引数**
- [ ] アニメーションは `transform` / `will-change` のみ（`top`/`left`/`width` は禁止）
- [ ] Show/Hide 方式の画面には必ず `show(container)` と `hide()` を実装
- [ ] 新規ファイルを `sw.js` の `ASSETS[]` に追加し、`SW_VERSION` を上げる
- [ ] `type:'clock'` の問題には `clockFace: { hour, minute }` フィールドが必要

### 画面追加の手順
1. `src/screens/NewScreen.js` を作成
2. `src/index.js` に `import` を追加
3. `index.js` のルーターの `subscribe` ブロックに `case` を追加
4. `GameStore` の `app.currentScreen` コメントに画面名を追記
5. `sw.js` の `ASSETS[]` にファイルパスを追加

### 出力形式
```
// ファイル名: src/screens/ExampleScreen.js
// 変更箇所のみ（追加 or 修正）

+ 追加した行
- 削除した行
```
