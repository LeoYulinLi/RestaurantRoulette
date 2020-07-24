const Restaurant = require("../../models/Restaurant");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const fetchRestaurant = require("../../utils/restaurant_api_util").fetchRestaurant

const fetchRandomRestaurant = (socket, io) => (
  async ({ categories, latitude, longitude, excludeHistories = 1, radius }) => {
    const userId = socket.decoded_token.id;
    const findUsers = User.findById(userId);
    const findHistories = excludeHistories && History.find({ user: userId }).sort({ createdAt: -1 }).limit(excludeHistories);

    const [user, histories] = await Promise.all([findUsers, findHistories]);

    const historiesIndex = histories.reduce((acc, h) => (acc[h.yelp_id] = "visited", acc), {});
    let offset = Math.floor(Math.random() * 1000);

    try {
      let result = await fetchRestaurant(categories, latitude, longitude, radius, offset)
      offset = result.data.total;
      for (let i = 0; i < 5; i++) {
        console.log(`try ${i}: fetching restaurant`);
        if (result.data.businesses.length && !historiesIndex[result.data.businesses[0].id]) {
          const business = result.data.businesses[0];
          const restaurant = new Restaurant({ ...business, yelp_id: business.id });
          try {
            await restaurant.save();
          } catch (e) {
            console.log(e);
          }

          await user.update({ $set: { rolled_restaurant: business.id } });
          const rooms = Object.keys(socket.rooms);
          if (rooms.length > 0) {
            return io.in(rooms[0]).emit("newRestaurant", business);
          } else {
            return io.emit("newRestaurant", business);
          }

        } else {
          result = await fetchRestaurant(categories, latitude, longitude, radius, offset);
          offset = Math.floor(Math.random() * result.data.total);
        }
      }
      console.log("no restaurant");
      return socket.emit("noRestaurant", { msg: "Maybe no restaurant" })
    } catch (e) {
      console.log(e);
      return socket.emit("noRestaurant", { msg: "Something went wrong" })
    }
  }
);

module.exports = fetchRandomRestaurant;
