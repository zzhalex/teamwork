var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { generateJWT, decodeJWT } = require("../function/tokenCheck");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post("/signin", function (req, res) {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username: username } })
    .then(function (users) {
      if (!users) {
        res.send("Incorrect username");
      }
      if (!users.password === password) {
        res.send("Incorrect password.");
      }

      console.log("Get");
      const token = generateJWT(users);
      console.log(token);
      // const decodeToken = decodeJWT(token);
      // console.log(decodedToken.username,decodedToken.id)
      res.send(token);
    })
    .catch((err) => res.send(err));
});

router.get("/checkToken", function (req, res) {
  let token = req.headers.authorization;
  let user = decodeJWT(token).user;
  res.send(user);
});

module.exports = router;
