import axios from "axios";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "server/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "server_uat/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const auth = (url, method = "GET", data) => {
  console.log(process.env.NODE_ENV);
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
