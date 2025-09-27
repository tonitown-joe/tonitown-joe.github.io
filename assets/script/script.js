document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // === SKRIP BARU UNTUK HAMBURGER MENU ===
  // ===================================
  const menuToggleButton = document.querySelector(".menu-toggle-btn");
  const mobileNav = document.getElementById("mobile-nav"); // Memakai ID yang kita sepakati

  if (menuToggleButton && mobileNav) {
    menuToggleButton.addEventListener("click", function () {
      // 1. Toggle tampilan navigasi utama (header-nav)
      mobileNav.classList.toggle("open");

      // 2. Mengubah ikon (menu <-> close)
      const icon = this.querySelector(".menu-icon");
      if (icon) {
        if (mobileNav.classList.contains("open")) {
          icon.setAttribute("name", "close-outline");
        } else {
          icon.setAttribute("name", "menu-outline");

          // Opsional: Tutup semua dropdown saat menu utama ditutup
          document.querySelectorAll(".dropdown-content").forEach((content) => {
            content.classList.remove("active");
          });
        }
      }
    });
  }

  // ===================================
  // === Skrip untuk dropdown sidebar ===
  // ===================================
  const accordionBtns = document.querySelectorAll(".accordion-btn");
  accordionBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const subCategoryList = this.nextElementSibling;
      if (subCategoryList) {
        subCategoryList.classList.toggle("active");
        const icon = this.querySelector(".accordion-icon");
        if (icon) {
          icon.classList.toggle("rotated");
        }
      }
    });
  });

  // =================================================================
  // === SKRIP DROPDOWN NAVIGASI UTAMA (BERFUNGSI DI DALAM HAMBURGER) ===
  // =================================================================
  const dropdowns = document.querySelectorAll(".header-nav .dropdown");

  dropdowns.forEach((dropdown) => {
    const dropbtn = dropdown.querySelector(".dropbtn");
    const dropdownContent = dropdown.querySelector(".dropdown-content");

    if (dropbtn && dropdownContent) {
      dropbtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        dropdownContent.classList.toggle("active");

        // Tutup dropdown lain saat satu dibuka
        dropdowns.forEach((otherDropdown) => {
          const otherContent = otherDropdown.querySelector(".dropdown-content");
          if (
            otherDropdown !== dropdown &&
            otherContent &&
            otherContent.classList.contains("active")
          ) {
            otherContent.classList.remove("active");
          }
        });
      });
    }
  });

  // Tutup dropdown navigasi jika pengguna mengklik di luar menu
  document.addEventListener("click", function (event) {
    // Cek apakah yang diklik bukan bagian dari dropdown manapun
    dropdowns.forEach((dropdown) => {
      const dropdownContent = dropdown.querySelector(".dropdown-content");

      if (dropdownContent && !dropdown.contains(event.target)) {
        dropdownContent.classList.remove("active");
      }
    });

    // Cek dan tutup Hamburger menu jika diklik di luar mobileNav DAN BUKAN TOMBOL HAMBURGER
    if (
      mobileNav &&
      mobileNav.classList.contains("open") &&
      !mobileNav.contains(event.target) &&
      event.target !== menuToggleButton &&
      !menuToggleButton.contains(event.target)
    ) {
      mobileNav.classList.remove("open");
      // Kembalikan ikon ke 'menu'
      const icon = menuToggleButton.querySelector(".menu-icon");
      if (icon) {
        icon.setAttribute("name", "menu-outline");
      }
    }
  });
  // ===================================
  // === AKHIR SKRIP DROPDOWN NAVIGASI UTAMA ===
  // ===================================

  // Blok kode lainnya (Banner Kategori, Testimonial, Banner Utama, Load More, Pencarian)
  // Dibiarkan tanpa perubahan karena sudah benar.

  // ===================================
  // === Skrip untuk banner kategori berjalan otomatis ===
  // ===================================
  const categoryContainer = document.querySelector(
    ".category-item-container.has-scrollbar"
  );
  if (categoryContainer) {
    const speed = 0.5;
    let position = 0;
    const content = categoryContainer.innerHTML;
    categoryContainer.innerHTML += content;

    function scrollBanner() {
      position += speed;
      if (position >= categoryContainer.scrollWidth / 2) {
        position = 0;
      }
      categoryContainer.style.transform = `translateX(-${position}px)`;
      requestAnimationFrame(scrollBanner);
    }
    scrollBanner();
  }

  // ===================================
  // === Skrip untuk testimonial slide otomatis ===
  // ===================================
  const testimonialSliderContainer = document.querySelector(
    ".testimonial-slider-container"
  );
  const testimonialSlider = document.getElementById("testimonial-slider");
  if (testimonialSliderContainer && testimonialSlider) {
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    if (testimonialCards.length > 0) {
      const cardWidth = testimonialCards[0].getBoundingClientRect().width + 30;
      let currentPosition = 0;
      function nextSlide() {
        const maxScroll =
          testimonialSliderContainer.scrollWidth -
          testimonialSliderContainer.clientWidth;
        if (currentPosition < maxScroll) {
          currentPosition += cardWidth;
        } else {
          currentPosition = 0;
        }
        testimonialSliderContainer.scrollTo({
          left: currentPosition,
          behavior: "smooth",
        });
      }
      setInterval(nextSlide, 4000);
    }
  }

  // ===================================
  // === SKRIP UNTUK BANNER UTAMA ===
  // ===================================
  const mainBannerSlider = document.getElementById("main-banner-slider");
  if (mainBannerSlider) {
    const mainBannerItems = mainBannerSlider.querySelectorAll(".slider-item");
    if (mainBannerItems.length > 0) {
      const itemWidth = mainBannerItems[0].offsetWidth;
      let currentIndex = 0;
      function autoSlide() {
        currentIndex++;
        if (currentIndex >= mainBannerItems.length) {
          currentIndex = 0;
        }
        mainBannerSlider.scrollTo({
          left: currentIndex * itemWidth,
          behavior: "smooth",
        });
      }
      setInterval(autoSlide, 5000);
    }
  }

  // ===================================
  // === Skrip untuk tombol 'Load More' ===
  // ===================================
  const loadMoreBtn = document.getElementById("load-more-btn");
  const hiddenProductsContainer = document.querySelector(".hidden-products");

  if (loadMoreBtn && hiddenProductsContainer) {
    loadMoreBtn.addEventListener("click", function () {
      hiddenProductsContainer.classList.toggle("show");

      if (hiddenProductsContainer.classList.contains("show")) {
        loadMoreBtn.textContent = "Load Less";
      } else {
        loadMoreBtn.textContent = "Load More";
        const productMain =
          document.querySelector(".product-main") ||
          document.querySelector(".main-content");
        if (productMain) {
          window.scrollTo({
            top: productMain.offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // ===================================
  // === Fungsionalitas Pencarian ===
  // ===================================
  const searchBtn = document.querySelector(".header-search-icon");
  const searchBar = document.querySelector(".header-search");

  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", function () {
      searchBar.classList.toggle("active");

      const searchInput = searchBar.querySelector('input[type="text"]');
      if (searchBar.classList.contains("active") && searchInput) {
        searchInput.focus();
      }
    });

    // Tutup search bar saat klik di luar area
    document.addEventListener("click", (event) => {
      if (!searchBar.contains(event.target) && event.target !== searchBtn) {
        searchBar.classList.remove("active");
      }
    });
  }
});
