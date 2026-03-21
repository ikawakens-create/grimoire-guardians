/**
 * sw.js - Grimoire Guardians
 * Service Worker（オフラインキャッシュ）
 *
 * バージョン番号を上げるだけで古いキャッシュが自動削除される。
 * 将来的に音声ファイルなどを追加する際は ASSETS 配列に追記すること。
 *
 * @version 1.6.1
 * @date 2026-03-04
 */

const SW_VERSION   = '2.2.3';
const CACHE_NAME   = `grimoire-${SW_VERSION}`;

/** キャッシュ対象ファイル（静的アセット） */
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/index.js',
  './src/core/Config.js',
  './src/core/Logger.js',
  './src/core/GameStore.js',
  './src/core/SoundManager.js',
  './src/core/SaveManager.js',
  './src/core/EventManager.js',
  './src/screens/WelcomeScreen.js',
  './src/screens/BookshelfScreen.js',
  './src/screens/QuizScreen.js',
  './src/screens/ResultScreen.js',
  './src/screens/UnitIntroScreen.js',
  './src/screens/ChantScreen.js',
  './src/screens/FinalBattleScreen.js',
  // ストーリーシステム
  './src/data/storyData.js',
  './src/data/dimensionConfig.js',
  './src/screens/InventoryScreen.js',
  './src/screens/MemoryIsleScreen.js',
  './src/screens/HouseScreen.js',
  './src/screens/HouseBuildScreen.js',
  './src/screens/ShipBuildScreen.js',
  './src/screens/PhotoScreen.js',
  './src/screens/CraftsmanScreen.js',
  './src/core/HouseManager.js',
  './src/data/houseItems.js',
  './src/data/styleItems.js',
  // Phase 1-E 街のシステム
  './src/core/TownManager.js',
  './src/screens/TownScreen.js',
  './src/screens/GrimoireLibraryScreen.js',
  './src/screens/ShopScreen.js',
  './src/screens/GuildScreen.js',
  './src/screens/FarmScreen.js',
  './src/data/shipItems.js',
  // Phase 1-F スキンシステム
  './src/core/SkinManager.js',
  './src/data/skinItems.js',
  './src/components/CharacterAvatar.js',
  './src/data/memory-monsters.js',
  './src/components/BookCard.js',
  './src/components/ProgressBar.js',
  './src/components/ClockFace.js',
  './src/components/ShapeFace.js',
  './src/events/OmikujiEvent.js',
  './src/events/MonsterBattleEvent.js',
  './src/events/TreasureEvent.js',
  './src/events/ThreePathsEvent.js',
  './src/data/worlds.js',
  './src/data/units.js',
  // Phase 0.1 問題データ
  './src/data/questions/M1-01.js',
  './src/data/questions/M1-02.js',
  './src/data/questions/M1-03.js',
  './src/data/questions/M1-04.js',
  './src/data/questions/M1-05.js',
  './src/data/questions/M1-05b.js',
  './src/data/questions/M1-06.js',
  './src/data/questions/M1-06b.js',
  // Phase 0.2 問題データ（M1-07〜M1-10d）
  './src/data/questions/M1-07.js',
  './src/data/questions/M1-08a.js',
  './src/data/questions/M1-08b.js',
  './src/data/questions/M1-08c.js',
  './src/data/questions/M1-09.js',
  './src/data/questions/M1-10a.js',
  './src/data/questions/M1-10b.js',
  './src/data/questions/M1-10c.js',
  './src/data/questions/M1-10d.js',
  // Phase 0.2 問題データ（M1-11・M1-12）
  './src/data/questions/M1-11a.js',
  './src/data/questions/M1-11b.js',
  './src/data/questions/M1-11c.js',
  './src/data/questions/M1-11d.js',
  './src/data/questions/M1-12a.js',
  './src/data/questions/M1-12b.js',
  './src/data/questions/M1-12c.js',
  // Phase 0.2 問題データ（M1-13・M1-13b）
  './src/data/questions/M1-13.js',
  './src/data/questions/M1-13b.js',
  // Phase 0.3 問題データ（M1-14〜M1-16）
  './src/data/questions/M1-14a.js',
  './src/data/questions/M1-14b.js',
  './src/data/questions/M1-14c.js',
  './src/data/questions/M1-14d.js',
  './src/data/questions/M1-15a.js',
  './src/data/questions/M1-15b.js',
  './src/data/questions/M1-16a.js',
  './src/data/questions/M1-16b.js',
  './src/data/questions/M2-01.js',
  './src/data/questions/M2-02.js',
  './src/data/questions/M2-02b.js',
  './src/data/questions/M2-03.js',
  './src/data/questions/M2-03b.js',
  './src/data/questions/M2-04.js',
  './src/data/questions/M2-04b.js',
  './src/data/questions/M2-05.js',
  './src/data/questions/M2-06a.js',
  './src/data/questions/M2-06b.js',
  './src/data/questions/M2-07.js',
  './src/data/questions/M2-08.js',
  './src/data/questions/M2-09a.js',
  './src/data/questions/M2-09b.js',
  './src/data/questions/M2-09c.js',
  './src/data/questions/M2-09d.js',
  './src/data/questions/M2-10a.js',
  './src/data/questions/M2-10b.js',
  './src/data/questions/M2-10c.js',
  './src/data/questions/M2-10d.js',
  './src/data/questions/M2-10e.js',
  './src/data/questions/M2-10f.js',
  './src/data/questions/M2-10g.js',
  './src/data/questions/M2-10h.js',
  './src/data/questions/M2-10i.js',
  './src/data/questions/M2-10j.js',
  './src/data/questions/M2-10k.js',
  './src/data/questions/M2-11.js',
  './src/data/questions/M2-12.js',
  './src/data/questions/M2-12b.js',
  './src/data/questions/M2-13a.js',
  './src/data/questions/M2-13b.js',
  './src/data/questions/M2-13c.js',
  './src/data/questions/M2-14a.js',
  './src/data/questions/M2-14b.js',
  './src/data/questions/M2-14c.js',
  './src/data/questions/M2-14d.js',
  './src/data/questions/M2-14e.js',
  './src/data/questions/M2-15a.js',
  './src/data/questions/M2-15b.js',
  './src/data/questions/M2-15c.js',
  './src/data/questions/M2-15d.js',
  './src/utils/TypeValidator.js',
  './src/utils/HapticFeedback.js',
  './src/styles/common.css',
  './src/styles/layout.css',
  './src/styles/components.css',
  './src/styles/effects.css',
  // 家ビジュアル画像（スプライトシート1枚/スタイル）
  './assets/houses/style_wood/spritesheet.png',
  './assets/houses/style_ice/spritesheet.png',
  './assets/houses/style_stone/spritesheet.png',
  './assets/houses/style_brick/spritesheet.png',
  './assets/houses/style_bamboo/spritesheet.png',
  './assets/houses/style_forest/spritesheet.png',
  './assets/houses/style_sakura/spritesheet.png',
  './assets/houses/style_candy/spritesheet.png',
  './assets/houses/style_flame/spritesheet.png',
  './assets/houses/style_sea/spritesheet.png',
  './assets/houses/style_black/spritesheet.png',
  './assets/houses/style_thunder/spritesheet.png',
  './assets/houses/style_moon/spritesheet.png',
  './assets/houses/style_jewel/spritesheet.png',
  './assets/houses/style_star/spritesheet.png',
];

// ─── インストール ──────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  // 古い SW を待たずに即座に有効化
  self.skipWaiting();
});

// ─── 有効化（古いキャッシュを削除） ──────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  // 既存クライアントを即座に制御下に置く
  self.clients.claim();
});

// ─── フェッチ（Cache First 戦略） ────────────────────────
self.addEventListener('fetch', (event) => {
  // POST / chrome-extension などはスキップ
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // 成功したレスポンスをキャッシュに追加
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // オフライン時: ページナビゲーションはトップを返す
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
