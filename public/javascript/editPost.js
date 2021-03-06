async function editPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    }

    else {
        alert(response.statusText);
    }
}

//Event listener

document.querySelector('.editPost-form').addEventListener('submit', editPostHandler);