// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = exports.app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const players = require("./controllers/players");
// DB Setup
mongoose.connect("mongodb://"+ (process.env.MONGO_PORT_27017_TCP_ADDR || "localhost")  + ":27017/nflevate", function(err) {
  if(err) {
    console.log("Mongo not connecting"); 
  } else {
    console.log("MongoDB connected");
  }
});

// Read rankings data and push to mongodb
const rankings = JSON.parse(fs.readFileSync("data/rankings2.json", "utf8"));
players.pushData(rankings);

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);


// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
