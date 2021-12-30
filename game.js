// gameboard module

const gameBoard = (() => {

    let board = ["", "", "", 
                 "", "", "",
                 "", "", ""];

    function addMark(playerSymbol, pos) {
        board[pos] = playerSymbol;
    }

    function reset() {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    
    return { board, addMark, reset }; // returns publicly exposed methods, variables

})();

// player factory function

const Player = (symbol, name) => {
    
    const getSymbol = () => symbol;
    const getName = () => name;

    return { getSymbol, getName };
};


// gameplay controller module

const gamePlayController = (() => {
    let player1 = "";
    let player2 = ""; 

    let currentPlayer = "";

    const setPlayers = (name1, name2) => {
        player1 = Player('X', name1);
        player2 = Player('O', name2);

        currentPlayer = player1;
    } 

    

    const getCurrentPlayerSymbol = () => currentPlayer.getSymbol();
    const getCurrentPlayerName = () => currentPlayer.getName();

    function switchTurn() {
        currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
   }

   function checkHorizontalWin(board, currentSymbol) {
       for (let i = 0; i <= 6; i += 3) {
           if (board[i] == currentSymbol && board[i + 1] == currentSymbol && board[i + 2] == currentSymbol) {
               return true;
           }
       }

       return false;
   }
   
   function checkVerticalWin(board, currentSymbol) {
       for (let i = 0; i <= 2; i ++) {
           if (board[i] == currentSymbol && board[i + 3] == currentSymbol && board[i + 6] == currentSymbol) {
               return true;
           }
       }

       return false;
   }
   
   function checkDiagonalWin(board, currentSymbol) {
           if (board[0] == currentSymbol && board[4] == currentSymbol && board[8] == currentSymbol) {
               return true;
           } else if (board[2] == currentSymbol && board[4] == currentSymbol && board[6] == currentSymbol) {
               return true;
           }

       return false;
   }

   const checkWin = (board, currentSymbol) => {
       return (checkHorizontalWin(board, currentSymbol) || 
               checkVerticalWin(board, currentSymbol) || 
               checkDiagonalWin(board, currentSymbol));
   }

   const checkTie = () => {
       if (!gameBoard.board.includes("")) {
           return true;
       }

       return false;
   }

   const reset = () => {
       player1 = "";
       player2 = "";
       currentPlayer = "";
   }

    return { getCurrentPlayerSymbol, switchTurn, checkWin, setPlayers, getCurrentPlayerName, reset, checkTie };

})();

// display controller module

const displayController = (() => {
    
    const DOMTiles = document.querySelectorAll('.tile');

    function run() {
        DOMTiles.forEach(tile => tile.addEventListener('click', (e) => {
            let currentSymbol = gamePlayController.getCurrentPlayerSymbol();
            let pos = e.target.id;
    
            if (e.target.textContent == "") {
                gameBoard.addMark(currentSymbol, pos);
                renderContents(gameBoard.board);
    
                if (gamePlayController.checkWin(gameBoard.board, currentSymbol)) {
                    displayWinner(gamePlayController.getCurrentPlayerName());
                } else if (gamePlayController.checkTie()) {
                    displayTie();
                }

                
                gamePlayController.switchTurn();
            }
        }));
    }
    

    function displayWinner(player) {
        alert(`${player} Wins!`);

        gameBoard.reset();
        displayController.reset();
    }

    function displayTie() {
        alert("It's a Draw");

        gameBoard.reset();
        displayController.reset();
    }

    function renderContents(board) {
        DOMTiles.forEach((tile, index) => {
            tile.textContent = board[index];
        });
    }

    const reset = () => {
        renderContents(gameBoard.board);
    }

    return { run, reset };

})();



startBtn = document.querySelector('#start');
player1Input = document.querySelector('#player-1');
player2Input = document.querySelector('#player-2');

startBtn.addEventListener('click', (e) => {
    gameBoard.reset();
    gamePlayController.reset();
    displayController.reset();

    e.target.textContent = "reset"; // changes button to reset
    gamePlayController.setPlayers(player1Input.value, player2Input.value);
    displayController.run();
});
