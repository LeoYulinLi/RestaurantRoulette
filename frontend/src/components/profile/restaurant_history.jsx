import "./history.scss";
import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RestaurantHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rating;
    for (let i = 0; i < this.props.restaurant.rating; i++) {
    rating = `${rating} + ${<FontAwesomeIcon icon={faStar} />}`
    }

    return (
      <>
        <div className="h-restaurant-container">
          <img src="" className="h-restaurant-picture" />
          <div className="h-restaurant-name">{this.props.restaurant.name}</div>
          <div className="h-restaurant-rating">
            {/* {this.props.restaurant.rating} */}
            {/* <FontAwesomeIcon icon={faStar} /> */}
            {rating}
          </div>
          <div className="h-restaurant-reviews">
            {this.props.restaurant.review_count}
          </div>
          <div className="h-restaurant-price">
            {this.props.restaurant.price}
          </div>
          <div className="h-restaurant-categories">
            {this.props.restaurant.categories.map((category) => {
              return <li className="category">{category}</li>;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantHistory;
