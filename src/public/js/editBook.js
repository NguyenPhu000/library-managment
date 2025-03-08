$(document).ready(function () {
  // Khi mở modal chỉnh sửa sách
  $("#editBookModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);

    // Lấy dữ liệu từ data-attributes trong nút "Edit"
    var bookId = button.data("id");
    var isbn = button.data("isbn");
    var title = button.data("title");
    var author = button.data("author");
    var year = button.data("year");
    var publisher = button.data("publisher");
    var total = button.data("total");
    var available = button.data("available");
    var status = button.data("status");
    var cover = button.data("cover");
    var categories = button.data("categories");

    // Chuyển đổi dữ liệu danh mục từ chuỗi JSON hoặc chuỗi số sang mảng số
    if (typeof categories === "string") {
      try {
        categories = JSON.parse(categories);
      } catch (error) {
        categories = categories.split(",").map(Number);
      }
    }
    if (!Array.isArray(categories)) categories = [];

    // Điền thông tin vào modal
    var modal = $(this);
    modal.find("#edit_book_id").val(bookId);
    modal.find("#edit_isbn").val(isbn);
    modal.find("#edit_title").val(title);
    modal.find("#edit_author").val(author);
    modal.find("#edit_publication_year").val(year);
    modal.find("#edit_publisher").val(publisher);
    modal.find("#edit_total_copies").val(total);
    modal.find("#edit_available_copies").val(available);
    modal.find("#edit_status").val(status);

    // Điền danh mục sách vào select multiple
    modal.find("#edit_categories option").each(function () {
      let categoryId = parseInt($(this).val());
      $(this).prop("selected", categories.includes(categoryId));
    });

    // Kiểm tra nếu có ảnh thì hiển thị, không có thì ẩn
    if (cover) {
      modal
        .find("#edit_image_preview")
        .attr("src", "/uploads/" + cover)
        .show();
      modal.find("#current_cover").val(cover); // Lưu ảnh hiện tại
    } else {
      modal.find("#edit_image_preview").hide();
      modal.find("#current_cover").val(""); // Không có ảnh thì để rỗng
    }
  });

  // Hiển thị ảnh xem trước ngay khi chọn file mới
  $("#edit_cover_image").change(function () {
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#edit_image_preview").attr("src", e.target.result).show();
      };
      reader.readAsDataURL(input.files[0]);
    }
  });

  // Xử lý cập nhật sách bằng Ajax
  $("#editBookForm").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    // Nếu không có ảnh mới, giữ nguyên ảnh cũ
    if (
      !formData.get("cover_image") ||
      formData.get("cover_image").size === 0
    ) {
      formData.set("cover_image", $("#current_cover").val());
    }

    $.ajax({
      url: "/books/update",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert("Sách đã được cập nhật thành công!");
        $("#editBookModal").modal("hide");
        location.reload();
      },
      error: function (err) {
        alert("Lỗi khi cập nhật sách. Vui lòng kiểm tra lại.");
        console.log(err.responseText);
      },
    });
  });

  // Xác nhận xóa sách
  window.confirmDelete = function (bookId) {
    if (confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
      window.location.href = "/books/delete?id=" + bookId;
    }
  };
});
