# AGENTS.md

## Project

Vanilla JS memory card game. No build tools, no frameworks, no tests.

## Conventions

- `"use strict"` in all JS files
- `const` by default, `let` only when reassignment is needed
- Function declarations use `function` keyword (not arrow assigned to `const`)
- DOM queries use `getElementById` / `getElementsByClassName` (no jQuery, no modern selector libs)
- Card structure uses a 3D flip container: `.card > .card-inner > .card-front + .card-back`
- Game state tracked via CSS classes (`flipped`, `matched`) and a `locked` flag
- Match/mismatch timeouts use `setTimeout` with `locked` to prevent race conditions
- Board setup wrapped in `initBoard()` — called on page load and on restart
- Cards have `tabIndex`, `role="button"`, and keyboard handlers for Enter/Space
- Confetti is generated dynamically with absolutely-positioned animated divs
- Responsive sizing uses `clamp()` for continuous scaling (no breakpoint jumps)
- Sidebar layout on desktop (`> 800px`), collapses to top bar on mobile
- `:root` CSS custom properties for the Italian flag palette (`--green`, `--red`, etc.)
- Player list hover preview uses a `::after` pseudo-element with `--img` custom property

## Running

Open `index.html` in any browser — no server needed.

## No linting or testing

This project has no linting, typechecking, or test commands configured.
