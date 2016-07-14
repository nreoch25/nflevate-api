const Player = require("../models/player");

exports.getPlayers = function(req, res) {
  Player.find({}).sort("rank").exec(function(err, players) {
    console.log(players.length);
    if(err) {
      res.send(err);
    } else {
      res.json(players);
    }
  });
}

exports.getByPosition = function(req, res) {
  Player.find({"pos": req.params.position}, function(err, players) {
    if(err) {
      res.send(err);
    } else {
      res.json(players);
    }
  });
}

exports.pushData = function(players) {
  Player.remove({}, function(err) {
    if(err) {
      res.send(err);
    } else {
      players.map(function(item) {
        const player = new Player({
          bye: item.bye,
          name: item.name,
          pos: item.pos,
          rank: item.rank,
          team: item.team
        });
        player.save(function(err) {});
      });
    }
  });
}
