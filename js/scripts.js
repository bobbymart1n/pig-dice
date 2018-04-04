var turnScore = 0;
var rollArray = [];
var playerScore = [];

function Player(name) {
  this.playerName = name;
  this.playerScore = [];
  this.turnScore = 0;
  this.rollArray = [];
}

function diceRoll() {
  var roll = Math.floor(Math.random() * 6 + 1);
  if (roll === 1) {
    return rollArray = [];
  } else {
    rollArray.push(roll);
  }
  console.log(rollArray);
};

function turnTotal() {
  // Hold button function
  if (playerScore[playerScore.length - 1] >= 100) {
    return "You Win!"
  } else {
    for (i=0; i < rollArray.length; i++) {
      turnScore += (rollArray[i]);
    }
    playerScore.push(turnScore);
    console.log(playerScore);
  }
};



$(function() {
  $("#player").submit(function(event) {
    event.preventDefault();
    var playerName = $("#playerName").val();
    $(this).hide();
    $("#gameBoard").show();
    $("h2#userName").text(playerName);
  });
});
