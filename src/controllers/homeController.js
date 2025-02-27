const db = require("../models");

export const getHomePage = async (req, res) => {
  try {
    const dataTable = await db.User.findAll();
    res.render("homePage", { dataTable });
  } catch (error) {
    res.status(500).send("Error retrieving home page data");
  }
};

module.exports = {
  getHomePage: getHomePage,
};
