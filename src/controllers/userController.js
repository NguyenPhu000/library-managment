import userService from "../services/userService.js";

// ✅ Trang tạo người dùng (Chỉ Admin sử dụng)
const getCreateUser = (req, res) => {
  res.render("partials/createUser.ejs");
};

// ✅ Lấy danh sách người dùng (Admin: Render | React: JSON)
const getDisplayUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json(data); // React nhận JSON
    }

    res.render("userPage", { dataTable: data, currentPage: "users" }); // Admin nhận EJS
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ✅ Tạo người dùng (Admin: Render | React: JSON)
const postCreateUser = async (req, res) => {
  try {
    await userService.createNewUser(req.body);
    const data = await userService.getAllUser();

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ message: "Thêm người dùng thành công" }); // React nhận JSON
    }

    res.render("userPage", { dataTable: data }); // Admin nhận EJS
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi khi tạo người dùng.");
  }
};

// ✅ Cập nhật người dùng (Admin: Render | React: JSON)
const updateUser = async (req, res) => {
  try {
    await userService.updateUserData(req.body);
    const updatedData = await userService.getAllUser();

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ message: "Cập nhật người dùng thành công" }); // React nhận JSON
    }

    res.render("userPage", { dataTable: updatedData }); // Admin nhận EJS
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ✅ Xóa người dùng (Admin: Render | React: JSON)
const deleteUser = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).send("User ID is required");

    await userService.deleteUserById(req.query.id);
    const data = await userService.getAllUser();

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ message: "Xóa người dùng thành công" }); // React nhận JSON
    }

    res.render("userPage", { dataTable: data }); // Admin nhận EJS
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ✅ Bật/Tắt trạng thái hoạt động (Admin: Render | React: JSON)
const toggleActive = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).send("User ID is required");

    await userService.toggleActive(req.query.id);
    const users = await userService.getAllUser();

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({ message: "Cập nhật trạng thái thành công" }); // React nhận JSON
    }

    res.render("userPage", { dataTable: users, currentPage: "users" }); // Admin nhận EJS
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    res.status(500).send(error.message);
  }
};

export default {
  getCreateUser,
  getDisplayUser,
  postCreateUser,
  updateUser,
  deleteUser,
  toggleActive,
};
