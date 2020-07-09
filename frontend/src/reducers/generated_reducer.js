import { RECEIVE_YELP_RESTAURANT } from "../actions/restaurant_actions";
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions'

const initialState = {
  id: "",
  name: "",
  url: "",
  review_count: null,
  categories: [],
  rating: null,
  coordinates: {
    latitude: null,
    longitude: null
  },
  price: "",
  location: {
      address1: "",
      address2: "",
      address3: "",
      city: "",
      zip_code: "",
      country: "",
      state: "",
      display_address: []
  },
  display_phone: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_YELP_RESTAURANT:
      return action.restaurant;
    case 'CLEAR_RESTAURANT':
      return initialState;
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
