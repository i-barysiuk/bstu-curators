import axios from "axios";

if (process.env.NODE_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/auth";
if (process.env.NODE_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.58:8011/api/auth";
if (process.env.NODE_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/auth";

 const auth = (url, method = "GET", data) => {
  var accessToken = localStorage.getItem("accessToken");
  var refreshToken = localStorage.getItem("refreshToken");
  var expires_in = localStorage.getItem("expires_in");
  var time = parseInt(new Date().getTime() / 1000);

  if (time > expires_in) {
    await axios.post("/refresh", { token: refreshToken })
    .then(res => {
      localStorage.setItem("accessToken", res.data.accessToken);
      accessToken = res.data.accessToken;
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("expires_in", res.data.expires_in);
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
    default:
      return axios.get(url, config);
  }
};

export default auth;
