import categoryService from "../services/categoryService.js";

// ✅ Trang tạo danh mục (Chỉ Admin sử dụng)
const getCreateCategory = (req, res) => {
  res.render("partials/createCategory");
};

// ✅ Thêm danh mục (Admin: Render | React: JSON)
const createCategory = async (req, res) => {
  try {
    let newCategoryData = {
      category_id: req.body.category_id,
      name: req.body.name,
      description: req.body.description,
    };

    await categoryService.createNewCategory(newCategoryData);
    let data = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Thêm danh mục thành công!" });
    }

    res.render("categoryPage", { dataTable: data });
  } catch (error) {
    console.error("Lỗi khi tạo danh mục:", error);
    res.status(500).json({ lỗi: error.message });
  }
};

// ✅ Hiển thị danh mục (Admin: Render | React: JSON)
const displayCategory = async (req, res) => {
  try {
    let data = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json(data);
    }

    res.render("categoryPage", { dataTable: data, currentPage: "category" });
  } catch (error) {
    console.error("Lỗi khi hiển thị danh mục:", error);
    res.status(500).json({ lỗi: error.message });
  }
};

// ✅ Cập nhật danh mục (Admin: Render | React: JSON)
const updateCategory = async (req, res) => {
  try {
    let categoryId = req.body.category_id;
    console.log("Cập nhật danh mục ID:", categoryId);

    let categoryData = {
      name: req.body.name,
      description: req.body.description,
    };

    await categoryService.updateCategory(categoryId, categoryData);
    let data = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Cập nhật danh mục thành công!" });
    }

    res.render("categoryPage", { dataTable: data });
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    res.status(500).json({ lỗi: error.message });
  }
};

// ✅ Xóa danh mục (Admin: Render | React: JSON)
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.query.category;
    await categoryService.deleteCategory(categoryId);
    const data = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Xóa danh mục thành công!" });
    }

    res.render("categoryPage", {
      dataTable: data,
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    res
      .status(500)
      .json({ lỗi: "Không thể xóa danh mục", chi_tiết: error.message });
  }
};

export default {
  getCreateCategory,
  createCategory,
  displayCategory,
  updateCategory,
  deleteCategory,
};
