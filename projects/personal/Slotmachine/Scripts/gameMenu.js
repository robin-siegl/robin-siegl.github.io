let buttons = document.getElementById("gameMenu").children;     // 0 New Game - 1 Load Game - 2 Help - 3 Version

// start new game
buttons[0].addEventListener("click", function(){
    document.getElementsByTagName("main")[0].children[0].classList.add("gameStarted");
    newGame();
});

// load existing game if there is no save game > start a new
buttons[1].addEventListener("click", function(){
    document.getElementsByTagName("main")[0].children[0].classList.add("gameStarted");
    loadGame();
});

// open help page
buttons[2].addEventListener("click", function(){
    window.open("help.html", '_blank');
});