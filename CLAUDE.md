# CLAUDE.md - Grimoire Guardians

---

## ⚡ タスク別クイックナビ（まずここを確認）

| やりたいこと | 読むべきセクション |
|-------------|------------------|
| 問題を追加したい | PART C → Key Files「新ユニット追加」 |
| 画面を追加したい | PART B → Architecture + PART C → Key Files「新スクリーン」 |
| 学年（Grade）を追加したい | PART C → Key Files「新Grade追加」 |
| UIテキストを書く | PART A → 漢字制限セクション |
| CSS・アニメーションを追加 | PART B → Coding Conventions |
| バグを修正したい | PART B → Debugging → PART C → Key Files |
| 大きな実装計画（3ファイル以上） | PART A → 内部評価ループを実行してから PART C へ |

---

# PART A — Claude への絶対ルール（毎回必読）

---

## 基本ルール

以下のルールは **すべての作業で必ず守ること**。

| # | ルール | 詳細 |
|---|--------|------|
| 1 | **プラン作成時はコードを書かない** | 設計・計画フェーズではファイル変更・コード出力禁止。承認後に実装する |
| 2 | **並列処理は原則しない** | API使用量節約のため、Agent を同時起動しない。直列で順番に実行する |
| 3 | **コードは差分のみ表示** | 変更箇所だけ出力し、ファイル全体は書かない（Edit ツール優先） |
| 4 | **専門用語は極力使わない** | 技術用語を使う場合は必ずひと言で説明を添える |
| 5 | **他AIへの指示は一括コピー形式で出力** | 別AIに渡す指示は下記フォーマットで1ブロックにまとめる |
| 6 | **実装の順序を守る** | 必ず `Explore（調査）→ Plan（計画）→ Implement（実装）` の順。計画フェーズで評価ループ90点クリア後に実装 |
| 7 | **コンテキストを定期リセット** | 大タスク完了後・ファイルを5本以上読んだ後に `/compact` または `/clear` をユーザーに促す |
| 8 | **一度に触るファイルは最大3本** | コンテキスト肥大化防止。1タスク = 1〜3ファイルを原則とする |

### ルール5 — 他AI指示の出力フォーマット

他のAI（ChatGPT・Gemini等）へ渡す指示を出すときは、必ず以下の形式で出力する：

~~~
```
【ここにコピペ用の指示を全文記載】
```
~~~

---

## 絶対禁止リスト

以下は **いかなる理由があっても実施しない**。

| 禁止事項 | 理由 |
|---------|------|
| `npm install` / `package.json` の作成 | ビルドレスが本プロジェクトの根幹 |
| CDN・外部URLからのライブラリ `import` | オフラインPWAの要件を破壊する |
| React / Vue / Svelte 等フレームワークの導入 | Vanilla JS アーキテクチャを維持する |
| Webpack / Vite / Rollup 等ビルドツールの導入 | 同上 |
| `sw.js` の `ASSETS[]` 更新を忘れたままのコミット | 新ファイルがオフラインキャッシュに入らなくなる |
| `GameStore` の初期ステート構造を壊す変更 | 全画面のデータ参照が崩壊する |
| `top` / `left` / `width` / `height` のアニメーション | 60fps 維持のため `transform` のみ使用 |
| 既存ファイルを拡張できるのに新規ファイルを作る | ファイル数の無駄な増加を防ぐ |

---

## 内部評価ループ

**発動条件**: 3ファイル以上の変更を伴う実装計画を立てるとき、**必ず**以下のペルソナ対話を内部で実行する。

### ペルソナ定義

**[プラン作成者] 熱狂的なキッズゲームディレクター**
→ 子供が夢中になれるゲーム体験・直感的UI・学習へのポジティブな動機付けを最優先に計画を立てる。

**[プランレビュアー] IQ200の冷徹な天才アーキテクト**
→ 作成者の計画を以下6項目で100点満点採点する。

| 採点項目 | 観点 |
|---------|------|
| ① 作成プランの論理的整合性 | 矛盾・抜け漏れがないか |
| ② 拡張性 | 将来の機能追加に耐えられるか |
| ③ 楽しさ | 子供視点での体験品質 |
| ④ APIトークン消費の効率 | 無駄な読み込み・処理がないか |
| ⑤ コード保守性 | 長期的に管理しやすいか |
| ⑥ 漢字制限ルールの完全遵守 | 対象学年の漢字制限を守っているか |

### ループ進行ルール

1. 作成者がプランを立案
2. レビュアーが6項目を採点し平均を出す
3. **90点未満** → 内部で改善し再採点（ループ継続）
4. **90点以上** → 採点結果を `採点：XX点 / 改善点：〇〇` の形式でユーザーに提示し、承認を得てから実装

---

## コアバリューとターゲット

- **対象ユーザー**：5歳〜小学6年生
- **設計哲学**：「やらされる学習」ではなく「自発的に遊びたくなる」体験。魔法・キャラクター・収集要素を通じて学習を内発的動機に変える。

### UIトーン指針

| 場面 | 指針 | NG例 | OK例 |
|------|------|------|------|
| **正解時** | 0.3秒以内に即時反応。明るい色変化＋`bounce`/`sparkle`アニメーション | 「正解です」 | 「せいかい！」「すごい！」 |
| **不正解時** | キャラクターが優しく励ます。赤フラッシュ禁止。0.8秒後に正解を自動表示 | 「まちがい」「ざんねん」 | 「おしい！」「もう一回！」 |
| **連続正解時** | 3連続で`glow`コンボ演出。5連続でモンスターバトル候補に昇格 | 無反応 | 「3かいれんぞく！」 |
| **タップターゲット** | 最小 **48px × 48px**（子供の指サイズ対応） | 小さいボタン | 十分な余白と大きさ |

---

## 【漢字制限】（厳格ルール・全ゲームテキストに適用）

### 適用範囲

以下の**すべてのゲーム内テキスト**に適用する：
- 問題文・選択肢
- UIボタン・ラベル
- NPCのセリフ・ナレーション
- トースト通知・エラーメッセージ
- 画面タイトル・見出し

**適用外**（漢字使用可）：ソースコードのコメント・変数名・ドキュメント（CLAUDE.md等）

### 学年別漢字制限テーブル

| 対象学年 | 使用可能な漢字の上限 | 具体例 |
|---------|-------------------|--------|
| 5歳〜1年生 | **全てひらがな** | ボタン・問題文・セリフすべてひらがな |
| 2年生設定 | 1年生配当漢字まで | 山・川・大・小・上・下・子・日・月など |
| 3年生設定 | 2年生配当漢字まで | 同・話・来・曜・週・帰・考など |
| 4年生設定 | 3年生配当漢字まで | 同様に1学年引く |
| 5・6年生設定 | 前学年配当漢字まで | 同様に1学年引く |

### OK / NG 対比例（2年生設定の場合）

| NG（2年生配当漢字を含む） | OK（1年生配当漢字のみ） |
|--------------------------|----------------------|
| 「計算して答えを書きましょう」 | 「けいさんして こたえを かきましょう」 |
| 「正解！次の問題へ」 | 「せいかい！つぎのもんだいへ」 |
| 「合計を求めなさい」 | 「ぜんぶで いくつ？」 |

### 違反発見時のルール

既存コードで漢字制限違反を発見しても、**実装中の別タスクと混在させて修正しない**。
違反箇所を別タスクとして記録し、現在のタスク完了後に独立して修正する。

---

---

# PART B — プロジェクトリファレンス（必要時に参照）

---

## Project Overview

**Grimoire Guardians**（グリモア・ガーディアンズ）は、小学生（1〜6年生）を対象にした、ゲーム感覚で学べる算数PWAアプリです。
クイズ型のワールドを進めながら素材を集め、街での生活（家づくりや施設の拡張など）を楽しみながら学習を進めます。アプリは横画面（Landscape）専用・タッチ操作最適化済みです。

- **Version**: `1.0.0` / `Phase 2`（深海グリモア編：小2算数まで実装完了）
- **Service Worker**: v2.3.5（キャッシュ名 `grimoire-2.3.5`、キャッシュファースト・オフラインサポート）
- **Architecture**: 完全 Vanilla JS（ES6 Modules）。React等のフレームワーク・ビルドツール（Webpack/Vite等）は一切不使用
- **Target**: 60fps、モバイルファースト、PWA機能完備
- **Language**: 日本語（ゲーム内テキスト・ドキュメント・インラインコメント）

---

## Repository Structure

```
grimoire-guardians/
├── index.html              # PWAエントリポイント
├── manifest.json           # PWAマニフェスト（landscape、standalone）
├── sw.js                   # Service Worker v2.3.5
├── CLAUDE.md               # 開発用AI指示書（本ファイル）
├── README.md               # プロジェクト概要
├── src/
│   ├── index.js            # アプリ初期化・グローバルルーター（window.GG デバッグ）
│   ├── core/
│   │   ├── Config.js       # 深くフリーズされた設定定数
│   │   ├── Logger.js       # ログシステム（levels/timing）
│   │   ├── GameStore.js    # 状態管理 Observable パターン（Single Source of Truth）
│   │   ├── SoundManager.js # Web Audio API Oscillator モック（音声アセット未実装のため合成音）
│   │   ├── SaveManager.js  # IndexedDB + localStorage 永続化・ストリーク計算
│   │   ├── EventManager.js # クイズ中イベント制御（おみくじ/モンスター/宝箱/3つの道）
│   │   ├── HouseManager.js # マイハウス：セクション解放・マイルストーン・クラフト（v2.0）
│   │   ├── TownManager.js  # 街施設：解放/アップグレード・ショップ・農場（v1.0）
│   │   └── SkinManager.js  # キャラスキン：解放・装備・クラフト・かけら（v1.0）
│   ├── components/
│   │   ├── BookCard.js        # ワールドカードUIコンポーネント
│   │   ├── ProgressBar.js     # クイズ進捗バー
│   │   ├── ClockFace.js       # SVGアナログ時計描画（type:'clock' 問題用）
│   │   └── CharacterAvatar.js # キャラクターアバター（現在スキン表示）
│   ├── screens/               # 23画面
│   │   ├── WelcomeScreen.js          # タイトル・名前入力（初回ログイン）
│   │   ├── BookshelfScreen.js        # ワールド選択グリッド
│   │   ├── UnitIntroScreen.js        # 単元イントロ（フクロウ先生・初回フル/2回目ミニ）
│   │   ├── MultiTableScreen.js       # 九九全体表（Grade 2 九九専用）
│   │   ├── MemorizeScreen.js         # 九九フラッシュカード確認（タップで答え表示）
│   │   ├── SequentialPracticeScreen.js # 九九じゅんばん練習（×1→×9 固定順）
│   │   ├── ChantScreen.js            # 九九フラッシュモード（5秒タイマー・全9問）
│   │   ├── QuizScreen.js             # クイズUI・時計SVG描画
│   │   ├── ResultScreen.js           # スコア・星・素材ドロップ表示
│   │   ├── FinalBattleScreen.js      # 最終決戦（ボスバトル・30問・HPゲージ）
│   │   ├── TownScreen.js             # 街ハブ（SVGマップ＋ホットスポット）
│   │   ├── HouseScreen.js            # マイハウス概要（レイヤー合成・フルセットボーナス）
│   │   ├── HouseBuildScreen.js       # マイハウスエディター（家具・スタイル配置）
│   │   ├── ShipBuildScreen.js        # 船カスタマイズ（PNGレイヤー合成・v2.0）
│   │   ├── PhotoScreen.js            # 写真館（フレーム・スタンプ・ポーズ・canvas保存）
│   │   ├── CraftsmanScreen.js        # 合成屋（素材クラフトハブ）
│   │   ├── GrimoireLibraryScreen.js  # 魔導書庫（単元図鑑・アンロック情報）
│   │   ├── ShopScreen.js             # 商店（素材トレード・日替わり無料アイテム）
│   │   ├── GuildScreen.js            # ギルド（クエスト・デイリーミッション）
│   │   ├── FarmScreen.js             # 魔法農場（区画植付け・クイズで収穫）
│   │   ├── InventoryScreen.js        # 素材インベントリ
│   │   ├── MemoryIsleScreen.js       # きおくのいせき（40体モンスターコレクション）
│   │   └── ParentDashboardScreen.js  # 保護者ダッシュボード（PIN保護付き学習記録）
│   ├── events/
│   │   ├── OmikujiEvent.js       # 報酬倍率・シールドイベント
│   │   ├── MonsterBattleEvent.js # スラッシュ・爆発アニメーション
│   │   ├── TreasureEvent.js      # 宝箱・ミミック（スキンかけら15%）
│   │   └── ThreePathsEvent.js    # 分岐路選択
│   ├── utils/
│   │   ├── TypeValidator.js  # ランタイム型検証（clockFace含む）
│   │   └── HapticFeedback.js # Vibration APIラッパー
│   ├── data/
│   │   ├── worlds.js          # ワールド定義（Grade 1: 33 + Grade 2: 42 = 75ワールド）
│   │   ├── units.js           # ユニットレジストリ（lazyインポートローダー）
│   │   ├── houseItems.js      # 家具・装飾カタログ（セクション・レアリティ・コスト）
│   │   ├── skinItems.js       # 24キャラスキン＋デフォルト
│   │   ├── styleItems.js      # 15マイハウススタイル（スプライトシートパス）
│   │   ├── shipItems.js       # 船パーツカタログ（Grade 2用・テーマセット定義）
│   │   ├── memory-monsters.js # 40モンスター（4層・層解放条件）
│   │   ├── storyData.js       # ストーリーテキスト・画像パス・Geminiプロンプト一元管理
│   │   ├── questData.js       # ギルドクエスト定義データ
│   │   ├── dimensionConfig.js # 次元（学年・教科）テーマ定義（Grade 3以降拡張用）
│   │   └── questions/         # 94ファイル・1700問以上
│   │       ├── M1-01.js 〜 M1-16b.js  # Grade 1（33ユニット）
│   │       └── M2-01.js 〜 M2-15d.js  # Grade 2（42ユニット＋派生）
│   └── styles/
│       ├── common.css      # CSS変数・ベーススタイル・画面向き警告
│       ├── layout.css      # グリッド・フレックス・画面レイアウト・モーダル
│       ├── components.css  # ボタン・カード・プログレスバー・バッジ
│       └── effects.css     # 20以上のキーフレームアニメーション・GPU加速エフェクト
├── docs/                   # 設計仕様書・AI指示書（日本語）
└── assets/
    ├── houses/             # 15種マイハウス用スプライトシート
    ├── npcs/               # NPC画像（g2/ にGrade 2用NPC）
    ├── icons/              # PWAアイコン
    ├── fonts/              # フォントアセット
    └── sounds/             # 未実装（SoundManagerは現在Oscillatorモック）
```

---

## Architecture

### 1. State Management — GameStore（Observable Pattern）

`src/core/GameStore.js` がアプリケーションの Single Source of Truth（唯一の信頼できる状態）として機能します。

```js
GameStore.getState('player.name');
GameStore.setState('app.currentScreen', 'quiz');
GameStore.mergeState('progress.stats', { totalCorrect: 5 });
// 注意: 購読コールバックの引数順は (path, newValue, oldValue)
GameStore.subscribe((path, newValue, oldValue) => { /* 変化に反応 */ });
```

主要な状態パス：

```
app               — isInitialized, isLoading, currentScreen, error
player            — name, streak, currentSkin, unlockedSkins[], skinFragments{}
progress          — grade, worlds{}, stats{}
inventory         — materials{wood,stone,brick,gem,star_fragment,cloth,paint,crown,cape,magic_orb}
currentSession    — worldId, unitId, questions[], currentQuestionIndex, answers[]
house             — sections{}, unlockedStyles[], layerStyles{}, photo{}, garden{}, floor1{} ...
ship              — parts{katachi,suishin,senshu,senbi,hata,oura}, unlockedParts[], completedThemeSets[]
town              — buildings{craftsman,library,shop,guild,farm}{level}, shop{}, farm{}
memory            — clearCounts{}, collected[]
```

> **[解消済み]**: 初期ステートは `src/data/initialState.js` に分離済み（2026-03-31）。

### 2. Routing — index.js（Global Router）

`src/index.js` がグローバルルーターです。`app.currentScreen` の変化を購読し、対象の Screen クラスを表示します。

**スクリーンライフサイクル（2パターン）**:

| パターン | 対象画面 | 説明 |
|---------|---------|------|
| **Create/Destroy** | Welcome, Bookshelf, Quiz, Result, UnitIntro, MultiTable, Memorize, SequentialPractice, Chant, FinalBattle | 毎回インスタンス生成、終了時に `destroy()` |
| **Show/Hide** | House, HouseBuild, ShipBuild, Photo, Craftsman, Town, Library, Shop, Guild, Farm, Inventory, MemoryIsle, ParentDashboard | 一度生成して保持、`show(container)` / `hide()` で切り替え |

**有効なスクリーン名（`app.currentScreen` に設定できる値）**:

```
'welcome' / 'bookshelf' / 'unit_intro' / 'multi_table' / 'memorize'
'sequential_practice' / 'chant' / 'quiz' / 'result' / 'final_battle'
'town' / 'house' / 'house_build' / 'ship_build' / 'photo'
'craftsman' / 'library' / 'shop' / 'guild' / 'farm'
'inventory' / 'memory_isle' / 'parent_dashboard'
```

> **[解消済み]**: 個別スクリーン変数を `_persistentScreens Map` に一本化済み（2026-03-31）。

### 3. Sound — SoundManager.js

音声アセット（`assets/sounds/`）が未実装のため、**Web Audio API の Oscillator（波形合成）によるビープ音モック**として実装中。効果音・BGMともにブラウザ上で直接合成しています。Web Audio APIバッファ再生への本実装は Phase 3 以降の予定。

---

## Core Game Systems（実装済み機能）

| # | システム | 概要 |
|---|---------|------|
| 1 | **クイズ＆学習** | Grade 1（33W）+ Grade 2（42W）= 75ワールド・94ファイル・1700問以上。時計型SVGクイズ対応 |
| 2 | **九九フラッシュ** | Grade 2 九九専用。全体表→フラッシュカード→じゅんばん練習→チャンツ→クイズの5段階フロー |
| 3 | **イベント＆ドロップ** | おみくじ（倍率）・モンスターバトル・宝箱（ミミック）・3つの道。素材10種ドロップ |
| 4 | **マイハウス** | 6層レイヤー構造、15スタイル、フルセットボーナス、写真館（フレーム8・スタンプ15・ポーズ4） |
| 5 | **街システム** | 7施設（合成屋・魔導書庫・いえ・ショップ・農場・ギルド・マイハウス）。SVGマップホットスポット |
| 6 | **船システム** | Grade 2専用。小型→中型→大型艦ロードマップ。6スロット（katachi/suishin/senshu/senbi/hata/oura）。テーマセット発動 |
| 7 | **スキン** | 24種＋デフォルト。クラフト・かけら収集（3個）・ストリーク・マイルストーン・宝箱ドロップで解放 |
| 8 | **Memory Isle** | 40モンスター・4層コレクション（`ENABLE_MEMORY_ISLE = false` でデフォルト非表示） |
| 9 | **ギルド** | デイリーミッション・ストーリークエスト（`questData.js` で定義） |
| 10 | **保護者ダッシュボード** | PIN保護付き学習記録閲覧（PINは GameStore リセットの影響を受けない localStorage 管理） |

---

## Coding Conventions

### 命名規則

| 要素 | 規則 | 例 |
|------|------|----|
| クラス・モジュール | PascalCase | `GameStore`, `SoundManager` |
| メソッド・関数 | camelCase | `getState`, `hideLoadingScreen` |
| プライベートメソッド | `_` プレフィックス | `_notifySubscribers` |
| 定数 | UPPER_SNAKE_CASE | `CLEAR_THRESHOLD` |
| CSSクラス | kebab-case | `.book-card`, `.progress-bar` |
| 状態パス | ドット記法 | `'player.name'`, `'progress.worlds'` |

### モジュールパターン

- 1ファイル = 1クラス
- `export default` でメインクラスを公開、関連定数は named export（例：`SoundType`）
- 循環依存禁止

### パフォーマンスルール

- アニメーションは `transform` と `will-change` のみ（`top`/`left`/`width`/`height` 禁止）
- JSアニメーションは `requestAnimationFrame` を使用
- 必要に応じて `transform: translateZ(0)` でGPU加速を有効化
- 画像は遅延ロード、次の問題データは先読み
- タッチアクションは `pan-x` と `pinch-zoom` に制限

---

## Debugging

`Config.IS_DEBUG` が `true` の場合、`window.GG` 経由でシステム全体を操作できます。

```js
GG.getState('player.streak')           // ステートの確認
GG.setState('inventory.materials.wood', 99) // 素材の直接付与
GG.unlockAll()                         // 全ワールドの強制解放
GG.resetState()                        // 初期状態への完全リセット
GG.exportState()                       // セーブデータのJSON出力
GG.save()                              // IndexedDBへの強制セーブ
GG.Config                              // 設定定数の参照
GG.Logger                              // ロガーの参照
GG._screen                             // 現在アクティブな画面インスタンス
```

> **実装後の確認手順**：必ず `window.GG` デバッグヘルパーで動作確認してからコミットすること。

---

## 技術的負債・リファクタリング計画

| 優先度 | 課題 | 対応方針 |
|-------|------|---------|
| ~~高~~ | ~~**Router の汎用化**~~ | ✅ 解消済み — `_persistentScreens Map` に一本化（2026-03-31） |
| ~~高~~ | ~~**GameStore 分割**~~ | ✅ 解消済み — `initialState.js` に分離（2026-03-31） |
| 中 | **サウンド本実装** | `SoundManager.js` の Oscillator モックを Audio バッファ再生（mp3/wav）に置き換え |

---

---

# PART C — 実装ガイド（タスク時に参照）

---

## テストと動作確認チェックリスト

実装後・コミット前に以下を必ず確認すること。

```
【漢字・テキスト】
□ 対象学年の漢字制限ルールを守っているか（PART A 漢字制限テーブル参照）
□ 間違えたときにネガティブなメッセージが表示されていないか

【操作・レイアウト】
□ タップ/タッチ操作のみで全機能が使えるか（マウス依存になっていないか）
□ タップターゲットが最小 48px × 48px 以上あるか
□ 横向き（landscape）固定で表示が崩れていないか

【状態・データ】
□ GameStore の状態変化後、UIが正しく更新されるか
□ SaveManager で保存・復元が正常に動作するか
□ 新規ファイルのパスを sw.js の ASSETS[] に追加したか

【動作確認】
□ window.GG デバッグヘルパーで実際に動作確認したか
□ GG.resetState() でリセット後も正常に起動するか
```

---

## Key Files for Common Tasks

### 新しいユニット（問題）を追加する

1. `src/data/questions/M1-XX.js`（または `M2-XX.js`）を作成（`stepConfig` 形式）
2. `src/data/units.js` に lazy ローダーを登録
3. `src/data/worlds.js` にワールドエントリを追加
4. `sw.js` の `ASSETS[]` に新ファイルパスを追記

> 時計問題は `type:'clock'` + `clockFace: { hour, minute }` を指定。`ClockFace.js` が自動でSVG描画。

### 新しい画面を追加する

1. `src/screens/XxxScreen.js` を作成
2. `src/index.js` のルーターに case を追加
3. ライフサイクルパターンを選択：
   - **Create/Destroy**（毎回生成）: `switch` 内でインスタンス化・`destroy()` 呼び出し
   - **Show/Hide**（使い回し）: モジュール変数に保持・`show(container)` / `hide()` を呼び出し
4. `GameStore.setState('app.currentScreen', 'screen_name')` で遷移

### 新しい学年（Grade N）を追加する

1. `src/data/dimensionConfig.js` に次元定義を追加
2. `src/data/worlds.js` にワールド群を追加
3. `src/data/units.js` に lazy ローダーを登録
4. `src/data/questions/` に問題ファイルを作成
5. `sw.js` の `ASSETS[]` に全ファイルパスを追記

### 新しいメタゲームシステムを追加する（Grade固有の収集・カスタマイズ機能）

*パターン例: Grade 1 → マイハウス、Grade 2 → 船ビルド*

1. `src/core/Config.js` に専用名前空間を追加（例: `Config.GRADE3`）
2. `src/core/GameStore.js` の初期ステートに専用ステートを追加
3. `src/screens/` に専用画面を作成（Show/Hide パターン推奨）
4. `src/data/` に専用データファイルを作成（例: `grade3Items.js`）
5. `src/screens/TownScreen.js` の SVG マップにホットスポットを追加
6. `src/data/dimensionConfig.js` に次元定義を追記

### 新しいイベントを追加する

1. `src/events/XxxEvent.js` を作成
2. `src/core/EventManager.js` の `_selectEvent()` に登録
3. 必要に応じて `Config.EVENTS` にレート定数を追加

### 新しい素材を追加する（3箇所同時更新）

1. `src/core/GameStore.js` の `inventory.materials` 初期ステートに追加
2. `src/core/Config.js` の `Config.DROP` にドロップ設定を追加
3. 全ドロップロジック（`EventManager.js`・各イベントファイル）の素材リストに追加

### その他のよく使うタスク

| タスク | 変更ファイル |
|-------|------------|
| 設定定数を追加 | `src/core/Config.js`（新しいネスト対象はfreezeすること） |
| ステートを追加 | `src/core/GameStore.js`（初期ステートを更新） |
| CSSコンポーネントを追加 | `src/styles/components.css` |
| アニメーションを追加 | `src/styles/effects.css` |
| サウンド種別を追加 | `src/core/SoundManager.js`（`SoundType` を拡張） |
| 型バリデーションを追加 | `src/utils/TypeValidator.js` |
| 家具・装飾を追加 | `src/data/houseItems.js`（section・rarity・cost） |
| スキンを追加 | `src/data/skinItems.js`（id・name・emoji・rarity・obtain） |
| 船パーツを追加 | `src/data/shipItems.js` + `Config.GRADE2.THEME_SETS`（テーマセットに含める場合） |
| ギルドクエストを追加 | `src/data/questData.js` |
| ストーリーテキストを追加 | `src/data/storyData.js` |
| SWキャッシュを更新 | `sw.js`（`SW_VERSION` をバンプ + `ASSETS[]` にパスを追記） |
| 設計仕様を確認 | `docs/` ディレクトリ（全て日本語） |

---

## Project Status

**現在の実装状態**: Grade 1 + Grade 2 完全実装済み

| Phase | Status | 内容 |
|-------|--------|------|
| 0.1 | ✅ 完了 | コア基盤・8ユニット・4基本画面 |
| 0.2 | ✅ 完了 | M1-07〜M1-13（17ユニット）・ClockFace SVG |
| 0.3 | ✅ 完了 | M1-14〜M1-16b（8ユニット）・33ワールド完成 |
| 1-D | ✅ 完了 | マイハウス（6セクション・15スタイル・写真館・マイルストーン） |
| 1-E | ✅ 完了 | 街システム（7施設・SVGマップ・ショップ・農場） |
| 1-F | ✅ 完了 | スキンシステム（24種・かけらドロップ・ストリーク解放） |
| 1-H | ✅ 完了 | Memory Isle（40モンスター・4層）— デフォルト非表示 |
| 2 | ✅ 完了 | Grade 2（42ワールド・船ビルド・最終決戦・保護者ダッシュボード） |
| Audio | ⬜ 未着手 | SoundManager 現在 Oscillatorモック、Web Audio本実装は Phase 3以降 |
| 3 | ⬜ 未着手 | Grade 3（`dimensionConfig.js` に次元定義あり） |
