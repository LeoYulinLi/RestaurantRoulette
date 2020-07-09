const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const Restaurant = require("../../models/Restaurant");
const passport = require("passport");

// TODO: see if this can be done with in 1 query
// TODO: fetch from yelp if not found (expired) in database
async function fetchHistory(yelp_ids) {
  return Restaurant.find({ yelp_id: { $in: yelp_ids} });
}

router.get("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const histories = await History.find({ user: req.user.id });
    const historiesYelpIds = histories.map(history => history.yelp_id);
    const restaurants = await fetchHistory(historiesYelpIds);
    res.json(restaurants);
  });

module.exports = router;

