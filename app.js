// GAME FUNCTION:
// Player must guess a number between min and max
// Player gets a certain amount of guesses
// Notify player of guesses remaining
// Notify the player of the correct number if lose
// Let player choose to play again

// Game values

let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

// UI Elements
const UIgame = document.querySelector('.game'),
  UIminNum = document.querySelector('.min-num'),
  UImaxNum = document.querySelector('.max-num'),
  UIguessBtn = document.querySelector('#guess-btn'),
  UIguessInput = document.querySelector('#guess-input'),
  UImessage = document.querySelector('.message');


// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

// Listen for guess
UIguessBtn.addEventListener('click', function () {
  let guess = parseInt(UIguessInput.value);
  console.log(guess);

  // Validate guess
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }
  // Game over - Won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, you win`)
  } else {
    // Wrong number
    guessesLeft -= 1;
    setMessage(`${guess} is the wrong answer, you have ${guessesLeft} lives remaining`, 'red')
    UIguessInput.style.borderColor = 'red';
    // Game Over - Lost
    if (guessesLeft === 0) {
      gameOver(false, `${guess} is the wrong number.  The correct number was ${winningNum}, you are out of lives.`)
    } else {
      // Game continues - answer wrong
      // Clear the input
      UIguessInput.value = '';
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  UIguessInput.disabled = true;
  // Change border color
  UIguessInput.style.borderColor = color;
  // Set text color 
  UImessage.style.color = color;
  setMessage(msg);

  // Play again?
  UIguessBtn.value = "Play again?";
  UIguessBtn.className += 'play-again';

}

// Get winning Number
function getWinningNum(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
}

// Message sender
function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}