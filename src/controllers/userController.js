import userService from "../services/userService";
const db = require("../models");

let getCreateUser = (req, res) => {
  res.render("createUserPage");
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

const getDisplayUser = async (req, res) => {
  try {
    const data = await userService.getAllUser();
    res.render("userPage.ejs", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let putUser = async (req, res) => {
  try {
    const data = req.body;
    await userService.updateUserData(data);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
let deleteUser = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      await userService.deleteUserById(id);
      res.redirect("/");
    } else {
      res.status(400).send("User ID is required");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getCreateUser: getCreateUser,
  postCreateUser: postCreateUser,
  getDisplayUser: getDisplayUser,
  putUser: putUser,
  deleteUser: deleteUser,
};
