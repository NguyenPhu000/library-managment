const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    if (req.headers.accept?.includes("application/json")) {
      return res.status(401).json({
        success: false,
        message: "Vui lòng đăng nhập!",
      });
    }
    req.flash("error_msg", "Vui lòng đăng nhập!");
    return res.redirect("/api/login");
  }

  const { role } = req.session.user;
  const path = req.path;

  if (path.startsWith("/api/admin") && role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Không có quyền truy cập!",
    });
  }

  if (role === "member" && path === "/") {
    return res.redirect("http://localhost:5137/");
  }

  next();
};

export default authMiddleware;
