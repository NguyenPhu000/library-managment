import authService from "../services/authService.js";

let showLogin = async (req, res) => {
  res.render("auth/login", { errorMessage: null });
};

let login = async (req, res) => {
  try {
    let { username, password } = req.body;
    let result = await authService.login(username, password);
    // console.log("Kết quả login:", result);

    if (!result.success) {
      return res.render("auth/login", { errorMessage: result.message });
    }

    req.session.user = result.user;

    res.redirect(result.user.role === "admin" ? "/" : "auth/thuvien");
  } catch (error) {
    console.error("Lỗi controller login:", error.message);
    res.status(500).send("Lỗi server, vui lòng thử lại!");
  }
};

let logout = async (req, res) => {
  try {
    await authService.logout(req);
    res.redirect("/login");
  } catch (error) {
    console.error("Lỗi logout:", error.message);
    res.status(500).send("Lỗi server khi đăng xuất!");
  }
};
export default {
  showLogin,
  login,
  logout,
};
