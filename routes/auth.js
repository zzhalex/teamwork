const express = require("express");
const router = express.Router();

const { decodeJWT } = require("../function/tokenCheck");
const { mountpath } = require("../app");

router.use(function (req, res, next) {
  console.log("Auth");
  let token = req.headers.authorization;
  let user = decodeJWT(token).user;
  req.user = user;
  next();
});

module.exports = router;
