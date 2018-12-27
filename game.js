var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); // create random number between 0 - 3
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if(gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {

    console.log("matches.");
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }

  } else {
    playAudio('wrong');

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press 'a' Key to Restart.")
    console.log("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

$(document).keypress(function(e) {
  if(e.key === "a" && level === 0) {
    nextSequence();
  }
});

$(".btn").click(function(e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playAudio(userChosenColor);
  animationPress(userChosenColor);
  checkAnswer(userChosenColor);
});

function playAudio(soundFile) {
  var sound = new Audio("sounds/"+ soundFile +".mp3");
  sound.play();
}

function animationPress(currentColor) {
  var self = $("#" + currentColor);

  self.addClass("pressed");
  setTimeout(function() {
    self.removeClass("pressed");
  }, 100);
}
