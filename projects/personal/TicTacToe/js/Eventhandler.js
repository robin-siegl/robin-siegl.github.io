// eventhandler for clicking on a cell
for (let i = 0; i < document.getElementsByClassName("cell").length; i++) {
	document.getElementsByClassName("cell")[i].addEventListener("click", function(e) {

		// check if game state is started
		if (game.state === "start") {
			// declare variables
			let row;
			let col;
			let activePlayer;

			// calculate row and col
			if (i < 3) {
				row = 0;
				col = i;
			} else if (i < 6) {
				row = 1;
				col = i - 3;
			} else if (i < 9) {
				row = 2;
				col = i - 6;
			} else {
				return "error";
			}

			// get active player
			if (player1.isActive) {
				activePlayer = player1;
			} else if (player2.isActive) {
				activePlayer = player2;
			} else {
				return "error";
			}

			// set player spaces
			gameBoard.getPlayerSpace(row, col);
		}
	});
}