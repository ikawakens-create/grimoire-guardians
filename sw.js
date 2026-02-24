/**
 * sw.js - Grimoire Guardians
 * Service Worker（オフラインキャッシュ）
 *
 * バージョン番号を上げるだけで古いキャッシュが自動削除される。
 * 将来的に音声ファイルなどを追加する際は ASSETS 配列に追記すること。
 *
 * @version 1.0.0
 * @date 2026-02-23
 */

const SW_VERSION   = '1.1.0';
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
  './src/components/BookCard.js',
  './src/components/ProgressBar.js',
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
  // Phase 0.2 問題データ（M1-11・M1-12）
  './src/data/questions/M1-11a.js',
  './src/data/questions/M1-11b.js',
  './src/data/questions/M1-11c.js',
  './src/data/questions/M1-11d.js',
  './src/data/questions/M1-12a.js',
  './src/data/questions/M1-12b.js',
  './src/data/questions/M1-12c.js',
  './src/utils/TypeValidator.js',
  './src/utils/HapticFeedback.js',
  './src/styles/common.css',
  './src/styles/layout.css',
  './src/styles/components.css',
  './src/styles/effects.css',
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
