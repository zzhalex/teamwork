const db = require("../db/dbconnection");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Task, User } = require("../models/taskuser");

module.exports = {
  getTasks: function (req, res, next) {
    let user = req.user;
    Task.findAndCountAll({
      where: {
        owner: user.id,
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
      offset: 0,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  },
  getTaskById: function (req, res, next) {
    let id = req.params.id;
    let userid = req.user.id;
    Task.findOne({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.eq]: id,
            },
          },
          {
            owner: {
              [Op.eq]: userid,
            },
          },
        ],
      },
    })
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  createTask: function (req, res, next) {
    let { name, description, partner, duedate } = req.body;
    let owner = req.user.id;
    console.log("Owner: " + owner);
    Task.create({
      name,
      description,
      owner,
      partner,
      duedate,
    })
      .then(async (task) => {
        let partnerArr = JSON.parse(partner);
        let users = await User.findAll({
          where: {
            id: partnerArr,
          },
        });
        console.log(users);
        await task.addUsers(users);
        res.status(200).json({
          message: "New task created!",
        });
      })
      .catch((err) => res.send(err));
  },
  deleteTaskById: function (req, res, next) {
    console.log("DELETE");
    let id = req.params.id;
    let userid = req.user.id;
    Task.destroy({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.eq]: id,
            },
          },
          {
            owner: {
              [Op.eq]: userid,
            },
          },
        ],
      },
    })
      .then((data) => {
        console.log(data);
        res.status(200).json({
          message: "The task is deleted!",
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
