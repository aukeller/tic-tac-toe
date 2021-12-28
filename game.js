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

    return { getCurrentPlayerSymbol, switchTurn };

})();

// display controller module

const displayController = (() => {
    
    const DOMTiles = document.querySelectorAll('.tile');
    DOMTiles.forEach(tile => tile.addEventListener('click', (e) => {
        
        let currentSymbol = gamePlayController.getCurrentPlayerSymbol();
        let pos = e.target.id;

        if (e.target.textContent == "") {
            gameBoard.addMark(currentSymbol, pos);
            renderContents(gameBoard.board);

            gamePlayController.switchTurn();
        }
        

    }));
    
    
    function renderContents(board) {
        DOMTiles.forEach((tile, index) => {
            tile.textContent = board[index];
        });
    }

})();




