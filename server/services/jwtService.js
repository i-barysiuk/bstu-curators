var jwt = require("jsonwebtoken");
var secret = "blasupersecretbla";

class JWTService {
  generate(data) {
    var accessToken = jwt.sign(
      {
        id: data.id,
        roles: data.role
      },
      secret,
      { expiresIn: "1h" }
    );
    var refreshToken = jwt.sign(
      {
        id: data.id
      },
      secret,
      { expiresIn: "3d" }
    );
    return {
      accessToken,
      refreshToken,
      expires_in: jwt.decode(accessToken).exp
    };
  }

  validate(token) {
    var err = jwt.verify(token, secret);
    return err;
  }
}

module.exports = new JWTService();
