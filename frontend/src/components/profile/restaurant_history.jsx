import "./history.scss";
import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faYelp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RestaurantHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.toggleHover = this.toggleHover.bind(this)
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    let stars = 5;
    // let stars = Number(this.props.restaurant.rating)
    //  debugger
    let rating = [...Array(stars).keys()].map((i) => (
      <FontAwesomeIcon key={i} icon={faStar} />
    ));

     let toggleClass;
        if (!this.state.hover) {
            toggleClass = 'yelp-text-off'
        } else {
            toggleClass = 'yelp-text'
        }

    let priceDenominator;
    let priceBorder = "";
    if (this.props.restaurant.price) {
      priceDenominator = "$$$$".slice(this.props.restaurant.price.length);
    } else {
      priceDenominator = "$$$$";
      priceBorder = "gray";
    }

    let price = 
    <div className={`restaurant-generator price-container ${priceBorder}`}>
      <div>
        {this.props.restaurant.price ? `${this.props.restaurant.price}` : ""}
      </div>

      <div className="restaurant-generator price-denominator">
        {`${priceDenominator}`}
      </div>
    </div>;

    return (
      <>
        <div className="h-restaurant-container">
          <div className="h-restaurant-picture">
            <FontAwesomeIcon className="temp-map" icon={faMapPin} />
          </div>
          <div className="h-restaurant-name">{this.props.restaurant.name}</div>
          <div className="h-restaurant-rating">{rating}</div>
          <div className="h-restaurant-reviews">
            based on {this.props.restaurant.review_count} Yelp reviews
          </div>
          <div className="h-restaurant-categories">
            {this.props.restaurant.categories.map((category, idx) => {
              return (
                <li className="category" key={idx}>
                  {category.title}
                </li>
              );
            })}
            <div id="h-restaurant-price">
               {price}
            </div>
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
            <a href="https://www.yelp.com">
              <FontAwesomeIcon
                className="yelp"
                icon={faYelp}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
              />
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantHistory;
