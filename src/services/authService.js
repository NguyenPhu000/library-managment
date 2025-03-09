import bcrypt from "bcryptjs";
import db from "../models/index.js";

const loginUser = async (username, password, req) => {
  try {
    const user = await db.User.findOne({ where: { username } });

    if (!user) {
      req.flash("error_msg", "Tài khoản không tồn tại!");
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error_msg", "Mật khẩu không đúng!");
      return null;
    }

    if (!user.is_active) {
      req.flash("error_msg", "Tài khoản của bạn đã bị vô hiệu hóa!");
      return null;
    }

    return {
      user_id: user.user_id,
      username: user.username,
      role: user.role, // "admin" || "member" || "guest"
    };
  } catch (error) {
    req.flash("error_msg", "Có lỗi xảy ra, vui lòng thử lại.");
    return null;
  }
};

export default { loginUser };
