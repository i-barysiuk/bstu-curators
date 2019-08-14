import axios from "axios";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.54:8011/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const healthMap = (type = "WEEK") => {
  return {
    byDays: [
      {
        period: "15.04.2019",
        respect: 5,
        nonrespect: 6,
        total: 11
      },
      {
        period: "16.04.2019",
        respect: 2,
        nonrespect: 4,
        total: 6
      },
      {
        period: "17.04.2019",
        respect: 4,
        nonrespect: 3,
        total: 7
      }
    ],
    byWeeks: [
      {
        period: 1,
        respect: 13,
        nonrespect: 11,
        total: 24
      },
      {
        period: 2,
        respect: 32,
        nonrespect: 14,
        total: 46
      },
      {
        period: 3,
        respect: 11,
        nonrespect: 15,
        total: 26
      }
    ],
    byMonths: [
      {
        period: 1,
        respect: 51,
        nonrespect: 38,
        total: 89
      },
      {
        period: 2,
        respect: 48,
        nonrespect: 32,
        total: 80
      },
      {
        period: 3,
        respect: 20,
        nonrespect: 24,
        total: 48
      },
      {
        period: 4,
        respect: 40,
        nonrespect: 38,
        total: 78
      }
    ],
    bySems: [
      {
        period: "I",
        respect: 102,
        nonrespect: 203,
        total: 305
      },
      {
        period: "II",
        respect: 301,
        nonrespect: 105,
        total: 406
      },
      {
        period: "III",
        respect: 223,
        nonrespect: 110,
        total: 333
      }
    ]
  };
};

export default healthMap;
