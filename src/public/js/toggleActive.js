$(document).on("click", ".toggle-active", function (e) {
  e.preventDefault();
  let button = $(this);
  let userId = button.data("id");

  // Kiểm tra xem ID có hợp lệ không
  if (!userId) {
    alert("Lỗi: Không tìm thấy ID người dùng!");
    return;
  }

  $.ajax({
    url: "/users/toggle-user-active",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ id: userId }),
    success: function (response) {
      if (response.success) {
        let isActive = response.is_active; // Nhận giá trị từ server
        button
          .removeClass("bg-info bg-danger")
          .addClass(isActive ? "bg-info" : "bg-danger")
          .text(isActive ? "On" : "Off")
          .fadeTo(200, 1); 
      } else {
        alert("Cập nhật trạng thái thất bại!");
      }
    },
    error: function (xhr) {
      alert("Lỗi kết nối đến server! " + xhr.responseText);
    },
  });
});
