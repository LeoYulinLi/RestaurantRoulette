import "./history.scss";
import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faYelp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RestaurantHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   let stars = 5
    // let stars = Number(this.props.restaurant.rating)
    //  debugger
    let rating = [...Array(stars).keys()].map((i) => (
      <FontAwesomeIcon key={i} icon={faStar} />
    ));
    

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
            {this.props.restaurant.categories.map((category) => {
              return <li className="category">{category.title}</li>;
            })}
            <div className="h-restaurant-price">
              {this.props.restaurant.price}
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
            <a className="yelp-text" href="https://www.yelp.com">
              read more on Yelp &nbsp;
              <FontAwesomeIcon className="yelp-two" icon={faYelp} />
            </a>
            <FontAwesomeIcon className="yelp" icon={faYelp} />
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantHistory;
