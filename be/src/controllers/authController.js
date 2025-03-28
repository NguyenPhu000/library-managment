import authService from "../services/authService.js";

const showLogin = async (req, res) => {
  res.render("auth/login", { errorMessage: null });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      const message = "Vui lòng nhập đầy đủ thông tin!";
      return req.headers.accept?.includes("application/json")
        ? res.status(400).json({ success: false, message })
        : res.render("auth/login", { errorMessage: message });
    }

    const result = await authService.login(username, password);

    if (!result.success) {
      return req.headers.accept?.includes("application/json")
        ? res.status(401).json({ success: false, message: result.message })
        : res.render("auth/login", { errorMessage: result.message });
    }

    // Lưu session
    req.session.user = result.user;

    const redirectUrl =
      result.user.role === "admin" ? "/api" : process.env.FRONTEND_URL;

    return req.headers.accept?.includes("application/json")
      ? res.json({
          success: true,
          message: "Đăng nhập thành công!",
          user: result.user,
          redirectUrl,
        })
      : res.redirect(redirectUrl);
  } catch (error) {
    console.error("Lỗi login:", error);
    const message = "Lỗi hệ thống!";
    return req.headers.accept?.includes("application/json")
      ? res.status(500).json({ success: false, message })
      : res.render("auth/login", { errorMessage: message });
  }
};

//
const logout = async (req, res) => {
  try {
    const result = await authService.logout(req);

    return req.headers.accept?.includes("application/json")
      ? res.json(result)
      : res.redirect("/api/login");
  } catch (error) {
    console.error("Lỗi logout:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi đăng xuất!",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const result = await authService.getCurrentUser(req);
    return result.success
      ? res.json({ success: true, user: result.user })
      : res.status(401).json({ success: false, message: result.message });
  } catch (error) {
    console.error("Lỗi get current user:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi hệ thống!",
    });
  }
};

export default {
  showLogin,
  login,
  logout,
  getCurrentUser,
};
