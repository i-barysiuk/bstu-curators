import axios from "axios";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.54:8011/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const curatorsGet = () => {
  return [
    {
      first_name: "Roberth",
      last_name: "Willson",
      f_name: null,
      initials: "RW",
      cathedra: "MS-3",
      phone: "123"
    },
    {
      first_name: "Bill",
      last_name: "Milligan",
      f_name: "Batskavich",
      initials: "BMB",
      cathedra: "ASOI-34",
      phone: "345"
    },
    {
      first_name: "Lora",
      last_name: "Coahen",
      f_name: "Batskavna",
      initials: "LCB",
      cathedra: "LOL-KEK",
      phone: "567"
    },
    {
      first_name: "Andrew",
      last_name: "Lincoln",
      f_name: "Zombievich",
      initials: "ALZ",
      cathedra: "CHEBUREK",
      phone: null
    },
    {
      first_name: "Danai",
      last_name: "Gurira",
      f_name: "Nigretosovna",
      initials: "DGN",
      cathedra: "SAS"
    },
    {
      first_name: "Chandler",
      last_name: "Riggs",
      f_name: "Pogib",
      initials: "CRP",
      cathedra: "PUP"
    }
  ];
};

export default curatorsGet;
