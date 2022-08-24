const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	title: { type: String, required: [true] },
	description: { type: String },
	startDateTime: { type: Date, required: [true] },
	endDateTime: { type: Date, required: [true] },
	priority: { type: String, required: [true] },
	status: { type: String, required: [true] },
});

const taskModel = mongoose.model("tasks", taskSchema);

module.exports.taskSchema = taskSchema;
module.exports.taskModel = taskModel;
