"use strict";

// 요소정의
const players = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];
const scores = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];
const currentScores = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore, activePlayer, playing;

// 시작셋팅
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scores[0].textContent = 0;
  scores[1].textContent = 0;
  currentScores[0].textContent = 0;
  currentScores[1].textContent = 0;

  diceEl.classList.add("hidden");
  players[0].classList.remove("player--winner");
  players[1].classList.remove("player--winner");
  players[0].classList.add("player--active");
  players[1].classList.remove("player--active");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  currentScores[activePlayer].textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  players[0].classList.toggle("player--active");
  players[1].classList.toggle("player--active");
};

// 게임플레이
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. 랜덤주사위돌리기
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. 선택된 주사위
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. 롤 체크
    if (dice !== 1) {
      // 현재스코어
      currentScore += dice;
      currentScores[activePlayer].textContent = currentScore;
    } else {
      // 플레이어 체인지
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. 활성 플레이어의 점수에 현재 점수 추가
    scores[activePlayer].textContent =
      Number(scores[activePlayer].textContent) + currentScore;

    // 2. 플래이어스코어 >= 50 인지 체크
    if (scores[activePlayer].textContent >= 50) {
      // Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      players[activePlayer].classList.add("player--winner");
      players[activePlayer].classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
