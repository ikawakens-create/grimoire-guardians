# CLAUDE.md - Grimoire Guardians

## Project Overview

**Grimoire Guardians** (グリモア・ガーディアンズ) is an educational math game PWA targeting Japanese elementary school students (grades 1-6). Players progress through quiz-based worlds, collecting materials and encountering events. The app is landscape-only and touch-optimized.

- **Version**: 0.2.0 (Phase 0.2 - Content Expansion)
- **Language**: Pure vanilla JavaScript (ES6 Modules), no frameworks or build tools
- **Target**: 60fps, mobile-first, offline-capable PWA
- **Content Language**: Japanese (game content, docs, and inline comments)

## Repository Structure

```
grimoire-guardians/
├── index.html              # PWA entry point (loads src/index.js as ES module)
├── manifest.json           # PWA manifest (landscape, standalone)
├── sw.js                   # Service Worker v1.2.0 (cache-first, offline support)
├── CLAUDE.md
├── README.md
├── src/
│   ├── index.js            # App initialization, debug helpers (window.GG)
│   ├── core/
│   │   ├── Config.js       # Frozen configuration constants
│   │   ├── Logger.js       # Logging system with levels/timing
│   │   ├── GameStore.js    # Observable state management (single source of truth)
│   │   ├── SoundManager.js # Audio system (Phase 0 mock, Web Audio planned)
│   │   ├── SaveManager.js  # localStorage persistence
│   │   └── EventManager.js # Quiz event orchestration (omikuji/monster/treasure/paths)
│   ├── components/
│   │   ├── BookCard.js     # World card UI component
│   │   ├── ProgressBar.js  # Quiz progress indicator
│   │   └── ClockFace.js    # SVG analog clock renderer (for type:'clock' questions)
│   ├── screens/
│   │   ├── WelcomeScreen.js   # Title/name entry screen
│   │   ├── BookshelfScreen.js # World selection grid
│   │   ├── QuizScreen.js      # Quiz UI + clock rendering
│   │   └── ResultScreen.js    # Score, stars, material drops
│   ├── events/
│   │   ├── OmikujiEvent.js       # Reward multiplier / shield event
│   │   ├── MonsterBattleEvent.js # Slash/explode animations
│   │   ├── TreasureEvent.js      # Treasure chest / mimic
│   │   └── ThreePathsEvent.js    # Branching path choice
│   ├── utils/
│   │   ├── TypeValidator.js  # Runtime type/schema validation (incl. clockFace)
│   │   └── HapticFeedback.js # Vibration API wrapper
│   ├── data/
│   │   ├── worlds.js         # 25 world definitions (world_1 – world_13, incl. 8a/8b/8c)
│   │   ├── units.js          # Unit registry with lazy import loaders
│   │   └── questions/        # 375 questions across 19 unit files
│   │       ├── M1-01.js      # 1〜5のかず (15問)
│   │       ├── M1-02.js      # 6〜10のかず (15問)
│   │       ├── M1-03.js      # なんばんめ (15問)
│   │       ├── M1-04.js      # たしざん① (15問)
│   │       ├── M1-05.js      # ひきざん① (15問)
│   │       ├── M1-05b.js     # ひきざん① 応用 (15問)
│   │       ├── M1-06.js      # 10までのかず (15問)
│   │       ├── M1-06b.js     # 10までのかず 応用 (15問)
│   │       ├── M1-07.js      # 20までのかず (15問)
│   │       ├── M1-08a.js     # なんじ・ちょうど (15問, type:'clock')
│   │       ├── M1-08b.js     # なんじはん (15問, type:'clock')
│   │       ├── M1-08c.js     # 5ふんたんい (15問, type:'clock')
│   │       ├── M1-09.js      # さくらんぼ算 (15問)
│   │       ├── M1-10a.js     # くりあがり 9のせかい (15問)
│   │       ├── M1-10b.js     # くりあがり 8のせかい (15問)
│   │       ├── M1-10c.js     # くりあがり 7・6のせかい (15問)
│   │       ├── M1-10d.js     # くりあがりのおうよう (15問)
│   │       ├── M1-11a.js     # (15問)
│   │       ├── M1-11b.js     # (15問)
│   │       ├── M1-11c.js     # (15問)
│   │       ├── M1-11d.js     # (15問)
│   │       ├── M1-12a.js     # (15問)
│   │       ├── M1-12b.js     # (15問)
│   │       └── M1-12c.js     # (15問)
│   └── styles/
│       ├── common.css      # CSS variables, base styles, orientation warning
│       ├── layout.css      # Grid/flex layout system, screen layouts
│       ├── components.css  # Button, card, progress bar, quiz styles
│       └── effects.css     # 20+ keyframe animations, GPU-accelerated effects
├── docs/                   # Design docs and specs (Japanese)
│   ├── README.md
│   ├── Phase_0_1_基盤構築完了レポート.md
│   ├── Phase_0_1_Week2_コンポーネント設計メモ.md
│   ├── ロードマップ_v1.4.md
│   ├── 統合仕様書_v1.2.md
│   ├── UI設計書_v1.1.md
│   └── AI指示書_v1.1.md
└── assets/                 # Icons, fonts, sounds (not yet populated)
    ├── icons/
    ├── fonts/
    └── sounds/
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

### State Management — GameStore (Observable Pattern)

`GameStore` (`src/core/GameStore.js`) is the single source of truth. State is accessed via dot-notation paths:

```js
GameStore.getState('player.name');
GameStore.setState('app.currentScreen', 'quiz');
GameStore.mergeState('progress.stats', { totalCorrect: 5 });
GameStore.subscribe((newState, changedPath) => { /* react */ });
```

State structure:
- `app` — isInitialized, isLoading, currentScreen, error
- `player` — name, createdAt, lastPlayedAt
- `progress` — subject, grade, worlds (array), stats
- `inventory` — materials (wood, stone, brick, gem, star_fragment, cloth, paint, crown, cape, magic_orb)
- `currentSession` — worldId, unitId, questions, answers, rewardMultiplier, shieldActive
- `license` — core license and DLC unlock state

### Configuration — Config.js

`Config` (`src/core/Config.js`) is a deeply-frozen object holding all constants: game rules, event probabilities, drop rates, UI timing, storage keys, feature flags, and debug toggles. Never mutate Config — all nested objects are `Object.freeze()`d.

### Logging — Logger.js

Use `Logger` for all console output. Supports levels (debug/info/warn/error), timing (`Logger.time`/`Logger.timeEnd`), grouping, and optional log storage (up to 1000 entries).

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
- `export default` for the primary class
- Named exports for related constants (e.g., `SoundType`)
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

The game is organized into worlds containing units. Each unit has 15 quiz questions. Phase 0.2 covers units M1-01 through M1-12c (Grade 1 math, based on 日本文教出版 textbook), organized into 25 worlds.

Time/clock units (M1-08a/b/c) use `type:'clock'` questions which render an SVG analog clock above the question text via `ClockFace.renderSVG(hour, minute)`. These questions include a `clockFace: { hour, minute }` field.

### Quiz Flow

1. Player selects a world/unit from the bookshelf screen
2. Questions are presented one at a time (multiple choice, 2-column grid)
3. Correct/wrong feedback with animations
4. Events may trigger at specific question thresholds (omikuji, monster battle, treasure chest, branching path)
5. Results screen shows score and material drops
6. 60% correct answers required to clear a unit (`Config.GAME.CLEAR_THRESHOLD`)

### Event System

| Event | Trigger | Effect |
|-------|---------|--------|
| Omikuji (おみくじ) | Question threshold | Reward multiplier (1.5x–3x) or shield |
| Monster Battle | Correct answer streak | Slash/explode animations, material drops |
| Treasure Chest | Random | Material drops (10% mimic chance) |
| Three Paths | Random | Normal path (70% drop) vs rare path (100% drop) |

### Material Drop Rates

- Normal question: 35%
- Normal path: 70%, Rare path: 100%
- Normal monster: 75%, Rare monster: 100%
- Treasure/Mimic: 100%

Materials: wood, stone, brick, gem, star_fragment, cloth, paint, crown, cape, magic_orb.

## Debugging

When `Config.IS_DEBUG` is `true`, debug helpers are exposed on `window.GG`:

```js
GG.getState('player.name')    // Query state
GG.setState('app.error', null) // Update state
GG.unlockAll()                 // Unlock all worlds
GG.resetState()                // Reset to initial state
GG.exportState()               // Export state as JSON
GG.Config                      // Access config
GG.Logger                      // Access logger
```

## Project Status

**Phase 0.2 — Content Expansion (current)**

- Phase 0.1 (complete): Project structure, Config, Logger, GameStore, SoundManager, TypeValidator, CSS system, index.html, manifest.json, BookCard, ProgressBar, BookshelfScreen, QuizScreen, ResultScreen, SaveManager, EventManager, event handlers (Omikuji/Monster/Treasure/ThreePaths), M1-01〜M1-06b (8 units, 120 questions)
- Phase 0.2 (in progress): M1-07〜M1-12c question data, ClockFace SVG component, clock-type question rendering in QuizScreen, worlds.js v3.0 (25 worlds), units.js v3.0, sw.js v1.2.0
  - **Completed**: M1-07, M1-08a/b/c, M1-09, M1-10a/b/c/d (10 units, 150 questions), ClockFace.js, TypeValidator clockFace validation
  - **Remaining**: M1-11a/b/c/d, M1-12a/b/c (7 units, 105 questions) — stubs exist in units.js, files not yet created

**Future Phases**: Phase 0.3 adds remaining M1 units (M1-13〜M1-16) and begins M2. Phase 1 adds Web Audio, house building, skins, Memory Isle, and DLC.

## Key Files for Common Tasks

| Task | Files |
|------|-------|
| Add a new screen | Create in `src/screens/`, update `GameStore.setState('app.currentScreen', ...)` |
| Add game config | `src/core/Config.js` — add property, freeze nested objects |
| Add new state | `src/core/GameStore.js` — update `_getInitialState()` |
| Add CSS component | `src/styles/components.css` |
| Add animation | `src/styles/effects.css` |
| Add new sound type | `src/core/SoundManager.js` — extend `SoundType` |
| Validate data shapes | `src/utils/TypeValidator.js` — add schema validator |
| Add a new unit | Create `src/data/questions/M1-XX.js`, register loader in `src/data/units.js`, add world entry in `src/data/worlds.js`, add file to ASSETS in `sw.js` |
| Add clock questions | Use `type:'clock'` with `clockFace: { hour, minute }` — ClockFace.js renders SVG automatically in QuizScreen |
| Read design specs | `docs/` directory (all in Japanese) |
