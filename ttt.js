const buttons = document.querySelector(".buttons");

const winText = document.getElementById("win-text");

const kClass = document.getElementsByClassName("tic");

const currentPlayer = document.getElementById("current");

const playAgain = document.getElementById("play-again");

const restart = document.getElementById("restart");

const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

let player = "X";

let matchStatus = "";

let winner;

// total move

let move = 9;

// score

let player1Score = 0;
let player2Score = 0;

// input
let playerOne = [];
let playerTwo = [];

const win = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// score board

score1.textContent = 'Player "X":' + " " + player1Score;
score2.textContent = 'Player "O":' + " " + player2Score;

// show current player

currentPlayer.textContent = "Current Player:" + " " + player;

//on click button action
buttons.addEventListener("click", function (e) {
  const k = e.target;
  let v = parseInt(k.value);
  if (k.matches(".tic")) {
    if (player === "X") {
      // subtract move
      move--;
      // other action
      k.style.color = "#4bc11b";
      k.textContent = "X";
      k.disabled = true;
      playerOne.push(v);
      player = "O";
      currentPlayer.textContent = "Current Player:" + " " + player;
    } else {
      // subtract move
      move--;

      // other action
      k.style.color = "#3e59dd";
      k.textContent = "O";
      k.disabled = true;
      playerTwo.push(v);
      player = "X";
      currentPlayer.textContent = "Current Player:" + " " + player;
    }

    // update winner
    if (checker(playerOne)) {
      matchStatus = "win";
      winner = "X";
      player1Score++;
      score1.textContent = 'Player "X":' + " " + player1Score;
      winAction();
    }
    if (checker(playerTwo)) {
      matchStatus = "win";
      winner = "O";
      player2Score++;
      score2.textContent = 'Player "O":' + " " + player2Score;
      winAction();
    }

    // check tie
    if (move === 0 && matchStatus === "") {
      tieAction();
    }
  }
});

//  on click play again button
playAgain.addEventListener("click", function () {
  reset();
});

// //////////winner checker////////////////////
function checker(person) {
  let status;
  for (let i = 0; i < win.length; i++) {
    for (let j = 0; j < win[i].length; j++) {
      if (person.indexOf(win[i][j]) === -1) {
        status = false;
        break;
      } else {
        status = true;
      }
    }

    if (status) {
      for (let k = 0; k < win[i].length; k++) {
        let num = win[i][k] - 1;
        kClass[num].style.backgroundColor = "red";
      }
      break;
    }
  } // end main loop
  // check status
  if (status) {
    for (let i = 0; i < 9; i++) {
      kClass[i].disabled = true;
    }
    return true;
  } else {
    return false;
  }
}

//////////////////////////////////////////

//////////// win action//////////////

function winAction() {
  //play sound
  const ting = new Audio("sound/ting.mp3");
  ting.play();
  // show winner
  winText.textContent = "Player " + winner + " Win!";
  // hide current player
  currentPlayer.classList.add("hide");
  // show play again button
  playAgain.textContent = "Play Again!";
  playAgain.classList.remove("hide");
}
/////////////////////////////////////////////////

/////////// tie action////////////

function tieAction() {
  //play sound
  const ting = new Audio("sound/lose.mp3");
  ting.play();
  // show winner
  winText.textContent = "Tie!";

  // hide current player
  currentPlayer.classList.add("hide");

  // show play again button
  playAgain.textContent = "Try Again!";
  playAgain.classList.remove("hide");
}

///////////////////// reset action////////////////////

function reset() {
  // reset move
  move = 9;
  // reset match status
  matchStatus = "";
  // reset array
  playerOne = [];
  playerTwo = [];
  // remove winner
  winText.textContent = "";
  // add current player
  currentPlayer.classList.remove("hide");
  // hide play again
  playAgain.classList.add("hide");
  // loop
  for (let i = 0; i < 9; i++) {
    // remove text content
    kClass[i].textContent = "";
    // remove background color
    kClass[i].style.backgroundColor = "";
    // remove disable
    kClass[i].disabled = false;
  }
}
