import categoryService from "../services/categoryService";

let getCreateCategory = (req, res) => {
  res.render("partials/createCategory");
};

let createCategory = async (req, res) => {
  try {
    let newCategoryData = {
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
    };

    await categoryService.createNewCategory(newCategoryData);

    let data = await categoryService.getAllCategory();
    res.render("categoryPage", { dataTable: data });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message });
  }
};

let displayCategory = async (req, res) => {
  try {
    let data = await categoryService.getAllCategory();
    res.render("categoryPage", { dataTable: data, currentPage: "category" });
  } catch (error) {
    console.error("Error displaying categories:", error);
    res.status(500).send(error.message);
  }
};
let updateCategory = async (req, res) => {
  try {
    let categoryId = req.body.category_id;
    console.log("Updating Category ID:", categoryId);

    let categoryData = {
      name: req.body.name,
      description: req.body.description,
    };

    await categoryService.updateCategory(categoryId, categoryData);

    let data = await categoryService.getAllCategory();
    res.render("categoryPage", { dataTable: data });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};
let deleteCategory = async (req, res) => {
  try {
    const categoryId = req.query.category;
    await categoryService.deleteCategory(categoryId);

    const data = await categoryService.getAllCategory();
    return res.render("categoryPage", {
      dataTable: data,
      message: "Category successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      error: "Failed to delete category",
      details: error.message,
    });
  }
};
module.exports = {
  getCreateCategory,
  createCategory,
  displayCategory,
  updateCategory,
  deleteCategory,
};
