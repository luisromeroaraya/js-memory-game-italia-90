// create empty card array
const cards = []
// create players array with duplicates (2 times each player for a total of 16 cards)
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

// get the rows elements from the DOM
rowsHTML = document.getElementsByClassName("row")

// randomize the cards array and create the cards elements in the DOM
for (row of rowsHTML) {
    for (i=0; i<4; i++) {
        const randomIndex = Math.floor(Math.random() * players.length)
        const randomPlayer = players[randomIndex]
        cards.push(randomPlayer)
        const card = document.createElement("img")
        card.className = "card"
        card.id = randomPlayer.index
        card.src = back
        row.appendChild(card)
        players.splice(randomIndex, 1)
    }
}

// get the cards elements from the DOM
cardsHTML = document.getElementsByClassName("card")

// create empty array to store the guesses
const guess = []
let indexTemp

for(const card of cardsHTML) {
    card.addEventListener("click", (e) => {
        const index = parseInt(e.target.id)
        if (guess.length === 0 && index !== indexTemp) {
            const card = document.getElementById(index)
            card.src = cards[index].img
            guess.push(card.src)
            indexTemp = index;
        }
        else if (guess.length === 1 && index !== indexTemp) {
            const card = document.getElementById(index)
            card.src = cards[index].img
            guess.push(card.src)
            if (cardsAreEqual()) {
                guess.splice(0, 2)
                indexTemp = undefined;
            }
            else {
                setTimeout(() => {
                    const cardTemp = document.getElementById(indexTemp)
                    cardTemp.src = back
                    card.src = back
                    guess.splice(0, 2)
                    indexTemp = undefined;
                }, 1000)
            }
        }
        if(playerWins()){
            document.getElementById("wins").classList.remove("hidden")
        }
    })
}

// check if cards are equal
cardsAreEqual = () => {
    if(guess[0] === guess[1] && guess[0] !== undefined) {
        return true
    }
    else {
        return false
    }
}

// check if player has won
playerWins = () => {
    let wins = true;
    for(card of cardsHTML) {
        if(card.src === back) {
            wins = false
        }
    }
    return wins
}