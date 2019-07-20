const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");

const UserController = require("./controllers/user/UserController");

const UserService = require("./services/UserService");

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

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.use("/api/users", UserController);

module.exports = app;
