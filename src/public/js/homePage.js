$(document).ready(function () {
    // Kiểm tra nếu có trang trước đó được lưu, đặt lại trạng thái active
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
        $(".nav-link").removeClass("active");
        $(".nav-link[href='#" + savedPage + "']").addClass("active");
        loadPage(savedPage); // Tải lại nội dung trang đã lưu
    }

    $(".nav-link").on("click", function (e) {
        e.preventDefault();
        const $this = $(this);
        const target = $this.attr("href").substring(1); // Lấy tên trang (bỏ dấu #)

        // Lưu lại trang vào localStorage
        localStorage.setItem("currentPage", target);

        // Cập nhật trạng thái active cho menu
        $(".nav-link").removeClass("active");
        $this.addClass("active");

        loadPage(target); // Gọi hàm loadPage để nạp nội dung
    });

    function loadPage(page) {
        const $contentContainer = $("#content-container");
        $contentContainer.html(`
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tải...</span>
                </div>
            </div>
        `);
        
        $.ajax({
            url: "/" + page,
            method: "GET",
            success: function (response) {
                $contentContainer.html(response);
            },
            error: function () {
                $contentContainer.html(`<p class='text-danger'>Không thể tải nội dung.</p>`);
            }
        });
    }

    // Hàm làm mới danh sách người dùng nhưng giữ nguyên trang
    function reloadUserList() {
        $.ajax({
            url: "/list-user", // Đường dẫn API lấy danh sách người dùng
            method: "GET",
            success: function (response) {
                $("#user-list-container").html(response);
            },
            error: function () {
                alert("Lỗi khi tải danh sách người dùng.");
            }
        });
    }

    // Xử lý thêm người dùng
    $(document).on("submit", "#createUserForm", function (e) {
        e.preventDefault();
        $.post("/create-user", $(this).serialize(), function (response) {
            if (response.success) {
                alert("Người dùng đã được tạo thành công!");
                reloadUserList(); // Chỉ làm mới trang "Quản lý người dùng"
            } else {
                alert("Lỗi: " + response.error);
            }
        });
    });

    // Xử lý xóa người dùng
    $(document).on("click", ".delete-user-btn", function () {
        const userId = $(this).data("id");
        if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            $.ajax({
                url: "/delete-user?id=" + userId,
                method: "DELETE",
                success: function (response) {
                    if (response.success) {
                        alert("Người dùng đã được xóa!");
                        reloadUserList(); // Giữ nguyên trang
                    } else {
                        alert("Lỗi: " + response.error);
                    }
                },
                error: function () {
                    alert("Lỗi khi xóa người dùng.");
                }
            });
        }
    });


    
});
