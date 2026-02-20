# Week 3B 実装計画 & 追加改良案 — Geminiレビュー依頼
## ResultScreen / SaveManager / イベントシステム + Claude改良提案

---

## 📋 現在の実装状況（Week 3A 完了時点）

```
✅ Week 1: コア基盤
  Config, GameStore, Logger, SoundManager, TypeValidator, CSS, index.html

✅ Week 2: 画面コンポーネント
  BookshelfScreen, QuizScreen, BookCard, ProgressBar, HapticFeedback

✅ Week 3A: データ層（Gemini承認・マージ済み）
  worlds.js: 8ワールド構成（B案採用）
  units.js:  全ローダー追加
  問題データ: M1-01〜M1-06b（8ユニット・120問）

⏳ Week 3B: ← 今ここ（レビュー依頼）
  ResultScreen, SaveManager, イベントシステム, ドロップシステム
```

### 現在のゲームフロー（問題点あり）

```
本棚 → ワールド選択 → クイズ → 終了 → 本棚に戻る
                              ↑
                        結果画面がない！
                        セーブもされない！
                        イベントも発火しない！
```

---

## 📚 目次

1. [Week 3B 実装提案](#1-week-3b-実装提案)
2. [ResultScreen 詳細仕様](#2-resultscreen-詳細仕様)
3. [SaveManager 詳細仕様](#3-savemanager-詳細仕様)
4. [イベントシステム詳細仕様](#4-イベントシステム詳細仕様)
5. [Claude 追加改良提案](#5-claude-追加改良提案)
6. [Geminiへの質問事項](#6-geminiへの質問事項)

---

## 1. Week 3B 実装提案

### 実装優先順位

```
Phase 1（必須・ゲームとして成立するために）:
  ① ResultScreen    ← クイズ後の結果画面（今は何も出ない）
  ② SaveManager     ← リロードで進捗が消える問題を解消

Phase 2（ゲームらしくするために）:
  ③ EventManager    ← イベント管理の中核
  ④ OmikujiEvent    ← world_5b の10問目に発動済み定義
  ⑤ MonsterBattle   ← world_6b の10問目に発動済み定義
  ⑥ DropSystem      ← 素材ドロップ確率管理

Phase 3（あると嬉しい）:
  ⑦ TreasureEvent   ← 宝箱チャレンジ
  ⑧ ThreePathsEvent ← 3つの道
```

### 新規作成ファイル一覧

```
src/
├── screens/
│   └── ResultScreen.js      ← NEW
├── core/
│   └── SaveManager.js       ← NEW
└── events/
    ├── EventManager.js      ← NEW
    ├── OmikujiEvent.js      ← NEW
    ├── MonsterBattleEvent.js ← NEW
    ├── DropSystem.js        ← NEW
    ├── TreasureEvent.js     ← NEW（Phase 3）
    └── ThreePathsEvent.js   ← NEW（Phase 3）
```

---

## 2. ResultScreen 詳細仕様

### 2-1. 表示内容

```
┌─────────────────────────────┐
│  🎉 クリア！ / がんばったね！  │  ← クリア判定（60%以上でクリア）
│                             │
│    ⭐⭐⭐                   │  ← 星評価
│                             │
│  正解: 12 / 15              │  ← スコア
│  せいかいりつ: 80%           │
│                             │
│  🪵 もくざい ×2             │  ← ドロップした素材
│  💎 ほうせき ×1             │
│                             │
│  [もう一度] [つぎのワールドへ] │  ← ボタン
└─────────────────────────────┘
```

### 2-2. 星評価基準

```yaml
⭐⭐⭐: 正解率 90%以上（13〜15問正解）
⭐⭐:   正解率 80%以上（12問正解）
⭐:     正解率 60%以上（9〜11問正解）← CLEAR_THRESHOLD
なし:   正解率 60%未満（0〜8問正解）← 未クリア
```

### 2-3. がんばったで賞（未クリア時）

```yaml
統合仕様書 v1.3 より:
  未クリア時は「バツ」ではなく「花丸」でモチベーション維持
  表示例: 「🌸 よく がんばったね！ もう一度 チャレンジ！」
  演出: 花丸のアニメーション（effects.css を活用）
```

### 2-4. ドロップ表示

```yaml
素材が1つずつ「ポン」と出てくるアニメーション
  → effects.css の drop-fall アニメーションを使用
  → 0.3秒間隔で順番に表示（最大5個）
```

### 2-5. ボタン動作

```yaml
[もう一度]: 同じワールドをリセットして再挑戦
[つぎのワールドへ]: 次のワールドが解放済みなら遷移
[本棚へ]: BookshelfScreen に戻る

ボタン表示条件:
  クリア時:   [もう一度] [つぎのワールドへ] or [本棚へ]
  未クリア時: [もう一度] [本棚へ]
```

### 2-6. ワールド解放処理

```yaml
クリア時に次のワールドを解放:
  world_1クリア → world_2 解放
  world_5クリア → world_5b 解放（おうようは必須ルート）
  world_5bクリア → world_6 解放
  world_6クリア → world_6b 解放
  world_6bクリア → Phase 0.1 完了演出
```

---

## 3. SaveManager 詳細仕様

### 3-1. 設計方針

```yaml
メイン: IndexedDB（大容量・オフライン対応）
フォールバック: localStorage（IndexedDB が使えない環境用）
AutoSave: 各問題回答後に自動保存（ゲーム中断に備える）
```

### 3-2. 保存するデータ

```javascript
// 保存データ構造
{
  version: '0.1.0',
  savedAt: '2026-02-20T...',
  player: {
    name: 'プレイヤー',
    createdAt: '...',
    lastPlayedAt: '...'
  },
  progress: {
    worlds: {
      'world_1': { cleared: true, stars: 3, score: 15, attempts: 1 },
      'world_2': { cleared: false, stars: 0, score: 0, attempts: 0 },
      // ...
    },
    stats: { totalCorrect: 42, totalPlayed: 60 }
  },
  inventory: {
    materials: { wood: 3, stone: 1, gem: 0, ... }
  },
  license: {
    core: { licensed: false }
  }
}
```

### 3-3. セーブタイミング

```yaml
自動保存:
  - 各問題に回答したとき
  - ワールドクリア時
  - アプリ非アクティブ時（visibilitychange イベント）

手動保存:
  - ResultScreen の「本棚へ」ボタン押下時
```

### 3-4. マイグレーション

```yaml
バージョン管理:
  セーブデータに version を持たせ、
  古いデータは自動でマイグレーション
  → B案追加（world_5b, world_6b）などの将来変更に対応
```

---

## 4. イベントシステム詳細仕様

### 4-1. EventManager（イベント管理）

```yaml
役割: worlds.js の events 定義を読み取り、
      適切なタイミングでイベントを発火する

発火条件:
  triggerAt: 10  → 10問目回答後に発動
  triggerAt: -1  → 最終問題回答後に発動

現在の世界定義:
  world_5b: [{ triggerAt: 10, type: 'omikuji' }]
  world_6b: [{ triggerAt: 10, type: 'monster' },
             { triggerAt: -1, type: 'phase_complete' }]
```

### 4-2. OmikujiEvent（おみくじ）

```yaml
発動: world_5b の10問目回答後
演出: おみくじ箱のアニメーション → 結果発表

結果テーブル:
  だいきち (10%): 報酬 ×3倍  「やったー！ だいきち！」
  きち     (60%): 報酬 ×1.5倍 「きちだよ！」
  きょう   (30%): おまもり付与  「おまもりが ついてる！」

おまもり効果: 次のミス1回を守る（GameStore.shieldActive）
```

### 4-3. MonsterBattleEvent（モンスターバトル）

```yaml
発動: world_6b の10問目回答後
演出: モンスター出現 → slash/explode アニメーション

通常モンスター (95%): ドロップ確率 75%
レアモンスター  (5%): 銀色に光る・確定ドロップ・高レア素材

報酬: 倍率 × ドロップ率 → GameStore.addMaterial()
```

### 4-4. DropSystem（素材ドロップ）

```yaml
ドロップ確率:
  通常問題正解時: 35%
  おみくじ ×1.5: 正解ドロップ率 52%
  おみくじ ×3:   正解ドロップ率 100%

素材レア度とドロップ率:
  コモン  (60%): wood, stone, brick
  アンコモン(30%): gem, cloth, paint
  レア    (10%): star_fragment, crown, cape, magic_orb
```

---

## 5. Claude 追加改良提案

Week 3B の必須実装に加えて、**ゲームをより面白く・継続させやすくする**
改良案を提案する。現在のアーキテクチャと拡張性を踏まえた提案。

---

### 💡 提案1: ストリーク（連続正解）ボーナス

```yaml
概要:
  連続正解数をカウントし、閾値でボーナス演出を出す

仕様:
  3連続正解: 「すごい！3もんれんぞく！」+ 小さなキラキラ
  5連続正解: 「コンボ！」+ 画面フラッシュ + ドロップ確率UP（一時的）
  全問正解:  「パーフェクト！」+ 特別演出

GameStoreへの追加:
  currentSession に streak / maxStreak を追加（統合仕様書 v1.3 で既に記載済み）

教育的効果:
  → 集中力と達成感の両立
  → 子どもが「もう一問！」と前のめりになる

実装コスト: 低（QuizScreen._handleAnswer に5行追加程度）
```

---

### 💡 提案2: まちがえた問題の復習モード

```yaml
概要:
  ResultScreen に「まちがえた もんだいを もう一度」ボタンを追加
  不正解の問題だけを再度出題するモード

仕様:
  ResultScreen に「復習する（X問）」ボタン追加
  QuizScreen を「復習モード」で起動
  復習完了後は通常の ResultScreen を表示（クリア判定なし）

教育的効果:
  → 苦手な問題を繰り返し解ける
  → 単純な「やり直し」より効率的な学習

実装コスト: 低（GameStore の answers から wrong を抽出するだけ）
```

---

### 💡 提案3: ワールド解放アニメーション

```yaml
概要:
  ResultScreen でクリアした後、次のワールドが開く瞬間に
  本棚の本が光って開くアニメーションを表示する

仕様:
  本棚に戻った際、新しく解放されたワールドのBookCardが
  「✨ キラキラ → 本が開く → 光が消える」で出現
  初回のみ表示（localStorage で「解放済み演出」フラグ管理）

ゲーム的効果:
  → 「次のステージが開いた！」という明確な報酬感
  → 子どもが次のワールドに進む動機付け

実装コスト: 中（effects.css に2〜3アニメーション追加）
```

---

### 💡 提案4: マスコットキャラクターのセリフ

```yaml
概要:
  画面の隅に小さなマスコット（グリモアくん？）が表示され、
  状況に応じたセリフを話す

出現タイミングと台詞例:
  クイズ開始時:   「がんばってね！」
  正解時:         「せいかい！やったね！」
  不正解時:       「つぎは できるよ！」（バツではなく応援）
  3連続正解時:    「すごい！コンボだ！」
  クリア時:       「やったー！クリア！」
  未クリア時:     「もう一度 いっしょに がんばろう！」

実装方法:
  小さなSVGキャラ or テキストバブル（CSS だけでも可能）
  Config.MASCOT_MESSAGES に台詞を定義

ゲーム的効果:
  → 情緒的なつながりと安心感（特に不正解時）
  → 「キャラクターと一緒に学ぶ」感覚
  → Phase 1のカスタマイズ（スキン）との連携候補

実装コスト: 低〜中（テキストバブルのみなら低）
```

---

### 💡 提案5: 学習カレンダー（継続プレイ促進）

```yaml
概要:
  本棚画面の上部に「何日連続でプレイ中」を表示する

仕様:
  🔥 3日れんぞく！ → 炎のアイコン + 連続日数
  1日プレイしなかった: ゼロリセット（厳しすぎるので要検討）
  SaveManager に lastPlayedDate を追加するだけで実現可能

教育的効果:
  → 継続習慣の形成（保護者も管理しやすい）
  → Duolingo の streak 機能と同じ心理的効果

実装コスト: 低（SaveManager + BookshelfScreen の軽微な修正）
```

---

### 💡 提案6: 保護者レポート画面（Phase 1 候補）

```yaml
概要:
  「おうちのひと用」ボタンから見られる進捗サマリー画面

表示内容:
  - クリア済みワールド数（X / 8）
  - 総問題数・正解率
  - 苦手な問題（正解率の低い単元）
  - 最終プレイ日時

実装方法:
  GameStore の stats + SaveManager の記録から生成
  別スクリーンか、モーダルで表示

保護者向け効果:
  → 「うちの子が何を学んでいるか」が一目でわかる
  → 学校の宿題ツールとしての信頼性UP
  → 有料ライセンスの購入動機になりうる

実装コスト: 中（新規スクリーン + データ集計ロジック）
```

---

## 6. Geminiへの質問事項

### 🙋 Week 3B 基本仕様

```yaml
Q1【最重要】Week 3B の実装優先順位は正しいか？
  ResultScreen → SaveManager → EventSystem の順で問題ないか？
  または並行して進めるべき箇所はあるか？

Q2 ResultScreen の星評価基準
  ⭐(60%) / ⭐⭐(80%) / ⭐⭐⭐(90%) は適切か？
  1年生（6〜7歳）のモチベーション観点で修正すべき点はあるか？

Q3 SaveManager の保存タイミング
  「各問題回答後にAutoSave」はパフォーマンス的に問題ないか？
  IndexedDB への書き込みは非同期なので問題ないと思うが確認したい。

Q4 イベントの発動タイミング
  worlds.js で定義した triggerAt（10問目）はQuizScreenの
  「回答後」「フィードバック後」どちらのタイミングで発火すべきか？
  フィードバック中にイベントが重なると混乱しないか？
```

### 🙋 Claude 追加提案について

```yaml
Q5 ストリーク（連続正解）ボーナスの採用可否
  提案1のストリークシステムは Week 3B に含めるべきか？
  それとも Week 4 以降か？

Q6 マスコットキャラクターの必要性
  提案4のマスコットは教育的に有効か？
  「不正解時に応援キャラが出る」ことで
  子どものモチベーション維持に効果があると判断するか？

Q7 復習モードの優先度
  提案2の「まちがえた問題の復習」は
  Week 3B に含めるか、Phase 0.2 以降か？

Q8 提案1〜6の中で採用を推奨するものはどれか？
  教育効果・実装コスト・子どものUXを総合的に評価してほしい。
```

---

## ステータス

```yaml
作成日: 2026-02-20
バージョン: 1.0
ステータス: Geminiレビュー依頼中

経緯:
  - Week 3A（B案）: Gemini承認・実装・マージ完了
  - Week 3B: 本ドキュメントにて設計レビューを依頼

次のアクション:
  → Gemini回答を受けて Week 3B 実装開始
```

---

**Let's make learning fun! 🎮📚✨**
