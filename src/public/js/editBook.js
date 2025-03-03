$(document).ready(function () {
  // Show modal and populate form fields when edit button is clicked
  $("#editBookModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
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

    // Parse cover if it's a JSON string
    try {
      cover = JSON.parse(cover);
    } catch (e) {
      cover = [];
    }

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

    // Handle cover image preview
    if (cover && cover.length > 0) {
      modal.find("#edit_image_preview").attr("src", cover[0]).show();
    } else {
      modal.find("#edit_image_preview").hide();
    }
  });

  // Handle form submission
  $("#editBookForm").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      url: "/books/update",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert("Sách đã được cập nhật thành công!");
        $("#editBookModal").modal("hide");
        location.reload(); // <-- Chỉ load lại trang, không điều hướng về home
      },
      error: function (err) {
        alert("Lỗi khi cập nhật sách.");
        console.log(err.responseText);
      },
    });
  });
});
