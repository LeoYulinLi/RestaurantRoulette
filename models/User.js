const mongoose = require('mongoose');
const Types = require("mongoose").Types;
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rolled_restaurant: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('User', UserSchema);
