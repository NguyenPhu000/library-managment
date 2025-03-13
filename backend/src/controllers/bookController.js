import bookService from "../services/bookService";
import categoryService from "../services/categoryService";

let getCreateBooks = (req, res) => {
  res.render("partials/createBook");
};

let postCreateBooks = async (req, res) => {
  try {
    await bookService.createNewBooks(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
      criteria: req.query.criteria || "",
      query: req.query.query || "",
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: error.message });
  }
};

let getDisplayBooks = async (req, res) => {
  try {
    let { criteria, query } = req.query;
    let books;

    if (criteria && query) {
      books = await bookService.searchBook({ criteria, query });
    } else {
      books = await bookService.getAllBooks();
    }

    let categories = await categoryService.getAllCategory();

    res.render("bookPage", {
      dataTable: books,
      categories,
      currentPage: "books",
      criteria: criteria || "",
      query: query || "",
    });
  } catch (error) {
    console.error("Lỗi khi hiển thị sách:", error);
    res.status(500).send("Lỗi hệ thống, vui lòng thử lại!");
  }
};

let updateBook = async (req, res) => {
  try {
    await bookService.updateBook(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
      criteria: req.query.criteria || "",
      query: req.query.query || "",
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send(error.message);
  }
};

let deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
      criteria: req.query.criteria || "",
      query: req.query.query || "",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send(error.message);
  }
};

export default {
  getCreateBooks,
  postCreateBooks,
  getDisplayBooks,
  updateBook,
  deleteBook,
};
