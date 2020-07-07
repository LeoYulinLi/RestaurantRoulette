// src/components/main/main_page.js

import React, { useSelector, useState, useEffect, useDispatch } from "react";
import { fetchYelpRestaurant } from "../../actions/restaurant_actions";

function MainPage() {

  const [categories, setCategories] = useState("");
  const [[latitude, longitude], setLocation] = useState([37.78, -122.39]);

  function selectRestaurant(state) {
    return state.generatedRestaurant;
  }

  const restaurant = useSelector(selectRestaurant);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchYelpRestaurant({}));
  }, []);

  return (
    <div>
      <h1>RR Incorporated</h1>

      <div>
        {categories}
        {restaurant.name}
        <input value={categories} onChange={e => setCategories(e.target.value)}></input>
      </div>
      
      <footer>Copyright &copy; 2020 Restaurant Roulette</footer>
    </div>
  );
}

export default MainPage;
