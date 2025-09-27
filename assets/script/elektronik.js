/* ================================================= */
/* 1. FUNGSI GLOBAL (Dipanggil melalui onclick) */
/* ================================================= */

/* Fungsi GLOBAL 1: Kontrol Menu Navigasi Hamburger (mobile-nav) */
function toggleMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    
    // Pastikan elemen #mobile-nav ada
    if (mobileNav) {
        mobileNav.classList.toggle('open');
        
        // Opsional: Jika Anda ingin konten utama tidak bisa discroll saat menu terbuka
        // document.body.classList.toggle('no-scroll'); 
    }
}

/* Fungsi GLOBAL 2: Kontrol Sidebar Kategori (sidebar-toggle-btn) */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}


/* ================================================= */
/* 2. SKRIP DOMContentLoaded (Berjalan setelah HTML dimuat) */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {
    
    // --- SKRIP LAMA DAN BARU: ACCORDION SIDEBAR ---
    const accordionBtns = document.querySelectorAll(".accordion-btn");

    accordionBtns.forEach((button) => {
        button.addEventListener("click", function () {
            const subCategoryList = this.nextElementSibling;
            const icon = this.querySelector(".accordion-icon");

            // 1. Toggle Kelas 'active' dan 'rotated'
            if (subCategoryList) {
                // Menggunakan toggle untuk membuka/menutup
                subCategoryList.classList.toggle("active");
            }
            if (icon) {
                // Menggunakan toggle untuk rotasi ikon
                icon.classList.toggle("rotated");
            }

            // 2. [PENAMBAHAN] Opsional: Tutup semua accordion lain saat satu dibuka
            accordionBtns.forEach((otherButton) => {
                if (otherButton !== button) {
                    // Tutup list
                    otherButton.nextElementSibling.classList.remove('active');
                    // Reset ikon
                    otherButton.querySelector(".accordion-icon").classList.remove('rotated');
                }
            });
        });
    });

    // --- SKRIP BARU: DROPDOWN MENU SELULER ---
    const dropbtns = document.querySelectorAll(".header-nav .dropbtn");

    dropbtns.forEach((btn) => {
        btn.addEventListener("click", function (event) {
            // Hentikan perilaku default link (mencegah navigasi ke '#')
            event.preventDefault(); 
            
            // Temukan dropdown-content yang terkait (sibling berikutnya)
            const dropdownContent = this.nextElementSibling;

            if (dropdownContent && dropdownContent.classList.contains("dropdown-content")) {
                // Toggle kelas 'active' pada konten dropdown
                dropdownContent.classList.toggle("active");
            }
        });
    });
    
    // --- SKRIP LAMA ANDA: TESTIMONIAL SLIDER OTOMATIS ---
    const testimonialSliderContainer = document.querySelector(
        ".testimonial-slider-container"
    );
    const testimonialSlider = document.getElementById("testimonial-slider");

    if (testimonialSliderContainer && testimonialSlider) {
        const testimonialCards = document.querySelectorAll(".testimonial-card");
        if (testimonialCards.length > 0) {
            // Menggunakan getBoundingClientRect().width untuk akurasi responsif
            // Ambil width Container, bukan Card, agar perhitungan gulir lebih akurat
            let currentPosition = 0;

            function nextSlide() {
                // Perbarui cardWidth di dalam fungsi jika layout berubah (meskipun DOMContentLoaded sudah berjalan)
                const cardWidth = testimonialCards[0].getBoundingClientRect().width + 30; // 30px = gap antar kartu
                const maxScroll =
                    testimonialSlider.scrollWidth - testimonialSliderContainer.clientWidth;

                if (currentPosition < maxScroll) {
                    currentPosition += cardWidth;
                } else {
                    currentPosition = 0; // Kembali ke awal saat mencapai akhir
                }

                testimonialSliderContainer.scrollTo({
                    left: currentPosition,
                    behavior: "smooth",
                });
            }

            // Atur interval untuk memanggil fungsi nextSlide setiap 4 detik
            setInterval(nextSlide, 4000);
        }
    }
});