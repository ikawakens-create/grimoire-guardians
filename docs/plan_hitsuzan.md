# 計画書：ひっ算モード実装

---

## 🎯 目的

タブレット・PC で「ひっ算（筆算）」を完結させる。
一の位 → 繰り上がり補助表示 → 十の位 という段階的な入力フローで
計算の仕組みを体で覚えさせ、慣れたら答え全体を一発選ぶ通常モードへ移行する。

---

## 📐 2つのモード

### モードB+C（桁別入力）— 導入フェーズ
```
┌─────────────┐
│  ¹           │  ← 繰り上がり（正解後にアニメーション表示）
│    ２ ３    │
│  ＋    ８   │
│  ───────    │
│    □ □    │  ← 最初は両方□、一の位から解答
└─────────────┘

  [1]  [2]  [3]  [4]  ← 一の位の選択肢（0〜9の中から4択）
```
1. 一の位の□を選択肢4択で答える
2. 正解 → 繰り上がりがあれば「１」がふわっとアニメーション表示
3. 十の位の□を選択肢4択で答える
4. 全桁正解 → 通常のフィードバックと同じフローへ
5. どちらかで間違え → 即不正解フィードバック（次問へ）

### モードA（全桁一括）— 習熟フェーズ
```
┌─────────────┐
│    ２ ３    │
│  ＋    ８   │
│  ───────    │
│    □ □    │
└─────────────┘

 [29]  [30]  [31]  [32]  ← 答え全体を4択
```
現状の選択肢UIとほぼ同じ。筆算の縦式だけ追加。

---

## 📁 変更するファイル

| ファイル | 変更内容 |
|----------|----------|
| `src/components/HitsuzanRenderer.js` | **新規作成** — 縦式HTML描画、桁ごとの□/確定数字、繰り上がりアニメーション |
| `src/screens/QuizScreen.js` | `type:'hitsuzan'` の分岐処理を追加（`_showQuestion` / `_buildChoices`）。桁別入力の2ステップ管理 |
| `src/utils/TypeValidator.js` | `validateQuestion` に `type:'hitsuzan'` のスキーマを追加（operand1, operand2, operator, hitsuzanMode） |
| `src/data/questions/M1-10a.js` | ひっ算問題を新規追加（プロトタイプ実装として最初に対応） |
| `src/styles/components.css` | `.hitsuzan-box` スタイル追加（縦式レイアウト、□スタイル、繰り上がり表示） |
| `src/styles/effects.css` | 繰り上がりアニメーション（`.carry-appear`）追加 |
| `sw.js` | `HitsuzanRenderer.js` をキャッシュリスト（`ASSETS[]`）に追加 |

---

## 🗄️ 状態の変更（GameStore）

追加なし。既存の回答記録（`currentSession.answers[]`）をそのまま流用。
※ 桁別入力の途中状態は QuizScreen のローカル変数で管理（GameStore に持たない）

---

## 📝 新しい問題データ形式

```js
{
  id: 'M1-10a-H01',
  unitId: 'M1-10a',
  step: 1,
  type: 'hitsuzan',       // 新タイプ
  operator: '+',          // '+' or '-'
  operand1: 9,            // 上の数（数値）
  operand2: 3,            // 下の数（数値）
  correctAnswer: '12',    // 答え文字列（既存と統一）
  hitsuzanMode: 'digit-by-digit'  // 'digit-by-digit' or 'full-answer'
}
```

HitsuzanRenderer が `operand1 + operand2` を計算して以下を自動導出：
- 一の位の正解 `onesDigit`
- 十の位の正解 `tensDigit`
- 繰り上がりの有無 `hasCarry`
- 選択肢4択（正解 ±1〜3 の誤答生成）

---

## 🖥️ 画面フロー（digit-by-digit）

```
問題表示（縦式, 両桁□）
  ↓
一の位の4択表示
  ↓ 正解
繰り上がりアニメーション（あれば）
  ↓（0.8秒後）
十の位の4択表示
  ↓ 正解
正解フィードバック → 次問 or 結果画面
  ↓ 不正解（一の位 or 十の位）
不正解フィードバック → 次問 or 結果画面
```

---

## ⚠️ 気をつけること

1. **GameStore の記録タイミング**：桁別入力の途中では記録しない。両桁すべて答え終わってから `GameStore.recordAnswer()` を1回呼ぶ
2. **イベントトリガー**：既存の EventManager トリガー（問題番号ベース）はそのまま動く（1問扱いなので影響なし）
3. **validateQuestion の後方互換**：`type:'hitsuzan'` のみ `choices` フィールドが不要になる（distractorPool モードと同様の扱い）
4. **プロトタイプ対象は M1-10a のみ**：まず1ファイルで動作確認してから他のユニット（M1-10b〜11d, M1-14c/d）に展開
5. **TAB/アクセシビリティ**：タブレット前提のため touch イベント優先。キーボード対応は後回しでOK

---

## ⏱️ 作業ステップ（順番）

1. `HitsuzanRenderer.js` 作成 — 縦式HTML描画ロジック（繰り上がりアニメーション含む）
2. `components.css` + `effects.css` にスタイル追加
3. `TypeValidator.js` に `type:'hitsuzan'` バリデーション追加
4. `QuizScreen.js` に `type:'hitsuzan'` 分岐処理追加（digit-by-digit の2ステップ管理）
5. `M1-10a.js` にひっ算問題データ追加（digit-by-digit 5問 + full-answer 5問）
6. `sw.js` に `HitsuzanRenderer.js` を追加
7. ブラウザで動作確認

---

この計画で進めますか？（はい / 修正して）
