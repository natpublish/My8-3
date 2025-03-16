// Constants
const MAX_ATTEMPTS = 3;
const CORRECT_REFERRAL = "748675";

// Generate random username and password
function generateUsername() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let username = "user_";
    for (let i = 0; i < 5; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 7; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Check if device is blocked
function isDeviceBlocked() {
    return localStorage.getItem("isBlocked") === "true";
}

// Block device
function blockDevice() {
    localStorage.setItem("isBlocked", "true");
    alert("[SYSTEM ERROR] Perangkat Anda telah diblokir karena terlalu banyak percobaan yang salah!");
    window.location.href = "lobby.html";
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    console.log("Form submitted");

    if (isDeviceBlocked()) {
        alert("[SYSTEM ERROR] Perangkat Anda telah diblokir. Hubungi admin.");
        window.location.href = "lobby.html";
        return;
    }

    const referralCode = document.getElementById("referralCode").value;
    console.log("Referral code:", referralCode);

    if (referralCode !== CORRECT_REFERRAL) {
        attemptCount++;
        localStorage.setItem("attemptCount", attemptCount);

        const remainingAttempts = MAX_ATTEMPTS - attemptCount;
        const attemptCounter = document.getElementById("attemptCounter");
        if (attemptCounter) {
            attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`;
            attemptCounter.style.color = remainingAttempts === 1 ? '#ff0000' : '#ffff00';
        }

        if (attemptCount >= MAX_ATTEMPTS) {
            blockDevice();
            return;
        }

        const errorElement = document.getElementById("referralError");
        if (errorElement) {
            errorElement.textContent = `[ERROR] Kode referal salah! Sisa percobaan: ${remainingAttempts}`;
        }
        return;
    }

    // Collect form data
    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const nomorUrut = document.getElementById("nomorUrut").value;
    const citaCita = document.getElementById("citaCita").value;
    const email = document.getElementById("email").value;

    console.log("Form data collected:", { nama, kelas, nomorUrut, citaCita, email });

    // Generate username and password
    const username = nama.toLowerCase().replace(/\s+/g, "");
    const password = generatePassword();

    // Create new user object
    const newUser = {
        nama,
        kelas,
        nomorUrut,
        citaCita,
        email,
        username,
        password
    };

    // Save user to localStorage
    try {
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        users[username] = newUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        // Reset attempt count
        localStorage.setItem("attemptCount", "0");

        console.log("User saved successfully:", newUser);

        // Display success message
        const resultDiv = document.createElement("div");
        resultDiv.className = "success-message";
        resultDiv.innerHTML = `
            <h2>>>> Pendaftaran Berhasil! <<<</h2>
            <p>[*] Username: ${username}</p>
            <p>[*] Password: ${password}</p>
            <p style="color: #ffff00;">* PENTING: Catat informasi ini!</p>
            <button onclick="window.location.href='logged_in_lobby.html'">[ENTER] Masuk ke Lobby</button>
        `;
        document.body.innerHTML = "";
        document.body.appendChild(resultDiv);
    } catch (error) {
        console.error("Error saving user:", error);
        alert("[ERROR] Terjadi kesalahan saat menyimpan data!");
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username] && users[username].password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(users[username]));

        // Display success message with login info
        const resultDiv = document.createElement("div");
        resultDiv.className = "success-message";
        resultDiv.innerHTML = `
            <h2>Login Berhasil!</h2>
            <p>Selamat datang, ${users[username].nama}!</p>
            <p>Username: ${username}</p>
            <p>Password: ${password}</p>
            <button onclick="window.location.href='logged_in_lobby.html'">Masuk ke Lobby</button>
        `;
        document.body.innerHTML = "";
        document.body.appendChild(resultDiv);
    } else {
        // Display error message
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = "[ERROR] Username atau password salah!";

        const loginForm = document.getElementById("loginForm");
        const existingError = loginForm.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }
        loginForm.appendChild(errorMessage);
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    const remainingAttempts = MAX_ATTEMPTS - attemptCount;
    const attemptCounter = document.getElementById("attemptCounter");
    if (attemptCounter) {
        attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`;
        attemptCounter.style.color = remainingAttempts === 1 ? '#ff0000' : '#ffff00';
    }

    if (isDeviceBlocked()) {
        const forms = document.querySelectorAll("form");
        forms.forEach(form => {
            form.innerHTML = "<p class='blocked-message'>Perangkat Anda telah diblokir. Silakan hubungi admin.</p>";
        });
        return;
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "lobby.html";
        });
    }
});

// Prevent view source access
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    showWarning();
});

// Prevent keyboard shortcuts
document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
        showWarning();
    }
});

let warningCount = 0;

function showWarning() {
    warningCount++;
    if (warningCount === 1) {
        alert("Peringatan: Mengakses kode sumber tidak diperbolehkan. Silakan hentikan aktivitas ini.");
    } else if (warningCount === 2) {
        alert("Peringatan: Anda telah melanggar aturan ini dua kali. Akun Anda akan disuspend selama 19 hari.");
        suspendAccount();
    }
}

function suspendAccount() {
    localStorage.removeItem("loggedInUser");
    window.location.href = 'lobby.html';
}

// Initialize attempt count
let attemptCount = parseInt(localStorage.getItem("attemptCount") || "0");
  
