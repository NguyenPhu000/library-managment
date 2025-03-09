document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll(
    "[data-bs-target='#editMemberModal']"
  );

  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.getElementById("editMemberId").value =
        this.getAttribute("data-id");
      document.getElementById("editUsername").value =
        this.getAttribute("data-username");
      document.getElementById("editMemberCode").value =
        this.getAttribute("data-member_code");
      document.getElementById("editJoinDate").value =
        this.getAttribute("data-join_date");
      document.getElementById("editExpiryDate").value =
        this.getAttribute("data-expiry_date");
      document.getElementById("editMaxLoans").value =
        this.getAttribute("data-max_loans");
      document.getElementById("editCurrentLoans").value =
        this.getAttribute("data-current_loans");
      document.getElementById("editStatus").value =
        this.getAttribute("data-status");
    });
  });
});
