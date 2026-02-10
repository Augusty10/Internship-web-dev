// ===============================
// REGISTER USER
// ===============================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("regUsername").value;
        const password = document.getElementById("regPassword").value;

        // Store user in LocalStorage (DEMO ONLY)
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        document.getElementById("message").textContent =
            "Registration successful! You can now login.";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}

// ===============================
// LOGIN USER
// ===============================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("message").textContent =
                "Invalid username or password";
        }
    });
}

// ===============================
// PROTECT DASHBOARD
// ===============================
if (window.location.pathname.includes("dashboard.html")) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "index.html";
    }
}

// ===============================
// LOGOUT
// ===============================
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}
