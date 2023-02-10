const Task = require('../models/Task.js');

const createTask = async ({ task, description }) => {

	let id = 0;

	//create new task
	const newTask = new Task({
		task,
		description,
		id
	});
	
	//push to database
	console.log({task : newTask, message: 'Task added successfully'});
	return {task : newTask, message: 'Task added successfully'};
};

module.exports = (app) => {
	app.post('/addTask', async (req, res) => {
		const { task, description } = req.body;
		
		res.send(await createTask({task,description}));
	});
}