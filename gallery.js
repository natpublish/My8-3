document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    if (!loggedInUser) {
        navigateWithTransition("login.html")
        return
    }

    const gallery = document.getElementById("fullGallery")
    
    // Data galeri dengan file JPG lokal
    const galleryData = [
        {
            url: "tarik tambang 2.JPG",
            title: "Tarik tambang putri",
            description: "foto di ambil di tahun 2023 di foto oleh juru kamera Dear Marganda sinaga"
        },
        {
            url: "WhatsApp Image 2025-01-21 at 20.29.54 (1).jpeg",
            title: "Foto Bersama Di kelas ajaran baru",
            description: "Kebersamaan siswa-siswi kelas 8-3 saat memasuki ajaran baru."
        },
        {
            url: "PIC_0983.JPG",
            title: "Foto campur saat 17an",
            description: "di potret di tahun 2023 oleh juru kamera Dear Marganda Sinaga."
        },
        {
            url: "PIC_0984.JPG",
            title: "Foto Perempuan 8-3",
            description: "di potret di tahun 2023 oleh juru kamera Dear Marganda Sinaga."
        },
        {
            url: "PIC_1242.JPG",
            title: "Foto selfi siswa Laki laki kelas kita.",
            description: "di potret di tahun 2024 oleh juru kamera steven lase."
        },
        {
            url: "PIC_1151.JPG",
            title: "Rehadi sedang memakai sepatu.",
            description: "Dia berjuang agar dapat berjalan karena sepatu baru :) "
        },
        {
            url: "PIC_1135.JPG",
            title: "Suasana pilketos 2023",
            description: "di potret di tahun 2023 oleh juru kamera Dear Marganda Sinaga."
        },
        {
            url: "PIC_1141.JPG",
            title: "Suasana saat pilketos 2023",
            description: "lihat bagaimana keseruan di dalam foto ini!,di potret di tahun 2023 oleh juru kamera Dear Marganda Sinaga."
        },
        {
            url: "PIC_1131.JPG",
            title: "MERAKIT!!",
            description: "merakit sekat pemilihan suara!!. "
        },
        {
            url: "WhatsApp Image 2025-01-21 at 20.29.55 (1).jpeg",
            title: "Belajar Bahasa Indonesia ga akan pernah bosan!",
            description: "suasana pembelajaran di kelas ibu flo saat mengajarkan pelajaran bahasa indonesia,di foto oleh rehadi yosafat."
        },
        {
            url: "WhatsApp Image 2025-01-21 at 20.29.55.jpeg",
            title: "Habis Makan nih!",
            description: "Berfoto bersama buk flo setelah PANBERS."
        },
        {
            url: "WhatsApp Image 2025-01-21 at 20.29.54.jpeg",
            title: "Berfoto bersama setelah selesai Jumat Religi",
            description: "Wah pada ceria banget niH! "
        },
        {
            url: "PIC_1132.JPG",
            title: "Messi jadi NPC kelas",
            description: "Messi merenung untuk masa depan nya :)"
        },
        {
            url: "PIC_1138.JPG",
            title: "Johana dan yohana dkk sedang gotong royong membuat sekat.",
            description: "membuat sekat pilketos bersama emang asik yah!!"
        },
        {
            url: "PIC_1174.JPG",
            title: "Lagi ngapain ya?",
            description: "ya foto lah jadi ?:)"
        },
        {
            url: "PIC_1214.JPG",
            title: "404 forgiben",
            description: "please check the server to call back ping this file."
        },
        {
            url: "PIC_1169.JPG",
            title: "Bentuk apa itu?",
            description: "ya ndak tau kok nanya saya????"
        },
        {
            url: "PIC_1166.JPG",
            title: "Acara drama kemerdekaan",
            description: "suasana drama kemerdekaan untuk memperingati 17 agustus."
        },
        {
            url: "PIC_1167.JPG",
            title: "Drama masih berlanjut",
            description: "drama 17 an"
        },
        {
            url: "PIC_1157.JPG",
            title: "Nadha memegang bendera",
            description: "404 forgiben"
        },
        {
            url: "PIC_1148.JPG",
            title: "Sekat pemilihan suara telah siap!",
            description: "Wah udah siap aja nih!"
        },
        {
            url: "PIC_1145.JPG",
            title: "Foto selfi 3 anomali",
            description: "mereka berjuang agar sekat pemilihan suara bagus dan rapi :) "
        },
        {
            url: "PIC_1143.JPG",
            title: "Melipat kertas",
            description: "404 forgiben error data (check server ) 405"
        },
        {
            url: "",
            title: "",
            description: ""
        },
    ]

    // Populate gallery dengan animasi
    galleryData.forEach((item) => {
        const galleryItem = document.createElement("div")
        galleryItem.className = "gallery-item"

        const img = document.createElement("img")
        img.src = item.url
        img.alt = item.title
        img.loading = "lazy"
        
        // Tambahkan fallback image jika gambar tidak ditemukan
        img.onerror = function() {
            this.onerror = null
            this.src = "images/placeholder.jpg"
        }
        
        const overlay = document.createElement("div")
        overlay.className = "gallery-overlay"
        
        const content = document.createElement("div")
        content.className = "gallery-content"
        
        const title = document.createElement("h3")
        title.textContent = item.title
        
        const description = document.createElement("p")
        description.textContent = item.description

        content.appendChild(title)
        content.appendChild(description)
        overlay.appendChild(content)
        galleryItem.appendChild(img)
        galleryItem.appendChild(overlay)
        gallery.appendChild(galleryItem)

        // Tambahkan event listener untuk animasi klik
        galleryItem.addEventListener("click", () => {
            galleryItem.classList.add("gallery-item-active")
            setTimeout(() => {
                galleryItem.classList.remove("gallery-item-active")
            }, 300)
        })
    })
})
