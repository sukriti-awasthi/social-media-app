const API = "https://social-media-app-ay9i.onrender.com";

const token = localStorage.getItem("token");

if (!token) {

    window.location = "login.html";

}

async function loadProfile() {

    try {

        const response = await fetch(API + "/users/profile", {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        const user = await response.json();

        document.getElementById("username").innerText = user.username;

        document.getElementById("email").innerText = user.email;

        document.getElementById("bio").innerText = user.bio || "No bio";

        document.getElementById("followers").innerText =
            user.followers.length;

        document.getElementById("following").innerText =
            user.following.length;

    } catch (error) {

        console.log(error);

    }

}

function goFeed() {

    window.location = "feed.html";

}

loadProfile();