// src/components/profile/profile_container.js
import { connect } from "react-redux";
import Profile from "./profile";
import { fetchRestaurantHistory } from '../../actions/restaurant_actions'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    restaurants: state.historyRestaurant
    //may need to change that 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurantHistory: () => dispatch(fetchRestaurantHistory()),
    clearRestaurantHistory: () => dispatch({ type: "CLEAR_HISTORY" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
