// get HTML elements
var elementTitle = document.getElementById("title");				// HTML Element for Title
var elementQuestion = document.getElementById("question");			// HTML Element for Question
var elementOptionA = document.getElementById("optionA");			// HTML Element for Option A
var elementOptionB = document.getElementById("optionB");			// HTML Element for Option B
var elementOptionC = document.getElementById("optionC");			// HTML Element for Option C
var elementOptionD = document.getElementById("optionD");			// HTML Element for Option D
var elementAnswers = document.getElementById("answers-container");	// HTML Element for answers and question conatiner
var elementStart = document.getElementById("start-container");		// HTML Element for start box container
var elementInfo = document.getElementById("info-container");		// HTML Element for info box container
var currentIndex = 0;	// Stores current questions index
var score = 0;			// Save score
var tempArray = [];		// temp array to store answers random


// TEMP QUESTIONS AND ANSWERS ARRAY
var dataQuestionsAnswers = [["Which large fruit is carved to make Jack-o-lanterns?", "Apple", "Banana", "Blueberries", "Pumpkins"],
							["Which two colors are traditionally associated with Halloween?", "Blue and Pink", "Green and Red", "Yellow and Black", "Orange and Black"],
							[" In which country did Halloween originate?", "Germany", "Italy", "Slovenia", "Ireland"],
							["What color are aircraft black boxes?", "Black", "Lightblue", "Camouflage", "Bright orange"],
							["Which country was the Caesar salad invented in?", "Italy", "Russia", "Sweden", "Mexico"]];


// Shuffel answers
function shuffelArray(array, answerID) {
	// Create variables
	var shuffeldAnswers = [];
	var currentAnswers = [];

	for (var i = 0; i < dataQuestionsAnswers[answerID].length; i++) {
		// Add item to array
		currentAnswers.push(dataQuestionsAnswers[answerID][i]);
	}

	var currentAnswersIndex = currentAnswers.length - 1;

	while (shuffeldAnswers.length < currentAnswersIndex) {
		var randomArrayIndex = Math.floor(Math.random() * (currentAnswers.length - 1) + 1);
		shuffeldAnswers.push(currentAnswers[randomArrayIndex]);
		currentAnswers.splice(randomArrayIndex, 1);
	}
	
	return shuffeldAnswers;
}

// Set question
function getQuestion(questionID) {
	var currentQuestion = dataQuestionsAnswers[questionID][0];
	elementQuestion.innerHTML = currentQuestion;

	// Set Titlename
	elementTitle.textContent = "Question " + (currentIndex + 1) + " of " + dataQuestionsAnswers.length;
}

// Set answers
function getAnswers(answerID) {
	tempArray = shuffelArray(dataQuestionsAnswers, answerID);

	elementOptionA.innerHTML = tempArray[0];
	elementOptionB.innerHTML = tempArray[1];
	elementOptionC.innerHTML = tempArray[2];
	elementOptionD.innerHTML = tempArray[3];
}

function checkIfCorrect(answerID, currentAnswer) {
	var correctAnswer = dataQuestionsAnswers[answerID][4];
	elementAnswers.classList.add("display-none");
	elementInfo.classList.remove("display-none");
	if (currentIndex === (dataQuestionsAnswers.length - 1)) {
		if (tempArray[currentAnswer] === correctAnswer) {
			score += 10;
			currentIndex += 1;
			elementInfo.innerHTML = "<h2>Correct Answer!</h2><p><strong>Current Score:</strong> " + score + "</p><div id='next' onclick='endGame()''>END</div>";
			elementInfo.style.backgroundColor = "#aed581";
		} else {
			currentIndex += 1;
			elementInfo.innerHTML = "<h2>Wrong Answer!</h2><p><strong>Current Score:</strong> " + score + "</p><div id='next' onclick='endGame()''>END</div>";
			elementInfo.style.backgroundColor = "#e57373";
		}
	} else {
		if (tempArray[currentAnswer] === correctAnswer) {
			score += 10;
			currentIndex += 1;
			elementInfo.innerHTML = "<h2>Correct Answer!</h2><p><strong>Current Score:</strong> " + score + "</p><div id='next' onclick='nextQuestion()''>NEXT</div>";
			elementInfo.style.backgroundColor = "#aed581";
		} else {
			currentIndex += 1;
			elementInfo.innerHTML = "<h2>Wrong Answer!</h2><p><strong>Current Score:</strong> " + score + "</p><div id='next' onclick='nextQuestion()''>NEXT</div>";
			elementInfo.style.backgroundColor = "#e57373";
		}
	}
	
}

// Initial Setup
function initialSetup() {
	// Display Questions and Answers Container and hide Info Container
	elementAnswers.classList.remove("display-none");
	elementStart.classList.add("display-none");

	// Call functions
	getQuestion(currentIndex);
	getAnswers(currentIndex);
}
function nextQuestion() {
	// Display Questions and Answers Container and hide Info Container
	elementAnswers.classList.remove("display-none");
	elementInfo.classList.add("display-none");

	// Call functions
	getQuestion(currentIndex);
	getAnswers(currentIndex);
}
function endGame() {
	// Display Questions and Answers Container and hide Info Container
	elementAnswers.classList.add("display-none");
	elementInfo.classList.remove("display-none");

	elementInfo.innerHTML = "<h2>Finished!</h2><p>You scored <strong> " + score + "</strong> from " + (dataQuestionsAnswers.length * 10) + " points!</p>";
	elementInfo.style.backgroundColor = "#fafafa";
}


function optionA() {
	console.log("Option A");
	checkIfCorrect(currentIndex,0);
}
function optionB() {
	console.log("Option B");
	checkIfCorrect(currentIndex,1);
}
function optionC() {
	console.log("Option C");
	checkIfCorrect(currentIndex,2);
}
function optionD() {
	console.log("Option D");
	checkIfCorrect(currentIndex,3);
}