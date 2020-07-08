import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
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
    // signup: (user) => dispatch(signup(user)),
    signup: (user) => dispatch(signup(user)).then(ownProps.closeModal),
    toggleSessionModal: () => dispatch(toggleSessionModal()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
