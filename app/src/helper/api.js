import axios from "axios";

if (process.env.NODE_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api";
if (process.env.NODE_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.58:8011/api";
if (process.env.NODE_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api";

const api = (url, method = "GET", data) => {
  switch (method) {
    case "GET":
      return axios.get(url);
    case "POST":
      return axios.post(url, data);
    case "PUT":
      return axios.put(url, data);
    case "DELETE":
      return axios.delete(url);
    case "PATCH":
      return axios.patch(url, data);
    case "OPTIONS":
      return axios.options(url);
    default:
      return axios.get(url);
  }
};
export default api;
