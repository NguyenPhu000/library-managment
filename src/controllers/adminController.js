import adminService from "../services/adminService";

let getDisplayAdmin = async (req, res) => {
  try {
    let data = await adminService.getAllAdmins();

    res.render("adminPage", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let updateAdmin = async (req, res) => {
  try {
    await adminService.updateAdmin(req.body);
    let updatedData = await adminService.getAllAdmins();
    return res.render("adminPage", { dataTable: updatedData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteAdmin = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).send("Admin ID is required");

    await adminService.deleteAdminById(req.query.id);
    const data = await adminService.getAllAdmins();
    return res.render("adminPage", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
let syncAdmin = async (req, res) => {
  try {
    await adminService.syncAdminFromUsers();
    let data = await adminService.getAllAdmins(); // Lấy danh sách mới
    res.render("adminPage", { dataTable: data });
  } catch (error) {
    res.status(500).send("Lỗi server: " + error.message);
  }
};
module.exports = {
  getDisplayAdmin,
  updateAdmin,
  deleteAdmin,
  syncAdmin,
};
