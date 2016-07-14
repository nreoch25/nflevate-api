const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  bye: String,
  name: String,
  pos: String,
  rank: Number,
  team: String
});

const PlayerClass = mongoose.model("player", playerSchema);
module.exports = PlayerClass; 
