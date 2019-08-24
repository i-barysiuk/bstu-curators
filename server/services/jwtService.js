var jwt = require("jsonwebtoken");
var secret = "blasupersecretbla";

class JWTService {
  generate(data) {
    var accessToken = jwt.sign(
      {
        id: data.id,
        role: data.role
      },
      secret,
      { expiresIn: "15s" }
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
    try {
      var decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      return false;
    }
  }

  getInfo(token) {
    var err = jwt.decode(token, secret);
    return err;
  }
}

module.exports = new JWTService();
