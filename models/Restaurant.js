const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  yelp_id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true
  },
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
    type: String
  },
  display_phone: {
    type: String
  },
  location: {
    type: Object,
    required: true,
  },
  coordinates: {
    type: Object,
    required: true
  },
  createdAt: { type: Date, default: Date.now(), index: { expireAfterSeconds: 24 * 60 * 60 } }
});

module.exports = Restaurant = mongoose.model("Restaurant", RestaurantSchema);

