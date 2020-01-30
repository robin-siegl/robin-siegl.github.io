let controlsContainer = document.getElementById("controls-container");

controlsContainer.addEventListener("click", function(event) {
    
    // Start new game Button
    if (event.target.localName.toUpperCase() == "P" && event.target.innerText.toUpperCase() == "NEW GAME") {
        event.target.parentElement.parentElement.classList.add("displayNone");
        controlsContainer.children[1].classList.remove("displayNone");
    }

    // Difficulty Buttons
    if (event.target.localName.toUpperCase() == "P" && event.target.parentElement.classList.contains("difficulty")) {
        switch(event.target.innerText.toUpperCase()) {
            case "EASY":
                initGame(1);
                break;
            case "MEDIUM":
                initGame(2);
                break;
            case "HARD":
                initGame(3);
                break;
            default:
                console.log("Error! Couldn't start game!");
        }

        controlsContainer.children[1].classList.add("displayNone");
        controlsContainer.parentElement.children[1].classList.remove("displayNone");
    }
});