import { combineReducers } from "redux";
import authReducer from "./auth";
import usersReducer from "./users";
import groups from "./grops";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  groups
});
