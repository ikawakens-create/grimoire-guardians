# CLAUDE.md - Grimoire Guardians

## Claude への基本指示

以下のルールは **すべての作業で必ず守ること**。

| # | ルール | 詳細 |
|---|--------|------|
| 1 | **プラン作成時はコードを書かない** | 設計・計画フェーズではファイル変更・コード出力禁止。承認後に実装する |
| 2 | **並列処理は原則しない** | API使用量節約のため、Agent を同時起動しない。直列で順番に実行する |
| 3 | **コードは差分のみ表示** | 変更箇所だけ出力し、ファイル全体は書かない（Edit ツール優先） |
| 4 | **専門用語は極力使わない** | 技術用語を使う場合は必ずひと言で説明を添える |
| 5 | **他AIへの指示は一括コピー形式で出力** | 別AIに渡す指示は下記フォーマットで1ブロックにまとめる |

### ルール5 — 他AI指示の出力フォーマット
他のAI（ChatGPT・Gemini等）へ渡す指示を出すときは、必ず以下の形式で出力する：
~~~
```
【ここにコピペ用の指示を全文記載】
```
~~~

---

## Project Overview

**Grimoire Guardians** (グリモア・ガーディアンズ) は、小学生（1〜6年生）を対象にした、ゲーム感覚で学べる算数PWAアプリです。
クイズ型のワールドを進めながら素材を集め、街での生活（家づくりや施設の拡張など）を楽しみながら学習を進めます。アプリは横画面（Landscape）専用・タッチ操作最適化済みです。

- **Config Version**: `1.0.0` / `Phase 2` (深海グリモア編：小2算数まで実装完了)
- **Service Worker**: v2.1.1 (キャッシュファースト、オフラインサポート)
- **Architecture**: 完全 Vanilla JS (ES6 Modules)。React等のフレームワークやビルドツール（Webpack/Vite等）は一切不使用。
- **Target**: 60fps, モバイルファースト, PWA機能完備
- **Language**: 日本語 (ゲーム内テキスト、ドキュメント、インラインコメント)

## Repository Structure

```
grimoire-guardians/
├── index.html              # PWAエントリポイント
├── manifest.json           # PWAマニフェスト
├── sw.js                   # Service Worker
├── CLAUDE.md               # 開発用AI指示書 (本ファイル)
├── README.md               # プロジェクト概要
├── src/
│   ├── index.js            # アプリケーション初期化、グローバルルーター
│   ├── core/               # コアシステム (Config, GameStore, サウンド, セーブ等)
│   ├── components/         # 汎用UIコンポーネント
│   ├── screens/            # 各画面のクラス (20以上の画面)
│   ├── events/             # クイズ中のランダムイベント処理
│   ├── utils/              # 型検証・ハプティックフィードバック等のユーティリティ
│   ├── data/               # マスタデータ (問題データ, アイテム, スキン, スタイル等)
│   └── styles/             # CSS (Vanilla CSS: common, layout, components, effects)
├── docs/                   # AI指示書、設計仕様書などのドキュメント群
└── assets/                 # 画像や音声などの静的アセット
    ├── houses/             # 15種類のマイハウス用スプライトシート
    ├── npcs/               # NPC画像 (g2/ にはGrade 2用NPC)
    ├── icons/              # PWA用アイコン
    ├── fonts/              # フォントアセット
    └── sounds/             # (現在はWeb Audio API モックを利用のため未実装)
```
*(※プロジェクトルート直下に一部生成画像の残骸(`mon_*.png.png`)が散乱していますが、技術的負債として後日整理予定)*

## Architecture & State Management

外部ライブラリを一切使わない、徹底した独自のVanilla JSアーキテクチャで構築されています。

### 1. State Management — GameStore (Observable Pattern)
`src/core/GameStore.js` がアプリケーションの「Single Source of Truth (単一の信頼できる情報源)」として機能します。

- 参照は `GameStore.getState('path.to.state')`
- 更新は `GameStore.setState('path', value)` 
- 購読は `GameStore.subscribe((path, newValue, oldValue) => { ... })`

> **[!] 現在の課題 (Technical Debt)**: 
> 実装機能の拡大に伴い、`GameStore` の初期ステート定義が非常に巨大化（app, player, progress, inventory, currentSession, sound, license, memory, house, ship, town, guild 等）しています。

### 2. Routing — index.js (Global Router)
`src/index.js` がグローバルルーターの役割を果たします。`GameStore` の `app.currentScreen` の変化を `subscribe` し、対象の `Screen` クラスを表示（またはインスタンス化）します。

> **[!] 現在の課題 (Technical Debt)**: 
> 画面遷移時にすべての画面を `_houseScreen?.hide()` のように個別に非表示にするハードコーディングがなされており、スケールしづらくなっています。将来的な ScreenManager の導入が推奨されています。

### 3. Sounds — Web Audio API Synthesizer
現在、音声アセット (`assets/sounds/`) が未実装のため、`src/core/SoundManager.js` は **Web Audio API の Oscillator（波形合成）を使ったビープ音モック** として実装されています。効果音・BGMともに直接ブラウザ上で合成しています。

## Core Game Systems (実装済み機能)

本プロジェクトは既に多数の高度なメタゲームシステムが完成しています。

### 🎓 1. クイズ＆学習システム (Grade 1 & Grade 2)
- **ワールドと単元**: 小1（33ワールド）、小2（42ワールド）に対応。
- **出題形式**: ランダム出題、ステップごとの難易度上昇、時計型クイズ（SVG動的描画対応 `ClockFace.js`）など。
- **Flash Mode**: 小2（Grade 2）九九向けの「チャンツ（詠唱）」「フラッシュカード」「順番練習モード」。

### 🎁 2. イベント＆ドロップシステム
- クイズ進行中にランダムまたは固定確率で発生。
- **おみくじ**（倍率アップ）、**モンスターバトル**、**宝箱**（ミミック含む）、**3つの道** などの演出イベント。
- クイズ結果やイベントを通じて、素材（木、石、宝石、星のかけら など）をドロップ。

### 🏡 3. マイハウスシステム (House Build)
- 6層のレイヤー構造（庭、1〜3階、屋上、装飾）。
- 各レイヤーに15種類のテーマスタイル（もく、いし、こおり、ほのお等）を自由に組み合わせ可能。
- 一定レイヤーを揃えることで発動する **フルセットボーナス** や特殊称号コンボ。
- スナップショットを残せる **写真館機能**（フレーム、スタンプ、ポーズ）。

### 🏭 4. 街システム (Town Hub)
- マップからアクセスできる7つの施設。
- **合成屋 (Craftsman)**: 全施設の最大レベルキャップを管理する中心施設。素材を使ったクラフト。
- **魔法農場 (Farm)**: 種を植え、クイズをこなすことでレア素材を収穫。
- **商店 (Shop)**: 日替わりでの素材トレード。
- **ギルド**: デイリーミッション、ストーリークエスト。
- **魔導書庫 (Library)**: グリモア図鑑とステータス。

### ⚓ 5. 船システム (Deep Sea Grimoire / Grade 2)
- Grade 2 用の船カスタマイズ機能。
- **サイズアップ**: 小型船 → 中型船 → 大型船艦 とロードマップに沿って進化。
- **パーツ装備**: 6スロット（かたち、すいしん、船首、船尾、旗、オーラ）のカスタマイズ。
- **テーマセット**: 特定のパーツ群（海賊、人魚、幽霊など）を揃えることで特殊オーラが発動。

### 🎭 6. スキン＆図鑑コレクション
- **スキン**: 実績やドロップのかけらで解放可能な24種のキャラスキン。
- **Memory Isle**: 遭遇したモンスターの記録と閲覧（4層レイヤー・40体のコレクション）。

## Debugging

`Config.IS_DEBUG` が `true` の場合、ブラウザのコンソールから `window.GG` 経由でシステム全体の操作が可能です。

```javascript
GG.getState('player.streak')   // ステートの確認
GG.setState('inventory.materials.wood', 99) // 素材の直接付与
GG.unlockAll()                 // チート：全ワールドの強制解放
GG.resetState()                // 初期状態への完全リセット
GG.exportState()               // セーブデータのJSON出力
GG.save()                      // IndexedDBへの強制セーブ
```

## 今後の技術的負債解消・リファクタリング計画 (Tech Debt & Refactoring)

機能追加に伴い発生している以下の課題は、今後のフェーズで優先対応が推奨されます。

1. **Routerの汎用化**:
   - `index.js` の `hideAll()` ロジックを、全ての画面クラスを配列/Mapで一元管理する `ScreenManager` アーキテクチャへリファクタリング。
2. **GameStore 分割**:
   - 巨大化した `state` オブジェクト（初期設定）を、`TownState`, `HouseState`, `ShipState`, `InventoryState` のようにドメインごとのモジュールに分割し、結合・管理する仕組みの導入。
3. **アセットディレクトリの整理**:
   - 初期にルートディレクトリに配置されてしまった敵画像（`mon_*.png.png`）を `assets/monsters/` に移動・リネームし、参照先パスを修正する。
4. **サウンド設計の本実装**:
   - `SoundManager.js` の合成音（Oscillator）モック実装を破棄し、標準の Audio タグまたは Web Audio API（バッファ再生）を用いたオーディオファイル（mp3/wav）再生の実装。
