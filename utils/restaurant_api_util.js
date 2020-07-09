const axios = require('axios');
const yelp = require("../config/keys").yelp;

const config = {
  headers: { Authorization: `Bearer ${yelp}` }
};

async function fetchRestaurant(categories, latitude, longitude, offset) {
  return axios.get(
    "https://api.yelp.com/v3/businesses/search",
    {
      ...config,
      params: { categories, latitude, longitude, open_now: true, offset, limit: 1 }
    }
  )
}

async function fetchRestaurantById(yelpId) {
  return axios.get(
    `https://api.yelp.com/v3/businesses/${yelpId}`,
    config
  )
}

module.exports = {
  fetchRestaurant,
  fetchRestaurantById
}
