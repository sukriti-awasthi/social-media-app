const API = "http://localhost:5000/api";

async function signup() {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(API + "/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            email,
            password
        })

    });

    const data = await response.json();

    if (response.ok) {

        alert("Registration Successful");

        window.location = "login.html";

    } else {

        alert(data.message);

    }

}