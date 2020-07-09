import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import Restaurant from "../restaurant/restaurant";
import "./modal.scss"

function Modal({ modal, closeModal, restaurant, reroll }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "login":
      component = <LoginFormContainer closeModal={closeModal} />;
      break;
    case "signup":
      component = <SignupFormContainer closeModal={closeModal} />;
      break;
    case "restaurant":
      component = 
      <Restaurant
        closeModal={closeModal}
        restaurant={restaurant}
        reroll={reroll}
      />
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" /*onClick={closeModal}*/>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
    restaurant: state.generatedRestaurant
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => dispatch(closeModal()),
    clearRestaurant: () => dispatch({ type: 'CLEAR_RESTAURANT' }),
    reroll: () => {
      dispatch({ type: 'CLEAR_RESTAURANT' });
      ownProps.reroll()
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
