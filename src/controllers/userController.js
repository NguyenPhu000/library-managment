import userService from "../services/userService";
const db = require("../models");

const getCreateUser = (req, res) => {
  res.render("partials/createUser.ejs");
};

const getDisplayUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    res.render("userPage", { dataTable: data, currentPage: "users" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const postCreateUser = async (req, res) => {
  try {
    const message = await userService.createNewUser(req.body);
    console.log(message);
    const data = await userService.getAllUser(); // Fetch updated user list
    return res.render("userPage", { dataTable: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the user.");
  }
};

const updateUser = async (req, res) => {
  try {
    const data = req.body;
    await userService.updateUserData(data);
    const updatedData = await userService.getAllUser(); // Fetch updated user list
    return res.render("userPage", { dataTable: updatedData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      await userService.deleteUserById(id);
      const data = await userService.getAllUser(); // Fetch updated user list
      return res.render("userPage", { dataTable: data });
    } else {
      return res.status(400).send("User ID is required");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const toggleUserActiveStatus = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const newStatus = await userService.toggleUserActiveStatus(id);
    res.json({ success: true, is_active: newStatus });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getCreateUser,
  postCreateUser,
  getDisplayUser,
  updateUser,
  deleteUser,
  toggleUserActiveStatus,
};
