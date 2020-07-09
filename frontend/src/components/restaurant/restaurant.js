import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptRestaurant } from '../../util/restaurant_api_util';
import "./restaurant.scss"

function Restaurant({ restaurant, closeModal }) {
  debugger
  if (!restaurant.name.length) return null;
  // if (!restaurant.name.length) {
  //   return (
  //     <Roulette />
  //   );
  // }
  
  function handleAccept() {
    acceptRestaurant()
      .then( () => closeModal() );
  }
  
  return (
    <div>
      <div className="restaurant-generator restaurant-name">
        <a href={`${restaurant.url}`}>
          {`${restaurant.name}`}
        </a>
      </div>

      Categories:
      {
        restaurant.categories.map( category => {
          return <li key={category.alias}>{category.title}</li>;
        })
      }

      <div className="restaurant-generator accept-button">
        <button
          onClick={handleAccept}
        >
          Accept
        </button>
      </div>

      <div className="restaurant-generator reroll-button">
        <button>
          Reroll
        </button>
      </div>
    </div>
  );
}

export default Restaurant;