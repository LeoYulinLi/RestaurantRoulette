import { yelp } from "../config/keys_dev";
import axios from "axios";

const config = {
    headers: { Authorization: `Bearer ${yelp}` }
};


export const fetchAll = (params) => axios.get( 
    `https://api.yelp.com/v3/businesses/search`,
    params,
    config
);

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
