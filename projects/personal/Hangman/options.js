let formContainer = optionsContainer.children[1];
let optionsArray;
let GBL_showGraphicsOption;

function updateOptions() {

    optionsArray = [localStorage.getItem("showGraphic")];

    if (optionsArray[0] == "enabled" || optionsArray[0] == null) {
        formContainer.children[0].checked = true;
        console.log("Enabled");
    } else if (optionsArray[0] == "disabled") {
        formContainer.children[0].checked = false;
        console.log("Disabled");
    }

    GBL_showGraphicsOption = formContainer.children[0].checked;
}

formContainer.children[0].addEventListener("change", function(event) {

    if (event.target.checked) {
        localStorage.setItem("showGraphic", "enabled");
    } else {
        localStorage.setItem("showGraphic", "disabled");
    }

});

optionsContainer.addEventListener("click", function(event) {

    // Hide options
    if (event.target.localName.toUpperCase() == "P" && event.target.innerText.toUpperCase() == "BACK") {
        optionsContainer.classList.add("displayNone");
        controlsContainer.children[0].classList.remove("displayNone");
        updateOptions();
    }

});