const jwt = require("jsonwebtoken");

exports.generateJWT = function (user) {
  const tokenData = { username: user.username, id: user.id };
  return jwt.sign({ user: tokenData }, "teamwork");
};

exports.decodeJWT = function (token) {
  return (decoded = jwt.verify(token, "teamwork",{expiresIn:600000}));
};
