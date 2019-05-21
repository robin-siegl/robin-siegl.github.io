const player1Menu = document.getElementById("player-1");
const player2Menu = document.getElementById("player-2");
const infoMenu = document.getElementById("info-container");
const boardContainer = document.getElementById("board-container");

class Game {
  start() {
    infoMenu.style.display = "none";
    boardContainer.style.display = "block";
    player1.isActive = true;
    player1Menu.children[2].style.backgroundColor = "#4caf50";
    player1Menu.children[2].innerHTML = "Your Turn";
    player2.isActive = false;
    player2Menu.children[2].style.backgroundColor = "#ebebeb";
    player2Menu.children[2].innerHTML = "Your Turn";
    
    setBoardSpacesToDefault();
  }
  end(activePlayer) {
    infoMenu.children[0].innerHTML = "Winner: Player " + activePlayer.id;
    infoMenu.style.backgroundColor = activePlayer.color;
    infoMenu.style.display = "flex";
    boardContainer.style.display = "none";
    player1.isActive = false;
    player2.isActive = false;
    
    if (activePlayer === player1) {
      player1Menu.children[2].innerHTML = "Winner";
      player2Menu.children[2].innerHTML = "Loser";
      player1Menu.children[2].style.backgroundColor = "#4caf50";
      player2Menu.children[2].style.backgroundColor = "#ebebeb";
    } else if (activePlayer === player2) {
      player1Menu.children[2].innerHTML = "Loser";
      player2Menu.children[2].innerHTML = "Winner";
      player1Menu.children[2].style.backgroundColor = "#ebebeb";
      player2Menu.children[2].style.backgroundColor = "#4caf50";
    }
  }
  draw() {
    infoMenu.children[0].innerHTML = "Draw";
    infoMenu.style.backgroundColor = "#ebebeb";
    infoMenu.style.display = "flex";
    boardContainer.style.display = "none";
    player1.isActive = false;
    player2.isActive = false;
    player1Menu.children[2].innerHTML = "Draw";
    player2Menu.children[2].innerHTML = "Draw";
    player1Menu.children[2].style.backgroundColor = "#ebebeb";
    player2Menu.children[2].style.backgroundColor = "#ebebeb";
  }
}

const game = new Game;
game.start();