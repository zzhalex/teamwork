const express = require("express");
const router = express.Router();
const {
	getTasks,
	getTaskById,
	createTask,
	deleteTaskById
} = require("../controller/task")

/*Task API*/
router.get("/", function(req, res, next) {
	console.log("GET TASK")
	getTasks(req, res, next);
});

router.delete("/:id", function(req, res, next) {
	deleteTaskById(req, res, next)
});
router.post("/add", function(req, res, next) {
	createTask(req, res, next);
});

router.get("/:id", function(req, res, next) {
	console.log(req.params.id)
	getTaskById(req, res, next);
});

module.exports = router;