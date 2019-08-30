import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import groups from "./grops";
import modal from "./modal";
import eventModal from "./eventModal";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  groups,
  modal,
  eventModal
});
