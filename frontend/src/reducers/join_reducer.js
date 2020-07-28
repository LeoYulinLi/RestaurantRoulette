import { JOIN_ROOM } from "../actions/join_actions";

const initialState = {
  roomId: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return { roomId: action.roomId };
    default:
      return state;
  }
}
