var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { generateJWT, decodeJWT } = require("../function/tokenCheck");

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

router.get("/checkToken", function (req, res) {
  let token = req.headers.authorization;
  let user = decodeJWT(token).user;
  res.send(user);
});

module.exports = router;
