const Draft = require("../models/draft");
const User = require("../models/user");

exports.pushDraft = function(req, res) {
  const draftItems = req.body;
  const userId = req.user._id;
  const draft = new Draft({
    items: draftItems,
    draftedBy: userId,
  });
  draft.save(function(err) {
    if(err) {
      res.send(err);
    } else {
      res.send({loaded: "success"});
    }
  });
}

exports.getDrafts = function(req, res) {
  Draft.find({})
    .populate("draftedBy")
    .exec(function(err, drafts)  {
      if(err) {
        res.send(err);
      } else {
        res.send(drafts);
      }
    });
}
