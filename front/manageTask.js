//make a post request to the server
//to add a new task
function addTask() {

	//prevent the form from submitting
	event.preventDefault();

	//get the task from the input
	let username = document.cookie.split('=')[1];
	let title = document.querySelector('input[name="title"]').value;
	let description = document.querySelector('input[name="description"]').value;
	let date = new Date(document.querySelector('input[name="date"]').value);

	//check if the title or description is empty
	if (title == '' || description == '') {
		//make the input border red
		if(title == '') document.querySelector('input[name="title"]').parentNode.style.border.bottom = '1px solid red';
		console.log("title is empty");
		return;
	}

	//make a post request to the server
	fetch('/addTask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username : username,
			title: title,
			description: description
		})
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			updateViewTaskList(data.task);
		})
}

//update the task list for a specific day if a new task is added or deleted
function updateViewTaskList(task){

	let username = document.cookie.split('=')[1];
	let taskList;

	fetch('/getTasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username : username,
		})
	})	
		.then(res => res.json())
		.then(data => {
			console.log(data);
			taskList = data.taskList;

			taskList.forEach(task => {
				document.getElementById('taskList').innerHTML += '<li class="task"><h3 class="title-task">' + task.title + "</h3><p class='description'>" + task.description + '</p></li>';
			});
		
			//remove the values from inputs
			document.querySelector('input[name="title"]').value = '';
			document.querySelector('input[name="description"]').value = '';
			document.querySelector('input[name="date"]').value = '';
		})
}

//display the task adder form or remove it 
function displayTaskAdder(param){
	console.log("displayTaskAdder runned");
	if (param == 'show'){
		document.getElementById('taskAdder').style.display = 'flex';
		document.getElementById('app').style.filter = "blur(20px)";
	}
	else if (param == 'hide'){
		document.getElementById('taskAdder').style.display = 'none';
		document.getElementById('app').style.filter = "blur(0px)";
	}
}
displayTaskAdder('hide');

//listeners for displaying the task adder form
document.getElementById('taskAddButton').addEventListener('click', () => displayTaskAdder('show'));
document.getElementById('addTaskCancel').addEventListener('click', () => displayTaskAdder('hide'));

updateViewTaskList();