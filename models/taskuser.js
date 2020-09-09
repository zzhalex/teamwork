const {
  Sequelize,
  DataTypes,
  Model
} = require("sequelize");
const db = require("../db/dbconnection");
const User = require("./user");
const Task = require("./task");
const {
  sequelize
} = require("./task");
const Taskusers = sequelize.define("taskuser", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  taskId: {
    type: DataTypes.INTEGER,
    references: {
      model: Task,
      key: "id",
    },
  },
});

User.belongsToMany(Task, {
  through: "taskusers",
  onDelete: 'cascade',
  hooks: true
});
Task.belongsToMany(User, {
  through: "taskusers",
  onDelete: 'cascade',
  hooks: true
});

Taskusers.sync({force:true}).then(() => {
  console.log("TaskUsers Created")
});

module.exports = {
  User,
  Task,
  Taskusers,
};