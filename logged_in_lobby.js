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
    localStorage.removeItem("loggedInUser");
    window.location.href = 'lobby.html'; // Ganti dengan URL yang sesuai
}

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        navigateWithTransition("login.html");
        return;
    }

    // Set welcome message
    const welcomeMessage = document.getElementById("welcomeMessage");
    const currentDate = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const dateString = currentDate.toLocaleDateString("id-ID", options);
    const timeOfDay = getTimeOfDay();
    welcomeMessage.textContent = `Selamat ${timeOfDay}, ${loggedInUser.nama}! - ${dateString}`;

    // Populate user info
    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
        <p><strong>Nama:</strong> ${loggedInUser.nama}</p>
        <p><strong>Kelas:</strong> ${loggedInUser.kelas}</p>
        <p><strong>Nomor Urut:</strong> ${loggedInUser.nomorUrut}</p>
        <p><strong>Cita-cita:</strong> ${loggedInUser.citaCita}</p>
        <p><strong>Email:</strong> ${loggedInUser.email || 'Belum diatur'}</p>
        <p><strong>Username:</strong> ${loggedInUser.username}</p>
        <p><strong>Password:</strong> ${'•'.repeat(loggedInUser.password.length)}</p>
    `;

    // Populate piket schedule
    const piketSchedule = document.getElementById("piketSchedule");
    const piketData = {
        'Senin': ["Ferijianta", "Nadha", "Felix", "Gayatri", "Reddy"],
        'Selasa': ["Rehan", "Sanon", "Ray", "Marliana", "Venty"],
        'Rabu': ["Frans", "Johana", "Wanday", "Rehadi", "Senvo", "Yohana"],
        'Kamis': ["Steven", "Feby", "Samuel", "Arsih", "Messi"],
        'Jumat': ["Michael", "Eklesia", "Effrilia", "Messias", "Priscila"],
        'Sabtu': ["Luis", "Catrin", "Dear", "Mariskha", "Bryantri"]
    };

    // Dapatkan hari ini
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

    // Buat tabel untuk hari ini
    const piketTable = document.createElement("table");
    piketTable.className = "piket-table";

    // Header tabel
    const piketHeader = document.createElement("tr");
    const dayHeader = document.createElement("th");
    dayHeader.textContent = "Petugas Piket Hari " + today;
    dayHeader.colSpan = "2";
    piketHeader.appendChild(dayHeader);
    piketTable.appendChild(piketHeader);

    // Isi dengan daftar piket hari ini
    if (piketData[today]) {
        piketData[today].forEach((name, index) => {
            const row = document.createElement("tr");
            const numberCell = document.createElement("td");
            numberCell.textContent = (index + 1) + ".";
            const nameCell = document.createElement("td");
            nameCell.textContent = name;
            row.appendChild(numberCell);
            row.appendChild(nameCell);
            piketTable.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = "2";
        cell.textContent = "Tidak ada jadwal piket hari ini";
        row.appendChild(cell);
        piketTable.appendChild(row);
    }

    piketSchedule.appendChild(piketTable);

    // Tambah tombol unduh jadwal piket
    const downloadPiketBtn = document.createElement("button");
    downloadPiketBtn.textContent = "Unduh Jadwal Piket";
    downloadPiketBtn.className = "download-button";
    downloadPiketBtn.onclick = downloadPiketSchedule;
    piketSchedule.appendChild(downloadPiketBtn);

    function downloadPiketSchedule() {
        let csvContent = "JADWAL PIKET KELAS VIII-3 SEMESTER 2 TAHUN 2025\n\n"
        
        for (const [day, students] of Object.entries(piketData)) {
            csvContent += `${day}:\n`
            students.forEach((student, index) => {
                csvContent += `${index + 1}. ${student}\n`
            })
            csvContent += "\n"
        }

        // Tambah watermark
        csvContent += "\n\nNATBIS SECURITY WEBSITE APPROVED"
        csvContent += "\n\nAKU BISA BELAJAR DENGAN RAJIN,NATBISPUBLISHER"

        const blob = new Blob([csvContent], { type: "text/plain;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        
        link.setAttribute("href", url)
        link.setAttribute("download", "jadwal_piket_kelas.txt")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Populate class schedule
    const classSchedule = document.getElementById("classSchedule");
    const schedule = {
        'Senin': ["Upacara", "Matematika", "Bahasa Indonesia", "IPA", "Istirahat", "Bahasa Inggris", "Seni Budaya"],
        'Selasa': ["PJOK", "IPA", "Matematika", "Istirahat", "PAI", "Bahasa Indonesia"],
        'Rabu': ["IPS", "PKN", "Bahasa Inggris", "Istirahat", "Matematika", "Prakarya"],
        'Kamis': ["Bahasa Indonesia", "IPA", "Seni Budaya", "Istirahat", "IPS", "PJOK"],
        'Jumat': ["Bahasa Inggris", "Matematika", "PAI", "Istirahat", "PKN"]
    };

    // Buat tabel roster
    const table = document.createElement("table");
    table.className = "schedule-table";
    
    // Buat header tabel
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    // Perbaikan pada pembuatan header
    const dayHeaderCell = document.createElement("th");
    dayHeaderCell.textContent = "Hari";
    headerRow.appendChild(dayHeaderCell);
    
    const subjectHeaderCell = document.createElement("th");
    subjectHeaderCell.textContent = "Mata Pelajaran";
    headerRow.appendChild(subjectHeaderCell);
    
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Isi tabel dengan jadwal
    const tbody = document.createElement("tbody");
    for (const [day, subjects] of Object.entries(schedule)) {
        const row = document.createElement("tr");
        const dayCell = document.createElement("td");
        dayCell.textContent = day;
        row.appendChild(dayCell);
        const subjectsCell = document.createElement("td");
        subjectsCell.textContent = subjects.join(", ");
        row.appendChild(subjectsCell);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    classSchedule.appendChild(table);

    // Tambah tombol unduh
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Unduh Roster";
    downloadBtn.className = "download-button";
    downloadBtn.onclick = downloadSchedule;
    classSchedule.appendChild(downloadBtn);

    function downloadSchedule() {
        let csvContent = "Hari,Mata Pelajaran\n"
        
        for (const [day, subjects] of Object.entries(schedule)) {
            csvContent += `${day},"${subjects.join(", ")}"\n`
        }

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        
        link.setAttribute("href", url)
        link.setAttribute("download", "roster_kelas.csv")
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
  
    // Populate announcements
    const announcements = document.getElementById("announcements");
    const announcementList = [
        "PADA BAGIAN KELOMPOK BELAJAR SEDANG DALAM PERBAIKAN JADI MOHON JANGAN DI GANGU!",
        "JANGAN MEMBAGIKAN KODE REFERAL UNIK KESIAPA PUN! INGAT HANYA KELAS 8-3 SAJA YANG DAPAT MENGAKSES HALAMAN INI~!",
        "LIHAT BUKU PANDUAN YANG AKAN DI RILIS HARI KAMIS UNTUK PANDUAN LEBIH LANJUT!",
    ];
    announcementList.forEach((announcement) => {
      const li = document.createElement("li");
      li.textContent = announcement;
      announcements.appendChild(li);
    });
  
    // Populate gallery preview
    const gallery = document.getElementById("gallery");
    const previewImg = document.createElement("img");
    previewImg.src = `/placeholder.svg?text=Foto Kelas`;
    previewImg.alt = `Foto Preview Kelas`;
    previewImg.className = "gallery-preview-image";
    previewImg.onerror = function () {
        this.onerror = null;
        this.src = "/placeholder.svg?text=No Photo";
    };
    gallery.appendChild(previewImg);

    // Tambahkan animasi untuk cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Tambahkan efek loading yang lebih smooth
    function addLoadingEffect(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    // Terapkan efek loading ke elemen-elemen utama
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => addLoadingEffect(card), index * 100);
    });

    // Generate QR Code
    const qrData = JSON.stringify({
        username: loggedInUser.username,
        password: loggedInUser.password
    });
    generateQRCode(qrData);

    function generateQRCode(data) {
        try {
            // Pastikan library QR Code sudah dimuat
            if (typeof qrcode === "function") {
                const qr = qrcode(0, 'M');
                qr.addData(data);
                qr.make();
                
                const qrCodeDiv = document.getElementById('qrCode');
                if (qrCodeDiv) {
                    qrCodeDiv.innerHTML = qr.createImgTag(6, 8, "QR Code Login Info");
                } else {
                    console.error("QR Code container tidak ditemukan");
                }
            } else {
                console.error("Library QR Code belum dimuat");
            }
        } catch (error) {
            console.error("Error generating QR Code:", error);
        }
    }

    // Fungsi untuk mendapatkan waktu hari
    function getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return "pagi";
        if (hour < 15) return "siang";
        if (hour < 18) return "sore";
        return "malam";
    }

    // Event listener untuk tombol "Lihat Jadwal Lainnya"
    const showAllScheduleBtn = document.getElementById("showAllSchedule");
    const scheduleModal = document.getElementById("scheduleModal");
    const closeBtn = scheduleModal.querySelector(".close");

    showAllScheduleBtn.addEventListener("click", () => {
        scheduleModal.style.display = "block"; // Tampilkan modal
    });

    // Event listener untuk menutup modal
    closeBtn.addEventListener("click", () => {
        scheduleModal.style.display = "none"; // Sembunyikan modal
    });

    // Event listener untuk menutup modal saat klik di luar modal
    window.addEventListener("click", (event) => {
        if (event.target === scheduleModal) {
            scheduleModal.style.display = "none"; // Sembunyikan modal
        }
    });
});

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "pagi";
    if (hour < 15) return "siang";
    if (hour < 18) return "sore";
    return "malam";
}
