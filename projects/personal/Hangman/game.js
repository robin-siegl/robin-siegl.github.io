let wordsArray = [  ["Tree", "Pig", "Cow", "Door", "Cat", "Dog", "Key", "Deep", "Day", "Pond", "Book", "Dust", "Hide", "Sand", "Dirt"],
                    ["Picture", "Movie", "Apple", "Clock", "Animal", "Night", "Pixel", "Banjo", "Jogging", "Wave", "Hole", "Fishing", "Funny", "Staff", "Spring"],
                    ["Blizzard", "Beekeeper", "Awkward", "Oxygen", "Restaurant", "Hangman", "Ridiculous", "Microwave", "Keyhole", "Injury", "Quartz", "Puzzling", "Stretch", "Luxury", "Voodoo"]];
let charsArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let charOutputContainer = document.getElementById("game-container").children[1];
let charListContainer = document.getElementById("game-container").children[2];
let svgContainer = document.getElementsByTagName("svg")[0];
let GBL_randomWord;
let GBL_gameState = false;
let GBL_wrongTurn = false;
let GBL_wrongTurns;
let GBL_difficulty = 0;
let templateSvgArray = ['<g transform="matrix(0.617902,0,0,0.00968994,-266.738,58.0413)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(53,63,64);"/></g>',
                        '<g transform="matrix(0.12358,0,0,0.121124,-37.3785,-10.4836)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(53,63,64);"/></g>',
                        '<g transform="matrix(1.2358,0,0,0.00484497,-541.917,-0.419344)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(53,63,64);"/></g>',
                        '<g transform="matrix(0.0873846,0.0873846,-0.0171296,0.0171296,-10.4254,-41.1229)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(53,63,64);"/></g>',
                        '<g transform="matrix(0.12358,0,0,0.0242248,-14.3385,-2.09672)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(53,63,64);"/></g>',
                        '<g transform="matrix(0.0873846,-0.0873846,0.0171296,0.0171296,-7.70273,39.9679)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(53,63,64);"/></g>',
                        '<g transform="matrix(0.115878,0,0,0.119395,-42.6213,-34.5257)"><ellipse cx="738.903" cy="396.378" rx="27.615" ry="26.802" style="fill:rgb(35,37,38);"/></g>',
                        '<g transform="matrix(0.0617902,0,0,0.0363373,14.3314,9.65492)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(35,37,38);"/></g>',
                        '<g transform="matrix(0.0436923,-0.0436923,0.0128472,0.0128472,21.8132,35.4853)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(35,37,38);"/></g>',
                        '<g transform="matrix(0.0436923,0.0436923,-0.0128472,0.0128472,23.644,-5.06011)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(35,37,38);"/></g>',
                        '<g transform="matrix(0.056001,-0.0261137,0.0102379,0.0219552,16.0715,41.9099)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(35,37,38);"/></g>',
                        '<g transform="matrix(0.056001,0.0261137,-0.0102379,0.0219552,17.8437,17.962)"><rect x="453.631" y="86.553" width="20.715" height="528.383" style="fill:rgb(35,37,38);"/></g>'];
let popupContainer = document.getElementById("popup-container");

// enable mobile active states
document.addEventListener("touchstart", function(){}, false);

function initCharOutput(word) {
    for (i = 0; i < word.length; i++) {
        let newCharBlock = document.createElement("div");
        newCharBlock.innerHTML = "<p></p>";

        // display only first
        if (i == 0) {
            newCharBlock.children[0].innerText = word.substring(0,1);
        }

        charOutputContainer.appendChild(newCharBlock);
    }
}

function initRandomCharList(word, quantity) {
    let charListArray = [];

    for (i = 0; i < quantity; i++) {
        if (i < word.length - 1) {
            charListArray.push(word.substring(i + 1, i + 2).toUpperCase());
        } else {
            charListArray.push(charsArray[Math.floor(Math.random() * charsArray.length)]);
        }
    }

    charListArray.sort();

    for (j = 0; j < charListArray.length; j++) {
        let newCharBlock = document.createElement("div");
        newCharBlock.innerHTML = "<p></p>";
        newCharBlock.children[0].innerText = charListArray[j];
        charListContainer.appendChild(newCharBlock);
    }
}

function initAlphabeticalCharList() {

    for (i = 0; i < charsArray.length; i++) {
        let newCharBlock = document.createElement("div");
        newCharBlock.innerHTML = "<p></p>";
        newCharBlock.children[0].innerText = charsArray[i];
        charListContainer.appendChild(newCharBlock);
    }

}

function checkChar(word, char) {
    let charFound = false;

    for (i = 0; i < word.length; i++) {
        if (word.substring(i + 1, i + 2).toUpperCase() == char.toUpperCase()) {
            charOutputContainer.children[i + 1].children[0].innerText = char.toUpperCase();
            charOutputContainer.children[i + 1].classList.add("charFound");
            charFound = true;
        }
    }
    for (j = 0; j < charListContainer.children.length; j++) {
        if (charListContainer.children[j].children[0].innerText.toUpperCase() == char.toUpperCase()) {
            charListContainer.children[j].classList.add("pressed");
        }
    }

    if (!charFound) {
        GBL_wrongTurn = true;
        GBL_wrongTurns++;
    }

}

function checkWrongTurn() {

    if (GBL_wrongTurns == 1 && GBL_wrongTurn) {
        svgContainer.innerHTML += templateSvgArray[GBL_wrongTurns - 1];
    } else if (GBL_wrongTurn) {
        svgContainer.innerHTML += templateSvgArray[GBL_wrongTurns - 1];
    }

    GBL_wrongTurn = false;

}

function resetSVG() {
    
    for (i = 0; i < svgContainer.children.length; i++) {
        if (i >= 12) {
            svgContainer.removeChild(svgContainer.children[i]);
            i = 11;
        }
    }

}

function gamePopup(state) {

    switch(state.toUpperCase()) {
        case "REMOVE":
            popupContainer.classList.add("displayNone");
            popupContainer.classList.remove("lose");
            popupContainer.classList.remove("win");
            break;
        case "LOSE":
            popupContainer.classList.remove("displayNone");
            popupContainer.classList.add("lose");
            popupContainer.children[0].innerText = "You Lost!";
            break;
        case "WIN":
            popupContainer.classList.remove("displayNone");
            popupContainer.classList.add("win");
            popupContainer.children[0].innerText = "You Won!";
            break;
        default:
            console.log("Error! Gamestate not found!");
    }

}

function checkWin(word) {
    let counter = 0;

    for (i = 0; i < word.length; i++) {
        if (word.substring(i, i + 1).toUpperCase() == charOutputContainer.children[i].children[0].innerText.toUpperCase()) {
            counter++
        }
    }

    if (counter == word.length) {
        charOutputContainer.classList.add("foundWord");
        GBL_gameState = false;
        setTimeout(function() {gamePopup("win")},3000);
    }
}

function checkLose() {

    if (svgContainer.children.length >= templateSvgArray.length * 2) {
        charOutputContainer.classList.add("didntFoundWord");
        GBL_gameState = false;
        setTimeout(function() {gamePopup("lose")},3000);
    }

}

function initGame(difficulty) {
    GBL_difficulty = difficulty;
    GBL_gameState = true;
    GBL_wrongTurns = 0;
    GBL_randomWord = wordsArray[difficulty - 1][Math.floor(Math.random() * wordsArray[difficulty - 1].length)];

    charOutputContainer.innerHTML = "";
    charListContainer.innerHTML = "";
    charOutputContainer.classList.remove("foundWord");
    charOutputContainer.classList.remove("didntFoundWord");
    resetSVG();
    gamePopup("remove");
    initCharOutput(GBL_randomWord);
    initAlphabeticalCharList();
    // initRandomCharList(GBL_randomWord, 24 * difficulty);
}

charListContainer.addEventListener("click", function(event) {

    // check if clicked element is P -> Paragraph HTML Element
    if (event.target.localName.toUpperCase() == "P" && GBL_gameState && !event.target.parentElement.classList.contains("pressed")) {
        checkChar(GBL_randomWord, event.target.innerText);
        checkWin(GBL_randomWord);
        checkWrongTurn();
        checkLose();
    }

});

popupContainer.addEventListener("click", function(event) {
    
    // Show new word
    if (event.target.localName.toUpperCase() == "P" && event.target.innerText.toUpperCase() == "NEW WORD") {
        initGame(GBL_difficulty);
    }

    // Change difficulty popup
    if (event.target.localName.toUpperCase() == "P" && event.target.innerText.toUpperCase() == "CHANGE DIFFICULTY") {
        event.target.parentElement.parentElement.parentElement.children[1].classList.add("displayNone");
        event.target.parentElement.parentElement.classList.add("displayNone");
        controlsContainer.children[1].classList.remove("displayNone");
    }
});