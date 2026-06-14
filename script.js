"use strict";

// Array of all 16 card objects (8 players x 2 copies each).
// Each entry stores the player index and the image URL for that player's sticker.
// Indices 0-7 and 8-15 are duplicates so each player appears twice (pairs).
const cards = [];

const players = [
    {index: 0, img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-diego-armando-maradona-argentina-128_vpd4j.webp"},
    {index: 1, img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-roberto-baggio-italia-053.webp"},
    {index: 2, img: "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-romario-brasil-208_rm4ux.webp"},
    {index: 3, img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-lothar-matthaus-deutschland-brd-259_7amc5.webp"},
    {index: 4, img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-carlos-alberto-valderrama-colombia-300.webp"},
    {index: 5, img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-marco-van-basten-nederland-417_hrk7w.webp"},
    {index: 6, img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-enzo-francescoli-uruguay-379.webp"},
    {index: 7, img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-vincenzo-scifo-belgique-belgie-338.webp"},
    {index: 8, img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-diego-armando-maradona-argentina-128_vpd4j.webp"},
    {index: 9, img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-roberto-baggio-italia-053.webp"},
    {index: 10, img: "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-romario-brasil-208_rm4ux.webp"},
    {index: 11, img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-lothar-matthaus-deutschland-brd-259_7amc5.webp"},
    {index: 12, img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-carlos-alberto-valderrama-colombia-300.webp"},
    {index: 13, img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-marco-van-basten-nederland-417_hrk7w.webp"},
    {index: 14, img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-enzo-francescoli-uruguay-379.webp"},
    {index: 15, img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-vincenzo-scifo-belgique-belgie-338.webp"},
]

// URL for the card-back image (Italia '90 mascot).
const back = "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-mascot-fifa-world-cup-italia-90-005_esy42.webp"

// Locate the four row containers in the DOM.
const rowsHTML = document.getElementsByClassName("row")

// --- Board setup: randomly assign 4 cards to each row ---

let cardId = 0
for (const row of rowsHTML) {
    for (let i = 0; i < 4; i++) {
        // Pick a remaining player at random and add them to the cards array.
        const randomIndex = Math.floor(Math.random() * players.length)
        const randomPlayer = players[randomIndex]
        cards.push(randomPlayer)
        // Create an img element for this card.
        const card = document.createElement("img")
        card.className = "card"
        card.id = cardId++                       // sequential ID used to look up cards[index]
        card.dataset.pair = randomPlayer.index   // which player this card belongs to
        card.src = back                          // start face-down
        row.appendChild(card)
        // Remove the chosen player so it won't be picked again.
        players.splice(randomIndex, 1)
    }
}

// All card img elements now in the DOM.
const cardsHTML = document.getElementsByClassName("card")

// --- Game state ---

const guess = []       // stores image src of the two currently flipped cards
let indexTemp         // id of the first flipped card in the current attempt
let locked = false    // prevents clicks during the mismatch animation

// Compare the two flipped cards by their image source (same URL = match).
function cardsAreEqual() {
    return guess[0] === guess[1] && guess[0] !== undefined
}

// The player wins when no card is showing the back image anymore.
function playerWins() {
    for (const card of cardsHTML) {
        if (card.src === back) {
            return false
        }
    }
    return true
}

// --- Click handler for every card ---

for (const card of cardsHTML) {
    card.addEventListener("click", (e) => {
        // Ignore clicks while cards are animating or on already-matched cards.
        if (locked) return
        if (e.target.classList.contains("matched")) return

        const currentCard = e.target
        const index = parseInt(currentCard.id)

        // --- First card in a turn ---
        if (guess.length === 0 && index !== indexTemp) {
            currentCard.src = cards[index].img
            guess.push(currentCard.src)
            indexTemp = index
        // --- Second card in a turn ---
        } else if (guess.length === 1 && index !== indexTemp) {
            currentCard.src = cards[index].img
            guess.push(currentCard.src)

            if (cardsAreEqual()) {
                // Match found: mark both cards as matched (non-interactive).
                currentCard.classList.add("matched")
                document.getElementById(indexTemp).classList.add("matched")
                guess.splice(0, 2)
                indexTemp = undefined
            } else {
                // No match: lock input, show both cards for 1s, then flip back.
                locked = true
                const firstCard = document.getElementById(indexTemp)
                setTimeout(() => {
                    firstCard.src = back
                    currentCard.src = back
                    guess.splice(0, 2)
                    indexTemp = undefined
                    locked = false
                }, 1000)
            }
        }

        // After every pair of clicks, check whether the game is won.
        if (playerWins()) {
            document.getElementById("wins").classList.remove("hidden")
        }
    })
}
