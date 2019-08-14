const express = require("express");
const router = express.Router();

const UserService = require("../../services/UserService");
const JWTService = require("../../services/jwtService");

router.post("/login", (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  UserService.find(req.body.login)
    .then(user => {
      if (!user) throw new Error("User not found");
      if (!user.validPassword(req.body.password))
        throw new Error("Password is incorrect");
      var JWT = JWTService.generate({ id: user.id, role: user.role });
      if (user.tokens.length < 5) {
        var tokens = [...user.tokens, { token: JWT.refreshToken, ip }];
      } else {
        var tokens = [
          ...user.tokens.slice(-4),
          { token: JWT.refreshToken, ip }
        ];
      }
      return Promise.all([UserService.update({ tokens }, user.id), JWT]);
    })
    .then(data => {
      if (data[0][0] == 0) throw new Error("Tokens not updated");
      res.status(200).json(data[1]);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/refresh", (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  var decoded = JWTService.validate(req.body.token);

  UserService.get(decoded.id)
    .then(user => {
      if (!user) throw new Error("User not found");
      var founded = false;
      var tokens = user.tokens
        .map(item => {
          if (item.token === req.body.token) {
            founded = true;
            return null;
          }
          return item;
        })
        .filter(item => {
          return item !== null;
        });

      if (!founded) {
        throw new Error("JWT not founded");
      }

      if (!JWTService.validate(req.body.token)) {
        return UserService.update({ tokens }, user.id);
      }

      var JWT = JWTService.generate({ id: user.id, role: user.role });
      tokens = [...tokens, { token: JWT.refreshToken, ip }];
      return Promise.all([UserService.update({ tokens }, user.id), JWT]);
    })
    .then(data => {
      if (data.length !== 2) {
        if (data[0] === 0) throw new Error("JWT not updated: Token is invalid");
        else throw new Error("Token is invalid");
      }
      if (data[0][0] === 0) throw new Error("JWT not updated");
      res.status(200).json(data[1]);
    })
    .catch(err => {
      res.status(400).json(err.message);
    });
});

router.post("/register", (req, res) => {
  UserService.create(req.body)
    .then(data => {
      if (data[1]) res.sendStatus(201);
      else res.sendStatus(400);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/info", (req, res) => {
  UserService.find(req.body.login)
    .then(user => {
      if (!user) throw new Error("User not found");
      var initials = user.first_name[0] + user.last_name[0];
      res.status(200).json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        initials
      });
    })
    .catch(err => {
      res.status(400).json(err.message);
    });
});

router.post("/check", (req, res) => {
  UserService.find(req.body.login)
    .then(data => {
      if (data) throw new Error("User was found");
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/logout", (req, res) => {
  const user = JWTService.validate(req.body.token);
  UserService.get(user.id)
    .then(data => {
      if (!data) throw new Error("User not found");
      data.tokens.filter(item => {
        return item.token != req.body.token;
      });
      return UserService.update({ tokens: data.tokens }, user.id);
    })
    .then(data => {
      if (data[0] === 0) throw new Error("Token not removed");
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
