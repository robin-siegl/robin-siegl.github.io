// player class
class Player {
	constructor (id, symbol, color, isActive = false) {
		this.id = id;
		this.symbol = symbol;
		this.color = color;
		this.isActive = isActive;
		this.spaces = [];
	}
}

// initialize player 1
const player1 = new Player;
player1.id = 1;
player1.symbol = "symbolX";
player1.color = gameSettings.colorPlayer1;

// initialize player 2
const player2 = new Player;
player2.id = 2;
player2.symbol = "symbolO";
player2.color = gameSettings.colorPlayer2;