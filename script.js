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
    }

    return {resetBoard, getBoard, winCheck, tieCheck, placeToken, printBoard};
};





function GameController ( 
    playerOneName = "Player One", 
    playerTwoName = "Player Two"
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
    };

    const gameOver = () => {
        board.resetBoard ();
    }

    const checkForTie = () => {
        return board.tieCheck();
    }

    const checkForWin = () => {
        if (board.winCheck() === true) {
           return 'win';   
        }
        else if (checkForTie() === true) {
            return 'tie'
        } 
    }
    
    const playRound = (selectedCell) => {
    board.placeToken(selectedCell, getActivePlayer().playerID);
        switchPlayerTurn();
    };

printNewRound();

return {playRound, getActivePlayer, getBoard: board.getBoard, checkForWin, gameOver};
}





function ScreenController () {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const restartBtn = document.querySelector('.restart');

    const win = () => { 
        if (game.checkForWin() === 'win'){
            playerTurnDiv.textContent = `We have a winner! Game Over!`
            game.gameOver();
            boardDiv.removeEventListener("click" , clickHandlerBoard);    
        };
    }

    const tie = () => { 
        if (game.checkForWin() === 'tie'){
            playerTurnDiv.textContent = `We have a Tie! Game Over!`
            game.gameOver();
            boardDiv.removeEventListener("click" , clickHandlerBoard);
        }; 
    }

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        
        playerTurnDiv.textContent = `${activePlayer.name}'s Turn...`

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
        win();
        tie();
    }
    
    boardDiv.addEventListener("click" , clickHandlerBoard);
    updateScreen();

    restartBtn.addEventListener("click", () =>{
        game.gameOver();
        updateScreen();
        boardDiv.addEventListener("click" , clickHandlerBoard);
    })
}

ScreenController();