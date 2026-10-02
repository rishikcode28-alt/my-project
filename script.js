const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
    if (board[index] !== "" || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = "Player " + currentPlayer + " wins!";
      gameOver = true;
      return;
    }

    if (board.every(cell => cell !== "")) {
      statusText.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Player " + currentPlayer + "'s turn";
  });
});

function checkWinner() {
  return winningCombinations.some(([a,b,c]) =>
    board[a] !== "" && board[a] === board[b] && board[a] === board[c]
  );
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
  board = ["", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}