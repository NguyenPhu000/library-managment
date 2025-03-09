document
  .querySelectorAll('[data-bs-target="#editAdminModal"]')
  .forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("editAdminId").value = this.dataset.id;
      document.getElementById("editUsername").value = this.dataset.username;
      document.getElementById("editAccessLevel").value =
        this.dataset.access_level;
      document.getElementById("editDepartment").value = this.dataset.department;
      document.getElementById("editCanManageUsers").checked =
        this.dataset.can_manage_users === "true";
      document.getElementById("editCanManageBooks").checked =
        this.dataset.can_manage_books === "true";
    });
  });
