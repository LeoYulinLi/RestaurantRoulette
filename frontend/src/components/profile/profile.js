// src/components/profile/profile.js
import React from "react";
import { Link } from 'react-router-dom'
import RestaurantHistory from "./restaurant_history.jsx";


class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // console.log(this.props.currentUser.id);
    // this.props.fetchRestaurantHistory(this.props.currentUser.id);
    this.props.fetchRestaurantHistory();
  }

  render() {
    let history;

    if (!this.props.restaurants) {
      history = <h2>Restauant history is empty!</h2>;
    } else {
      history = 
        <div>
          <h2>Your Spins</h2>
          <div className='restaurant-history'>
            {
              this.props.restaurants.map((restaurant, idx) => <RestaurantHistory key={ idx } restaurant={restaurant}/>)
            }
          </div>
        </div>
    }
   return (
     <>
        <div className="home-link"><Link to={"/"}>Home</Link></div>
        {history}
      </>
   );
  }
}

export default Profile;
