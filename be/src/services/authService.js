import bcrypt from "bcryptjs";
import { User } from "../models";

const login = async (username, password) => {
  try {
    const user = await User.findOne({
      where: {
        username,
        is_active: true, // kiểm tra user active
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Tài khoản không tồn tại hoặc đã bị khóa!",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        message: "Mật khẩu không chính xác!",
      };
    }

    // Trả về toàn bộ đối tượng user
    return { success: true, user };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return { success: false, message: "Lỗi hệ thống!" };
  }
};

const logout = async (req) => {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      resolve({ success: true, message: "Đăng xuất thành công!" });
    });
  });
};

const getCurrentUser = async (req) => {
  if (!req.session?.user) {
    return { success: false, message: "Chưa đăng nhập" };
  }

  // Kiểm tra user còn tồn tại và active không
  const user = await User.findOne({
    where: {
      user_id: req.session.user.user_id,
      is_active: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Tài khoản không tồn tại hoặc đã bị khóa",
    };
  }

  return { success: true, user: req.session.user };
};

export default { login, logout, getCurrentUser };
