import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);

      await db.User.create({
        username: data.username,
        password: hashPasswordFromBcrypt,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender === "1" ? true : false,
        role: data.role,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
      resolve("created a new user");
    } catch (error) {
      reject(error);
    }
  });
};
// bam password
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true, //hien thi du lieu goc
      });
      resolve(users);
    } catch (error) {
      console.log(error);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { user_id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { user_id: data.user_id },
      });
      if (user) {
        await db.User.update(
          {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            gender: data.gender === "1" ? true : false,
            role: data.role,
            email: data.email,
            phone: data.phone,
            address: data.address,
          },
          {
            where: { user_id: data.user_id },
          }
        );
        resolve("updated user");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  });
};
let deleteUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { user_id: id } });

      if (!user) {
        return reject(new Error("User not found"));
      }

      await user.destroy();
      resolve("Deleted user successfully");
    } catch (error) {
      reject(new Error("Error deleting user: " + error.message));
    }
  });
};
let toggleUserActiveStatus = async (id) => {
  try {
    let user = await db.User.findByPk(id);
    if (!user) throw new Error("User not found");

    let newStatus = !user.is_active;
    await user.update({ is_active: newStatus });

    return newStatus;
  } catch (error) {
    throw new Error("Error toggling user status: " + error.message);
  }
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
  toggleUserActiveStatus: toggleUserActiveStatus,
};
