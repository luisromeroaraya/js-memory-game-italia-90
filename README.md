# Italia '90 Memory Game

A memory matching game using football player cards from Panini's Italia '90 World Cup sticker collection.

![Panini](https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_panini.jpg)

[Play the game](https://luisromeroaraya.github.io/js-memory-game-italia-90/)

## Gameplay

- 4x4 grid (16 cards) with 8 matching pairs of legendary Italia '90 players
- Click to flip a card, then click another to find its match
- Matched cards stay revealed; mismatched cards flip back after 1 second
- Match all 8 pairs to win

## Players

Maradona, Baggio, Romário, Matthäus, Valderrama, Van Basten, Francescoli, Scifo

## Improvements

- Fixed undeclared variables (all `let`/`const`, `"use strict"`)
- Fixed card ID bug — sequential IDs instead of relying on player index
- Added click lock to prevent race conditions during mismatch timeout
- Added `matched` class to prevent re-clicking already-matched cards
- Used `dataset.pair` to preserve pairing information

Images from [Coleka](https://www.coleka.com/fr/stikers-autocollants/stickers-panini/albums-de-foot-panini/italia-90-world-cup_r14144)
