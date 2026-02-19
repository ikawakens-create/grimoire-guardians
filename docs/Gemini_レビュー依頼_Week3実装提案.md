# Gemini レビュー依頼 — Week 3 実装提案
## Grimoire Guardians (グリモア・ガーディアンズ)

---

## 0. このドキュメントの目的

Week 3 の実装に入る前に、以下について Gemini のレビューをお願いします。

1. **既存コードと仕様書の乖離**（Week 1-2 で混入したバグの確認）
2. **Week 3A 実装提案**（今回実装する内容）の妥当性確認
3. **Week 3B 実装提案**（次回：イベントシステム）の設計確認
4. 気になった点・改善案があれば自由にコメントください

---

## 1. プロジェクト概要（再確認）

| 項目 | 内容 |
|------|------|
| アプリ名 | Grimoire Guardians（グリモア・ガーディアンズ） |
| 対象 | 小学1〜6年生（Phase 0は1年生算数のみ） |
| 技術 | Pure Vanilla JS (ES6 Modules)、フレームワーク・ビルドツールなし |
| 動作 | 横向き専用 PWA、タッチ最適化、60fps |
| 承認済み仕様書 | ロードマップ v1.4、統合仕様書 v1.3、UI設計書 v1.1 |

---

## 2. 現在の実装状況（Week 1-2 完了後）

### 完成ファイル一覧

```
src/
├── core/
│   ├── Config.js          ✅ (全設定値の凍結オブジェクト)
│   ├── GameStore.js       ✅ (Observable状態管理)
│   ├── Logger.js          ✅ (多段階ログ)
│   └── SoundManager.js    ✅ (Phase 0モック実装)
├── components/
│   ├── BookCard.js        ✅ (ワールドカードUI)
│   └── ProgressBar.js     ✅ (進捗バー)
├── screens/
│   ├── BookshelfScreen.js ✅ (本棚画面)
│   └── QuizScreen.js      ✅ (クイズ画面)
├── data/
│   ├── worlds.js          ✅ (6ワールド定義)
│   ├── units.js           ✅ (ユニット→問題ローダーマッピング)
│   └── questions/
│       └── M1-01.js       ✅ (15問)
├── utils/
│   ├── TypeValidator.js   ✅
│   └── HapticFeedback.js  ✅
└── styles/
    ├── common.css, layout.css, components.css, effects.css ✅
```

### 現在実際に動く画面フロー

```
起動 → ローディング → BookshelfScreen → QuizScreen → BookshelfScreen（戻る）
```

**クイズ終了後は ResultScreen に遷移せず、直接ブックシェルフに戻ります。**
これは index.js の TODO コメントにも明記されています。

---

## 3. 既存コードで発見した問題点（要確認）

Week 3 に入る前に確認・修正が必要な箇所です。

### 問題 1: ユニット名・順序がロードマップと不一致 ⚠️ 重要

ロードマップ v1.4 と `worlds.js`/`units.js` でユニット名がずれています。

| ID | ロードマップ v1.4 | worlds.js 現状 |
|----|-----------------|----------------|
| M1-01 | なかまづくりと かず ✅ | なかまづくりと かず ✅ |
| M1-02 | **10までの かず** | **なんばんめ** ❌ |
| M1-03 | **なんばんめ** | **いくつと いくつ** ❌ |
| M1-04 | **いくつと いくつ** | **たしざん（1）** ❌ |
| M1-05 | **あわせて いくつ** | **ひきざん（1）** ❌ |
| M1-06 | **のこりは いくつ** | **おおきい かず** ❌ |

また `worlds.js` の `totalQuestions` は全ワールド `15` になっていますが、
ロードマップでは M1-02=18問、M1-04=25問 など異なります。

**質問**: このズレはどちらを正とすべきでしょうか？
Phase 0.1 の教育目標（日本文教出版テキスト準拠）と照らし合わせて判断をお願いします。

---

### 問題 2: `GameStore.currentSession` に `streak` / `maxStreak` がない ⚠️

統合仕様書 v1.3 の changelog に「`streak` 状態追加」とありますが、
`GameStore.js` の `currentSession` には実装されていません。

```js
// GameStore.js 現状
currentSession: {
  worldId: null,
  unitId: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  startedAt: null,
  rewardMultiplier: 1.0,
  shieldActive: false
  // streak: 0      ← 統合仕様書v1.3で追加されたが実装なし
  // maxStreak: 0   ← 同上
}
```

Week 3 の ResultScreen でこれらの値を表示したいので、GameStore への追加が必要です。

---

### 問題 3: `Config.EVENTS.OMIKUJI_RATES` が 100% に満たない ⚠️

ロードマップには `0.1%` の「ちょうだいきち（×5倍）」がありますが、
Config.js では定義されていません。

```js
// Config.js 現状
OMIKUJI_RATES: {
  DAIKICHI: 0.10,  // 10%
  KICHI: 0.60,     // 60%
  KYO: 0.30        // 30%
  // 合計100%。「ちょうだいきち」が入っていない
}
```

**質問**: ちょうだいきちを追加する場合、各確率をどう再配分しますか？
例) DAIKICHI: 0.099、KICHI: 0.60、KYO: 0.30、SUPER: 0.001 とするか？

---

### 問題 4: `GameStore.reset()` に問題あり ⚠️

`reset()` 内で `isInitialized: true` をハードコードしています。
初期化フロー（`init()` → `setState('app.isInitialized', true)`）と分離されており、
将来的にリセット後の再初期化でバグが起きる可能性があります。

```js
// GameStore.js の reset() 内
app: {
  isInitialized: true,  // ← ハードコード。初期化フローを経ずに true になる
  ...
}
```

---

### 問題 5: `worlds.js` にイベントトリガー定義がない

ロードマップでは各ワールドにイベントが定義されています：

```yaml
M1-02: イベント: 🎊 おみくじチャレンジ（10問目）
M1-03: イベント: 🛤️ 3つの道（8問目）
M1-04: イベント: 👾 モンスターバトル（15問目）
M1-05: イベント: 📦 宝箱チャレンジ（10問目）
M1-06: イベント: 🎉 Phase 0.1完了記念
```

しかし `worlds.js` の各ワールドオブジェクトにイベント情報がありません。
Week 3B の EventManager 実装時に必要になります。

---

### 問題 6: `units.js` のローダーが `null` のワールドをタップするとクラッシュ

現在 M1-02〜M1-06 のローダーは全て `null`。
ユーザーがこれらのワールドを選ぶと `QuizScreen._loadQuestions()` で
エラーが出ますが、BookshelfScreen 側にはローダー null のガードがありません。

```js
// units.js
'M1-02': {
  loader: null  // ← タップすると QuizScreen でエラー
}
```

---

## 4. Week 3A 実装提案（今回の実装スコープ）

### 目標: ゲームとして最低限成立させる

Week 3A では「リロードしてもデータが残り、クイズが完結する」状態を目標とします。

---

### 4-1. SaveManager（新規: `src/core/SaveManager.js`）

**役割**: localStorage でセーブ/ロード/マイグレーション

```js
// 想定 API
SaveManager.save()          // 手動保存
SaveManager.load()          // 起動時に GameStore へ復元
SaveManager.clear()         // デバッグ用リセット
SaveManager.getMeta()       // バージョン・保存日時を返す
```

**設計上の判断ポイント**（Geminiに確認したい）:

1. **自動保存のタイミング**: `GameStore.subscribe()` でトリガー + **500ms デバウンス**
   → クイズ中（毎回答ごと）に保存が走ると重くなる懸念。
   → 代替案: クイズ完了時とブックシェルフ表示時のみ手動で保存する。
   **どちらがよいですか？**

2. **セーブ対象**: `player`、`progress.worlds`、`inventory.materials` のみ
   `currentSession` はセーブしない（仕様書 v1.3 に準拠）

3. **バージョン**: セーブデータに `version: '0.1.0'` を持ち、将来のマイグレーションに備える
   統合仕様書 v1.3 のバージョン管理戦略に準拠

4. **IndexedDB vs localStorage**: 統合仕様書では IndexedDB が本命ですが、
   Phase 0 実装として localStorage を使い、Phase 1 で IndexedDB に移行する案を取ります。
   **この判断は問題ありませんか？**

---

### 4-2. ResultScreen（新規: `src/screens/ResultScreen.js`）

統合仕様書 v1.3 の「4-2. 画面遷移フロー」および「結果画面（v1.3詳細化）」に準拠します。

**画面遷移**: `QuizScreen` → `ResultScreen` → `BookshelfScreen` or `QuizScreen`（もう一度）

**表示モード**: 内部フラグ `mode: 'clear' | 'perfect' | 'fail'` で切り替え
（ClearScreen を ResultScreen に統合：仕様書 v1.3 方針どおり）

#### クリア時（60%以上）の演出シーケンス

```
1. 星が1つずつ飛び込んでくる（effects.css の bounce アニメーション使用）
2. スコアカウントアップ（0 → N 問正解）
3. おみくじバフ適用演出（rewardMultiplier > 1.0 の場合のみ）
4. 獲得素材カードめくり演出（1枚ずつ順番に表示、drop-fall CSS使用）
5. 「もう一いかい」「本棚へ」ボタン
```

**星評価** (Config.GAME.CLEAR_THRESHOLD = 0.6 を基準):
- 90〜100% → ⭐⭐⭐
- 80〜89%  → ⭐⭐
- 60〜79%  → ⭐

#### 未クリア時（60%未満）— がんばったで賞

統合仕様書 v1.3 の詳細仕様どおり「花丸演出」を実装します：

```
0.0s  暖かいピンクのオーバーレイ
0.1s  大きな花丸がゆっくり描かれる（SVG stroke-dashoffset 0.8秒）
0.9s  ✨ 8方向バースト
1.0s  「はなまる！」スタンプ（-15deg、scale bounce）
1.2s  🌸🌟💫 シャワー（JS生成 20個、ふわふわ落下）
1.8s  「よく がんばったね！」スライドイン
2.0s  「まえより ○もん ふえたよ！」（記録比較、初回は非表示）
2.5s  ボタン出現
```

**質問**: 花丸 SVG アニメーションを CSS の `stroke-dashoffset` で実装する場合、
アクセシビリティ（`prefers-reduced-motion`）対応も入れるべきでしょうか？

---

### 4-3. GameStore への追加メソッド

以下のメソッドを GameStore に追加します：

```js
// クイズ完了時の一括処理（ResultScreen から呼ぶ）
GameStore.finishQuizSession(worldId, { correctCount, total, percentage, drops })
// → progress.worlds[worldId].cleared = (percentage >= CLEAR_THRESHOLD)
// → progress.worlds[worldId].score = Math.max(currentBest, correctCount)
// → progress.worlds[worldId].attempts++
// → inventory.materials への drops 適用
// → progress.stats 更新

// streak 更新（各回答時に QuizScreen から呼ぶ）
GameStore.updateStreak(isCorrect)
// → isCorrect: streak++, maxStreak = Max(maxStreak, streak)
// → !isCorrect && !shieldActive: streak = 0
// → !isCorrect && shieldActive: shield消費のみ（streak維持するか？ → 要確認）
```

**質問**: 不正解でシールドが発動した場合、streak はリセットすべきですか？
（「おまもりなので streak は維持する」の方が子供に優しいかもしれません）

---

### 4-4. RewardCalculator（新規: `src/core/RewardCalculator.js`）

ドロップ計算を独立したモジュールとして切り出します。

```js
// 想定 API
RewardCalculator.calcNormalDrop()
// → Config.DROP.NORMAL_QUESTION_DROP_RATE (35%) で素材をランダム選択
// → rewardMultiplier を適用して個数を決定
// → { materialId: string, count: number }[] を返す

RewardCalculator.calcEventDrop(eventType, isRare)
// → eventType: 'path' | 'monster' | 'treasure' | 'mimic'
// → Config.DROP.EVENT_DROP_RATES を参照
// → レア素材の確率計算も含む
```

**素材レアリティの定義**（Config に追加予定）:

```js
MATERIAL_RARITY: {
  COMMON: ['wood', 'stone'],           // コモン（よく出る）
  UNCOMMON: ['brick', 'cloth', 'paint'], // アンコモン
  RARE: ['gem', 'crown', 'cape'],      // レア（確定ドロップイベントで出る）
  SUPER_RARE: ['star_fragment', 'magic_orb'] // 超レア
}
```

**質問**: レアリティ定義を Config に入れるのか、RewardCalculator 内にのみ持つのか、
どちらが適切でしょうか？（Config は frozen なので後から変更しにくいが管理しやすい）

---

### 4-5. 問題データ M1-02〜M1-06（新規）

**問題 1**（ユニット名の不一致）を解決した後、正しい内容で作成します。

現在の M1-01 のフォーマットを踏襲:

```js
{
  id: 'M1-02-Q01',
  unitId: 'M1-02',
  type: 'choice',
  question: '「まえから 3ばんめ」は どれ？\n🐶🐱🐰🐹🐻',
  choices: ['🐰', '🐱', '🐹', '🐶'],
  correctAnswer: '🐰'
}
```

**各ユニットの予定問題数**（ロードマップ v1.4 に基づく、ただし問題 1 の解決後に確定）:

| ユニット | 予定問題数 | 備考 |
|---------|-----------|------|
| M1-02 | 18問 | 筆記問題3問含む（Phase 0 スコープ） |
| M1-03 | 16問 | |
| M1-04 | 25問 | 重要単元 |
| M1-05 | 20問 | |
| M1-06 | 20問 | Phase 0.1 完了記念イベント |

**質問**: 筆記問題（手書き数字認識）は Week 3A のスコープに含めるべきでしょうか？
Phase 0 スコープには含まれていますが、実装コストが高く、Week 4 以降に回してよい気もします。

---

### 4-6. worlds.js へのイベントトリガー追加

Week 3B のために worlds.js に events フィールドを追加します（ただし Week 3A では未使用）：

```js
// worlds.js に追加予定
{
  id: 'world_2',
  unitId: 'M1-02',
  ...
  events: [
    { triggerAt: 10, type: 'omikuji' }
  ]
}
```

---

## 5. Week 3B 実装提案（次回：イベントシステム）

### 5-1. EventManager（新規: `src/events/EventManager.js`）

**設計方針**: QuizScreen からイベントを完全に切り離す（疎結合）

```js
// 想定 API
const eventManager = new EventManager(worldData, gameStore);

// QuizScreen の _nextQuestion() 前に呼ぶ
const result = await eventManager.checkAndRun(questionIndex);
// → イベントなし: null を返す（即座に解決）
// → イベントあり: イベント実行後に EventResult を返す

// EventResult の形
{
  type: 'omikuji',
  outcome: 'daikichi',   // 'daikichi' | 'kichi' | 'kyo' | 'super'
  multiplier: 3.0,
  shieldGranted: false
}
```

**疎結合の実現方法**:
- EventManager は DOM を直接操作せず、イベント結果を返すだけ
- 実際の演出は各 `EventView` クラス（`OmikujiView`, `ThreePathsView` 等）が担当
- QuizScreen は `await eventManager.checkAndRun(index)` → 結果を受け取って続行するだけ

**二重発火防止**:

```js
class EventManager {
  _firedEvents = new Set();  // 'omikuji', 'monster' 等

  checkAndRun(questionIndex) {
    const trigger = this._findTrigger(questionIndex);
    if (!trigger || this._firedEvents.has(trigger.type)) return null;

    this._firedEvents.add(trigger.type);
    return this._run(trigger);
  }
}
```

---

### 5-2. 実装順序（Week 3B）

リスクを最小化するため以下の順で実装します：

```
1. OmikujiEvent（最も単純：選択 → 結果表示 → 倍率設定）
2. ThreePathsEvent（3択UI、レアな道5% 含む）
3. MonsterBattleEvent（問題出題あり → QuizScreen との統合が必要）
4. TreasureEvent（ミミック変身演出）
5. Phase 0.1 完了記念イベント
```

**質問**: MonsterBattle と Treasure は「イベント中にも問題を出す」構造なので、
QuizScreen の外で問題を出すか、QuizScreen のサブモードとするか設計判断が必要です。
どちらのアプローチが推奨されますか？

---

## 6. スコープ外（Week 4 以降）

以下は今回のスコープに含めません：

- インベントリ画面（`InventoryScreen`）— 素材を見せる UI
- ライセンス入力画面（`LicenseInputScreen`）— 販売機能
- Service Worker — オフライン対応
- 筆記問題（`HandwritingQuestion`）— 手書き認識
- Phase 0.2/0.3 の問題データ（M1-07〜M1-16）

---

## 7. Gemini へのお願い

以下の点についてご意見をください：

### 確認事項（Yes/No or 選択式）

| # | 質問 | 選択肢 |
|---|------|-------|
| Q1 | ユニット名の不一致（問題1）はロードマップ v1.4 を正とする？ | A: ロードマップ優先（worlds.js/units.js を修正） / B: 現状維持（ロードマップが誤り） |
| Q2 | SaveManager の自動保存タイミングは？ | A: デバウンス付き自動保存 / B: 完了時・画面遷移時のみ手動保存 |
| Q3 | SaveManager は Phase 0 では localStorage のみで OK？ | A: OK（Phase 1 で IndexedDB 移行） / B: 最初から IndexedDB |
| Q4 | 不正解でシールド発動時、streak はリセット？ | A: リセットしない（子供に優しい） / B: リセットする（正確な記録） |
| Q5 | レアリティ定義は Config に入れる？ | A: Config に定義 / B: RewardCalculator 内部のみ |
| Q6 | 筆記問題は Week 3A に含める？ | A: 含める / B: Week 4 以降 |
| Q7 | MonsterBattle の問題出題方式は？ | A: QuizScreen の外で独立処理 / B: QuizScreen のサブモード |

### 自由コメント

- Week 3A/3B の分割が適切かどうか
- 設計・アーキテクチャ上の問題点
- 子供向け UX として追加すべき点
- その他気になった点

---

## 8. 添付: 主要ファイルの抜粋

### 8-1. GameStore.currentSession（現状）

```js
currentSession: {
  worldId: null,
  unitId: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  startedAt: null,
  rewardMultiplier: 1.0,
  shieldActive: false
  // ← streak, maxStreak が未実装
}
```

### 8-2. QuizScreen._finishQuiz()（現状）

```js
_finishQuiz() {
  const answers = GameStore.getState('currentSession.answers') || [];
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const total = this._questions.length;
  const percentage = total > 0 ? correctCount / total : 0;

  SoundManager.stopBGM();

  // TODO: ResultScreen への遷移（Phase 0.1 Week 3 で実装）
  if (typeof this._onExit === 'function') {
    this._onExit({ type: 'finish', unitId: this._unitId, correctCount, total, percentage });
  }
}
```

### 8-3. index.js の遷移（現状）

```js
function showQuiz(gameScreen, worldData) {
  const quiz = new QuizScreen(gameScreen, (result) => {
    if (result.type === 'finish') {
      // TODO: ResultScreen への遷移（Phase 0.1 Week 3 で実装）
    }
    showBookshelf(gameScreen);  // ← 現状は強制的にブックシェルフに戻る
  });
  quiz.render(worldData);
}
```

### 8-4. worlds.js（現状の問題点）

```js
// world_2 の例。ロードマップでは M1-02 = "10までのかず" だが...
{
  id: 'world_2',
  unitId: 'M1-02',
  title: 'なんばんめ',  // ← ロードマップではこれは M1-03
  totalQuestions: 15,   // ← ロードマップでは M1-02 は 18問
  // events フィールドなし ← Week 3B に必要
}
```

---

以上です。ご確認をよろしくお願いします。
