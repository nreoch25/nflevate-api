const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const draftSchema = new Schema({
  items: Array,
  draftedBy: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
},
{
  timestamps: true
});

const DraftClass = mongoose.model("draft", draftSchema);
module.exports = DraftClass;
