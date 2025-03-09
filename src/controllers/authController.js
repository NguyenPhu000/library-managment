import authService from "../services/authService.js";

export const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Gọi service để kiểm tra đăng nhập
    const user = await authService.loginUser(username, password, req);

    if (!user) return res.redirect("/login");

    // Lưu thông tin user vào session
    req.session.user = user;

    // Kiểm tra role để điều hướng
    if (user.role === "admin") {
      req.flash("success_msg", "Đăng nhập thành công! Chào mừng Admin.");
      return res.redirect("/");
    } else {
      req.flash("success_msg", "Đăng nhập thành công! Chào mừng thành viên.");
      return res.redirect("/thuvien");
    }
  } catch (error) {
    req.flash("error_msg", "Có lỗi xảy ra, vui lòng thử lại.");
    res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
