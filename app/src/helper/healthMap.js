import axios from "axios";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.54:8011/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const healthMap = () => {
  return {
    byDays: [
      {
        period: "15.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "16.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "17.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "18.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "19.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "20.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "21.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "22.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "23.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      },
      {
        period: "24.04.2019",
        respect: Math.random() * 40,
        nonrespect: Math.random() * 40,
        total: Math.random() * 40
      }
    ],
    byWeeks: [
      {
        period: 1,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 2,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 3,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 4,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 5,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 6,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 7,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      },
      {
        period: 8,
        respect: Math.random() * 400,
        nonrespect: Math.random() * 400,
        total: Math.random() * 400
      }
    ],
    byMonths: [
      {
        period: 1,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 2,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 3,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 4,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 5,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 6,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 7,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 8,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 9,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 10,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 11,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      },
      {
        period: 12,
        respect: Math.random() * 800,
        nonrespect: Math.random() * 800,
        total: Math.random() * 800
      }
    ],
    bySems: [
      {
        period: "I",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "II",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "III",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "IV",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "V",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "VI",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "VII",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "VIII",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "IX",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      },
      {
        period: "X",
        respect: Math.random() * 2000,
        nonrespect: Math.random() * 2000,
        total: Math.random() * 2000
      }
    ]
  };
};

export default healthMap;
