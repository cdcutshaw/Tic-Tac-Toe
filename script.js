//factory function that creates the gameboard object
function Gameboard () {

    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const resetBoard = () => board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
   
  
    const getBoard = () => board;

    const winCheck = () => {
        
        if ((board[0] !== "" && board[0] === board[1] && board[1] === board[2])
            || (board[3] !== "" && board[3] === board[4] && board[4] === board[5])
            || (board[6] !== "" && board[6] === board[7] && board[7] === board[8])
            || (board[0] !== "" && board[0] === board[3] && board[3] === board[6])
            || (board[1] !== "" && board[1] === board[4] && board[4] === board[7])
            || (board[2] !== "" && board[2] === board[5] && board[5] === board[8])
            || (board[0] !== "" && board[0] === board[4] && board[4] === board[8])
            || (board[2] !== "" && board[2] === board[4] && board[4] === board[6])) {
            return true;   
        } 
        else {
            return false;
        }
    }

    const tieCheck = () => {
        if (board.includes("")){
            return false;
        }
        else {
            return true;
        }
    }

    const placeToken = (selectedCell, playerID) => {
        if (board[selectedCell] === "") {
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

    return {resetBoard, getBoard, winCheck, tieCheck, placeToken, printBoard};
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

    const gameOver = () => {
        board.printBoard();
        console.log(`game over!`);
        board.resetBoard ();
    }

    const checkForTie = () => {
        return board.tieCheck();
    }

    const checkForWin = () => {
        
        if (board.winCheck() === true) {
            board.printBoard();
            alert(`winner: ${getActivePlayer().name}`)
            gameOver();
        }
        else if (checkForTie() === true) {
            board.printBoard();
            alert (`tie`)
            gameOver();
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


return {playRound, getActivePlayer, getBoard: board.getBoard};
}






function ScreenController () {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`

        board.forEach(( cell, index) => {
            const cellBtn = document.createElement("button");
            cellBtn.classList.add("cell");
            cellBtn.dataset.cell = index
            cellBtn.textContent = cell.valueOf();
            boardDiv.appendChild(cellBtn)
        })
    }

    function clickHandlerBoard(e) {
        const  selectedCell = e.target.dataset.cell;
        if(!selectedCell) return;

        game.playRound(selectedCell);
        updateScreen();

    }

    boardDiv.addEventListener("click" , clickHandlerBoard);
    updateScreen();
}

ScreenController();