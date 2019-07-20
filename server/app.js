const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

module.exports = app;
