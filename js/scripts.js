var turnScore = 0;
var rollArray = [];

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
  for (i=0; i < rollArray.length; i++) {
    turnScore += (rollArray[i]);
  }
  return turnScore
};
