document.addEventListener("DOMContentLoaded", async function () {
  // Giả lập API lấy dữ liệu
  let dashboardData = await fetch("/api/dashboard").then((res) => res.json());

  // Cập nhật số liệu thống kê
  document.getElementById("totalMembers").innerText =
    dashboardData.totalMembers;
  document.getElementById("totalBooks").innerText = dashboardData.totalBooks;
  document.getElementById("totalLoans").innerText = dashboardData.totalLoans;
  document.getElementById("overdueLoans").innerText =
    dashboardData.overdueLoans;

  // Hiển thị hoạt động gần đây
  let activitiesList = document.getElementById("recentActivities");
  activitiesList.innerHTML = "";
  dashboardData.recentActivities.forEach((activity) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerText = activity;
    activitiesList.appendChild(li);
  });

  // Biểu đồ mượn sách theo tháng
  new Chart(document.getElementById("loanChart"), {
    type: "bar",
    data: {
      labels: dashboardData.months,
      datasets: [
        {
          label: "Số lượng mượn",
          data: dashboardData.loans,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    },
  });

  // Biểu đồ trạng thái thành viên
  new Chart(document.getElementById("memberChart"), {
    type: "pie",
    data: {
      labels: ["Active", "Inactive", "Banned"],
      datasets: [
        {
          data: dashboardData.memberStatus,
          backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        },
      ],
    },
  });
});
