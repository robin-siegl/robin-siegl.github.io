let highscoreList = document.getElementsByTagName("table")[0];
let savedHighscoreList = localStorage.getItem("highscore");
let clearHighscoreList = document.getElementsByTagName("tfoot")[0];

function appendEmptyListitem() {
    let highscoreListItem = document.createElement("tr");
    highscoreListItem.innerHTML = "<td>There are no entries!</td>";
    highscoreListItem.children[0].setAttribute("colspan", "3");
    highscoreList.children[1].appendChild(highscoreListItem);
}

if (savedHighscoreList != null) {
    if (savedHighscoreList.length > 0) {
        let highscore = JSON.parse(localStorage.getItem("highscore"));

        // sort by numbers
        function sortSecondCol(a, b) {
            return b[1] - a[1];
        }
        highscore.sort(sortSecondCol);

        // change lvl output
        lvlOutput.innerText = highscore[highscore.length - 1][1];

        // Enable :active on mobile browser
        document.addEventListener("touchstart", function() {}, false );

        // get highscore from local storage
        for (i = 0; i < highscore.length; i++) {

            let highscoreListItem = document.createElement("tr");
            highscoreListItem.innerHTML = "<td>" + (i + 1) + "</td><td>" + highscore[i][0] + "</td><td>" + highscore[i][1] + "</td>";
            highscoreList.children[1].appendChild(highscoreListItem);
                    
        }
    } else {
        appendEmptyListitem();
    }
} else {
    appendEmptyListitem();
}

// clear highscore list
clearHighscoreList.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete the list?")) {
        localStorage.setItem("highscore", "");
        window.location.reload();
    }
});