 const submitBtn = document.getElementById("submit");
    const board = document.getElementById("board");
    const messageDiv = document.querySelector(".message");
    const gameTitle = document.getElementById("game-title");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let gameActive = true;
    const boardState = Array(9).fill("");

    // Winning combinations
    const winningConditions = [
      [0,1,2], [3,4,5], [6,7,8],  // rows
      [0,3,6], [1,4,7], [2,5,8],  // cols
      [0,4,8], [2,4,6]            // diagonals
    ];

    // Handle submit
    submitBtn.addEventListener("click", () => {
      player1 = document.getElementById("player1").value || "Player 1";
      player2 = document.getElementById("player2").value || "Player 2";
      currentPlayer = player1;
      currentSymbol = "X";
      messageDiv.textContent = `${currentPlayer}, you're up!`;

      // Hide form & show board
      document.getElementById("player-form").style.display = "none";
      gameTitle.style.display = "block";
      board.style.display = "grid";

      // Render board cells
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", i+1);
        cell.addEventListener("click", () => handleCellClick(cell, i));
        board.appendChild(cell);
      }
    });

    function handleCellClick(cell, index) {
      if (boardState[index] !== "" || !gameActive) return;

      // Update cell
      boardState[index] = currentSymbol;
      cell.textContent = currentSymbol;

      // Check win
      if (checkWin()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
      }

      // Switch player
      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "o";
      } else {
        currentPlayer = player1;
        currentSymbol = "x";
      }
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    }

    function checkWin() {
      return winningConditions.some(comb => {
        return comb.every(index => boardState[index] === currentSymbol);
      });
    }