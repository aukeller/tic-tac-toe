// gameboard module

const gameBoard = (() => {

    const board = ["X", "O", "X", "O", "X", "O"];

    
    return { board }; // returns publicly exposed methods, variables

})();

// player factory function

const Player = () => {
    
    return {};
};

// gameplay controller module

const gamePlayController = (() => {

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

displayController.renderContents(gameBoard.board);