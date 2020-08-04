let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
//keep track of if the game has started
let gameStarted = false;
let level = 0;
//this is how we start the game and start displaying the current level
$(document).keypress(function () {
  if (gameStarted == false) {
    $("#level-title").text(`level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

//to randomly generate a color and add it to the array to remember
function nextSequence() {
  level++;
  $("#level-title").text(`level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //using jQuery to select the button with same id as the randomChosenColor and make it flash
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playing the sound for the rand color
  playSound(randomChosenColor);
  //increase the current level
}
//to listen for button clicks from user and store them in array that will be compared to the randomly generated array
$(".btn").click(function () {
  //when any button with the class btn is clicked it runs this function (a handler function with is anonymous and i made it to store the id of the button clicked)
  //using the THIS property to mean the thing that got clicked.
  let userChosenColor = $(this).attr("id");
  //then we push it to our array that we will compare to the games generated array.
  userClickedPattern.push(userChosenColor);
  //play sound for that color
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //after each click we pass in the index of the most recent click.  it gets reset once the pattern is matched
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

//this function take color name and plays the corresponding sound
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}
//this checks to see if the patterns match. if wrong it ends the game. if the sequence is finished it starts the next level
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  if (currentLevel == gamePattern.length - 1) {
    setTimeout(nextSequence(), 1000);
    userClickedPattern = [];
  }
}
//reset evereything once game over
function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = false;
}
