var casper = require("casper").create();
var fs = require("fs");

casper.on("remote.message", function(msg) {
  console.log("remote message is: " + msg);
});
casper.start("http://draftwizard.fantasypros.com/nfl/adp/mock-drafts/overall/2qb-ppr-10-teams", function() {
  var rankings = this.evaluate(function() {
    var players = document.querySelectorAll("#adpTable tbody tr");
    var data = [];
    for(var i = 0; i < players.length; i++) {
      var currentPlayer = players[i];
      var currentPlayerElements = currentPlayer.getElementsByTagName("td");
      var currentPlayerObject = {
        "rank": i + 1,
        "pos": currentPlayerElements[0].innerText.toLowerCase().replace(/[0-9]/g, ''),
        "name": currentPlayerElements[2].innerText,
        "team": currentPlayerElements[3].innerText,
        "bye": currentPlayerElements[3].innerText
      }
      data.push(currentPlayerObject);
    }
    return data;
  });
  fs.write("data/rankings2.json", JSON.stringify(rankings));
});
casper.run();
