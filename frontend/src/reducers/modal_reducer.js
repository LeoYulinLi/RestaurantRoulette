import { OPEN_MODAL, CLOSE_MODAL, TOGGLE_SESSION,} from "../actions/modal_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

export default function modalReducer(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    case TOGGLE_SESSION:
      return state === "login" ? "signup" : "login";
    case RECEIVE_USER_LOGOUT:
      return "login";
    default:
      return state;
  }
}
