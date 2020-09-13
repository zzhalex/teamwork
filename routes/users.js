const express = require("express");
const router = express.Router();
const { getUsers, getUserById } = require("../controller/user");

const auth = require("./auth");
/* GET users listing. */
router.use(auth);

router.get("/all", function (req, res, next) {
  getUsers(req, res, next);
});

router.get("/info", function (req, res, next) {
  getUserById(req, res, next);
});

module.exports = router;
