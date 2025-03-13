import bcrypt from "bcryptjs";
import db from "../models/index.js";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  try {
    let hashPasswordFromBcrypt = await bcrypt.hash(data.password, salt);

    await db.User.create({
      username: data.username,
      password: hashPasswordFromBcrypt,
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender === "1",
      role: data.role || "user",
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

let getAllUser = async () => {
  try {
    return await db.User.findAll({ raw: true });
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

let getUserInfoById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { user_id: userId },
      raw: true,
    });
    return user || {};
  } catch (error) {
    throw new Error("Error fetching user info: " + error.message);
  }
};

let updateUserData = async (data) => {
  try {
    const user = await db.User.findOne({ where: { user_id: data.user_id } });
    if (!user) throw new Error("User not found");

    await db.User.update(
      {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender === "1",
        role: data.role,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      { where: { user_id: data.user_id } }
    );
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

let deleteUserById = async (id) => {
  try {
    console.log("📥 Nhận yêu cầu xóa user với ID:", id);
    const user = await db.User.findOne({ where: { user_id: id } });
    if (!user) throw new Error("User not found");

    await user.destroy();
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

let toggleActive = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) throw new Error("User not found");

    // đảo trạng thái
    user.is_active = !user.is_active;
    await user.save();

    return user.is_active;
  } catch (error) {
    throw new Error("Error toggling user status: " + error.message);
  }
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
  toggleActive,
};
