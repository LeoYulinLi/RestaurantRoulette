import * as UserApiUtil from '../util/user_api_util';
import * as RestaurantApiUtil from '../util/restaurant_api_util';

export const RECEIVE_RESTAURANT_HISTORY = 'RECEIVE_RESTAURANT_HISTORY';
export const RECEIVE_YELP_RESTAURANT = 'RECEIVE_YELP_RESTAURANT';

const receiveRestaurantHistory = (restaurants) => ({
  type: RECEIVE_RESTAURANT_HISTORY,
  restaurants
});

const receiveYelpRestaurant = (restaurant) => ({
  type: RECEIVE_YELP_RESTAURANT,
  restaurant
});

export const fetchRestaurantHistory = (userId) => dispatch => {
  return UserApiUtil.fetchRestaurantHistory(userId)
    .then( restaurants => dispatch(receiveRestaurantHistory(restaurants)) )
};

export const fetchYelpRestaurant = (filters) => dispatch => {
  return RestaurantApiUtil.fetchYelpRestaurant(filters)
    .then( restaurant => dispatch(receiveYelpRestaurant(restaurant)) );
}