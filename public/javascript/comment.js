//Function to handle the comment form

async function commentFormHandler (event) {
    event.preventDefault();

    //name =" " should be the name we have in our handlebars template for the form
    const text = document.querySelector('textarea[name="   "').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (text) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                text,
                post_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        }

        else {
            alert(response.statusText);
        }
    }
};

//Event listener
document.querySelector(/* our comment button */).addEventListener('submit', commentFormHandler);