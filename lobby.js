// This file is intentionally left mostly empty as per your request.
// The username and password generation logic will be in a separate file.

// Mencegah akses view source
let warningCount = 0;

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    showWarning();
});

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
        suspendAccount();
    }
}

function suspendAccount() {
    // Logika untuk menyuspend akun, misalnya menghapus data pengguna dari localStorage
    localStorage.removeItem("loggedInUser");
    // Redirect ke halaman login atau halaman lain
    window.location.href = 'lobby.html'; // Ganti dengan URL yang sesuai
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to My83 lobby page!');
    // You can add any necessary lobby page functionality here

    // Buat elemen transisi
    const transitionEl = document.createElement('div');
    transitionEl.className = 'page-transition';
    
   
    
    transitionEl.innerHTML = sceneHTML;
    document.body.appendChild(transitionEl);

    // Hapus transisi setelah animasi selesai
    setTimeout(() => {
        transitionEl.addEventListener('animationend', () => {
            transitionEl.remove();
        });
    }, 3000);
});

// Fungsi untuk transisi saat pindah halaman
function navigateWithLoading(url) {
    // Buat elemen loading
    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading-screen';
    loadingEl.innerText = 'Please wait...'; // Pesan loading
    document.body.appendChild(loadingEl);

    // Pindah halaman setelah delay
    setTimeout(() => {
        window.location.href = url; // Pindah halaman
    }, 2000); // Waktu delay sebelum berpindah
}