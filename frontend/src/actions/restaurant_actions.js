import * as UserApiUtil from '../util/user_api_util';
import * as RestaurantApiUtil from '../util/restaurant_api_util';

export const RECEIVE_RESTAURANT_HISTORY = 'RECEIVE_RESTAURANT_HISTORY';
// export const RECEIVE_NEW_RESTAURANT_HISTORY = "RECEIVE_NEW_RESTAURANT_HISTORY";

export const RECEIVE_YELP_RESTAURANT = 'RECEIVE_YELP_RESTAURANT';

const receiveRestaurantHistory = (restaurants) => ({
  type: RECEIVE_RESTAURANT_HISTORY,
  restaurants
});

// const receiveNewRestaurantHistory = (restaurant) => ({
//   type: RECEIVE_NEW_RESTAURANT_HISTORY,
//   restaurant,
// });

const receiveYelpRestaurant = (restaurant) => ({
  type: RECEIVE_YELP_RESTAURANT,
  restaurant
});

export const fetchRestaurantHistory = () => dispatch => {
  return RestaurantApiUtil.fetchRestaurantHistory()
    .then( restaurants => dispatch(receiveRestaurantHistory(restaurants)) )
};

export const fetchYelpRestaurant = (filters) => dispatch => {
  return RestaurantApiUtil.fetchYelpRestaurant(filters)
    .then( restaurant => dispatch(receiveYelpRestaurant(restaurant)) );
}