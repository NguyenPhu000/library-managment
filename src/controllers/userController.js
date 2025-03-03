import userService from "../services/userService";
const db = require("../models");

let getCreateUser = (req, res) => {
  res.render("partials/createUser.ejs");
};

const getDisplayUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    res.render("userPage.ejs", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let postCreateUser = async (req, res) => {
  try {
    let message = await userService.createNewUser(req.body); //lay cac tham so tu form
    console.log(message);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the user.");
  }
};
let updateUser = async (req, res) => {
  try {
    const data = req.body;
    await userService.updateUserData(data);
    return res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
let deleteUser = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      await userService.deleteUserById(id);

      return res.redirect("/");
    } else {
      res.status(400).send("User ID is required");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let toggleUserActiveStatus = async (req, res) => {
  try {
    const { id } = req.body; // Nhận ID từ body
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });

    let newStatus = await userService.toggleUserActiveStatus(id); // Gọi service
    res.json({ success: true, is_active: newStatus }); // Trả về trạng thái mới
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
module.exports = {
  getCreateUser: getCreateUser,
  postCreateUser: postCreateUser,
  getDisplayUser: getDisplayUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  toggleUserActiveStatus: toggleUserActiveStatus,
};
