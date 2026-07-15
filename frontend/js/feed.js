const API = "https://social-media-app-ay9i.onrender.com";
const token = localStorage.getItem("token");

if (!token) {
    window.location = "login.html";
}

// Load all posts
async function loadPosts() {

    const response = await fetch(API + "/posts");
    const posts = await response.json();

    let html = "";

    posts.forEach(post => {

        html += `
        <div class="card">

            <h3>${post.user.username}</h3>

            <p>${post.content}</p>

            <p>❤️ ${post.likes.length} Likes</p>

            <button onclick="likePost('${post._id}')">
                Like
            </button>

            <button onclick="deletePost('${post._id}')">
                Delete
            </button>

            <br><br>

            <input
                type="text"
                id="comment-${post._id}"
                placeholder="Write a comment">

            <button onclick="addComment('${post._id}')">
                Comment
            </button>

        </div>
        `;
    });

    document.getElementById("posts").innerHTML = html;
}

// Create Post
async function createPost() {

    const content = document.getElementById("content").value;

    if (content.trim() === "") {
        alert("Write something.");
        return;
    }

    await fetch(API + "/posts", {

        method: "POST",

        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            content
        })

    });

    document.getElementById("content").value = "";

    loadPosts();

}

// Like
async function likePost(id) {

    await fetch(API + "/posts/" + id + "/like", {

        method: "POST",

        headers: {
            Authorization: "Bearer " + token
        }

    });

    loadPosts();

}

// Delete
async function deletePost(id) {

    await fetch(API + "/posts/" + id, {

        method: "DELETE",

        headers: {
            Authorization: "Bearer " + token
        }

    });

    loadPosts();

}

// Add Comment
async function addComment(id) {

    const text = document.getElementById("comment-" + id).value;

    if (text.trim() === "") {
        return;
    }

    await fetch(API + "/posts/" + id + "/comment", {

        method: "POST",

        headers: {

            Authorization: "Bearer " + token,

            "Content-Type": "application/json"

        },

        body: JSON.stringify({
            text
        })

    });

    alert("Comment Added");

    document.getElementById("comment-" + id).value = "";

}

// Logout
function logout() {

    localStorage.removeItem("token");

    window.location = "login.html";

}

loadPosts();