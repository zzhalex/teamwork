var express = require("express");
var router = express.Router();

const db = require("../db/dbconnection");
// const Task = require("../models/task");

const { Taskusers, Task, User } = require("../models/taskuser");
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
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.delete("/{id}", function (req, res, next) {});
router.post("/add", function (req, res, next) {
  let { name, description, owner, partner, duedate } = req.body;
  Task.create({
    name,
    description,
    owner,
    partner,
    duedate,
  })
    .then(async (task) => {
      let partnerArr = JSON.parse(partner);
      console.log(partnerArr);
      //for(let i = 0; i<partnerArr.length;i++){
      let users = await User.findAll({
        where: {
          id: partnerArr,
        },
      });
      console.log(users);
      await task.addUsers(users);
      //}

      res.status(200).json({ message: "New task created!" });
    })
    .catch((err) => res.send(err));
});
module.exports = router;
