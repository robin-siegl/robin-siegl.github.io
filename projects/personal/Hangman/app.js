let wordsArray = [["Hello", "World", "Tree", "Apple", "Clock"]];
let charsArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let charOutputContainer = document.getElementById("game-container").children[1];
let charListContainer = document.getElementById("game-container").children[2];
let svgContainer = document.getElementsByTagName("svg")[0];
let GBL_randomWord;
let GBL_gameState = false;
let GBL_wrongTurn = false;
let GBL_wrongTurns = 0;
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
    }
}

function checkLose() {

    if (svgContainer.children.length >= templateSvgArray.length * 2) {
        charOutputContainer.classList.add("didntFoundWord");
        GBL_gameState = false;
    }

}

function initGame(difficulty) {
    GBL_gameState = true;
    GBL_randomWord = wordsArray[difficulty - 1][Math.floor(Math.random() * wordsArray[difficulty - 1].length)];

    initCharOutput(GBL_randomWord);
    initAlphabeticalCharList();
    // initRandomCharList(GBL_randomWord, 24 * difficulty);
}


initGame(1);


charListContainer.addEventListener("click", function(event) {

    if (event.target.localName.toUpperCase() == "P" && GBL_gameState) {
        checkChar(GBL_randomWord, event.target.innerText);
        checkWin(GBL_randomWord);
        checkWrongTurn();
        checkLose();
    }

});