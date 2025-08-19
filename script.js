//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const formDiv = document.getElementById("player-form");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = Array(9).fill(null);
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],  // rows
  [0,3,6],[1,4,7],[2,5,8],  // cols
  [0,4,8],[2,4,6]           // diagonals
];

// Handle form submit
submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  formDiv.style.display = "none";
  gameDiv.style.display = "block";

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Handle cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== null) return;

    board[index] = currentPlayer === player1 ? "X" : "O";
    cell.textContent = board[index];

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(val => val !== null)) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    }
  });
});

// Winner check
function checkWinner() {
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
