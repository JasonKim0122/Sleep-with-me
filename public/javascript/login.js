//form handler for logging in

async function loginHandler(event) {
    event.preventDefault();

    const email = document.getElementById('emailLoginId').value.trim();
    const pw = document.getElementById('passwordLoginId').value.trim();

    if (email && pw) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                pw
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

    const email = document.getElementById('emailSignId').value.trim();
    const pw = document.getElementById('passwordSignId').value.trim();
    const username = document.getElementById('usernameSignId').value.trim();

    if (email && pw && username) {
        const response = fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                pw,
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