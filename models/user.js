const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/dbconnection');


const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true 
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
    	isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING
  }
});

User.sync().then(() => {
  console.log('table created');``
});
module.exports = User;