document.addEventListener("DOMContentLoaded", function () {
  let bookIdToDelete = null;

  // Khi nhấn nút "Delete", lưu `book_id` vào biến
  document.querySelectorAll(".delete-book-btn").forEach((button) => {
    button.addEventListener("click", function () {
      bookIdToDelete = this.getAttribute("data-id");
      console.log("Book ID cần xóa:", bookIdToDelete); // Debug xem ID có nhận đúng không
    });
  });

  // Khi nhấn nút "Xóa" trong modal
  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", function () {
      if (bookIdToDelete) {
        console.log("Xóa sách có ID:", bookIdToDelete); // Debug xem có nhận ID không
        window.location.href = "/books/delete?id=" + bookIdToDelete;
      } else {
        console.error("Lỗi: Không tìm thấy ID sách để xóa!");
      }
    });
});
