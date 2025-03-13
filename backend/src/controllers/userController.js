import userService from "../services/userService";

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
    await userService.createNewUser(req.body);
    const data = await userService.getAllUser();
    return res.render("userPage", { dataTable: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the user.");
  }
};

const updateUser = async (req, res) => {
  try {
    await userService.updateUserData(req.body);
    const updatedData = await userService.getAllUser();
    return res.render("userPage", { dataTable: updatedData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).send("User ID is required");

    await userService.deleteUserById(req.query.id);
    const data = await userService.getAllUser();
    return res.render("userPage", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const toggleActive = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).send("User ID is required");

    await userService.toggleActive(req.query.id);

    const users = await userService.getAllUser();
    return res.render("userPage", { dataTable: users, currentPage: "users" });
  } catch (error) {
    console.error("Error toggling active status:", error);
    res.status(500).send(error.message);
  }
};

export default {
  getCreateUser,
  postCreateUser,
  getDisplayUser,
  updateUser,
  deleteUser,
  toggleActive,
};
