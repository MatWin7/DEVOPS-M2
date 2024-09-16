const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

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

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
    }
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;
        gameActive = false;
        showWinMessage(currentPlayer);
    } else if (!board.includes('')) {
        statusText.textContent = 'Match nul !';
        gameActive = false;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est au tour du joueur ${currentPlayer}`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    statusText.textContent = 'Joueur X commence';
}

// Afficher un message de victoire
function showWinMessage(player) {
    setTimeout(() => {
        alert(`Félicitations ! Le joueur ${player} a gagné !`);
    }, 100); // Attendre un court instant pour afficher le message après la mise à jour de l'interface
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
