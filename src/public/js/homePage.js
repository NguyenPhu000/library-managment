$(document).ready(function () {
  const savedPage = localStorage.getItem("currentPage") || "home";
  setActiveNavLink(savedPage);
  loadPage(savedPage);

  $(".nav-link").on("click", handleNavLinkClick);
  $(document).on("submit", "#createUserForm", handleCreateUserFormSubmit);
  $(document).on("click", ".delete-user-btn", handleDeleteUserClick);

  function handleNavLinkClick(e) {
    e.preventDefault();
    const target = $(this).attr("href").substring(1); // Remove the #
    localStorage.setItem("currentPage", target);
    setActiveNavLink(target);
    loadPage(target);
  }

  function handleCreateUserFormSubmit(e) {
    e.preventDefault();
    $.post("/users/create", $(this).serialize(), function (response) {
      if (response.success) {
        alert("Người dùng đã được tạo thành công!");
        reloadUserList();
      } else {
        alert("Lỗi: " + response.error);
      }
    });
  }

  function handleDeleteUserClick() {
    const userId = $(this).data("id");
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      $.ajax({
        url: `/users/delete/${userId}`,
        method: "GET",
        success: function (response) {
          if (response.success) {
            alert("Người dùng đã được xóa!");
            reloadUserList();
          } else {
            alert("Lỗi: " + response.error);
          }
        },
        error: function () {
          alert("Lỗi khi xóa người dùng.");
        },
      });
    }
  }

  function setActiveNavLink(page) {
    $(".nav-link").removeClass("active");
    $(`.nav-link[href='#${page}']`).addClass("active");
  }

  function loadPage(page) {
    const $contentContainer = $("#content-container");
    showLoadingSpinner($contentContainer);

    $.ajax({
      url: `/${page}`,
      method: "GET",
      success: function (response) {
        $contentContainer.html(response);
      },
      error: function () {
        $contentContainer.html(
          `<p class="text-danger">Không thể tải nội dung.</p>`
        );
      },
    });
  }

  function showLoadingSpinner($container) {
    $container.html(`
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
      </div>
    `);
  }

  function reloadUserList() {
    $.ajax({
      url: "/users",
      method: "GET",
      success: function (response) {
        $("#user-list-container").html(response);
      },
      error: function () {
        alert("Lỗi khi tải danh sách người dùng.");
      },
    });
  }
});
