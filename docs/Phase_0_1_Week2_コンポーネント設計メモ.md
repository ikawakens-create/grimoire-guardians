# Phase 0.1 Week 2 - コンポーネント設計メモ（統合版）

**作成日:** 2026-02-15  
**対象:** BookCard.js & ProgressBar.js  
**品質基準:** 商品化レベル  
**レビュー:** Gemini承認済み

---

## 📋 目次

1. [概要](#概要)
2. [BookCard.js 設計](#bookcard-js-設計)
3. [ProgressBar.js 設計](#progressbar-js-設計)
4. [実装チェックリスト](#実装チェックリスト)

---

## 概要

### Week 2 タスク

```yaml
優先度1: コンポーネント作成
  ✅ BookCard.js - 本棚のカードコンポーネント
  ✅ ProgressBar.js - 進捗バーコンポーネント

設計完了日: 2026-02-15
設計環境: Android（設計段階）
実装環境: PC（Claude Code Web版）
```

### 設計方針

```yaml
共通要件:
  ✅ 商品レベルの品質
  ✅ nanobanaで画像差し替え可能
  ✅ 触りやすい（タッチ最適化）
  ✅ 見やすい（可読性確保）
  ✅ アクセシビリティ対応
  ✅ パフォーマンス最適化

技術原則:
  ✅ Pure JavaScript（フレームワーク不使用）
  ✅ TypeValidator で型安全性
  ✅ GPU加速（will-change, transform）
  ✅ 60fps維持
```

---

## BookCard.js 設計

### ファイルパス
```
src/components/BookCard.js
```

### 依存関係
```javascript
import TypeValidator from '../utils/TypeValidator.js';
import GameStore from '../core/GameStore.js';
import Logger from '../core/Logger.js';
import SoundManager from '../core/SoundManager.js';
import { SoundType } from '../core/SoundManager.js';
```

### データ構造

```javascript
const bookCardData = {
  id: 'world_1',
  title: 'なかまづくりと かず',
  
  // 画像パス（nanobanaで差し替え可能）
  assets: {
    icon: 'assets/icons/worlds/world_1.png',           // 256x256px
    iconLocked: 'assets/icons/worlds/world_1_locked.png',
    background: 'assets/icons/worlds/world_1_bg.png',  // オプション
    badge: 'assets/icons/badges/cleared.png'           // オプション
  },
  
  difficulty: 1,        // 1-5
  totalQuestions: 15,
  
  progress: {
    cleared: false,
    score: 0,
    maxScore: 15,
    percentage: 0      // 0-100
  },
  
  locked: false,
  
  // テーマカラー
  theme: {
    primaryColor: '#4A90E2',
    secondaryColor: '#50C878',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  }
};
```

### 主要メソッド

```javascript
class BookCard {
  constructor(data, container, onClick)
  render()                    // カード生成・描画
  updateProgress(newProgress) // 進捗更新
  setLocked(locked)           // ロック状態変更
  destroy()                   // クリーンアップ
  
  // プライベート
  _setupEvents(card)          // イベント設定（Debounce付き）
  _createRipple(event, card)  // タッチリップル
}
```

### 重要な実装詳細

#### 1. 画像エラーハンドリング

```javascript
<img 
  class="book-card-icon-image" 
  src="${this.data.locked ? 
        this.data.assets.iconLocked : 
        this.data.assets.icon}"
  alt="${this.data.title}"
  loading="lazy"
  onerror="this.parentElement.classList.add('image-error'); 
           this.parentElement.classList.remove('loading'); 
           this.style.display='none';"
  onload="this.parentElement.classList.remove('loading');"
/>

<!-- フォールバックアイコン -->
<div class="book-card-icon-fallback">
  📘
</div>
```

**CSS:**
```css
.book-card-icon-fallback {
  display: none;
}

.book-card-icon-wrapper.image-error .book-card-icon-fallback {
  display: block;
  animation: fade-in 0.3s ease-out;
}
```

#### 2. ローディング状態（スケルトンUI）

```css
.book-card-icon-skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### 3. Debounce処理（連打防止）

```javascript
_setupEvents(card) {
  if (this.data.locked) {
    card.setAttribute('aria-disabled', 'true');
    return;
  }
  
  let isActivating = false;
  
  const handleActivation = (e) => {
    // Debounce: 連打防止
    if (isActivating) {
      Logger.debug('[BookCard] Click ignored (debouncing)');
      return;
    }
    isActivating = true;
    
    this._createRipple(e, card);
    SoundManager.playSFX(SoundType.BUTTON_CLICK);
    
    setTimeout(() => {
      this.onClick(this.data);
      
      // 300ms後に再度クリック可能
      setTimeout(() => {
        isActivating = false;
      }, 300);
    }, 150);
  };
  
  // クリック
  card.addEventListener('click', handleActivation);
  
  // キーボード（アクセシビリティ）
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivation(e);
    }
  });
}
```

#### 4. アクセシビリティ

```javascript
card.setAttribute('tabindex', '0');
card.setAttribute('role', 'button');
card.setAttribute('aria-label', `${this.data.title}を開く`);

// ロック時
if (this.data.locked) {
  card.setAttribute('aria-disabled', 'true');
}
```

```css
.book-card:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
}
```

### nanobanaでの画像差し替え手順

1. 新しい画像を256x256pxに調整（PNG推奨）
2. `assets/icons/worlds/world_N.png` を上書き
3. コード変更不要（自動的に反映）

**推奨フォーマット:**
- サイズ: 256x256px
- 形式: PNG（透過対応）
- 容量: 50KB以下推奨

---

## ProgressBar.js 設計

### ファイルパス
```
src/components/ProgressBar.js
```

### 依存関係
```javascript
import Logger from '../core/Logger.js';
import TypeValidator from '../utils/TypeValidator.js';
```

### データ構造

```javascript
const progressBarConfig = {
  // 必須
  percentage: 75,              // 0-100
  container: HTMLElement,      // 描画先
  
  // オプション
  showPercentage: true,        // パーセント表示
  showLabel: false,            // ラベル表示
  label: '',                   // ラベルテキスト
  
  // スタイル
  height: 12,                  // 高さ（px）
  color: null,                 // カスタムカラー（nullでグラデーション）
  backgroundColor: 'var(--bg-primary)',
  borderRadius: 6,             // 角丸（px）
  
  // アニメーション
  animated: true,              // アニメーション有効
  animationDuration: 600,      // アニメーション時間（ms）
  
  // 特殊
  showGlow: true,              // 100%時の光沢
  showStars: true              // 100%時の星エフェクト
};
```

### 主要メソッド

```javascript
class ProgressBar {
  constructor(config)
  render()                      // 進捗バー生成・描画
  updatePercentage(newPercentage) // アニメーション付き更新
  reset()                       // 0%にリセット
  destroy()                     // クリーンアップ
  
  // プライベート
  _animateProgress(from, to)    // アニメーション実行
  _setProgress(percentage)      // 即座に設定
  _showCompletionEffect()       // 100%達成演出
  _easeOutCubic(t)              // イージング関数
}
```

### 重要な実装詳細

#### 1. アニメーション競合防止（Gemini指摘）

```javascript
_animateProgress(from, to) {
  // 既存のアニメーションをキャンセル
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    Logger.debug('[ProgressBar] Cancelled previous animation');
  }
  
  const duration = this.config.animationDuration;
  const startTime = performance.now();
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const eased = this._easeOutCubic(progress);
    const currentValue = from + (to - from) * eased;
    
    this._setProgress(currentValue);
    
    if (progress < 1) {
      this.animationFrameId = requestAnimationFrame(animate);
    } else {
      // アニメーション完了
      this.animationFrameId = null;
      this._setProgress(to);
      
      // 100%達成演出はアニメーション完了後（Gemini指摘）
      if (to === 100 && this.config.showGlow) {
        this._showCompletionEffect();
      }
    }
  };
  
  this.animationFrameId = requestAnimationFrame(animate);
}
```

**効果:**
- 連続してupdatePercentage()が呼ばれてもバーがガタつかない
- クイズで連続正解してスコアが急増しても安定

#### 2. カウントアップ演出（Gemini指摘）

```javascript
_setProgress(percentage) {
  const rounded = Math.round(percentage);
  
  // バーの幅を更新
  this.fillElement.style.width = `${percentage}%`;
  this.fillElement.setAttribute('aria-valuenow', rounded);
  
  // パーセント表示を更新（リアルタイムカウントアップ）
  if (this.percentageElement) {
    this.percentageElement.textContent = `${rounded}%`;
  }
  
  // 100%時は特別な色
  if (rounded === 100) {
    this.fillElement.style.background = 
      'linear-gradient(90deg, #FFD700, #FFA500)';
    this.fillElement.classList.add('completed');
  }
}
```

**効果:**
- 70% → 80%が「70...71...72...80%」とカウントアップ
- RPG風の経験値バーのような「溜まっている感」
- 実装コストほぼゼロで効果絶大

#### 3. 100%達成演出

```javascript
_showCompletionEffect() {
  const starsContainer = this.element.querySelector('.progress-bar-stars');
  if (!starsContainer) return;
  
  Logger.info('[ProgressBar] 100% achieved! ✨');
  
  // 星を生成
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.textContent = '✨';
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 0.3}s`;
      
      starsContainer.appendChild(star);
      
      // 1秒後に削除
      setTimeout(() => star.remove(), 1000);
    }, i * 100);
  }
}
```

```css
@keyframes star-rise {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-30px) scale(1);
    opacity: 0;
  }
}
```

#### 4. メモリリーク防止

```javascript
destroy() {
  // アニメーションをキャンセル（メモリリーク防止）
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
    Logger.debug('[ProgressBar] Animation cancelled on destroy');
  }
  
  // DOM要素を削除
  if (this.element) {
    this.element.remove();
    this.element = null;
    this.fillElement = null;
    this.percentageElement = null;
  }
}
```

### 使用例

#### BookCard内での使用

```javascript
import ProgressBar from '../components/ProgressBar.js';

render() {
  // ... カード生成 ...
  
  const progressContainer = card.querySelector('.book-card-progress');
  
  this.progressBar = new ProgressBar({
    percentage: this.data.progress.percentage,
    container: progressContainer,
    showPercentage: true,
    height: 12,
    showGlow: true,
    showStars: true
  });
  
  this.progressBar.render();
}

updateProgress(newProgress) {
  this.data.progress = newProgress;
  this.progressBar.updatePercentage(newProgress.percentage);
}
```

#### QuizScreen内での使用

```javascript
import ProgressBar from '../components/ProgressBar.js';

render() {
  this.questionProgress = new ProgressBar({
    percentage: 0,
    container: document.querySelector('.quiz-header'),
    showPercentage: false,
    showLabel: true,
    label: '問題1 / 15',
    height: 8,
    color: 'var(--color-secondary)'
  });
  
  this.questionProgress.render();
}

nextQuestion() {
  const currentIndex = GameStore.getState('currentSession.currentQuestionIndex');
  const totalQuestions = GameStore.getState('currentSession.questions').length;
  const percentage = ((currentIndex + 1) / totalQuestions) * 100;
  
  this.questionProgress.updatePercentage(percentage);
}
```

---

## 実装チェックリスト

### BookCard.js

```yaml
基本実装:
  - [ ] constructor実装
  - [ ] render()実装
  - [ ] updateProgress()実装
  - [ ] setLocked()実装
  - [ ] destroy()実装

画像関連:
  - [ ] ローディングスケルトン実装
  - [ ] エラーハンドリング実装
  - [ ] フォールバックアイコン実装
  - [ ] loading="lazy"設定

インタラクション:
  - [ ] Debounce処理実装
  - [ ] タッチリップル実装
  - [ ] キーボード操作実装
  - [ ] ホバーエフェクト実装

アクセシビリティ:
  - [ ] tabindex="0"設定
  - [ ] role="button"設定
  - [ ] aria-label設定
  - [ ] aria-disabled設定（ロック時）
  - [ ] focus-visible対応

スタイル:
  - [ ] .book-card基本スタイル
  - [ ] .book-card.locked
  - [ ] .book-card.cleared
  - [ ] .book-card-icon-wrapper
  - [ ] .book-card-icon-skeleton
  - [ ] .book-card-icon-fallback
  - [ ] .text-shadow-overlay
  - [ ] リップルエフェクト

テスト:
  - [ ] 通常表示テスト
  - [ ] ロック状態テスト
  - [ ] 画像エラーテスト
  - [ ] 連打テスト（Debounce）
  - [ ] キーボード操作テスト
```

### ProgressBar.js

```yaml
基本実装:
  - [ ] constructor実装
  - [ ] render()実装
  - [ ] updatePercentage()実装
  - [ ] reset()実装
  - [ ] destroy()実装

アニメーション:
  - [ ] _animateProgress()実装
  - [ ] cancelAnimationFrame処理
  - [ ] requestAnimationFrame使用
  - [ ] イージング関数実装

カウントアップ:
  - [ ] リアルタイム数値更新
  - [ ] Math.round()で整数表示

完了演出:
  - [ ] _showCompletionEffect()実装
  - [ ] 星エフェクト実装
  - [ ] 100%時の金色グラデーション
  - [ ] アニメーション完了後に実行

メモリ管理:
  - [ ] animationFrameId管理
  - [ ] destroy()でキャンセル
  - [ ] DOM要素削除

スタイル:
  - [ ] .progress-bar-wrapper
  - [ ] .progress-bar-container
  - [ ] .progress-bar-fill
  - [ ] .progress-bar-shine（光沢）
  - [ ] .progress-bar-stars
  - [ ] .star-particle
  - [ ] progress-glow アニメーション
  - [ ] star-rise アニメーション

テスト:
  - [ ] 0%から100%アニメーション
  - [ ] 連続更新テスト（競合防止）
  - [ ] 100%達成演出テスト
  - [ ] destroy()テスト
  - [ ] カウントアップ動作確認
```

---

## 実装時の注意点

### BookCard.js

```yaml
重要:
  ✅ 画像パスは正確に（assets/icons/worlds/）
  ✅ Debounce処理は必須（子供の連打対策）
  ✅ キーボード操作は必ず実装（アクセシビリティ）
  ✅ エラーハンドリングは堅牢に

推奨:
  ✅ TypeValidatorで型検証
  ✅ Loggerでデバッグ情報出力
  ✅ GPU加速（will-change, transform）

避けるべき:
  ❌ 絵文字をハードコード（画像ベース）
  ❌ イベントリスナーのメモリリーク
  ❌ ロック時のクリック処理
```

### ProgressBar.js

```yaml
重要:
  ✅ animationFrameIdを必ず管理
  ✅ cancelAnimationFrameで競合防止
  ✅ 完了演出はアニメーション完了後
  ✅ destroy()でクリーンアップ

推奨:
  ✅ requestAnimationFrameを使用（CSS transitionより制御しやすい）
  ✅ イージング関数でなめらかに
  ✅ 100%時の特別演出

避けるべき:
  ❌ CSS transitionのみ（タイミング制御が困難）
  ❌ setIntervalの使用（パフォーマンス悪い）
  ❌ アニメーション中のdestroy()未対応
```

---

## レビュー履歴

```yaml
v1.0 - Claude初版:
  - BookCard.js基本設計
  - ProgressBar.js基本設計

v1.1 - Gemini指摘反映:
  BookCard.js:
    - 画像エラーハンドリング追加
    - 可読性向上（text-shadow）
    - アクセシビリティ強化
    - Debounce処理追加
  
  ProgressBar.js:
    - アニメーション競合防止
    - カウントアップ演出追加
    - 完了イベントタイミング修正

v1.2 - Claude改善:
  BookCard.js:
    - ローディング状態追加（スケルトンUI）
  
  ProgressBar.js:
    - destroy()クリーンアップ強化
```

---

## 次のステップ

```yaml
PC作業時:
  1. src/components/BookCard.js作成
  2. src/components/ProgressBar.js作成
  3. CSS追加（src/styles/components.css）
  4. 動作確認
  
確認事項:
  - 画像パスが正しいか
  - アニメーションがスムーズか
  - アクセシビリティが機能するか
  - メモリリークがないか

次のタスク（Week 2後半）:
  - BookshelfScreen.js実装
  - QuizScreen.js実装
```

---

**作成日:** 2026-02-15  
**設計者:** Claude  
**レビュアー:** Gemini, Human  
**ステータス:** 設計完了・実装待ち

**Happy Coding! 🎮📚**
