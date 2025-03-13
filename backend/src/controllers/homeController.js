const db = require("../models");

export const getHomePage = async (req, res) => {
  try {
    const dataTable = await db.User.findAll();
    res.render("homePage", { currentPage: "dashboard" });
  } catch (error) {
    res.status(500).send("Lỗi khi tải trang chủ");
  }
};

module.exports = {
  getHomePage: getHomePage,
};
