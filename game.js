var colors = ["red", "blue", "green", "yellow"];
var gameSequence = []; 
var userSequence = []; 
var level = 0; 

var started = false; 

function nextStepSequence() {
 level++;
 $("h1").text("Level " + level);
  userSequence = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gameSequence.push(randomColor);
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
     playSound(randomColor);
}
$(document).keydown(function () {
  if (!started) {
    nextStepSequence();
    started = true;
  }
});
$("div.btn").click(function () {
  var userChoosenColor = this.id; 
  userSequence.push(userChoosenColor);
  playSound(userChoosenColor); 
  animatePress(userChoosenColor);
  checkAnswer(); 
});
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3"); 
  audio.play(); 
}
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed"); 
  }, 100);
}
function checkAnswer() {
  var lastPosition = userSequence.length - 1;
  
  if (userSequence[lastPosition] === gameSequence[lastPosition]) {
    
    if (userSequence.length === gameSequence.length) {
      setTimeout(function () {
       
        nextStepSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over"); 
    setTimeout(function () {
      
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to Restart");
    startOver(); 
  }
function startOver() {
  level = 0; 
  started = false;
  gameSequence = [];
}
}
