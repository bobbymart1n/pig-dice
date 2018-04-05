// Player Object
function Player(name) {
  this.playerName = name;
  this.playerScore = [];
  this.turnScore = 0;
  this.totalPlayerScore = 0;
  this.rollArray = [];
  this.active = true;
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
  this.active = false;
};

Player.prototype.turnReset = function () {
  this.turnScore = 0;
  this.rollArray = [];
};

// Computer Only Prototype
Player.prototype.computerHold = function () {
  this.hold();
  this.turnScore = 0;
  this.rollArray = [];
};
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
    $("div#showPlayerTwo").show();
  });
  $("#onePlayer").click(function() {
    $("div#showPlayerTwo").hide();
  });
  $("#player").submit(function(event) {
    event.preventDefault();
    var playerName = $("#playerName").val();
    var playerTwoName = $("#playerTwoName").val();
    $(this).hide();
    $("#gameBoard").show();
    $("h1#userName").text(playerName);
    if (typeof playerTwoName === "string"){ // Runs Two Player Logic on
      var playerOne = new Player(playerName);
      var playerTwo = new Player(playerTwoName);
      $("#playerButtons").show();
      $("div.two-player-scores").show();

      $("#roll").click(function(){
        debugger;
        if (playerOne.active === true && playerTwo.active === true) {
          console.log(playerOne);
          console.log(playerTwo);
          playerOne.diceRoll();
          if(playerOne.rollArray.length === 0) {
            $("#dice h1").text("You rolled a 1. Your turn is over.");
            this.active = false;
          } else {
            $("#player-turnscore").text(playerOne.turnScore);
            $("#dice h1").text(playerOne.rollArray[playerOne.rollArray.length - 1]);
          }
        } else if (playerTwo.active === true && playerOne.active === false) {
          console.log(playerOne);
          console.log(playerTwo);
          playerTwo.diceRoll();
          if(playerTwo.rollArray.length === 0) {
            $("#dice h1").text("You rolled a 1. Your turn is over.");
            this.active = false;
            playerOne.active = true;
          } else {
            $("#player-turnscore").text(playerTwo.turnScore);
            $("#dice h1").text(playerTwo.rollArray[playerTwo.rollArray.length - 1]);
          }
        }
      });
    }
  });
});
      //
      // if (playerOne.active === true) {
      //     playerOne.diceRoll()
      //   $("#dice h1").text("You rolled a 1. Your turn is over.");

    // } else {
    //   var singlePlayer = new Player(playerName);
    //   var computer = new Player("Computer");
    //   $("div.single-player-scores").show();
    //   // Single player Roll Click
    //   $("#roll").click(function(){
    //     singlePlayer.diceRoll();
    //     if (singlePlayer.rollArray.length === 0) {
    //       $("#dice h1").text("You rolled a 1. Your turn is over.");
    //       // Computer runs after player Rolls a 1
    //       computer.computer();
    //       $("#computerScore").text(computer.totalPlayerScore);
    //     } else {
    //       $("#player-turnscore").text(singlePlayer.turnScore);
    //       $("#dice h1").text(singlePlayer.rollArray[singlePlayer.rollArray.length - 1]);
    //     }
    //   });
    //   // Single Player Hold Click
    //   $("#hold").click(function() {
    //     singlePlayer.hold();
    //     if(singlePlayer.totalPlayerScore >= 100) {
    //       $("#win").text(' ' + singlePlayer.playerName);
    //       $(".win").show();
    //     }
    //     $("#playerScore").text(singlePlayer.totalPlayerScore);
    //     singlePlayer.turnReset();
    //     computer.computer();
    //     $("#computerScore").text(computer.totalPlayerScore);
    //   });
    //   if(computer.totalPlayerScore >= 100) {
    //     $(".computer-win").show();
    //   }
    // }
