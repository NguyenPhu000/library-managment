document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-link.dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      let targetMenu = document.querySelector(
        this.getAttribute("data-bs-target")
      );

      // Nếu dropdown đang mở, thì đóng lại
      let isOpen = targetMenu.classList.contains("show");

      // Đóng tất cả dropdown khác (trừ dropdown hiện tại)
      document.querySelectorAll(".collapse.show").forEach((openMenu) => {
        if (openMenu !== targetMenu) {
          openMenu.classList.remove("show");
          openMenu.previousElementSibling.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });

      // Nếu đang mở -> đóng lại, nếu đang đóng -> mở ra
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
      // 🔥 Chặn Bootstrap tự động đóng menu khi click vào mục con
      targetMenu.addEventListener("click", function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
      });

      // 🔥 Ngăn Bootstrap đóng menu khi click vào bất kỳ mục con nào
      targetMenu.querySelectorAll("a").forEach((submenuItem) => {
        submenuItem.addEventListener("click", function (e) {
          e.stopPropagation(); // Không đóng dropdown khi click vào mục con
        });
      });
    }
  });

  // 🔥 Fix lỗi Bootstrap tự động đóng menu
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
