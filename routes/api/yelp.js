const Restaurant = require("../../models/Restaurant");

const express = require("express");
const router = express.Router();
const axios = require('axios');
const passport = require("passport");
const User = require("../../models/User");
const fetchRestaurant = require("../../utils/restaurant_api_util").fetchRestaurant

router.post("/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id);
    const { categories, latitude, longitude, radius } = req.body;
    const initialOffset = Math.floor(Math.random() * 1000);
    const result1 = await fetchRestaurant(
      categories, latitude, longitude, radius, initialOffset
    )

    if (result1.data.businesses.length === 0) {
      const total = result1.data.total;
      const offset = Math.floor(Math.random() * total);

      const result2 = await fetchRestaurant(
        categories, latitude, longitude, radius, offset
      )
      const business = result2.data.businesses[0];
      const restaurant = new Restaurant({ ...business, yelp_id: business.id });
      restaurant.save();

      await user.update({ $set: { rolled_restaurant: business.id } });
      res.json(business);

    } else {
      const business = result1.data.businesses[0];
      const restaurant = new Restaurant({ ...business, yelp_id: business.id });
      restaurant.save();

      await user.update({ $set: { rolled_restaurant: business.id } });
      res.json(business);

    }
  });

module.exports = router;