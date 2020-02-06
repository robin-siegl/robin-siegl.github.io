let endDate = new Date(2020,1,6,0,0,0);
let outputContainer = document.getElementById("countdownOutput");

function calculateTimeRemaining(start, end) {
    let timeRemaining = end - start;
    return timeRemaining;
}

function defineTimeArray(timeRemaining) {
    let timeArray = [];
    timeArray.push(Math.floor((timeRemaining / 1000) % 60));
    timeArray.push(Math.floor((timeRemaining / (1000 * 60)) % 60));
    timeArray.push(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
    timeArray.push(Math.floor((timeRemaining / (1000 * 60 * 60 * 24)) % 7));

    return timeArray;
}

function outputTimeRemaining(timeArray) {
    outputContainer.children[1].children[1].innerText = timeArray[3];
    outputContainer.children[2].children[1].innerText = timeArray[2];
    outputContainer.children[3].children[1].innerText = timeArray[1];
    outputContainer.children[4].children[1].innerText = timeArray[0];
}

let countdown = setInterval(function() {
    let timeRemaining = calculateTimeRemaining(new Date(), endDate);
    let timeArray = defineTimeArray(timeRemaining);
    outputTimeRemaining(timeArray);

    if (timeRemaining <= 0) {
        clearInterval(countdown);
        endAnimation();
    }
}, 1000);

function endAnimation() {
    while (outputContainer.children.length > 0) {
        outputContainer.removeChild(outputContainer.children[0]);
    }
    let headline = document.createElement("h1");
    headline.innerHTML = " Happy <wbr>Birthday!";
    headline.classList.add("countdownEnd");
    outputContainer.appendChild(headline);
}