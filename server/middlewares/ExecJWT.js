const JWTService = require("../services/JWTService");

let execJWT = (req, res, next) => {
  let token = req.header("Authorization");
  if (token) {
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
    req.user = JWTService.validate(token);
  }
  next();
};

module.exports = execJWT;
