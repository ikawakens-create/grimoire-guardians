# CLAUDE.md - Grimoire Guardians

## Project Overview

**Grimoire Guardians** (グリモア・ガーディアンズ) is an educational math game PWA targeting Japanese elementary school students (grades 1-6). Players progress through quiz-based worlds, collecting materials and encountering events. The app is landscape-only and touch-optimized.

- **Version**: 0.1.0 (Phase 0.1 - Foundation)
- **Language**: Pure vanilla JavaScript (ES6 Modules), no frameworks or build tools
- **Target**: 60fps, mobile-first, offline-capable PWA
- **Content Language**: Japanese (game content, docs, and inline comments)

## Repository Structure

```
grimoire-guardians/
├── index.html              # PWA entry point (loads src/index.js as ES module)
├── manifest.json           # PWA manifest (landscape, standalone)
├── CLAUDE.md
├── README.md
├── src/
│   ├── index.js            # App initialization, debug helpers (window.GG)
│   ├── core/
│   │   ├── Config.js       # Frozen configuration constants
│   │   ├── Logger.js       # Logging system with levels/timing
│   │   ├── GameStore.js    # Observable state management (single source of truth)
│   │   └── SoundManager.js # Audio system (Phase 0 mock, Web Audio planned)
│   ├── utils/
│   │   └── TypeValidator.js # Runtime type/schema validation
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

Runtime type checking as a lightweight TypeScript alternative. Use `TypeValidator.matchesSchema()` for complex objects and specialized validators like `validateQuestion()` and `validateSaveData()`.

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

The game is organized into worlds containing units. Each unit has quiz questions. Phase 0.1 covers units M1-01 through M1-06 (Grade 1 math, based on 日本文教出版 textbook).

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

**Phase 0.1 — Foundation (current)**

- Week 1 (complete): Project structure, Config, Logger, GameStore, SoundManager, TypeValidator, CSS system, index.html, manifest.json
- Week 2 (next): BookCard component, ProgressBar component, BookshelfScreen, QuizScreen, problem data (M1-01, 15 questions), unit mapping
- Week 3 (planned): Event system, drop mechanics, visual effects, testing

**Future Phases**: Phase 0.2–0.3 add remaining units (M1-07 through M1-16). Phase 1 adds offline support, Web Audio, house building, skins, Memory Isle, and DLC.

## Planned Directory Structure (not yet created)

```
src/
├── components/    # Reusable UI components (BookCard, ProgressBar)
├── screens/       # Full-screen views (BookshelfScreen, QuizScreen, ResultScreen)
├── events/        # Event handlers (Omikuji, Monster, Treasure, Paths)
├── effects/       # Visual effect controllers
└── data/          # Static game data (question banks, unit maps)
```

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
| Read design specs | `docs/` directory (all in Japanese) |
