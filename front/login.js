const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('/login', {
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