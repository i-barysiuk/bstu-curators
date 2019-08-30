let isAuth = (req, res, next) => {
  if (req.user === undefined)
    res.status(401).json({ status: "error", message: "Token is not defined" });
  else if (req.user === false)
    res.status(401).json({ status: "error", message: "Token is not valid" });
  else if (!req.user.role)
    res
      .status(400)
      .json({ status: "error", message: "Acсess token requiered" });
  else next();
};

module.exports = isAuth;
