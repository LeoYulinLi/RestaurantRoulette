const express = require("express");
const router = express.Router();
const History = require("../../models/History");
const Restaurant = require("../../models/Restaurant");
const passport = require("passport");
const difference = require('lodash.difference');
const fetchRestaurantById = require("../../utils/restaurant_api_util").fetchRestaurantById
const chunk = require('lodash.chunk');

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function fetchRestaurants(disjointYelpId) {
  const chunks = chunk(disjointYelpId, 5);
  const results = [];
  try {
    for (const ids of chunks) {
      results.push(await Promise.all(ids.map(async id => {
        console.log(`fetching ${id}`);
        return fetchRestaurantById(id);
      })));
      await timer(2000);
    }
  } catch (e) {
    console.log(e);
  }
  await chunks.map(async ids => await Promise.all(ids.map(async id => {
    console.log(`fetching ${id}`);
    return fetchRestaurantById(id);
  })));
  await Promise.all(results.map(async result => {
    const business = result.data;
    console.log(`saving ${business.id}`);
    const restaurant = new Restaurant({ ...business, yelp_id: business.id });
    return restaurant.save();
  }));
  return results.map(result => result.data);
}

async function fetchHistory(yelp_ids) {
  const databaseRestaurants = await Restaurant.find({ yelp_id: { $in: yelp_ids} });
  const databaseRestaurantsIds = databaseRestaurants.map(r => r.yelp_id);
  const idsToFetch = difference(yelp_ids, databaseRestaurantsIds);
  const fetchedRestaurants = await fetchRestaurants(idsToFetch);
  const unsorted = databaseRestaurants.concat(fetchedRestaurants);
  let obj = {};
  unsorted.forEach(x => obj[x.yelp_id || x.id] = x)
  let ordered = yelp_ids.map(key => obj[key])
  return ordered;
}

router.get("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const histories = await History.find({ user: req.user.id }).sort({createdAt: -1});
    const historiesYelpIds = histories.map(history => history.yelp_id);
    const restaurants = await fetchHistory(historiesYelpIds);
    res.json(restaurants);
  });

module.exports = router;

