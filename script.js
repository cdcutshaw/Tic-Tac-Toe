//factory function that creates the gameboard object
function Gameboard () {

    let board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    const resetBoard = () => board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
   
  
    const getBoard = () => board;

    const winCheck = () => {
        if ((board[0] !== null && board[0] === board[1] && board[1] === board[2])
            || (board[3] !== null && board[3] === board[4] && board[4] === board[5])
            || (board[6] !== null && board[6] === board[7] && board[7] === board[8])
            || (board[0] !== null && board[0] === board[3] && board[3] === board[6])
            || (board[1] !== null && board[1] === board[4] && board[4] === board[7])
            || (board[2] !== null && board[2] === board[5] && board[5] === board[8])
            || (board[0] !== null && board[0] === board[4] && board[4] === board[8])
            || (board[2] !== null && board[2] === board[4] && board[4] === board[6])) {
            return true;
            
        } 
        else {
            return false;
        }
    }

    const placeToken = (selectedCell, playerID) => {
        if (board[selectedCell] === null) {
            board[selectedCell] = playerID;
        }
        else {
            alert ('invalid move');
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((cell) => cell);
        console.log(boardWithCellValues);
    }

    return {resetBoard, getBoard, winCheck, placeToken, printBoard};
};




function GameController ( 
    playerOneName = "player One", 
    playerTwoName = "player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            playerID: 'X'
        },
        {
            name: playerTwoName,
            playerID: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
      };

    const checkForWin = () => {
        board.winCheck();
        if (true){
            console.log(`we have a winner`)
        }

    }
    
    const playRound = (selectedCell) => {
    console.log(`Placing ${getActivePlayer().name}'s marker into cell ${selectedCell}...` );
    board.placeToken(selectedCell, getActivePlayer().playerID);
       
        checkForWin();

        switchPlayerTurn();
        printNewRound();
      };
printNewRound();

console.log(playRound(0));
console.log(playRound(6));
console.log(playRound(1));
console.log(playRound(5));
console.log(playRound(2));
console.log(playRound(3));

return {playRound, getActivePlayer};

}

const game = GameController();

