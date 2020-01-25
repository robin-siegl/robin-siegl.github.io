const popupView = document.getElementById("popupView");
const alertPopup = document.getElementsByClassName("alertPopup")[0];
const confirmPopup = document.getElementsByClassName("confirmPopup")[0];
const promptPopup = document.getElementsByClassName("promptPopup")[0];

function showAlert(headline,message) {
    alertPopup.children[0].children[0].innerHTML = headline;
    alertPopup.children[0].children[1].innerHTML = message;
    popupView.classList.add("show");
    alertPopup.classList.add("show");
}
function showConfirm(headline,message) {
    confirmPopup.children[0].children[0].innerHTML = headline;
    confirmPopup.children[0].children[1].innerHTML = message;
    popupView.classList.add("show");
    confirmPopup.classList.add("show");
}
function showPrompt(headline,message) {
    promptPopup.children[0].children[0].innerHTML = headline;
    promptPopup.children[0].children[1].innerHTML = message;
    popupView.classList.add("show");
    promptPopup.classList.add("show");
}
function hideAlert() {
    popupView.classList.remove("show");
    alertPopup.classList.remove("show");
}
function hideConfirm() {
    popupView.classList.remove("show");
    confirmPopup.classList.remove("show");
}
function hidePrompt() {
    popupView.classList.remove("show");
    promptPopup.classList.remove("show");
}

// Default Code

alertPopup.children[1].addEventListener("click", function() {
    hideAlert();
});
confirmPopup.children[1].addEventListener("click", function() {
    hideConfirm();
});
confirmPopup.children[2].addEventListener("click", function() {
    hideConfirm();
    localStorage.setItem("highscore", "");
    window.location.reload();
});
promptPopup.children[1].addEventListener("click", function() {
    hidePrompt();
    addNewHighscore(true);
});
promptPopup.children[2].addEventListener("click", function() {
    hidePrompt();
    addNewHighscore(false);
});