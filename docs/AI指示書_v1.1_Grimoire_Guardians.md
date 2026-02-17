# 📋 AI指示書 v1.1
## Grimoire Guardians - Claude Code 運用マニュアル (Gemini改善版)

**バージョン:** 1.1  
**最終更新:** 2026-02-15  
**ステータス:** 確定版(Phase 0基準)  
**対象AI:** Claude Code (CLI/Web両対応)  
**前提ドキュメント:** UI設計書v1.1, 統合仕様書v1.1  
**改訂理由:** Gemini指摘事項の全面反映 + プロフェッショナル強化

---

## 🎯 このドキュメントの目的

このドキュメントは、**Claude Code(AI)が一切の迷いなく、正確で一貫性のあるコードを生成するための完全マニュアル**です。

### v1.1での主要改善点

```
v1.0 → v1.1 の変更:

✅ GameStore実装テンプレート追加(タイムトラベル対応)
✅ Phase 0モック戦略の明確化
✅ JSDoc型定義の厳格化(@ts-check必須)
✅ Claude Code (CLI) 特化の相対パス規則
✅ featuresディレクトリ構造(Phase 1対応)
✅ ErrorBoundaryパターンの標準化
✅ テンプレートにコンテキスト読み込み指示
✅ デバッグモードの環境分離
✅ 実行時型チェック機構
✅ モック実装の体系化
```

---

## 📚 目次

1. [Phase 0 適用ルール(改訂版)](#1-phase-0-適用ルール改訂版)
2. [コーディング規約(完全版v1.1)](#2-コーディング規約完全版v11)
3. [標準実装テンプレート集](#3-標準実装テンプレート集)
4. [禁止事項マトリックス](#4-禁止事項マトリックス)
5. [ファイル命名規則](#5-ファイル命名規則)
6. [指示テンプレート集(Claude Code特化)](#6-指示テンプレート集claude-code特化)
7. [レビューチェックリスト](#7-レビューチェックリスト)
8. [トラブルシューティング完全版](#8-トラブルシューティング完全版)
9. [用語集(初心者向け)](#9-用語集初心者向け)

---

## 1. Phase 0 適用ルール(改訂版)

### 1-1. Phase 0 とは

```
Phase 0 = 最小実装(MVP: Minimum Viable Product)

含まれる機能:
✅ 算数1年生のみ(World1〜6)
✅ 計算問題のみ
✅ 本棚画面
✅ 問題画面
✅ 結果画面
✅ クリア演出
✅ セーブ/ロード
✅ SoundManagerクラス(実装するが音は鳴らさない=モック)
✅ HapticFeedbackクラス(実装するが振動しない=モック)

含まれない機能(Phase 1以降):
❌ 図形・画像・筆記問題
❌ きおくのいせき
❌ スキンシステム
❌ 家ビルド
❌ 他教科
❌ 実際の音声再生
❌ 実際の振動
```

### 1-2. Phase 0 での技術制約とモック戦略

| 項目 | Phase 0 | 実装方法 | Phase 1〜 |
|------|---------|---------|-----------|
| **フレームワーク** | 禁止 | Pure JS | 禁止継続 |
| **外部ライブラリ** | 禁止 | Vanilla JS | 限定許可 |
| **Three.js** | 禁止 | CSS Animation | 検討可 |
| **画像ファイル** | 絵文字のみ | 📘📗📙 | カスタム画像OK |
| **サウンド** | **モック実装** | `console.log('♪ success')` | 実音声再生 |
| **振動** | **モック実装** | `console.log('📳 vibrate')` | 実振動 |
| **Container Queries** | 禁止 | @media のみ | 許可 |
| **IndexedDB** | SaveManager経由 | 抽象化必須 | 同様 |

**【重要】モック実装の方針:**

```javascript
// ✅ Phase 0 での正解例: SoundManager (モック)
class SoundManager {
  static play(soundKey, options = {}) {
    // Phase 0: 実際には鳴らさず、ログ出力のみ
    console.log(`🔊 [Sound] ${soundKey}`, options);
    
    // Phase 1以降: この部分を実装に置き換え
    // const audio = new Audio(`./assets/sounds/${soundKey}.mp3`);
    // audio.play();
  }
}

// ✅ Phase 0 での正解例: HapticFeedback (モック)
class HapticFeedback {
  static light() {
    console.log('📳 [Haptic] light');
    // Phase 1: navigator.vibrate(10);
  }
  
  static success() {
    console.log('📳 [Haptic] success (pattern: 10-50-10)');
    // Phase 1: navigator.vibrate([10, 50, 10]);
  }
}

// ❌ Phase 0 での間違い: 実装しようとする
class SoundManager {
  static async init() {
    this.audioContext = new AudioContext(); // エラーになる
    await this.loadSounds({ ... }); // ファイルがないのでエラー
  }
}

理由:
- Phase 0ではアセット(音声ファイル)が未整備
- インターフェース(API)だけ先に決めておく
- Phase 1で実装に置き換えるだけで済む
```

### 1-3. Claude Code (CLI/Web) 特化ルール

```
【重要】Claude Codeはファイルシステムに直接アクセス可能

指示を出す際の絶対ルール:
1. パスは必ずプロジェクトルートからの相対パスで指定
2. 関連ファイルの明示的な読み込み指示
3. 依存関係の自動解析を活用

プロジェクトルート = package.json がある場所
(本プロジェクトではindex.htmlがある場所)

例:
❌ 悪い指示:
「BookCardを作って」
→ どこに? 何を参照して? が不明

✅ 良い指示:
【コンテキスト読み込み】
- docs/UI設計書_v1.1.md (セクション5-2を参照)
- docs/AI指示書_v1.1.md (コーディング規約を確認)
- src/styles/components.css (スタイル定義を確認)

【作成ファイル】
src/components/BookCard.js

【依存関係】
- src/utils/TouchRipple.js (リップル機能)
- src/core/GameStore.js (状態管理)
- src/utils/TypeValidator.js (型検証)

理由:
- AIが確実に正しいファイルを読める
- 依存関係が明確になる
- コンテキストが正確に伝わる
```

---

## 2. コーディング規約(完全版v1.1)

### 2-1. JavaScript 基本原則

#### 原則1: Pure JavaScript のみ

```javascript
// ✅ 許可: Pure JavaScript
const button = document.querySelector('.answer-btn');
button.addEventListener('click', handleClick);

// ❌ 禁止: jQuery
$('.answer-btn').click(handleClick);

// ❌ 禁止: React
<button onClick={handleClick}>答える</button>

理由:
- 長期的なメンテナンス性
- ライブラリのバージョンアップリスクを排除
- 軽量化(Phase 0では特に重要)
- 学習コストの削減
```

#### 原則2: モジュール分割 + 型安全性(二重防御)

```javascript
// ✅ 良い例: export/import + JSDoc型定義 + @ts-check + 実行時検証
// BookCard.js
// @ts-check ← VSCodeでの型チェック有効化(必須)

import { TypeValidator } from '../utils/TypeValidator.js';

/**
 * 本のカードコンポーネント
 * @class BookCard
 */
export class BookCard {
  /**
   * @param {string} subject - 教科ID ('math', 'japanese')
   * @param {string} worldId - World ID ('world1'〜'world6')
   * @param {number} progress - 進捗率(0-100)
   * @throws {TypeError} progressが数値でない場合
   * @throws {RangeError} progressが0-100の範囲外の場合
   */
  constructor(subject, worldId, progress) {
    // 実行時型チェック(二重防御)
    TypeValidator.assertEnum(
      subject,
      ['math', 'japanese', 'science', 'social', 'english'],
      'subject'
    );
    TypeValidator.assertNumberInRange(progress, 0, 100, 'progress');
    
    this.subject = subject;
    this.worldId = worldId;
    this.progress = progress;
  }
}

// ❌ 悪い例: 型チェックなし
export class BookCard {
  constructor(subject, worldId, progress) {
    this.progress = progress; // 文字列"60"が入っても気づかない
  }
}

理由:
- @ts-check: 開発時に型エラーを検出(VSCode上で)
- JSDoc: 型情報をコメントとして記述
- 実行時検証: ブラウザで実行時に型を確認
- 二重防御で型安全性を最大化
```

**【新規追加】型安全性ヘルパー:**

```javascript
// src/utils/TypeValidator.js
// @ts-check

/**
 * 実行時型バリデーションヘルパー
 * Phase 0では最小限の型チェックを実装
 * 
 * @class TypeValidator
 */
export class TypeValidator {
  /**
   * 数値の範囲チェック
   * @param {number} value 
   * @param {number} min 
   * @param {number} max 
   * @param {string} name 
   * @throws {TypeError} 数値でない場合
   * @throws {RangeError} 範囲外の場合
   */
  static assertNumberInRange(value, min, max, name = 'value') {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError(
        `${name} must be a number, got ${typeof value} (${value})`
      );
    }
    if (value < min || value > max) {
      throw new RangeError(
        `${name} must be ${min}-${max}, got ${value}`
      );
    }
  }
  
  /**
   * 文字列の列挙チェック
   * @param {string} value 
   * @param {string[]} allowedValues 
   * @param {string} name 
   * @throws {TypeError} 文字列でない場合
   * @throws {Error} 許可されていない値の場合
   */
  static assertEnum(value, allowedValues, name = 'value') {
    if (typeof value !== 'string') {
      throw new TypeError(
        `${name} must be a string, got ${typeof value}`
      );
    }
    if (!allowedValues.includes(value)) {
      throw new Error(
        `${name} must be one of [${allowedValues.join(', ')}], got "${value}"`
      );
    }
  }
  
  /**
   * 必須チェック(null/undefined禁止)
   * @param {*} value 
   * @param {string} name 
   * @throws {Error} null/undefinedの場合
   */
  static assertRequired(value, name = 'value') {
    if (value === null || value === undefined) {
      throw new Error(`${name} is required, got ${value}`);
    }
  }
  
  /**
   * 配列チェック
   * @param {*} value 
   * @param {string} name 
   * @throws {TypeError} 配列でない場合
   */
  static assertArray(value, name = 'value') {
    if (!Array.isArray(value)) {
      throw new TypeError(
        `${name} must be an array, got ${typeof value}`
      );
    }
  }
}
```

#### 原則3: UI設計書への完全準拠

```javascript
// ✅ 良い例: CSS変数を使う
const button = document.createElement('button');
button.className = 'answer-btn'; // CSSで定義済み

// スタイルを直接触る必要がある場合も変数を使う
button.style.setProperty('--dynamic-width', '100%');

// ❌ 悪い例: 直接スタイル指定
const button = document.createElement('button');
button.style.fontSize = '32px'; // 設計書の値と乖離する
button.style.padding = '24px 32px'; // CSS変数を使うべき

理由:
- デザインの一貫性
- 後からの変更が容易
- 設計書が唯一の真実(Single Source of Truth)
- レスポンシブ対応が簡単
```

### 2-2. デバッグモードの標準化(新規追加)

```javascript
// src/core/Config.js
// @ts-check

/**
 * 環境設定クラス
 * Phase 0では開発モードを常時ONにする
 * 
 * @class Config
 */
export class Config {
  static ENV = 'development'; // 'development' | 'production'
  
  /**
   * 開発モードかどうか
   * @returns {boolean}
   */
  static get isDevelopment() {
    return this.ENV === 'development';
  }
  
  /**
   * 本番モードかどうか
   * @returns {boolean}
   */
  static get isProduction() {
    return this.ENV === 'production';
  }
  
  /**
   * 本番モードに切り替え
   * (ビルド時に呼ばれる想定)
   */
  static setProduction() {
    this.ENV = 'production';
  }
}
```

```javascript
// src/core/Logger.js
// @ts-check

import { Config } from './Config.js';

/**
 * デバッグロガー
 * Phase 0では全ログを出力
 * 本番環境では最小限のログのみ
 * 
 * @class Logger
 */
export class Logger {
  /**
   * 通常ログ(開発時のみ)
   * @param {...any} args 
   */
  static log(...args) {
    if (Config.isDevelopment) {
      console.log('[LOG]', new Date().toISOString(), ...args);
    }
  }
  
  /**
   * 警告ログ(開発時のみ)
   * @param {...any} args 
   */
  static warn(...args) {
    if (Config.isDevelopment) {
      console.warn('[WARN]', new Date().toISOString(), ...args);
    }
  }
  
  /**
   * エラーログ(常に出力)
   * @param {...any} args 
   */
  static error(...args) {
    console.error('[ERROR]', new Date().toISOString(), ...args);
  }
  
  /**
   * デバッグログ(開発時のみ、詳細情報)
   * @param {...any} args 
   */
  static debug(...args) {
    if (Config.isDevelopment) {
      console.debug('[DEBUG]', new Date().toISOString(), ...args);
    }
  }
  
  /**
   * グループログ開始
   * @param {string} label 
   */
  static group(label) {
    if (Config.isDevelopment) {
      console.group(`[GROUP] ${label}`);
    }
  }
  
  /**
   * グループログ終了
   */
  static groupEnd() {
    if (Config.isDevelopment) {
      console.groupEnd();
    }
  }
}

// 使用例
Logger.debug('BookCard rendered', { subject: 'math', progress: 60 });
// 開発時: [DEBUG] 2026-02-15T12:34:56.789Z BookCard rendered { subject: 'math', progress: 60 }
// 本番時: (何も出力されない)
```

### 2-3. 変数・関数の命名規則

#### 変数名

```javascript
// ✅ 良い例: 意味が明確
const currentQuestionIndex = 0;
const playerScore = 0;
const isGameActive = true;
const maxQuestionsPerWorld = 5;

// ❌ 悪い例: 略語・曖昧
const idx = 0;           // 何のindex?
const score = 0;         // 誰のscore?
const flag = true;       // 何のflag?
const max = 5;           // 何のmax?

// 📝 命名パターン
const [名詞] = ...;                    // 単純な値
const [is/has/can][形容詞] = ...;      // Boolean
const [動詞][名詞] = function() {...}; // 関数
const [名詞]Manager = ...;             // 管理クラス
const [名詞]Helper = ...;              // ヘルパークラス
const [名詞]Validator = ...;           // 検証クラス
```

#### 定数名

```javascript
// ✅ 良い例: 大文字スネークケース
const MAX_QUESTIONS_PER_WORLD = 5;
const DEFAULT_TIME_LIMIT_SECONDS = 300;
const PASSING_SCORE_PERCENTAGE = 60;
const AVAILABLE_SUBJECTS = ['math', 'japanese', 'science', 'social', 'english'];

// ❌ 悪い例
const maxQuestions = 5;  // 変数と区別がつかない
const TimeLimit = 300;   // 命名規則が不統一

理由:
- 定数であることが一目で分かる
- 変数との区別が明確
- 後から変更が必要かどうかの判断材料
```

#### 関数名

```javascript
// ✅ 良い例: 動詞で始まる
function updateScore(newScore) { }
function calculateProgress(completed, total) { }
function isQuizCompleted() { }
function getNextQuestion() { }
function setPlayerName(name) { }
function validateAnswer(answer) { }
function renderBookCard(data) { }

// ❌ 悪い例
function score(newScore) { }      // 動詞がない
function progress() { }           // 何をする?
function completed() { }          // 判定?取得?
function question() { }           // 曖昧

// 📝 命名パターン
get[名詞]        - 取得
set[名詞]        - 設定
is[形容詞]       - 真偽判定
has[名詞]        - 所持判定
can[動詞]        - 可能性判定
calculate[名詞]  - 計算
update[名詞]     - 更新
render[名詞]     - 描画
validate[名詞]   - 検証
init[名詞]       - 初期化
destroy[名詞]    - 破棄
```

#### クラス名

```javascript
// ✅ 良い例: PascalCase、名詞
class BookCard { }
class QuizScreen { }
class SoundManager { }
class GameStore { }
class TypeValidator { }
class ErrorBoundary { }

// ❌ 悪い例
class bookCard { }        // 小文字始まり
class quiz_screen { }     // スネークケース
class ManageSound { }     // 動詞始まり
class Util { }            // 曖昧

理由:
- クラスは「もの」なので名詞
- PascalCaseで関数と区別
- 役割が明確な名前
```

### 2-4. コメント規約

```javascript
// ✅ 良い例: 「なぜ」を説明
// iOS Safariではvhがアドレスバーで変動するため動的に補正
function setVhProperty() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// タッチデバイスではhoverが機能しないためリップルエフェクトで代替
class TouchRipple {
  static apply(element) { ... }
}

// Phase 0ではモック実装。Phase 1以降で実装に置き換え予定
class SoundManager {
  static play(soundKey) {
    console.log(`🔊 [Sound] ${soundKey}`);
  }
}

// ❌ 悪い例: コードを読めば分かることを書く
// vhを設定する
function setVhProperty() { ... }

// リップルを適用
class TouchRipple { ... }

// 音を鳴らす
class SoundManager { ... }

// 📝 コメントのガイドライン
1. 「何を」は書かない(コードで明らか)
2. 「なぜ」を書く(意図・理由)
3. ハックや回避策は必ず説明
4. TODO/FIXMEは期限付きで
5. Phase情報を記載(将来の変更箇所を明示)
```

#### JSDoc形式(必須)

```javascript
/**
 * 本のカードコンポーネント
 * 
 * @class BookCard
 * @description 本棚画面で表示される本のカード。
 *              進捗バー、アイコン、タイトルを含む。
 *              タップでリップルエフェクト、
 *              画面内に入るとアニメーション。
 * 
 * @example
 * const card = new BookCard('math', 'world1', 60);
 * const element = card.render();
 * container.appendChild(element);
 * 
 * // 進捗更新
 * card.updateProgress(80);
 */
export class BookCard {
  /**
   * BookCardを作成
   * 
   * @param {string} subject - 教科ID ('math', 'japanese', 'science', 'social', 'english')
   * @param {string} worldId - World ID ('world1'〜'world6')
   * @param {number} progress - 進捗率(0-100)
   * @throws {TypeError} subjectが文字列でない場合
   * @throws {Error} subjectが許可されていない値の場合
   * @throws {TypeError} progressが数値でない場合
   * @throws {RangeError} progressが0-100の範囲外の場合
   */
  constructor(subject, worldId, progress) {
    // 実装
  }
  
  /**
   * カードのDOM要素を生成
   * 
   * @returns {HTMLElement} カードのDOM要素
   * @throws {Error} 既にrenderされている場合
   */
  render() {
    // 実装
  }
  
  /**
   * 進捗率を更新
   * 
   * @param {number} newProgress - 新しい進捗率(0-100)
   * @throws {RangeError} 範囲外の値の場合
   */
  updateProgress(newProgress) {
    // 実装
  }
  
  /**
   * イベントリスナーをクリーンアップ
   * メモリリーク防止のため、カードを削除する前に必ず呼ぶ
   */
  destroy() {
    // 実装
  }
}
```

### 2-5. 関数設計の原則

#### 単一責任の原則

```javascript
// ✅ 良い例: 1関数1責任
function updateScore(newScore) {
  store.setState({ quiz: { score: newScore } });
}

function playSuccessSound() {
  SoundManager.play('success');
}

function vibrateOnSuccess() {
  HapticFeedback.success();
}

function showSuccessAnimation() {
  // アニメーション処理
}

function onCorrectAnswer(score) {
  updateScore(score);
  playSuccessSound();
  vibrateOnSuccess();
  showSuccessAnimation();
}

// ❌ 悪い例: 1関数で全部やる
function onCorrectAnswer(score) {
  // スコア更新
  store.setState({ quiz: { score } });
  
  // 音を鳴らす
  SoundManager.play('success');
  
  // 振動
  HapticFeedback.success();
  
  // アニメーション
  document.querySelector('.score').classList.add('animate');
  setTimeout(() => {
    document.querySelector('.score').classList.remove('animate');
  }, 500);
  
  // データ保存
  SaveManager.save();
  
  // ← 1つの関数が多すぎる責任を持つ
}

理由:
- テストが容易(各関数を個別にテスト)
- 再利用しやすい
- バグの範囲が明確
- 後から修正しやすい
```

#### 早期リターン

```javascript
// ✅ 良い例: 早期リターンでネストを浅く
function checkAnswer(userAnswer, correctAnswer) {
  // ガード節(異常系を先に処理)
  if (!userAnswer) {
    Logger.warn('No answer provided');
    return false;
  }
  
  if (!correctAnswer) {
    Logger.error('No correct answer defined');
    return false;
  }
  
  if (typeof userAnswer !== typeof correctAnswer) {
    Logger.warn('Type mismatch', { userAnswer, correctAnswer });
  }
  
  // 正常系(メインロジック)
  return String(userAnswer) === String(correctAnswer);
}

// ❌ 悪い例: ネストが深い
function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer) {
    if (correctAnswer) {
      if (String(userAnswer) === String(correctAnswer)) {
        return true;
      } else {
        return false;
      }
    } else {
      Logger.error('No correct answer');
      return false;
    }
  } else {
    Logger.warn('No answer');
    return false;
  }
}

理由:
- 読みやすい
- ネストが浅い(最大2階層推奨)
- 異常系と正常系が分離
```

#### 関数の長さ制限

```
ルール: 1関数は最大50行まで

超えたら分割:
- 50〜100行: 警告(リファクタリング検討)
- 100行以上: 必ず分割

分割の判断基準:
1. 責任の数で判断(1つの責任=1つの関数)
2. コメントで「〜の処理」と書く箇所は別関数化
3. 同じコードの繰り返しは関数化

例:
// ❌ 100行の関数
function renderQuizScreen() {
  // ヘッダー部分の処理(30行)
  ...
  
  // 問題部分の処理(40行)
  ...
  
  // フッター部分の処理(30行)
  ...
}

// ✅ 責任ごとに分割
function renderQuizScreen() {
  renderHeader();
  renderQuestion();
  renderFooter();
}

function renderHeader() { ... } // 30行
function renderQuestion() { ... } // 40行
function renderFooter() { ... } // 30行
```

### 2-6. 非同期処理

```javascript
// ✅ 良い例: async/await + エラー処理
async function loadGameData() {
  try {
    Logger.debug('Loading game data...');
    
    const playerData = await SaveManager.load();
    const resources = await ResourceLoader.preloadAll({
      images: [...],
      sounds: {...}
    });
    
    Logger.debug('Game data loaded successfully');
    return { playerData, resources };
    
  } catch (error) {
    Logger.error('Failed to load game data:', error);
    
    // エラーを上位に伝播(呼び出し側で処理)
    throw error;
  }
}

// ✅ 良い例: 並列実行(高速化)
async function loadGameData() {
  try {
    // 同時に読み込み(直列より速い)
    const [playerData, resources] = await Promise.all([
      SaveManager.load(),
      ResourceLoader.preloadAll({...})
    ]);
    
    return { playerData, resources };
    
  } catch (error) {
    Logger.error('Failed to load game data:', error);
    throw error;
  }
}

// ❌ 悪い例: Promise then地獄
function loadGameData() {
  return SaveManager.load().then(playerData => {
    return ResourceLoader.preloadAll({...}).then(resources => {
      return { playerData, resources };
    }).catch(error => {
      console.error(error);
    });
  }).catch(error => {
    console.error(error);
  });
}

// ❌ 悪い例: エラー処理なし
async function loadGameData() {
  const playerData = await SaveManager.load(); // エラー時にクラッシュ
  const resources = await ResourceLoader.preloadAll({...});
  return { playerData, resources };
}

理由:
- try-catchでエラーを確実にキャッチ
- Promise.allで並列化(パフォーマンス向上)
- エラーログを残す(デバッグに必須)
```

---

## 3. 標準実装テンプレート集

### 3-1. GameStore (状態管理) - Gemini提案 + タイムトラベル強化版

```javascript
// src/core/GameStore.js
// @ts-check

import { Logger } from './Logger.js';
import { Config } from './Config.js';

/**
 * Phase 0用 軽量ステート管理クラス (Pub/Subパターン + タイムトラベル)
 * 
 * @class Store
 * @description 
 * このクラスをベースに状態管理を行うこと。
 * 複雑なライブラリ(Redux等)を使わず、このクラスで統一。
 * 
 * 特徴:
 * - Observerパターンでリアクティブ更新
 * - タイムトラベル(undo/redo)対応
 * - ミドルウェア対応(ログ、デバッグ用)
 * 
 * @example
 * const store = new Store({ score: 0 });
 * store.subscribe((state) => {
 *   console.log('Score:', state.score);
 * });
 * store.setState({ score: 10 }); // ログ: Score: 10
 */
export class Store {
  /**
   * @param {Object} initialState 初期状態
   * @param {Object} options オプション
   * @param {boolean} options.enableTimeTravel タイムトラベル有効化
   * @param {number} options.maxHistory 履歴の最大保持数
   */
  constructor(initialState, options = {}) {
    this.state = initialState;
    this.listeners = new Set();
    this.middleware = [];
    
    // タイムトラベル機能
    this.enableTimeTravel = options.enableTimeTravel || false;
    this.maxHistory = options.maxHistory || 50;
    this.history = this.enableTimeTravel ? [initialState] : [];
    this.currentIndex = 0;
  }

  /**
   * 状態を取得 (読み取り専用)
   * @returns {Object} 現在の状態のコピー
   */
  getState() {
    return JSON.parse(JSON.stringify(this.state)); // Deep copy
  }

  /**
   * 状態を更新し、リスナーに通知
   * @param {Object} newState 更新する状態の一部
   */
  setState(newState) {
    const prevState = this.getState();
    
    // ミドルウェア実行(前処理)
    this.middleware.forEach(fn => fn(prevState, newState));
    
    // 状態更新
    this.state = { ...this.state, ...newState };
    
    // タイムトラベル対応
    if (this.enableTimeTravel) {
      // 現在位置より後の履歴を削除(分岐を防ぐ)
      this.history = this.history.slice(0, this.currentIndex + 1);
      
      // 新しい状態を履歴に追加
      this.history.push(this.getState());
      
      // 最大履歴数を超えたら古いものを削除
      if (this.history.length > this.maxHistory) {
        this.history.shift();
      } else {
        this.currentIndex++;
      }
    }
    
    // リスナーに通知
    this.notify();
  }

  /**
   * リスナー登録
   * @param {Function} listener (state) => void
   * @returns {Function} unsubscribe関数
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener); // unsubscribe
  }

  /**
   * 全リスナーに通知
   */
  notify() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  /**
   * ミドルウェア追加
   * @param {Function} fn (prevState, newState) => void
   */
  use(fn) {
    this.middleware.push(fn);
  }

  /**
   * 状態を1つ前に戻す (Undo)
   * @returns {boolean} 成功したか
   */
  undo() {
    if (!this.enableTimeTravel) {
      Logger.warn('Time travel is not enabled');
      return false;
    }
    
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.state = this.history[this.currentIndex];
      this.notify();
      Logger.debug('Undo successful', { currentIndex: this.currentIndex });
      return true;
    }
    
    Logger.warn('No more history to undo');
    return false;
  }

  /**
   * 状態を1つ先に進める (Redo)
   * @returns {boolean} 成功したか
   */
  redo() {
    if (!this.enableTimeTravel) {
      Logger.warn('Time travel is not enabled');
      return false;
    }
    
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.state = this.history[this.currentIndex];
      this.notify();
      Logger.debug('Redo successful', { currentIndex: this.currentIndex });
      return true;
    }
    
    Logger.warn('No more history to redo');
    return false;
  }

  /**
   * デバッグ: 履歴を表示
   */
  debugHistory() {
    if (!this.enableTimeTravel) {
      Logger.warn('Time travel is not enabled');
      return;
    }
    
    console.table(this.history.map((state, index) => ({
      index,
      current: index === this.currentIndex ? '👉' : '',
      state: JSON.stringify(state).substring(0, 100) + '...'
    })));
  }
}

// グローバルストアのインスタンス化
const store = new Store(
  {
    // プレイヤー情報
    player: {
      name: '',
      currentWorld: null,
      currentQuestion: 0,
    },
    
    // 問題状態
    quiz: {
      questions: [],
      answers: [],
      score: 0,
      timeElapsed: 0,
    },
    
    // UI状態
    ui: {
      currentScreen: 'bookshelf',
      isAnimating: false,
    },
    
    // 設定
    settings: {
      soundEnabled: true,
      volume: 1.0,
    }
  },
  {
    enableTimeTravel: Config.isDevelopment, // 開発時のみタイムトラベル有効
    maxHistory: 50
  }
);

// デバッグミドルウェア(開発時のみ)
if (Config.isDevelopment) {
  store.use((prev, next) => {
    Logger.debug('State changed:', {
      prev: JSON.stringify(prev).substring(0, 100),
      next: JSON.stringify(next).substring(0, 100)
    });
  });
}

export default store;
```

### 3-2. ErrorBoundary (エラーハンドリング階層化)

```javascript
// src/core/ErrorBoundary.js
// @ts-check

import { Logger } from './Logger.js';

/**
 * エラーハンドリングの標準化クラス
 * 
 * @class ErrorBoundary
 * @description
 * Phase 0では、エラーを3段階で処理:
 * 1. 回復可能エラー → ユーザーに通知して継続
 * 2. 機能停止エラー → 該当機能を無効化して継続
 * 3. 致命的エラー → アプリ全体を停止
 */
export class ErrorBoundary {
  /**
   * 回復可能エラーの処理
   * @param {Error} error 
   * @param {string} context エラーが発生した場所
   */
  static handleRecoverable(error, context) {
    Logger.error(`[Recoverable] ${context}:`, error);
    
    // ユーザーに通知
    this.showErrorToast(`エラーが発生しましたが、続行できます。\n${context}`);
    
    // エラーログを保存(将来の解析用)
    this.logError(error, context, 'recoverable');
  }

  /**
   * 機能停止エラーの処理
   * @param {Error} error 
   * @param {string} featureName 停止する機能名
   */
  static handleFeatureError(error, featureName) {
    Logger.error(`[Feature Error] ${featureName}:`, error);
    
    // ユーザーに通知
    this.showErrorDialog(
      `${featureName}でエラーが発生しました`,
      `この機能は一時的に利用できません。\nアプリの再起動をお試しください。`
    );
    
    // 該当機能を無効化
    this.disableFeature(featureName);
    
    this.logError(error, featureName, 'feature');
  }

  /**
   * 致命的エラーの処理
   * @param {Error} error 
   * @param {string} context 
   */
  static handleFatal(error, context) {
    Logger.error(`[FATAL] ${context}:`, error);
    
    // ユーザーに通知
    this.showErrorDialog(
      'アプリケーションエラー',
      `予期しないエラーが発生しました。\nアプリを再起動してください。\n\nエラー: ${error.message}`
    );
    
    this.logError(error, context, 'fatal');
    
    // アプリを停止状態にする
    this.shutdown();
  }

  /**
   * トースト通知(軽微なエラー用)
   * @param {string} message 
   */
  static showErrorToast(message) {
    // Phase 0: 簡易実装
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(208, 2, 27, 0.9);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 16px;
      z-index: 10000;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /**
   * ダイアログ表示(重要なエラー用)
   * @param {string} title 
   * @param {string} message 
   */
  static showErrorDialog(title, message) {
    // Phase 0: alert で代用(Phase 1以降でカスタムダイアログ)
    alert(`${title}\n\n${message}`);
  }

  /**
   * 機能の無効化
   * @param {string} featureName 
   */
  static disableFeature(featureName) {
    // Phase 0: コンソールログのみ
    Logger.warn(`Feature disabled: ${featureName}`);
    
    // Phase 1: 実際の機能無効化ロジック
    // FeatureFlags.disable(featureName);
  }

  /**
   * エラーログの保存
   * @param {Error} error 
   * @param {string} context 
   * @param {string} severity 
   */
  static logError(error, context, severity) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      severity,
      context,
      message: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    // Phase 0: localStorageに保存
    try {
      const logs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      logs.push(errorLog);
      
      // 最大100件まで保持
      if (logs.length > 100) {
        logs.shift();
      }
      
      localStorage.setItem('errorLogs', JSON.stringify(logs));
    } catch (e) {
      Logger.error('Failed to log error:', e);
    }
  }

  /**
   * アプリのシャットダウン
   */
  static shutdown() {
    // Phase 0: 画面を白くして操作不能に
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: sans-serif;
      ">
        <h1 style="color: #D0021B; margin-bottom: 16px;">アプリケーションエラー</h1>
        <p style="margin-bottom: 32px;">ページを再読み込みしてください。</p>
        <button onclick="location.reload()" style="
          padding: 16px 32px;
          font-size: 20px;
          background: #4A90E2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        ">再読み込み</button>
      </div>
    `;
  }
}

// グローバルエラーハンドラー
window.addEventListener('error', (event) => {
  ErrorBoundary.handleFatal(event.error, 'Global Error');
});

window.addEventListener('unhandledrejection', (event) => {
  ErrorBoundary.handleFatal(
    new Error(event.reason),
    'Unhandled Promise Rejection'
  );
});
```

### 3-3. SoundManager (モック版 - Phase 0標準)

```javascript
// src/core/SoundManager.js
// @ts-check

import { Logger } from './Logger.js';

/**
 * サウンド管理クラス (Phase 0: モック実装)
 * 
 * @class SoundManager
 * @description
 * Phase 0では実際の音声は再生せず、コンソールログのみ。
 * Phase 1以降で実装に置き換える。
 * 
 * @example
 * SoundManager.play('success');
 * // コンソール: 🔊 [Sound] success (volume: 1.00)
 */
class SoundManager {
  constructor() {
    this.enabled = true;
    this.volume = 1.0;
    this.sounds = new Map();
    
    // Phase 0: 利用可能なサウンドキーを定義
    this.availableSounds = [
      'tap',
      'success',
      'fail',
      'slash',
      'explosion',
      'clear',
    ];
    
    Logger.log('[SoundManager] Initialized (Mock Mode)');
  }

  /**
   * サウンドを再生 (Phase 0: モック)
   * @param {string} soundKey 
   * @param {Object} options 
   * @param {number} options.volume ボリューム(0.0〜1.0)
   */
  play(soundKey, options = {}) {
    if (!this.enabled) {
      Logger.debug(`[Sound] Disabled, skipping: ${soundKey}`);
      return;
    }
    
    if (!this.availableSounds.includes(soundKey)) {
      Logger.warn(`[Sound] Unknown sound key: ${soundKey}`);
      return;
    }
    
    // Phase 0: コンソールログのみ
    const volume = this.volume * (options.volume || 1.0);
    Logger.debug(`🔊 [Sound] ${soundKey} (volume: ${volume.toFixed(2)})`);
    
    // Phase 1: 実装に置き換え
    // const audio = new Audio(`./assets/sounds/${soundKey}.mp3`);
    // audio.volume = volume;
    // audio.play();
  }

  /**
   * ボリューム設定
   * @param {number} volume 0.0 〜 1.0
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    Logger.debug(`[Sound] Volume set to ${this.volume.toFixed(2)}`);
  }

  /**
   * サウンドのON/OFF
   * @returns {boolean} 現在の状態
   */
  toggle() {
    this.enabled = !this.enabled;
    Logger.log(`[Sound] ${this.enabled ? 'Enabled' : 'Disabled'}`);
    return this.enabled;
  }
}

export default new SoundManager();
```

### 3-4. HapticFeedback (モック版 - Phase 0標準)

```javascript
// src/utils/HapticFeedback.js
// @ts-check

import { Logger } from '../core/Logger.js';

/**
 * 触覚フィードバッククラス (Phase 0: モック実装)
 * 
 * @class HapticFeedback
 * @description
 * Phase 0では実際の振動は発生せず、コンソールログのみ。
 * Phase 1以降で実装に置き換える。
 */
export class HapticFeedback {
  /**
   * 対応しているかチェック
   * @returns {boolean}
   */
  static isSupported() {
    // Phase 0: 常にfalse
    return false;
    
    // Phase 1: 実装
    // return 'vibrate' in navigator;
  }

  /**
   * 軽いタップ(10ms)
   */
  static light() {
    Logger.debug('📳 [Haptic] light (10ms)');
    
    // Phase 1: 実装
    // if (this.isSupported()) {
    //   navigator.vibrate(10);
    // }
  }

  /**
   * 中程度のタップ(20ms)
   */
  static medium() {
    Logger.debug('📳 [Haptic] medium (20ms)');
    
    // Phase 1: 実装
    // if (this.isSupported()) {
    //   navigator.vibrate(20);
    // }
  }

  /**
   * 強めのタップ(30-10-30ms)
   */
  static heavy() {
    Logger.debug('📳 [Haptic] heavy (pattern: 30-10-30)');
    
    // Phase 1: 実装
    // if (this.isSupported()) {
    //   navigator.vibrate([30, 10, 30]);
    // }
  }

  /**
   * 成功時のパターン(10-50-10ms)
   */
  static success() {
    Logger.debug('📳 [Haptic] success (pattern: 10-50-10)');
    
    // Phase 1: 実装
    // if (this.isSupported()) {
    //   navigator.vibrate([10, 50, 10]);
    // }
  }

  /**
   * エラー時のパターン(50-30-50-30-50ms)
   */
  static error() {
    Logger.debug('📳 [Haptic] error (pattern: 50-30-50-30-50)');
    
    // Phase 1: 実装
    // if (this.isSupported()) {
    //   navigator.vibrate([50, 30, 50, 30, 50]);
    // }
  }
}
```

---

## 4. 禁止事項マトリックス

### 4-1. 絶対禁止(Phase 0〜2 共通)

| 禁止事項 | 理由 | 検出方法 |
|---------|------|---------|
| **jQuery使用** | 不要な依存、サイズ肥大化 | `$` または `jQuery` の検索 |
| **React/Vue使用** | Pure JS原則違反 | `import React` の検索 |
| **グローバル変数** | 名前空間汚染 | `window.xxx = ` の検索 |
| **inline style** | CSS管理の分散 | `style=` の検索(style.cssTextは例外) |
| **console.log/warn残留** | Logger.debug()を使用 | `console.log` `console.warn`の検索 |
| **var 使用** | スコープ問題 | `var ` の検索 |
| **eval() 使用** | セキュリティリスク | `eval(` の検索 |
| **document.write()** | DOM破壊 | `document.write` の検索 |
| **@ts-check なし** | 型安全性低下 | ファイル先頭を確認 |
| **JSDoc なし** | ドキュメント不足 | クラス・関数に/**がない |

### 4-2. Phase 0 での禁止事項

| 禁止事項 | 理由 | Phase 1〜で |
|---------|------|-------------|
| **Three.js** | 複雑性、学習コスト | 検討可 |
| **実際の音声再生** | アセットが未整備 | 許可 |
| **実際の振動** | モックで十分 | 許可 |
| **Canvas API(手書き除く)** | Phase 0対象外 | 許可 |
| **Web Worker** | 過剰 | 検討可 |
| **IndexedDB直接操作** | SaveManager経由必須 | 同様 |
| **fetch()の直接使用** | Phase 0はサーバーレス | API追加時許可 |
| **localStorage直接操作** | SaveManagerで抽象化 | 同様 |

### 4-3. 推奨しない(避けるべき)

| 事項 | 理由 | 代替 |
|------|------|------|
| **getElementById** | querySelector が統一的 | `querySelector('#id')` |
| **for ループ** | forEach等が可読性高 | `forEach`, `map`, `filter` |
| **複数クラス/1ファイル** | 責任分散 | 1ファイル1クラス |
| **100行超の関数** | 可読性低下 | 50行以内に分割 |
| **5階層超のネスト** | 複雑性 | 早期リターン |
| **マジックナンバー** | 意味不明 | 定数化 |
| **匿名関数の多用** | デバッグ困難 | 名前付き関数 |

---

## 5. ファイル命名規則

### 5-1. ディレクトリ構造

**Phase 0 構造:**
```
grimoire-guardians/
├── docs/                # ドキュメント
│   ├── UI設計書_v1.1.md
│   ├── AI指示書_v1.1.md
│   └── 統合仕様書_v1.1.md
│
├── src/                 # ソースコード
│   ├── index.html
│   │
│   ├── core/            # 基盤クラス
│   │   ├── Config.js
│   │   ├── Logger.js
│   │   ├── GameStore.js
│   │   ├── ErrorBoundary.js
│   │   ├── SoundManager.js
│   │   ├── SaveManager.js
│   │   └── ResourceLoader.js
│   │
│   ├── components/      # 再利用可能UI
│   │   ├── BookCard.js
│   │   └── ProgressBar.js
│   │
│   ├── screens/         # 画面
│   │   ├── BookshelfScreen.js
│   │   ├── QuizScreen.js
│   │   ├── ResultScreen.js
│   │   └── ClearScreen.js
│   │
│   ├── effects/         # 演出
│   │   ├── SlashEffect.js
│   │   ├── DefeatEffect.js
│   │   └── ClearEffect.js
│   │
│   ├── utils/           # 汎用関数
│   │   ├── TypeValidator.js
│   │   ├── HapticFeedback.js
│   │   └── TouchRipple.js
│   │
│   ├── data/            # マスタデータ
│   │   ├── math-grade1.js
│   │   └── subjects.js
│   │
│   └── styles/          # CSS
│       ├── common.css
│       ├── layout.css
│       ├── components.css
│       └── effects.css
│
├── assets/              # リソース
│   ├── characters/
│   ├── sounds/
│   └── fonts/
│
├── manifest.json
├── sw.js
├── .gitignore
└── README.md
```

**Phase 1以降の推奨構造:**
```
src/
├── core/
├── features/            ← 新規追加
│   ├── quiz/            # クイズ機能一式
│   │   ├── QuizScreen.js
│   │   ├── QuizRenderer.js
│   │   ├── QuizTimer.js
│   │   ├── QuizScoreManager.js
│   │   └── quiz.css
│   │
│   └── bookshelf/       # 本棚機能一式
│       ├── BookshelfScreen.js
│       ├── BookCard.js
│       └── bookshelf.css
│
├── components/          # 汎用コンポーネント(全機能で共通)
├── utils/
└── data/
```

### 5-2. ファイル名規則

```
【JavaScript】PascalCase
✅ BookCard.js
✅ QuizScreen.js
✅ SoundManager.js
✅ TypeValidator.js

❌ bookCard.js (小文字)
❌ quiz_screen.js (スネークケース)
❌ soundManager.js (camelCase)

【CSS】小文字ハイフン区切り
✅ common.css
✅ quiz-screen.css
✅ components.css

❌ Common.css (大文字)
❌ quizScreen.css (camelCase)
❌ components_style.css (アンダースコア)

【データ】小文字ハイフン区切り
✅ math-grade1.js
✅ subjects.js
✅ config.json

❌ MathGrade1.js (PascalCase)
❌ math_grade1.js (スネークケース)
```

---

## 6. 指示テンプレート集(Claude Code特化)

### 6-1. テンプレート使用の流れ

```
ステップ1: 作業内容に応じたテンプレートを選ぶ
   ├─ 新規ファイル作成 → テンプレート A
   ├─ 既存ファイル修正 → テンプレート B
   ├─ バグ修正 → テンプレート C
   └─ リファクタリング → テンプレート D

ステップ2: テンプレートをコピー

ステップ3: {{ }} 部分を埋める
   - {{ファイル名}} → 実際のファイル名
   - {{セクション番号}} → 参照すべきセクション
   - {{仕様1}} → 具体的な仕様

ステップ4: Claude Code に貼り付け
   - CLI: コマンドラインに貼り付け
   - Web: チャット欄に貼り付け

ステップ5: 生成されたコードをレビュー
   - セクション7のチェックリストで確認
```

### 6-2. テンプレートA: 新規ファイル作成

````markdown
【Claude Code: 新規ファイル作成】

【コンテキスト読み込み依頼】
以下のファイルを読み込んで理解してください:

必須:
- docs/UI設計書_v1.1.md
- docs/AI指示書_v1.1.md

参照:
- {{関連する設計書のセクション}}
- {{依存する既存ファイルのパス}}

例:
- docs/UI設計書_v1.1.md (セクション5-2: BookCard)
- src/core/GameStore.js
- src/utils/TypeValidator.js
- src/styles/components.css

【作成ファイル】
{{プロジェクトルートからの相対パス}}

例: src/components/BookCard.js

【目的・役割】
{{このファイルの役割を1〜2行で}}

例:
本棚画面に表示される本のカードコンポーネント。
進捗バー、タイトル、アイコンを含み、タップでリップルエフェクトを表示。

【要件定義】

1. クラス名: {{ClassName}}

2. 依存関係:
```javascript
import { {{依存クラス}} } from '{{パス}}';
import { {{依存クラス}} } from '{{パス}}';
```

例:
```javascript
import { TypeValidator } from '../utils/TypeValidator.js';
import { TouchRipple } from '../utils/TouchRipple.js';
import store from '../core/GameStore.js';
```

3. 実装メソッド:
   - constructor({{引数}}): {{機能説明}}
   - {{methodName1}}(): {{機能説明}}
   - {{methodName2}}(): {{機能説明}}
   - destroy(): イベントリスナーのクリーンアップ(必須)

4. 型定義(JSDoc):
```javascript
/**
 * @param {型} 引数名 - 説明
 * @returns {型} 説明
 * @throws {Error型} 条件
 */
```

【厳守事項】
- // @ts-check をファイル先頭に必須
- docs/AI指示書_v1.1.md のコーディング規約を遵守
- 300行以内
- JSDoc + 実行時型チェック(TypeValidator)必須
- Pure JS (No Framework)
- console.logではなくLogger.debug()を使用
- Phase 0モック対応(SoundManager, HapticFeedback)
- BEM記法(.book-card, .book-card__title等)
- CSS変数使用(--space-*, --radius-*等)

【出力形式】
1. ファイルの完全なコード
2. 使用例(コメントで記載)
3. 依存関係リスト(どのファイルをimportしているか)

【期待する動作】
{{具体的な動作シナリオ}}

例:
1. new BookCard('math', 'world1', 60)でインスタンス作成
2. container.appendChild(card.render())でカード表示
3. タップでリップルエフェクト表示
4. card.updateProgress(80)で進捗が60→80%にアニメーション
5. card.destroy()でイベントリスナーをクリーンアップ
````

### 6-3. テンプレートB: 既存ファイル修正

````markdown
【Claude Code: 既存ファイル修正】

【コンテキスト読み込み依頼】
以下のファイルを読み込んでください:

対象ファイル:
- {{修正対象のファイルパス}}

影響範囲確認のため:
- {{呼び出し元のファイルパス}}
- {{関連するファイルパス}}

参照:
- docs/AI指示書_v1.1.md

例:
- src/components/BookCard.js (修正対象)
- src/screens/BookshelfScreen.js (呼び出し元)
- docs/AI指示書_v1.1.md

【対象ファイル】
{{プロジェクトルートからの相対パス}}

【修正理由】
{{なぜ修正が必要か}}

例:
進捗バーの更新時にアニメーションがカクつく問題を修正

【現状の問題】
Before: {{具体的な問題点}}

例:
updateProgress()で直接widthを変更しているため、
ブラウザの再描画が頻繁に発生してカクつく。

【修正内容】
After: {{理想の状態}}

例:
CSS transitionを使用してGPU加速を有効にし、
スムーズなアニメーションを実現する。

【修正の制約】
- 既存のメソッドシグネチャを変更しないこと(必要な場合は明示)
- 他のファイルへの影響を最小限にすること
- P0項目(起動、セーブ、ロード等)に影響しないこと
- 既存のテストが通ること(テストがあれば)

【影響範囲の確認】
以下のファイルが正常動作することを確認:
- {{関連ファイル1}}
- {{関連ファイル2}}

例:
- src/screens/BookshelfScreen.js
- src/screens/QuizScreen.js

【確認手順】
修正後、以下の手順で動作確認:
1. {{テスト手順1}}
2. {{テスト手順2}}
3. 期待結果: {{期待する結果}}

例:
1. 本棚画面を開く
2. 本をクリックして問題を解く
3. 本棚に戻る
4. 期待結果: 進捗バーがスムーズにアニメーション

【出力形式】
1. 修正後の完全なコード
2. 変更点のサマリー(コメントで// CHANGED: のように)
3. 影響を受ける可能性のあるファイルリスト
4. テスト方法
````

### 6-4. テンプレートC: バグ修正

````markdown
【Claude Code: バグ修正】

【コンテキスト読み込み依頼】
- {{バグが発生しているファイル}}
- {{関連するファイル}}
- docs/AI指示書_v1.1.md (セクション8: トラブルシューティング)

【対象ファイル】
{{ファイルパス}}

【バグの詳細】

発生条件:
{{どうすると発生するか}}

例:
回答ボタンを連続で素早くクリックすると発生

症状:
{{何が起きるか}}

例:
スコアが2回加算される

エラーメッセージ:
```
{{エラーメッセージを貼り付け}}
```

例:
```
Uncaught TypeError: Cannot read property 'score' of undefined
  at QuizScreen.handleAnswer (QuizScreen.js:45)
```

再現率:
{{毎回/時々/稀}}

例: 毎回(100%)

【原因の推測】
{{分かっている範囲で}}

例:
handleAnswer()が連続で呼ばれた際、
2回目の呼び出しで既にstateが更新されているため、
undefinedエラーが発生していると思われる。

【期待する動作】
{{本来どう動くべきか}}

例:
連続クリックしても1回だけスコア加算され、
2回目以降のクリックは無視される。

【確認済みの事項】
- F12コンソールで確認: {{結果}}
- Networkタブで確認: {{結果}}
- 変数の値: {{console.logで確認した値}}

例:
- F12コンソール: TypeError発生を確認
- state.quiz.score: 1回目=0, 2回目=undefined
- isAnswered: 1回目=false, 2回目=false(更新されていない)

【修正後のテスト】
1. {{テスト手順1}}
2. {{テスト手順2}}
3. 期待結果: {{期待する結果}}

例:
1. 問題画面を開く
2. 回答ボタンを素早く連続クリック
3. スコアが1回だけ加算される
4. コンソールにエラーが出ない

【出力形式】
1. 修正後のコード
2. 原因の説明
3. 修正内容の説明
4. テスト方法
````

---

## 7. レビューチェックリスト

### 7-1. P0項目(最重要・起動ブロッカー)

```
以下が1つでも動かない場合、リリース不可

□ アプリが起動する
  確認方法: ブラウザで index.html を開く
  期待結果: 白画面にならず、本棚画面が表示される
  
□ セーブ機能が動く
  確認方法: 
    1. 問題を1問解く
    2. F12 → Application → IndexedDB → GrimoireGuardiansDB確認
  期待結果: playerData に進捗が保存されている
  
□ ロード機能が動く
  確認方法:
    1. セーブ後、ページをリロード
    2. 本棚画面を確認
  期待結果: 進捗バーが保存した値になっている
  
□ 問題が表示される
  確認方法: 本をクリック
  期待結果: 問題画面に遷移し、問題文が表示される
  
□ 回答ボタンが押せる
  確認方法: 回答ボタンをクリック/タップ
  期待結果: ボタンが反応し、正解/不正解の判定が表示される
  
□ 正解/不正解判定が正しい
  確認方法:
    1. 3+5の問題で「8」を選択
    2. 3+5の問題で「7」を選択
  期待結果:
    - 「8」選択時: 正解表示(緑+⭕)
    - 「7」選択時: 不正解表示(赤+❌)
```

### 7-2. UI/UXチェック

```
□ 横向きで正しく表示
  確認方法:
    - 実機: タブレットを横向きにする
    - PC: F12 → デバイスツールバー → 1280x720
  期待結果: レイアウトが崩れない
  
□ 縦向きで警告表示
  確認方法:
    - 実機: タブレットを縦向きにする
    - PC: F12 → デバイスツールバー → 720x1280
  期待結果: 「画面を横にしてね」表示
  
□ タップ領域が十分(44x44px以上)
  確認方法:
    - F12 → Elements → ボタン選択
    - Computed → width, height確認
  期待結果: すべてのボタンが44x44px以上
  
□ フォントが読みやすい(20px以上)
  確認方法:
    - F12 → Elements → テキスト選択
    - Computed → font-size確認
  期待結果: 問題文、ボタン文字が20px以上
  
□ アニメーションがスムーズ
  確認方法:
    - F12 → Performance → Record
    - カードをクリックしてアニメーション実行
  期待結果: FPS 30以上(推奨60)
  
□ 色だけで判別していない
  確認方法: 正解・不正解を選択
  期待結果:
    - 正解: 緑 + ⭕アイコン + 枠線
    - 不正解: 赤 + ❌アイコン + ギザギザ枠
  
□ タッチリップルが動く
  確認方法:
    - タブレットでタップ
    - PC: Chrome DevTools → タッチエミュレート
  期待結果: タップ位置から波紋が広がる
```

### 7-3. コード品質チェック

```
□ コンソールエラーなし
  確認方法:
    - F12 → Console
    - アプリを一通り操作
  期待結果: 赤いエラーメッセージなし
  
□ console.log/warn が残っていない
  確認方法:
    - VSCodeで全体検索: "console.log"
    - VSCodeで全体検索: "console.warn"
  期待結果: 0件(Logger.debug()のみ使用)
  
□ @ts-check がある
  確認方法: すべての.jsファイルの先頭を確認
  期待結果: // @ts-check が1行目にある
  
□ CSS変数を使用
  確認方法:
    - F12 → Elements → Styles
    - inline styleや直接px値がないか
  期待結果: var(--space-3)等の変数を使用
  
□ BEM記法
  確認方法: HTMLソースのclass属性を確認
  期待結果:
    - .book-card (Block)
    - .book-card__title (Element)
    - .book-card--active (Modifier)
  
□ 関数が短い(50行以内推奨)
  確認方法: 各関数の行数をカウント
  期待結果: 50行以内(100行を超えるものがない)
  
□ JSDocコメント
  確認方法: クラス・関数に /** */ があるか
  期待結果: すべてのpublic クラス・メソッドにJSDoc
  
□ export/import
  確認方法: "window." で検索
  期待結果: 0件(グローバル変数なし)
  
□ 非同期処理にtry-catch
  確認方法: async関数にtry-catchがあるか
  期待結果: すべてのasync関数でエラー処理
  
□ モック実装の確認
  確認方法:
    - SoundManager.play()を呼ぶ
    - HapticFeedback.light()を呼ぶ
  期待結果: コンソールにログが出る(実際には鳴らない/振動しない)
```

### 7-4. パフォーマンスチェック

```
□ 起動時間が3秒以内
  確認方法:
    - ストップウォッチで計測
    - index.html読み込み → 本棚表示まで
  期待結果: 3秒以内
  
□ FPSが30以上(推奨60)
  確認方法:
    - F12 → Performance → Record
    - アニメーション実行中のFPSを確認
  期待結果: 平均30fps以上
  
□ メモリリークなし
  確認方法:
    - F12 → Memory → Heap snapshot
    - 画面遷移前後でメモリ比較
  期待結果: 増加が1MB以内
  
□ 画像サイズが適切
  確認方法: assetsフォルダのファイルサイズ
  期待結果: 1ファイル500KB以内
  
□ 不要なリソース読み込みなし
  確認方法:
    - F12 → Network
    - 404や不要なリクエストがないか
  期待結果: すべて200 OK
```

### 7-5. アクセシビリティチェック

```
□ キーボード操作可能
  確認方法:
    - Tabキーで移動
    - Enterキーで決定
  期待結果: マウスなしで操作可能
  
□ altテキストあり
  確認方法: HTMLソースで <img を検索
  期待結果: すべてのimgにalt属性
  
□ コントラスト比4.5:1以上
  確認方法:
    - F12 → Lighthouse
    - Accessibilityスコア確認
  期待結果: 90点以上
  
□ フォーカス表示
  確認方法: Tabキーで移動
  期待結果: 枠線や背景色で分かる
  
□ スクリーンリーダー対応
  確認方法: HTMLでaria-label等を確認
  期待結果: ボタンにaria-label設定
```

### 7-6. 簡易チェックシート(印刷用)

```
=====================================
コード提出前チェックシート
=====================================

作成日: __________________
ファイル: __________________

【P0】必須項目
□ 起動 □ セーブ □ ロード □ 問題表示 □ 回答 □ 判定

【UI/UX】
□ 横向きOK □ 縦向き警告 □ タップ44px以上 □ フォント20px以上
□ アニメーションスムーズ □ 色以外判別 □ リップル動作

【コード品質】
□ エラーなし □ console削除 □ @ts-check □ CSS変数
□ BEM記法 □ 関数50行以内 □ JSDoc □ export/import
□ try-catch □ モック確認

【パフォーマンス】
□ 3秒起動 □ FPS30以上 □ メモリリーク無 □ リソースOK

【アクセシビリティ】
□ キーボード操作 □ alt □ コントラスト □ フォーカス

署名: __________________
```

---

## 8. トラブルシューティング完全版

### 8-1. 起動時の問題

#### 問題: 画面が真っ白

```
原因: JavaScriptエラーでアプリが停止

確認方法:
1. F12キー → 開発者ツールを開く
2. Consoleタブを見る
3. 赤いエラーメッセージを確認

よくあるエラーと対処:

【エラー1】
Uncaught SyntaxError: Unexpected token '}'

意味: 文法エラー(括弧の不一致等)

対処:
1. エラーメッセージのファイル名と行番号を確認
2. エディタでそのファイルを開く
3. 括弧の対応を確認
   - VSCode: Shift+Alt+F で自動フォーマット
   - 括弧が多い/少ないをチェック

【エラー2】
Uncaught ReferenceError: BookCard is not defined

意味: 定義されていない変数/クラスを使っている

対処:
1. import文が抜けていないか確認
2. ファイル先頭に以下を追加:
   import { BookCard } from '../components/BookCard.js';
3. パスが正しいか確認(相対パス)

【エラー3】
Failed to load module script: Expected a JavaScript module script

意味: <script>タグにtype="module"がない

対処:
1. index.htmlを開く
2. <script src="...">を探す
3. <script type="module" src="...">に修正

【エラー4】
Uncaught TypeError: Cannot read property 'xxx' of undefined

意味: undefinedのプロパティにアクセス

対処:
1. エラーの行番号を確認
2. 変数がundefinedでないかチェック
3. オプショナルチェーン(?.)を使う:
   - 修正前: obj.prop.value
   - 修正後: obj?.prop?.value

解決テンプレート:
【タスク】起動エラー修正
【エラー内容】
(エラーメッセージを完全にコピペ)

【発生ファイル】
(エラーメッセージに表示されているファイル名)

【状況】
- ブラウザ: Chrome 120
- 操作: index.htmlを開いた直後
```

#### 問題: ロード画面で止まる

```
原因:
1. リソース(画像・音)の読み込み失敗
2. IndexedDBの初期化失敗
3. 無限ループ

確認方法:
1. F12 → Networkタブ
2. 赤い行(失敗)があるか確認
3. Status列を見る
   - 404: ファイルが見つからない
   - CORS error: オリジン制限
   - (pending): 無限ループの可能性

対処:

【404エラーの場合】
現象: Status 404 Not Found

原因: ファイルパスが間違っている

対処:
1. エラーになっているファイル名を確認
   例: assets/sounds/tap.mp3
2. 実際にファイルが存在するか確認
3. パスの大文字小文字を確認(Linuxは区別する)
4. 相対パスが正しいか確認

【CORSエラーの場合】
現象: 
Access to fetch at 'file:///.../xxx' from origin 'null' 
has been blocked by CORS policy

原因: ローカルファイルはCORS制限がある

対処:
1. ローカルサーバーで実行する
2. VSCode: Live Server拡張機能をインストール
3. index.htmlを右クリック → Open with Live Server
4. または: python -m http.server

【無限ループの場合】
現象: ページが固まる、(pending)が続く

原因: while/for文やsetIntervalが止まらない

対処:
1. F12 → Console で確認
   "Maximum call stack size exceeded"が出る
2. コードを見直す:
   - while文の終了条件
   - for文のインクリメント
   - setIntervalのclearInterval
```

#### 問題: IndexedDBエラー

```
エラーメッセージ:
"Failed to execute 'transaction' on 'IDBDatabase'"

原因:
- データベースのバージョン不一致
- ストアが存在しない
- トランザクション中にDB操作

対処:
1. ブラウザデータを削除
   - F12 → Application → Storage
   - Clear site data ボタンをクリック
   
2. バージョン番号を上げる
   - SaveManager.js を開く
   - DB_VERSION を1増やす
   例: const DB_VERSION = 2;
   
3. マイグレーション処理を確認
   - onupgradeneeded が正しく動いているか
   - console.logで確認

エラーメッセージ:
"VersionError: An attempt was made to open a database using a lower version"

対処:
1. Application → IndexedDB → GrimoireGuardiansDB
2. 右クリック → Delete database
3. ページをリロード
```

---

### 8-2. 動作時の問題

#### 問題: ボタンが押せない

```
原因別の対処:

【原因1: イベントリスナー未設定】

確認方法:
F12 → Console で以下を実行:
document.querySelector('.answer-btn').onclick
// null なら未設定

対処:
1. ファイルを開く
2. addEventListener を探す
3. なければ追加:
button.addEventListener('click', handleClick);

【原因2: z-indexで隠れている】

確認方法:
- F12 → Elements → ボタンを選択
- Computed → z-index を確認
- 他の要素と比較

対処:
.answer-btn {
  position: relative;
  z-index: 10; /* 他より大きい値 */
}

【原因3: pointer-events: none】

確認方法:
- F12 → Elements → Styles
- pointer-events の値を確認

対処:
.answer-btn {
  pointer-events: auto; /* または削除 */
}

【原因4: 要素が小さすぎる】

確認方法:
- F12 → Computed → width, height
- 44px x 44px 未満か確認

対処:
.answer-btn {
  min-width: 80px;
  min-height: 80px;
}

【原因5: 親要素がoverflow: hidden】

確認方法:
- 親要素を確認
- overflow プロパティをチェック

対処:
親要素のoverflowを調整、または
ボタンを親の外に移動

テンプレート:
【タスク】ボタンタップ不可の修正
【対象ファイル】src/screens/QuizScreen.js
【ボタン】.answer-btn
【確認事項】
- z-index: 1
- pointer-events: auto
- サイズ: 80x80px
- イベントリスナー: あり
- 親のoverflow: visible
```

#### 問題: アニメーションが動かない

```
原因別チェックリスト:

□ CSSクラスが適用されているか
  確認: F12 → Elements → クラス名を確認
  対処: element.classList.add('animate')
  
□ @keyframes が定義されているか
  確認: F12 → Styles → @keyframes を検索
  対処: CSSファイルに@keyframesを追加
  
□ animation プロパティがあるか
  確認: F12 → Computed → animation
  対処: animation: name 1s ease; を追加
  
□ prefers-reduced-motion が有効か
  確認:
    - Windows: 設定 → 簡単操作 → アニメーションを表示する
    - Mac: システム環境設定 → アクセシビリティ → 視覚効果を減らす
  対処: OSの設定を変更、または
  @media (prefers-reduced-motion: no-preference) { }
  
□ display: none になっていないか
  確認: F12 → Computed → display
  対処: display: block; または visibility: hidden;
  
□ GPU加速が効いているか
  確認: will-change または transform
  対処:
  .animate {
    will-change: transform;
    transform: translateZ(0); /* GPU層を作る */
  }

【よくあるパターン】
アニメーションが1回しか動かない

原因: animationイベントが残っている

対処:
element.addEventListener('animationend', () => {
  element.classList.remove('animate');
  // 次回のために状態をリセット
});
```

#### 問題: スコアが更新されない

```
原因:
1. 状態管理の問題
2. DOMの更新漏れ
3. subscribe忘れ

確認:

【ステップ1: 状態を確認】
F12 → Console:
console.log(store.getState().quiz.score);
// 期待値が出るか?

【ステップ2: DOMを確認】
console.log(document.querySelector('.score-display').textContent);
// 状態と一致するか?

【ステップ3: 購読を確認】
store.subscribe('quiz', (quizState) => {
  console.log('Quiz state changed:', quizState);
});
// setState時にログが出るか?

対処:

【パターンA: 状態は更新されているがDOMが更新されない】

原因: subscribe が抜けている

対処:
// ファイルの初期化部分に追加
store.subscribe('quiz', (quizState) => {
  const scoreDisplay = document.querySelector('.score-display');
  scoreDisplay.textContent = `${quizState.score} / ${quizState.questions.length}`;
});

【パターンB: 状態も更新されていない】

原因: setState の呼び出しが間違っている

確認:
console.log('Before:', store.getState().quiz.score);
store.setState({ quiz: { score: newScore } });
console.log('After:', store.getState().quiz.score);

対処:
// 正しい更新方法
const currentQuiz = store.getState().quiz;
store.setState({
  quiz: {
    ...currentQuiz,  // 既存のプロパティを保持
    score: newScore  // scoreだけ更新
  }
});

【パターンC: 計算が間違っている】

原因: ロジックのバグ

確認:
console.log('Correct answer:', correctAnswer);
console.log('User answer:', userAnswer);
console.log('Is correct:', userAnswer === correctAnswer);

対処:
// 型を統一して比較
String(userAnswer) === String(correctAnswer)
```

---

### 8-3. データ関連の問題

#### 問題: セーブデータが消える

```
原因:
1. ブラウザのキャッシュクリア
2. IndexedDBの容量制限
3. 保存処理の失敗
4. ブラウザのプライベートモード

予防策:

【対策1: データエクスポート機能】
// SaveManager.js に追加
async exportData() {
  const data = await this.load();
  const json = JSON.stringify(data, null, 2);
  
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `grimoire_guardians_save_${Date.now()}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}

【対策2: localStorage にもバックアップ】
async save(data) {
  // IndexedDB に保存
  await this.saveToIndexedDB(data);
  
  // localStorage にもバックアップ
  try {
    localStorage.setItem('backup', JSON.stringify(data));
  } catch (e) {
    Logger.warn('localStorage backup failed:', e);
  }
}

【対策3: 自動保存の頻度を上げる】
// 問題ごとに保存
onAnswerSubmit() {
  this.updateScore();
  SaveManager.save(store.getState()); // 即座に保存
}

// 5分ごとに自動保存
setInterval(() => {
  SaveManager.save(store.getState());
}, 5 * 60 * 1000);

復旧方法:

【方法1: エクスポートファイルから復元】
// SaveManager.js に追加
async importData(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  await this.save(data);
  location.reload();
}

// HTML
<input type="file" id="import" accept=".json">
<script>
document.getElementById('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  await SaveManager.importData(file);
});
</script>

【方法2: localStorageバックアップから復元】
async restoreFromBackup() {
  const backup = localStorage.getItem('backup');
  if (backup) {
    const data = JSON.parse(backup);
    await this.save(data);
    return true;
  }
  return false;
}

【方法3: 初期化】
最後の手段として、データをリセット

async reset() {
  await this.db.clear('playerData');
  await this.db.clear('progress');
  localStorage.clear();
  location.reload();
}
```

#### 問題: データ構造が壊れている

```
症状:
- 読み込みエラー
- 進捗が NaN
- オブジェクトが undefined
- "Cannot read property of undefined"

確認方法:
1. F12 → Application → IndexedDB
2. GrimoireGuardiansDB → playerData を開く
3. データの中身を確認

よくある破損パターン:

【パターン1: バージョン不一致】

古いバージョン:
{
  score: 100,
  world: "world1"
}

新しいバージョン:
{
  quiz: {
    score: 100
  },
  player: {
    currentWorld: "world1"
  }
}

対処: マイグレーション処理

// SaveManager.js
db.onupgradeneeded = (event) => {
  const db = event.target.result;
  const oldVersion = event.oldVersion;
  
  if (oldVersion < 2) {
    // v1 → v2 のマイグレーション
    const transaction = event.target.transaction;
    const store = transaction.objectStore('playerData');
    
    store.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        const oldData = cursor.value;
        const newData = {
          quiz: {
            score: oldData.score || 0
          },
          player: {
            currentWorld: oldData.world || null
          }
        };
        cursor.update(newData);
        cursor.continue();
      }
    };
  }
};

【パターン2: 型の不一致】

期待: progress = 60 (数値)
実際: progress = "60" (文字列)

対処: 保存前に型チェック

async save(data) {
  // 型を正規化
  if (data.quiz?.score) {
    data.quiz.score = Number(data.quiz.score);
  }
  if (data.player?.progress) {
    data.player.progress = Number(data.player.progress);
  }
  
  await this.saveToIndexedDB(data);
}

【パターン3: 必須フィールドの欠落】

期待: { player: { name: "太郎" } }
実際: { player: {} }

対処: デフォルト値を設定

async load() {
  const data = await this.loadFromIndexedDB();
  
  // デフォルト値でマージ
  return {
    player: {
      name: data.player?.name || "プレイヤー",
      currentWorld: data.player?.currentWorld || null,
    },
    quiz: {
      score: data.quiz?.score || 0,
      questions: data.quiz?.questions || [],
    },
    ...data
  };
}

修復テンプレート:
【タスク】データ修復
【症状】進捗がNaNになる
【エラーメッセージ】
TypeError: Cannot read property 'score' of undefined

【データ内容】
(F12 → Application → IndexedDB で確認)
{
  "player": {},
  "quiz": {
    "score": "60"  // 文字列になっている
  }
}

【期待する構造】
{
  "player": {
    "name": "プレイヤー",
    "currentWorld": "world1"
  },
  "quiz": {
    "score": 60  // 数値
  }
}
```

---

### 8-4. GitHub/Claude Code関連の問題

#### 問題: Claude Codeがリポジトリに接続できない

```
原因:
1. GitHub認証の期限切れ
2. リポジトリの権限不足
3. Private repositoryの設定
4. リポジトリ名の間違い

対処:

【手順1: 認証の確認】
1. claude.com/code にアクセス
2. 右上のアカウントアイコン → Settings
3. Connections → GitHub を確認
4. "Reconnect GitHub" をクリック
5. GitHubで認証を許可

【手順2: リポジトリの権限確認】
1. github.com にアクセス
2. リポジトリページを開く
3. Settings → Collaborators and teams
4. Claude App が Collaborator に入っているか確認
5. なければ Invite collaborator

【手順3: リポジトリ名の確認】
正: your-username/grimoire-guardians
誤: grimoire-guardians (ユーザー名がない)

確認方法:
GitHub リポジトリのURLを見る
https://github.com/your-username/grimoire-guardians
                   ^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^
                   ユーザー名    リポジトリ名
```

#### 問題: プルリクエストが作れない

```
エラー1:
"Branch protection rule requires approval"

原因: mainブランチに保護ルールがある

対処:
1. Settings → Branches → Branch protection rules
2. mainブランチのルールを確認
3. 以下のどちらか:
   a) 一時的に "Require pull request reviews" を無効化
   b) 別ブランチで作業してPRを作る

エラー2:
"Merge conflict"

原因: 同じファイルを複数人が編集

対処:
1. 最新のmainをpull
   git pull origin main

2. 競合を手動解決
   - VSCodeで該当ファイルを開く
   - <<<<<<< HEAD の部分を確認
   - どちらを残すか選択
   - マーカーを削除

3. コミット
   git add .
   git commit -m "Resolve conflict"
   git push

例:
<<<<<<< HEAD (自分の変更)
const MAX_QUESTIONS = 5;
=======
const MAX_QUESTIONS = 10;
>>>>>>> main (他人の変更)

→ どちらか選ぶ、または両方を統合

決定版:
const MAX_QUESTIONS = 10; // 統合
```

---

### 8-5. パフォーマンス問題

#### 問題: アプリが重い・カクつく

```
確認方法:
1. F12 → Performance → Record
2. 5秒間操作
3. Stop → 結果を分析

チェックポイント:

【FPSが30以下】

原因: アニメーションの過負荷

対処:
1. will-change を追加
.animate {
  will-change: transform, opacity;
}

2. transform, opacity のみでアニメーション
/* ❌ 重い */
.animate {
  animation: move 1s;
}
@keyframes move {
  from { left: 0; }
  to { left: 100px; }
}

/* ✅ 軽い */
.animate {
  animation: move 1s;
}
@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

3. パーティクルの数を減らす
const MAX_PARTICLES = Config.isDevelopment ? 50 : 20;

【Scripting が黄色/赤】

原因: JavaScriptの処理が重い

対処:
1. 不要なループを削減
// ❌ 毎フレーム実行
setInterval(() => {
  updateAllCards();
}, 16); // 60fps

// ✅ 必要な時だけ
store.subscribe('quiz', () => {
  updateScore();
});

2. requestAnimationFrame を使う
// ❌ setInterval
setInterval(animate, 16);

// ✅ requestAnimationFrame
function animate() {
  // 処理
  requestAnimationFrame(animate);
}

3. debounce/throttle を実装
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

window.addEventListener('resize', debounce(() => {
  updateLayout();
}, 200));

【Rendering が黄色/赤】

原因: DOMの再描画が多い

対処:
1. documentFragment を使う
// ❌ 毎回追加で再描画
cards.forEach(card => {
  container.appendChild(card);
});

// ✅ まとめて追加
const fragment = document.createDocumentFragment();
cards.forEach(card => {
  fragment.appendChild(card);
});
container.appendChild(fragment);

2. display: none → visibility: hidden
// ❌ レイアウト再計算
element.style.display = 'none';

// ✅ レイアウト維持
element.style.visibility = 'hidden';

3. レイアウトシフトを減らす
// ❌ 画像読み込み後にサイズ変更
<img src="...">

// ✅ 事前にサイズ指定
<img src="..." width="180" height="240">

【Memory が増え続ける】

原因: メモリリーク

対処:
1. イベントリスナーを removeEventListener
class BookCard {
  constructor() {
    this.handleClick = this.onClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
  }
}

2. setInterval を clearInterval
class Timer {
  start() {
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  }
  
  stop() {
    clearInterval(this.intervalId);
  }
}

3. DOM参照を null にする
class Screen {
  destroy() {
    this.element.remove();
    this.element = null;  // 参照を切る
  }
}
```

---

## 9. 用語集(初心者向け)

### 9-1. 基本用語

| 用語 | 読み方 | 意味 | 例 |
|------|--------|------|-----|
| **変数** | へんすう | データを入れる箱 | `const score = 100;` |
| **定数** | ていすう | 変更しない変数 | `const MAX = 5;` |
| **関数** | かんすう | 処理をまとめたもの | `function add() {}` |
| **クラス** | くらす | オブジェクトの設計図 | `class Car {}` |
| **インスタンス** | いんすたんす | クラスから作った実体 | `new Car()` |
| **メソッド** | めそっど | クラス内の関数 | `car.start()` |
| **プロパティ** | ぷろぱてぃ | クラス内の変数 | `car.color` |
| **引数** | ひきすう | 関数に渡す値 | `add(3, 5)` の 3 と 5 |
| **戻り値** | もどりち | 関数が返す値 | `return 8;` の 8 |
| **型** | かた | データの種類 | number, string, boolean |

### 9-2. JavaScript用語

| 用語 | 読み方 | 意味 | 具体例 |
|------|--------|------|--------|
| **const** | こんすと | 変更しない変数 | `const name = "太郎";` |
| **let** | れっと | 変更する変数 | `let score = 0; score++;` |
| **var** | ばー | 古い変数(使わない) | `var x = 10;` |
| **export** | えくすぽーと | 外部に公開 | `export class BookCard` |
| **import** | いんぽーと | 外部から読込 | `import { BookCard }` |
| **async** | あしんく | 非同期関数 | `async function load()` |
| **await** | あうぇいと | 完了を待つ | `await loadData();` |
| **Promise** | ぷろみす | 将来の結果 | `fetch().then()` |
| **callback** | こーるばっく | 後で呼ばれる関数 | `onClick(callback)` |
| **arrow function** | あろーふぁんくしょん | 短い関数記法 | `() => {}` |

### 9-3. CSS用語

| 用語 | 読み方 | 意味 | 例 |
|------|--------|------|-----|
| **セレクタ** | せれくた | どの要素か指定 | `.book-card` |
| **プロパティ** | ぷろぱてぃ | 何を変更するか | `color:` |
| **値** | あたい | どう変更するか | `red` |
| **クラス** | くらす | 要素の種類 | `class="btn"` |
| **ID** | あいでぃー | 要素の識別子 | `id="main"` |
| **BEM** | べむ | クラス命名規則 | `block__element--modifier` |
| **CSS変数** | しーえすえすへんすう | 繰り返し使う値 | `var(--space-3)` |
| **疑似クラス** | ぎじくらす | 状態セレクタ | `:hover` |
| **疑似要素** | ぎじようそ | 仮想要素 | `::before` |
| **レスポンシブ** | れすぽんしぶ | 画面サイズ対応 | `@media` |

### 9-4. DOM用語

| 用語 | 読み方 | 意味 | 例 |
|------|--------|------|-----|
| **DOM** | どむ | HTMLの構造 | Document Object Model |
| **要素** | ようそ | HTMLタグ | `<div>` |
| **ノード** | のーど | DOMの1つの部品 | 要素、テキスト等 |
| **親要素** | おやようそ | 外側の要素 | `<div><p>` の div |
| **子要素** | こようそ | 内側の要素 | `<div><p>` の p |
| **兄弟要素** | きょうだいようそ | 同じ階層の要素 | `<p>` と `<p>` |
| **属性** | ぞくせい | タグの設定 | `class="btn"` |
| **イベント** | いべんと | 操作の発生 | click, mouseover |
| **リスナー** | りすなー | イベント監視 | `addEventListener` |
| **バブリング** | ばぶりんぐ | イベントの伝播 | 子→親へ伝わる |

### 9-5. ツール用語

| 用語 | 読み方 | 意味 | 使い方 |
|------|--------|------|--------|
| **F12** | えふじゅうに | 開発者ツール | ブラウザでF12キー |
| **Console** | こんそーる | ログ表示 | F12 → Consoleタブ |
| **Elements** | えれめんつ | HTML確認 | F12 → Elementsタブ |
| **Network** | ねっとわーく | 通信確認 | F12 → Networkタブ |
| **Performance** | ぱふぉーまんす | 速度測定 | F12 → Performanceタブ |
| **Application** | あぷりけーしょん | ストレージ確認 | F12 → Applicationタブ |
| **GitHub** | ぎっとはぶ | コード保存 | github.com |
| **リポジトリ** | りぽじとり | プロジェクト保管庫 | grimoire-guardians |
| **コミット** | こみっと | 変更を記録 | `git commit` |
| **プッシュ** | ぷっしゅ | サーバーに送信 | `git push` |
| **プル** | ぷる | サーバーから取得 | `git pull` |
| **ブランチ** | ぶらんち | 作業の枝分かれ | `git branch` |

### 9-6. エラー用語

| 用語 | 意味 | よくある原因 | 対処 |
|------|------|------------|------|
| **SyntaxError** | 文法エラー | 括弧やセミコロンの位置 | エディタの自動フォーマット |
| **ReferenceError** | 参照エラー | 変数名のtypoやimport漏れ | importを確認 |
| **TypeError** | 型エラー | nullやundefinedへのアクセス | オプショナルチェーン(?.) |
| **RangeError** | 範囲エラー | 配列の範囲外アクセス | 配列の長さを確認 |
| **404 Not Found** | ファイルが見つからない | パスが間違っている | パスを確認 |
| **CORS Error** | オリジン制限 | ローカルファイルのfetch | ローカルサーバーで実行 |
| **Uncaught** | 捕捉されていない | try-catchがない | try-catchで囲む |
| **Stack overflow** | スタックオーバーフロー | 無限再帰 | 再帰の終了条件を確認 |

---

## 付録: チェックシート(印刷用)

### コード提出前チェック

```
=====================================
Grimoire Guardians - コード提出チェックシート
=====================================

作成者: __________________
日付: __________________
ファイル: __________________

【事前確認】
□ docs/AI指示書_v1.1.md セクション2(コーディング規約)を読んだ
□ docs/AI指示書_v1.1.md セクション4(禁止事項)を確認した
□ docs/UI設計書_v1.1.md の該当セクションを参照した
□ テンプレートを使って指示を出した

【コード品質】
□ // @ts-check がファイル先頭にある
□ JSDocコメントを書いた
□ 300行以内に収まっている
□ 関数が50行以内
□ console.log/warnを削除(Logger.debug()に置換)
□ BEM記法を使用
□ CSS変数を使用
□ export/import を使用
□ try-catchでエラー処理
□ TypeValidatorで型チェック
□ モック実装を確認(SoundManager, HapticFeedback)

【P0項目(起動ブロッカー)】
□ アプリが起動する
□ セーブ機能が動く
□ ロード機能が動く
□ 問題が表示される
□ 回答ボタンが押せる
□ 正解/不正解判定が正しい

【UI/UX】
□ 横向きで正しく表示
□ 縦向きで警告表示
□ タップ領域が44x44px以上
□ フォントが20px以上
□ アニメーションがスムーズ(FPS30以上)
□ 色以外でも判別可能(⭕❌アイコン)
□ タッチリップルが動く

【パフォーマンス】
□ 起動が3秒以内
□ FPSが30以上
□ メモリリークなし
□ リソース読み込みエラーなし

【アクセシビリティ】
□ キーボードで操作可能
□ altテキストあり
□ コントラスト比OK

確認者署名: __________________
承認日: __________________
```

---

## ステータス

**本AI指示書v1.1は Phase 0 の確定版として凍結する。**

変更は以下の場合のみ許可:
1. 致命的な問題の発見
2. 実装中の追加ルール必要性の判明
3. プロジェクトオーナーの明示的な指示
4. Gemini等の外部レビューでの重大指摘

---

## 改訂履歴

| バージョン | 日付 | 変更内容 | 承認者 |
|-----------|------|---------|--------|
| v1.0 | 2026-02-15 | 初版作成 | - |
| v1.1 | 2026-02-15 | Gemini提案反映、モック戦略明確化、型安全性強化 | - |

---

**作成日:** 2026-02-15  
**バージョン:** 1.1  
**Phase:** Phase 0  
**次のドキュメント:** 統合仕様書v1.1  
**関連ドキュメント:** UI設計書v1.1

---

## 最後に

このAI指示書は、**Claude Codeと協力して高品質なコードを作るための道しるべ**です。

守るべき3つの原則:
1. **一貫性** - 同じルールで同じ品質を
2. **可読性** - 誰が読んでも分かるコードを
3. **保守性** - 将来も安心して使えるコードを

質問があれば、いつでもこのドキュメントに戻ってきてください。

**Happy Coding! 🎮**
