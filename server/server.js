var sequelize = require("./db");
const app = require("./app");
const PORT = 8000;
const HOST = "0.0.0.0";

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

server = app.listen(PORT, err => {
  if (err) console.error(err);
});
server.setTimeout(5000000);
console.log(`Running on http://${HOST}:${PORT}`);
