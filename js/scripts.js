function diceRoll() {
  var roll = Math.floor(Math.random() * 6 + 1);
  if (roll === 1) {
    return 0
  } else {
    return roll;
  }
}
