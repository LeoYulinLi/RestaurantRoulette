const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");

router.get("/", async (req, res) => {
    res.json({categories: await Category.find()});
  }
);

module.exports = router;
