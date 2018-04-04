// Player Object
function Player(name) {
  this.playerName = name;
  this.playerScore = [];
  this.turnScore = 0;
  this.totalPlayerScore = 0;
  this.rollArray = [];
}

// Player Prototypes
Player.prototype.diceRoll = function () {
  var roll = Math.floor(Math.random() * 6 + 1);
  var counter = 0;
  if (roll === 1) {
    this.rollArray = [];
    this.turnScore = 0;
    counter = 0;
  } else {
    this.rollArray.push(roll);
    for (i = 0; i < this.rollArray.length; i++) {
      counter += this.rollArray[i]
    }
    console.log(computer.rollArray, "COMPUTER ROLL ARRAY");
    this.turnScore = counter;
  }
};

Player.prototype.hold = function() {
  // Hold button function
  var counter = 0;
  this.playerScore.push(this.turnScore);

  this.playerScore.map(function(num) {
    counter += num;
  });
  this.totalPlayerScore = counter;
};
Player.prototype.computerHold = function () {
  computer.hold();
  computer.turnScore = 0;
  computer.rollArray = [];
  console.log(computer.totalPlayerScore, "THIS IS THE COMPUTER SCORE")
};
// AI Functions
var computer = new Player("Computer");
Player.prototype.computer = function () {
  while(computer.rollArray.length <= 1) {
    computer.diceRoll();
  }
  computer.computerHold();
};


// User Interface Logic
$(function() {
  $("#twoPlayer").click(function() {
    $("#showPlayerTwo").show();
  });
  $("#player").submit(function(event) {
    event.preventDefault();
    var playerName = $("#playerName").val();
    $(this).hide();
    $("#gameBoard").show();
    $("h1#userName").text(playerName);
    var playerOne = new Player(playerName);
    // Roll Click
    $("#roll").click(function(){
      playerOne.diceRoll();
      if (playerOne.rollArray.length === 0) {
        $("#dice h1").text("You rolled a 1. Your turn is over.");
        computer.computer();
        $("#computerScore").text(computer.totalPlayerScore);
      } else {
        $("#player-turnscore").text(playerOne.turnScore);
        $("#dice h1").text(playerOne.rollArray[playerOne.rollArray.length - 1]);
        console.log(playerOne.turnScore, "CURRENT TURN SCORE");
      }
    });
    // Hold Click
    $("#hold").click(function() {
      playerOne.hold();
      if(playerOne.totalPlayerScore >= 100) {
        $("#win").text(' ' + playerOne.playerName);
        $(".win").show();
      }
      $("#playerScore").text(playerOne.totalPlayerScore);
      playerOne.turnScore = 0;
      playerOne.rollArray = [];
      computer.computer();
      $("#computerScore").text(computer.totalPlayerScore);
    });
  });
  if(computer.totalPlayerScore >= 100) {
    $(".computer-win").show();
  }
});
