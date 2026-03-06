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

**Grimoire Guardians** (グリモア・ガーディアンズ) is an educational math game PWA targeting Japanese elementary school students (grades 1-6). Players progress through quiz-based worlds, collecting materials and building a customizable house in a town. The app is landscape-only and touch-optimized.

- **Config version**: `0.1.0` / `Phase 0.1` (metadata not kept in sync — see **Project Status** for actual state)
- **Service Worker**: v2.1.1 (cache name `grimoire-2.1.1`)
- **Language**: Pure vanilla JavaScript (ES6 Modules), no frameworks or build tools
- **Target**: 60fps, mobile-first, offline-capable PWA
- **Content Language**: Japanese (game content, docs, and inline comments)

## Repository Structure

```
grimoire-guardians/
├── index.html              # PWA entry point (loads src/index.js as ES module)
├── manifest.json           # PWA manifest (landscape, standalone)
├── sw.js                   # Service Worker v2.1.1 (cache-first, offline support)
├── CLAUDE.md
├── README.md
├── src/
│   ├── index.js            # App initialization, global router (v1.2, window.GG debug)
│   ├── core/
│   │   ├── Config.js       # Frozen configuration constants
│   │   ├── Logger.js       # Logging system with levels/timing
│   │   ├── GameStore.js    # Observable state management (single source of truth)
│   │   ├── SoundManager.js # Audio system (Phase 0 mock, Web Audio planned)
│   │   ├── SaveManager.js  # IndexedDB + localStorage persistence, streak calculation
│   │   ├── EventManager.js # Quiz event orchestration (omikuji/monster/treasure/paths)
│   │   ├── HouseManager.js # House building: section unlock, milestones, item crafting (v2.0)
│   │   ├── TownManager.js  # Town facilities: unlock/upgrade, shop, farm (v1.0)
│   │   └── SkinManager.js  # Character skin: unlock, equip, craft, fragments (v1.0)
│   ├── components/
│   │   ├── BookCard.js        # World card UI component
│   │   ├── ProgressBar.js     # Quiz progress indicator
│   │   ├── ClockFace.js       # SVG analog clock renderer (for type:'clock' questions)
│   │   └── CharacterAvatar.js # Character avatar with current skin display
│   ├── screens/               # 15 screens total
│   │   ├── WelcomeScreen.js        # Title/name entry (first login)
│   │   ├── BookshelfScreen.js      # World selection grid (3-4 column)
│   │   ├── QuizScreen.js           # Quiz UI + clock rendering
│   │   ├── ResultScreen.js         # Score, stars, material drops
│   │   ├── InventoryScreen.js      # Material inventory view
│   │   ├── TownScreen.js           # Town hub v2.0 (SVG map with hotspots)
│   │   ├── HouseScreen.js          # House overview v3.1 (layer compositing + fullset bonus)
│   │   ├── HouseBuildScreen.js     # House editor (furniture/style placement)
│   │   ├── PhotoScreen.js          # Photo gallery: frame/stamp/pose, canvas download (v1.0)
│   │   ├── CraftsmanScreen.js      # Synthesis/crafting hub
│   │   ├── GrimoireLibraryScreen.js# Unit glossary & unlock info
│   │   ├── ShopScreen.js           # Material trading, daily free item
│   │   ├── GuildScreen.js          # Guild/quest system
│   │   ├── FarmScreen.js           # Farming minigame (plots, harvest)
│   │   └── MemoryIsleScreen.js     # Monster collection (4 layers, 40 monsters)
│   ├── events/
│   │   ├── OmikujiEvent.js       # Reward multiplier / shield event
│   │   ├── MonsterBattleEvent.js # Slash/explode animations
│   │   ├── TreasureEvent.js      # Treasure chest / mimic
│   │   └── ThreePathsEvent.js    # Branching path choice
│   ├── utils/
│   │   ├── TypeValidator.js  # Runtime type/schema validation (incl. clockFace)
│   │   └── HapticFeedback.js # Vibration API wrapper
│   ├── data/
│   │   ├── worlds.js          # 33 world definitions (world_1 to world_16b, v4.0)
│   │   ├── units.js           # Unit registry with lazy import loaders (v3.0)
│   │   ├── houseItems.js      # Furniture & decoration catalog (section, rarity, crafting cost)
│   │   ├── skinItems.js       # 24 character skins + default (obtain methods, rarity)
│   │   ├── styleItems.js      # 15 house styles with spritesheet paths
│   │   ├── memory-monsters.js # 40 monsters (4 layers) with layer unlock requirements
│   │   └── questions/         # 700+ questions across 33 unit files (pool, 15 picked per play)
│   │       ├── M1-01.js  ...  M1-16b.js   # All 33 units (see full list below)
│   └── styles/
│       ├── common.css      # CSS variables, base styles, orientation warning
│       ├── layout.css      # Grid/flex layout system, screen layouts
│       ├── components.css  # Button, card, progress bar, quiz styles
│       └── effects.css     # 20+ keyframe animations, GPU-accelerated effects
├── docs/                   # Design docs and specs (Japanese)
│   ├── AI指示書_v1.1_Grimoire_Guardians.md
│   ├── UI設計書_v1.1_Grimoire_Guardians.md
│   ├── 統合仕様書_v1.3_Grimoire_Guardians.md
│   ├── ロードマップ_v1.4_Grimoire_Guardians_最終完成版.md
│   ├── 家ビルド設計書_v1.0.md
│   └── Phase_0_* / Week3_* (historical memos)
└── assets/
    ├── houses/             # 15 house style spritesheets (PNG)
    │   ├── style_wood/spritesheet.png
    │   ├── style_ice/spritesheet.png
    │   ├── style_stone/spritesheet.png  ... (15 total)
    ├── icons/              # (not yet populated)
    ├── fonts/              # (not yet populated)
    └── sounds/             # (not yet populated — Phase 1 Web Audio planned)
```

## How to Run

No build step is required. Serve the project root with any static HTTP server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

Open `http://localhost:8000` in a browser (landscape orientation). There is no `package.json`, no npm dependencies, and no build pipeline.

## Architecture

### No-Framework Vanilla JS

All code uses native ES Modules (`import`/`export`). No bundler, transpiler, or framework is used. The browser loads `src/index.js` as `<script type="module">`.

### Routing — Global Router in index.js

`index.js` acts as the global router. It holds singleton screen instances and subscribes to `app.currentScreen` state changes. There are **two screen lifecycle patterns**:

| Pattern | Screens | Description |
|---------|---------|-------------|
| **Create/Destroy** | WelcomeScreen, BookshelfScreen, QuizScreen, ResultScreen | Instantiated fresh each time; `destroy()` called on exit |
| **Show/Hide** | HouseScreen, HouseBuildScreen, PhotoScreen, CraftsmanScreen, TownScreen, GrimoireLibraryScreen, ShopScreen, GuildScreen, FarmScreen | Created once, persisted in module-level variables; `show(container)` / `hide()` called |

Navigating between screens: set `GameStore.setState('app.currentScreen', 'screen_name')`. The router's subscriber calls `hideAll()` before showing the target screen.

Valid screen names: `'welcome'`, `'bookshelf'`, `'quiz'`, `'result'`, `'house'`, `'house_build'`, `'photo'`, `'craftsman'`, `'town'`, `'library'`, `'shop'`, `'guild'`, `'farm'`.

### State Management — GameStore (Observable Pattern)

`GameStore` (`src/core/GameStore.js`) is the single source of truth. State is accessed via dot-notation paths:

```js
GameStore.getState('player.name');
GameStore.setState('app.currentScreen', 'quiz');
GameStore.mergeState('progress.stats', { totalCorrect: 5 });
// IMPORTANT: subscriber signature is (path, newValue, oldValue) — path is first argument
GameStore.subscribe((path, newValue, oldValue) => { /* react */ });
```

Full state structure:

```
app               — isInitialized, isLoading, currentScreen, error
player            — name, createdAt, lastPlayedAt, streak, streakLastDate,
                    currentSkin, unlockedSkins[], skinFragments{}
progress          — subject, grade, worlds{}, stats{totalQuestions,correctAnswers,accuracy,totalPlayTime}
inventory         — materials{wood,stone,brick,gem,star_fragment,cloth,paint,crown,cape,magic_orb}
currentSession    — worldId, unitId, questions[], currentQuestionIndex, answers[],
                    startedAt, rewardMultiplier, shieldActive, activeBuffs[]
license           — core{licensed,licenseKey,activatedAt}, dlc{}
memory            — clearCounts{worldId:count}, collected[monsterIds]
house             — sections{floor1,garden,floor2,exterior,floor3,tower},
                    unlockedStyles[], layerStyles{garden,floor1,floor2,floor3,tower,decoration},
                    photo{unlockedFrames[],unlockedStamps[],currentFrame,currentPose,stampPlacements[]},
                    garden{path,decorations[8],monsters[3]},
                    floor1{wallpaper,floor,furniture[8]}, floor2{...}, floor3{furniture[6]},
                    tower{decorations[4]}, exteriorDeco{banner,signboard,chimney,roofDeco},
                    crafted[], triggeredMilestones[], bonusSlots{garden_extra,floor1_extra}
town              — buildings{craftsman{level},library{level},shop{level},guild{level},farm{level}},
                    shop{dailyFreeClaimedDate}, farm{plots[],quizCount}
```

### Configuration — Config.js

`Config` (`src/core/Config.js`) is a deeply-frozen object. Key top-level namespaces:

| Namespace | Contents |
|-----------|----------|
| `Config.GAME` | CLEAR_THRESHOLD (0.6), FREE_WORLDS_COUNT (3), DISTRACTOR_COUNT (2) |
| `Config.EVENTS` | RARE_MONSTER_RATE, MIMIC_RATE, RARE_PATH_RATE, OMIKUJI_RATES |
| `Config.DROP` | Drop rates per event type (35%–100%) |
| `Config.UI` | Animation speeds (150/300/500ms), TOAST_DURATION, AUTO_TRANSITION_DELAY |
| `Config.STORAGE` | localStorage keys, IndexedDB name/version/stores |
| `Config.FEATURES` | Feature flags: ENABLE_HOUSE_BUILD (true), ENABLE_SKINS (true), ENABLE_MEMORY_ISLE (false), ENABLE_DLC (false) |
| `Config.HOUSE` | Section/style unlock worlds, fullset bonuses, combo names, photo frames/stamps/poses, milestones, slot counts |
| `Config.TOWN` | BUILDINGS[], MAX_BUILDING_LEVEL, HUB_UNLOCK_TABLE, UPGRADE_COSTS, LEVEL_PERKS, SHOP{}, FARM{}, NPCS[] |
| `Config.SKIN` | FRAGMENT_DROP_RATE (0.15), FRAGMENTS_NEEDED (3), TAILOR_UNLOCK_LEVEL (2) |

> **Note**: `Config.APP_VERSION` (`'0.1.0'`) and `Config.APP_PHASE` (`'Phase 0.1'`) are stale metadata. Do not rely on them for understanding the actual implementation state.

### Core Systems

| Module | Description |
|--------|-------------|
| `Logger.js` | Levels (debug/info/warn/error), timing (`Logger.time`/`Logger.timeEnd`), grouping, optional storage (≤1000 entries) |
| `SaveManager.js` | IndexedDB persistence + localStorage backup; `init()` loads save, calculates streak |
| `EventManager.js` | Orchestrates omikuji/monster/treasure/three_paths events during quizzes |
| `HouseManager.js` | Section unlock based on cleared world count, milestone auto-trigger, item crafting, style unlock |
| `TownManager.js` | Facility unlock/upgrade, `onQuizCompleted()` (called in ResultScreen), shop trading, farm harvest |
| `SkinManager.js` | `checkStreakUnlocks()` (called at app init), `checkMilestoneUnlocks()` (called after quiz result), fragment collection |

### Type Validation — TypeValidator.js

Runtime type checking as a lightweight TypeScript alternative. Use `TypeValidator.matchesSchema()` for complex objects and specialized validators like `validateQuestion()` and `validateSaveData()`. Questions with `type:'clock'` are validated to also include `clockFace: { hour: 0-23, minute: 0-59 }`.

### Sound — SoundManager.js

Phase 0 is a mock implementation (logs to console). Sound types are defined as constants (`SoundType.UI.BUTTON_CLICK`, etc.). Web Audio API implementation is planned for Phase 1.

## CSS Architecture

Four layered CSS files loaded in `index.html`:

1. **common.css** — 40+ CSS custom properties (colors, spacing, typography, shadows, z-index scale, transitions), base resets, orientation warning, accessibility helpers
2. **layout.css** — Container, grid (2/3/4 column), flex utilities, screen layouts (bookshelf, quiz, result), modal system, spacing utilities
3. **components.css** — Buttons (variants: large/small/success/danger/warning/secondary), BookCard with locked state, ProgressBar, quiz choice grid, badges, multiplier/shield icons
4. **effects.css** — Keyframe animations (fade, slide, bounce, pulse, shake, spin, float, glow), game-specific effects (slash, explode, sparkle, drop-fall), screen transitions, drop rarity glow effects, touch ripple

All animations use `transform`/`will-change` for GPU acceleration. Standard border-radius is `12px` (large: `20px`). Transition speeds: fast `0.15s`, normal `0.3s`, slow `0.5s`.

## Coding Conventions

### Naming

| Element | Convention | Example |
|---------|-----------|---------|
| Classes/Modules | PascalCase | `GameStore`, `SoundManager` |
| Methods/Functions | camelCase | `getState`, `hideLoadingScreen` |
| Private methods | `_` prefix | `_notifySubscribers` |
| Constants | UPPER_SNAKE_CASE | `APP_VERSION`, `CLEAR_THRESHOLD` |
| CSS classes | kebab-case | `.book-card`, `.progress-bar` |
| State paths | dot notation | `'player.name'`, `'progress.worlds'` |

### Module Pattern

- One class/module per file
- `export default` for the primary class; named exports for related constants (e.g., `SoundType`)
- Avoid circular dependencies

### Documentation

- JSDoc comments on all public methods with `@param`, `@returns`, `@example`
- Japanese comments for domain-specific game logic
- File headers include `@version` and `@date`

### Performance Rules

- Use `transform` and `will-change` for animations (never animate `top`/`left`/`width`/`height`)
- Target 60fps — use `requestAnimationFrame` for JS animations
- Enable GPU acceleration via `transform: translateZ(0)` where needed
- Lazy-load images; preload next question data
- Touch actions restricted to `pan-x` and `pinch-zoom`

## Game Domain

### Worlds and Units

33 worlds containing units. Each unit has a pool of 15–25 questions; each play picks 15 via `stepConfig`. Phase 0.3 covers M1-01 through M1-16b (Grade 1 math, based on 日本文教出版 textbook).

**All 33 question files** (`src/data/questions/`):

| File | Topic | Notes |
|------|-------|-------|
| M1-01 | 1〜5のかず | 25問 pool, 5 steps |
| M1-02 | 6〜10のかず | 23問 pool, 4 steps |
| M1-03 | なんばんめ | 22問 pool, 4 steps |
| M1-04 | たしざん① | 21問 pool, 3 steps |
| M1-05 | ひきざん① | 25問 pool, 5 steps |
| M1-05b | ひきざん① 応用 | 22問 pool, 4 steps |
| M1-06 | 10までのかず | 25問 pool, 5 steps |
| M1-06b | 10までのかず 応用 | 22問 pool, 4 steps |
| M1-07 | 20までのかず | 25問 pool, 5 steps |
| M1-08a | なんじ・ちょうど | 17問 pool, 3 steps, `type:'clock'` |
| M1-08b | なんじはん | 17問 pool, 3 steps, `type:'clock'` |
| M1-08c | 5ふんたんい | 17問 pool, 3 steps, `type:'clock'` |
| M1-09 | さくらんぼ算 | 25問 pool, 5 steps |
| M1-10a | くりあがり 9のせかい | 18問 pool, 3 steps |
| M1-10b | くりあがり 8のせかい | 18問 pool, 3 steps |
| M1-10c | くりあがり 7・6のせかい | 18問 pool, 3 steps |
| M1-10d | くりあがりのおうよう | 19問 pool, 3 steps |
| M1-11a | 10からひくひみつ | 24問 pool, 4 steps |
| M1-11b | くりさがり 11・12のせかい | 23問 pool, 4 steps |
| M1-11c | くりさがり 13〜18のせかい | 23問 pool, 4 steps |
| M1-11d | くりさがりのおうよう | 24問 pool, 4 steps |
| M1-12a | 3つのかずのたしざん | 24問 pool, 5 steps |
| M1-12b | 3つのかずのひきざん | 24問 pool, 5 steps |
| M1-12c | たしざん・ひきざんまじり | 24問 pool, 5 steps |
| M1-13 | かたちあそび | 24問 pool, 5 steps, distractorPool形式 |
| M1-14a | かずの よみかき・10のまとまり | |
| M1-14b | かずの じゅんばん と だいしょう | |
| M1-14c | おおきいかずの たしざん | |
| M1-14d | おおきいかずの ひきざん | |
| M1-15a | なんじなんぷん 前半（〜30ぷん） | `type:'clock'` |
| M1-15b | なんじなんぷん 後半（31〜59ぷん） | `type:'clock'` |
| M1-16a | ずをつかって・たしざん文章題 | |
| M1-16b | ずをつかって・ひきざん文章題 | phase_complete flag |

Time/clock units use `type:'clock'` questions which render an SVG analog clock via `ClockFace.renderSVG(hour, minute)`. These questions include `clockFace: { hour, minute }`.

### Quiz Flow

1. Player selects a world/unit from the bookshelf screen
2. Questions presented one at a time (multiple choice, 2-column grid)
3. Correct/wrong feedback with animations
4. Events may trigger at specific question thresholds (omikuji, monster battle, treasure chest, branching path)
5. Results screen shows score and material drops; `TownManager.onQuizCompleted()` and `SkinManager.checkMilestoneUnlocks()` are called
6. 60% correct answers required to clear a unit (`Config.GAME.CLEAR_THRESHOLD`)

### Event System

| Event | Trigger | Effect |
|-------|---------|--------|
| Omikuji (おみくじ) | Question threshold | Reward multiplier (1.5x–3x) or shield |
| Monster Battle | Correct answer streak | Slash/explode animations, material drops |
| Treasure Chest | Random | Material drops (10% mimic chance); 15% chance of skin fragment |
| Three Paths | Random | Normal path (70% drop) vs rare path (100% drop) |

### Material Drop Rates

- Normal question: 35%
- Normal path: 70%, Rare path: 100%
- Normal monster: 75%, Rare monster: 100%
- Treasure/Mimic: 100%

Materials: `wood`, `stone`, `brick`, `gem`, `star_fragment`, `cloth`, `paint`, `crown`, `cape`, `magic_orb`.

### House Building System (Phase 1-D)

Sections unlock progressively based on cleared world count:

| Section | Unlocks at worlds cleared |
|---------|--------------------------|
| floor1 | 0 (always available) |
| garden | 7 |
| floor2 | 11 |
| exterior | 13 |
| floor3 | 19 |
| tower | 33 (full completion) |

15 house styles unlock progressively (world 0–33). Spritesheets: `assets/houses/style_*/spritesheet.png`.

Fullset bonus: matching 2–6 layers triggers glow/badge/aura/master effects. Combo names activate for specific style combinations (e.g., all `style_flame` + `style_black` = `'まおうのおしろ！'`).

Milestones auto-trigger at world-count thresholds (world 2 → auto-craft `bed_wood`, world 16 → garden slot +4, world 20 → auto-craft `wallpaper_stars`, world 24 → floor1 slot +4, world 28 → auto-craft `crystal_ball`).

Photo system: 8 frame types, 15 stamps, 4 poses. Canvas-based screenshot download.

### Town System (Phase 1-E)

7 facilities accessible from TownScreen (SVG hotspot map):

| Facility | Screen | Unlocks at |
|----------|--------|-----------|
| 合成屋 (Craftsman) | `craftsman` | 0 worlds (upgrade hub — controls max level for all others) |
| 魔導書庫 (Library) | `library` | 0 worlds |
| いえをつくる (House Build) | `house_build` | 0 worlds |
| マイハウス (House) | `house` | 0 worlds |
| 商店 (Shop) | `shop` | 5 worlds |
| 魔法農場 (Farm) | `farm` | 8 worlds |
| ギルド (Guild) | `guild` | 10 worlds |

Upgrade costs: Lv1→2: `{wood:10,stone:5}`, Lv2→3: `{brick:8,gem:3}`, Lv3→4: `{gem:10,star_fragment:5}`, Lv4→5: `{star_fragment:5,magic_orb:2}`. Craftsman level controls max level for all other facilities (`HUB_UNLOCK_TABLE`).

Shop: daily free item (day-of-week mapped), 5 tier trade rates (3:1 upconversion up the material chain). Farm: plot-based seed planting, harvest after 4 quiz completions.

NPCs: フクロウ先生 (Library), タヌキ商人 (Shop), ギルドマスター (Guild) — images at `assets/npcs/*.png` (not yet populated).

### Skin System (Phase 1-F)

24 collectible skins + 1 default. Obtain methods: craft, fragment collection (3 fragments needed), streak bonus, milestone, treasure drop. Tailor unlocks at Craftsman Lv2. Fragment drop rate: 15% from treasure events.

### Monster Collection — Memory Isle (Phase 1-H)

40 monsters in 4 layers:

| Layer | Name | Monsters | Unlock condition |
|-------|------|----------|-----------------|
| 1 | はじまり | 1–10 | Always available |
| 2 | ふかまり | 11–20 | Collect 6 of layer 1 |
| 3 | しんか | 21–30 | Collect 6 of layer 2 |
| 4 | おく | 31–40 | Collect 8 of layer 3 |

Feature flag: `Config.FEATURES.ENABLE_MEMORY_ISLE = false` (screen implemented but hidden by default).

## Debugging

When `Config.IS_DEBUG` is `true`, debug helpers are exposed on `window.GG`:

```js
GG.getState('player.streak')   // Query state
GG.setState('app.error', null) // Update state
GG.unlockAll()                 // Unlock all worlds (GameStore.unlockAllWorlds())
GG.resetState()                // Reset to initial state
GG.exportState()               // Export state as JSON
GG.save()                      // Manually trigger IndexedDB save
GG.Config                      // Access frozen config
GG.Logger                      // Access logger
GG._screen                     // Current active screen instance
```

## Project Status

**Current implementation**: Phase 0.3 quiz content + Phase 1-D/E/F/H systems — all complete.

| Phase | Status | Description |
|-------|--------|-------------|
| 0.1 | ✅ Complete | Core infrastructure, 8 question units, 4 base screens |
| 0.2 | ✅ Complete | M1-07〜M1-13 (17 units), ClockFace SVG, step-based shuffle architecture |
| 0.3 | ✅ Complete | M1-14〜M1-16b (8 units), 33 worlds total (700+ questions pool) |
| 1-D | ✅ Complete | House building (6 sections, 15 styles, spritesheets, photo system, milestones) |
| 1-E | ✅ Complete | Town system (7 facilities, SVG hotspot map, shop trading, farm) |
| 1-F | ✅ Complete | Skin system (24 skins, fragment drops, streak/milestone unlocks) |
| 1-H | ✅ Complete | Memory Isle (40 monsters, 4 layers) — feature-flagged off |
| 1 (Audio) | ⬜ Planned | Web Audio API (SoundManager is currently a mock) |
| 2 | ⬜ Planned | Grade 2 math (M2 series) |

## Key Files for Common Tasks

| Task | Files |
|------|-------|
| Add a new screen | Create in `src/screens/`, wire up show/hide logic in `src/index.js` router, add screen name case to the `subscribe` block |
| Navigate to a screen | `GameStore.setState('app.currentScreen', 'screen_name')` |
| Add a new town facility | Add to `Config.TOWN.BUILDINGS[]`, add state in `GameStore` `town.buildings`, create screen, add route case in `index.js` |
| Add game config | `src/core/Config.js` — add property, freeze any new nested objects |
| Add new state | `src/core/GameStore.js` — update the static `state` initializer |
| Add CSS component | `src/styles/components.css` |
| Add animation | `src/styles/effects.css` |
| Add new sound type | `src/core/SoundManager.js` — extend `SoundType` |
| Validate data shapes | `src/utils/TypeValidator.js` — add schema or specialized validator |
| Add a new unit | Create `src/data/questions/M1-XX.js` with `stepConfig`, register lazy loader in `src/data/units.js`, add world entry in `src/data/worlds.js`, add file path to `ASSETS[]` in `sw.js` |
| Add clock questions | Use `type:'clock'` with `clockFace: { hour, minute }` — `ClockFace.js` renders SVG automatically in QuizScreen |
| Add a house item | `src/data/houseItems.js` (section, rarity, crafting cost) |
| Add a skin | `src/data/skinItems.js` (id, name, emoji, rarity, category, obtain method) |
| Add a house style | `src/data/styleItems.js` + spritesheet PNG at `assets/houses/style_*/spritesheet.png` + entry in `Config.HOUSE.STYLE_UNLOCK_WORLDS` |
| Update SW cache | `sw.js` — bump `SW_VERSION`, add new file paths to `ASSETS[]` |
| Read design specs | `docs/` directory (all in Japanese) |
