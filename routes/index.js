var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { generateJWT, decodeJWT } = require("../function/tokenCheck");
const { addUser } = require("../controller/user");

router.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username: username } })
    .then(function (users) {
      if (!users) {
        res.send("Incorrect username");
      }
      if (!users.password === password) {
        res.send("Incorrect password.");
      }
      const token = generateJWT(users);
      res.send(token);
    })
    .catch((err) => res.send(err));
});

router.post("/signup", function (req, res, next) {
  let { username, firstname, lastname, email, password } = req.body;
  let errors = [];

  // Validate Fields
  if (!username) {
    errors.push({
      text: "Please add username",
    });
  }
  if (!firstname) {
    errors.push({
      text: "Please add firstname",
    });
  }
  if (!lastname) {
    errors.push({
      text: "Please add lastname",
    });
  }
  if (!email) {
    errors.push({
      text: "Please add email",
    });
  }
  if (!password) {
    errors.push({
      text: "Please add password",
    });
  }
  addUser(req, res, next);
});

router.get("/checkToken", function (req, res) {
  let token = req.headers.authorization;
  let user = decodeJWT(token).user;
  res.send(user);
});

module.exports = router;
