# Italia '90 Memory Game

A memory matching game using football player cards from Panini's Italia '90 World Cup sticker collection.

![Panini](https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_panini.jpg)

[Play the game](https://luisromeroaraya.github.io/js-memory-game-italia-90/)

## Gameplay

- 4×4 grid (16 cards) with 8 matching pairs of legendary Italia '90 players
- Click or press Enter/Space to flip a card with a 3D animation, then flip another to find its match
- Matched cards stay revealed with a dimmed effect; mismatched cards flip back after 1 second
- Match all 8 pairs to win — the timer stops and confetti drops
- Restart anytime with the Restart button or Play Again in the win modal

## Players

Maradona, Baggio, Romário, Matthäus, Valderrama, Van Basten, Francescoli, Scifo

## Features

### Code quality
- `"use strict"`, all variables properly scoped with `const`/`let`
- Card IDs are sequential (not tied to player index), pair matching via `dataset.pair`
- Click lock prevents race conditions during mismatch animation and match delay
- `matched` class prevents re-clicking already-matched cards
- `initBoard()` wraps all setup logic — used on both page load and restart

### UI / UX
- 3D CSS card flip using `preserve-3d` and `backface-visibility`
- Italian flag colour palette (green title, red stats, white cards with sticker borders)
- Sidebar layout on desktop — stats, controls, and player list in a sticky side panel; collapses to a top bar on mobile
- Hover glow and click-press feedback on interactive cards
- Dimmed matched cards with no reverse animation
- Move counter and elapsed timer, starting on the first card click
- Restart button and Play Again button to reshuffle without refreshing
- Full keyboard support — cards are focusable with Enter/Space handlers
- Falling confetti animation on win
- Fully responsive — cards, text, and spacing scale continuously via `clamp()` with no breakpoint jumps

Images from [Coleka](https://www.coleka.com/fr/stikers-autocollants/stickers-panini/albums-de-foot-panini/italia-90-world-cup_r14144)
