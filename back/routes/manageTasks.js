const { default: mongoose } = require('mongoose');
const taskSchema = require('../models/Task.js');
const userSchema = require('../models/User.js');

const getUserId = async (username) => {
	//get user id from database
	const User = mongoose.model('users', userSchema);
	let userId;

	User.findOne({ username : username }, (err, user) => {
		if (err) {
			console.log(err);
			return { error : 'Error finding user' };
		}
		if (!user) {
			console.log('User not found');
			return { error: 'User not found' };
		}
		userId = user._id;
	});
	return userId;
}


const createTask = async ({ username, title, description }) => {

	let status = 'not started';
	let userId = await getUserId(username);

	//create new task object for mongo
	const Task = mongoose.model('tasks', taskSchema);
	const newTask = new Task({
		userId,
		title,
		description,
		status
	});

	
	
	//push to database
	newTask.save((err, task) => {
		if (err) {
			console.log(err);
			return { error: 'Error saving task' };
		}
	});

	console.log({task : newTask, message: 'Task added successfully'});
	return {task : newTask, message: 'Task added successfully'};
};

const getTasks = async ({ username }) => {

	const User = mongoose.model('users', userSchema);
	let userId = await getUserId(username);

	return new Promise((resolve, reject) => {
		const Task = mongoose.model('tasks', taskSchema);
		Task.find({ userId : userId }, (err, taskList) => {
			if (err) {
				console.log(err);
				reject({ error : 'Error finding tasks'});
			}
			if (!taskList) {
				console.log('Tasks not found');
				reject({ error: 'Tasks not found' });
			}
			resolve({taskList : taskList, message : 'Tasks found successfully'});
		});
	});
}

module.exports = (app) => {
	app.post('/addTask', async (req, res) => {
		const { username, title, description } = req.body;
		
		res.send(await createTask({username, title, description}));
	});

	app.post('/getTasks', async (req, res) => {
		const { username } = req.body;
		res.send(await getTasks({username}));
	});
}