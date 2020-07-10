// src/components/main/main_page.js

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchYelpRestaurant } from "../../actions/restaurant_actions";
import { fetchCategories } from "../../actions/category_actions"
import Modal from "../modal/modal";
import { openModal } from "../../actions/modal_actions";
import Roulette from '../roulette/roulette'
import "./main_page.scss"

function MainPage() {
  const dispatch = useDispatch();
  
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryDisplay, setCategoryDisplay] = useState("");
  const [category, setCategory] = useState("");
  const [[latitude, longitude], setLocation] = useState([37, -122]);
  const [radius, setRadius] = useState(8050);
  const [autoCompleteCategories, setAutoCompleteCategories] = useState([]);
  const [autoCompleteDisplay, toggleAutoCompleteDisplay] = useState('hidden')
  const [autoCompleteIdList, setAutoCompleteIdList] = useState([]);
  const [autoCompleteFocusId, setAutoCompleteFocusId] = useState('');
  const [spinToggle, setSpinToggle] = useState(false);

  function selectCategories(state) {
    return state.categories;
  }
  function selectRestaurant(state) {
    return state.generatedRestaurant;
  }
  const restaurant = useSelector(selectRestaurant);
  const categories = useSelector(selectCategories);

  function hideAutoComplete(e) {
    if (!e.target.className.includes('autocomplete')) {
      toggleAutoCompleteDisplay('hidden');
    }
  }

  useEffect(() => {
    if (!Object.values(categories).length) {
      dispatch(fetchCategories());
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position =>
        setLocation(
          [position.coords.latitude, position.coords.longitude]),
          () => dispatch(openModal('geo')
        )
      );
    } else {
      dispatch(openModal('geo'))
    }
    
    document.addEventListener('click', hideAutoComplete);

    return function cleanup() {
      document.removeEventListener('click', hideAutoComplete)
    }
  }, []);

  useEffect(() => {
    if (restaurant.name){
      setSpinToggle(false);
      dispatch(openModal("restaurant"));
    }
  }, [restaurant])

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
      
      setAutoCompleteCategories(similarCategories);
    } else {
      setAutoCompleteCategories([]);
    }
  };

  useEffect(() => {
    updateAutoComplete(categoryInput, categories);
  }, [categoryInput]);
  
  useEffect(() => {
    const nodeList = document.querySelectorAll(".autocomplete-dropdown-item");
    const listItems = Array.from(nodeList);
    const listItemIds = listItems.map( item => item.id );
    setAutoCompleteIdList(listItemIds);
    
  }, [autoCompleteCategories]);

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault();
    dispatch(fetchYelpRestaurant({ 
      categories: category, latitude, longitude, radius
    })).catch(err => setSpinToggle(false));
    setSpinToggle(true);
  }

  function handleToggle() {
    let toggleClass;
    if (spinToggle) {
      toggleClass = 'inner-wheel';
    } else {
      toggleClass = '';
    }
    return toggleClass;
  }

  function handleDropdown(e) {
    const activeItem = autoCompleteFocusId;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (activeItem) {
          const currIdx = autoCompleteIdList.indexOf(activeItem);
          const nextIdx = currIdx + 1;
          const nextId = autoCompleteIdList[nextIdx] || '';
          setAutoCompleteFocusId(nextId);
        } else {
          setAutoCompleteFocusId(autoCompleteIdList[0]);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (activeItem) {
          const currIdx = autoCompleteIdList.indexOf(activeItem);
          const prevIdx = currIdx - 1;
          const prevId = autoCompleteIdList[prevIdx] || '';
          setAutoCompleteFocusId(prevId);
        } else {
          const lastIdx = autoCompleteIdList.length - 1;
          const lastId = autoCompleteIdList[lastIdx];
          setAutoCompleteFocusId(lastId);
        }
        break;
      case 'Enter':
        e.preventDefault();

        if (!autoCompleteCategories.length) break;

        setAutoCompleteCategories([]);
        setCategoryInput('');
        setCategoryDisplay(
          document.getElementById(autoCompleteFocusId).textContent
        );
        setCategory(autoCompleteFocusId);
        break;
      case 'Escape':
        e.preventDefault();
        e.currentTarget.blur();
    }
  }
  
  function handleDropdownClick(category) {
    return (e) => {
      setAutoCompleteCategories([]);
      setCategoryInput('');
      setCategoryDisplay(e.target.textContent);
      setCategory(category.alias);
    }
  }
  
  return (
    <div className="main-page">
      <Modal
        reroll={() => {
          dispatch(
            fetchYelpRestaurant({
              categories: category,
              latitude,
              longitude,
              radius
            })
          );
        }}
      />

      <div className="main-page-headers">
        <h1 className="make-this-gray">Hungry Or Bored?</h1>
        <div className="shrug"></div>
      </div>
       
      <div className="category-container">
        <div className="category-display-container  make-this-gray">
          What are you craving?
          <div className="category-display">
            {`${categoryDisplay}`}
          </div>
        </div>
        
        <div className="autocomplete-container">
          <input
            className="autocomplete-input"
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value.toLowerCase())}
            onKeyDown={handleDropdown}
            onClick={() => toggleAutoCompleteDisplay('')}
          />

          <ul className={`autocomplete-dropdown-list ${autoCompleteDisplay}`}>
            {
              autoCompleteCategories.map( category => {
                let focus = '';
                if (category.alias === autoCompleteFocusId) focus = 'focus';
                return (
                  <li
                    id={category.alias}
                    key={category.alias}
                    className={`autocomplete-dropdown-item ${focus}`}
                    onClick={handleDropdownClick(category)}
                  >
                    {`${category.title} (${category.alias})`}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div className="radius-container">
        <div className="radius-display-container make-this-gray">
            How far will you travel?
          <div className="radius-display">
            {Math.ceil(parseInt(radius) / 1610)} miles
          </div>
        </div>
        <input
          className="radius-input"
          type="range"
          min="1610"
          max="40000"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        >
        </input>
      </div>

      <Roulette class={handleToggle()} handleSubmit={handleSubmit} />
      
      <footer className='footer'>Copyright &copy; 2020 Restaurant Roulette</footer>
    </div>
  );
}

export default MainPage;
