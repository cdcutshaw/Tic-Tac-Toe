//factory function that creates the gameboard object
function Gameboard () {

    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const resetBoard = () => board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
   
  
    const getBoard = () => board;

    
    const placeToken = (selectedCell, playerID) => {
        if (board[selectedCell] === '') {
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

    return {resetBoard, getBoard, placeToken, printBoard};
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
    
      const playRound = (selectedCell) => {
        console.log(
            `Placing ${getActivePlayer().name}'s marker into cell ${selectedCell}...`
        );
        board.placeToken(selectedCell, getActivePlayer().playerID);

        switchPlayerTurn();
        printNewRound();
      };
printNewRound();

console.log(playRound(2));
console.log(playRound(1));
console.log(playRound(0));

return {playRound, getActivePlayer};

}

const game = GameController();


