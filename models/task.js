const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db/dbconnection");

const Task = db.define("task", {
  name: { type: Sequelize.STRING, unique: true, allowNull: false },
  description: { type: Sequelize.STRING, unique: true },
  owner: { type: Sequelize.INTEGER, allowNull: false },
  partner: { type: Sequelize.STRING, allowNull: true },
  duedate: { type: DataTypes.DATE, allowNull: true },
  complete_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});


Task.sync().then(()=>{
    console.log("Task Created")
});

module.exports = Task;