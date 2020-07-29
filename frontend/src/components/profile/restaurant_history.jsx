import "./history.scss";
import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faYelp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import { Link } from 'react-router-dom'


const MarkerComponent = () => (
  <div className="map-marker">
    <FontAwesomeIcon className="marker" icon={faMapPin} />
  </div>
);

class RestaurantHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.toggleHover = this.toggleHover.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.addPrice = this.addPrice.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  addFilter(category) {
    this.props.filterChange(category);
  }

  addPrice() { 
    if (this.props.restaurant.price) {
    let price = this.props.restaurant.price;
      this.props.filterChange(price);
    }
  }

  render() {
    let hoverOff;
    this.props.restaurant.price
       ? (hoverOff = '')
      : (hoverOff = 'noHover');
    
    let toggleClass;
    if (!this.state.hover) {
      toggleClass = "yelp-text-off";
    } else {
      toggleClass = "yelp-text";
    }

    let priceDenominator;
    let priceBorder = "";
    if (this.props.restaurant.price) {
      priceDenominator = "$$$$".slice(this.props.restaurant.price.length);
    } else {
      priceDenominator = "$$$$";
      priceBorder = "gray";
    }

    let price = (
      <div
        id={hoverOff}
        className={`restaurant-generator price-ind-container ${priceBorder}`}
        onClick={this.addPrice}
      >
        <div>
          {this.props.restaurant.price ? `${this.props.restaurant.price}` : ""}
        </div>

        <div className="restaurant-generator price-denominator">
          {`${priceDenominator}`}
        </div>
      </div>
    );

    const { latitude, longitude } = this.props.restaurant.coordinates;
    return (
      <>
        <div className="h-restaurant-container">
          <div className="h-restaurant-picture">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAIn0asMMg9dj0Uz7Bc5MdKknWqBad78DE",
              }}
              defaultCenter={{ lat: latitude, lng: longitude }}
              defaultZoom={13}
            >
              <MarkerComponent lat={latitude} lng={longitude} />
            </GoogleMapReact>
          </div>
          <div className="h-restaurant-name">{this.props.restaurant.name}</div>
          <div
            id="profile-stars"
            className={`stars n${this.props.restaurant.rating
              .toString()
              .split(".")
              .join("-")}`}
          ></div>
          <div className="h-restaurant-reviews">
            based on {this.props.restaurant.review_count} Yelp reviews
          </div>
          <div className="h-restaurant-cats">
            {this.props.restaurant.categories.map((category, idx) => {
              return (
                <li
                  className="category-ind"
                  key={idx}
                  onClick={() => this.addFilter(category.title)}
                >
                  {category.title}
                </li>
              );
            })}
            <div id="h-restaurant-price-ind">{price}</div>
          </div>
          <div className="contact">
            <div className="restaurant-phone">
              {this.props.restaurant.display_phone}
            </div>
            <div className="restaurant-address">
              {this.props.restaurant.location.address1},&nbsp;
              {this.props.restaurant.location.city},&nbsp;
              {this.props.restaurant.location.state},&nbsp;
              {this.props.restaurant.location.country}
            </div>
          </div>
          <div className="yelp-icon">
            <div className={toggleClass}>read more on yelp &nbsp;</div>

            <FontAwesomeIcon
              className="yelp"
              icon={faYelp}
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
              onClick={() => (window.location.href = this.props.restaurant.url)}
            />
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantHistory;
