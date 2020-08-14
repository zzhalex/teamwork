var express = require("express");
var router = express.Router();

const db = require("../db/dbconnection");
// const Task = require("../models/task");

const { TaskUsers, Task, User } = require("../models/taskuser");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { generateJWT, decodeJWT } = require("../function/tokenCheck");

/*Task API*/
router.get("/", function (req, res, next) {
  let token = req.headers.authorization;
  let user = decodeJWT(token).user;
  console.log(user.username, user.id);
  Task.findAll({
    where: {
      owner: user.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.post("/add", function (req, res, next) {
  let { name, description, owner, partner, duedate } = req.body;
  Task.create({
    name,
    description,
    owner,
    partner,
    duedate,
  })
    .then(() => res.status(200).json({ message: "New task created!" }))
    .catch((err) => res.send(err));
});
module.exports = router;
