const jwt = require("jsonwebtoken");
const { model } = require("../db/dbconnection");

 module.exports =  function(user) {
  const tokenData = { username: user.username, id: user.id };
  return jwt.sign({ user: tokenData }, "teamwork");
}

module.exports = function(){
    
}