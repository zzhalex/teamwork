const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  deleteTaskById,
} = require("../controller/task");

const auth = require("./auth");
/*Task API*/
router.use(auth);

router.get("/", function (req, res, next) {
  console.log("Get all tasks.");
  getTasks(req, res, next);
});

router.delete("/:id", function (req, res, next) {
  console.log("Delete task by id.");
  deleteTaskById(req, res, next);
});
router.post("/add", function (req, res, next) {
  console.log("Add task.");
  createTask(req, res, next);
});

router.get("/:id", function (req, res, next) {
  console.log("Get task by id.");
  getTaskById(req, res, next);
});

module.exports = router;
