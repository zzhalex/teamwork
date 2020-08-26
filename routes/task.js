const express = require("express");
const router = express.Router();
const {
	getTasks,
	getTaskById,
	createTask
} = require("../controller/task")

/*Task API*/
router.get("/", function(req, res, next) {
	getTasks(req, res, next);
});

router.delete("/{id}", function(req, res, next) {});
router.post("/add", function(req, res, next) {
	createTask(req, res, next);
});

router.get("/:id", function(req, res, next) {
	console.log(req.params.id)
	getTaskById(req, res, next);
});

module.exports = router;