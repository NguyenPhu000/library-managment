import bcrypt from "bcryptjs";
import { User } from "../models";

let login = async (username, password) => {
  try {
    let user = await User.findOne({ where: { username } });

    if (!user) {
      return { success: false, message: "Tài khoản không tồn tại!" };
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Mật khẩu không chính xác!" };
    }

    return {
      success: true,
      user: { user_id: user.user_id, username: user.username, role: user.role },
    };
  } catch (error) {
    console.error("Lỗi Đăng Nhập:", error.message);
    return { success: false, message: "Đã xảy ra lỗi, vui lòng thử lại!" };
  }
};

let logout = async (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) reject("Lỗi đăng xuất!!!");
      resolve("Đăng xuất thành công!!!");
    });
  });
};

const getCurrentUser = async (req) => {
  if (req.session.user) {
    return { success: true, user: req.session.user };
  }
  return { success: false, error: "Chưa đăng nhập" };
};
export default { login, logout, getCurrentUser };
