let itemContainer = document.getElementById("item-container");
let formContainer = document.getElementsByTagName("form")[0];

loadListPreviousList();

// enable active state on mobile browser
document.addEventListener("touchstart", function() {}, false);

//JSON.parse(localStorage.getItem("highscore"))
//JSON.stringify()
function loadListPreviousList() {
    let loadedList = JSON.parse(localStorage.getItem("toDo-list1"));

    if (loadedList != null) {
        for (i = 0; i < loadedList.length; i++) {
            let listItems = itemContainer.children;
            let newItem = document.createElement("li");
            newItem.innerText = loadedList[i][0];

            if (loadedList[i][1] > 0) {
                newItem.classList.add(loadedList[i][1]);
            }

            itemContainer.insertBefore(newItem, listItems[listItems.length-1]);
            
        }

        showMessage("Previous List loaded!");
    }
}

// hide popup message
function hideMessage() {
    let i = 0;
    while (i < document.getElementsByClassName("messageBox").length) {
        itemContainer.parentElement.removeChild(document.getElementsByClassName("messageBox")[i]);
    }
}

// show popup message
function showMessage(message) {
    // Only display 1 messagebox -> remove other message boxes
    if (document.getElementsByClassName("messageBox").length > 0) {
        hideMessage();
    }

    // create new message box
    let messageBox = document.createElement("div");
    messageBox.innerHTML = "<p>" + message + "</p>";
    messageBox.classList.add("messageBox");
    itemContainer.parentElement.insertBefore(messageBox, itemContainer);

}

formContainer.addEventListener("submit", function(event) {

    // prevent default behavior
    event.preventDefault();

    hideMessage();

    // get content from inputfield
    let listInput = formContainer.children[0].value;

    // Only create new Listitem when the value attribute is not empty
    if (listInput.length > 0) {
        let listItems = itemContainer.children;
        let newItem = document.createElement("li");
        newItem.innerText = listInput;
        itemContainer.insertBefore(newItem, listItems[listItems.length - 1]);
        formContainer.children[0].value = "";
    }

})
itemContainer.addEventListener("click", function(event) {

    if (event.target.localName == "li" && !event.target.classList.contains("input-item")) {
        if (event.target.classList.contains("done")) {
            event.target.classList.remove("done");
        } else {
            event.target.classList.add("done");
        }
    }

});
itemContainer.parentElement.parentElement.addEventListener("click", function(event) {
    // Only display 1 messagebox -> remove other message boxes
    if (event.target.classList == "messageBox") {
        hideMessage();
    }
});
itemContainer.parentElement.children[0].children[1].addEventListener("click", function(event) {
    let dummyArray = new Array();
    let listItems = itemContainer.children;
    let newTask;
    let newTaskStatus;

    for (i = 0; i < listItems.length - 1; i++) {
        if (listItems[i].classList.contains("done")) {
            newTask = listItems[i].innerText;
            newTaskStatus = "done";
        } else {
            newTask = listItems[i].innerText;
            newTaskStatus = "";
        }
        dummyArray.push([newTask, newTaskStatus]);
    }

    localStorage.setItem("toDo-list1", JSON.stringify(dummyArray));

    showMessage("List saved locally!");
});
itemContainer.parentElement.children[0].children[2].addEventListener("click", function(event) {
    let listItems = itemContainer.children;
    let i = 0;
    let counter = 0;
    while (i < listItems.length) {
        if (listItems[i].classList.contains("done")) {
            itemContainer.removeChild(listItems[i]);
            counter++;
        } else {
            i++;
        }
    }

    showMessage("Deleted " + counter + " Items!");
});