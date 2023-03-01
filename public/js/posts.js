const postBtn = document.getElementById('post')



const postForm = async (event) => {
    event.preventDefault()
    const title = document.getElementById('titleInput').value.trim()
    const description = document.getElementById('postInput').value.trim()


    if (title && description) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ 
                title, 
                post, 
                }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            document.location.replace('/post')
        } else {
            alert(response.statusText)
        }
    }
    else{
        alert("Title and Description required for post")
    }
}



const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('Failed to delete project');
        }
    }
};


document
    .getElementById('postForm')
    .addEventListener('submit', postFormHandler);

document
    .getElementById('postList')
    .addEventListener('click', delButtonHandler);