import db from "../models/index";
import userService from "../services/userService";
let getUser = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("userPage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getCreateUser = (req, res) => {
  res.render("createUserPage");
};

let postCreateUser = async (req, res) => {
  let message = await userService.createNewUser(req.body); //lay cac tham so tu form
  console.log(message);
  return res.send("server from userController");
};
module.exports = {
  getUser: getUser,
  getCreateUser: getCreateUser,
  postCreateUser: postCreateUser,
};
