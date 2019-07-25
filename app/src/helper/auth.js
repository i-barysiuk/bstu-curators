import axios from "axios";

if (process.env.NODE_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/auth";
if (process.env.NODE_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.58:8011/api/auth";
if (process.env.NODE_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/auth";

const auth = (url, method = "GET", data) => {
  switch (method) {
    case "GET":
      return axios.get(url);
    case "POST":
      return axios.post(url, data);
    default:
      return axios.get(url);
  }
};

export default auth;
