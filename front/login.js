const form = document.querySelector('.form');
let path = '/login';

document.getElementById('register').addEventListener('click', () => {
	path = '/register';
	document.getElementById('register').style.display = "none";
	document.getElementById('login').style.display = "block";
	document.getElementById('title').innerHTML = "Register";
	document.getElementsByClassName('submit-button')[0].innerHTML = "Register";
});

document.getElementById('login').addEventListener('click', () => {
	path = '/login';
	document.getElementById('login').style.display = "none";
	document.getElementById('register').style.display = "block";
	document.getElementById('title').innerHTML = "Login";
	document.getElementsByClassName('submit-button')[0].innerHTML = "Login";
});


form.addEventListener('submit', (e) => {
	e.preventDefault();

	fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: form.username.value,
			password: form.password.value
		})
	})
		.then(res => res.json())
		.then(data => {
			if (data.error) {
				document.getElementById('error').innerHTML = data.error;
				document.getElementById('error').style.display = "flex";
				document.getElementById('error').style.opacity = "1";
			} else {
				window.location.href = '/list';
			}
		})
});