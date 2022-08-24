const { taskModel } = require("../models/taskDB");
const { body, validationResult } = require("express-validator");

module.exports.createTask = [
	//Checking for all the necessary fields required to create the Task
	body("startDateTime")
		.not()
		.isEmpty()
		.withMessage("Start Date Field is required"),
	body("title").not().isEmpty().withMessage("Title Field is required"),

	body("endDateTime")
		.not()
		.isEmpty()
		.withMessage("endDateTime Field is required"),
	body("priority").not().isEmpty().withMessage("Priority Field is required"),
	body("status").not().isEmpty().withMessage("Status Field is required"),

	async (req, res) => {
		//Validating for any errors in the request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Retrieving all the information from the body of request
		const { title, description, startDateTime, endDateTime, priority, status } =
			req.body;

		//creating a new Task
		const task = new taskModel({
			title: title,
			description: description,
			endDateTime: new Date(endDateTime),
			startDateTime: new Date(startDateTime),
			priority: priority,
			status: status,
		});

		//Saving it and based on the result sending the response
		task.save(function (err, value) {
			if (err) {
				return res.status(500).json({
					msg: "Internal Server error.",
				});
			} else {
				return res.status(200).json({
					msg: "Successfully, saved the data.",
					...value._doc,
				});
			}
		});
	},
];

module.exports.updateTask = [
	//Using the id I will update the document, and all the data that is to be updated is coming from data object
	body("id").not().isEmpty().withMessage("Task id Field is required"),
	body("data").not().isEmpty().withMessage("Data Field is required"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//Retrieving the data and the id from the request body
		const { id } = req.body;
		const { data } = req.body;

		//Updating the Task
		const taskN = await taskModel.findOneAndUpdate(
			{ _id: id },
			{ ...data },
			{ new: true }
		);

		//If the task is there then sending the new taskDetails else sending the other response
		if (taskN) {
			return res.status(200).json({
				msg: "Record Updated successfully",
				...taskN._doc,
			});
		} else {
			return res.status(401).json({
				msg: "No such record was found",
			});
		}
	},
];

module.exports.getAllTask = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	//Accessing the task model and getting all the documents
	const docs = await taskModel.find();
	return res.status(200).json({
		msg: "Request Completed Successfully",
		docs,
	});
};

module.exports.deleteTask = [
	//Using the id of the task will be deleting the task
	body("id").not().isEmpty().withMessage("Task id Field is required"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { id } = req.body;

		//Finding and deleting the document
		taskModel.findByIdAndDelete({ _id: id }, function (err, foundTask) {
			if (err) {
				//If there is an error
				return res.status(500).json({
					msg: "Unable to delete the record.",
				});
			} else {
				if (foundTask == null) {
					//If the id given doesnt exists in the Database
					return res.status(200).json({
						msg: "This record no longer exists.",
					});
				}
				//If there existed an record with given id and now its deleted
				return res.status(200).json({
					msg: "Record deleted successfully",
				});
			}
		});
	},
];

module.exports.getSingleTask = [
	//Checking for the id
	body("id").not().isEmpty().withMessage("Task id Field is required"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { id } = req.body;

		//Finding a document by its Id
		const doc = await taskModel.findById({ _id: id });

		//If we found a document with Id then sending the details of that Id in the responses
		if (doc) {
			return res.status(200).json({
				msg: "Your requested record is here",
				...doc._doc,
			});
		} else {
			//If we dont find a document with corresponsing Id
			return res.status(401).json({
				msg: "No such record exists.",
			});
		}
	},
];
