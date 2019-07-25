const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");

const UserController = require("./controllers/user/UserController");
const GroupController = require("./controllers/group/GroupController");

const UserService = require("./services/UserService");
const GroupService = require("./services/GroupService");

UserService.create({
  email: "admin@care.webdad.by",
  password: "admin",
  birthday: new Date("2019-01-01T00:00:00Z"),
  sex: "men",
  first_name: "Admin",
  last_name: "Adminov",
  phone: "+375331234567",
  isActive: true,
  role: "superAdmin"
});

GroupService.create({
  name: "TestName-0",
  userId: 1,
  faculty: 0,
  total: 10,
  gender:
  {
    "men": 5,
    "women": 5
  },
  comunity: 
  {
    "brsm": 3,
    "profcom": 4,
    "belrus": 5,
    "other": 6
  },
  family: 
  {
    "standart": 4,
    "many": 3,
    "incomplete": 2,
    "orphans": 1
  },
  geography: 
  {
    "local": 6,
    "nonresident": 3,
    "foreigners": 1
  },
  living: 
  {
    "parents": 1,
    "relatives": 2,
    "hostel": 3,
    "apartments": 4
  },
  others: "TEST"
});

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world\n");
});
app.get("/login", (req, res) => {
  var tokens = JWTService.generate({ id: 1, role: "admin" });
  var decode = JWTService.validate(tokens.accessToken);
  res.send({ tokens: tokens, decode: decode });
});

app.use("/api/users", UserController);
app.use("/api/group", GroupController);

module.exports = app;
