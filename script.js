// Initialize game variables
let currentPlayer = 'X'; // X starts first
let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let gameOver = false; // Indicates whether the game is over

// Execute code once the HTML content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const boardDiv = document.getElementById('board'); // Reference to the game board container
    const restartButton = document.getElementById('restart'); // Reference to the restart button
    const resultDiv = document.getElementById('result'); // Reference to the result alert
    const turnDiv = document.getElementById('turn'); // Reference to the turn indicator

    // Function to create a cell in the game board
    function createCell(index) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', () => makeMove(index));
        return cell;
    }

    // Function to initialize the game board with empty cells
    function initializeBoard() {
        boardDiv.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = createCell(i);
            boardDiv.appendChild(cell);
        }
    }

    // Function to make a move when a cell is clicked
    function makeMove(index) {
        if (board[index] === '' && !gameOver) {
            board[index] = currentPlayer;
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDiv.textContent = `It's ${currentPlayer}'s turn`;
        }
    }

    // Function to check for a winner or a draw
    function checkWinner() {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winCombos) {
            const [a, b, c] = combo;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                displayResult(`${board[a]} wins!`);
                return;
            }
        }

        if (!board.includes('')) {
            displayResult("It's a draw!");
        }
    }

    // Function to display the game result
    function displayResult(message) {
        resultDiv.textContent = message;
        resultDiv.style.display = 'block';
        gameOver = true;
    }

    // Function to restart the game
    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        resultDiv.style.display = 'none';
        turnDiv.textContent = "It's X's turn";
        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
        }
    }

    // Event listener for the restart button
    restartButton.addEventListener('click', restartGame);

    // Initialize the game board
    initializeBoard();
});
