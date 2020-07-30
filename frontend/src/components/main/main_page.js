// src/components/main/main_page.js

import React, { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { fetchYelpRestaurant } from "../../actions/restaurant_actions";
import { receiveYelpRestaurant } from '../../actions/restaurant_actions';
import { fetchCategories } from "../../actions/category_actions";
import io from 'socket.io-client';
import Modal from "../modal/modal";
import { openModal } from "../../actions/modal_actions";
import Chat from "../chat/chat";
import Roulette from '../roulette/roulette'
import "./main_page.scss"
import { joinRoom } from "../../actions/join_actions";

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
  const [joinedRoomId, setJoinedRoomId] = useState("");
  const [username, setUsername] = useState('');
  const socketRef = useRef(null);

  function roomSelector(state) {
    return state.join.roomId;
  }

  function selectCategories(state) {
    return state.categories;
  }
  function selectRestaurant(state) {
    return state.generatedRestaurant;
  }

  const invitationRoomId = useSelector(roomSelector);
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

    const socket = io.connect('/');
    socketRef.current = socket;
    const token = localStorage.getItem('jwtToken').substring(7);
    socket.on('connect', () => {
      socket
        .emit('authenticate', { token: token })
        .on('authenticated', () => {
          // socket.emit('connectToChat', {

          // })
          socket.on("spun", () => setSpinToggle(true));
          socket.on("newRestaurant", function(restaurant) {
            dispatch(receiveYelpRestaurant(restaurant));
          });
          socket.on("noRestaurant", () => {
            setSpinToggle(false);
          });
          if (invitationRoomId) socket.emit("join", invitationRoomId);
          socket.on("joined", ({roomId, username}) => {
            setJoinedRoomId(roomId);
            setUsername(username);
          });
        })
        .on('unauthorized', (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        })
    })

    document.addEventListener('click', hideAutoComplete);

    return function cleanup() {
      document.removeEventListener('click', hideAutoComplete);
      socket.disconnect();
      dispatch(joinRoom(null));
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
    e.preventDefault();
    if (spinToggle) return;
    socketRef.current.emit(
      "fetchRestaurant",
      { categories: category, latitude, longitude }
    );
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

  function handleCopy(event) {
    event.currentTarget.select();
  }

  return (
    <div className="main-page-container">
      <Modal
        reroll={() => {
          setSpinToggle(true)
          socketRef.current.emit(
            "fetchRestaurant",
            { categories: category, latitude, longitude }
          );
        }}
      />

      <section className="main-section">
        <div className="options-container">
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
          
          <div className="join">
            { (invitationRoomId) ? <h2>You have joined a room</h2> : <>
              <h2 className="make-this-gray">Ask a friend to join</h2>
              <input value={`${window.location.href.split("/#")[0]}/#/join/${joinedRoomId}`} readOnly onClick={handleCopy}/>
            </>}
          </div>

          <div className="main-roulette-container">
            <Roulette class={handleToggle()} handleSubmit={handleSubmit} />
          </div>
        </div>

        <Chat
          socket={socketRef.current}
          username={username}
          roomId={joinedRoomId}
        />
      </section>

    </div>
  );
}

export default MainPage;
