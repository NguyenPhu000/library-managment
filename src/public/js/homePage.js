document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-link.dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      let targetMenu = document.querySelector(
        this.getAttribute("data-bs-target")
      );

      let isOpen = targetMenu.classList.contains("show");

      document.querySelectorAll(".collapse.show").forEach((openMenu) => {
        if (openMenu !== targetMenu) {
          openMenu.classList.remove("show");
          openMenu.previousElementSibling.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });

      if (isOpen) {
        targetMenu.classList.remove("show");
        this.setAttribute("aria-expanded", "false");
      } else {
        targetMenu.classList.add("show");
        this.setAttribute("aria-expanded", "true");
      }
    });

    let targetMenu = document.querySelector(
      toggle.getAttribute("data-bs-target")
    );
    if (targetMenu) {
      targetMenu.addEventListener("click", function (e) {
        e.stopPropagation();
      });

      targetMenu.querySelectorAll("a").forEach((submenuItem) => {
        submenuItem.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      });
    }
  });

  document.addEventListener("click", function (e) {
    let isInsideDropdown = e.target.closest(".collapse.show");
    let isDropdownToggle = e.target.closest(".nav-link.dropdown-toggle");

    // Chỉ đóng menu nếu click ra ngoài tất cả dropdowns
    if (!isInsideDropdown && !isDropdownToggle) {
      document.querySelectorAll(".collapse.show").forEach((openMenu) => {
        openMenu.classList.remove("show");
        openMenu.previousElementSibling.setAttribute("aria-expanded", "false");
      });
    }
  });
});
