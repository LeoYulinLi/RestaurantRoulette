import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";
import {
  openModal,
  closeModal,
  toggleSessionModal,
} from "../../actions/modal_actions";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: (user) => dispatch(logout(user)).then(ownProps.closeModal),
    toggleSessionModal: () => dispatch(toggleSessionModal()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
