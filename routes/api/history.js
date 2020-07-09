const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const Restaurant = require("../../models/Restaurant");
const passport = require("passport");
const difference = require('lodash.difference');
const fetchRestaurantById = require("../../utils/restaurant_api_util").fetchRestaurantById

async function fetchRestaurants(disjointYelpId) {
  const results = await Promise.all(disjointYelpId.map(async id => {
    return fetchRestaurantById(id);
  }));
  await Promise.all(results.map(async result => {
    const business = result.data;
    const restaurant = new Restaurant({ ...business, yelp_id: business.id });
    return restaurant.save();
  }));
  return results.map(result => result.data);
}

// TODO: see if this can be done with in 1 query
// TODO: fetch from yelp if not found (expired) in database
async function fetchHistory(yelp_ids) {
  const databaseRestaurants = await Restaurant.find({ yelp_id: { $in: yelp_ids} });
  const databaseRestaurantsIds = databaseRestaurants.map(r => r.yelp_id);
  const idsToFetch = difference(yelp_ids, databaseRestaurantsIds);
  const fetchedRestaurants = await fetchRestaurants(idsToFetch);
  return databaseRestaurants.concat(fetchedRestaurants);
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

