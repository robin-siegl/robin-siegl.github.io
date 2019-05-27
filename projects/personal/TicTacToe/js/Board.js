// declare variables
const row0 = document.getElementById("row-1").children;
const row1 = document.getElementById("row-2").children;
const row2 = document.getElementById("row-3").children;
const gameboardArray = [row0, row1, row2];
const cells = document.getElementsByClassName("Cell");

// Board class
class Board {

	// Board constructor
	constuctor (spaces) {
		this.spaces = spaces;
	}

	// set state from board
	// Value "default" resets board back to new
	set boardScreen(state) {

		// check if value is default
		if (state === "default") {

			//change background color
			for (let i = 0; i < cells.length; i++) {
				cells[i].style.backgroundColor = gameSettings.colorLight;
				cells[i].innerHTML = "";
			}

			// restore new spaces array
			this.spaces = [["","",""],
						["","",""],
						["","",""]];

		}
	}

	// get active player
	get activePlayer() {
		if (player1.isActive) {
			return player1;
		} else if (player2.isActive) {
			return player2;
		}
	}

	// change style from player menu
	playerMenuStyle(playerMenu, backgroundColor, state) {
		playerMenu.children[2].style.backgroundColor = backgroundColor;
		playerMenu.children[2].innerHTML = state;
	}

	// change info menu style
	infoMenuStyle(display, backgroundColor, state) {
		infoMenu.style.display = display;
		infoMenu.style.backgroundColor = backgroundColor;
		infoMenu.children[0].innerHTML = state;
	}

	// set active player
	changeActivePlayer() {
		if (player1.isActive) {
			player1.isActive = false;
			player2.isActive = true;
			this.playerMenuStyle(player1Menu, gameSettings.colorInactive, "Wait");
			this.playerMenuStyle(player2Menu, gameSettings.colorActive, "Your Turn");
		} else if (player2.isActive) {
			player1.isActive = true;
			player2.isActive = false;
			this.playerMenuStyle(player1Menu, gameSettings.colorActive, "Your Turn");
			this.playerMenuStyle(player2Menu, gameSettings.colorInactive, "Wait");
		}
	}

	// enter current symbol into html element
	getPlayerSpace(row, col) {
		// check if space is empty
		if (this.spaces[row][col].length <= 0) {
			this.spaces[row][col] = this.activePlayer.symbol;
			gameboardArray[row][col].innerHTML = "<img class='symbol-img' src='img/" + this.spaces[row][col] + ".png'>";
			game.checkRules();

			// only when game state is start change player
			if (game.state === "start") {
				this.changeActivePlayer();
			}
		}
	}

	// highlight cells if there are three in a row
	highlightCells(row, col) {
		if (game.state === "end") {
			if (row === 0) {
				row0[col].style.backgroundColor = gameSettings.colorActive;
			} else if (row === 1) {
				row1[col].style.backgroundColor = gameSettings.colorActive;
			} else if (row === 2) {
				row2[col].style.backgroundColor = gameSettings.colorActive;
			}
		}
	}
}

// initalize game board
let gameBoard = new Board;