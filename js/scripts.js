// Player Object
var active = true;
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
    $("h1#userName span").text(playerName);
    if (typeof playerTwoName === "string"){ // Runs Two Player Logic on
      var playerOne = new Player(playerName);
      var playerTwo = new Player(playerTwoName);
      $("#playerButtons").show();
      $("div.two-player-scores").show();
      if(playerOne.totalPlayerScore <= 100 && playerTwo.totalPlayerScore <= 100) {
        $("#roll").click(function(){
          if (active === true) {
            playerOne.diceRoll();
            if(playerOne.rollArray.length === 0) {
              // debugger;
              $("h1#userName span").text(playerTwo.playerName);
              playerOne.turnReset();
              active = false;
              $("#dice div").removeClass();
            } else {
              $("#player-turnscore").text(playerOne.turnScore);
              $("#dice div").removeClass();
              $("#dice div").addClass('dice-face' + playerOne.rollArray[playerOne.rollArray.length - 1].toString());
            }
          } else {
            $("h1#userName span").text(playerTwo.playerName);
            playerTwo.diceRoll();
            if(playerTwo.rollArray.length === 0) {
              playerTwo.turnReset();
              active = true;
              $("#dice div").removeClass();
              $("h1#userName span").text(playerOne.playerName);
            } else {
              $("#player-turnscore").text(playerTwo.turnScore);
              $("#dice div").removeClass();
              $("#dice div").addClass('dice-face' + playerTwo.rollArray[playerTwo.rollArray.length - 1].toString());
            }
          }
        });
        $("#hold").click(function(){
          if (active === true) {
            playerOne.hold();
            $("h1#userName span").text(playerTwo.playerName);
            $("#playerOneScore").text(playerOne.totalPlayerScore);
            playerOne.turnReset();
            $("#dice div").removeClass();
            active = false;
          } else {
            playerTwo.hold();
            $("h1#userName span").text(playerOne.playerName);
            $("#playerTwoScore").text(playerTwo.totalPlayerScore);
            playerTwo.turnReset();
            $("#dice div").removeClass();
            active = true;
          }
        });
      } else {
        if(playerOne.totalPlayerScore >= 100) {
          $(".win").show();
          $("#win").text(playerOne.playerName);
        } else if (playerTwo.totalPlayerScore >= 100) {
          $(".win").show();
          $("#win").text(playerTwo.playerName);
        }
      }
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
