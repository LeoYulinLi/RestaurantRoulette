import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";
import { openModal, closeModal,toggleSessionModal} from "../../actions/modal_actions";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(login(user)),
    toggleSessionModal: () => dispatch(toggleSessionModal()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
