import axios from "axios";
import AuthService from "../services/AuthService";
import history from "./history";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.54:8011/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const api = async (url, method = "GET", data) => {
  var accessToken = localStorage.getItem("accessToken");

  var time = parseInt(new Date().getTime() / 1000);
  if (time > localStorage.getItem("expires_in")) {
    await AuthService.refresh(localStorage.getItem("refreshToken"))
      .then(resp => {
        localStorage.setItem("accessToken", resp.data.accessToken);
        accessToken = resp.data.accessToken;
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        localStorage.setItem("expires_in", resp.data.expires_in);
      })
      .catch(err => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expires_in");
        history.push("/login");
      });
  }

  var config = {
    headers: { Authorization: "Bearer " + accessToken }
  };

  switch (method) {
    case "GET":
      return axios.get(url, config);
    case "POST":
      return axios.post(url, data, config);
    case "PUT":
      return axios.put(url, data, config);
    case "DELETE":
      return axios.delete(url, config);
    case "PATCH":
      return axios.patch(url, data, config);
    case "OPTIONS":
      return axios.options(url, config);
    default:
      return axios.get(url, config);
  }
};
export default api;
