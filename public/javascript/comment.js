//Function to handle the comment form

async function commentFormHandler (event) {
    event.preventDefault();

    
    const comment_text = document.querySelector('textarea[name="commentBody"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_text,
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
document.querySelector('.commentForm').addEventListener('submit', commentFormHandler);