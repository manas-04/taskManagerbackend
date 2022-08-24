const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

//Controller where the logic of all the routes is stored
const taskController = require("../controller/taskController");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post(`/createTask`, urlencodedParser, taskController.createTask);
router.get(`/getAllTask`, urlencodedParser, taskController.getAllTask);
router.post("/updateTask", urlencodedParser, taskController.updateTask);
router.post("/deleteTask", urlencodedParser, taskController.deleteTask);
router.post(`/getSingleTask`, urlencodedParser, taskController.getSingleTask);

module.exports = router;
