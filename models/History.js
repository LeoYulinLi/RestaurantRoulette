const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//import OBject ID from something

const HistorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
//   user: {
//     type: ObjectId,
//     required: true,
//   },
  url: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required:true
  },
  review_count: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  display_phone: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
});

module.exports = History = mongoose.model("History", HistorySchema, "history");

//REVISIT
