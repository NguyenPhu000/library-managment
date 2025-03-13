// Lắng nghe sự kiện khi nhấn vào nút "Edit"
document
  .querySelectorAll('[data-bs-target="#editBookModal"]')
  .forEach((button) => {
    button.addEventListener("click", function () {
      // ✅ Gán giá trị từ dataset của button vào modal
      document.getElementById("edit_book_id").value = this.dataset.id || "";
      document.getElementById("edit_isbn").value = this.dataset.isbn || "";
      document.getElementById("edit_title").value = this.dataset.title || "";
      document.getElementById("edit_author").value = this.dataset.author || "";
      document.getElementById("edit_publication_year").value =
        this.dataset.year || "";
      document.getElementById("edit_publisher").value =
        this.dataset.publisher || "";
      document.getElementById("edit_total_copies").value =
        this.dataset.total || "";
      document.getElementById("edit_available_copies").value =
        this.dataset.available || "";
      document.getElementById("edit_status").value = this.dataset.status || "";

      // ✅ Xử lý danh mục sách (categories)
      let selectedCategories = JSON.parse(this.dataset.categories || "[]");
      let categorySelect = document.querySelectorAll(
        "select[name='category_id'] option"
      );
      categorySelect.forEach((option) => {
        option.selected = selectedCategories.includes(parseInt(option.value));
      });

      // ✅ Xử lý ảnh bìa
      let coverImage = this.dataset.cover || "";
      let imagePreview = document.getElementById("edit_image_preview");
      let currentCoverInput = document.getElementById("current_cover");

      if (coverImage) {
        imagePreview.src = `/uploads/${coverImage}`;
        imagePreview.style.display = "block";
        currentCoverInput.value = coverImage;
      } else {
        imagePreview.style.display = "none";
        currentCoverInput.value = "";
      }
    });
  });

// 🖼 Hiển thị ảnh xem trước ngay khi chọn file mới
document
  .getElementById("edit_cover_image")
  .addEventListener("change", function () {
    let input = this;
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("edit_image_preview").src = e.target.result;
        document.getElementById("edit_image_preview").style.display = "block";
      };
      reader.readAsDataURL(input.files[0]);
    }
  });

// 📌 Xử lý cập nhật sách bằng Fetch API
document
  .getElementById("editBookForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);

    // ✅ Nếu không có ảnh mới, giữ nguyên ảnh cũ
    if (
      !formData.get("cover_image") ||
      formData.get("cover_image").size === 0
    ) {
      formData.set(
        "cover_image",
        document.getElementById("current_cover").value
      );
    }

    fetch("/books/update", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("✅ Sách đã được cập nhật thành công!");
        document.getElementById("editBookModal").classList.remove("show");
        location.reload();
      })
      .catch((error) => {
        alert("❌ Lỗi khi cập nhật sách. Vui lòng kiểm tra lại.");
        console.error(error);
      });
  });

function confirmDelete(BookId) {
  if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
    window.location.href = "/books/delete?id=" + BookId;
  }
}
