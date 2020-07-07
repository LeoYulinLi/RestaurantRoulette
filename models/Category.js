const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    alias: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  }
);

module.exports = Category = mongoose.model('Category', CategorySchema);