"use strict";

// 8 players × 2 copies = 16 cards. pairId links the two copies of each player.
const players = [
    {pairId: 0, name: "Maradona", img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-diego-armando-maradona-argentina-128_vpd4j.webp"},
    {pairId: 1, name: "Baggio", img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-roberto-baggio-italia-053.webp"},
    {pairId: 2, name: "Romário", img: "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-romario-brasil-208_rm4ux.webp"},
    {pairId: 3, name: "Matthäus", img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-lothar-matthaus-deutschland-brd-259_7amc5.webp"},
    {pairId: 4, name: "Valderrama", img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-carlos-alberto-valderrama-colombia-300.webp"},
    {pairId: 5, name: "Van Basten", img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-marco-van-basten-nederland-417_hrk7w.webp"},
    {pairId: 6, name: "Francescoli", img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-enzo-francescoli-uruguay-379.webp"},
    {pairId: 7, name: "Scifo", img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-vincenzo-scifo-belgique-belgie-338.webp"},
    {pairId: 0, name: "Maradona", img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-diego-armando-maradona-argentina-128_vpd4j.webp"},
    {pairId: 1, name: "Baggio", img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-roberto-baggio-italia-053.webp"},
    {pairId: 2, name: "Romário", img: "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-romario-brasil-208_rm4ux.webp"},
    {pairId: 3, name: "Matthäus", img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-lothar-matthaus-deutschland-brd-259_7amc5.webp"},
    {pairId: 4, name: "Valderrama", img: "https://www.coleka.com/media/item/202203/05/italia-90-world-cup-carlos-alberto-valderrama-colombia-300.webp"},
    {pairId: 5, name: "Van Basten", img: "https://www.coleka.com/media/item/202005/28/italia-90-world-cup-marco-van-basten-nederland-417_hrk7w.webp"},
    {pairId: 6, name: "Francescoli", img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-enzo-francescoli-uruguay-379.webp"},
    {pairId: 7, name: "Scifo", img: "https://www.coleka.com/media/item/202112/24/italia-90-world-cup-vincenzo-scifo-belgique-belgie-338.webp"},
]

const mascot = "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-mascot-fifa-world-cup-italia-90-005_esy42.webp"

// --- Board setup ---

const rows = document.getElementsByClassName("row")

let cardId = 0
for (const row of rows) {
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * players.length)
        const picked = players[randomIndex]

        // Each card is a 3D-flip container:
        //   .card > .card-inner > img.card-front + img.card-back
        const card = document.createElement("div")
        card.className = "card"
        card.id = cardId++
        card.dataset.pair = picked.pairId

        const inner = document.createElement("div")
        inner.className = "card-inner"

        const front = document.createElement("img")
        front.className = "card-face card-front"
        front.src = picked.img
        front.alt = picked.name

        const back = document.createElement("img")
        back.className = "card-face card-back"
        back.src = mascot
        back.alt = "Italia 90"

        inner.appendChild(front)
        inner.appendChild(back)
        card.appendChild(inner)
        row.appendChild(card)

        players.splice(randomIndex, 1)
    }
}

// --- Game state ---

const flipped = []          // references to the 0–2 currently flipped card elements
let locked = false          // prevents clicks during mismatch animation

function allMatched() {
    const cards = document.getElementsByClassName("card")
    for (const card of cards) {
        if (!card.classList.contains("matched")) {
            return false
        }
    }
    return true
}

// --- Click handler ---

const cards = document.getElementsByClassName("card")

for (const card of cards) {
    card.addEventListener("click", function () {
        if (locked) return
        if (this.classList.contains("matched")) return
        if (this.classList.contains("flipped")) return

        this.classList.add("flipped")
        flipped.push(this)

        if (flipped.length === 2) {
            // Two cards flipped — check for a match.
            if (flipped[0].dataset.pair === flipped[1].dataset.pair) {
                // Match: wait for flip animation, then lock both.
                locked = true
                const a = flipped[0]
                const b = flipped[1]
                setTimeout(() => {
                    a.classList.add("matched")
                    b.classList.add("matched")
                    flipped.length = 0
                    locked = false

                    if (allMatched()) {
                        document.getElementById("wins").classList.remove("hidden")
                    }
                }, 500)
            } else {
                // No match: show briefly, then flip both back.
                locked = true
                const a = flipped[0]
                const b = flipped[1]
                setTimeout(() => {
                    a.classList.remove("flipped")
                    b.classList.remove("flipped")
                    flipped.length = 0
                    locked = false
                }, 1000)
            }
        }
    })
}
