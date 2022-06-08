//form handler for logging in

async function loginHandler(event) {
    event.preventDefault();

    const email = document.getElementById(/*ID value of EMAIL form*/).value.trim();
    const pw = document.getElementById(/*id for password */).value.trim();

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

    const email = document.getElementById(/* ID */).value.trim();
    const pw = document.getElementById(/* ID */).value.trim();
    const username = document.getElementById(/* ID */).value.trim();

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

document.querySelector(/* class or id for the form */).addEventListener('submit', loginHandler);
document.querySelector(/* class or id for the form */).addEventListener('submit', signupHandler);