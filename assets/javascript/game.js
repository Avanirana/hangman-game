var selectableWords =
  // Word list
  [
    "chrome",
    "firefox",
    "codepen", 
    "javascript", 
    "jquery", 
    "twitter", 
    "github", 
    "wordpress", 
    "opera",
    "layout", 
    "standards", 
    "semantic",
    "designer", 
    "developer", 
    "module", 
    "component",
    "website", 
    "creative",
    "banner", 
    "browser", 
    "screen",
    "mobile", 
    "footer", 
    "header",
    "typography", 
    "responsive", "programmer", "css", "border", "compass", "grunt", "pixel", "document", "object", "ruby"
  ];

const maxTries = 10; 
var guessedLetters = []; 
var currentWordIndex; 
var guessingWord = []; 
var remainingGuesses = 0;
var wins = 0;
var losses = 0;
var gameStarted = false; 
var hasFinished = false; 


// Reset our game-level variables
function resetGame() {
  remainingGuesses = maxTries;
  gameStarted = false;

  // Use Math.floor to round the random number down to the nearest whole.
  currentWordIndex = Math.floor(Math.random() * selectableWords.length);

  // Clear out arrays
  guessedLetters = [];
  guessingWord = [];

  // Build the guessing word and clear it out
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
    guessingWord.push("_");
  }
  
  // Show display
  updateDisplay();
}
//  Updates the display on the HTML Page
function updateDisplay() {
  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = "";
  for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("totallosses").innerText = losses;
  document.getElementById("currentWord").innerText = "";
  for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
  }
  document.getElementById("remainingGuesses").innerText = remainingGuesses;
  document.getElementById("guessedLetters").innerText = guessedLetters;
  if (remainingGuesses <= 0) {
    hasFinished = true;
  }
}

document.onkeydown = function(event) {
  // If we finished a game, dump one keystroke and reset.
  if (hasFinished) {
    resetGame();
    hasFinished = false;
  } else {
    // Check to make sure a-z was pressed.
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      makeGuess(event.key.toLowerCase());
    }
  }
};
function makeGuess(letter) {
  if (remainingGuesses > 0) {
    if (!gameStarted) {
      gameStarted = true;
    }
    // Make sure we didn't use this letter yet
    if (guessedLetters.indexOf(letter) === -1) {
      guessedLetters.push(letter);
      evaluateGuess(letter);
    } 
  }
  updateDisplay();
  checkWin();
  checklosses();

}


// This function takes a letter and finds all instances of
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
  // Array to store positions of letters in string
  var positions = [];

  // Loop through word finding all instances of guessed letter, store the indicies in an array.
  for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
    if (selectableWords[currentWordIndex][i] === letter) {
      positions.push(i);
    }
  }

  // if there are no indicies, remove a guess 
  if (positions.length <= 0) {
    remainingGuesses--;
  } else {
    // Loop through all the indicies and replace the '_' with a letter.
    for (var i = 0; i < positions.length; i++) {
      guessingWord[positions[i]] = letter;
    }
  }
}
function checkWin() {
  if (guessingWord.indexOf("_") === -1) {
    wins++;
    hasFinished = true;
  }
}
function checklosses() {
  if (remainingGuesses === 0) {
    losses++;
    hasFinished = true;
 }
 
}
console.log(losses);