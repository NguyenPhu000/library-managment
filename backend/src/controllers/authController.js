import authService from "../services/authService.js";

// ✅ Hiển thị trang login (Chỉ Admin sử dụng)
const showLogin = async (req, res) => {
  res.render("auth/login", { errorMessage: null });
};

// ✅ Xử lý đăng nhập (Admin: Redirect | React: JSON)
const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let result = await authService.login(username, password);

    if (!result.success) {
      if (req.headers.accept?.includes("application/json")) {
        return res.status(401).json({ lỗi: result.message });
      }
      return res.render("auth/login", { errorMessage: result.message });
    }

    req.session.user = result.user;

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Đăng nhập thành công!", user: result.user });
    }

    res.redirect(result.user.role === "admin" ? "/" : "auth/thuvien");
  } catch (error) {
    console.error("Lỗi controller login:", error.message);
    res.status(500).json({ lỗi: "Lỗi server, vui lòng thử lại!" });
  }
};

// ✅ Xử lý logout (Admin: Redirect | React: JSON)
const logout = async (req, res) => {
  try {
    await authService.logout(req);

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Đăng xuất thành công!" });
    }

    res.redirect("/login");
  } catch (error) {
    console.error("Lỗi logout:", error.message);
    res.status(500).json({ lỗi: "Lỗi server khi đăng xuất!" });
  }
};

export default {
  showLogin,
  login,
  logout,
};
