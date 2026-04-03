# セッション引き継ぎ

**保存日時**: 2026-04-03

## 今日やったこと（4/3セッション後半）

### UnitIntroScreen 改修（Ph1〜Ph4A）
- **Ph1** — 基盤整備
  - `render()` に 90%未満クリア再表示ロジック追加
  - `_renderFull()` → `_renderRepeat()` リネーム、`_renderMiniBanner()` 廃止
  - `_renderFirst()` スタブ追加
  - 「はじめる！」ボタンを縦方向中央配置に変更
  - `ConceptVisualizer.js` スケルトン新規作成
- **Ph2** — 廃止（施設ヒント表示は「子供に不要」と判断）
  - 代替方針：クリア後・クエスト後にストーリーで意味づけ → Ph7スコープ拡張で対応
- **Ph3** — キャラ対話＋マイクロ体験問題
  - `_renderFirst()` 本実装（ConceptVisualizer起動 → 完了時クイズへ直行）
  - `ConceptVisualizer.js` 本実装：対話タップ進行・マイクロ体験・フォールバック対話
  - `conceptGuides.js` 新規作成（M1-01・M1-07テストデータ）
- **Ph4A** — ステップアニメーション
  - `conceptGuides.js` に `difficulty` フィールド追加（easy/normal/detailed）
  - M1-07の内容を誤り修正（くりあがり→20までのかず）
  - M1-01・M1-07に `steps[]` 追加
  - `ConceptVisualizer.js` に `_showStep()` / `_renderStepContent()` 追加
  - 絵文字スタイル4種（normal/highlight/ten/accent）

### 設計決定事項
- `difficulty` フィールドは `conceptGuides.js` に集約（worlds.jsは触らない）
  - 3年生・理科・社会を追加するときも conceptGuides.js に追記するだけ
  - easy: steps 1〜2個 / normal: 2〜3個 / detailed: 4〜5個

## 未コミットの変更
なし（クリーン）

## ブランチ状況
- `claude/morning-session-april-3-vWHrU` にプッシュ済み（PR 未作成）

## 次にやること（優先順）
1. **UnitIntroScreen 改修 Ph4B** — ひきざん（M1-02）・くりさがり（M1-08x）のアニメ実装
   - difficulty: 'normal' / 'detailed' を使い分ける
   - ロードマップ `.claude/tasks/unit-intro-roadmap.md` 参照
2. **Ph4C** — 時計・長さ（M1-08a〜c / M1-11）
3. **Ph4D** — Grade2 掛け算・筆算（M1-01系 / M2-14）
4. **Ph5** — Grade1 全33ユニット conceptGuides データ充填
5. **Antigavity テストプレイ** — デバッグオーバーレイの動作確認

## 未解決のバグ・問題
- なし

## 重要なメモ

### conceptGuides.js の difficulty 基準
| difficulty | steps数 | 対象概念 |
|-----------|--------|---------|
| easy | 0〜2 | かず・なかまづくり・じゅんばん |
| normal | 2〜3 | たしざん・ひきざん・時計・長さ |
| detailed | 4〜5 | くりあがり・くりさがり・掛け算・ひっさん・分数 |

### ConceptVisualizer フロー
```
_renderFirst() → ConceptVisualizer
  dialogue（タップで進む）
  → steps（タップで進む、なければスキップ）
  → microChallenge（なければスキップ）
  → onComplete → _onStart()（クイズへ直行）
```

### steps の content 構造
```js
steps: [
  {
    content: [
      { emoji: '🍎', count: 3, style: 'normal' },
      { emoji: '🍊', count: 2, style: 'highlight' },
    ],
    label: 'ぜんぶで いくつ？',
  },
]
// style: 'normal' | 'highlight' | 'ten' | 'accent'
```

### Ph7スコープ拡張メモ（Ph2廃止の代替）
- クイズクリア → ストーリー演出 → 施設解放
- ギルドクエストクリア → ストーリー → 報酬
- ResultScreen後だけでなく複数トリガーに対応予定
