# 📘 Grimoire Guardians

小学生が楽しく勉強できる教育ゲームアプリ

## 🎮 プロジェクト情報

- **バージョン**: 0.1.0
- **フェーズ**: Phase 0.1（基盤構築）
- **対象**: 小学1年生〜6年生
- **教科**: 算数（Phase 0）

## 📁 プロジェクト構成

```
grimoire-guardians/
├── index.html              # エントリーポイント
├── manifest.json           # PWA設定
├── sw.js                   # Service Worker（TODO）
│
├── docs/                   # ドキュメント
│   ├── AI指示書_v1.1.md
│   ├── UI設計書_v1.1.md
│   ├── 統合仕様書_v1.2.md
│   └── ロードマップ_v1.4.md
│
├── src/
│   ├── index.js            # メインエントリー
│   │
│   ├── core/               # 基盤クラス
│   │   ├── Config.js       # 設定管理
│   │   ├── Logger.js       # ログ管理
│   │   ├── GameStore.js    # 状態管理
│   │   └── SoundManager.js # サウンド管理（モック）
│   │
│   ├── components/         # 再利用可能UI（TODO）
│   ├── screens/            # 画面（TODO）
│   ├── events/             # イベント（TODO）
│   ├── effects/            # 演出（TODO）
│   │
│   ├── utils/              # 汎用関数
│   │   └── TypeValidator.js
│   │
│   ├── data/               # データ
│   │   ├── core/           # Phase 0（必須）
│   │   │   ├── curriculum/ # 単元マッピング（TODO）
│   │   │   └── questions/  # 問題データ（TODO）
│   │   └── dlc/            # 追加コンテンツ（Phase 1）
│   │
│   └── styles/             # CSS
│       ├── common.css      # 共通スタイル
│       ├── layout.css      # レイアウト
│       ├── components.css  # コンポーネント
│       └── effects.css     # エフェクト
│
└── assets/                 # リソース
    ├── icons/              # アイコン（TODO）
    ├── fonts/              # フォント（TODO）
    └── sounds/             # サウンド（Phase 1）
```

## ✅ Phase 0.1 完了内容

### 基盤システム
- [x] プロジェクト構造作成
- [x] index.html（type="module"対応、横向き固定）
- [x] Config.js（設定管理）
- [x] Logger.js（ログ管理）
- [x] GameStore.js（状態管理）
- [x] SoundManager.js（モック実装）
- [x] TypeValidator.js（型検証）

### スタイルシート
- [x] common.css（CSS変数、Z-Index定義）
- [x] layout.css（レイアウトシステム）
- [x] components.css（コンポーネントスタイル）
- [x] effects.css（エフェクト・アニメーション）

### PWA対応
- [x] manifest.json（PWA設定）
- [ ] Service Worker（Phase 0.1後半で実装）

## 🚀 次のステップ

### Phase 0.1 中盤
1. **コンポーネント作成**
   - BookCard.js
   - ProgressBar.js

2. **画面実装**
   - BookshelfScreen.js
   - QuizScreen.js（基本版）

3. **データ作成**
   - math-grade1-mapping.js（単元マッピング）
   - math-grade1.js（問題データ）

### Phase 0.1 後半
4. **イベントシステム**
   - おみくじチャレンジ
   - 3つの道
   - モンスターバトル
   - 宝箱チャレンジ

5. **素材・ドロップシステム**
   - DropSystem.js
   - InventoryScreen.js

## 🛠️ 開発環境

- **言語**: Pure JavaScript (ES6+)
- **フレームワーク**: なし（Vanilla JS）
- **CSS**: Pure CSS
- **エディタ**: VSCode
- **AI**: Claude Code (Web版)
- **レビュー**: Gemini

## 📖 ドキュメント

すべてのドキュメントは`docs/`ディレクトリに格納されています：

1. **AI指示書 v1.1** - AI開発者向けの開発ガイド
2. **UI設計書 v1.1** - UI/UX仕様
3. **統合仕様書 v1.2** - プロジェクト全体仕様
4. **ロードマップ v1.4** - Phase 0詳細実装計画

## 🎯 設計思想

### 技術的原則
- Pure JavaScript（フレームワーク不使用）
- 型安全性の確保（TypeValidator）
- 状態管理の一元化（GameStore）
- GPU加速の活用
- PWA対応

### UX原則
- 横向き専用（タブレット最適化）
- 60fps維持
- タッチフィードバック
- 分かりやすいUI

### 教育的原則
- 楽しく学べる
- 達成感を感じられる
- 自己肯定感の向上

## 📝 ライセンス

（TODO: ライセンス決定後に記載）

## 👥 開発者

- Claude (AI Developer)
- Gemini (Reviewer)
- Human (Project Owner)

---

**Happy Learning! 📚✨**
