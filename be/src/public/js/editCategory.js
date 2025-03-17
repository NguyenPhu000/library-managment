document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll(".btn_category_edit");

  if (!editButtons.length) {
    console.error("Lỗi: Không tìm thấy nút chỉnh sửa danh mục!");
    return;
  }

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const categoryId = this.getAttribute("data-id");
      const categoryName = this.getAttribute("data-name");
      const categoryDescription = this.getAttribute("data-description");

      // Kiểm tra nếu phần tử có tồn tại trước khi gán giá trị
      const idInput = document.getElementById("edit_category_id");
      const nameInput = document.getElementById("edit_category_name");
      const descInput = document.getElementById("edit_category_description");

      if (!idInput || !nameInput || !descInput) {
        console.error("Lỗi: Không tìm thấy input trong modal!");
        return;
      }

      idInput.value = categoryId;
      nameInput.value = categoryName;
      descInput.value = categoryDescription;
    });
  });
});
function confirmDelete(CategoryId) {
  if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
    window.location.href = "/api/category/delete?category=" + CategoryId;
  }
}
