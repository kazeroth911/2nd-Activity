let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}
function handleResultValidation() {
    let roundWon = false;
    let winningCells = [];
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }
    if (roundWon) {
            alert(`Player ${currentPlayer} has won!`);
            gameActive = false;
            for (const cellIndex of winningCells) {
                const cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
                cell.classList.add("winning-cell");
              }
            return;
        }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        alert(`Game ended in a draw!`);
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
      );
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));