# 船ビルド実装計画 — Phase D〜F：統合・大型艦・ポリッシュ

**前提**: Phase A（コアロジック）・Phase B（ShipBuildScreen UI）・Phase C（PNG アセット）が完了済み
**日付**: 2026-03-27

---

## Phase D — クイズ・ゾーン統合

### 目的

実際のゲームプレイ中に「船が存在する」ことを可視化する。
プレイヤーが船を意識しながらクイズに取り組む動機付けを強化する。

---

### D-1: QuizScreen ミニプレビュー

**ファイル**: `src/screens/QuizScreen.js`（差分のみ）

Grade 2 プレイ中、画面右下（または上部）に船のミニプレビューを常時表示する。

```js
// QuizScreen._renderHeader() 内に追加
if (GameStore.getState('app.currentGrade') === 2) {
  const miniCanvas = await ShipRenderer.renderMini(
    GameStore.getState('ship'), 120, 80
  );
  miniCanvas.className = 'quiz-ship-mini';
  headerEl.appendChild(miniCanvas);
}
```

**CSS（components.css 追記）**:

```css
.quiz-ship-mini {
  position: absolute;
  right: 12px;
  bottom: 8px;
  width: 120px;
  height: 80px;
  border-radius: 8px;
  opacity: 0.85;
  pointer-events: none;  /* タップ判定を妨げない */
}
```

---

### D-2: ResultScreen ドロップ表示に船サイズバッジ追加

**ファイル**: `src/screens/ResultScreen.js`（差分のみ）

ドロップ獲得演出の上部に船サイズバッジ（⛵/🚢/🛳️）を表示する。

```js
// _renderDrops() 内に追加
const shipSize = GameStore.getState('ship.size') ?? 'small';
const SHIP_BADGE = { small: '⛵', medium: '🚢', large: '🛳️' };
// バッジ要素を drops セクションのヘッダーに挿入
```

---

### D-3: ゾーン転換カットインで ShipRenderer 使用

**ファイル**: `src/screens/ResultScreen.js`（`_showZoneCutin` 差分）

現行の `upgrade.from` / `upgrade.to` 絵文字を ShipRenderer.renderMini() に差し替える。

```js
// 変更前（Phase A/B 時点）
midHtml = `
  <span class="zone-cutin-ship-from">${upgrade.from}</span>
  <span class="zone-cutin-ship-arrow">→</span>
  <span class="zone-cutin-ship-to">${upgrade.to}</span>
`;

// 変更後（Phase D）
const beforeCanvas = await ShipRenderer.renderMini(ship, 160, 106);
beforeCanvas.className = 'zone-cutin-ship-before';
const afterState = { ...ship, size: upgrade.newSize };
const afterCanvas = await ShipRenderer.renderMini(afterState, 160, 106);
afterCanvas.className = 'zone-cutin-ship-after';
// overlay に appendChild で挿入
```

---

### D-4: BookshelfScreen の _showShipUpgradeCutin を ShipRenderer 版に更新

**ファイル**: `src/screens/BookshelfScreen.js`（差分のみ）

Phase A では絵文字のみだったカットインを ShipRenderer 版に差し替える。

```js
// 変更前コメント: "Phase B で ShipRenderer.renderMini() を使った本格版に差し替え予定"
// ↑ このコメントを目印に差し替える

async _showShipUpgradeCutin(type) {
  const ship = GameStore.getState('ship');
  // ShipRenderer.renderMini() で現在の船と新サイズの船を並べる
  const currentCanvas = await ShipRenderer.renderMini(ship, 120, 80);
  // ...
}
```

**import 追加**:

```js
import ShipRenderer from '../components/ShipRenderer.js';
```

---

### D まとめ

| # | ファイル | 変更内容 |
|---|---------|---------|
| D-1 | QuizScreen.js | Grade 2 時にミニプレビュー表示 |
| D-2 | ResultScreen.js | ドロップ画面に船バッジ |
| D-3 | ResultScreen.js | zone カットインを ShipRenderer 版に |
| D-4 | BookshelfScreen.js | アップグレードカットインを ShipRenderer 版に |

---

## Phase E — 大型艦クラフト + ギルド統合

### 目的

`app.largeBlueprintObtained === true` の状態でギルドに行くと
大型艦のクラフトができる。完成すると `ship.largeCrafted = true`、`ship.size = 'large'` になる。

---

### E-1: GuildScreen にクラフトセクション追加

**ファイル**: `src/screens/GuildScreen.js`（差分のみ）

```js
// show() → _render() 内に追加
if (GameStore.getState('app.largeBlueprintObtained') && !GameStore.getState('ship.largeCrafted')) {
  mainEl.appendChild(this._buildLargeShipCraftSection());
}
```

```js
_buildLargeShipCraftSection() {
  const cost    = Config.GRADE2.LARGE_SHIP_CRAFT_COST;
  // { pearl:5, coral:5, anchor:3, deepstone:2 }
  const mats    = GameStore.getState('inventory.materials') ?? {};
  const canCraft = Object.entries(cost).every(([id, n]) => (mats[id] ?? 0) >= n);

  const section = document.createElement('div');
  section.className = 'guild-largeship-section';
  section.innerHTML = `
    <div class="guild-largeship-header">🚢 → 🛳️ だいがたかんせんクラフト</div>
    ${Object.entries(cost).map(([id, n]) =>
      `<div class="craft-cost-row">
        ${getMaterialEmoji(id)} ${getMaterialName(id)} × ${n}
        <span class="${(mats[id]??0)>=n ? 'cost-ok' : 'cost-ng'}">
          （もち: ${mats[id]??0}）
        </span>
      </div>`
    ).join('')}
    <button type="button" class="button button-large guild-largeship-btn"
      ${canCraft ? '' : 'disabled'}>
      ${canCraft ? '⚒️ クラフトする！' : '素材が たりない…'}
    </button>
  `;

  section.querySelector('.guild-largeship-btn')?.addEventListener('click', () => {
    this._craftLargeShip(cost, mats);
  });
  return section;
}
```

---

### E-2: 大型艦クラフト完成演出

**ファイル**: `src/screens/GuildScreen.js`（差分のみ）

```js
async _craftLargeShip(cost, mats) {
  // 素材を消費
  const newMats = { ...mats };
  Object.entries(cost).forEach(([id, n]) => { newMats[id] = (newMats[id] ?? 0) - n; });
  GameStore.setState('inventory.materials', newMats);

  // フラグ更新
  GameStore.setState('ship.largeCrafted', true);
  GameStore.setState('ship.size', 'large');

  // フルスクリーン完成演出
  await this._showLargeShipCompleteAnim();

  // ギルドクエスト SQ-3 相当の完了通知
  GameStore.setState('guild.newQuestBadge', true);
}
```

```js
async _showLargeShipCompleteAnim() {
  const overlay = document.createElement('div');
  overlay.className = 'largeship-complete-overlay';
  overlay.innerHTML = `
    <div class="largeship-complete-box">
      <div class="largeship-complete-emoji">🛳️</div>
      <div class="largeship-complete-title">だいがたかんせん かんせい！！</div>
      <div class="largeship-complete-body">
        タコぞう「やったー！！！これが……伝説のふねだ！！」
      </div>
      <button class="button button-large largeship-complete-ok">ふねを みる！</button>
    </div>
  `;
  document.body.appendChild(overlay);

  await new Promise(resolve => {
    overlay.querySelector('.largeship-complete-ok').addEventListener('click', () => {
      overlay.remove();
      GameStore.setState('app.currentScreen', 'ship_build');
      resolve();
    });
  });
}
```

---

### E-3: SaveManager Phase B スロットキー移行を実行

**ファイル**: `src/core/SaveManager.js`

Phase A で コメントアウトしておいた移行コードを有効化する。

```js
// _migrateShipState() 内の Phase B 追記コメントを解除
const keyMap = { hull:'katachi', sail:'suishin',
                 figurehead:'senshu', deck:'senbi',
                 flag:'hata', glow:'oura' };
Object.entries(keyMap).forEach(([oldKey, newKey]) => {
  if (oldKey in ship) { ship[newKey] = ship[oldKey]; delete ship[oldKey]; }
});
```

また localStorage フラグを `'gg_ship_migrated_v2'` に更新する。

---

### E-4: GameStore に ship.largeCrafted 追加

**ファイル**: `src/core/GameStore.js`（差分のみ）

```js
// ship 初期値に追加（Phase B 計画書に記載済み）
largeCrafted: false,
```

`reset()` 内にも同様に追加。

---

### E まとめ

| # | ファイル | 変更内容 |
|---|---------|---------|
| E-1 | GuildScreen.js | 大型艦クラフトセクション追加 |
| E-2 | GuildScreen.js | 完成演出アニメーション |
| E-3 | SaveManager.js | Phase B スロットキー移行コード有効化 |
| E-4 | GameStore.js | ship.largeCrafted フィールド追加 |

---

## Phase F — サウンド・ポリッシュ

### 目的

船ビルドシステムのサウンド・細かい UX を仕上げる。
SoundManager が現在モック実装のため、SE の定義追加のみ行い本実装は Phase 1（Audio）待ち。

---

### F-1: SoundManager に船 SE 定数を追加

**ファイル**: `src/core/SoundManager.js`（差分のみ）

```js
// SoundType に追加
export const SoundType = {
  // ...既存...
  SHIP: {
    EQUIP_PART:     'ship_equip_part',     // パーツ装備
    CRAFT_PART:     'ship_craft_part',     // パーツクラフト
    THEME_COMPLETE: 'ship_theme_complete', // テーマ達成
    SIZE_UP:        'ship_size_up',        // サイズアップ
    LARGE_COMPLETE: 'ship_large_complete', // 大型艦完成
    WAVE_AMBIENT:   'ship_wave_ambient',   // 波音ループ
  },
};
```

---

### F-2: ShipBuildScreen に SE 呼び出しを追加

**ファイル**: `src/screens/ShipBuildScreen.js`（差分のみ）

```js
// パーツ装備時
SoundManager.playSFX(SoundType.SHIP.EQUIP_PART);

// クラフト時
SoundManager.playSFX(SoundType.SHIP.CRAFT_PART);

// テーマ完成時
SoundManager.playSFX(SoundType.SHIP.THEME_COMPLETE);
```

---

### F-3: components.css アニメーション追加

```css
/* 大型艦完成オーバーレイ */
.largeship-complete-overlay {
  position: fixed; inset: 0; z-index: 400;
  background: rgba(0, 0, 0, 0.9);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.4s ease;
}
.largeship-complete-box {
  text-align: center; max-width: 400px;
  background: linear-gradient(135deg, #1565C0, #0D47A1);
  border: 3px solid gold; border-radius: 24px; padding: 40px;
  animation: slideUp 0.5s ease;
}
.largeship-complete-emoji {
  font-size: 80px;
  animation: shipBounce 0.8s ease infinite alternate;
}
@keyframes shipBounce {
  from { transform: translateY(0); }
  to   { transform: translateY(-12px); }
}

/* ギルド 大型艦クラフトセクション */
.guild-largeship-section {
  margin: 16px; padding: 20px;
  background: linear-gradient(135deg, #0D47A1 0%, #1565C0 100%);
  border-radius: 16px; color: white;
}
.cost-ok { color: #A5D6A7; }
.cost-ng { color: #EF9A9A; }
```

---

### F-4: effects.css — ホットスポットパルスアニメ追加

```css
/* ShipBuildScreen オンボーディング用 */
@keyframes hotspotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb), 0.7); }
  50%       { box-shadow: 0 0 0 12px rgba(var(--color-primary-rgb), 0); }
}
.ship-hotspot.pulse {
  animation: hotspotPulse 1.5s ease-in-out infinite;
}
```

---

### F まとめ

| # | ファイル | 変更内容 |
|---|---------|---------|
| F-1 | SoundManager.js | SHIP SE 定数追加（モック） |
| F-2 | ShipBuildScreen.js | SE 呼び出し挿入 |
| F-3 | components.css | 大型艦完成演出・クラフト UI スタイル |
| F-4 | effects.css | ホットスポットパルスアニメ |

---

## 全フェーズ実装順序まとめ

```
Phase A ✅ コアロジック（9ファイル）
  ↓
Phase B   ShipBuildScreen UI 刷新（5ファイル）
  ↓
Phase C   PNG アセット生成・配置
  ↓
Phase D   クイズ・ゾーン統合（4ファイル差分）
  ↓
Phase E   大型艦クラフト + ギルド統合（4ファイル差分）
  ↓
Phase F   サウンド・ポリッシュ（4ファイル差分）
```

---

## バグリスク・注意事項

| フェーズ | リスク | 対策 |
|--------|--------|------|
| D-3 | `ShipRenderer.renderMini()` が async なのに zone カットイン内で await できない | `_showZoneCutin` を async 化するか、事前に canvas を生成してから overlay を構築する |
| D-4 | BookshelfScreen で ShipRenderer を import すると循環参照の可能性 | ShipRenderer は pure utility（GameStore/Config のみ依存）なので問題なし |
| E-3 | 移行フラグを `v1` から `v2` に変えると `v1` が当たった旧デバイスでも再実行される | `v2` 移行コードは `v1` の完了後にのみ実行されるよう `&&` 条件を追加する |
| E-4 | `ship.largeCrafted` を GameStore に追加し忘れると GuildScreen でエラー | E-4 を E-1 より先に実装する |
| F-2 | SoundManager がモックのまま SE を呼ぶとコンソールログが増える | `Logger.debug` レベルなので本番では問題なし |

---

## Phase B 計画書との関係

- `docs/船ビルド実装計画_PhaseB_v1.0.md` — ShipBuildScreen UI・ShipRenderer 詳細仕様
- `docs/船ビルド実装計画_PhaseC_アセット生成.md` — PNG プロンプト・配置手順
- `docs/船ビルド実装計画_PhaseD-F_統合とポリッシュ.md` — 本ドキュメント
