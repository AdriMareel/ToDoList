const Task = require('../models/Task.js');

const createTask = async ({ task, description }) => {
	const newTask = new Task({ task, description });

	//push to database

	res.json({ message: 'Task saved', task : newTask});
};

module.exports = (app) => {
	app.post('/addTask', async (req, res) => {
		const { task, description } = req.body;
		
		return await createTask(req, res);
	});
}