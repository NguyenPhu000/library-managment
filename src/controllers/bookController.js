import bookService from "../services/bookService.js";
import categoryService from "../services/categoryService.js";

// ✅ Trang thêm sách (Chỉ Admin sử dụng)
const getCreateBooks = (req, res) => {
  res.render("partials/createBook");
};

// ✅ Thêm sách (Admin: Render | React: JSON)
const postCreateBooks = async (req, res) => {
  try {
    await bookService.createNewBooks(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Thêm sách thành công!" });
    }

    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
      criteria: req.query.criteria || "",
      query: req.query.query || "",
    });
  } catch (error) {
    console.error("Lỗi khi tạo sách:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Hiển thị danh sách sách (Admin: Render | React: JSON)
const getDisplayBooks = async (req, res) => {
  try {
    let { criteria, query } = req.query;
    let books =
      criteria && query
        ? await bookService.searchBook({ criteria, query })
        : await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ books, categories });
    }

    res.render("bookPage", {
      dataTable: books,
      categories,
      currentPage: "books",
      criteria: criteria || "",
      query: query || "",
    });
  } catch (error) {
    console.error("Lỗi khi hiển thị sách:", error);
    res.status(500).json({ lỗi: "Lỗi hệ thống, vui lòng thử lại!" });
  }
};

const updateBook = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug dữ liệu nhận từ form
    console.log("Request file:", req.file); // Debug file upload (nếu có)

    if (!req.body.book_id) {
      return res.status(400).json({ error: "Book ID is required!" });
    }

    await bookService.updateBook(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Cập nhật sách thành công!" });
    }

    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
      criteria: req.query.criteria || "",
      query: req.query.query || "",
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật sách:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Xóa sách (Admin: Render | React: JSON)
const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Xóa sách thành công!" });
    }

    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
      criteria: req.query.criteria || "",
      query: req.query.query || "",
    });
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    res.status(500).json({ error: error.message });
  }
};

export default {
  getCreateBooks,
  postCreateBooks,
  getDisplayBooks,
  updateBook,
  deleteBook,
};
