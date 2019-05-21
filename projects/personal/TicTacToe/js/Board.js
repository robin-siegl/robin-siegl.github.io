const row0 = document.getElementById("row-1").children;
const row1 = document.getElementById("row-2").children;
const row2 = document.getElementById("row-3").children;
const gameboardArray = [row0, row1, row2];

class Board {
  constuctor (spaces) {
    this.spaces = spaces;
  }
}

let gameBoard = new Board;
gameBoard.spaces = [["","",""],
                    ["","",""],
                    ["","",""]];

const getPlayerSpace = (activePlayer, row, col) => {
  if (gameBoard.spaces[row][col].length <= 0) {
    gameBoard.spaces[row][col] = activePlayer.symbol;
    gameboardArray[row][col].innerHTML = "<img src='img/" + gameBoard.spaces[row][col] + ".png'>";
    changeActivePlayer();
    checkRules(activePlayer);
    checkIfDraw();
  } else {
    console.log("This cell is not empty");
  }
}

const setBoardSpacesToDefault = () => {
  for (let row = 0; row < gameBoard.spaces.length; row++) {
    for (let col = 0; col < gameBoard.spaces[row].length; col++) {
      if (gameBoard.spaces[row][col].length > 0) {
        gameboardArray[row][col].innerHTML = "";
        gameBoard.spaces[row][col] = "";
      }
    }
  }
}

const checkIfDraw = () => {
  let counter = 0;
  
  for (let row = 0; row < gameBoard.spaces.length; row++) {
    for (let col = 0; col < gameBoard.spaces[row].length; col++) {
      if (gameBoard.spaces[row][col].length > 0) {
        if (gameBoard.spaces.length > 0) {
          counter += 1;
        }
      }
    }
  }
  
  if (counter >= 9) {
    game.draw();
  }
}

const changeActivePlayer = () => {
  if (player1.isActive) {
    player1.isActive = false;
    player2.isActive = true;
    player1Menu.children[2].style.backgroundColor = "#ebebeb";
    player1Menu.children[2].innerHTML = "Wait";
    player2Menu.children[2].style.backgroundColor = "#4caf50";
    player2Menu.children[2].innerHTML = "Your Turn";
  } else if (player2.isActive) {
    player1.isActive = true;
    player2.isActive = false;
    player1Menu.children[2].style.backgroundColor = "#4caf50";
    player1Menu.children[2].innerHTML = "Your Turn";
    player2Menu.children[2].style.backgroundColor = "#ebebeb";
    player2Menu.children[2].innerHTML = "Wait";
  }
}

const checkRules = (activePlayer) => {
  const playerSymbol = activePlayer.symbol;
  
  // Check all Cols if there are three matching symbols
  if (gameBoard.spaces[0][0] === playerSymbol && gameBoard.spaces[1][0] === playerSymbol && gameBoard.spaces[2][0] === playerSymbol) {
    game.end(activePlayer);
  } else if (gameBoard.spaces[0][1] === playerSymbol && gameBoard.spaces[1][1] === playerSymbol && gameBoard.spaces[2][1] === playerSymbol) {
    game.end(activePlayer);
  } else if (gameBoard.spaces[0][2] === playerSymbol && gameBoard.spaces[1][2] === playerSymbol && gameBoard.spaces[2][2] === playerSymbol) {
    game.end(activePlayer);
  }
  
  // Check all Rows if there are three matching symbols
  if (gameBoard.spaces[0][0] === playerSymbol && gameBoard.spaces[0][1] === playerSymbol && gameBoard.spaces[0][2] === playerSymbol) {
    game.end(activePlayer);
  } else if (gameBoard.spaces[1][0] === playerSymbol && gameBoard.spaces[1][1] === playerSymbol && gameBoard.spaces[1][2] === playerSymbol) {
    game.end(activePlayer);
  } else if (gameBoard.spaces[2][0] === playerSymbol && gameBoard.spaces[2][1] === playerSymbol && gameBoard.spaces[2][2] === playerSymbol) {
    game.end(activePlayer);
  }
  
  // Check all Rows and Cols if there are three matching symbols diagonal
  if (gameBoard.spaces[0][0] === playerSymbol && gameBoard.spaces[1][1] === playerSymbol && gameBoard.spaces[2][2] === playerSymbol) {
    game.end(activePlayer);
  } else if (gameBoard.spaces[0][2] === playerSymbol && gameBoard.spaces[1][1] === playerSymbol && gameBoard.spaces[2][0] === playerSymbol) {
    game.end(activePlayer);
  }
}

for (let i = 0; i < document.getElementsByClassName("cell").length; i++) {
  document.getElementsByClassName("cell")[i].addEventListener("click", function(e) {
    
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
    
    
    getPlayerSpace(activePlayer, row, col);
    
  });
}