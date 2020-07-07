// src/components/main/main_page.js

import React, { useState, useEffect, useCallback } from "react";
import { fetchYelpRestaurant } from "../../actions/restaurant_actions";
import { fetchYelpAutoCompletion } from "../../util/restaurant_api_util";
import { fetchCategories } from "../../actions/category_actions"
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import "./main_page.scss"

function MainPage() {
  const dispatch = useDispatch();

  const [categoryInput, setCategoryInput] = useState("");
  const [[latitude, longitude], setLocation] = useState([37.78, -122.39]);
  const [autoComplete, setAutoComplete] = useState([]);
  
  function selectRestaurant(state) {
    return state.generatedRestaurant;
  }
  function selectCategories(state) {
    return state.categories;
  }
  
  const restaurant = useSelector(selectRestaurant);
  const categories = useSelector(selectCategories);
  
  useEffect(() => {
    dispatch(fetchYelpRestaurant({ categories, latitude, longitude }));
    
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, []);
  
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(fetchYelpRestaurant({ categories, latitude, longitude }));
  }

  const updateAutoComplete = useCallback(debounce((text) => {
    fetchYelpAutoCompletion({ text })
      .then(res => console.log(res.data));
  }, 500), []);

  // const updateAutoComplete2 = debounce(updateAutoComplete, 500);

  useEffect(() => {
    updateAutoComplete(categories);
  }, [categories]);

  function handleAutoCompleteSelection(e) {
    if (e.key === 'Enter') {
      setCategoryInput(e.target.value.toLowerCase())
    }
  }

  return (
    <div className="main-page">
      <h1>RR Incorporated</h1>

      <div>
        Name: { restaurant.name }
        <br />

        Categories:
        {
          restaurant.categories.map( category => {
            return <li key={category.alias}>{category.title}</li>;
          })
        }
        <br />
        
        <form onSubmit={handleSubmit}>
          <input
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value.toLowerCase())}
          />

          <ul>
            {
              autoComplete.map( category => {
                return (
                  <li
                    key={category}
                    onClick={ (e) => setCategoryInput(e.target.value.toLowerCase()) }
                    onKeyPress={handleAutoCompleteSelection}
                  >
                    {category}
                  </li>
                )
              })
            }
          </ul>
        </form>
      </div>
      
      <footer>Copyright &copy; 2020 Restaurant Roulette</footer>
    </div>
  );
}

export default MainPage;
