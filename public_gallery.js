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

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("publicGallery");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDescription");
    const downloadBtn = document.getElementById("downloadBtn");
    const closeBtn = document.querySelector(".close");
    
    // Data galeri dengan file JPG lokal
    const galleryData = [
        {
            url: "PIC_1391.JPG",
            title: "foto 4 perempuan",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "PIC_1391.JPG"
        },
        {
            url: "PIC_1163.JPG",
            title: "17an tahun 2023",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "PIC_1163.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1318.JPG",
            title: "Kedatangan orang korea.",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1318.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1319.JPG",
            title: "kedatangan orang korea 2 potrait",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1319.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1320.JPG",
            title: "penampilan tamu orang korea.",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1320.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1321.JPG",
            title: "penampilan tamu orang korea ",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1321.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1322.JPG",
            title: "penampilan tamu orang korea",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1322.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1323.JPG",
            title: "penampilan tamu orang korea",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1323.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1324.JPG",
            title: "siswa yang sabar menonton",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1324.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1325.JPG",
            title: "siswa yang sabar menonton",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1325.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1326.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1326.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1327.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1327.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1328.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1328.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1329.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1329.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1330.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1330.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1340.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1340.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1341.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1341.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1342.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1342.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1343.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1343.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1345.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1345.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1346.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1346.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1347.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1347.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1349.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1349.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1350.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1350.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1351.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1351.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1352.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1352.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1353.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1353.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1354.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1354.JPG"
        },
        {
            url: "PIC_1213.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "PIC_1213.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1355.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1355.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1356.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1356.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1357.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1357.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1358.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1358.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1359.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1359.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1360.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1360.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1361.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1361.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1362.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1362.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1363.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1363.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1364.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1364.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1365.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1365.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1366.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1366.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1367.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1367.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1368.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1368.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1369.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1369.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1370.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1370.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1371.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1371.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1372.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1372.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1373.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1373.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1374.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1374.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1375.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1375.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1376.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1376.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1377.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1377.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1378.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1378.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1379.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1379.JPG"
        },
        {
            url: "FOTO UMUM/PIC_1380.JPG",
            title: "",
            description: "Silahkan unduh foto jika anda memerlukan foto ini,hubungi admin website atau natpublish jika gambar ini keliru.",
            filename: "FOTO UMUM/PIC_1380.JPG"
        },
       
        // ... tambahkan foto lainnya ...
    ];

    // Fungsi untuk membuat elemen galeri
    function createGalleryItem(item) {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";

        const img = document.createElement("img");
        img.src = item.url;
        img.alt = item.title;
        img.loading = "lazy"; // Lazy loading untuk performa

        img.onerror = function() {
            this.onerror = null;
            this.src = "images/placeholder.jpg"; // Gambar placeholder jika gagal
        };
        
        const overlay = document.createElement("div");
        overlay.className = "gallery-overlay";
        
        const title = document.createElement("h3");
        title.textContent = item.title;
        
        const description = document.createElement("p");
        description.textContent = item.description;

        const viewButton = document.createElement("button");
        viewButton.className = "view-button";
        viewButton.innerHTML = '<i class="fas fa-eye"></i> Lihat Detail';

        overlay.appendChild(title);
        overlay.appendChild(description);
        overlay.appendChild(viewButton);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);

        // Event listener untuk membuka modal
        galleryItem.addEventListener("click", () => {
            openModal(item);
        });

        return galleryItem;
    }

    // Fungsi untuk membuka modal
    function openModal(item) {
        modalImg.src = item.url;
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.description;
        modal.style.display = "block";
        
        // Update download button
        downloadBtn.onclick = () => downloadImage(item.url, item.filename);
    }

    // Fungsi untuk mengunduh gambar
    async function downloadImage(url, filename) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
            alert('Maaf, terjadi kesalahan saat mengunduh gambar.');
        }
    }

    // Event listeners untuk modal
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Escape key untuk menutup modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    // Tampilkan semua item galeri
    galleryData.forEach(item => {
        gallery.appendChild(createGalleryItem(item));
    });
});

function navigateWithTransition(url) {
    const transitionEl = document.createElement('div');
    transitionEl.className = 'page-transition';
    
    const sceneHTML = `
        <div class="transition-scene">
            <i class="fas fa-chalkboard-teacher teacher"></i>
            <i class="fas fa-user student"></i>
            <div class="logo-appear">
                <i class="fas fa-graduation-cap"></i>
                <div class="teacher-text">My83</div>
            </div>
        </div>
    `;
    
    transitionEl.innerHTML = sceneHTML;
    document.body.appendChild(transitionEl);

    // Menunggu animasi selesai sebelum berpindah halaman
    setTimeout(() => {
        transitionEl.classList.add('fadeOut'); // Tambahkan efek menghilang
        setTimeout(() => {
            window.location.href = url; // Pindah halaman setelah animasi
        }, 500); // Waktu yang sama dengan durasi fadeOut
    }, 2000); // Waktu tampil sebelum menghilang
} 