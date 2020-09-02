const db = require("../db/dbconnection");
// const Task = require("../models/task");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
	Taskusers,
	Task,
	User
} = require("../models/taskuser");

const {
	generateJWT,
	decodeJWT
} = require("../function/tokenCheck");

module.exports = {
	getTasks: function(req, res, next) {
		console.log("HERE WE GO")
		let token = req.headers.authorization;
		console.log(token)
		let user = decodeJWT(token).user;
		console.log(user)
		Task.findAndCountAll({
				where: {
					owner: user.id,
				},
				order: [
					["createdAt", "DESC"]
				],
				limit: 12,
				offset: 0,
			})
			.then((data) => {
				res.send(data);
			})
			.catch((err) => res.send(err));
	},
	getTaskById: function(req, res, next) {
		let id = req.params.id;
		console.log("ID:" + id);
		Task.findOne({
				where: {
					id: id,
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
	createTask: function(req, res, next) {
		let {
			name,
			description,
			owner,
			partner,
			duedate
		} = req.body;
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
					message: "New task created!"
				});
			})
			.catch((err) => res.send(err));
	},
	deleteTaskById: function(req, res, next) {
		let id = req.params.id;
		let token = req.headers.authorization;
		let user = decodeJWT(token);
		Task.destroy({
				where: {
					id: id,
				},
				include: [{
						model: taskusers,
						where: {
							taskId: id
						}

					}

				]
			})
			.then((data) => {
				console.log(data);
				res.status(200).json({
					message: "The task is deleted!"
				});
			})
			.catch((err) => {
				res.send(err);
			});
	}
};