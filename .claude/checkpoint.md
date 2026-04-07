# セッション引き継ぎ

**保存日時**: 2026-04-07

---

## 直近でやったこと

- `buildFallbackScene` の漢字混入バグ修正（`d14a472`）
  - `worldClearScenes.js` の `grimoireLine` で `worldDef.title` を使っていた → 汎用文言に固定
  - コミット済み・プッシュ済み

---

## 今週のメインタスク：キャラクタースキン全面改修

**背景**: スキンシステムが「見た目を変えるだけの機能」になっており有料品質に遠い。
- テイラータブが合成屋Lv2でないと開かない（初期Lv1なので買えない）
- スキンを変えてもQuizScreenなど主要画面に一切出てこない
- キャラクターに個性がなく「仲間」として感じられない
- 着替えのUI（CraftsmanScreen のタブ内）が深すぎて子供が辿り着けない

**目標**: 評価基準7項目（論理性/拡張性/楽しさ/API効率/保守性/漢字制限/**有料品質**）で93.7点のプランを4週間で実装する

---

## 実装計画 v5（確定版・採点93.7点）

### 設計コンセプト
「スキンを着せ替えアイテムではなく、**旅の仲間キャラクター**として再定義する」

キャラクターの状態：
- `idle`    → float アニメーション（ふわふわ浮いている）
- `talking` → 体が微振動 + 吹き出しタイプアウト + ゴニョゴニョSE
- `victory` → 画面中央に200pxでスライドイン + bounce + sparkle + セリフ
- `sad`     → shake + reactions.wrong セリフ

ゴニョゴニョSE（SoundManager Oscillator）:
- かわいい系スキン: 380Hz（高め・ポップ）
- かっこいい系スキン: 220Hz（低め・渋い）
- おもしろ系スキン: 550Hz（ひょうきん）

---

### Week A「反応＋クイズ仲間化＋エスカレーション」（3ファイル）

| # | ファイル | 変更内容 |
|---|---------|---------|
| A-1 | `src/core/Config.js` | `SKIN.TAILOR_UNLOCK_LEVEL: 2` → `1` に変更（1行のみ） |
| A-2 | `src/data/skinItems.js` | 全24スキンに `reactions: { correct, wrong, combo3, greet }` と `voiceFreq` を追加 |
| A-3 | `src/screens/QuizScreen.js` | キャラmd（80px）左下に常時表示（idle float）。正解→victory（中央200px・1.8秒）。不正解→sad。ストリークエスカレーション（3連続:lg拡大+glow / 5連続:victory+combo3セリフ / 10連続:victory+sparkle全画面+音量1.5倍） |

**reactions定義イメージ:**
```js
// ほのおのまどうし
reactions: {
  correct: 'もえるぜ！せいかい！',
  wrong:   'つぎは もやしてやる！',
  combo3:  'ファイヤー！3れんぞく！',
  greet:   '{name}！{n}にちめだぞ！きょうも もやすか！🔥',
},
voiceFreq: 280,  // かっこいい系・低め
```

---

### Week B「試着室＋お披露目演出」（3ファイル）

| # | ファイル | 変更内容 |
|---|---------|---------|
| B-1 | `src/screens/WardrobeScreen.js`（**新規**） | 全画面試着室。キャラ200px中央表示。サムネタップ→即プレビュー（slide-in）＋speaking吹き出し。未解放スキンはシルエット（`filter:brightness(0)`）＋ロック条件表示。初回装備時お披露目演出（フラッシュ→中央登場→スキン名ドロップ→greetセリフ）。「きがえる！」「あとN素材」「あとN日」ボタン |
| B-2 | `src/index.js` | ルーターに `'wardrobe'` case を追加（Create/Destroyパターン） |
| B-3 | `src/screens/BookshelfScreen.js` | 40pxアバター → 「👗 きがえる」大ボタンに置き換え。greetリアクション吹き出しをキャラ横に表示。ストリーク進捗「🐰 あと5日！」を隣に表示 |

**WardrobeScreen UIイメージ:**
```
┌─────────────────────────────────┐
│ ← もどる    👗 きがえや         │
│                                 │
│       ┌──────────┐  ほのおの   │
│       │  キャラ  │  まどうし   │
│       │  200px   │  🔥🔥 ★★ │
│       └──────────┘             │
│  💬「もえるぜ！せいかい！」     │
│                                 │
│ [すべて][かっこいい][かわいい]  │
│ [おもしろ][ひみつ]              │
│                                 │
│  🛡️  🔥  ❄️  🥷  ← カラー   │
│  ██  ██  ██  ██  ← シルエット │
│                                 │
│      ✅ きがえる！              │
└─────────────────────────────────┘
```

---

### Week C「キャラクターを生かす」（3ファイル）

| # | ファイル | 変更内容 |
|---|---------|---------|
| C-1 | `src/components/CharacterAvatar.js` | `startTalking(text, onDone)` / `victoryPose(line)` / `sadReact(line)` / `firstEquip()` / `greet(name, streak)` メソッドを追加。idle float を標準化（全インスタンスに自動適用） |
| C-2 | `src/core/SoundManager.js` | `SoundType.TALK` を追加。`playTalk(voiceFreq)` メソッドを実装（60ms正弦波×4バースト）。voiceFreqがnullの場合はデフォルト周波数 |
| C-3 | `src/screens/UnitIntroScreen.js` | フクロウのセリフ切り替わりタイミングでキャラが `startTalking()` ＋ゴニョゴニョSE。キャラがストーリーに「参加」する |

---

### Week D「欲しいを設計して完成」（2ファイル）

| # | ファイル | 変更内容 |
|---|---------|---------|
| D-1 | `src/screens/CraftsmanScreen.js` | テイラータブ：未解放スキンを `filter:brightness(0)` シルエット表示。「あとcloth×3」「あと5日」のように解放条件を具体的に表示。クラフト/解放成功時に祝福モーダル（スキン画像大表示＋✨キラキラ） |
| D-2 | `sw.js` | `WardrobeScreen.js` を `ASSETS[]` に追加。`SW_VERSION` をバンプ |

---

### 完了後の追加タスク（Week E 以降）

#### 合成屋（CraftsmanScreen）の見た目改修
- 現状：機能は揃っているが、UIが「作業画面」のように見える
- 改修方針：
  - NPCキャラ（テイラー担当NPC）の存在感を強化
  - テイラータブを「きがえや」として視覚的に分離（アイコン・色・雰囲気を変える）
  - 素材クラフト・施設強化・スキンクラフトの3機能の導線を整理
  - 全体的に「お店に来た感」が出るビジュアルに
- 対象ファイル: `src/screens/CraftsmanScreen.js`、`src/styles/components.css`

---

## 実装優先順位まとめ

```
Week A → Week B → Week C → Week D → Week E（合成屋UI改修）
```

各Weekは必ず `Explore（調査）→ Plan（計画）→ Implement（実装）` の順で進めること。
3ファイル以内のルールを厳守。

---

## 未解決のバグ・問題

なし（buildFallbackScene修正済み）

---

## 重要なメモ

- **現在のブランチ**: `claude/morning-standup-NoAvx`
- **現在のSWバージョン**: v2.3.8（sw.js）
- **worldClearScenes.js**: Grade1（33）+ Grade2（46）= 79ワールド完全網羅
- **ENABLE_SKINS**: `true`（Config.js L167）
- **TAILOR_UNLOCK_LEVEL**: 現在 `2`（Week A-1で `1` に変更予定）
- **CharacterAvatar**: サイズ sm/md/lg/xl、emotion normal/happy/sad 対応済み
- **voiceFreq 音域の目安**: かわいい系380Hz / かっこいい系220-280Hz / おもしろ系480-550Hz / ひみつ系300Hz
- **既存アニメーション（effects.css）**: bounce / shake / sparkle / float / slide-in-right / slide-in-up / voice-bubble-in/out がそのまま使える
