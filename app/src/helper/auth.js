import axios from "axios";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.54:8011/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const auth = (url, method = "GET", data) => {
  switch (method) {
    case "GET":
      return axios.get("/auth" + url);
    case "POST":
      return axios.post("/auth" + url, data);
    default:
      return axios.get("/auth" + url);
  }
};

export default auth;
