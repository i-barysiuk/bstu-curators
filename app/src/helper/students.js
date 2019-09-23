import axios from "axios";

if (process.env.REACT_APP_ENV === "production")
  axios.defaults.baseURL = "http://185.66.71.54:8001/api/";
if (process.env.REACT_APP_ENV === "test")
  axios.defaults.baseURL = "http://185.66.71.54:8011/api/";
if (process.env.REACT_APP_ENV === "development")
  axios.defaults.baseURL = "http://localhost:8000/api/";

const studentsGet = () => {
  return [
    {
      first_name: "Roberth",
      last_name: "Willson",
      f_name: null,
      initials: "RW",
      group: "MS-3"
    },
    {
      first_name: "Bill",
      last_name: "Milligan",
      f_name: "Batskavich",
      initials: "BMB",
      group: "ASOI-34"
    },
    {
      first_name: "Lora",
      last_name: "Coahen",
      f_name: "Batskavna",
      initials: "LCB",
      group: "LOL-KEK"
    },
    {
      first_name: "Andrew",
      last_name: "Lincoln",
      f_name: "Zombievich",
      initials: "ALZ",
      group: "CHEBUREK"
    },
    {
      first_name: "Danai",
      last_name: "Gurira",
      f_name: "Nigretosovna",
      initials: "DGN",
      group: "SAS"
    },
    {
      first_name: "Chandler",
      last_name: "Riggs",
      f_name: "Pogib",
      initials: "CRP",
      group: "PUP"
    }
  ];
};

export default studentsGet;
