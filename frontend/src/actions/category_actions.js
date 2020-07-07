import * as CategoryApiUtil from "../util/category_api_util";

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => (dispatch) => {
  return CategoryApiUtil.fetchCategories().then((categories) =>
    dispatch(receiveCategories(categories))
  );
};

