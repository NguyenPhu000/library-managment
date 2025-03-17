let authauthMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error_msg", "Bạn cần đăng nhập trước!");
    return res.redirect("/api/login");
  }

  const { role } = req.session.user;

  if (role === "member" && req.path === "/") {
    return res.redirect("http://localhost:5137/");
  }

  next();
};

export default authauthMiddleware;
