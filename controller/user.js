const db = require("../db/dbconnection");
const User = require("../models/user");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
	generateJWT,
	decodeJWT
} = require("../function/tokenCheck");

module.exports = {
	getUsers: function(req, res, next) {
		let token = req.headers.authorization;
		let user = decodeJWT(token).user;
		User.findAll()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => res.send(err));
	},
	getUserById: function(req, res, next) {
		let token = req.headers.authorization;
		let user = decodeJWT(token).user;
		User.findOne({
				where: {
					id: user.id,
				},
			})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => res.send(err));
	},
	addUser: function(req, res, next) {
		let {
			username,
			firstname,
			lastname,
			email,
			password
		} = req.body;
		User.create({
				username,
				firstname,
				lastname,
				email,
				password,
			})
			.then((users) => {
				const token = generateJWT(users);
				res.send(token);
			})
			.catch((err) => res.send(err));
	}

}