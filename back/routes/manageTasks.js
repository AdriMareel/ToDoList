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


const createTask = async ({ username, title, description, date }) => {

	let status = 'not started';
	let userId = await getUserId(username);

	//create new task object for mongo
	const Task = mongoose.model('tasks', taskSchema);
	const newTask = new Task({
		userId,
		title,
		description,
		status,
		date
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

const getTasks = async ({ username, date}) => {

	const User = mongoose.model('users', userSchema);
	let userId = await getUserId(username);

	return new Promise((resolve, reject) => {
		const Task = mongoose.model('tasks', taskSchema);

		//find all the tasks for the user
		Task.find({ userId : userId}, (err, taskList) => {
			if (err) {
				console.log(err);
				reject({ error : 'Error finding tasks'});
			}
			else if (!taskList || taskList.length == 0) {
				console.log('Tasks not found');
				reject({ error: 'Tasks not found' });
			}
			else{
				//check if the date is the same as the one requested
				taskSend = [];
				for(let i = 0; i < taskList.length; i++){
					console.log("db " + taskList[i].date.toLocaleDateString("fr-FR"));
					console.log("request " + date);

					console.log(taskList[i].date.toLocaleDateString("fr-FR") == date);
					if(taskList[i].date.toLocaleDateString("fr-FR") == date){
						taskSend.push(taskList[i]);
					}
				}
				if(taskSend.length == 0) reject({ error: 'Tasks not found for the date' });
				console.log(taskSend);
				resolve({taskList : taskSend, message : 'Tasks found successfully for the date'});
			}
		});
	});
}

module.exports = (app) => {
	app.post('/addTask', async (req, res) => {
		const { username, title, description, date } = req.body;
		res.send(await createTask({username, title, description, date}));
	});

	app.post('/getTasks', async (req, res) => {
		const { username, date} = req.body;
		res
			.send(await getTasks({username , date})
			.catch(err => {
				res.send(err);
			}));
	});
}