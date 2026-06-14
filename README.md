# Italia '90 Memory Game

A memory matching game using football player cards from Panini's Italia '90 World Cup sticker collection.

![Panini](https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_panini.jpg)

[Play the game](https://luisromeroaraya.github.io/js-memory-game-italia-90/)

## Gameplay

- 4×4 grid (16 cards) with 8 matching pairs of legendary Italia '90 players
- Click to flip a card with a 3D animation, then click another to find its match
- Matched cards stay revealed with a dimmed effect; mismatched cards flip back after 1 second
- Match all 8 pairs to win

## Players

Maradona, Baggio, Romário, Matthäus, Valderrama, Van Basten, Francescoli, Scifo

## Features

### Code quality
- `"use strict"`, all variables properly scoped with `const`/`let`
- Card IDs are sequential (not tied to player index), pair matching via `dataset.pair`
- Click lock prevents race conditions during mismatch animation and match delay
- `matched` class prevents re-clicking already-matched cards

### UI / UX
- 3D CSS card flip using `preserve-3d` and `backface-visibility`
- Hover glow and click-press feedback on interactive cards
- Match pulse animation, dimmed matched cards
- Centered win overlay with fixed positioning
- Responsive layout — cards scale down on small screens via `vw` units

Images from [Coleka](https://www.coleka.com/fr/stikers-autocollants/stickers-panini/albums-de-foot-panini/italia-90-world-cup_r14144)
