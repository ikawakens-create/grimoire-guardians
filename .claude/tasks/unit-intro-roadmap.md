# UnitIntroScreen 改修ロードマップ v3（確定版）

**保存日時**: 2026-04-03  
**内部評価スコア**: 92.3点（3ループ目でクリア）  
**目標**: 初めての子供がいきなり難しい問題を理解できるようになる

---

## 採点詳細

```
① 論理的整合性   93点
② 拡張性         91点
③ 楽しさ         93点
④ APIトークン効率 91点
⑤ コード保守性   93点
⑥ 漢字制限       93点
─────────────────────
平均              92.3点
```

---

## アーキテクチャ方針（全フェーズ共通）

```
UnitIntroScreen.js     ← 薄い「指揮者」。描画は各コンポーネントに委譲
  └── ConceptVisualizer.js  ← アニメーション・対話演出コンポーネント
        └── conceptGuides.js  ← ユニット別アニメーション定義データ
  └── ClearStoryBanner.js   ← Ph7用クリア後ミニストーリーコンポーネント
        └── worldClearScenes.js  ← クリア後ストーリーデータ
```

**データ責務の分離**：
- `storyData.js` → ストーリーテキスト・ヒント文言のみ
- `conceptGuides.js` → アニメーションステップ定義（新規ファイル）
- `worldClearScenes.js` → クリア後ミニストーリー定義（新規ファイル）

**フォールバック設計**：
- `conceptGuides.js`に定義がないunitIdの場合、ConceptVisualizerアニメーションスロットを空白にしてエラーなし動作
- マイクロ体験問題もnullの場合はスキップして「はじめる！」を即表示

---

## ConceptVisualizer ステートマシン

```
State: { currentStep, totalSteps, phase }
phase: 'idle' | 'playing' | 'waiting_tap' | 'complete'

idle ──play()──→ playing
playing ──アニメ完了──→ waiting_tap
waiting_tap ──tap()──→ playing  （次ステップへ）
waiting_tap ──tap() + 最終ステップ──→ complete
complete ──onComplete()呼び出し──→ ConceptSceneに制御を戻す
```

---

## conceptGuides.js データ構造

```js
export const CONCEPT_GUIDES = {
  'M1-01': {
    grade: 1,                      // 1 or 2（漢字制限の基準）
    type: 'addition',              // ConceptVisualizerのアニメ種別
    dialogue: [
      { speaker: 'owl',    text: 'えを みながら かんがえてみよう！' },
      { speaker: 'player', text: 'やってみる！' },
    ],
    steps: [
      { emoji: '🍎', count: 9, action: 'show' },
      { emoji: '🍎', count: 1, action: 'add', highlight: true },
      { type: 'basket', label: '10', plus: '△', showAnswer: true },
    ],
    microChallenge: {              // nullの場合はスキップ
      question: '3 + 9 は？',
      choices: ['11', '12', '13'],
      correct: 1,                  // 0始まりのindex
    },
  },
  // M1-02, M1-07 ... 計75ユニット分
};
```

---

## Ph3 キャラ対話フロー（確定）

```
① フクロウ登場アニメ（bounce）
② フクロウ台詞1行
   ↓ タップ
③ プレイヤー台詞1行（リアクション）
   ↓ タップ
④ ConceptVisualizerアニメーション
   ↓ アニメ完了で自動進行
⑤ ★マイクロ体験問題★
   「3 + 9 は？」  ①11  ②12  ③13
   → 正解: フクロウ「わかった！」+ sparkle → 「はじめる！」ボタン表示
   → 不正解: 「もう一回みてみよう」→ ④に戻る
   → 2回外したら正解ハイライトして自動進行
```

---

## Phase 一覧

### Ph1 — 基盤整備（未着手）

**変更ファイル（2本）**：
- `src/screens/UnitIntroScreen.js`
- `src/components/ConceptVisualizer.js`（新規・スケルトン）

**実装内容**：
1. 「はじめる！」ボタンを初回・2回目とも中央に統一
2. 再表示条件修正：`progress.worlds[worldId].percentage < 90` をrender()冒頭で判定
   ```js
   render() {
     const world  = getWorldById(this._worldId);
     const unitId = world?.unitId;
     const seenKey = `intro_seen_${unitId}`;
     const worldProgress = GameStore.getState(`progress.worlds.${this._worldId}`);
     const pct = worldProgress?.percentage ?? 0;
     if (pct < 90) sessionStorage.removeItem(seenKey);
     const hasBeenSeen = !!sessionStorage.getItem(seenKey);
     if (hasBeenSeen) {
       this._renderRepeat(world, intro);
     } else {
       sessionStorage.setItem(seenKey, '1');
       this._renderFirst(world, intro);  // Ph3で本実装、今はrepeatと同じ中身を仮置き
     }
   }
   ```
3. `_renderFull()` → `_renderRepeat()` にリネーム（2回目以降専用）
4. `ConceptVisualizer`クラスのスケルトン作成（`render()`・`destroy()`のみ）

**Done条件**：
- [ ] 「はじめる！」ボタンが初回・2回目どちらも中央に表示される
- [ ] 90%未満クリアのワールドで再び全画面が表示される
- [ ] ConceptVisualizerスロットが空でもレイアウト崩れなし
- [ ] Phase間検証チェックリストを通過

---

### Ph2 — ~~ストーリー連動ヒント~~（廃止）

> **廃止理由**（2026-04-03）：クイズ前に施設ヒントを表示するアプローチは
> 「子供からすると必要ない」という判断により削除。
> 代わりに、クイズクリア・クエストクリア・施設解放など
> **アクション後にストーリーで意味づけする仕組み**を
> Ph7のスコープ拡張として実現する方針に変更。

---

### Ph3 — キャラ対話シーン（未着手）

**変更ファイル（2本）**：
- `src/screens/UnitIntroScreen.js`（`_renderFirst()`にConceptScene実装）
- `src/components/ConceptVisualizer.js`（対話ステップ・マイクロ体験問題を実装）

**Done条件**：
- [ ] タップで台詞が進む
- [ ] マイクロ体験問題で正解・不正解が動作する
- [ ] 2回不正解でも自動進行して詰まらない
- [ ] conceptGuides未定義ユニットでもクラッシュしない
- [ ] 全テキストが対象学年の漢字制限以内
- [ ] Phase間検証チェックリストを通過

---

### Ph4A — ConceptVisualizer本実装（たし算・くりあがり）（未着手）

**変更ファイル（2本）**：
- `src/data/conceptGuides.js`（新規。M1-01・M1-07のガイド定義）
- `src/components/ConceptVisualizer.js`（アニメ実装）

**アニメ種別**: `addition`, `kuriagari`

**Done条件**：
- [ ] M1-01・M1-07でアニメが再生される
- [ ] 各ステップがタップで進む
- [ ] 子供が見て「なるほど！」となる内容か目視確認
- [ ] 漢字制限チェック

---

### Ph4B — ConceptVisualizer（ひき算・くりさがり）（未着手）

**変更ファイル（2本）**: `conceptGuides.js`, `ConceptVisualizer.js`  
**対象**: M1-02（ひき算）, M1-08（くりさがり）  
**アニメ種別**: `subtraction`, `kurisagari`

---

### Ph4C — ConceptVisualizer（時計・長さ）（未着手）

**変更ファイル（2本）**: `conceptGuides.js`, `ConceptVisualizer.js`  
**対象**: M1-13（時計）, M1-11（長さ）  
**アニメ種別**: `clock`, `length`

---

### Ph4D — ConceptVisualizer Grade 2（かけ算・筆算）（未着手）

**変更ファイル（2本）**: `conceptGuides.js`, `ConceptVisualizer.js`  
**対象**: M2-01（かけ算の意味）, M2-14（たし算筆算）  
**アニメ種別**: `multiplication`, `vertical_addition`

---

### Ph5 — Grade 1 全33ユニット content充填（未着手）

**変更ファイル（1本のみ）**: `src/data/conceptGuides.js`

| セッション | ユニット | 主な概念 |
|-----------|---------|---------|
| 5-1 | M1-01〜M1-08 | たし算・ひき算・10のまとまり |
| 5-2 | M1-09〜M1-16 | くりあがり・くりさがり |
| 5-3 | M1-16b〜M1-13 | 時計・大きい数 |
| 5-4 | 残り全ユニット | 長さ・かたちなど |

---

### Ph6 — Grade 2 全42ユニット content充填（未着手）

**変更ファイル（1本のみ）**: `src/data/conceptGuides.js`

| セッション | ユニット | 主な概念 |
|-----------|---------|---------|
| 6-1 | M2-01〜M2-08 | かけ算の意味・九九前半 |
| 6-2 | M2-09〜M2-13 | 九九後半・ChantScreen連携ヒント |
| 6-3 | M2-14〜M2-22 | たし算筆算・ひき算筆算 |
| 6-4 | M2-23〜M2-31 | 長さ・水のかさ・時こくと時間 |
| 6-5 | M2-32〜M2-42 | 三角形・表とグラフ・分けるなど |

---

### Ph7 — クリア後ミニストーリー（未着手）

**変更ファイル（3本）**：
- `src/data/worldClearScenes.js`（新規）
- `src/components/ClearStoryBanner.js`（新規）
- `src/screens/ResultScreen.js`（ClearStoryBanner呼び出しを追加）

**演出フロー**：
```
リザルト表示（星アニメ）
  ↓ 2秒後
フクロウ「グリモアが もどってきたぞ！」（sparkleアニメ）
  ↓ タップ
ストーリー1行（worldClearScenes.jsから）
  ↓ タップ
3択ボタン：「もう一度」「まちへもどる」「つぎへすすむ」
```

**worldClearScenesデータ構造**：
```js
export const WORLD_CLEAR_SCENES = {
  'W1-01': {
    owlLine: 'たし算の グリモアを とりもどしたぞ！',
    storyLine: 'まちの みんなが よろこんでいる…',
    nextWorldHint: 'つぎは ひき算の グリモアが まっているよ',
  },
};
```

**Done条件**：
- [ ] リザルト後にミニストーリーが表示される
- [ ] 3択ボタンが正しく機能する
- [ ] 全テキストが対象学年の漢字制限以内
- [ ] 既存ResultScreenの星アニメと干渉しない

---

## Phase間共通検証チェックリスト

各Phの実装後・次Phに進む前に必ず確認：

```
□ GG.setState('app.currentScreen', 'unit_intro') で画面が起動するか
□ GG.resetState() 後に起動して壊れないか
□ 前のPhで実装した機能が引き続き動作するか
□ 追加したテキストが全て対象学年の漢字制限以内か
□ 新規ファイルのパスをsw.jsのASSETS[]に追加したか
```

---

## 完了状況

| Phase | ステータス |
|-------|----------|
| Ph1 | ✅ 完了（2026-04-03） |
| Ph2 | ~~⬜ 未着手~~ → ❌ 廃止 |
| Ph3 | ⬜ 未着手 |
| Ph4A | ⬜ 未着手 |
| Ph4B | ⬜ 未着手 |
| Ph4C | ⬜ 未着手 |
| Ph4D | ⬜ 未着手 |
| Ph5 | ⬜ 未着手 |
| Ph6 | ⬜ 未着手 |
| Ph7 | ⬜ 未着手 |
