import history from "../../helper/history";
import AuthService from "../../services/AuthService";
import { whoAmI } from "./users";
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED
} from "../actionsTypes/auth";

export function login(data) {
  return async function(dispatch) {
    dispatch({ type: AUTH_LOGIN_REQUEST });
    AuthService.login(data)
      .then(data => {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.data.accessToken });
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("expires_in", data.data.expires_in);
        history.push("/");
        dispatch(whoAmI());
      })
      .catch(err => {
        var message;
        if (err.response.data === "Password is incorrect")
          message = "Неверный пароль";
        else message = "Что-то пошло не так";
        dispatch({ type: AUTH_LOGIN_FAILED, payload: message });
        return Promise.reject(message);
      });
  };
}

export function logout() {
  return async function(dispatch) {
    dispatch({ type: AUTH_LOGOUT_REQUEST });
    AuthService.logout(localStorage.getItem("refreshToken"))
      .then(data => {
        dispatch({ type: AUTH_LOGOUT_SUCCESS });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expires_in");
        history.push("/login");
        return Promise.resolve();
      })
      .catch(err => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expires_in");
        dispatch({ type: AUTH_LOGOUT_FAILED, payload: "Что-то пошло не так" });
        history.push("/login");
        return Promise.reject("Что-то пошло не так");
      });
  };
}
