// gameboard module

const gameBoard = (() => {

    const board = ["", "", "", 
                   "", "", "",
                   "", "", ""];

    function addMark(playerSymbol, pos) {
        board[pos] = playerSymbol;
    }

    
    return { board, addMark }; // returns publicly exposed methods, variables

})();

// player factory function

const Player = (symbol) => {
    
    const getSymbol = () => symbol;

    return { getSymbol };
};


// gameplay controller module

const gamePlayController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");


    let currentPlayer = player1;

    const getCurrentPlayerSymbol = () => currentPlayer.getSymbol();

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

    return { getCurrentPlayerSymbol, switchTurn, checkWin };

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
    
                console.log(gamePlayController.checkWin(gameBoard.board, currentSymbol))
                
    
                gamePlayController.switchTurn();
            }
            
    
        }));
    }
    

    function renderContents(board) {
        DOMTiles.forEach((tile, index) => {
            tile.textContent = board[index];
        });
    }

    return { run };

})();




displayController.run();