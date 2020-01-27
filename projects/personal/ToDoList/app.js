let itemContainer = document.getElementById("item-container");
let formContainer = document.getElementsByTagName("form")[0];
let listTitle = document.getElementById("list-title");
let cleanListButton = document.getElementById("clean-list");
let contentContainer = document.getElementById("container");
let messageBoxContainer = document.getElementById("messageBox-container");
let userLists = [[1, "Tasks"]];
let standardList = [["Milk", ""], ["Bread", "done"], ["Water", ""], ["Tea", ""]];

loadListPreviousList();

// enable active state on mobile browser
document.addEventListener("touchstart", function() {}, false);

// check for a prev list and load it
function loadListPreviousList() {
    let loadedList = JSON.parse(localStorage.getItem("toDo-list" + userLists[0][0]));
    let infoMessage = "List loaded!";

    if (loadedList == null) {
        loadedList = standardList;
        infoMessage = "Welcome User!"
    }

    listTitle.innerText = userLists[0][1];
    
    for (i = 0; i < loadedList.length; i++) {
        let listItems = itemContainer.children;
        let newItem = document.createElement("li");
        newItem.innerText = loadedList[i][0];

        if (loadedList[i][1].length > 0) {
            newItem.classList.add(loadedList[i][1]);
        }

        itemContainer.insertBefore(newItem, listItems[listItems.length-1]);
        
    }

    showMessage(infoMessage);

    setTimeout(function() {
        hideMessage();
    }, 3000);
}

// hide popup message
function hideMessage() {
    if(messageBoxContainer.children.length > 0) {
        messageBoxContainer.children[0].classList.add("hideBox");

        setTimeout(function() {
            messageBoxContainer.removeChild(document.getElementsByClassName("messageBox")[0]);
        }, 200);
    }
    
}

// show popup message
function showMessage(message) {
    // Only display 1 messagebox -> remove other message boxes
    if (messageBoxContainer.children.length > 0) {
        hideMessage();
    }

    // create new message box after waiting .2 seconds
    setTimeout(function() {
        let messageBox = document.createElement("div");
        messageBox.innerHTML = "<p>" + message + "</p>";
        messageBox.classList.add("messageBox");
        messageBoxContainer.appendChild(messageBox);
    },200);

}

// save list
function saveList() {
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

    localStorage.setItem("toDo-list" + userLists[0][0], JSON.stringify(dummyArray));
}

formContainer.addEventListener("submit", function(event) {

    // prevent default behavior
    event.preventDefault();

    // get content from inputfield
    let listInput = formContainer.children[0].value;

    // Only create new Listitem when the value attribute is not empty
    if (listInput.length > 0) {
        let listItems = itemContainer.children;
        let newItem = document.createElement("li");
        newItem.innerText = listInput;
        itemContainer.insertBefore(newItem, listItems[listItems.length - 1]);
        formContainer.children[0].value = "";
        saveList();
    }

})

// content container eventlistener
contentContainer.addEventListener("click", function(event) {

    // add or remove "done" mark
    if (event.target.localName == "li" && !event.target.classList.contains("input-item")) {
        if (event.target.classList.contains("done")) {
            event.target.classList.remove("done");
        } else {
            event.target.classList.add("done");
        }
        saveList();
    }
});

// clean list eventlistener
cleanListButton.addEventListener("click", function(event) {
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
    saveList();

    // "Item" and "Items" checker
    if (counter == 1) {
        showMessage("Deleted " + counter + " Item!");
    } else {
        showMessage("Deleted " + counter + " Items!");
    }
    
    setTimeout(function() {
        hideMessage();
    }, 3000);
});