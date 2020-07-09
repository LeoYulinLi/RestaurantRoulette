import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import SignupForm from "./signup_form";
import { openModal, closeModal,toggleSessionModal,} from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (user) => dispatch(signup(user))
      .then(dispatch(login(user))),
    toggleSessionModal: () => dispatch(toggleSessionModal()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
