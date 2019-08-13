const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");

const ExecJWT = require("./middlewares/ExecJWT");
const isAuth = require("./middlewares/isAuth");
const onlineUpdate = require("./middlewares/online");

const AuthController = require("./controllers/auth/AuthController");
const UserController = require("./controllers/user/UserController");
const GroupController = require("./controllers/group/GroupController");

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
app.use(ExecJWT);
app.use(onlineUpdate);

app.get("/", (req, res) => {
  res.send(req.user);
});

app.use("/api/auth", AuthController);
app.use("/api/users", isAuth, UserController);
app.use("/api/groups", GroupController);

module.exports = app;
