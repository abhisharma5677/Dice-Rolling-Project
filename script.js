'use strict';

//Selecting the elements.....
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceImage = document.querySelector('.dice');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let rollButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let totalScore = document.querySelector('.score');
let newButton = document.querySelector('.btn--new');

//Setting initial condition....
score0.textContent = 0;
score1.textContent = 0;
diceImage.classList.add('hidden');
const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Adding functionality in the ROLL DICE button....
rollButton.addEventListener('click', function () {
  //To stop the game when either of the player wins the game......
  if (playing) {
    //generating random no.
    let dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying the dice
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;

    //check for rolling 1 : if true ? then switch the player
    if (dice !== 1) {
      //1.Add dice to current score.......
      currentScore = currentScore + dice;
      //2.current0.textContent = currentScore0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //3.Switching to next player......
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

//Adding functionality in the hold button.........
holdButton.addEventListener('click', function () {
  //To stop the game when either of the player wins the game......
  if (playing) {
    //1. Add score to the active player.....
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2. Check if player wins the game i.e. score[i]>100....
    if (score[0] >= 50) {
      player0.classList.add('player--winner');
      playing = false;
    } else if (score[1] >= 50) {
      player1.classList.add('player--winner');
      playing = false;
    }

    //3. Switch the player on hold button....
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

//Adding functionality in the NEW GAME button......
//document.addEventListener('keydown', function (e) {
newButton.addEventListener('click', function () {
  //if (e.key === 'Enter') {
  playing = true;
  activePlayer = 0;
  score[0] = 0;
  score[1] = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  currentScore = 0;
  diceImage.classList.add('hidden');
  //}
});
