// src/components/main/main_page.js

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from 'socket.io-client';
import { fetchYelpRestaurant, receiveYelpRestaurant } from "../../actions/restaurant_actions";
import { fetchCategories } from "../../actions/category_actions"
import Modal from "../modal/modal";
import { openModal } from "../../actions/modal_actions";

import "./main_page.scss"

function MainPage() {
  const dispatch = useDispatch();
  
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryDisplay, setCategoryDisplay] = useState("");
  const [category, setCategory] = useState("");
  const [[latitude, longitude], setLocation] = useState([37.78, -122.39]);
  const [autoComplete, setAutoComplete] = useState([]);

  function selectCategories(state) {
    return state.categories;
  }

  const socket = useRef(null);
  
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (!Object.values(categories).length) {
      dispatch(fetchCategories());
    }
    const thing = io.connect("/");
    socket.current = thing;
    thing.on("newRestaurant", function (restaurant) {
      console.log("yes this is socket");
      dispatch(receiveYelpRestaurant(restaurant));
    })
    return () => thing.disconnect();
  }, []);


  const updateAutoComplete = (input, categories) => {
    if (input.length && Object.values(categories).length) {
      const similarCategories = [];
      for (let title in categories) {
        const alias = categories[title].alias;
        const includeTitle = title.toLowerCase().includes(input.toLowerCase());
        const includeAlias = alias.toLowerCase().includes(input.toLowerCase());
        if (includeTitle || includeAlias) {
          similarCategories.push(categories[title]);
        }
      }
      
      setAutoComplete(similarCategories);
    }

    return input;
  };

  useEffect(() => {
    updateAutoComplete(categoryInput, categories);
  }, [categoryInput]);

  function handleSubmit(e) {
    e.preventDefault();
    socket.current.emit("fetchRestaurant", { categories: category, latitude, longitude });
    dispatch(openModal('restaurant'));
  }
  
  function handleAutoCompleteClick(category) {
    return (e) => {
      setAutoComplete([]);
      setCategoryInput('');
      setCategoryDisplay(e.target.textContent);
      setCategory(`${category.alias}`);
    }
  }
  
  function handleAutoCompleteSelection(e) {
    if (e.key === 'Enter') {
      setCategoryInput(e.target.value.toLowerCase())
    }
  }

  return (
    <div className="main-page">
      <Modal
        reroll={() => {
          dispatch(fetchYelpRestaurant({ 
            categories: category, latitude, longitude
          }));
        }}
      />

      <h1>RR Incorporated</h1>

      <div>
        <div>
          Category: {`${categoryDisplay}`}
        </div>
        
        <form>
          <input
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value.toLowerCase())}
          />

          <ul>
            {
              autoComplete.map( category => {
                return (
                  <li
                    key={category.title}
                    onClick={handleAutoCompleteClick(category)}
                    onKeyPress={handleAutoCompleteSelection}
                  >
                    {`${category.title} (${category.alias})`}
                  </li>
                )
              })
            }
          </ul>
        </form>

        <button onClick={handleSubmit}>
            Spin the Wheel
        </button>
      </div>
      
      <footer>Copyright &copy; 2020 Restaurant Roulette</footer>
    </div>
  );
}

export default MainPage;
