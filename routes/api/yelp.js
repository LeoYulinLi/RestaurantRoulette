const Restaurant = require("../../models/Restaurant");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const fetchRestaurant = require("../../utils/restaurant_api_util").fetchRestaurant

router.post("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    const { categories, latitude, longitude } = req.body;
    const initialOffset = Math.floor(Math.random() * 1000);

    try {
      const result1 = await fetchRestaurant(categories, latitude, longitude, initialOffset)

      if (result1.data.businesses.length) {

        const business = result1.data.businesses[0];
        const restaurant = new Restaurant({ ...business, yelp_id: business.id });
        restaurant.save();

        await user.update({ $set: { rolled_restaurant: business.id } });
        res.json(business);

      } else {

        const total = result1.data.total;
        const offset = Math.floor(Math.random() * total);

        const result2 = await fetchRestaurant(categories, latitude, longitude, offset)
        const business = result2.data.businesses[0];
        const restaurant = new Restaurant({ ...business, yelp_id: business.id });
        restaurant.save();

        await user.update({ $set: { rolled_restaurant: business.id } });
        res.json(business);

      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ msg: "Something went wrong" })
    }

  });

module.exports = router;

/**
 * restaurant_actions
 *   creating a thunk action
 *   this thunk action will then dispatch an action creator
 * restaurant_api_util
 *   ajax call
 *   filters
 * backend that we create
 *   filters
 *   ajax call to the yelp database (yelp.js)
 *   This will return a bunch of restaurants
 *   Use a promise chain to check if that restaurant matches our filters
 *
 */
