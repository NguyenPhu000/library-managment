let isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Truy cập bị từ chối vì bạn không phải Admin!",
      });
  }
  next();
};

export default { isAdmin };
