var casper = require("casper").create();
var fs = require("fs");

casper.on("remote.message", function(msg) {
  console.log("remote message is: " + msg);
});
casper.start("https://fantasyfootballcalculator.com/rankings", function() {
  var rankings = this.evaluate(function() {
    var players = document.querySelectorAll("#rankings-table tbody tr");
    var data = []
    for(var i = 0; i < players.length; i++) {
      var currentPlayer = players[i];
      var currentPlayerElements = currentPlayer.getElementsByTagName("td");
      var currentPlayerObject = {
        "rank": i + 1,
        "pos": currentPlayerElements[1].innerText.toLowerCase(),
        "name": currentPlayerElements[2].innerText,
        "team": currentPlayerElements[3].innerText,
        "bye": currentPlayerElements[4].innerText
      }
      data.push(currentPlayerObject);
    }
    return data;
  });
  fs.write("data/rankings.json", JSON.stringify(rankings));
});
casper.run();
