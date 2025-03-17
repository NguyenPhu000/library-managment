// edit button
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".edit-user-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("editUserId").value = this.dataset.id;
      document.getElementById("editUsername").value = this.dataset.username;
      document.getElementById("editFirstName").value = this.dataset.first_name;
      document.getElementById("editLastName").value = this.dataset.last_name;
      document.getElementById("editPhone").value = this.dataset.phone;
      document.getElementById("editRole").value = this.dataset.role;
      document.getElementById("editGender").value = this.dataset.gender;
      document.getElementById("editAddress").value = this.dataset.address;
      document.getElementById("editEmail").value = this.dataset.email;
    });
  });
});

function confirmDelete(userId) {
  if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
    fetch(`/api/users/delete?id=${userId}`, { method: "GET" }).then(() =>
      location.reload()
    );
  }
}
