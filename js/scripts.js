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
  this.hold();
  this.turnScore = 0;
  this.rollArray = [];
};
// AI Functions

Player.prototype.computer = function () {
  while(this.rollArray.length <= 1) {
    // Set interval timing for computer dice roll
    this.diceRoll();
  }
  this.computerHold();
};


// User Interface Logic
$(function() {
  $("#twoPlayer").click(function() {
    $("#showPlayerTwo").show();
  });
  $("#onePlayer").click(function() {
    $("#showPlayerTwo").hide();
  });
  $("#player").submit(function(event) {
    event.preventDefault();
    // debugger;
    var playerName = $("#playerName").val();
    var playerTwoName = $("#playerTwoName").val();
    $(this).hide();
    $("#gameBoard").show();
    $("h1#userName").text(playerName);
    if (typeof playerTwoName === "string"){ // Runs Two Player Logic on
      var playerOne = new Player(playerName);
      var playerTwo = new Player(playerTwoName);
      console.log(playerTwo);
      $("#twoPlayerButtons").show();
      $("div.two-player-scores").show();
      if (playerOne.rollArray.length === 0 || playerTwo.rollArray.length === 0) {
        $("#dice h1").text("You rolled a 1. Your turn is over.");
      }
    } else {
      var singlePlayer = new Player(playerName);
      var computer = new Player("Computer");
      $("div.single-player-scores").show();
      // Single player Roll Click
      $("#roll").click(function(){
        singePlayer.diceRoll();
        if (singePlayer.rollArray.length === 0) {
          $("#dice h1").text("You rolled a 1. Your turn is over.");
          // Computer runs after player Rolls a 1
          computer.computer();
          $("#computerScore").text(computer.totalPlayerScore);
        } else {
          $("#player-turnscore").text(singePlayer.turnScore);
          $("#dice h1").text(singePlayer.rollArray[singePlayer.rollArray.length - 1]);
        }
      });
      // Single Player Hold Click
      $("#hold").click(function() {
        singePlayer.hold();
        if(singePlayer.totalPlayerScore >= 100) {
          $("#win").text(' ' + singePlayer.playerName);
          $(".win").show();
        }
        $("#playerScore").text(singePlayer.totalPlayerScore);
        singePlayer.turnScore = 0;
        singePlayer.rollArray = [];
        computer.computer();
        $("#computerScore").text(computer.totalPlayerScore);
      });
      if(computer.totalPlayerScore >= 100) {
        $(".computer-win").show();
      }
    }
  });
});
