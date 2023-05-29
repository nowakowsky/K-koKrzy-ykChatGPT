// Definiujemy zmienną reprezentującą planszę
var board = ['','','','','','','','',''];
// Definiujemy zmienną reprezentującą aktualnego gracza
var currentPlayer = 'X';
// Definiujemy zmienną reprezentującą punktację
var scores = {'X': 0, 'O': 0};

// Funkcja aktualizująca wyświetlaną planszę
function updateBoard() {
    for (var i = 0; i < 9; i++) {
        document.getElementById('cell' + i).innerText = board[i];
    }
    document.getElementById('scoreX').innerText = 'X: ' + scores['X'];
    document.getElementById('scoreO').innerText = 'O: ' + scores['O'];
    document.getElementById('currentPlayer').innerText = 'Aktualny gracz: ' + currentPlayer;
}

// Funkcja obsługująca kliknięcie na pole
function cellClick(i) {
    if (board[i] === '') {
        board[i] = currentPlayer;
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        checkWin();
        if (checkDraw()) {
            board = ['','','','','','','','',''];
        }
        updateBoard();
    }
}

// Funkcja sprawdzająca, czy jest zwycięzca
function checkWin() {
    var winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < winCombos.length; i++) {
        if (board[winCombos[i][0]] !== '' &&
            board[winCombos[i][0]] === board[winCombos[i][1]] &&
            board[winCombos[i][1]] === board[winCombos[i][2]]) {
            scores[board[winCombos[i][0]]]++;
            board = ['','','','','','','','',''];
            break;
        }
    }
}

// Funkcja sprawdzająca, czy wszystkie pola są wypełnione
function checkDraw() {
    for (var i = 0; i < 9; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}

// Inicjalizacja planszy
window.onload = function() {
    for (var i = 0; i < 9; i++) {
        document.getElementById('cell' + i).addEventListener('click', (function(i){
            return function() {
                cellClick(i);
            }
        })(i));
    }
    updateBoard();
}
