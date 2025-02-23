let getHomePage = (req, res) => {
  return res.render("homePage.ejs");
  // return res.send("hekjwfahksdhf");
};

module.exports = {
  getHomePage: getHomePage,
};
