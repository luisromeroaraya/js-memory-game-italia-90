"use strict";

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

const back = "https://www.coleka.com/media/item/202005/27/italia-90-world-cup-mascot-fifa-world-cup-italia-90-005_esy42.webp"

const rowsHTML = document.getElementsByClassName("row")

let cardId = 0
for (const row of rowsHTML) {
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * players.length)
        const randomPlayer = players[randomIndex]
        cards.push(randomPlayer)
        const card = document.createElement("img")
        card.className = "card"
        card.id = cardId++
        card.dataset.pair = randomPlayer.index
        card.src = back
        row.appendChild(card)
        players.splice(randomIndex, 1)
    }
}

const cardsHTML = document.getElementsByClassName("card")

const guess = []
let indexTemp
let locked = false

function cardsAreEqual() {
    return guess[0] === guess[1] && guess[0] !== undefined
}

function playerWins() {
    for (const card of cardsHTML) {
        if (card.src === back) {
            return false
        }
    }
    return true
}

for (const card of cardsHTML) {
    card.addEventListener("click", (e) => {
        if (locked) return
        if (e.target.classList.contains("matched")) return

        const currentCard = e.target
        const index = parseInt(currentCard.id)

        if (guess.length === 0 && index !== indexTemp) {
            currentCard.src = cards[index].img
            guess.push(currentCard.src)
            indexTemp = index
        } else if (guess.length === 1 && index !== indexTemp) {
            currentCard.src = cards[index].img
            guess.push(currentCard.src)

            if (cardsAreEqual()) {
                currentCard.classList.add("matched")
                document.getElementById(indexTemp).classList.add("matched")
                guess.splice(0, 2)
                indexTemp = undefined
            } else {
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

        if (playerWins()) {
            document.getElementById("wins").classList.remove("hidden")
        }
    })
}
