const mongoose = require('mongoose');
const Types = require("mongoose").Types;
const Schema = mongoose.Schema

const SocketSchema = new Schema(
  {
    socket_id: {
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

module.exports = Socket = mongoose.model('Socket', SocketSchema);
