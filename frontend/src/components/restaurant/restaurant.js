import React/* , { useState, useEffect, useCallback } */ from "react";
// import { useSelector, useDispatch } from "react-redux";
import { acceptRestaurant } from '../../util/restaurant_api_util';
import "./restaurant.scss"

function Restaurant({ restaurant, reroll, closeModal }) {
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

  let priceDenominator;
  let priceBorder = '';
  if (restaurant.price) {
    priceDenominator = '$$$$'.slice(restaurant.price.length);
  } else {
    priceDenominator = '$$$$';
    priceBorder = 'gray';
  }

  return (
    <div className="restaurant-generator container">
      <div className="restaurant-generator close-modal-button-container">
        <button
          className="restaurant-generator close-modal-button"
          onClick={closeModal}
        >X</button>
      </div>
      
      <div className="restaurant-generator restaurant-container">

        <div className="restaurant-generator restaurant-name">
          <a href={`${restaurant.url}`}>
            {`${restaurant.name}`}
          </a>
        </div>

        <div className="restaurant-generator rating-container">
          {/* rating: null, */}
          {`${restaurant.rating}` }
          {` based on ${restaurant.review_count} Yelp reviews`}
        </div>

        <div className="restaurant-generator details-container">
            {
              restaurant.categories.map( category =>
                <div
                  key={category.alias}
                  className="restaurant-generator category"
                >
                  {category.title}
                </div>
              )
            }

          <div className={`restaurant-generator price-container ${priceBorder}`}>
            <div>
              {restaurant.price ? `${restaurant.price}` : ''}
            </div>

            <div className="restaurant-generator price-denominator">
              {`${priceDenominator}`}
            </div>
          </div>
        </div>

        <div className="restaurant-generator contact-details-container">
          <div>
            {`${restaurant.display_phone}`}
          </div>

          <div>
            {`${restaurant.location.display_address}`}
          </div>
        </div>

        <div className="restaurant-generator buttons-container">
          <div className="restaurant-generator accept button-container">
            <button
              onClick={handleAccept}
            >
              Accept
            </button>
          </div>

          <div className="restaurant-generator reroll button-container">
            <button onClick={reroll}>
              Reroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;