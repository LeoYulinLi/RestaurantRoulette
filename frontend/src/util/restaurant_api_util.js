import axios from "axios";

export const fetchYelpRestaurant = (filters) => {
  return axios.get('/api/fetchYelpRestaurant', { params: filters });
};