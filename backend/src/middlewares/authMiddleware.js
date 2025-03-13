let authauthMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error_msg", "Bạn cần đăng nhập trước!");
    return res.redirect("/login");
  }

  const { role } = req.session.user;

  if (role === "member" && req.path === "/") {
    return res.redirect("/thuvien");
  }

  next();
};

export default authauthMiddleware;
