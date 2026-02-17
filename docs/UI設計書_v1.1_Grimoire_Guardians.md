# 📐 UI設計書 v1.1
## Grimoire Guardians - Professional Edition

**バージョン:** 1.1  
**最終更新:** 2026-02-15  
**ステータス:** 確定版(Phase 0基準)  
**改訂理由:** Gemini提案 + アクセシビリティ対応 + 商用展開準備

---

## 目次

1. [改訂サマリー](#1-改訂サマリー)
2. [設計思想](#2-設計思想)
3. [デザインシステム](#3-デザインシステム)
4. [画面設計](#4-画面設計)
5. [コンポーネント仕様](#5-コンポーネント仕様)
6. [アニメーション仕様](#6-アニメーション仕様)
7. [サウンドUX設計](#7-サウンドux設計)
8. [状態管理](#8-状態管理)
9. [パフォーマンス最適化](#9-パフォーマンス最適化)
10. [ファイル構成](#10-ファイル構成)

---

## 1. 改訂サマリー

### v1.0 → v1.1 の主要変更点

| 項目 | 判定 | 理由 |
|------|------|------|
| **アクセシビリティ対応** | ✅ **即採用** | 色覚多様性・ハイコントラスト・モーション低減対応 |
| **hover依存の排除** | ✅ **即採用** | タッチデバイスで確実に動作 |
| **dvh使用** | ✅ **採用(フォールバック付き)** | モダンブラウザ対応 + 互換性保証 |
| **Container Queries** | ⏭️ **Phase 1送り** | Phase 0では過剰、将来性は◎ |
| **Juice強化** | ✅ **即採用** | イージング関数拡張、気持ちよさの核心 |
| **サウンド設計** | ✅ **即採用** | 最初から組み込み、後付けでなく |
| **Rive/Lottie** | ⏭️ **Phase 1送り** | CSS Animationで十分、後で差し替え可 |
| **状態管理** | ✅ **即採用(軽量版)** | GameStore実装、破綻防止の要 |
| **ハプティック** | ✅ **追加採用** | 振動フィードバック、体感向上 |
| **リソース管理** | ✅ **追加採用** | プリロード戦略、起動高速化 |
| **パフォーマンス監視** | ✅ **追加採用** | FPS監視、自動パフォーマンスモード |

---

## 2. 設計思想

### 2-1. コアコンセプト

```
子供が「気持ちいい!」と感じる3要素

1. 即座の反応
   ├─ タップから0.1秒以内のフィードバック
   ├─ ボタンの視覚的変化(押した感)
   ├─ 音との同期
   └─ 振動フィードバック(対応端末)

2. 分かりやすさ
   ├─ 言葉より絵・アイコン
   ├─ 3タップ以内で目的達成
   ├─ 迷わせない導線
   └─ 色+形状+アイコンの三重フィードバック

3. 達成感の可視化
   ├─ 進捗バーの即座の反映
   ├─ 派手な演出(クリア時)
   ├─ 保護者に見せたくなる結果画面
   └─ 触って楽しいインタラクション
```

### 2-2. UX原則(絶対厳守)

| 原則 | 具体的指標 | 違反例 |
|------|----------|--------|
| **即応性** | タップ→反応 0.1秒以内 | ローディング中のタップ無視 |
| **可逆性** | すべての操作は戻せる | 間違えて削除→復元不可 |
| **予測可能性** | 同じ操作は同じ結果 | ボタンの位置が毎回変わる |
| **視認性** | 最小フォント20px | 12pxの注釈文字 |
| **タップ精度** | 最小44x44px(iOS基準) | 32x32pxの小さいボタン |
| **エラー耐性** | 誤操作を想定 | 連打でバグる |
| **アクセシビリティ** | WCAG AA準拠 | 色のみで判別 |

### 2-3. 破綻防止の設計原則

```
将来の問題を今防ぐ

破綻パターン1: データ肥大化
├─ 問題: IndexedDBが10MB超えて重くなる
└─ 対策: ページネーション、古いデータの圧縮

破綻パターン2: 画面サイズの多様性
├─ 問題: iPadとAndroidタブレットで崩れる
└─ 対策: グリッドシステム、相対単位、dvh使用

破綻パターン3: アニメーション過多
├─ 問題: 古い端末で動作が重い
└─ 対策: パフォーマンスモード、GPU最適化、FPS監視

破綻パターン4: 状態管理の複雑化
├─ 問題: 教科追加でバグが多発
└─ 対策: GameStore、単一方向データフロー

破綻パターン5: セーブデータ破損
├─ 問題: アップデート後に読めない
└─ 対策: バージョニング、マイグレーション機能

破綻パターン6: サウンドの後付け
├─ 問題: アニメーションと音がズレる
└─ 対策: 最初からSoundManager統合

破綻パターン7: タッチ非対応
├─ 問題: hoverに依存してタブレットで動かない
└─ 対策: タッチイベント優先、リップルエフェクト
```

---

## 3. デザインシステム

### 3-1. カラーパレット(ブランドカラー)

```css
:root {
  /* ブランドカラー(商用展開時も維持) */
  --brand-primary: #4A90E2;      /* メインブルー */
  --brand-secondary: #F5A623;    /* アクセントオレンジ */
  --brand-success: #7ED321;      /* 正解グリーン */
  --brand-danger: #D0021B;       /* 不正解レッド */
  
  /* UIカラー */
  --color-bg-primary: #FFF9E6;   /* 温かみのある背景 */
  --color-bg-secondary: #FFFFFF; /* カード背景 */
  --color-text-primary: #333333; /* メインテキスト */
  --color-text-secondary: #666666; /* サブテキスト */
  --color-border: #E0E0E0;       /* 境界線 */
  
  /* 教科別カラー(将来拡張) */
  --subject-math: #4A90E2;       /* 算数:青 */
  --subject-japanese: #E24A90;   /* 国語:ピンク */
  --subject-science: #4AE290;    /* 理科:緑 */
  --subject-social: #E2904A;     /* 社会:オレンジ */
  --subject-english: #904AE2;    /* 英語:紫 */
  
  /* 学年別カラー(グラデーション) */
  --grade-1: #FFD700;  /* 金色 */
  --grade-2: #FFB347;  /* オレンジ */
  --grade-3: #FF6B6B;  /* 赤 */
  --grade-4: #4ECDC4;  /* 水色 */
  --grade-5: #45B7D1;  /* 青 */
  --grade-6: #A8E6CF;  /* 緑 */
}
```

### 3-2. タイポグラフィ

```css
:root {
  /* フォントファミリー */
  --font-primary: "Noto Sans JP", "Hiragino Sans", "メイリオ", sans-serif;
  --font-number: "Roboto", "Arial", sans-serif; /* 数字用 */
  
  /* フォントサイズ(子供向け基準) */
  --font-size-xs: 16px;   /* 最小サイズ(注釈のみ) */
  --font-size-sm: 20px;   /* 小(通常の説明) */
  --font-size-md: 24px;   /* 中(ボタン文字) */
  --font-size-lg: 32px;   /* 大(問題文) */
  --font-size-xl: 48px;   /* 特大(タイトル) */
  --font-size-xxl: 64px;  /* 超特大(演出用) */
  
  /* 行間(可読性重視) */
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
  --line-height-loose: 2.0;
  
  /* 文字間隔(ゆとり) */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-loose: 0.05em;
}
```

**タイポグラフィルール:**
- 問題文: 32px以上(視認性最優先)
- ボタン: 24px以上(タップしやすさ)
- 注釈: 20px以上(16pxは非推奨)
- 数字: Robotoで統一(読み間違い防止)

### 3-3. スペーシング(余白システム)

```css
:root {
  /* 8pxベースのスペーシングスケール */
  --space-1: 8px;    /* 最小 */
  --space-2: 16px;   /* 小 */
  --space-3: 24px;   /* 中 */
  --space-4: 32px;   /* 大 */
  --space-5: 40px;   /* 特大 */
  --space-6: 48px;   /* 超特大 */
  
  /* コンポーネント別余白 */
  --padding-btn: var(--space-3) var(--space-4); /* ボタン内余白 */
  --padding-card: var(--space-4);               /* カード内余白 */
  --gap-grid: var(--space-3);                   /* グリッド間隔 */
}
```

**スペーシングルール:**
- すべて8の倍数(16, 24, 32...)
- 子供は細かい余白を認識しにくい→最小16px
- タップ領域は余白込みで最小44x44px

### 3-4. シャドウ(奥行き表現)

```css
:root {
  /* レイヤー別シャドウ */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);    /* カード */
  --shadow-md: 0 4px 8px rgba(0,0,0,0.15);   /* ボタン */
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.2);   /* モーダル */
  --shadow-xl: 0 16px 32px rgba(0,0,0,0.25); /* ドロップダウン */
  
  /* 特殊シャドウ */
  --shadow-pressed: inset 0 2px 4px rgba(0,0,0,0.2); /* 押下時 */
  --shadow-focus: 0 0 0 4px rgba(74,144,226,0.3);    /* フォーカス */
}
```

### 3-5. ボーダーラディウス(角丸)

```css
:root {
  --radius-sm: 8px;   /* 小(カード内要素) */
  --radius-md: 16px;  /* 中(ボタン、カード) */
  --radius-lg: 24px;  /* 大(モーダル) */
  --radius-full: 9999px; /* 円形 */
}
```

### 3-6. イージング関数(v1.1新規)

```css
:root {
  /* 既存 */
  --ease-in-out: ease-in-out;
  
  /* 新規追加: 心地よい動き */
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* バウンス */
  --ease-snappy: cubic-bezier(0.25, 1, 0.5, 1);            /* キビキビ */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);             /* なめらか */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);        /* ポヨン */
  
  /* アニメーション時間の黄金比 */
  --duration-instant: 100ms;   /* 即座 */
  --duration-fast: 200ms;      /* 速い */
  --duration-normal: 300ms;    /* 通常 */
  --duration-slow: 500ms;      /* ゆっくり */
  --duration-epic: 1000ms;     /* 演出用 */
}
```

### 3-7. アイコンシステム

```css
:root {
  --icon-xs: 24px;  /* 最小 */
  --icon-sm: 32px;  /* 小 */
  --icon-md: 48px;  /* 中 */
  --icon-lg: 64px;  /* 大(キャラクター) */
  --icon-xl: 96px;  /* 特大(演出用) */
}
```

**アイコン使用優先順位:**
1. 絵文字(Phase 0) - 実装コスト0、多言語対応
2. SVGアイコン(Phase 1) - 拡大縮小自由、カラー変更可
3. カスタム画像(Phase 2) - 完全なブランディング

---

## 4. 画面設計

### 4-1. グリッドシステム(レスポンシブ対応)

```css
:root {
  /* dvhのフォールバック */
  --app-height: 100vh;
  --app-height: 100dvh; /* モダンブラウザ */
}

/* 横向き基準(1280x720) */
.app-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto; /* 可変 */
  height: var(--app-height);
  max-width: 1920px;
  margin: 0 auto;
  min-height: 600px; /* 最小保証 */
}

/* 画面サイズ別対応 */
@media (min-width: 1024px) and (max-width: 1280px) {
  /* 一般的なタブレット(iPad等) */
  .app-container {
    min-height: 600px;
  }
}

@media (min-width: 1281px) and (max-width: 1920px) {
  /* 大型タブレット・小型PC */
  .app-container {
    min-height: 700px;
  }
}

@media (min-width: 1921px) {
  /* 大画面PC */
  .app-container {
    min-height: 900px;
  }
  /* UI要素も比例拡大 */
  :root {
    --font-size-lg: 40px;
    --font-size-xl: 60px;
  }
}

/* dvh未対応ブラウザ用 */
@supports not (height: 100dvh) {
  .app-container {
    height: calc(var(--vh, 1vh) * 100);
  }
}

/* 縦向き(非推奨だが対応) */
@media (orientation: portrait) {
  .orientation-warning {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    color: white;
    font-size: 24px;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }
  
  .orientation-warning::before {
    content: "📱 → 🔄\A画面を横にしてね!";
    white-space: pre;
    text-align: center;
  }
}
```

**JavaScript側でのvh補正:**
```javascript
// utils/ViewportFix.js
function setVhProperty() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);
setVhProperty();
```

### 4-2. ヘッダー仕様

```html
<header class="app-header">
  <div class="header-left">
    <div class="character-display player">
      <img src="{{playerSkin}}" alt="自キャラ" class="character-image" />
    </div>
  </div>
  
  <div class="header-center">
    <button class="header-btn" data-action="home">
      <span class="icon">📚</span>
      <span class="label">ほんだな</span>
    </button>
    
    <div class="header-info">
      <span class="question-count">問題 <strong>3</strong>/5</span>
      <span class="timer">⏱️ <strong>01:23</strong></span>
    </div>
  </div>
  
  <div class="header-right">
    <div class="character-display enemy">
      <img src="{{enemySkin}}" alt="敵キャラ" class="character-image" />
    </div>
  </div>
</header>
```

```css
.app-header {
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  align-items: center;
  padding: 0 var(--space-3);
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%);
  border-bottom: 2px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  height: auto;
  min-height: 70px;
}

.character-display {
  width: 64px;
  height: 64px;
  position: relative;
}

.character-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.header-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

.header-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--brand-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--duration-fast);
  min-height: 44px;
  min-width: 120px;
}

.header-btn:hover {
  background: #3A7BC8;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.header-btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-pressed);
}

.header-info {
  display: flex;
  gap: var(--space-4);
  font-size: var(--font-size-md);
}

.header-info strong {
  color: var(--brand-primary);
  font-family: var(--font-number);
}
```

### 4-3. メインエリア仕様(問題画面)

```html
<main class="quiz-main">
  <aside class="quiz-sidebar">
    <div class="question-text">
      <h2 class="question-label">【もんだい】</h2>
      <p class="question-content">3 + 5 = ?</p>
    </div>
    
    <!-- 将来拡張: ヒント表示エリア -->
    <div class="hint-area" data-visible="false">
      <button class="hint-btn">💡 ヒント</button>
    </div>
  </aside>
  
  <section class="quiz-content">
    <!-- タイプ別コンテンツ(動的切替) -->
    <div class="content-display" data-type="text">
      <div class="content-text-large">3 + 5</div>
    </div>
  </section>
</main>
```

```css
.quiz-main {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg-primary);
  overflow: hidden; /* スクロール禁止(1画面完結) */
}

.quiz-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.question-text {
  background: white;
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.question-label {
  font-size: var(--font-size-md);
  color: var(--brand-primary);
  margin-bottom: var(--space-2);
  font-weight: bold;
}

.question-content {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  line-height: var(--line-height-loose);
  font-weight: 600;
}

.quiz-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-5);
  min-height: 400px;
}

.content-display {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-text-large {
  font-size: var(--font-size-xxl);
  font-family: var(--font-number);
  color: var(--brand-primary);
  font-weight: bold;
  max-width: 90%;
  text-align: center;
  word-break: break-word;
}
```

### 4-4. フッター仕様(回答エリア)

```html
<footer class="quiz-footer">
  <div class="answer-buttons">
    <button class="answer-btn" data-answer="6">
      <span class="answer-text">6</span>
    </button>
    <button class="answer-btn" data-answer="7">
      <span class="answer-text">7</span>
    </button>
    <button class="answer-btn" data-answer="8">
      <span class="answer-text">8</span>
    </button>
    <button class="answer-btn" data-answer="9">
      <span class="answer-text">9</span>
    </button>
  </div>
</footer>
```

```css
.quiz-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-3);
  background: white;
  border-top: 2px solid var(--color-border);
  box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
  min-height: 120px;
}

.answer-buttons {
  display: flex;
  gap: var(--space-3);
  max-width: 1000px;
  width: 100%;
}

.answer-btn {
  flex: 1;
  min-height: 80px;
  padding: var(--space-3);
  background: var(--brand-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-family: var(--font-number);
  font-weight: bold;
  cursor: pointer;
  transition: transform var(--duration-instant) var(--ease-elastic),
              box-shadow var(--duration-instant) ease;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

/* 押し始め */
.answer-btn:active {
  transform: scale(0.92) translateY(2px);
  box-shadow: var(--shadow-pressed);
}

/* 離した瞬間の跳ね返り */
.answer-btn.released {
  animation: button-bounce var(--duration-fast) var(--ease-bounce);
}

@keyframes button-bounce {
  0% { transform: scale(0.92); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* リップルエフェクト(タップ時の波紋) */
.answer-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.answer-btn:active::after {
  width: 300px;
  height: 300px;
}
```

---

## 5. コンポーネント仕様

### 5-1. アクセシビリティ対応(v1.1新規)

**色覚多様性対応:**
```css
/* 正解フィードバック: 色+形状+アイコン */
.answer-btn.correct {
  background: var(--brand-success);
  border: 4px solid #2E7D32; /* 濃い緑の枠線 */
  position: relative;
}

.answer-btn.correct::before {
  content: '⭕';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  opacity: 0;
  animation: correct-icon var(--duration-slow) ease forwards;
}

@keyframes correct-icon {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* 不正解フィードバック: 色+ギザギザ+アイコン */
.answer-btn.incorrect {
  background: var(--brand-danger);
  border: 4px solid #C62828;
  /* ギザギザ効果 */
  clip-path: polygon(
    2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 
    2% 100%, 0% 98%, 0% 2%
  );
}

.answer-btn.incorrect::before {
  content: '❌';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
  opacity: 0;
  animation: incorrect-icon var(--duration-slow) ease forwards;
}

@keyframes incorrect-icon {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(-90deg) scale(0);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  .answer-btn {
    border: 3px solid currentColor;
  }
  
  .answer-btn.correct {
    border-color: #000;
    background: #00FF00;
  }
  
  .answer-btn.incorrect {
    border-color: #000;
    background: #FF0000;
  }
}

/* 視覚効果低減モード対応 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5-2. BookCard(本のカード)

```html
<div class="book-card" data-subject="math" data-world="world1">
  <div class="book-cover">
    <div class="book-icon">📘</div>
    <div class="book-title">たしざん</div>
  </div>
  
  <div class="book-progress">
    <div class="progress-bar">
      <div class="progress-fill" data-progress="60"></div>
    </div>
    <div class="progress-text">60%</div>
  </div>
  
  <div class="book-status">
    <span class="status-badge">クリア済み</span>
  </div>
</div>
```

```css
.book-card {
  width: 180px;
  height: 240px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: transform var(--duration-normal) var(--ease-snappy), 
              box-shadow var(--duration-normal) ease;
  overflow: hidden;
  transform-style: preserve-3d;
}

/* IntersectionObserverで制御 */
.book-card.in-view {
  animation: card-enter 0.6s var(--ease-elastic);
}

@keyframes card-enter {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* タップ時のフィードバック */
.book-card:active {
  transform: scale(0.95);
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-instant) var(--ease-elastic);
}

/* タッチデバイス専用リップル */
@media (hover: none) {
  .book-card::after {
    content: '';
    position: absolute;
    top: var(--ripple-y, 50%);
    left: var(--ripple-x, 50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  
  .book-card.ripple::after {
    animation: ripple-effect 0.6s ease-out;
  }
}

@keyframes ripple-effect {
  to {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}

.book-cover {
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--subject-math) 0%, #6BA3E8 100%);
  color: white;
  padding: var(--space-3);
}

.book-icon {
  font-size: var(--icon-xl);
  margin-bottom: var(--space-2);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

.book-title {
  font-size: var(--font-size-lg);
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.book-progress {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.progress-bar {
  height: 12px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--brand-success) 0%, #9FE86D 100%);
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) ease;
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: right;
  font-family: var(--font-number);
}

.book-status {
  padding: 0 var(--space-3) var(--space-2);
}

.status-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background: var(--brand-success);
  color: white;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
  font-weight: bold;
}
```

**JavaScript実装:**
```javascript
// components/BookCard.js

// 進捗更新(破綻防止)
function updateBookProgress(cardElement, progress) {
  const progressFill = cardElement.querySelector('.progress-fill');
  const progressText = cardElement.querySelector('.progress-text');
  
  // 0-100の範囲に制限
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  progressFill.style.width = `${safeProgress}%`;
  progressFill.setAttribute('data-progress', safeProgress);
  progressText.textContent = `${safeProgress}%`;
}

// タッチリップル実装
class TouchRipple {
  static apply(element) {
    element.addEventListener('touchstart', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      
      element.style.setProperty('--ripple-x', `${x}px`);
      element.style.setProperty('--ripple-y', `${y}px`);
      
      element.classList.add('ripple');
      setTimeout(() => element.classList.remove('ripple'), 600);
    });
  }
}

// 全てのカードに適用
document.querySelectorAll('.book-card').forEach(card => {
  TouchRipple.apply(card);
});

// IntersectionObserver for in-view animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.book-card').forEach(card => {
  observer.observe(card);
});
```

### 5-3. CharacterDisplay(キャラ表示)

```html
<div class="character-container" data-role="player">
  <div class="character-wrapper">
    <img 
      src="./assets/characters/player-default.png" 
      alt="自キャラ" 
      class="character-sprite"
      data-skin="default"
    />
    
    <div class="character-effects">
      <div class="effect-layer glow"></div>
      <div class="effect-layer particles"></div>
    </div>
  </div>
</div>
```

```css
.character-container {
  position: relative;
  width: 64px;
  height: 64px;
}

.character-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.character-sprite {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  transition: opacity var(--duration-normal) ease;
}

.character-sprite.changing {
  opacity: 0;
}

.character-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.effect-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity var(--duration-normal) ease;
}

.effect-layer.glow {
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74,144,226,0.6) 0%, transparent 70%);
  filter: blur(8px);
}

.character-container[data-rarity="rare"] .effect-layer.glow {
  opacity: 1;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}
```

**JavaScript実装:**
```javascript
// components/CharacterDisplay.js

class CharacterDisplay {
  constructor(containerElement) {
    this.container = containerElement;
    this.sprite = containerElement.querySelector('.character-sprite');
  }
  
  // スキン変更(フェード付き)
  async changeSkin(newSkinPath) {
    // フェードアウト
    this.sprite.classList.add('changing');
    await this.wait(300);
    
    // 画像変更
    this.sprite.src = newSkinPath;
    
    // プリロード待機
    await this.waitForImageLoad(this.sprite);
    
    // フェードイン
    this.sprite.classList.remove('changing');
  }
  
  // レアリティ設定
  setRarity(rarity) {
    this.container.setAttribute('data-rarity', rarity);
  }
  
  // ヘルパー
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  waitForImageLoad(img) {
    return new Promise((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = resolve;
        img.onerror = reject;
      }
    });
  }
}

export default CharacterDisplay;
```

---

## 6. アニメーション仕様

### 6-1. 斬撃演出

```html
<div class="slash-effect" data-active="false">
  <svg class="slash-svg" viewBox="0 0 200 200">
    <path 
      class="slash-path" 
      d="M 20,180 Q 100,100 180,20"
      stroke="white"
      stroke-width="8"
      fill="none"
      stroke-linecap="round"
    />
  </svg>
  
  <div class="slash-flash"></div>
</div>
```

```css
.slash-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  z-index: 1000;
}

.slash-effect[data-active="true"] {
  opacity: 1;
  animation: slash-sequence 0.4s ease-out;
}

.slash-svg {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
}

.slash-path {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
}

.slash-effect[data-active="true"] .slash-path {
  animation: slash-draw var(--duration-fast) ease-out forwards;
}

@keyframes slash-draw {
  from {
    stroke-dashoffset: 300;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.slash-flash {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 60%);
  opacity: 0;
}

.slash-effect[data-active="true"] .slash-flash {
  animation: slash-flash-anim var(--duration-normal) ease-out;
}

@keyframes slash-flash-anim {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
```

**JavaScript実装:**
```javascript
// effects/SlashEffect.js

class SlashEffect {
  constructor() {
    this.element = document.querySelector('.slash-effect');
  }
  
  async play() {
    this.element.setAttribute('data-active', 'true');
    await this.wait(400);
    this.element.setAttribute('data-active', 'false');
  }
  
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default SlashEffect;
```

### 6-2. 撃破演出(完全版)

```javascript
// effects/DefeatEffect.js

import SlashEffect from './SlashEffect.js';
import SoundManager from '../core/SoundManager.js';
import HapticFeedback from '../utils/HapticFeedback.js';

export class DefeatEffect {
  constructor(playerChar, enemyChar, onComplete) {
    this.player = playerChar;
    this.enemy = enemyChar;
    this.onComplete = onComplete;
    this.slashEffect = new SlashEffect();
  }
  
  async play() {
    // 1. カットイン(0.5秒)
    await this.cutIn();
    
    // 2. 移動(0.3秒)
    await this.moveToEnemy();
    
    // 3. 斬撃モーション(0.2秒)
    await this.slashAttack();
    
    // 4. 爆発(0.5秒)
    await this.explosion();
    
    // 5. 敵消滅(0.3秒)
    await this.enemyDefeat();
    
    // 6. クリア表示(0.7秒)
    await this.showClear();
    
    // 完了コールバック
    if (this.onComplete) this.onComplete();
  }
  
  async cutIn() {
    return new Promise(resolve => {
      this.player.classList.add('cutin-animation');
      setTimeout(resolve, 500);
    });
  }
  
  async moveToEnemy() {
    return new Promise(resolve => {
      this.player.classList.remove('cutin-animation');
      this.player.classList.add('move-to-enemy');
      setTimeout(resolve, 300);
    });
  }
  
  async slashAttack() {
    return new Promise(async (resolve) => {
      // 振りかぶり
      this.player.style.transform = 'translateX(-20px) rotate(-15deg)';
      await this.wait(100);
      
      // 斬撃!
      this.player.style.transform = 'translateX(30px) rotate(15deg)';
      
      // 音と振動とアニメーションを同時に
      SoundManager.play('slash');
      HapticFeedback.heavy();
      await this.slashEffect.play();
      
      this.shakeScreen();
      this.showHitMark();
      
      await this.wait(200);
      resolve();
    });
  }
  
  async explosion() {
    return new Promise(resolve => {
      SoundManager.play('explosion');
      HapticFeedback.medium();
      
      const explosionEl = this.createExplosion();
      document.body.appendChild(explosionEl);
      
      setTimeout(() => {
        explosionEl.remove();
        resolve();
      }, 500);
    });
  }
  
  async enemyDefeat() {
    return new Promise(resolve => {
      this.enemy.classList.add('defeat-animation');
      setTimeout(() => {
        this.enemy.style.display = 'none';
        resolve();
      }, 300);
    });
  }
  
  async showClear() {
    return new Promise(resolve => {
      SoundManager.play('clear');
      HapticFeedback.success();
      
      const clearScreen = document.getElementById('clear-screen');
      clearScreen.classList.add('show');
      setTimeout(resolve, 700);
    });
  }
  
  showHitMark() {
    const hitMark = document.createElement('div');
    hitMark.className = 'hit-mark';
    hitMark.textContent = '💥';
    document.body.appendChild(hitMark);
    setTimeout(() => hitMark.remove(), 200);
  }
  
  shakeScreen() {
    document.body.classList.add('shake');
    setTimeout(() => {
      document.body.classList.remove('shake');
    }, 200);
  }
  
  createExplosion() {
    const explosion = document.createElement('div');
    explosion.className = 'explosion-effect';
    explosion.innerHTML = `
      <div class="explosion-core"></div>
      <div class="particles"></div>
    `;
    return explosion;
  }
  
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

## 7. サウンドUX設計

### 7-1. SoundManager(シングルトン)

```javascript
// core/SoundManager.js

class SoundManager {
  static instance = null;
  
  constructor() {
    if (SoundManager.instance) {
      return SoundManager.instance;
    }
    
    this.audioContext = null;
    this.sounds = new Map();
    this.enabled = true;
    this.volume = 1.0;
    
    SoundManager.instance = this;
  }
  
  // 初期化(ユーザーインタラクション後に呼ぶ)
  async init() {
    if (this.audioContext) return;
    
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // サウンドプリロード
    await this.loadSounds({
      tap: './assets/sounds/tap.mp3',
      success: './assets/sounds/success.mp3',
      fail: './assets/sounds/fail.mp3',
      slash: './assets/sounds/slash.mp3',
      explosion: './assets/sounds/explosion.mp3',
      clear: './assets/sounds/clear.mp3',
    });
  }
  
  async loadSounds(soundMap) {
    const promises = Object.entries(soundMap).map(async ([key, url]) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.sounds.set(key, audioBuffer);
      } catch (error) {
        console.warn(`Failed to load sound: ${key}`, error);
        this.sounds.set(key, null);
      }
    });
    
    await Promise.all(promises);
  }
  
  // 再生(遅延なし)
  play(soundKey, options = {}) {
    if (!this.enabled) return;
    
    const buffer = this.sounds.get(soundKey);
    if (!buffer) return;
    
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = this.volume * (options.volume || 1.0);
    
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    source.start(0);
  }
  
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
  
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export default new SoundManager();
```

### 7-2. UI統合例

```javascript
import SoundManager from './core/SoundManager.js';
import HapticFeedback from './utils/HapticFeedback.js';

// ボタンタップ
document.querySelectorAll('.answer-btn').forEach(btn => {
  btn.addEventListener('pointerdown', () => {
    SoundManager.play('tap');
    HapticFeedback.light();
  });
  
  btn.addEventListener('pointerup', () => {
    btn.classList.add('released');
    setTimeout(() => btn.classList.remove('released'), 200);
  });
  
  btn.addEventListener('click', () => {
    const isCorrect = checkAnswer(btn.dataset.answer);
    if (isCorrect) {
      SoundManager.play('success');
      HapticFeedback.success();
    } else {
      SoundManager.play('fail');
      HapticFeedback.error();
    }
  });
});
```

---

## 8. 状態管理

### 8-1. GameStore(軽量リアクティブシステム)

```javascript
// core/GameStore.js

class GameStore {
  constructor(initialState = {}) {
    this._state = initialState;
    this._listeners = new Map();
    this._middleware = [];
  }
  
  getState() {
    return { ...this._state };
  }
  
  setState(updates) {
    const prevState = this.getState();
    this._state = { ...this._state, ...updates };
    
    // ミドルウェア実行
    this._middleware.forEach(fn => fn(prevState, this._state));
    
    // リスナー通知(変更されたキーのみ)
    Object.keys(updates).forEach(key => {
      const listeners = this._listeners.get(key);
      if (listeners) {
        listeners.forEach(callback => {
          callback(this._state[key], prevState[key]);
        });
      }
    });
    
    // 全体リスナー
    const globalListeners = this._listeners.get('*');
    if (globalListeners) {
      globalListeners.forEach(callback => {
        callback(this._state, prevState);
      });
    }
  }
  
  subscribe(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);
    
    return () => {
      this._listeners.get(key).delete(callback);
    };
  }
  
  use(middleware) {
    this._middleware.push(middleware);
  }
}

// グローバルストア
const store = new GameStore({
  player: {
    name: '',
    currentWorld: null,
    currentQuestion: 0,
  },
  quiz: {
    questions: [],
    answers: [],
    score: 0,
    timeElapsed: 0,
  },
  ui: {
    currentScreen: 'bookshelf',
    isAnimating: false,
  },
  settings: {
    soundEnabled: true,
    volume: 1.0,
  }
});

// デバッグミドルウェア
if (process.env.NODE_ENV === 'development') {
  store.use((prev, next) => {
    console.log('State changed:', { prev, next });
  });
}

export default store;
```

### 8-2. UI連携例

```javascript
import store from './core/GameStore.js';

// スコア表示の自動更新
store.subscribe('quiz', (quizState) => {
  const scoreElement = document.querySelector('.score-display');
  scoreElement.textContent = `${quizState.score} / ${quizState.questions.length}`;
});

// タイマーの自動更新
store.subscribe('quiz', (quizState) => {
  const minutes = Math.floor(quizState.timeElapsed / 60);
  const seconds = quizState.timeElapsed % 60;
  document.querySelector('.timer').textContent = 
    `⏱️ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});
```

---

## 9. パフォーマンス最適化

### 9-1. ハプティックフィードバック

```javascript
// utils/HapticFeedback.js

class HapticFeedback {
  static isSupported() {
    return 'vibrate' in navigator;
  }
  
  static light() {
    if (this.isSupported()) {
      navigator.vibrate(10);
    }
  }
  
  static medium() {
    if (this.isSupported()) {
      navigator.vibrate(20);
    }
  }
  
  static heavy() {
    if (this.isSupported()) {
      navigator.vibrate([30, 10, 30]);
    }
  }
  
  static success() {
    if (this.isSupported()) {
      navigator.vibrate([10, 50, 10]);
    }
  }
  
  static error() {
    if (this.isSupported()) {
      navigator.vibrate([50, 30, 50, 30, 50]);
    }
  }
}

export default HapticFeedback;
```

### 9-2. リソースプリロード

```javascript
// core/ResourceLoader.js

class ResourceLoader {
  constructor() {
    this.queue = [];
    this.loaded = new Map();
    this.progress = 0;
    this.totalResources = 0;
  }
  
  preloadImages(urls) {
    const promises = urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.loaded.set(url, img);
          this.updateProgress();
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
    });
    
    return Promise.all(promises);
  }
  
  async preloadFonts(fonts) {
    await Promise.all(
      fonts.map(font => document.fonts.load(font))
    );
  }
  
  async preloadAll(resources) {
    this.totalResources = 
      (resources.images?.length || 0) +
      (resources.sounds?.length || 0) +
      (resources.fonts?.length || 0);
    
    await Promise.all([
      this.preloadImages(resources.images || []),
      SoundManager.loadSounds(resources.sounds || {}),
      this.preloadFonts(resources.fonts || []),
    ]);
  }
  
  updateProgress() {
    this.progress = (this.loaded.size / this.totalResources) * 100;
    window.dispatchEvent(new CustomEvent('resource-progress', {
      detail: { progress: this.progress }
    }));
  }
}

export default new ResourceLoader();
```

### 9-3. パフォーマンス監視

```javascript
// utils/PerformanceMonitor.js

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 60,
      frameTime: 0,
      memoryUsage: 0,
    };
    
    this.rafId = null;
    this.lastTime = performance.now();
    this.frames = [];
  }
  
  start() {
    this.measure();
  }
  
  measure() {
    const now = performance.now();
    const delta = now - this.lastTime;
    
    this.frames.push(delta);
    if (this.frames.length > 60) {
      this.frames.shift();
    }
    
    const avgFrameTime = this.frames.reduce((a, b) => a + b) / this.frames.length;
    this.metrics.fps = Math.round(1000 / avgFrameTime);
    this.metrics.frameTime = avgFrameTime;
    
    if (performance.memory) {
      this.metrics.memoryUsage = 
        Math.round(performance.memory.usedJSHeapSize / 1048576);
    }
    
    if (this.metrics.fps < 30) {
      console.warn('Low FPS detected:', this.metrics.fps);
      this.enablePerformanceMode();
    }
    
    this.lastTime = now;
    this.rafId = requestAnimationFrame(() => this.measure());
  }
  
  enablePerformanceMode() {
    document.body.classList.add('performance-mode');
  }
  
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

export default new PerformanceMonitor();
```

```css
/* パフォーマンスモード */
.performance-mode .book-card {
  transition: none !important;
}

.performance-mode .particles {
  display: none !important;
}

.performance-mode .effect-layer {
  display: none !important;
}
```

---

## 10. ファイル構成

```
grimoire-guardians/
├── index.html
├── manifest.json
├── sw.js
│
├── core/
│   ├── QuestGen.js
│   ├── SaveManager.js
│   ├── GameStore.js          ← NEW: 状態管理
│   ├── SoundManager.js        ← NEW: サウンド管理
│   ├── ResourceLoader.js      ← NEW: リソースプリロード
│   └── ProgressTracker.js
│
├── utils/
│   ├── HapticFeedback.js     ← NEW: 振動フィードバック
│   ├── PerformanceMonitor.js ← NEW: パフォーマンス監視
│   ├── TouchRipple.js        ← NEW: タッチリップル
│   └── ViewportFix.js        ← NEW: vh補正
│
├── components/
│   ├── BookCard.js
│   ├── QuizButton.js
│   ├── CharacterDisplay.js
│   └── ProgressBar.js
│
├── effects/
│   ├── SlashEffect.js
│   ├── DefeatEffect.js
│   └── ParticleSystem.js     ← NEW: パーティクル
│
├── screens/
│   ├── BookshelfScreen.js
│   ├── QuizScreen.js
│   ├── ResultScreen.js
│   └── LoadingScreen.js      ← NEW: ロード画面
│
├── styles/
│   ├── common.css
│   ├── layout.css
│   ├── components.css
│   ├── effects.css
│   ├── accessibility.css     ← NEW: アクセシビリティ
│   └── performance.css       ← NEW: パフォーマンスモード
│
├── data/
│   ├── math-grade1.js
│   └── subjects.js
│
└── assets/
    ├── characters/
    ├── sounds/               ← NEW: サウンドファイル
    └── fonts/
```

---

## 改善サマリー (v1.0 → v1.1)

| 改善項目 | 効果 | 実装コスト | Phase |
|---------|------|----------|-------|
| **アクセシビリティ対応** | 全ての子供が使える | 低 | Phase 0 |
| **タッチ最適化** | タブレットで快適 | 中 | Phase 0 |
| **Juice強化** | 気持ちよさ3倍 | 低 | Phase 0 |
| **サウンドシステム** | 没入感向上 | 中 | Phase 0 |
| **状態管理** | バグ激減 | 中 | Phase 0 |
| **ハプティック** | 体感フィードバック | 低 | Phase 0 |
| **プリロード戦略** | 起動高速化 | 中 | Phase 0 |
| **パフォーマンス監視** | 古い端末でも快適 | 低 | Phase 0 |

---

## ステータス

**本UI設計書v1.1は Phase 0 の確定版として凍結する。**

変更は以下の場合のみ許可:
1. 致命的なバグ発見時
2. 子供のユーザーテストで重大な問題発覚時
3. プロジェクトオーナーの明示的な指示

---

**次のドキュメント:**
- 統合仕様書 v1.1
- AI指示書 v1.0

**作成日:** 2026-02-15  
**最終更新:** 2026-02-15  
**バージョン:** 1.1  
**ステータス:** 確定版
