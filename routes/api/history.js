const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const Restaurant = require("../../models/Restaurant");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// TODO: see if this can be done with in 1 query
// TODO: fetch from yelp if not found (expired) in database
async function fetchHistory(yelp_id) {
  return Restaurant.find({ yelp_id });
}

router.get("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const histories = await History.find({ user: req.user.id });
    const historiesYelpIds = histories.map(history => history.yelp_id);
    const restaurants = await Promise.all(historiesYelpIds.map(id => fetchHistory(id)));
    res.json(...restaurants);
  });

module.exports = router;

