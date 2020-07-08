const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

router.get("/", async (req, res) => {
  const categoryDB = await Category.find()
  const categories = categoryDB.reduce( (obj, item) => {
      const { title, alias } = item;
      return {
        ...obj,
        [title]: {title, alias}
      }
    }, {});
  
  res.json({ categories: categories });
});

module.exports = router;
