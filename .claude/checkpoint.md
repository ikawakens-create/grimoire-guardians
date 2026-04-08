# セッション引き継ぎ

**保存日時**: 2026-04-08

---

## 今日やったこと

### キャラクタースキン全面改修（Week A〜D 完了）

**目標**: スキンを「着せ替えアイテム」から「旅の仲間キャラクター」へ再定義。評価7項目（有料ダウンロード品質含む）で95点のプランを実装。

| Week | コミット | 内容 |
|------|---------|------|
| A | `0b3730c` | Config.TAILOR_UNLOCK_LEVEL を1に修正・全25スキンに reactions/voiceFreq 追加・QuizScreen にキャラ常時表示＋ストリークエスカレーション |
| B | `40685a3` / `d233f7f` | WardrobeScreen（全画面試着室）新規作成・index.js ルーター追加・BookshelfScreen に greet 吹き出し＋きがえるボタン・CSS クラス名修正 |
| C | `6810f98` / `565fc6d` | CharacterAvatar に startTalking/victoryPose/sadReact/greet API 追加・SoundManager に playTalk（ゴニョゴニョSE）追加・UnitIntroScreen でフクロウとキャラの掛け合い＋はじめる！リアクション |
| D | `95c4f02` / `7026f1a` | CraftsmanScreen テイラータブ強化（シルエット表示・カードヒント・解放祝福モーダル）・差異修正（モーダルに正しいスキン画像を表示・コンテナサイズ修正） |

---

## 未コミットの変更

なし（working tree clean）

---

## 次にやること（優先順）

1. **Week E: 合成屋（CraftsmanScreen）UI 改修**
   - 現状：機能は揃っているが「作業画面」のような見た目
   - 改修方針：
     - NPCキャラ（テイラー担当NPC）の存在感を強化
     - テイラータブを「きがえや」として視覚的に分離（アイコン・色・雰囲気）
     - 素材クラフト・施設強化・スキンクラフトの3機能の導線を整理
     - 全体的に「お店に来た感」が出るビジュアルに
   - 対象ファイル: `src/screens/CraftsmanScreen.js`、`src/styles/components.css`

---

## 未解決のバグ・問題

なし

---

## 重要なメモ

### ブランチ・バージョン情報
- **現在のブランチ**: `claude/morning-standup-NoAvx`
- **現在のSWバージョン**: `v2.3.9`（sw.js）
- **WardrobeScreen.js**: ASSETS[] に追加済み

### 実装済みの主要 API

**CharacterAvatar（v2）**
```js
const avatar = new CharacterAvatar('md'); // sm/md/lg/xl
avatar.render();                 // DOM 要素生成（idle float 自動付与）
avatar.startTalking(text, ms);   // 吹き出し + ゴニョゴニョSE
avatar.stopTalking();            // 吹き出し即時除去
avatar.victoryPose(line);        // bounce + 吹き出し（1800ms）
avatar.sadReact(line);           // shake + 吹き出し（1200ms）
avatar.greet(name, streak);      // reactions.greet 展開して startTalking
```

**SoundManager 追加**
```js
SoundManager.playTalk(voiceFreq); // ゴニョゴニョSE（60ms×4バースト）
SoundType.TALK                    // 'talk'
```

**CraftsmanScreen 追加**
```js
this._skinImgFilter(skin, unlocked);   // brightness(0) or 金色 filter 文字列
this._cardObtainHint(skin, frags);     // カードヒントテキスト
this._showUnlockModal(skin, onEquip, onClose); // 祝福モーダル（streak/milestone でも流用可）
```

**WardrobeScreen（全画面試着室）**
- `GameStore.setState('app.currentScreen', 'wardrobe')` で遷移
- `_onBack` コールバックで bookshelf に戻る
- Create/Destroy パターン

### スキンシステム仕様
- **スキン総数**: 25（default 含む）/ コレクタブル 24
- **voiceFreq 目安**: かわいい系 380Hz / かっこいい系 220-280Hz / おもしろ系 480-550Hz / ひみつ系 300Hz
- **reactions フィールド**: correct / wrong / combo3 / combo5 / greet（{name}・{n} プレースホルダー）
- **SUPER_RARE シルエット**: `filter:brightness(0) sepia(1) saturate(3) hue-rotate(5deg)`

### 利用可能なアニメーション（effects.css）
bounce / shake / sparkle / float / slide-in-right / slide-in-up / slide-in-left / voice-bubble-in / voice-bubble-out / fade-in / glow-pulse

### CLAUDE.md ルール（特に重要なもの）
- 一度に触るファイルは最大3本
- 全ゲーム内テキストはひらがな（学年別漢字制限）
- `top/left/width/height` のアニメーション禁止（transform のみ）
- 既存ファイルを拡張できるのに新規ファイルを作らない
- `sw.js` の ASSETS[] 更新を忘れない
