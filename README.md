# Tic-Tac-Toe

The goal of this project was to create a tic-tac-toe game utilizing the concepts of encapsulation and the module pattern, keeping game logic separate from the UI. One module handles the gameboard state, another controls the flow of the game, and another renders the results to the DOM for the UI. 

outstanding bugs: 
    1. when clicking a cell that has already been selected, after the alert that the cell is invalid is passed, the the active player is switched, so that person loses a turn. 

    2. unable to update .turn div upon win to include the winner's name using activePlayer. Since play round has already been triggered, it returns the incorrect player.

