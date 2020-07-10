const Restaurant = require("../../models/Restaurant");
const Socket = require("../../models/Socket");
const fetchRestaurant = require("../../utils/restaurant_api_util").fetchRestaurant;

const fetchRandomRestaurant = (socket) => async ({ categories, latitude, longitude }) => {

  const socketModel = await Socket.findOne({ socket_id: socket.id });

  const initialOffset = Math.floor(Math.random() * 1000);
  const result1 = await fetchRestaurant(categories, latitude, longitude, initialOffset);


  if (result1.data.businesses.length === 0) {
    const total = result1.data.total;
    const offset = Math.floor(Math.random() * total);

    const result2 = await fetchRestaurant(categories, latitude, longitude, offset)
    const business = result2.data.businesses[0];
    const restaurant = new Restaurant({ ...business, yelp_id: business.id });
    restaurant.save();

    await socketModel.update({ $set: { rolled_restaurant: business.id } });
    socket.emit("newRestaurant", business);

  } else {
    const business = result1.data.businesses[0];
    const restaurant = new Restaurant({ ...business, yelp_id: business.id });
    restaurant.save();

    await socketModel.update({ $set: { rolled_restaurant: business.id } });
    socket.emit("newRestaurant", business);

  }
}


module.exports = {
  fetchRandomRestaurant
};

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
