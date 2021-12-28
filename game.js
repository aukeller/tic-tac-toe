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

    gameBoard.addMark(player1.getSymbol(), 1);
    gameBoard.addMark(player2.getSymbol(), 4);

    console.log(gameBoard.board);

    return {};

})();

// display controller module

const displayController = (() => {
    
    function renderContents(board) {
        board.forEach(tile => {
            tileDOM = document.createElement('div');
            tileDOM.textContent = tile;

            document.body.appendChild(tileDOM);
        });
    }

    return { renderContents };
})();

