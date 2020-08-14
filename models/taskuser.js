const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db/dbconnection");
const User = require("./user");
const Task = require("./task");
const { sequelize } = require("./task");
const Taskusers = sequelize.define("TaskUsers", {
  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  taskid: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: "id",
    },
  },
});

User.belongsToMany(Task, { through: "taskusers" });
Task.belongsToMany(User, { through: "taskusers" });

module.exports = {
  User,
  Task,
  Taskusers,
};
