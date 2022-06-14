//form handler for logging in

async function loginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#emailLoginId').value.trim();
    const password = document.querySelector('#passwordLoginId').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }

        else {
            alert(response.statusText);
        }
    }
};

//form handler for signing up

async function signupHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#emailSignId').value.trim();
    const password = document.querySelector('#passwordSignId').value.trim();
    const username = document.querySelector('#usernameSignId').value.trim();

    if (email && password && username) {
        const response = fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                username
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        }

        else {
            alert(response.statusText)
        }
    }
};

//Event Listeners

document.querySelector('.loginForm').addEventListener('submit', loginHandler);
document.querySelector('.signupForm').addEventListener('submit', signupHandler);