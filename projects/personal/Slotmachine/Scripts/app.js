let money = document.getElementById("statusbar").children[0].children[1].children[1];               // Output current player money
let lvl = document.getElementById("statusbar").children[1].children[0];                             // Output current player lvl
let xpBar = document.getElementById("statusbar").children[1].children[1].children[1].children[0];   // Output current size of xp bar
let slotContainer = document.getElementById("slotmachine");                                         // slotmachine container
let slotmachine = slotContainer.children;                                                           // Array with all 6 slot displays
let interaction = document.getElementById("interaction").children;                                  // Array with ineractions | 0 decrease price - 1 output price on .children[0] - 2 increase price - 3 difficulty - 4 insert coin and play
let gameMessage = document.getElementById("gameMessage").children[0].children[0];                   // Output current game messages
const assetsArray = ["Assets/Rhombus.svg","Assets/Heart.svg","Assets/BronzeCoin.svg","Assets/GreenCoin.svg","Assets/Diamond.svg"];
const loadingArray = ["Assets/letter-C.svg","Assets/letter-A.svg","Assets/letter-S.svg","Assets/letter-I.svg","Assets/letter-N.svg","Assets/letter-O.svg"];
let hostPath = window.location.href;                                                                // Path to the assets folder -> root path
hostPath = hostPath.substring(0, hostPath.lastIndexOf("/") + 1);                                    // remove index.html
let gameState = false;                                                                              // False = No interaction made | True = Insertcoin clicked
let options = document.getElementById("options").children;                                          // Array with ineractions | 0 save game - 1 load game - 2 help - 3 version

// Game variables to store int with player money, lvl and xp
let playerMoney;
let playerLvl;
let playerXp;
let gameCoins;
let gameDifficulty;
let calCoins;
let currentGameCoins;
let currentGameDifficulty;
let xpBarLvlWidth;
let dummyXpBarWidth;


// Enable :active on mobile browser
document.addEventListener("touchstart", function() {}, false );

// Save Game
options[0].addEventListener("click", function() {
    saveGame();
});

// Load Game
options[1].addEventListener("click", function() {
    loadGame();
});

// help page
options[2].addEventListener("click", function(){
    window.open("help.html", '_blank');
});

// check if button is enabled or disabled
function decreaseButtonState() {
    // recheck if gameCoin is in the range of 1-64
    if (gameCoins <= 1) {
        interaction[0].classList.add("buttonDisabled");
        if (interaction[2].classList.contains("buttonDisabled")) {
            interaction[2].classList.remove("buttonDisabled");
        }
    } else if (gameCoins < 64) {
        interaction[2].classList.remove("buttonDisabled");
    }
}

// function to decrease coins per game
function decreaseCoinPerGame() {
    // check if gameCoin is in the range of 1-64
    if (gameCoins > 1) {
        // divide gameCoins by 2
        gameCoins /= 2;

        // add animation class and change text
        interaction[1].classList.add("removedCoin");
        interaction[1].children[0].innerHTML = gameCoins + "$";

        // remove animationclass after .5s
        setTimeout(function() {
            interaction[1].classList.remove("removedCoin");
        }, 500);

        decreaseButtonState();
    }
    checkPlayerMoney();
}

// check if button is enabled or disabled
function increaseButtonState() {
    // recheck if gameCoin is in the range of 1-64
    if (gameCoins >= 64) {
        interaction[2].classList.add("buttonDisabled");
        if (interaction[0].classList.contains("buttonDisabled")) {
            interaction[0].classList.remove("buttonDisabled");
        }
        
    } else if (gameCoins > 1) {
        interaction[0].classList.remove("buttonDisabled");
    }
}

// function to increase coins per game
function increaseCoinPerGame() {
    // check if gameCoin is in the range of 1-64
    if (gameCoins < 64) {
        // multiply gameCoins by 2
        gameCoins *= 2;

        // add animation class and change text
        interaction[1].classList.add("addedCoin");
        interaction[1].children[0].innerHTML = gameCoins + "$";

        // remove animationclass after .5s
        setTimeout(function() {
            interaction[1].classList.remove("addedCoin");
        }, 500);

        increaseButtonState();
    }
    checkPlayerMoney();
}

// decrease coin cost
interaction[0].addEventListener("click", function() {
    decreaseCoinPerGame();
});

// increase coin cost
interaction[2].addEventListener("click", function() {
    increaseCoinPerGame();
});

// change difficulty
interaction[3].addEventListener("click", function(){
    if (gameDifficulty < 3) {
        gameDifficulty++;
    } else if (gameDifficulty >= 3) {
        gameDifficulty = 1;
    }
    interaction[3].children[1].innerHTML = gameDifficulty;
});

// insert Coin Eventlistener
interaction[4].addEventListener("click", function(){
    if (gameCoins <= playerMoney) {
        insertCoin();
    }
    checkPlayerMoney();
});

slotmachine[0].addEventListener("animationend", function(e){

    // display random icons on slot display
    if (e.target.localName == "img") {
        for (i = 0; i < slotmachine.length; i++) {
            let random = Math.floor(Math.random() * (currentGameDifficulty + 2));
            slotmachine[i].children[0].src = assetsArray[random];
        }
    }

    // check icons and calcualte coins
    calculateCoins();

    // remove animation class and enable new click
    document.getElementById("slotmachine").classList.remove("animateSlotdisplays");

    // wait 2 sec bevor displaying game over screen
    setTimeout(function(){
        gameOverCheck();
    },2000);
    
});

// check if player has enough money
function checkPlayerMoney() {
    if (gameCoins > playerMoney && !interaction[4].classList.contains("buttonDisabled")) {
        interaction[4].classList.add("buttonDisabled");
    } else if (gameCoins <= playerMoney && interaction[4].classList.contains("buttonDisabled")) {
        interaction[4].classList.remove("buttonDisabled");
    }
}

// check if player has money left
function gameOverCheck() {
    // if player has not enough money left -> game over
    if (playerMoney < 1) {
        // check current highscores and add new to the list
        let savedHighscoreList = localStorage.getItem("highscore");
        let username = prompt("Game Over! Please enter your Username for the Highscore List:");
        let highscore;

        if (username == null) {
            username = "Default";
        }

        let playervalue = [username,playerLvl];

        if (savedHighscoreList != null) {
            if (savedHighscoreList.length > 0) {
                highscore = JSON.parse(localStorage.getItem("highscore"));
                highscore.push(playervalue);
            } else {
                highscore = [playervalue]
            }
        } else {
            highscore = [playervalue]
        }
        localStorage.setItem("highscore", JSON.stringify(highscore));

        // go to game over screen
        window.location.href = "gameover.html";
    }
}

// lvl system
function checkLvlSytsem() {
    if (playerLvl < 1) {
        xpBarLvlWidth = 100;
    } else if (playerLvl < 5) {
        xpBarLvlWidth = 125;
    } else if (playerLvl < 10) {
        xpBarLvlWidth = 150;
    } else if (playerLvl < 20) {
        xpBarLvlWidth = 175;
    } else if (playerLvl < 30) {
        xpBarLvlWidth = 200;
    } else if (playerLvl < 50) {
        xpBarLvlWidth = 250;
    } else if (playerLvl < 75) {
        xpBarLvlWidth = 300;
    } else if (playerLvl < 100) {
        xpBarLvlWidth = 400;
    } else if (playerLvl >= 100) {
        xpBarLvlWidth = 500;
    }
}

// lvl up animation
function lvlUp() {
    lvl.classList.add("lvlUp");
    setTimeout(function(){
        lvl.classList.remove("lvlUp");
    },2000);
}

// update all labels
function updateLabels() {
    // check for current xpBarLvlWidth
    checkLvlSytsem();
    // calc xpbar width
    dummyXpBarWidth = (100 / xpBarLvlWidth) * playerXp;

    // check if lvl up
    if (dummyXpBarWidth >= 200) {
        dummyXpBarWidth -= 200;
        playerXp -= (xpBarLvlWidth * 2);
        playerLvl += 2;
        lvlUp();
    } else if (dummyXpBarWidth >= 100) {
        dummyXpBarWidth -= 100;
        playerXp -= xpBarLvlWidth;
        playerLvl += 1;
        lvlUp();
    }

    // update labels
    xpBar.style.width = dummyXpBarWidth + "%";
    money.innerHTML = playerMoney.toFixed(2) + "$";
    lvl.innerHTML = playerLvl;
}

// set slot displays to "CASINO"
function standardSlotdisplay() {
    for (i = 0; i < slotmachine.length; i++) {
        slotmachine[i].children[0].src = loadingArray[i];
        slotmachine[i].style.background = "#f2f4f3";
    }
}

// update output on message box to give the user info
function updateMessageBox(message) {
    gameMessage.innerHTML = message;
}

// set player variables to standard
function newGame() {
    playerMoney = 200;
    playerLvl = 0;
    playerXp = 0;
    gameCoins = 2;
    gameDifficulty = 1;

    interaction[1].children[0].innerHTML = gameCoins + "$";
    interaction[3].children[1].innerHTML = gameDifficulty;
    updateLabels();
    updateMessageBox("Welcome new Player!");
    standardSlotdisplay();
}

// set player variables to standard
function loadGame() {
    // Check if there is a savegame else start a new game
    if (localStorage.getItem("playerMoney") == null || localStorage.getItem("playerLvl") == null || localStorage.getItem("playerXp") == null || localStorage.getItem("gameCoins") == null || localStorage.getItem("gameDifficulty") == null) {
        alert("We couldn't find a previous game! A new game will be loaded!");
        newGame();
    } else {
        playerMoney = parseInt(localStorage.getItem("playerMoney"));
        playerLvl = parseInt(localStorage.getItem("playerLvl"));
        playerXp = parseInt(localStorage.getItem("playerXp"));
        gameCoins = parseInt(localStorage.getItem("gameCoins"));
        gameDifficulty = parseInt(localStorage.getItem("gameDifficulty"));
    
        interaction[1].children[0].innerHTML = gameCoins + "$";
        interaction[3].children[1].innerHTML = gameDifficulty;
        updateLabels();
        updateMessageBox("Welcome Player!");
        standardSlotdisplay();
        decreaseButtonState();
        increaseButtonState();
        checkPlayerMoney();
        alert("Game loaded!");
    }
}

// save game files local
function saveGame() {
    localStorage.setItem("playerMoney", playerMoney);
    localStorage.setItem("playerLvl", playerLvl);
    localStorage.setItem("playerXp", playerXp);
    localStorage.setItem("gameCoins", gameCoins);
    localStorage.setItem("gameDifficulty", gameDifficulty);
    alert("Game saved!");
}

// will be called when player presses the button "insert coin"
function insertCoin() {
    if(!gameState) {
        // change gameState to true
        gameState = true;
        // remove game cost
        playerMoney -= gameCoins;
        // save current states in dummy variable
        currentGameCoins = gameCoins;
        currentGameDifficulty = gameDifficulty;
        // update labels
        updateLabels();
        // change to loading icons
        standardSlotdisplay();
        // start animation
        slotContainer.classList.add("animateSlotdisplays");
        updateMessageBox("... waiting!");
    }
}

// xp calculations
function calculateXpPerGame() {
    
    if (gameState) {
        switch(currentGameDifficulty) {
            case 1:
                playerXp += 5;
                break;
            case 2:
                playerXp += 10;
                break;
            case 3:
                playerXp += 15;
                break;
        }
    }

}

// calculate earned coins
function calculateCoins() {

    if (gameState) {
        switch(checkIcons()) {
            case 1:
                calCoins = currentGameCoins * 0;
                break;
            case 2:
                calCoins = currentGameCoins * 1;
                playerXp += 10;
                break;
            case 3:
                calCoins = currentGameCoins * 1.75;
                playerXp += 20;
                break;
            case 4:
                calCoins = currentGameCoins * 2.25;
                playerXp += 30;
                break;
            case 5:
                calCoins = currentGameCoins * 3;
                playerXp += 50;
                break;
            case 6:
                calCoins = currentGameCoins * 4;
                playerXp += 75;
                break;
            default:
                updateMessageBox("Error!");
        }
    
        switch(slotmachine[0].children[0].src) {
            case hostPath + assetsArray[0]:
                calCoins = calCoins * 1;
                break;
            case hostPath + assetsArray[1]:
                calCoins = calCoins * 1.5;
                break;
            case hostPath + assetsArray[2]:
                calCoins = calCoins * 2;
                break;
            case hostPath + assetsArray[3]:
                calCoins = calCoins * 2.5;
                break;
            case hostPath + assetsArray[4]:
                calCoins = calCoins * 3.75;
                break;
            default:
                updateMessageBox("Error!");
        }
    
        if (calCoins > 0 ) {
            playerMoney = playerMoney + calCoins;
            updateMessageBox("You won!  <span>+" + calCoins.toFixed(2) + "$</span>");
            checkPlayerMoney();
            won();
        } else {
            updateMessageBox("You lose!");
        }

        // calculated xp
        calculateXpPerGame();

        // update labels
        updateLabels();
    
        // change gameState to false
        gameState = false;
    }
}

// check for the same icons - if > 0 - highlight slot display and retuen value
function checkIcons() {
    let iconsInARow = 0;
    let firstIcon;

    for (i = 0; i < slotmachine.length; i++) {
        if (i == 0) {
            iconsInARow++;
            firstIcon = slotmachine[0].children[0];
        } else if (i > 0) {
            if (slotmachine[i].children[0].src == firstIcon.src) {
                iconsInARow++;
                slotmachine[0].style.background = "#ffc000";
                slotmachine[i].style.background = "#ffc000";
            } else {
                return iconsInARow;
            }
        }
    }

    return iconsInARow;
}

// player won
function won() {
    // add animation class
    slotContainer.classList.add("winAnimation");

    // remove animationclass after .5s
    setTimeout(function() {
        slotContainer.classList.remove("winAnimation");
    }, 500);
}