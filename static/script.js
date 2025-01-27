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
        window.location.href = "/client"
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

document.addEventListener("DOMContentLoaded", function () {
    const switchModeButtonSun = document.getElementById("switch-sun");
    const switchModeButtonMoon = document.getElementById("switch-moon");
    switchModeButtonSun.addEventListener("click", function () {
        document.documentElement.removeAttribute("data-theme");
    });
    switchModeButtonMoon.addEventListener("click", function () {
        document.documentElement.setAttribute("data-theme", "dark");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check if the user has already responded to the cookie consent
    const cookieConsent = localStorage.getItem("cookieConsent");

    if (!cookieConsent) {
        document.getElementById("cookie-banner").style.display = "block";
    }

    // Show or hide login and other features based on consent
    if (cookieConsent === "declined") {
        alert("You have declined cookies. Limited features may be available.");
    }
});

function acceptCookies() {
    localStorage.setItem("cookieConsent", "accepted");
    document.getElementById("cookie-banner").style.display = "none";
}

function declineCookies() {
    localStorage.setItem("cookieConsent", "declined");
    document.getElementById("cookie-banner").style.display = "none";
    alert("You have declined cookies. Session-based features will not be available.");
}
