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
module.exports = {
  createNewUser: createNewUser,
};
