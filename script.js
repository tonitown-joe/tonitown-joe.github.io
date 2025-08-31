document.addEventListener("DOMContentLoaded", function () {
  // --- FITUR DROPDOWN ---
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const allContents = document.querySelectorAll(".dropdown-content");

      allContents.forEach((item) => {
        if (item !== content && item.style.maxHeight !== "0px") {
          item.style.maxHeight = "0px";
          item.previousElementSibling.classList.remove("active");
        }
      });

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.classList.remove("active");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        this.classList.add("active");
      }
    });
  });

  // --- FILTER PROPERTI (DEAL SECTION) ---
  const filterButtons = document.querySelectorAll(".deal-button");
  const dealContents = document.querySelectorAll(".deal-main-content");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      dealContents.forEach((content) => {
        if (content.id === "tab-" + filter) {
          content.style.display = "flex";
        } else {
          content.style.display = "none";
        }
      });
    });
  });

  // --- SKRIP PRELOADER YANG LEBIH ANDAL ---
  const preloader = document.getElementById("js-preloader");

  if (preloader) {
    window.onload = function () {
      preloader.classList.add("loaded");
    };

    setTimeout(function () {
      if (!preloader.classList.contains("loaded")) {
        preloader.classList.add("loaded");
      }
    }, 5000);
  }
});
