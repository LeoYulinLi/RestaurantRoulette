import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";
import {
  openModal,
  closeModal,
} from "../../actions/modal_actions";

const mapStateToProps = (state,ownProps) => ({
  loggedIn: state.session.isAuthenticated,
  onProfile: state.historyRestaurant
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (user) => dispatch(logout(user)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
