// Get references to HTML elements
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const formDiv = document.querySelector(".player-input");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

// Initialize game variables
let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = Array(9).fill(null);
let gameActive = true;

// Winning patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]               // Diagonals
];

// Handle the form submission to start the game
submitBtn.addEventListener("click", () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    // Check if both player names are entered
    if (player1 === "" || player2 === "") {
        alert("Please enter both player names!");
        return;
    }

    // Hide the input form and show the game board
    formDiv.style.display = "none";
    gameDiv.style.display = "block";

    // Set the first player and update the message
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Handle cell clicks
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        // Check if the game is active and the cell is empty
        if (!gameActive || board[index] !== null) return;

        // Update the board and cell display
        board[index] = currentPlayer === player1 ? "X" : "O";
        cell.textContent = board[index];

        // Check for a winner
        if (checkWinner()) {
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            gameActive = false;
        } else if (board.every(val => val !== null)) {
            // Check for a draw
            messageDiv.textContent = "It's a draw!";
            gameActive = false;
        } else {
            // Switch players
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            messageDiv.textContent = `${currentPlayer}, you're up!`;
        }
    });
});

// Function to check for a winner
function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}