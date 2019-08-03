import { message } from "antd";
import {
  WHO_AM_I_REQUEST,
  WHO_AM_I_SUCCESS,
  WHO_AM_I_FAILED
} from "../actionsTypes/users";

const initialState = {
  profile: {},
  isProfileLoading: false
};

export default function usersReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case WHO_AM_I_REQUEST:
      newState.isProfileLoading = true;
      return newState;
    case WHO_AM_I_SUCCESS:
      newState.isProfileLoading = false;
      newState.profile = action.payload;
      return newState;
    case WHO_AM_I_FAILED:
      message.error(action.payload);
      newState.isProfileLoading = false;
      return newState;
    default:
      return state;
  }
}
