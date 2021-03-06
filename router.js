const Authentication = require("./controllers/authentication");
const Players = require("./controllers/players");
const Drafts = require("./controllers/drafts");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) { res.send({ message: "API is authenticated" }); });
  app.get("/players", requireAuth, Players.getPlayers);
  app.get("/players/:position", requireAuth, Players.getByPosition);
  app.get("/draft", requireAuth, Drafts.getDrafts);
  app.post("/draft", requireAuth, Drafts.pushDraft);
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
}
