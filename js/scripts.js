// Player Object
function Player(name) {
  this.playerName = name;
  this.playerScore = [];
  this.turnScore = 0;
  this.rollArray = [];
}

// Player Prototypes
Player.prototype.diceRoll = function () {
  var roll = Math.floor(Math.random() * 6 + 1);
  if (roll === 1) {
    return this.rollArray = [];
  } else {
    this.rollArray.push(roll);
  }
  console.log(this.rollArray);
};

Player.prototype.turnTotal = function() {
  // Hold button function
  if (this.playerScore[this.playerScore.length - 1] >= 100) {
    return "You Win!"
  } else {
    for (i=0; i < this.rollArray.length; i++) {
      this.turnScore += (this.rollArray[i]);
    }
    this.playerScore.push(this.turnScore);
    console.log(this.playerScore);
  }
};


// User Interface Logic
$(function() {
  $("#player").submit(function(event) {
    event.preventDefault();
    var playerName = $("#playerName").val();
    var playerOne = new Player(playerName);
    console.log(playerOne);
    $(this).hide();
    $("#gameBoard").show();
    $("h1#userName").text(playerName);

    // Roll Click
    $("#roll").click(function(){
      playerOne.diceRoll();
      console.log(playerOne.rollArray)
    })

    $("#playerScore").text()
  });
});
