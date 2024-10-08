// script.js
const cards = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];

let board = document.getElementById("gameBoard");
let cardElements = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(cardValue) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-value", cardValue);
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (
    lockBoard ||
    this.classList.contains("open") ||
    this.classList.contains("match")
  )
    return;

  this.classList.add("open");
  this.textContent = this.getAttribute("data-value");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch =
    firstCard.getAttribute("data-value") ===
    secondCard.getAttribute("data-value");

  if (isMatch) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("open");
      firstCard.textContent = "";
      secondCard.classList.remove("open");
      secondCard.textContent = "";
      resetBoard();
    }, 500);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  const shuffledCards = shuffle(cards);
  shuffledCards.forEach((cardValue) => {
    const cardElement = createCard(cardValue);
    board.appendChild(cardElement);
    cardElements.push(cardElement);
  });
}

startGame();
