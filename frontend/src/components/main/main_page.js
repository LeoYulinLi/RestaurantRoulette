// src/components/main/main_page.js

import React, { useState, useEffect, useCallback } from "react";
import { fetchYelpRestaurant } from "../../actions/restaurant_actions";
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
    dispatch(fetchYelpRestaurant({
      categories: categoryInput, latitude, longitude
    }));
    
    if (!Object.values(categories).length) {
      dispatch(fetchCategories());
    }
  }, []);

  const updateAutoComplete = useCallback(debounce((input, categories) => {
    if (input.length && Object.values(categories).length) {
      const similarCategories = [];

      for (let title in categories) {
        const alias = categories[title].alias;
        if (title.toLowerCase().includes(input.toLowerCase())) {
          similarCategories.push(alias);
        }
      }

      setAutoComplete(similarCategories);
    }

    return input;
  }, 350), []);

  useEffect(() => {
    updateAutoComplete(categoryInput, categories);
  }, [categoryInput, categories]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(fetchYelpRestaurant({ 
      categories: categoryInput, latitude, longitude
    }));
  }
  
  function handleAutoCompleteClick(e) {
    setCategoryInput(e.target.textContent)
    dispatch(fetchYelpRestaurant({
      categories: e.target.textContent, latitude, longitude
    }));
  }
  
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
              autoComplete.map( categoryAlias => {
                return (
                  <li
                    key={categoryAlias}
                    onClick={handleAutoCompleteClick}
                    onKeyPress={handleAutoCompleteSelection}
                  >
                    {categoryAlias}
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
