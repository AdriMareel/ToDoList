//make a post request to the server
//to add a new task
function addTask() {

	//prevent the form from submitting
	event.preventDefault();

	//get the task from the input
	let task = document.querySelector('input[name="task"]').value;
	let description = document.querySelector('input[name="description"]').value;

	//make a post request to the server
	fetch('/addTask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			task: task,
			description: description
		})
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			updateViewTaskList(data.task);
		})
}

function updateViewTaskList(task){
	//add the task to the view
	document.getElementById('taskList').innerHTML += '<li class="task"><h3>' + task.title + "</h3><p>" + task.description + '</p></li>';

	//remove the values from inputs
	document.querySelector('input[name="task"]').value = '';
	document.querySelector('input[name="description"]').value = '';
}