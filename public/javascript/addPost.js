async function newPostHandler (event) {
    event.preventDefault();

    const title = document.querySelector('input[name"   "]').value;
    //maybe url or chart will see

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title
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

//Event listener

document.querySelector('.newPost-form').addEventListener('submit', newPostHandler);