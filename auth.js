// Generate username dan password random
function generateUsername() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let username = "user_"
    for (let i = 0; i < 5; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return username
}

function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let password = ""
    for (let i = 0; i < 7; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
}

// Function untuk handle registrasi
function handleRegister(event) {
    event.preventDefault()

    // Cek kode referal
    const referralCode = document.getElementById("referralCode").value
    if (referralCode !== CORRECT_REFERRAL) {
        attemptCount++
        localStorage.setItem("attemptCount", attemptCount)
        
        const remainingAttempts = MAX_ATTEMPTS - attemptCount
        document.getElementById("attemptCounter").textContent = 
            `Sisa Percobaan: ${remainingAttempts}`
        
        if (attemptCount >= MAX_ATTEMPTS) {
            localStorage.setItem("isBlocked", "true")
            alert("[SYSTEM ERROR] Perangkat Anda telah diblokir karena terlalu banyak percobaan yang salah!")
            window.location.href = "lobby.html"
            return
        }
        
        document.getElementById("referralError").textContent = 
            `[ERROR] Kode referal salah! Sisa percobaan: ${remainingAttempts}`
        return
    }

    // Ambil data form
    const nama = document.getElementById("nama").value
    const kelas = document.getElementById("kelas").value
    const nomorUrut = document.getElementById("nomorUrut").value
    const citaCita = document.getElementById("citaCita").value
    const email = document.getElementById("email").value

    // Generate kredensial
    const username = generateUsername()
    const password = generatePassword()

    // Simpan user
    const newUser = {
        nama,
        kelas,
        nomorUrut,
        citaCita,
        email,
        username,
        password
    }

    try {
        const users = JSON.parse(localStorage.getItem("users") || "{}")
        users[username] = newUser
        localStorage.setItem("users", JSON.stringify(users))
        
        // Reset attempt count
        localStorage.setItem("attemptCount", "0")

    // Tampilkan kredensial
    alert(`
    >>> PENDAFTARAN BERHASIL! <<<
    
    [*] Username: ${username}
    [*] Password: ${password}
    
    * PENTING: Screenshot atau catat informasi ini!
    `)

        // Redirect ke halaman login
        window.location.href = "login.html"
    } catch (error) {
        console.error("Error saving user:", error)
        alert("[ERROR] Terjadi kesalahan saat menyimpan data!")
    }
}

// Function untuk handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const user = users[username];

    if (user && user.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigateWithTransition("logged_in_lobby.html"); // Gunakan fungsi transisi
    } else {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent = "[ERROR] Username atau password salah!";
        
        const loginForm = document.getElementById("loginForm");
        const existingError = loginForm.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }
        loginForm.appendChild(errorElement);
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Cek apakah device diblokir
    if (localStorage.getItem("isBlocked") === "true") {
        const forms = document.querySelectorAll("form")
        forms.forEach(form => {
            form.innerHTML = "<p class='blocked-message'>Perangkat Anda telah diblokir. Silakan hubungi admin.</p>"
        })
        return
    }

    // Update counter percobaan untuk halaman register
    const attemptCounter = document.getElementById("attemptCounter")
    if (attemptCounter) {
        const remainingAttempts = MAX_ATTEMPTS - attemptCount
        attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`
    }

    // Pasang event listeners
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister)
    }

    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin)
    }
})

// Function untuk cek device blocked
function isDeviceBlocked() {
    return localStorage.getItem("isBlocked") === "true"
}

// Function untuk block device
function blockDevice() {
    localStorage.setItem("isBlocked", "true")
    alert("[SYSTEM ERROR] Perangkat Anda telah diblokir karena terlalu banyak percobaan yang salah!")
    window.location.href = "lobby.html"
}

// Function untuk handle registrasi
function handleRegister(event) {
    event.preventDefault()
    console.log("Form submitted") // Debug log

    if (isDeviceBlocked()) {
        alert("[SYSTEM ERROR] Perangkat Anda telah diblokir. Hubungi admin.")
        window.location.href = "lobby.html"
        return
    }

    const referralCode = document.getElementById("referralCode").value
    console.log("Referral code:", referralCode) // Debug log

    if (referralCode !== CORRECT_REFERRAL) {
        attemptCount++
        localStorage.setItem("attemptCount", attemptCount)
        
        const remainingAttempts = MAX_ATTEMPTS - attemptCount
        const attemptCounter = document.getElementById("attemptCounter")
        if (attemptCounter) {
            attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`
            attemptCounter.style.color = remainingAttempts === 1 ? '#ff0000' : '#ffff00'
        }
        
        if (attemptCount >= MAX_ATTEMPTS) {
            blockDevice()
            return
        }
        
        const errorElement = document.getElementById("referralError")
        if (errorElement) {
            errorElement.textContent = `[ERROR] Kode referal salah! Sisa percobaan: ${remainingAttempts}`
        }
        return
    }

    // Ambil data form
    const nama = document.getElementById("nama").value
    const kelas = document.getElementById("kelas").value
    const nomorUrut = document.getElementById("nomorUrut").value
    const citaCita = document.getElementById("citaCita").value
    const email = document.getElementById("email").value

    console.log("Form data collected:", { nama, kelas, nomorUrut, citaCita, email }) // Debug log

    // Generate username dan password
    const username = nama.toLowerCase().replace(/\s+/g, "")
    const password = generatePassword()

    // Buat objek user baru
    const newUser = {
        nama,
        kelas,
        nomorUrut,
        citaCita,
        email,
        username,
        password
    }

    // Simpan ke localStorage
    try {
        const users = JSON.parse(localStorage.getItem("users") || "{}")
        users[username] = newUser
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("loggedInUser", JSON.stringify(newUser))
        
        // Reset attempt count
        localStorage.setItem("attemptCount", "0")

        console.log("User saved successfully:", newUser) // Debug log

        // Tampilkan pesan sukses
        const resultDiv = document.createElement("div")
        resultDiv.className = "success-message"
        resultDiv.innerHTML = `
            <h2>>>> Pendaftaran Berhasil! <<<</h2>
            <p>[*] Username: ${username}</p>
            <p>[*] Password: ${password}</p>
            <p style="color: #ffff00;">* PENTING: Catat informasi ini!</p>
            <button onclick="window.location.href='logged_in_lobby.html'">[ENTER] Masuk ke Lobby</button>
        `
        document.body.innerHTML = ""
        document.body.appendChild(resultDiv)
    } catch (error) {
        console.error("Error saving user:", error) // Debug log
        alert("[ERROR] Terjadi kesalahan saat menyimpan data!")
    }
}

// Function untuk handle login
function handleLogin(event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    const user = users[username]

    if (user && user.password === password) {
        localStorage.setItem("loggedInUser", JSON.stringify(user))
        navigateWithTransition("logged_in_lobby.html")
    } else {
        const errorElement = document.createElement("div")
        errorElement.className = "error-message"
        errorElement.textContent = "[ERROR] Username atau password salah!"
        
        const loginForm = document.getElementById("loginForm")
        const existingError = loginForm.querySelector(".error-message")
        if (existingError) {
            existingError.remove()
        }
        loginForm.appendChild(errorElement)
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded") // Debug log
    
    // Update attempt counter
    const remainingAttempts = MAX_ATTEMPTS - attemptCount
    const attemptCounter = document.getElementById("attemptCounter")
    if (attemptCounter) {
        attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`
        attemptCounter.style.color = remainingAttempts === 1 ? '#ff0000' : '#ffff00'
    }

    // Check if device is blocked
    if (isDeviceBlocked()) {
        const forms = document.querySelectorAll("form")
        forms.forEach(form => {
            form.innerHTML = "<p class='blocked-message'>Perangkat Anda telah diblokir. Silakan hubungi admin.</p>"
        })
        return
    }

    // Attach form event listeners
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
        console.log("Register form found") // Debug log
        registerForm.addEventListener("submit", handleRegister)
    }

    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin)
    }
})

// Function untuk cek device blocked
function isDeviceBlocked() {
    return localStorage.getItem("isBlocked") === "true"
}

// Function untuk block device
function blockDevice() {
    localStorage.setItem("isBlocked", "true")
    alert("[SYSTEM ERROR] Perangkat Anda telah diblokir karena terlalu banyak percobaan yang salah!")
    window.location.href = "lobby.html"
}

// Function untuk handle login
function handleLogin(event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const users = JSON.parse(localStorage.getItem("users") || "{}")
  
    if (users[username] && users[username].password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(users[username]))
      
      // Tampilkan pesan sukses dengan informasi login
      const resultDiv = document.createElement("div")
      resultDiv.className = "success-message"
      resultDiv.innerHTML = `
          <h2>Login Berhasil!</h2>
          <p>Selamat datang, ${users[username].nama}!</p>
          <p>Username: ${username}</p>
          <p>Password: ${password}</p>
          <button onclick="window.location.href='logged_in_lobby.html'">Masuk ke Lobby</button>
      `
      document.body.innerHTML = ""
      document.body.appendChild(resultDiv)
    } else {
      // Tampilkan pesan error
      const errorMessage = document.createElement("div")
      errorMessage.className = "error-message"
      errorMessage.textContent = "[ERROR] Username atau password salah!"
      
      const loginForm = document.getElementById("loginForm")
      const existingError = loginForm.querySelector(".error-message")
      if (existingError) {
        existingError.remove()
      }
      loginForm.appendChild(errorMessage)
    }
  }
  
  // Tambahkan variabel untuk tracking percobaan
  let attemptCount = parseInt(localStorage.getItem("attemptCount") || "0")
  const MAX_ATTEMPTS = 3
  const CORRECT_REFERRAL = "748675"
  
  // Function to check if device is blocked
  function isDeviceBlocked() {
    return localStorage.getItem("isBlocked") === "true"
  }
  
  // Function to block device
  function blockDevice() {
    localStorage.setItem("isBlocked", "true")
    alert("Perangkat Anda telah diblokir karena terlalu banyak percobaan yang salah. Silakan hubungi admin.")
    window.location.href = "lobby.html"
  }
  
  // Function to handle registration
  function handleRegister(event) {
    event.preventDefault()
  
    if (isDeviceBlocked()) {
      alert("[SYSTEM ERROR] Perangkat Anda telah diblokir. Hubungi admin.")
      window.location.href = "lobby.html"
      return
    }
  
    const referralCode = document.getElementById("referralCode").value
  
    if (referralCode !== CORRECT_REFERRAL) {
      attemptCount++
      localStorage.setItem("attemptCount", attemptCount)
      
      const remainingAttempts = MAX_ATTEMPTS - attemptCount
      const attemptCounter = document.getElementById("attemptCounter")
      if (attemptCounter) {
        attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`
        attemptCounter.style.color = remainingAttempts === 1 ? '#ff0000' : '#ffff00'
      }
      
      if (attemptCount >= MAX_ATTEMPTS) {
        blockDevice()
        return
      }
      
      document.getElementById("referralError").textContent = 
        `[ERROR] Kode referal salah! Sisa percobaan: ${remainingAttempts}`
      return
    }
  
    // Ambil data dari form
    const nama = document.getElementById("nama").value
    const kelas = document.getElementById("kelas").value
    const nomorUrut = document.getElementById("nomorUrut").value
    const citaCita = document.getElementById("citaCita").value
    const email = document.getElementById("email").value
  
    // Generate username dan password
    const username = nama.toLowerCase().replace(/\s+/g, "") // username dari nama tanpa spasi
    const password = generatePassword() // generate random password
  
    // Buat objek user baru
    const newUser = {
      nama,
      kelas,
      nomorUrut,
      citaCita,
      email,
      username,
      password
    }
  
    // Simpan ke localStorage
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    users[username] = newUser
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("loggedInUser", JSON.stringify(newUser))
  
    // Reset attempt count setelah berhasil
    localStorage.setItem("attemptCount", "0")
  
    // Tampilkan pesan sukses dengan username dan password
    const resultDiv = document.createElement("div")
    resultDiv.className = "success-message"
    resultDiv.innerHTML = `
        <h2>>>> Pendaftaran Berhasil! <<<</h2>
        <p>[*] Username: ${username}</p>
        <p>[*] Password: ${password}</p>
        <p style="color: #ffff00;">* PENTING: Catat informasi ini!</p>
        <button onclick="window.location.href='logged_in_lobby.html'">[ENTER] Masuk ke Lobby</button>
    `
    document.body.innerHTML = ""
    document.body.appendChild(resultDiv)
  }
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    const remainingAttempts = MAX_ATTEMPTS - attemptCount
    const attemptCounter = document.getElementById("attemptCounter")
    if (attemptCounter) {
        attemptCounter.textContent = `Sisa Percobaan: ${remainingAttempts}`
        attemptCounter.style.color = remainingAttempts === 1 ? '#ff0000' : '#ffff00'
    }
  
    if (isDeviceBlocked()) {
      const forms = document.querySelectorAll("form")
      forms.forEach(form => {
        form.innerHTML = "<p class='blocked-message'>Perangkat Anda telah diblokir. Silakan hubungi admin.</p>"
      })
      return
    }
  
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin)
    }
  
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
      registerForm.addEventListener("submit", handleRegister)
    }
  
    const logoutButton = document.getElementById("logoutButton")
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser")
        window.location.href = "lobby.html"
      })
    }
  })
  
  let warningCount = 0;

  // Mencegah akses view source
  document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      showWarning();
  });

  // Mencegah shortcut keyboard
  document.addEventListener("keydown", (event) => {
      if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.key === "U")) {
          event.preventDefault();
          showWarning();
      }
  });

  function showWarning() {
      warningCount++;
      if (warningCount === 1) {
          alert("Peringatan: Mengakses kode sumber tidak diperbolehkan. Silakan hentikan aktivitas ini.");
      } else if (warningCount === 2) {
          alert("Peringatan: Anda telah melanggar aturan ini dua kali. Akun Anda akan disuspend selama 19 hari.");
          // Logika untuk menyuspend akun dapat ditambahkan di sini
          suspendAccount();
      }
  }

  function suspendAccount() {
      // Logika untuk menyuspend akun, misalnya menghapus data pengguna dari localStorage
      localStorage.removeItem("loggedInUser");
      // Redirect ke halaman login atau halaman lain
      window.location.href = 'lobby.html'; // Ganti dengan URL yang sesuai
  }
  
  