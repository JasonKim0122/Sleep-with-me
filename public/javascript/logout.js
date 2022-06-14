async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    }

    else {
        alert(response.statusText);
    }
}

//Event listener
document.querySelector('#logout-btn').addEventListener('click', logout);