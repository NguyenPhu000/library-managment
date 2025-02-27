$(document).ready(function () {
  $("#editUserModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var userId = button.data("id");
    var username = button.data("username");
    var firstName = button.data("first_name");
    var lastName = button.data("last_name");
    var phone = button.data("phone");
    var role = button.data("role");
    var gender = button.data("gender");
    var address = button.data("address");
    var email = button.data("email");

    var modal = $(this);
    modal.find("#editUserId").val(userId);
    modal.find("#editUsername").val(username);
    modal.find("#editFirstName").val(firstName);
    modal.find("#editLastName").val(lastName);
    modal.find("#editPhone").val(phone);
    modal.find("#editRole").val(role);
    modal.find("#editGender").val(gender);
    modal.find("#editAddress").val(address);
    modal.find("#editEmail").val(email);
  });
});
