import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import groups from "./grops";
import modal from "./modal";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  groups,
  modal
});
