const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true
  },
  yelp_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = History = mongoose.model("History", HistorySchema, "history");

//REVISIT
