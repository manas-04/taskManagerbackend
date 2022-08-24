//Database user - MongoDB

const express = require("express");
const bodyParser = require("body-parser");
//To store all the links passwords etc.
require("dotenv").config();

//Creating a DB file to manage connectivity with the MongoDB
const db = require("./utils/db");

//Router that will manage all the tasks
const taskrouter = require("./routers/taskRouter");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(taskrouter);

//Default route
app.get("/", (req, res) => {
	res.send(`<h1>API Running on the port ${PORT}</h1>`);
});

db.then((connection) => {
	if (connection) {
		console.log("Server connected.");
		app.listen(PORT, function () {
			console.log("Server listening at port " + PORT);
		});
	}
}).catch((err) => {
	console.log(err);
});
