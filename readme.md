For creating the frontEnd of the website I have used ExpressJs,NodeJs and for the Database I have used MongoDB.

API endpoints -

/createtask which creates and adds a new task in the Database, its post request which requires title, startDateTime, endDateTime, Priority, Status in the body

/getAllTasks which is a get request to retrieve all the data of Tasks from the database.

/updateTask which requires id of the document to be updated and data its which contains the value to be updated

/deleteTask which deletes a record from the Database if it finds the id send by the user from the frontend

/getSingleTask gives you a single record based upon the id you send.

Link of the deployed Backend : https://task-manager-backend-04.herokuapp.com/
