// src/components/profile/profile.js

import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //   console.log(this.props.currentUser.id);
  //   this.props.fetchRestaurantHistory(this.props.currentUser.id);
  // }

  render() {
    // if (this.props.restaurants.length === 0) {
    //   return <div>Restauant history is empty</div>;
    // } else {
    //   return (
    //     <div>
    //       <h2>Restaurant History</h2>
    //     </div>
    //   );
    // }
   return (
    <div className="restaurant-history container">
      Will put restaurant history here.
    </div>
   );
  }
}

export default Profile;
