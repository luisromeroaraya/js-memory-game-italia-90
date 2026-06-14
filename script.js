"use strict";

// 8 players × 2 copies = 16 cards. pairId links the two copies of each player.
const PLAYER_DATA = [
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

// --- Game state ---

let players = []            // mutable pool, reset on each new game
const flipped = []          // references to currently flipped card elements (0-2)
let locked = false          // prevents clicks during animations
let moves = 0
let seconds = 0
let timerInterval = null
let gameStarted = false

// --- DOM refs ---

const rows = document.getElementsByClassName("row")
const movesDisplay = document.getElementById("moves")
const timerDisplay = document.getElementById("timer")
const winModal = document.getElementById("wins")
const confettiContainer = document.getElementById("confetti")
const restartBtn = document.getElementById("restart")

// --- Timer helpers ---

function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0")
    const sec = (s % 60).toString().padStart(2, "0")
    return m + ":" + sec
}

function startTimer() {
    if (timerInterval) return
    timerInterval = setInterval(function () {
        seconds++
        timerDisplay.textContent = formatTime(seconds)
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval)
    timerInterval = null
}

function resetTimer() {
    stopTimer()
    seconds = 0
    timerDisplay.textContent = formatTime(0)
}

// --- Board setup ---

function initBoard() {
    // Clear the board and reset state.
    for (const row of rows) {
        row.innerHTML = ""
    }

    flipped.length = 0
    locked = false
    moves = 0
    gameStarted = false
    movesDisplay.textContent = "0"
    resetTimer()
    winModal.classList.add("hidden")
    confettiContainer.innerHTML = ""

    // Rebuild mutable pool from master data.
    players = []
    for (let i = 0; i < PLAYER_DATA.length; i++) {
        players.push({
            pairId: PLAYER_DATA[i].pairId,
            name: PLAYER_DATA[i].name,
            img: PLAYER_DATA[i].img,
        })
    }

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
            card.tabIndex = 0
            card.setAttribute("role", "button")
            card.setAttribute("aria-label", "Card face down")

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

    attachListeners()
}

// --- Event listeners ---

function attachListeners() {
    const cards = document.getElementsByClassName("card")

    for (const card of cards) {
        card.addEventListener("click", handleCardClick)
        card.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleCardClick.call(this, e)
            }
        })
    }
}

function handleCardClick() {
    if (locked) return
    if (this.classList.contains("matched")) return
    if (this.classList.contains("flipped")) return

    // Start timer on the very first click.
    if (!gameStarted) {
        gameStarted = true
        startTimer()
    }

    this.classList.add("flipped")
    flipped.push(this)

    if (flipped.length === 2) {
        // Two cards flipped — count this as one move.
        moves++
        movesDisplay.textContent = moves

        if (flipped[0].dataset.pair === flipped[1].dataset.pair) {
            // Match: wait for flip animation, then lock both.
            locked = true
            const a = flipped[0]
            const b = flipped[1]
            setTimeout(function () {
                a.classList.add("matched")
                b.classList.add("matched")
                flipped.length = 0
                locked = false

                if (allMatched()) {
                    stopTimer()
                    showConfetti()
                    winModal.classList.remove("hidden")
                }
            }, 500)
        } else {
            // No match: show briefly, then flip both back.
            locked = true
            const a = flipped[0]
            const b = flipped[1]
            setTimeout(function () {
                a.classList.remove("flipped")
                b.classList.remove("flipped")
                flipped.length = 0
                locked = false
            }, 1000)
        }
    }
}

function allMatched() {
    const cards = document.getElementsByClassName("card")
    for (const card of cards) {
        if (!card.classList.contains("matched")) {
            return false
        }
    }
    return true
}

// --- Confetti ---

function showConfetti() {
    const colors = ["#ff0000", "#00b300", "#0066ff", "#ffcc00", "#ff00cc", "#00e6e6", "#ff6600"]

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement("div")
        piece.className = "confetti-piece"
        piece.style.left = Math.random() * 100 + "%"
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        piece.style.width = Math.random() * 8 + 4 + "px"
        piece.style.height = Math.random() * 8 + 4 + "px"
        piece.style.animationDuration = Math.random() * 2 + 2 + "s"
        piece.style.animationDelay = Math.random() * 2 + "s"
        confettiContainer.appendChild(piece)
    }
}

// --- Restart ---

restartBtn.addEventListener("click", initBoard)

// --- Start ---

initBoard()
