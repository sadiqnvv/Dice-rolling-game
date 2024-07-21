"use strict";

// Elements selection

const diceElement = document.querySelector(".dice"), // кубик
  score0Element = document.getElementById("score--0"),
  score1Element = document.getElementById("score--1"),
  current0Element = document.getElementById("current--0"),
  current1Element = document.getElementById("current--1"),
  player0Element = document.querySelector(".player--0"),
  player1Element = document.querySelector(".player--1"),
  btnNew = document.querySelector(".btn--new"), // Новая игра
  btnRoll = document.querySelector(".btn--roll"), // Бросить кубик
  btnHold = document.querySelector(".btn--hold"); // Оставить

let totalScore, currentScore, isPlaying, activePlayer; // создаём нужные переменные
const initGame = function () {
  diceElement.classList.add("hidden");
  totalScore = [0, 0]; // общий счет
  currentScore = 0; // текущие очки
  activePlayer = 0; // активный игрок (по умолчанию 0 игрок)
  isPlaying = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.remove("player--active");
  player1Element.classList.remove("player--active");
  player0Element.classList.add("player--active");
};

initGame();

const switchPlayer = function () {
  // смена игрока
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0; // если 0 игрок активный, то переключаем на 1, иначе наоборот

  player0Element.classList.toggle("player--active"); // toggle - проверяет наличие передаваемого класса, если этот класс есть, то метод toggle удаляет его. Если нет, то добавляет
  player1Element.classList.toggle("player--active");
};

// Roll the dice
btnRoll.addEventListener("click", function () {
  // Бросить кубик
  if (isPlaying) {
    // Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display number on the dice
    diceElement.classList.remove("hidden");
    diceElement.src = `img/dice${diceNumber}.png`;

    if (diceNumber !== 1) {
      // если попала 1, то ход переходит другому игроку и текущие очки потеряется. А если не равно 1, то выполняется следующий код...
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // Оставить
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 100) {
      // если общий счет больше или равно 100, то игрок выигрывает
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      diceElement.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initGame); // новая игра
