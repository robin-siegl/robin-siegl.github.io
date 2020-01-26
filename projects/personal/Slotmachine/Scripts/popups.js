// CUSTOM POPUP WINDOWS
//----------------------
// Every Popup gets an id - Example: prompt1 or alert1 etc.
// With this id you can excplicity target this popup and the call to action buttons
// You can look into the Exapmlecode below
//----------------------
// showAlert( ID , HEADLINE , MESSAGE ) will show the alert popup with custom id, headline, message.
// showPrompt( ID , HEADLINE , MESSAGE ) will show the prompt popup with custom id, headline, message.
// showConfirm( ID , HEADLINE , MESSAGE ) will show the confirm popup with custom id, headline, message.
//----------------------

let popupViewController = document.getElementById("popupViewController");

function showAlert(id, headline, message) {
    let alertPopupTemplate =    `<div id="alert` + id + `">
                                    <div class="alertPopup">
                                        <div>
                                            <h1>` + headline + `</h1>
                                            <p>` + message + `</p>
                                        </div>
                                        <form action="javascript:void(0);">
                                            <input type="button" value="Close">
                                        </form>
                                    </div>
                                </div>`;
    popupViewController.innerHTML = alertPopupTemplate;
}

function showPrompt(id, headline, message) {
    let promptPopupTemplate =   `<div id="prompt` + id + `">
                                    <div class="promptPopup">
                                        <div>
                                            <h1>` + headline + `</h1>
                                            <p>` + message + `</p>
                                        </div>
                                        <form action="javascript:void(0);">
                                            <input type="text" name="name" placeholder="Enter Name">
                                            <input type="button" value="Close">
                                            <input type="button" value="OK">
                                        </form>
                                    </div>
                                </div>`;
    popupViewController.innerHTML = promptPopupTemplate;
}

function showConfirm(id, headline, message) {
    let confirmPopupTemplate =   `<div id="confirm` + id + `">
                                    <div class="confirmPopup">
                                        <div>
                                            <h1>` + headline + `</h1>
                                            <p>` + message + `</p>
                                        </div>
                                        <form action="javascript:void(0);">
                                            <input type="button" value="Abort">
                                            <input type="button" value="OK">
                                        </form>
                                    </div>
                                </div>`;
    popupViewController.innerHTML = confirmPopupTemplate;
}

function hideAlert() {
    popupViewController.innerHTML = "";
}

function hidePrompt() {
    popupViewController.innerHTML = "";
}

function hideConfirm() {
    popupViewController.innerHTML = "";
}

// Exapmle Code
popupViewController.addEventListener("click", function(e){

    // ALERT POPUP - Close
    if (e.target.parentElement.parentElement.parentElement.id == "alert1" && e.target.value == "Close") {
        hideAlert();
    }

    // PROMPT POPUP - Close
    if (e.target.parentElement.parentElement.parentElement.id == "prompt1" && e.target.value == "Close") {
        addNewHighscore(true);
        hidePrompt();
    }

    // PROMPT POPUP - OK
    if (e.target.parentElement.parentElement.parentElement.id == "prompt1" && e.target.value == "OK") {
        addNewHighscore(false);
        hidePrompt();
    }

    // CONFIRM POPUP - Abort
    if (e.target.parentElement.parentElement.parentElement.id == "confirm1" && e.target.value == "Abort") {
        hideConfirm();
    }

    // CONFIRM POPUP - OK
    if (e.target.parentElement.parentElement.parentElement.id == "confirm1" && e.target.value == "OK") {
        hideConfirm();
        localStorage.setItem("highscore", "");
        window.location.reload();
    }

})