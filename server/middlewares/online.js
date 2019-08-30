const UserService = require("../services/UserService");
let onlineUpdate = (req, res, next) => {
  if (req.user === undefined) next();
  else if (req.user === false) next();
  else {
    UserService.update({ onlineAt: new Date() }, req.user.id);
    next();
  }
};

module.exports = onlineUpdate;
