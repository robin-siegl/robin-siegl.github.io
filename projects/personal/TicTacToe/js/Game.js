// declare variables
const player1Menu = document.getElementById("player-1");
const player2Menu = document.getElementById("player-2");
const infoMenu = document.getElementById("info-container");
const boardContainer = document.getElementById("board-container");

// game class
class Game {
	
	// game constructor
	constructor (state) {
		this.state = state;
	}
	
	// start new game
	start() {
		// initialize default game board
		gameBoard.boardScreen = "default";
		
		// change info menu text and style
		gameBoard.infoMenuStyle("none", gameSettings.colorTransparent, "");
	
		// set player active and change player menu style and text
		player1.isActive = true;
		player2.isActive = false;
		gameBoard.playerMenuStyle(player1Menu, gameSettings.colorActive, "Your Turn");
		gameBoard.playerMenuStyle(player2Menu, gameSettings.colorInactive, "Wait");
	
		// change game state to start
		this.state = "start";
	}

	// actions when game ends with winner
	end() {
		// change info menu text and style
		gameBoard.infoMenuStyle("flex", gameSettings.colorTransparent, "<h1>Winner:</h1><p>Player " + gameBoard.activePlayer.id + "</p>");
		
		// change player menu text and style
		if (gameBoard.activePlayer === player1) {
			gameBoard.playerMenuStyle(player1Menu, gameSettings.colorActive, "Winner");
			gameBoard.playerMenuStyle(player2Menu, gameSettings.colorInactive, "Loser");
		} else if (gameBoard.activePlayer === player2) {
			gameBoard.playerMenuStyle(player1Menu, gameSettings.colorInactive, "Loser");
			gameBoard.playerMenuStyle(player2Menu, gameSettings.colorActive, "Winner");
		}
	
		// change game state to end
		this.state = "end";
	}

	// actions when game ends with no winner
	draw() {
		// change info menu text and style
		gameBoard.infoMenuStyle("flex", gameSettings.colorTransparent, "<h1>Draw</h1>");
		
		// change player menu text and style
		gameBoard.playerMenuStyle(player1Menu, gameSettings.colorInactive, "Draw");
		gameBoard.playerMenuStyle(player2Menu, gameSettings.colorInactive, "Draw");
	
		// change game state to draw
		this.state = "draw";
	}

	// helper to check game rules
	checkRules() {
		
		// Check all Cols if there are three matching symbols
		if (gameBoard.spaces[0][0] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][0] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][0] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(0,0);
			gameBoard.highlightCells(1,0);
			gameBoard.highlightCells(2,0);
		} else if (gameBoard.spaces[0][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][1] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(0,1);
			gameBoard.highlightCells(1,1);
			gameBoard.highlightCells(2,1);
		} else if (gameBoard.spaces[0][2] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][2] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][2] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(0,2);
			gameBoard.highlightCells(1,2);
			gameBoard.highlightCells(2,2);
		}
		
		// Check all Rows if there are three matching symbols
		if (gameBoard.spaces[0][0] === gameBoard.activePlayer.symbol && gameBoard.spaces[0][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[0][2] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(0,0);
			gameBoard.highlightCells(0,1);
			gameBoard.highlightCells(0,2);
		} else if (gameBoard.spaces[1][0] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][2] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(1,0);
			gameBoard.highlightCells(1,1);
			gameBoard.highlightCells(1,2);
		} else if (gameBoard.spaces[2][0] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][2] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(2,0);
			gameBoard.highlightCells(2,1);
			gameBoard.highlightCells(2,2);
		}
		
		// Check all Rows and Cols if there are three matching symbols diagonal
		if (gameBoard.spaces[0][0] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][2] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(0,0);
			gameBoard.highlightCells(1,1);
			gameBoard.highlightCells(2,2);
		} else if (gameBoard.spaces[0][2] === gameBoard.activePlayer.symbol && gameBoard.spaces[1][1] === gameBoard.activePlayer.symbol && gameBoard.spaces[2][0] === gameBoard.activePlayer.symbol) {
			game.end();
			gameBoard.highlightCells(0,2);
			gameBoard.highlightCells(1,1);
			gameBoard.highlightCells(2,0);
		}
		
		// Check if there are free spaces
		let spacesCounter = 0;
	
		// count spaces with symbols
		for (let row = 0; row < gameBoard.spaces.length; row++) {
			for (let col = 0; col < gameBoard.spaces[row].length; col++) {
				if (gameBoard.spaces[row][col].length > 0) {
					if (gameBoard.spaces.length > 0) {
						spacesCounter += 1;
					}
				}
			}
		}
		
		// when all spaces are full - game ends - draw
		if (spacesCounter >= 9 && game.state === "start") {
			game.draw();
		}
	}

}

// initialize new game
const game = new Game;
game.start();