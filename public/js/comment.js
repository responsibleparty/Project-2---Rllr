document.querySelector('.postAndComment').addEventListener('click', async (e) => {
    e.preventDefault();
    const element = e.target;
    if (element.matches('.commentButton')) {
        const postDetail = await fetch(`/api/posts/${element.dataset.postid}`, {
            method: 'GET'
        }).then(data => data.json())
        const currentPost = document.querySelector('.post-details');
        currentPost.textContent = postDetail.description;
        currentPost.setAttribute('data-currentpost', element.dataset.postid)
    }

    if (element.matches('.delComment')) {
        const commentID = element.dataset.commentid;
        console.log(commentID)
        const response = await fetch(`/api/comments/${commentID}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to delete comment')
        }
    }
})


document.querySelector('#addCommentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.querySelector('#commentContent').value.trim();
    const post_id = document.querySelector('.post-details').dataset.currentpost;

    if (description) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                description,
                post_id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log(description)
        // console.log(post_id)
        // console.log(response)
        if (response.ok) {
            document.location.replace('/')

        } else {
            alert('Failed to create project')
        }
    }
})