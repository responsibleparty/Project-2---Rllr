const newPostHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post_name').value.trim()
    const description = document.querySelector('#post_description').value.trim()

    if (name && description) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to create project')
        }
    }
}

document.querySelector('#add-post').addEventListener('submit', newPostHandler);





const editPost = async (event) => {
    const element = event.target;
    // DEL
    if (element.matches('button.delPostBtn')) {
        const postID = element.dataset.postid;

        const response = await fetch(`/api/posts/${postID}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to delete project')
        }

    }
    // UPDATE
    if (element.matches('button.editPostBtn')) {
        const postID = element.dataset.postid;
        const currentPost = await fetch(`/api/posts/${postID}`, {
            method: 'GET'
        }).then(data => data.json()).then((data) => {
            document.querySelector('#edit_post_name').value = data.name;
            document.querySelector('#edit_post_description').value = data.description;
            document.querySelector('#editPostForm').setAttribute('data-postid', postID);
        })


    }
}

document.querySelector('.post-grid').addEventListener('click', editPost);

document
    .querySelector('#editPostForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        const postID = document.querySelector('#editPostForm').dataset.postid;
        const name = document.querySelector('#edit_post_name').value.trim();
        const description = document.querySelector('#edit_post_description').value.trim();
        const date_created = new Date();
        const updatePost = await fetch(`/api/posts/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                description,
                date_created
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (updatePost.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('failed to update')
        }
    })