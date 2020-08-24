var express = require("express");
var router = express.Router();

const db = require("../db/dbconnection");
const User = require("../models/user");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { generateJWT, decodeJWT } = require("../function/tokenCheck");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.post("/add", function (req, res, next) {
  let { username, firstname, lastname, email, password } = req.body;
  let errors = [];

  // Validate Fields
  if (!username) {
    errors.push({ text: "Please add username" });
  }
  if (!firstname) {
    errors.push({ text: "Please add firstname" });
  }
  if (!lastname) {
    errors.push({ text: "Please add lastname" });
  }
  if (!email) {
    errors.push({ text: "Please add email" });
  }
  if (!password) {
    errors.push({ text: "Please add password" });
  }

  User.create({
    username,
    firstname,
    lastname,
    email,
    password,
  })
    .then((users) => {
      const token = generateJWT(users);
      console.log(token);
      // const decodeToken = decodeJWT(token);
      // console.log(decodedToken.username,decodedToken.id)
      res.send(token);
    })
    .catch((err) => res.send(err));
});

router.get("/info", function (req, res) {
  let token = req.headers.authorization;
  let user = decodeJWT(token).user;
  User.findOne({
    where: {
      id: user.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
