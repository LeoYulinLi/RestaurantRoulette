import { RECEIVE_CATEGORIES } from "../actions/category_actions";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
