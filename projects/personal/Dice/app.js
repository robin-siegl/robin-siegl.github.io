// set variables
var lastUsed = 0; // last used template
var loadingAnimationID = 7;
var button = document.getElementById("btn-roleDice");
var diceArray = ["Logo", "One", "Two", "Three", "Four", "Five", "Six", "loadinganimation"]; // array with dice templates content

function switchClasses(objectID, reversedClassSwitch) {
  
  if (reversedClassSwitch === true) {
    // remove class display-block and add class display-none to add the css
    document.getElementById(diceArray[objectID].toLowerCase()).classList.remove("display-block");
    document.getElementById(diceArray[objectID].toLowerCase()).classList.add("display-none");
  } else {
    // remove class display-none and add class display-block to add the css
    document.getElementById(diceArray[objectID].toLowerCase()).classList.remove("display-none");
    document.getElementById(diceArray[objectID].toLowerCase()).classList.add("display-block");
  }
  
}

// role dice function
function roleDice() {
  // Create variables
  var randomNumber = Math.random() * 6; // get random numbers from 0 to 6
  var randomNumberRoundToInt = parseInt(Math.floor(randomNumber) + 1); // round down and parse to int
  
  // set prev template to none
  if (lastUsed != null) {
    switchClasses(lastUsed, true);
  }

  // add loading animation
  switchClasses(loadingAnimationID, false);
  
  // disable the role dice button
  button.disabled = true;

  // wait 3 seconds and go on
  setTimeout(function(){ 
    // remove loading animation
    switchClasses(loadingAnimationID, true);
  
    // remove class display-none and add class display-block to add the css
    lastUsed = randomNumberRoundToInt;
    switchClasses(randomNumberRoundToInt, false);
  
    // disable the role dice button
    button.disabled = false;

  }, 2000);
  
}
