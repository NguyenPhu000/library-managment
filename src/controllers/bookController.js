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
    res.render("bookPage", { dataTable: data, categories });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: error.message });
  }
};

let getDisplayBooks = async (req, res) => {
  try {
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", {
      dataTable: data,
      categories,
      currentPage: "books",
    });
  } catch (error) {
    console.error("Error displaying books:", error);
    res.status(500).send(error.message);
  }
};

let updateBook = async (req, res) => {
  try {
    await bookService.updateBook(req);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", { dataTable: data, categories });
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
    res.render("bookPage", { dataTable: data, categories });
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
