async function signup() {
    const uid = document.getElementById("signup-uid").value;  // Get UID from the input field
    const password = document.getElementById("signup-password").value;

    const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, password }),  // Send both UID and password
    });

    if (response.ok) {
        const data = await response.json();
        alert(`Signup successful! Your UID: ${data.uid}`);
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
}


async function login() {
    const uid = document.getElementById("login-uid").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, password }),  // Send both UID and password
    });

    if (response.ok) {
        const data = await response.json();
        alert(`Login successful! Points: ${data.points}`);
        window.location.href = "/client"
        
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
}
