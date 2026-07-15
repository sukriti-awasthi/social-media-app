const API = "https://social-media-app-ay9i.onrender.com";

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch(API + "/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            alert("Login Successful");

            window.location = "feed.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        alert("Unable to connect to server.");

        console.log(error);

    }

}