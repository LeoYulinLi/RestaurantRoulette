const yelp = require("../../config/keys").yelp;
const express = require("express");
const router = express.Router();
const axios = require('axios');

const config = {
    headers: { Authorization: `Bearer ${yelp}` }
};

router.post("/", async (req, res) => {
    const { categories, latitude, longitude } = req.body;
    const initialOffset = Math.floor(Math.random() * 1000);
    const result1 = await axios.get(
      "https://api.yelp.com/v3/businesses/search",
      {
          ...config,
          params: { categories, latitude, longitude, open_now: true, offset: initialOffset, limit: 1 }
      }
    )

    if (result1.data.businesses.length === 0) {
        const total = result1.data.total;
        const offset = Math.floor(Math.random() * total);
        const result2 = await axios.get(
          "https://api.yelp.com/v3/businesses/search",
          {
              ...config,
              params: { categories, latitude, longitude, open_now: true, offset, limit: 1 }
          }
        )
        res.json(result2.data);
    } else {
        res.json(result1.data);
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
