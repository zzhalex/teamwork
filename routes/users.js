var express = require("express");
var router = express.Router();

const db = require("../db/dbconnection");
const User = require("../models/user");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  generateJWT,
  decodeJWT
} = require("../function/tokenCheck");

const {
  getUsers,
  getUserById,
  addUser
} = require("../controller/user")
/* GET users listing. */
router.get("/all", function(req, res, next) {
  getUsers(req, res, next);
});

router.post("/add", function(req, res, next) {
  let {
    username,
    firstname,
    lastname,
    email,
    password
  } = req.body;
  let errors = [];

  // Validate Fields
  if (!username) {
    errors.push({
      text: "Please add username"
    });
  }
  if (!firstname) {
    errors.push({
      text: "Please add firstname"
    });
  }
  if (!lastname) {
    errors.push({
      text: "Please add lastname"
    });
  }
  if (!email) {
    errors.push({
      text: "Please add email"
    });
  }
  if (!password) {
    errors.push({
      text: "Please add password"
    });
  }
  addUser(req, res, next);
});

router.get("/info", function(req, res, next) {
  getUserById(req, res, next);
});

module.exports = router;