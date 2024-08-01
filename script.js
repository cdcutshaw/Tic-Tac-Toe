//factory function that creates the gameboard object
function Gameboard () {

    const board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

   
   //method to get board that UI will eventually render
    const getBoard = () => board;

    
    const placeToken = (selectedCell, playerID) => {
        if (board[selectedCell] === null) {
            board[selectedCell] = playerID;
        }
        else {
            alert ('invalid move');
        }
    }

    placeToken(8, "x")
    placeToken(8, "0")
    console.log(board)
    return (getBoard, placeToken)
}

Gameboard();